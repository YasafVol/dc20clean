# System Ontology

**Creation date**: 05 SPT 2025
**Update date**: 15 JAN 2025

This document outlines the core concepts and components of the character creation system. It's divided into three main sections: UI, Services, and Rules.

## 1. UI Ontology

The UI for character creation is a multi-stage process, orchestrated by the `CharacterCreation.tsx` component. Each stage is represented by a dedicated set of components.

### Stages of Character Creation

1.  **Class & Features Selection**
    *   **Components**: `ClassSelector.tsx`, `ClassFeatures.tsx`
    *   **Elements**: List of available classes, detailed class feature descriptions, and options for feature selection (e.g., Cleric's Divine Domains).
    *   **Actions**: User selects a class, then chooses from available class-specific features.

2.  **Ancestry Selection**
    *   **Components**: `AncestrySelector.tsx`, `SelectedAncestries.tsx`, `AncestryPointsCounter.tsx`, `TraitChoiceSelector.tsx`
    *   **Elements**: List of ancestries, ancestry point counter, and a list of available traits for the selected ancestry.
    *   **Actions**: User selects an ancestry and spends ancestry points to acquire traits.

3.  **Attribute Allocation**
    *   **Components**: `Attributes.tsx`, `AttributePointsCounter.tsx`
    *   **Elements**: A list of attributes (e.g., Might, Agility), point counters, and increment/decrement buttons.
    *   **Actions**: User allocates a budget of points to increase or decrease attribute scores.

4.  **Background Definition**
    *   **Component**: `Background.tsx`
    *   **Tabs**:
        *   **Skills**: `SkillsTab.tsx`
        *   **Trades**: `TradesTab.tsx`
        *   **Languages**: `LanguagesTab.tsx`
    *   **Elements**: Point counters for each category, lists of skills, trades, and languages, and options for point allocation and conversion.
    *   **Actions**: User spends points to gain proficiency in skills, trades, and languages. They can also convert points between categories.

5.  **Spells and Maneuvers**
    *   **Component**: `SpellsAndManeuvers.tsx`
    *   **Elements**: Lists of available spells and maneuvers based on class and other selections.
    *   **Actions**: User selects their character's spells and maneuvers. (Note: This stage was skipped in the E2E test but is part of the flow).

6.  **Character Naming**
    *   **Component**: `CharacterName.tsx`
    *   **Elements**: Input fields for character name and player name.
    *   **Actions**: User provides names for their character.

7.  **Finalization**
    *   **Action**: User clicks a "Complete" or "Finish" button to save the character. The character data is then persisted, typically in local storage.

### Other UI Components

*   **`LoadCharacter.tsx`**: Allows users to load previously created characters.
*   **`ValidationFeedback.tsx`**: Provides feedback to the user if their choices are invalid.

## 2. Services Ontology

The services layer contains the business logic for character creation and calculation.

*   **`characterCompletion.ts`**: Handles the finalization of the character, preparing it for saving.
*   **`dataMapping.ts`**: Maps raw rules data into a format that's easier for the UI to consume.
*   **`enhancedCharacterCalculator.ts`**: A key service that performs complex calculations for derived character stats (e.g., health, mana, skill points) based on the character's attributes, class, ancestry, and other choices.
*   **`spellAssignment.ts`**: Manages the logic for assigning spells to a character.

## 3. Rules Ontology

This section describes the data structures and concepts that define the game's rules. This data is primarily located in `src/lib/rulesdata/`.

### Core Concepts

*   **Classes**: The character's primary archetype (e.g., Cleric, Wizard).
    *   **Location**: `src/lib/rulesdata/classes-data/`
    *   **Available Classes**: Barbarian, Bard, Champion, Cleric, Commander, Druid, Hunter, Monk, Psion, Rogue, Sorcerer, Spellblade, Warlock, Wizard.
    *   **Structure**: Each class has a set of features (`*_features.ts`) and progression tables (`*_table.json`).
    *   **Loaders**: `class.loader.ts` and `class-features.loader.ts` are used to load this data.

*   **Ancestries**: The character's heritage (e.g., Human, Elf).
    *   **Location**: `src/lib/rulesdata/ancestries/ancestries.ts`
    *   **Available Ancestries**: Human, Elf, Dwarf, Halfling, Gnome, Orc, Dragonborn, Giantborn, Angelborn, Fiendborn, Beastborn, Penguinborn, Gremlin, Goblin, Terraborn, Shadowborn, Psyborn.
    *   **Traits**: Each ancestry has a set of unique traits that a player can choose from.
        *   **Location**: `src/lib/rulesdata/ancestries/traits.ts`
        *   **Structure**: Traits have a cost and provide effects, such as modifying stats or granting abilities. They are categorized into `defaultTraitIds` and `expandedTraitIds` for each ancestry.

*   **Attributes**: The fundamental statistics of a character.
    *   **Location**: `src/lib/rulesdata/attributes.ts`
    *   **Examples**: Might, Intelligence, Agility, Charisma.

*   **Background**: A character's history and skills acquired outside of their class.
    *   **Skills**: `src/lib/rulesdata/skills.ts`
    *   **Trades**: `src/lib/rulesdata/trades.ts`
    *   **Languages**: `src/lib/rulesdata/languages.ts`

*   **Skill & Trade Mastery**: The system for determining a character's maximum proficiency in a given skill or trade.
    *   **Mastery Tiers**: Novice, Adept, Expert, Master, Grandmaster. Each tier corresponds to a specific number of points invested (1, 2, 3, 4, 5 respectively).
    *   **Baseline Mastery Cap**: A character's level determines the default maximum mastery tier they can achieve in any skill or trade.
        *   Level 1-4: Novice (Cap: 1 point)
        *   Level 5-9: Adept (Cap: 2 points)
        *   Level 10-14: Expert (Cap: 3 points)
        *   Level 15-19: Master (Cap: 4 points)
        *   Level 20: Grandmaster (Cap: 5 points)
    *   **Mastery Cap System**: ✅ **IMPLEMENTED** - A comprehensive system where:
        *   Character level determines baseline mastery caps for all skills/trades
        *   Class features and ancestry traits can grant a budget of exceptions using new effect types
        *   `MODIFY_SKILL_MASTERY_CAP` / `MODIFY_TRADE_MASTERY_CAP`: Grant specific mastery tier unlocks for a limited count of skills/trades
        *   `INCREASE_SKILL_MASTERY_CAP` / `INCREASE_TRADE_MASTERY_CAP`: Increase mastery cap by a specific amount for selected skills/trades
        *   Validation ensures over-budget skills don't exceed available exception grants
        *   All characters have 1 base Adept slot by default; additional Adept mastery requires feature grants
        *   All logic centralized in `enhancedCharacterCalculator.ts` with real-time UI validation

*   **Martial Abilities**
    *   **Maneuvers**: `src/lib/rulesdata/martials/maneuvers.ts`
    *   **Techniques**: `src/lib/rulesdata/martials/techniques.ts`
    *   **Stances**: `src/lib/rulesdata/martials/monk-stances.ts` (Monk-specific)

*   **Spells**: Magical abilities available to characters.
    *   **Location**: `src/lib/rulesdata/spells-data/`
    *   **Structure**: Spells are organized into categories (e.g., Fire and Flames, Holy and Restoration).

*   **Calculated Values**: These are values derived from the character's base statistics and choices. Examples include:
    *   **Health Points (HP)**
        *   **Formula**: `Might Attribute + HP from Class Level Table + HP from Effects`
    *   **Stamina Points (SP)**
        *   **Formula**: `Agility Attribute + SP from Class Level Table + SP from Effects`
    *   **Mana Points (MP)**
        *   **Formula**: `Intelligence Attribute + MP from Class Level Table + MP from Effects`
    *   **Defense Scores**
        *   **PD (Physical Defense)**: `8 + Combat Mastery + Agility + Intelligence + PD from Effects`
        *   **AD (Arcane Defense)**: `8 + Combat Mastery + Might + Charisma + AD from Effects`
    *   **Skill, Trade, and Language Points**
        *   **Skill Points**: `5 + Intelligence + Bonus from Effects - Conversions`
        *   **Trade Points**: `3 + Bonus from Effects - Conversions`
        *   **Language Points**: `2 + Bonus from Effects - Conversions`
    *   **Attack Bonuses**
        *   **Attack/Spell Check**: `Combat Mastery + Prime Attribute Modifier`
        *   **Martial Check**: `max(Acrobatics, Athletics)` where `Acrobatics = Agility + (Proficiency * 2)` and `Athletics = Might + (Proficiency * 2)`
    *   **Other Combat Stats**
        *   **Save DC**: `8 + Combat Mastery + Prime Attribute Modifier`
        *   **Initiative**: `Combat Mastery + Agility`

*   **Schemas**: Define the data structures for core concepts.
    *   **Location**: `src/lib/rulesdata/schemas/`
    *   **Files**: `character.schema.ts`, `class.schema.ts`, `spell.schema.ts`.
    *   **Effect System**: Enhanced with mastery cap support:
        *   `ModifyMasteryCapEffect`: Grants specific tier unlocks (e.g., "2 Adept mastery unlocks for urban skills")
        *   `IncreaseMasteryCapEffect`: Increases mastery cap by value for selected skills/trades
        *   Both support optional `options` array to restrict which skills/trades can benefit
        *   For resource maximums, targets should be `hpMax`, `spMax`, and `mpMax` (avoid `mp`)
