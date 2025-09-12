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

### **Milestone 1: Backend API Endpoint**

**Goal:** Create a serverless API endpoint that accepts character data and returns a filled PDF.

*   **Issue M1.1: Implement PDF Export API Route**
    *   **Labels:** `backend`, `P0`
    *   **Tasks:**
        1.  Create a new API route file: `src/api/export/pdf.ts`.
        2.  This file will export a handler function (e.g., `POST`) that accepts a request with the character data.
        3.  Use `PdfExportDataSchema.parse(request.body)` to validate the incoming data.
        4.  On validation failure, return a `400 Bad Request` with a clear error message.

*   **Issue M1.2: Create the Field Map**
    *   **Labels:** `backend`, `P0`
    *   **Tasks:**
        1.  Create `src/lib/pdf/fieldMap.ts`.
        2.  Implement a mapping object, `const fieldMap: Record<keyof PdfExportData, string> = { ... }`, which maps keys from our `PdfExportData` DTO to the actual PDF field names discovered in **M0.1**.
        3.  For checkboxes, the map should handle "on" values, e.g., `someCheckbox: { field: 'PDFCheckBoxField', onValue: 'Yes' }`.

*   **Issue M1.3: Develop PDF Filling Service**
    *   **Labels:** `backend`, `P0`
    *   **Tasks:**
        1.  Create a service file at `src/lib/services/pdfGenerator.ts`.
        2.  Implement an async function `fillPdf(data: PdfExportData): Promise<Uint8Array>`.
        3.  Inside this function:
            *   Load the template PDF from `src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`.
            *   Lazily import and use `pdf-lib` to get the form.
            *   Iterate over the `fieldMap`, using the validated `data` to populate the form fields (`textField.setText()`, `checkBox.check()`, etc.).
            *   Initially, **do not** flatten the form (`form.flatten()`).
            *   Return the generated PDF as a `Uint8Array`.
        4.  In the `src/api/export/pdf.ts` route, call this service and stream the resulting `Uint8Array` back to the client with the appropriate headers:
            *   `Content-Type: application/pdf`
            *   `Content-Disposition: attachment; filename="character_sheet.pdf"`
            *   `Cache-Control: no-store`

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
            *   POST this `PdfExportData` object to the `/api/export/pdf` endpoint.
            *   Receive the PDF blob from the API.
            *   Use a utility like `file-saver` or a simple `URL.createObjectURL` link to trigger the download in the browser.
            *   Generate a dynamic, clean filename, e.g., `CharacterName_Level_Class.pdf`.
            *   Display a success or error notification to the user.

---

### **Milestone 3: Testing and Quality Assurance**

**Goal:** Ensure the export feature is reliable and doesn't break with future changes.

*   **Issue M3.1: Create an E2E Golden Test**
    *   **Labels:** `test`, `P1`
    *   **Tasks:**
        1.  Create a new test file: `e2e/export.e2e.spec.ts`.
        2.  Use an existing test character file (e.g., `e2e/test-character-rich.json`) as the input fixture.
        3.  The test will:
            *   Programmatically POST the fixture data to the `/api/export/pdf` endpoint.
            *   Receive the resulting PDF buffer.
            *   Use `pdf-lib` again within the test to load the *output* PDF.
            *   Read the values from the form fields and assert that they match the expected values from the input fixture.
        4.  This test will act as a "golden fixture" test, failing CI if a code change (e.g., in the calculator) or a field map change breaks the output.

---

### **Milestone 4: Polish & Enhancements (Post-MVP)**

**Goal:** Add user-friendly features and improve robustness.

*   **Issue M4.1: Add "Flattened PDF" Option**
    *   **Labels:** `backend`, `frontend`, `P1`
    *   **Tasks:**
        *   **Backend:** Update the `/api/export/pdf` endpoint to accept an optional query parameter, `?flatten=true`. If present, call `form.flatten()` in `pdfGenerator.ts` before saving.
        *   **Frontend:** Add a second button or a checkbox in the UI for "Export Flattened PDF (non-editable)".

*   **Issue M4.2: Add Basic Performance Monitoring**
    *   **Labels:** `perf`, `P2`
    *   **Tasks:**
        *   In the `/api/export/pdf` Vercel function, add simple logging to measure the duration of the PDF generation process to monitor for cold starts vs. warm execution times.
