/**
 * Veo 3.1 Video Generation Types
 *
 * TypeScript interfaces for Google's Veo API and internal job management.
 */

// ============================================
// Veo API Types (matches Google's API)
// ============================================

export type VeoModel =
  | 'veo-3.1-generate-preview'      // Standard (highest quality)
  | 'veo-3.1-fast-generate-preview'; // Fast (lower cost)

export type VeoResolution = '720p' | '1080p' | '4k';
export type VeoAspectRatio = '16:9' | '9:16';
export type VeoDuration = 4 | 6 | 8;

export interface VeoImageInput {
  inlineData: {
    mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
    data: string; // base64
  };
}

export interface VeoVideoInput {
  inlineData: {
    mimeType: 'video/mp4';
    data: string; // base64
  };
}

export interface VeoReferenceImage {
  image: VeoImageInput;
  referenceType: 'asset' | 'style';
}

export interface VeoGenerateRequest {
  instances: [{
    prompt: string;
    image?: VeoImageInput;    // First frame (image-guided)
    video?: VeoVideoInput;    // For extension
  }];
  parameters: {
    aspectRatio?: VeoAspectRatio;
    resolution?: VeoResolution;
    durationSeconds?: VeoDuration;
    negativePrompt?: string;
    lastFrame?: VeoImageInput;
    referenceImages?: VeoReferenceImage[];
    numberOfVideos?: 1;
    seed?: number;
  };
}

export interface VeoOperationResponse {
  name: string; // e.g., "operations/ABC123..."
  done?: boolean;
  error?: {
    code: number;
    message: string;
  };
  response?: {
    generateVideoResponse: {
      generatedSamples: Array<{
        video: {
          uri: string;
        };
      }>;
    };
  };
}

// ============================================
// Application Types (our abstraction layer)
// ============================================

export type JobStatus =
  | 'pending'      // Submitted to Veo, awaiting operation name
  | 'processing'   // Have operation name, polling for completion
  | 'completed'    // Video URL available
  | 'failed'       // Error occurred
  | 'expired';     // Video URL expired (2hr retention)

export interface VideoJob {
  id: string;                        // UUID
  status: JobStatus;
  prompt: string;

  // Configuration
  model: VeoModel;
  resolution: VeoResolution;
  aspectRatio: VeoAspectRatio;
  durationSeconds: VeoDuration;

  // Tracking
  operationName?: string;            // From Veo API
  videoUrl?: string;                 // Final video URL
  videoExpiresAt?: Date;             // 2hr after generation

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  // Error handling
  error?: string;
  retryCount: number;
}

export interface GenerateVideoInput {
  prompt: string;
  aspectRatio?: VeoAspectRatio;
  resolution?: VeoResolution;
  durationSeconds?: VeoDuration;
  model?: VeoModel;
  negativePrompt?: string;
  firstFrameBase64?: string;
  lastFrameBase64?: string;
  referenceImagesBase64?: string[];
}

export interface ExtendVideoInput {
  sourceVideoBase64: string;
  prompt?: string;                   // Optional continuation prompt
  durationSeconds?: VeoDuration;
}

export interface VideoStatusResponse {
  jobId: string;
  status: JobStatus;
  videoUrl?: string;
  expiresAt?: string;                // ISO timestamp
  error?: string;
  progress?: {
    elapsedSeconds: number;
    estimatedTotalSeconds: number;
  };
}
