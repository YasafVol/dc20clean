 # DC20Clean – Spells System

 > Purpose
 > Single reference for spell data model, assignment rules, UI flows, and validation.

 ---

 ## 1. Key Files & Roles

 - `src/lib/rulesdata/spells-data/**`: Canonical spell definitions organized by schools/categories
 - `src/lib/rulesdata/schemas/spell.schema.ts`: Spell Zod schema (shape, constraints)
 - `src/lib/rulesdata/schemas/types.ts`: Types referenced by rulesdata
 - `src/lib/services/spellAssignment.ts`: Assignment logic (availability, limits, helpers)
 - `src/lib/services/enhancedCharacterCalculator.ts`: Aggregates class/trait effects that alter spell slots/MP
 - UI selection and display:
   - `src/routes/character-creation/*` (spell pickers where applicable)
   - `src/routes/character-sheet/*` (spell list, filters, actions)

 ---

 ## 2. Data Shapes

 - Spell core fields (see schema for authoritative list):
   - `id`, `name`, `school/category`, `level/tier`, `cost` (MP), `range`, `duration`, `description`
   - Tags: `attack`, `save`, `healing`, `utility`, etc. used for filters and UI hints

 Validation: All spells must conform to `spell.schema.ts`; tests in rulesdata may load and validate.

 ---

 ## 3. Assignment Rules

 - Availability is driven by: class lists, ancestry/trait grants, and general unlocks.
 - MP costs are paid from `finalMpMax`/current MP; effects that increase `mpMax` must target `mpMax` (not `mp`).
 - Class features can grant additional known spells or categories; these are aggregated by the calculator and exposed to UI.
 - Sorting and filters in UI are category-driven; data derives directly from rulesdata indices.

 Acceptance examples:
 - A class with `Magic` domain granting `+1 MP` reflects in `finalMpMax` and spell usage displays updated capacity.
 - Filtering by a category (e.g., Holy and Restoration) restricts the list to that folder’s index set.

 ---

 ## 4. UI Flows

 - Creation: If class supports spells at level, render picker(s) with available list and current known/slots.
 - Sheet: Display known/prepared spells; provide filters by category/school and level.
 - Mobile fallbacks: Ensure list and removal actions are accessible (see E2E 09).

 ---

 ## 5. E2E Links

 - `e2e/09-spells.e2e.spec.ts` — Adds a spell, filters, and deletes; validates mobile/desktop fallbacks.
- `e2e/12-exhaustion-info.e2e.spec.ts` — Feature info buttons include class feature info affecting spells.

---

## 6. Troubleshooting

- Spell not visible: confirm it’s exported via the category `index.ts` and included in top-level `spells/index.ts`.
- MP not matching: ensure effects target `mpMax`; calculator aggregates into `finalMpMax`.

---

> Last updated: 2025-09-12
> Maintainer: @DC20Clean-Team


