# Changelog: v2.5.0 - Codebase Refactoring

**Date:** 2026-02-01
**Version:** 2.5.0
**Type:** Refactoring & Infrastructure

---

## Overview

Comprehensive codebase refactoring to improve maintainability, reduce duplication, and add production infrastructure. This release focuses on code organization without changing user-facing functionality.

---

## Changes by Phase

### Phase 1: Dead Code Removal

| Item | Action |
|------|--------|
| `AudienceSelector.tsx` | Deleted (returned null, unused) |
| `getPostsByTag()` in blog.ts | Removed (never called) |
| `.pill-tab-container` CSS | Removed |
| `.gradient-featured` CSS | Removed |
| `.bg-brand-*` / `.text-brand-*` CSS | Removed (~45 lines total) |
| Video sync comments in Hero.tsx | Removed |

### Phase 2: Extract & Consolidate

**New Files Created:**

| File | Purpose |
|------|---------|
| `src/lib/animations.ts` | Shared EASING, DURATION, fadeInUp, staggerContainer, cardVariant |
| `src/lib/icons.ts` | Centralized icon map (47 icons) with `getIcon()` helper |
| `src/components/sections/PageHero.tsx` | Reusable page hero component |
| `src/components/ui/SectionHeader.tsx` | Reusable section header component |
| `src/components/seo/index.ts` | Barrel export for JsonLd |
| `src/components/analytics/index.ts` | Barrel export for GoogleAnalytics |

**Pages Refactored to use PageHero:**
- `/services`
- `/blog`
- `/about`
- `/case-studies`
- `/resources`
- `/contact`

**Constants Consolidated:**
- Added `BUSINESS_INFO` (phone, address)
- Added `IMAGE_PATHS` (logo, OG images)
- Added `SERVICE_IMAGES` (service page images)
- Added `SERVICE_CONTENT` (audience-specific content, 120 lines)
- Updated `metadata.ts` to use constants instead of hardcoded values

### Phase 3: Split Large Files

**Stats Component Extraction:**

| New File | Lines | Source |
|----------|-------|--------|
| `stats/AnimatedNumber.tsx` | 42 | Stats.tsx:43-77 |
| `stats/StatCard.tsx` | 52 | Stats.tsx:79-119 |
| `stats/PillTab.tsx` | 32 | Stats.tsx:121-144 |
| `stats/index.ts` | 3 | Barrel export |

**Result:** Stats.tsx reduced from 322 → ~175 lines

**Services Data Extraction:**
- Moved `serviceContent` → `SERVICE_CONTENT` in constants.ts
- Moved `serviceImages` → `SERVICE_IMAGES` in constants.ts
- Updated Services.tsx to use centralized `getIcon()`

**Result:** Services.tsx reduced from 370 → ~220 lines

### Phase 4: Infrastructure

**Error Handling:**

| File | Purpose |
|------|---------|
| `src/app/error.tsx` | Global error boundary with retry/home buttons |
| `src/app/not-found.tsx` | Custom 404 page |
| `src/app/loading.tsx` | Global loading spinner |

**Skeleton Loading States:**

| File | Purpose |
|------|---------|
| `src/app/services/[slug]/loading.tsx` | Service page skeleton UI |
| `src/app/blog/[slug]/loading.tsx` | Blog post skeleton UI |

**Security:**
- Added `escapeHtml()` function to `blog/[slug]/page.tsx`
- Content now escaped before markdown transformation (defense-in-depth)

### Phase 5: Styling Cleanup

**New CSS Utilities in globals.css:**
```css
.text-shadow-hero { text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.text-shadow-dark { text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.eyebrow { font-size: 0.625rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; }
```

**Standardized Card Hovers:**

Updated 7 files to use `.card-hover` class:
- `services/page.tsx`
- `services/[slug]/page.tsx`
- `resources/page.tsx`
- `case-studies/page.tsx`
- `RelatedServices.tsx`
- `BlogCard.tsx` (2 instances)

### Phase 6: Documentation

- Marked `docs/prds/2026-01-27-video-animation-sync.md` as DEPRECATED
- Created `tasks/todo.md` for refactoring progress tracking
- Created `tasks/lessons.md` for patterns and lessons learned
- Updated CLAUDE.md Key Files table

---

## Metrics

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Stats.tsx lines | 322 | ~175 | -46% |
| Services.tsx lines | 370 | ~220 | -41% |
| Duplicate icon maps | 2 | 1 | -50% |
| Inline hero sections | 7 | 1 | -86% |
| Inline card hovers | 7 | 0 | -100% |
| Dead CSS lines | ~45 | 0 | -100% |
| Error handling | None | Full | +3 files |
| Loading states | None | Full | +3 files |
| Lint issues | 20 | 14 | -30% |

---

## Files Changed

### New Files (17)
- `src/lib/animations.ts`
- `src/lib/icons.ts`
- `src/components/sections/PageHero.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/sections/stats/AnimatedNumber.tsx`
- `src/components/sections/stats/StatCard.tsx`
- `src/components/sections/stats/PillTab.tsx`
- `src/components/sections/stats/index.ts`
- `src/components/seo/index.ts`
- `src/components/analytics/index.ts`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/app/loading.tsx`
- `src/app/services/[slug]/loading.tsx`
- `src/app/blog/[slug]/loading.tsx`
- `tasks/todo.md`
- `tasks/lessons.md`

### Deleted Files (1)
- `src/components/sections/AudienceSelector.tsx`

### Modified Files (18)
- `package.json` (version bump)
- `CLAUDE.md` (key files, icon system docs)
- `CHANGELOG.md` (this release)
- `src/lib/constants.ts` (new constants)
- `src/lib/metadata.ts` (use constants)
- `src/lib/blog.ts` (removed unused function)
- `src/app/globals.css` (removed dead CSS, added utilities)
- `src/components/sections/index.ts` (exports)
- `src/components/sections/Stats.tsx` (extracted sub-components)
- `src/components/sections/Services.tsx` (use centralized data)
- `src/components/sections/FAQSection.tsx` (import from metadata)
- `src/components/sections/RelatedServices.tsx` (card-hover)
- `src/components/blog/BlogCard.tsx` (card-hover)
- `src/app/services/page.tsx` (PageHero, icons, card-hover)
- `src/app/services/[slug]/page.tsx` (icons, card-hover)
- `src/app/blog/page.tsx` (PageHero)
- `src/app/blog/[slug]/page.tsx` (security, barrel import)
- `src/app/about/page.tsx` (PageHero)
- `src/app/contact/page.tsx` (PageHero, barrel import)
- `src/app/case-studies/page.tsx` (PageHero, card-hover)
- `src/app/resources/page.tsx` (PageHero, card-hover)
- `docs/prds/2026-01-27-video-animation-sync.md` (deprecated)

---

## Breaking Changes

None. All changes are internal refactoring with no user-facing impact.

---

## Deferred Items

The following items were identified but deferred for future work:

1. **Contact form backend** - Requires decision on backend approach
2. **Split constants.ts** - Extract SERVICE_DETAILS to separate file
3. **Video API stub** - `/api/video/extend` returns 501
4. **Migrate animations** - Components could use shared animation constants
5. **Use SectionHeader** - Created but not yet applied to all sections
