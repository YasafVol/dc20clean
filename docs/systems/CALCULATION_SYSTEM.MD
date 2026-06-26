# DC20Clean – Calculation & Derived Stats System

> Purpose: Definitive guide to derived stat formulas, effect application order, mastery cap validation, and breakdown output.
> Status: Active
> Last Updated: 2026-06-26

---

## 1. Key Files & Roles

- `src/lib/services/enhancedCharacterCalculator.ts` — orchestrator (~500 lines) calling modules in sequence
- `src/lib/services/calculatorModules/` — 8 specialized calculation modules:
  - `abilityCollection.ts` — collects granted abilities, movements, resistances, senses, combat training, conditional modifiers
  - `breakdownGeneration.ts` — creates stat breakdowns for tooltips
  - `spellSystem.ts` — global magic profile and spell slot generation
  - `effectCollection.ts` — aggregates attributed effects and resolves choices
  - `progressionAggregation.ts` — aggregates progression gains and path benefits
  - `budgetCalculation.ts` — skill/trade/language/ancestry point budgets
  - `statCalculation.ts` — derived stats (attributes, defenses, resources, saves, movement)
  - `validation.ts` — attribute limits, mastery cap, spell slot validation
- `src/lib/hooks/useCharacterBuilder.ts` — exposes calculation results to UI
- `src/lib/rulesdata/schemas/character.schema.ts` — canonical `Effect` union
- `src/lib/rulesdata/attributes.ts` — base attributes and modifiers
- `src/lib/rulesdata/progression/levelCaps.ts` — **single source of truth** for attribute/mastery caps by level
- `src/lib/rulesdata/equipment/equipmentEffects.ts` — converts equipped inventory
  rows and Equipage items into canonical attributed effects

  ***

## 1.1. Calculator Architecture

The calculator was refactored into 8 specialized modules plus an orchestrator:

**Orchestrator**: `enhancedCharacterCalculator.ts` (~500 lines) coordinates the calculation pipeline by calling modules in sequence.

**Modules** (in `src/lib/services/calculatorModules/`):

- `abilityCollection.ts` — collects granted abilities, movements, resistances, senses, combat training, conditional modifiers
- `breakdownGeneration.ts` — creates stat breakdowns for tooltips
- `spellSystem.ts` — global magic profile and spell slot generation
- `effectCollection.ts` — aggregates attributed effects and resolves choices
- `progressionAggregation.ts` — aggregates progression gains and path benefits
- `budgetCalculation.ts` — skill/trade/language/ancestry point budgets
- `statCalculation.ts` — derived stats (attributes, defenses, resources, saves, movement)
- `validation.ts` — attribute limits, mastery cap, spell slot validation

This modular structure improves maintainability and makes the calculation pipeline easier to understand and test.

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

- **PD** = `8 + Combat Mastery + Agility + Intelligence + sum(always-on effects.pd)`
- **AD** = `8 + Combat Mastery + Might + Charisma + sum(always-on effects.ad)`
- Equipped armor, shields, and weapons contribute through the same effect sums. For
  example, an equipped Guard weapon adds `MODIFY_STAT pd +1`.
- Conditional modifiers (for example `while_raging` or `not_wearing_armor`) are surfaced under `conditionalModifiers` and are not applied to always-on totals.
- Sheet combat toggles and active-condition maps feed `activeConditions`. Rage maps to `while_raging`; `not_wearing_armor` is inferred automatically when no equipped Armor or custom Equipage armor row exists.
- **Save DC** = `10 + Combat Mastery + Prime Attribute`
- **Death Threshold magnitude** = `Prime Attribute + Combat Mastery + sum(effects.deathThresholdModifier)`.
  Sheet Death's Door comparisons use the negative HP threshold, e.g. a magnitude of
  `4` means death at `-4 HP`.
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
- **Jump Distance** = `Agility + sum(effects.jumpDistance)`, except effects that set `jumpCalculationAttribute` to `might` use the higher of Might or Agility as the base.
- **Hold Breath** = `max(1, Might)`; zero or negative Might still yields a Breath Duration of 1.

### Background Budgets

