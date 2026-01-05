# 02 - resources and notes

Purpose

- Exercise resource controls (Stamina, Mana, HP) and the Precision note UI when present. Validates both the ability to update numeric resources and the creation/display of notes connected to precision.

Preconditions

- App loaded and fixture imported via `e2e/helpers.ts`.
- Resource controls may be present or absent depending on fixture/class.

Test steps

1. Ensure `TEST_CHARACTER` is loaded (via `importFixture`).
2. Locate Stamina control using selectors: `[data-testid="stamina-label"], text=/stamina/i`.
3. From the label, find the numeric input (`input[type="number"]`) and fill with `2` if present.
4. Locate Mana control via `[data-testid="mana-label"], text=/mana/i` and fill with `3` if present.
5. Locate HP numeric input via `[data-testid="hp-input"], text=/hit points/i` and fill with `1` (throws if not found).
6. Attempt the Precision note flow (optional):
   - Find `[data-testid="precision-input"]`.
   - If found, fill the precision numeric input with `5`.
   - Click the Precision Note button (role/button name match `/precision note|add note/i`).
   - Fill the textarea with `Precision changed for testing` and click `Save Note`.
   - Assert the saved note text is visible.

Selectors used

- `[data-testid="stamina-label"]`, `[data-testid="mana-label"]`
- `[data-testid="hp-input"]` or text match `/hit points/i`
- `[data-testid="precision-input"]`, role=button[name~="precision note"|"add note"]
- textarea, role=button[name~="save note"]

Validations / Assertions

- HP numeric input must exist; test fails if it doesn't.
- If precision note path executed, assert the note's text is visible. Otherwise log and continue.

Optional / Notes

- Precision flow wrapped in try/catch to tolerate fixtures that do not expose this control.
- This test updates values but does not verify persisted state beyond note visibility; consider asserting the updated numeric values are reflected in UI inputs.

Recommendations

- Add `data-testid` attributes to precision note controls to make the flow more deterministic.
