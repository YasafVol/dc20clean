# DC20 0.10.5 Validation Scaffold

Last Updated: 2026-06-13

## Purpose

This scaffold records completed and remaining validation for the v0.10.5
implementation and migration.

## Validation Principles

- Validate compatibility before content.
- Prefer changelog-confirmed targeted checks over whole-book re-verification.
- Add tests for any renamed, removed, reworked, or alias-backed identity.
- Update relevant `docs/systems/*.MD` in the same change as shipped behavior.

## Pre-Implementation Audit Checks

### Source bundle integrity

- [x] `DC20 0.10.5 clean.md` exists and has page markers
- [x] `chunks.json` exists and is parseable
- [x] `page-index.json` exists and is parseable
- [x] `CLEANUP_REPORT.md` and `CHANGELOG_RECONSTRUCTION.md` identify known high-risk table/chunk areas
- [x] `CHANGE_AUDIT.md` entry count mismatch is documented and resolved at the queue level

### Artifact completeness

- [x] `IMPLEMENTATION_QUEUE.md` exists
- [x] `ID_STABILITY_AND_ALIASES.md` exists
- [x] `VALIDATION_SCAFFOLD.md` exists
- [x] every implementation queue item has a source reference
- [x] every rename/removal has a compatibility classification

## Runtime Compatibility Validation

### Version contract

- [x] saved character contract supports additive `rulesVersion`
- [x] draft character state carries `rulesVersion` or explicit compatibility metadata
- [x] imported characters preserve incoming version metadata
- [x] `schemaVersion` handling is internally consistent

### Compatibility policy

- [x] old characters can be classified as editable, upgrade-required, or view-only
- [x] no old character is silently reinterpreted by current rules without a version fence
- [x] compatibility state is enforced in:
  - load
  - level up
  - auto-save
  - PDF export

### Alias resolution

- [x] alias lookup covers feature IDs
- [x] alias lookup covers spell IDs
- [x] alias lookup covers maneuver IDs
- [x] alias lookup covers trait IDs when needed
- [x] alias-backed old fixtures still render on the character sheet

## Content Lane Validation

### Classes / progression / talents

- [x] `src/lib/rulesdata/rulesdata.spec.ts`
- [x] `src/lib/rulesdata/classes-data/classProgressionResolver.test.ts`
- [x] `src/lib/rulesdata/classes-data/features/subclasses.test.ts`
- [x] `src/lib/rulesdata/classes-data/talents/talents.test.ts`
- [x] `src/lib/rulesdata/progression/multiclass.test.ts`
- [x] `src/lib/services/dc20v0105ProgressionResources.test.ts`
- [x] level 5 Expert Feature coverage for every class is asserted
- [x] caster and hybrid MP deltas are asserted by level
- [x] removed multiclass tiers remain loadable for old fixtures but absent from current selection

### Spells

- [x] spell schema covers v0.10.5 tag/source metadata
- [x] `Poison` tag is filterable and valid
- [x] renamed spell fixtures resolve by alias when allowed
- [x] removed or list-moved spells are classified correctly
- [x] slot validation handles old spell IDs under compatibility rules
- [x] PDF/export still renders old and new spell selections as expected

### Maneuvers

- [x] `Whirlwind` and `Pathcarver` structured costs are asserted
- [x] `Scattershot` exists and is selectable
- [x] `Brace` remains a current maneuver and does not alias to Champion `Fortify`
- [x] `Reposition` v0.10.5 rewrite is asserted

### Ancestry / traits

- [x] `src/lib/rulesdata/ancestries/ancestries.test.ts`
- [x] trait references remain valid after any v0.10.5 changes
- [x] trait choice resolution still works for legacy and new data
- [x] `Hazardous Hide` classification is verified against source text before mutation

### Background

- [x] `src/lib/services/enhancedCharacterCalculator.spec.ts`
- [x] background budgets and mastery-cap rules still match system expectations
- [x] stored skill/trade/language fixtures remain valid under compatibility policy

### Equipment

- [x] validator coverage for Toss / Thrown costs
- [x] validator coverage for Returning prerequisite
- [x] import/export tests for stored custom equipment with stable property IDs
- [x] backward compatibility check for existing saved equipment payloads

## Integration Validation

### Calculator and validation pipeline

- [x] `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts`
- [x] `src/lib/services/enhancedCharacterCalculator.spec.ts`
- [x] `src/lib/services/levelingRegression.test.ts`
- [x] `src/tests/parity/characterEngine.parity.spec.tsx`
- [x] version-aware fixtures exist for old and new rules versions

### Character sheet and export

- [x] old character opens without destructive rewrite
- [x] old character export behavior follows chosen compatibility policy
- [x] v0.10.5 character export behavior uses correct routing metadata
- [x] hardcoded rules-version assumptions are removed from export entry points before rollout

## Manual Review Checklist

- [x] inspect every queue item marked `HITL required`
- [x] approve or reject every alias candidate
- [x] approve the old-character compatibility policy
- [x] confirm which items are `no-op`
- [x] confirm which items are deferred to v11

## Verification Command Bundle

```bash
npm run test:unit -- --run
npm run build
npm run spells:validate:0105
```

Targeted tests expected during implementation:

```bash
npx vitest run --project server \
  src/lib/rulesdata/classes-data/classProgressionResolver.test.ts \
  src/lib/rulesdata/classes-data/talents/talents.test.ts \
  src/lib/rulesdata/ancestries/ancestries.test.ts \
  src/lib/rulesdata/versioning/compatibility.test.ts \
  src/lib/rulesdata/versioning/characterUpgrade.test.ts \
  src/lib/rulesdata/versioning/legacyCharacterAcceptance.test.ts \
  src/lib/rulesdata/equipment/storage/equipmentStorage.test.ts \
  src/lib/rulesdata/equipment/validation/equipmentValidator.test.ts \
  src/lib/services/enhancedCharacterCalculator.spec.ts \
  src/lib/services/levelingRegression.test.ts

npx vitest run --project client \
  src/routes/character-sheet/hooks/CharacterSheetProvider.compatibility.test.tsx \
  src/tests/parity/characterEngine.parity.spec.tsx
```
