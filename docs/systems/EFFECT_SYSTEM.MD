 # DC20Clean – Effect System

 > Purpose
 > Canonical catalog of `Effect.type` semantics, targets, choice resolution, and stacking rules used across Traits and Class Features.

 ---

 ## 1. Key Files & Roles

 - `src/lib/rulesdata/schemas/character.schema.ts` — authoritative `Effect` union
 - `src/lib/services/enhancedCharacterCalculator.ts` — effect aggregation and application
 - Producers: Traits (`ancestries/traits.ts`), Class Features (`classes-data/features/*`)

 ---

 ## 2. Effect Categories (examples, not exhaustive)

 - Numeric modifiers: `MODIFY_STAT`, resource maxima `hpMax|spMax|mpMax`, defenses `pd|ad`, attributes, background pools
 - Grants: `GRANT_ABILITY`, senses, movements, resistances, proficiencies
 - Mastery caps: `MODIFY_SKILL_MASTERY_CAP`, `INCREASE_SKILL_MASTERY_CAP`, and trade analogs

 Stacking: Numeric effects sum; grants de-duplicate by `id/name`.

 ---

 ## 3. Choice Resolution

 - Effects may declare a choice target:
   - `any_attribute`, `any_skill`, `any_trade`, etc.
 - The calculator resolves choices using prompts/options metadata before applying effects.

 ---

 ## 4. Targets & Constraints

 - Resource maximums must target `hpMax`, `spMax`, `mpMax`.
 - Background pools use `skillPoints`, `tradePoints`, `languagePoints`.
 - New targets/types require:
   1) Extend union in `character.schema.ts`
   2) Implement handling in the calculator (aggregation and/or breakdown)
   3) Add tests

 ---

 ## 5. Acceptance Criteria

 - Adding an effect with `target: 'mpMax'` increases MP Max and appears in breakdowns.
 - Choice-based grant (`any_skill`) prompts once and persists to calculation and UI.
 - Mastery cap effects correctly expand `maxAdeptCount` and validation passes when within budget.

 ---

 ## 6. References

 - `docs/systems/TRAITS_SYSTEM.MD`
 - `docs/systems/CLASS_SYSTEM.MD`
 - `docs/systems/CALCULATION_SYSTEM.MD`

 ---

 > Last updated: 2025-09-12
 > Maintainer: @DC20Clean-Team


