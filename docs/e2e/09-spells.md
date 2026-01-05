# 09 - spells add filter delete

Purpose

- Test adding spells (desktop and mobile flows), filtering spell lists, and deleting spells when possible.

Preconditions

- Fixture imported; spells UI exists (may vary by layout: row-based selects, legacy single select, or input-based add flows).

Test steps

1. Click Add Spell (tries `[data-testid="add-spell"]`, mobile fallback, role/button fallbacks).
2. Determine the available UI flow:
   - If `select[data-testid^="spell-name-"]` exists (row-based), pick the first real option (nth(1)).
   - Else if legacy single select `[data-testid="spell-name"]` exists, pick its first option.
   - Else find an input and type `Test Spell` into it.
3. Click Save Spell (if present) — short timeout, tolerant.
4. Assert the added spell appears: prefer checking row-select value, else row text or visible element containing the spell name.
5. Locate filter input `[data-testid="spell-filter"]` (if present), type the spell name, wait, and confirm the filtered results.
6. If a delete control is available (button:has-text("Delete"), title=Delete Spell, or `[data-testid^="remove-spell-"]`) click it to delete the spell.

Selectors used

- `[data-testid="add-spell"]`, `[data-testid="add-spell-mobile"]`, `select[data-testid^="spell-name-"]`, `[data-testid="spell-name"]`, `input[placeholder="Name"]`, `[data-testid="spell-filter"]`, `button:has-text("Delete")`, `[data-testid^="remove-spell-"]`

Validations / Assertions

- Confirms the spell appears in the UI via either select value, row text, or visible element.
- If filter exists, asserts the filter narrows to the expected item.

Edge cases

- There are many layout variants; the test contains fallbacks to survive them. It avoids matching `<option>` elements directly where possible.

Recommendations

- Prefer adding `data-testid` to the row container (e.g., `data-testid="spell-row-<id>"`) and row remove controls to make assertions simpler and avoid false positives.
