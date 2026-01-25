### **File: `docs/systems/LEVELING_SYSTEM.MD`**

````markdown
# DC20Clean – Leveling System

> **Purpose**  
> This document is the single authoritative reference for the character leveling system. It outlines the data flow, calculation logic, and UI interactions required to create a character at any level from 1 to 10 (DC20 v0.10 max level).
>
> **Status:** ✅ **Complete** - All core leveling functionality implemented, tested, and DC20 v0.10 compliant. All 29 gaps fixed per `docs/archive/LEVELING_GAPS_SPEC.md`.
> **Last Updated:** January 25, 2026

---

## 1. High-Level Pipeline

The leveling system integrates directly into the character creation flow. It is initiated by a user selecting a target level at the start of the process. The core logic is handled by the `enhancedCharacterCalculator`, which aggregates all stats and choices granted up to that level.

```mermaid
flowchart TD
    subgraph "Input"
        A["User selects Class and Level (1-10)"]
    end

    subgraph "Engine"
        B{"enhancedCharacterCalculator"}
    end

    subgraph "Data Sources"
        C1["/rulesdata/classes-data/progressions/*.progression.ts"]
        C2["/rulesdata/classes-data/talents/*.ts"]
        C3["/rulesdata/progression/paths/*.ts"]
    end

    subgraph "Output"
        D["Aggregated Budgets & Choices\n(Total Points, Talents, Paths, etc.)"]
    end

    subgraph "UI Flow"
        E["Character Creation Stages"]
    end

    A --> B
    C1 & C2 & C3 --> B
    B -- "Calculates totals for target level" --> D
    D -- "Populates budgets for each stage" --> E
```
````

---

## 2. Key Files & Their Roles

| Layer              | File / Dir                                                     | Responsibility                                                                                             |
| ------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Rule Data**      | `src/lib/rulesdata/classes-data/progressions/*.progression.ts` | **(New)** Defines level-by-level stat gains and choices (Talents, Paths, etc.) for each class.             |
|                    | `src/lib/rulesdata/classes-data/talents/`                      | **(New)** Defines all General, Class, and Multiclass Talents.                                              |
|                    | `src/lib/rulesdata/progression/paths/`                         | Defines the Martial and Spellcaster Path progressions.                                                     |
| **Type Contracts** | `src/lib/rulesdata/schemas/class.schema.ts`                    | Defines the `LevelGains` and `ClassLevel` interfaces for the new progression files.                        |
|                    | `src/lib/rulesdata/classes-data/talents/talent.types.ts`        | Defines the `Talent` interface.                                                                            |
| **Runtime Engine** | `src/lib/services/enhancedCharacterCalculator.ts`              | Aggregates all stats and choices from level 1 up to the user's selected target level.                      |
| **State Layer**    | `src/lib/stores/characterContext.tsx`                          | Stores the user's target level and all their subsequent choices.                                           |
| **UI**             | `src/routes/character-creation/CharacterCreation.tsx`          | Orchestrates the multi-stage flow, conditionally showing the "Leveling" stage.                             |
|                    | `src/routes/character-creation/LevelingChoices.tsx`            | **(New)** A dedicated UI component for spending accumulated Talent and Path Points.                        |

---

## 3. Core Mechanics & Logic

### 3.1. Level Selection

- A dropdown will be added to **Stage 1: Class & Features** allowing the user to select a starting level from 1 to 10.
- This selection is stored in the `characterContext` and is a primary input for the `enhancedCharacterCalculator`.
- **Note**: DC20 v0.10 is a level 1-10 system (not 1-20).

### 3.2. Aggregation Engine

- The calculator will read the character's `classId` and `level`.
- It will then iterate through the corresponding `...progression.ts` file from `level: 1` to the target `level`.
- In each iteration, it will sum the values from the `gained...` properties (e.g., `gainedHealth`, `gainedAttributePoints`) and the `gains` object (e.g., `talents`, `pathPoints`).
- The final output is a single set of budgets that represents the character's total resources for their level.

### 3.3. Conditional "Leveling Choices" Stage

