# DC20 v0.10.5 Rules Version Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add DC20 v0.10.5 support without silently reinterpreting existing saved characters, and convert the changelog-first rules delta into safe, testable implementation work.

**Architecture:** Treat this as a compatibility-first version spin, not a rulesdata-only refresh. Land version metadata, alias resolution, and load/export gates before mutating class, spell, maneuver, ancestry, background, or equipment data. After the runtime fence exists, execute content lanes in parallel and finish with calculator/export integration and docs refresh.

**Tech Stack:** React 19, TypeScript, Vite 6, Vitest, Playwright, Convex, localStorage, pdf-lib.

---

## Scope Decision

This work spans multiple independent subsystems. Execute it as one master plan with parallel lanes, but keep implementation grouped into these subprojects:

1. Versioning and compatibility runtime
2. Rulesdata content lanes
3. Calculator and validation integration
4. Storage/export/sheet compatibility
5. System docs and review artifacts

## Files To Expect

### Versioning and compatibility

- Modify: `src/lib/types/dataContracts.ts`
- Modify: `src/lib/types/schemaVersion.ts`
- Modify: `src/lib/utils/schemaMigration.ts`
- Modify: `src/lib/utils/storageUtils.ts`
- Modify: `src/lib/stores/characterContext.tsx`
- Modify: `src/lib/services/characterCompletion.ts`
- Modify: `convex/schema.ts`
- Modify: `src/routes/character-creation/LoadCharacter.tsx`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`

### Alias and resolution layer

- Create: `src/lib/rulesdata/versioning/rulesVersion.ts`
- Create: `src/lib/rulesdata/versioning/idAliases.ts`
- Create: `src/lib/rulesdata/versioning/compatibility.ts`
- Modify: `src/lib/services/calculatorModules/effectCollection.ts`
- Modify: `src/lib/services/calculatorModules/validation.ts`
- Modify: `src/lib/pdf/transformers.ts`
- Modify: `src/lib/utils/characterEdit.ts`

### Content lanes

- Modify: `src/lib/rulesdata/classes-data/features/*.ts`
- Modify: `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
- Modify: `src/lib/rulesdata/classes-data/talents/*.talents.ts`
- Modify: `src/lib/rulesdata/classes-data/talents/talents.data.ts`
- Modify: `src/lib/rulesdata/progression/multiclass.ts`
- Modify: `src/lib/rulesdata/spells-data/**/*.ts`
- Modify: `src/lib/rulesdata/spells-data/index.ts`
- Modify: `src/lib/rulesdata/schemas/spell.schema.ts`
- Modify: `src/lib/rulesdata/martials/maneuvers.ts`
- Modify: `src/lib/rulesdata/ancestries/ancestries.ts`
- Modify: `src/lib/rulesdata/ancestries/traits.ts`
- Modify: `src/lib/rulesdata/ancestries/sharedTraits.ts`
- Modify: `src/lib/rulesdata/equipment/**`

### Runtime integration

- Modify: `src/lib/rulesdata/classes-data/classProgressionResolver.ts`
- Modify: `src/lib/services/enhancedCharacterCalculator.ts`
- Modify: `src/lib/services/calculatorModules/progressionAggregation.ts`
- Modify: `src/lib/services/calculatorModules/budgetCalculation.ts`
- Modify: `src/lib/services/calculatorModules/spellSystem.ts`
- Modify: `src/lib/services/calculatorModules/validation.ts`
- Modify: `src/lib/services/spellAssignment.ts`

### PDF and UI surfaces

- Modify: `src/lib/pdf/fillPdf.ts`
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`
- Modify: `src/routes/character-sheet/CharacterSheetClean.tsx`
- Modify: `src/routes/character-creation/LoadCharacter.tsx`
- Modify: `src/routes/character-creation/Maneuvers.tsx`
- Modify: `src/routes/character-creation/Background.tsx`
- Modify: `src/routes/character-creation/components/TraitChoiceSelector.tsx`

### Review artifacts and docs

- Create: `docs/assets/dc20-0.10.5/IMPLEMENTATION_QUEUE.md`
- Create: `docs/assets/dc20-0.10.5/ID_STABILITY_AND_ALIASES.md`
- Create: `docs/assets/dc20-0.10.5/VALIDATION_SCAFFOLD.md`
- Modify: `docs/assets/dc20-0.10.5/CHANGE_AUDIT.md`
- Modify: `docs/systems/DATABASE_SYSTEM.MD`
- Modify: `docs/systems/PDF_EXPORT_SYSTEM.MD`
- Modify: `docs/systems/CALCULATION_SYSTEM.MD`
- Modify: `docs/systems/EFFECT_SYSTEM.MD`
- Modify: `docs/systems/CLASS_SYSTEM.MD`
- Modify: `docs/systems/SPELLS_SYSTEM.MD`
- Modify: `docs/systems/MARTIALS_SYSTEM.MD`
- Modify: `docs/systems/ANCESTRY_SYSTEM.MD`
- Modify: `docs/systems/TRAITS_SYSTEM.MD`
- Modify: `docs/systems/BACKGROUND_SYSTEM.MD`
- Modify: `docs/systems/EQUIPMENT_SYSTEM.MD`
- Modify: `docs/systems/CHARACTER_CREATION_FLOW.MD`
- Modify: `docs/systems/CHARACTER_SHEET.MD`
- Modify: `docs/systems/LEVELING_SYSTEM.MD`

### Key tests

- Test: `src/lib/rulesdata/rulesdata.spec.ts`
- Test: `src/lib/rulesdata/classes-data/classProgressionResolver.test.ts`
- Test: `src/lib/rulesdata/classes-data/features/subclasses.test.ts`
- Test: `src/lib/rulesdata/classes-data/talents/talents.test.ts`
- Test: `src/lib/rulesdata/progression/multiclass.test.ts`
- Test: `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts`
- Test: `src/lib/services/enhancedCharacterCalculator.spec.ts`
- Test: `src/lib/services/levelingRegression.test.ts`
- Test: `src/lib/rulesdata/ancestries/ancestries.test.ts`
- Test: `src/lib/rulesdata/trades.spec.ts`
- Test: `src/lib/utils/storageUtils.spec.tsx`
- Test: `src/tests/parity/characterEngine.parity.spec.tsx`

## Milestone 0: Review Artifacts and Source Truth

**Owner:** coordinator
**Parallelism:** none, this is the gate

- [ ] Verify the v0.10.5 source bundle is internally consistent across:
  - `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
  - `docs/assets/dc20-0.10.5/chunks.json`
  - `docs/assets/dc20-0.10.5/page-index.json`
  - `docs/assets/dc20-0.10.5/CLEANUP_REPORT.md`
  - `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`
- [ ] Reconcile the audit entry count mismatch between `CHANGELOG_RECONSTRUCTION.md` and `CHANGE_AUDIT.md`.
- [ ] Create `IMPLEMENTATION_QUEUE.md` with changelog-first queue items only.
- [ ] Create `ID_STABILITY_AND_ALIASES.md` covering renamed/removed class features, spells, maneuvers, traits, and equipment IDs.
- [ ] Create `VALIDATION_SCAFFOLD.md` listing regression fixtures and version-aware checks.
- [ ] Prune `CHANGE_AUDIT.md` into implementation tasks and a secondary verification backlog.

**Validation**

- [ ] Confirm every queue item has source references to `clean.md` page and line numbers.
- [ ] Confirm every rename/removal item is marked either `alias needed`, `migration needed`, or `HITL required`.

## Milestone 1: Version Contract and Persistence Cleanup

**Owner:** runtime compatibility lane
**Parallelism:** none, this must land before rulesdata mutation

- [ ] Add additive `rulesVersion` metadata to persisted character contracts in `dataContracts.ts`, draft state in `characterContext.tsx`, storage adapters, and Convex validators.
- [ ] Define clear semantics:
  - `schemaVersion` = storage shape
  - `rulesVersion` = rules interpretation
  - compatibility state = editable, upgrade-required, or view-only
- [ ] Normalize `schemaVersion` handling so the codebase stops mixing numeric `2` with semver `2.2.0`.
- [ ] Preserve incoming version metadata on import instead of stamping current values in `LoadCharacter.tsx`.
- [ ] Normalize the `selectedTalents` persistence shape between draft state, saved characters, and Convex.

**Validation**

- [ ] Add or update storage tests for save/load/import behavior.
- [ ] Add regression fixtures proving an older character retains its original `rulesVersion`.

## Milestone 2: Alias Resolution and Compatibility Gates

**Owner:** runtime compatibility lane
**Parallelism:** none, completes the safety fence

- [ ] Add centralized alias registries for:
  - trait IDs
  - class feature IDs
  - feature choice keys
  - spell IDs and slot IDs
  - maneuver IDs
  - equipment IDs if changed
- [ ] Teach calculator, validation, sheet rendering, edit restore, and PDF transformer code to resolve aliases before lookups fail.
- [ ] Add version-aware load/edit/export gates:
  - loading a character
  - leveling up a character
  - character sheet auto-save
  - PDF export
- [ ] Decide and implement policy for unsupported older characters:
  - editable
  - upgrade-required
  - view-only + PDF export only

**Validation**

- [ ] Add focused tests around alias resolution for renamed spells, maneuvers, and features.
- [ ] Add a parity/regression fixture that opens an old character and renders the sheet without data loss.

## Milestone 3: Parallel Content Lanes

**Owner:** four workers in parallel after Milestone 2
**Parallelism:** yes, disjoint write scopes preferred

### Lane A: Classes, progression, talents

- [ ] Refresh progression tables for v0.10.5:
  - caster `+1 MP` at levels 3, 7, 10
  - hybrid `+1 MP` at levels 1 and 10
  - level 6-10 table changes
  - Step 5 initial SP/MP defaults
- [ ] Ensure every class has a surfaced level 5 Expert Feature block with stable feature IDs.
- [ ] Update named class deltas from the changelog-first queue.
- [ ] Remove or deprecate `Grandmaster` and `Legendary Multiclass` per v0.10.5, gated by alias/compatibility decisions.
- [ ] Mark these as HITL unless human signoff already exists:
  - `Elemental Fury`
  - `Elemental Blast` semantics
  - `Swift Berserker` removal
  - `Brace -> Fortify`
  - `Advance` mechanic rewrite
  - Cleric, Commander, Monk, Rogue, and Spellblade semantics that need baseline comparison

### Lane B: Spells

- [ ] Add deterministic low-risk spell work first:
  - canonical `Poison` tag
  - tag normalization
  - source cleanup
- [ ] Build alias-backed rename/remove/add queues for spell IDs and names.
- [ ] Keep open-ended prose diffs out of scope until targeted queue items require them.
- [ ] Mark renamed/reworked/removed/new spell batches as HITL unless resolved in `ID_STABILITY_AND_ALIASES.md`.

### Lane C: Maneuvers

- [ ] Update maneuver costs and structured fields for `Whirlwind` and `Pathcarver`.
- [ ] Add `Scattershot`.
- [ ] Defer `Reposition` until its complete rewrite is approved through HITL.
- [ ] Treat `Brace -> Fortify` as a compatibility change, not just a display rename, because selection persistence is name-sensitive today.

### Lane D: Ancestry, background, equipment

- [ ] Audit ancestry and trait additions/removals/renames/reprices with stable ID preservation.
- [ ] Keep trait effect/schema work bundled with ancestry lane when new effect mechanics or new choice/prerequisite patterns appear.
- [ ] Audit background skill/trade/language changes and any budget or mastery-cap effects.
- [ ] Audit equipment property costs and prerequisites:
  - Toss and Thrown cost restoration
  - Returning requires Toss or Thrown
- [ ] Review equipment storage/import behavior for ID/version fallout.

**Validation**

- [ ] Run lane-specific unit tests after each lane.
- [ ] Update the relevant system docs in the same change for each completed lane.

## Milestone 4: Runtime and Calculator Integration

**Owner:** single integrator
**Parallelism:** no, shared runtime surface

- [ ] Update `classProgressionResolver.ts` and progression aggregation to use the new content safely.
- [ ] Update calculator and validation modules for new progression, spell, maneuver, and trait semantics.
- [ ] Remove hardcoded assumptions that break under renamed IDs or changed slot semantics.
- [ ] Audit stale spell runtime surfaces, especially `spellAssignment.ts`, before trusting them as protection.
- [ ] Ensure saved-character recalculation respects `rulesVersion` and compatibility gates.

**Validation**

- [ ] Run calculator, leveling, and parity test suites.
- [ ] Add targeted fixtures for spell slots, mastery caps, feature choices, and migrated aliases.

## Milestone 5: PDF and Character Sheet Routing

**Owner:** export/sheet lane
**Parallelism:** can run after Milestones 2 and 4 start stabilizing

- [ ] Route PDF template and filename selection from character metadata instead of hardcoding `0.10`.
- [ ] Ensure sheet load/export paths do not silently recalculate old characters under new rules without compatibility approval.
- [ ] Verify feature, spell, movement, and maneuver rendering still resolves aliased IDs.
- [ ] Add version-aware export tests for at least one older saved character fixture and one v0.10.5 fixture.

**Validation**

- [ ] Confirm export handlers no longer hardcode current rules version.
- [ ] Confirm old characters remain exportable under the agreed policy.

## Milestone 6: Docs and Final Verification

**Owner:** finisher
**Parallelism:** no, one owner to avoid drift

- [ ] Refresh all touched `docs/systems/*.MD` files with accurate behavior and `Last Updated: YYYY-MM-DD`.
- [ ] Ensure the queue artifacts under `docs/assets/dc20-0.10.5/` match shipped behavior.
- [ ] Run the final verification bundle:
  - `npm run test:unit`
  - targeted parity tests
  - targeted E2E if UI gating/export behavior changed
- [ ] Do a saved-character compatibility spot check:
  - load an old character
  - open the sheet
  - try export
  - try leveling if allowed by the new policy

## Parallelization Map

### Gate first

1. Milestone 0
2. Milestone 1
3. Milestone 2

### Then run in parallel

1. Lane A: classes/progression/talents
2. Lane B: spells
3. Lane C: maneuvers
4. Lane D: ancestry/background/equipment

### Finish sequentially

1. Milestone 4 runtime integration
2. Milestone 5 export/sheet routing
3. Milestone 6 docs and verification

## HITL Queue

These items should not merge as blind data edits:

- Spell rename/rework/remove/add sets
- `Reposition` complete rewrite
- `Elemental Fury` and `Elemental Blast` semantics
- `Brace -> Fortify`
- `Swift Berserker` removal
- Any rename/removal that changes persisted IDs without an alias path
- Any change that forces older characters from editable to view-only

## Recommended Worker Split

1. **Worker 1:** version contract, schema cleanup, alias framework
2. **Worker 2:** class/progression/talent lane
3. **Worker 3:** spell lane
4. **Worker 4:** maneuver lane
5. **Worker 5:** ancestry/background/equipment lane
6. **Integrator:** runtime, export, sheet, docs, and final verification

## Done Criteria

- `rulesVersion` exists and is enforced where characters are saved, loaded, edited, and exported.
- Renamed or removed IDs resolve through explicit compatibility logic.
- v0.10.5 changelog-confirmed data changes are reflected in rulesdata and runtime behavior.
- Older characters do not get silently reinterpreted.
- Updated system docs ship in the same change set.
