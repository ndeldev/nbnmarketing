# Meridian Marketing Site

**Version:** 2.2.0
**Status:** Production Ready

Capital markets communications website built with Next.js 16, featuring AI-powered image and video generation.

## Features

### Core Site
- **Homepage** - Hero, Services preview, Features, Stats, CTA sections
- **Services Overview** (`/services`) - IR-focused service offerings
- **Individual Service Pages** - Detail pages with features, process, FAQ
- **Blog** - Content marketing articles
- **Resources** - Investor relations resources
- **SEO Infrastructure** - Sitemap, robots.txt, JSON-LD structured data
- **Docker Support** - Dockerfile and docker-compose.yml

### AI Media Generation (v2.1.0)
- **Gemini Image Generation** - Text-to-image, image editing, multi-turn sessions
- **Imagen Generation** - High-fidelity text-to-image (Standard/Ultra/Fast)
- **Veo Video Generation** - AI video generation with seamless loops

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Docker

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build manually
docker build -t marketing-site .
docker run -p 3000:3000 marketing-site
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services pages
│   └── case-studies/      # Case studies
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, CTA, etc.
│   ├── seo/               # JSON-LD structured data
│   └── ui/                # shadcn/ui components
└── lib/
    ├── constants.ts       # Brand name, config
    ├── metadata.ts        # SEO utilities
    └── utils.ts           # Helpers
```

## Brand Configuration

Update the brand name in `src/lib/constants.ts`:

```typescript
export const BRAND_NAME = "YourBrand";
export const BRAND_TAGLINE = "Your Tagline";
export const SITE_URL = "https://yourdomain.com";
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# AI Image Generation (optional)
GOOGLE_AI_API_KEY=your-google-ai-api-key
ENABLE_GEMINI_GENERATION=true
ENABLE_IMAGEN_GENERATION=true
ENABLE_VEO_GENERATION=true
```

## AI Image Generation API

Generate images using Google's Gemini and Imagen models.

### Generate with Gemini (Nano Banana)

```bash
curl -X POST http://localhost:7777/api/image/generate \
  -H "Content-Type: application/json" \
  -d '{
    "service": "gemini",
    "prompt": "A mountain landscape at sunset",
    "model": "gemini-3-pro-image-preview",
    "aspectRatio": "16:9",
    "imageSize": "2K"
  }'
```

### Generate with Imagen

```bash
curl -X POST http://localhost:7777/api/image/generate \
  -H "Content-Type: application/json" \
  -d '{
    "service": "imagen",
    "prompt": "A coffee mug on a wooden table",
    "model": "imagen-4.0-generate-001",
    "numberOfImages": 4
  }'
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/image/generate` | POST | Generate images (Gemini or Imagen) |
| `/api/image/edit` | POST | Edit images with text (Gemini only) |
| `/api/image/status/[jobId]` | GET | Poll job status |
| `/api/image/download?jobId=&index=` | GET | Download generated image |
| `/api/video/generate` | POST | Generate video (Veo) |
| `/api/video/status/[jobId]` | GET | Poll video job status |

## Features

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4 + shadcn/ui
- Japanese Greydients design system (Shikoku, Fuji Nezu, Toki Nezu)
- Custom shadow utilities (shadow-soft, shadow-crisp)
- Framer Motion animations
- SEO optimized (sitemap, robots.txt, JSON-LD)
- AVIF/WebP image optimization
- Docker support
- Core Web Vitals optimized

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy

### Docker

```bash
docker compose up -d
```

### Self-hosted

```bash
npm run build
npm start
```

## License

Private