- This new stage will appear at **Step 2** if the character's target level is greater than 1.
- It will contain two sections:
  1.  **Talent Selection:** Allows the user to choose from General, Class, and Multiclass talents until their `talentsToChoose` budget is 0.
  2.  **Path Point Allocation:** Allows the user to spend their `pathPointsToSpend` budget on the Martial and Spellcaster paths.
- The "Next" button for this stage will be disabled until all points are spent.

### 3.4. Path Point Bonuses (M3.9 - ✅ IMPLEMENTED)

Path points grant immediate bonuses to character resources based on allocation:

**Martial Path Progression (DC20 v0.10 p.161):**
| Path Level | Stamina Points | Maneuvers Learned |
|------------|----------------|-------------------|
| 1 | +1 | +1 |
| 2 | — | +1 |
| 3 | +1 | +1 |
| 4 | — | +1 |

**Spellcaster Path Progression (DC20 v0.10 p.161):**
| Path Level | Mana Points | Cantrips Learned | Spells Learned |
|------------|-------------|------------------|----------------|
| 1 | +3 | +1 | +1 |
| 2 | +2 | +1 | — |
| 3 | +2 | +1 | +1 |
| 4 | +2 | — | +1 |

**Cross-Path Special Rules (DC20 v0.10 p.161):**

- **Martial classes taking Spellcaster Path:** Gain a Spell List of their choice from any Class when first investing in the path.
- **Spellcaster classes taking Martial Path:** Gain "Spellcaster Stamina Regen" - Once per round, regain up to half maximum SP when using a Spell Enhancement.

**Implementation:**

- Path bonuses are calculated by `aggregatePathBenefits()` in `enhancedCharacterCalculator.ts`
- Cross-path grants returned in `crossPathGrants` object
- Bonuses are added to base progression gains in `aggregateProgressionGains()`
- Data source: `src/lib/rulesdata/progression/paths/paths.data.ts`
- Type: `pathPointAllocations?: { martial?: number; spellcasting?: number }` in `EnhancedCharacterBuildData`

**Example (Level 5 Barbarian with 2 martial path points):**

- SP: 1 (L1) + 1 (L3) + 1 (path L1) = **3**
- Maneuvers: 4 (L1) + 1 (L5) + 1 (path L1) + 1 (path L2) = **7**

### 3.5. Dynamic Budgeting in Subsequent Stages

- **Ancestry (Stage 3):** The "Ancestry Points Remaining" counter will be initialized with `5 + aggregated ancestryPoints`.
- **Attributes (Stage 4):** The "Attribute Points Remaining" counter will be initialized with `12 + aggregated attributePoints`.
- **Background (Stage 5):** The Skill, Trade, and Language point counters will be initialized with their base values plus any aggregated points from the progression tables.

---

## 4. Acceptance Criteria

- A user can select a starting level of 3 for a Barbarian.
- The "Leveling Choices" stage appears, showing a budget of **1 Talent** and **1 Path Point** to spend (from the Level 2 progression).
- The "Attributes" stage shows a budget of **13 Attribute Points** (12 base + 1 from Level 3 progression).
- The final saved character sheet correctly reflects all stats and features for a Level 3 Barbarian.

---

## 5. References

- `docs/systems/CLASS_SYSTEM.MD` – Defines the class data structure.
- `docs/systems/EFFECT_SYSTEM.MD` – Defines the `Effect` types used by Talents.
- `docs/systems/CALCULATION_SYSTEM.MD` – Outlines the core calculation engine that will be enhanced.

---

## 6. Implementation Status

| Milestone                           | Status      | Description                                                             |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------- |
| M3.9: Combat Mastery & Path Bonuses | ✅ **DONE** | Combat mastery formula fixed, path bonuses integrated into calculations |
| M3.10: Subclass Selection           | ✅ **DONE** | UI for subclass choice at level 3, validation, feature application      |

---

> _Last updated: January 25, 2026_  
> _Maintainer: @DC20Clean-Team_

---

## 10. Multiclass System

### 10.1. Overview

The multiclass system allows characters to gain features from other classes by spending **Talent Points** acquired through leveling. Characters can select from 6 different multiclass tiers, each unlocking at specific character levels and with specific prerequisites.

