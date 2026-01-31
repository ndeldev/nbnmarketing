/**
 * Veo 3.1 Video Generation Service
 *
 * Re-exports for convenient imports.
 */

// Types
export type {
  VeoModel,
  VeoResolution,
  VeoAspectRatio,
  VeoDuration,
  VideoJob,
  JobStatus,
  GenerateVideoInput,
  ExtendVideoInput,
  VideoStatusResponse,
} from './types';

// Configuration
export { VEO_CONFIG, getApiKey, getModel, isVeoEnabled, calculateCost } from './config';

// Client
export { VeoClient, VeoApiError } from './client';

// Job Store
export { createJob, getJob, getAllJobs, getJobStats, cleanupExpiredJobs } from './job-store';
