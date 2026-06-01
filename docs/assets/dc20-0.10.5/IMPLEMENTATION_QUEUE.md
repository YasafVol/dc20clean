# DC20 0.10.5 Implementation Queue

Last Updated: 2026-06-01

## Purpose

This is the changelog-first implementation queue for the DC20 v0.10.5 audit.

It replaces the broad `CHANGE_AUDIT.md` ledger as the execution-facing artifact. It does not authorize code changes by itself. Items marked `HITL required` or `needs baseline comparison` still need human review before system changes.

## Source Readiness

- Source bundle present:
  - `docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md`
  - `docs/assets/dc20-0.10.5/chunks.json`
  - `docs/assets/dc20-0.10.5/page-index.json`
  - `docs/assets/dc20-0.10.5/CLEANUP_REPORT.md`
  - `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`
  - `docs/assets/dc20-0.10.5/DATA_SHAPE_REVIEW.md`
- Mechanical checks:
  - `chunks.json`: 2,021 chunks
  - `page-index.json`: 269 pages
  - `chunks.json` human-review chunks: 51
  - `CHANGE_AUDIT.md` entries: 1,229
- Reconciliation note:
  - `CHANGELOG_RECONSTRUCTION.md` references 1,247 audit entries.
  - `CHANGE_AUDIT.md` currently contains 1,229 entries.
  - Treat `CHANGE_AUDIT.md` as the current source of record and the 1,247 count as stale scaffold metadata.

## Queue Summary

- `implementation-ready`: deterministic, non-destructive work is clear enough to schedule.
- `HITL required`: renamed, removed, rewritten, or migration-sensitive work needs explicit review.
- `needs baseline comparison`: the changelog is too summary-level to implement safely without a focused old-vs-new section diff.
- `no-op`: rules text changed but app behavior is not expected to change.
- `deferred`: intentionally postponed beyond v0.10.5.

## Foundation Gates

### VRR-001: Add `rulesVersion` Metadata Spine

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/DATA_SHAPE_REVIEW.md`; `docs/assets/dc20-0.10.5/CHANGE_AUDIT.md`, `AUDIT-001`
- Baseline: current repo persists `schemaVersion` but not `rulesVersion`
- Systems: Database / Storage / Character Creation / Character Sheet / PDF Export
- Current implementation: saved characters, draft state, sheet load, and export flows are not rules-version-aware.
- Required change: add additive `rulesVersion` metadata and treat it as the routing spine for runtime behavior.
- Data shape impact: additive
- Stable ID / alias impact: none directly
- Calculator/effect impact: indirect, gating future rules interpretation
- UI impact: possible compatibility banners / version display
- Storage/export impact: confirmed
- HITL decision: no
- Code touchpoints:
  - `src/lib/types/dataContracts.ts`
  - `src/lib/stores/characterContext.tsx`
  - `src/lib/services/characterCompletion.ts`
  - `src/lib/utils/storageUtils.ts`
  - `src/routes/character-creation/LoadCharacter.tsx`
  - `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
  - `convex/schema.ts`
- System docs to update:
  - `docs/systems/DATABASE_SYSTEM.MD`
  - `docs/systems/PDF_EXPORT_SYSTEM.MD`
  - `docs/systems/CHARACTER_CREATION_FLOW.MD`
  - `docs/systems/CHARACTER_SHEET.MD`
- Validation:
  - save/load fixture retains original `rulesVersion`
  - import flow preserves incoming version metadata
  - old characters are not silently reinterpreted

### VRR-002: Normalize `schemaVersion` and Persisted Choice Shapes

- Status: `implemented`
- Source: repo architecture inspection; `docs/assets/dc20-0.10.5/DATA_SHAPE_REVIEW.md`
- Baseline: `schemaVersion` handling is inconsistent and `selectedTalents` shape differs across draft state, saved character, and Convex.
- Systems: Database / Storage / Character Creation / Character Sheet
- Current implementation: some paths use semver (`2.2.0`), others stamp numeric `2`.
- Required change: unify `schemaVersion` semantics and normalize persisted choice payloads before adding a new version axis.
- Data shape impact: additive or internal cleanup; no v0.10.5 structural break confirmed
- Stable ID / alias impact: none directly
- Calculator/effect impact: indirect
- UI impact: none expected
- Storage/export impact: confirmed
- HITL decision: no
- Code touchpoints:
  - `src/lib/types/schemaVersion.ts`
  - `src/lib/utils/schemaMigration.ts`
  - `src/lib/utils/storageUtils.ts`
  - `src/lib/types/dataContracts.ts`
  - `convex/schema.ts`