---

### 10.2. Multiclass Tiers

#### 10.2.1. Tier Definitions

| Tier            | Level Required | Target Feature Level                   | Subclass Support | Prerequisites                    |
| --------------- | -------------- | -------------------------------------- | ---------------- | -------------------------------- |
| **Novice**      | 2              | 1st level core features                | No               | None                             |
| **Adept**       | 4              | 2nd level core features                | No               | None                             |
| **Expert**      | 7              | 5th level core OR 3rd level subclass   | Yes              | 1+ class features from target    |
| **Master**      | 10             | 6th level subclass features only       | Yes (only)       | 1+ subclass features from target |
| **Grandmaster** | 13             | 8th level core features (capstone)     | No               | 2+ class features from target    |
| **Legendary**   | 17             | 9th level subclass features (capstone) | Yes (only)       | 2+ subclass features from target |

#### 10.2.2. Tier Details

**Novice Multiclass**

- Available at character level 2+
- Select any 1st level class feature from any class
- No prerequisites
- Cost: 1 Talent Point

**Adept Multiclass**

- Available at character level 4+
- Select any 2nd level class feature from any class
- No prerequisites
- Cost: 1 Talent Point

**Expert Multiclass**

- Available at character level 7+
- Select either:
  - A 5th level core class feature, OR
  - A 3rd level subclass feature
- Prerequisite: Must have at least 1 class feature from the target class
- Cost: 1 Talent Point

**Master Multiclass**

- Available at character level 10+
- Select a 6th level subclass feature (subclass features only)
- Prerequisite: Must have at least 1 subclass feature from the target subclass
- Cost: 1 Talent Point

**Grandmaster Multiclass**

- Available at character level 13+
- Select an 8th level class capstone feature from any class
- Prerequisite: Must have at least 2 class features from the target class
- Cost: 1 Talent Point

**Legendary Multiclass**

- Available at character level 17+
- Select a 9th level subclass capstone feature (subclass features only)
- Prerequisite: Must have at least 2 subclass features from the target subclass
- Cost: 1 Talent Point

---

### 10.3. Implementation

#### 10.3.1. Data Structure

**Location:** `src/lib/rulesdata/progression/multiclass.ts`

```typescript
export type MulticlassTier = 'novice' | 'adept' | 'expert' | 'master' | 'grandmaster' | 'legendary';

export interface MulticlassTierDefinition {
	id: MulticlassTier;
	name: string;
	levelRequired: number;
	description: string;
	targetLevel: number; // Feature level to select
	includeSubclass: boolean; // Whether subclass features are available
	subclassLevel?: number; // Subclass feature level if applicable
	subclassOnly?: boolean; // If true, ONLY subclass features (no core)
	minClassFeatures: number; // Prerequisite: min class features owned
	minSubclassFeatures: number; // Prerequisite: min subclass features owned
}

export const MULTICLASS_TIERS: MulticlassTierDefinition[];
export function getMulticlassTier(tierId: MulticlassTier): MulticlassTierDefinition | undefined;
export function getAvailableMulticlassTiers(characterLevel: number): MulticlassTierDefinition[];
```

#### 10.3.2. UI Flow

**Location:** `src/routes/character-creation/LevelingChoices.tsx`

1. User selects character level during creation
2. System calculates available multiclass tiers based on level
3. UI displays only tiers meeting level requirements
4. System validates prerequisites (feature ownership)
5. Eligible classes filtered based on prerequisite counts
6. User selects class from dropdown
7. System displays available features as cards:
   - Core class features (if applicable)
   - Subclass features (if tier supports them)
8. User clicks feature card to select
9. Selection persisted to character context

**Feature Display:**

- Each feature shown as an expandable card
- Card shows: Feature name, level, full description
- Selected feature highlighted with a "Selected" badge
- Path-related features (Martial Path, Spellcaster Path) automatically filtered out

#### 10.3.3. Effects Application

**Location:** `src/lib/services/enhancedCharacterCalculator.ts`

Multiclass feature effects are applied in `aggregateAttributedEffects()`:

