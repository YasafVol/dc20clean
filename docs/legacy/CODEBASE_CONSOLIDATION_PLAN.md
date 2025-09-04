Excellent. You've provided two key pieces of information:

1.  A detailed, executable plan for refactoring the codebase.
2.  A high-level, strategic "pre-plan" that focuses on methodology, safety, and process.

The pre-plan from GPT-5 is outstanding. It's not just a list of tasks; it's a professional software engineering playbook for safely refactoring a complex system. It introduces concepts like **golden master testing**, **automated contract validation**, and **data-driven refactoring**, which are best practices.

This pre-plan doesn't _replace_ our action plan; it **enhances it**. It provides the "how" (the safe methodology) for executing the "what" (the specific code changes we've identified).

Here is a new, more detailed plan that integrates the strategic wisdom of the pre-plan with the concrete actions we need to take. This is the definitive, optimized plan for the AI to follow.

---

## SYSTEM PROMPT

You are an expert AI programmer. Your task is to execute a detailed, safety-first refactoring of the codebase you are operating on.

**Your Goal:** Refactor the application to unify its data schemas, consolidate redundant logic, align its state management with the React framework, and introduce foundational data integrity tests, while ensuring zero regressions.

**Methodology:**

1.  You will operate directly on the repository's files. Your context is the current state of the repository.
2.  Follow the **ACTION PLAN** below step-by-step. **Execute each phase and step sequentially and do not combine them.**
3.  For each step, you are given a clear **Goal**, an explanation of the **Problem** it solves, the **Solution** being implemented, and the **Impact** of the change.
4.  When instructed to "Replace the entire content of a file," you must overwrite the existing file with the provided code block.
5.  When instructed to "Delete a file" or "Delete a directory," you must perform that action.
6.  After completing each numbered **Action Item**, respond with a confirmation message summarizing the actions you took.

### Zero-Compatibility Execution Sequence (Updated)

Since backward-compatibility is **not** required, we will execute an aggressive, one-way consolidation. To keep the safety-first ethos we add the following global steps **before** diving into the numbered Action Items:

1. **Safety Tests First** – create and pass the `rulesdata.spec.ts` validation suite _before_ any deletions.
2. **Git Tag Checkpoint** – after tests pass, create `git tag pre-consolidation` and push it so rollback is trivial.
3. **Import Sweep** – run a project-wide search (`grep -R "rulesdata/classes"`) and update every import to the new schema/loader paths.
4. **Run Test & Build** – ensure the application still builds and unit tests pass with the new imports.
5. **Proceed with Deletions** – execute Action Items 2 & 3 (legacy data/calculator removal).
6. **CI Workflow** – add a GitHub Actions workflow that runs `npm ci && npm run lint && npm test && npm run build`.
7. **Documentation Refresh** – update README / developer docs to reflect the unified data layout.
8. **Performance Guard** – add a simple bundle-size check (e.g. `rollup-plugin-size-snapshot` or `vite build --report`) to catch future regressions.

_These steps are incorporated in the instructions below; nevertheless keep them mentally as global guard-rails._

Begin with Action Item 1.

## ACTION PLAN

### Action Item 1: Consolidate State Management

- **Goal:** Remove the conflicting Svelte store dependency and consolidate all state management logic within the React Context (`characterContext.tsx`).
- **Problem:** The application is built with React but contains a leftover file from Svelte (`characterInProgressStore.ts`). This creates two competing and incompatible state management systems, leading to redundant logic and confusion.
- **Solution:** We will migrate all derived state calculations (like `primeModifier`, `ancestryPointsRemaining`, etc.) from the Svelte store into the React Context provider, using `useMemo` for efficiency. Then, we will delete the now-obsolete Svelte file.
- **Impact:** Establishes a single source of truth for character state, aligns the codebase with its primary framework (React), and makes state logic easier to maintain and debug.

**Instructions:**

