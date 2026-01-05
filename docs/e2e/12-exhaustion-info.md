# 12 - exhaustion and info buttons

Purpose

- Validate exhaustion UI can be opened and that nearby info buttons (often single-letter 'i') can be located and clicked; optionally open feature info popups.

Preconditions

- Fixture imported; exhaustion UI may be present depending on fixture.

Test steps

1. Wait for exhaustion control via `[data-testid="exhaustion-btn"], [data-testid^="exhaustion-"]` or text match `exhaustion`.
2. Click the exhaustion control to open exhaustion UI.
3. Attempt to locate small info buttons:
   - Prefer buttons next to the exhaustion title.
   - Else search for role=button name `/^i$/i` and pick the one close to the exhaustion heading via bounding box checks.
   - Else use fallback selectors (`[data-testid="info-btn"]`, aria-label containing `info`).
4. Click the chosen info button and take screenshot.
5. Try to locate feature info button via `[data-testid="feat-info"], role=button[name=/feature info|trait info|info/i]` and click if present; otherwise skip.

Selectors used

- `[data-testid="exhaustion-btn"]`, `[data-testid^="exhaustion-"]`, role=button[name=/^i$/i], `[data-testid="feat-info"]`

Validations / Assertions

- Assert exhaustion text visible after opening.
- Feature info click is optional and skipped if missing.

Edge cases

- Many info buttons are single-letter controls; the test tries to disambiguate by proximity to relevant headings. This is brittle — prefer explicit `data-testid`s in the UI.

Recommendations

- Add `data-testid` for info buttons associated with specific sections (e.g., `data-testid="feat-info-<id>"`) to remove bounding-box heuristics.
