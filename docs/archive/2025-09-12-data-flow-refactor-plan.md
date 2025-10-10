# AI-Optimized Character System Refactor Plan

## 🤖 AI Implementation Guide

This document is structured for step-by-step AI implementation. Each task includes specific file paths, search patterns, validation steps, and rollback instructions.

## Executive Summary

**Target**: Fix 5 critical architectural issues in the character system
**Duration**: 3 phases, 8 weeks total  
**Risk Level**: Low → Medium → Low
**Success Metrics**: 50% performance improvement, 0 data inconsistencies, 100% invalid build prevention

## 📋 Pre-Implementation Checklist

- [ ] Backup current codebase: `git checkout -b refactor-backup`
- [ ] Create feature branch: `git checkout -b character-system-refactor`
- [ ] Verify all tests pass: `npm test`
- [ ] Document current localStorage schema for migration

---

## 🚀 Phase 1: Foundation Stabilization (Tasks 1.1-1.3)

**Dependencies**: None | **Risk**: Low | **Duration**: 1-2 weeks

### Task 1.1: Create Typed Data Contracts

#### 🎯 Objective

Replace JSON string patterns with strongly-typed interfaces

#### 📁 Files to Create

**1.1.1: Create `src/lib/types/dataContracts.ts`**

```typescript
import type { EnhancedStatBreakdown } from './effectSystem';
import type { InventoryItemData } from '../rulesdata/inventoryItems';
import type { SpellData } from '../../types/character';
import type { ManeuverData } from '../../types/character';

export interface CharacterState {
	resources: {
		current: {
			currentHP: number;
			currentSP: number;
			currentMP: number;
			currentGritPoints: number;
			currentRestPoints: number;
			tempHP: number;
			actionPointsUsed: number;
			exhaustionLevel: number;
		};
	};
	ui: {
		manualDefenseOverrides: {
			PD?: number;
			AD?: number;
			PDR?: number;
		};
	};
	inventory: {
		items: InventoryItemData[];
		currency: {
			gold: number;
			silver: number;
			copper: number;
		};
	};
	notes: {
		playerNotes: string;
	};
}

export interface SavedCharacter {
	// Core Identity
	id: string;
	finalName: string;
	finalPlayerName?: string;
	level: number;

	// Classes & Ancestry
	classId: string;
	className: string;
	ancestry1Id?: string;
	ancestry1Name?: string;
	ancestry2Id?: string;
	ancestry2Name?: string;

	// UNIFIED SCHEMA: Only 'final*' names used throughout
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// All calculated stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	finalCombatMastery: number;
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;
	finalPD: number;
	finalAD: number;
	finalPDR: number;
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// TYPED DATA: No more JSON strings
	selectedTraitIds: string[];
	selectedFeatureChoices: Record<string, string>;
	skillsData: Record<string, number>;
	tradesData: Record<string, number>;
	languagesData: string[];
	spells: SpellData[];
	maneuvers: ManeuverData[];

	// Dynamic state as nested object
	characterState: CharacterState;

	// Calculation transparency
	breakdowns: Record<string, EnhancedStatBreakdown>;

	// Metadata
	createdAt: string;
	lastModified: string;
	completedAt: string;
	schemaVersion: string; // For migration tracking
}
```

**1.1.2: Create `src/lib/utils/storageUtils.ts`**

