# DC20Clean - Testing System

> Purpose: Central testing policy for source audits, rules data, calculator behavior, UI components, and Playwright E2E flows.
> Status: Active
> Last Updated: 2026-06-24

---

## 1. Test Layers

| Layer                    | Tooling                  | Location                                            | Purpose                                                                               |
| ------------------------ | ------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Source audits            | Node scripts             | `scripts/*/dc20-0105-*.mjs`, `scripts/classes/*.ts` | Compare runtime rules data to the v0.10.5 source artifact and generated reports       |
| Rules data tests         | Vitest                   | `src/lib/rulesdata/**/*.test.ts`, `*.spec.ts`       | Validate schemas, IDs, source drift, generated catalogs, and feature references       |
| Calculator tests         | Vitest                   | `src/lib/services/**/*.test.ts`, `*.spec.ts`        | Validate exact mechanical outcomes from selected effects and character inputs         |
| UI logic/component tests | Vitest + Testing Library | `src/routes/**/*.test.tsx`, `*.logic.test.ts`       | Validate local UI state, reducers, step gating, and component rendering               |
| E2E tests                | Playwright               | `e2e/*.e2e.spec.ts`                                 | Validate representative user journeys, persistence, import/export, and sheet surfaces |

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

---

## 4. Current E2E Inventory

| Spec                                   | Coverage                                                        |
| -------------------------------------- | --------------------------------------------------------------- |
| `e2e/01-import.e2e.spec.ts`            | Imports a fixture and opens the character sheet                 |
| `e2e/02-resources.e2e.spec.ts`         | Resource controls and notes                                     |
| `e2e/07-weapons.e2e.spec.ts`           | Weapon add/update/remove                                        |
| `e2e/08-items.e2e.spec.ts`             | Item add/remove                                                 |
| `e2e/09-spells.e2e.spec.ts`            | Spell add/filter/delete                                         |
| `e2e/10-maneuvers.e2e.spec.ts`         | Maneuver add/delete when available                              |
| `e2e/11-currency.e2e.spec.ts`          | Currency input                                                  |
| `e2e/12-exhaustion-info.e2e.spec.ts`   | Exhaustion and feature info buttons                             |
| `e2e/13-character-upgrade.e2e.spec.ts` | Explicit old-rules upgrade flow                                 |
| `e2e/human-cleric.e2e.spec.ts`         | Full Human Cleric creation; currently Magic + Ancestral domains |
| `e2e/hunter-beastborn.e2e.spec.ts`     | Full Hunter/Beastborn flow                                      |
| `e2e/spellblade-hybrid.e2e.spec.ts`    | Spellblade hybrid flow                                          |

The files in `docs/e2e/` are descriptive snapshots, not the system source of truth. Keep this file authoritative for testing policy.

---

## 5. Current Cleric Domain Coverage

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

## 6. E2E Standards

- Prefer `data-testid` selectors for stable app-owned controls.
- Assert explicit visible state or saved localStorage state after each meaningful action.
- Avoid screenshot-only success criteria.
- Keep one spec focused on one user story.
- Do not use broad text selectors when the same string can appear in hidden options, flavor text, or unrelated cards.
- If a behavior is calculated but not visibly rendered, add a UI TODO or component test instead of pretending E2E covered it.

---

## 7. When To Add Tests

Add focused tests when changing:

- Effect schema or calculator effect handling.
- Source-generated data or audit scripts.
- Character creation step gating or validation.
- Character sheet display of calculated values.
- Persistence, version upgrade, import/export, or PDF output.
- Any rules behavior where a user can make a selection and expect derived values to change.

Do not modify existing tests just to make a failing test pass unless the expected behavior has been re-reviewed against source/system docs.
