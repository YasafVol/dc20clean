# DC20Clean – Effect System

> Purpose: Canonical catalog of `Effect.type` semantics, targets, choice resolution, and stacking rules used across Traits and Class Features.
> Status: Active
> Last Updated: 2026-06-24

---

## 1. Key Files & Roles

- `src/lib/rulesdata/schemas/character.schema.ts` — authoritative `Effect` union, `TraitRequirements` interface
- `src/lib/services/enhancedCharacterCalculator.ts` — orchestrator calling effect collection modules
- `src/lib/services/calculatorModules/effectCollection.ts` — effect aggregation and choice resolution
- `src/lib/services/calculatorModules/abilityCollection.ts` — collects grants (abilities, movements, resistances, vulnerabilities, senses, combat training)
- Producers: Traits (`ancestries/traits.ts`), Class Features (`classes-data/features/*`), equipped equipment (`rulesdata/equipment/*`)

---

## 2. Complete Effect Type Reference

All effect types are defined in `character.schema.ts` as a discriminated union. There are 22 types total.

### Numeric Modifiers

| Type               | Target                                                                                                                                                                                                              | Value              | Special Fields                                                   | Stacking            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------- | ------------------- |
| `MODIFY_STAT`      | stat name (`hpMax`, `spMax`, `mpMax`, `pd`, `ad`, `skillPoints`, `tradePoints`, `languagePoints`, `moveSpeed`, `jumpDistance`, `attackSpellCheck`, `saveDC`, `maneuversKnown`, `ancestryPoints`, `attributePoints`) | `number`           | `condition?: string` (e.g., `while_raging`, `not_wearing_armor`) | Sums                |
| `MODIFY_ATTRIBUTE` | attribute name (`might`, `agility`, `charisma`, `intelligence`)                                                                                                                                                     | `number`           | `userChoice?: { prompt, options? }` for `any_attribute`          | Sums                |
| `SET_VALUE`        | stat name (`jumpCalculationAttribute` supported)                                                                                                                                                                    | `string \| number` | --                                                               | Overrides base rule |

### Grants

| Type                    | Target                                                    | Value                                                        | Special Fields                                      | Stacking                                                                       |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `GRANT_ABILITY`         | ability name                                              | `string` (description)                                       | --                                                  | De-duplicates                                                                  |
| `GRANT_RESISTANCE`      | damage type                                               | `string \| number \| boolean`                                | `optional?: string`                                 | De-duplicates; **collected by `abilityCollection.ts`**                         |
| `GRANT_VULNERABILITY`   | damage type                                               | `number`                                                     | --                                                  | De-duplicates; **collected by `abilityCollection.ts`**                         |
| `GRANT_ADV_ON_SAVE`     | save type or condition target                             | `string \| boolean`                                          | --                                                  | De-duplicates; condition targets normalize by ID/name                          |
| `GRANT_ADV_ON_CHECK`    | check type                                                | `string \| boolean`                                          | --                                                  | De-duplicates; collected as sheet-facing advantage text                        |
| `GRANT_COMBAT_TRAINING` | training type (e.g., `Weapons`, `Spell_Focuses`)          | `boolean`                                                    | --                                                  | De-duplicates; **collected by `abilityCollection.ts`**                         |
| `GRANT_SENSE`           | sense type (e.g., `darkvision`)                           | `number` (range)                                             | `mode?: 'set' \| 'increase' \| 'increase_existing'` | Highest set range wins; increases add; **collected by `abilityCollection.ts`** |
| `GRANT_MOVEMENT`        | movement type (`climb`, `swim`, `fly`, `burrow`, `glide`) | speed formula or numeric spaces                              | --                                                  | De-duplicates                                                                  |
| `GRANT_CHOICE`          | choice category                                           | `number`                                                     | `userChoice?: { prompt, options? }`                 | Per-choice                                                                     |
| `GRANT_SKILL_EXPERTISE` | skill name                                                | `{ capIncrease, levelIncrease }`                             | `userChoice?: { prompt, count? }`                   | Per-skill                                                                      |
| `GRANT_TRADE_EXPERTISE` | trade name                                                | `{ capIncrease, levelIncrease }`                             | `userChoice?: { prompt }`                           | Per-trade                                                                      |

