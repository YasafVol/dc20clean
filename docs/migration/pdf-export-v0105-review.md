# PDF Export v0.10.5 Review

> Last Updated: 2026-06-25

## Scope

Review PDF export as a pure consumer of saved character data for DC20 v0.10.5 compatibility.

## Findings

1. Stored-data routing is correct.
   1. Character sheet export re-reads the saved character by ID before transforming.
   2. Load-character export uses the selected saved character record directly.
   3. `dc20-0.10.5` routes to the checked-in v0.10 fillable template.

2. Version behavior is correct.
   1. Export does not run rules aliases or upgrade logic.
   2. Legacy spell IDs remain stored values.
   3. Exact current spell IDs can resolve to current display names.

3. Field coverage is broad enough for current v0.10.5 sheet data.
   1. Core stats, saves, skills, trades, languages, resources, defenses, reductions, movement, features, spells, maneuvers, and inventory are modeled in `PdfExportData`.
   2. The v0.10 field map includes the corresponding official PDF fields.
   3. `npm run pdf:fields:audit:current` reports no field-schema difference between the checked-in v0.9.5 and v0.10 templates: 309 fields each, 0 added, 0 removed, 0 type changes.

4. Gap fixed: collected effect arrays were typed for storage but not persisted by creation or sheet autosave.
   1. Creation completion now saves resistances, vulnerabilities, senses, and combat training from calculator output.
   2. Character sheet autosave now refreshes the same arrays when it recalculates movement/resource maxes.
   3. PDF reduction checkboxes and feature text now have stored data to consume without recalculation.

5. PDF field auditing is now generic and version-agnostic.
   1. `scripts/pdf/auditPdfFields.mjs` accepts arbitrary old/new PDF paths and labels.
   2. `scripts/pdf/pdfFieldAuditService.mjs` extracts field schemas, compares them, and optionally validates a field map against the new/latest PDF.
   3. Audit output is preparatory only; runtime export still uses explicit versioned templates and field maps.

## Current Limits

1. There is no checked-in v0.10.5 fillable template or field map.
   1. v0.10.5 intentionally exports through the v0.10 template.

2. Attack rows are still mostly empty.
   1. Weapon/spell attack-row rendering is a character-sheet/equipment presentation concern before PDF can export it accurately.

3. Spell focus presentation effects are not rendered into spell rows.
   1. Foci effects are modeled and calculated where applicable.
   2. Reach, Long-Ranged, Powerful, and Vicious still need a spell-presentation consumer before PDF can mirror them.

4. `transformCalculatedCharacterToPdfData` remains test-only/legacy.
   1. UI export paths use `transformSavedCharacterToPdfData`.
   2. Keep this function from becoming a runtime export path unless the stored-value policy changes.

5. Current field-map cleanup remains open.
   1. `docs/migration/pdf-field-audit-current.json` flags one stale v0.10 map entry: `Supplies D`.
   2. The PDF template exposes `Supplies D Amount`; it does not expose a `Supplies D` field.

## Validation Targets

1. `src/lib/pdf/transformers.spec.ts`
2. `src/lib/rulesdata/versioning/legacyCharacterAcceptance.test.ts`
3. `src/lib/services/equipmentEffects.calculator.test.ts`
4. `npm run build`
5. `git diff --check`
6. `npm run pdf:fields:audit:current`
