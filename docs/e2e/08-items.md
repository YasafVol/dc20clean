# 08 - items add and remove

Purpose
- Verify adding an inventory item via the UI (type → name select) and removing it.

Preconditions
- Fixture imported; item UI is present for the character/class.

Test steps
1. Click Add Item (selectors: `[data-testid="add-item"]`, role fallbacks).
2. If present, pick an Item Type (e.g., `Adventuring Supply`) to populate item name options.
3. Locate Item Name select `[data-testid="item-name"]` and choose the first non-empty option (option index 1).
4. Assert the select's value matches the chosen option value.
5. Click Remove Item (role=button name=/remove item/i) and assert item removal (via optional screenshot/log).

Selectors used
- `[data-testid="add-item"]`, `select[aria-label="Item Type"]`, `[data-testid="item-name"]`
- role=button[name=/remove item/i]

Validations / Assertions
- Ensures a non-empty option exists in item-name select and that it becomes selected.

Edge cases
- If no item-name options are available the test throws an error.

Recommendations
- Add a visible item-row testid like `data-testid="item-row-<id>"` after adding to assert presence and then deletion more robustly.
