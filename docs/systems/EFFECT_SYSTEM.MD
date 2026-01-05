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

> Last updated: 2025-10-10 (Movement system implementation)
> Maintainer: @DC20Clean-Team
