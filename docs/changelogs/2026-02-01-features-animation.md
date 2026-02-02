# Features Section Scroll Animation

**Version:** 2.5.1 → 2.5.2
**Date:** 2026-02-01

## Summary

Added scroll-driven bento card reveal animation to the "Why Choose Meridian" Features section. The Full-Stack Coverage card starts at full width and shrinks as the user scrolls, revealing additional cards with staggered animations.

## Changes

### Features.tsx - Scroll Animation Architecture

**Before:** Static bento grid layout with no scroll interaction.

**After:** Scroll-driven animation using tall container with sticky positioning.

#### Key Implementation Details

1. **Container Structure**
   - Section height set to `300vh` to create scroll distance
   - Inner content uses `sticky top-0` to stay in viewport during scroll
   - Bento container constrained with `max-w-5xl mx-auto`

2. **Scroll Progress Tracking**
   ```tsx
   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start start", "end end"],
   });
   ```

3. **Animation Transforms**
   | Element | Scroll Range | Animation |
   |---------|--------------|-----------|
   | Full-Stack Card Width | 0-50% | 100% → 66.67% |
   | Full-Stack Card Scale | 0-30% | 1.02 → 1 |
   | Right Card 1 (Global Reach) | 30-45% | Fade in + slide up |
   | Right Card 2 (Sector Expertise) | 40-55% | Fade in + slide up |
   | Bottom Card 1 (Measurable Results) | 70-85% | Fade in + slide from left |
   | Bottom Card 2 (Compliance Aware) | 78-93% | Fade in + slide from right |
   | Title Overlay | 0-25% | Scroll up (-120px) + fade out |

4. **Performance Optimization**
   - `will-change-[width]` CSS hint on animated width element
   - Note: `scaleX` was attempted but reverted since it doesn't affect layout (cards wouldn't reveal)

### BentoCardWave - Layout Restructure

**Before:** Fixed height image area with percentage-based sizing.

**After:** Flex-based layout for better proportions.

```tsx
<div className="... flex flex-col">
  {/* Image area - flex-1 takes remaining space */}
  <div className="relative flex-1 min-h-[200px]">
    <Image ... />
    {/* Gradient overlays for title/content readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 ..." />
    <div className="absolute inset-0 bg-gradient-to-t from-card ..." />
  </div>
  {/* Content area - auto height based on content */}
  <div className="p-4 md:p-5">
    <h3>...</h3>
    <p>...</p>
  </div>
</div>
```

### Title Overlay Feature

Section title "Why Choose Meridian" is positioned as an absolute overlay on the Full-Stack Coverage card:
- Centered text with `z-10` for proper stacking
- White text with `drop-shadow-lg` for readability over image
- Scrolls up 120px and fades out during first 25% of scroll progress

## Files Changed

| File | Lines Changed | Description |
|------|---------------|-------------|
| `src/components/sections/Features.tsx` | ~170 | Complete restructure with scroll animations |
| `src/components/ui/bento-card.tsx` | ~15 | BentoCardWave flex-based layout |
| `package.json` | 1 | Version bump 2.5.0 → 2.5.1 |

## Technical Notes

### Why Width Animation Instead of ScaleX

Initially attempted using `scaleX` transform for smoother GPU-accelerated animation. However, `scaleX` only visually scales the element - it doesn't change the layout. This meant the right column cards remained hidden behind the "full width" card even though it appeared narrower.

Solution: Reverted to animating `width` with `will-change-[width]` hint. While width animation triggers layout recalculation, it's necessary for the reveal effect to work properly.

### Scroll Progress Mapping

The animation is divided into phases:
1. **0-50%**: Full-Stack card shrinks, title fades
2. **30-55%**: Right column cards appear (staggered)
3. **70-93%**: Bottom row cards slide in from sides

The gaps between phases create natural pauses where no animation occurs, improving the visual rhythm.

## Performance Optimizations (v2.5.2)

### Problem: Animation Jank

Initial implementation had stuttery animations due to:
1. Raw scroll values being jittery
2. Missing `will-change` hints on most elements
3. CSS transitions from `card-hover` conflicting with scroll animations
4. Header overlapping sticky content

### Solution: Multi-Pronged Performance Fix

**1. useSpring for Smooth Interpolation**

Wrapped scroll progress with spring physics:

```tsx
import { useSpring } from "framer-motion";

const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});

// All transforms now use smoothProgress instead of raw scrollYProgress
const waveCardWidth = useTransform(smoothProgress, [0, 0.5], ["100%", "66.67%"]);
```

**2. will-change Hints on All Animated Elements**

Added performance hints to every motion.div:

```tsx
// Title
<motion.div className="... will-change-[opacity,transform]">

// Right column cards
<motion.div className="flex-1 will-change-[opacity,transform]">

// Bottom cards
<motion.div className="md:w-1/2 will-change-[opacity,transform]">
```

**3. Removed Conflicting CSS Transitions**

Removed `card-hover` class from BentoCardWave to prevent CSS transitions from fighting with scroll-driven animations:

```tsx
// Before
className="... shadow-soft card-hover flex flex-col"

// After
className="... shadow-soft flex flex-col"
```

**4. Fixed Header Overlap**

Changed sticky positioning from `top-0` to `top-20` to account for fixed header height:

```tsx
<div className="sticky top-20 min-h-screen ...">
```

### Performance Results

- Animation now buttery smooth at all scroll speeds
- No visible frame drops or stuttering
- Works well on both high and low refresh rate displays

## Testing

- Verified smooth animation on scroll
- Confirmed all cards visible at final scroll position
- Tested viewport fit with constrained width
- Tested animation performance at various scroll speeds
- Dev server running without errors
