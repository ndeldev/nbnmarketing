/**
 * Gemini Image Generation Types
 *
 * Supports Gemini 3 Pro Image Preview (Nano Banana) for:
 * - Text-to-image generation
 * - Image-to-image editing
 * - Multi-turn editing
 */

// =============================================================================
// Model Types
// =============================================================================

/**
 * Available Gemini image generation models
 */
export type GeminiImageModel =
  | 'gemini-3-pro-image-preview'    // Highest quality, thinking mode
  | 'gemini-2.5-flash-image';       // Fast iterations

/**
 * Image resolution options (must be uppercase)
 */
export type ImageResolution = '1K' | '2K' | '4K';

/**
 * Supported aspect ratios
 */
export type AspectRatio =
  | '1:1'
  | '2:3' | '3:2'
  | '3:4' | '4:3'
  | '4:5' | '5:4'
  | '9:16' | '16:9'
  | '21:9';

/**
 * Person generation settings
 */
export type PersonGeneration = 'ALLOW_ALL' | 'ALLOW_ADULT' | 'DONT_ALLOW';

/**
 * Safety filter levels
 */
export type SafetyFilterLevel =
  | 'BLOCK_NONE'
  | 'BLOCK_LOW_AND_ABOVE'
  | 'BLOCK_MEDIUM_AND_ABOVE'
  | 'BLOCK_HIGH_AND_ABOVE';

// =============================================================================
// Input Types
// =============================================================================

/**
 * Configuration for image generation
 */
export interface ImageConfig {
  aspectRatio?: AspectRatio;
  imageSize?: ImageResolution;
  numberOfImages?: number;
  personGeneration?: PersonGeneration;
  safetyFilterLevel?: SafetyFilterLevel;
}

/**
 * Thinking mode configuration for complex prompts
 */
export interface ThinkingConfig {
  thinkingBudget?: number;  // Token budget for reasoning (e.g., 2048)
}

/**
 * Input for text-to-image generation
 */
export interface GenerateImageInput {
  prompt: string;
  model?: GeminiImageModel;
  imageConfig?: ImageConfig;
  thinkingConfig?: ThinkingConfig;
  useGoogleSearch?: boolean;  // Ground with real-time data
}

/**
 * Input for image-to-image editing
 */
export interface EditImageInput {
  prompt: string;
  referenceImageBase64: string;
  referenceImageMimeType: 'image/png' | 'image/jpeg' | 'image/webp';
  model?: GeminiImageModel;
  imageConfig?: ImageConfig;
  thinkingConfig?: ThinkingConfig;
}

/**
 * Input for multi-turn editing session
 */
export interface MultiTurnEditInput {
  sessionId: string;
  prompt: string;
  imageConfig?: ImageConfig;
}

// =============================================================================
// Output Types
// =============================================================================

/**
 * Generated image result
 */
export interface GeneratedImage {
  base64: string;
  mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
  width?: number;
  height?: number;
}

/**
 * Response from image generation
 */
export interface GenerateImageResponse {
  images: GeneratedImage[];
  text?: string;  // Model may return text alongside images
  thoughtSignature?: string;  // For multi-turn context preservation
}

// =============================================================================
// Job Types (for async processing)
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
 * Image generation job
 */
export interface ImageJob {
  id: string;
  status: JobStatus;
  model: GeminiImageModel;
  prompt: string;

  // Configuration
  imageConfig?: ImageConfig;
  thinkingConfig?: ThinkingConfig;
  hasReferenceImage: boolean;

  // Results
  images?: GeneratedImage[];
  text?: string;
  thoughtSignature?: string;

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
export interface ImageJobStatusResponse {
  jobId: string;
  status: JobStatus;
  model: GeminiImageModel;
  prompt: string;

  // Results (only when completed)
  imageCount?: number;
  images?: Array<{
    index: number;
    downloadUrl: string;
  }>;
  text?: string;

  // Timing
  createdAt: string;
  completedAt?: string;
  expiresAt?: string;

  // Error (only when failed)
  error?: string;
}

// =============================================================================
// Multi-turn Session Types
// =============================================================================

/**
 * Multi-turn editing session
 */
export interface EditSession {
  id: string;
  model: GeminiImageModel;
  history: Array<{
    role: 'user' | 'model';
    prompt?: string;
    images?: GeneratedImage[];
    text?: string;
    timestamp: Date;
  }>;
  thoughtSignature?: string;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
}
