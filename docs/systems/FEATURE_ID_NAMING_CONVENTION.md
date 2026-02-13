# Feature ID Naming Convention

> Purpose: Standard naming convention for feature IDs in class definitions.
> Status: Active
> Last Updated: 2026-02-06

## Convention Rules

### Core Feature IDs

Format: `{class}_{feature_slug}[_{level}]`

**Components:**

- `{class}`: lowercase class name (e.g., `barbarian`, `wizard`, `monk`)
- `{feature_slug}`: snake_case version of the feature name
- `_{level}` (optional): level suffix for recurring features like talents

**Examples:**

- `barbarian_rage` — "Rage" feature
- `wizard_spellcasting_path` — "Spellcasting Path" feature
- `monk_training` — "Monk Training" feature
- `cleric_talent_level_2` — Talent feature gained at level 2

### Subclass Feature IDs

Format: `{class}_{subclass}_{feature_slug}`

**Components:**

- `{class}`: lowercase class name
- `{subclass}`: snake_case subclass name
- `{feature_slug}`: snake_case feature name

**Examples:**

- `barbarian_elemental_fury_raging_elements` — Elemental Fury subclass feature
- `monk_astral_awakening` — Astral Self subclass feature (abbreviated when subclass name is part of feature)
- `rogue_thousand_cuts` — Long Death subclass feature

### Choice IDs

Format: `{feature_id}_{choice_type}[_{index}]`

**Components:**

- `{feature_id}`: the parent feature ID
- `{choice_type}`: describes what is being chosen (e.g., `choice`, `school`, `domain`)
- `_{index}` (optional): numeric index for multiple choices within same feature

**Examples:**

- `wizard_spell_school_initiate_0` — First choice in Spell School Initiate
- `spellblade_disciplines_choice` — Disciplines selection
- `barbarian_elemental_rage_damage_type` — Damage type choice for Elemental Rage

### Special Cases

#### Source of Power Features

These flavor features follow the standard pattern:

- Format: `{class}_source_of_power`
- Examples: `monk_source_of_power`, `rogue_source_of_power`

#### Path Features

Initial path unlocks use a consistent name:

- Martial: `{class}_martial_path`
- Spellcasting: `{class}_spellcasting_path`
- Examples: `champion_martial_path`, `wizard_spellcasting_path`

#### Recurring Talents

Talent features gained at different levels include the level:

- Format: `{class}_talent_level_{level}`
- Examples: `barbarian_level_2_talent`, `wizard_talent_level_2`

## Conversion Rules

When creating a feature ID from a feature name:

1. Convert to lowercase
2. Replace spaces with underscores
3. Remove possessive apostrophes (e.g., "Nature's" → "natures")
4. Remove special characters and punctuation
5. Prefix with class name
6. Add level suffix if it's a recurring feature

**Examples:**

- "Rage" → `barbarian_rage`
- "Spell School Initiate" → `wizard_spell_school_initiate`
- "Commander's Call" → `commander_commanders_call`
- "Wild Form" → `druid_wild_form`

## Validation

Feature IDs should:

- ✅ Be unique within the entire codebase
- ✅ Match the referenced IDs in progression files
- ✅ Use only lowercase letters, numbers, and underscores
- ✅ Start with the class name
- ✅ Be descriptive enough to identify the feature without context

## Cross-References

Feature IDs are referenced in:

- `src/lib/rulesdata/classes-data/features/*.ts` — Feature definitions
- `src/lib/rulesdata/classes-data/progressions/*.progression.ts` — Level unlocks
- Future: progression resolver and calculator logic

## Maintenance Notes

- Feature IDs should remain stable once defined
- Changing a feature ID requires updating all progression files that reference it
- Verify consistency after changes by running `npm run test:unit` (rulesdata tests check ID references)
- Document any breaking changes in commit messages

---

> Maintainer: @DC20Clean-Team
