# DC20 Clean Character Sheet

> Last updated: 2026-02-04

A character creation and management app for the DC20 tabletop RPG, including a guided builder, responsive character sheet, DM tools, and PDF export.

## Quick Start

```bash
npm install
npm run dev
```

App URL: `http://localhost:5173`

## Storage Modes

The project supports two active persistence paths:

- `localStorage` (default, no sign-in required)
- Convex cloud storage (enabled with env vars + auth)

To enable Convex in local development, set the following in `.env.local`:

```bash
VITE_USE_CONVEX=true
VITE_CONVEX_URL=<your-convex-deployment-url>
```

Then run:

```bash
npx convex dev --once
```

## Core Feature Areas

- Character creation wizard (classes, ancestries, backgrounds, spells, maneuvers)
- Leveling and multiclass progression
- Character sheet (desktop + mobile)
- Spellbook and custom equipment tools
- DM tools (monster builder + encounter planner)
- PDF export

## Documentation

- Systems summary and representation matrix: `docs/systems/project_summary.md`
- Full system specs: `docs/systems/`
- Technical overview: `docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD`
- Storage architecture: `docs/systems/DATABASE_SYSTEM.MD`
- Contributor/agent guidelines: `AGENTS.md`

## Development Workflow

```bash
git checkout -b feat/feature-name
git add .
git commit -m "feat(scope): describe change"
npm run lint
npm run test:unit
git push origin feat/feature-name
```

## Status

- Active: core character systems, sheet, DM tools, Convex-backed cloud persistence
- Planned/WIP details: `docs/plannedSpecs/` and `docs/archive/`
