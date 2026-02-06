# DC20 Clean Character Sheet

> Last updated: 2026-02-04

DC20 character creation and sheet app.

Core product features:

- Character creation wizard
- Character sheet (desktop + mobile)
- DM tools (monsters + encounters)
- Utilities (Spellbook, Conditions, Equipage)
- PDF export

## Quick Start

```bash
npm install
npm run dev
```

App URL: `http://localhost:5173`

## Convex (local setup)

Create `.env.local` with:

```bash
VITE_USE_CONVEX=true
VITE_CONVEX_URL=<your-convex-deployment-url>
```

```bash
npx convex dev --once
```

## Docs

- System and architecture docs: `docs/systems/`
- Contributor/agent guide: `AGENTS.md`
