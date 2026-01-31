/**
 * Imagen Image Generation Configuration
 */

import type { ImagenModel, ImagenSize, ImagenAspectRatio } from './types';

// =============================================================================
// Configuration Constants
// =============================================================================

export const IMAGEN_CONFIG = {
  // API Settings
  api: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  },

  // Default Generation Settings
  defaults: {
    model: 'imagen-4.0-generate-001' as ImagenModel,
    imageSize: '1K' as ImagenSize,
    aspectRatio: '16:9' as ImagenAspectRatio,
    numberOfImages: 4,
    personGeneration: 'allow_adult' as const,
  },

  // Imagen generation is typically fast
  polling: {
    intervalMs: 2_000,      // Poll every 2 seconds
    maxAttempts: 30,        // ~60 seconds max wait
    initialDelayMs: 500,    // Wait 500ms before first poll
  },

  // Job Management
  jobs: {
    maxConcurrent: 10,
    retentionMs: 2 * 60 * 60 * 1000,      // 2 hours
    cleanupIntervalMs: 5 * 60 * 1000,     // 5 minutes
    maxRetries: 2,
  },

  // Validation Rules
  validation: {
    maxPromptTokens: 480,
    maxPromptLength: 2000,  // Approximate character limit
    maxNumberOfImages: 4,
  },

  // Resolution Dimensions (approximate)
  resolutions: {
    '1K': { width: 1024, height: 1024 },
    '2K': { width: 2048, height: 2048 },
  },

  // Model Capabilities
  modelCapabilities: {
    'imagen-4.0-generate-001': {
      supports2K: true,
      quality: 'standard',
      speed: 'medium',
    },
    'imagen-4.0-ultra-generate-001': {
      supports2K: true,
      quality: 'highest',
      speed: 'slow',
    },
    'imagen-4.0-fast-generate-001': {
      supports2K: false,  // Only 1K
      quality: 'good',
      speed: 'fast',
    },
  },

  // Pricing (estimated per image)
  pricing: {
    'imagen-4.0-generate-001': {
      '1K': 0.02,
      '2K': 0.04,
    },
    'imagen-4.0-ultra-generate-001': {
      '1K': 0.04,
      '2K': 0.08,
    },
    'imagen-4.0-fast-generate-001': {
      '1K': 0.01,
      '2K': 0.01,  // Same as 1K since 2K not supported
    },
  },
} as const;

// =============================================================================
// Environment Helpers
// =============================================================================

/**
 * Get Google AI API key from environment
 * Uses the same key as Veo and Gemini
 */
export function getApiKey(): string {
  const key = process.env.GOOGLE_AI_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is required');
  }
  return key;
}

/**
 * Check if Imagen generation is enabled
 */
export function isImagenEnabled(): boolean {
  return process.env.ENABLE_IMAGEN_GENERATION === 'true';
}

/**
 * Get the default model or override from environment
 */
export function getModel(): ImagenModel {
  const envModel = process.env.IMAGEN_MODEL as ImagenModel | undefined;
  const validModels = [
    'imagen-4.0-generate-001',
    'imagen-4.0-ultra-generate-001',
    'imagen-4.0-fast-generate-001',
  ];
  if (envModel && validModels.includes(envModel)) {
    return envModel;
  }
  return IMAGEN_CONFIG.defaults.model;
}

/**
 * Calculate estimated cost for image generation
 */
export function calculateCost(
  model: ImagenModel,
  imageSize: ImagenSize,
  numberOfImages: number = 4
): number {
  const modelPricing = IMAGEN_CONFIG.pricing[model];
  const perImageCost = modelPricing[imageSize];
  return perImageCost * numberOfImages;
}

/**
 * Validate prompt
 */
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt is required' };
  }
  if (prompt.length > IMAGEN_CONFIG.validation.maxPromptLength) {
    return {
      valid: false,
      error: `Prompt exceeds maximum length of ${IMAGEN_CONFIG.validation.maxPromptLength} characters`,
    };
  }
  return { valid: true };
}

/**
 * Validate Imagen configuration
 */
export function validateConfig(
  model: ImagenModel,
  config?: {
    imageSize?: string;
    aspectRatio?: string;
    numberOfImages?: number;
  }
): { valid: boolean; error?: string } {
  if (!config) return { valid: true };

  // Check aspect ratio
  const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
  if (config.aspectRatio && !validAspectRatios.includes(config.aspectRatio)) {
    return {
      valid: false,
      error: `Invalid aspect ratio. Supported: ${validAspectRatios.join(', ')}`,
    };
  }

  // Check image size
  const validSizes = ['1K', '2K'];
  if (config.imageSize && !validSizes.includes(config.imageSize)) {
    return {
      valid: false,
      error: `Invalid image size. Supported: ${validSizes.join(', ')}`,
    };
  }

  // Check 2K support for fast model
  if (
    config.imageSize === '2K' &&
    model === 'imagen-4.0-fast-generate-001'
  ) {
    return {
      valid: false,
      error: 'imagen-4.0-fast-generate-001 does not support 2K resolution. Use 1K or choose a different model.',
    };
  }

  // Check number of images
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
