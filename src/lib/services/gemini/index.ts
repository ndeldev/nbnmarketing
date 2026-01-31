/**
 * Gemini Image Generation Service
 *
 * Public API for Gemini image generation (Nano Banana Pro)
 *
 * @example
 * ```typescript
 * import { createImageJob, getJob, isGeminiEnabled } from '@/lib/services/gemini';
 *
 * if (isGeminiEnabled()) {
 *   const job = await createImageJob({
 *     prompt: 'A scenic mountain landscape at sunset',
 *     imageConfig: { aspectRatio: '16:9', imageSize: '2K' }
 *   });
 *
 *   // Poll for completion
 *   const status = getJob(job.id);
 * }
 * ```
 */

// Types
export type {
  GeminiImageModel,
  ImageResolution,
  AspectRatio,
  PersonGeneration,
  SafetyFilterLevel,
  ImageConfig,
  ThinkingConfig,
  GenerateImageInput,
  EditImageInput,
  MultiTurnEditInput,
  GeneratedImage,
  GenerateImageResponse,
  JobStatus,
  ImageJob,
  ImageJobStatusResponse,
  EditSession,
} from './types';

// Configuration
export {
  GEMINI_CONFIG,
  getApiKey,
  isGeminiEnabled,
  getModel,
  calculateCost,
  validatePrompt,
  validateImageConfig,
} from './config';

// Client
export { GeminiClient, GeminiApiError } from './client';

// Job Store
export {
  createImageJob,
  createEditJob,
  getJob,
  getAllJobs,
  getJobStats,
  getJobImages,
  cleanupExpiredJobs,
  stopCleanup,
  clearAllJobs,
} from './job-store';
