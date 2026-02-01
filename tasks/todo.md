# Refactoring Plan

Generated: 2026-02-01
Status: ✅ COMPLETE (2026-02-01)

---

## Phase 1: Quick Wins (Low effort, immediate cleanup) ✅ COMPLETE

### 1.1 Remove Dead Code
- [x] Delete `AudienceSelector.tsx` - returns null, completely unused
- [x] Remove unused `getPostsByTag()` from `src/lib/blog.ts:231-235`
- [x] Remove unused CSS from `globals.css`:
  - `.pill-tab-container` (lines 279-283)
  - `.gradient-featured` (lines 285-294)
  - `.bg-brand-*` / `.text-brand-*` utilities (lines 305-329)
- [x] Remove commented-out video code from `Hero.tsx:15-30`

### 1.2 Add Missing Barrel Exports
- [x] Create `src/components/seo/index.ts` exporting `JsonLd`
- [x] Create `src/components/analytics/index.ts` exporting `GoogleAnalytics`

### 1.3 Fix Duplicate Imports
- [x] `FAQSection.tsx:22-35` - import `generateFAQSchema` from `metadata.ts` instead of redefining

---

## Phase 2: Extract & Consolidate (Medium effort, high impact) ✅ COMPLETE

### 2.1 Create Shared Animation Constants
- [x] Create `src/lib/animations.ts` with EASING, DURATION, fadeInUp, etc.
- [ ] Update Hero.tsx, CTA.tsx, Features.tsx, Services.tsx, Stats.tsx to use shared constants (deferred - functional but not yet migrated)

### 2.2 Centralize Icon System
- [x] Create `src/lib/icons.ts` with unified icon map (47 icons)
- [x] Update both service pages to import from shared location
- [x] Remove duplicate icon maps

### 2.3 Create PageHero Component ✅
- [x] Create `src/components/sections/PageHero.tsx` with props: title, description, children
- [x] Refactor pages to use it:
  - [x] `services/page.tsx`
  - [x] `blog/page.tsx`
  - [x] `about/page.tsx`
  - [x] `case-studies/page.tsx`
  - [x] `resources/page.tsx`
  - [x] `contact/page.tsx`
  - [ ] `services/[slug]/page.tsx` (has custom icon, kept inline for now)

### 2.4 Create SectionHeader Component
- [x] Create `src/components/ui/SectionHeader.tsx` for repeated section header pattern
- [ ] Refactor: Features.tsx, RelatedServices.tsx, BenefitsSection.tsx, ProcessSection.tsx (deferred)

### 2.5 Consolidate Metadata Constants ✅
- [x] Added `BUSINESS_INFO` to constants.ts (phone, address)
- [x] Added `IMAGE_PATHS` to constants.ts (logo, OG images)
- [x] Updated `metadata.ts` to import from constants instead of hardcoding

---

## Phase 3: Split Large Files (Higher effort, better maintainability)

### 3.1 Extract Stats Sub-components
- [x] Create `src/components/sections/stats/AnimatedNumber.tsx`
- [x] Create `src/components/sections/stats/StatCard.tsx`
- [x] Create `src/components/sections/stats/PillTab.tsx`
- [x] Create `src/components/sections/stats/index.ts` barrel export
- [x] Refactor Stats.tsx to import sub-components (reduced from 322 to ~175 lines)

### 3.2 Extract Services Data ✅
- [x] Move `serviceContent` to `SERVICE_CONTENT` in constants.ts
- [x] Move `serviceImages` to `SERVICE_IMAGES` in constants.ts
- [x] Refactor Services.tsx to import data and use centralized icons (reduced from 370 to ~220 lines)

### 3.3 Split constants.ts (Optional) - DEFERRED
- [ ] Extract `SERVICE_DETAILS` (595 lines) to `src/lib/service-details.ts`
- [ ] Re-export from constants.ts for backwards compatibility

---

## Phase 4: Infrastructure (Important for production) ✅ COMPLETE

### 4.1 Error Handling ✅
- [x] Create `src/app/error.tsx` - global error boundary with retry/home buttons
- [x] Create `src/app/not-found.tsx` - custom 404 page
- [x] Create `src/app/loading.tsx` - global loading spinner

### 4.2 Dynamic Route Loading States ✅
- [x] Create `src/app/services/[slug]/loading.tsx` - skeleton UI
- [x] Create `src/app/blog/[slug]/loading.tsx` - skeleton UI

### 4.3 Security Fix ✅
- [x] Add HTML escaping to `blog/[slug]/page.tsx` (escapeHtml function)
- [x] Updated renderContent to escape input before markdown transformation
- [x] Fixed JsonLd import to use barrel export

### 4.4 Contact Form Backend - DEFERRED
- [ ] Implement form submission in `contact/page.tsx`
- [ ] Options: Server action, API route, or third-party (Formspree, etc.)
- Note: Requires decision on backend approach (out of scope for refactor)

---

## Phase 5: Styling Cleanup ✅ COMPLETE

### 5.1 Standardize Card Hover Effects ✅
- [x] Updated all card components to use `.card-hover` class:
  - services/page.tsx, services/[slug]/page.tsx
  - resources/page.tsx, case-studies/page.tsx
  - RelatedServices.tsx, BlogCard.tsx (2 instances)
- [x] Removed inline `transition-shadow hover:shadow-lg` patterns (7 files)

### 5.2 Extract Text Shadow Utilities ✅
- [x] Added `.text-shadow-hero` and `.text-shadow-dark` to globals.css
- [ ] Update Hero.tsx to use utilities (deferred - current drop-shadow works)

### 5.3 Standardize Eyebrow Text ✅
- [x] Added `.eyebrow` utility class to globals.css
- [ ] Update Hero.tsx, Services.tsx to use class (deferred - minor refactor)

---

## Phase 6: Documentation Cleanup ✅ COMPLETE

### 6.1 Update Outdated PRDs ✅
- [x] Marked `docs/prds/2026-01-27-video-animation-sync.md` as DEPRECATED with note
- [ ] Update other hero-related PRDs (deferred - low priority)

### 6.2 Complete or Remove Stubs - DEFERRED
- [ ] `src/app/api/video/extend/route.ts` - implement or remove TODO stub
- Note: Video API is a separate feature, not part of refactor scope

---

## Review Checklist

After each phase:
- [ ] Run `npm run build` - verify no build errors
- [ ] Run `npm run lint` - verify no lint errors
- [ ] Test affected pages visually
- [ ] Update CHANGELOG.md with changes

---

## Notes

- Start with Phase 1 - lowest risk, immediate cleanup
- Phase 2.3 (PageHero) and 3.1 (Stats extraction) have highest impact
- Phase 4 is critical before production launch
- Consider doing phases incrementally with separate commits