- **Skills** = `5 + Intelligence + sum(progressionGains.totalSkillPoints) + sum(effects.skillPoints)`
- **Trades** = `3 + sum(progressionGains.totalTradePoints) + sum(effects.tradePoints)`
- **Languages** = `2 + sum(effects.languagePoints)` (does NOT scale with level)

### Progression Gains (from Class + Path)

- **Maneuvers Known** = `sum(progressionGains.totalManeuversKnown) + sum(pathBonuses.maneuvers)`
- **Cantrips Known** = `sum(progressionGains.totalCantripsKnown) + sum(pathBonuses.cantrips)`
- **Spells Known** = `sum(progressionGains.totalSpellsKnown) + sum(pathBonuses.spells)`
- **Talents** = `sum(progressionGains.totalTalents)`
- **Path Points** = `sum(progressionGains.totalPathPoints)`
- **Ancestry Points** = `5 + sum(progressionGains.totalAncestryPoints) + sum(effects.ancestryPoints)`
- **Attribute Points** = `12 + sum(progressionGains.totalAttributePoints) + sum(effects.attributePoints)`

**Note**: Techniques have been removed in DC20 v0.10.

### DC20 v0.10.5 Resource Progression

The calculator reads resolved class progressions through `classesData` and aggregates levels 1 through target level. Per-class progression exports are built from shared martial, spellcaster, or hybrid templates plus class-specific feature IDs before they reach the calculator:

| Class Category | Level 1 Resources | Level 10 Resource Totals |
| -------------- | ----------------- | ------------------------ |
| Martial        | 2 SP              | 6 SP                     |
| Spellcaster    | 6 MP              | 21 MP                    |
| Hybrid         | 1 SP, 3 MP        | 3 SP, 11 MP              |

The v0.10.5 shared schedule grants Talents at levels 2, 4, 6, and 8; Path Progression at levels 2, 4, 6, and 8; Ancestry Points at levels 4 and 8; subclass choices at levels 3, 7, and 10; and class features at levels 1, 2, 5, and 9.

Level 5 Expert Features are resolved from the class feature data using the existing persisted level-5 IDs. Their universal modeled effects flow through normal aggregation:

- Bard and Rogue Expert Features add skill points through `MODIFY_STAT`.
- Sorcerer and Warlock Expert Features add resource maximums through `MODIFY_STAT`.
- Monk Expert Feature adds Speed and Jump Distance through `MODIFY_STAT`.
- Bard and Wizard Expert Features add spell slots through `GRANT_SPELL`.
- Champion Expert Feature adds maneuver capacity through `GRANT_MANEUVERS`.

### Path Bonuses (M3.9)

**Martial Path:**

- Level 1: +1 SP, +1 maneuver
- Level 2: +1 maneuver
- Level 3: +1 SP, +1 maneuver
- Level 4: +1 maneuver

**Spellcaster Path:**

- Level 1: +3 MP, +1 cantrip, +1 spell
- Level 2: +2 MP, +1 cantrip
- Level 3: +2 MP, +1 cantrip, +1 spell
- Level 4: +2 MP, +1 spell

  ***

## 3. Effect Application Order

1.  Aggregate class features, ancestry traits, talents, choices, and equipped equipment into `Effect[]`
2.  Resolve user-choice effects (e.g., any_attribute/any_skill)
3.  Apply numeric modifiers to base stats and resource maximums
4.  Compute background budgets and conversions
5.  Validate mastery caps (see §4)
6.  Emit breakdowns for UI (sources, totals)

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

| Level Range | Natural Cap          | Unlimited Tiers               | Extra Limit Increase Needed For |
| ----------- | -------------------- | ----------------------------- | ------------------------------- |
| 1-4         | Tier 1 (Novice)      | Novice                        | Adept+                          |
| 5-9         | Tier 2 (Adept)       | Novice, Adept                 | Expert+                         |
| 10-14       | Tier 3 (Expert)      | Novice, Adept, Expert         | Master+                         |
| 15-19       | Tier 4 (Master)      | Novice, Adept, Expert, Master | Grandmaster                     |
| 20          | Tier 5 (Grandmaster) | All tiers                     | None                            |

**Example:** At level 5, you can select as many Adept skills as you want (just like Novice is unlimited at level 1).

