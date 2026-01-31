/**
 * Gemini Image Generation Client
 *
 * Handles communication with Google's Gemini API for image generation.
 * Supports text-to-image, image editing, and multi-turn editing.
 */

import { GoogleGenAI } from '@google/genai';
import { getApiKey, GEMINI_CONFIG, getModel } from './config';
import type {
  GeminiImageModel,
  GenerateImageInput,
  EditImageInput,
  GenerateImageResponse,
  GeneratedImage,
  ImageConfig,
  ThinkingConfig,
} from './types';

// =============================================================================
// Custom Error Class
// =============================================================================

export class GeminiApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

// =============================================================================
// Gemini Client Class
// =============================================================================

export class GeminiClient {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: getApiKey() });
  }

  /**
   * Generate images from text prompt
   */
  async generateImage(input: GenerateImageInput): Promise<GenerateImageResponse> {
    const model = input.model || getModel();

    console.log('Starting Gemini image generation:', {
      model,
      promptLength: input.prompt.length,
      aspectRatio: input.imageConfig?.aspectRatio || GEMINI_CONFIG.defaults.aspectRatio,
      resolution: input.imageConfig?.imageSize || GEMINI_CONFIG.defaults.resolution,
      numberOfImages: input.imageConfig?.numberOfImages || GEMINI_CONFIG.defaults.numberOfImages,
      useThinking: !!input.thinkingConfig,
      useGoogleSearch: !!input.useGoogleSearch,
    });

    try {
      // Build configuration
      const config = this.buildConfig(input.imageConfig, input.thinkingConfig, input.useGoogleSearch);

      // Make API call
      const response = await this.ai.models.generateContent({
        model,
        contents: [input.prompt],
        config,
      });

      // Parse response
      return this.parseResponse(response);
    } catch (error) {
      console.error('Gemini image generation error:', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Edit an existing image with text instructions
   */
  async editImage(input: EditImageInput): Promise<GenerateImageResponse> {
    const model = input.model || getModel();

    console.log('Starting Gemini image editing:', {
      model,
      promptLength: input.prompt.length,
      referenceImageMimeType: input.referenceImageMimeType,
      aspectRatio: input.imageConfig?.aspectRatio,
      resolution: input.imageConfig?.imageSize,
    });

    try {
      // Build configuration
      const config = this.buildConfig(input.imageConfig, input.thinkingConfig, false);

      // Build contents with image
      const contents = [
        input.prompt,
        {
          inlineData: {
            mimeType: input.referenceImageMimeType,
            data: input.referenceImageBase64,
          },
        },
      ];

      // Make API call
      const response = await this.ai.models.generateContent({
        model,
        contents,
        config,
      });

      // Parse response
      return this.parseResponse(response);
    } catch (error) {
      console.error('Gemini image editing error:', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Create a multi-turn editing chat session
   */
  createEditSession(model?: GeminiImageModel) {
    const selectedModel = model || getModel();

    console.log('Creating Gemini multi-turn edit session:', { model: selectedModel });

    return this.ai.chats.create({
      model: selectedModel,
    });
  }

  /**
   * Send message in multi-turn session
   */
  async sendEditMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chat: any,  // Chat session from createEditSession
    prompt: string,
    imageConfig?: ImageConfig
  ): Promise<GenerateImageResponse> {
    console.log('Sending multi-turn edit message:', {
      promptLength: prompt.length,
      aspectRatio: imageConfig?.aspectRatio,
      resolution: imageConfig?.imageSize,
    });

    try {
      const config = this.buildConfig(imageConfig, undefined, false);

      const response = await chat.sendMessage(prompt, { config });

      return this.parseResponse(response);
    } catch (error) {
      console.error('Gemini multi-turn edit error:', error);
      throw this.wrapError(error);
    }
  }

  /**
   * Generate with multiple reference images (up to 14)
   */
  async generateWithReferences(
    prompt: string,
    referenceImages: Array<{
      base64: string;
      mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
    }>,
    options?: {
      model?: GeminiImageModel;
      imageConfig?: ImageConfig;
      thinkingConfig?: ThinkingConfig;
    }
  ): Promise<GenerateImageResponse> {
    const model = options?.model || getModel();

    if (referenceImages.length > GEMINI_CONFIG.validation.maxReferenceImages) {
      throw new GeminiApiError(
        `Too many reference images. Maximum: ${GEMINI_CONFIG.validation.maxReferenceImages}`,
        400
      );
    }

    console.log('Starting Gemini generation with references:', {
      model,
      promptLength: prompt.length,
      referenceCount: referenceImages.length,
    });

    try {
      // Build contents with all reference images
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contents: any[] = [prompt];
      for (const img of referenceImages) {
        contents.push({
          inlineData: {
            mimeType: img.mimeType,
            data: img.base64,
          },
        });
      }

      const config = this.buildConfig(
        options?.imageConfig,
        options?.thinkingConfig,
        false
      );

      const response = await this.ai.models.generateContent({
        model,
        contents,
        config,
      });

      return this.parseResponse(response);
    } catch (error) {
      console.error('Gemini reference generation error:', error);
      throw this.wrapError(error);
    }
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  /**
   * Build GenerateContentConfig from options
   */
  private buildConfig(
    imageConfig?: ImageConfig,
    thinkingConfig?: ThinkingConfig,
    useGoogleSearch?: boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: {
        aspectRatio: imageConfig?.aspectRatio || GEMINI_CONFIG.defaults.aspectRatio,
        imageSize: imageConfig?.imageSize || GEMINI_CONFIG.defaults.resolution,
        numberOfImages: imageConfig?.numberOfImages || GEMINI_CONFIG.defaults.numberOfImages,
      },
    };

    // Add person generation if specified
    if (imageConfig?.personGeneration) {
      config.imageConfig.personGeneration = imageConfig.personGeneration;
    }

    // Add safety filter if specified
    if (imageConfig?.safetyFilterLevel) {
      config.imageConfig.safetyFilterLevel = imageConfig.safetyFilterLevel;
    }

    // Add thinking mode if specified
    if (thinkingConfig?.thinkingBudget) {
      config.thinkingConfig = {
        thinkingBudget: thinkingConfig.thinkingBudget,
      };
    }

    // Add Google Search grounding if requested
    if (useGoogleSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    return config;
  }

  /**
   * Parse API response into GenerateImageResponse
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseResponse(response: any): GenerateImageResponse {
    const images: GeneratedImage[] = [];
    let text: string | undefined;
    let thoughtSignature: string | undefined;

    // Handle candidates structure
    const candidates = response.candidates || [response];

    for (const candidate of candidates) {
      const content = candidate.content || candidate;
      const parts = content?.parts || [];

      for (const part of parts) {
        // Check for text
        if (part.text) {
          text = (text || '') + part.text;
        }

        // Check for image
        if (part.inlineData) {
          images.push({
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType,
          });
        }

        // Alternative: check for asImage method (SDK helper)
        if (typeof part.asImage === 'function') {
          try {
            const image = part.asImage();
            if (image) {
              // Convert PIL-style image to base64 if needed
              images.push({
                base64: image.data || image,
                mimeType: 'image/png',
              });
            }
          } catch {
            // asImage not available for this part
          }
        }

        // Check for thought signature
        if (part.thoughtSignature) {
          thoughtSignature = part.thoughtSignature;
        }
      }
    }

    if (images.length === 0 && !text) {
      throw new GeminiApiError('No images or text returned from API', 500, response);
    }

    return {
      images,
      text,
      thoughtSignature,
    };
  }

  /**
   * Wrap errors in GeminiApiError
   */
  private wrapError(error: unknown): GeminiApiError {
    if (error instanceof GeminiApiError) {
      return error;
    }

    if (error instanceof Error) {
      // Check for specific error types
      const message = error.message;

      if (message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED')) {
        return new GeminiApiError(
          'API quota exceeded. Please try again later.',
          429,
          error
        );
      }

      if (message.includes('401') || message.includes('authentication') || message.includes('API key')) {
        return new GeminiApiError(
          'Authentication failed. Check your API key.',
          401,
          error
        );
      }

      if (message.includes('400') || message.includes('invalid')) {
        return new GeminiApiError(
          `Invalid request: ${message}`,
          400,
          error
        );
      }

      return new GeminiApiError(
        `Image generation failed: ${message}`,
        500,
        error
      );
    }

    return new GeminiApiError(
      'Unknown error during image generation',
      500,
      error
    );
  }
}
