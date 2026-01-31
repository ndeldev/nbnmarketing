/**
 * GET /api/video/download?jobId=xxx
 *
 * Download a completed video and return it as a stream.
 * This proxies the Google video URL with authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/services/veo';
import { getApiKey } from '@/lib/services/veo/config';

export async function GET(request: NextRequest) {
  const jobId = request.nextUrl.searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json(
      { error: 'jobId parameter is required' },
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

  if (job.status !== 'completed' || !job.videoUrl) {
    return NextResponse.json(
      { error: `Job is not ready for download. Status: ${job.status}` },
      { status: 400 }
    );
  }

  try {
    // Fetch the video from Google's URL with API key
    const response = await fetch(job.videoUrl, {
      headers: {
        'x-goog-api-key': getApiKey(),
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status}`);
    }

    // Get the video content
    const videoBuffer = await response.arrayBuffer();

    // Return as MP4 download
    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="video-${jobId}.mp4"`,
        'Content-Length': videoBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Video download error:', error);
    return NextResponse.json(
      { error: 'Failed to download video' },
      { status: 500 }
    );
  }
}