At levels 1-4, a character can still exceed the natural Novice cap by spending points to raise an individual Skill or Trade limit. Raising a level 1 Skill from no Mastery to Adept costs 3 Skill Points: 1 for Novice, 1 for the Skill-specific limit elevation, and 1 for Adept.

### 4.3. Effect-Based Exceptions

- Exception grants via effects:
  - `MODIFY_SKILL_MASTERY_CAP` / `MODIFY_TRADE_MASTERY_CAP`
  - `INCREASE_SKILL_MASTERY_CAP` / `INCREASE_TRADE_MASTERY_CAP`
- Point-bought cap elevations are stored separately from mastery ranks:
  - `skillMasteryLimitElevations`
  - `tradeMasteryLimitElevations`
- Calculator computes: `maxSkillMastery`, `maxTradeMastery`, `currentAdeptCount`, `maxAdeptCount`, `canSelectAdept`.

  ***

## 5. Output Structure

- `calculationResult`: top-level object consumed by context/UI
- `breakdowns`: per-stat arrays with `{ source, delta, total }`. Current combat
  breakdown keys include `attack_spell_check`, `save_dc`, `death_threshold`,
  `initiative`, and `martial_check`.
- `validation`: background overspend, mastery cap errors

---

## 6. Acceptance Criteria

- Increasing a trait that grants `+1 mpMax` increases MP Max and appears in the breakdown with correct source label.
- Attempting to exceed mastery cap without exceptions yields `MASTERY_CAP_EXCEEDED` and disables submit.
- Save DC formula matches `10 + Combat Mastery + Prime Attribute`.

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

## 9. Calculation Order & Dependency Tree

This section documents the **exact order** of calculations in `enhancedCharacterCalculator.ts` and the dependencies between values. **Parents must be calculated before children.**

### 9.1. Calculation Stages

#### Stage 1: Input Data & Effects Resolution

```
Input Data (buildData)
├── level
├── classId
├── ancestry1Id, ancestry2Id
├── selectedTraitIds
├── selectedTraitChoices
├── pathPointAllocations
├── selectedSubclass
├── attribute_might, attribute_agility, attribute_charisma, attribute_intelligence
├── skillsData (ranks)
├── tradesData (ranks)
└── languagesData

Effects Aggregation (effectCollection.ts)
├── aggregateAttributedEffects() → rawEffects
└── resolveEffectChoices() → resolvedEffects
   └── resolves nested class feature choice effects and leaves unresolved spell grants inactive

Effect Collection (abilityCollection.ts)
├── collectGrantedAbilities() → abilities (GRANT_ABILITY)
├── collectMovements() → movements (GRANT_MOVEMENT)
├── collectResistances() → resistances (GRANT_RESISTANCE)
├── collectVulnerabilities() → vulnerabilities (GRANT_VULNERABILITY)
├── collectSenses() → senses (GRANT_SENSE)
├── collectCombatTraining() → combatTraining (GRANT_COMBAT_TRAINING)
└── collectConditionalModifiers() → conditionalModifiers
```

Sense grants are grouped by sense type. The calculator keeps the highest base range, adds unconditional increases, and supports conditional "increase if already present" grants for rules such as Cleric Dark Domain Darkvision and Hunter Subterranean Favored Terrain.

Class feature effect aggregation includes direct feature effects, benefit-level effects, selected subclass effects, selected feature-choice option effects, and selected talent effects. Intro-only flavor features such as Monk/Rogue/Spellblade `Source of Power` are excluded from automatic multiclass flavor-feature grants. Level 9 class capstone records remain non-mechanical when the source has not published class-specific mechanics.

#### Stage 2: Base Values (No Dependencies)

```
level → combatMastery = Math.ceil(level / 2)
```

#### Stage 3: Class Progression Data

```
classId + level → progressionGains
├── totalHP (HP from leveling)
├── totalSP (SP from leveling)
├── totalMP (MP from leveling)
├── totalSkillPoints
├── totalTradePoints
├── totalAttributePoints
├── totalAncestryPoints
├── totalTalents
├── totalPathPoints
├── totalManeuversKnown
├── totalCantripsKnown
└── totalSpellsKnown
```

