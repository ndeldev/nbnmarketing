# PRD: Meridian Hero Video Generation

**Date:** 2026-01-27
**Author:** Claude
**Status:** Paused
**Reference Image:** `Generated Image January 27, 2026 - 8_33PM.jpeg`

---

## Overview

Generate a cinematic hero video for the Meridian marketing site homepage using Google's Veo 3.1 API. The video animates the existing hero image showing a solitary figure on a rocky outcrop overlooking a quarry under a starlit sky with aurora and falling snow.

**Key Requirement:** Video must create a **seamless loop** for use as a website hero background.

---

## Generated Videos

| Version | File | Size | Description | Loop? |
|---------|------|------|-------------|-------|
| v1 | `meridian-hero-v1.mp4` | 5.2 MB | Man walking away, disappearing | No |
| v2 | `meridian-hero-v2-loop.mp4` | 3.3 MB | Man standing, flashlight sweeping | Partial |
| v3 | `meridian-hero-v3-loop.mp4` | 1.3 MB | Interpolation loop (first=last frame) | Yes |
| v4a | `meridian-hero-v4a-intro.mp4` | 3.3 MB | Intro: flashlight points to quarry | No |
| v4b | `meridian-hero-v4b-loop.mp4` | 1.0 MB | Loop: light on quarry with waver | Yes |
| v5a | `meridian-hero-v5a-intro.mp4` | 3.7 MB | Intro: flashlight raises to quarry | No |
| v5b | `meridian-hero-v5b-loop.mp4` | 841 KB | Loop: continues from v5a | Yes |
| v6a | `meridian-hero-v6a-intro.mp4` | 3.5 MB | Intro: smaller flashlight movement | No |

---

## Seamless Loop Techniques

### Technique 1: First/Last Frame Interpolation (RECOMMENDED)

Veo 3.1 supports interpolation by specifying both first and last frames. When both are the **same image**, Veo generates video that naturally returns to the starting position.

```typescript
// API Call for seamless loop
{
  prompt: "...",
  firstFrameBase64: imageBase64,
  lastFrameBase64: imageBase64,  // SAME as first frame!
  resolution: "4k",
  aspectRatio: "16:9",
  durationSeconds: 8
}
```

**SDK Code:**
```javascript
const operation = await ai.models.generateVideos({
  model: "veo-3.1-generate-preview",
  prompt: prompt,
  image: {
    imageBytes: imageBase64,
    mimeType: "image/jpeg",
  },
  config: {
    aspectRatio: "16:9",
    lastFrame: {
      imageBytes: imageBase64,  // Same as first frame
      mimeType: "image/jpeg",
    },
  },
});
```

### Technique 2: Video Extension + Loop End

For longer loops, generate initial video then extend it with a prompt that returns to the starting state.

**Workflow:**
1. Generate 8-second base video
2. Extend by 7 seconds (up to 20 times, max 148 seconds)
3. Final extension prompt: "Return to the starting position"
4. Or: Extract last frame, generate new video with first=original, last=extracted

**Extension Limitations:**
- Input video must be Veo-generated
- Resolution limited to 720p for extensions
- Max input video: 141 seconds
- Max output: 148 seconds
- Videos stored for 2 days (timer resets on reference)

```javascript
// Extend existing video
const extendOperation = await ai.models.generateVideos({
  model: "veo-3.1-generate-preview",
  video: originalOperation.response.generatedVideos[0].video,
  prompt: "Continue the scene, then slowly return to the starting position",
  config: {
    resolution: "720p",  // Required for extension
    numberOfVideos: 1,
  },
});
```

### Technique 3: Subtle Motion (Avoids Loop Discontinuity)

Design prompts with cyclical, subtle motion that naturally loops:
- Flashlight beam sweeping left-right-left
- Snow falling continuously
- Aurora gently pulsing
- Minimal subject movement

---

## Current Best Prompt (v3 - Looping)

```
A man stands completely still on a rocky outcrop overlooking a vast quarry at night. He holds a flashlight, the warm yellow beam slowly sweeps left then right across the rocky ground in front of him.

Gentle snow falls continuously throughout - individual flakes drifting down, some catching the warm flashlight glow. Aurora borealis on the horizon with slow-moving green and purple flowing curtains. Moon glows steadily in upper right. Stars twinkle subtly.

The man's body remains perfectly stationary - only the flashlight beam moves in a slow, smooth sweeping motion. The video creates a perfect seamless loop - ending exactly as it began.

Static camera, no camera movement. Dark cinematic night scene. Photorealistic, 24fps. Contemplative, ethereal atmosphere.
```

