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
- **Condition interactions (v0.10)**: `GRANT_CONDITION_IMMUNITY`, `GRANT_CONDITION_RESISTANCE`, `GRANT_CONDITION_VULNERABILITY`

Stacking: Numeric effects sum; grants de-duplicate by `id/name`.

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

1. **Effect Resolution** (`enhancedCharacterCalculator.ts`, line ~1315):
   - Filters resolved effects for `type === 'GRANT_MOVEMENT'`
   - Converts string formulas to numeric speeds:
     - `'equal_to_speed'` → ground speed
     - `'half_speed'` → floor(ground speed / 2)
     - `'double_speed'` → ground speed × 2
   - Creates movement entry with type, speed, and source

2. **Calculator Output**:
   - Populates `movements` array in `EnhancedCalculationResult`
   - Each entry: `{ type: string, speed: string, source: EffectSource }`

3. **PDF Export** (`transformers.ts`, line ~10):
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
}

interface GrantConditionResistanceEffect {
	type: 'GRANT_CONDITION_RESISTANCE';
	target: string; // Condition ID
	value: number; // e.g., 1 for Resistance (1)
}

interface GrantConditionVulnerabilityEffect {
	type: 'GRANT_CONDITION_VULNERABILITY';
	target: string; // Condition ID
	value: number; // e.g., 1 for Vulnerability (1)
}
```

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
  value: 1
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

## 6. References

- `docs/systems/TRAITS_SYSTEM.MD`
- `docs/systems/CLASS_SYSTEM.MD`
- `docs/systems/CALCULATION_SYSTEM.MD`

---

> Last updated: 2026-01-05 (Added condition interaction effects for v0.10)
> Maintainer: @DC20Clean-Team
