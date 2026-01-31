# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meridian is a B2B marketing agency website built with Next.js 16 (App Router). The site targets capital markets and investor relations services for public companies. It features a sophisticated Japanese-inspired color palette ("Japanese Greydients"), SEO infrastructure with JSON-LD structured data, and Framer Motion animations.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint (eslint-config-next)
```

Docker deployment:
```bash
docker compose up -d              # Build and run
docker build -t marketing-site .  # Manual build
```

## Architecture

### Data Flow

All site content is centralized in `src/lib/constants.ts`:
- `BRAND_NAME`, `SITE_URL`, `SITE_DESCRIPTION` - Brand configuration
- `SERVICES` - Service card data (id, title, shortDescription, icon)
- `SERVICE_DETAILS` - Full service page content (features, process, benefits, FAQs)
- `NAV_LINKS`, `SOCIAL_LINKS`, `CONTACT_EMAIL` - Site-wide configuration
- `AUDIENCE_SEGMENTS` - For audience selector component

Service detail pages (`/services/[slug]`) use `generateStaticParams()` to pre-render all service pages from `SERVICES` array.

### SEO Infrastructure

Metadata generation lives in `src/lib/metadata.ts`:
- `generateMetadata()` - Page metadata with OG/Twitter cards
- `generateServiceSchema()` - Service JSON-LD
- `generateFAQSchema()` - FAQ page JSON-LD
- `generateBreadcrumbSchema()` - Breadcrumb JSON-LD
- `generateArticleSchema()` - Blog article JSON-LD

The `JsonLd` component (`src/components/seo/JsonLd.tsx`) injects schema data into pages.

### Component Organization

```
src/components/
├── layout/        # Header, Footer (barrel export via index.ts)
├── sections/      # Page sections (Hero, Services, Features, Stats, CTA, etc.)
│                  # Barrel export via index.ts
├── ui/            # shadcn/ui primitives (Button, Card, Tabs, Accordion, etc.)
├── seo/           # JsonLd component
├── blog/          # BlogCard, BlogHeader, TableOfContents
└── analytics/     # GoogleAnalytics
```

Section components are imported from `@/components/sections` barrel:
```tsx
import { Hero, Services, Features, CTA, Stats } from "@/components/sections";
```

### Blog System

Blog content is stored in `src/lib/blog.ts` as TypeScript objects (not MDX). Uses:
- `getAllPosts()`, `getPostBySlug()`, `getPostsByCategory()`
- `getRelatedPosts()` - Same category, excluding current post
- `formatDate()` - Display formatting

### Styling System

**Brand Colors (Japanese Greydients)**:
- `--shikoku` (#2E2930) - Primary dark, buttons, CTAs
- `--fuji-nezu` (#A6A5C4) - Accent, highlights, icons
- `--toki-nezu` (#E4D2D8) - Secondary, soft accents (decorative only)

Use Tailwind classes directly: `bg-shikoku`, `text-fuji-nezu`, `bg-toki-nezu/10`

**Custom Shadows**:
- `shadow-soft` - Cards, containers (layered, diffused)
- `shadow-crisp` - Elevated elements (sharper)

**Gradients**: `gradient-warm`, `gradient-soft`, `gradient-dreamy`, `gradient-featured`

See `STYLING.md` for animation patterns (Framer Motion) and detailed usage.

### Custom Hooks

`src/lib/hooks/useCountUp.ts` - Animated counter with format support:
```tsx
const { displayValue, ref } = useCountUp({
  end: 50,
  suffix: "+",
  prefix: "$",
  duration: 2000,
});
```

### Icon System

Service pages use a centralized `iconMap` in `src/app/services/[slug]/page.tsx` that maps string names to Lucide icons. Add new icons to this map when extending service features.

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | All site content and configuration |
| `src/lib/metadata.ts` | SEO metadata and JSON-LD generators |
| `src/app/globals.css` | CSS variables, custom utilities, brand colors |
| `SITE-SPEC.md` | Complete site specification (styling, components) |
| `STYLING.md` | Design system and CSS utility reference |
| `docs/CHANGE-CHECKLIST.md` | Pre/post change workflow |

## Documentation Workflow

For significant changes:
1. Create PRD in `docs/prds/` using the template
2. Update `SITE-SPEC.md` if styling/components changed
3. Add entry to `CHANGELOG.md`
4. Create detailed changelog in `docs/changelogs/`

## Conventions

- Commit messages follow conventional format: `feat:`, `fix:`, `docs:`, `refactor:`
- Light mode only (dark mode is disabled via CSS)
- Use semantic color variables (`bg-primary`, `text-muted-foreground`) over brand colors for UI elements
- Brand colors (`bg-fuji-nezu/20`) reserved for decorative elements only