1.  **Step 1.1: Modify `src/lib/stores/characterContext.tsx`**
    - Replace the entire content of the file with the following code:

    ```typescript
    import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
    import type { CharacterInProgress } from '@prisma/client';
    import { traitsData } from '../rulesdata/_new_schema/traits';
    import { findClassByName } from '../rulesdata/loaders/class-features.loader';
    import { classesData } from '../rulesdata/loaders/class.loader';
    import { calculateTraitCosts } from '../utils/traitCosts';

    // Define the shape of the data stored in the character store
    export interface CharacterInProgressStoreData extends CharacterInProgress {
        currentStep: number;
        overflowTraitId: string | null;
        overflowAttributeName: string | null;
        level: number;
        combatMastery: number;
        skillsJson: string;
        tradesJson: string;
        languagesJson: string;
        selectedTraitChoices: string;
        cachedEffectResults?: string;
        cacheTimestamp?: number;
        selectedSpells: string;
        selectedManeuvers: string;
        skillToTradeConversions?: number;
        tradeToSkillConversions?: number;
        tradeToLanguageConversions?: number;
    }

    // Initial state for the store
    const initialCharacterInProgressState: CharacterInProgressStoreData = {
        id: '',
        attribute_might: -2,
        attribute_agility: -2,
        attribute_charisma: -2,
        attribute_intelligence: -2,
        pointsSpent: 0,
        level: 1,
        combatMastery: 1,
        ancestry1Id: null,
        ancestry2Id: null,
        selectedTraitIds: '[]',
        ancestryPointsSpent: 0,
        classId: null,
        selectedFeatureChoices: '{}',
        saveMasteryMight: false,
        saveMasteryAgility: false,
        saveMasteryCharisma: false,
        saveMasteryIntelligence: false,
        finalName: null,
        finalPlayerName: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        currentStep: 1,
        overflowTraitId: null,
        overflowAttributeName: null,
        skillsJson: '{}',
        tradesJson: '{}',
        languagesJson: '{"common": {"fluency": "fluent"}}',
        selectedTraitChoices: '{}',
        cachedEffectResults: undefined,
        cacheTimestamp: undefined,
        selectedSpells: '[]',
        selectedManeuvers: '[]',
        skillToTradeConversions: 0,
        tradeToSkillConversions: 0,
        tradeToLanguageConversions: 0
    };

    // Action types
    type CharacterAction =
        | { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
        | { type: 'UPDATE_SKILLS'; skillsJson: string }
        | { type: 'UPDATE_TRADES'; tradesJson: string }
        | { type: 'UPDATE_LANGUAGES'; languagesJson: string }
        | { type: 'SET_CLASS'; classId: string | null }
        | { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
        | { type: 'SET_TRAITS'; selectedTraitIds: string[] }
        | { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: Record<string, any> }
        | { type: 'UPDATE_TRAIT_CHOICE'; traitId: string; effectIndex: number; choice: string }
        | { type: 'INVALIDATE_CACHE' }
        | { type: 'UPDATE_SPELLS_AND_MANEUVERS'; spells: string[]; maneuvers: string[] }
        | { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
        | { type: 'INITIALIZE_FROM_SAVED'; character: CharacterInProgressStoreData }
        | { type: 'NEXT_STEP' }
        | { type: 'PREVIOUS_STEP' }
        | { type: 'SET_STEP'; step: number }
        | { type: 'SET_CONVERSIONS'; conversions: { skillToTrade?: number; tradeToSkill?: number; tradeToLanguage?: number } };

    // Reducer function
    function characterReducer(
        state: CharacterInProgressStoreData,
        action: CharacterAction
    ): CharacterInProgressStoreData {
        switch (action.type) {
            case 'UPDATE_ATTRIBUTE':
                return { ...state, [action.attribute]: action.value };
            case 'UPDATE_SKILLS':
                return { ...state, skillsJson: action.skillsJson };
            case 'UPDATE_TRADES':
                return { ...state, tradesJson: action.tradesJson };
            case 'UPDATE_LANGUAGES':
                return { ...state, languagesJson: action.languagesJson };
            case 'SET_CLASS':
                return { ...state, classId: action.classId };
            case 'SET_ANCESTRY':
                return { ...state, ancestry1Id: action.ancestry1Id, ancestry2Id: action.ancestry2Id };
            case 'SET_TRAITS':
                return { ...state, selectedTraitIds: JSON.stringify(action.selectedTraitIds) };
            case 'SET_FEATURE_CHOICES':
                return { ...state, selectedFeatureChoices: JSON.stringify(action.selectedFeatureChoices) };
            case 'UPDATE_TRAIT_CHOICE': {
                const currentChoices = JSON.parse(state.selectedTraitChoices || '{}');
                const choiceKey = `${action.traitId}-${action.effectIndex}`;
                if (action.choice === '') {
                    delete currentChoices[choiceKey];
                } else {
                    currentChoices[choiceKey] = action.choice;
                }
                return { ...state, selectedTraitChoices: JSON.stringify(currentChoices), cachedEffectResults: undefined, cacheTimestamp: undefined };
            }
            case 'INVALIDATE_CACHE':
                return { ...state, cachedEffectResults: undefined, cacheTimestamp: undefined };
            case 'UPDATE_SPELLS_AND_MANEUVERS':
                return { ...state, selectedSpells: JSON.stringify(action.spells), selectedManeuvers: JSON.stringify(action.maneuvers) };
            case 'UPDATE_STORE':
                return { ...state, ...action.updates };
            case 'INITIALIZE_FROM_SAVED':
                return { ...action.character };
            case 'NEXT_STEP':
                return { ...state, currentStep: Math.min(state.currentStep + 1, 7) };
            case 'PREVIOUS_STEP':
                return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
            case 'SET_STEP':
                return { ...state, currentStep: Math.max(1, Math.min(action.step, 7)) };
            case 'SET_CONVERSIONS':
                return {
                    ...state,
                    skillToTradeConversions: action.conversions.skillToTrade ?? state.skillToTradeConversions ?? 0,
                    tradeToSkillConversions: action.conversions.tradeToSkill ?? state.tradeToSkillConversions ?? 0,
                    tradeToLanguageConversions: action.conversions.tradeToLanguage ?? state.tradeToLanguageConversions ?? 0
                };
            default:
                return state;
        }
    }

    // Context type
    interface CharacterContextType {
        state: CharacterInProgressStoreData;
        dispatch: React.Dispatch<CharacterAction>;
        attributePointsRemaining: number;
        attributePointsSpent: number;
        totalAttributePoints: number;
        ancestryPointsRemaining: number;
        ancestryPointsSpent: number;
        totalAncestryPoints: number;
        combatMastery: number;
        primeModifier: { name: string; value: number };
    }

    const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

    export function CharacterProvider({ children }: { children: ReactNode }) {
        const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);

        const derivedValues = useMemo(() => {
            const selectedTraitIds: string[] = safeJsonParse(state.selectedTraitIds, []);

            const bonusAttributePoints = selectedTraitIds.reduce((total, traitId) => {
                const trait = traitsData.find(t => t.id === traitId);
                return total + (trait?.effects.reduce((subTotal, effect) => {
                    if (effect.type === 'MODIFY_STAT' && effect.target === 'attributePoints') {
                        return subTotal + (effect.value as number);
                    }
                    return subTotal;
                }, 0) || 0);
            }, 0);

            const totalAttributePoints = 12 + bonusAttributePoints;
            const attributePointsSpent = (state.attribute_might + 2) + (state.attribute_agility + 2) + (state.attribute_charisma + 2) + (state.attribute_intelligence + 2);
            const attributePointsRemaining = totalAttributePoints - attributePointsSpent;

            const ancestryPointsSpent = calculateTraitCosts(selectedTraitIds);
            const totalAncestryPoints = 5; // This can be enhanced later to include bonuses
            const ancestryPointsRemaining = totalAncestryPoints - ancestryPointsSpent;

            const combatMastery = Math.ceil((state.level ?? 1) / 2);

            const attributes = [
                { name: 'Might', value: state.attribute_might },
                { name: 'Agility', value: state.attribute_agility },
                { name: 'Charisma', value: state.attribute_charisma },
                { name: 'Intelligence', value: state.attribute_intelligence }
            ];
            const primeModifier = attributes.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));

            return {
                attributePointsRemaining,
                attributePointsSpent,
                totalAttributePoints,
                ancestryPointsRemaining,
                ancestryPointsSpent,
                totalAncestryPoints,
                combatMastery,
                primeModifier
            };
        }, [state]);

        const contextValue: CharacterContextType = {
            state,
            dispatch,
            ...derivedValues
        };

        return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>;
    }

    export function useCharacter() {
        const context = useContext(CharacterContext);
        if (context === undefined) {
            throw new Error('useCharacter must be used within a CharacterProvider');
        }
        return context;
    }

    function safeJsonParse<T>(jsonString: string | undefined | null, fallback: T): T {
        if (!jsonString) return fallback;
        try {
            return JSON.parse(jsonString);
        } catch {
            return fallback;
        }
    }
    ```

