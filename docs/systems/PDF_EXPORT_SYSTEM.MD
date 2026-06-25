# DC20Clean – PDF Export System

> Purpose
>
> Capture the architecture, scope, and acceptance criteria for exporting a calculated character sheet to the official DC20 fillable PDF. This document is the system overview aligned with existing docs (no separate planning spec is currently tracked in-repo).
> Last Updated: 2026-06-25

---

## 1. Goal & Scope

- Deliver an entirely client-side export flow that produces an editable PDF.
- **Default version: DC20 v0.10** (with v0.9.5 fallback available)
- Keep the PDF field mapping and DTO definitions versioned so we can evolve the sheet without breaking prior exports.
- Route PDF template selection from character `rulesVersion`; v0.10 and v0.10.5 currently both route to the checked-in v0.10 fillable template until a v0.10.5 template and field map exist.
- Internal versioning lanes and routing policy are centralized in `docs/systems/VERSIONING_SYSTEM.MD`.
- Minimize bundle impact through lazy loading and on-demand work.
- **Authentication Required**: PDF export is gated behind user authentication (see Section 10).

Out of scope (tracked as future ideas in Section 8): flattened exports toggle, performance metrics, server-side generation.

---

## 2. Systems & Touchpoints

- **Stored Character Values** — `SavedCharacter` fields are the canonical source for values exported to the PDF. Export does not run the current calculator.
- **Collected Effect Values** — creation completion and character sheet autosave persist calculator-collected resistances, vulnerabilities, senses, and combat training so PDF export can consume them without recalculating.
- **v0.10.5 Resource Totals** — PDF SP/MP fields consume calculated class progression totals. Martial characters start at 2 SP, spellcasters at 6 MP, and hybrids at 1 SP / 3 MP; v0.10.5 level 10 totals are 6 SP for martials, 21 MP for spellcasters, and 3 SP / 11 MP for hybrids.
- **v0.10.5 Expert Feature Effects** — level 5 Expert Features keep their legacy placeholder IDs but now contribute modeled effects through the calculator before export, including skill point, HP/MP, speed/jump, spell, and maneuver grants where those mechanics are structured.
- **Transformation Layer** — `src/lib/pdf/transformers.ts` maps saved character values into a structured DTO that matches the PDF field list. `transformCalculatedCharacterToPdfData` is retained for tests/legacy helpers and is not the runtime export path.
- **Spell Display Lookup** — PDF export is a pure consumer of stored character data. It may resolve exact current catalog IDs to display names, but it must not apply compatibility aliases or migration decisions. Legacy, reworked, deprecated, or ambiguous spell IDs are exported as the stored value until an explicit rules-upgrade draft changes the saved data.
- **PDF Field Maps** — Versioned field maps for different PDF versions:
  - `src/lib/pdf/fieldMap.dc20-0.10.ts` — Default v0.10 field map
  - `src/lib/pdf/fieldMap.dc20-0.9.5.ts` — Legacy v0.9.5 field map
- **PDF Field Audit Service** — Generic, version-agnostic PDF schema/diff tooling:
  - `scripts/pdf/pdfFieldAuditService.mjs` extracts fields from any fillable PDF, compares two extracted schemas, and optionally validates a TS field map against the new/latest PDF.
  - `scripts/pdf/auditPdfFields.mjs` provides the CLI wrapper. Version labels are CLI metadata only; the service does not encode DC20-specific version behavior.
- **PDF Filler** — `src/lib/pdf/fillPdf.ts` loads the template, applies the field map with `pdf-lib`, and returns a Blob (optionally flattened). Supports version selection.
- **Rules Version Routing** — `src/lib/rulesdata/versioning/compatibility.ts` maps a character `rulesVersion` to the supported PDF template version.
- **PDF Templates**:
  - `src/lib/pdf/010/DC20 Beta 0.10 (fillable) Character Sheet.pdf`
  - `src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`
- **UI Integration** — `src/routes/character-creation/LoadCharacter.tsx` provides the load-list "Export PDF" CTA. `src/routes/character-creation/CharacterCreation.tsx` also exposes a final-step "Print PDF" secondary action that completes/autosaves the character first, then exports from the saved record.
- **Character Sheet Integration** — `src/routes/character-sheet/CharacterSheetClean.tsx` and `src/routes/character-sheet/CharacterSheetRedesign.tsx` re-read the saved record by ID before export.

---

## 3. Data Contracts