1. Reads `selectedMulticlassFeature` and `selectedMulticlassClass` from build data
2. Loads class definition using `findClassByName()`
3. Finds selected feature in class's `coreFeatures` array
4. Extracts feature's `effects` array
5. Adds each effect to the effects pipeline with source type `'multiclass_feature'`
6. Effects resolve alongside trait, talent, and class effects
7. Final stats reflect multiclass feature bonuses

**Effect Attribution:**

```typescript
{
  source: {
    type: 'multiclass_feature',
    id: `multiclass_${classId}_${featureName}`,
    name: featureName,
    description: feature.description,
    category: 'Multiclass Feature'
  },
  resolved: !effect.userChoice,
  dependsOnChoice: effect.userChoice ? `multiclass_${featureName}` : undefined
}
```

#### 10.3.4. Persistence

**Location:** `src/lib/services/characterCompletion.ts`, `src/lib/types/dataContracts.ts`

Multiclass selections saved to `SavedCharacter`:

```typescript
interface SavedCharacter {
	// ... other fields
	selectedMulticlassOption?:
		| 'novice'
		| 'adept'
		| 'expert'
		| 'master'
		| 'grandmaster'
		| 'legendary'
		| null;
	selectedMulticlassClass?: string; // Class ID
	selectedMulticlassFeature?: string; // Feature name
}
```

Selections persist across:

- Character save
- Character load
- Level-up respeccing
- Character export

---

### 10.4. Prerequisites & Validation

#### 10.4.1. Prerequisite Checks

**Feature Counting:**

```typescript
// Count class features from main class progression
getOwnedClassFeatures(classId): number {
  if (classId === mainClassId) {
    return resolvedProgression.unlockedFeatureIds.length;
  }
  // TODO: Count multiclass features when tracking implemented
  return 0;
}

// Estimate subclass features based on level
getOwnedSubclassFeatures(classId): number {
  if (classId === mainClassId && hasSubclass && level >= 3) {
    return [3, 6, 9, 12, 15, 18].filter(l => l <= level).length;
  }
  return 0;
}
```

**Tier Validation:**

```typescript
meetsMulticlassPrerequisites(tier): boolean {
  // Check level
  if (level < tier.levelRequired) return false;

  // Check feature count prerequisites
  if (tier.minClassFeatures > 0) {
    return getOwnedClassFeatures(mainClassId) >= tier.minClassFeatures;
  }

  if (tier.minSubclassFeatures > 0) {
    return getOwnedSubclassFeatures(mainClassId) >= tier.minSubclassFeatures;
  }

  return true;
}
```

**Class Filtering:**

```typescript
getEligibleClasses(): ClassData[] {
  // Novice/Adept: All classes
  if (tier.minClassFeatures === 0 && tier.minSubclassFeatures === 0) {
    return allClasses;
  }

  // Expert/Grandmaster: Only classes with N+ class features
  if (tier.minClassFeatures > 0) {
    return allClasses.filter(cls =>
      getOwnedClassFeatures(cls.id) >= tier.minClassFeatures
    );
  }

  // Master/Legendary: Only classes with N+ subclass features
  return allClasses.filter(cls =>
    getOwnedSubclassFeatures(cls.id) >= tier.minSubclassFeatures
  );
}
```

#### 10.4.2. Current Limitations

- Prerequisite checks only count features from **main class**
- Multiclass feature ownership not yet tracked
- Per-class validation not yet per-class (checks global count)
- Will be enhanced when multiclass feature tracking implemented

---

### 10.5. Subclass Feature Support

#### 10.5.1. Tiers with Subclass Support

**Expert (Level 7):**

- Shows both core features (level 5) AND subclass features (level 3)
- User can choose either type
- Subclass features prefixed with subclass name: "Berserker: Rage Enhancement"

**Master (Level 10):**

- Shows ONLY subclass features (level 6)
- No core class features available
- Must meet subclass prerequisite (1+ subclass feature)

**Legendary (Level 17):**

- Shows ONLY subclass features (level 9, capstones)
- No core class features available
- Must meet subclass prerequisite (2+ subclass features)

