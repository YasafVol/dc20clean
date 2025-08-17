
### **A Unified Plan for a Robust Character Data Schema**

#### **1. Purpose of This Refactor**

The primary goal of this refactor is to evolve the character creation system from a partially descriptive model to a fully **structured, machine-readable data model**.

**The Problem:**
Currently, many character bonuses (especially from class features) are stored as plain text in `description` fields. The system then attempts to parse these strings with regular expressions to extract their mechanical effects. This approach is:
*   **Brittle:** A small change in wording (e.g., "grants +1 to AD" vs. "AD increases by 1") can break the calculation logic.
*   **Hard to Maintain:** Adding new features with new effects requires writing new, specific parsing logic in the calculator, making the code complex and error-prone.
*   **Not Scalable:** It's difficult to represent complex or conditional effects (e.g., "gain +2 PD only when not wearing armor") reliably with text parsing.
*   **Unclear:** It's difficult for developers to see at a glance what the exact mechanical impact of a feature is without cross-referencing the calculator's code.

**The Solution:**
We will implement a unified `Effect` schema. Every trait, class feature, and feature choice that has a mechanical impact will have a structured `effects` array. This array will explicitly define each bonus, ability, or modification in a format the calculation engine can understand directly, eliminating ambiguity and the need for string parsing.

**The Benefits:**
*   **Reliability:** Calculations will be based on concrete data, not fragile text parsing, making them accurate and predictable.
*   **Maintainability:** Game rules will be defined entirely within the JSON data files. Modifying a bonus is a simple data change, requiring no alteration to the calculation code.
*   **Scalability:** The system will be ableto handle any future feature, item, or status effect, no matter how complex, simply by defining its effects in the schema.
*   **Clarity:** The data becomes the single source of truth. Anyone can look at a feature's JSON definition and understand its precise mechanical effects.

---

#### **2. The Unified Data Schema: The `Effect` Model**

We will introduce a universal `Effect` interface that will be the cornerstone of our data model. This interface will be added to `src/types/index.ts` (or a relevant types file).

```typescript
// Proposed universal Effect interface
export interface Effect {
  type: 
    // Modifies a core number value
    | 'MODIFY_ATTRIBUTE'      // For Might, Agility, etc. (+1, -1)
    | 'MODIFY_STAT'           // For hpMax, mpMax, pd, ad, moveSpeed, jumpDistance, etc.
    
    // Grants a specific, named ability or status
    | 'GRANT_RESISTANCE'      // e.g., Fire Resistance (Half), Dazed Resistance (Condition)
    | 'GRANT_VULNERABILITY'   // e.g., Psychic Vulnerability (1)
    | 'GRANT_ADV_ON_SAVE'     // e.g., ADV on saves vs. 'Charmed'
    | 'GRANT_COMBAT_TRAINING' // e.g., 'Heavy_Armor'
    | 'GRANT_ABILITY'         // A descriptive gameplay feature, e.g., "Ignore Difficult Terrain"
    | 'GRANT_SPELL'           // Grants a specific spell
    
    // For choices the player makes
    | 'GRANT_CHOICE'          // Prompts user to select from a list, e.g., a Maneuver or Technique
    | 'GRANT_SKILL_EXPERTISE' // Increases skill mastery cap and level
    | 'GRANT_TRADE_EXPERTISE' // Increases trade mastery cap and level

    // For overriding default calculations
    | 'SET_VALUE'             // Overrides a value, e.g., setting Jump Distance calculation to use Might
  ;
  target: string;             // The ID of what is being affected, e.g., 'might', 'hpMax', 'Poison', 'athletics'
  value: any;                 // The magnitude of the effect, e.g., 1, 'half', 'Heavy_Armor'
  condition?: string;         // An optional condition for the effect to apply, e.g., 'not_wearing_armor'
  userChoice?: {              // For effects where the user must choose the specific target
    prompt: string;
    options?: string[];       // e.g., ['might', 'agility', 'charisma', 'intelligence']
  };
}
```

This `Effect` structure will be added to traits in `traits.ts` and, most importantly, to the feature and choice definitions within the `*_features.json` files.

---

#### **3. The New Calculation Flow**

The character calculation process will be refactored to be a pure "effects processor."

1.  **Data Aggregation:** The process starts by collecting all `Effect` objects from every choice the user has made:
    *   Default traits from the selected Ancestry/Ancestries.
    *   Manually selected Traits.
    *   Core features from the selected Class.
    *   Subclass features.
    *   Effects granted by choices made within features (e.g., the effects of the "Grassland" Favored Terrain option).

