 # DC20Clean – Calculation & Derived Stats System

 > Purpose
 > Definitive guide to derived stat formulas, effect application order, mastery cap validation, and breakdown output.

 ---

 ## 1. Key Files & Roles

 - `src/lib/services/enhancedCharacterCalculator.ts` — core engine
 - `src/lib/hooks/useCharacterBuilder.ts` — exposes calculation results to UI
 - `src/lib/rulesdata/schemas/character.schema.ts` — canonical `Effect` union
 - `src/lib/rulesdata/attributes.ts` — base attributes and modifiers

 ---

 ## 2. Formula Summary (Level 1 defaults)

 - HP Max = `Might + classTable.hp + sum(effects.hpMax)`
 - SP Max = `Agility + classTable.sp + sum(effects.spMax)`
 - MP Max = `Intelligence + classTable.mp + sum(effects.mpMax)`
 - PD = `8 + Combat Mastery + Agility + Intelligence + sum(effects.pd)`
 - AD = `8 + Combat Mastery + Might + Charisma + sum(effects.ad)`
 - Save DC = `8 + Combat Mastery + Prime Attribute Mod`
 - Initiative = `Combat Mastery + Agility`
 - Background Budgets (see Background doc):
   - Skills = `5 + Intelligence + bonus(skillPoints)`
   - Trades = `3 + bonus(tradePoints)`
   - Languages = `2 + bonus(languagePoints)`

 ---

 ## 3. Effect Application Order

 1) Aggregate class features and ancestry traits into `Effect[]`
 2) Resolve user-choice effects (e.g., any_attribute/any_skill)
 3) Apply numeric modifiers to base stats and resource maximums
 4) Compute background budgets and conversions
 5) Validate mastery caps (see §4)
 6) Emit breakdowns for UI (sources, totals)

 Targets for resource maximums must be `hpMax`, `spMax`, `mpMax` (not `mp`).

 ---

 ## 4. Mastery Cap Validation (Skills/Trades)

 - Baseline caps from level; all characters have 1 base Adept slot.
 - Exception grants via effects:
   - `MODIFY_SKILL_MASTERY_CAP` / `MODIFY_TRADE_MASTERY_CAP`
   - `INCREASE_SKILL_MASTERY_CAP` / `INCREASE_TRADE_MASTERY_CAP`
 - Calculator computes: `maxSkillMastery`, `maxTradeMastery`, `currentAdeptCount`, `maxAdeptCount`, `canSelectAdept`.

 ---

 ## 5. Output Structure

 - `calculationResult`: top-level object consumed by context/UI
 - `breakdowns`: per-stat arrays with `{ source, delta, total }`
 - `validation`: background overspend, mastery cap errors

 ---

 ## 6. Acceptance Criteria

 - Increasing a trait that grants `+1 mpMax` increases MP Max and appears in the breakdown with correct source label.
 - Attempting to exceed mastery cap without exceptions yields `MASTERY_CAP_EXCEEDED` and disables submit.
 - Save DC formula matches `8 + Combat Mastery + Prime` for casters.

 ---

 ## 7. References

 - `docs/systems/EFFECT_SYSTEM.MD` — effect types and targets
 - `docs/systems/BACKGROUND_SYSTEM.MD#4-calculation-model`

 ---

 > Last updated: 2025-09-12
 > Maintainer: @DC20Clean-Team


