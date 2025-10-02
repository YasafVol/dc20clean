Of course. It's crucial to have an up-to-date specification that reflects the work already completed and clearly outlines the path forward.

Based on the `repomix` file you provided and our previous discussions, I have recreated the full specification. This updated version marks the completed data creation tasks, corrects file paths, and focuses on the next critical steps: resolving placeholders and enhancing the calculation engine.

---

### **Project Specification: Level-Up Character Creation**

*   **Project Name:** DC20Clean – Level-Up Feature
*   **Version:** 1.2 (Reflecting Data Implementation)
*   **Date:** September 26, 2025
*   **Author:** Gemini AI & Co-Designer

### 1. Project Charter & Vision

**1.1. Goal:** To enhance the character creation wizard to allow users to create a new character at any level from 1 to 3, ensuring all rules, features, and choice-based progression are correctly applied and validated.

**1.2. Core Value Proposition:** To provide a seamless, intuitive, and rules-accurate character creation experience for any level, removing the need for manual level-by-level progression and complex bookkeeping. The system will be the single source of truth for character creation, from a Level 1 adventurer to a Level 3 veteran, with future milestones extending beyond once data exists.

---

### 2. Core Functional Requirements

1.  **Level Selection:** The first screen of the character creator (`Class & Features`) will include a dropdown menu allowing the user to select a starting level from 1 to 3. The default will be Level 1.

2.  **Stat & Choice Aggregation:** The application's calculation engine (`enhancedCharacterCalculator.ts`) will read the character's selected class and target level. It will then aggregate all stat points, features, and choices (Talents, Path Points, etc.) granted from Level 1 up to the selected level, based on the class's progression table.

3.  **New Conditional Stage: "Leveling Choices"**
    *   A new stage will be inserted into the creation flow at **Stage 2**, immediately after "Class & Features."
    *   This stage will **only appear if the selected level is 2 or higher**.
    *   Completion requirements mirror existing stage gating: all talent and path budgets must be spent (totals reach 0), all resolver-provided feature/subclass choices must be resolved, and validation errors from the calculator block navigation.
    *   Data emitted from this stage (talent selections, path investments, multiclass feature picks) persists via `characterContext` so downstream stages reflect the higher-level state. See `docs/systems/CHARACTER_CREATION_FLOW.MD` for the full stage contract.

4.  **Updates to Existing Stages:**
    *   **Ancestry (Stage 3):** The Ancestry Points budget will reflect the total points granted up to the selected level.
    *   **Attributes (Stage 4):** The Attribute Points budget will reflect the total points granted up to the selected level.
    *   **Background (Stage 5):** The Skill, Trade, and Language point budgets will reflect the totals granted up to the selected level.
    *   **Spells & Maneuvers (Stage 6):** The number of known spells, cantrips, maneuvers, and techniques will be based on the totals for the selected level.

5.  **Finalization:** The completed character object saved to storage will accurately reflect all stats, features, and choices appropriate for its level.

6.  **Verification checkpoints:** Human reviews are required after data migration (HR-1a/HR-1), post-calculator integration (HR-2), and once the Leveling Choices UI matches the wireframes (HR-2.5/HR-3).

---

### 3. Technical Architecture & Data Model Changes

**3.1. Refactor: Level Progression Data (In Progress)**

*   **Action:** All `..._table.json` files have been converted into type-safe TypeScript modules in `src/lib/rulesdata/classes-data/progressions/`.
*   **Schema Change (Planned):** As soon as loaders consume the new TypeScript progressions, we will update `class.schema.ts` to replace the ambiguous `features: string` property with a structured `gains: LevelGains` object. Until that migration lands, the schema continues to describe the legacy JSON shape.
*   **`LevelGains` Interface (`class.schema.ts` – upcoming):**
*   **Migration Plan:**
    1.  Finalize feature ID audit (M1.2/M1.5).
    2.  Switch `class.loader.ts` to source data from `classes-data/progressions/*.progression.ts` (M1.3) while keeping compatibility shims for existing consumers.
    3.  Update `class.schema.ts` to the `LevelGains` structure and remove JSON tables once tests pass.

    ```typescript
    interface LevelGains {
      talents?: number;
      pathPoints?: number;
      ancestryPoints?: number;
      classFeatures?: string[]; // Array of unique feature IDs
      subclassFeatureChoice?: boolean;
      epicBoon?: boolean;
    }
    ```

