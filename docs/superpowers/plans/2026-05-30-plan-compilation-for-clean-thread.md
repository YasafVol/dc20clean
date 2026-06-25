# DC20 v0.10 To v0.10.5 Migration Handoff

Last Updated: 2026-05-30

## Scope

This file is only about:

- migrating the app from DC20 `v0.10` to `v0.10.5`
- deciding backward compatibility for saved characters
- defining how old characters behave on character creation and character sheet pages

## Primary Plan

- Master plan: `docs/superpowers/plans/2026-05-10-dc20-v0-10-5-rules-version.md`

## Supporting Planning Files

- `docs/assets/dc20-0.10.5/IMPLEMENTATION_QUEUE.md`
- `docs/assets/dc20-0.10.5/ID_STABILITY_AND_ALIASES.md`
- `docs/assets/dc20-0.10.5/VALIDATION_SCAFFOLD.md`
- `docs/assets/dc20-0.10.5/CHANGE_AUDIT.md`
- `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`
- `docs/assets/dc20-0.10.5/DATA_SHAPE_REVIEW.md`

## Locked Direction

- Add additive `rulesVersion` metadata to saved characters and draft state.
- Keep `schemaVersion` strictly about storage shape.
- Build alias routing and compatibility fences before changing rulesdata identities.
- Do not silently reinterpret old saved characters as `v0.10.5`.
- Treat old-character handling as an explicit runtime policy, not an incidental side effect.

## Highest-Priority Decisions

- Add the `rulesVersion` metadata spine.
- Normalize `schemaVersion` semantics and persisted choice shapes.
- Define compatibility states for old characters:
  - `editable`
  - `upgrade-required`
  - `view-only`
- Add centralized alias registries before rulesdata mutation.

## Character Compatibility Surface

The compatibility question is limited to these behaviors:

- can a saved `v0.10` character still load
- can it still render on character pages
- can it still be edited or leveled up
- can it still auto-save safely
- can it still export to PDF

## Minimum Safe Policy

- Add additive `rulesVersion`.
- Do not destructively rewrite saved data on first load.
- Preserve original saved identities until an explicit compatibility or upgrade path exists.
- If semantics changed materially, show compatibility state instead of silently remapping.

## Key Open Questions

- Which renamed items are aliases versus materially changed entities?
- Which removed selections remain loadable but no longer selectable?
- Whether alias resolution happens on load, lookup, explicit upgrade, or mixed routing?
- What exact `editable` / `upgrade-required` / `view-only` behavior applies to old characters on creation pages and character sheet pages?

## Planned Code Touchpoints

- `src/lib/types/dataContracts.ts`
- `src/lib/types/schemaVersion.ts`
- `src/lib/utils/schemaMigration.ts`
- `src/lib/utils/storageUtils.ts`
- `src/lib/stores/characterContext.tsx`
- `src/lib/services/characterCompletion.ts`
- `src/routes/character-creation/LoadCharacter.tsx`
- `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- `src/lib/pdf/transformers.ts`
- `src/lib/utils/characterEdit.ts`

## Main Workstreams

1. `compatibility runtime`
   - `rulesVersion`
   - `schemaVersion` normalization
   - compatibility states
   - alias routing policy

2. `v0.10.5 content lanes`
   - classes / progression / talents
   - spells
   - maneuvers
   - ancestry / background / equipment

3. `character-page backward compatibility`
   - load behavior
   - sheet render behavior
   - edit / level-up policy
   - auto-save policy
   - PDF export policy

## Clean Thread Starter

> We are focusing only on the DC20 `v0.10` -> `v0.10.5` migration.
> The main concern is backward compatibility for saved characters and character pages.
> Start with the compatibility runtime fence: `rulesVersion`, compatibility states, alias routing policy, and exact behavior for loading, rendering, editing, auto-saving, and exporting old characters.
