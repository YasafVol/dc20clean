# DC20Clean - Testing System

> Purpose: Central testing policy for source audits, rules data, calculator behavior, UI components, and Playwright E2E flows.
> Owns: Test-layer policy, test placement, validation commands, E2E standards, agentic QA conventions, and repository-wide quality gates.
> Does not own: Subsystem behavior, business acceptance semantics, source rules content, or feature-specific ownership boundaries.
> Authoritative source: `package.json`, `vitest.config.ts`, `playwright.config.ts`, `.github/workflows/`, `scripts/`, `e2e/`, and colocated test files.
> Related systems: Every behavior-specific system doc defines what must be proven; this document defines where and how to prove it.
> Status: Active
> Last Updated: 2026-09-20

---

## 1. Test Layers

| Layer                    | Tooling                   | Location                                            | Purpose                                                                                  |
| ------------------------ | ------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Source audits            | Node scripts              | `scripts/*/dc20-0105-*.mjs`, `scripts/classes/*.ts` | Compare runtime rules data to the v0.10.5 source artifact and generated reports          |
| Rules data tests         | Vitest                    | `src/lib/rulesdata/**/*.test.ts`, `*.spec.ts`       | Validate schemas, IDs, source drift, generated catalogs, and feature references          |
| Calculator tests         | Vitest                    | `src/lib/services/**/*.test.ts`, `*.spec.ts`        | Validate exact mechanical outcomes from selected effects and character inputs            |
| UI logic/component tests | Vitest + Testing Library  | `src/routes/**/*.test.tsx`, `*.logic.test.ts`       | Validate local UI state, reducers, step gating, and component rendering                  |
| Convex domain tests      | Vitest + `convex-test`    | `convex/**/*.test.ts`                               | Validate authenticated backend lifecycles against isolated in-memory Convex state        |
| Acceptance features      | Gherkin                   | `e2e/features/*.feature`                            | Define readable cross-surface lifecycle contracts mapped to executable lower-layer tests |
| E2E tests                | Playwright                | `e2e/*.e2e.spec.ts`                                 | Validate representative user journeys, persistence, import/export, and sheet surfaces    |
| Agentic browser QA       | Playwright + repo scripts | `e2e/agentic/*`, `scripts/e2e/*`                    | Run declarative character recipes, collect artifacts, and compare results to oracles     |

Use the lowest layer that can prove the behavior. Do not move combinatorial rules math into E2E when a deterministic calculator test can prove it faster and with better failure messages.

---

## 2. Commands

Primary gates:

```bash
npm run test:unit -- --project server --run <focused files>
npm run test:unit -- --project convex --run <focused Convex files>
npm run test:e2e -- --project=desktop <focused e2e spec>
git diff --check
```

System audit gates:

```bash
npm run spells:validate:0105
npm run martials:validate:0105
npm run ancestries:validate:0105
npm run background:validate:0105
npm run background:names:validate:0105
npm run background:traits:validate:0105
npm run conditions:validate:0105
npm run classes:validate:0105
npm run classes:effects:validate
npm run classes:audit:validate
npm run leveling:review:validate:0105
```

Full local gates:

```bash
npm run test:unit -- --run
npm run test:e2e
```

All general E2E commands use `e2e/test-character-current.json`, currently a
canonical `dc20-0.10.5` character generated through the live creation flow.
`E2E_FIXTURE` may override it only for a deliberate compatibility investigation;
committed legacy-version coverage must construct or name its fixture inside the
explicit upgrade or compatibility spec.

Vitest uses `client` (browser), `server` (Node), and `convex` (Edge runtime) projects. Tests that stub `import.meta.env` or process-backed environment state must stay in the server project and be excluded from the browser project. Convex function tests use `convex-test` and authenticate with `t.withIdentity`.

Agentic browser QA gates:

```bash
npm run e2e:agentic:smoke
npm run e2e:agentic
npm run e2e:agentic:generate
npm run e2e:agentic:summarize
```

Known environment note: browser/E2E failures can be environment-driven when Playwright browsers are missing. For rules migration slices, focused server tests plus source-audit validators are the stronger first signal.

