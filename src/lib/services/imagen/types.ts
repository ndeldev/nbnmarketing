/**
 * Imagen Image Generation Types
 *
 * Supports Imagen 4 models for high-fidelity text-to-image generation.
 */

// =============================================================================
// Model Types
// =============================================================================

/**
 * Available Imagen models
 */
export type ImagenModel =
  | 'imagen-4.0-generate-001'       // Standard quality
  | 'imagen-4.0-ultra-generate-001' // Highest quality
  | 'imagen-4.0-fast-generate-001'; // Fast iterations

/**
 * Image size options
 */
export type ImagenSize = '1K' | '2K';  // Note: 2K only for Ultra/Standard

/**
 * Supported aspect ratios (more limited than Gemini)
 */
export type ImagenAspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

/**
 * Person generation settings
 */
export type ImagenPersonGeneration = 'dont_allow' | 'allow_adult' | 'allow_all';

// =============================================================================
// Input Types
// =============================================================================

/**
 * Configuration for Imagen generation
 */
export interface ImagenConfig {
  numberOfImages?: number;      // 1-4
  imageSize?: ImagenSize;       // '1K' or '2K'
  aspectRatio?: ImagenAspectRatio;
  personGeneration?: ImagenPersonGeneration;
}

/**
 * Input for text-to-image generation
 */
export interface GenerateImagenInput {
  prompt: string;               // Max 480 tokens
  model?: ImagenModel;
  config?: ImagenConfig;
}

// =============================================================================
// Output Types
// =============================================================================

/**
 * Generated image from Imagen
 */
export interface ImagenGeneratedImage {
  base64: string;
  mimeType: 'image/png';
  width?: number;
  height?: number;
}

/**
 * Response from Imagen generation
 */
export interface ImagenResponse {
  images: ImagenGeneratedImage[];
}

// =============================================================================
// Job Types
// =============================================================================

/**
 * Job status states
 */
export type JobStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'expired';

/**
 * Imagen generation job
 */
export interface ImagenJob {
  id: string;
  status: JobStatus;
  model: ImagenModel;
  prompt: string;

  // Configuration
  config?: ImagenConfig;

  // Results
  images?: ImagenGeneratedImage[];

  // Metadata
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;

  // Error handling
  error?: string;
  retryCount: number;
}

/**
 * API response for job status
 */
export interface ImagenJobStatusResponse {
  jobId: string;
  status: JobStatus;
  model: ImagenModel;
  prompt: string;

  // Results (only when completed)
  imageCount?: number;
  images?: Array<{
    index: number;
    downloadUrl: string;
  }>;

  // Timing
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;

  // Error (only when failed)
  error?: string;
}