### 3.1 PdfExportData (DTO)

- Defined in `src/lib/types/pdfExport.ts` with a Zod schema for runtime validation.
- Mirrors the JSON shape in `src/lib/pdf/095/sheet.json`, capturing sections, repeated rows, checkbox state, and derived text.
- Acts as the API between the transformer and filler; any changes must update both the type and field map.

**Key Data Sections:**

- **Identity & Attributes**: Character name, level, class, ancestry, core attributes
- **Skills & Trades**: Mastery levels, proficiency bonuses, knowledge/practical trades
- **Combat**: Attack/Save DC, initiative, HP/SP/MP/Grit/Rest Points, defenses
- **Movement**: Ground speed, jump distance, hold breath, movement types (burrow, swim, fly, climb, glide) with half/full speed indicators
- **Languages**: Up to 4 languages with limited/fluent mastery
- **Equipment & Inventory**: Attacks, equipped items, attunement, carried items (carried field also includes feature names)
- **Damage Reduction**: `reduction.physical`, `reduction.elemental`, and
  `reduction.mystical` are binary DTO flags. The current v0.10/v0.9.5 PDF template
  field for mystical reduction is named `Mental-Damage-Reduction`; the field map keeps
  that external name while the internal contract uses `mystical`.
- **Collected Effects**: resistances, vulnerabilities, senses, and combat training are stored on `SavedCharacter` as display/export arrays. Reduction flags are derived from stored resistance entries with PDR/EDR/MDR values.

### 3.2 PDF Field Manifest

- Script `scripts/pdf/auditPdfFields.mjs` enumerates form fields in any PDF template using `pdf-lib`.
- `npm run pdf:fields:audit -- --new <pdf>` prints a JSON schema report for a single template.
- `npm run pdf:fields:audit -- --old <old-pdf> --new <new-pdf> --field-map <map.ts> --out <report.json>` produces a preparatory diff report before export mapping work.
- `npm run pdf:fields:audit:current` compares the checked-in v0.9.5 and v0.10 templates and writes `docs/migration/pdf-field-audit-current.json`.
- Legacy script `scripts/listPdfFields.mjs` now delegates to the shared extractor and accepts an optional PDF path.
- Field maps are versioned:
  - `fieldMap.dc20-0.10.ts` — Maps for v0.10 PDF template
  - `fieldMap.dc20-0.9.5.ts` — Maps for v0.9.5 PDF template (legacy)

### 3.3 PDF Version Routing

1. PDF audit tooling is not part of runtime export.
2. Runtime export must continue using explicit template and field-map helpers per supported PDF version.
3. Older saved characters may export through older supported PDF helpers when their routed PDF version still has a checked-in template and map.
4. New PDF support should start with the generic field audit report, then add or update a versioned field map and export route only after the schema differences are understood.

---

## 4. Runtime Flow

1. **Trigger** — User clicks “Export PDF” in the character sheet UI/load-character list, or “Print PDF” on the final character-creation step.
2. **Preparation** — UI reads the stored character record and routes the PDF version from `rulesVersion`. Character creation must complete/autosave first; export still consumes the saved record, not transient wizard state.
3. **Transformation** — `transformSavedCharacterToPdfData(character)` produces a validated `PdfExportData` object.
4. **Lazy Load** — UI dynamically imports `fillPdfFromData` (and `pdf-lib`) to avoid upfront bundle cost.
5. **Fill & Save** — `fillPdfFromData` loads the template via `?url`, fills fields based on the rules-version-routed map (default: v0.10), optionally flattens, and returns a Blob for download.
6. **Download** — UI uses `URL.createObjectURL` to prompt the user with a sanitized filename that includes the DC20 rules version.
7. **Feedback** — UI surfaces success or error notifications, resetting loading state accordingly.

PDF export is best effort for unsupported or future rules versions. If the routing layer can map the character to an available template, export proceeds from stored values; it must not recalculate under current rules.

---

## 5. Dependencies & Tooling

- `pdf-lib` — core dependency for reading/modifying form fields. Imported lazily so it does not inflate the main bundle.
- Optional `file-saver` — parity with existing download flows; may fall back to native `URL.createObjectURL`.
- Dev script `scripts/pdf/auditPdfFields.mjs` — extracts template field schemas, diffs PDF versions, and validates field-map coverage.

---

## 6. Implementation Checklist (Milestones)