**Negative Prompt:**
```
walking, running, body movement, transition, fade, scene change, cut, sound, audio, bright scene, daytime, fast movement, camera shake, camera movement
```

---

## v4 Two-Part Video Strategy

### Concept

Split the hero video into two parts for better control:

| Part | Purpose | Loop | Playback |
|------|---------|------|----------|
| **v4a (Intro)** | Initial scene establishment | No | Plays once |
| **v4b (Loop)** | Continuous background | Yes | Loops forever |

**Frontend behavior:** Play v4a once → seamlessly transition to v4b looping

### Visual Corrections (v3 → v4)

| Element | v3 Issue | v4 Fix |
|---------|----------|--------|
| Flashlight | Sweeps on ground in front | Points toward quarry below |
| Aurora | Not moving enough | Visible rippling, undulating flow |
| Stars | All twinkle equally | Only brightest stars have dim flicker |
| Color | Full saturation | 15% more grayscale/desaturated |

### v4a Prompt (Intro - No Loop)

```
A man stands perfectly still on a rocky outcrop at night. His flashlight points
steadily toward the vast quarry below - the warm yellow beam illuminating the
distant rocky walls. The light has a very subtle initial flicker as if just turned on.

Aurora borealis flows gracefully on the horizon - green and purple curtains rippling
and undulating with slow, visible movement. The brightest stars flicker very subtly
with a dim, barely perceptible twinkle. Gentle snow drifts down continuously.

Muted, desaturated color palette - almost grayscale with hints of warm flashlight
yellow and cool aurora greens. Dark cinematic night scene.

Static camera, no movement. Photorealistic, 24fps. Contemplative, ethereal atmosphere.
```

**Negative prompt:**
```
looping, repeating, bright colors, saturated, vivid, daytime, fast movement,
camera shake, camera movement, looking at camera
```

### v4b Prompt (Loop)

```
A man stands perfectly still on a rocky outcrop at night, flashlight beam pointing
steadily toward the vast quarry below. The warm yellow light illuminates the distant
rocky walls with a subtle waver and gentle flicker - as if from wind or battery fluctuation.

Aurora borealis flows continuously on the horizon - green and purple curtains with
visible rippling, undulating movement. The brightest stars have a very dim, barely
perceptible flicker. Gentle snow drifts continuously.

Muted, desaturated color palette - almost grayscale with subtle warm and cool accents.
The man's body remains completely stationary. Only the light wavers slightly.

Static camera, no movement. Dark cinematic night scene. Photorealistic, 24fps.
Perfect seamless loop - ending exactly as it began.
```

**Negative prompt:**
```
walking, running, body movement, bright colors, saturated, vivid, transition,
fade, scene change, daytime, fast movement, camera shake, camera movement
```

### Post-Processing

**1. Downscale 4K → 1080p (recommended for web):**
```bash
ffmpeg -i input-4k.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 18 -preset slow output-1080p.mp4
```