Responsive UI changes must verify the shared boundary pairs rather than arbitrary device names:

1. Compact/tablet: 767px and 768px.
2. Tablet/desktop: 1199px and 1200px.
3. Include at least one narrow phone width, currently 390px, and assert `document.documentElement.scrollWidth <= window.innerWidth`.
4. Prefer component-width assertions and visible controls over screenshot-only checks.

---

## 3. Coverage Contract

For any rules behavior change, add or verify coverage in this order:

1. Source audit: generated report is current when source-derived data changes.
2. Rules data test: schema, IDs, and references are valid.
3. Calculator test: exact mechanical result is asserted from a minimal character.
4. UI/component test: required display or interaction state is asserted without a full browser flow.
5. E2E test: only when the behavior must prove wizard flow, persistence, import/load, sheet visibility, or cross-page behavior.

E2E should test user-facing acceptance cases, not every rule permutation.

Agentic browser QA is the escalation layer for broad permutation coverage. It
should generate and execute bounded recipes, not replace lower-level source,
rules-data, or calculator tests.

### 3.1 Cross-Surface Lifecycle Features

For a lifecycle that spans UI presentations, backend records, permissions, and subscriptions:

1. Write the complete readable contract in `e2e/features/*.feature`.
2. Back deterministic domain behavior with executable tests at the lowest sufficient layer.
3. Keep scenario names aligned between the feature and executable tests.
4. Add focused component or Playwright coverage for routing and presentation-specific wiring.
5. Do not count a `.feature` file alone as regression protection.

Legacy resource-only compatibility is covered by the versioning classifier tests and
`CharacterSheetProvider.compatibility.test.tsx`. Coverage must prove both sides of the
boundary: the seven permitted live values persist without calculation, while attempted
inventory, notes, attacks, and non-permitted resource-state changes remain unchanged.
Shared Playwright fixtures for structural sheet editing must declare the current
`rulesVersion` and be generated through the current character-creation flow. Legacy
fixtures belong in explicit compatibility or upgrade scenarios and must not be relabeled.

### 3.2 Rules Acceptance Features

1. Use a readable Gherkin scenario when several progression sources combine into one expected character result.
2. Back the scenario with a focused rules-data or calculator test using the same named choices and exact totals.
3. `e2e/features/wizard-level-5-progression.feature` maps to `src/lib/services/dc20v0105ProgressionResources.test.ts`.

### 3.3 Alternative Character Sheet Integration TODO

Add a current-rules character-page suite that proves presentation and calculations stay
connected across the shared provider, calculator, and alternative sheet:

1. Magic context:
   1. a noncaster hides Mana, Mana Spend Limit, and Spells;
   2. an AP-only caster shows Spells without showing Mana or Mana Spend Limit;
   3. a Mana caster shows Mana, Mana Spend Limit, and Spells;
   4. the Meta Magic exemption appears only for a character that owns the canonical feature,
      including a multiclass grant.
2. Combat feature modes:
   1. Rage appears only for a character that owns the canonical feature;
   2. activating and deactivating Rage updates the shared condition state and survives the
      intended sheet-state lifecycle.
3. Derived combat results:
   1. active Rage applies the PD penalty and restores PD when deactivated;
   2. its damage bonus applies to Unarmed Strikes and melee weapons, but not ranged weapons;
   3. its Might Save ADV source is visible and participates in normal ADV/DisADV cancellation.

