# Change Checklist

Use this checklist before and after making changes to the Meridian site.

---

## Before Making Changes

### Git Hygiene
- [ ] **Commit or stash current work** - Never leave uncommitted changes lying around
- [ ] **Pull latest changes** - `git pull origin main`
- [ ] **Create feature branch** - `git checkout -b feature/description`

### Documentation
- [ ] **Create PRD** (for significant changes) - Copy `docs/prds/TEMPLATE.md`
- [ ] **Take screenshots** of current state for comparison
- [ ] **Note current version** in CHANGELOG.md

### Scope Check
- [ ] **Understand what you're changing** - Read relevant code first
- [ ] **Identify all affected files** - Components, styles, content
- [ ] **Check for dependencies** - Other components using what you're changing

---

## During Changes

### Best Practices
- [ ] **Make atomic commits** - Small, focused changes
- [ ] **Write descriptive commit messages** - What and why, not just what
- [ ] **Test as you go** - Don't wait until the end

### If Changing Styling
- [ ] Check both light and dark mode (if applicable)
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Verify animations still work

### If Changing Components
- [ ] Check all pages that use the component
- [ ] Verify props/interfaces are consistent
- [ ] Test edge cases (empty states, long content)

---

## After Changes

### Update Documentation
- [ ] **Update SITE-SPEC.md** - If styling, components, or structure changed
- [ ] **Update CHANGELOG.md** - Add version entry
- [ ] **Create detailed changelog** - `docs/changelogs/YYYY-MM-DD-description.md`
- [ ] **Update STYLING.md** - If CSS utilities or design tokens changed

### Git Finalization
- [ ] **Review all changes** - `git diff`
- [ ] **Stage relevant files** - `git add <files>` (not `git add .`)
- [ ] **Write good commit message** - Follow conventional commits format
- [ ] **Tag release** (if significant) - `git tag -a vX.X.X -m "Description"`

### Verification
- [ ] **Build succeeds** - `npm run build`
- [ ] **No console errors** - Check browser dev tools
- [ ] **Visual regression check** - Compare to screenshots

---

## Commit Message Format

```
<type>: <short description>

<optional body - what and why>

<optional footer - breaking changes, related issues>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons (no code change)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

### Examples

```
feat: add animated counters to stats section

- Implement useCountUp hook for number animations
- Add Framer Motion entrance animations
- Support multiple number formats ($50M+, 3x, 95%)

Affects: Stats.tsx, useCountUp.ts
```

```
fix: restore light theme for stats section

The stats section was showing dark background due to
incorrect CSS variable usage. Changed from bg-toki-nezu/20
to border-border/50 for consistency with design spec.

Affects: Stats.tsx
See: docs/changelogs/2026-01-26-theme-fix.md
```

---

## Emergency Rollback

If something breaks badly:

1. **Don't panic** - Git has your back
2. **Check what changed** - `git log --oneline -10`
3. **Revert last commit** - `git revert HEAD`
4. **Or reset to known good state** - `git reset --hard <commit-hash>`
5. **Document what happened** - Create incident note in docs/changelogs/

---

## Quick Reference

| Task | Command |
|------|---------|
| Create branch | `git checkout -b feature/name` |
| Stage specific files | `git add file1.tsx file2.tsx` |
| Commit with message | `git commit -m "type: description"` |
| View changes | `git diff` |
| View staged changes | `git diff --staged` |
| View recent commits | `git log --oneline -10` |
| Tag a release | `git tag -a v2.0.1 -m "Description"` |
| Revert last commit | `git revert HEAD` |
