/**
 * Imagen Image Generation Client
 *
 * Handles communication with Google's Imagen API for text-to-image generation.
 */

import { GoogleGenAI } from '@google/genai';
import { getApiKey, IMAGEN_CONFIG, getModel } from './config';
import type {
  ImagenModel,
  GenerateImagenInput,
  ImagenResponse,
  ImagenGeneratedImage,
  ImagenConfig,
} from './types';

// =============================================================================
// Custom Error Class
// =============================================================================

export class ImagenApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ImagenApiError';
  }
}

// =============================================================================
// Imagen Client Class
// =============================================================================

export class ImagenClient {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: getApiKey() });
  }

  /**
   * Generate images from text prompt using Imagen
   */
  async generateImages(input: GenerateImagenInput): Promise<ImagenResponse> {
    const model = input.model || getModel();
    const config = input.config || {};

    console.log('Starting Imagen generation:', {
      model,
      promptLength: input.prompt.length,
      numberOfImages: config.numberOfImages || IMAGEN_CONFIG.defaults.numberOfImages,
      imageSize: config.imageSize || IMAGEN_CONFIG.defaults.imageSize,
      aspectRatio: config.aspectRatio || IMAGEN_CONFIG.defaults.aspectRatio,
    });

    try {
      // Build generation config
      const generateConfig = this.buildConfig(config);

      // Make API call using the dedicated generateImages method
      const response = await this.ai.models.generateImages({
        model,
        prompt: input.prompt,
        config: generateConfig,
      });

      // Parse response
      return this.parseResponse(response);
    } catch (error) {
      console.error('Imagen generation error:', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Generate multiple variations with different prompts (batch)
   */
  async generateBatch(
    prompts: string[],
    options?: {
      model?: ImagenModel;
      config?: ImagenConfig;
    }
  ): Promise<ImagenResponse[]> {
    const results: ImagenResponse[] = [];

    for (const prompt of prompts) {
      const result = await this.generateImages({
        prompt,
        model: options?.model,
        config: options?.config,
      });
      results.push(result);
    }

    return results;
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  /**
   * Build generation config from options
   * Note: personGeneration is excluded due to SDK type issues - uses default
   */
  private buildConfig(config: ImagenConfig) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {
      numberOfImages: config.numberOfImages || IMAGEN_CONFIG.defaults.numberOfImages,
      aspectRatio: config.aspectRatio || IMAGEN_CONFIG.defaults.aspectRatio,
    };

    // Only add imageSize for non-fast models (handled by validation)
    if (config.imageSize) {
      result.imageSize = config.imageSize;
    } else {
      result.imageSize = IMAGEN_CONFIG.defaults.imageSize;
    }

    // Add personGeneration if specified (SDK uses uppercase enum values)
    if (config.personGeneration) {
      const personGenerationMap: Record<string, string> = {
        'dont_allow': 'DONT_ALLOW',
        'allow_adult': 'ALLOW_ADULT',
        'allow_all': 'ALLOW_ALL',
      };
      result.personGeneration = personGenerationMap[config.personGeneration];
    }

    return result;
  }

  /**
   * Parse API response into ImagenResponse
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseResponse(response: any): ImagenResponse {
    const images: ImagenGeneratedImage[] = [];

    // Handle the generatedImages array from Imagen API
    const generatedImages = response.generatedImages || response.generated_images || [];

    for (const genImage of generatedImages) {
      // Handle different response formats
      if (genImage.image) {
        // Format: { image: { imageBytes: base64 } }
        const imageData = genImage.image;
        if (imageData.imageBytes) {
          images.push({
            base64: imageData.imageBytes,
            mimeType: 'image/png',
          });
        } else if (imageData.data) {
          images.push({
            base64: imageData.data,
            mimeType: 'image/png',
          });
        }
      } else if (genImage.imageBytes) {
        // Format: { imageBytes: base64 }
        images.push({
          base64: genImage.imageBytes,
          mimeType: 'image/png',
        });
      } else if (genImage.data) {
        // Format: { data: base64 }
        images.push({
          base64: genImage.data,
          mimeType: 'image/png',
        });
      }
    }

    if (images.length === 0) {
      throw new ImagenApiError('No images returned from API', 500, response);
    }

    console.log(`Imagen generated ${images.length} images`);

    return { images };
  }

  /**
   * Wrap errors in ImagenApiError
   */
  private wrapError(error: unknown): ImagenApiError {
    if (error instanceof ImagenApiError) {
      return error;
    }

    if (error instanceof Error) {
      const message = error.message;

      if (message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED')) {
        return new ImagenApiError(
          'API quota exceeded. Please try again later.',
          429,
          error
        );
      }

      if (message.includes('401') || message.includes('authentication') || message.includes('API key')) {
        return new ImagenApiError(
          'Authentication failed. Check your API key.',
          401,
          error
        );
      }

      if (message.includes('400') || message.includes('invalid')) {
        return new ImagenApiError(
          `Invalid request: ${message}`,
          400,
          error
        );
      }

      return new ImagenApiError(
        `Image generation failed: ${message}`,
        500,
        error
      );
    }

    return new ImagenApiError(
      'Unknown error during image generation',
      500,
      error
    );
  }
}