### Spell and Maneuver Grants

| Type              | Target                                       | Value              | Special Fields                      | Stacking                                              |
| ----------------- | -------------------------------------------- | ------------------ | ----------------------------------- | ----------------------------------------------------- |
| `GRANT_SPELL`     | spell restriction or specific spell          | `number \| string` | `userChoice?: { prompt, options? }` | Per-slot                                              |
| `GRANT_CANTRIP`   | cantrip restriction                          | `number`           | --                                  | Per-slot                                              |
| `GRANT_MANEUVERS` | maneuver type or `all_attack` (access grant) | `number`           | --                                  | Access grants don't add to budget; specific grants do |

### Mastery Cap Effects

| Type                         | Fields                                                                         | Purpose                                    |
| ---------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| `MODIFY_SKILL_MASTERY_CAP`   | `tier` (`Adept` \| `Expert` \| `Master` \| `Grandmaster`), `count`, `options?` | Grant N skill slots at specified tier      |
| `MODIFY_TRADE_MASTERY_CAP`   | `tier`, `count`, `options?`                                                    | Grant N trade slots at specified tier      |
| `INCREASE_SKILL_MASTERY_CAP` | `value` (number), `count`, `options?`                                          | Increase mastery cap by value for N skills |
| `INCREASE_TRADE_MASTERY_CAP` | `value`, `count`, `options?`                                                   | Increase mastery cap by value for N trades |

### Condition Interaction Effects (v0.10)

| Type                            | Target            | Value                                | Purpose                    |
| ------------------------------- | ----------------- | ------------------------------------ | -------------------------- |
| `GRANT_CONDITION_IMMUNITY`      | condition ID/name | --                                   | Full immunity to condition |
| `GRANT_CONDITION_RESISTANCE`    | condition ID/name | `advantage` \| `reduction` \| `half` | Partial resistance         |
| `GRANT_CONDITION_VULNERABILITY` | condition ID/name | `disadvantage` \| `double`           | Increased susceptibility   |

### Effect Processing Pipeline

1. **Aggregation** (`effectCollection.ts::aggregateAttributedEffects()`): Collects effects from ancestry traits, class features, subclass features, talents, feature choices, and equipped equipment. Each effect is tagged with its source.
2. **Choice Resolution** (`effectCollection.ts::resolveEffectChoices()`): Resolves effects with `userChoice` metadata (e.g., `any_attribute` → specific attribute based on user selection). Nested class feature option effects use stable generated keys so a parent class choice can expose a second user choice such as a spell tag or school.
3. **Stat Application** (`statCalculation.ts::createStatBreakdown()`): Applies `MODIFY_STAT` and `MODIFY_ATTRIBUTE` effects to base values, producing breakdowns with per-source attribution. `SET_VALUE:jumpCalculationAttribute=might` changes Jump Distance base selection to the higher of Might or Agility.
4. **Grant Collection** (`abilityCollection.ts`): Collects all grant-type effects:
   - `collectGrantedAbilities()` — `GRANT_ABILITY` effects and `GRANT_ADV_ON_CHECK` sheet-facing advantage notes
   - `collectMovements()` — `GRANT_MOVEMENT` effects (with default Climb/Swim injection)
   - `collectResistances()` — `GRANT_RESISTANCE` effects (previously hardcoded empty)
   - `collectVulnerabilities()` — `GRANT_VULNERABILITY` effects (previously hardcoded empty)
   - `collectSenses()` — `GRANT_SENSE` effects. Senses are grouped by type; the highest `set` range wins, `increase` always adds, and `increase_existing` adds only when another source already grants that sense.
   - `collectCombatTraining()` — `GRANT_COMBAT_TRAINING` effects (previously hardcoded empty)
   - `collectConditionalModifiers()` — conditional modifiers from `MODIFY_STAT` effects
5. **Condition Aggregation** (`conditionAggregator.ts`): Rebuilds condition interactions for the character sheet from selected traits, class features, subclass features, and talents, then groups them by canonical condition ID. It accepts condition IDs, display names, and concrete stacking IDs such as `slowed-2`; `GRANT_ADV_ON_SAVE`, `GRANT_RESISTANCE`, and `GRANT_VULNERABILITY` also contribute when their target names a condition. This is intentionally a weak drift risk rather than a current blocker: it does not consume the calculator's resolved attributed effect list, so future condition-affecting sources such as equipment must either be added to this collector or the sheet should switch to calculator-resolved effects.

