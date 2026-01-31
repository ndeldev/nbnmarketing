# PRD: Veo 3.1 Video & Image Generation Integration

**Date:** 2026-01-27
**Author:** Claude
**Status:** Draft

---

## Background & Context

Google's Veo 3.1 is a state-of-the-art video generation model available through the Gemini API. It offers high-fidelity video generation with natively generated audio, making it ideal for creating marketing content, social media assets, and investor relations materials.

This PRD outlines the integration of Veo 3.1 capabilities into both the Meridian marketing site and the Mercuria market intelligence platform to enable AI-powered video content generation.

**API Documentation:** https://ai.google.dev/gemini-api/docs/video

---

## Goals

- [ ] Enable text-to-video generation for marketing content
- [ ] Support multiple video resolutions (720p, 1080p, 4K)
- [ ] Generate both landscape (16:9) and portrait (9:16) videos
- [ ] Implement video extension for longer content
- [ ] Enable image-guided video generation using reference images
- [ ] Create reusable video generation service for both Meridian and Mercuria

## Non-Goals

- Real-time video streaming
- Video editing/post-processing features
- User-uploaded video manipulation
- Live video generation during user sessions

---

## Detailed Requirements

### Functional Requirements

#### 1. Text-to-Video Generation
- Generate 8-second videos from text prompts
- **Default to maximum quality settings:**
  - **Resolution:** 4K (ultra high definition)
  - **Duration:** 8 seconds (required for 4K)
  - **Model:** `veo-3.1-generate-preview` (Standard - highest quality)
  - **Frame rate:** 24fps
- Include natively generated audio synchronized with video content
- Support multiple cinematic styles:
  - Dialogue scenes
  - Cinematic realism
  - Creative animation

#### 2. Aspect Ratio Support
- **Landscape (16:9):** Website hero videos, YouTube content, investor presentations
- **Portrait (9:16):** Social media stories, LinkedIn mobile, TikTok-style content

#### 3. Video Extension
- Extend previously generated Veo videos beyond 8 seconds
- Maintain visual and audio continuity
- Support chaining multiple extensions for longer content

#### 4. Frame-Specific Generation
- Specify first frame to control video opening
- Specify last frame to control video ending
- Useful for creating seamless transitions between video segments

#### 5. Image-Based Direction
- Accept up to 3 reference images to guide video content
- Use brand images to maintain visual consistency
- Support product/service imagery for promotional videos

### Use Cases

#### Meridian (Marketing Site)
| Use Case | Description | Aspect Ratio | Resolution |
|----------|-------------|--------------|------------|
| Hero Videos | Dynamic homepage backgrounds | 16:9 | 4K |
| Service Showcases | Animated service explanations | 16:9 | 4K |
| Social Media Ads | LinkedIn/YouTube promotional clips | 16:9 / 9:16 | 4K |
| CEO Messages | Executive video content | 16:9 | 4K |
| Testimonials | Animated client success stories | 16:9 | 4K |

#### Mercuria (Market Intelligence Platform)
| Use Case | Description | Aspect Ratio | Resolution |
|----------|-------------|--------------|------------|
| Market Reports | Animated data visualizations | 16:9 | 4K |
| Issuer Profiles | Company overview videos | 16:9 | 4K |
| Campaign Summaries | Performance highlight reels | 16:9 | 4K |
| Alert Videos | Breaking news/catalyst announcements | 9:16 | 4K |

---

## Technical Approach

### API Integration

```typescript
// Example Veo 3.1 API call structure
interface VeoGenerationRequest {
  prompt: string;
  resolution: '720p' | '1080p' | '4k'; // Default: '4k'
  aspectRatio: '16:9' | '9:16'; // Default: '16:9'
  duration: 8; // Always 8 seconds for 4K quality
  referenceImages?: string[]; // up to 3 URLs
  firstFrame?: string; // image URL
  lastFrame?: string; // image URL
  style?: 'dialogue' | 'cinematic' | 'animation';
}

// Default configuration for maximum quality
const DEFAULT_VEO_CONFIG = {
  resolution: '4k',
  duration: 8,
  model: 'veo-3.1-generate-preview', // Standard model for highest quality
  frameRate: 24,
} as const;

interface VeoGenerationResponse {
  videoUrl: string;
  audioUrl: string;
  duration: number;
  metadata: {
    resolution: string;
    aspectRatio: string;
    generatedAt: string;
  };
}
```

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Video Generation Service              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Queue     │  │   Veo 3.1   │  │  Storage (S3/   │ │
│  │  (Redis)    │──│   API       │──│  GCS)           │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
   │Meridian │     │Mercuria │     │  API    │
   │  Site   │     │Platform │     │Clients  │
   └─────────┘     └─────────┘     └─────────┘
