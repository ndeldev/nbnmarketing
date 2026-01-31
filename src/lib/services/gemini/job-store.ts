/**
 * Gemini Image Generation Job Store
 *
 * In-memory job tracking for async image generation operations.
 * For production multi-instance deployment, migrate to Redis + BullMQ.
 */

import { GeminiClient, GeminiApiError } from './client';
import { GEMINI_CONFIG, getModel } from './config';
import type {
  ImageJob,
  JobStatus,
  GenerateImageInput,
  EditImageInput,
  GeneratedImage,
  GeminiImageModel,
} from './types';

// =============================================================================
// Job Store (In-Memory)
// =============================================================================

const jobs = new Map<string, ImageJob>();
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Generate a unique job ID
 */
function generateJobId(): string {
  return crypto.randomUUID();
}

/**
 * Update a job's properties
 */
function updateJob(jobId: string, updates: Partial<ImageJob>): void {
  const job = jobs.get(jobId);
  if (job) {
    Object.assign(job, updates);
    jobs.set(jobId, job);
  }
}

// =============================================================================
// Job Creation
// =============================================================================

/**
 * Create a new image generation job
 */
export async function createImageJob(input: GenerateImageInput): Promise<ImageJob> {
  // Check concurrent job limit
  const activeJobs = Array.from(jobs.values()).filter(
    (j) => j.status === 'pending' || j.status === 'processing'
  );

  if (activeJobs.length >= GEMINI_CONFIG.jobs.maxConcurrent) {
    throw new GeminiApiError(
      `Maximum concurrent jobs (${GEMINI_CONFIG.jobs.maxConcurrent}) reached. Try again later.`,
      429
    );
  }

  const jobId = generateJobId();
  const model = input.model || getModel();

  const job: ImageJob = {
    id: jobId,
    status: 'pending',
    model,
    prompt: input.prompt,
    imageConfig: input.imageConfig,
    thinkingConfig: input.thinkingConfig,
    hasReferenceImage: false,
    createdAt: new Date(),
    retryCount: 0,
  };

  jobs.set(jobId, job);

  // Start generation in background (non-blocking)
  startGeneration(jobId, input).catch((error) => {
    console.error(`Generation error for job ${jobId}:`, error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  });

  // Ensure cleanup is running
  ensureCleanupRunning();

  return job;
}

/**
 * Create a new image editing job
 */
export async function createEditJob(input: EditImageInput): Promise<ImageJob> {
  // Check concurrent job limit
  const activeJobs = Array.from(jobs.values()).filter(
    (j) => j.status === 'pending' || j.status === 'processing'
  );

  if (activeJobs.length >= GEMINI_CONFIG.jobs.maxConcurrent) {
    throw new GeminiApiError(
      `Maximum concurrent jobs (${GEMINI_CONFIG.jobs.maxConcurrent}) reached. Try again later.`,
      429
    );
  }

  const jobId = generateJobId();
  const model = input.model || getModel();

  const job: ImageJob = {
    id: jobId,
    status: 'pending',
    model,
    prompt: input.prompt,
    imageConfig: input.imageConfig,
    thinkingConfig: input.thinkingConfig,
    hasReferenceImage: true,
    createdAt: new Date(),
    retryCount: 0,
  };

  jobs.set(jobId, job);

  // Start editing in background (non-blocking)
  startEditing(jobId, input).catch((error) => {
    console.error(`Editing error for job ${jobId}:`, error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  });

  // Ensure cleanup is running
  ensureCleanupRunning();

  return job;
}

// =============================================================================
// Background Processing
// =============================================================================

/**
 * Run image generation in background
 */
async function startGeneration(jobId: string, input: GenerateImageInput): Promise<void> {
  updateJob(jobId, {
    status: 'processing',
    startedAt: new Date(),
  });

  const client = new GeminiClient();

  try {
    const result = await client.generateImage(input);

    updateJob(jobId, {
      status: 'completed',
      images: result.images,
      text: result.text,
      thoughtSignature: result.thoughtSignature,
      completedAt: new Date(),
      expiresAt: new Date(Date.now() + GEMINI_CONFIG.jobs.retentionMs),
    });

    console.log(`Job ${jobId} completed:`, {
      imageCount: result.images.length,
      hasText: !!result.text,
    });
  } catch (error) {
    const job = jobs.get(jobId);

    // Retry logic
    if (job && job.retryCount < GEMINI_CONFIG.jobs.maxRetries) {
      console.log(`Retrying job ${jobId} (attempt ${job.retryCount + 1})`);
      updateJob(jobId, {
        retryCount: job.retryCount + 1,
        status: 'pending',
      });

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return startGeneration(jobId, input);
    }

    throw error;
  }
}

/**
 * Run image editing in background
 */
async function startEditing(jobId: string, input: EditImageInput): Promise<void> {
  updateJob(jobId, {
    status: 'processing',
    startedAt: new Date(),
  });

  const client = new GeminiClient();

  try {
    const result = await client.editImage(input);

    updateJob(jobId, {
      status: 'completed',
      images: result.images,
      text: result.text,
      thoughtSignature: result.thoughtSignature,
      completedAt: new Date(),
      expiresAt: new Date(Date.now() + GEMINI_CONFIG.jobs.retentionMs),
    });

    console.log(`Edit job ${jobId} completed:`, {
      imageCount: result.images.length,
      hasText: !!result.text,
    });
  } catch (error) {
    const job = jobs.get(jobId);

    // Retry logic
    if (job && job.retryCount < GEMINI_CONFIG.jobs.maxRetries) {
      console.log(`Retrying edit job ${jobId} (attempt ${job.retryCount + 1})`);
      updateJob(jobId, {
        retryCount: job.retryCount + 1,
        status: 'pending',
      });

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return startEditing(jobId, input);
    }

    throw error;
  }
}

// =============================================================================
// Job Retrieval
// =============================================================================

/**
 * Get a job by ID
 */
export function getJob(jobId: string): ImageJob | undefined {
  return jobs.get(jobId);
}

/**
 * Get all jobs (for debugging/admin)
 */
export function getAllJobs(): ImageJob[] {
  return Array.from(jobs.values());
}

/**
 * Get job statistics
 */
export function getJobStats(): {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  expired: number;
} {
  const allJobs = Array.from(jobs.values());
  return {
    total: allJobs.length,
    pending: allJobs.filter((j) => j.status === 'pending').length,
    processing: allJobs.filter((j) => j.status === 'processing').length,
    completed: allJobs.filter((j) => j.status === 'completed').length,
    failed: allJobs.filter((j) => j.status === 'failed').length,
    expired: allJobs.filter((j) => j.status === 'expired').length,
  };
}

/**
 * Get images from a completed job
 */
export function getJobImages(jobId: string): GeneratedImage[] | undefined {
  const job = jobs.get(jobId);
  if (job?.status === 'completed' && job.images) {
    return job.images;
  }
  return undefined;
}

// =============================================================================
// Cleanup
// =============================================================================

/**
 * Clean up expired jobs
 */
export function cleanupExpiredJobs(): void {
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [jobId, job] of jobs.entries()) {
    // Mark completed jobs as expired if past retention
    if (
      job.status === 'completed' &&
      job.expiresAt &&
      job.expiresAt.getTime() < now
    ) {
      updateJob(jobId, { status: 'expired' });
    }

    // Delete very old jobs (24+ hours)
    if (now - job.createdAt.getTime() > maxAge) {
      jobs.delete(jobId);
    }
  }
}

/**
 * Ensure cleanup interval is running
 */
function ensureCleanupRunning(): void {
  if (!cleanupInterval && typeof setInterval !== 'undefined') {
    cleanupInterval = setInterval(
      cleanupExpiredJobs,
      GEMINI_CONFIG.jobs.cleanupIntervalMs
    );

    // Don't block process exit
    if (cleanupInterval.unref) {
      cleanupInterval.unref();
    }
  }
}

/**
 * Stop cleanup interval (for testing)
 */
export function stopCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

/**
 * Clear all jobs (for testing)
 */
export function clearAllJobs(): void {
  jobs.clear();
}