#### Stage 4: Attributes (With Effect Breakdowns)

```
buildData attributes + resolvedEffects → finalAttributes
├── attribute_might → breakdown → finalMight
├── attribute_agility → breakdown → finalAgility
├── attribute_charisma → breakdown → finalCharisma
└── attribute_intelligence → breakdown → finalIntelligence
```

#### Stage 5: Prime Modifier (Optional Rule)

```
Dependencies: buildData.level, finalMight, finalAgility, finalCharisma, finalIntelligence, usePrimeCapRule

if usePrimeCapRule:
	primeModifier = getLevelCaps(level).maxAttributeValue
	primeAttribute = 'prime'
else:
	maxValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence)
	primeAttribute = tie-breaker (might > agility > charisma > intelligence)
	primeModifier = maxValue
```

UI Toggle: the Attributes stage of character creation exposes a "Use Prime = Attribute Cap (Optional Rule)" checkbox. When unchecked, the calculator follows the legacy highest-attribute prime.

#### Stage 6: Initial Resource Values (Before Effect Breakdowns)

```
Dependencies: finalMight, progressionGains

⚠️ INITIAL VALUES (will be updated after breakdowns)
├── finalHPMax_initial = finalMight + progressionGains.totalHP
├── finalSPMax_initial = progressionGains.totalSP
└── finalMPMax_initial = progressionGains.totalMP
```

#### Stage 7: Defense Base Values (Before Effect Breakdowns)

```
Dependencies: combatMastery, finalAgility, finalIntelligence, finalMight, finalCharisma

├── basePD = 8 + combatMastery + finalAgility + finalIntelligence
└── baseAD = 8 + combatMastery + finalMight + finalCharisma
```

#### Stage 8: Derived Stats (First Pass - Using Initial Values)

```
Dependencies: combatMastery, primeModifier, finalAttributes, finalCharisma

├── finalGritPoints = max(0, 2 + finalCharisma)
├── finalSaveDC = 10 + combatMastery + primeModifier
├── finalSaveMight = finalMight + combatMastery
├── finalSaveAgility = finalAgility + combatMastery
├── finalSaveCharisma = finalCharisma + combatMastery
├── finalSaveIntelligence = finalIntelligence + combatMastery
├── finalDeathThreshold = primeModifier + combatMastery
├── baseMoveSpeed = 5
├── baseJumpDistance = finalAgility
└── finalInitiativeBonus = combatMastery + finalAgility
```

#### Stage 9: Apply Effect Breakdowns to Resources & Stats

```
Dependencies: initial values + resolvedEffects

Create breakdowns (applies MODIFY_STAT effects):
├── breakdowns.hpMax = createStatBreakdown('hpMax', finalHPMax_initial, resolvedEffects)
├── breakdowns.spMax = createStatBreakdown('spMax', finalSPMax_initial, resolvedEffects)
├── breakdowns.mpMax = createStatBreakdown('mpMax', finalMPMax_initial, resolvedEffects)
├── breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects)
├── breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects)
├── breakdowns.attributePoints = createStatBreakdown('attributePoints', 12 + progressionGains.totalAttributePoints, resolvedEffects)
├── breakdowns.move_speed = createStatBreakdown('moveSpeed', baseMoveSpeed, resolvedEffects)
└── breakdowns.jump_distance = createStatBreakdown('jumpDistance', baseJumpDistance, resolvedEffects)

Update to final values (post-effects):
├── finalHPMax = breakdowns.hpMax.total  ✅ NOW includes trait effects
├── finalSPMax = breakdowns.spMax.total
├── finalMPMax = breakdowns.mpMax.total
├── finalMoveSpeed = breakdowns.move_speed.total
├── finalJumpDistance = breakdowns.jump_distance.total
├── finalAttributePoints = breakdowns.attributePoints.total
└── finalRestPoints = finalHPMax  ✅ CORRECTLY uses post-breakdown HP
```

#### Stage 10: Combat Stats with Breakdowns

```
Dependencies: combatMastery, primeModifier, finalSaveDC

├── attackSpellCheckBase = combatMastery + primeModifier
├── breakdowns.attack_spell_check = createStatBreakdown('attackSpellCheck', attackSpellCheckBase, resolvedEffects)
└── breakdowns.save_dc = createStatBreakdown('saveDC', finalSaveDC, resolvedEffects)
```