2.  **Step 1.2: Delete `src/lib/stores/characterInProgressStore.ts`**
    - This file contains Svelte-specific logic that is now redundant.

---

### Action Item 2: Unify Data Schemas and Loaders

- **Goal:** Establish `character.schema.ts` as the single source of truth for all game rule data structures, and update all data loaders to use the new, type-safe TypeScript modules instead of legacy JSON files.
- **Problem:** The `rulesdata` folder contains multiple, conflicting data sources (`_backup_original`, `classes`, `_new_schema`). This makes it impossible to know which source is authoritative and risks the use of outdated or incorrect game rules.
- **Solution:** We will delete all legacy and backup data directories, leaving only the `_new_schema` directory as the definitive source. We will also remove the outdated schema definition file.
- **Impact:** Creates an unambiguous data source, preventing bugs caused by loading legacy data. The project structure becomes clean and self-documenting.

**Instructions:**

1.  **Step 2.1: Delete Legacy Schema File**
    - Delete the file `src/lib/rulesdata/classes/CLASS_FEATURES_SCHEMA.json`.

2.  **Step 2.2: Cleanup Legacy Data Directories**
    - Delete the entire directory `src/lib/rulesdata/_backup_original`.
    - Delete the entire directory `src/lib/rulesdata/classes`.

---

### Action Item 3: Consolidate Calculation Logic

