## E2E Test Details

The active Playwright suite runs each applicable scenario in desktop Chromium and mobile WebKit. Shared structural-edit scenarios use `e2e/test-character-current.json`, an authentic 0.10.5 character generated through the current creation flow. Legacy fixtures remain limited to explicit compatibility and upgrade tests.

| Spec | Scenario | Main assertions |
| --- | --- | --- |
| `01-import.e2e.spec.ts` | Import and open | Imports the current fixture and opens the exact saved character. |
| `02-resources.e2e.spec.ts` | Resource controls | Stamina, Rest, and HP decrement by exactly one through accessible controls. |
| `07-weapons.e2e.spec.ts` | Weapon lifecycle | Adds a catalog weapon, renders damage, and removes it. |
| `08-items.e2e.spec.ts` | Inventory lifecycle | Opens Inventory responsively, adds a catalog item, and removes it. |
| `09-spells.e2e.spec.ts` | Spell lifecycle | Opens Spells responsively, adds and filters a spell, then removes it when supported. |
| `10-maneuvers.e2e.spec.ts` | Maneuver lifecycle | Adds and removes a maneuver when the character supports maneuvers. |
| `11-currency.e2e.spec.ts` | Currency | Opens the Character panel and updates copper. |
| `12-exhaustion-info.e2e.spec.ts` | Exhaustion and feature details | Sets and clears Exhaustion 1, then opens a feature detail popup. |
| `13-character-upgrade.e2e.spec.ts` | Rules upgrades | Creates a current-rules copy for supported legacy data and blocks unsupported versions. |
| `14-character-creation-flow.e2e.spec.ts` | Creation and edit/resave | Validates the current step graph, completes a Human Barbarian, and persists an attribute reallocation. |
| `16-character-sheet-export.e2e.spec.ts` | Sheet exports | Downloads JSON and PDF, checks current version metadata, and reopens the same character. |
| `17-character-creation-final-actions.e2e.spec.ts` | Completion actions | Verifies autosave-before-PDF and Finish and Go to Sheet. |
| `19-resource-value-layout.e2e.spec.ts` | Resource layout | Verifies ordered value controls on the primary and alternative sheets. |
| `20-alternative-weapon-picker.e2e.spec.ts` | Alternative weapon picker | Adds a populated weapon and verifies narrow-screen reflow. |
| `agentic/agentic-character-creation.e2e.spec.ts` | Canonical recipes | Compares saved 0.10.5 records with calculator-backed oracles. |
| `human-cleric.e2e.spec.ts` | Human Cleric | Completes the current spell-only flow and validates the saved record. |
| `hunter-beastborn.e2e.spec.ts` | Beastborn Hunter | Validates trait effects, movement, natural weapon, features, and both sheet views. |
| `spellblade-hybrid.e2e.spec.ts` | Spellblade hybrid | Validates both spell and maneuver budgets and persistence. |

Responsive tests use `openSheetTab()` to select desktop tabs, mobile bottom tabs, or the mobile More drawer without changing the configured viewport.
