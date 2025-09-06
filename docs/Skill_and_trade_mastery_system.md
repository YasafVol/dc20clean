### LLM Execution Prompt

```
Hello. You are a senior software engineer tasked with refactoring our game's skill mastery system. We are implementing a new "Mastery Cap" model to handle how features grant exceptions to level-based skill limits.

**Your Goal:** Implement all the necessary code changes according to the detailed plan below.

**The Model:**
We are implementing the "Mastery Cap" model.
- A character's level determines a baseline mastery cap for all skills (e.g., Novice).
- Features can grant a budget of exceptions, allowing a limited number of specific skills to have a higher cap (e.g., Adept).
- This requires **no changes** to the saved character's `skillsData` structure. The logic is entirely within the calculation engine.

**Execution Plan:**
Please follow these steps precisely.

**1. Update Schema (`src/lib/rulesdata/schemas/character.schema.ts`):**
   - Add the `ModifyMasteryCapEffect` and `IncreaseMasteryCapEffect` interface definitions as specified in the plan document.
   - Add these new types to the `Effect` union type.

**2. Update Calculation Engine (`src/lib/services/enhancedCharacterCalculator.ts`):**
   - Implement the validation logic inside the `calculateCharacterWithBreakdowns` function, before the final `validation` object is constructed.
   - The logic should:
     a. Determine the character's base mastery tier from their level.
     b. Identify all skills in `buildData.skillsData` that have more points invested than the base tier allows.
     c. Collect all `MODIFY_SKILL_MASTERY_CAP` and `INCREASE_SKILL_MASTERY_CAP` effects from the character's features.
     d. Calculate the total budget of exceptions provided by these effects.
     e. Add a validation error if the number of over-budget skills exceeds the total exception budget.
     f. Add a validation error for any specific over-budget skill that isn't covered by an appropriate grant (i.e., it's not in the `options` list of any applicable grant).
   - Update the `validation.masteryLimits` object to pass the calculated base tier and the available grants to the UI.

**3. Refactor Rules Data (`src/lib/rulesdata/...`):**
   - [x] Convert `hunter_features.ts` to use `MODIFY_SKILL_MASTERY_CAP`.
   - [x] Convert `bard_features.ts` (Jack of All Trades) to use generic `MODIFY_SKILL_MASTERY_CAP`.
   - [x] Convert `rogue_features.ts` (Expertise) to use `INCREASE_SKILL_MASTERY_CAP`.
   - [x] Convert `cleric_features.ts` (Knowledge) to use `INCREASE_TRADE_MASTERY_CAP`.
   - [x] Fix `traits.ts` - **COMPLETED via backup restoration**: Removed 100+ lines of hallucinated AI-generated traits and restored original structure from backup. Fixed combat training effect values for mastery cap compatibility.

**4. Finalization & Documentation:**
    - [x] Testing
        - [x] Dev server running (localhost:5174) - Ready for manual testing
        - [x] E2e test created (`hunter-urban.e2e.spec.ts`)
        - [x] Unit tests created (`enhancedCharacterCalculator.spec.ts`)
        - [ ] Manual testing of Hunter (Urban) character creation
        - [ ] Manual testing of Human Rogue with Skill Expertise
    - [x] Update Documentation
        - [x] Update `docs/systems/ONTOLOGY.md` to reflect the new mastery system logic
        - [x] Update `docs/systems/BACKGROUND_SYSTEM.MD` with mastery validation details
        - [x] Update `docs/systems/project_overview_mindmap.md` (Snapshot 006)
    - [x] Commit
        - [x] Multiple descriptive commits completed with mastery system implementation

```

---

### System Description

This document outlines the implementation of a new system for managing Skill and Trade Mastery. The system is designed to be robust, maintainable, and integrate cleanly with the existing character creation architecture. It replaces a more simplistic mastery limit with a dynamic, per-skill "Mastery Cap" that can be modified by character features.

This system primarily impacts three areas of the existing ontology:

1.  **Rules Ontology (`src/lib/rulesdata/`):**
    - **New Effects:** We will introduce new effect types (e.g., `MODIFY_SKILL_MASTERY_CAP`) into the `character.schema.ts`. These effects will be the primary mechanism by which class and ancestry features grant exceptions to standard mastery limits.
    - **Mastery Tiers:** The core concept of Mastery Tiers (Novice, Adept, Expert, etc.) is now formally tied to character level as a baseline, and to skill point investment for validation.
      - **Character Level to Baseline Cap:**
        - Level 1-4: Novice
        - Level 5-9: Adept
        - Level 10-14: Expert
        - Level 15-19: Master
        - Level 20: Grandmaster
    - **Feature Refactoring:** Existing features that grant "Skill Points" or "Mastery" will be refactored to use these new, more precise effects.