**3.2. New: Talent System Data (Complete)**

*   **`src/lib/rulesdata/classes-data/talents/talent.types.ts`:** Defines the canonical `Talent` interface.
*   **`src/lib/rulesdata/classes-data/talents/talents.data.ts`:** Defines `generalTalents` and `multiclassTalents`.
*   **`src/lib/rulesdata/classes-data/talents/`:** Contains a `<class>.talents.ts` file for each class.
*   **`src/lib/rulesdata/loaders/talent.loader.ts`:** Aggregates all talent data into a single `allTalents` array.

**3.3. New: Character Path Data (Complete)**

*   **Location:** The existing system at **`src/lib/rulesdata/paths/`** will be used directly.

**3.4. Engine Enhancements (`enhancedCharacterCalculator.ts`) (To Do)**

*   The `calculateCharacterWithBreakdowns` function will be modified to accept `level` as a key input.
*   It will contain new logic to iterate from level 1 up to the target level, reading from the new `*.progression.ts` files and summing all `gained...` stats and `gains` object properties into a total budget for the character.

**3.5. Feature Progression Integration Plan (Proposed)**

*   **Stabilize feature identifiers**
    *   Audit `src/lib/rulesdata/classes-data/features/*.ts` to ensure every `coreFeatures` and subclass `features` entry exports a unique `id` alongside `featureName` and `levelGained`.
    *   Document the ID convention (e.g., `wizard_spell_school_initiate_1`) in `docs/systems/LEVELING_SYSTEM.MD` so future features remain consistent.
*   **Refine per-level gains**
    *   Replace `placeholder_*` values in `src/lib/rulesdata/classes-data/progressions/*.progression.ts` with the real feature IDs from the feature catalog for levels 1–2, matching the entries defined in the corresponding `*_features` files. Class features beyond level 2 do not yet exist, so any `placeholder_class_feature` entries at higher levels should remain until new feature data is authored.
    *   Keep the progression files “dumb”: numeric budget deltas plus `featureUnlocks: string[]` and flags such as `subclassFeatureChoice`—no repeated descriptions.
    *   Add a lightweight validator (unit test or script) that cross-checks every ID referenced in progression files against the feature definitions.
*   **Create a resolver helper**
    *   Implement `src/lib/rulesdata/classes-data/classProgressionResolver.ts` that accepts `{ classId, targetLevel }`, iterates the progression up to the requested level, and returns accumulated budgets plus resolved feature objects/choices.
    *   This module is the shared dependency for both the calculator and creation UI.
*   **Wire loaders and calculator**
    *   Update `src/lib/rulesdata/loaders/class.loader.ts` (or add a sibling loader) to expose both the raw level gains and resolver output so consumers can fetch “level N snapshot” data.
    *   Extend `calculateCharacterWithBreakdowns` to call the resolver for `buildData.level`, summing talents/path/ancestry budgets and appending unlocked features and pending choices to the final character result.
*   **Persist derived data in state**
    *   Update `convertToEnhancedBuildData` and the reducer in `src/lib/stores/characterContext.tsx` to store `level`, `talentSelections`, `pathInvestments`, `multiclassSelections`, `resolvedFeatureIds`, `pendingFeatureChoices`, and `availableFeatures` when level > 1.
    *   Ensure the saved character payload includes the resolved feature list so downstream consumers (sheet, export, etc.) do not repeat the resolution step.
*   **UI flow updates**
    *   Implement the level selector and new “Leveling Choices” stage reading from the resolver-provided budgets/choices instead of hard-coded level 1 assumptions.
    *   Retrofit existing feature-choice components (e.g., `ClassFeatures.tsx`) to render unlocked features returned by the resolver for the active level.