Stacking rules: Numeric effects (`MODIFY_STAT`, `MODIFY_ATTRIBUTE`) sum. Grants de-duplicate by target. Mastery cap effects accumulate slots.

### Equipment Effects

Equipage properties and saved custom equipment use the same `Effect` union as traits
and class features. Equipment effects are source-attributed with
`source.type === 'equipment'` and only enter the calculator from inventory rows marked
`isEquipped`.

Supported first-pass calculator mappings:

- Weapon Guard: `MODIFY_STAT` targeting `pd`.
- Armor and shield PD/AD bonuses: `MODIFY_STAT` targeting `pd` or `ad`.
- Armor and shield Speed penalties: `MODIFY_STAT` targeting `moveSpeed`.
- PDR/EDR/MDR-style reductions: `GRANT_RESISTANCE` with `physical`, `elemental`, or
  `mystical` targets and boolean `true` value. The effect is collected through the
  resistance pipeline, but presented/exported as binary Damage Reduction. MDR means
  Mystical Damage Reduction, even when the current PDF template field is named
  `Mental-Damage-Reduction`.
- Rule-text or spell-specific properties without dedicated numeric output fields:
  `GRANT_ABILITY`.

### Current v0.10.5 Class Feature Usage

Level 5 Expert Features use existing effect types only. Modeled universal bonuses are expressed as `MODIFY_STAT`, `GRANT_SPELL`, and `GRANT_MANEUVERS`; rules text that does not have a calculator-backed representation is surfaced as `GRANT_ABILITY`. Benefit-level effects are aggregated the same way as direct feature effects, with source attribution using the parent feature and benefit names.

Class feature audit reports flag duplicate always-on effects when the same effect is authored both directly on a feature and again on one of its benefits. Choice-option effects are excluded from this duplicate check because choices are not always active together. Keep a mechanical effect in the most specific source location that should appear on the sheet/audit output.

Class feature audit reports use `progression-derived` for feature records whose
rules text mirrors class progression-table output rather than adding independent
resource effects. Spellblade Martial Path still carries baseline combat-training
effects for Weapons, Spell Focuses, Light Armor, and Light Shields; its SP and
Maneuver counts remain progression-derived. Spellblade Spellcasting Path remains
resource-derived from the hybrid progression, while its stamina regen remains
class data.

Current sheet TODO target: `MODIFY_STAT:martial_melee_damage` is recognized as an attack-row presentation effect, but not yet applied to persisted attack rows. It needs a sheet helper that knows whether the row is an Unarmed Strike or melee weapon before applying conditional bonuses such as Rage.

Champion Fighting Spirit's v0.10.5 Combat Readiness text is represented as a `GRANT_ABILITY` with target `combat_readiness_fortify`. The old `combat_readiness_brace` identity is a feature alias only; it must not be treated as a maneuver alias because `Brace` remains a current Defense maneuver.

Class semantic deltas that are descriptive or action-granting continue to use `GRANT_ABILITY` rather than new effect types. Current v0.10.5 examples include Barbarian `elemental_fury_elemental_blast`, Commander `inspiring_presence`, Monk Ki/stance reaction abilities, Rogue `rogue_taunting_shot`, and Spellblade Bound Weapon/Discipline/Spellstrike abilities. Numeric or training deltas reuse existing effect types such as `GRANT_COMBAT_TRAINING`, `GRANT_MANEUVERS`, and `MODIFY_STAT`. Class check-ADV text such as Commander Natural Leader uses `GRANT_ADV_ON_CHECK`, which is collected for sheet presentation but does not alter roll math automatically. Prose-only class features should be avoided; if a feature is descriptive, flavor, or in-game-only, model it as a collected note effect so the sheet can surface it deterministically.

Cleric Domain choices use existing effects where possible: Knowledge uses `INCREASE_TRADE_MASTERY_CAP` for the five Knowledge Trades, Dark uses `GRANT_SENSE` with `increase_existing` for Darkvision, Divination uses `GRANT_CONDITION_IMMUNITY:flanked`, and descriptive in-game effects are surfaced as `GRANT_ABILITY`. Hunter Subterranean Favored Terrain uses the same `GRANT_SENSE` pattern for Darkvision and Tremorsense.