#### 10.5.2. Feature Display Format

```typescript
// Subclass features prefixed for clarity
{
  featureName: `${subclassName}: ${originalFeatureName}`,
  description: `${subclassDescription}\n\n${featureDescription}`.trim(),
  // ... other feature properties
}
```

---

### 10.6. Testing

#### 10.6.1. Unit Tests

**Location:** `src/lib/rulesdata/progression/multiclass.test.ts`

**Coverage:** 31 tests

- Data integrity (6 tiers, unique IDs, ordering)
- Individual tier property validation
- Prerequisite requirement verification
- `getMulticlassTier()` functionality
- `getAvailableMulticlassTiers()` level filtering
- Subclass support flag validation

**Run Tests:**

```bash
npm run test:unit -- multiclass.test.ts
```

#### 10.6.2. Manual Testing Checklist

- [ ] Level 2 character sees only Novice tier
- [ ] Level 4 character sees Novice + Adept
- [ ] Level 7 character sees first 3 tiers
- [ ] Expert tier shows both core and subclass features
- [ ] Master tier shows only subclass features
- [ ] Selected feature persists after save
- [ ] Multiclass effects apply to character stats
- [ ] Level-up preserves multiclass selection
- [ ] Path features filtered from selection

---

### 10.7. Future Enhancements

#### 10.7.1. Planned Features

1. **Multiclass Feature Tracking**
   - Track which class/subclass each multiclass feature came from
   - Enable proper prerequisite validation per source class
   - Support multiple multiclass features from different classes

2. **Advanced Prerequisites**
   - "Must have 1 feature from THIS class" (not just ANY class)
   - "Must have 1 subclass feature from THIS subclass"
   - Track feature sources for accurate validation

3. **Feature Choice Resolution**
   - Handle multiclass features with nested choices
   - Store and apply choice-based effects
   - UI for resolving multiclass feature choices

4. **Multiple Multiclass Selections**
   - Allow spending multiple talent points on multiclass
   - Track multiple multiclass features simultaneously
   - Manage complex prerequisite chains

---

### 10.8. Related Systems

- **Talent System** (`src/lib/rulesdata/classes-data/talents/`) - Source of talent points
- **Effect System** (`src/lib/types/effectSystem.ts`) - Effect application framework
- **Calculator** (`src/lib/services/enhancedCharacterCalculator.ts`) - Stat calculation
- **Character Context** (`src/lib/stores/characterContext.tsx`) - State management
- **Level Caps** (`src/lib/rulesdata/progression/levelCaps.ts`) - Level-based limits

---

### 10.9. References

- **Milestone:** M3.17 in `docs/archive/LEVELING_EPIC.md`
- **Commits:** `a28e057`, `3c9deed`, `2764c1f`, `e017d8d`, `37916de`, `ddcfe11`, `5b6da20`, `6f0de71`
- **Tests:** `src/lib/rulesdata/progression/multiclass.test.ts` (31 tests)

---

## 11. System Integration Summary

The leveling system is now a comprehensive, data-driven pipeline that handles:

1. ✅ **Class Selection** - All 13 classes with progression tables (v0.10)
2. ✅ **Level Selection** - Characters from level 1 to 10 (DC20 v0.10 max)
3. ✅ **Attribute Caps** - Dynamic caps based on level from `levelCaps.ts`
4. ✅ **Mastery Caps** - Level-based skill/trade mastery limits
5. ✅ **Talent System** - General, class, and multiclass talents
6. ✅ **Path Points** - Martial and Spellcaster path progression
7. ✅ **Subclass Selection** - Dynamic subclass choice at level 3+
8. ✅ **Multiclass Features** - 6-tier multiclass talent system
9. ✅ **Effect Application** - All features apply effects to stats
10. ✅ **Persistence** - Complete save/load/level-up support

**Status:** ✅ Complete - All implementation and testing milestones finished. DC20 v0.10 compliant.

- See `docs/archive/LEVELING_EPIC.md` for full milestone history
- See `docs/archive/LEVELING_GAPS_SPEC.md` for v0.10 compliance fixes (29 gaps addressed)

---

```

```
