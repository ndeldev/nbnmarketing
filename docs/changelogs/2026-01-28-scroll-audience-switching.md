# Changelog: Scroll-Based Audience Switching

**Date:** 2026-01-28
**Version:** 2.4.3
**Type:** Feature Enhancement

---

## Summary

Implemented scroll-based audience switching for the Stats section. As users scroll, the audience pills (Emerging, Growth, Established) automatically switch, and the metrics animate smoothly to new values. Includes one-way progression (audience stays on Established when scrolling back up).

---

## Changes Made

### 1. Scroll-Based Audience Switching

The Stats section now controls audience selection based on scroll position.

**File:** `src/components/sections/Stats.tsx`

| Feature | Implementation |
|---------|----------------|
| Scroll tracking | `useScroll` from framer-motion with `scrollYProgress` |
| Audience switching | Maps scroll progress to audience index (0-33% = Emerging, 33-66% = Growth, 66-100% = Established) |
| Container height | `75vh` (25vh × 3 audiences) for scroll distance |
| Sticky position | `top-[72px]` to sit below header |

### 2. Integrated Audience Selector Bar

The "Strategic partnerships · Results-driven approach" heading and pill selector are now part of the Stats sticky content.

**Files Modified:**
- `src/components/sections/Stats.tsx` - Contains full UI
- `src/components/sections/AudienceSelector.tsx` - Now returns `null` (UI moved to Stats)

**Structure:**
```tsx
<section style={{ height: '75vh' }}>
  <div className="sticky top-[72px] bg-shikoku">
    {/* Dark bg extension behind header */}
    <div className="absolute bottom-full h-[72px] bg-shikoku" />

    {/* Audience Selector Bar */}
    <div>Strategic partnerships · Pills</div>

    {/* Stats Grid */}
    <div>Metrics</div>
  </div>
</section>
```

### 3. Smooth Number Animations

Stats numbers now animate smoothly between values instead of resetting and recounting.

**Implementation:**
```tsx
function AnimatedNumber({ value, prefix, suffix, decimals }) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  // Updates displayValue on spring change
}
```

| Before | After |
|--------|-------|
| Fade out → Reset to 0 → Count up | Smooth spring transition to new value |
| Jarring experience | Natural, fluid animation |

### 4. Updated Stats Data

Adjusted metrics for smaller companies ($10M-$100M market cap range).

| Audience | Market Cap Lift | Clients | Volume Increase | 4th Metric |
|----------|-----------------|---------|-----------------|------------|
| Emerging | $12M+ | 45+ | 2.1x | 90 days to results |
| Growth | $28M+ | 60+ | 3.4x | 85% retention |
| Established | $65M+ | 25+ | 4.2x | 98% compliance |

### 5. Header Dark Section Detection

Dark background extension marked for header color switching.

**File:** `src/components/sections/Stats.tsx`

```tsx
{/* Dark background extension that covers behind the header */}
<div
  className="absolute left-0 right-0 bottom-full h-[72px] bg-shikoku"
  data-dark-section="true"
/>
```

### 6. Hero Section Height

Changed from `min-h-screen` to `h-screen` for exact viewport height.

**File:** `src/components/sections/Hero.tsx`

```tsx
// Before
<section className="relative min-h-screen overflow-hidden">

// After
<section className="relative h-screen overflow-hidden">
```

---

## Visual Flow

```
┌─────────────────────────────────────┐
│  HERO (h-screen, dark video)        │
├─────────────────────────────────────┤
│  Stats Section (75vh container)     │
│  ┌─────────────────────────────┐    │
│  │ Sticky: Strategic + Pills   │    │  ← Switches Emerging→Growth→Established
│  │ Sticky: Metrics Grid        │    │  ← Numbers animate smoothly
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Services (600vh, own scroll)       │
└─────────────────────────────────────┘
```

---

## v2.4.3 Header Overlay Fix (Final)

### Problem
Header was overlaying the Strategic Partnerships section after adding transitional copy.

### Root Cause
The transitional copy section was inside the sticky container, making it too tall. When sticky content height exceeds the container's scroll distance, it gets pushed up and the header overlays it.

### Fix
Moved the transitional copy section **outside** the sticky container:

```tsx
// Before (BROKEN) - Copy inside sticky = too tall
<div className="sticky top-[72px]">
  {/* Audience bar */}
  {/* Stats grid */}
  {/* Copy section */}  ← Made sticky content too tall
</div>

// After (FIXED) - Copy outside sticky
<div className="sticky top-[72px]">
  {/* Audience bar */}
  {/* Stats grid */}
</div>
{/* Copy section */}  ← Scrolls normally, not part of sticky
```

### Key Learning
**Sticky content must be shorter than the container's scroll distance.** Any additional content should be placed outside the sticky `<div>`.

See `docs/prds/2026-01-28-stats-section-scroll.md` for full constraints documentation.

---

## v2.4.0 Transitional Copy & Updated Numbers

### Transitional Copy Section
Added audience-specific copy below the metrics that animates with each segment transition.

| Segment | Headline | Tone |
|---------|----------|------|
| Emerging | "Breaking through the noise" | Problem-aware, addresses visibility challenges |
| Growth | "We scale with you" | Partnership-focused, collaborative |
| Established | "Transform milestones into market cap" | Results-driven, optimization-focused |

**Implementation:**
```tsx
const audienceCopy: Record<string, { headline: string; description: string }> = {
  startups: {
    headline: "Breaking through the noise",
    description: "Small-cap visibility is hard-won...",
  },
  // ... Growth and Established
};

// Rendered below stats grid with motion animations
<motion.h3 key={currentCopy.headline}>...</motion.h3>
<motion.p key={currentCopy.description}>...</motion.p>
```

### Updated Market Cap Numbers
Adjusted to reflect company size tiers:

| Segment | Previous | Updated |
|---------|----------|---------|
| Emerging | $12M+ | $12M+ (unchanged) |
| Growth | $28M+ | $52M+ |
| Established | $65M+ | $115M+ |

---

## v2.3.2 Gap Reduction (Experimental)

### Reduced Container Height
Container height reduced from 75vh to 60vh (20vh × 3 audiences) to minimize whitespace between Stats and Services sections.

**Change:**
```tsx
// Before (v2.3.1)
const containerHeight = `${audienceIds.length * 25}vh`; // 75vh

// After (v2.3.2)
const containerHeight = `${audienceIds.length * 20}vh`; // 60vh
```

### Dark Background Fill
Added `bg-shikoku` to container to make remaining gap seamless with metrics section.

**Change:**
```tsx
// Before
<section ref={containerRef} className="relative" style={{ height: containerHeight }}>

// After
<section ref={containerRef} className="relative bg-shikoku" style={{ height: containerHeight }}>
```

### Revert Instructions
If scroll animations break, revert to 25vh per segment:
1. In `Stats.tsx` line ~179, change `20` back to `25`
2. Optionally remove `bg-shikoku` from the section className

---

## v2.3.1 Fixes

### One-Way Audience Progression
Audience switching now only moves forward (Emerging → Growth → Established). When scrolling back up, the selection stays on Established instead of reversing.

**Implementation:**
```tsx
// Track the highest audience index reached (only progress forward)
const maxAudienceIndexRef = useRef(0);

// Only update if we've progressed further (never go backwards)
if (audienceIndex > maxAudienceIndexRef.current) {
  maxAudienceIndexRef.current = audienceIndex;
  setSelectedAudience(audienceIds[audienceIndex]);
}
```

### Container Height Constraint
Container height must remain at **75vh** (25vh × 3 audiences) for proper scroll animations. Reducing this value breaks the scroll tracking.

---

## Known Limitations

| Limitation | Notes |
|------------|-------|
| Container height minimum ~60vh | Below this, scroll animations may break |
| v2.3.2 experimental | Monitor scroll behavior after gap reduction |

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/sections/Stats.tsx` | Major refactor - integrated audience selector, smooth animations, scroll tracking |
| `src/components/sections/AudienceSelector.tsx` | Now returns null (UI moved to Stats) |
| `src/components/sections/Hero.tsx` | Changed to `h-screen` |
| `package.json` | Version 2.2.0 → 2.3.1 |

---

## Testing

1. View http://localhost:7777
2. Scroll past hero section
3. Verify:
   - Pills switch: Emerging → Growth → Established as you scroll
   - Numbers animate smoothly (no reset/recount)
   - Header text is light on dark background
   - Stats section scrolls away before Services section
4. Click pills manually - should still work

---

## Related Documentation

- `docs/changelogs/2026-01-27-ui-improvements.md` - Previous UI improvements
- `docs/prds/2026-01-27-video-animation-sync.md` - Hero video sync technique