---

## 2.1. GRANT_MOVEMENT Effect

### Purpose

The `GRANT_MOVEMENT` effect grants characters special movement types beyond standard ground movement. These include: climb, swim, fly, burrow, and glide.

### Structure

```typescript
{
  type: 'GRANT_MOVEMENT',
  target: 'climb' | 'swim' | 'fly' | 'burrow' | 'glide',
  value: 'equal_to_speed' | 'half_speed' | 'double_speed' | number
}
```

### Value Options

- `'equal_to_speed'`: Movement speed equals character's ground speed
- `'half_speed'`: Movement speed equals half of ground speed (rounded down)
- `'double_speed'`: Movement speed equals double ground speed
- Numeric value (e.g., `6`): Explicit movement speed in spaces

Rules that do not grant one of the five supported movement speeds should use
`GRANT_ABILITY` instead. Example: limited flight/hover rules are not PDF movement
checkboxes and should remain sheet-facing rules text until a dedicated surface
exists.

### Processing Flow

1. **Effect Resolution** (in `enhancedCharacterCalculator.ts`, movement processing block):
   - Filters resolved effects for `type === 'GRANT_MOVEMENT'`
   - Converts string formulas to numeric speeds:
     - `'equal_to_speed'` → ground speed
     - `'half_speed'` → floor(ground speed / 2)
     - `'double_speed'` → ground speed × 2
   - Creates movement entry with type, speed, and source

2. **Calculator Output**:
   - Populates `movements` array in `EnhancedCalculationResult`
   - Each entry: `{ type: string, speed: string, source: EffectSource }`

3. **PDF Export** (`transformers.ts`, `processMovements()`):
   - Helper function `processMovements()` converts movement array to PDF checkboxes
   - Compares movement speed to ground speed:
     - Full speed: `speed >= groundSpeed` → sets `full: true`
     - Half speed: `speed >= groundSpeed/2` → sets `half: true`
   - Populates PDF fields: `movement.climb`, `movement.swim`, etc.

### Examples

#### Hunter - Favored Terrain: Mountain

```typescript
{
  type: 'GRANT_MOVEMENT',
  target: 'climb',
  value: 'equal_to_speed'
}
```

Character with ground speed 6 gains climb speed 6.

#### Beastborn - Burrow Speed

```typescript
{
  type: 'GRANT_MOVEMENT',
  target: 'burrow',
  value: 'half_speed'
}
```

Character with ground speed 6 gains burrow speed 3 (half speed).

#### Elf - Climb Speed

```typescript
{
  type: 'GRANT_MOVEMENT',
  target: 'climb',
  value: 'equal_to_speed'
}
```

### Common Usage Patterns

- **Ancestry Traits**: Many ancestries grant movement types (e.g., Beastborn variations, Elf climb, Terraborn burrow)
- **Class Features**: Hunter's Favored Terrain grants situational movement types
- **Multiple Sources**: A character can have multiple movement types from different sources
- **Speed Modifications**: Use `MODIFY_STAT` targeting `moveSpeed` to change ground speed; `GRANT_MOVEMENT` with `equal_to_speed` automatically updates

### Implementation Notes

- Movement types are case-sensitive: use lowercase `'climb'`, not `'Climb'`
- Movement speeds are emitted as strings in the calculator output after formula resolution
- PDF export only recognizes: `burrow`, `swim`, `fly`, `climb`, `glide`
- Unrecognized movement types should not be authored as `GRANT_MOVEMENT`

### Related Effects

- `MODIFY_STAT` with `target: 'moveSpeed'`: Modifies ground speed
- `MODIFY_STAT` with `target: 'jump_distance'`: Affects jumping ability

### Testing

Movement effects can be verified by:

1. Checking `movements` array in calculation result
2. Inspecting PDF export checkboxes for movement types
3. E2E tests with characters having movement-granting features

---

## 2.2. Condition Interaction Effects (v0.10)

### Purpose

Condition interaction effects allow features to grant immunities, resistances, or vulnerabilities to specific conditions.

### Effect Types