#### Stage 11: Background Points & Conversions

```
Dependencies: finalIntelligence, progressionGains, resolvedEffects, buildData

├── baseSkillPoints = 5 + progressionGains.totalSkillPoints + finalIntelligence + skillPointsBonus
├── baseTradePoints = 3 + progressionGains.totalTradePoints + tradePointsBonus
├── baseLanguagePoints = 2 + languagePointsBonus
├── conversions (skillToTrade, tradeToSkill undo compatibility, tradeToLanguage)
├── effectiveSkillToTrade = skillToTrade - floor(min(tradeToSkill, skillToTrade*2)/2)
├── availableSkillPoints = baseSkillPoints - effectiveSkillToTrade
├── availableTradePoints = baseTradePoints + effectiveSkillToTrade*2 - tradeToLanguage
└── availableLanguagePoints (after conversions)
```

#### Stage 12: Ancestry Points

```
Dependencies: selectedTraitIds, traitsData, resolvedEffects

├── selectedTraitCosts = sum of trait costs
├── baseAncestryPoints = 5 + ancestryPointsBonus
└── ancestryPointsRemaining = baseAncestryPoints - selectedTraitCosts
```

#### Stage 13: Martial Check

```
Dependencies: finalAgility, finalMight, skillsData

├── acrobaticsTotal = finalAgility + (acrobaticsProficiency × 2)
├── athleticsTotal = finalMight + (athleticsProficiency × 2)
└── finalMartialCheck = max(acrobaticsTotal, athleticsTotal)
```

### 9.2. Dependency Graph

```
level
  ├─→ combatMastery
  │     ├─→ basePD (+ finalAgility + finalIntelligence)
  │     ├─→ baseAD (+ finalMight + finalCharisma)
  │     ├─→ finalSaveMight (+ finalMight)
  │     ├─→ finalSaveAgility (+ finalAgility)
  │     ├─→ finalSaveCharisma (+ finalCharisma)
  │     ├─→ finalSaveIntelligence (+ finalIntelligence)
  │     └─→ finalInitiativeBonus (+ finalAgility)
  └─→ primeCapValue = getLevelCaps(level).maxAttributeValue

buildData.attributes + resolvedEffects
  └─→ finalAttributes (might, agility, charisma, intelligence)
        ├─→ attributePrimeCandidate (max value + tie-breaker)
        ├─→ basePD (combatMastery + finalAgility + finalIntelligence)
        ├─→ baseAD (combatMastery + finalMight + finalCharisma)
        ├─→ finalGritPoints (2 + finalCharisma)
        ├─→ baseSkillPoints (5 + progressionGains + finalIntelligence + bonus)
        ├─→ finalInitiativeBonus (combatMastery + finalAgility)
        ├─→ baseJumpDistance (= finalAgility)
        └─→ finalMartialCheck
              ├─→ acrobaticsTotal (finalAgility + proficiency × 2)
              └─→ athleticsTotal (finalMight + proficiency × 2)

usePrimeCapRule
  ├─→ primeModifier (primeCapValue if true else attributePrimeCandidate.value)
  └─→ primeAttribute ('prime' if true else attributePrimeCandidate.name)

primeModifier
  ├─→ finalSaveDC (10 + combatMastery + primeModifier)
  ├─→ finalDeathThreshold (primeModifier + combatMastery)
  └─→ attackSpellCheckBase (combatMastery + primeModifier)

progressionGains
  ├─→ totalHP
  │     └─→ finalHPMax_initial (finalMight + totalHP)
  │           └─→ breakdowns.hpMax
  │                 └─→ finalHPMax (post-effects) ✅
  │                       └─→ finalRestPoints ✅ CORRECTLY calculated here
  ├─→ totalSP → finalSPMax
  ├─→ totalMP → finalMPMax
  ├─→ totalSkillPoints → baseSkillPoints
  ├─→ totalTradePoints → baseTradePoints
  └─→ totalAttributePoints → baseAttributePoints
```

### 9.3. Movement Processing

