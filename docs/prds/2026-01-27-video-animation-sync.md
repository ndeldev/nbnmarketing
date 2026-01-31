# PRD: Video-Animation Synchronization Technique

**Date:** 2026-01-27
**Author:** Design Team
**Status:** Implemented
**Implementation:** `src/components/sections/Hero.tsx`

---

## Overview

This document describes the technique for synchronizing CSS/JS animations with looping background videos. The method was developed for the hero section where a metrics card "illuminates" in sync with a flashlight beam sweeping across the video.

This technique can be reused for any scenario where UI elements need to react to events happening in a background video.

---

## Use Cases

- UI elements that "light up" when video content illuminates them
- Text reveals timed to video transitions
- Interactive overlays that respond to video events
- Parallax effects synchronized with video motion
- Loading states that match video progress

---

## The Technique

### Core Principle

~~Both the video and the CSS animation share the **same duration** and run on **infinite loops**.~~ **(Deprecated - causes drift)**

**Current Approach:** Sync animation directly to `video.currentTime` using `requestAnimationFrame`. This ensures perfect sync indefinitely because the animation state is derived from the video's actual playback position.

```
Video:      |████████████████████████████████| 8s loop
Animation:  [Reads video.currentTime every frame]
            ↑ Animation follows video - impossible to drift
```

### Why Not Independent Animations?

Independent Framer Motion animations with `repeat: Infinity` will drift over time due to:
- Browser frame rate variations
- JavaScript execution delays
- Garbage collection pauses
- Tab backgrounding behavior

After ~5 iterations (40+ seconds), the drift becomes noticeable.

### Requirements

1. **Looping video** with known, fixed duration
2. **Video ref** to access `currentTime`
3. **requestAnimationFrame** for smooth updates
4. **Linear interpolation** between keypoints
5. **Mounted state** to prevent hydration errors (Next.js)

---

## Implementation Guide

### Step 1: Analyze Video Timing

Extract frames from the video to identify key moments:

```bash
# Create frames directory
mkdir -p /tmp/video-frames

# Extract frames at 2fps (1 frame every 0.5 seconds)
ffmpeg -i public/videos/your-video.mp4 -vf "fps=2" /tmp/video-frames/frame_%03d.jpg

# Get video duration
ffprobe -v quiet -print_format json -show_format public/videos/your-video.mp4 | grep duration
```

**Frame-to-time mapping (at 2fps):**
| Frame | Time |
|-------|------|
| frame_001.jpg | 0.0s |
| frame_002.jpg | 0.5s |
| frame_003.jpg | 1.0s |
| frame_004.jpg | 1.5s |
| ... | ... |

### Step 2: Identify Sync Points

Review the extracted frames and document when key events occur:

```markdown
| Time | Video Event | Animation Response |
|------|-------------|-------------------|
| 0.0s - 1.5s | Flashlight at feet | Card is dim |
| 1.5s - 2.5s | Light sweeping right | Card begins to glow |
| 2.5s - 5.5s | Light on right side | Card fully illuminated |
| 5.5s - 7.0s | Light returning | Card fading |
| 7.0s - 8.0s | Light at feet | Card is dim |
```

### Step 3: Create Keyframe Arrays

Map the timing to animation keyframes. For an 8-second video with 9 keyframes (one per second):

```typescript
// Video duration constant
const VIDEO_DURATION = 8;

// Keyframe array: index 0 = 0s, index 1 = 1s, etc.
const glowAnimation = {
  boxShadow: [
    "0 0 0px rgba(255,200,100,0)",      // 0s - dark
    "0 0 0px rgba(255,200,100,0)",      // 1s - dark
    "0 0 20px rgba(255,200,100,0.15)",  // 2s - building
    "0 0 40px rgba(255,200,100,0.3)",   // 3s - peak
    "0 0 50px rgba(255,200,100,0.35)",  // 4s - peak
    "0 0 35px rgba(255,200,100,0.25)",  // 5s - fading
    "0 0 15px rgba(255,200,100,0.1)",   // 6s - fading
    "0 0 0px rgba(255,200,100,0)",      // 7s - dark
    "0 0 0px rgba(255,200,100,0)",      // 8s - dark (loop point)
  ],
};
```

### Step 4: Sync Animation to Video Time (Recommended)

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const VIDEO_DURATION = 8;

// Progress keypoints (0-1 values)
const PROGRESS_KEYPOINTS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