- **Milestone 0 – Foundation**
  - Generate field manifest (`listPdfFields.ts`; commit output JSON).
  - Add `PdfExportData` type + Zod schema (`src/lib/types/pdfExport.ts`).
- **Milestone 1 – Client Export Core**
  - Install `pdf-lib`; ensure lazy import inside the export flow.
  - Create `fieldMap.dc20-0.9.5.ts`, `transformers.ts`, and `fillPdf.ts` modules.
  - Implement `fillPdfFromData(data, { flatten? })` returning `Blob`.
- **Milestone 2 – UI Integration**
  - Add “Export PDF” button to character sheet and load-character surfaces.
  - Implement export wiring as stored character → transformer → filler → download.
  - Provide success/error messaging and dynamic filename.
- **Milestone 3 – Testing (Planned)**
  - Add Playwright spec for export/download validation (no export E2E spec in repo yet).
  - Consider unit tests for `transformSavedCharacterToPdfData` covering key sections.

---

## 7. Acceptance Criteria

- Exported PDF opens in Preview, Chrome, and Adobe Acrobat without corruption.
- Editable export retains form fields; flattened variant removes editability.
- Field values (text, numbers, checkboxes) match the calculated character data for representative test builds.
- Export action communicates success/failure and never blocks the UI after completion.
- E2E test downloads a non-empty file with the expected filename pattern.

---

## 8. Future Enhancements

- **Flattened Toggle** — add UI control to call `fillPdfFromData` with `{ flatten: true }`.
- **Performance Telemetry** — log timing metrics around load → fill → save for monitoring.
- **Template Versioning** — ✅ Implemented: v0.10 (default) and v0.9.5 (legacy) supported.
- **Server-Side Rendering** — consider Node-based rendering if browser constraints arise.
- **v0.10.5 Template** — add a dedicated v0.10.5 template and field map if the official fillable PDF changes from v0.10.
- **Field Map Cleanup** — current audit report flags one stale v0.10 map entry, `Supplies D`, because the template exposes `Supplies D Amount` but not `Supplies D`.

---

## 9. Movement System Integration

**Added: 2025-10-10**

Movement types are now fully integrated with PDF export:

### Character Data Storage

- `movement` object with 5 movement types (burrow, swim, fly, climb, glide)
- Each type has `half` and `full` boolean flags
- `holdBreath` stored as numeric value (equals Might attribute)

### PDF Field Mapping

Movement checkboxes in `fieldMap.dc20-0.9.5.ts`:

- `Burrow-Half` / `Burrow-Full`
- `Swim-Half` / `Swim-Full`
- `Fly-Half` / `Fly-Full`
- `Climb-Half` / `Climb-Full`
- `Glide-Half` / `Glide-Full`
- `Hold Breath` (text field)

### Processing Flow

1. **Calculator** (`enhancedCharacterCalculator.ts`) processes `GRANT_MOVEMENT` effects
2. **Transformer** (`transformers.ts`) converts to movement structure via `processMovementsToStructure()`
3. **Character Completion** (`characterCompletion.ts`) saves movement data to `SavedCharacter`
4. **Character Sheet Autosave** (`CharacterSheetProvider.tsx`) refreshes movement and collected effect arrays when recalculating a current editable character
5. **PDF Export** reads saved movement data and maps to form fields

**See**: `docs/systems/EFFECT_SYSTEM.MD#2.1` for GRANT_MOVEMENT effect documentation

---

## 10. Authentication Gating

**Added: 2026-01-14**

PDF export requires user authentication. This is implemented using `FeatureGateButton` from the auth system.

### Implementation

```tsx
import { FeatureGateButton } from '@/components/auth';

// In LoadCharacter.tsx
<FeatureGateButton
	feature="pdf-export"
	onAction={() => handleExportPdf(character)}
	className="border-purple-500 font-bold text-purple-400 hover:bg-purple-500 hover:text-white"
>
	Export PDF
</FeatureGateButton>;
```

### Behavior

1. **Not Signed In**: Clicking "Export PDF" shows a sign-in dialog (Google/GitHub OAuth)
2. **After Sign In**: Export proceeds automatically
3. **Already Signed In**: Export proceeds immediately

### Rationale

- PDF export is a premium feature encouraging account creation
- Enables future features like export history, cloud PDF storage
- Reduces anonymous abuse of export functionality

**See**: `docs/archive/CONVEX_MIGRATION.md` for full authentication system details.

---

> Last updated: 2026-06-25
> Maintainer: @DC20Clean-Team
