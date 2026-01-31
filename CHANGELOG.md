# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-01-28

### Added - Abstract Hero Image Concepts
- Digital Advertising hero image prompt concepts (6 abstract variations)
- Focus on animated backgrounds without people
- Concepts: Precision Grid, Signal Ripples, Neural Constellation, Beacon Archipelago, Focus Lens, Magnetic Field

---

## [2.1.0] - 2026-01-27

### Added - AI Image Generation Services

Integrated Google's Gemini and Imagen APIs for AI-powered image generation.

**New Services:**
| Service | Models | Use Case |
|---------|--------|----------|
| Gemini (Nano Banana) | `gemini-3-pro-image-preview`, `gemini-2.5-flash-image` | Image editing, multi-turn, complex compositions |
| Imagen | `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001` | Fast text-to-image generation |

**API Endpoints:**
- `POST /api/image/generate` - Generate images (supports both Gemini and Imagen)
- `POST /api/image/edit` - Edit existing images (Gemini only)
- `GET /api/image/status/[jobId]` - Poll job status
- `GET /api/image/download` - Download generated images

**Gemini Features:**
- Text-to-image generation with up to 4K resolution
- Image-to-image editing with text instructions
- Multi-turn editing sessions for iterative refinement
- Thinking mode for complex compositions (configurable token budget)
- Up to 14 reference images for composition
- Google Search grounding for real-time data

**Imagen Features:**
- High-fidelity text-to-image generation
- Multiple model variants (Standard, Ultra, Fast)
- Up to 4 images per request
- Aspect ratios: 1:1, 3:4, 4:3, 9:16, 16:9

**New Files:**
```
src/lib/services/gemini/    # Gemini service layer
src/lib/services/imagen/    # Imagen service layer
src/app/api/image/          # Image generation API routes
```

**Environment Variables:**
```bash
GOOGLE_AI_API_KEY=your-api-key
ENABLE_GEMINI_GENERATION=true
ENABLE_IMAGEN_GENERATION=true
```

---

## [2.0.1] - 2026-01-26

### Fixed - Theme & Styling Restoration
- **Removed dark overlay** in `page.tsx` that was covering entire site
- **Restored light theme** for Stats, Features, Footer sections
- **Fixed color usage**: Changed from brand colors to semantic colors for backgrounds

### Changed
| File | Before | After |
|------|--------|-------|
| `page.tsx` | Fixed dark overlay div | Removed |
| `Stats.tsx` | `border-toki-nezu/50 bg-toki-nezu/20` | `border-border/50` |
| `Features.tsx` | `bg-fuji-nezu/20` | `bg-primary/10` |
| `Services.tsx` | `bg-toki-nezu/50 text-shikoku` | `bg-muted` |
| `Footer.tsx` | `border-toki-nezu/40 bg-toki-nezu/10` | `border-border bg-muted/30` |
| `globals.css` | No dark mode override | Added `@media (prefers-color-scheme: dark)` force |
| `layout.tsx` | No theme class | Added `light` class + `colorScheme: 'light'` |

