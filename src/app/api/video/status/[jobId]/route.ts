/**
 * GET /api/video/status/[jobId]
 *
 * Poll the status of a video generation job.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/services/veo';
import type { VideoStatusResponse } from '@/lib/services/veo';

interface RouteParams {
  params: Promise<{ jobId: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { jobId } = await params;

  if (!jobId) {
    return NextResponse.json(
      { error: 'Job ID is required' },
      { status: 400 }
    );
  }

  const job = getJob(jobId);

  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  const response: VideoStatusResponse = {
    jobId: job.id,
    status: job.status,
    ...(job.videoUrl && { videoUrl: job.videoUrl }),
    ...(job.videoExpiresAt && { expiresAt: job.videoExpiresAt.toISOString() }),
    ...(job.error && { error: job.error }),
    ...(job.status === 'processing' && {
      progress: {
        elapsedSeconds: Math.floor((Date.now() - job.createdAt.getTime()) / 1000),
        estimatedTotalSeconds: 90, // Average generation time
      },
    }),
  };

  // Add cache headers to prevent aggressive client caching
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}