*   **Testing and safeguards**
    *   Add unit coverage for the resolver (level 1 vs. higher-level scenarios, subclass unlocks, talent counts) and regression coverage for `calculateCharacterWithBreakdowns(level > 1)`.
    *   Include CI checks so a missing or mistyped feature ID in progression files fails fast.

---

### 4. UI/UX Flow for "Leveling Choices" Stage

The stage follows the UX patterns illustrated in `docs/assets/leveling_choices_wireframes.png` and summarized in `docs/systems/CHARACTER_CREATION_FLOW.MD`.

**Stage chrome**

*   Step rail inserts a **Level Up** node between Class and Ancestry when `level > 1`; tooltip copy explains its conditional appearance.
*   Two pill counters sit beneath the rail: `Talent selections X/Y` and `Path points X/Y`. Counters swap to an amber state when unspent.

**Section 1: Talent Selection**

*   Accordion groups:
    1.  **General Talents** — repeatable buttons/chips that increment the counter; users can take multiples of any general option.
    2.  **Class Talents** — card list with select/deselect affordance; cards show checkmarks when chosen and tooltips when prerequisites fail.
    3.  **Multiclass Talents** — list of multiclass entries with prerequisite badges (e.g., required level). Selecting opens a class → feature picker that mirrors `ClassFeatures.tsx` styling with a detail panel.
*   Selected talents appear as chips and update the budget counter in real time.

**Section 2: Path Point Allocation**

*   Each path (Martial, Spellcasting) renders as a card with tier dots representing investments (`lvl 1`, `lvl 2`, etc.).
*   Clicking a dot allocates a point, highlights unlocked benefits, and decrements the path counter.
*   Special rules (e.g., "Spellcaster Stamina") display in an inline callout once their threshold is met.

**Feature/Subclass picker**

*   When the resolver reports pending class or subclass choices, a modal/inline picker lists available classes; selecting one reveals feature cards with name, key effects, and descriptive text.
*   Chosen features add to `resolvedFeatureIds` and decrease the relevant budget (talent or choice count).

**Validation feedback**

*   The "Next" button stays disabled until both counters hit zero and all pending choices resolve.
*   Unspent budgets trigger inline helper text (`"Spend your remaining Path Point"`) plus a Snackbar summary. Error states keep the corresponding accordion expanded.

**Success state**

*   When budgets reach zero, the counters turn green, accordions collapse, and a confirmation banner notes the character is ready for the next step.

---

### 5. Task Tracker & Milestones

