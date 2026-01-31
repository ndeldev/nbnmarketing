/**
 * POST /api/image/edit
 *
 * Edit an existing image using Gemini (Nano Banana).
 * Imagen does not support image editing - use Gemini.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createEditJob,
  isGeminiEnabled,
  validatePrompt,
  validateImageConfig,
} from '@/lib/services/gemini';
import type { GeminiImageModel, ImageConfig, ThinkingConfig } from '@/lib/services/gemini';

export async function POST(request: NextRequest) {
  // Feature flag check
  if (!isGeminiEnabled()) {
    return NextResponse.json(
      { error: 'Gemini image generation is not enabled. Set ENABLE_GEMINI_GENERATION=true' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Validate prompt
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const promptValidation = validatePrompt(body.prompt);
    if (!promptValidation.valid) {
      return NextResponse.json(
        { error: promptValidation.error },
        { status: 400 }
      );
    }

    // Validate reference image
    if (!body.referenceImageBase64 || typeof body.referenceImageBase64 !== 'string') {
      return NextResponse.json(
        { error: 'referenceImageBase64 is required and must be a base64 string' },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
    const mimeType = body.referenceImageMimeType || 'image/png';
    if (!validMimeTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: `referenceImageMimeType must be one of: ${validMimeTypes.join(', ')}` },
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

    // Create edit job
    const job = await createEditJob({
      prompt: body.prompt.trim(),
      referenceImageBase64: body.referenceImageBase64,
      referenceImageMimeType: mimeType,
      model: body.model,
      imageConfig,
      thinkingConfig,
    });

    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      service: 'gemini',
      model: job.model,
      statusUrl: `/api/image/status/${job.id}`,
      estimatedDurationSeconds: 20, // Editing may take slightly longer
    }, { status: 202 });

  } catch (error) {
    console.error('Image editing error:', error);

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
      { error: 'Failed to start image editing' },
      { status: 500 }
    );
  }
}
