/**
 * POST /api/image/generate
 *
 * Generate images using Gemini (Nano Banana) or Imagen.
 * Returns immediately with a job ID for polling.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createImageJob,
  isGeminiEnabled,
  GEMINI_CONFIG,
  validatePrompt as validateGeminiPrompt,
  validateImageConfig,
} from '@/lib/services/gemini';
import {
  createImagenJob,
  isImagenEnabled,
  IMAGEN_CONFIG,
  validatePrompt as validateImagenPrompt,
  validateConfig as validateImagenConfig,
} from '@/lib/services/imagen';
import type { GeminiImageModel, ImageConfig, ThinkingConfig } from '@/lib/services/gemini';
import type { ImagenModel, ImagenConfig } from '@/lib/services/imagen';

type ServiceType = 'gemini' | 'imagen';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Determine which service to use
    const service: ServiceType = body.service || 'gemini';

    if (service === 'gemini') {
      return handleGeminiGeneration(body);
    } else if (service === 'imagen') {
      return handleImagenGeneration(body);
    } else {
      return NextResponse.json(
        { error: `Invalid service. Must be 'gemini' or 'imagen'` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Image generation error:', error);

    if (error instanceof Error && error.message.includes('Maximum concurrent')) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }

    if (error instanceof Error && error.message.includes('GOOGLE_AI_API_KEY')) {
      return NextResponse.json(
        { error: 'Image generation service is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to start image generation' },
      { status: 500 }
    );
  }
}

/**
 * Handle Gemini (Nano Banana) image generation
 */
async function handleGeminiGeneration(body: {
  prompt?: string;
  model?: GeminiImageModel;
  aspectRatio?: string;
  imageSize?: string;
  numberOfImages?: number;
  useThinking?: boolean;
  thinkingBudget?: number;
  useGoogleSearch?: boolean;
}) {
  // Feature flag check
  if (!isGeminiEnabled()) {
    return NextResponse.json(
      { error: 'Gemini image generation is not enabled. Set ENABLE_GEMINI_GENERATION=true' },
      { status: 503 }
    );
  }

  // Validate prompt
  if (!body.prompt || typeof body.prompt !== 'string') {
    return NextResponse.json(
      { error: 'prompt is required and must be a string' },
      { status: 400 }
    );
  }

  const promptValidation = validateGeminiPrompt(body.prompt);
  if (!promptValidation.valid) {
    return NextResponse.json(
      { error: promptValidation.error },
      { status: 400 }
    );
  }

  // Validate model
  const validModels: GeminiImageModel[] = ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'];
  if (body.model && !validModels.includes(body.model)) {
    return NextResponse.json(
      { error: `model must be one of: ${validModels.join(', ')}` },
      { status: 400 }
    );
  }

  // Validate image config
  const configValidation = validateImageConfig({
    aspectRatio: body.aspectRatio,
    imageSize: body.imageSize,
    numberOfImages: body.numberOfImages,
  });
  if (!configValidation.valid) {
    return NextResponse.json(
      { error: configValidation.error },
      { status: 400 }
    );
  }

  // Build image config
  const imageConfig: ImageConfig = {};
  if (body.aspectRatio) imageConfig.aspectRatio = body.aspectRatio as ImageConfig['aspectRatio'];
  if (body.imageSize) imageConfig.imageSize = body.imageSize as ImageConfig['imageSize'];
  if (body.numberOfImages) imageConfig.numberOfImages = body.numberOfImages;

  // Build thinking config
  let thinkingConfig: ThinkingConfig | undefined;
  if (body.useThinking) {
    thinkingConfig = {
      thinkingBudget: body.thinkingBudget || 2048,
    };
  }

  // Create job
  const job = await createImageJob({
    prompt: body.prompt.trim(),
    model: body.model,
    imageConfig,
    thinkingConfig,
    useGoogleSearch: body.useGoogleSearch,
  });

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    service: 'gemini',
    model: job.model,
    statusUrl: `/api/image/status/${job.id}`,
    estimatedDurationSeconds: 15, // Gemini is relatively fast
  }, { status: 202 });
}

/**
 * Handle Imagen text-to-image generation
 */
async function handleImagenGeneration(body: {
  prompt?: string;
  model?: ImagenModel;
  aspectRatio?: string;
  imageSize?: string;
  numberOfImages?: number;
  personGeneration?: string;
}) {
  // Feature flag check
  if (!isImagenEnabled()) {
    return NextResponse.json(
      { error: 'Imagen generation is not enabled. Set ENABLE_IMAGEN_GENERATION=true' },
      { status: 503 }
    );
  }

  // Validate prompt
  if (!body.prompt || typeof body.prompt !== 'string') {
    return NextResponse.json(
      { error: 'prompt is required and must be a string' },
      { status: 400 }
    );
  }

  const promptValidation = validateImagenPrompt(body.prompt);
  if (!promptValidation.valid) {
    return NextResponse.json(
      { error: promptValidation.error },
      { status: 400 }
    );
  }

  // Validate model
  const validModels: ImagenModel[] = [
    'imagen-4.0-generate-001',
    'imagen-4.0-ultra-generate-001',
    'imagen-4.0-fast-generate-001',
  ];
  const model = body.model || IMAGEN_CONFIG.defaults.model;
  if (body.model && !validModels.includes(body.model)) {
    return NextResponse.json(
      { error: `model must be one of: ${validModels.join(', ')}` },
      { status: 400 }
    );
  }

  // Validate config
  const configValidation = validateImagenConfig(model, {
    aspectRatio: body.aspectRatio,
    imageSize: body.imageSize,
    numberOfImages: body.numberOfImages,
  });
  if (!configValidation.valid) {
    return NextResponse.json(
      { error: configValidation.error },
      { status: 400 }
    );
  }

  // Build config
  const config: ImagenConfig = {};
  if (body.aspectRatio) config.aspectRatio = body.aspectRatio as ImagenConfig['aspectRatio'];
  if (body.imageSize) config.imageSize = body.imageSize as ImagenConfig['imageSize'];
  if (body.numberOfImages) config.numberOfImages = body.numberOfImages;
  if (body.personGeneration) {
    config.personGeneration = body.personGeneration as ImagenConfig['personGeneration'];
  }

  // Create job
  const job = await createImagenJob({
    prompt: body.prompt.trim(),
    model: body.model,
    config,
  });

  return NextResponse.json({
    jobId: job.id,
    status: job.status,
    service: 'imagen',
    model: job.model,
    statusUrl: `/api/image/status/${job.id}`,
    estimatedDurationSeconds: 10, // Imagen is fast
  }, { status: 202 });
}
