# PRD: Meridian Landing Site Specification

**Created:** 2026-01-28
**Version:** 2.4.5
**Status:** Active
**Last Updated:** 2026-01-31

---

## Table of Contents
1. [Overview](#overview)
2. [Version History](#version-history)
3. [Tech Stack](#tech-stack)
4. [Page Structure](#page-structure)
5. [Design System](#design-system)
6. [Layout Components](#layout-components)
7. [Section Specifications](#section-specifications)
8. [Animation System](#animation-system)
9. [Assets](#assets)
10. [Configuration & Constants](#configuration--constants)
11. [Critical Constraints](#critical-constraints)

---

## Overview

**Brand:** Meridian
**Tagline:** Capital Markets Communications
**Site URL:** https://meridian.agency
**Contact:** hello@meridian.agency

**Purpose:** Full-stack investor relations landing page for public companies. Helps issuers build market value through strategic communications across North America and Europe.

**Target Audiences:**
- Emerging companies ($10M-$50M market cap)
- Growth companies ($50M-$100M market cap)
- Established companies ($100M+ market cap)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.4.5 | 2026-01-31 | Fixed Hero build error, added deployment documentation (GitHub + Vercel) |
| 2.4.4 | 2026-01-28 | Changed Hero background from video to static image (cliff/Milky Way) |
| 2.4.3 | 2026-01-28 | Fixed header overlay by moving transitional copy outside sticky container |
| 2.4.0 | 2026-01-28 | Added transitional copy section, updated market cap numbers |
| 2.3.2 | 2026-01-28 | Gap reduction, dark background fill |
| 2.3.1 | 2026-01-28 | One-way audience progression on scroll |
| 2.3.0 | 2026-01-28 | Scroll-based audience switching, smooth number animations |
| 2.2.0 | 2026-01-28 | Header pill transformation, dark section detection |
| 2.0.0 | 2026-01-27 | Hero video integration, Japanese color palette |
| 1.0.0 | 2026-01-27 | Initial release |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.4 | React framework |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.29.2 | Animations |
| Radix UI | Various | Accessible components |
| TypeScript | 5.x | Type safety |

---

## Page Structure

### Section Order
```
1. Hero (h-screen)
2. Stats (75vh) - Contains AudienceSelector
3. Services (600vh)
4. Features
5. CTA
```

### Component Hierarchy
```
<RootLayout>
  <Header />
  <main>
    <Hero />
    <AudienceProvider>
      <AudienceSelector /> (renders null, integrated into Stats)
      <Stats />
      <Services />
    </AudienceProvider>
    <Features />
    <CTA />
  </main>
  <Footer />
</RootLayout>
```

---

## Design System

### Color Palette (Japanese Greydients)

| Name | Hex | CSS Variable | Purpose |
|------|-----|--------------|---------|
| **Shikoku** (紫黒) | #2E2930 | `--shikoku` | Primary dark, buttons, CTA backgrounds |
| **Fuji Nezu** (藤鼠) | #A6A5C4 | `--fuji-nezu` | Accent highlights, focus states |
| **Toki Nezu** (鴇鼠) | #E4D2D8 | `--toki-nezu` | Secondary/soft backgrounds |

### Semantic Colors

| Token | Light Mode Value | Purpose |
|-------|------------------|---------|
| `--background` | oklch(0.985 0 0) | Page background (soft off-white) |
| `--foreground` | oklch(0.145 0 0) | Primary text |
| `--card` | oklch(1 0 0) | Card backgrounds |
| `--muted` | oklch(0.97 0 0) | Muted backgrounds |
| `--muted-foreground` | oklch(0.45 0 0) | Secondary text |
| `--border` | oklch(0.922 0 0) | Border color |
| `--primary` | #2E2930 | Primary actions |
| `--primary-foreground` | #FAFAFA | Text on primary |
| `--secondary` | #E4D2D8 | Secondary actions |
| `--accent` | #A6A5C4 | Accent elements |

### Typography

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero headline | text-6xl to text-7xl | bold | tight |
| Section headings | text-3xl to text-4xl | bold | tight |
| Eyebrow text | text-xs | medium | 0.25em |
| Body text | text-base | normal | normal |
| Small text | text-sm | normal | normal |
| Labels | text-xs | semibold | 0.2em |

**Font Stack:** Inter (Google Font), ui-sans-serif, system-ui, sans-serif

### Shadows

**Shadow Soft** (cards, subtle elevation):
```css
0 0 0 1px rgba(0,0,0,0.05),
0 1px 1px 0 rgba(0,0,0,0.05),
0 2px 2px 0 rgba(0,0,0,0.05),
0 4px 4px 0 rgba(0,0,0,0.05),
0 8px 8px 0 rgba(0,0,0,0.05),
0 16px 16px 0 rgba(0,0,0,0.05);
```

**Shadow Crisp** (elevated elements):
```css
0 0 0 1px rgba(0,0,0,0.06),
0 1px 1px -0.5px rgba(0,0,0,0.06),
0 3px 3px -1.5px rgba(0,0,0,0.06),
0 6px 6px -3px rgba(0,0,0,0.06),
0 12px 12px -6px rgba(0,0,0,0.06),
0 24px 24px -12px rgba(0,0,0,0.06);
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.75rem (12px) | Base radius |
| rounded-lg | 8px | Small cards |
| rounded-xl | 12px | Cards |
| rounded-2xl | 16px | Large cards |
| rounded-3xl | 24px | Feature cards |
| rounded-full | 50% | Buttons, pills |

### Spacing Scale

| Class | Value | Common Usage |
|-------|-------|--------------|
| gap-2 | 8px | Tight spacing |
| gap-4 | 16px | Standard spacing |
| gap-6 | 24px | Section spacing |
| py-6 | 24px | Card padding |
| py-16 | 64px | Section padding |
| max-w-7xl | 1280px | Container width |

---

## Layout Components

### Header

**File:** `src/components/layout/Header.tsx`

#### States

| State | Position | Background | Width | Shape |
|-------|----------|------------|-------|-------|
| Normal | top-0 | transparent | max-w-7xl | rectangle |
| Scrolled (Pill) | top-4 | white/20 + blur | max-w-4xl | rounded-full |

**Scroll Trigger:** 80% of viewport height

#### Dark Section Detection
- Checks for `data-dark-section="true"` attribute
- Toggles text colors: white (dark sections) ↔ foreground (light sections)
- Sections marked dark: Hero, Stats, CTA

#### Navigation Links
| Label | Path |
|-------|------|
| Services | /services |
| Case Studies | /case-studies |
| Resources | /resources |
| About | /about |
| Contact | /contact |

#### Language Selector
- Options: EN (default), DE
- Dropdown with click-outside close

#### Mobile Menu
- Full-width overlay at top-[72px]
- Backdrop blur with 95% opacity
- Vertical navigation links

### Footer

**File:** `src/components/layout/Footer.tsx`

**Structure:** 4-column grid (2 cols mobile)

| Column | Content |
|--------|---------|
| 1 (Brand) | Logo, description, social links |
| 2 (Services) | 6 service links |
| 3 (Company) | About, Case Studies, Resources, Contact |
| 4 (Contact) | Email, Privacy, Terms |

**Social Links:** LinkedIn, Twitter

---

## Section Specifications

### 1. Hero Section

**File:** `src/components/sections/Hero.tsx`

**Height:** h-screen (100vh)

#### Content

| Element | Text |
|---------|------|
| Eyebrow | "Capital Markets Communications" |
| Headline Line 1 | "Build awareness." |
| Headline Line 2 | "Build value." (fuji-nezu color) |
| Subtitle Label | "Full-Stack Investor Relations" |
| Description | "We help public companies build shareholder bases across North America and Europe. Turn corporate milestones into market cap." |

#### CTAs
| Button | Style | Link |
|--------|-------|------|
| "Launch Your Campaign" | Primary white | /contact |
| "View Case Studies" | Ghost | /case-studies |

#### Floating Metrics Card (Desktop)
| Metric | Value |
|--------|-------|
| Market cap generated | $50M+ |
| Campaigns executed | 200+ |
| Continents covered | 3 |

#### Background Options

**Current (v2.4.4): Static Image**
- **Image:** `/images/hero-bg-temp.jpg`
- **Overlay:** 40% black opacity
- **Texture:** Gradient overlay (fuji-nezu to toki-nezu at 30%)
- **Description:** Night sky with Milky Way, person standing on cliff edge

**Alternative: Animated Video (can revert)**
- **Video:** `/videos/meridian-hero-v3-loop.mp4` (8s loop)
- **Overlay:** 60% black opacity
- **Features:** Video-synced glow animation on metrics card
- **Documentation:** See `docs/prds/2026-01-27-video-animation-sync.md`

To revert to video background, replace the image code block with:
```tsx
{/* Background video - looping */}
<div className="absolute inset-0 -z-10">
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/meridian-hero-v3-loop.mp4" type="video/mp4" />
  </video>
  {/* Dark opacity overlay - 60% for good text readability */}
  <div className="absolute inset-0 bg-black/60" />
  {/* Subtle texture overlay */}
  <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-gradient-to-br from-fuji-nezu/10 via-transparent to-toki-nezu/10" />
</div>
```

#### Video-Synced Glow Animation (when using video)
- Card box-shadow pulses with video progress
- Text shadow intensity follows video keypoints
- Peak glow at 50% video progress (4 seconds)
- Uses `requestAnimationFrame` + `video.currentTime` for perfect sync
- See `docs/prds/2026-01-27-video-animation-sync.md` for full implementation

---

### 2. Stats Section

**File:** `src/components/sections/Stats.tsx`

**Container Height:** 75vh (25vh × 3 audiences)

#### Scroll Behavior
- **Sticky position:** top-[72px]
- **Audience switching:** One-way progression (Emerging → Growth → Established)
- **Scroll snap:** Proximity snap at each 25vh interval

#### Audience Selector Bar
| Element | Style |
|---------|-------|
| Heading | "Strategic partnerships · Results-driven approach" |
| Pills | Emerging, Growth, Established |
| Active pill | white bg, shikoku text, indicator dot |
| Inactive pill | white/60 text |

#### Metrics by Audience

| Metric | Emerging | Growth | Established |
|--------|----------|--------|-------------|
| Market Cap Lift | $12M+ | $52M+ | $115M+ |
| Clients Served | 45+ | 60+ | 25+ |
| Volume Increase | 2.1x | 3.4x | 4.2x |
| 4th Metric | 90 days | 85% retention | 98% compliance |

#### Transitional Copy (Outside Sticky)

| Audience | Headline | Tone |
|----------|----------|------|
| Emerging | "Breaking through the noise" | Problem-aware |
| Growth | "We scale with you" | Partnership |
| Established | "Transform milestones into market cap" | Results-driven |

#### Critical Constraint
**Sticky content must be shorter than container scroll distance.** The transitional copy section is placed OUTSIDE the sticky container to prevent header overlay issues.

---

### 3. Services Section

**File:** `src/components/sections/Services.tsx`

**Container Height:** 600vh (100vh × 6 services)

#### Scroll Behavior
- **Sticky position:** top-0, h-screen
- **Service switching:** Maps scroll progress to service index
- **Scroll snap:** Proximity snap at each 100vh interval

#### Services

| ID | Title | Icon | Image |
|----|-------|------|-------|
| advertising | Digital Advertising | Target | business-strategy.jpg |
| content | Content & Publications | FileText | content-publications.jpg |
| europe | European Distribution | Globe | market-insights.jpg |
| email | Email Marketing | Mail | outreach-campaigns.jpg |
| social | Social & Video | Video | product-planning.jpg |
| analytics | Analytics & Reporting | BarChart3 | seo-technical.jpg |

#### Layout
- **Left column (md:4):** Section header + service selector
- **Right column (md:8):** Service detail card with image

#### Audience-Specific Content
Each service has 3 content variations (startups, scaleups, enterprise) with different headlines, emphasis phrases, and descriptions.

---

### 4. Features Section

**File:** `src/components/sections/Features.tsx`

**Background:** bg-fuji-nezu/60

#### Feature Cards

| Card | Title | Icon | Image |
|------|-------|------|-------|
| Wave (large) | Full-Stack Coverage | - | data-driven.jpg |
| BentoWithImage | Global Reach | Globe | dedicated-teams.jpg |
| BentoWithImage | Sector Expertise | Pickaxe | creative.jpg |
| BentoWithImage | Measurable Results | BarChart3 | transparency.jpg |
| BentoWithImage | Compliance Aware | Sparkles | security.jpg |

#### Layout
- Top row: 2/3 + 1/3 split
- Bottom row: 1/2 + 1/2 split

---

### 5. CTA Section

**File:** `src/components/sections/CTA.tsx`

**Background:** bg-primary (shikoku)

#### Content
| Element | Text |
|---------|------|
| Headline | "Ready to build your shareholder base?" |
| Subheading | "Let's discuss how we can amplify your next financing, corporate milestone, or market catalyst." |

#### CTAs
| Button | Style | Link |
|--------|-------|------|
| "Schedule a Strategy Call" | Secondary | /contact |
| "See Our Work" | Outline | /case-studies |

#### Background Animation
- 3 floating blobs with looping animations (15-20s)
- Scale and position breathing effects

---

## Animation System

### Framer Motion Patterns

| Pattern | Duration | Trigger |
|---------|----------|---------|
| Fade in + slide up | 0.6s | Page load / in-view |
| Staggered children | 0.1s delay each | Parent in-view |
| Spring numbers | stiffness: 100, damping: 30 | Value change |
| Scale + fade | 0.4s | Content switch |

### Scroll Behaviors

| Section | Behavior | Configuration |
|---------|----------|---------------|
| Stats | Sticky + audience switch | top-[72px], 75vh container |
| Services | Sticky + service switch | top-0, 600vh container |

### Scroll Snap

```css
html {
  scroll-snap-type: y proximity;
}

.snap-section {
  scroll-snap-align: start;
}
```

Applied to: Stats (3 targets at 25vh intervals), Services (6 targets at 100vh intervals)

### Transition Timing

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 0.2s | Hover states |
| Normal | 0.25-0.4s | Element animations |
| Slow | 0.6-0.8s | Page load animations |
| Loop | 15-20s | Background blobs |

---

## Assets

### Images

**Services** (`/images/services/`):
- business-strategy.jpg
- content-publications.jpg
- market-insights.jpg
- outreach-campaigns.jpg
- product-planning.jpg
- seo-technical.jpg

**Features** (`/images/features/`):
- data-driven.jpg
- dedicated-teams.jpg
- creative.jpg
- transparency.jpg
- security.jpg

### Videos

| File | Duration | Usage |
|------|----------|-------|
| `/videos/meridian-hero-v3-loop.mp4` | 8s | Hero background (loops) |

---

## Configuration & Constants

**File:** `src/lib/constants.ts`

### Brand
```typescript
BRAND_NAME = "Meridian"
BRAND_TAGLINE = "Capital Markets Communications"
SITE_URL = "https://meridian.agency"
SITE_DESCRIPTION = "Full-stack investor relations..."
```

### Audience Segments
```typescript
AUDIENCE_SEGMENTS = [
  { id: "startups", label: "Emerging" },
  { id: "scaleups", label: "Growth" },
  { id: "enterprise", label: "Established" }
]
```

### Navigation
```typescript
NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
]
```

---

## Critical Constraints

### Stats Section Positioning

| Setting | Value | Purpose |
|---------|-------|---------|
| Container height | 75vh (25vh × 3) | Scroll distance for audience switching |
| Sticky top | 72px | Position below header |
| Dark bg extension | 72px | Fill behind header when sticky |
| isSticky threshold | 73 | Detection threshold |

**⚠️ CRITICAL:** Sticky content must be shorter than container scroll distance. If header overlays content, check that no extra content was added inside the sticky container.

### Header Height Assumptions
- Normal state: ~73px
- Pill state: ~64px from top edge
- Stats uses 72px as baseline

### Dark Mode
- CSS variables defined but **intentionally disabled**
- Site forces `light` color scheme regardless of system preference

---

## File References

| Component | File Path |
|-----------|-----------|
| Page | `src/app/page.tsx` |
| Layout | `src/app/layout.tsx` |
| Global CSS | `src/app/globals.css` |
| Header | `src/components/layout/Header.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Hero | `src/components/sections/Hero.tsx` |
| Stats | `src/components/sections/Stats.tsx` |
| Services | `src/components/sections/Services.tsx` |
| Features | `src/components/sections/Features.tsx` |
| CTA | `src/components/sections/CTA.tsx` |
| Constants | `src/lib/constants.ts` |
| Audience Context | `src/lib/hooks/useAudienceContext.tsx` |

---

## Related Documentation

- `docs/prds/2026-01-28-stats-section-scroll.md` - Stats scroll behavior details
- `docs/changelogs/2026-01-28-scroll-audience-switching.md` - Recent changes
- `docs/changelogs/2026-01-27-ui-improvements.md` - Header and theme changes
