# NBN Marketing Documentation

This folder contains all project documentation for the NBN Marketing marketing site.

## Quick Links

- **[SITE-SPEC.md](../SITE-SPEC.md)** - Complete site specification (styling, components, content)
- **[STYLING.md](../STYLING.md)** - Design system and CSS utilities
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Git workflow and contribution guidelines
- **[CHANGELOG.md](../CHANGELOG.md)** - Version history
- **Deployment:** Auto-deploys to Vercel on push to main ([meridian-sigma-three.vercel.app](https://meridian-sigma-three.vercel.app))

## Folder Structure

```
docs/
├── README.md              # This file
├── prds/                  # Product Requirements Documents
│   └── TEMPLATE.md        # PRD template for new features/changes
├── changelogs/            # Detailed change logs per release
│   └── YYYY-MM-DD-*.md    # Detailed changelog entries
└── decisions/             # Architecture Decision Records
    └── TEMPLATE.md        # ADR template
```

## When to Create Documentation

### PRD (Product Requirements Document)
Create a PRD **before** making significant changes:
- New features or sections
- Major styling changes
- Component refactoring
- Brand/content updates

### Changelog Entry
Create a detailed changelog **after** completing changes:
- Document what changed and why
- List all files modified
- Include before/after comparisons for visual changes

### ADR (Architecture Decision Record)
Create an ADR for:
- Technology choices
- Structural decisions
- Trade-off decisions

## Documentation Workflow

1. **Before changes:** Create PRD if significant change
2. **During changes:** Keep notes on what you're modifying
3. **After changes:**
   - Update SITE-SPEC.md if styling/components changed
   - Add entry to CHANGELOG.md
   - Create detailed changelog in docs/changelogs/
   - Commit with descriptive message

## File Naming Conventions

- PRDs: `YYYY-MM-DD-feature-name.md` (e.g., `2026-01-26-dark-mode-toggle.md`)
- Changelogs: `YYYY-MM-DD-brief-description.md` (e.g., `2026-01-26-theme-fix.md`)
- ADRs: `NNN-decision-title.md` (e.g., `001-use-tailwind-v4.md`)
