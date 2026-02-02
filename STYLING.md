# Styling Guide

This document outlines the styling conventions, brand colors, and design patterns used throughout the NBN Marketing marketing site.

## Brand Color Palette: Japanese Greydients

The site uses a sophisticated palette inspired by traditional Japanese color names, featuring subtle purple and pink grey tones.

### Primary Colors

| Name | CSS Variable | Hex | Usage |
|------|--------------|-----|-------|
| **Shikoku** (紫黒) | `--shikoku` | `#2E2930` | Primary dark color. Used for buttons, headers, CTA backgrounds, and text. Deep purple-black. |
| **Fuji Nezu** (藤鼠) | `--fuji-nezu` | `#A6A5C4` | Accent color. Used for highlights, interactive elements, icons, and decorative elements. Soft purple-grey (wisteria grey). |
| **Toki Nezu** (鴇鼠) | `--toki-nezu` | `#E4D2D8` | Secondary/soft accent. Used for backgrounds, subtle accents, and section tints. Soft pink-grey (crested ibis grey). |

### Semantic Color Mapping

```css
--primary: #2E2930;         /* Shikoku - buttons, CTAs */
--primary-foreground: #FAFAFA;
--secondary: #E4D2D8;       /* Toki Nezu - secondary buttons */
--secondary-foreground: #2E2930;
--accent: #A6A5C4;          /* Fuji Nezu - highlights */
--accent-foreground: #2E2930;
```

### Tailwind Classes

Use the brand color classes directly:

```html
<!-- Background colors -->
<div class="bg-shikoku">        <!-- #2E2930 -->
<div class="bg-fuji-nezu">      <!-- #A6A5C4 -->
<div class="bg-toki-nezu">      <!-- #E4D2D8 -->

<!-- With opacity -->
<div class="bg-fuji-nezu/20">   <!-- 20% opacity -->
<div class="bg-toki-nezu/10">   <!-- 10% opacity -->

<!-- Text colors -->
<span class="text-shikoku">
<span class="text-fuji-nezu">
<span class="text-toki-nezu">
```

---

## Shadow Utilities

Two custom shadow styles provide layered depth:

### shadow-soft

For cards, containers, and general elevation. Creates a subtle, diffused shadow.

```css
--shadow-soft:
  0 0 0 1px rgba(0,0,0,0.05),
  0 1px 1px 0 rgba(0,0,0,0.05),
  0 2px 2px 0 rgba(0,0,0,0.05),
  0 4px 4px 0 rgba(0,0,0,0.05),
  0 8px 8px 0 rgba(0,0,0,0.05),
  0 16px 16px 0 rgba(0,0,0,0.05);
```

Usage:
```html
<div class="shadow-soft">Card content</div>
```

### shadow-crisp

For elevated elements and featured components. Creates a sharper, more defined shadow.

```css
--shadow-crisp:
  0 0 0 1px rgba(0,0,0,0.06),
  0 1px 1px -0.5px rgba(0,0,0,0.06),
  0 3px 3px -1.5px rgba(0,0,0,0.06),
  0 6px 6px -3px rgba(0,0,0,0.06),
  0 12px 12px -6px rgba(0,0,0,0.06),
  0 24px 24px -12px rgba(0,0,0,0.06);
```

Usage:
```html
<div class="shadow-crisp">Featured card</div>
```

---

## Gradient Classes

### gradient-warm

Warm, multi-stop gradient for visual areas and placeholders:

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

### gradient-soft

Subtle vertical gradient for soft backgrounds:

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

### gradient-dreamy

Dreamy, multi-color gradient for featured sections:

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

---

## Animation Patterns

### Framer Motion

