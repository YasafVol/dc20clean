# Character Creator System Breakdown

This document provides a comprehensive breakdown of the Character Creator system in `dc20clean`. It covers user flows, data flows, calculations, state management, and the underlying data structure.

## 1. Project Structure

The Character Creator is built using a modular architecture within the `src` directory.

### Key Directories

- **Routes & UI**: `src/routes/character-creation`
  - Contains the main wizard component (`CharacterCreation.tsx`) and individual stage components (`ClassSelector.tsx`, `AncestrySelector.tsx`, etc.).
- **State Management**: `src/lib/stores`
  - `characterContext.tsx`: The central Redux-like store managing the character creation state.
- **Business Logic & Calculations**: `src/lib/services`
  - `enhancedCharacterCalculator.ts`: The core engine that processes the state, applies rules, calculates stats, and generates breakdowns.
- **System Data (BE Data)**: `src/lib/rulesdata`
  - Contains static data definitions for classes, ancestries, spells, items, etc. This acts as the "Backend" data source.

## 2. User Flows

The character creation process is a linear wizard with validation gating at each stage.

### Stages

1.  **Class & Features**
    - **User Action**: Select a Class -> Select Level (default 1) -> Select Class Features (e.g., Fighting Style, Cantrips).
    - **Validation**: Must select a class and resolve all required feature choices for the current level.
    - **Components**: `ClassSelector.tsx`, `ClassFeatures.tsx`.

2.  **Ancestry**
    - **User Action**: Select Ancestry (e.g., Human, Elf) -> Select Ancestry Traits.
    - **Validation**: Must select an Ancestry and spend Ancestry Points (must be >= 0 and remaining == 0).
    - **Components**: `AncestrySelector.tsx`, `SelectedAncestries.tsx`.

3.  **Attributes**
    - **User Action**: Allocate Attribute Points (Might, Agility, Charisma, Intelligence).
    - **Validation**: Must spend exactly the available Attribute Points (default 12).
    - **Components**: `Attributes.tsx`.

4.  **Background**
    - **User Action**: Select Skills, Trades, and Languages.
    - **Validation**: Must spend Skill Points exactly. Trade and Language points must not be overspent (conversions allowed).
    - **Components**: `Background.tsx` (tabs for Skills, Trades, Languages).

5.  **Spells & Maneuvers**
    - **User Action**: Select Spells (if caster) and Maneuvers (if martial).
    - **Validation**: Must select the exact number of Spells/Cantrips/Maneuvers allowed by Class and Level.
    - **Components**: `SpellsAndManeuvers.tsx`.

6.  **Character Name**
    - **User Action**: Enter Character Name and Player Name.
    - **Validation**: Fields must not be empty.
    - **Components**: `CharacterName.tsx`.

### Level Up Flow (Planned/WIP)

- **Trigger**: If `level > 1` in Stage 1.
- **Actions**: Select Talents, allocate Path Points (Martial/Spellcaster), resolve new Feature Choices.
- **Validation**: All budgets (Talent, Path) must be spent; all choices resolved.

## 3. Data Flows

The system uses a unidirectional data flow pattern.

1.  **State Update**: User interaction triggers an action (e.g., `SET_CLASS`, `UPDATE_ATTRIBUTE`) dispatched to `characterContext`.
2.  **Reducer**: `characterReducer` updates the `CharacterInProgressStoreData` state.
3.  **Calculation**: `enhancedCharacterCalculator` runs `calculateCharacterWithBreakdowns(state)` on every state change.
4.  **Derivation**: The calculator produces `EnhancedCalculationResult`, containing:
    - `stats`: Final calculated stats (HP, SP, MP, Attributes, Defenses).
    - `breakdowns`: Detailed source-to-value mappings for tooltips.
    - `validation`: Errors and warnings used for UI gating.
5.  **UI Render**: Components consume `state` for input values and `calculationResult` for display values and validation feedback.

## 4. Calculations (`enhancedCharacterCalculator.ts`)

The calculator is the "brain" of the system.

### Key Functions

- **`convertToEnhancedBuildData(contextData)`**: Normalizes the raw store state into a format ready for calculation.
- **`aggregateAttributedEffects(buildData)`**: Collects all active effects from:
  - Selected Traits
  - Class Features (Core & Subclass)
  - Selected Talents
  - Multiclass Features
  - Feature Choices (User selections)
- **`aggregateProgressionGains(...)`**: Calculates base resources (HP, SP, MP, Points) based on Class Level progression tables.
- **`createStatBreakdown(...)`**: Combines base values with active effects to produce final values and detailed breakdowns.
- **`validateAttributeLimits(...)`**: Checks if attributes are within valid ranges (e.g., max 3 at level 1).

### Calculated Stats

- **Attributes**: Base + Trait Bonuses + ASI (Ability Score Improvements).
- **Resources**: HP, SP, MP (derived from Class, Level, and Attributes).
- **Defenses**: Physical Defense (PD), Mystical Defense (MD).
- **Budgets**: Skill Points, Trade Points, Attribute Points remaining.

## 5. Stores (`characterContext.tsx`)

The state is a single large object `CharacterInProgressStoreData`.

### Core State Fields

- `level`: Current character level.
- `classId`: Selected Class ID.
- `ancestry1Id`, `ancestry2Id`: Selected Ancestries.
- `selectedTraitIds`: List of chosen Trait IDs.
- `attribute_might`, `attribute_agility`, `...`: Allocated points (raw).
- `skillsData`, `tradesData`, `languagesData`: Allocated points/selections.
- `selectedFeatureChoices`: Map of `choiceId` -> `selectedOption`.
- `selectedSpells`, `selectedManeuvers`: Lists of IDs.
- `selectedTalents`: Map of `talentId` -> `count`.
- `pathPointAllocations`: `{ martial: number, spellcasting: number }`.

## 6. BE System Data (`src/lib/rulesdata`)

The system relies on a structured set of static data files acting as the database.

- **Classes**: `classes-data/` (e.g., `barbarian.ts`, `wizard.ts`) - Defines features, progression tables, and starting stats.
- **Ancestries**: `ancestries/` - Defines ancestries and their available traits.
- **Traits**: `ancestries/traits.ts` - Definitions of individual traits and their effects.
- **Spells**: `spells-data/` - Database of spells.
- **Martials**: `martials/` - Database of maneuvers and techniques.
- **Items**: `inventoryItems.ts` - Weapons, armor, and gear.
- **Attributes/Skills/Trades**: `attributes.ts`, `skills.ts`, `trades.ts` - Definitions and metadata.

### Data Loading

- **Loaders**: `loaders/class.loader.ts` aggregates individual class files into a master list.
- **Direct Import**: Most data is imported directly from these files into the components or calculator.
