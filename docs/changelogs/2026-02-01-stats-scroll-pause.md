# Stats Section Scroll-Pause Behavior

**Date:** 2026-02-01
**Version:** 2.5.4
**Type:** Feature Enhancement

## Summary

Added scroll-driven audience switching to the Stats section ("Strategic partnerships"), creating a pause effect at each audience segment (Emerging, Growth, Established) as users scroll through the section.

## Problem

The Stats section had a short scroll distance (100vh), causing the audience segments to switch too quickly without giving users time to absorb the content for each segment.

## Solution

Implemented the same scroll-pause pattern used in the Features section:

1. **Extended container height** to 300vh (100vh per audience segment)
2. **Sticky inner content** that fills the viewport during scroll
3. **Bidirectional audience switching** based on scroll progress

## Technical Implementation

### Container Height
```tsx
// Before: 100vh total
const containerHeight = `${Math.max(100, audienceIds.length * 25)}vh`;

// After: 300vh (100vh per segment)
const containerHeight = `${audienceIds.length * 100}vh`;
```

### Scroll Progress Tracking
```tsx
// Changed offset for proper 0-1 progress mapping
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"], // was ["start end", "end start"]
});
```

### Audience Index Calculation
```tsx
// Bidirectional switching (removed forward-only restriction)
useMotionValueEvent(scrollYProgress, "change", (progress) => {
  const audienceIndex = Math.min(
    audienceIds.length - 1,
    Math.max(0, Math.floor(progress * audienceIds.length))
  );

  const newAudience = audienceIds[audienceIndex];
  if (newAudience && newAudience !== selectedAudience) {
    setSelectedAudience(newAudience);
  }
});
```

### Snap Targets
```tsx
// Updated to 100vh per segment
style={{ top: `${index * 100}vh`, height: '100vh' }}
```

## User Experience

1. User scrolls from Hero section into Stats
2. Stats shows "Emerging" segment with corresponding values
3. User continues scrolling (~100vh)
4. Stats switches to "Growth" segment with new values
5. User continues scrolling (~100vh)
6. Stats switches to "Established" segment with new values
7. After full 300vh scroll, Features section comes into view

## Files Changed

| File | Changes |
|------|---------|
| `src/components/sections/Stats.tsx` | Container height, scroll offset, bidirectional switching |

## Related

- Similar pattern used in `src/components/sections/Features.tsx`
- Uses Framer Motion `useScroll`, `useMotionValueEvent`
