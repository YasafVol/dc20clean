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
- Current implementation: saved characters, draft state, sheet load, auto-save, edit/level-up gates, and export flows are rules-version-aware. Current rules are `dc20-0.10.5`; missing or explicit `dc20-0.10` characters are treated as legacy.
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

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17541-17545
- Baseline: current class feature/progression data
- Systems: Class / Leveling / Character Creation / Character Sheet / PDF Export
- Current implementation: every implemented class resolves a level-5 v0.10.5 Expert Feature block. The old `<class>_level_5_placeholder` IDs are intentionally retained for saved-character compatibility while names, descriptions, benefits, and modeled universal effects now reflect v0.10.5.
- Required change: ensure every class has an explicit level-5 Expert Feature block with stable IDs and progression references.
- Data shape impact: none
- Stable ID / alias impact: resolved by retaining existing placeholder IDs as compatibility IDs
- Calculator/effect impact: confirmed for modeled universal Expert Feature bonuses
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: no, unless replacing already-persisted placeholder IDs
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/*.ts`
  - `src/lib/rulesdata/classes-data/classProgressionResolver.test.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/CALCULATION_SYSTEM.MD`
  - `docs/systems/CHARACTER_CREATION_FLOW.MD`
  - `docs/systems/CHARACTER_SHEET.MD`
  - `docs/systems/EFFECT_SYSTEM.MD`
  - `docs/systems/FEATURE_ID_NAMING_CONVENTION.md`
- Validation:
  - `src/lib/rulesdata/classes-data/classProgressionResolver.test.ts`
  - `rulesdata.spec.ts`

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

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17555-17580
- Baseline: targeted v0.10 class sections only
- Systems: Class / Leveling / Effect / Character Sheet
- Current implementation: affected class feature and talent identities preserve legacy IDs where needed. Champion Fighting Spirit now uses the v0.10.5 `Fortify` option wording and Advance's Martial Attack / Physical Check wording while preserving the separate Brace maneuver. Elemental Blast is modeled as an Area Spell Attack. Swift Berserker remains loadable for old characters through the deprecated talent catalog and compatibility alias, but is hidden from v0.10.5 selection.
- Required change:
  - `Elemental Fury`: implemented
  - `Elemental Blast` semantics: implemented as Area Spell Attack
  - `Swift Berserker` removal: implemented as deprecated/loadable, not selectable
  - Champion Fighting Spirit `Brace -> Fortify` option rename: implemented
  - `Advance` mechanic update: implemented for Champion Fighting Spirit
  - Cleric / Commander semantic deltas: implemented
- Data shape impact: additive `deprecated` talent metadata only
- Stable ID / alias impact: confirmed
- Calculator/effect impact: confirmed
- UI impact: confirmed
- Storage/export impact: confirmed
- HITL decision: resolved by targeted v0.10.5 source comparison; no destructive saved-character rewrite
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
  - alias resolution tests: implemented
  - progression-to-feature linkage tests: covered by existing resolver tests
  - old character compatibility checks: Swift Berserker legacy selection is upgrade-required and loadable

### VRR-010: Feature Semantics Baseline Pass

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 268, lines 17567-17598
- Baseline: targeted old-vs-new section comparison required
- Systems: Class / Effect / Character Sheet
- Current implementation: targeted source comparisons are reflected in class feature data and tests. Cleric Magic/Chaos/Divine Blessing/Channel Divinity, Commander Inspiring Presence, Monk Spiritual Balance/Stances/Shifting Tide, Rogue Debilitating Strike/Cheap Shot/Swashbuckler, and Spellblade Martial Path/Bound Weapon/Disciplines/Spellstrike now match v0.10.5 semantics where the app renders or models those features.
- Required change: confirm exact mechanical deltas before touching rulesdata or runtime behavior: implemented
- Data shape impact: none
- Stable ID / alias impact: none beyond Swift Berserker deprecation in VRR-009
- Calculator/effect impact: confirmed through existing effect types only
- UI impact: confirmed for rendered feature/talent text and selectable talent list
- Storage/export impact: possible
- HITL decision: source comparison completed before mutation
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/*.ts`
  - `src/lib/services/enhancedCharacterCalculator.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/EFFECT_SYSTEM.MD`
- Validation:
  - focused per-feature regression tests after classification: implemented in `subclasses.test.ts`

### VRR-011: Spell Rename / Remove / Add Migration Pass

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17662-17727
- Baseline: targeted v0.10 spell comparisons only
- Systems: Spells / Character Creation / Character Sheet / PDF Export
- Current implementation: the v0.10 base school files are preserved and the current selectable catalog is produced by the v0.10.5 overlay in `src/lib/rulesdata/spells-data/v0105Catalog.ts`. Approved spell renames route through `RULES_ALIASES` and `getSpellById()` without rewriting saved IDs. Removed spells are omitted from the current selectable catalog, list-moved spells have source overrides, and reworked/ambiguous IDs are fenced as `upgrade-required` or `view-only`.
- Required change:
  - renamed and reworked spells: implemented with alias/rework/view-only classification
  - removed or list-moved spells: implemented in the catalog overlay
  - new spell additions: implemented in the catalog overlay
- Data shape impact: none expected, but migration-sensitive
- Stable ID / alias impact: confirmed
- Calculator/effect impact: possible
- UI impact: confirmed
- Storage/export impact: confirmed
- HITL decision: user approved moving forward with compatibility-first spell replacement; ambiguous Forcefield and reworked Gravity Well identities remain fenced instead of silently remapped
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
  - old saved character spell export fixtures
  - current catalog addition/removal/source-list fixtures

### VRR-012: Maneuver Rewrite / Rename Compatibility

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, line 17639 and related maneuver lines
- Baseline: targeted maneuver comparison required
- Systems: Martials / Character Creation / Character Sheet
- Current implementation: `Reposition` reflects the v0.10.5 rewrite, `getManeuverById()` resolves IDs and display names for saved name-based selections, and `Brace` remains a current Defense maneuver. `Fortify` is handled as a Champion Fighting Spirit feature alias, not as a maneuver alias.
- Required change:
  - classify `Reposition` complete rewrite: implemented
  - classify `Brace -> Fortify` rename for compatibility impact: implemented as class feature alias/no-op maneuver
- Data shape impact: none expected
- Stable ID / alias impact: confirmed
- Calculator/effect impact: confirmed for Champion `GRANT_ABILITY` target/text
- UI impact: confirmed
- Storage/export impact: possible
- HITL decision: source comparison showed `Brace` is still a maneuver and `Fortify` is only the Champion Fighting Spirit option rename
- Code touchpoints:
  - `src/lib/rulesdata/classes-data/features/champion_features.ts`
  - `src/lib/rulesdata/martials/maneuvers.ts`
  - `src/lib/rulesdata/versioning/aliases.ts`
- System docs to update:
  - `docs/systems/CLASS_SYSTEM.MD`
  - `docs/systems/EFFECT_SYSTEM.MD`
  - `docs/systems/MARTIALS_SYSTEM.MD`
- Validation:
  - Brace maneuver compatibility fixture
  - Reposition rewrite fixture
  - Champion Fighting Spirit semantics fixture
  - sheet render regression

### VRR-013: Ancestry Trait Delta Pass

- Status: `implemented`
- Source: `docs/assets/dc20-0.10.5/CHANGELOG_RECONSTRUCTION.md`, page 269, lines 17743-17746
- Baseline: targeted ancestry/trait comparison required
- Systems: Ancestry / Traits / Character Creation
- Current implementation: trait IDs are persisted and current data includes source-confirmed `Hazardous Hide`. Beastborn `Additional Limb` and `Capable Limb` now match v0.10.5 wording/costs, including Spell Focus and Somatic Component capability.
- Required change:
  - confirm whether `Hazardous Hide returned` is already represented correctly: implemented
  - classify any required effect, cost, or choice changes: implemented
- Data shape impact: none
- Stable ID / alias impact: none; trait IDs are stable
- Calculator/effect impact: no new effect type
- UI impact: confirmed for displayed trait text and point cost
- Storage/export impact: stable IDs retained
- HITL decision: source comparison completed before mutation
- Code touchpoints:
  - `src/lib/rulesdata/ancestries/traits.ts`
  - `src/lib/rulesdata/ancestries/ancestries.ts`
  - `src/routes/character-creation/components/TraitChoiceSelector.tsx`
- System docs to update:
  - `docs/systems/ANCESTRY_SYSTEM.MD`
  - `docs/systems/TRAITS_SYSTEM.MD`
- Validation:
  - ancestry data tests: implemented
  - trait choice resolution tests if needed: not required; no choice shape changed

## No-Op / Deferred Guidance

- Treat typo, copy, layout, and example-only fixes as `no-op` unless the app renders the exact prose.
- Defer destructive schema work, immutable versioned storage, and forced conversion flows to v11 unless a new requirement proves otherwise.

## Secondary Verification Backlog

Keep these out of the first implementation pass unless they are pulled in by a changelog-confirmed queue item:

- broad section-level `pending` calculator/effect entries from `CHANGE_AUDIT.md`
- broad spell prose drift not tied to rename/remove/add/tag/source changes
- broad class prose drift without changelog support
- generic equipment examples and layout changes
