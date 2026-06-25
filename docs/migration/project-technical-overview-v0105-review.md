# Project Technical Overview v0.10.5 Review

> Last Updated: 2026-06-25

## Scope

Review the meta-level project overview against the live package scripts, dependencies, and source tree.

## Findings

1. The overview is broadly current.
   1. React 19, Vite 6, Convex/localStorage storage, Vitest, Playwright, PDF tooling, and versioning references match the repo.

2. Drift fixed.
   1. Styling stack no longer says MUI is active.
   2. Added the v0.10.5 source-audit validator scripts.
   3. Added missing top-level route/source folders: `martial-manual`, `rulesdata/versioning`, and `i18n`.

3. Existing TODO remains valid.
   1. Create a dedicated `UI_SYSTEM.MD` if UI conventions continue to expand.
   2. Replace ad hoc icons with a consistent icon set.

## Current Limits

1. This is a meta document.
   1. It should stay lightweight and route detailed behavior to system docs.
   2. It should not duplicate testing/versioning/database policy beyond pointers and high-level summaries.

2. Script lists can drift quickly.
   1. `TESTING_SYSTEM.MD` should remain the authoritative testing policy.
   2. This overview should only list common commands and audit entrypoints.

## Validation Targets

1. Compare `package.json` scripts/dependencies.
2. Compare `src/` top-level structure.
3. `git diff --check`.
