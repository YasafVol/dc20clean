# DC20Clean – Effect System

> Purpose: Canonical catalog of `Effect.type` semantics, targets, choice resolution, and stacking rules used across Traits and Class Features.
> Status: Active
> Last Updated: 2026-02-06

---

## 1. Key Files & Roles

- `src/lib/rulesdata/schemas/character.schema.ts` — authoritative `Effect` union, `TraitRequirements` interface
- `src/lib/services/enhancedCharacterCalculator.ts` — orchestrator calling effect collection modules
- `src/lib/services/calculatorModules/effectCollection.ts` — effect aggregation and choice resolution
- `src/lib/services/calculatorModules/abilityCollection.ts` — collects grants (abilities, movements, resistances, vulnerabilities, senses, combat training)
- Producers: Traits (`ancestries/traits.ts`), Class Features (`classes-data/features/*`)

---

## 2. Complete Effect Type Reference

All effect types are defined in `character.schema.ts` as a discriminated union. There are 22 types total.

### Numeric Modifiers

| Type | Target | Value | Special Fields | Stacking |
| --- | --- | --- | --- | --- |
| `MODIFY_STAT` | stat name (`hpMax`, `spMax`, `mpMax`, `pd`, `ad`, `skillPoints`, `tradePoints`, `languagePoints`, `moveSpeed`, `jumpDistance`, `attackSpellCheck`, `saveDC`, `maneuversKnown`, `ancestryPoints`, `attributePoints`) | `number` | `condition?: string` (e.g., `while_raging`, `not_wearing_armor`) | Sums |
| `MODIFY_ATTRIBUTE` | attribute name (`might`, `agility`, `charisma`, `intelligence`) | `number` | `userChoice?: { prompt, options? }` for `any_attribute` | Sums |
| `SET_VALUE` | stat name | `string \| number` | -- | Overwrites |

### Grants

| Type | Target | Value | Special Fields | Stacking |
| --- | --- | --- | --- | --- |
| `GRANT_ABILITY` | ability name | `string` (description) | -- | De-duplicates |
| `GRANT_RESISTANCE` | damage type | `string \| number \| boolean` | `optional?: string` | De-duplicates; **collected by `abilityCollection.ts`** |
| `GRANT_VULNERABILITY` | damage type | `number` | -- | De-duplicates; **collected by `abilityCollection.ts`** |
| `GRANT_ADV_ON_SAVE` | save type | `string \| boolean` | -- | De-duplicates |
| `GRANT_ADV_ON_CHECK` | check type | `string \| boolean` | -- | De-duplicates |
| `GRANT_COMBAT_TRAINING` | training type (e.g., `Weapons`, `Spell_Focuses`) | `boolean` | -- | De-duplicates; **collected by `abilityCollection.ts`** |
| `GRANT_SENSE` | sense type (e.g., `darkvision`) | `number` (range) | -- | De-duplicates; **collected by `abilityCollection.ts`** |
| `GRANT_MOVEMENT` | movement type (`climb`, `swim`, `fly`, `burrow`, `glide`) | `string \| number` (`equal_to_speed`, `half_speed`, numeric) | -- | De-duplicates |
| `GRANT_CHOICE` | choice category | `number` | `userChoice?: { prompt, options? }` | Per-choice |
| `GRANT_SKILL_EXPERTISE` | skill name | `{ capIncrease, levelIncrease }` | `userChoice?: { prompt, count? }` | Per-skill |
| `GRANT_TRADE_EXPERTISE` | trade name | `{ capIncrease, levelIncrease }` | `userChoice?: { prompt }` | Per-trade |

### Spell and Maneuver Grants

| Type | Target | Value | Special Fields | Stacking |
| --- | --- | --- | --- | --- |
| `GRANT_SPELL` | spell restriction or specific spell | `number \| string` | `userChoice?: { prompt, options? }` | Per-slot |
| `GRANT_CANTRIP` | cantrip restriction | `number` | -- | Per-slot |
| `GRANT_MANEUVERS` | maneuver type or `all_attack` (access grant) | `number` | -- | Access grants don't add to budget; specific grants do |

### Mastery Cap Effects

| Type | Fields | Purpose |
| --- | --- | --- |
| `MODIFY_SKILL_MASTERY_CAP` | `tier` (`Adept` \| `Expert` \| `Master` \| `Grandmaster`), `count`, `options?` | Grant N skill slots at specified tier |
| `MODIFY_TRADE_MASTERY_CAP` | `tier`, `count`, `options?` | Grant N trade slots at specified tier |
| `INCREASE_SKILL_MASTERY_CAP` | `value` (number), `count`, `options?` | Increase mastery cap by value for N skills |
| `INCREASE_TRADE_MASTERY_CAP` | `value`, `count`, `options?` | Increase mastery cap by value for N trades |

