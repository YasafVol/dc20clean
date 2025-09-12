# Export PDF Character Sheet – Plan & State Log

Stamp
- Timestamp (UTC): 2025-09-12T21:21:24Z
- Branch: improveDocs
- HEAD: c6a49bd 2025-09-12 23:54:03 +0300 docs(ontology): link to Calculation and Effect system docs

## Current State Summary

- Systems docs added for Spells, Martials, Calculation, Effect, and Character Sheet.
- Ancestry doc renamed; AGENTS.md now contains a Systems Index and Agent Brief template.
- Background/Traits docs updated with acceptance criteria and cross-links.
- Storage utilities and typed `SavedCharacter`/`CharacterState` exist; completion flow writes typed objects with breakdowns.
- Sheet still recalculates via provider/hooks; migration of legacy JSON string fields is partial (defaults vs parse).

## Leftover Tasks (prioritized)

1) Eliminate sheet-side recalculation (render from `SavedCharacter`; recalc only on edit flows)
2) Implement `useAttributeCalculation` hook and gate trait/attribute UI
3) Legacy JSON migration for `skillsJson/tradesJson/languagesJson/selectedTraitIds` → typed
4) Purge residual JSON usage in UI (ensure only storage utils parse/stringify)
5) Align `languagesData` shape (string[] vs map with fluency) and migrate
6) Add tests (migration, attribute hook, sheet no-recalc) and reduce storage logs

## Implementation Breakdown

- Eliminate sheet recalculation
  - Files: CharacterSheetProvider, CharacterSheetClean, useEnhancedCharacterCalculation, characterContext
  - Complexity: Medium-High | Extent: 6–10 files | Confidence: 0.7 | Impact: High

- Attribute hook + gating
  - Files: +useAttributeCalculation, TraitChoiceSelector, Attributes
  - Complexity: Medium | Extent: 3–5 files | Confidence: 0.8 | Impact: Medium-High

- Legacy JSON migration
  - Files: +migrationUtils, storage deserializer integration
  - Complexity: Low-Med | Extent: 1–2 files | Confidence: 0.9 | Impact: High

- Purge residual JSON usage
  - Files: audit src/routes/**, src/lib/**
  - Complexity: Low-Med | Extent: 3–6 files | Confidence: 0.85 | Impact: Medium

- Languages shape alignment
  - Files: dataContracts, storageUtils, languages UI
  - Complexity: Medium | Extent: 3–5 files | Confidence: 0.65 | Impact: Medium

- Tests & logging cleanup
  - Files: storageUtils.spec, +migrationUtils.spec, +useAttributeCalculation.spec, small sheet-load test
  - Complexity: Low-Med | Extent: 3–4 tests | Confidence: 0.85 | Impact: Medium


