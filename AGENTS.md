# Repository Guidelines

## Project Structure & Module Organization
- `src/` – React + TypeScript app (routes, components, styles, types). Unit tests live beside code as `*.test.ts[x]`.
- `e2e/` – Playwright end‑to‑end tests.
- `prisma/` – Prisma schema and client generation.
- `dist/` – Build output (do not edit).
- `static/`, `assets/` – Static files and images.
- Config: `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`, `.prettierrc`.

## Quick Start
- `cp .env.example .env` – Configure `DATABASE_URL`.
- `npm i` – Install dependencies.
- `npm run db:start` – Start local Postgres (Docker).
- `npm run prepare` – Generate Prisma client.
- `npm run dev` – Start Vite dev server.

## Build, Test, and Development Commands
- `npm run dev` – Start Vite dev server.
- `npm run build` – Production build to `dist/`.
- `npm run preview` – Preview built app on port 4173.
- `npm run lint` – Prettier check + ESLint.
- `npm run format` – Auto‑format with Prettier (Tailwind plugin enabled).
- `npm run test:unit` – Run Vitest (browser + node projects).
- `npm run test` – Unit tests (run mode) then Playwright E2E.
- `npm run test:e2e[:ui|:headed|:debug]` – E2E variants. Example: `npm run test:e2e:ui`.
- `npm run db:start` – Start local Postgres via Docker Compose.
- Prisma: `npm run prepare` (or `npx prisma generate`) to generate the client.

Tips
- Run a single unit test: `npx vitest -t "should ..."` or by file path.
- E2E speedups: `PLAYWRIGHT_SKIP_BUILD=1` to reuse `dist/`; `E2E_WORKERS=4` for parallel runs.

## Coding Style & Naming Conventions
- TypeScript, React 19, Vite.
- Prettier: tabs, single quotes, width 100; Tailwind class sorting.
- ESLint: TS + React recommended. JSON parse/stringify is restricted except in `**/storageUtils.ts`.
- File names: `PascalCase` for components, `camelCase` for modules/hooks, tests as `*.test.ts[x]`.

## Testing Guidelines
- Unit: Vitest. Place tests near source: `src/**/Foo.test.tsx`.
- E2E: Playwright in `e2e/`. Config runs a web server on `http://localhost:4173`.
- Useful envs: `PLAYWRIGHT_SKIP_BUILD=1`, `E2E_SCREENSHOTS=1`, `E2E_TRACES=1`.

## Graphite (Stacked PRs)
- Install: `brew install withgraphite/tap/graphite` (or see graphite.dev).
- Auth and init: `gt auth` → `gt init`.
- Flow: `gt start feature/short-id` → commit as usual → `gt up` to push stack → `gt submit` to open PRs.
- Update stack: continue committing, then `gt up`; rebase with `gt repo sync`.
- Land: merge via GitHub, then `gt land` to clean up local branches.

## Commit & Pull Request Guidelines
- Prefer Conventional Commits: `feat(scope): ...`, `fix: ...`, `chore(e2e): ...`, `docs: ...`, `ci: ...`.
- PRs should include: clear description, linked issues, test plan (commands + results), and screenshots/GIFs for UI changes. Update docs when behavior changes. For stacks, ensure each PR is reviewable and passes CI independently.

## Security & Configuration Tips
- Copy `.env.example` to `.env` and set `DATABASE_URL`. Do not commit secrets.
- Use `docker compose up` for local DB; verify Prisma client generation after schema changes.

## Architecture References
- See `docs/systems` for system specs and overviews. Start with:
  - `docs/systems/project_summary.md`
  - `docs/systems/BACKGROUND_SYSTEM.MD`
  - `docs/systems/TRADES_MULTI_ATTRIBUTE_SPEC.md`

## Agent-Specific Notes
- Follow lint rules strictly; avoid unrelated refactors. Keep changes minimal and focused. Update or add tests when modifying behavior.
