# Changelog: UI Improvements - Header & Section Backgrounds

**Date:** 2026-01-28
**Version:** 2.2.0
**Type:** Enhancement

---

## Summary

Major UI improvements to create better visual flow from the dark hero section through the rest of the site. Added a transforming pill header, dark continuation sections, and warm-tinted backgrounds using the Japanese color palette.

---

## Changes Made

### 1. Header Pill Transformation

The header now transforms into a floating pill shape when scrolling past the hero section.

**File:** `src/components/layout/Header.tsx`

| Feature | Before | After |
|---------|--------|-------|
| Position | Fixed full-width | Floating centered pill |
| Width | `max-w-7xl` | `max-w-4xl` (25% narrower) |
| Background | Transparent | Glassmorphism (`bg-white/20 backdrop-blur-xl`) |
| Shape | Rectangle | Rounded pill (`rounded-full`) |
| Text color | White | Adapts to background (dark on light sections) |

**Scroll trigger:** 80% of viewport height (after hero)

```tsx
// Scrolled state classes
"max-w-4xl px-8 py-2.5 rounded-full bg-white/20 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20"
```

### 2. Dark Continuation Sections

The AudienceSelector and Stats sections now use solid dark backgrounds to continue the hero's visual theme.

| Section | Before | After |
|---------|--------|-------|
| AudienceSelector | White | `bg-shikoku` (#2E2930) |
| Stats | White | `bg-shikoku` (#2E2930) |

**Files Modified:**
- `src/components/sections/AudienceSelector.tsx`
- `src/components/sections/Stats.tsx`

**Text color updates for dark backgrounds:**
- Stats values: `text-white`
- Stats labels: `text-white/60`
- Pill tabs inactive: `text-white/60`
- Pill tabs active: `bg-white text-shikoku`
- Pill container: `bg-white/10 border-white/10 backdrop-blur-sm`

### 3. Warm-Tinted Section Backgrounds

Subsequent sections now use the Japanese color palette at 60% opacity instead of white.

| Section | Background | Color |
|---------|------------|-------|
| Services | `bg-toki-nezu/60` | Warm pink-grey (#E4D2D8 at 60%) |
| Features | `bg-fuji-nezu/60` | Cool purple-grey (#A6A5C4 at 60%) |

**Files Modified:**
- `src/components/sections/Services.tsx`
- `src/components/sections/Features.tsx`

### 4. Audience Selector Pill Spacing

Increased gap and padding in the pill tab container for better visual balance.

**File:** `src/components/sections/AudienceSelector.tsx`

```tsx
// Before
"flex items-center gap-1 p-1.5 rounded-full"

// After
"flex items-center gap-4 px-4 py-1.5 rounded-full"
```

---

## Visual Flow

```
┌─────────────────────────────────────┐
│  HERO (dark video + overlay)        │
├─────────────────────────────────────┤
│  AudienceSelector (bg-shikoku)      │  ← Dark zone
├─────────────────────────────────────┤
│  Stats (bg-shikoku)                 │  ← Dark zone
├─────────────────────────────────────┤
│  Services (bg-toki-nezu/60)         │  ← Warm tint
├─────────────────────────────────────┤
│  Features (bg-fuji-nezu/60)         │  ← Cool tint
├─────────────────────────────────────┤
│  CTA (bg-primary/shikoku)           │  ← Dark accent
└─────────────────────────────────────┘
```

---

## Japanese Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Shikoku (紫黒) | #2E2930 | Dark sections, CTA, buttons |
| Fuji Nezu (藤鼠) | #A6A5C4 | Cool tinted backgrounds, accents |
| Toki Nezu (鴇鼠) | #E4D2D8 | Warm tinted backgrounds, soft accents |

---

## Design Principles Updated

**Section backgrounds now use brand colors intentionally:**

| Zone | Colors | Rationale |
|------|--------|-----------|
| Dark zone | `bg-shikoku` | Continuation of hero, premium feel |
| Warm sections | `bg-toki-nezu/60` | Soft transition, Japanese aesthetic |
| Cool sections | `bg-fuji-nezu/60` | Visual rhythm, alternating warmth |
| CTA | `bg-primary` | Call to action emphasis |

This supersedes the previous guidance that brand colors should only be used for accents. The Japanese palette is now used for intentional section theming.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | Scroll-based pill transformation, glassmorphism, adaptive colors, dark section detection |
| `src/components/sections/Hero.tsx` | Added `data-dark-section="true"` |
| `src/components/sections/AudienceSelector.tsx` | Dark background, pill styling, text colors, `data-dark-section="true"` |
| `src/components/sections/Stats.tsx` | Dark background, white text colors, `data-dark-section="true"` |
| `src/components/sections/Services.tsx` | Warm toki-nezu background at 60%, stock images for each service |
| `src/components/sections/Features.tsx` | Cool fuji-nezu background at 60%, bento cards with images |
| `src/components/sections/CTA.tsx` | Added `data-dark-section="true"` |
| `src/components/ui/bento-card.tsx` | New `BentoCardWithImage` component |

---

## Testing

1. View site at http://localhost:7777
2. Scroll through entire page to verify:
   - Header transforms to pill at ~80vh scroll
   - Smooth color transition from hero → dark sections → tinted sections
   - Text readability on all backgrounds
   - Glassmorphism effect visible on header pill
3. Test on mobile viewport for responsive behavior

---

### 5. Stock Images for Services Section

Replaced gradient/icon backgrounds with stock images in the Services section right card.

**File:** `src/components/sections/Services.tsx`

| Service | Image |
|---------|-------|
| Digital Advertising | `/images/services/business-strategy.jpg` |
| Content & Publications | `/images/services/content-publications.jpg` |
| European Distribution | `/images/services/market-insights.jpg` |
| Email Marketing | `/images/services/outreach-campaigns.jpg` |
| Social & Video | `/images/services/product-planning.jpg` |
| Analytics & Reporting | `/images/services/seo-technical.jpg` |

### 6. Bento Cards with Images

Created new `BentoCardWithImage` component and updated Features section bento cards to display images.

**Files Modified:**
- `src/components/ui/bento-card.tsx` - Added `BentoCardWithImage` component
- `src/components/sections/Features.tsx` - Updated 4 cards to use images

| Card | Image |
|------|-------|
| Global Reach | `/images/features/dedicated-teams.jpg` |
| Sector Expertise | `/images/features/creative.jpg` |
| Measurable Results | `/images/features/transparency.jpg` |
| Compliance Aware | `/images/features/security.jpg` |

The new `BentoCardWithImage` component features:
- Image header with gradient overlay
- Icon badge overlaid on the image
- Title and description below

### 7. Dynamic Header Dark Section Detection

The header now dynamically detects when it's over dark or light backgrounds and adjusts text colors accordingly.

**File:** `src/components/layout/Header.tsx`

**How it works:**
- Sections can be marked with `data-dark-section="true"` attribute
- Header checks if it overlaps any dark section on scroll
- Text colors switch between white (dark backgrounds) and dark (light backgrounds)
- Works across all pages - inner pages default to dark text

**Dark sections marked:**
| Section | File |
|---------|------|
| Hero | `src/components/sections/Hero.tsx` |
| AudienceSelector | `src/components/sections/AudienceSelector.tsx` |
| Stats | `src/components/sections/Stats.tsx` |
| CTA | `src/components/sections/CTA.tsx` |

**Behavior by page:**
- **Home page**: White text over Hero, AudienceSelector, Stats, CTA; dark text over Services, Features
- **Inner pages** (Services, Case Studies, etc.): Dark text by default, switches to white if a dark section is encountered

---

## Related Documentation

- `docs/prds/2026-01-27-video-animation-sync.md` - Hero video sync technique
- `docs/changelogs/2026-01-26-theme-fix.md` - Previous theme corrections
