# 10 - maneuvers add and delete

Purpose
- Add and delete maneuvers when the class/fixture supports them. Skip if the maneuvers section is absent or already contains the expected maneuver.

Preconditions
- Fixture may or may not include the Maneuvers section (test treats missing as pass).

Test steps
1. Check for a Maneuvers heading via role=heading[name=/maneuvers/i]. If missing, take a screenshot and return (test considered passed).
2. If `Test Maneuver` (or `Test Man`) is already present in the sheet, take a screenshot and return (add flow skipped).
3. Otherwise click Add Maneuver (`[data-testid="add-maneuver"]` or role fallbacks).
4. Fill maneuver name input (`[data-testid="maneuver-name"]`) with `Test Man` and click Save Maneuver.
5. Assert that `Test Man` is visible in the page.
6. If a Delete/Remove control exists, click it to remove the maneuver and screenshot.

Selectors used
- role=heading[name=/maneuvers/i]
- `[data-testid="add-maneuver"]`, `[data-testid="maneuver-name"]`, role=button[name=/delete maneuver/i]

Validations / Assertions
- If added, assert the maneuver text is visible post-save.
- If section is absent, test is treated as pass.

Recommendations
- Add a per-row testid like `data-testid="maneuver-row-<id>"` to make adds/removals exact and avoid ambiguity.
