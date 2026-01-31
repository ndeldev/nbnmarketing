/**
 * Veo Job Store
 *
 * In-memory job tracking for video generation.
 * This is the MVP implementation - can be swapped for Redis/BullMQ later.
 */

import type { VideoJob, GenerateVideoInput } from './types';
import { VEO_CONFIG } from './config';
import { VeoClient } from './client';

// In-memory job store (singleton)
const jobs = new Map<string, VideoJob>();

// Cleanup interval reference
let cleanupInterval: NodeJS.Timeout | null = null;

/**
 * Generate UUID using Web Crypto API
 */
function generateJobId(): string {
  return crypto.randomUUID();
}

/**
 * Create a new video generation job
 */
export async function createJob(input: GenerateVideoInput): Promise<VideoJob> {
  // Check concurrent job limit
  const activeJobs = Array.from(jobs.values()).filter(
    j => j.status === 'pending' || j.status === 'processing'
  );

  if (activeJobs.length >= VEO_CONFIG.jobs.maxConcurrent) {
    throw new Error(`Maximum concurrent jobs (${VEO_CONFIG.jobs.maxConcurrent}) reached. Please wait for existing jobs to complete.`);
  }

  const job: VideoJob = {
    id: generateJobId(),
    status: 'pending',
    prompt: input.prompt,
    model: input.model || VEO_CONFIG.defaults.model,
    resolution: input.resolution || VEO_CONFIG.defaults.resolution,
    aspectRatio: input.aspectRatio || VEO_CONFIG.defaults.aspectRatio,
    durationSeconds: input.durationSeconds || VEO_CONFIG.defaults.durationSeconds,
    createdAt: new Date(),
    updatedAt: new Date(),
    retryCount: 0,
  };

  jobs.set(job.id, job);

  // Start generation asynchronously (don't await)
  startGeneration(job.id, input).catch(error => {
    updateJob(job.id, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error during generation',
    });
  });

  // Ensure cleanup is running
  ensureCleanupRunning();

  return job;
}

/**
 * Get job by ID
 */
export function getJob(jobId: string): VideoJob | undefined {
  return jobs.get(jobId);
}

/**
 * Get all jobs (for debugging/admin)
 */
export function getAllJobs(): VideoJob[] {
  return Array.from(jobs.values());
}

/**
 * Update job fields
 */
function updateJob(jobId: string, updates: Partial<VideoJob>): void {
  const job = jobs.get(jobId);
  if (job) {
    Object.assign(job, updates, { updatedAt: new Date() });
  }
}

/**
 * Start video generation using the SDK
 */
async function startGeneration(jobId: string, input: GenerateVideoInput): Promise<void> {
  const client = new VeoClient();

  try {
    updateJob(jobId, { status: 'processing' });

    // Generate video - this polls internally until complete
    const videoUrl = input.firstFrameBase64
      ? await client.generateVideoWithImage(input, input.firstFrameBase64)
      : await client.generateVideo(input);

    updateJob(jobId, {
      status: 'completed',
      videoUrl,
      videoExpiresAt: new Date(Date.now() + VEO_CONFIG.jobs.retentionMs),
      completedAt: new Date(),
    });

  } catch (error) {
    console.error('Generation error for job', jobId, error);
    updateJob(jobId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Cleanup expired jobs
 */
export function cleanupExpiredJobs(): void {
  const now = Date.now();

  for (const [jobId, job] of jobs.entries()) {
    // Mark videos as expired if past expiration
    if (
      job.status === 'completed' &&
      job.videoExpiresAt &&
      job.videoExpiresAt.getTime() < now
    ) {
      updateJob(jobId, { status: 'expired' });
    }

    // Remove very old jobs (> 24 hours)
    const ageMs = now - job.createdAt.getTime();
    if (ageMs > 24 * 60 * 60 * 1000) {
      jobs.delete(jobId);
    }
  }
}

/**
 * Ensure cleanup interval is running
 */
function ensureCleanupRunning(): void {
  if (!cleanupInterval && typeof setInterval !== 'undefined') {
    cleanupInterval = setInterval(cleanupExpiredJobs, VEO_CONFIG.jobs.cleanupIntervalMs);
  }
}

/**
 * Get job statistics (for monitoring)
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
    pending: allJobs.filter(j => j.status === 'pending').length,
    processing: allJobs.filter(j => j.status === 'processing').length,
    completed: allJobs.filter(j => j.status === 'completed').length,
    failed: allJobs.filter(j => j.status === 'failed').length,
    expired: allJobs.filter(j => j.status === 'expired').length,
  };
}