// Glow values at each keypoint
const GLOW_BLUR = [0, 0, 20, 40, 50, 35, 15, 0, 0];
const GLOW_OPACITY = [0, 0, 0.15, 0.3, 0.35, 0.25, 0.1, 0, 0];

// Linear interpolation helper
function interpolate(progress: number, keypoints: number[], values: number[]): number {
  if (progress <= 0) return values[0];
  if (progress >= 1) return values[values.length - 1];

  for (let i = 0; i < keypoints.length - 1; i++) {
    if (progress >= keypoints[i] && progress <= keypoints[i + 1]) {
      const t = (progress - keypoints[i]) / (keypoints[i + 1] - keypoints[i]);
      return values[i] + t * (values[i + 1] - values[i]);
    }
  }
  return values[0];
}

export function Component() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [glowState, setGlowState] = useState({ blur: 0, opacity: 0 });

  // Mark as mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync animation to video currentTime
  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    if (!video) return;

    let animationId: number;
    const updateGlow = () => {
      if (video && !video.paused) {
        const progress = video.currentTime / VIDEO_DURATION;
        setGlowState({
          blur: interpolate(progress, PROGRESS_KEYPOINTS, GLOW_BLUR),
          opacity: interpolate(progress, PROGRESS_KEYPOINTS, GLOW_OPACITY),
        });
      }
      animationId = requestAnimationFrame(updateGlow);
    };
    animationId = requestAnimationFrame(updateGlow);

    return () => cancelAnimationFrame(animationId);
  }, [mounted]);

  // Only apply styles after mount to prevent hydration mismatch
  const boxShadow = mounted
    ? `0 0 ${glowState.blur}px rgba(255,200,100,${glowState.opacity})`
    : undefined;

  return (
    <>
      {/* Video element with ref */}
      <video ref={videoRef} autoPlay muted loop playsInline>
        <source src="/videos/your-video.mp4" type="video/mp4" />
      </video>

      {/* Animated element - style only applied after mount */}
      <motion.div style={{ boxShadow }}>
        Content that syncs with video
      </motion.div>
    </>
  );
}
```

### Alternative: Independent Animation (Simple but Drifts)

For short viewing sessions where drift is acceptable:

```tsx
<motion.div
  animate={{ boxShadow: [...keyframes] }}
  transition={{
    duration: VIDEO_DURATION,
    ease: "linear",
    repeat: Infinity,
  }}
>
  Content
</motion.div>
```

**Note:** This approach will drift after ~5 iterations (40+ seconds).

---

## Hero Section Implementation

### Video Details
- **File:** `/public/videos/meridian-hero-v3-loop.mp4`
- **Duration:** 8 seconds
- **Frame rate:** 24fps
- **Content:** Man with flashlight, beam sweeps from feet to right side

### Animation Elements

#### 1. Card Container Glow
```typescript
const cardGlowAnimation = {
  boxShadow: [
    "0 0 0px rgba(255,200,100,0), inset 0 0 0px rgba(255,200,100,0)",
    "0 0 0px rgba(255,200,100,0), inset 0 0 0px rgba(255,200,100,0)",
    "0 0 20px rgba(255,200,100,0.15), inset 0 0 40px rgba(255,200,100,0.08)",
    "0 0 40px rgba(255,200,100,0.3), inset 0 0 80px rgba(255,200,100,0.15)",
    "0 0 50px rgba(255,200,100,0.35), inset 0 0 100px rgba(255,200,100,0.18)",
    "0 0 35px rgba(255,200,100,0.25), inset 0 0 70px rgba(255,200,100,0.12)",
    "0 0 15px rgba(255,200,100,0.1), inset 0 0 30px rgba(255,200,100,0.05)",
    "0 0 0px rgba(255,200,100,0), inset 0 0 0px rgba(255,200,100,0)",
    "0 0 0px rgba(255,200,100,0), inset 0 0 0px rgba(255,200,100,0)",
  ],
};
```

#### 2. Text Glow Effect
```typescript
const textGlowAnimation = {
  textShadow: [
    "0 0 0px rgba(255,200,100,0)",
    "0 0 0px rgba(255,200,100,0)",
    "0 0 10px rgba(255,200,100,0.5)",
    "0 0 20px rgba(255,200,100,0.8)",
    "0 0 25px rgba(255,200,100,0.9)",
    "0 0 18px rgba(255,200,100,0.6)",
    "0 0 8px rgba(255,200,100,0.3)",
    "0 0 0px rgba(255,200,100,0)",
    "0 0 0px rgba(255,200,100,0)",
  ],
};
```

#### 3. Background Glow Pulse
```typescript
const bgGlowAnimation = {
  opacity: [0.3, 0.3, 0.5, 0.8, 0.9, 0.7, 0.4, 0.3, 0.3],
  scale: [1, 1, 1.02, 1.05, 1.06, 1.03, 1.01, 1, 1],
};
```

### Staggered Effects

For multiple elements that should illuminate sequentially:

```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    animate={glowAnimation}
    transition={{
      duration: VIDEO_DURATION,
      ease: "linear",
      repeat: Infinity,
      delay: index * 0.15, // Each item starts 0.15s after previous
    }}
  >
    {item.content}
  </motion.div>
))}
```

---

## Timing Diagram

```
Video Timeline (8s loop):
|----|----|----|----|----|----|----|----|
0    1    2    3    4    5    6    7    8

