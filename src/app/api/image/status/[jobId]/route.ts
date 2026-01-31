/**
 * GET /api/image/status/[jobId]
 *
 * Get the status of an image generation job.
 * Supports both Gemini and Imagen jobs.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getJob as getGeminiJob } from '@/lib/services/gemini';
import { getJob as getImagenJob } from '@/lib/services/imagen';
import type { ImageJob } from '@/lib/services/gemini';
import type { ImagenJob } from '@/lib/services/imagen';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  if (!jobId) {
    return NextResponse.json(
      { error: 'jobId is required' },
      { status: 400 }
    );
  }

  // Try to find job in Gemini store first, then Imagen
  const geminiJob = getGeminiJob(jobId);
  const imagenJob = !geminiJob ? getImagenJob(jobId) : undefined;
  const service: 'gemini' | 'imagen' = geminiJob ? 'gemini' : 'imagen';

  // Use a common job reference
  const job: ImageJob | ImagenJob | undefined = geminiJob || imagenJob;

  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  // Build response
  const response: Record<string, unknown> = {
    jobId: job.id,
    status: job.status,
    service,
    model: job.model,
    prompt: job.prompt,
    createdAt: job.createdAt.toISOString(),
  };

  if (job.startedAt) {
    response.startedAt = job.startedAt.toISOString();
  }

  if (job.completedAt) {
    response.completedAt = job.completedAt.toISOString();
  }

  if (job.expiresAt) {
    response.expiresAt = job.expiresAt.toISOString();
  }

  // Add results for completed jobs
  if (job.status === 'completed' && job.images) {
    response.imageCount = job.images.length;
    response.images = job.images.map((img, index) => ({
      index,
      downloadUrl: `/api/image/download?jobId=${job.id}&index=${index}`,
      mimeType: img.mimeType,
    }));

    // Include text response if present (Gemini only)
    if (geminiJob && 'text' in geminiJob && geminiJob.text) {
      response.text = geminiJob.text;
    }
  }

  // Add error for failed jobs
  if (job.status === 'failed' && job.error) {
    response.error = job.error;
  }

  // Prevent caching of status
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}
