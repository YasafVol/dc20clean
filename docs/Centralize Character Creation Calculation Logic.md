

# Project Plan: Centralize Character Creation Engine v2.1 (with Code)

## 1. Executive Summary

This project will refactor the character creation data flow from a distributed, multi-hook system to a centralized, single-source-of-truth architecture. All character stat and validation calculations will be consolidated into `enhancedCharacterCalculator.ts`, which will be driven by a new, performant `useCharacterBuilder` hook. This plan prioritizes **safe migration** through parity testing, **performance** by preventing unnecessary re-renders, and **long-term maintainability** with strict typing and a feature-flagged rollout.

## 2. Phased Implementation Plan

### **Phase 0: Pre-flight Fixes & Scaffolding**

**Objective:** Address immediate blockers in the data pipeline and set up the foundational types and files for the refactor.

#### Task 0.1: Fix State-to-Build-Data Conversion (Complete Field Coverage)

*   **File:** `src/lib/services/enhancedCharacterCalculator.ts`
*   **Action:** Modify `convertToEnhancedBuildData` to correctly serialize the typed objects from `characterContext` state into the JSON strings the calculator currently expects. This is a critical fix to prevent data loss.
*   **Implementation:**
    ```typescript
    // In src/lib/services/enhancedCharacterCalculator.ts
    export function convertToEnhancedBuildData(contextData: any): EnhancedCharacterBuildData {
      return {
        id: contextData.id || '',
        finalName: contextData.finalName || '',
        finalPlayerName: contextData.finalPlayerName,
        level: contextData.level || 1,
        
        attribute_might: contextData.attribute_might || 0,
        attribute_agility: contextData.attribute_agility || 0,
        attribute_charisma: contextData.attribute_charisma || 0,
        attribute_intelligence: contextData.attribute_intelligence || 0,
        
        combatMastery: contextData.combatMastery || 1,
        
        classId: contextData.classId || '',
        ancestry1Id: contextData.ancestry1Id || undefined,
        ancestry2Id: contextData.ancestry2Id || undefined,
        
        selectedTraitIds: Array.isArray(contextData.selectedTraitIds)
          ? contextData.selectedTraitIds
          : [],
        selectedTraitChoices: contextData.selectedTraitChoices ?? {},
        featureChoices: contextData.selectedFeatureChoices ?? {},
        
        // FIX: Serialize live store objects into the JSON strings the engine expects
        skillsJson: JSON.stringify(contextData.skillsData ?? {}),
        tradesJson: JSON.stringify(contextData.tradesData ?? {}),
        // Default Common to fluent when empty to match current UI assumptions
        languagesJson: JSON.stringify(contextData.languagesData ?? { common: { fluency: 'fluent' } }),
        
        // Optional manual overrides supported by the engine
        manualPD: contextData.manualPD,
        manualAD: contextData.manualAD,
        manualPDR: contextData.manualPDR,

        lastModified: Date.now()
      };
    }
    ```
*   **Definition of Done:** The `convertToEnhancedBuildData` function correctly translates the live `state` object into the `EnhancedCharacterBuildData` format without losing information.

#### Task 0.2: Define Step-Aware Validation Schema

*   **File:** `src/lib/types/effectSystem.ts`
*   **Action:** Introduce `BuildStep` and `ValidationCode` enums. Update the `ValidationError` interface to be step-aware, use a `code`, and make legacy fields optional.
*   **Implementation:**
    ```typescript
    // In src/lib/types/effectSystem.ts
    export enum BuildStep {
      Class = 1,
      Ancestry = 2,
      Attributes = 3,
      Background = 4,
      SpellsAndManeuvers = 5,
      Finalize = 6
    }

    export type ValidationCode = 'POINTS_OVERBUDGET' | 'CHOICE_REQUIRED' | 'CAP_EXCEEDED' | 'MASTERY_RULE_VIOLATION';

    export interface ValidationError {
      step: BuildStep; // New: for navigation gating UI
      field: string;
      code: ValidationCode; // New: for stable error handling
      message: string;
      // Legacy fields made optional for backward compatibility during transition
      type?: 'attribute_limit' | 'points_exceeded' | 'required_choice' | 'mastery_limit';
      currentValue?: number;
      maxValue?: number;
    }
    ```
*   **Definition of Done:** The type system is updated to support the new, more robust validation model.

---

### **Phase 1: Build & Validate the New Engine**

**Objective:** Enhance the central calculator and prove its correctness against the legacy system using a "parity harness."

#### Task 1.1: Implement Legacy Characterization Tests (Parity Harness)

