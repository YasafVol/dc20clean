# Export PDF Character Sheet — Specification

Stamp
- Date: 2025-09-13
- Branch: improveDocs

## Goals
- Add client-side export of the DC20 character sheet to a fillable PDF using `pdf-lib`.
- Keep existing app flows unchanged; feature is additive (invoked via explicit button).
- Version and document the PDF template and field mapping to prevent drift.

## Current State Summary
- Systems docs exist for Spells, Martials, Calculation, Effect, and Character Sheet.
- `SavedCharacter` and `CharacterState` types exist; provider renders from saved data, with some legacy JSON still present.
- Character sheet already has a print-to-HTML utility (`handlePrintCharacterSheet`).
- Template files present under `src/lib/pdf/095/`:
  - `DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`
  - `sheet.json` (shape for export payload reference)

## Decisions
- Approach: client-side template fill with `pdf-lib` (SPA-only; no server runtime).
- Template version: dc20-0.9.5 (base under `src/lib/pdf/095/`).
- Field list is generated via a dev script and committed to `docs/systems/pdf-form-fields-v0.9.5.json`.
- No change to current app flows; feature is a new button on Load Character cards and later on the sheet.

## Milestones & Tasks

### M0: Foundation & Tooling
- Script: `scripts/listPdfFields.ts` enumerates AcroForm fields of the template and outputs JSON.
- DTO: `PdfExportData` type + Zod schema in `src/lib/types/pdfExport.ts` (mirrors `sheet.json`).

#### M0.3: Local Export (Manual E2E POC)
- Create `tests/fixtures/pdf-export-basic.json` — a static character payload (minimal but representative).
- Create `scripts/localExportPOC.ts` that:
  - Loads the fixture, validates/coerces with `PdfExportDataSchema`.
  - Loads `src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf` via fs.
  - Fills fields using keys (or `fieldMap` once available) with `pdf-lib`.
  - Writes `test-results/local-export.pdf` locally (Git-ignored).
- NPM script: `export:local` → `ts-node scripts/localExportPOC.ts`.
- Acceptance: Running the script produces an openable PDF without touching the app UI.

### M1: Client-Side Export (No Server API)
- Dependency: add `pdf-lib`; lazy-load in the export flow.
- Field map module: `src/lib/pdf/fieldMap.dc20-0.9.5.ts` mapping DTO paths → PDF fields (incl. checkbox on-values).
- Transformer: `src/lib/pdf/transformers.ts` — `transformCalculatedCharacterToPdfData(result) => PdfExportData`.
- Filler: `src/lib/pdf/fillPdf.ts` — `fillPdfFromData(data, { flatten? }) => Blob`
  - Import template URL via Vite `?url` and fetch ArrayBuffer.
  - `PDFDocument.load`, set fields from fieldMap, optional `form.flatten()`.

### M2: UI Integration (Additive)
- Load Character screen: add an "Export PDF" button on each character card.
  - Handler gathers data (using saved character), lazy-loads filler and triggers download.
  - No navigation changes; existing buttons remain intact.
- Character Sheet (later): optional Export buttons for fillable/flattened variants.

### M3: Tests & Quality
- Unit: transformer shape test vs a fixture.
- E2E (Playwright): click Export, assert downloaded filename and non-empty size. Optional: re-open PDF and assert a few fields.

### M4: Polish
- Filename hygiene: `Name_Level_Class_vDC20-0.9.5[_flattened].pdf` (ASCII, underscores, length-capped).
- Performance: lazy-load `pdf-lib`; basic timing logs in client.

## Acceptance (Non-invasive)
- Clicking the new Export button downloads a valid, openable PDF; all existing app flows and routes behave exactly as before.
- No backend/serverless endpoints introduced; all logic runs in the browser.
- Template field list and field map are committed; CI tests guard against drift (via E2E).

## Dev Notes
- Run field lister: `npm run export:list-fields` (writes `docs/systems/pdf-form-fields-v0.9.5.json`).
- Import the PDF template via: `import templateUrl from '../../lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf?url'` in client code.
- Keep IDs and existing types stable; avoid unrelated refactors.
