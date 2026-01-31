# PRD: Stats Section Scroll Behavior

**Date:** 2026-01-28
**Status:** Active
**File:** `src/components/sections/Stats.tsx`

---

## Overview

The Stats section uses scroll-based audience switching with sticky positioning. This document tracks the critical configuration values and rolling changes to prevent regression.

---

## Critical Configuration Values

These values MUST be maintained for proper behavior:

| Setting | Value | Purpose |
|---------|-------|---------|
| Container height | `75vh` (25vh × 3) | Provides scroll distance for audience switching |
| Sticky top | `72px` | Positions content below the header |
| Dark bg extension | `72px` | Fills space behind header when sticky |
| isSticky threshold | `73` | Detects when section is stuck |

### Why 72px?
The header is approximately 72px tall in its normal (non-pill) state. The sticky content must start at 72px to sit directly below the header.

---

## Working Code Reference

```tsx
// Container (line ~197)
const containerHeight = `${audienceIds.length * 25}vh`; // 75vh total

// isSticky detection (line ~158)
setIsSticky(rect.top <= 73);

// Sticky wrapper (line ~213)
<div className="sticky top-[72px] bg-shikoku relative">

// Dark bg extension (line ~218)
<div className="absolute left-0 right-0 bottom-full h-[72px] bg-shikoku" />
```

---

## Rolling Change Log

### v2.4.3 (2026-01-28) - Moved copy outside sticky container
**Problem:** Header still overlaying Strategic Partnerships after restoring 72px values
**Root Cause:** Transitional copy section inside sticky container made it too tall for the 75vh scroll distance
**Fix:** Moved copy section outside the sticky `<div>` but still inside the `<section>`

```tsx
// Before: Copy was INSIDE sticky container
<div className="sticky top-[72px]">
  {/* Audience bar */}
  {/* Stats grid */}
  {/* Copy section - TOO MUCH HEIGHT */}
</div>

// After: Copy is OUTSIDE sticky container
<div className="sticky top-[72px]">
  {/* Audience bar */}
  {/* Stats grid */}
</div>
{/* Copy section - scrolls normally */}
<div className="py-12 lg:py-16 bg-shikoku">
  {/* Copy content */}
</div>
```

### v2.4.2 (2026-01-28) - Restored working values
**Problem:** Header pill was overlaying Strategic Partnerships section
**Cause:** Values were changed when adding transitional copy section
**Fix:** Restored all values to 72px

| Setting | Was | Changed To |
|---------|-----|------------|
| sticky top | 100px | 72px |
| dark bg extension | 100px | 72px |
| isSticky threshold | 81 | 73 |
| container height | 60vh | 75vh |

### v2.4.1 (2026-01-28) - Attempted fix (BROKEN)
- Increased sticky top to 80px, then 100px
- Did NOT fix the overlay issue
- **Reverted in v2.4.2**

### v2.4.0 (2026-01-28) - Added transitional copy
- Added audience-specific headlines and descriptions below stats
- Updated market cap numbers ($52M for Growth, $115M for Established)
- **Side effect:** Accidentally changed positioning values

### v2.3.2 (2026-01-28) - Gap reduction attempt
- Reduced container height from 75vh to 60vh
- Added bg-shikoku to container for seamless gap
- **Caused issues** - reverted container height in v2.4.2

### v2.3.1 (2026-01-28) - One-way progression
- Added maxAudienceIndexRef to prevent backwards scrolling
- Audience only progresses: Emerging → Growth → Established
- **Working correctly**

### v2.3.0 (2026-01-28) - Initial scroll implementation
- Integrated AudienceSelector into Stats section
- Added scroll-based audience switching using useScroll
- Added smooth number animations using useSpring
- Set values: 72px sticky, 75vh container
- **This was the working baseline**

---

## Known Constraints

### 1. Sticky Content Height Limit (CRITICAL)

**The sticky content must be shorter than the container's scroll distance.**

- Container height: `75vh` (~75% of viewport)
- Sticky content max height: Should not exceed ~50% of viewport

**Why?** When you scroll, the sticky content "sticks" at `top-72px`. If the sticky content is taller than the remaining scroll distance in the container, it gets pushed up by the next section, causing the header to overlay it.

**Rule:** Any content that makes the sticky section too tall must be placed OUTSIDE the sticky `<div>`:

```tsx
// CORRECT - Copy outside sticky
<div className="sticky top-[72px]">
  {/* Audience bar + Stats grid only */}
</div>
<div> {/* Copy section - scrolls normally */} </div>

// WRONG - Copy inside sticky (causes overlay)
<div className="sticky top-[72px]">
  {/* Audience bar + Stats grid + Copy = TOO TALL */}
</div>
```

### 2. Container Height Minimum
75vh required for scroll-based audience switching to work properly. Reducing below this breaks the animation timing.

### 3. Header Height Assumption
Code assumes header is ~72px tall. If header height changes, update:
- `sticky top-[72px]`
- `h-[72px]` on dark bg extension
- `isSticky` threshold (73)

### 4. Gap Trade-off
75vh container creates some whitespace before Services section. This is acceptable to maintain proper scroll behavior.

---

## Testing Checklist

After any changes to Stats.tsx positioning:

- [ ] Scroll down past hero
- [ ] Strategic Partnerships bar is BELOW header pill (not covered)
- [ ] Audience pills switch: Emerging → Growth → Established
- [ ] Numbers animate smoothly between values
- [ ] Transitional copy animates with audience changes
- [ ] Dark background extends behind header when sticky
- [ ] Scrolling back up keeps selection on Established

---

## Revert Instructions

If header overlay issue returns, restore these values in Stats.tsx:

```tsx
// Line ~158
setIsSticky(rect.top <= 73);

// Line ~197
const containerHeight = `${audienceIds.length * 25}vh`;

// Line ~213
className="sticky top-[72px] bg-shikoku relative"

// Line ~218
h-[72px]
```