**Location**: `calculatorModules/abilityCollection.ts`, called after all stats are finalized

After all stats are finalized (including `finalMoveSpeed`), `GRANT_MOVEMENT` effects are processed:

```typescript
const movements = resolvedEffects
	.filter((effect) => effect.resolved && effect.type === 'GRANT_MOVEMENT')
	.map((effect) => {
		let speed: string;
		if (effect.value === 'equal_to_speed') {
			speed = `${finalMoveSpeed}`; // Uses finalized ground speed
		} else if (typeof effect.value === 'number') {
			speed = `${effect.value}`;
		} else {
			speed = effect.value as string;
		}
		return { type: effect.target, speed, source: effect.source };
	});
```

**Default Climb/Swim Injection:**

Characters without Climb or Swim speed automatically receive half ground speed for these movement types, per DC20 CH3 Slowed 1 rule. The `injectDefaultMovements()` function adds these defaults with `isDefault: true` flag:

- If no Climb speed exists: adds Climb at `floor(groundSpeed / 2)` with `isDefault: true`
- If no Swim speed exists: adds Swim at `floor(groundSpeed / 2)` with `isDefault: true`
- Fly/Burrow/Glide are not auto-granted (require explicit `GRANT_MOVEMENT` effects)

**Key Points:**

- Movement processing occurs AFTER `finalMoveSpeed` is calculated
- `equal_to_speed` converts to numeric value of ground speed
- Default Climb/Swim speeds are injected if not already granted
- Result is array of `{ type, speed, source, isDefault? }` objects
- Consumed by PDF export to populate movement checkboxes

**See**: `docs/systems/EFFECT_SYSTEM.MD#2.1` for full GRANT_MOVEMENT documentation

---

### 9.4. Issue: Rest Points Calculation Timing ✅ FIXED

**Previous (Incorrect) Order:**

1. `finalHPMax = finalMight + progressionGains.totalHP` (= 18)
2. `finalRestPoints = finalHPMax` (= 18) -- assigned too early
3. `breakdowns.hpMax = createStatBreakdown(...)` (applies +1 from trait)
4. `finalHPMax = breakdowns.hpMax.total` (= 19)
5. **Result**: HP Max = 19, Rest Points = 18 -- mismatch

**Current (Correct) Order:**

1. `finalHPMax = finalMight + progressionGains.totalHP`
2. `breakdowns.hpMax = createStatBreakdown(...)`
3. `finalHPMax = breakdowns.hpMax.total` (= 19)
4. `finalRestPoints = finalHPMax` (= 19) -- assigned after breakdown
5. **Result**: HP Max = 19, Rest Points = 19 -- correct

### 9.5. Correct Calculation Order

For values that depend on breakdowns, the order must be:

1. Calculate initial/base value
2. Create breakdown with effects
3. Get final value from breakdown.total
4. **THEN** calculate dependent values

**Examples of correct dependencies:**

- `finalGritPoints` depends on `finalCharisma` (post-breakdown) ✅
- `finalInitiativeBonus` depends on `finalAgility` (post-breakdown) ✅
- `finalMartialCheck` depends on `finalMight`/`finalAgility` (post-breakdown) ✅
- `finalRestPoints` depends on `finalHPMax` (post-breakdown) ✅

---

## Summary of Recent Updates (2025-10-10)

### Movement System Implementation

- Added `GRANT_MOVEMENT` effect processing in calculator (section 9.3)
- Movement speeds now convert string formulas (`equal_to_speed`, `half_speed`, `double_speed`) to numeric values
- Movement data saved to `SavedCharacter.movement` structure
- PDF export fully integrated with movement checkboxes

### Rest Points Timing Fix

- Fixed calculation order bug where `finalRestPoints` was assigned before `finalHPMax` had all effects applied (section 9.4)
- Rest Points now correctly equals HP Max after all modifiers

### Data Fixes

- Fixed `terraborn_slow_moving` trait: -5 → -1 (consistent with other Short-Legged traits)
- Fixed `beastborn_jumper` trait: Added missing `MODIFY_STAT` effect for +2 jump distance

---

> Last updated: 2026-02-06
> Maintainer: @DC20Clean-Team