```

### Files to Create

| File | Purpose |
|------|---------|
| `src/lib/services/veo.ts` | Veo 3.1 API client |
| `src/lib/services/video-queue.ts` | Job queue for async generation |
| `src/lib/services/video-cache.ts` | Caching layer for generated videos |
| `src/app/api/video/generate/route.ts` | API endpoint for video generation |
| `src/app/api/video/extend/route.ts` | API endpoint for video extension |
| `src/app/api/video/status/[id]/route.ts` | Generation status endpoint |

### Environment Variables

```env
GOOGLE_AI_API_KEY=your_gemini_api_key
VEO_MODEL=veo-3.1-generate-preview  # Standard model for maximum quality
VEO_DEFAULT_RESOLUTION=4k
VEO_DEFAULT_DURATION=8
VIDEO_STORAGE_BUCKET=meridian-videos
VIDEO_CACHE_TTL=172800  # 48 hours in seconds
VIDEO_QUEUE_REDIS_URL=redis://localhost:6379
```

### Dependencies

```json
{
  "@google/generative-ai": "^0.20.0",
  "bullmq": "^5.0.0",
  "ioredis": "^5.0.0"
}
```

---

## Prompt Engineering Guidelines

Based on the Veo prompt guide, effective prompts should include:

### Structure
1. **Subject:** What/who is in the video
2. **Action:** What is happening
3. **Setting:** Where it takes place
4. **Style:** Visual/cinematic style
5. **Camera:** Movement and framing

### Example Prompts

**Investor Relations Video:**
```
A confident CEO in a modern glass office discusses quarterly results.
Professional cinematic lighting, shallow depth of field.
Camera slowly pushes in during the speech.
Corporate, trustworthy tone with subtle background music.
```

**Market Analysis Video:**
```
Animated stock chart rising with glowing data points.
Financial district skyline in background, golden hour lighting.
Smooth camera pan from left to right.
Professional, modern aesthetic with subtle motion graphics.
```

---

## Testing Plan

### Manual Testing

- [ ] Generate 720p landscape video from text prompt
- [ ] Generate 1080p portrait video for social media
- [ ] Generate 4K video and verify quality
- [ ] Test video extension with 2 chained segments
- [ ] Test image-guided generation with 1, 2, and 3 reference images
- [ ] Test frame-specific generation (first frame only, last frame only, both)
- [ ] Verify audio sync across all generated videos

### Integration Testing

- [ ] API endpoint returns correct response format
- [ ] Job queue properly handles concurrent requests
- [ ] Storage service correctly saves and retrieves videos
- [ ] Error handling for API rate limits
- [ ] Error handling for invalid prompts

---

## Rollback Plan

If issues arise:

1. Disable video generation endpoints via feature flag
2. Fall back to static images/existing video content
3. Queue any pending requests for later processing

### Feature Flag

```typescript
const FEATURES = {
  VEO_VIDEO_GENERATION: process.env.ENABLE_VEO_GENERATION === 'true'
};
```

---

## Timeline

- **Draft:** 2026-01-27
- **Review:** 2026-01-28
- **Implementation Start:** TBD
- **MVP Complete:** TBD

---

## Pricing & Costs

### Default Configuration Cost (4K @ Standard Quality)

| Duration | Cost |
|----------|------|
| 8 seconds (single generation) | **$4.80** |
| 148 seconds (max with extensions) | **$88.80** |

### Full Pricing Reference (Per Second)

| Model | 720p/1080p | 4K |
|-------|------------|-----|
| Veo 3.1 Standard | $0.40/sec | **$0.60/sec** (default) |
| Veo 3.1 Fast | $0.15/sec | $0.35/sec |

*Note: Only successful generations are billed. Failed generations (e.g., audio processing issues) are not charged.*

---

## Technical Specifications

### Maximum Video Length
- **Single generation:** 8 seconds (required for 1080p, 4K, or reference images)
- **With extensions:** Up to **148 seconds** (extend by 7 seconds, up to 20 times)
- **Input video limit:** 141 seconds or less for videos being extended

### Rate Limits
Rate limits vary by quota tier and must be checked in [Google AI Studio](https://aistudio.google.com/usage). Implement exponential backoff for rate limit handling.

### Caching Strategy
- Cache generated videos for 48 hours (matches Google's server retention)
- Use content-addressable storage (hash of prompt + parameters)
- Implement CDN caching for frequently accessed videos

### Model Variants
- `veo-3.1-generate-preview` - Standard quality, best results
- `veo-3.1-fast-generate-preview` - Speed-optimized, lower cost

### Video Specifications
- **Frame rate:** 24fps
- **Server retention:** 2 days (must download/cache before expiry)
- **Audio:** Natively generated, included by default

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-27 | Claude | Initial draft |
