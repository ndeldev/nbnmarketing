/**
 * Imagen Image Generation Service
 *
 * Public API for Imagen 4 text-to-image generation
 *
 * @example
 * ```typescript
 * import { createImagenJob, getJob, isImagenEnabled } from '@/lib/services/imagen';
 *
 * if (isImagenEnabled()) {
 *   const job = await createImagenJob({
 *     prompt: 'A scenic mountain landscape at sunset',
 *     config: { aspectRatio: '16:9', imageSize: '2K', numberOfImages: 4 }
 *   });
 *
 *   // Poll for completion
 *   const status = getJob(job.id);
 * }
 * ```
 */

// Types
export type {
  ImagenModel,
  ImagenSize,
  ImagenAspectRatio,
  ImagenPersonGeneration,
  ImagenConfig,
  GenerateImagenInput,
  ImagenGeneratedImage,
  ImagenResponse,
  JobStatus,
  ImagenJob,
  ImagenJobStatusResponse,
} from './types';

// Configuration
export {
  IMAGEN_CONFIG,
  getApiKey,
  isImagenEnabled,
  getModel,
  calculateCost,
  validatePrompt,
  validateConfig,
} from './config';

// Client
export { ImagenClient, ImagenApiError } from './client';

// Job Store
export {
  createImagenJob,
  getJob,
  getAllJobs,
  getJobStats,
  getJobImages,
  cleanupExpiredJobs,
  stopCleanup,
  clearAllJobs,
} from './job-store';
