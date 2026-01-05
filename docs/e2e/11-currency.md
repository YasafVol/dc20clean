# 11 - currency update

Purpose

- Ensure the currency input(s) exist and accept numeric input (e.g., copper/platinum values). Lightweight verification of currency UI.

Preconditions

- Fixture imported; currency UI present for the character.

Test steps

1. Locate currency input using `[data-testid="currency-cp"]` or input placeholder `cp`.
2. Fill the input with `50`.
3. Take a screenshot (if E2E_SCREENSHOTS=1).

Selectors used

- `[data-testid="currency-cp"]`, `input[placeholder="cp"]`

Validations / Assertions

- Currently the test fills the input but does not assert value; success is implied by no errors and screenshot creation.

Recommendations

- Add an explicit assertion such as `await expect(currencyInput).toHaveValue('50')` to ensure the UI reflects the change.