```typescript
import { SavedCharacter, CharacterState } from '../types/dataContracts';

/**
 * Centralized JSON serialization for localStorage
 * This is the ONLY place JSON.stringify should be used for character data
 */
export const serializeCharacterForStorage = (character: SavedCharacter): string => {
	return JSON.stringify({
		...character,
		schemaVersion: '2.0.0'
	});
};

/**
 * Centralized JSON deserialization from localStorage
 * This is the ONLY place JSON.parse should be used for character data
 */
export const deserializeCharacterFromStorage = (jsonString: string): SavedCharacter | null => {
	try {
		const data = JSON.parse(jsonString);

		// Apply defaults for missing fields (backwards compatibility)
		return {
			...data,
			selectedTraitIds: data.selectedTraitIds || [],
			selectedFeatureChoices: data.selectedFeatureChoices || {},
			skillsData: data.skillsData || {},
			tradesData: data.tradesData || {},
			languagesData: data.languagesData || [],
			spells: data.spells || [],
			maneuvers: data.maneuvers || [],
			characterState: data.characterState || getDefaultCharacterState(),
			schemaVersion: data.schemaVersion || '1.0.0'
		};
	} catch (error) {
		console.error('Failed to parse character from storage', error);
		return null;
	}
};

export const getDefaultCharacterState = (): CharacterState => ({
	resources: {
		current: {
			currentHP: 0,
			currentSP: 0,
			currentMP: 0,
			currentGritPoints: 0,
			currentRestPoints: 0,
			tempHP: 0,
			actionPointsUsed: 0,
			exhaustionLevel: 0
		}
	},
	ui: { manualDefenseOverrides: {} },
	inventory: {
		items: [],
		currency: { gold: 0, silver: 0, copper: 0 }
	},
	notes: { playerNotes: '' }
});

/**
 * Get all saved characters with type safety
 */
export const getAllSavedCharacters = (): SavedCharacter[] => {
	const charactersJson = localStorage.getItem('savedCharacters') || '[]';
	try {
		const rawCharacters = JSON.parse(charactersJson);
		return rawCharacters
			.map((char: any) => deserializeCharacterFromStorage(JSON.stringify(char)))
			.filter(Boolean);
	} catch (error) {
		console.error('Failed to load saved characters', error);
		return [];
	}
};
```

#### ✅ Validation Steps for Task 1.1

- [x] Files created without TypeScript errors
- [x] Import statements resolve correctly
- [x] `npm run build` succeeds
- [x] No circular dependency warnings

---

### Task 1.2: Eliminate Redundant Calculations

#### 🎯 Objective

Remove recalculation logic from character sheet, trust stored data

#### 🔍 Search Pattern in `src/routes/character-sheet/CharacterSheetClean.tsx`

```typescript
// Find this pattern around lines 100-150:
const result = calculateCharacterWithBreakdowns(enhancedData);
```

#### 📝 Specific Changes

**1.2.1: Replace `getCharacterData` function**

**Search for:**

```typescript
try {
console.log('🧮 Running enhanced calculator for character data...');
// ... build mock data from stored final\* values ...
const result = calculateCharacterWithBreakdowns(enhancedData);

```

**Replace with:**

```typescript
import {
	deserializeCharacterFromStorage,
	getAllSavedCharacters
} from '../../lib/utils/storageUtils';

const getCharacterData = async (characterId: string): Promise<SavedCharacter> => {
	const savedCharacters = getAllSavedCharacters();
	const character = savedCharacters.find((char) => char.id === characterId);

	if (!character) {
		throw new Error(`Character with ID ${characterId} not found`);
	}

	// Trust the stored data - it's the single source of truth
	// No recalculation needed!
	return character;
};
```

**1.2.2: Remove import statements**

**Search for and remove:**

```typescript
import {
	convertToEnhancedBuildData,
	calculateCharacterWithBreakdowns
} from '../../lib/services/enhancedCharacterCalculator';
```

**1.2.3: Remove helper functions**

**Search for and remove these entire functions:**

- `sanitizeJsonField` (around line 31)
- `convertToEnhancedBuildData` usage in `getCharacterData`
- Mock data building logic

#### ✅ Validation Steps for Task 1.2

- [x] Character sheet loads without recalculation
- [x] No console errors in browser
- [x] Character data displays correctly
- [x] Load time improved (measure with DevTools)

#### 🔙 Rollback Instructions

```bash
git checkout HEAD~1 -- src/routes/character-sheet/CharacterSheetClean.tsx
```

---

### Task 1.3: Eliminate State Fragmentation

#### 🎯 Objective

Remove 17+ duplicate fields, make characterState the sole authority