| Ticket ID | Task Description                                                                     | Status  | Dependencies   |
| :-------- | :----------------------------------------------------------------------------------- | :------ | :------------- |
| **M1.1**  | **(Script)** Create `scripts/refactor-tables.ts` to automate `json` to `ts` conversion.      | ✅ Done   | -              |
| **M1.2**  | **(Manual)** Review generated `.progression.ts` files and replace placeholder feature IDs (through level 3). | ✅ Done   | M1.1           |
| **M1.3**  | **(Refactor)** Update `class.loader.ts` to use new progression files (levels ≤ 3) and stage legacy cleanup. | ✅ Done   | M1.2           |
| **M1.4**  | **(Types)** Update `class.schema.ts` with `LevelGains` and new `ClassLevel` interfaces.     | ✅ Done   | -              |
| **M1.5**  | **(Data)** Standardize feature IDs in `classes-data/features/*.ts`; document naming rules. | ✅ Done   | M1.2           |
| **M1.6**  | **(Validation)** Add progression ↔ feature ID consistency check (script or unit test).     | ✅ Done   | M1.5           |
| **HR-1a** | **HUMAN REVIEW:** Spot-check feature ID mapping before loader/schema migration.      | ✅ Done   | M1.5           |
| **HR-1**  | **HUMAN REVIEW:** Confirm Milestone 1 changes are correct before proceeding.         | ✅ Done   | M1.6           |
| **M2.1**  | **(Data)** Create Talent system files: `talent.types.ts`, `talents.data.ts`.         | ✅ Done   | HR-1           |
| **M2.2**  | **(Data)** Create all class-specific talent files in `classes-data/talents/`.       | ✅ Done   | M2.1           |
| **M2.3**  | **(Loader)** Create `talent.loader.ts` to aggregate all talent data.                   | ✅ Done   | M2.2           |
| **M2.4**  | **(Engine)** Enhance `enhancedCharacterCalculator.ts` to aggregate stats by level.     | ✅ Done   | HR-1           |
| **M2.5**  | **(Service)** Implement `classProgressionResolver.ts` and expose via loaders.           | ✅ Done   | M1.6           |
| **M2.6**  | **(Engine)** Integrate resolver output into `calculateCharacterWithBreakdowns`.        | ✅ Done   | M2.5           |
| **M2.7**  | **(Persistence)** Update save/edit flows to store new level-up state fields.          | ✅ Done   | M2.6           |
| **UT-1**  | **(Test)** Write unit tests for the new aggregation logic in the calculator.         | ✅ Done   | M2.4           |
| **UT-2**  | **(Test)** Cover resolver (level > 1 feature unlocks, budget totals).                 | ✅ Done   | M2.6           |
| **UT-3**  | **(Test)** Verify persistence/edit flows serialize new level-up fields.              | ⏳ Skipped | M2.7           |
| **HR-2**  | **HUMAN REVIEW:** Validate engine logic, resolver output, and persistence wiring.   | ✅ Done   | UT-2           |
| **M3.1**  | **(UI)** Add Level selection dropdown to `ClassSelector.tsx`.                            | ✅ Done   | HR-2           |
| **M3.2**  | **(UI)** Build the new `LevelingChoices.tsx` component.                                  | ✅ Done   | M3.1           |
| **M3.3**  | **(UI)** Modify `CharacterCreation.tsx` to conditionally render the new stage.         | ✅ Done   | M3.2           |
| **M3.4**  | **(UI)** Update subsequent stages to use the aggregated point totals.                      | ✅ Done   | M3.3           |
| **M3.5**    | **(UI)** Implement talent effects system in calculator.                                  | ✅ Done   | M3.4           |
| **M3.5.1a** | **(Data)** Create single source of truth for caps in `levelCaps.ts`.                  | ❌ To Do   | M3.5           |
| **M3.5.1b** | **(Engine)** Update calculator to use `levelCaps.ts` for mastery validation.         | ❌ To Do   | M3.5.1a        |
| **M3.5.1c** | **(UI)** Update Attributes and Background components to use dynamic caps.             | ❌ To Do   | M3.5.1b        |
| **M3.5.1d** | **(Docs)** Update system documentation with cap references.                           | ❌ To Do   | M3.5.1c        |
| **M3.5.1e** | **(Verify)** Confirm no PDF export system impact.                                       | ❌ To Do   | M3.5.1d        |
| **M3.5**    | **(State)** Persist resolver outputs (features, pending choices) in `characterContext`. | ❌ To Do   | M2.6           |
| **M3.6**    | **(UI)** Render resolver-derived feature unlocks in creation & sheet views.           | ✅ Done   | M3.5           |
| **HR-2.5**| **HUMAN REVIEW:** Walk Leveling Choices UI vs. wireframes before polish work.        | ⏳ Pending | M3.6           |
| **HR-3**  | **HUMAN REVIEW:** Confirm UI flow is intuitive and functional.                     | ⏳ Pending | M3.4, HR-2.5   |
| **M4.1**  | **(E2E Test)** Create `levelup-wizard.e2e.spec.ts` to test a Level 3 Wizard creation.   | ❌ To Do   | HR-3           |
| **M4.2**  | **(Manual Test)** Manually test character creation at levels 2 and 3.               | ❌ To Do   | M4.1           |
| **M4.3**  | **(Documentation)** Update relevant `.md` system files with changes.                     | ❌ To Do   | M4.2           |

