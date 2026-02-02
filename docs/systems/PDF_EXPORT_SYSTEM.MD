# DC20Clean – PDF Export System

> Purpose
>
> Capture the architecture, scope, and acceptance criteria for exporting a calculated character sheet to the official DC20 fillable PDF. This document translates the planning spec in `docs/plannedSpecs/EXPORT_PDF.md` into a system overview aligned with existing docs.

---

## 1. Goal & Scope

- Deliver an entirely client-side export flow that produces an editable PDF.
- **Default version: DC20 v0.10** (with v0.9.5 fallback available)
- Keep the PDF field mapping and DTO definitions versioned so we can evolve the sheet without breaking prior exports.
- Minimize bundle impact through lazy loading and on-demand work.
- **Authentication Required**: PDF export is gated behind user authentication (see Section 10).

Out of scope (tracked as future ideas in Section 8): flattened exports toggle, performance metrics, server-side generation.

---

## 2. Systems & Touchpoints

- **Character Calculation** — `src/lib/services/enhancedCharacterCalculator.ts` outputs `EnhancedCalculationResult`; this is the canonical source for values exported to the PDF.
- **Transformation Layer** — `src/lib/pdf/transformers.ts` maps calculation results into a structured DTO that matches the PDF field list.
- **PDF Field Maps** — Versioned field maps for different PDF versions:
  - `src/lib/pdf/fieldMap.dc20-0.10.ts` — Default v0.10 field map
  - `src/lib/pdf/fieldMap.dc20-0.9.5.ts` — Legacy v0.9.5 field map
- **PDF Filler** — `src/lib/pdf/fillPdf.ts` loads the template, applies the field map with `pdf-lib`, and returns a Blob (optionally flattened). Supports version selection.
- **PDF Templates**:
  - `src/lib/pdf/010/DC20 Beta 0.10 (fillable) Character Sheet.pdf`
  - `src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`
- **UI Integration** — `src/routes/character-creation/LoadCharacter.tsx` provides the primary entry point via an "Export PDF" CTA.

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

### 3.2 PDF Field Manifest

- Script `scripts/listPdfFields.ts` enumerates form fields in the PDF template using `pdf-lib`.
- Field maps are versioned:
  - `fieldMap.dc20-0.10.ts` — Maps for v0.10 PDF template
  - `fieldMap.dc20-0.9.5.ts` — Maps for v0.9.5 PDF template (legacy)

---

## 4. Runtime Flow

1. **Trigger** — User clicks “Export PDF” in the character sheet UI.
2. **Preparation** — UI gathers the current editable character, normalizes it with `convertToEnhancedBuildData`, and runs `calculateCharacterWithBreakdowns`.
3. **Transformation** — `transformCalculatedCharacterToPdfData(characterResult)` produces a validated `PdfExportData` object.
4. **Lazy Load** — UI dynamically imports `fillPdfFromData` (and `pdf-lib`) to avoid upfront bundle cost.
5. **Fill & Save** — `fillPdfFromData` loads the template via `?url`, fills fields based on the versioned map (default: v0.10), optionally flattens, and returns a Blob for download.
6. **Download** — UI uses `URL.createObjectURL` (or `file-saver`) to prompt the user with a sanitized filename (e.g., `Aela_Level_6_Ranger.pdf`).
7. **Feedback** — UI surfaces success or error notifications, resetting loading state accordingly.

---

## 5. Dependencies & Tooling

- `pdf-lib` — core dependency for reading/modifying form fields. Imported lazily so it does not inflate the main bundle.
- Optional `file-saver` — parity with existing download flows; may fall back to native `URL.createObjectURL`.
- Dev script `scripts/listPdfFields.ts` — ensures field identifiers stay in sync with template updates.

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
  - Add “Export PDF” button to `CharacterSheetClean.tsx` with loading state.
  - Implement `handleExportClick` wiring calculator → transformer → filler → download.
  - Provide success/error messaging and dynamic filename.
- **Milestone 3 – Testing**
  - Add Playwright spec `e2e/export.e2e.spec.ts` validating download and smoke-checking field values.
  - Consider unit tests for `transformCalculatedCharacterToPdfData` covering key sections.

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
4. **PDF Export** reads saved movement data and maps to form fields

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

**See**: `docs/plannedSpecs/CONVEX_MIGRATION_SPEC.md` for full authentication system details.

---

> Last updated: 2026-01-14 (Added authentication gating)
> Maintainer: @DC20Clean-Team
