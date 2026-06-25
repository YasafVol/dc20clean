# Database System v0.10.5 Review

> Last Updated: 2026-06-24

## Scope

Review character persistence for v0.10.5 rules compatibility, focusing on localStorage/Convex parity, version lanes, import/export consumers, and character sheet persistence.

## Findings

1. Storage routing is broadly correct.
   1. Runtime consumers use `getDefaultStorage()`.
   2. localStorage remains the default backend.
   3. Convex is selected only when `VITE_USE_CONVEX=true`.

2. Version lanes are separate.
   1. `schemaVersion` tracks storage shape.
   2. `rulesVersion` tracks rules interpretation.
   3. PDF routing reads `rulesVersion` but consumes stored values only.

3. localStorage normalization is read-time for most fields.
   1. Deserialization normalizes selected traits, feature choices, talents, arrays, rules version, and schema version.
   2. The normalized copy is durable after the next full save.
   3. Legacy attack object-map migration is the only immediate in-place migration on single-character lookup.
   4. Pasted JSON import now uses the same deserializer before saving.

4. Gap fixed: Convex schema did not fully match `SavedCharacter`.
   1. Added root `selectedTraitChoices`.
   2. Added `characterState.ui.activeConditions`.
   3. Added `characterState.defenseOverrides`.
   4. Updated Convex state sanitizer to preserve `ui.activeConditions`.

## Current Limits

1. Convex character mutations still use `v.any()` for create/update payloads.
   1. Table validation catches stored shape issues.
   2. Mutation argument validation is still broad.

2. localStorage and Convex do not share a single runtime validator.
   1. `SavedCharacter` TypeScript, localStorage normalization, and Convex schema can drift.
   2. Add a schema parity test before larger storage changes.

3. Durable schema migration is partial.
   1. Most normalizations happen on read.
   2. That is acceptable for current localStorage behavior, but should not be described as an immediate durable migration.

## Validation Targets

1. `npm run build`
2. `npm run test:unit -- --project server --run src/lib/utils/storageUtils.test.ts`
3. `npx convex dev --once` when applying Convex schema changes in a connected environment
4. `git diff --check`
