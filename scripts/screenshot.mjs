import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3031';
const OUTPUT_DIR = './screenshots';

// Viewport configurations
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function captureScreenshots() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();

  for (const viewport of viewports) {
    console.log(`Capturing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2, // Retina quality
    });

    const page = await context.newPage();

    // Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Wait for animations to settle
    await page.waitForTimeout(500);

    // Full page screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `homepage-${viewport.name}-full.png`),
      fullPage: true,
    });

    // Viewport-only screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `homepage-${viewport.name}-viewport.png`),
      fullPage: false,
    });

    // Capture individual sections (desktop only for detailed review)
    if (viewport.name === 'desktop') {
      // Scroll to capture each section
      const sections = [
        { name: 'hero', selector: 'section:first-of-type' },
        { name: 'stats', selector: 'section.border-y' },
        { name: 'services', selector: 'section:has(.gradient-warm)' },
        { name: 'features', selector: 'section.bg-muted\\/30' },
        { name: 'cta', selector: 'section.bg-primary' },
      ];

      for (const section of sections) {
        try {
          const element = await page.$(section.selector);
          if (element) {
            await element.screenshot({
              path: path.join(OUTPUT_DIR, `section-${section.name}.png`),
            });
            console.log(`  - Captured ${section.name} section`);
          }
        } catch (e) {
          console.log(`  - Could not capture ${section.name}: ${e.message}`);
        }
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${OUTPUT_DIR}/`);
}

captureScreenshots().catch(console.error);