2.  **Effect Resolution:** The system will handle effects that require user input. For example, if an `Effect` has a `userChoice` for an attribute, the system will use the player's stored selection (e.g., `'might'`) to create a final, concrete `Effect` object like `{ type: 'MODIFY_ATTRIBUTE', target: 'might', value: 1 }`.

3.  **Effect Processing Engine:** A central processor function will iterate through the final list of all `Effect` objects and sort them into categories:
    *   **Stat Modifiers:** A summary object containing totals for attributes (`might: +1`), stats (`hpMax: +3`, `moveSpeed: +1`), etc.
    *   **Abilities List:** A simple array of strings for all granted abilities, resistances, and advantages to be displayed on the character sheet.
    *   **Conditional Modifiers:** A separate list of effects that have a `condition` field, to be handled by the UI in real-time.

4.  **Final Stat Calculation:** The calculator will:
    *   Start with the character's base attributes from point-buy.
    *   Fetch the class's base stats (HP, SP, MP, etc.) from its `*_table.json` file.
    *   Apply the aggregated **Stat Modifiers** from the processing engine.
    *   Perform the final derived calculations (e.g., `finalPD = 8 + CM + finalAgility + finalIntelligence + pd_modifiers`).

5.  **Render In-Game Abilities:** The **Abilities List** is passed directly to the `Features.tsx` component on the character sheet to be displayed for the player's reference during gameplay.

---

#### **4. The Refactoring Implementation Plan**

**Phase 1: Update Core Schema**
1.  Define the unified `Effect` interface as described above in `src/lib/rulesdata/types.ts`.

**Phase 2: Data Migration - Ancestry Traits**
1.  Go to `src/lib/rulesdata/traits.ts`.
2.  Iterate through every `ITrait` object.
3.  Convert the existing `effects` array to conform to the new, stricter `Effect` model. This is mostly a formality as this file is already well-structured.

    *   **Example (`elf_quick_reactions`):**
        ```typescript
        // FROM:
        effects: [{ type: 'MODIFY_PD', value: 1, condition: 'not_wearing_armor' }]
        // TO:
        effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]
        ```

**Phase 3: Data Migration - Class Features (The Core Task)**
1.  Go through each `*_features.json` file (e.g., `barbarian_features.json`).
2.  For every `feature`, `benefit`, and `option` that has a mechanical effect, add a corresponding `effects` array.
3.  Translate the descriptive text into structured `Effect` objects.

    *   **Example (`barbarian_features.json` -> Berserker -> Berserker Defense):**
        ```json
        // FROM:
        {
          "name": "Berserker Defense",
          "description": "While you aren't wearing Armor you gain +2 AD."
        }
        // TO:
        {
          "name": "Berserker Defense",
          "description": "While you aren't wearing Armor you gain +2 AD.",
          "effects": [
            { "type": "MODIFY_STAT", "target": "ad", "value": 2, "condition": "not_wearing_armor" }
          ]
        }
        ```

    *   **Example (`hunter_features.json` -> Favored Terrain -> Grassland):**
        ```json
        // FROM:
        {
          "name": "Grassland",
          "description": "Your Speed and Jump Distance increases by 1."
        }
        // TO:
        {
          "name": "Grassland",
          "description": "Your Speed and Jump Distance increases by 1.",
          "effects": [
            { "type": "MODIFY_STAT", "target": "moveSpeed", "value": 1 },
            { "type": "MODIFY_STAT", "target": "jumpDistance", "value": 1 }
          ]
        }
        ```
    *   **Flavor/In-Game Features**: Features like `Rage` or `Battlecry` that are activated in-game should be mapped to a single `GRANT_ABILITY` effect. Purely descriptive features will have no `effects` array.

**Phase 4: Refactor Calculation Services**
1.  **Rewrite `traitEffectProcessor.ts`:** Rename it to `effectProcessor.ts`. Its new job will be to take the aggregated list of all `Effect` objects (from traits, classes, etc.) and run the "Effect Processing Engine" logic described in the flow above.
2.  **Rewrite `characterCalculator.ts`:**
    *   Remove all regular expression parsing and string manipulation logic.
    *   Implement the "Data Aggregation" step to collect all effects.
    *   Call the new `effectProcessor.ts` to get the summary of modifiers.
    *   Implement the "Final Stat Calculation" step, applying the modifiers to base stats.
    *   Return both the final calculated stats *and* the list of granted abilities.

