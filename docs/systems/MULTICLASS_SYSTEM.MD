# Multiclass System

## 1. Overview

The multiclass system allows characters to gain features from other classes by spending **Talent Points** acquired through leveling. Characters can select from 6 different multiclass tiers, each unlocking at specific character levels and with specific prerequisites.

---

## 2. Multiclass Tiers

### 2.1. Tier Definitions

| Tier | Level Required | Target Feature Level | Subclass Support | Prerequisites |
|------|----------------|---------------------|------------------|---------------|
| **Novice** | 2 | 1st level core features | No | None |
| **Adept** | 4 | 2nd level core features | No | None |
| **Expert** | 7 | 5th level core OR 3rd level subclass | Yes | 1+ class features from target |
| **Master** | 10 | 6th level subclass features only | Yes (only) | 1+ subclass features from target |
| **Grandmaster** | 13 | 8th level core features (capstone) | No | 2+ class features from target |
| **Legendary** | 17 | 9th level subclass features (capstone) | Yes (only) | 2+ subclass features from target |

### 2.2. Tier Details

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

## 3. Implementation

### 3.1. Data Structure

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

### 3.2. UI Flow

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
- Selected feature highlighted with gold border and "✓ Selected" badge
- Path-related features (Martial Path, Spellcaster Path) automatically filtered out

### 3.3. Effects Application

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

### 3.4. Persistence

**Location:** `src/lib/services/characterCompletion.ts`, `src/lib/types/dataContracts.ts`

Multiclass selections saved to `SavedCharacter`:

```typescript
interface SavedCharacter {
  // ... other fields
  selectedMulticlassOption?: 'novice' | 'adept' | 'expert' | 'master' | 'grandmaster' | 'legendary' | null;
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

## 4. Prerequisites & Validation

### 4.1. Prerequisite Checks

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

### 4.2. Current Limitations

- Prerequisite checks only count features from **main class**
- Multiclass feature ownership not yet tracked
- Per-class validation not yet per-class (checks global count)
- Will be enhanced when multiclass feature tracking implemented

---

## 5. Subclass Feature Support

### 5.1. Tiers with Subclass Support

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

### 5.2. Feature Display Format

```typescript
// Subclass features prefixed for clarity
{
  featureName: `${subclassName}: ${originalFeatureName}`,
  description: `${subclassDescription}\n\n${featureDescription}`.trim(),
  // ... other feature properties
}
```

---

## 6. Testing

### 6.1. Unit Tests

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

### 6.2. Manual Testing Checklist

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

## 7. Future Enhancements

### 7.1. Planned Features

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

## 8. Related Systems

- **Talent System** (`src/lib/rulesdata/classes-data/talents/`) - Source of talent points
- **Effect System** (`src/lib/types/effectSystem.ts`) - Effect application framework
- **Calculator** (`src/lib/services/enhancedCharacterCalculator.ts`) - Stat calculation
- **Character Context** (`src/lib/stores/characterContext.tsx`) - State management
- **Level Caps** (`src/lib/rulesdata/progression/levelCaps.ts`) - Level-based limits

---

## 9. References

- **Milestone:** M3.17 in `docs/archive/LEVELING_EPIC.md`
- **Commits:** `a28e057`, `3c9deed`, `2764c1f`, `e017d8d`, `37916de`, `ddcfe11`, `5b6da20`, `6f0de71`
- **Tests:** `src/lib/rulesdata/progression/multiclass.test.ts` (31 tests)