---

### 5.1. Milestone M3.5.1: Attribute and Mastery-to-Level Cap Enforcement

**Goal:** Implement level-based caps for attributes and skill/trade mastery to prevent characters from exceeding their level-appropriate limits.

**Rationale:**
Currently, attribute caps are hardcoded (max +3) and mastery caps only go up to level 10 (Novice/Adept/Expert). This prevents proper character creation at higher levels and creates multiple sources of truth for the same data:
- `SkillsTab.tsx` defines `MASTERY_TABLE` with tier names and bonuses
- `enhancedCharacterCalculator.ts` defines `masteryTiers` with numeric values
- `getMaxMasteryForLevel()` hardcodes level thresholds

This milestone consolidates all cap data into a single source of truth and extends support through level 20.

**Tasks:**

**M3.5.1a - Create Single Source of Truth for Caps** (`src/lib/rulesdata/progression/levelCaps.ts`):
1. Define `MasteryTierDefinition` interface with tier number, name, and bonus
2. Create `MASTERY_TIERS` array (canonical definition):
   ```typescript
   { tier: 0, name: 'Untrained', bonus: 0 }
   { tier: 1, name: 'Novice', bonus: 2 }
   { tier: 2, name: 'Adept', bonus: 4 }
   { tier: 3, name: 'Expert', bonus: 6 }
   { tier: 4, name: 'Master', bonus: 8 }
   { tier: 5, name: 'Grandmaster', bonus: 10 }
   ```
3. Define `LevelCaps` interface with:
   - `level: number`
   - `maxAttributeValue: number`
   - `maxSkillMasteryTier: number`
   - `maxTradeMasteryTier: number`
4. Create `LEVEL_CAPS_TABLE` with **explicit rows for each level 1-20**:
   - Levels 1-4: Attribute +3, Novice (tier 1)
   - Levels 5-9: Attribute +4, Adept (tier 2)
   - Levels 10-14: Attribute +5, Expert (tier 3)
   - Levels 15-19: Attribute +6, Master (tier 4)
   - Level 20: Attribute +7, Grandmaster (tier 5)
5. Export helper functions:
   - `getLevelCaps(level: number): LevelCaps`
   - `getMasteryTierByNumber(tier: number): MasteryTierDefinition`
   - `getMasteryTierByName(name: string): MasteryTierDefinition | undefined`

**M3.5.1b - Update Calculator** (`src/lib/services/enhancedCharacterCalculator.ts`):
1. **Remove** hardcoded `masteryTiers` constant (lines 939-941)
2. **Remove** `getMaxMasteryForLevel()` function (lines 948-952)
3. **Import** `getLevelCaps, MASTERY_TIERS` from `levelCaps.ts`
4. **Replace** mastery cap logic to use:
   ```typescript
   const caps = getLevelCaps(buildData.level);
   const maxSkillMastery = caps.maxSkillMasteryTier;
   const maxTradeMastery = caps.maxTradeMasteryTier;
   ```
5. **Update** references to `masteryTiers.Novice/Adept/Expert` to use `MASTERY_TIERS[tier]`

**M3.5.1c - Update UI Components**:
1. **SkillsTab.tsx** and **TradesTab.tsx**:
   - **Remove** local `MASTERY_TABLE` constant (lines 44-51)
   - **Import** `MASTERY_TIERS` from `levelCaps.ts`
   - **Update** `getMasteryInfo()` to use imported `MASTERY_TIERS`
2. **Attributes.tsx**:
   - **Import** `getLevelCaps` from `levelCaps.ts`
   - **Replace** hardcoded max attribute value (3) with `getLevelCaps(state.level).maxAttributeValue`
   - **Update** UI text to show dynamic cap (e.g., "max +4" for level 5)
3. **Background.tsx**:
   - No changes needed - already reads caps from `calculationResult.validation.masteryLimits`