- System docs to update:
  - `docs/systems/DATABASE_SYSTEM.MD`
- Validation:
  - load legacy fixtures
  - verify no numeric/semver version churn on save

## Changelog-Confirmed Rules Work

### VRR-003: Refresh Progression Tables and Resource Budgets

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17544-17553
- Baseline: targeted v0.10 progression and class tables only
- Systems: Class / Leveling / Calculation / Character Creation / Character Sheet / PDF Export
- Current implementation: v0.10.5 progression data drives resource totals and downstream stage budgets, including caster/hybrid MP deltas and the level 6-10 schedule.
- Required change:
  - caster `+1 MP` at levels 3, 7, 10
  - hybrid `+1 MP` at levels 1 and 10
  - level 6/7/8/9/10 progression table deltas
- Data shape impact: none
- Stable ID / alias impact: low
- Calculator/effect impact: confirmed
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: no
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
  - `src/lib/rulesdata/classes-data/classProgressionResolver.ts`
  - `src/lib/services/calculatorModules/progressionAggregation.ts`
  - `src/lib/services/enhancedCharacterCalculator.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/LEVELING_SYSTEM.MD`
  - `docs/systems/CALCULATION_SYSTEM.MD`
- Validation:
  - progression resolver tests
  - calculator resource totals by class and level
  - level-up stage budgets

### VRR-004: Surface Level 5 Expert Features for All Classes