**Phase 5: Update Frontend State & UI**
1.  **`characterContext.tsx`**: Add state to store the user's choices for effects that require them (e.g., `featureEffectChoices: { 'human_attribute_increase': 'might' }`).
2.  **`ClassFeatures.tsx`**: Modify this component to render new input fields when an `Effect` object contains a `userChoice` property.
3.  **`CharacterSheetClean.tsx`**:
    *   The main stat sections (Defenses, Resources, etc.) will simply display the final calculated values.
    *   The `Features.tsx` component will be updated to receive and display the **Abilities List** generated by the calculator, ensuring all passive and active abilities are visible to the player.

Of course. This is the perfect next step. A comprehensive audit of every choice will create a clear roadmap for the refactor.

I will go through every Ancestry Trait and every Class Feature. For each item, I will list its name, note its current state, and specify the exact changes needed to conform to the new, robust schema.

### Key for the Analysis

*   **✅ Works Well / No Change:** The current implementation is already structured or is purely descriptive (flavor) and doesn't need mechanical changes.
*   **🔄 Needs Refactor to Effects Array:** The feature has mechanical benefits described in a string that must be converted into a machine-readable `effects` array. I will provide the target schema.
*   **ℹ️ In-Game Ability / Flavor:** This feature grants an ability to be used in-game or is purely for roleplaying. It should be mapped to `type: 'GRANT_ABILITY'` so it can be listed on the character sheet, but it won't affect the calculated stat block.

---

### Full Ancestry Trait Analysis (`traits.ts`)


**✅ Works Well:** Your `effects` array on most traits is a solid foundation. The main change is standardizing the `type` and `target` properties for the new universal effect processor.

#### Human Traits
*   `human_attribute_increase`: ✅ **Works Well**. The `userChoiceRequired` is the correct pattern.
*   `human_skill_expertise`: ✅ **Works Well**.
*   `human_resolve`: 🔄 **Needs Refactor (Minor)**. `type: 'MODIFY_DEATH_THRESHOLD_MODIFIER'` should be standardized.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'deathThresholdModifier', value: 1 }]`
*   `human_undying`: ✅ **Works Well**. Standardize to `type: 'GRANT_ADV_ON_SAVE'`.
*   `human_trade_expertise`: ✅ **Works Well**.
*   `human_determination`: ℹ️ **In-Game Ability**. The effect is conditional and situational.
    *   **Proposed:** `effects: [{ type: 'GRANT_ABILITY', value: 'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.' }]`
*   `human_unbreakable`: ✅ **Works Well**. Standardize to `type: 'GRANT_ADV_ON_SAVE'`.
*   `human_attribute_decrease`: ✅ **Works Well**.

#### Elf Traits
*   `elf_elven_will`: ✅ **Works Well**. `target` can be an array: `target: ['Charmed', 'Sleep_Magic']`.
*   `elf_nimble`: ℹ️ **In-Game Ability**.
    *   **Proposed:** `effects: [{ type: 'GRANT_ABILITY', value: 'When you take the Dodge Action, you gain the benefits of the Full Dodge Action.' }]`
*   `elf_agile_explorer`: ℹ️ **In-Game Ability**.
    *   **Proposed:** `effects: [{ type: 'GRANT_ABILITY', value: 'You are not affected by Difficult Terrain.' }]`
*   `elf_discerning_sight`: ℹ️ **In-Game Ability**.
    *   **Proposed:** `effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Discern Visual Illusions', value: 'ADV' }]`
*   `elf_quick_reactions`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]`
*   `elf_peerless_sight`: ℹ️ **In-Game Ability**.
    *   **Proposed:** `effects: [{ type: 'GRANT_ABILITY', value: 'You do not have DisADV on Ranged Weapon Attacks at Long Range.' }]`
*   `elf_climb_speed`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }]`
*   `elf_speed_increase`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }]`
*   `elf_brittle`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'ad', value: -1 }]`
*   `elf_frail`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: -2 }]`
*   `elf_might_decrease`: ✅ **Works Well**.

#### Dwarf Traits
*   `dwarf_tough`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]`
*   `dwarf_toxic_fortitude`: ✅ **Works Well**.
    *   **Proposed:** `effects: [{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' }, { type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: 'ADV' }]`
