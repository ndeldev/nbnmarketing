# Meridian Marketing Site

**Version:** 1.0.0
**Status:** Production Ready

B2B marketing agency website built with Next.js 16, optimized for SEO and performance.

## Version 1.0.0 Features

- **Homepage** - Hero, Services preview, Features, Stats, CTA sections
- **Services Overview** (`/services`) - Grid of all 7 services
- **Individual Service Pages** - 7 detail pages with:
  - Features grid
  - Process section (numbered steps)
  - Benefits section
  - FAQ with JSON-LD schema
  - Related services
- **About Page** - Company information
- **Contact Page** - Contact form
- **Case Studies Page** - Portfolio showcase
- **SEO Infrastructure** - Sitemap, robots.txt, JSON-LD structured data
- **Docker Support** - Dockerfile and docker-compose.yml

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
```

## Features

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
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