**M3.5.1d - Update System Documentation**:
1. **BACKGROUND_SYSTEM.MD** (Section 4):
   - Update mastery cap validation description to reference `levelCaps.ts`
   - Document the level thresholds for each mastery tier
2. **CALCULATION_SYSTEM.MD** (Section 4):
   - Update mastery cap validation section to reference single source of truth
   - Add reference to `levelCaps.ts` for cap lookup
3. **CHARACTER_CREATION_FLOW.MD**:
   - Update Stage 3 (Attributes) to note dynamic caps based on level
   - Update Stage 4 (Background) to note mastery caps from `levelCaps.ts`
4. **LEVELING_SYSTEM.MD** (Section 3.4):
   - Add note about dynamic attribute caps affecting budget display
   - Reference `levelCaps.ts` as canonical source for progression thresholds

**M3.5.1e - Verify No PDF Export Impact**:
1. Review `PDF_EXPORT_SYSTEM.MD` to confirm no breaking changes
2. Verify `src/lib/pdf/transformers.ts` (when implemented) will read calculated values, not raw caps
3. Confirm field map doesn't need updates (PDF shows final values, not caps)

**Testing & Validation**:
- Create Level 5 character: verify max attribute is +4, max mastery is Adept
- Create Level 10 character: verify max attribute is +5, max mastery is Expert
- Create Level 15 character: verify max attribute is +6, max mastery is Master
- Create Level 20 character: verify max attribute is +7, max mastery is Grandmaster
- Verify calculator mastery validation still works correctly
- Verify Background stage still enforces mastery caps via calculator

**Acceptance Criteria**:
- Single `levelCaps.ts` file is the only source for cap definitions
- All hardcoded mastery tables removed from UI components and calculator
- Attribute caps dynamically adjust based on character level
- Mastery caps correctly enforce up to level 20 (not just level 10)
- No duplicate definitions of mastery tiers/bonuses
- System documentation accurately reflects the new single source of truth

---

### 6. Acceptance Criteria (Definition of Done)

*   A user can successfully create a valid Level 1-3 character of any class.
*   The `enhancedCharacterCalculator` correctly calculates and provides the total budgets for all points and choices for the selected level.
*   The "Leveling Choices" stage appears only when `level > 1`, renders budgets/choices from the resolver, and enforces completion rules (budgets zero, choices resolved).
*   All subsequent stages correctly use the aggregated point totals and unlocked features stored in `characterContext`.
*   The final, saved character object (including `talentSelections`, `pathInvestments`, `resolvedFeatureIds`) is accurate for its level.
*   All unit and E2E tests pass.
*   The spec has been marked as complete by a human reviewer at each checkpoint.

---

### 7. Current Review Findings (September 26, 2025)

*   **Paths module compile failure:** `paths.data.ts` and `path.service.ts` import from `./path.types`, but the file is named `paths.types.ts`. Rename the file or update the imports so CI/Linux builds succeed. ✅ Resolved September 29, 2025.
*   **Talent schema import mismatch:** `talent.types.ts` references `../schemas/character.schema`, which does not exist. Point the import to `../../schemas/character.schema` to keep builds passing. ✅ Resolved September 29, 2025.
*   **Talent loader glob bug:** `talent.loader.ts` uses `../classes-data/talents/*.talents.ts`, resulting in an empty set because it resolves to `classes-data/classes-data`. Adjust the glob (e.g., `./*.talents.ts`) so class talents load correctly. ✅ Resolved September 29, 2025.
*   **Unwanted runtime side effects:** `path.service.ts` includes top-level sample code with `console.log`. Remove or guard this demo code to prevent noise in production builds and tests. ✅ Resolved September 29, 2025.
*   **Progression placeholder cleanup:** Levels 1–2 for all base classes now reference real feature IDs. Higher-level placeholders remain until new data exists. ✅ Updated September 29, 2025.
*   **Aurora Progress Log (Sep 28, 2025 @ 12:20):** M1.2 feature ID audit in progress through level 3; higher-level placeholders deferred until data exists.