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

 ## 2. Formula Summary

### Core Calculations

 - **Combat Mastery** = `Math.ceil(level / 2)`
   - Level 1-2: 1
   - Level 3-4: 2
   - Level 5-6: 3, etc.
 - **Prime Attribute** = highest attribute value (tie-breaker: might > agility > charisma > intelligence)

### Health & Resources

 - **HP Max** = `Might + sum(progressionGains.totalHP) + sum(effects.hpMax)`
 - **SP Max** = `sum(progressionGains.totalSP) + sum(pathBonuses.SP) + sum(effects.spMax)`
 - **MP Max** = `sum(progressionGains.totalMP) + sum(pathBonuses.MP) + sum(effects.mpMax)`
 - **Rest Points** = HP Max
 - **Grit Points** = `max(0, 2 + Charisma)`

### Defenses & Combat

 - **PD** = `8 + Combat Mastery + Agility + Intelligence + sum(effects.pd)`
 - **AD** = `8 + Combat Mastery + Might + Charisma + sum(effects.ad)`
 - **Save DC** = `10 + Combat Mastery + Prime Attribute`
 - **Death Threshold** = `Prime Attribute + Combat Mastery`
 - **Initiative** = `Combat Mastery + Agility`
 - **Attack/Spell Check** = `Combat Mastery + Prime Attribute + sum(effects.attackSpellCheck)`
 - **Martial Check** = `max(Acrobatics total, Athletics total)`
   - Acrobatics = `Agility + (proficiency × 2)`
   - Athletics = `Might + (proficiency × 2)`

### Saves

 - **Save Might** = `Might + Combat Mastery`
 - **Save Agility** = `Agility + Combat Mastery`
 - **Save Charisma** = `Charisma + Combat Mastery`
 - **Save Intelligence** = `Intelligence + Combat Mastery`

### Movement

 - **Move Speed** = `5 + sum(effects.moveSpeed)`
 - **Jump Distance** = `Agility + sum(effects.jumpDistance)`

### Background Budgets

 - **Skills** = `5 + Intelligence + sum(progressionGains.totalSkillPoints) + sum(effects.skillPoints)`
 - **Trades** = `3 + sum(progressionGains.totalTradePoints) + sum(effects.tradePoints)`
 - **Languages** = `2 + sum(effects.languagePoints)` (does NOT scale with level)

### Progression Gains (from Class + Path)

 - **Maneuvers Known** = `sum(progressionGains.totalManeuversKnown) + sum(pathBonuses.maneuvers)`
 - **Techniques Known** = `sum(progressionGains.totalTechniquesKnown) + sum(pathBonuses.techniques)`
 - **Cantrips Known** = `sum(progressionGains.totalCantripsKnown) + sum(pathBonuses.cantrips)`
 - **Spells Known** = `sum(progressionGains.totalSpellsKnown) + sum(pathBonuses.spells)`
 - **Talents** = `sum(progressionGains.totalTalents)`
 - **Path Points** = `sum(progressionGains.totalPathPoints)`
 - **Ancestry Points** = `5 + sum(progressionGains.totalAncestryPoints) + sum(effects.ancestryPoints)`
 - **Attribute Points** = `12 + sum(progressionGains.totalAttributePoints) + sum(effects.attributePoints)`

### Path Bonuses (M3.9)

**Martial Path:**
- Level 1: +1 SP, +1 maneuver, +1 technique
- Level 2: +1 maneuver
- Level 3: +1 SP, +1 maneuver, +1 technique
- Level 4: +1 maneuver

**Spellcaster Path:**
- Level 1: +2 MP, +1 cantrip, +1 spell
- Level 2: +2 MP, +1 cantrip
- Level 3: +2 MP, +1 cantrip, +1 spell
- Level 4: +2 MP, +1 spell

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

### 4.2. Unlimited Mastery at Natural Cap

**Core Rule:** All mastery tiers **up to and including** the level's natural cap are unlimited.

| Level Range | Natural Cap | Unlimited Tiers | Exception Slots Needed For |
|-------------|-------------|-----------------|----------------------------|
| 1-4         | Tier 1 (Novice) | Novice | Adept+ (L1 gets 1 free Adept slot) |
| 5-9         | Tier 2 (Adept) | Novice, Adept | Expert+ |
| 10-14       | Tier 3 (Expert) | Novice, Adept, Expert | Master+ |
| 15-19       | Tier 4 (Master) | Novice, Adept, Expert, Master | Grandmaster |
| 20          | Tier 5 (Grandmaster) | All tiers | None |

**Example:** At level 5, you can select as many Adept skills as you want (just like Novice is unlimited at level 1).

### 4.3. Effect-Based Exceptions

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