*   `dwarf_physically_sturdy`: ✅ **Works Well**. `target` can be an array.
*   `dwarf_iron_stomach`: ℹ️ **In-Game Ability**.
*   `dwarf_thick_skinned`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]`
*   `dwarf_natural_combatant`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true }, { type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true }]`
*   `dwarf_stone_blood`: ℹ️ **In-Game Ability**.
*   `dwarf_minor_tremorsense`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 }]`
*   `dwarf_stubborn`: ✅ **Works Well**.
*   `dwarf_earthen_knowledge`: ℹ️ **In-Game Ability**.
*   `dwarf_charisma_attribute_decrease`: ✅ **Works Well**.
*   `dwarf_short_legged`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]`

*(The pattern for other ancestries like Halfling, Gnome, Orc, etc., follows the same logic as above. I will highlight only the most illustrative examples moving forward to maintain clarity.)*

#### Dragonborn Traits
*   `dragonborn_draconic_resistance`: 🔄 **Needs Refactor**. The target depends on the origin choice.
    *   **Proposed:** `effects: [{ type: 'GRANT_RESISTANCE', target: 'origin_damage_type', value: 'half' }]`
*   `dragonborn_draconic_breath_weapon`: ℹ️ **In-Game Ability**.
*   `dragonborn_mana_increase`: 🔄 **Needs Refactor**.
    *   **Proposed:** `effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }]`

---

### Part 2: Full Class Feature Analysis (`*_features.json`)

This is where the most significant refactoring is required, as these files currently have no `effects` arrays.

#### Barbarian
*   **Martial Path**: 🔄 **Needs Refactor**.
    *   `combatTraining`: Should be converted to `effects`. `[{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true }, ...]`
    *   `maneuvers.learnsAllAttack`: This is a key mechanical rule. `effects: [{ type: 'GRANT_MANEUVERS', value: 'all_attack' }]`
*   **Rage**: ℹ️ **In-Game Ability**. The description is complex and describes a temporary state. It should be granted as an ability for the player to track. `effects: [{ type: 'GRANT_ABILITY', name: 'Rage', description: '...' }]`
*   **Berserker**: 🔄 **Needs Refactor**. This feature has multiple mechanical benefits that need to be broken out.
    *   `Berserker Defense`: `effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }]`
    *   `Fast Movement`: `effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1, condition: 'not_wearing_armor' }]`
    *   `Mighty Leap`: `effects: [{ type: 'SET_VALUE', target: 'jumpCalculationAttribute', value: 'might' }]`
*   **Shattering Force**: ℹ️ **In-Game Ability**.
*   **Battlecry**: ℹ️ **In-Game Ability** with a player choice.

#### Champion
*   **Master-at-Arms**: 🔄 **Needs Refactor**.
    *   `Maneuver Master`: "learn 2 Maneuvers of your choice" -> `effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 2 }]`
    *   `Technique Master`: "learn 1 Technique of your choice" -> `effects: [{ type: 'GRANT_CHOICE', target: 'technique', value: 1 }]`
*   **Fighting Spirit**: ℹ️ **In-Game Ability**.
*   **Know Your Enemy**: ℹ️ **Flavor/In-Game**.
*   **Adaptive Tactics**: ℹ️ **In-Game Ability**.

#### Cleric
*   **Spellcasting Path**: 🔄 **Needs Refactor**.
    *   `combatTraining`: Convert to `effects` array.
    *   `spellList`: The `betaNote` should be part of the `description`. The list of schools should be structured data.
*   **Cleric Order**: 🔄 **Needs Refactor**.
    *   `Divine Damage`: This is a choice for the player. `effects: [{ type: 'GRANT_CHOICE', target: 'divineDamageType', options: ['Cold', 'Fire', ...] }]`
    *   `Divine Domain`: The main choice. `effects: [{ type: 'GRANT_CHOICE', target: 'divineDomain', value: 2 }]`
*   **Divine Domains (Options within a choice)**: 🔄 **Needs Major Refactor**. Each option needs an `effects` array.
    *   `Magic` option: `effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }, { type: 'GRANT_CHOICE', target: 'spellByTag', value: 1 }]`
    *   `Peace` option: `effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true }, ...]`
    *   `Ancestral` option: `effects: [{ type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }]`
*   **Knowledge**: 🔄 **Needs Refactor**.
    *   "Mastery Limit increases by 1 for all Knowledge Trades" -> `effects: [{ type: 'MODIFY_STAT', target: 'knowledgeMasteryLimit', value: 1 }]`
    *   "you gain 2 Skill Points" -> `effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }]`
*   **Divine Blessing**: ℹ️ **In-Game Ability**.

