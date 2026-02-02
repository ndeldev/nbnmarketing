# PRD: Complete Rebrand from Meridian to NBN Marketing

**Date:** 2026-02-02
**Author:** Development Team
**Status:** In Progress

---

## Background & Context

The business is rebranding from "Meridian" to "NBN Marketing" with a new domain (nbnmarketing.com). This requires a comprehensive update across all systems, infrastructure, and code references to ensure brand consistency.

**Business Drivers:**
- New brand identity for capital markets communications
- Domain acquisition (nbnmarketing.com via GoDaddy)
- Unified brand presence across all touchpoints

---

## Goals

- [x] Register and configure production domain
- [x] Update brand name across codebase
- [x] Update user-facing documentation
- [ ] Update contact information (email)
- [ ] Handle social media links (remove until accounts created)
- [ ] Rename GitHub repository
- [ ] Rename Vercel project
- [ ] Configure staging environment
- [ ] Final verification and v2.5.5 release

## Non-Goals

- Logo redesign (separate initiative)
- Visual design changes (colors, typography remain unchanged)
- Historical document revision (PRDs retain original references for accuracy)

---

## Completed Work

### Domain & DNS (✅ Complete)

| Item | Status | Details |
|------|--------|---------|
| Domain purchase | ✅ | nbnmarketing.com via GoDaddy |
| Vercel domain config | ✅ | Added to Vercel project |
| DNS A record | ✅ | @ → 76.76.21.21 |
| DNS CNAME | ✅ | www → cname.vercel-dns.com |
| SSL certificate | ✅ | Auto-provisioned by Vercel |

### Code Updates (✅ Complete)

| File | Change | Status |
|------|--------|--------|
| `src/lib/constants.ts` | BRAND_NAME → "NBN Marketing" | ✅ |
| `src/lib/constants.ts` | SITE_URL → nbnmarketing.com | ✅ |
| `src/components/sections/Features.tsx` | "Why Choose NBN Marketing" | ✅ |
| `public/site.webmanifest` | App name and description | ✅ |
| `docker-compose.yml` | SITE_URL environment variable | ✅ |

### Documentation (✅ Complete)

| File | Status |
|------|--------|
| README.md | ✅ |
| CLAUDE.md | ✅ (partial - needs GitHub/Vercel updates) |
| SITE-SPEC.md | ✅ |
| STYLING.md | ✅ |
| CONTRIBUTING.md | ✅ |
| docs/README.md | ✅ |
| CHANGELOG.md | ✅ |

---

## Remaining Work

### 1. Contact Information Updates

**File: `src/lib/constants.ts`**

```typescript
// Current
export const CONTACT_EMAIL = "hello@meridian.agency";
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/meridian-agency",
  twitter: "https://twitter.com/meridianagency",
};

// Target
export const CONTACT_EMAIL = "info@nbnmarketing.com";
export const SOCIAL_LINKS = {
  linkedin: "",  // To be added when account created
  twitter: "",   // To be added when account created
};
```

**File: `src/lib/metadata.ts`**

Update hardcoded references (lines 83-88):
- Remove social media URLs from sameAs array
- Update email to info@nbnmarketing.com

**File: `src/components/layout/Footer.tsx`**

Conditionally render social icons only when URLs are non-empty.

### 2. GitHub Repository Rename

**Current:** https://github.com/ndeldev/meridian
**Target:** https://github.com/ndeldev/nbn-marketing

**Steps:**
1. Navigate to repository Settings
2. Under "Repository name", enter `nbn-marketing`
3. Click "Rename"
4. Update local remote:
   ```bash
   git remote set-url origin git@github.com:ndeldev/nbn-marketing.git
   ```

**Post-rename updates:**
- Update `CLAUDE.md` GitHub repository link

### 3. Vercel Project Rename

**Current:** meridian (https://meridian-sigma-three.vercel.app)
**Target:** nbn-marketing (https://nbn-marketing.vercel.app)

**Steps:**
1. Navigate to Vercel project Settings
2. Under "Project Name", enter `nbn-marketing`
3. Save changes

**Note:** Production domain (nbnmarketing.com) is unaffected.

**Post-rename updates:**
- Update `CLAUDE.md` Vercel project details

### 4. Environment Configuration

**Production:**
```env
NEXT_PUBLIC_SITE_URL=https://nbnmarketing.com
NODE_ENV=production
```

**Staging (Preview Deployments):**
- Vercel automatically creates preview URLs for pull requests
- Format: https://nbn-marketing-{hash}.vercel.app

**Local Development:**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:7777
NODE_ENV=development
```

---

## Technical Approach

### Files to Modify

| File | Changes |
|------|---------|
| `src/lib/constants.ts` | CONTACT_EMAIL, SOCIAL_LINKS |
| `src/lib/metadata.ts` | Remove social URLs, update email |
| `src/components/layout/Footer.tsx` | Conditional social icon rendering |
| `CLAUDE.md` | GitHub URL, Vercel project details |
| `CHANGELOG.md` | v2.5.5 release notes |
| `package.json` | Version bump to 2.5.5 |

### Implementation Order

1. **Code changes** - Update constants, metadata, footer
2. **GitHub rename** - Rename repo, update remote
3. **Vercel rename** - Rename project
4. **Documentation** - Update CLAUDE.md with new URLs
5. **Version bump** - Increment to 2.5.5
6. **Commit & push** - Final deployment

---

## Testing Plan

### Pre-Deployment Verification

- [ ] Local build passes (`npm run build`)
- [ ] No lint errors (`npm run lint`)
- [ ] Footer displays correct email
- [ ] Social icons hidden (no URLs configured)

### Post-Deployment Verification

- [ ] https://nbnmarketing.com loads correctly
- [ ] HTTPS certificate valid (padlock icon)
- [ ] Header shows "NBN Marketing"
- [ ] Footer shows "info@nbnmarketing.com"
- [ ] No broken social media links
- [ ] Contact form sends to correct email
- [ ] Git push works with new remote URL
- [ ] Vercel auto-deploys on push

---

## Rollback Plan

If critical issues arise:

1. **Domain rollback:** Vercel supports multiple domains; can revert DNS
2. **Code rollback:** `git revert <commit-hash>`
3. **GitHub rollback:** Repository can be renamed back
4. **Vercel rollback:** Project can be renamed back

---

## Future Tasks (Out of Scope)

| Task | Priority | Notes |
|------|----------|-------|
| Create LinkedIn company page | Medium | nbn-marketing |
| Create Twitter/X account | Medium | @nbnmarketing |
| Update SOCIAL_LINKS when ready | Medium | Restore social icons |
| Logo design/update | Low | If brand identity requires |
| Email setup (info@nbnmarketing.com) | High | Required for contact form |

---

## Open Questions

- [x] Contact email format? → **info@nbnmarketing.com**
- [x] Rename GitHub/Vercel? → **Yes, both**
- [x] Social media accounts ready? → **Not yet, hide for now**

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-02-02 | Claude | Initial draft |
| 2026-02-02 | Claude | Added user decisions, finalized approach |