- Status: `implementation-ready`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17541-17545
- Baseline: current class feature/progression data
- Systems: Class / Leveling / Character Creation / Character Sheet / PDF Export
- Current implementation: some class data still relies on placeholders or incomplete level-5 coverage.
- Required change: ensure every class has an explicit level-5 Expert Feature block with stable IDs and progression references.
- Data shape impact: none
- Stable ID / alias impact: possible, especially where placeholders are replaced
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: no, unless replacing already-persisted placeholder IDs
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/*.ts`
  - `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
  - `src/lib/rulesdata/loaders/class.loader.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/CHARACTER_CREATION_FLOW.MD`
  - `docs/systems/CHARACTER_SHEET.MD`
- Validation:
  - `rulesdata.spec.ts`
  - subclass/class feature resolver coverage

### VRR-005: Character Creation Starting SP/MP Corrections

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17739-17741
- Baseline: current Step 5 resource defaults
- Systems: Character Creation / Calculation / PDF Export
- Current implementation: calculated class progression totals align starting resources to Martial 2 SP, Spellcaster 6 MP, and Hybrid 1 SP / 3 MP. Character creation and PDF export consume those calculated totals.
- Required change: verify and align starting resource defaults:
  - Martial: 2 SP
  - Spellcaster: 6 MP
  - Hybrid: 1 SP and 3 MP
- Data shape impact: none
- Stable ID / alias impact: none
- Calculator/effect impact: confirmed
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: no
- Code touchpoints:
  - `src/routes/character-creation/*`
  - `src/lib/services/enhancedCharacterCalculator.ts`
  - `src/lib/pdf/transformers.ts`
- System docs to update:
  - `docs/systems/CHARACTER_CREATION_FLOW.MD`
  - `docs/systems/CALCULATION_SYSTEM.MD`
- Validation:
  - creation flow snapshot by class category
  - exported values match sheet totals

### VRR-006: Maneuver Cost and Catalog Pass

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268-269, lines 17607-17644
- Baseline: targeted maneuver entries only
- Systems: Martials / Character Creation / Character Sheet
- Current implementation: maneuver catalog removes base SP cost from `Whirlwind` and `Pathcarver`, and includes `Scattershot`.
- Required change:
  - update structured cost fields for `Whirlwind`
  - update structured cost fields for `Pathcarver`
  - add `Scattershot`
- Data shape impact: none
- Stable ID / alias impact: low for cost-only updates; moderate for new maneuver IDs
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: no for these three items
- Code touchpoints:
  - `src/lib/rulesdata/martials/maneuvers.ts`
  - `src/routes/character-creation/Maneuvers.tsx`
  - `src/routes/character-sheet/components/Maneuvers.tsx`
- System docs to update:
  - `docs/systems/MARTIALS_SYSTEM.MD`
- Validation:
  - `src/lib/rulesdata/martials/maneuvers.test.ts`
  - selection count regression
  - saved character render regression

### VRR-007: Equipment Property Cost and Requirement Pass

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17728-17733
- Baseline: current equipment property schema and validator
- Systems: Equipment
- Current implementation: equipment builder uses v0.10.5 Toss / Thrown costs and validates Returning against Toss or Thrown.
- Required change:
  - restore Toss and Thrown costs
  - enforce Returning requires Toss or Thrown
- Data shape impact: none
- Stable ID / alias impact: none if property IDs stay stable
- Calculator/effect impact: none
- UI impact: confirmed
- Storage/export impact: possible for existing saved equipment
- HITL decision: no
- Code touchpoints:
  - `src/lib/rulesdata/equipment/options/*.ts`
  - `src/lib/rulesdata/equipment/validation/equipmentValidator.ts`
  - `src/lib/rulesdata/equipment/storage/equipmentStorage.ts`
- System docs to update:
  - `docs/systems/EQUIPMENT_SYSTEM.MD`
- Validation:
  - `src/lib/rulesdata/equipment/validation/equipmentValidator.test.ts`
  - import/export of existing equipment fixtures

### VRR-008: Spell Taxonomy Normalization

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17653, 17658-17660
- Baseline: current spell schema and filters
- Systems: Spells / Character Sheet
- Current implementation: spell schema treats `Poison` as canonical, `Poison` is filterable, and source-confirmed `Blight Bomb` tag metadata includes `Ailment`.
- Required change:
  - verify canonical `Poison` tag support
  - normalize tag/source metadata where it affects structured filtering and assignment
- Data shape impact: none
- Stable ID / alias impact: low
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: low
- HITL decision: no
- Code touchpoints:
  - `src/lib/rulesdata/schemas/spell.schema.ts`
  - `src/lib/rulesdata/spells-data/**/*.ts`
  - `src/lib/services/calculatorModules/spellSystem.ts`
  - `src/lib/services/spellFiltering.ts`
- System docs to update:
  - `docs/systems/SPELLS_SYSTEM.MD`
- Validation:
  - `src/lib/rulesdata/spells-data/spellTaxonomy.test.ts`
  - spell slot validation tests

## HITL Or Baseline-Comparison Queue

### VRR-009: Class Rename / Removal / Rewrite Set

- Status: `HITL required`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17555-17580
- Baseline: targeted v0.10 class sections only
- Systems: Class / Leveling / Effect / Character Sheet
- Current implementation: several affected classes already persist feature choices and progression references by stable ID.
- Required change:
  - `Elemental Fury`
  - `Elemental Blast` semantics
  - `Swift Berserker` removal
  - `Brace -> Fortify`
  - `Advance` mechanic update
  - Cleric / Commander semantic deltas
- Data shape impact: unknown
- Stable ID / alias impact: confirmed
- Calculator/effect impact: confirmed
- UI impact: confirmed
- Storage/export impact: confirmed
- HITL decision: required before code changes
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/*.ts`
  - `src/lib/rulesdata/classes-data/progressions/*.progression.ts`
  - `src/lib/services/calculatorModules/effectCollection.ts`
  - `src/lib/services/enhancedCharacterCalculator.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/EFFECT_SYSTEM.MD`
  - `docs/systems/CALCULATION_SYSTEM.MD`
- Validation:
  - alias resolution tests
  - progression-to-feature linkage tests
  - old character compatibility checks

### VRR-010: Feature Semantics Baseline Pass