*   **File:** `src/tests/parity/characterEngine.parity.spec.ts`
*   **Action:** Create a test suite that runs character build fixtures through the legacy hooks to establish a "golden record" of their behavior.
*   **Implementation Snippet:**
    ```typescript
    // src/tests/parity/characterEngine.parity.spec.ts
    import { renderHook } from '@testing-library/react';
    import { useBackgroundPoints } from '../../routes/character-creation/components/BackgroundPointsManager';
    import { CharacterProvider, useCharacter } from '../../lib/stores/characterContext';
    // ... import fixtures

    // Helper: render context and apply fixture state via dispatch
    function renderContextWithFixture(fixtureState: any) {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <CharacterProvider>{children}</CharacterProvider>
      );
      const hook = renderHook(() => useCharacter(), { wrapper });
      // Initialize store with fixture
      hook.result.current.dispatch({ type: 'UPDATE_STORE', updates: fixtureState });
      return hook;
    }

    // This function will run a fixture through the old system
    function runLegacyCalculations(fixtureState: any) {
      const { result: bgResult } = renderHook(() =>
        useBackgroundPoints(
          /* skillPointsUsed */ Object.values(fixtureState.skillsData || {}).reduce((a, b) => a + (b || 0), 0),
          /* tradePointsUsed */ Object.values(fixtureState.tradesData || {}).reduce((a, b) => a + (b || 0), 0),
          /* languagePointsUsed */ Object.entries(fixtureState.languagesData || { common: { fluency: 'fluent' } })
            .reduce((sum, [id, d]: [string, any]) => id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2), 0),
          fixtureState.attribute_intelligence || 0,
          fixtureState.level || 1,
          /* classFeatures */ null,
          fixtureState.selectedFeatureChoices || {},
          fixtureState.skillsData || {},
          fixtureState.tradesData || {},
          fixtureState.selectedTraitIds || [],
          fixtureState
        )
      );

      // Attribute parity via context-derived values (legacy source of truth)
      const ctx = renderContextWithFixture(fixtureState);
      const attributePointsRemaining = ctx.result.current.attributePointsRemaining;

      // Standardized object with key outputs
      return {
        availableSkillPoints: bgResult.current.pointsData.availableSkillPoints,
        attributePointsRemaining,
      };
    }

    // ... your test cases using it.each(fixtures) ...
    ```
*   **Definition of Done:** The test harness can successfully run legacy hooks and produce a consistent output object for comparison.

#### Task 1.2: Enhance Calculator with Background Logic, Background Section & Step-Aware Validation

*   **File:** `src/lib/services/enhancedCharacterCalculator.ts`
*   **Action:** Port the logic from `useBackgroundPoints` into the calculator. Implement validation checks for all point pools (ancestry, attributes, skills, etc.) and push errors to the `validation.errors` array.
*   **Implementation Snippet:**
    ```typescript
    // In src/lib/services/enhancedCharacterCalculator.ts, inside calculateCharacterWithBreakdowns...

    // Compute background points (ported from useBackgroundPoints)
    const skills = JSON.parse(buildData.skillsJson || '{}') as Record<string, number>;
    const trades = JSON.parse(buildData.tradesJson || '{}') as Record<string, number>;
    const languages = JSON.parse(buildData.languagesJson || '{"common":{"fluency":"fluent"}}') as Record<string, { fluency: 'limited'|'fluent' }>;

    const skillPointsUsed = Object.values(skills).reduce((a, b) => a + (b || 0), 0);
    const tradePointsUsed = Object.values(trades).reduce((a, b) => a + (b || 0), 0);
    const languagePointsUsed = Object.entries(languages).reduce((sum, [id, d]) => id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2), 0);

    const bonus = (target: string) =>
      resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === target)
                     .reduce((s, e) => s + Number(e.value || 0), 0);

    const baseSkillPoints = 5 + buildData.attribute_intelligence + bonus('skillPoints');
    const baseTradePoints = 3 + bonus('tradePoints');
    const baseLanguagePoints = 2 + bonus('languagePoints');

    const { skillToTrade = 0, tradeToSkill = 0, tradeToLanguage = 0 } = (buildData as any).conversions || {};

    const availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);
    const availableTradePoints = baseTradePoints - tradeToSkill + (skillToTrade * 2) - tradeToLanguage;
    const availableLanguagePoints = baseLanguagePoints + (tradeToLanguage * 2);

    if (skillPointsUsed > availableSkillPoints) {
      errors.push({ step: BuildStep.Background, field: 'skillPoints', code: 'POINTS_OVERBUDGET', message: `You are ${skillPointsUsed - availableSkillPoints} skill point(s) over budget.` });
    }
    if (tradePointsUsed > availableTradePoints) {
      errors.push({ step: BuildStep.Background, field: 'tradePoints', code: 'POINTS_OVERBUDGET', message: `You are ${tradePointsUsed - availableTradePoints} trade point(s) over budget.` });
    }
    if (languagePointsUsed > availableLanguagePoints) {
      errors.push({ step: BuildStep.Background, field: 'languagePoints', code: 'POINTS_OVERBUDGET', message: `You are ${languagePointsUsed - availableLanguagePoints} language point(s) over budget.` });
    }

    // Attach background section to the result for the UI
    const background = {
      baseSkillPoints,
      baseTradePoints,
      baseLanguagePoints,
      availableSkillPoints,
      availableTradePoints,
      availableLanguagePoints,
      skillPointsUsed,
      tradePointsUsed,
      languagePointsUsed,
      conversions: { skillToTrade, tradeToSkill, tradeToLanguage }
    };
    ```