The site uses [Framer Motion](https://www.framer.com/motion/) for animations. Common patterns:

#### Fade In + Slide Up

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  Content
</motion.div>
```

#### Staggered Children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

#### Scroll-Triggered Animation

```tsx
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Floating Animation (Background Elements)

```tsx
<motion.div
  animate={{
    x: [0, 20, 0],
    y: [0, -15, 0],
  }}
  transition={{
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <div className="h-[500px] w-[500px] rounded-full bg-fuji-nezu/10 blur-3xl" />
</motion.div>
```

#### Ken Burns Effect (Hero Background)

```tsx
<motion.div
  initial={{ scale: 1 }}
  animate={{ scale: 1.05 }}
  transition={{
    duration: 25,
    ease: "linear",
    repeat: Infinity,
    repeatType: "reverse",
  }}
>
  {/* Background content */}
</motion.div>
```

#### Scroll-Driven Animations (Performance Critical)

For scroll-driven animations using `useScroll` + `useTransform`, follow these patterns for buttery smooth performance:

**1. Smooth Scroll Values with useSpring**

Raw scroll values can be jittery. Wrap with `useSpring` for smooth interpolation:

```tsx
import { useScroll, useTransform, useSpring } from "framer-motion";

const { scrollYProgress } = useScroll({ target: containerRef });

// Add spring physics for smooth interpolation
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});

// Use smoothProgress for all transforms
const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
const y = useTransform(smoothProgress, [0, 0.5], [30, 0]);
```

**2. Add will-change Hints**

Tell the browser which properties will animate:

```tsx
<motion.div
  className="will-change-[opacity,transform]"
  style={{ opacity, y }}
>
  Content
</motion.div>
```

**3. Avoid CSS Transition Conflicts**

Remove `card-hover` or other transition classes from scroll-animated elements. CSS transitions fight with scroll-driven animations:

```tsx
// ❌ Bad - CSS transitions conflict with scroll animations
<div className="card-hover" style={{ width: animatedWidth }}>

// ✅ Good - No conflicting transitions
<div className="shadow-soft" style={{ width: animatedWidth }}>
```

**4. Sticky Positioning with Fixed Headers**

When using `sticky` with a fixed header, offset by header height:

```tsx
// Header is ~80px when scrolled (top-20 = 5rem = 80px)
<div className="sticky top-20 min-h-screen">
  {/* Content stays below fixed header */}
</div>
```

**5. Layout vs GPU-Accelerated Properties**

| Property | Performance | Notes |
|----------|-------------|-------|
| `opacity` | ✅ GPU | Always smooth |
| `transform` (scale, translate, rotate) | ✅ GPU | Always smooth |
| `x`, `y` (Framer Motion) | ✅ GPU | Maps to translateX/Y |
| `width`, `height` | ❌ Layout | Causes reflow, use with `will-change` |
| `left`, `top`, `right`, `bottom` | ❌ Layout | Use `transform` instead |

When animating `width` is necessary (e.g., reveal effects where layout must change):
- Add `will-change-[width]` CSS hint
- Use `useSpring` for smooth interpolation
- Remove competing CSS transitions

**6. Tall Container Pattern for Scroll Distance**

Create scroll distance by making section taller than viewport:

```tsx
<section style={{ height: "300vh" }}>
  <div className="sticky top-20 min-h-screen">
    {/* Animated content */}
  </div>
</section>
```

---

### CSS Animations

#### Card Hover

```css
.card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 32px -12px rgb(0 0 0 / 0.08);
}
```

#### Indicator Dot

```css
.indicator-dot {
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, var(--fuji-nezu), var(--toki-nezu));
  border-radius: 50%;
  animation: dot-appear 0.2s ease-out;
}
```

#### Navigation Underline

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

### Animated Counter Hook

For counting up numbers with formatting support:

```tsx
import { useCountUp } from "@/hooks/useCountUp";

// Supports formats: "50+", "$50M+", "3x", "95%"
const { displayValue, ref } = useCountUp({
  end: 50,
  suffix: "+",
  prefix: "$",
  duration: 2000,
  delay: 200,
});

<span ref={ref}>{displayValue}</span>
```

---

## Component Patterns

### BentoCard

Standard card component with hover effects:

```tsx
<BentoCard className="p-6">
  <h3>Title</h3>
  <p>Description</p>
</BentoCard>
```

### BentoCardFeatured

Featured card with gradient background:

```tsx
<BentoCardFeatured gradient="warm" colSpan={2}>
  <h3>Featured Title</h3>
  <p>Featured description</p>
</BentoCardFeatured>
```

### BentoCardWave

Card with background image and wave decoration:

```tsx
<BentoCardWave
  title="Full-Stack Coverage"
  description="From digital advertising to investor outreach..."
  badge="Integrated"
  image="/images/features/data-driven.jpg"
  bgColorHex="#A6A5C4"
/>
```

---

## Section Styling Patterns

### Hero Section (Dark)

- Dark gradient background with Ken Burns effect
- Glassmorphism metrics card
- White/light text colors
- Scroll indicator animation

```tsx
// Background gradient
style={{
  background: `
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(166, 165, 196, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(228, 210, 216, 0.1) 0%, transparent 40%),
    linear-gradient(180deg, #1a1a2e 0%, #2E2930 40%, #1f1f2e 100%)
  `
}}
```

### Stats Section

- Toki Nezu tinted background (`bg-toki-nezu/20`)
- Animated counters using `useCountUp`
- Staggered card entrance

### Features Section (Bento Grid)

- 5-card bento layout
- Featured wave card spanning 2 columns
- Icon containers with Fuji Nezu tint (`bg-fuji-nezu/20`)
- Cards use `shadow-soft`

### CTA Section

- Primary background (`bg-primary`)
- Floating decorative blobs with Fuji Nezu (`bg-fuji-nezu/10`)
- Center blob with scale animation

### Footer

- Toki Nezu tinted background (`bg-toki-nezu/10`)
- Border top with Toki Nezu (`border-toki-nezu/40`)

---

## Typography

### Font Stack

```css
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, monospace;
```

### Common Text Sizes

| Class | Usage |
|-------|-------|
| `text-xs` | Eyebrow labels, small disclaimers |
| `text-sm` | Body small, navigation, captions |
| `text-base` | Body text |
| `text-lg` | Large body, subheadings |
| `text-xl` - `text-4xl` | Section headings |
| `text-5xl` - `text-7xl` | Hero headlines |

### Eyebrow Text Pattern

```tsx
<p className="text-xs font-medium uppercase tracking-[0.25em] text-fuji-nezu mb-6">
  Capital Markets Communications
</p>
```

---

## Spacing & Layout

### Container

```tsx
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  {/* Content */}
</div>
```

### Section Padding

```tsx
<section className="py-24 lg:py-32">
  {/* Content */}
</section>
```

### Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius` | `0.75rem` | Base radius |
| `rounded-lg` | `var(--radius)` | Standard cards |
| `rounded-xl` | `calc(var(--radius) + 4px)` | Larger cards |
| `rounded-2xl` | `calc(var(--radius) + 8px)` | Featured cards |
| `rounded-3xl` | `calc(var(--radius) + 12px)` | Hero elements |
| `rounded-full` | `9999px` | Pills, buttons |

---

## Accessibility

### Reduced Motion

All Framer Motion animations respect `prefers-reduced-motion`:

```tsx
const { displayValue, ref } = useCountUp({
  end: 50,
  // Automatically respects prefers-reduced-motion
});
```

### Focus States

```css
* {
  @apply outline-ring/50;
}
```

### Color Contrast

- Primary text on light backgrounds: Shikoku (#2E2930) on white
- Light text on dark backgrounds: White/FAFAFA on Shikoku
- Accent colors have sufficient contrast for decorative use

---

## File Structure

```
src/
├── app/
│   └── globals.css          # CSS variables, utilities, animations
├── components/
│   ├── ui/
│   │   └── bento-card.tsx   # Card components
│   └── sections/
│       ├── Hero.tsx         # Dark hero with animations
│       ├── Stats.tsx        # Animated counters
│       ├── Features.tsx     # Bento grid
│       ├── Services.tsx     # Interactive service selector
│       └── CTA.tsx          # Call-to-action with blobs
└── hooks/
    └── useCountUp.ts        # Animated counter hook
```