The focused `Spells.test.tsx` component coverage is complete for the alternative
picker no-blank-row, next-slot eligibility, full-catalog ordering, confirmation flow,
search, school filtering, and compact catalog-toolbar composition. It also proves the
alternative-only focused casting modal, MSL control guard, exact Mana deduction,
campaign callback, and close-on-confirm behavior. `spellCastSpend.test.ts` isolates
fixed, repeatable, variable, alternative-resource, and prerequisite cost calculation.
`e2e/22-alternative-spell-cast.e2e.spec.ts` completes the browser path through the
visible Mana card. `Attacks.test.tsx`
proves weapon search and melee/ranged filtering. Both source-switching pickers preserve
their active search and filter. It also proves the separate v0.10.5 five-panel
custom-weapon builder creates a populated attack with an embedded canonical snapshot,
exposes reskinned styles across weapon types, and returns to the unchanged picker state
when cancelled. It also proves contextual guidance moves with the active build-sheet
section instead of remaining visible across stages, and that damage type has its own
2.5 stage between style and properties. `Maneuvers.test.tsx` proves the
alternative picker creates complete catalog data without a blank row and excludes
already-known maneuvers, including name search and type filtering. `Inventory.test.tsx`
proves alternative inventory creation is mutation-free until confirmation, with
catalog search/type filtering, source-switch state preservation, quantity, equipped
state, and complete-row creation.
`AlternativeTabbedContent.test.tsx` proves the panel opts into the compact toolbar and
picker flows.

Shared in-play sheet actions use focused component and logic coverage:

1. `CampaignFeedAction.test.tsx` covers the authenticated/cloud gate, unread label,
   mark-seen action, and shared drawer opening.
2. `DiceRoller.test.tsx` proves an automatic roll uses the requested modifier and label
   rather than stale pre-render state.
3. `campaignEventFormat.test.ts` proves positive and negative signed-modifier expressions,
   including Advantage dice and final totals.
4. `longRest.test.ts` proves HP, MP, SP, Rest, Grit, temporary HP, and Exhaustion reset
   through the shared Long Rest helper used by both sheet presentations.

Equipage coverage proves that version-1 storage remains importable, version-2 storage
persists and duplicates General Equipment, general records produce no calculator effects,
the builder requires a name, and the inventory picker preserves the saved description,
cost, stable ID, and category.

`customWeapon.test.ts` and `equipmentValidator.test.ts` prove the v0.10.5 custom-weapon
point accounting, ranged Two-Handed removal cost, unrestricted style reskinning,
Multi-Faceted secondary-style requirement, and canonical snapshot construction.

Keep exact rule permutations in focused calculator and component tests. Use one representative
Playwright flow to prove character load, toggle wiring, visible results, and reload behavior.

---

## 4. Current E2E Inventory

| Spec                                                  | Coverage                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `e2e/01-import.e2e.spec.ts`                           | Imports a fixture and opens the character sheet                                                                                                                                                                                                        |
| `e2e/02-resources.e2e.spec.ts`                        | Resource controls                                                                                                                                                                                                                                      |
| `e2e/07-weapons.e2e.spec.ts`                          | Weapon add/update/remove                                                                                                                                                                                                                               |
| `e2e/08-items.e2e.spec.ts`                            | Item add/remove                                                                                                                                                                                                                                        |
| `e2e/09-spells.e2e.spec.ts`                           | Spell add/filter/delete                                                                                                                                                                                                                                |
| `e2e/10-maneuvers.e2e.spec.ts`                        | Maneuver add/delete when available                                                                                                                                                                                                                     |
| `e2e/11-currency.e2e.spec.ts`                         | Currency input                                                                                                                                                                                                                                         |
| `e2e/12-exhaustion-info.e2e.spec.ts`                  | Exhaustion state and feature-detail popup in desktop and mobile layouts                                                                                                                                                                                |
| `e2e/13-character-upgrade.e2e.spec.ts`                | Explicit old-rules upgrade flow                                                                                                                                                                                                                        |
| `e2e/14-character-creation-flow.e2e.spec.ts`          | Recipe-style character creation coverage: forward-jump gate, leveled hybrid eight-step discovery, level-1 Human Barbarian creation through Background/Maneuvers to sheet, and create → sheet → load/edit → attribute reallocation → resave persistence |
| `e2e/15-rulebook.e2e.spec.ts`                         | Rulebook TOC, article navigation, table rendering, search, and stable heading hashes                                                                                                                                                                   |
| `e2e/16-character-sheet-export.e2e.spec.ts`           | Imported character JSON/PDF downloads, stored-value metadata, PDF validity, and reopen-after-export                                                                                                                                                    |
| `e2e/17-character-creation-final-actions.e2e.spec.ts` | Final-step controls, autosave-before-PDF, current-rules filename/header, sheet navigation, and no-download finish path                                                                                                                                 |
| `e2e/18-load-character-ordering.e2e.spec.ts`          | Load-character newest-first ordering across timestamp fallbacks and immediate reordering after JSON import                                                                                                                                             |
| `e2e/19-resource-value-layout.e2e.spec.ts`            | Primary-sheet paired resource controls do not overlap; alternative-sheet resources retain the standard layout                                                                                                                                          |
| `e2e/20-alternative-weapon-picker.e2e.spec.ts`        | Alternative-sheet add-weapon modal, populated-row creation, shared weapon detail card, desktop split layout, compact stacked layout, and horizontal-overflow guard                                                                                     |
| `e2e/21-alternative-inventory-picker.e2e.spec.ts`     | Alternative-sheet add-inventory modal, search and filtering, populated-row creation, quantity and equipped setup, desktop split layout, compact stacked layout, and horizontal-overflow guard                                                          |
| `e2e/22-alternative-spell-cast.e2e.spec.ts`           | Alternative-sheet focused casting modal, Mana Spend Limit guard, enhancement declaration, and visible Mana deduction                                                                                                                                   |
| `e2e/23-alternative-long-rest.e2e.spec.ts`            | Alternative-sheet Long Rest restores spent Grit and persists the restored value across reload                                                                                                                                                          |
| `e2e/human-cleric.e2e.spec.ts`                        | Full Human Cleric creation; currently Magic + Ancestral domains                                                                                                                                                                                        |
| `e2e/hunter-beastborn.e2e.spec.ts`                    | Full Hunter/Beastborn flow                                                                                                                                                                                                                             |
| `e2e/spellblade-hybrid.e2e.spec.ts`                   | Spellblade hybrid flow                                                                                                                                                                                                                                 |