**2. Desaturation (if Veo doesn't achieve 15% grayscale via prompt):**
```bash
ffmpeg -i input.mp4 -vf "hue=s=0.85" -c:a copy output.mp4
```

**3. Combined (downscale + desaturate):**
```bash
ffmpeg -i input-4k.mp4 -vf "scale=1920:1080,hue=s=0.85" -c:v libx264 -crf 18 -preset slow output-1080p.mp4
```

---

## Video Specifications

| Setting | Value | Notes |
|---------|-------|-------|
| Duration | 8 seconds | Required for 4K |
| Resolution | 4K | Max quality |
| Aspect Ratio | 16:9 | Website hero |
| Frame Rate | 24fps | Cinematic |
| Model | veo-3.1-generate-preview | Standard quality |
| Loop Method | First/Last frame interpolation | Same image |

---

## Motion Design (for Looping)

### What SHOULD Move (Subtle, Cyclical)
- Flashlight beam: Slow sweep left-right-left (completes cycle in 8s)
- Snow: Continuous falling
- Aurora: Gentle pulsing/flowing
- Stars: Subtle twinkle

### What Should NOT Move
- Man's body position (completely stationary)
- Camera (static)
- Mountains/terrain (static)
- Overall composition

---

## Atmospheric Effects

### Snow
- Gentle, continuous snowfall
- Individual flakes visible
- Slow, drifting fall
- Catches warm flashlight glow

### Aurora Borealis
- Slow-moving green/purple curtains
- Flowing, rippling motion
- Dreamlike, NOT fast
- Provides faint ambient glow

### Flashlight
- Primary warm light source
- Sweeps slowly left-right
- Creates moving pool of warm light
- Illuminates snow in beam path

---

## API Implementation

### Generate Looping Video

```typescript
// In job-store.ts or direct call
const client = new VeoClient();

const videoUrl = await client.generateVideoWithImage(
  {
    prompt: loopingPrompt,
    aspectRatio: "16:9",
    negativePrompt: negativePrompt,
    lastFrameBase64: imageBase64,  // Same as first for loop
  },
  imageBase64,  // First frame
  "image/jpeg"
);
```

### Extend for Longer Loop

```typescript
// After initial generation, extend the video
const extendedOperation = await ai.models.generateVideos({
  model: "veo-3.1-generate-preview",
  video: operation.response.generatedVideos[0].video,
  prompt: "Continue the gentle motion, maintain the seamless loop",
  config: {
    resolution: "720p",
    numberOfVideos: 1,
  },
});
```

---

## Cost Analysis

| Video | Resolution | Duration | Cost |
|-------|------------|----------|------|
| Test | 720p | 4s | $1.60 |
| v1 | 4K | 8s | $4.80 |
| v2 | 4K | 8s | $4.80 |
| v3 (loop) | 4K | 8s | $4.80 |
| v4a | 4K | 8s | $4.80 |
| v4b | 4K | 8s | $4.80 |
| v5a | 4K | 8s | $4.80 |
| v5b | 4K | 8s | $4.80 |
| v6a | 4K | 8s | $4.80 |

**Total spent:** ~$44.80

---

## Summary

### What Was Accomplished
- **Veo 3.1 API integration complete** - Full service layer implemented
- **8 videos generated** via API (v1-v6a)
- **Seamless looping works** using first/last frame interpolation technique
- **Two-part video strategy tested** (intro + loop) - technically works but visual continuity challenging

### What Didn't Work Well
- **Two-part continuation** - Difficult to achieve seamless visual continuity between intro and loop videos
- **Precise motion control** - Veo interprets prompts loosely; flashlight direction hard to control precisely
- **Aurora/star animation** - Inconsistent results; sometimes static despite prompts requesting movement

### Recommendation
For hero video, use a **single looping video** (like v3) rather than two-part approach. The first/last frame interpolation creates reliable seamless loops. Fine-tuning specific motion elements requires iterative prompt refinement.

---

## TODO: v7 Enhanced Loop (Blocked by Quota)

**When quota resets, generate v7 with these enhancements over v3:**

| Element | Enhancement |
|---------|-------------|
| Aurora borealis | Subtle wave motion (small, repeatable) |
| Shooting stars | 3 shooting stars that repeat in loop |
| Brightest stars | Realistic flicker like real stars |

**Script ready:** `/tmp/generate-hero-v7.js`

**Run when quota available:**
```bash
node /tmp/generate-hero-v7.js
# Then poll status and download
```

---

## Next Steps (Paused)

1. [x] Test basic API connectivity
2. [x] Generate walking video (v1)
3. [x] Generate standing/sweeping video (v2)
4. [x] Generate interpolation loop (v3)
5. [x] Review v3 loop quality
6. [x] Generate v4a/v4b two-part videos
7. [x] Generate v5a/v5b with frame extraction continuation
8. [x] Generate v6a with corrected flashlight motion
9. [ ] ~~Generate v6b~~ - Hit API quota limit
10. [ ] **Generate v7** - Enhanced loop (aurora waves, shooting stars, star flicker) - BLOCKED BY QUOTA
11. [ ] Post-process: downscale 4K → 1080p + desaturate if needed
12. [ ] Integrate into Hero component

---

## File Locations

- **Videos:** `/Users/nazdel/Projects/marketing-site/public/videos/`
- **Reference Image:** `/Users/nazdel/Downloads/Generated Image January 27, 2026 - 8_33PM.jpeg`
- **API Service:** `/Users/nazdel/Projects/marketing-site/src/lib/services/veo/`

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-27 | Claude | Initial draft |
| 2026-01-27 | Claude | Added v1, v2 generation results |
| 2026-01-27 | Claude | Added seamless loop techniques (interpolation, extension) |
| 2026-01-27 | Claude | Generated v3 with first=last frame interpolation |
| 2026-01-27 | Claude | Added v4 two-part strategy (intro + loop), visual corrections, post-processing |
| 2026-01-27 | Claude | Generated v4a/v4b, v5a/v5b (frame continuation), v6a |
| 2026-01-27 | Claude | **Paused** - Two-part approach unsuccessful, API quota reached |
