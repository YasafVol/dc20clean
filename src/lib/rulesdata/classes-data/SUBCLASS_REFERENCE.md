# DC20 Subclass Reference

> **Last Updated:** October 7, 2025  
> **Schema Version:** 2.1.0  
> **Status:** Current implementation state (intentional)

## Overview

This document provides a complete reference for all subclasses available in DC20Clean. Each class gains access to subclass selection at **Level 3**.

## Subclass Availability by Class

### Classes with 2 Subclasses

| Class | Subclass 1 | Subclass 2 |
|-------|-----------|-----------|
| **Barbarian** | Elemental Fury | Spirit Guardian |
| **Bard** | Eloquence | Jester |
| **Cleric** | Inquisitor | Priest |
| **Commander** | Crusader | Warlord |
| **Druid** | Phoenix | Rampant Growth |
| **Monk** | Astral Self | Shifting Tide |
| **Rogue** | Long Death | Swashbuckler |
| **Sorcerer** | Angelic | Draconic |
| **Spellblade** | Paladin | Rune Knight |
| **Warlock** | Eldritch | Fey |

### Classes with 1 Subclass

| Class | Subclass |
|-------|----------|
| **Wizard** | Portal Mage |

### Classes with 0 Subclasses (Pending Implementation)

| Class | Status |
|-------|--------|
| **Champion** | No subclasses defined |
| **Hunter** | No subclasses defined |

---

## Implementation Details

### File Structure

Each class's subclasses are defined in:
```
src/lib/rulesdata/classes-data/features/{class}_features.ts
```

### Subclass Schema

```typescript
interface Subclass {
  subclassName: string;
  description?: string; // Optional - some subclasses may not have descriptions
  features: ClassFeature[];
  levelGained?: number; // Default: undefined (available from start)
}
```

### Level Requirements

- **Level 1-2:** No subclass selection available
- **Level 3+:** Subclass choice becomes available
- All current subclasses have `levelGained: undefined`, meaning they're available as soon as subclass selection opens at level 3

---

## Subclass Details

### Barbarian

#### Elemental Fury
- **File:** `barbarian_features.ts` (line 204)
- **Description:** Harness primal elemental forces
- **Features:** Multiple elemental-themed abilities

#### Spirit Guardian
- **File:** `barbarian_features.ts` (line 347)
- **Description:** Channel ancestral spirits
- **Features:** Spirit-based protective and offensive abilities

### Bard

#### Eloquence
- **File:** `bard_features.ts` (line 192)
- **Description:** Master of persuasion and inspiration
- **Features:** Enhanced charisma-based abilities

#### Jester
- **File:** `bard_features.ts` (line 256)
- **Description:** Trickster and entertainer
- **Features:** Deceptive and unpredictable abilities

### Cleric

#### Inquisitor
- **File:** `cleric_features.ts` (line 221)
- **Description:** Agent of divine justice
- **Features:** Investigation and holy retribution abilities

#### Priest
- **File:** `cleric_features.ts` (line 239)
- **Description:** Traditional healer and spiritual guide
- **Features:** Enhanced healing and support magic

### Commander

#### Crusader
- **File:** `commander_features.ts` (line 189)
- **Description:** Holy warrior leading the faithful
- **Features:** Divine combat leadership abilities

#### Warlord
- **File:** `commander_features.ts` (line 244)
- **Description:** Tactical battlefield commander
- **Features:** Strategic positioning and command abilities

### Druid

#### Phoenix
- **File:** `druid_features.ts` (line 187)
- **Description:** Master of rebirth and fire
- **Features:** Fire-based regeneration abilities

#### Rampant Growth
- **File:** `druid_features.ts` (line 249)
- **Description:** Champion of untamed nature
- **Features:** Plant and growth manipulation

### Monk

#### Astral Self
- **File:** `monk_features.ts` (line 221)
- **Description:** Channel cosmic energy
- **Features:** Astral projection and spiritual combat

#### Shifting Tide
- **File:** `monk_features.ts` (line 270)
- **Description:** Flow like water
- **Features:** Adaptive and fluid combat style

### Rogue

#### Long Death
- **File:** `rogue_features.ts` (line 112)
- **Description:** Master of assassination
- **Features:** Death-dealing precision strikes

#### Swashbuckler
- **File:** `rogue_features.ts` (line 141)
- **Description:** Dashing duelist
- **Features:** Flashy and mobile combat style

### Sorcerer

#### Angelic
- **File:** `sorcerer_features.ts` (line 204)
- **Description:** None (features define the subclass)
- **Features:** Celestial Spark, radiant abilities
- **Note:** No subclass-level description

#### Draconic
- **File:** `sorcerer_features.ts` (line 267)
- **Description:** None (features define the subclass)
- **Features:** Draconic heritage and elemental powers
- **Note:** No subclass-level description

### Spellblade

#### Paladin
- **File:** `spellblade_features.ts` (line 225)
- **Description:** Holy warrior blending magic and martial prowess
- **Features:** Divine smite-style abilities

#### Rune Knight
- **File:** `spellblade_features.ts` (line 283)
- **Description:** Arcane warrior using runic magic
- **Features:** Rune-enhanced combat abilities

### Warlock

#### Eldritch
- **File:** `warlock_features.ts` (line 173)
- **Description:** Pact with alien entities
- **Features:** Eldritch blast enhancements and otherworldly powers

#### Fey
- **File:** `warlock_features.ts` (line 238)
- **Description:** Pact with fey creatures
- **Features:** Charm, illusion, and nature-themed abilities

### Wizard

#### Portal Mage
- **File:** `wizard_features.ts` (line 161)
- **Description:** Master of teleportation and dimensional magic
- **Features:** Portal creation and spatial manipulation

---

## Testing

Comprehensive unit tests verify subclass availability:

**Test File:** `src/lib/rulesdata/classes-data/features/subclasses.test.ts`

**Test Coverage:**
- ✅ 73 tests passing (as of October 7, 2025)
- Verifies subclass array exists for all classes
- Confirms correct subclass counts
- Validates subclass names match definitions
- Checks for unique subclass names
- Ensures all subclasses have at least one feature

**Run Tests:**
```bash
npm run test:unit -- subclasses.test.ts
```

---

## Future Additions

### Champion Subclasses (Planned)
- TBD - awaiting game design specifications

### Hunter Subclasses (Planned)
- TBD - awaiting game design specifications

---

## Notes for Developers

1. **When adding a new subclass:**
   - Add to appropriate `{class}_features.ts` file
   - Update this reference document
   - Update test expectations in `subclasses.test.ts`
   - Ensure `levelGained` is set appropriately (default: undefined for level 3)

2. **Subclass descriptions are optional:**
   - Some subclasses (e.g., Sorcerer) rely on feature names/descriptions instead
   - This is intentional and valid

3. **Level 3 is the standard:**
   - All subclass selections currently happen at level 3
   - This is enforced by the UI (`SubclassSelector.tsx`)

4. **Data-driven UI:**
   - `SubclassSelector` component reads directly from `*_features.ts` files
   - No hardcoding of subclass lists in UI components
   - Dynamic rendering based on `levelGained` and current character level

---

## Related Documentation

- **Class System:** `docs/systems/CLASS_SYSTEM.MD`
- **Leveling Epic:** `docs/plannedSpecs/LEVELING_EPIC.md`
- **Character Schema:** `src/lib/rulesdata/schemas/character.schema.ts`
- **Class Utils:** `src/lib/rulesdata/classes-data/classUtils.ts`