```typescript
interface GrantConditionImmunityEffect {
	type: 'GRANT_CONDITION_IMMUNITY';
	target: string; // Condition ID
	value: boolean;
	details?: string; // Optional explanation for UI
}

interface GrantConditionResistanceEffect {
	type: 'GRANT_CONDITION_RESISTANCE';
	target: string; // Condition ID
	value: 'advantage' | 'reduction' | 'half';
	// - 'advantage': ADV on saves against this condition
	// - 'reduction': Reduce condition stacks by 1
	// - 'half': Halve the effect severity
	source?: string;
}

interface GrantConditionVulnerabilityEffect {
	type: 'GRANT_CONDITION_VULNERABILITY';
	target: string; // Condition ID
	value: 'disadvantage' | 'double';
	// - 'disadvantage': DisADV on saves against this condition
	// - 'double': Double the condition stacks or effect severity
	source?: string;
}
```

`Poisoned` is not part of the universal v0.10.5 condition catalog. It remains available to the aggregator as an effect-specific affliction target for poisons and legacy authored effects, without adding universal Poisoned mechanics to active condition analysis.

### Processing Flow

1. **Aggregation** (`conditionAggregator.ts`):
   - Scans ancestry traits, class features, subclass features, and talents
   - Collects all condition-related effects with source attribution
   - Groups interactions by canonical condition ID, including stacking IDs normalized to `*-x`
   - Preserves resistance/vulnerability detail text from effect values

2. **UI Display** (`Conditions.tsx`):
   - Shows immunities, resistances, and vulnerabilities separately
   - Allows searching all conditions
   - Displays source of each interaction

### Condition IDs (from `conditions.data.ts`)

Universal: `bleeding`, `blinded`, `burning-x`, `charmed`, `dazed-x`, `deafened`, `disoriented-x`, `exhaustion-x`, `frightened`, `grappled`, `hidden`, `immobilized`, `impaired-x`, `incapacitated`, `intimidated`, `invisible`, `paralyzed`, `petrified`, `prone`, `restrained`, `slowed-x`, `stunned-x`, `surprised`, `taunted`, `terrified`, `unconscious`, `weakened-x`

Effect-specific affliction target: `poisoned`.

### Example Usage

```typescript
// Dwarf trait: Dwarven Resilience
{
  type: 'GRANT_CONDITION_RESISTANCE',
  target: 'poisoned',
  value: 'advantage'  // ADV on saves vs Poisoned
}

// Example: condition vulnerability
{
  type: 'GRANT_CONDITION_VULNERABILITY',
  target: 'frightened',
  value: 'disadvantage'  // DisADV on saves vs Frightened
}
```

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
  1.  Extend union in `character.schema.ts`
  2.  Implement handling in the calculator (aggregation and/or breakdown)
  3.  Add tests

---

## 5. Acceptance Criteria

- Adding an effect with `target: 'mpMax'` increases MP Max and appears in breakdowns.
- Choice-based grant (`any_skill`) prompts once and persists to calculation and UI.
- Mastery cap effects correctly expand `maxAdeptCount` and validation passes when within budget.

---

## 6. Schema Alignment Notes

### Generic vs Canonical Effect Schemas

Two effect schema representations exist in the codebase:

1. **Canonical Effect Union** (`character.schema.ts`):
   - Strongly typed discriminated union with specific effect interfaces
   - Each effect type has explicit `type`, `target`, and `value` constraints
   - Example: `GrantConditionResistanceEffect` with `value: 'advantage' | 'reduction' | 'half'`

2. **Generic Zod Schema** (`class.schema.ts`):
   - Loose validation with `type: z.string()` and `value: z.any()`
   - Used for runtime validation of class feature data files
   - Less strict than TypeScript types

**Current State:** These schemas are intentionally decoupled. The Zod schema validates data files flexibly, while the TypeScript union provides IDE support and compile-time safety.

**Future Consideration:** A stricter Zod schema could be generated from the canonical union using `z.discriminatedUnion()`, but would require data migration.

---

## 7. References

- `docs/systems/TRAITS_SYSTEM.MD`
- `docs/systems/CLASS_SYSTEM.MD`
- `docs/systems/CALCULATION_SYSTEM.MD`

---

> Last updated: 2026-02-06
> Maintainer: @DC20Clean-Team
