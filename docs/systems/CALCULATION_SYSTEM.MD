 # DC20Clean – Calculation & Derived Stats System

 > Purpose
 > Definitive guide to derived stat formulas, effect application order, mastery cap validation, and breakdown output.

 ---

## 1. Key Files & Roles

- `src/lib/services/enhancedCharacterCalculator.ts` — core engine
- `src/lib/hooks/useCharacterBuilder.ts` — exposes calculation results to UI
- `src/lib/rulesdata/schemas/character.schema.ts` — canonical `Effect` union
- `src/lib/rulesdata/attributes.ts` — base attributes and modifiers
- `src/lib/rulesdata/progression/levelCaps.ts` — **single source of truth** for attribute/mastery caps by level

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

### 4.1. Level-Based Caps (Canonical Source)

All cap logic now references `src/lib/rulesdata/progression/levelCaps.ts`:

- **`MASTERY_TIERS`**: Defines tier names (Untrained, Novice, Adept, Expert, Master, Grandmaster) and bonuses (+0, +2, +4, +6, +8, +10)
- **`LEVEL_CAPS_TABLE`**: Explicit rows for levels 1-20 defining:
  - `maxAttributeValue`: Attribute modifier cap (e.g., +3 at L1-4, +4 at L5-9, ..., +7 at L20)
  - `maxSkillMasteryTier`: Max skill mastery tier (1=Novice at L1-4, 2=Adept at L5-9, etc.)
  - `maxTradeMasteryTier`: Max trade mastery tier (same progression as skills)
- **`getLevelCaps(level)`**: Returns caps for a given level

### 4.2. Effect-Based Exceptions

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

## 8. Level-Based Cap Table (Implementation Reference)

See `src/lib/rulesdata/progression/levelCaps.ts` for the complete table.

**Sample Progression:**
- **L1-4**: Attribute +3, Mastery Tier 1 (Novice)
- **L5-9**: Attribute +4, Mastery Tier 2 (Adept)
- **L10-14**: Attribute +5, Mastery Tier 3 (Expert)
- **L15-19**: Attribute +6, Mastery Tier 4 (Master)
- **L20**: Attribute +7, Mastery Tier 5 (Grandmaster)

All UI components (Attributes, Background/Skills/Trades tabs) and the calculator reference this canonical source.

---

> Last updated: 2025-10-02
> Maintainer: @DC20Clean-Team


