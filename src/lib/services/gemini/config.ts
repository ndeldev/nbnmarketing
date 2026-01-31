/**
 * Gemini Image Generation Configuration
 */

import type { GeminiImageModel, ImageResolution, AspectRatio } from './types';

// =============================================================================
// Configuration Constants
// =============================================================================

export const GEMINI_CONFIG = {
  // API Settings
  api: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  },

  // Default Generation Settings
  defaults: {
    model: 'gemini-3-pro-image-preview' as GeminiImageModel,
    resolution: '2K' as ImageResolution,
    aspectRatio: '16:9' as AspectRatio,
    numberOfImages: 1,
    personGeneration: 'ALLOW_ADULT' as const,
  },

  // Polling Configuration (image generation is faster than video)
  polling: {
    intervalMs: 3_000,      // Poll every 3 seconds
    maxAttempts: 30,        // ~90 seconds max wait
    initialDelayMs: 1_000,  // Wait 1 second before first poll
  },

  // Job Management
  jobs: {
    maxConcurrent: 10,                    // More concurrent than video
    retentionMs: 2 * 60 * 60 * 1000,      // 2 hours
    cleanupIntervalMs: 5 * 60 * 1000,     // 5 minutes
    maxRetries: 2,
    sessionTimeoutMs: 30 * 60 * 1000,     // 30 minutes for multi-turn sessions
  },

  // Validation Rules
  validation: {
    maxPromptLength: 8000,
    maxReferenceImages: 14,
    supportedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'] as const,
    maxImageSizeBytes: 20 * 1024 * 1024,  // 20MB
  },

  // Resolution Dimensions (approximate)
  resolutions: {
    '1K': { width: 1024, height: 1024 },
    '2K': { width: 2048, height: 2048 },
    '4K': { width: 4096, height: 4096 },
  },

  // Aspect Ratio Multipliers
  aspectRatios: {
    '1:1': { widthMultiplier: 1, heightMultiplier: 1 },
    '2:3': { widthMultiplier: 2 / 3, heightMultiplier: 1 },
    '3:2': { widthMultiplier: 1, heightMultiplier: 2 / 3 },
    '3:4': { widthMultiplier: 3 / 4, heightMultiplier: 1 },
    '4:3': { widthMultiplier: 1, heightMultiplier: 3 / 4 },
    '4:5': { widthMultiplier: 4 / 5, heightMultiplier: 1 },
    '5:4': { widthMultiplier: 1, heightMultiplier: 4 / 5 },
    '9:16': { widthMultiplier: 9 / 16, heightMultiplier: 1 },
    '16:9': { widthMultiplier: 1, heightMultiplier: 9 / 16 },
    '21:9': { widthMultiplier: 1, heightMultiplier: 9 / 21 },
  },

  // Pricing (estimated per image)
  pricing: {
    'gemini-3-pro-image-preview': {
      '1K': 0.04,
      '2K': 0.08,
      '4K': 0.20,
    },
    'gemini-2.5-flash-image': {
      '1K': 0.02,
      '2K': 0.04,
      '4K': 0.10,
    },
  },
} as const;

// =============================================================================
// Environment Helpers
// =============================================================================

/**
 * Get Google AI API key from environment
 * Uses the same key as Veo
 */
export function getApiKey(): string {
  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is required');
  }
  return key;
}

/**
 * Check if Gemini image generation is enabled
 */
export function isGeminiEnabled(): boolean {
  return process.env.ENABLE_GEMINI_GENERATION === 'true';
}

/**
 * Get the default model or override from environment
 */
export function getModel(): GeminiImageModel {
  const envModel = process.env.GEMINI_IMAGE_MODEL as GeminiImageModel | undefined;
  if (envModel && ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'].includes(envModel)) {
    return envModel;
  }
  return GEMINI_CONFIG.defaults.model;
}

/**
 * Calculate estimated cost for image generation
 */
export function calculateCost(
  model: GeminiImageModel,
  resolution: ImageResolution,
  numberOfImages: number = 1
): number {
  const modelPricing = GEMINI_CONFIG.pricing[model];
  const perImageCost = modelPricing[resolution];
  return perImageCost * numberOfImages;
}

/**
 * Validate prompt length
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt is required' };
  }
  if (prompt.length > GEMINI_CONFIG.validation.maxPromptLength) {
    return {
      valid: false,
      error: `Prompt exceeds maximum length of ${GEMINI_CONFIG.validation.maxPromptLength} characters`,
    };
  }
  return { valid: true };
}

/**
 * Validate image configuration
 */
export function validateImageConfig(config?: {
  aspectRatio?: string;
  imageSize?: string;
  numberOfImages?: number;
}): { valid: boolean; error?: string } {
  if (!config) return { valid: true };

  const validAspectRatios = Object.keys(GEMINI_CONFIG.aspectRatios);
  if (config.aspectRatio && !validAspectRatios.includes(config.aspectRatio)) {
    return {
      valid: false,
      error: `Invalid aspect ratio. Supported: ${validAspectRatios.join(', ')}`,
    };
  }

  const validResolutions = ['1K', '2K', '4K'];
  if (config.imageSize && !validResolutions.includes(config.imageSize)) {
    return {
      valid: false,
      error: `Invalid resolution. Supported: ${validResolutions.join(', ')}`,
    };
  }

  if (config.numberOfImages !== undefined) {
    if (config.numberOfImages < 1 || config.numberOfImages > 4) {
      return {
        valid: false,
        error: 'Number of images must be between 1 and 4',
      };
    }
  }

  return { valid: true };
}