*   **Also Update Types:** Add a `background` section to `EnhancedCalculationResult` so the UI can consume it directly.
    ```typescript
    // src/lib/types/effectSystem.ts
    export interface EnhancedCalculationResult {
      // ...existing fields
      background?: {
        baseSkillPoints: number;
        baseTradePoints: number;
        baseLanguagePoints: number;
        availableSkillPoints: number;
        availableTradePoints: number;
        availableLanguagePoints: number;
        skillPointsUsed: number;
        tradePointsUsed: number;
        languagePointsUsed: number;
        conversions: { skillToTrade: number; tradeToSkill: number; tradeToLanguage: number };
      };
      validation: ValidationResult;
      // ...
    }
    ```
*   **Definition of Done:** The calculator is now the single source of truth for background point calculations and validation, and exposes a `background` section. All parity tests pass.

---

### **Phase 2: Integrate Engine and Migrate UI**

**Objective:** Wire the new engine into the application and refactor all UI components to consume it.

#### Task 2.1: Implement `useCharacterBuilder` and Enhance `CharacterProvider`

*   **File to Create:** `src/lib/hooks/useCharacterBuilder.ts`
*   **File to Modify:** `src/lib/stores/characterContext.tsx`
*   **Action:** Create the performant `useCharacterBuilder` hook. In `CharacterProvider`, call this hook and expose `calculationResult` on the context. Keep legacy `derivedValues` for now.
*   **Implementation Snippet:**
    ```typescript
    // src/lib/stores/characterContext.tsx
    import { useCharacterBuilder } from '../hooks/useCharacterBuilder';
    
    export function CharacterProvider({ children }: { children: ReactNode }) {
      const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);
      
      // The new central engine runs on every state change
      const calculationResult = useCharacterBuilder(state);
      
      // The old derived values, kept for the transition
      const derivedValues = useMemo(() => { /* ... old logic ... */ }, [state]);

      // Provide both the new result and the old values
      const contextValue = useMemo(() => ({
        state,
        dispatch,
        ...derivedValues, // DEPRECATED: to be removed in Phase 4
        calculationResult
      }), [state, dispatch, calculationResult, derivedValues]);

      return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>;
    }
    ```
*   **Definition of Done:** The new engine is running live. `calculationResult` is available to all components.

#### Task 2.2: Migrate `Background.tsx` and Deprecate `useBackgroundPoints`

*   **File to Modify:** `src/routes/character-creation/Background.tsx`
*   **Action:** This is the most critical migration. Remove the `useBackgroundPoints` hook and refactor the component to be a "dumb" presenter of data from `calculationResult`.
*   **Implementation Snippet:**
    ```typescript
    // src/routes/character-creation/Background.tsx
    import { InlineError } from './components/ValidationFeedback'; // Assuming created in a previous step

    const Background: React.FC = () => {
      const { state, dispatch, calculationResult } = useCharacter();
      const { background, validation } = calculationResult;

      if (!background) return null;

      const availableSkillPoints = background.availableSkillPoints;
      const skillPointsUsed = background.skillPointsUsed;
      
      return (
        <StyledContainer>
          <InlineError errors={validation.errors} currentStep={BuildStep.Background} />
          {/* ... */}
          <StyledPointsRemaining>
            Skill Points: {availableSkillPoints - skillPointsUsed} / {availableSkillPoints} remaining
          </StyledPointsRemaining>
          {/* ... */}
        </StyledContainer>
      );
    };
    ```
*   **Definition of Done:** `Background.tsx` is refactored. `BackgroundPointsManager.tsx` and its spec file are deleted.

#### Task 2.3: Refactor Navigation Logic

*   **File to Modify:** `src/routes/character-creation/CharacterCreation.tsx`
*   **Action:** Update the button logic to be driven by the central validator.
*   **Implementation Snippet:**
    ```typescript
    // src/routes/character-creation/CharacterCreation.tsx
    const { state, calculationResult } = useCharacter();
    const { validation } = calculationResult;
    
    const isStepValid = !validation.errors.some(e => e.step === state.currentStep);
    
    // The "Complete" button is only enabled if the entire build is valid.
    const isCompleteDisabled = state.currentStep === 6 && !validation.isValid;
    // The "Next" button is only disabled if the current step has errors.
    const isNextDisabled = state.currentStep < 6 && !isStepValid;

    // <StyledButton onClick={handleNext} disabled={isNextDisabled || isCompleteDisabled}>
    //   {state.currentStep === 6 ? 'Complete' : 'Next →'}
    // </StyledButton>
    ```
*   **Definition of Done:** Navigation is now controlled by the central engine's validation output.

---

### **Phase 3: Finalize and Clean Up**

**Objective:** Remove all deprecated code to finalize the new architecture.

#### Task 3.1: Final Deprecation and Cleanup

*   **Action:**
    1.  Delete the following files: `useAttributeCalculation.ts`, `traitCosts.ts`.
    2.  In `src/lib/stores/characterContext.tsx`, remove the entire `derivedValues` `useMemo` block and its properties from the `contextValue`.
*   **Definition of Done:** The codebase is fully migrated, clean, and relies only on the new centralized architecture.