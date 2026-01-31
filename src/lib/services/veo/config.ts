/**
 * Veo 3.1 Configuration
 *
 * Default settings, constants, and environment variable handling.
 */

import type { VeoModel, VeoResolution, VeoAspectRatio, VeoDuration } from './types';

export const VEO_CONFIG = {
  // API Configuration
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',

  // Default Generation Settings (Maximum Quality)
  defaults: {
    model: 'veo-3.1-generate-preview' as VeoModel,
    resolution: '4k' as VeoResolution,
    aspectRatio: '16:9' as VeoAspectRatio,
    durationSeconds: 8 as VeoDuration,
    frameRate: 24,
  },

  // Polling Configuration
  polling: {
    intervalMs: 10_000,              // 10 seconds between polls
    maxAttempts: 40,                 // 40 * 10s = ~6.5 minutes max
    initialDelayMs: 5_000,           // Wait 5s before first poll
  },

  // Job Management
  jobs: {
    maxConcurrent: 5,                // Rate limit concurrent generations
    retentionMs: 2 * 60 * 60 * 1000, // 2 hours (matches Google's retention)
    cleanupIntervalMs: 5 * 60 * 1000,// Clean expired jobs every 5 minutes
    maxRetries: 3,                   // Retry on polling errors
  },

  // Validation
  validation: {
    promptMinLength: 10,
    promptMaxLength: 2000,
    maxReferenceImages: 3,
  },

  // Cost per second (for logging/monitoring)
  pricing: {
    standard: { '720p': 0.40, '1080p': 0.40, '4k': 0.60 },
    fast: { '720p': 0.15, '1080p': 0.15, '4k': 0.35 },
  },
} as const;

/**
 * Get the Google AI API key from environment
 * @throws Error if not configured
 */
export function getApiKey(): string {
  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is required');
  }
  return key;
}

/**
 * Get the Veo model to use (from env or default)
 */
export function getModel(): VeoModel {
  const envModel = process.env.VEO_MODEL;
  if (envModel === 'veo-3.1-generate-preview' || envModel === 'veo-3.1-fast-generate-preview') {
    return envModel;
  }
  return VEO_CONFIG.defaults.model;
}

/**
 * Check if Veo video generation is enabled
 */
export function isVeoEnabled(): boolean {
  return process.env.ENABLE_VEO_GENERATION === 'true';
}

/**
 * Calculate estimated cost for a video generation
 */
export function calculateCost(
  durationSeconds: VeoDuration,
  resolution: VeoResolution,
  model: VeoModel = VEO_CONFIG.defaults.model
): number {
  const isStandard = model === 'veo-3.1-generate-preview';
  const pricing = isStandard ? VEO_CONFIG.pricing.standard : VEO_CONFIG.pricing.fast;
  return durationSeconds * pricing[resolution];
}