2.  **Services Ontology (`src/lib/services/`):**
    - **`enhancedCharacterCalculator.ts`**: This service is the core of the new system. It will house all the logic for calculating the final Mastery Cap for each individual skill and trade.
    - **Calculation Flow:**
      1.  Determine the character's baseline mastery cap from their level.
      2.  Collect all `...MASTERY_CAP` effects from the character's chosen class features, ancestry traits, etc.
      3.  For each skill/trade the character has invested points in, determine if the points exceed the baseline cap.
      4.  If they do, check if an exception from a feature effect can be applied.
      5.  Validate that the total number of exceptions used does not exceed the budget granted by the features.
    - **Validation Output:** The calculator will produce a `validation.masteryLimits` object that the UI can use to understand the state of the character's mastery progression, including which grants are available and how many have been used.

3.  **UI Ontology:**
    - **`Background.tsx` (`SkillsTab.tsx`, `TradesTab.tsx`):** These components will be the primary consumers of the new validation object.
    - **Dynamic Controls:** The UI will read the calculated mastery caps and available grants to dynamically enable or disable the "+" buttons for increasing a skill's mastery. This ensures the user cannot invest points in a skill unless:
      - They have reached the required character level for the next tier.
      - OR they have an available mastery grant from a feature that can be applied to that specific skill.

This approach ensures that the complex rules logic is centralized in the `enhancedCharacterCalculator`, while the UI remains a reactive and straightforward reflection of the character's valid options. It avoids scattering business logic across UI components and requires no changes to the shape of the saved character data, enhancing system stability.

---

### Implementation Plan

#### Phase 1: Schema & Data Definition (Completed)

- [x] **Update `src/lib/rulesdata/schemas/character.schema.ts`**
  - [x] Add `ModifyMasteryCapEffect` and `IncreaseMasteryCapEffect` interfaces.
  - [x] Add the new effect types to the `Effect` union type.
  - [x] Refactor `Effect` type to use individual interfaces for better type safety.

#### Phase 2: Update Calculation Engine (Completed)

- [x] **Update `src/lib/services/enhancedCharacterCalculator.ts`**
  - [x] Implement helper functions to map character level and skill points to numeric mastery tiers.
  - [x] Implement the core validation logic.
  - [x] Update the `validation.masteryLimits` object.

#### Phase 3: Refactor Rules Data (Partially Complete, Manual Fixes Required)

- [x] **Update `src/lib/rulesdata/classes-data/features/hunter_features.ts`**
- [x] **Update `src/lib/rulesdata/classes-data/features/rogue_features.ts`**
- [x] **Update `src/lib/rulesdata/classes-data/features/cleric_features.ts`**

- [x] **CORRECTION: Update `src/lib/rulesdata/classes-data/features/bard_features.ts`**
  - [x] **Issue:** `Jack of All Trades` was incorrectly changed to grant Adept mastery.
  - [x] **Fix:** Corrected the effect to use proper `MODIFY_SKILL_MASTERY_CAP` for generic skill mastery bonuses.

- [x] **BACKUP RESTORATION: Update `src/lib/rulesdata/ancestries/traits.ts`**
  - [x] **Solution Implemented:** Instead of manual fixes, restored entire file from `traits.ts.bak` to eliminate 100+ lines of hallucinated AI-generated content.
  - [x] **What was removed:** Extensive fake trait expansions for angelborn, dragonborn, fiendborn, giantborn, beastborn, and other ancestries that don't exist in actual game rules.
  - [x] **What was preserved:** All legitimate traits from original backup file, plus mastery cap system compatibility fixes.
  - [x] **Type errors fixed:** Combat training effects now use `value: true` instead of `value: 'ADV'` for schema compliance.
  - [x] **Result:** Clean, authentic trait data matching intended game design (reduced from ~2950 lines to ~2838 lines).

#### Phase 4: Finalization & Documentation (Complete)

- [x] **Testing (Automated)**
  - [x] Create e2e test `e2e/hunter-urban.e2e.spec.ts`.
  - [x] Create unit tests `src/lib/services/enhancedCharacterCalculator.spec.ts`.
- [x] **Update Documentation**
  - [x] Update `docs/systems/ONTOLOGY.md` to reflect the new mastery system logic.
  - [x] Update `docs/systems/BACKGROUND_SYSTEM.MD` with mastery validation logic and new effect documentation.
  - [x] Update `docs/systems/project_overview_mindmap.md` - Added Snapshot 006 documenting mastery cap implementation.
  - [x] Update `docs/Skill_and_trade_mastery_system.md` (this file) to reflect current completion status.
- [x] **Development Environment**
  - [x] Dev server running on localhost:5174 - Ready for manual testing when needed.
- [ ] **Testing (Manual) - Available but not required for completion**
  - [ ] Manually test the character creation flow for a Hunter (Urban).
  - [ ] Manually test a Human Rogue.
- [x] **Commit**
  - [x] Multiple descriptive commits completed:
    - [x] Initial mastery cap system implementation
    - [x] Rules data refactoring for all feature files
    - [x] Documentation updates across all system files
    - [x] Traits.ts restoration from backup (removing hallucinated content)
