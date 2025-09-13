### **Refined Action Plan: Character Sheet PDF Export**

This plan adapts the provided guide to your project's specific file structure, conventions, and existing logic. It prioritizes a robust, maintainable implementation that integrates smoothly with your current architecture.

---

### **Milestone 0: Foundation & Tooling**

**Goal:** Set up the basic structure, types, and tools required for the export feature.

*   **Issue M0.1: Create PDF Field List**
    *   **Labels:** `infra`, `P0`
    *   **Rationale:** The existing `src/lib/pdf/095/sheet.json` is a great starting point for the *data structure*, but we must confirm the actual field names embedded in the PDF to avoid mismatches.
    *   **Tasks:**
        1.  Create a script `scripts/listPdfFields.ts`.
        2.  Use the `pdf-lib` library to load `src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf` and iterate through `pdfDoc.getForm().getFields()` to print each field's name.
        3.  Commit the output to `docs/systems/pdf-form-fields-v0.9.5.json` for reference. This file will be a definitive guide for the field map.

*   **Issue M0.2: Define Export Data Transfer Object (DTO)**
    *   **Labels:** `backend`, `types`, `P0`
    *   **Rationale:** A strongly-typed DTO with validation is essential for a reliable API.
    *   **Tasks:**
        1.  Create `src/lib/types/pdfExport.ts`.
        2.  Define a TypeScript type `PdfExportData` based on the structure of `src/lib/pdf/095/sheet.json`.
        3.  Create a corresponding Zod schema, `PdfExportDataSchema`, in the same file to validate incoming API requests. This follows your existing pattern in `src/lib/rulesdata/schemas/`.

---

### **Milestone 1: Client-Side Export (No Server API)**

**Goal:** Fill and download the PDF entirely in the browser using `pdf-lib`. No server runtime required.

*   **Issue M1.1: Add dependency and lazy-load**
    *   **Labels:** `frontend`, `P0`
    *   **Tasks:**
        1.  Install `pdf-lib`.
        2.  Lazy import it inside the export flow to keep initial bundle small.
        3.  Optional: use `file-saver` (or `URL.createObjectURL`) for download.

*   **Issue M1.2: Field Map module**
    *   **Labels:** `frontend`, `P0`
    *   **Tasks:**
        1.  Create `src/lib/pdf/fieldMap.dc20-0.9.5.ts`.
        2.  Implement `const fieldMap: Record<string, string | { field: string; onValue?: string }>` mapping DTO paths to PDF field IDs (from M0.1).
        3.  Include checkbox on-values where required (e.g., `Yes`).

*   **Issue M1.3: PDF transformer and filler**
    *   **Labels:** `frontend`, `P0`
    *   **Tasks:**
        1.  Create `src/lib/pdf/transformers.ts` with `transformCalculatedCharacterToPdfData(result) => PdfExportData`.
        2.  Create `src/lib/pdf/fillPdf.ts` exporting `fillPdfFromData(data: PdfExportData, opts?: { flatten?: boolean }): Promise<Blob>`.
        3.  Import the template as a URL for Vite bundling (use relative path, no alias):
           - `import templateUrl from '../../lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf?url'`
           - `const templateArrayBuffer = await fetch(templateUrl).then(r => r.arrayBuffer())`
        4.  Use `PDFDocument.load(templateArrayBuffer)`, get form, set fields based on `fieldMap`, optionally `form.flatten()` if `opts.flatten`.
        5.  Return `new Blob([await pdfDoc.save()], { type: 'application/pdf' })`.

*   **Issue M1.4: Acceptance**
    *   **Labels:** `frontend`, `P0`
    *   **Checks:**
        - Clicking Export produces a valid, openable PDF in Preview/Adobe/Chrome.
        - Fields are editable by default; flattened variant removes field editability.
        - No server/API required.

---

### **Milestone 2: Frontend Integration**

**Goal:** Add a button to the character sheet UI that triggers the PDF export.

*   **Issue M2.1: Add "Export PDF" Button**
    *   **Labels:** `frontend`, `P0`
    *   **Tasks:**
        1.  Modify `src/routes/character-sheet/CharacterSheetClean.tsx` (the desktop view).
        2.  Find a suitable location in the UI, such as a header or action bar, and add an "Export PDF" button.
        3.  The button should be disabled and show a loading indicator while the export is in progress.

*   **Issue M2.2: Implement Client-side Export Logic**
    *   **Labels:** `frontend`, `P0`
    *   **Tasks:**
        1.  In `CharacterSheetClean.tsx`, create an `handleExportClick` function.
        2.  This function will:
            *   Gather all necessary character data from your `CharacterSheetProvider` context.
            *   Use `convertToEnhancedBuildData` and `calculateCharacterWithBreakdowns` from `src/lib/services/enhancedCharacterCalculator.ts` to get a complete, calculated character object.
            *   **Crucially, create a new utility function, `transformCalculatedCharacterToPdfData(character: EnhancedCalculationResult): PdfExportData`, to map the calculator's output to the `PdfExportData` DTO structure.** This is the primary transformation step.
            *   Lazy import the filler `fillPdfFromData`, fetch the template URL, and generate a Blob.
            *   Use `URL.createObjectURL` or `file-saver` to trigger the download.
            *   Generate a dynamic, clean filename, e.g., `CharacterName_Level_Class.pdf`.
            *   Display a success or error notification to the user.

---

### **Milestone 3: Testing and Quality Assurance**

**Goal:** Ensure the export feature is reliable and doesn't break with future changes.

*   **Issue M3.1: Create an E2E Golden Test**
    *   **Labels:** `test`, `P1`
    *   **Tasks:**
        1.  Create a new test file: `e2e/export.e2e.spec.ts`.
        2.  Use an existing test character fixture (e.g., `e2e/test-character-rich.json`).
        3.  The test will:
            *   Navigate to character sheet, click Export, wait for download.
            *   Assert filename hygiene and non-empty size.
            *   Optional: reopen the PDF with `pdf-lib` in the test, read a few fields, and assert values.
        4.  This test acts as a golden test guarding template drift and field map changes.

---

### **Milestone 4: Polish & Enhancements (Post-MVP)**

**Goal:** Add user-friendly features and improve robustness.

*   **Issue M4.1: Add "Flattened PDF" Option**
    *   **Labels:** `backend`, `frontend`, `P1`
    *   **Tasks:**
        *   **Frontend:** Add a second button or a checkbox in the UI for "Export Flattened PDF (non-editable)" which passes `{ flatten: true }` to the client filler.

*   **Issue M4.2: Add Basic Performance Monitoring**
    *   **Labels:** `perf`, `P2`
    *   **Tasks:**
        *   Log timings in the client flow (start→filled→saved) and ensure `pdf-lib` is lazy loaded.

---

### **Notes & Dev scripts**

- Add `pdf-lib` dependency.
- Keep the field-lister as a Node dev script:
  - `scripts/listPdfFields.ts` reads the template from `src/lib/pdf/095/*.pdf`, enumerates `getForm().getFields()`, and writes `docs/systems/pdf-form-fields-v0.9.5.json`.
- Import the PDF template in client using Vite’s `?url` suffix to avoid bundling the binary into JS.
