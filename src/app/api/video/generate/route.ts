/**
 * POST /api/video/generate
 *
 * Start a new video generation job.
 * Returns immediately with a job ID for polling.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createJob, isVeoEnabled, VEO_CONFIG } from '@/lib/services/veo';
import type { GenerateVideoInput, VeoAspectRatio, VeoResolution, VeoDuration, VeoModel } from '@/lib/services/veo';

export async function POST(request: NextRequest) {
  // Feature flag check
  if (!isVeoEnabled()) {
    return NextResponse.json(
      { error: 'Video generation is not enabled' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const prompt = body.prompt.trim();

    if (prompt.length < VEO_CONFIG.validation.promptMinLength) {
      return NextResponse.json(
        { error: `prompt must be at least ${VEO_CONFIG.validation.promptMinLength} characters` },
        { status: 400 }
      );
    }

    if (prompt.length > VEO_CONFIG.validation.promptMaxLength) {
      return NextResponse.json(
        { error: `prompt must not exceed ${VEO_CONFIG.validation.promptMaxLength} characters` },
        { status: 400 }
      );
    }

    // Validate optional fields
    const validAspectRatios: VeoAspectRatio[] = ['16:9', '9:16'];
    const validResolutions: VeoResolution[] = ['720p', '1080p', '4k'];
    const validDurations: VeoDuration[] = [4, 6, 8];
    const validModels: VeoModel[] = ['veo-3.1-generate-preview', 'veo-3.1-fast-generate-preview'];

    if (body.aspectRatio && !validAspectRatios.includes(body.aspectRatio)) {
      return NextResponse.json(
        { error: `aspectRatio must be one of: ${validAspectRatios.join(', ')}` },
        { status: 400 }
      );
    }

    if (body.resolution && !validResolutions.includes(body.resolution)) {
      return NextResponse.json(
        { error: `resolution must be one of: ${validResolutions.join(', ')}` },
        { status: 400 }
      );
    }

    if (body.durationSeconds && !validDurations.includes(body.durationSeconds)) {
      return NextResponse.json(
        { error: `durationSeconds must be one of: ${validDurations.join(', ')}` },
        { status: 400 }
      );
    }

    if (body.model && !validModels.includes(body.model)) {
      return NextResponse.json(
        { error: `model must be one of: ${validModels.join(', ')}` },
        { status: 400 }
      );
    }

    // 4K and 1080p require 8 second duration
    const resolution = body.resolution || VEO_CONFIG.defaults.resolution;
    const durationSeconds = body.durationSeconds || VEO_CONFIG.defaults.durationSeconds;

    if ((resolution === '4k' || resolution === '1080p') && durationSeconds !== 8) {
      return NextResponse.json(
        { error: `${resolution} resolution requires durationSeconds to be 8` },
        { status: 400 }
      );
    }

    // Validate reference images count
    if (body.referenceImagesBase64 && body.referenceImagesBase64.length > VEO_CONFIG.validation.maxReferenceImages) {
      return NextResponse.json(
        { error: `Maximum ${VEO_CONFIG.validation.maxReferenceImages} reference images allowed` },
        { status: 400 }
      );
    }

    const input: GenerateVideoInput = {
      prompt,
      aspectRatio: body.aspectRatio,
      resolution: body.resolution,
      durationSeconds: body.durationSeconds,
      model: body.model,
      negativePrompt: body.negativePrompt,
      firstFrameBase64: body.firstFrameBase64,
      lastFrameBase64: body.lastFrameBase64,
      referenceImagesBase64: body.referenceImagesBase64,
    };

    const job = await createJob(input);

    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      statusUrl: `/api/video/status/${job.id}`,
      estimatedDurationSeconds: 90, // Conservative estimate
    }, { status: 202 }); // 202 Accepted - processing has started

  } catch (error) {
    console.error('Video generation error:', error);

    if (error instanceof Error && error.message.includes('Maximum concurrent')) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 } // Too Many Requests
      );
    }

    if (error instanceof Error && error.message.includes('GOOGLE_AI_API_KEY')) {
      return NextResponse.json(
        { error: 'Video generation service is not configured' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to start video generation' },
      { status: 500 }
    );
  }
}
