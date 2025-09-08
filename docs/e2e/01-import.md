# 01 - import fixture and open sheet

Purpose
- Verify the application can import a character fixture (JSON) and open the generated character sheet.

Preconditions
- App running at `/`.
- `e2e/helpers.ts` provides `TEST_CHARACTER` (by default `e2e/test-character-gibble.json`).

Test steps
1. Open `/`.
2. Click button with role/name `Load Character`.
3. Click button with role/name `Import from JSON`.
4. Wait for a textarea or text input to appear.
5. Fill the first textarea/input with `JSON.stringify(TEST_CHARACTER)`.
6. Click button `Import Character`.
7. Click `View Sheet` button (first occurrence).
8. Wait for network idle and stabilize.

Selectors used
- role=button[name="Load Character"]
- role=button[name="Import from JSON"]
- textarea, input[type="text"] (first match)
- role=button[name="Import Character"]
- role=button[name~="View Sheet"] (first)
- page.getByText(new RegExp(TEST_CHARACTER.finalName, 'i'))

Validations / Assertions
- Assert that a header/text matching `TEST_CHARACTER.finalName` is visible within 15s.

Optional / Notes
- Screenshots are taken only if `E2E_SCREENSHOTS==='1'` to avoid noisy I/O.
- Failure modes: import textarea not found, JSON invalid, import button missing — tests will throw if the textarea is absent.

Recommendations
- Ensure `TEST_CHARACTER.finalName` is unique per fixture to avoid accidental matches.
