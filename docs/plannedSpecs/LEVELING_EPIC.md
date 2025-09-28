Of course. It's crucial to have an up-to-date specification that reflects the work already completed and clearly outlines the path forward.

Based on the `repomix` file you provided and our previous discussions, I have recreated the full specification. This updated version marks the completed data creation tasks, corrects file paths, and focuses on the next critical steps: resolving placeholders and enhancing the calculation engine.

---

### **Project Specification: Level-Up Character Creation**

*   **Project Name:** DC20Clean – Level-Up Feature
*   **Version:** 1.2 (Reflecting Data Implementation)
*   **Date:** September 26, 2025
*   **Author:** Gemini AI & Co-Designer

### 1. Project Charter & Vision

**1.1. Goal:** To enhance the character creation wizard to allow users to create a new character at any level from 1 to 5, ensuring all rules, features, and choice-based progression are correctly applied and validated.

**1.2. Core Value Proposition:** To provide a seamless, intuitive, and rules-accurate character creation experience for any level, removing the need for manual level-by-level progression and complex bookkeeping. The system will be the single source of truth for character creation, from a Level 1 adventurer to a Level 5 veteran.

---

### 2. Core Functional Requirements

1.  **Level Selection:** The first screen of the character creator (`Class & Features`) will include a dropdown menu allowing the user to select a starting level from 1 to 5. The default will be Level 1.

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
    *   Replace `placeholder_*` values in `src/lib/rulesdata/classes-data/progressions/*.progression.ts` with the real feature IDs from the feature catalog.
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
| **M1.2**  | **(Manual)** Review generated `.progression.ts` files and replace placeholder feature IDs. | ❌ **To Do** | M1.1           |
| **M1.3**  | **(Refactor)** Update `class.loader.ts` to use new progression files; delete old `tables/`. | ❌ To Do   | M1.2           |
| **M1.4**  | **(Types)** Update `class.schema.ts` with `LevelGains` and new `ClassLevel` interfaces.     | ✅ Done   | -              |
| **M1.5**  | **(Data)** Standardize feature IDs in `classes-data/features/*.ts`; document naming rules. | ❌ To Do   | M1.2           |
| **M1.6**  | **(Validation)** Add progression ↔ feature ID consistency check (script or unit test).     | ❌ To Do   | M1.5           |
| **HR-1**  | **HUMAN REVIEW:** Confirm Milestone 1 changes are correct before proceeding.         | ⏳ Pending | M1.3           |
| **M2.1**  | **(Data)** Create Talent system files: `talent.types.ts`, `talents.data.ts`.         | ✅ Done   | HR-1           |
| **M2.2**  | **(Data)** Create all class-specific talent files in `classes-data/talents/`.       | ✅ Done   | M2.1           |
| **M2.3**  | **(Loader)** Create `talent.loader.ts` to aggregate all talent data.                   | ✅ Done   | M2.2           |
| **M2.4**  | **(Engine)** Enhance `enhancedCharacterCalculator.ts` to aggregate stats by level.     | ❌ To Do   | HR-1           |
| **M2.5**  | **(Service)** Implement `classProgressionResolver.ts` and expose via loaders.           | ❌ To Do   | M1.6           |
| **M2.6**  | **(Engine)** Integrate resolver output into `calculateCharacterWithBreakdowns`.        | ❌ To Do   | M2.5           |
| **UT-1**  | **(Test)** Write unit tests for the new aggregation logic in the calculator.         | ❌ To Do   | M2.4           |
| **UT-2**  | **(Test)** Cover resolver (level > 1 feature unlocks, budget totals).                 | ❌ To Do   | M2.6           |
| **HR-2**  | **HUMAN REVIEW:** Validate engine logic and data structures are sound.              | ⏳ Pending | UT-1           |
| **M3.1**  | **(UI)** Add Level selection dropdown to `ClassSelector.tsx`.                            | ❌ To Do   | HR-2           |
| **M3.2**  | **(UI)** Build the new `LevelingChoices.tsx` component.                                  | ❌ To Do   | M3.1           |
| **M3.3**  | **(UI)** Modify `CharacterCreation.tsx` to conditionally render the new stage.         | ❌ To Do   | M3.2           |
| **M3.4**  | **(UI)** Update subsequent stages to use the aggregated point totals.                      | ❌ To Do   | M3.3           |
| **M3.5**  | **(State)** Persist resolver outputs (features, pending choices) in `characterContext`. | ❌ To Do   | M2.6           |
| **M3.6**  | **(UI)** Render resolver-derived feature unlocks in creation & sheet views.           | ❌ To Do   | M3.5           |
| **HR-3**  | **HUMAN REVIEW:** Confirm UI flow is intuitive and functional.                     | ⏳ Pending | M3.4           |
| **M4.1**  | **(E2E Test)** Create `levelup-wizard.e2e.spec.ts` to test a Level 5 Wizard creation.   | ❌ To Do   | HR-3           |
| **M4.2**  | **(Manual Test)** Manually test character creation at levels 2 and 4.               | ❌ To Do   | M4.1           |
| **M4.3**  | **(Documentation)** Update relevant `.md` system files with changes.                     | ❌ To Do   | M4.2           |

---

### 6. Acceptance Criteria (Definition of Done)

*   A user can successfully create a valid Level 1-5 character of any class.
*   The `enhancedCharacterCalculator` correctly calculates and provides the total budgets for all points and choices for the selected level.
*   The "Leveling Choices" stage appears only when `level > 1`, renders budgets/choices from the resolver, and enforces completion rules (budgets zero, choices resolved).
*   All subsequent stages correctly use the aggregated point totals and unlocked features stored in `characterContext`.
*   The final, saved character object (including `talentSelections`, `pathInvestments`, `resolvedFeatureIds`) is accurate for its level.
*   All unit and E2E tests pass.
*   The spec has been marked as complete by a human reviewer at each checkpoint.

---

### 7. Current Review Findings (September 26, 2025)

*   **Paths module compile failure:** `paths.data.ts` and `path.service.ts` import from `./path.types`, but the file is named `paths.types.ts`. Rename the file or update the imports so CI/Linux builds succeed.
*   **Talent schema import mismatch:** `talent.types.ts` references `../schemas/character.schema`, which does not exist. Point the import to `../../schemas/character.schema` to keep builds passing.
*   **Talent loader glob bug:** `talent.loader.ts` uses `../classes-data/talents/*.talents.ts`, resulting in an empty set because it resolves to `classes-data/classes-data`. Adjust the glob (e.g., `./*.talents.ts`) so class talents load correctly.
*   **Unwanted runtime side effects:** `path.service.ts` includes top-level sample code with `console.log`. Remove or guard this demo code to prevent noise in production builds and tests.