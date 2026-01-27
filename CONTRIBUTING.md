# Contributing to Meridian

This guide outlines the git workflow and contribution practices for the Meridian marketing site.

---

## Golden Rules

1. **Never leave uncommitted changes for long** - Commit frequently
2. **Always work on branches** - Never commit directly to main
3. **Document significant changes** - Create PRDs for major work
4. **Update docs after changes** - Keep SITE-SPEC.md current

---

## Git Workflow

### Branch Naming

```
feature/short-description    # New features
fix/short-description        # Bug fixes
docs/short-description       # Documentation only
refactor/short-description   # Code refactoring
style/short-description      # Styling changes
```

**Examples:**
- `feature/animated-counters`
- `fix/dark-mode-override`
- `style/japanese-greydients`
- `docs/site-specification`

### Starting Work

```bash
# 1. Ensure you're on main and up to date
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make changes...

# 4. Commit frequently
git add <specific-files>
git commit -m "type: description"
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]

[optional footer]
```

**Types:**
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, CSS (no logic change) |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `chore` | Build, config, tooling |

**Examples:**

```bash
# Simple change
git commit -m "fix: restore light background to stats section"

# With body
git commit -m "feat: add useCountUp hook for animated numbers

- Parse value strings like '$50M+', '3x', '95%'
- Support configurable duration and delay
- Respect prefers-reduced-motion

Affects: Stats.tsx, useCountUp.ts"

# Breaking change
git commit -m "refactor!: rename BentoCard variants

BREAKING CHANGE: BentoCardImage renamed to BentoCardWave"
```

### Completing Work

```bash
# 1. Review your changes
git diff
git status

# 2. Stage and commit final changes
git add <files>
git commit -m "type: final message"

# 3. Push to remote
git push -u origin feature/your-feature-name

# 4. Create PR or merge to main
git checkout main
git merge feature/your-feature-name
git push origin main

# 5. Tag if significant release
git tag -a v2.0.1 -m "Fix: restore light theme"
git push origin v2.0.1

# 6. Clean up
git branch -d feature/your-feature-name
```

---

## Version Tagging

Use [Semantic Versioning](https://semver.org/):

```
vMAJOR.MINOR.PATCH

MAJOR - Breaking changes, major redesigns
MINOR - New features, significant additions
PATCH - Bug fixes, small tweaks
```

**When to tag:**
- After merging significant features
- After fixing critical bugs
- Before deploying to production

```bash
# Create annotated tag
git tag -a v2.0.1 -m "Fix: restore light theme for stats/features/footer"

# Push tag
git push origin v2.0.1

# List tags
git tag -l

# View tag details
git show v2.0.1
```

---

## Documentation Requirements

### For Any Change

1. Update `CHANGELOG.md` with entry
2. Commit with descriptive message

### For Styling Changes

1. Update `SITE-SPEC.md` with new values
2. Update `STYLING.md` if design system changes
3. Create detailed changelog in `docs/changelogs/`

### For Significant Features

1. Create PRD **before** starting (`docs/prds/`)
2. Update component documentation
3. Create detailed changelog **after** completing

---

## Pre-Commit Checklist

Before committing, verify:

- [ ] Code builds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Visual appearance matches design spec
- [ ] Responsive layouts work (mobile, tablet, desktop)
- [ ] Animations function correctly

---

## Emergency Procedures

### Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (discard changes)
```bash
git reset --hard HEAD~1
```

### Revert a Specific Commit
```bash
git revert <commit-hash>
```

### Restore Single File
```bash
git checkout <commit-hash> -- path/to/file.tsx
```

### View History
```bash
git log --oneline -20
git log --oneline --graph --all
```

---

## Code Style

### TypeScript/React

- Use functional components
- Prefer named exports
- Use TypeScript strict mode
- Follow existing patterns in codebase

### CSS/Styling

- Use Tailwind utility classes
- Use semantic color variables (not raw hex)
- Follow SITE-SPEC.md for color usage
- Keep responsive classes: `sm:`, `md:`, `lg:`

### File Organization

```
src/
├── app/           # Pages and routes
├── components/
│   ├── ui/        # Reusable UI components
│   ├── sections/  # Page sections
│   ├── layout/    # Header, Footer
│   └── blog/      # Blog-specific components
└── lib/
    ├── hooks/     # Custom React hooks
    └── utils.ts   # Utility functions
```

---

## Getting Help

- Check `SITE-SPEC.md` for styling questions
- Check `STYLING.md` for design system details
- Check `docs/` for PRDs and changelogs
- Review git history for context on past changes
