## Human Cleric E2E Test Specification (Playwright)

### Purpose
Validate that a user can complete the Character Creation flow for a Human Cleric and that the UI interactions and budgets (ancestry, attributes) behave correctly and deterministically.

This document is written for both product and engineering audiences. It contains:
- User-facing intent and rationale for choices
- Exact technical selectors and stability strategies
- Expected outcomes at each step
- A machine-readable test plan

### Scope
- Covers the full Character Creation wizard from start to finish for: Class = Cleric, Ancestry = Human.
- Focuses on budgets, step validation, and stable selectors.
- Excludes deep spell/maneuver correctness beyond minimal valid selections necessary to progress.

### Preconditions
- Application can be launched at `/character-creation` (Playwright baseURL configured).
- No prior character data interferes with the run (clear localStorage at test start).
- UI exposes stable `data-testid` for attribute controls and uses accessible roles for navigation.

### Key System Concepts and Invariants
- Class selection precedes Ancestry in this flow.
- Ancestry points baseline: Human has 5 base ancestry points. Cleric selection contributes an additional 2 ancestry points. Total ancestry points = 7.
- Attribute baseline: Each attribute begins at -2. Increasing by +1 requires one click on the corresponding increase button.
- Attribute budget: Base pool at level 1 is 12 points. The Human trait “Attribute Increase” adds +1 to this pool for the next stage, making 13 total for this flow. Trait bonuses should not be charged as spent points; they should not reduce the pool available for base allocations.
- Cleric “Magic” domain adds +1 MP to the character (should be visible in resources at or after finalization).
- Human “Skill Expertise” grants +1 skill point and permits one chosen skill to exceed the default level 1 mastery cap (allow mastery 2 for one skill).

### Target Build: Human Cleric
1) Class: Cleric
   - Rationale: Ensures class bonus of +2 to Ancestry points applies early and domain choices shape later availability.
   - Expected Result: Ancestry points total becomes 7 (5 base + 2 class). “Next →” enabled after valid selection.

2) Cleric Domains (feature choice multi-select)
   - Choices: Ancestral, Magic
   - Rationale: These are representative, verify multi-select stability, and drive downstream options.
   - Expected Result: Both checkboxes can be checked deterministically without strict-mode violations. “Next →” enabled. Magic domain increases MP by +1 (assert at resources/summary step).

3) Ancestry: Human
   - Points to spend: 7 total (from Step 1).
   - Planned selections to consume the base Human point budget (examples; exact names must match UI labels):
     - Attribute Increase
     - Skill Expertise
     - Human Resolve
     - Undying
     - Then choose additional valid Human traits until Remaining: 0. Names may vary; the test should select any valid remaining options presented.
   - Rationale: Verifies the budget totals and that “Remaining: 0” can be reached with valid Human trait choices.
   - Expected Result: Ancestry points UI shows Remaining: 0. “Next →” enabled. Attribute Increase ensures next stage attribute points total is 13 (12 base +1). Skill Expertise grants +1 skill point and allows one skill to reach mastery 2 at level 1.

4) Attributes
   - Baseline: All attributes start at -2.
   - Planned target values:
     - Might: +2 (requires 4 clicks from -2)
     - Intelligence: +3 (requires 5 clicks from -2)
     - Agility: 0 (requires 2 clicks from -2)
     - Charisma: 0 (requires 2 clicks from -2)
   - Rationale: Ensures the attribute budget system decrements correctly and that trait bonuses are not double-counted against the spend pool.
   - Expected Result: Attribute points total is 13 (12 base +1 from Attribute Increase). After the allocations above (total 13 clicks), Attribute points UI shows Remaining: 0. Increase buttons become disabled when Remaining is 0. “Next →” enabled.

5) Background (skills, trades, languages)
   - Action: Make the minimal valid selections required to satisfy validation. Use the +1 skill point from Skill Expertise to allocate an additional skill, and elevate one chosen skill to mastery 2 (beyond the default level 1 cap) to validate the cap override.
   - Rationale: Progresses the wizard, minimal coupling to dynamic lists; verifies Skill Expertise effects are honored.
   - Expected Result: Available skill points reflect +1 from Skill Expertise. UI permits one skill to reach mastery 2 at level 1. “Next →” becomes enabled once valid; clicking proceeds to the next step.

6) Spells and Maneuvers
   - Action: Make minimal valid selections appropriate for a level 1 cleric with chosen domains.
   - Rationale: Sanity check that domain-driven availability appears and validation gates work.
   - Expected Result: Able to proceed/finish with valid selections. No strict-mode violations.

7) Finalization
   - Action: Reach summary/finish screen. Optionally verify persistence by checking presence of a saved character key in localStorage.
   - Expected Result: Flow completes successfully; no timeouts; navigation buttons only enabled when valid. Resources reflect MP increased by +1 due to Magic domain.

