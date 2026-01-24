# Bun Migration Plan (bunDC)

## Goal
Adopt Bun as the primary runtime and package manager for this repo while preserving current behavior, features, and hosting on Vercel.

## Non-Goals
- No framework migration (remain Vite + React 19 + Convex + Playwright + Vitest).
- No feature changes or refactors outside Bun compatibility.

## Current Feature Footprint (Must Preserve)
- React 19 SPA with `react-router-dom` routing.
- Convex auth + client usage in `src/main.tsx`.
- Local storage + Convex storage adapters (`src/lib/storage/*`).
- PDF export tooling (`src/lib/pdf/*`, `scripts/localExportPOC.*`).
- Vite build output to `dist/` with SPA rewrite in `vercel.json`.
- Tailwind + styled-components styling, custom fonts.
- Testing stack: Vitest (browser via Playwright) + Playwright E2E.

## Scope
- Update scripts and configs to run under Bun.
- Validate all core workflows locally.
- Define Vercel build settings for Bun.
- Decide lockfile policy.

## Work Plan

### 1) Script and Config Updates (Bun-first)
- Replace `npm`/`npx` usage with `bun`/`bunx` in `package.json` scripts.
- Update `playwright.config.ts` webServer command to use `bun run build` and `bun run preview`.
- Replace `node -e` usage with `bun -e` in scripts (where applicable).
- Ensure any script references to `node scripts/...` are replaced with `bun scripts/...` when Bun can execute TS/JS directly.

### 2) Tooling Compatibility Validation
- **Vite dev/build/preview:** verify `bun run dev`, `bun run build`, `bun run preview`.
- **Vitest:** verify `bun run test:unit` (browser + node projects).
- **Playwright E2E:** verify `bun run test:e2e`.
- **Convex CLI:** verify `bunx convex dev` (or equivalent) and local auth flow.

### 3) Native Dependencies Audit
- Validate `@node-rs/argon2` compatibility under Bun.
- If incompatible: either replace the dependency or isolate to Node-only flows (decision required).

### 4) Vercel Deployment Plan
- Confirm Bun availability in the target Vercel environment.
- Update Vercel project settings:
  - Install Command: `bun install`
  - Build Command: `bun run build`
  - Output Directory: `dist`
- If Bun is not available or unstable in Vercel, define a fallback to Node for deploy only.

### 5) CI Rethink (CI currently suspended)
- Add a local release checklist to ensure changes are safe before deploy:
  1) `bun run lint`
  2) `bun run test:unit`
  3) `bun run build`
  4) `bun run test:e2e` (or smoke suite)
- Optionally create a `preflight` script that runs the checklist in order.

### 6) Documentation Updates
- Update `README.md` to include Bun commands and required tooling.
- Add a short Bun notes section under `docs/` for migration status and known caveats.

## Open Decisions
- **Lockfile policy:**
  - Option A: Bun-only (`bun.lockb` only, stop updating `package-lock.json`).
  - Option B: Dual tooling (`bun.lockb` + `package-lock.json`).
- **Vercel runtime:** Bun build or Node fallback.
- **Native deps policy:** replace `@node-rs/argon2` if not Bun-compatible vs allow Node-only for that step.
- **Tooling priority:** Is Bun-only required for Playwright + Convex, or is a Node fallback acceptable?

## Risks
- Playwright and Vitest browser mode may be sensitive to runtime differences.
- Convex CLI may assume Node APIs.
- Native addon incompatibilities (e.g., `@node-rs/argon2`).

## Acceptance Criteria
- Local:
  - `bun install` succeeds.
  - `bun run dev`, `bun run build`, `bun run preview` succeed.
  - `bun run lint` succeeds.
  - `bun run test:unit` succeeds.
  - `bun run test:e2e` succeeds.
- Vercel:
  - Build and deployment succeed with Bun (or documented fallback).

## Timeline (Estimate)
- Phase 1 (Bun-first script/config changes): 1–3 hours.
- Phase 2 (compatibility validation + fixes): 1–2 days.
- Phase 3 (docs + Vercel settings + finalize decisions): 2–4 hours.
