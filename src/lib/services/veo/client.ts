/**
 * Veo 3.1 API Client
 *
 * Uses the official @google/genai SDK for video generation.
 */

import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import type {
  VeoOperationResponse,
  GenerateVideoInput,
  ExtendVideoInput,
} from './types';
import { VEO_CONFIG, getApiKey } from './config';

/**
 * Custom error class for Veo API errors
 */
export class VeoApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: string
  ) {
    super(message);
    this.name = 'VeoApiError';
  }
}

/**
 * Veo API Client
 *
 * Handles all communication with Google's Veo 3.1 API using the official SDK.
 */
export class VeoClient {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: getApiKey() });
  }

  /**
   * Submit video generation request and poll until complete
   * @returns Video URL when generation completes
   */
  async generateVideo(input: GenerateVideoInput): Promise<string> {
    const model = input.model || VEO_CONFIG.defaults.model;

    try {
      console.log('Starting video generation:', {
        model,
        prompt: input.prompt.substring(0, 100) + '...',
        aspectRatio: input.aspectRatio || VEO_CONFIG.defaults.aspectRatio,
      });

      // Start the generation
      let operation: GenerateVideosOperation = await this.ai.models.generateVideos({
        model,
        prompt: input.prompt,
        config: {
          aspectRatio: input.aspectRatio || VEO_CONFIG.defaults.aspectRatio,
          ...(input.negativePrompt && { negativePrompt: input.negativePrompt }),
        },
      });

      console.log('Generation started, operation name:', operation.name);

      // Poll until complete
      let pollCount = 0;
      while (!operation.done && pollCount < VEO_CONFIG.polling.maxAttempts) {
        pollCount++;
        console.log(`Polling attempt ${pollCount}/${VEO_CONFIG.polling.maxAttempts}...`);

        await new Promise(resolve => setTimeout(resolve, VEO_CONFIG.polling.intervalMs));

        operation = await this.ai.operations.getVideosOperation({
          operation,
        });
      }

      if (!operation.done) {
        throw new VeoApiError('Video generation timed out', 408);
      }

      if (operation.error) {
        throw new VeoApiError(
          `Video generation failed: ${JSON.stringify(operation.error)}`,
          500,
          JSON.stringify(operation.error)
        );
      }

      // Extract video URL
      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

      if (!videoUri) {
        throw new VeoApiError('No video URL in response', 500);
      }

      console.log('Video generation complete:', videoUri);
      return videoUri;

    } catch (error) {
      console.error('Veo generation error:', error);

      if (error instanceof VeoApiError) {
        throw error;
      }

      throw new VeoApiError(
        `Video generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500,
        error instanceof Error ? error.stack : undefined
      );
    }
  }

  /**
   * Generate video with a reference image as first frame
   * If lastFrameBase64 is provided, creates an interpolation (seamless loop when same as first)
   */
  async generateVideoWithImage(
    input: GenerateVideoInput,
    imageBase64: string,
    mimeType: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/jpeg',
    lastFrameBase64?: string
  ): Promise<string> {
    const model = input.model || VEO_CONFIG.defaults.model;

    try {
      const isLooping = lastFrameBase64 === imageBase64 || input.lastFrameBase64 === imageBase64;
      console.log('Starting image-guided video generation:', {
        model,
        prompt: input.prompt.substring(0, 100) + '...',
        hasLastFrame: !!(lastFrameBase64 || input.lastFrameBase64),
        isLooping,
      });

      // Build config with optional last_frame for interpolation
      const config: Record<string, unknown> = {
        aspectRatio: input.aspectRatio || VEO_CONFIG.defaults.aspectRatio,
        ...(input.negativePrompt && { negativePrompt: input.negativePrompt }),
      };

      // Add last_frame for seamless looping (same image = perfect loop)
      const lastFrame = lastFrameBase64 || input.lastFrameBase64;
      if (lastFrame) {
        config.lastFrame = {
          imageBytes: lastFrame,
          mimeType,
        };
      }

      // Start the generation with image
      let operation: GenerateVideosOperation = await this.ai.models.generateVideos({
        model,
        prompt: input.prompt,
        image: {
          imageBytes: imageBase64,
          mimeType,
        },
        config,
      });

      console.log('Generation started with image, operation name:', operation.name);

      // Poll until complete
      let pollCount = 0;
      while (!operation.done && pollCount < VEO_CONFIG.polling.maxAttempts) {
        pollCount++;
        console.log(`Polling attempt ${pollCount}/${VEO_CONFIG.polling.maxAttempts}...`);

        await new Promise(resolve => setTimeout(resolve, VEO_CONFIG.polling.intervalMs));

        operation = await this.ai.operations.getVideosOperation({
          operation,
        });
      }

      if (!operation.done) {
        throw new VeoApiError('Video generation timed out', 408);
      }

      if (operation.error) {
        throw new VeoApiError(
          `Video generation failed: ${JSON.stringify(operation.error)}`,
          500
        );
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

      if (!videoUri) {
        throw new VeoApiError('No video URL in response', 500);
      }

      console.log('Video generation complete:', videoUri);
      return videoUri;

    } catch (error) {
      console.error('Veo image-guided generation error:', error);

      if (error instanceof VeoApiError) {
        throw error;
      }

      throw new VeoApiError(
        `Video generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }

  /**
   * Extend an existing video (not yet implemented in SDK)
   */
  async extendVideo(input: ExtendVideoInput): Promise<string> {
    throw new VeoApiError('Video extension not yet supported', 501);
  }

  /**
   * Download video to a file path
   */
  async downloadVideo(videoFile: { uri?: string }, outputPath: string): Promise<void> {
    try {
      await this.ai.files.download({
        file: videoFile,
        downloadPath: outputPath,
      });
    } catch (error) {
      throw new VeoApiError(
        `Video download failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }
}