### Selector Strategy and Stability
- Navigation buttons: `getByRole('button', { name: 'Next →' })`
- Class selection: use robust role- or label-based locators specific to Cleric.
- Cleric domains: precise inputs to avoid strict-mode violations:
  - `input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]`
  - `input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]`
- Human traits (ancestry step): label-driven selection to be resilient to layout changes:
  - `getByLabel(/Attribute Increase|Skill Expertise|Human Resolve|Undying/i)`
  - Then select any two additional valid Human trait labels to consume remaining points.
- Budget checks: `getByText(/Remaining:\s*0/)` after completing spending at Ancestry and Attributes steps.
- Attributes: `getByTestId('<attributeId>-increase')` and `getByTestId('<attributeId>-decrease')`

### Flakiness Mitigation
- Always gate interactions with `expect(locator).toBeVisible()` / `toBeEnabled()` before clicking.
- Use specific locators to avoid strict-mode violations (ambiguity across multiple elements).
- Avoid text-only locators for generic labels (e.g., "Next"). Prefer role + accessible name.
- Clear localStorage at test start to eliminate residue.

### Observability
- Prefer running headed and/or with slowMo during debugging: `--headed --slow-mo=250`.
- Collect trace and video on failure for CI runs (Playwright config):
  - `use: { trace: 'retain-on-failure', video: 'retain-on-failure' }`.

### Non-goals
- Deep verification of domain-driven spell lists beyond confirming forward progress with minimal valid selections.
- Cross-browser visual diffs.

### Risks and Edge Cases
- Attribute budget miscalculation if trait bonuses are accidentally included as “spent”. The UI should consume only base allocations for the spend pool.
- Ambiguous locators causing strict-mode violations; use the precise selectors above.

---

### Machine-Readable Test Plan (YAML)

```yaml
test:
  id: human_cleric_e2e
  title: Human Cleric Character Creation
  entry: /character-creation
  prerequisites:
    - clear_local_storage: true
    - require_base_url: true
  steps:
    - id: select_class
      action: select
      target: class
      value: Cleric
      expect:
        - ancestry_points_total: 7  # 5 base + 2 class
        - next_enabled: true

    - id: choose_domains
      action: checkboxes
      target:
        - css: 'input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]'
        - css: 'input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]'
      expect:
        - next_enabled: true
        - mp_delta: +1  # Magic domain adds +1 MP

    - id: select_ancestry
      action: select
      target: ancestry
      value: Human
      choices:
        required_labels:
          - Attribute Increase
          - Skill Expertise
          - Human Resolve
          - Undying
        spend_all_points: true  # choose additional valid options until Remaining: 0
      expect:
        - ancestry_points_remaining: 0
        - attribute_points_total_next_stage: 13  # 12 base + 1 from Attribute Increase
        - available_skill_points_delta: +1  # from Skill Expertise
        - allow_one_skill_mastery_two: true
        - next_enabled: true

    - id: allocate_attributes
      action: clicks
      target:
        might_increase: 4
        intelligence_increase: 5
        agility_increase: 2
        charisma_increase: 2
      expect:
        - attribute_points_total: 13
        - attribute_points_remaining: 0
        - increase_disabled_when_remaining_zero: true
        - next_enabled: true

    - id: background_minimal_valid
      action: minimal_valid_selections
      target: background
      expect:
        - next_enabled: true

    - id: spells_maneuvers_minimal_valid
      action: minimal_valid_selections
      target: spells_maneuvers
      expect:
        - can_finish: true

    - id: finalize
      action: finish
      expect:
        - finished: true
        - local_storage_has_saved_character: optional
        - mp_delta_verified: +1

selectors:
  next_button: role=button[name="Next →"]
  domains:
    ancestral: css=input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]
    magic: css=input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]
  attributes:
    increase_button: testid=<attributeId>-increase
    decrease_button: testid=<attributeId>-decrease
  budgets:
    remaining: text=/Remaining:\s*0/

stability:
  - wait_visible_before_click: true
  - wait_enabled_before_click: true
  - headed_supported: true
  - slow_mo_supported: true
  - trace_on_failure: true
  - video_on_failure: true
```

---

### Implementation Notes (for the test file)
- File name suggestion: `e2e/human-cleric.e2e.spec.ts`.
- Use `test.describe` with title including “Human Cleric” so runs can be filtered with `--grep "Human Cleric"`.
- At test start, run `await page.addInitScript(() => localStorage.clear());` or use `page.evaluate` to clear localStorage before navigation.
- Use the selector strategy above to avoid ambiguity and flakiness.
- After each budgeted step (Ancestry and Attributes), assert `Remaining: 0` is visible before proceeding.

### Rationale Recap
- Choosing Cleric first ensures the class-derived ancestry bonus (+2) is included before the ancestry budget is spent, yielding 7 total ancestry points.
- Human trait selection is structured to consume the entire budget deterministically by selecting four known traits plus two additional valid choices.
- Attribute allocations use explicit click counts from the -2 baseline to reach target values and verify that “remaining” decrements correctly and disables further increases when exhausted.