Flashlight Position:
[  FEET  ][ → ][ RIGHT SIDE  ][  ←  ][FEET]

Card Glow Intensity:
[  dim   ][fade][   BRIGHT   ][fade ][dim ]
     0%    15%   30-35%  35%   25%   10%   0%

Text Glow Intensity:
[  none  ][build][  PEAK   ][fade ][none]
     0%    50%    80-90%     60%   30%   0%
```

---

## Color Reference

### Warm Flashlight Glow
```css
/* Base color - warm amber/yellow */
rgba(255, 200, 100, opacity)

/* Intensity levels */
--glow-none:    rgba(255, 200, 100, 0);
--glow-subtle:  rgba(255, 200, 100, 0.1);
--glow-medium:  rgba(255, 200, 100, 0.25);
--glow-strong:  rgba(255, 200, 100, 0.35);
--glow-peak:    rgba(255, 200, 100, 0.5);
```

### Alternative Glow Colors
```css
/* Cool moonlight */
rgba(200, 220, 255, opacity)

/* Aurora green */
rgba(100, 255, 150, opacity)

/* Aurora purple */
rgba(180, 100, 255, opacity)

/* Fire/warm */
rgba(255, 150, 50, opacity)
```

---

## Troubleshooting

### Animation Drifts Out of Sync
- **Solution:** Use the video-time sync approach (Step 4 above)
- If using independent animations, drift is expected after ~5 iterations
- Switch to `requestAnimationFrame` + `video.currentTime` for perfect sync

### Hydration Mismatch Error (Next.js)
```
Error: Hydration failed because the server rendered HTML didn't match the client.
```
**Cause:** Server renders without glow styles, client renders with computed values.

**Solution:** Use a `mounted` state pattern:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

// Only apply dynamic styles after mount
const boxShadow = mounted ? computedValue : undefined;
```

### Animation Looks Choppy
- Add more keypoints for smoother interpolation
- Increase `requestAnimationFrame` update frequency (it's already ~60fps)
- Use more intermediate values in your keypoint arrays

### Glow Effect Not Visible
- Increase opacity values
- Check z-index of glowing element
- Verify element has `overflow: visible` if glow extends beyond bounds

### Timing Feels Off
- Re-analyze video frames at higher fps (e.g., `fps=4`)
- Adjust keypoint positions (shift values in arrays)
- Use browser DevTools to log `video.currentTime` and compare to expected glow

### Video Doesn't Loop Smoothly
- Ensure video is properly encoded for seamless looping
- First and last frames should match for gapless playback

---

## Future Enhancements

1. ~~**Programmatic sync:** Use video `timeupdate` events for frame-accurate sync~~ ✅ Implemented
2. **Interactive controls:** Allow users to scrub through synced animations
3. **Multiple sync points:** Support multiple elements with different timings
4. **Audio sync:** Extend technique to sync with audio cues
5. **Responsive timing:** Adjust animation based on video playback speed
6. **Prefers-reduced-motion:** Disable glow effects for users who prefer reduced motion

---

## Related Files

- `src/components/sections/Hero.tsx` - Implementation
- `public/videos/meridian-hero-v3-loop.mp4` - Source video
- `docs/prds/2026-01-27-hero-image-generation.md` - Video generation prompts

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-27 | Design Team | Initial implementation and documentation |
| 2026-01-27 | Design Team | Fixed drift issue with video-time sync approach |
| 2026-01-27 | Design Team | Fixed hydration error with mounted state pattern |