#### Hunter
*   **Favored Terrain**: 🔄 **Needs Major Refactor**. Each option needs an `effects` array.
    *   `Grassland` option: `effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }, { type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 }]`
    *   `Desert` option: `effects: [{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' }, { type: 'GRANT_RESISTANCE', target: 'Exhaustion_Hot_Temp', value: true }]`
    *   `Subterranean` option: `effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }, { type: 'GRANT_SENSE', target: 'tremorsense', value: 3 }]`
*   **Hunter's Mark / Hunter's Strike**: ℹ️ **In-Game Abilities**.
*   **Bestiary**: ℹ️ **Flavor/In-Game**.

#### Monk
*   **Monk Training**: 🔄 **Needs Refactor**.
    *   `Iron Palm`: `effects: [{ type: 'GRANT_ABILITY', name: 'Iron Palm', value: 'Unarmed strikes deal 1 Bludgeoning and have the Impact property.' }]`
    *   `Patient Defense`: `effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 2, condition: 'not_wearing_armor' }]`
    *   `Step of the Wind`: `effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1, condition: 'not_wearing_armor' }, { type: 'MODIFY_STAT', target: 'jumpDistance', value: 1, condition: 'not_wearing_armor' }, { type: 'SET_VALUE', target: 'jumpCalculationAttribute', value: 'prime' }]`
*   **Monk Stance**: ℹ️ **In-Game Ability**. This is a choice of which stances you *know*, not a permanent stat change. `effects: [{ type: 'GRANT_CHOICE', target: 'knownStance', value: 2 }]`

#### Rogue
*   **Debilitating Strike**: ℹ️ **In-Game Ability**.
*   **Roguish Finesse**: 🔄 **Needs Refactor**.
    *   `Skill Expertise`: "Your Skill Mastery Limit increases by 1" -> `effects: [{ type: 'MODIFY_STAT', target: 'skillMasteryLimit', value: 1 }]`
    *   `Multi-Skilled`: "You gain 1 Skill Point" -> `effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 1 }]`
*   **Cheap Shot**: ℹ️ **In-Game Ability**.

#### Sorcerer
*   **Innate Power**: 🔄 **Needs Refactor**.
    *   "Your Maximum MP increases by 1" -> `effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }, ...]`
*   **Sorcerous Origins (Choice)**: 🔄 **Needs Refactor**. Options need effects.
    *   `Intuitive Magic`: `effects: [{ type: 'MODIFY_STAT', target: 'spellsKnown', value: 1 }, { type: 'MODIFY_STAT', target: 'cantripsKnown', value: 1 }]`
    *   `Resilient Magic`: `effects: [{ type: 'GRANT_RESISTANCE', target: 'Dazed', value: 'condition' }]`
*   **Overload Magic / Meta Magic**: ℹ️ **In-Game Abilities**.

#### Spellblade
*   **Spellblade Disciplines (Choice)**: 🔄 **Needs Major Refactor**.
    *   `Magus` option: `effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }, { type: 'MODIFY_STAT', target: 'spellsKnown', value: 1 }]`
    *   `Warrior` option: `effects: [{ type: 'GRANT_COMBAT_TRAINING', ... }, { type: 'GRANT_CHOICE', target: 'maneuver', value: 2 }]`

#### Warlock
*   **Hasty Bargain / Desperate Bargain**: ℹ️ **In-Game Abilities**.
*   **Pact Boon (Choice)**: 🔄 **Needs Major Refactor**. These are complex bundles of effects.
    *   `Pact Armor`: `effects: [{ type: 'GRANT_COMBAT_TRAINING', ... }, { type: 'GRANT_CHOICE', target: 'defensiveManeuver', value: 3 }, { type: 'MODIFY_STAT', target: 'mdr', value: 1 }, ...]`
*   **Life Tap**: ℹ️ **In-Game Ability**.

#### Wizard
*   **Spell School Initiate**: 🔄 **Needs Refactor**.
    *   `School Magic`: This choice depends on another choice (which school). This is a dependent choice.
        *   The feature grants a choice: `effects: [{ type: 'GRANT_CHOICE', target: 'wizardSchool', options: ['Abjuration', 'Conjuration', ...] }]`
        *   A separate effect would be: `effects: [{ type: 'GRANT_SPELL', count: 1, filter: { school: 'wizardSchool' } }, { type: 'GRANT_CANTRIP', count: 1, filter: { school: 'wizardSchool' } }]`
*   **Arcane Sigil / Prepared Spell**: ℹ️ **In-Game Abilities**.

---