The files in `docs/e2e/` are descriptive snapshots, not the system source of truth. Keep this file authoritative for testing policy.

---

## 5. Character Sheet Export E2E

Recommended spec:

```text
e2e/16-character-sheet-export.e2e.spec.ts
```

Minimum acceptance cases:

1. Import or create a deterministic fixture character and open the character sheet.
2. Assert the sheet renders core identity and calculated values from persisted storage.
3. Export JSON from the sheet and verify the downloaded file is non-empty, parseable JSON with the expected `id`, `rulesVersion`, `schemaVersion`, selected options, `characterState`, and calculated final stats.
4. Export PDF from the sheet and verify the downloaded file is non-empty, has a `.pdf` filename containing the DC20 rules version, and starts with a PDF header.
5. Re-open the same saved character from the load-character flow and assert the sheet still renders after export actions.

Implementation notes:

1. Use Playwright downloads for JSON/PDF assertions.
2. Keep field-level PDF assertions in unit tests against `transformSavedCharacterToPdfData`; E2E only proves the user flow downloads a valid file.
3. Prefer fixture import for determinism unless the test specifically targets creation flow.

Status: implemented.

## 5.1 Creation Final-Actions E2E

Recommended spec:

```text
e2e/17-character-creation-final-actions.e2e.spec.ts
```

Minimum acceptance cases:

1. Complete a deterministic character through the wizard and assert the final step exposes:
   1. primary `Finish & Go to Sheet`;
   2. secondary `Print PDF` with `data-testid="creation-print-pdf"`;
   3. secondary inline name-generation action beside the character-name input.
2. Click `Print PDF` and verify:
   1. the character is autosaved before export;
   2. the downloaded file is a non-empty PDF with a DC20 rules-version filename;
   3. the app navigates to the saved character sheet.
3. Click `Finish & Go to Sheet` in a separate run and verify:
   1. no PDF download is triggered;
   2. the saved character sheet opens from the persisted character ID.

Status: implemented. Both creation paths reuse the canonical Human Barbarian wizard recipe from `e2e/support/humanBarbarian.ts`.

## 5.2 Load Character Ordering E2E

Recommended coverage:

1. Seed or import three deterministic saved characters with distinct `createdAt`, `completedAt`, and `lastModified` values.
2. Open load character and assert cards render newest first by:
   1. `lastModified`;
   2. fallback `completedAt`;
   3. fallback `createdAt`.
