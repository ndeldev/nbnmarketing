# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NBN Marketing is a capital markets communications website built with Next.js 16 (App Router). The site targets investor relations services for public companies. It features a sophisticated Japanese-inspired color palette ("Japanese Greydients"), SEO infrastructure with JSON-LD structured data, and Framer Motion animations.

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

## Deployment

**GitHub Repository:** [ndeldev/nbnmarketing](https://github.com/ndeldev/nbnmarketing)

**Vercel Deployment:**
- Production URL: https://nbnmarketing.com
- Vercel URL: https://nbnmarketing.vercel.app
- Auto-deploys on push to `main` branch
- Preview deployments for pull requests

**Vercel Project Details:**
- Project: `nbnmarketing`
- Team: `ndels-projects-7138abea`
- Framework: Next.js (auto-detected)
- Node version: 24.x

**Checking Deployment Status:**
```bash
# Via Vercel MCP (if connected)
mcp__vercel__get_project teamId="ndels-projects-7138abea" projectId="nbnmarketing"

# Via Vercel CLI
vercel list
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

Icons are centralized in `src/lib/icons.ts`. Use `getIcon(name)` to get an icon component by string name. Add new icons to this file when extending service features.

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | All site content, config, BUSINESS_INFO, IMAGE_PATHS |
| `src/lib/metadata.ts` | SEO metadata and JSON-LD generators |
| `src/lib/icons.ts` | Centralized icon map (47 icons) |
| `src/lib/animations.ts` | Shared animation constants (EASING, DURATION, variants) |
| `src/app/globals.css` | CSS variables, custom utilities, brand colors |
| `SITE-SPEC.md` | Complete site specification (styling, components) |
| `STYLING.md` | Design system and CSS utility reference |
| `docs/CHANGE-CHECKLIST.md` | Pre/post change workflow |
| `tasks/todo.md` | Refactoring tasks and progress |
| `tasks/lessons.md` | Patterns and mistakes to avoid |

## Documentation Workflow

For significant changes:
1. Create PRD in `docs/prds/` using the template
2. Update `SITE-SPEC.md` if styling/components changed
3. Add entry to `CHANGELOG.md`
4. Create detailed changelog in `docs/changelogs/`

## Analytics

Google Analytics 4 is integrated via the `GoogleAnalytics` component in `src/components/analytics/`.

**Environment Variable:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - GA4 measurement ID (format: `G-XXXXXXXXXX`)

Set in Vercel project settings for production. Analytics only loads when the env var is present.

## Conventions

- Commit messages follow conventional format: `feat:`, `fix:`, `docs:`, `refactor:`
- Light mode only (dark mode is disabled via CSS)
- Use semantic color variables (`bg-primary`, `text-muted-foreground`) over brand colors for UI elements
- Brand colors (`bg-fuji-nezu/20`) reserved for decorative elements only

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