#### **5. The Complete, Definitive Data Schema**

Based on the comprehensive analysis above, here is the full, production-ready schema designed to make all character creation choices machine-readable and robust.

This schema is presented as a set of TypeScript interfaces, which can be placed in `src/lib/rulesdata/schemas/character.schema.ts`. It consolidates and formalizes all the concepts discussed throughout this plan.

The core of this architecture is the Effect interface, a universal model for describing any mechanical change to a character.

```typescript
/**
 * @file src/lib/rulesdata/schemas/character.schema.ts
 * @description The definitive schema for all character creation data, designed for robust, machine-readable processing.
 */

// ================================================================= //
// I. CORE EFFECT MODEL - The Heart of the System
// ================================================================= //

/**
 * A universal, machine-readable representation of a single mechanical effect.
 * This can be attached to traits, class features, choices, items, etc.
 */
export interface Effect {
  /** The action to be performed by the calculation engine. */
  type:
    // --- Stat & Attribute Modification ---
    | 'MODIFY_ATTRIBUTE'        // Modifies a core attribute (Might, Agility, etc.).
    | 'MODIFY_STAT'             // Modifies a derived or resource stat (hpMax, pd, moveSpeed, etc.).
    | 'SET_VALUE'               // Overrides a stat with a specific value or another stat's value.

    // --- Grants & Abilities ---
    | 'GRANT_ABILITY'           // Grants a descriptive, in-game ability or feature.
    | 'GRANT_RESISTANCE'        // Grants resistance to damage types or conditions.
    | 'GRANT_VULNERABILITY'     // Grants vulnerability to a damage type.
    | 'GRANT_ADV_ON_SAVE'       // Grants advantage on saves against specific conditions or types.
    | 'GRANT_ADV_ON_CHECK'      // Grants advantage on specific skill/ability checks.
    | 'GRANT_COMBAT_TRAINING'   // Grants proficiency with armor, weapons, or shields.
    | 'GRANT_MOVEMENT'          // Grants a special movement type like Climb or Swim.
    | 'GRANT_SENSE'             // Grants a sense like Darkvision or Tremorsense.

    // --- Choices & Progression ---
    | 'GRANT_CHOICE'            // Grants the player a choice (e.g., learn 2 maneuvers).
    | 'GRANT_SKILL_EXPERTISE'   // A specific effect for Human/Rogue skill expertise.
    | 'GRANT_TRADE_EXPERTISE'   // A specific effect for Human trade expertise.
    | 'GRANT_SPELL'             // Grants a known spell.
    | 'GRANT_CANTRIP'           // Grants a known cantrip.
    ;

  /** The specific stat, attribute, or item being affected. Standardized for the calculator. */
  target: string; // e.g., 'might', 'hpMax', 'pd', 'ad', 'moveSpeed', 'jumpDistance', 'deathThresholdModifier', 'skillPoints', 'ancestryPoints', 'maneuver', 'technique', 'Poison', 'Charmed', 'Heavy_Armor', 'climb', 'darkvision', 'any_attribute', 'any_skill'

  /** The value of the effect. Can be a number, string, or complex object. */
  value: number | string | boolean | { [key: string]: any }; // e.g., 1, -1, 'half', 'equal_to_speed', true, { capIncrease: 1, levelIncrease: 1 }

  /** An optional condition under which this effect is active. */
  condition?: string; // e.g., 'not_wearing_armor', 'bloodied'

  /** If this effect requires a choice from the player to be resolved. */
  userChoice?: {
    prompt: string;
    options?: string[]; // e.g., ['might', 'agility', 'charisma', 'intelligence']
  };
}


// ================================================================= //
// II. ANCESTRY & TRAIT SCHEMAS
// ================================================================= //

export interface Trait {
  id: string;
  name: string;
  description: string;
  cost: number;
  isMinor?: boolean;
  isNegative?: boolean;
  prerequisites?: string[];
  effects: Effect[]; // Every mechanical benefit is now an Effect.
}

export interface Ancestry {
  id: string;
  name: string;
  description: string;
  defaultTraitIds: string[];
  expandedTraitIds: string[];
  origin?: {
    prompt: string;
    options: string[];
  };
  variantTraits?: Trait[];
}


// ================================================================= //
// III. CLASS & FEATURE SCHEMAS
// ================================================================= //

/** A named benefit within a larger class feature, containing its own effects. */
export interface FeatureBenefit {
  name: string;
  description: string;
  effects: Effect[];
}

/** An option a player can select as part of a feature choice. */
export interface FeatureChoiceOption {
  name: string;      // The value/ID of the option.
  description: string;
  effects: Effect[]; // Effects granted if this specific option is chosen.
}

/** A choice presented to the player by a class feature. */
export interface FeatureChoice {
  id: string; // A unique ID for this choice, e.g., "cleric_divine_domain_choice"
  prompt: string;
  count: number; // Number of options the player must select.
  options: FeatureChoiceOption[];
}

/** A single class feature, either core or from a subclass. */
export interface ClassFeature {
  featureName: string;
  levelGained: number;
  description: string;
  isFlavor?: boolean;
  /** Direct effects of the feature, applied automatically. */
  effects?: Effect[];
  /** Named sub-sections of a feature, each with its own effects. */
  benefits?: FeatureBenefit[];
  /** Choices the player must make to fully define the feature. */
  choices?: FeatureChoice[];
}

/** A subclass option for a given class. */
export interface Subclass {
  subclassName: string;
  description?: string;
  features: ClassFeature[];
}

/** The complete, robust definition for a single class. */
export interface ClassDefinition {
  className: string;
  // This section contains data derived from the level progression table for easy access at Lvl 1.
  startingStats: {
      hp: number;
      sp: number;
      mp: number;
      skillPoints: number;
      tradePoints: number;
      languagePoints: number;
      maneuversKnown: number;
      techniquesKnown: number;
      cantripsKnown: number;
      spellsKnown: number;
  };
  coreFeatures: ClassFeature[];
  subclasses: Subclass[];
}

---

#### **6. How It All Works Together: An Example Flow**

This schema creates a powerful and predictable system. Here's how the data flows during character creation and calculation for a Level 1 Human Barbarian:

**Player Choices (Input):**

1. **Ancestry**: `human`
2. **Class**: `barbarian`
3. **Trait Choice**: Player selects `human_attribute_increase`. The UI prompts with "Choose an Attribute...". The player selects "Might". The frontend stores this choice: `{ 'human_attribute_increase_effect_0': 'might' }`.
4. **Attribute Buy**: The player sets their base attributes.

**Effect Aggregation (The "What"):**

The `characterCalculator` starts. It gathers all Effect objects from the player's choices.

- From `human` ancestry → `human_resolve` trait → `effects: [{ type: 'MODIFY_STAT', target: 'deathThresholdModifier', value: 1 }]`
- From `human_attribute_increase` trait → `effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute', ... }]`. The calculator sees the `userChoice` and resolves `target` to `'might'`.
- From `barbarian` class → `Berserker` feature → `Berserker Defense` benefit → `effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }]`