3. After importing or rules-upgrading a character, assert the refreshed list remains newest first without requiring page reload.

Status: implemented for initial load and JSON import. Rules-upgrade list refresh remains covered by the upgrade flow rather than duplicated here.

---

## 6. Current Cleric Domain Coverage

Implemented unit coverage:

- Knowledge Domain: five Knowledge Trades can exceed the base level-1 cap through `INCREASE_TRADE_MASTERY_CAP`.
- Dark Domain: grants Darkvision 10 when no Darkvision exists.
- Dark Domain with existing Darkvision: increases range to 15.

Current E2E coverage:

- `e2e/human-cleric.e2e.spec.ts` covers Cleric creation with Magic + Ancestral domains, ancestry point increase, MP increase, spell selection, persistence, and basic sheet opening.

Missing E2E cases:

- Cleric Dark Domain with a darkvision ancestry should show `darkvision 15` on the sheet.
- Cleric Knowledge Domain should allow level-1 Knowledge Trades at rank 2 and persist that allocation.
- Cleric Divination should surface Flanked immunity once condition interactions have a sheet-visible section.
- Cleric Life/Death/Grave/Light/Order/Chaos/Trickery should surface collected granted abilities in the feature/ability UI.

Recommended next spec:

```text
e2e/14-cleric-domains.e2e.spec.ts
```

Minimum acceptance cases:

- Dragonborn Cleric selecting Dark Domain reaches the sheet and displays Darkvision 15.
- Cleric selecting Knowledge Domain can set Arcana/History/Nature/Occultism/Religion to rank 2 without validation blocking completion.

Status: implemented through the level-3 Cleric canonical agentic recipe. The recipe
selects Knowledge + Dark, combines Dark with Dragonborn Darkvision, asserts persisted
domain choices and Darkvision 15 through the calculator oracle, and now asserts
`Darkvision 15` on the sheet. Focused unit coverage remains authoritative for all five
Knowledge Trade cap elevations because one character cannot afford five simultaneous
rank-2 purchases at that level.

---

## 7. E2E Standards

- Prefer `data-testid` selectors for stable app-owned controls.
- For Userback/UI feedback changes, validate with `npm run build` and a raw HTML check that production output contains the documented `Userback.access_token` snippet plus `static.userback.io/widget/v1.js`; keep payload checks limited to compact metadata.
- Recipe-style E2E tests should be written as named user actions and visible assertions. They may use Playwright as the executor, but the test should read as a deterministic user journey rather than DOM plumbing.
- Add lightweight semantic hooks (`data-testid`, `data-step-id`, `aria-current`) for agent/browser discovery when the visible control is part of a cross-page flow.
- Assert explicit visible state or saved localStorage state after each meaningful action.
- Cross-page persistence E2E tests should attach targeted diagnostics on failure:
  current URL, relevant console/page errors, and a compact saved-character
  snapshot before/after the action under test.
- Avoid screenshot-only success criteria.
- Keep one spec focused on one user story.
- Do not use broad text selectors when the same string can appear in hidden options, flavor text, or unrelated cards.
- If a behavior is calculated but not visibly rendered, add a UI TODO or component test instead of pretending E2E covered it.

### 7.1 Rulebook Coverage

1. `src/routes/rulebook/rulebookData.test.ts`
   1. Validates generated manifest counts and unique IDs.
   2. Validates the public TOC filter, stable article routes, article neighbors, and search ranking.
2. `e2e/15-rulebook.e2e.spec.ts`
   1. Runs in both desktop and mobile projects.
   2. Opens the manifest-backed TOC and navigates to one lazy article chunk.
   3. Verifies GFM table rendering.
   4. Searches the deferred index and follows a stable heading hash.
3. `npm run rulebook:generate:0105`
   1. Is the source-to-artifact validation gate.
   2. Must report zero unresolved and zero ambiguous mappings.

---

## 8. Agentic Browser QA

Goal: let a local or cloud runner create characters through the real UI, collect
diagnostic artifacts, and compare the result against deterministic calculator
expectations.

This is an in-repo testing layer, not an external service.

