# DC20 0.10.5 Validation Scaffold

Last Updated: 2026-06-01

## Purpose

This scaffold defines the validation work needed before and after any future v0.10.5 implementation. It is grouped by audit lane so work can be executed in parallel later.

This file does not imply that implementation has started.

## Validation Principles

- Validate compatibility before content.
- Prefer changelog-confirmed targeted checks over whole-book re-verification.
- Add tests for any renamed, removed, reworked, or alias-backed identity.
- Update relevant `docs/systems/*.MD` in the same change as shipped behavior.

## Pre-Implementation Audit Checks

### Source bundle integrity

- [ ] `DC20 0.10.5 clean.md` exists and has page markers
- [ ] `chunks.json` exists and is parseable
- [ ] `page-index.json` exists and is parseable
- [ ] `CLEANUP_REPORT.md` and `CHANGELOG_RECONSTRUCTION.md` agree on known high-risk table/chunk areas
- [ ] `CHANGE_AUDIT.md` entry count mismatch is documented and resolved at the queue level

### Artifact completeness

- [ ] `IMPLEMENTATION_QUEUE.md` exists
- [ ] `ID_STABILITY_AND_ALIASES.md` exists
- [ ] `VALIDATION_SCAFFOLD.md` exists
- [ ] every implementation queue item has a source reference
- [ ] every rename/removal has a compatibility classification

## Runtime Compatibility Validation

### Version contract

- [ ] saved character contract supports additive `rulesVersion`
- [ ] draft character state carries `rulesVersion` or explicit compatibility metadata
- [ ] imported characters preserve incoming version metadata
- [ ] `schemaVersion` handling is internally consistent

### Compatibility policy

- [ ] old characters can be classified as editable, upgrade-required, or view-only
- [ ] no old character is silently reinterpreted by current rules without a version fence
- [ ] compatibility state is enforced in:
  - load
  - level up
  - auto-save
  - PDF export

### Alias resolution

- [ ] alias lookup covers feature IDs
- [ ] alias lookup covers spell IDs
- [ ] alias lookup covers maneuver IDs
- [ ] alias lookup covers trait IDs when needed
- [ ] alias-backed old fixtures still render on the character sheet

## Content Lane Validation

### Classes / progression / talents

- [ ] `src/lib/rulesdata/rulesdata.spec.ts`
- [ ] `src/lib/rulesdata/classes-data/classProgressionResolver.test.ts`
- [ ] `src/lib/rulesdata/classes-data/features/subclasses.test.ts`
- [ ] `src/lib/rulesdata/classes-data/talents/talents.test.ts`
- [ ] `src/lib/rulesdata/progression/multiclass.test.ts`
- [ ] level 5 Expert Feature coverage for every class is asserted
- [ ] caster and hybrid MP deltas are asserted by level
- [ ] removed multiclass tiers remain compatible for old fixtures under the chosen policy

### Spells

- [ ] spell schema covers v0.10.5 tag/source metadata
- [ ] `Poison` tag is filterable and valid
- [ ] renamed spell fixtures resolve by alias when allowed
- [ ] removed or list-moved spells are classified correctly
- [ ] slot validation handles old spell IDs under compatibility rules
- [ ] PDF/export still renders old and new spell selections as expected

### Maneuvers

- [x] `Whirlwind` and `Pathcarver` structured costs are asserted
- [x] `Scattershot` exists and is selectable
- [ ] renamed maneuver fixtures render correctly if aliases are approved
- [ ] `Reposition` stays blocked from implementation until semantic review is complete

### Ancestry / traits

- [ ] `src/lib/rulesdata/ancestries/ancestries.test.ts`
- [ ] trait references remain valid after any v0.10.5 changes
- [ ] trait choice resolution still works for legacy and new data
- [ ] `Hazardous Hide` classification is verified against source text before mutation

### Background

- [ ] `src/lib/services/enhancedCharacterCalculator.spec.ts`
- [ ] background budgets and mastery-cap rules still match system expectations
- [ ] stored skill/trade/language fixtures remain valid under compatibility policy

### Equipment

- [x] validator coverage for Toss / Thrown costs
- [x] validator coverage for Returning prerequisite
- [ ] import/export tests for stored custom equipment with stable property IDs
- [ ] backward compatibility check for existing saved equipment payloads

## Integration Validation

### Calculator and validation pipeline

- [ ] `src/lib/services/enhancedCharacterCalculator.aggregation.test.ts`
- [ ] `src/lib/services/enhancedCharacterCalculator.spec.ts`
- [ ] `src/lib/services/levelingRegression.test.ts`
- [ ] `src/tests/parity/characterEngine.parity.spec.tsx`
- [ ] version-aware fixtures exist for old and new rules versions

### Character sheet and export

- [ ] old character opens without destructive rewrite
- [ ] old character export behavior follows chosen compatibility policy
- [ ] v0.10.5 character export behavior uses correct routing metadata
- [ ] hardcoded rules-version assumptions are removed from export entry points before rollout

## Manual Review Checklist

- [ ] inspect every queue item marked `HITL required`
- [ ] approve or reject every alias candidate
- [ ] approve the old-character compatibility policy
- [ ] confirm which items are `no-op`
- [ ] confirm which items are deferred to v11

## Suggested Command Bundle For Future Implementation

```bash
npm run test:unit
```

Targeted tests expected during implementation:

```bash
npx vitest src/lib/rulesdata/classes-data/classProgressionResolver.test.ts
npx vitest src/lib/rulesdata/classes-data/talents/talents.test.ts
npx vitest src/lib/rulesdata/ancestries/ancestries.test.ts
npx vitest src/lib/services/enhancedCharacterCalculator.spec.ts
npx vitest src/lib/services/levelingRegression.test.ts
npx vitest src/tests/parity/characterEngine.parity.spec.tsx
```
