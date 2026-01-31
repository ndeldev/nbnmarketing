/**
 * Imagen Image Generation Job Store
 *
 * In-memory job tracking for async image generation operations.
 * For production multi-instance deployment, migrate to Redis + BullMQ.
 */

import { ImagenClient, ImagenApiError } from './client';
import { IMAGEN_CONFIG, getModel } from './config';
import type {
  ImagenJob,
  JobStatus,
  GenerateImagenInput,
  ImagenGeneratedImage,
  ImagenModel,
} from './types';

// =============================================================================
// Job Store (In-Memory)
// =============================================================================

const jobs = new Map<string, ImagenJob>();
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
function updateJob(jobId: string, updates: Partial<ImagenJob>): void {
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
 * Create a new Imagen generation job
 */
export async function createImagenJob(input: GenerateImagenInput): Promise<ImagenJob> {
  // Check concurrent job limit
  const activeJobs = Array.from(jobs.values()).filter(
    (j) => j.status === 'pending' || j.status === 'processing'
  );

  if (activeJobs.length >= IMAGEN_CONFIG.jobs.maxConcurrent) {
    throw new ImagenApiError(
      `Maximum concurrent jobs (${IMAGEN_CONFIG.jobs.maxConcurrent}) reached. Try again later.`,
      429
    );
  }

  const jobId = generateJobId();
  const model = input.model || getModel();

  const job: ImagenJob = {
    id: jobId,
    status: 'pending',
    model,
    prompt: input.prompt,
    config: input.config,
    createdAt: new Date(),
    retryCount: 0,
  };

  jobs.set(jobId, job);

  // Start generation in background (non-blocking)
  startGeneration(jobId, input).catch((error) => {
    console.error(`Imagen generation error for job ${jobId}:`, error);
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
async function startGeneration(jobId: string, input: GenerateImagenInput): Promise<void> {
  updateJob(jobId, {
    status: 'processing',
    startedAt: new Date(),
  });

  const client = new ImagenClient();

  try {
    const result = await client.generateImages(input);

    updateJob(jobId, {
      status: 'completed',
      images: result.images,
      completedAt: new Date(),
      expiresAt: new Date(Date.now() + IMAGEN_CONFIG.jobs.retentionMs),
    });

    console.log(`Imagen job ${jobId} completed:`, {
      imageCount: result.images.length,
    });
  } catch (error) {
    const job = jobs.get(jobId);

    // Retry logic
    if (job && job.retryCount < IMAGEN_CONFIG.jobs.maxRetries) {
      console.log(`Retrying Imagen job ${jobId} (attempt ${job.retryCount + 1})`);
      updateJob(jobId, {
        retryCount: job.retryCount + 1,
        status: 'pending',
      });

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return startGeneration(jobId, input);
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
export function getJob(jobId: string): ImagenJob | undefined {
  return jobs.get(jobId);
}

/**
 * Get all jobs (for debugging/admin)
 */
export function getAllJobs(): ImagenJob[] {
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
export function getJobImages(jobId: string): ImagenGeneratedImage[] | undefined {
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
      IMAGEN_CONFIG.jobs.cleanupIntervalMs
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