...and so on, for every single chosen item.

**Effect Processing (The "How"):**

The calculator now has a flat list of resolved Effect objects. It iterates through this list.

- It sees `{ type: 'MODIFY_ATTRIBUTE', target: 'might', value: 1 }` and adds +1 to a running total for Might modifications.
- It sees `{ type: 'MODIFY_STAT', target: 'deathThresholdModifier', value: 1 }` and adds +1 to a running total for the death threshold modifier.
- It sees `{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }` and stores this as a conditional modifier to be evaluated by the UI.
- It sees `GRANT_ABILITY` effects and collects their descriptions to be displayed in the "Features" list on the character sheet.

**Final Calculation (The Result):**

The calculator takes the base stats (from point buy and class table) and applies the aggregated modifiers.

- `finalMight = base_might + 1`
- `finalDeathThreshold = 10 + 1`
- `finalAD = (8 + CM + finalMight + finalCharisma)` (The conditional +2 is not applied here, but passed to the UI to handle).

This structured approach ensures that every mechanical bonus is accounted for correctly and separates the rules data from the calculation logic, which is the core of a robust and maintainable system.

---

#### **7. Implementation Recommendations & Technical Considerations**

**Key Improvements in This Final Schema:**

1. **Comprehensive Effect Coverage**: All missing effect types have been added (`GRANT_MOVEMENT`, `GRANT_SENSE`, `GRANT_CANTRIP`, etc.)
2. **Hierarchical Structure**: Clear modeling of classes → features → benefits/choices → options
3. **Flexible Value System**: Accommodates simple numbers and complex objects
4. **User Choice Resolution**: Clean pattern for handling player decisions

**Technical Recommendations:**

1. **Effect Resolution Order**: Process `MODIFY_*` effects before `SET_VALUE` effects to handle potential conflicts
2. **Choice Storage Pattern**: Consider using more intuitive keys like `{ 'human_attribute_increase': { attribute: 'might' } }`
3. **Runtime Validation**: Add validation functions for effect targets and values
4. **Type Safety**: Consider making common targets type-safe with union types

