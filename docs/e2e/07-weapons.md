# 07 - weapons add update remove

Purpose

- Validate add/update/remove flows for weapons on the character sheet and ensure damage/population logic is triggered when choosing a weapon option.

Preconditions

- Fixture imported and sheet opened.
- The UI contains an Add Weapon control and a weapon selection mechanism.

Test steps

1. Click Add Weapon (`[data-testid="add-weapon"]`).
2. Locate weapon select (`[data-testid="weapon-name"]`) and select option `Short Sword`.
3. Wait for the select to have value `Short Sword`.
4. Locate damage cell (`[data-testid="weapon-damage"]`) and assert it is not `-` (placeholder for missing data).
5. Locate Remove Weapon button (role=button with /remove weapon/i) and click.
6. Assert that the empty-state message 'No weapons added. Click "Add Weapon" to add your first weapon.' is visible.

Selectors used

- `[data-testid="add-weapon"]`
- `[data-testid="weapon-name"]`
- `[data-testid="weapon-damage"]`
- role=button[name=/remove weapon/i]

Validations / Assertions

- weapon select has expected value after selection.
- damage cell reflects populated damage (not placeholder).
- removal returns the UI to an expected empty state message.

Edge cases

- The test assumes option `Short Sword` exists; if the weapon list is dynamic, consider selecting the first non-empty option instead.

Recommendations

- Keep `data-testid` attributes on weapon-related inputs; consider asserting the saved weapon object in localStorage or backend mock for stronger verification.
