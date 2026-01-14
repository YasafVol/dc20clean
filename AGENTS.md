# Repository Guidelines

## Project Structure & Module Organization

- `src/` – React + TypeScript app (routes, components, styles, types). Unit tests live beside code as `*.test.ts[x]`.
- `e2e/` – Playwright end‑to‑end tests.
- `dist/` – Build output (do not edit).
- `static/`, `assets/` – Static files and images.
- Config: `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`, `.prettierrc`.

## Quick Start

- (no .env required) – localStorage only; no database
- `npm i` – Install dependencies.
- (removed) database and Prisma steps
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
- (removed) DB start and Prisma generate; not used

Tips

- Run a single unit test: `npx vitest -t "should ..."` or by file path.
- E2E speedups: `PLAYWRIGHT_SKIP_BUILD=1` to reuse `dist/`; `E2E_WORKERS=4` for parallel runs.

## Coding Style & Naming Conventions

- TypeScript, React 19, Vite.
- Prettier: tabs, single quotes, width 100; Tailwind class sorting.
- ESLint: TS + React recommended. JSON parse/stringify is restricted except in `**/storageUtils.ts`.
- File names: `PascalCase` for components, `camelCase` for modules/hooks, tests as `*.test.ts[x]`.
- Always use full, descriptive naming for functions, variables, and components.
- Example: wrong `genYmdStr`; right `generateDateString`.

## Testing Guidelines

- Unit: Vitest. Place tests near source: `src/**/Foo.test.tsx`.
- E2E: Playwright in `e2e/`. Config runs a web server on `http://localhost:4173`.
- Useful envs: `PLAYWRIGHT_SKIP_BUILD=1`, `E2E_SCREENSHOTS=1`, `E2E_TRACES=1`.
- Never modify unit or E2E tests without explicit written user approval.
- If a test appears incorrect, do not change it. Instead, share the rationale and a proposed diff in a comment/PR description and proceed only after explicit approval.
- Do not update snapshots or golden files (e.g., `-u`) without prior approval.

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

- No DATABASE_URL or Docker required; app is client-only persistence

## Architecture References

- See `docs/systems` for system specs and overviews.

## Systems Index (start here)

- Background System: `docs/systems/BACKGROUND_SYSTEM.MD`
- Traits System: `docs/systems/TRAITS_SYSTEM.MD`
- Classes System: `docs/systems/CLASS_SYSTEM.MD`
- Ancestries System: `docs/systems/ANCESTRY_SYSTEM.MD`
- Ontology & Flows: `docs/systems/ONTOLOGY.md`
- Calculation & Derived Stats: `docs/systems/CALCULATION_SYSTEM.MD`
- Spells System: `docs/systems/SPELLS_SYSTEM.MD`
- Martials System: `docs/systems/MARTIALS_SYSTEM.MD`
- Equipment System: `docs/systems/EQUIPMENT_SYSTEM.MD`
- Character Sheet Overview: `docs/systems/CHARACTER_SHEET.MD`
- PDF Export System: `docs/systems/PDF_EXPORT_SYSTEM.MD`
- Database & Storage: `docs/systems/DATABASE_SYSTEM.MD`

## Agent Brief Template

- Goal: <one-sentence outcome>
- Relevant systems:
  - Background → `docs/systems/BACKGROUND_SYSTEM.MD#4-calculation-model`
  - Database/Storage → `docs/systems/DATABASE_SYSTEM.MD`
  - Effect types → `docs/systems/EFFECT_SYSTEM.MD#2-effect-categories`
- Touchpoints:
  - Data/types: `src/lib/rulesdata/**`, `src/lib/rulesdata/schemas/**`
  - Services: `src/lib/services/enhancedCharacterCalculator.ts`
  - UI: `src/routes/character-creation/**`, `src/routes/character-sheet/**`
- Acceptance:
  - Enumerate 2–4 checks (e.g., Brewing example in Trades spec §4)
- Constraints:
  - Follow lint rules; keep IDs stable; avoid migrations unless spec says

## Agent-Specific Notes

- Follow lint rules strictly; avoid unrelated refactors. Keep changes minimal and focused. Update or add tests when modifying behavior.