### Added - Documentation System
- **SITE-SPEC.md**: Complete site specification document
- **docs/**: Documentation folder structure
  - `docs/README.md`: Documentation index
  - `docs/prds/TEMPLATE.md`: PRD template
  - `docs/decisions/TEMPLATE.md`: ADR template
  - `docs/changelogs/2026-01-26-theme-fix.md`: Detailed changelog
  - `docs/CHANGE-CHECKLIST.md`: Pre/post change checklist
- **CONTRIBUTING.md**: Git workflow guidelines

### Design Clarification
Brand colors (shikoku, fuji-nezu, toki-nezu) should be used for **accents only**, not section backgrounds.
Use semantic colors (`muted`, `border`, `primary/10`) for backgrounds and borders.

See: `docs/changelogs/2026-01-26-theme-fix.md` for full details.

---

## [2.0.0] - 2026-01-26

### Changed - Brand Repositioning
- **Complete positioning overhaul**: Repositioned from "B2B Marketing Agency" to "Capital Markets Communications"
- **Hero section**: New headline "Build awareness. Build value.", updated subtitle to IR-focused copy
- **Stats section**: Replaced B2B metrics with capital markets metrics:
  - "$50M+ Market Cap Generated"
  - "200+ Campaigns Executed"
  - "3 Continents Covered"
  - "15+ Years Experience"
- **Services section**: Replaced 6 B2B services with IR-focused offerings:
  - Digital Advertising (Google/Bing PPC, programmatic display)
  - Content & Publications (CEO interviews, company profiles)
  - European Distribution (Frankfurt, DACH campaigns)
  - Email Marketing (Direct investor outreach)
  - Social & Video (LinkedIn, YouTube, CEO video)
  - Analytics & Reporting (Campaign ROI, shareholder tracking)
- **Features section**: Updated to 4 IR differentiators:
  - Full-Stack Coverage
  - Global Reach
  - Sector Expertise
  - Measurable Results
- **CTA section**: Updated headline to "Ready to build your shareholder base?"
- **Metadata**: Updated site title, description, and keywords for capital markets SEO
- **Footer**: Updated description and service links to match new positioning

### Technical
- Added `SITE_KEYWORDS` constant for capital markets terms
- Updated all OpenGraph and Twitter card metadata

## [1.2.0] - 2026-01-26

### Added
- Full Framer Motion animation suite for landing page sections:
  - Stats section: Animated counters that count up from 0 with easing, staggered card entrance
  - Features section: Staggered bento card animations with icon hover effects
  - CTA section: Floating background blobs with infinite animation, staggered text/button entrance
  - Services section: AnimatePresence for smooth content transitions when switching services
- Custom `useCountUp` hook for animated number counting with:
  - Support for various formats (50+, 3x, 95%, 10M+)
  - Configurable duration and delay
  - `prefers-reduced-motion` accessibility support

### Fixed
- Overscroll white space issue on macOS - Hero background now extends above viewport

## [1.1.0] - 2026-01-26

### Added
- Japanese Greydients brand color palette:
  - Shikoku (#2E2930) - Primary dark color for buttons, headers, CTA backgrounds
  - Fuji Nezu (#A6A5C4) - Accent purple-grey for highlights and interactive elements
  - Toki Nezu (#E4D2D8) - Soft pink-grey for backgrounds and subtle accents
- Custom shadow utilities (shadow-soft, shadow-crisp) for layered depth
- Brand color CSS custom properties and Tailwind classes
- Framer Motion library for advanced animations

### Changed
- Updated semantic color variables (--primary, --accent, --secondary) to use brand palette
- Hero badge styling with Fuji Nezu border and shadow-soft
- Stats section background uses Toki Nezu tint (bg-toki-nezu/20)
- Services section active states use brand colors (bg-toki-nezu/50, text-shikoku)
- Features section icon containers use Fuji Nezu (bg-fuji-nezu/20)
- BentoCard components now use shadow-soft
- BentoCardWave components now use shadow-crisp
- CTA decorative elements use Fuji Nezu glow (bg-fuji-nezu/10)
- Footer background uses Toki Nezu tint (bg-toki-nezu/10)
- Navigation underline uses Fuji Nezu accent color

## [1.0.0] - Initial Release

### Added
- Homepage with Hero, Services preview, Features, Stats, CTA sections
- Services overview page with grid of all 7 services
- Individual service pages (7) with:
  - Features grid
  - Process section with numbered steps
  - Benefits section
  - FAQ with JSON-LD schema
  - Related services
- About page with company information
- Contact page with contact form
- Case Studies page for portfolio showcase
- SEO infrastructure:
  - Dynamic sitemap generation
  - robots.txt configuration
  - JSON-LD structured data
- Docker support with Dockerfile and docker-compose.yml
- Tailwind CSS 4 with shadcn/ui components
- Next.js 16 with App Router