### 8.1 Ownership

Implemented first-slice files:

1. `e2e/agentic/recipes/*.ts`
   1. Declarative character-creation recipes.
   2. Recipes specify intended choices by stable IDs, not visible copy.
   3. Recipes may include expected high-level assertions such as class, level,
      resources, known spells, known maneuvers, senses, defenses, and sheet/export
      visibility.
2. `e2e/agentic/support/recipeExecutor.ts`
   1. Executes recipes through Playwright as user-visible actions.
   2. Uses semantic hooks first and visible roles second.
3. `e2e/agentic/support/runLogger.ts`
   1. Captures console logs, page errors, failed requests, current URL,
      screenshots on failure, selected choices, saved character JSON, and
      downloaded JSON/PDF metadata when relevant.
   2. Writes artifacts under `test-results/agentic/<run-id>/`.
4. `e2e/agentic/support/oracles.ts`
   1. Calls app calculator/source data directly.
   2. Builds a persisted-data expectation report from the recipe and saved
      character.
   3. Compares deterministic calculator outputs and sheet-visible values.
5. `scripts/e2e/generateCharacterRecipes.ts`
   1. Generates bounded recipe sets from current rules data.
   2. Supports smoke, class-by-class, high-risk, and pairwise coverage modes.
6. `scripts/e2e/summarizeAgenticRuns.ts`
   1. Produces readable JSON/Markdown summaries from run artifacts.

Current inventory:

1. `e2e/agentic/recipes/spellbladeHybridSmoke.ts`
   1. Smoke recipe for a Spellblade/Human hybrid character.
   2. Covers conditional spell and maneuver steps.
   3. Pins selected spells and maneuvers by catalog ID.
   4. Defines the expected saved-character slice for identity, final stats,
      traits, skills, trades, languages, combat training, spells, and maneuvers.
2. `e2e/agentic/recipes/humanBarbarianCanonical.ts`
   1. Canonical level-1 Human Barbarian recipe based on the manual QA path.
   2. Covers Human ancestry spend, point-buy attributes, Background skill/trade/language budgets, Maneuver learning, saved-character oracle checks, and sheet opening.
   3. Mirrors the deterministic recipe in `e2e/14-character-creation-flow.e2e.spec.ts`.
3. `e2e/agentic/recipes/clericCanonical.ts`
   1. Canonical level-3 Cleric recipe.
   2. Covers class feature choices, subclass selection, talent selection,
      cross-path Martial investment, dual ancestry, ancestry calc traits,
      background conversions, Skill/Trade mastery cap exceptions, spells, and
      maneuvers.
   3. Asserts exact final stats, selected feature choices, selected talents,
      path allocations, Darkvision range, saved background selections, selected
      spells, selected maneuvers, and combat training.
4. `e2e/agentic/agentic-character-creation.e2e.spec.ts`
   1. Runs smoke recipes through Playwright.
   2. Captures saved character JSON and run artifacts.
   3. Writes `saved-expectation-report.json`.
   4. Opens the saved character sheet after oracle validation, or continues if
      completion already navigated directly to the sheet.
   5. Checks recipe-defined sheet-visible text.
5. `scripts/e2e/calculateAgenticOracle.ts`
   1. Runs under `vite-node`.
   2. Recalculates saved characters through `calculateCharacterWithBreakdowns`.
   3. Reports stat and selection mismatches.

Agentic gate policy:

1. Automated deterministic checks should stay cheap enough to run on every local change and PR: focused Vitest, focused deterministic Playwright specs, and `git diff --check`.
2. Agentic browser QA remains opt-in for ordinary PRs and is required for release
   candidates and changes to creation budgets, step gating, or cross-page persistence.
3. Candidate agentic triggers: nightly runs, release candidates, broad character-creation changes, rules-data migrations, Background/Class/Ancestry budget changes, and failures that only appear through full UI persistence.
4. Nightly/release runs retain artifacts for failed recipes; local focused runs retain
   only failure artifacts. Environment failures do not block a release until reproduced
   with the deterministic focused Playwright spec.

### 8.2 UI Agent Contract

