# NBN Marketing Site Specification

**Version:** 2.1.0
**Last Updated:** 2026-02-11
**Status:** Production

This document is the single source of truth for the NBN Marketing site's styling, components, and content structure.

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Typography & Spacing](#2-typography--spacing)
3. [CSS Utilities](#3-css-utilities)
4. [Components](#4-components)
5. [Page Structure](#5-page-structure)
6. [Content Reference](#6-content-reference)
7. [Assets](#7-assets)
8. [Hooks & Utilities](#8-hooks--utilities)
9. [Version History](#9-version-history)

---

## 1. Brand Identity

### 1.1 Brand Information

| Property | Value |
|----------|-------|
| Brand Name | NBN Marketing |
| Tagline | Capital Markets Communications |
| Site URL | https://nbnmarketing.com |
| Description | Full-stack investor relations for public companies. We help issuers build market value through strategic communications across North America and Europe. |

### 1.2 Color Palette - Japanese Greydients

| Name | CSS Variable | Hex | RGB | Usage |
|------|--------------|-----|-----|-------|
| **Shikoku** (紫黒) | `--shikoku` | `#2E2930` | 46, 41, 48 | Primary dark - buttons, CTAs, headers, text |
| **Fuji Nezu** (藤鼠) | `--fuji-nezu` | `#A6A5C4` | 166, 165, 196 | Accent - highlights, icons, interactive elements |
| **Toki Nezu** (鴇鼠) | `--toki-nezu` | `#E4D2D8` | 228, 210, 216 | Soft - decorative accents only (NOT backgrounds) |

### 1.3 Semantic Color Mapping

```css
/* Primary - Shikoku */
--primary: #2E2930;
--primary-foreground: #FAFAFA;

/* Secondary - Toki Nezu */
--secondary: #E4D2D8;
--secondary-foreground: #2E2930;

/* Accent - Fuji Nezu */
--accent: #A6A5C4;
--accent-foreground: #2E2930;

/* Neutral colors */
--background: oklch(0.985 0 0);      /* Off-white */
--foreground: oklch(0.145 0 0);      /* Near black */
--muted: oklch(0.97 0 0);            /* Light grey */
--muted-foreground: oklch(0.45 0 0); /* Medium grey */
--border: oklch(0.922 0 0);          /* Light border */
--card: oklch(1 0 0);                /* White */
```

### 1.4 Color Usage Guidelines

| Context | Correct | Incorrect |
|---------|---------|-----------|
| Section backgrounds | `bg-muted/30`, `bg-background` | `bg-toki-nezu/20` |
| Card backgrounds | `bg-card` | `bg-fuji-nezu/10` |
| Borders | `border-border` | `border-toki-nezu/40` |
| Icon containers | `bg-primary/10` | `bg-fuji-nezu/20` |
| CTA buttons | `bg-primary` (Shikoku) | - |
| Text accents | `text-fuji-nezu` | - |
| Decorative blobs | `bg-fuji-nezu/10` | - |

---

## 2. Typography & Spacing

### 2.1 Font Stack

```css
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, monospace;
```

### 2.2 Text Sizes

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 0.75rem | Eyebrow labels, disclaimers |
| `text-sm` | 0.875rem | Body small, captions, nav |
| `text-base` | 1rem | Body text |
| `text-lg` | 1.125rem | Large body, subheadings |
| `text-xl` | 1.25rem | Card titles |
| `text-2xl` | 1.5rem | Section subheadings |
| `text-3xl` | 1.875rem | Section headings (mobile) |
| `text-4xl` | 2.25rem | Section headings (desktop) |
| `text-5xl` | 3rem | Hero headline (mobile) |
| `text-6xl` | 3.75rem | Hero headline (tablet) |
| `text-7xl` | 4.5rem | Hero headline (desktop) |

### 2.3 Eyebrow Text Pattern

```tsx
<p className="text-xs font-medium uppercase tracking-[0.25em] text-fuji-nezu mb-6">
  Capital Markets Communications
</p>
```

### 2.4 Border Radius Scale

```css
--radius: 0.75rem;           /* Base */
--radius-sm: 0.5rem;         /* Small elements */
--radius-md: 0.625rem;       /* Medium elements */
--radius-lg: 0.75rem;        /* Cards */
--radius-xl: 1rem;           /* Large cards */
--radius-2xl: 1.25rem;       /* Featured cards */
--radius-3xl: 1.5rem;        /* Hero elements */
--radius-full: 9999px;       /* Pills, buttons */
```

### 2.5 Spacing Conventions

| Context | Class |
|---------|-------|
| Container | `mx-auto max-w-7xl px-6 lg:px-8` |
| Section padding | `py-24 lg:py-32` |
| Card padding | `p-6 md:p-8` |
| Grid gap | `gap-4 md:gap-6` or `gap-8` |

---

## 3. CSS Utilities

### 3.1 Shadow Utilities

**shadow-soft** - For cards and containers
```css
--shadow-soft:
  0 0 0 1px rgba(0,0,0,0.05),
  0 1px 1px 0 rgba(0,0,0,0.05),
  0 2px 2px 0 rgba(0,0,0,0.05),
  0 4px 4px 0 rgba(0,0,0,0.05),
  0 8px 8px 0 rgba(0,0,0,0.05),
  0 16px 16px 0 rgba(0,0,0,0.05);
```

**shadow-crisp** - For elevated elements
```css
--shadow-crisp:
  0 0 0 1px rgba(0,0,0,0.06),
  0 1px 1px -0.5px rgba(0,0,0,0.06),
  0 3px 3px -1.5px rgba(0,0,0,0.06),
  0 6px 6px -3px rgba(0,0,0,0.06),
  0 12px 12px -6px rgba(0,0,0,0.06),
  0 24px 24px -12px rgba(0,0,0,0.06);
```

### 3.2 Gradient Classes

**gradient-warm** - For visual areas and featured sections
```css
.gradient-warm {
  background: linear-gradient(
    135deg,
    oklch(0.95 0.05 85) 0%,
    oklch(0.92 0.08 75) 25%,
    oklch(0.88 0.12 60) 50%,
    oklch(0.90 0.10 350) 75%,
    oklch(0.92 0.08 280) 100%
  );
}
```

**gradient-soft** - For subtle backgrounds
```css
.gradient-soft {
  background: linear-gradient(
    180deg,
    oklch(0.98 0.02 320) 0%,
    oklch(0.96 0.04 310) 50%,
    oklch(0.94 0.06 300) 100%
  );
}
```

**gradient-dreamy** - For featured card backgrounds
```css
.gradient-dreamy {
  background: linear-gradient(
    135deg,
    oklch(0.92 0.06 220) 0%,
    oklch(0.94 0.05 280) 30%,
    oklch(0.96 0.04 340) 60%,
    oklch(0.94 0.06 30) 100%
  );
}
```

### 3.3 Animation Classes

**indicator-dot** - Active state indicator
```css
.indicator-dot {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, var(--fuji-nezu), var(--toki-nezu));
  border-radius: 50%;
  animation: dot-appear 0.2s ease-out;
}

@keyframes dot-appear {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
```

**nav-link-underline** - Animated underline on hover
```css
.nav-link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--fuji-nezu);
  transition: width 0.2s ease;
}
.nav-link-underline:hover::after {
  width: 100%;
}
```

**card-hover** - Card lift effect
```css
.card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 32px -12px rgb(0 0 0 / 0.08);
}
```

**pill-tab-container** - Tab container styling
```css
.pill-tab-container {
  background: oklch(0.97 0 0);
  border: 1px solid oklch(0.92 0 0);
}
```

---

## 4. Components

### 4.1 Section Components

#### Hero (`src/components/sections/Hero.tsx`)

**Purpose:** Landing page hero with dark gradient background

**Key Styling:**
- Dark gradient background with Ken Burns effect
- Glassmorphism metrics card
- Light text on dark background

**CSS Classes:**
```tsx
// Container
className="relative min-h-screen overflow-hidden"

// Background gradient (inline style)
background: `
  radial-gradient(ellipse 80% 50% at 50% 0%, rgba(166, 165, 196, 0.15) 0%, transparent 50%),
  radial-gradient(ellipse 60% 40% at 80% 100%, rgba(228, 210, 216, 0.1) 0%, transparent 40%),
  linear-gradient(180deg, #1a1a2e 0%, #2E2930 40%, #1f1f2e 100%)
`

// Glassmorphism card
className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md p-5"
```

**Animations:**
- Ken Burns: `scale: [1, 1.05]` over 25s, infinite
- Staggered fade-in: `opacity: [0, 1]`, `y: [20, 0]`, delays 0.1-0.5s
- Scroll indicator: `y: [0, 6, 0]` over 1.5s

---

#### Stats (`src/components/sections/Stats.tsx`)

**Purpose:** Animated counter statistics

**Key Styling:**
```tsx
// Section - LIGHT background
className="border-y border-border/50 py-20 lg:py-24"

// Grid
className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12"

// Stat value
className="text-4xl font-bold tracking-tight lg:text-5xl"

// Stat label
className="mt-3 text-sm text-muted-foreground"
```

**Animations:**
- Uses `useCountUp` hook for number animation (1500ms duration)
- Staggered entrance: `opacity: [0, 1]`, `y: [20, 0]`, delay: index * 0.15s
- Triggered by `useInView` at `amount: 0.2`

---

#### Services (`src/components/sections/Services.tsx`)

**Purpose:** Interactive service selector with audience tabs

**Key Styling:**
```tsx
// Sidebar card
className="rounded-2xl bg-card border border-border/50 p-4 shadow-soft"

// Selected service button - USE MUTED, NOT BRAND COLORS
className="bg-muted font-medium"  // Correct
// NOT: "bg-toki-nezu/50 font-medium text-shikoku"  // Incorrect

// Content card
className="rounded-3xl bg-card border border-border/50 overflow-hidden shadow-soft"

// Visual area with gradient
className="h-64 md:h-80 gradient-warm relative overflow-hidden"
```

**Animations:**
- Pill tab entrance with stagger
- AnimatePresence for content switching
- Icon scale on hover: `whileHover={{ scale: 1.05 }}`

---

#### Features (`src/components/sections/Features.tsx`)

**Purpose:** Bento grid showcasing differentiators

**Key Styling:**
```tsx
// Section - LIGHT background
className="py-24 lg:py-32 bg-muted/30"

// Icon container - USE PRIMARY, NOT BRAND COLORS
className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"

// Icon
className="h-6 w-6 text-primary"
```

**Animations:**
- Container stagger: `staggerChildren: 0.1`
- Card entrance with custom easing: `[0.25, 0.46, 0.45, 0.94]`
- Icon hover scale: `whileHover={{ scale: 1.05 }}`

---

#### CTA (`src/components/sections/CTA.tsx`)

**Purpose:** Call-to-action section (intentionally dark)

**Key Styling:**
```tsx
// Section - DARK background (bg-primary)
className="relative overflow-hidden bg-primary py-24 lg:py-32"

// Floating blobs
className="h-[500px] w-[500px] rounded-full bg-fuji-nezu/10 blur-3xl"

// Text
className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
```

**Animations:**
- Floating blobs: `x: [0, 20, 0]`, `y: [0, -15, 0]` over 15-18s
- Center blob pulse: `scale: [1, 1.1, 1]` over 20s

---

#### Footer (`src/components/layout/Footer.tsx`)

**Purpose:** Multi-column footer

**Key Styling:**
```tsx
// Section - LIGHT background
className="border-t border-border bg-muted/30"

// Container
className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16"

// Grid
className="grid grid-cols-2 gap-8 md:grid-cols-4"
```

---

### 4.2 UI Components

#### BentoCard (`src/components/ui/bento-card.tsx`)

Three variants:

**BentoCard (Base)**
```tsx
className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-soft card-hover"
```

**BentoCardFeatured**
```tsx
// Accepts gradient prop: "warm" | "soft" | "dreamy"
className="rounded-3xl overflow-hidden gradient-{variant}"
```

**BentoCardWave**
```tsx
className="relative rounded-3xl overflow-hidden shadow-crisp"
// Includes SVG wave decoration and image background
```

---

## 5. Page Structure

### 5.0 Routing & i18n

All pages live under `src/app/[locale]/`. The site supports EN (default, no prefix) and DE (`/de/...`).

```
src/app/
├── layout.tsx              ← Thin root (returns children, no <html>/<body>)
├── globals.css
├── sitemap.ts              ← Dual-locale sitemap with hreflang
├── feed.xml/route.ts
└── [locale]/
    ├── layout.tsx          ← Main layout (<html lang>, NextIntlClientProvider)
    ├── page.tsx            ← Homepage
    ├── about/page.tsx
    ├── blog/page.tsx
    ├── blog/[slug]/page.tsx
    ├── case-studies/page.tsx
    ├── contact/page.tsx
    ├── services/page.tsx
    ├── services/[slug]/page.tsx
    ├── legal/privacy/page.tsx
    ├── legal/terms/page.tsx
    ├── resources/page.tsx  ← Redirects to /blog
    └── not-found.tsx
```

**URL examples:**
- EN: `/`, `/services`, `/about`, `/blog/my-post`
- DE: `/de`, `/de/services`, `/de/about`, `/de/blog/my-post`

### 5.1 Homepage (`/`)

```
Hero
  └─ Dark gradient background
  └─ Headline: "Build awareness. Build value."
  └─ Glassmorphism metrics card

Stats
  └─ Light background (border-y border-border/50)
  └─ 4 animated counters

Services
  └─ Light background
  └─ Audience segment tabs
  └─ Service selector sidebar
  └─ Content card with gradient visual

Features
  └─ Light background (bg-muted/30)
  └─ Bento grid layout

CTA
  └─ Dark background (bg-primary)
  └─ Floating blob decorations
```

### 5.2 Service Detail Page (`/services/[slug]`)

```
Breadcrumb
Hero (light)
  └─ Service icon
  └─ Headline & tagline
  └─ CTA buttons
Features Grid
  └─ 6 feature cards
Process Section
  └─ 4 numbered steps
Benefits Section
  └─ 4 benefit cards
FAQ Section
  └─ Accordion
Related Services
CTA
```

---

## 6. Content Reference

### 6.1 Stats Values

| Value | Label |
|-------|-------|
| $50M+ | Market Cap Generated |
| 200+ | Campaigns Executed |
| 3 | Continents Covered |
| 15+ | Years Experience |

### 6.2 Services

| ID | Title | Icon |
|----|-------|------|
| advertising | Digital Advertising | Target |
| content | Content & Publications | FileText |
| europe | European Distribution | Globe |
| email | Email Marketing | Mail |
| social | Social & Video | Video |
| analytics | Analytics & Reporting | BarChart3 |

### 6.3 Audience Segments

| ID | Label | Description |
|----|-------|-------------|
| startups | Emerging | Early-stage public companies |
| scaleups | Growth | Companies with catalysts |
| enterprise | Established | Mature issuers |

---

## 7. Assets

### 7.1 Images

| Path | Purpose |
|------|---------|
| `/images/hero/hero-bg.jpg` | Hero background |
| `/images/features/data-driven.jpg` | BentoCardWave image |
| `/images/features/*.jpg` | Feature section images |
| `/images/services/*.jpg` | Service page images |

### 7.2 Icons

All icons from `lucide-react`:
- Navigation: Menu, X, ChevronDown
- Services: Target, FileText, Globe, Mail, Video, BarChart3
- UI: ArrowRight, Calendar, Clock
- Social: Linkedin, Twitter

---

## 8. Hooks & Utilities

### 8.1 useCountUp

**Path:** `src/lib/hooks/useCountUp.ts`

**Usage:**
```tsx
const { formattedValue, start } = useCountUp(stat.value, {
  duration: 1500,
  delay: index * 150,
});
```

**Supported Formats:**
- `$50M+` - prefix + number + suffix
- `3x`, `95%`, `50+` - suffix only
- Respects `prefers-reduced-motion`

---

## 9. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.1.0 | 2026-02-11 | next-intl i18n: EN/DE localization with locale-based routing |
| 2.0.1 | 2026-01-26 | Fixed dark theme bleeding, restored light sections |
| 2.0.0 | 2026-01-26 | Capital Markets repositioning |
| 1.2.0 | 2026-01-26 | Added Framer Motion animations |
| 1.1.0 | 2026-01-26 | Added Japanese Greydients colors |
| 1.0.0 | 2026-01-25 | Initial release |

---

## Quick Reference Card

### Section Backgrounds
```
Hero       → Dark gradient (inline style)
Stats      → border-y border-border/50 (light)
Services   → bg-card (light)
Features   → bg-muted/30 (light)
CTA        → bg-primary (dark)
Footer     → border-border bg-muted/30 (light)
```

### Icon Containers
```tsx
// Correct
className="bg-primary/10"
<Icon className="text-primary" />

// Incorrect
className="bg-fuji-nezu/20"
<Icon className="text-shikoku" />
```

### Selected States
```tsx
// Correct
className="bg-muted font-medium"

// Incorrect
className="bg-toki-nezu/50 text-shikoku"
```