**Implementation Strategy:**

1. **Start Small**: Begin with Human traits and Barbarian class to validate the approach
2. **Build Core Processor**: Create the effect aggregation and processing engine first
3. **Add Validation**: Implement schema validation early to catch data errors
4. **Incremental Migration**: Convert one class at a time to reduce risk

This schema provides a solid foundation for a robust, maintainable character creation system that can scale to handle any future game mechanics through data definition rather than code changes.

---

#### **8. Phase 1 Proof of Concept: Safe Parallel Development Strategy**

**The Challenge:** Modifying the existing data files will break the current system before we have a working replacement. We need a strategy that allows incremental development without breaking the build or rendering system.

**The Solution:** Create a parallel development environment that preserves the existing system while building the new one alongside it.

### **Step 1: Backup & Isolate Current System**

```bash
# Create backup directories
mkdir -p src/lib/rulesdata/_backup_original
mkdir -p src/lib/rulesdata/_new_schema

# Backup critical files
mv src/lib/rulesdata/ancestries.ts src/lib/rulesdata/_backup_original/
mv src/lib/rulesdata/classes/ src/lib/rulesdata/_backup_original/
mv src/lib/rulesdata/loaders/ src/lib/rulesdata/_backup_original/
mv src/lib/services/characterCalculator.ts src/lib/services/_backup_characterCalculator.ts
mv src/lib/services/traitEffectProcessor.ts src/lib/services/_backup_traitEffectProcessor.ts
```

### **Step 2: Create Minimal Legacy Stubs**

Create minimal files that keep the current system working:

```typescript
// src/lib/rulesdata/ancestries.ts (minimal stub)
export interface IAncestry {
  id: string;
  name: string;
  description: string;
  defaultTraitIds: string[];
  expandedTraitIds: string[];
  origin?: { prompt: string; options: string[]; };
}

export interface ITrait {
  id: string;
  name: string;
  description: string;
  cost: number;
  isMinor?: boolean;
  isNegative?: boolean;
  prerequisites?: string[];
  effects?: any[]; // Keep loose for now
}

// Just include Human for testing
export const ancestries: IAncestry[] = [
  {
    id: "human",
    name: "Human",
    description: "Adaptable and ambitious.",
    defaultTraitIds: ["human_attribute_increase", "human_skill_expertise"],
    expandedTraitIds: ["human_resolve", "human_undying", "human_trade_expertise", "human_determination", "human_unbreakable", "human_attribute_decrease"]
  }
];

export const traits: ITrait[] = [
  {
    id: "human_attribute_increase",
    name: "Attribute Increase",
    description: "Choose one Attribute. That Attribute increases by 1.",
    cost: 0,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute', value: 1, userChoiceRequired: true }]
  },
  {
    id: "human_skill_expertise", 
    name: "Skill Expertise",
    description: "Choose one Skill. Your Mastery Limit with that Skill increases by 1, and you gain 1 level in that Skill.",
    cost: 0,
    effects: [{ type: 'GRANT_SKILL_EXPERTISE', target: 'any_skill', value: { capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: true }]
  }
];

// Re-export functions that other files expect
export const getAncestryData = (id: string) => ancestries.find(a => a.id === id);
export const getTraitData = (id: string) => traits.find(t => t.id === id);
```

### **Step 3: Create Minimal Class Stubs**

```typescript
// src/lib/rulesdata/loaders/class.loader.ts (minimal stub)
export const classesData = [
  {
    name: "barbarian",
    id: "barbarian",
    description: "A fierce warrior.",
    startingStats: {
      hp: 10,
      sp: 6,
      mp: 0,
      skillPoints: 4,
      tradePoints: 3,
      languagePoints: 2,
      maneuversKnown: 2,
      techniquesKnown: 1,
      cantripsKnown: 0,
      spellsKnown: 0
    }
  }
];

export const getClassData = async (classId: string) => {
  return classesData.find(c => c.id === classId);
};
```

### **Step 4: Environment-Based Feature Toggle**

```typescript
// src/lib/config/features.ts
export const FEATURES = {
  NEW_EFFECT_SYSTEM: process.env.NODE_ENV === 'development' && process.env.VITE_NEW_EFFECTS === 'true'
};
```

```bash
# Add to .env.local for development
VITE_NEW_EFFECTS=true

