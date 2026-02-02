# Lessons Learned

This file captures patterns and mistakes to avoid. Updated after corrections.

---

## Project-Specific Patterns

### Hero Component History
- **v2.4.4**: Switched from video background to static image
- **v2.4.5**: Removed undefined video sync variables
- **Lesson**: PRDs referencing video hero are outdated - Hero.tsx is now static image only

### Data Location
- All site content belongs in `src/lib/constants.ts`
- Metadata schemas in `src/lib/metadata.ts` should import from constants, not hardcode
- Service-specific icons should be in a centralized icon map, not per-page

### Animation Standards
- Use `[0.25, 0.46, 0.45, 0.94]` as the standard easing curve
- Standard fade-in pattern: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- Duration: 0.6s for content, 1.5s+ for decorative/ambient animations

### Scroll Animation Performance
**Problem**: Animating `width`, `height`, `top`, `left` causes layout thrashing (jank)

**Solution**: Use GPU-accelerated properties only:
- ✅ `transform: scale()`, `scaleX()`, `scaleY()` - for size changes
- ✅ `transform: translate()`, `translateX()`, `translateY()` - for position changes
- ✅ `opacity` - for visibility changes
- ❌ `width`, `height` - triggers layout recalculation every frame
- ❌ `top`, `left`, `right`, `bottom` - triggers layout recalculation

**Example** (Features.tsx):
```tsx
// BAD - causes jank
const waveCardWidth = useTransform(scrollYProgress, [0, 0.5], ["100%", "66.67%"]);
<motion.div style={{ width: waveCardWidth }}>

// GOOD - GPU-accelerated, smooth 60fps
const waveCardScaleX = useTransform(scrollYProgress, [0, 0.5], [1, 0.6667]);
<motion.div className="w-full origin-left" style={{ scaleX: waveCardScaleX }}>
```

**Caveat**: `scaleX`/`scaleY` scales content too. For natural resize without content distortion, consider:
- `clip-path` animation (smooth but clips content)
- Container with fixed aspect ratio + translate

### Component Size Guidelines
- Section components should stay under 200 lines
- If a component has 3+ internal sub-components, extract them
- Data objects over 50 lines should move to constants

---

## Common Mistakes to Avoid

### 1. Duplicating Schema Functions
**Wrong**: Defining `generateFAQSchema` locally in a component
**Right**: Import from `src/lib/metadata.ts`

### 2. Hardcoding Brand Values
**Wrong**: `"hello@meridian.agency"` inline in metadata functions
**Right**: Import `CONTACT_EMAIL` from constants

### 3. Inconsistent Barrel Exports
**Wrong**: `import { JsonLd } from "@/components/seo/JsonLd"`
**Right**: Create index.ts, then `import { JsonLd } from "@/components/seo"`

### 4. Inline Animation Values
**Wrong**: `ease: [0.25, 0.46, 0.45, 0.94]` repeated in every component
**Right**: Import from shared animation constants file

### 5. Leaving Dead Code
**Wrong**: Keeping commented-out code or null-returning components
**Right**: Delete unused code; git history preserves it if needed

---

## Session Log

*Add entries here after receiving corrections*

| Date | Correction | Pattern Added |
|------|------------|---------------|
| 2026-02-01 | Initial codebase review | Established baseline patterns |
| 2026-02-01 | Width animation causing jank | Scroll Animation Performance (use scaleX) |