### Condition Interaction Effects (v0.10)

| Type | Target | Value | Purpose |
| --- | --- | --- | --- |
| `GRANT_CONDITION_IMMUNITY` | condition ID | -- | Full immunity to condition |
| `GRANT_CONDITION_RESISTANCE` | condition ID | `advantage` \| `reduction` \| `half` | Partial resistance |
| `GRANT_CONDITION_VULNERABILITY` | condition ID | `disadvantage` \| `double` | Increased susceptibility |

### Effect Processing Pipeline

1. **Aggregation** (`effectCollection.ts::aggregateAttributedEffects()`): Collects effects from ancestry traits, class features, subclass features, talents, and feature choices. Each effect is tagged with its source.
2. **Choice Resolution** (`effectCollection.ts::resolveEffectChoices()`): Resolves effects with `userChoice` metadata (e.g., `any_attribute` → specific attribute based on user selection).
3. **Stat Application** (`statCalculation.ts::createStatBreakdown()`): Applies `MODIFY_STAT` and `MODIFY_ATTRIBUTE` effects to base values, producing breakdowns with per-source attribution.
4. **Grant Collection** (`abilityCollection.ts`): Collects all grant-type effects:
   - `collectGrantedAbilities()` — `GRANT_ABILITY` effects
   - `collectMovements()` — `GRANT_MOVEMENT` effects (with default Climb/Swim injection)
   - `collectResistances()` — `GRANT_RESISTANCE` effects (previously hardcoded empty)
   - `collectVulnerabilities()` — `GRANT_VULNERABILITY` effects (previously hardcoded empty)
   - `collectSenses()` — `GRANT_SENSE` effects (previously hardcoded empty)
   - `collectCombatTraining()` — `GRANT_COMBAT_TRAINING` effects (previously hardcoded empty)
   - `collectConditionalModifiers()` — conditional modifiers from `MODIFY_STAT` effects
5. **Condition Aggregation** (`conditionAggregator.ts`): Scans all effects for condition interactions and groups them by condition ID.

Stacking rules: Numeric effects (`MODIFY_STAT`, `MODIFY_ATTRIBUTE`) sum. Grants de-duplicate by target. Mastery cap effects accumulate slots.

---

## 2.1. GRANT_MOVEMENT Effect

### Purpose

The `GRANT_MOVEMENT` effect grants characters special movement types beyond standard ground movement. These include: climb, swim, fly, burrow, and glide.

### Structure

```typescript
{
  type: 'GRANT_MOVEMENT',
  target: string,  // movement type: 'climb' | 'swim' | 'fly' | 'burrow' | 'glide'
  value: string | number  // speed value or formula
}
```

### Value Options

- `'equal_to_speed'`: Movement speed equals character's ground speed
- `'half_speed'`: Movement speed equals half of ground speed (rounded down)
- `'double_speed'`: Movement speed equals double ground speed
- Numeric value (e.g., `6`): Explicit movement speed in spaces
- Other strings (e.g., `'wings'`): Passed through as-is for special handling

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
- Movement speeds are stored as strings in the movements array for flexibility
- PDF export only recognizes: `burrow`, `swim`, `fly`, `climb`, `glide`
- Unrecognized movement types are ignored in PDF export

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

> **Note:** The `conditionAggregator.ts` currently only checks effect types without processing the `value` field. Future enhancement should use the value to determine the specific kind of resistance/vulnerability.

### Processing Flow

1. **Aggregation** (`conditionAggregator.ts`):
   - Scans ancestry traits, class features, subclass features, and talents
   - Collects all condition-related effects with source attribution
   - Groups interactions by condition ID

2. **UI Display** (`Conditions.tsx`):
   - Shows immunities, resistances, and vulnerabilities separately
   - Allows searching all conditions
   - Displays source of each interaction

### Condition IDs (from `conditions.data.ts`)

`bleeding`, `blinded`, `burning`, `charmed`, `dazed-x`, `deafened`, `disoriented-x`, `exhaustion`, `frightened`, `grappled`, `hidden`, `immobilized`, `impaired-x`, `incapacitated`, `intimidated`, `invisible`, `paralyzed`, `petrified`, `poisoned-x`, `prone`, `restrained`, `slowed-x`, `stunned-x`, `surprised`, `taunted`, `terrified`, `unconscious`, `weakened-x`

### Example Usage

```typescript
// Dwarf trait: Dwarven Resilience
{
  type: 'GRANT_CONDITION_RESISTANCE',
  target: 'poisoned-x',
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
