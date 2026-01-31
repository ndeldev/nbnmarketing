/**
 * GET /api/image/download
 *
 * Download a generated image by job ID and index.
 * Supports both Gemini and Imagen jobs.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getJob as getGeminiJob, getJobImages as getGeminiImages } from '@/lib/services/gemini';
import { getJob as getImagenJob, getJobImages as getImagenImages } from '@/lib/services/imagen';
import type { GeneratedImage } from '@/lib/services/gemini';
import type { ImagenGeneratedImage } from '@/lib/services/imagen';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jobId = searchParams.get('jobId');
  const indexStr = searchParams.get('index');

  if (!jobId) {
    return NextResponse.json(
      { error: 'jobId is required' },
      { status: 400 }
    );
  }

  const index = indexStr ? parseInt(indexStr, 10) : 0;
  if (isNaN(index) || index < 0) {
    return NextResponse.json(
      { error: 'index must be a non-negative integer' },
      { status: 400 }
    );
  }

  // Try to find job in Gemini store first, then Imagen
  const geminiJob = getGeminiJob(jobId);
  const imagenJob = !geminiJob ? getImagenJob(jobId) : undefined;

  let images: GeneratedImage[] | ImagenGeneratedImage[] | undefined;
  let service: 'gemini' | 'imagen' = 'gemini';
  let model: string | undefined;
  let status: string | undefined;

  if (geminiJob) {
    images = getGeminiImages(jobId);
    service = 'gemini';
    model = geminiJob.model;
    status = geminiJob.status;
  } else if (imagenJob) {
    images = getImagenImages(jobId);
    service = 'imagen';
    model = imagenJob.model;
    status = imagenJob.status;
  }

  if (!geminiJob && !imagenJob) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  if (status !== 'completed') {
    return NextResponse.json(
      { error: `Job is not completed. Current status: ${status}` },
      { status: 400 }
    );
  }

  if (!images || images.length === 0) {
    return NextResponse.json(
      { error: 'No images available for this job' },
      { status: 404 }
    );
  }

  if (index >= images.length) {
    return NextResponse.json(
      { error: `Image index ${index} not found. Available: 0-${images.length - 1}` },
      { status: 404 }
    );
  }

  const image = images[index];

  // Decode base64 to buffer
  const imageBuffer = Buffer.from(image.base64, 'base64');

  // Determine file extension from mime type
  const extension = image.mimeType === 'image/png' ? 'png' :
                    image.mimeType === 'image/jpeg' ? 'jpg' :
                    image.mimeType === 'image/webp' ? 'webp' : 'png';

  // Generate filename
  const filename = `${service}-${model}-${jobId.slice(0, 8)}-${index}.${extension}`;

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': image.mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': imageBuffer.length.toString(),
      'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
    },
  });
}