#### 🔍 Search Pattern in `src/lib/utils/characterState.ts`

        ```typescript

// Find this pattern in saveCharacterState:
currentHP: state.resources.current.currentHP,
currentSP: state.resources.current.currentSP,

````

#### 📝 Specific Changes

**1.3.1: Simplify `saveCharacterState` function**

**Search for:**
```typescript
savedCharacters[characterIndex] = {
...savedCharacters[characterIndex],
characterState: state,
// Also maintain backwards compatibility with old format
currentHP: state.resources.current.currentHP,
currentSP: state.resources.current.currentSP,

````

**Replace with:**

````typescript
import { serializeCharacterForStorage } from './storageUtils';

export const saveCharacterState = (characterId: string, state: CharacterState): void => {
  const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
  const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

  if (characterIndex === -1) {
    console.warn(`Character ${characterId} not found for state update`);
    return;
  }

  // Update ONLY the characterState - no duplicates
  savedCharacters[characterIndex] = {
    ...savedCharacters[characterIndex],
    characterState: state,
    lastModified: new Date().toISOString()
  };

  localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
    };
    ```

**1.3.2: Update UI components to use nested state**

**Search in `src/routes/character-sheet/components/` for patterns like:**
```typescript
character.currentHP
character.currentSP
character.manualPD
````

**Replace with:**

```typescript
character.characterState.resources.current.currentHP;
character.characterState.resources.current.currentSP;
character.characterState.ui.manualDefenseOverrides.PD;
```

#### 🔍 Files to update (use grep to find them):

```bash
grep -r "character\.current" src/routes/character-sheet/components/
grep -r "character\.manual" src/routes/character-sheet/components/
```

#### ✅ Validation Steps for Task 1.3

- [x] No duplicate fields in localStorage
- [x] Character state updates correctly
- [x] UI shows current HP/SP values
- [x] Manual defense overrides work

---

## 🧠 Phase 2: Smart Character Creation (Tasks 2.1-2.2)

**Dependencies**: Phase 1 complete | **Risk**: Medium | **Duration**: 2-3 weeks

### Task 2.1: Intelligent Attribute Point Calculation

#### 🎯 Objective

Account for trait effects in attribute point calculations

#### 📁 Files to Create

**2.1.1: Create `src/lib/hooks/useAttributeCalculation.ts`**

    ```typescript

import { useMemo } from 'react';

interface AttributeCalculationResult {
totalPointsAvailable: number;
pointsSpent: number;
pointsRemaining: number;
forcedAdjustments: Array<{
attribute: string;
originalValue: number;
effectiveValue: number;
pointsCost: number;
}>;
isValid: boolean;
}

/\*\*

- Calculate attribute points accounting for trait effects
- This is the NEW, correct calculation that replaces the old one
  \*/
  export const useAttributeCalculation = (characterState: any): AttributeCalculationResult => {
  const BASE_ATTRIBUTE_POINTS = 11;

return useMemo(() => {
const {
attribute_might = -2,
attribute_agility = -2,
attribute_charisma = -2,
attribute_intelligence = -2,
selectedTraitIds = []
} = characterState;

    // Base points spent (base attribute is -2, so +2 to get actual cost)
    const basePointsSpent =
      (attribute_might + 2) +
      (attribute_agility + 2) +
      (attribute_charisma + 2) +
      (attribute_intelligence + 2);

    // Get trait effects (TODO: implement getCombinedTraitEffects)
    const traitEffects = getCombinedTraitEffects(selectedTraitIds);

    let totalAdjustmentCost = 0;
    const forcedAdjustments: Array<{
      attribute: string;
      originalValue: number;
      effectiveValue: number;
      pointsCost: number;
    }> = [];

    // Check each attribute for forced adjustments
    const attributes = {
      might: attribute_might,
      agility: attribute_agility,
      charisma: attribute_charisma,
      intelligence: attribute_intelligence
    };

    Object.entries(attributes).forEach(([attr, baseValue]) => {
      const effect = traitEffects[attr] || 0;
      const effectiveValue = baseValue + effect;

      if (effectiveValue < -2) {
        // Trait forces attribute below minimum, costs points to fix
        const pointsCost = -2 - effectiveValue;
        totalAdjustmentCost += pointsCost;

        forcedAdjustments.push({
          attribute: attr,
          originalValue: baseValue,
          effectiveValue: effectiveValue,
          pointsCost: pointsCost
        });
      }
    });

    // Calculate bonus points from traits (TODO: implement getBonusAttributePointsFromTraits)
    const bonusPoints = getBonusAttributePointsFromTraits(selectedTraitIds);

    const totalPointsAvailable = BASE_ATTRIBUTE_POINTS + bonusPoints;
    const pointsSpent = basePointsSpent + totalAdjustmentCost;
    const pointsRemaining = totalPointsAvailable - pointsSpent;

    return {
      totalPointsAvailable,
      pointsSpent,
      pointsRemaining,
      forcedAdjustments,
      isValid: pointsRemaining >= 0
    };

}, [characterState]);
};

// TODO: These utility functions need to be implemented or imported
const getCombinedTraitEffects = (traitIds: string[]) => {
// Placeholder - implement based on your trait system
return {};
};

const getBonusAttributePointsFromTraits = (traitIds: string[]) => {
// Placeholder - implement based on your trait system
return 0;
};

````

#### ✅ Validation Steps for Task 2.1

- [ ] Hook compiles without errors
- [ ] Returns expected calculation structure
- [ ] Handles edge cases (empty trait arrays, etc.)

---

### Task 2.2: Real-time UI Feedback

#### 🎯 Objective

Add validation and feedback to character creation UI

#### 🔍 Files to Modify

**2.2.1: Update `src/routes/character-creation/components/TraitChoiceSelector.tsx`**

**Search for existing component structure and enhance it:**

```typescript
import { useAttributeCalculation } from '../../../lib/hooks/useAttributeCalculation';

export const TraitChoiceSelector: React.FC<Props> = ({ trait, isSelected, onToggle }) => {
  const { characterState } = useCharacter();
  const currentCalculation = useAttributeCalculation(characterState);

  // Simulate what would happen if this trait were selected
  const simulatedState = {
    ...characterState,
    selectedTraitIds: isSelected
      ? characterState.selectedTraitIds.filter(id => id !== trait.id)
      : [...characterState.selectedTraitIds, trait.id]
  };
  const simulatedCalculation = useAttributeCalculation(simulatedState);

  const canSelect = simulatedCalculation.isValid;
  const attributeEffects = trait.effects?.filter(e => e.type === 'MODIFY_ATTRIBUTE') || [];

  const handleClick = () => {
    if (canSelect || isSelected) {
      onToggle(trait.id);
    } else {
      // Show warning or prevent selection
      console.warn(`Cannot select ${trait.name}: would exceed attribute points`);
    }
  };

  return (
    <TraitCard
      className={`trait-card ${!canSelect && !isSelected ? 'disabled' : ''}`}
      onClick={handleClick}
    >
  <TraitName>{trait.name}</TraitName>
  <TraitDescription>{trait.description}</TraitDescription>

      {/* Show attribute effects preview */}
      {attributeEffects.length > 0 && (
        <div className="attribute-effects-preview">
          <strong>Attribute Effects:</strong>
          {attributeEffects.map(effect => (
            <div key={effect.target} className="attribute-effect">
              {effect.target}: {effect.value > 0 ? '+' : ''}{effect.value}
            </div>
          ))}
        </div>
      )}

      {/* Show point cost impact */}
      {!isSelected && (
        <div className={`point-impact ${simulatedCalculation.pointsRemaining < 0 ? 'negative' : 'neutral'}`}>
          Points after selection: {simulatedCalculation.pointsRemaining}
        </div>
      )}

      {/* Block invalid selections */}
      {!canSelect && !isSelected && (
        <div className="selection-blocked">
          ❌ Would exceed available attribute points
        </div>
      )}

      {/* Show forced adjustments warning */}
      {simulatedCalculation.forcedAdjustments.length > currentCalculation.forcedAdjustments.length && (
        <div className="forced-adjustment-warning">
          ⚠️ This trait will require additional attribute point adjustments
        </div>
  )}
</TraitCard>
  );
};
````

**2.2.2: Update `src/routes/character-creation/Attributes.tsx`**

**Search for the existing attributes component and enhance it:**

```typescript
import { useAttributeCalculation } from '../../lib/hooks/useAttributeCalculation';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';

export const Attributes: React.FC = () => {
  const { characterState, dispatch } = useCharacter();
  const calculation = useAttributeCalculation(characterState);
const { calculationResult } = useEnhancedCharacterCalculation();

  const handleAttributeChange = (attribute: string, value: number) => {
    dispatch({
      type: 'SET_ATTRIBUTE',
      payload: { attribute, value }
    });
  };

  return (
    <div className="attributes-container">
      {/* Enhanced point counter */}
      <div className="attribute-point-counter">
        <div className={`points-display ${calculation.pointsRemaining < 0 ? 'invalid' : ''}`}>
          Attribute Points Remaining: {calculation.pointsRemaining}
        </div>

        {calculation.forcedAdjustments.length > 0 && (
          <div className="forced-adjustments-warning">
            ⚠️ {calculation.forcedAdjustments.length} forced adjustment(s) due to traits
          </div>
        )}

        <div className="point-breakdown">
          <div>Base Points: 11</div>
          <div>Bonus from Traits: {calculation.totalPointsAvailable - 11}</div>
          <div>Spent on Attributes: {calculation.pointsSpent - calculation.forcedAdjustments.reduce((sum, adj) => sum + adj.pointsCost, 0)}</div>
          {calculation.forcedAdjustments.length > 0 && (
            <div>Forced Adjustments: {calculation.forcedAdjustments.reduce((sum, adj) => sum + adj.pointsCost, 0)}</div>
          )}
        </div>
      </div>

      {/* Enhanced attribute rows */}
      {['might', 'agility', 'charisma', 'intelligence'].map(attr => {
        const baseValue = characterState[`attribute_${attr}`] || -2;
        const finalValue = calculationResult?.stats?.[`final${attr.charAt(0).toUpperCase() + attr.slice(1)}`];
        const forcedAdjustment = calculation.forcedAdjustments.find(adj => adj.attribute === attr);

        return (
          <div key={attr} className="attribute-row">
            <label className="attribute-label">
              {attr.charAt(0).toUpperCase() + attr.slice(1)}
            </label>

            <input
              type="number"
              value={baseValue}
              onChange={(e) => handleAttributeChange(attr, parseInt(e.target.value))}
              min={-2}
              max={3}
              className="attribute-input"
            />

            <div className="attribute-values">
              <span className="base-value">Base: {baseValue}</span>
              {finalValue !== undefined && finalValue !== baseValue && (
                <span className="effective-value">Effective: {finalValue}</span>
              )}
            </div>

            {forcedAdjustment && (
              <div className="forced-adjustment-indicator">
                ⚠️ Forced to minimum (-2), cost: {forcedAdjustment.pointsCost} points
              </div>
            )}
          </div>
        );
      })}

      {/* Validation summary */}
      {!calculation.isValid && (
        <div className="validation-error">
          ❌ Invalid build: {Math.abs(calculation.pointsRemaining)} points over budget
        </div>
      )}
    </div>
  );
};
```

#### ✅ Validation Steps for Task 2.2

- [ ] Trait selection shows point impact
- [ ] Invalid selections are blocked
- [ ] Attribute page shows effective values
- [ ] Forced adjustments are clearly indicated
- [ ] No console errors during trait selection

---

## 🧹 Phase 3: Data Contract Cleanup (Task 3.1-3.2)

**Dependencies**: Phases 1-2 complete | **Risk**: Low | **Duration**: 1 week

### Task 3.1: Eliminate Legacy JSON Fields

#### 🎯 Objective

Replace all `JSON.parse()` usage with typed data access

#### 🔍 Find files that need updating:

```bash
grep -r "JSON\.parse.*Json" src/
grep -r "skillsJson\|tradesJson\|languagesJson\|selectedTraitIds.*JSON" src/
```

#### 📝 Replacement Patterns

**3.1.1: In all character sheet components**

**Search for:**

```typescript
const skills = JSON.parse(character.skillsJson || '{}');
const trades = JSON.parse(character.tradesJson || '{}');
const languages = JSON.parse(character.languagesJson || '[]');
const traits = JSON.parse(character.selectedTraitIds || '[]');
```

**Replace with:**

```typescript
const skills = character.skillsData || {};
const trades = character.tradesData || {};
const languages = character.languagesData || [];
const traits = character.selectedTraitIds || [];
```

#### ✅ Validation Steps for Task 3.1

- [x] No more `JSON.parse` calls in component files
- [x] Skills/trades/languages display correctly
- [x] Trait selection works with typed data

---

### Task 3.2: Update Character Completion Service

#### 🎯 Objective

Use typed data contracts in character creation completion

#### 📝 Specific Changes in `src/lib/services/characterCompletion.ts`

**3.2.1: Replace character building logic**

**Search for:**

```typescript
const characterInProgress = {
	id: Date.now().toString(),
	attribute_might: characterState.attribute_might,
	// ... JSON string assignments
	selectedTraitIds: characterState.selectedTraitIds || '',
	selectedFeatureChoices: characterState.selectedFeatureChoices || '',
	skillsJson: characterState.skillsJson || ''
};
```

**Replace with:**

```typescript
import { SavedCharacter, getDefaultCharacterState } from '../types/dataContracts';
import { serializeCharacterForStorage } from '../utils/storageUtils';

// Build the enhanced data for calculation (still uses attribute_ for calculator)
const enhancedData = convertToEnhancedBuildData({
	attribute_might: characterState.attribute_might,
	attribute_agility: characterState.attribute_agility,
	attribute_charisma: characterState.attribute_charisma,
	attribute_intelligence: characterState.attribute_intelligence
	// ... other calculator inputs
});

const calculationResult = calculateCharacterWithBreakdowns(enhancedData);

// Create the final character with unified 'final*' schema
const completedCharacter: SavedCharacter = {
	id: Date.now().toString(),
	finalName: characterState.finalName,
	finalPlayerName: characterState.finalPlayerName,
	level: characterState.level || 1,
	classId: characterState.classId,
	className: calculationResult.className || '',
	ancestry1Id: characterState.ancestry1Id,
	ancestry1Name: characterState.ancestry1Name,
	ancestry2Id: characterState.ancestry2Id,
	ancestry2Name: characterState.ancestry2Name,

	// Map from calculation result to final* schema
	finalMight: calculationResult.stats.finalMight,
	finalAgility: calculationResult.stats.finalAgility,
	finalCharisma: calculationResult.stats.finalCharisma,
	finalIntelligence: calculationResult.stats.finalIntelligence,
	finalPrimeModifierValue: calculationResult.stats.finalPrimeModifierValue,
	finalPrimeModifierAttribute: calculationResult.stats.finalPrimeModifierAttribute,
	finalCombatMastery: calculationResult.stats.finalCombatMastery,
	finalSaveMight: calculationResult.stats.finalSaveMight,
	finalSaveAgility: calculationResult.stats.finalSaveAgility,
	finalSaveCharisma: calculationResult.stats.finalSaveCharisma,
	finalSaveIntelligence: calculationResult.stats.finalSaveIntelligence,
	finalHPMax: calculationResult.stats.finalHPMax,
	finalSPMax: calculationResult.stats.finalSPMax,
	finalMPMax: calculationResult.stats.finalMPMax,
	finalPD: calculationResult.stats.finalPD,
	finalAD: calculationResult.stats.finalAD,
	finalPDR: calculationResult.stats.finalPDR,
	finalSaveDC: calculationResult.stats.finalSaveDC,
	finalDeathThreshold: calculationResult.stats.finalDeathThreshold,
	finalMoveSpeed: calculationResult.stats.finalMoveSpeed,
	finalJumpDistance: calculationResult.stats.finalJumpDistance,
	finalRestPoints: calculationResult.stats.finalRestPoints,
	finalGritPoints: calculationResult.stats.finalGritPoints,
	finalInitiativeBonus: calculationResult.stats.finalInitiativeBonus,

	// Store typed data directly (no more JSON strings)
	selectedTraitIds: characterState.selectedTraitIds || [],
	selectedFeatureChoices: characterState.selectedFeatureChoices || {},
	skillsData: characterState.skillsData || {},
	tradesData: characterState.tradesData || {},
	languagesData: characterState.languagesData || [],
	spells: calculationResult.spells || [],
	maneuvers: calculationResult.maneuvers || [],

	// Store calculation breakdowns for transparency
	breakdowns: calculationResult.breakdowns || {},

	// Initialize default character state
	characterState: getDefaultCharacterState(),

	// Metadata
	createdAt: new Date().toISOString(),
	lastModified: new Date().toISOString(),
	completedAt: new Date().toISOString(),
	schemaVersion: '2.0.0'
};

// Save using centralized storage utils
const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
savedCharacters.push(completedCharacter);
localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
```

#### ✅ Validation Steps for Task 3.2

- [x] Character creation completes successfully
- [x] Saved character uses new schema
- [x] No JSON string fields in saved data
- [x] Character loads correctly in sheet

---

## 🔄 Migration & Testing Strategy

### Migration Script Template

**Create `src/lib/utils/migrationUtils.ts`:**

```typescript
import { SavedCharacter, getDefaultCharacterState } from '../types/dataContracts';

export const migrateCharacterToV2 = (oldCharacter: any): SavedCharacter => {
	return {
		...oldCharacter,
		// Convert JSON strings to typed data
		selectedTraitIds: parseJsonField(oldCharacter.selectedTraitIds, []),
		selectedFeatureChoices: parseJsonField(oldCharacter.selectedFeatureChoices, {}),
		skillsData: parseJsonField(oldCharacter.skillsJson, {}),
		tradesData: parseJsonField(oldCharacter.tradesJson, {}),
		languagesData: parseJsonField(oldCharacter.languagesJson, []),

		// Ensure characterState exists
		characterState: oldCharacter.characterState || getDefaultCharacterState(),

		// Add schema version
		schemaVersion: '2.0.0'
	};
};

const parseJsonField = (value: any, fallback: any) => {
	if (typeof value === 'string') {
		try {
			return JSON.parse(value);
		} catch {
			return fallback;
		}
	}
	return value || fallback;
};
```

### Testing Checklist

#### Unit Tests

- [ ] `useAttributeCalculation` with various trait combinations
- [ ] Storage utils serialization/deserialization
- [ ] Migration utility functions

#### Integration Tests

- [ ] Complete character creation flow
- [ ] Character sheet loading performance
- [ ] State persistence across browser refresh

#### Performance Tests

- [ ] Character sheet load time (target: 50% improvement)
- [ ] Memory usage during character creation
- [ ] No memory leaks in trait selection

#### Migration Tests

- [ ] Old characters convert correctly
- [ ] No data loss during migration
- [ ] Backwards compatibility during transition

---

## 📊 Success Metrics & Monitoring

### Performance Metrics

- [ ] Character sheet load time: `< 500ms` (from ~1000ms)
- [ ] Trait selection response time: `< 100ms`
- [ ] Memory usage: `< 50MB` for character creation

### Data Integrity Metrics

- [ ] Zero calculated vs stored value discrepancies
- [ ] 100% successful character migrations
- [ ] No JSON parsing errors in console

### User Experience Metrics

- [ ] 100% of invalid character builds prevented
- [ ] Real-time feedback on all trait selections
- [ ] Clear error messages for invalid states

### Code Quality Metrics

- [ ] 80% reduction in `JSON.parse` operations
- [ ] Single source of truth for all character data
- [ ] No duplicate state fields in localStorage

---

## 🆘 Emergency Rollback Plan

### Per-Task Rollback

```bash
# Rollback specific files
git checkout HEAD~1 -- src/lib/types/dataContracts.ts
git checkout HEAD~1 -- src/routes/character-sheet/CharacterSheetClean.tsx

# Rollback entire phase
git revert <commit-hash-of-phase-start>
```

### Full Rollback

```bash
# Return to backup branch
git checkout refactor-backup
git branch -D character-system-refactor
```

### Data Recovery

```javascript
// Emergency localStorage recovery (run in browser console)
const backup = localStorage.getItem('savedCharacters_backup');
if (backup) {
	localStorage.setItem('savedCharacters', backup);
	location.reload();
}
```

---

## 🎯 Implementation Priority Order

1. **CRITICAL**: Task 1.2 (Eliminate redundant calculations) - Immediate performance gain
2. **HIGH**: Task 1.1 (Typed contracts) - Foundation for everything else
3. **HIGH**: Task 1.3 (State fragmentation) - Prevents data corruption
4. **MEDIUM**: Task 2.1 (Attribute calculation) - UX improvement
5. **MEDIUM**: Task 2.2 (UI feedback) - Polish and validation
6. **LOW**: Task 3.1-3.2 (Cleanup) - Code quality improvements

**Start with Task 1.2 for immediate impact, then proceed in dependency order.**

---

## State Log

- Timestamp (UTC): 2025-09-12T21:23:05Z
- Branch: improveDocs
- HEAD: f476741 2025-09-13 00:21:53 +0300 docs(plannedSpecs): add Export PDF Sheet state log with timestamp and git stamp

### Current State Summary

- Typed `SavedCharacter`/`CharacterState` present (`src/lib/types/dataContracts.ts`).
- Centralized storage utils (`src/lib/utils/storageUtils.ts`) with serialize/deserialize, defaults, backup/restore.
- Completion pipeline writes typed saves with breakdowns; initializes `characterState` from maxes.
- Systems docs added (Spells, Martials, Calculation, Effect, Character Sheet); AGENTS Systems Index present.

### Leftover Tasks (prioritized)

1) Eliminate sheet-side recalculation (read from `SavedCharacter`, recalc only on edits)
2) Add `useAttributeCalculation` and gate trait/attribute UI
3) Migrate legacy string fields to typed (`skillsJson/tradesJson/languagesJson/selectedTraitIds`)
4) Purge residual JSON usage outside `storageUtils`
5) Align `languagesData` canonical shape and migrate
6) Tests for migration/attribute hook/sheet no-recalc; trim storage logging

