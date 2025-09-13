 # DC20Clean – Martials System (Maneuvers, Techniques, Stances)

 > Purpose
 > Central reference for martial abilities data, selection limits, prerequisites, and UI wiring.

 ---

 ## 1. Key Files & Roles

 - `src/lib/rulesdata/martials/maneuvers.ts`
 - `src/lib/rulesdata/martials/techniques.ts`
 - `src/lib/rulesdata/martials/monk-stances.ts`
 - `src/lib/services/enhancedCharacterCalculator.ts` — aggregates grants/limits from classes/traits
 - UI: `src/routes/character-creation/*`, `src/routes/character-sheet/*`

 ---

 ## 2. Data Shapes

 - Maneuver/Technique fields: `id`, `name`, `category`, `description`, `prerequisites?`, `actions?`/`activation`, `tags`.
 - Stances (monk): persistent toggles with effects while active; data includes `id`, `name`, `description`, `requirements`.

 ---

 ## 3. Selection & Validation

 - Eligibility: class level and feature grants determine what is selectable.
 - Prerequisites: check tags/previous picks where specified.
 - Limits: number known/prepared per level or feature; enforced in provider/calculator-backed state.

 Acceptance examples:
 - If the current class lacks martial access, the section is hidden or marked N/A (see E2E conditional skip).
 - Deleting a maneuver reduces the known count and re-enables selection elsewhere.

 ---

 ## 4. UI Flows

 - Creation: render lists and selection controls gated by eligibility; show counts remaining.
 - Sheet: display known maneuvers/techniques and any active stances.

 ---

 ## 5. E2E Links

 - `e2e/10-maneuvers.e2e.spec.ts` — Adds and deletes maneuvers; conditionally skips when not applicable.
- `e2e/12-exhaustion-info.e2e.spec.ts` — Info buttons validate cross-references with feature details.

---

## 6. Troubleshooting

- Items not showing: ensure exported lists are imported by the UI/provider and that class grants are aggregated.
- Prereq logic: verify any custom prerequisites are implemented in selection helpers before enabling in UI.

---

> Last updated: 2025-09-12
> Maintainer: @DC20Clean-Team


