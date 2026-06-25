# DC20Clean - Testing System

> Purpose: Central testing policy for source audits, rules data, calculator behavior, UI components, and Playwright E2E flows.
> Status: Active
> Last Updated: 2026-06-25

---

## 1. Test Layers

| Layer                    | Tooling                   | Location                                            | Purpose                                                                               |
| ------------------------ | ------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Source audits            | Node scripts              | `scripts/*/dc20-0105-*.mjs`, `scripts/classes/*.ts` | Compare runtime rules data to the v0.10.5 source artifact and generated reports       |
| Rules data tests         | Vitest                    | `src/lib/rulesdata/**/*.test.ts`, `*.spec.ts`       | Validate schemas, IDs, source drift, generated catalogs, and feature references       |
| Calculator tests         | Vitest                    | `src/lib/services/**/*.test.ts`, `*.spec.ts`        | Validate exact mechanical outcomes from selected effects and character inputs         |
| UI logic/component tests | Vitest + Testing Library  | `src/routes/**/*.test.tsx`, `*.logic.test.ts`       | Validate local UI state, reducers, step gating, and component rendering               |
| E2E tests                | Playwright                | `e2e/*.e2e.spec.ts`                                 | Validate representative user journeys, persistence, import/export, and sheet surfaces |
| Agentic browser QA       | Playwright + repo scripts | `e2e/agentic/*`, `scripts/e2e/*`                    | Run declarative character recipes, collect artifacts, and compare results to oracles  |

Use the lowest layer that can prove the behavior. Do not move combinatorial rules math into E2E when a deterministic calculator test can prove it faster and with better failure messages.

---

## 2. Commands

Primary gates:

```bash
npm run test:unit -- --project server --run <focused files>
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

Vitest uses separate `client` (browser) and `server` (Node) projects. Tests that
stub `import.meta.env` or process-backed environment state must stay in the
server project and be excluded from the browser project.

Agentic browser QA gates:

```bash
npm run e2e:agentic:smoke
npm run e2e:agentic
npm run e2e:agentic:generate
npm run e2e:agentic:summarize
```

Known environment note: browser/E2E failures can be environment-driven when Playwright browsers are missing. For rules migration slices, focused server tests plus source-audit validators are the stronger first signal.

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

---

## 4. Current E2E Inventory

| Spec                                         | Coverage                                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `e2e/01-import.e2e.spec.ts`                  | Imports a fixture and opens the character sheet                                                           |
| `e2e/02-resources.e2e.spec.ts`               | Resource controls and notes                                                                               |
| `e2e/07-weapons.e2e.spec.ts`                 | Weapon add/update/remove                                                                                  |
| `e2e/08-items.e2e.spec.ts`                   | Item add/remove                                                                                           |
| `e2e/09-spells.e2e.spec.ts`                  | Spell add/filter/delete                                                                                   |
| `e2e/10-maneuvers.e2e.spec.ts`               | Maneuver add/delete when available                                                                        |
| `e2e/11-currency.e2e.spec.ts`                | Currency input                                                                                            |
| `e2e/12-exhaustion-info.e2e.spec.ts`         | Exhaustion and feature info buttons                                                                       |
| `e2e/13-character-upgrade.e2e.spec.ts`       | Explicit old-rules upgrade flow                                                                           |
| `e2e/14-character-creation-flow.e2e.spec.ts` | Recipe-style character creation shell coverage: forward-jump gate and leveled hybrid eight-step discovery |
| `e2e/human-cleric.e2e.spec.ts`               | Full Human Cleric creation; currently Magic + Ancestral domains                                           |
| `e2e/hunter-beastborn.e2e.spec.ts`           | Full Hunter/Beastborn flow                                                                                |
| `e2e/spellblade-hybrid.e2e.spec.ts`          | Spellblade hybrid flow                                                                                    |

The files in `docs/e2e/` are descriptive snapshots, not the system source of truth. Keep this file authoritative for testing policy.

---

## 5. Planned Character Sheet Export E2E

Recommended spec:

```text
e2e/15-character-sheet-export.e2e.spec.ts
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

---

## 7. E2E Standards

- Prefer `data-testid` selectors for stable app-owned controls.
- Recipe-style E2E tests should be written as named user actions and visible assertions. They may use Playwright as the executor, but the test should read as a deterministic user journey rather than DOM plumbing.
- Add lightweight semantic hooks (`data-testid`, `data-step-id`, `aria-current`) for agent/browser discovery when the visible control is part of a cross-page flow.
- Assert explicit visible state or saved localStorage state after each meaningful action.
- Avoid screenshot-only success criteria.
- Keep one spec focused on one user story.
- Do not use broad text selectors when the same string can appear in hidden options, flavor text, or unrelated cards.
- If a behavior is calculated but not visibly rendered, add a UI TODO or component test instead of pretending E2E covered it.

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
2. `e2e/agentic/recipes/clericCanonical.ts`
   1. Canonical level-3 Cleric recipe.
   2. Covers class feature choices, subclass selection, talent selection,
      cross-path Martial investment, dual ancestry, ancestry calc traits,
      background conversions, Skill/Trade mastery cap exceptions, spells, and
      maneuvers.
   3. Asserts exact final stats, selected feature choices, selected talents,
      path allocations, Darkvision range, saved background selections, selected
      spells, selected maneuvers, and combat training.
3. `e2e/agentic/agentic-character-creation.e2e.spec.ts`
   1. Runs smoke recipes through Playwright.
   2. Captures saved character JSON and run artifacts.
   3. Writes `saved-expectation-report.json`.
   4. Opens the saved character sheet after oracle validation.
   5. Checks recipe-defined sheet-visible text.
4. `scripts/e2e/calculateAgenticOracle.ts`
   1. Runs under `vite-node`.
   2. Recalculates saved characters through `calculateCharacterWithBreakdowns`.
   3. Reports stat and selection mismatches.

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
4. Cleric level-3 canonical is the first broad mechanical recipe.
5. Artifact JSON is saved under `test-results/agentic/<run-id>/`.
6. `saved-expectation-report.json` compares recipe intent to persisted character
   data before calculator validation.
7. `oracle-report.json` compares saved character output against calculator
   outputs for core stats, resources, known spells, and known maneuvers.
8. Sheet assertions verify the saved character can be opened and key visible
   identity text appears.
9. `npm run e2e:agentic:smoke` runs the current agentic recipe set.

Next implementation slice:

1. Add missing UI hooks discovered by smoke runs.
2. Add the optional read-only `window.__DC20_AGENT_STATE__` in dev/test.
3. Add class-by-class recipe generation.
4. Add JSON/PDF export assertions to an agentic sheet recipe.
5. Expand oracle comparison to sheet-visible values once stable sheet hooks exist.

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