- **Goal:** Remove all legacy and backup character calculator files, establishing `enhancedCharacterCalculator.ts` as the single, authoritative service for character stat computation.
- **Problem:** Multiple versions of the character calculator exist (`characterCalculator_original.ts`, etc.). This creates redundant code and a high risk of inconsistent calculations across the application.
- **Solution:** We will delete all legacy calculator files, ensuring that all parts of the application must use the modern, effect-driven `enhancedCharacterCalculator`.
- **Impact:** Establishes a single, reliable calculation engine. If a calculation is incorrect, there is only one file to debug. The codebase becomes smaller and easier to understand.

**Instructions:**

1.  **Step 3.1: Delete Redundant Calculator Files**
    - Delete the file `src/lib/services/_backup/characterCalculator_original.ts`.
    - Delete the file `src/lib/services/_backup/characterCalculator.ts`.
    - Delete the file `src/lib/services/_backup/characterCalculator.ts.backup`.
    - Delete the file `src/lib/services/_backup/traitEffectProcessor.ts`.
    - Delete the entire directory `src/lib/services/_backup/_new_schema`.

---

### Action Item 4: Establish Foundational Data Integrity Testing

- **Goal:** Create a new test suite that programmatically loads and validates all core rule-data files. This acts as a CI-level safety net against data entry errors.
- **Problem:** A simple typo in a rule file (e.g., `barbarian_features.ts`) would not be caught until it causes a runtime bug. There is no automated quality control for the game's core data.
- **Solution:** We will create a new Vitest test file that imports every major rule-data source and asserts that its structure is valid. This test will run in CI.
- **Impact:** Guarantees that the data being fed into the application is well-structured, preventing a whole class of bugs. It provides immediate feedback to developers if a data change breaks the expected format.

**Instructions:**

1.  **Step 4.1: Create a new test file `src/lib/rulesdata/rulesdata.spec.ts`**
    - Create this new file and populate it with the following content:

    ```typescript
    import { describe, it, expect } from 'vitest';
    import { classesDataSchema } from './schemas/class.schema';
    import { classesData } from './loaders/class.loader';
    import { traitsData as newTraitsData } from './_new_schema/traits';
    import { ancestriesData as newAncestriesData } from './_new_schema/ancestries';
    import { allSpells } from './spells-data/spells';
    import { allManeuvers } from './maneuvers';
    import { allTechniques } from './techniques';
    import { allItems } from './inventoryItems';

    describe('Rules Data Validation', () => {
    	it('should load and validate all class data against the Zod schema', () => {
    		expect(classesData.length).toBeGreaterThan(0);
    		expect(() => classesDataSchema.parse(classesData)).not.toThrow();
    	});

    	it('should ensure all new trait data is structured correctly', () => {
    		expect(newTraitsData.length).toBeGreaterThan(0);
    		// Basic check for core properties
    		newTraitsData.forEach((trait) => {
    			expect(trait).toHaveProperty('id');
    			expect(trait).toHaveProperty('name');
    			expect(trait).toHaveProperty('cost');
    			expect(trait).toHaveProperty('effects');
    		});
    	});

    	it('should ensure all new ancestry data is structured correctly', () => {
    		expect(newAncestriesData.length).toBeGreaterThan(0);
    		newAncestriesData.forEach((ancestry) => {
    			expect(ancestry).toHaveProperty('id');
    			expect(ancestry).toHaveProperty('name');
    			expect(ancestry).toHaveProperty('expandedTraitIds');
    		});
    	});

    	it('should ensure all spells have required properties', () => {
    		expect(allSpells.length).toBeGreaterThan(0);
    		allSpells.forEach((spell) => {
    			expect(spell).toHaveProperty('name');
    			expect(spell).toHaveProperty('school');
    			expect(spell).toHaveProperty('cost');
    			expect(spell).toHaveProperty('effects');
    		});
    	});

    	it('should ensure all maneuvers have required properties', () => {
    		expect(allManeuvers.length).toBeGreaterThan(0);
    		allManeuvers.forEach((maneuver) => {
    			expect(maneuver).toHaveProperty('name');
    			expect(maneuver).toHaveProperty('type');
    			expect(maneuver).toHaveProperty('cost');
    			expect(maneuver).toHaveProperty('description');
    		});
    	});

    	it('should ensure all techniques have required properties', () => {
    		expect(allTechniques.length).toBeGreaterThan(0);
    		allTechniques.forEach((technique) => {
    			expect(technique).toHaveProperty('name');
    			expect(technique).toHaveProperty('cost');
    			expect(technique).toHaveProperty('description');
    		});
    	});

    	it('should ensure all inventory items have required properties', () => {
    		expect(allItems.length).toBeGreaterThan(0);
    		allItems.forEach((item) => {
    			expect(item).toHaveProperty('itemType');
    			expect(item).toHaveProperty('name');
    		});
    	});
    });
    ```