The UI should expose stable, machine-readable hooks for creation, sheet, import,
export, and upgrade flows.

Required hook patterns:

1. Flow and step state:
   1. `data-flow-id`
   2. `data-step-id`
   3. `aria-current="step"`
   4. `aria-disabled`
2. Selectable options:
   1. `data-option-id`
   2. `data-class-id`
   3. `data-ancestry-id`
   4. `data-trait-id`
   5. `data-feature-id`
   6. `data-spell-id`
   7. `data-maneuver-id`
   8. `data-talent-id`
3. Inputs and controls:
   1. `data-field-id`
   2. `aria-invalid`
   3. `data-action-id`
4. Budgets and validation:
   1. `data-budget-id`
   2. `data-budget-remaining`
   3. `data-validation-code`

Visible text remains for humans. Agentic tests should prefer stable IDs and
accessibility state over visible prose.

### 8.3 Optional Dev/Test Snapshot

In dev/test only, the app may expose a read-only browser snapshot:

```ts
window.__DC20_AGENT_STATE__;
```

Suggested contents:

1. route
2. current flow ID
3. current step ID
4. completed step IDs
5. selected option IDs
6. budget summaries
7. calculator summary
8. validation errors with codes
9. available actions/options

The snapshot is diagnostic. Recipes must still execute through UI actions so the
flow remains user-realistic.

### 8.4 Oracle Rules

1. Expected rules math must come from app calculator/source-data code.
2. Expected UI visibility should come from recipe assertions.
3. Expected export data should compare against the saved character JSON and PDF
   transformer output, not against screenshots.
4. Do not use snapshots as a substitute for checking important derived values.

### 8.5 Failure Classification

Agentic runs should classify failures into:

1. selector or semantic-hook gap
2. UI flow regression
3. calculator mismatch
4. persistence mismatch
5. export mismatch
6. rules-data/catalog gap
7. environment/tooling failure

The first implementation should be self-diagnosing, not self-healing. A
self-healing layer may later propose patches or selector additions, but it must
not silently rewrite selectors, recipes, or expected values.

### 8.6 First Implementation Slice

Status: implemented.

1. `runLogger` captures browser logs, page errors, failed requests, screenshots on
   failure, saved character JSON, oracle output, and `run.json`.
2. Declarative recipe types live in `e2e/agentic/recipes/types.ts`.
3. Spellblade hybrid smoke recipe is the first converted full workflow.
4. Human Barbarian canonical recipe covers the manual Background-stage regression path.
5. Cleric level-3 canonical is the first broad mechanical recipe.
6. Artifact JSON is saved under `test-results/agentic/<run-id>/`.
7. `saved-expectation-report.json` compares recipe intent to persisted character
   data before calculator validation.
8. `oracle-report.json` compares saved character output against calculator
   outputs for core stats, resources, known spells, and known maneuvers.
9. Sheet assertions verify the saved character can be opened and key visible
   identity text appears.
10. `npm run e2e:agentic:smoke` runs the current agentic recipe set.

Next implementation slice:

Status: implemented for the diagnostic/generation boundary.

1. The creation UI exposes the required stable hooks used by current smoke recipes.
2. A read-only `window.__DC20_AGENT_STATE__` snapshot is available in development and
   webdriver sessions with route, step completion, selections, budgets, and validation.
3. `npm run e2e:agentic:generate -- --mode class-by-class` emits one curated-choice
   recipe descriptor per source-audited class.
4. JSON/PDF download assertions remain in deterministic `e2e/16` rather than duplicating
   a slow agentic flow.
5. Recipe `expectedSheet` assertions cover stable visible outputs, including Cleric
   Darkvision 15.

---

## 9. When To Add Tests

Add focused tests when changing:

- Effect schema or calculator effect handling.
- Source-generated data or audit scripts.
- Character creation step gating or validation.
- Character sheet display of calculated values.
- Persistence, version upgrade, import/export, or PDF output.
- Any rules behavior where a user can make a selection and expect derived values to change.
- Agentic browser recipes or UI agent hooks.

Do not modify existing tests just to make a failing test pass unless the expected behavior has been re-reviewed against source/system docs.
