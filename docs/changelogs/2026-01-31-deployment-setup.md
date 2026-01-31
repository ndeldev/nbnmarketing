# Changelog: v2.4.5 - Deployment Setup & Hero Fix

**Date:** 2026-01-31
**Version:** 2.4.5

---

## Summary

This release fixes a build error in Hero.tsx and documents the deployment infrastructure for the project.

---

## Bug Fix: Hero.tsx Build Error

### Problem
Vercel deployment failed with TypeScript error:
```
Type error: Cannot find name 'cardBoxShadow'.
./src/components/sections/Hero.tsx:131:37
```

### Root Cause
When switching from video to static image background in v2.4.4, the video sync code was removed but the floating metrics card still referenced the deleted variables:
- `cardBoxShadow` - Used for card glow effect
- `textShadow` - Used for text glow effect
- `mounted` - Hydration fix state
- `glowState` - Animation state object

### Solution
Removed all style props referencing deleted variables from the metrics card:
- Removed `style={{ boxShadow: cardBoxShadow }}` from card container
- Removed `style={{ textShadow }}` from text elements
- Simplified decorative glow div to static opacity

### Files Changed
- `src/components/sections/Hero.tsx`

### Note
Video animation sync code is preserved in `docs/prds/2026-01-27-video-animation-sync.md` for future revert.

---

## Added: Deployment Documentation

### GitHub Repository
- **URL:** https://github.com/ndeldev/meridian
- **Branch:** main
- **Visibility:** Public

### Vercel Deployment
- **Production URL:** https://meridian-sigma-three.vercel.app
- **Project:** meridian
- **Team:** ndels-projects-7138abea
- **Framework:** Next.js (auto-detected)
- **Node version:** 24.x
- **Auto-deploy:** Enabled (push to main triggers deployment)
- **Preview deployments:** Enabled for pull requests

### Checking Deployment Status

**Via Vercel MCP (if connected):**
```bash
mcp__vercel__get_project teamId="ndels-projects-7138abea" projectId="meridian"
```

**Via Vercel CLI:**
```bash
vercel list
```

### Files Updated
- `CLAUDE.md` - Added Deployment section
- `docs/README.md` - Added deployment quick link

---

## Verification

1. Local build passes: `npm run build` ✓
2. Git push triggers Vercel deployment ✓
3. Production URL accessible ✓

---

## Related Files

| File | Change |
|------|--------|
| `package.json` | Version bump 2.4.4 → 2.4.5 |
| `CHANGELOG.md` | Added v2.4.5 entry |
| `CLAUDE.md` | Added Deployment section |
| `docs/README.md` | Added deployment link |
| `docs/prds/2026-01-28-landing-site-specification.md` | Updated version history |
| `src/components/sections/Hero.tsx` | Removed undefined variable references |