- Status: `needs baseline comparison`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17567-17598
- Baseline: targeted old-vs-new section comparison required
- Systems: Class / Effect / Character Sheet
- Current implementation: changelog is summary-level for Cleric, Commander, Monk, Rogue, and Spellblade semantics.
- Required change: confirm exact mechanical deltas before touching rulesdata or runtime behavior.
- Data shape impact: unknown
- Stable ID / alias impact: possible
- Calculator/effect impact: possible
- UI impact: possible
- Storage/export impact: possible
- HITL decision: after targeted baseline comparison
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/*.ts`
  - `src/lib/services/enhancedCharacterCalculator.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/EFFECT_SYSTEM.MD`
- Validation:
  - focused per-feature regression tests after classification

### VRR-011: Spell Rename / Remove / Add Migration Pass

- Status: `HITL required`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17662-17727
- Baseline: targeted v0.10 spell comparisons only
- Systems: Spells / Character Creation / Character Sheet / PDF Export
- Current implementation: saved characters persist spell selections by stable spell IDs.
- Required change:
  - renamed and reworked spells
  - removed or list-moved spells
  - new spell additions
- Data shape impact: none expected, but migration-sensitive
- Stable ID / alias impact: confirmed
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: confirmed
- HITL decision: required before any ID mutation
- Code touchpoints:
  - `src/lib/rulesdata/spells-data/**/*.ts`
  - `src/lib/rulesdata/spells-data/index.ts`
  - `src/lib/services/calculatorModules/spellSystem.ts`
  - `src/lib/services/calculatorModules/validation.ts`
  - `src/lib/pdf/transformers.ts`
- System docs to update:
  - `docs/systems/SPELLS_SYSTEM.MD`
  - `docs/systems/CHARACTER_SHEET.MD`
- Validation:
  - alias-backed spell lookup fixtures
  - old saved character spell render/export fixtures

### VRR-012: Maneuver Rewrite / Rename Compatibility

- Status: `HITL required`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, line 17639 and related maneuver lines
- Baseline: targeted maneuver comparison required
- Systems: Martials / Character Creation / Character Sheet
- Current implementation: maneuver persistence and some grants are name-sensitive.
- Required change:
  - classify `Reposition` complete rewrite
  - classify `Brace -> Fortify` rename for compatibility impact
- Data shape impact: none expected
- Stable ID / alias impact: confirmed
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: required
- Code touchpoints:
  - `src/lib/rulesdata/martials/maneuvers.ts`
  - `src/lib/services/characterCompletion.ts`
  - `src/lib/utils/characterEdit.ts`
  - `src/lib/pdf/transformers.ts`
- System docs to update:
  - `docs/systems/MARTIALS_SYSTEM.MD`
- Validation:
  - renamed maneuver compatibility fixtures
  - sheet render regression

### VRR-013: Ancestry Trait Delta Pass

- Status: `HITL required`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17743-17746
- Baseline: targeted ancestry/trait comparison required
- Systems: Ancestry / Traits / Character Creation
- Current implementation: trait IDs are persisted and current data already includes `Hazardous Hide`.
- Required change:
  - confirm whether `Hazardous Hide returned` is already represented correctly
  - classify any required effect, cost, or choice changes
- Data shape impact: unknown
- Stable ID / alias impact: possible
- Calculator/effect impact: possible
- UI impact: possible
- Storage/export impact: possible
- HITL decision: required
- Code touchpoints:
  - `src/lib/rulesdata/ancestries/traits.ts`
  - `src/lib/rulesdata/ancestries/ancestries.ts`
  - `src/routes/character-creation/components/TraitChoiceSelector.tsx`
- System docs to update:
  - `docs/systems/ANCESTRY_SYSTEM.MD`
  - `docs/systems/TRAITS_SYSTEM.MD`
- Validation:
  - ancestry data tests
  - trait choice resolution tests if needed

## No-Op / Deferred Guidance

- Treat typo, copy, layout, and example-only fixes as `no-op` unless the app renders the exact prose.
- Defer destructive schema work, immutable versioned storage, and forced conversion flows to v11 unless a new requirement proves otherwise.

## Secondary Verification Backlog

Keep these out of the first implementation pass unless they are pulled in by a changelog-confirmed queue item:

- broad section-level `pending` calculator/effect entries from `CHANGE_AUDIT.md`
- broad spell prose drift not tied to rename/remove/add/tag/source changes
- broad class prose drift without changelog support
- generic equipment examples and layout changes
