/**
 * POST /api/video/extend
 *
 * Extend an existing Veo-generated video.
 * Note: This is a stub for future implementation.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isVeoEnabled } from '@/lib/services/veo';

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

    // Validate required field
    if (!body.sourceVideoBase64) {
      return NextResponse.json(
        { error: 'sourceVideoBase64 is required' },
        { status: 400 }
      );
    }

    // TODO: Implement video extension
    // This will follow the same pattern as generate:
    // 1. Create a job
    // 2. Call VeoClient.extendVideo()
    // 3. Poll for completion
    //
    // Constraints from Veo API:
    // - Source video must be a Veo-generated video
    // - Extension is limited to 720p resolution
    // - Each extension adds up to 7 seconds
    // - Maximum total length: 148 seconds

    return NextResponse.json(
      {
        error: 'Video extension is not yet implemented',
        message: 'This feature will be available in a future update',
      },
      { status: 501 } // Not Implemented
    );

  } catch (error) {
    console.error('Video extension error:', error);
    return NextResponse.json(
      { error: 'Failed to process extension request' },
      { status: 500 }
    );
  }
}
