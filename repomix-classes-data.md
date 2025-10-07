This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.
The content has been processed where empty lines have been removed.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/lib/rulesdata/classes-data/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Empty lines have been removed from all files
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  lib/
    rulesdata/
      classes-data/
        features/
          barbarian_features.ts
          bard_features.ts
          champion_features.ts
          cleric_features.ts
          commander_features.ts
          druid_features.ts
          hunter_features.ts
          monk_features.test.ts
          monk_features.ts
          psion_features.ts
          rogue_features.ts
          sorcerer_features.ts
          spellblade_features.ts
          subclasses.test.ts
          warlock_features.ts
          wizard_features.ts
        progressions/
          barbarian.progression.ts
          bard.progression.ts
          champion.progression.ts
          cleric.progression.ts
          commander.progression.ts
          druid.progression.ts
          hunter.progression.ts
          monk.progression.ts
          psion.progression.ts
          refactor-tables.ts
          rogue.progression.ts
          sorcerer.progression.ts
          spellblade.progression.ts
          warlock.progression.ts
          wizard.progression.ts
        tables/
          barbarian_table.json
          bard_table.json
          champion_table.json
          cleric_table.json
          commander_table.json
          druid_table.json
          hunter_table.json
          monk_table.json
          psion_table.json
          rogue_table.json
          sorcerer_table.json
          spellblade_table.json
          warlock_table.json
          wizard_table.json
        talents/
          barbarian.talents.ts
          bard.talents.ts
          champion.talents.ts
          cleric.talents.ts
          commander.talents.ts
          druid.talents.ts
          hunter.talents.ts
          monk.talents.ts
          rogue.talents.ts
          sorcerer.talents.ts
          spellblade.talents.ts
          talent.loader.ts
          talent.types.ts
          talents.data.ts
          warlock.talents.ts
          wizard.talents.ts
        classProgressionResolver.test.ts
        classProgressionResolver.ts
        classUtils.ts
        SUBCLASS_REFERENCE.md
```

# Files

## File: src/lib/rulesdata/classes-data/tables/barbarian_table.json
````json
{
	"className": "Barbarian",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/bard_table.json
````json
{
	"className": "Bard",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/champion_table.json
````json
{
	"className": "Champion",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/cleric_table.json
````json
{
	"className": "Cleric",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/commander_table.json
````json
{
	"className": "Commander",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/druid_table.json
````json
{
	"className": "Druid",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/hunter_table.json
````json
{
	"className": "Hunter",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/monk_table.json
````json
{
	"className": "Monk",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/psion_table.json
````json
{
	"className": "Psion",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 4,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"pathPoints": 1,
			"ancestryPoints": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"pathPoints": 1,
			"ancestryPoints": 2,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"pathPoints": 1,
			"ancestryPoints": 2,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"pathPoints": 0,
			"ancestryPoints": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"pathPoints": 1,
			"ancestryPoints": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/rogue_table.json
````json
{
	"className": "Rogue",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 4,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/sorcerer_table.json
````json
{
	"className": "Sorcerer",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/spellblade_table.json
````json
{
	"className": "Spellblade",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 1,
			"maneuversKnown": 2,
			"techniquesKnown": 0,
			"manaPoints": 3,
			"cantripsKnown": 1,
			"spellsKnown": 1,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 1,
			"techniquesKnown": 1,
			"manaPoints": 1,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 1,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 1,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 1,
			"maneuversKnown": 0,
			"techniquesKnown": 1,
			"manaPoints": 1,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/warlock_table.json
````json
{
	"className": "Warlock",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 9,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 3,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 3,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/tables/wizard_table.json
````json
{
	"className": "Wizard",
	"levelProgression": [
		{
			"level": 1,
			"healthPoints": 8,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 6,
			"cantripsKnown": 2,
			"spellsKnown": 3,
			"features": "Class Features"
		},
		{
			"level": 2,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Class Feature, Talent + 1 Path Point"
		},
		{
			"level": 3,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 4,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 5,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Feature"
		},
		{
			"level": 6,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 1,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Feature"
		},
		{
			"level": 7,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Talent + 1 Path Point, 2 Ancestry Points"
		},
		{
			"level": 8,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 1,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 1,
			"spellsKnown": 0,
			"features": "Class Capstone Feature"
		},
		{
			"level": 9,
			"healthPoints": 2,
			"attributePoints": 0,
			"skillPoints": 0,
			"tradePoints": 0,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 2,
			"cantripsKnown": 0,
			"spellsKnown": 1,
			"features": "Subclass Capstone Feature"
		},
		{
			"level": 10,
			"healthPoints": 2,
			"attributePoints": 1,
			"skillPoints": 2,
			"tradePoints": 1,
			"staminaPoints": 0,
			"maneuversKnown": 0,
			"techniquesKnown": 0,
			"manaPoints": 0,
			"cantripsKnown": 0,
			"spellsKnown": 0,
			"features": "Epic Boon, Talent + 1 Path Point"
		}
	]
}
````

## File: src/lib/rulesdata/classes-data/features/barbarian_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const barbarianClass: ClassDefinition = {
	className: 'Barbarian',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armor'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Barbarian Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Barbarian Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Barbarian Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit against a creature, or when a Heavy or Critical Hit is scored against you.'
		}
	},
	coreFeatures: [
		{
			id: 'barbarian_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: 4 }
			],
			benefits: [
				{
					name: 'Combat Training',
					description: 'You gain proficiency with Weapons, All Armor, and All Shields.',
					effects: [
						{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
						{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
						{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true }
					]
				},
				{
					name: 'Maneuver Knowledge',
					description:
						'You learn all Attack maneuvers plus additional maneuvers as shown on the Barbarian Class Table.',
					effects: [{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: 4 }]
				},
				{
					name: 'Stamina Regeneration',
					description:
						'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit against a creature, or when a Heavy or Critical Hit is scored against you.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'stamina_regen',
							value:
								'Once per round, regain up to half maximum SP when you score or take a Heavy/Critical Hit.'
						}
					]
				}
			]
		},
		{
			id: 'barbarian_rage',
			featureName: 'Rage',
			levelGained: 1,
			description: 'During Combat, you can spend 1 AP and 1 SP to enter a Rage for 1 minute.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'rage',
					value:
						'Spend 1 AP and 1 SP to Rage for 1 minute: +1 melee damage, ADV on Might Saves, -5 PD, Resistance (Half) to Elemental and Physical damage.'
				}
			]
		},
		{
			id: 'barbarian_berserker',
			featureName: 'Berserker',
			levelGained: 1,
			description: 'Your primal savagery grants you the following benefits:',
			benefits: [
				{
					name: 'Charge',
					description:
						'When you make a Melee Martial Attack on your turn, you can move up to 2 Spaces immediately before making the Attack.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'charge',
							value: 'Move up to 2 Spaces before making a Melee Martial Attack on your turn.'
						}
					]
				},
				{
					name: 'Berserker Defense',
					description: "While you aren't wearing Armor you gain +2 AD.",
					effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 2, condition: 'not_wearing_armor' }]
				},
				{
					name: 'Fast Movement',
					description: 'You gain +1 Speed while not wearing Armor.',
					effects: [
						{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1, condition: 'not_wearing_armor' }
					]
				},
				{
					name: 'Mighty Leap',
					description:
						'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
					effects: [{ type: 'SET_VALUE', target: 'jumpCalculationAttribute', value: 'might' }]
				}
			]
		},
		{
			id: 'barbarian_shattering_force',
			featureName: 'Shattering Force',
			levelGained: 1,
			description:
				"When you Hit a structure or mundane object with a Melee Attack, it's considered a Critical Hit.",
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'shattering_force',
					value: 'Melee Attacks against structures and mundane objects are Critical Hits.'
				}
			]
		},
		{
			id: 'barbarian_battlecry',
			featureName: 'Battlecry',
			levelGained: 2,
			description: 'You can spend 1 AP and 1 SP to release a shout of your choice.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'battlecry',
					value:
						'Spend 1 AP and 1 SP to release a shout affecting allies within 10 Spaces until start of your next turn.'
				}
			],
			choices: [
				{
					id: 'barbarian_battlecry_choice',
					prompt: 'Choose a shout to learn.',
					count: 3, // Learn all three shout options
					options: [
						{
							name: 'Fortitude Shout',
							description:
								'Each creature gains Resistance (1) against the next source of Physical or Elemental damage.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fortitude_shout',
									value: 'Grant allies Resistance (1) against next Physical or Elemental damage.'
								}
							]
						},
						{
							name: 'Fury Shout',
							description: 'Each creature deals +1 damage on their next Attack against 1 target.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fury_shout',
									value: 'Grant allies +1 damage on their next Attack.'
								}
							]
						},
						{
							name: 'Urgent Shout',
							description: 'Each creature gains +1 Speed until the start of your next turn.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'urgent_shout',
									value: 'Grant allies +1 Speed until start of your next turn.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'barbarian_level_2_talent',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Elemental Fury',
			description: 'Harness the power of the elements in your rage.',
			features: [
				{
					id: 'barbarian_elemental_fury_raging_elements',
					featureName: 'Raging Elements',
					levelGained: 3,
					description: 'You can surround yourself with the elements while raging.',
					choices: [
						{
							id: 'barbarian_elemental_rage_damage_type',
							prompt: 'Choose your Elemental Rage damage type.',
							count: 1,
							options: [
								{
									name: 'Cold',
									description: 'Your Elemental Rage damage is Cold.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_cold',
											value:
												'Elemental Rage damage is Cold. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Fire',
									description: 'Your Elemental Rage damage is Fire.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_fire',
											value:
												'Elemental Rage damage is Fire. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Lightning',
									description: 'Your Elemental Rage damage is Lightning.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_lightning',
											value:
												'Elemental Rage damage is Lightning. Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								},
								{
									name: 'Physical',
									description: 'Your Elemental Rage damage is Physical (choose type each Rage).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'elemental_rage_physical',
											value:
												'Elemental Rage damage is Physical (choose Bludgeoning/Piercing/Slashing each Rage). Gain 2 Space Aura while Raging with elemental effects.'
										}
									]
								}
							]
						},
						{
							id: 'barbarian_aura_type',
							prompt: 'Choose 1 additional benefit for your Aura Type.',
							count: 1,
							options: [
								{
									name: 'Slowing Aura',
									description:
										'Spaces within your Aura count as Difficult Terrain for creatures of your choice.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'slowing_aura',
											value:
												'Aura creates Difficult Terrain for chosen creatures. Failed saves also cause Slowed until end of their next turn.'
										}
									]
								},
								{
									name: 'Splashing Aura',
									description:
										'Once per Turn when you deal Elemental Rage damage to a creature, you can automatically deal 1 Elemental Rage damage to a creature within 1 Space of it.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'splashing_aura',
											value:
												'Once per turn, Elemental Rage damage splashes to a creature within 1 Space for 1 damage.'
										}
									]
								},
								{
									name: 'Stunning Aura',
									description:
										"Once per Turn when a creature within your Aura fails a Save you force it to make, it also can't spend AP on Reactions until the start of its next turn.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'stunning_aura',
											value:
												'Once per turn, creatures that fail saves in your Aura cannot spend AP on Reactions until start of their next turn.'
										}
									]
								},
								{
									name: 'Pushing Aura',
									description:
										'When you use your Elemental Blast, creatures affected must make a Physical Save.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'pushing_aura',
											value:
												'Elemental Blast forces Physical Save; failure moves targets 2 Spaces toward or away from you.'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'barbarian_elemental_fury_elemental_affinity',
					featureName: 'Elemental Affinity',
					levelGained: 3,
					description: 'You are infused with the power of your Element.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'elemental_affinity',
							value:
								'Voice can boom 3x louder, create elemental visual displays, Resistance to environmental Exhaustion.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Spirit Guardian',
			description: 'Call upon ancestral spirits to aid you in battle.',
			features: [
				{
					id: 'barbarian_spirit_guardian_ancestral_guardian',
					featureName: 'Ancestral Guardian',
					levelGained: 3,
					description: 'Bestowed Protection and Spiritual Aura while Raging.',
					effects: [
						{ type: 'GRANT_CHOICE', target: 'guardian_maneuver', value: 1 },
						{ type: 'GRANT_RESISTANCE', target: 'Mystical', value: 1, optional: 'while raging' },
						{
							type: 'GRANT_ABILITY',
							target: 'spiritual_aura',
							value:
								'While Raging: 5 Space Aura allows Shove on any creature, use Parry/Protect/Raise Shield on any creature in Aura.'
						}
					],
					choices: [
						{
							id: 'barbarian_guardian_maneuver',
							prompt: 'Learn 1 of the following Maneuvers (or any Maneuver if you know all 3).',
							count: 1,
							options: [
								{
									name: 'Parry',
									description: 'Learn the Parry maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Parry', value: 1 }]
								},
								{
									name: 'Protect',
									description: 'Learn the Protect maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Protect', value: 1 }]
								},
								{
									name: 'Raise Shield',
									description: 'Learn the Raise Shield maneuver.',
									effects: [{ type: 'GRANT_MANEUVERS', target: 'Raise Shield', value: 1 }]
								}
							]
						}
					]
				},
				{
					id: 'barbarian_spirit_guardian_ancestral_knowledge',
					featureName: 'Ancestral Knowledge',
					levelGained: 3,
					description:
						'You have ADV on Checks to recall information about the history of your Ancestries.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'ancestral_knowledge',
							value:
								"ADV on Checks about your Ancestries' history. Once per Long Rest: ADV on a Trade or Language Check."
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/bard_features.ts
````typescript
/**
 * Bard Class Definition - New Effect Schema
 * Based on DC20 Bard features with spellcasting and performance abilities
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const bardClass: ClassDefinition = {
	className: 'Bard',
	spellcasterPath: {
		spellList: {
			description: 'You learn any 2 Spells of your choice from any Spell List.',
			type: 'any'
		},
		cantrips: {
			description: 'Cantrips Known column of the Bard Class Table'
		},
		spells: {
			description: 'Spells Known column of the Bard Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Bard Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'bard_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast spells from multiple schools.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
			id: 'bard_font_of_inspiration',
			featureName: 'Font of Inspiration',
			levelGained: 1,
			description: 'You are an ever present source of aid for your allies.',
			benefits: [
				{
					name: 'Ranged Help Attack',
					description:
						'The range of your Help Action when aiding an Attack increases to 10 Spaces.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'ranged_help_attack',
							value: 'Help Action range for attacks extends to 10 Spaces.'
						}
					]
				},
				{
					name: 'Help Reaction',
					description:
						"When a creature you can see makes a Check, you can take the Help Action as a Reaction to aid them with their Check, provided you're within range to do so.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'help_reaction',
							value: 'Take Help Action as Reaction when creatures make Checks.'
						}
					]
				}
			]
		},
		{
			id: 'bard_remarkable_repertoire',
			featureName: 'Remarkable Repertoire',
			levelGained: 1,
			description: "You've picked up a few tricks along your travels.",
			benefits: [
				{
					name: 'Jack of All Trades',
					description: 'You gain 2 Skill Points.',
					effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }]
				},
				{
					name: 'Magical Secrets',
					description: 'You learn any 2 Spells of your choice from any Spell List.',
					effects: [{ type: 'GRANT_SPELL', target: 'any_spell_list', value: 2 }]
				},
				{
					name: 'Magical Expression',
					description:
						'You learn to express your art in a unique manner, granting you the ability to alter how you cast Spells.',
					effects: [
						{
							type: 'GRANT_CHOICE',
							target: 'magical_expression',
							value: 1,
							userChoice: {
								prompt: 'Choose your magical expression style',
								options: ['Visual', 'Auditory']
							}
						}
					]
				}
			]
		},
		{
			id: 'bard_crowd_pleaser',
			featureName: 'Crowd Pleaser',
			levelGained: 1,
			description:
				"When you spend at least 5 minutes performing an Artistry Trade for one or more people who are actively watching or listening to your performance, you can make an Artistry Trade Check Contested by the targets' Charisma Save.",
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'crowd_pleaser',
					value: 'ADV on Charisma Checks against targets who watched your performance for 1 hour.'
				}
			]
		},
		{
			id: 'bard_bardic_performance',
			featureName: 'Bardic Performance',
			levelGained: 2,
			description:
				'You can spend 1 AP and 1 MP to start a performance that grants you a 10 Space Aura for 1 minute.',
			choices: [
				{
					id: 'bardic_performance_choice',
					prompt: 'Choose a performance type',
					count: 1,
					options: [
						{
							name: 'Battle Ballad',
							description:
								'The chosen creatures deal +1 damage against 1 target of their choice on an Attack they make once on each of their turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'battle_ballad',
									value:
										'Allies in aura deal +1 damage on first attack per turn against chosen target.'
								}
							]
						},
						{
							name: 'Fast Tempo',
							description: 'The chosen creatures gain +1 Speed.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fast_tempo',
									value: 'Allies in aura gain +1 Speed.'
								}
							]
						},
						{
							name: 'Inspiring',
							description:
								'The chosen creatures gain 1 Temp HP at the start of each of their turns.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'inspiring_performance',
									value: 'Allies in aura gain 1 Temp HP at start of their turns.'
								}
							]
						},
						{
							name: 'Emotional',
							description:
								'Choose 1 of the following Conditions: Charmed, Frightened, Intimidated, or Taunted. The chosen creatures have Resistance against the chosen Condition.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'emotional_performance',
									value: 'Allies in aura gain Resistance to chosen condition and can repeat saves.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'bard_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Eloquence',
			description: 'Masters of persuasion and charm magic.',
			features: [
				{
					featureName: 'Beguiling Presence',
					levelGained: 3,
					description: 'You gain enhanced charm abilities and magical persuasion.',
					benefits: [
						{
							name: 'Enthrall',
							description:
								"You learn the Befriend Spell, and it doesn't end as a result of the target taking damage.",
							effects: [
								{ type: 'GRANT_SPELL', target: 'befriend', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'enhanced_befriend',
									value: "Befriend spell doesn't end from target taking damage."
								}
							]
						},
						{
							name: 'Misleading Muse',
							description:
								'When a creature within your Bardic Performance targets only you with an Attack, you can redirect it.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'misleading_muse',
									value: 'Spend 1 AP as Reaction to charm attacker and redirect attack.'
								}
							]
						},
						{
							name: 'Mind Games',
							description:
								'When the Charmed Condition ends on a creature Charmed by you, you can deal psychic damage.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'mind_games',
									value: 'Deal 1 Psychic damage when charm ends.'
								}
							]
						}
					]
				},
				{
					featureName: 'Eloquent Orator',
					levelGained: 3,
					description:
						'Your speech is magically enchanted. Creatures can always understand the words you speak, provided they speak at least 1 Language.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'eloquent_orator',
							value: 'All creatures with language can understand your speech.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Jester',
			description: 'Comedic performers who use humor and chaos in battle.',
			features: [
				{
					featureName: 'Antagonizing Act',
					levelGained: 3,
					description: 'You gain abilities that frustrate and distract enemies.',
					benefits: [
						{
							name: 'Heckle',
							description:
								"Once per Round when a creature within your Bardic Performance fails a Save, they're Taunted.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'heckle',
									value: 'Taunt creatures who fail saves in your performance aura.'
								}
							]
						},
						{
							name: 'Distraction',
							description:
								'When a hostile creature within 10 Spaces makes an Attack, you can impose DisADV.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'distraction',
									value: 'Spend 1 AP as Reaction to impose DisADV on nearby attacks.'
								}
							]
						},
						{
							name: 'Pratfall',
							description: 'When you fail a Save, you can grant an ally ADV on their next Check.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pratfall',
									value: 'Grant ally ADV on Check when you fail a save.'
								}
							]
						}
					]
				},
				{
					featureName: 'Comedian',
					levelGained: 3,
					description: 'You have ADV on Checks to make other creatures laugh.',
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'comedy', value: 'ADV' }]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/druid_features.ts
````typescript
/**
 * Druid Class Definition - New Effect Schema
 * Based on DC20 Druid features with wild form and domain abilities
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const druidClass: ClassDefinition = {
	className: 'Druid',
	spellcasterPath: {
		spellList: {
			description: 'Primal spells focused on nature and the elements',
			type: 'primal'
		},
		cantrips: {
			description: 'Cantrips Known column of the Druid Class Table'
		},
		spells: {
			description: 'Spells Known column of the Druid Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Druid Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'druid_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast primal spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
			id: 'druid_domain',
			featureName: 'Druid Domain',
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 MP to create your own Druid Domain that includes small plant life, sand, shallow water, or other naturally occurring features.',
			benefits: [
				{
					name: 'Domain Creation',
					description:
						'Create up to 8 Domain Spaces of difficult terrain that you can cast spells from.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'druid_domain',
							value: 'Create 8 Domain Spaces (1 AP + 1 MP). Cast spells from any Domain Space.'
						}
					]
				},
				{
					name: "Nature's Grasp",
					description: 'Bind creatures within your Domain, preventing movement.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'natures_grasp',
							value:
								'Spend 1 AP to bind creature in Domain (Spell Check vs Repeated Physical Save).'
						}
					]
				},
				{
					name: 'Move Creature',
					description: 'Move bound creatures within your Domain.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_creature',
							value: 'Spend 1 AP to move bound creature up to 2 Spaces within Domain.'
						}
					]
				},
				{
					name: 'Move Object',
					description: 'Interact with objects anywhere in your Domain.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_object',
							value: 'Use Object Action from any Domain Space, move objects up to 5 Spaces.'
						}
					]
				},
				{
					name: 'Wild Growth',
					description: 'Heal targets within your Domain with ongoing regeneration.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'wild_growth',
							value: '1 AP + 1 MP: DC 10 Spell Check to heal 2+ HP, then 1 HP per turn in Domain.'
						}
					]
				}
			]
		},
		{
			id: 'druid_wild_form',
			featureName: 'Wild Form',
			levelGained: 1,
			description: 'You can spend 1 AP and 1 MP to transform into a Wild Form of your choice.',
			benefits: [
				{
					name: 'Transformation',
					description: 'Gain Wild Form with 3 HP, natural weapons, and Beast traits.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'wild_form',
							value:
								'Transform: 1 AP + 1 MP (free once per Long Rest). Gain 3 Wild Form HP, natural weapons.'
						}
					]
				},
				{
					name: 'Beast Traits',
					description: 'Gain 3 Trait Points for Beast or Wild Form traits, +2 per extra MP spent.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'beast_traits',
							value:
								'3 Trait Points for Beast/Wild Form traits. Spend extra MP for +2 Trait Points each.'
						}
					]
				},
				{
					name: 'Form Switching',
					description: 'Switch between True Form and available Wild Forms for 1 AP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'form_switching',
							value: 'Spend 1 AP to switch between True Form and Wild Forms.'
						}
					]
				}
			]
		},
		{
			id: 'druid_wild_speech',
			featureName: 'Wild Speech',
			levelGained: 1,
			description: 'You learn the Druidcraft Cantrip and can communicate with nature.',
			isFlavor: true,
			effects: [
				{ type: 'GRANT_CANTRIP', target: 'druidcraft', value: 1 },
				{
					type: 'GRANT_CHOICE',
					target: 'wild_speech',
					value: 1,
					userChoice: {
						prompt: 'Choose your nature communication',
						options: ['Animals', 'Plants', 'Weather']
					}
				}
			]
		},
		{
			id: 'druid_natures_torrent',
			featureName: "Nature's Torrent",
			levelGained: 2,
			description:
				'When a creature within 10 spaces takes Elemental damage, you can summon a torrent of nature.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'natures_torrent',
					value:
						'Reaction: Create 1 Space Radius Sphere. Creatures have Vulnerability (1) to triggering damage type and DisADV on movement saves.'
				}
			]
		},
		{
			id: 'druid_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Phoenix',
			description: 'Druids who harness the power of fire and rebirth.',
			features: [
				{
					featureName: 'Flames of Rebirth',
					levelGained: 3,
					description: 'You wield the power of fire to lay destruction and foster new life.',
					benefits: [
						{
							name: 'Fiery Form',
							description:
								'Your Wild Forms can become Elemental (Fire) with Fire Resistance and fire damage.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fiery_form',
									value:
										'Wild Forms: Elemental (Fire) type, Fire Resistance (1), Fire damage natural weapons.'
								}
							]
						},
						{
							name: 'Cleansing Flames',
							description: 'Remove conditions when healing creatures in your Domain.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'cleansing_flames',
									value: 'When healing in Domain: remove Impaired, Dazed, Burning, or Poisoned.'
								}
							]
						},
						{
							name: 'Rolling Wild Fire',
							description: 'Creatures take fire damage for moving in your Domain.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rolling_wild_fire',
									value:
										'Creatures take 1 Fire damage per Space moved in Domain or starting turn in Domain.'
								}
							]
						}
					]
				},
				{
					featureName: 'Fire Within',
					levelGained: 3,
					description: 'You are unaffected by cold weather and can boil liquids with touch.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'fire_within',
							value: 'Immune to cold weather. Boil 1 gallon liquid with 1 minute contact.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Rampant Growth',
			description: 'Druids who specialize in plant magic and overgrowth.',
			features: [
				{
					featureName: 'Overgrowth',
					levelGained: 3,
					description: 'You enhance your Domain and Wild Forms with plant-based abilities.',
					benefits: [
						{
							name: 'Plant Form',
							description: 'Your Wild Forms can become Plant type with immunity to Bleeding.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'plant_form',
									value:
										'Wild Forms: Plant type, immune to Bleeding, Poison damage natural weapons.'
								}
							]
						},
						{
							name: 'Vineguard',
							description: 'Plant-life in your Domain provides cover to allies.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'vineguard',
									value: 'Creatures of choice in Domain gain benefits of 1/2 Cover.'
								}
							]
						},
						{
							name: 'Thorny Grasp',
							description: "Creatures who fail saves against Nature's Grasp begin Bleeding.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'thorny_grasp',
									value: "Creatures who fail Nature's Grasp save begin Bleeding."
								}
							]
						}
					]
				},
				{
					featureName: 'Seed Vault',
					levelGained: 3,
					description:
						"You can magically produce the seeds of any mundane plant that you've ever touched.",
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'seed_vault',
							value: "Produce seeds of any mundane plant you've touched."
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/monk_features.test.ts
````typescript
import { describe, it, expect } from 'vitest';
import { monkClass } from './monk_features';
describe('Monk Martial Stances', () => {
	it('should allow selecting 2 stances at level 1', () => {
		// Find the monk stance feature
		const stanceFeature = monkClass.coreFeatures.find(f => f.id === 'monk_stance');
		expect(stanceFeature).toBeDefined();
		expect(stanceFeature?.levelGained).toBe(1);
		expect(stanceFeature?.featureName).toBe('Monk Stance');
		// Verify the choice definition
		const stanceChoice = stanceFeature?.choices?.[0];
		expect(stanceChoice).toBeDefined();
		expect(stanceChoice?.id).toBe('initial_stances');
		expect(stanceChoice?.count).toBe(2);
		expect(stanceChoice?.prompt).toBe('Choose 2 Monk Stances');
		// Verify we have at least 3 stance options (must have at least count+1 to have meaningful choice)
		expect(stanceChoice?.options.length).toBeGreaterThanOrEqual(3);
		// Verify all stance options have required fields
		stanceChoice?.options.forEach(option => {
			expect(option.id).toBeDefined();
			expect(option.name).toBeDefined();
			expect(option.description).toBeDefined();
		});
	});
	it('should have exactly 9 stance options', () => {
		const stanceFeature = monkClass.coreFeatures.find(f => f.id === 'monk_stance');
		const stanceChoice = stanceFeature?.choices?.[0];
		// Verify we have all 9 traditional monk stances
		expect(stanceChoice?.options.length).toBe(9);
		const expectedStances = [
			'bear_stance',
			'bull_stance',
			'cobra_stance',
			'gazelle_stance',
			'mantis_stance',
			'mongoose_stance',
			'scorpion_stance',
			'turtle_stance',
			'wolf_stance'
		];
		const actualStanceIds = stanceChoice?.options.map(o => o.id) || [];
		expectedStances.forEach(expectedId => {
			expect(actualStanceIds).toContain(expectedId);
		});
	});
});
````

## File: src/lib/rulesdata/classes-data/features/psion_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
/**
 * Psion Class Definition – Draft implementation derived from Spellblade template.
 * Focuses on psychic spellcasting and telekinetic abilities.
 */
export const psionClass: ClassDefinition = {
	className: 'Psion',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor']
		},
		maneuvers: {
			learnsAllAttack: false,
			additionalKnown: 'Maneuvers Known column of the Psion Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Psion Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Psion Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you succeed on a spell attack.'
		}
	},
	spellcasterPath: {
		spellList: {
			description:
				'Psychic or Gravity Spell Tags plus Divination, Enchantment, Illusion, or Protection schools'
		},
		cantrips: {
			description: 'Cantrips Known column of the Psion Class Table'
		},
		spells: {
			description: 'Spells Known column of the Psion Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Psion Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'psion_spellcasting_path',
			featureName: 'Psion Spellcasting',
			levelGained: 1,
			description:
				'You can cast spells from the Psychic or Gravity tags and the schools of Divination, Enchantment, Illusion, or Protection. Your combat masteries include Weapons, Light Armor, and Spellcasting. Your Cantrips Known, Spells Known, Mana Points, and Stamina Points advance as per the Psion class table.'
		},
		{
			id: 'psion_stamina',
			featureName: 'Psion Stamina',
			levelGained: 1,
			description:
				'Once per round, if you take a turn in combat without expending SP you regain 1 SP.'
		},
		{
			id: 'psion_psionic_mind',
			featureName: 'Psionic Mind',
			levelGained: 1,
			description:
				'You learn the Psi Bolt cantrip, your MD increases by 2, you can spend SP on AP enhancements, and you gain the Daze and Disruption spell enhancements as well as the Psionic enhancement (1 MP) removing verbal and somatic components.'
		},
		{
			id: 'psion_telekinesis',
			featureName: 'Telekinesis',
			levelGained: 1,
			description:
				'You can use the Object action to manipulate objects up to 100 lbs within 5 spaces via telekinesis.'
		},
		{
			id: 'psion_telekinetic_grapple',
			featureName: 'Telekinetic Grapple',
			levelGained: 1,
			description:
				'You gain Grapple maneuvers which you perform with telekinesis. You may target creatures within 5 spaces and use Spell Checks instead of Might for related checks. Additional rules modify Body Block, Grapple, Shove, and Throw.'
		},
		{
			id: 'psion_telepathy',
			featureName: 'Telepathy',
			levelGained: 1,
			isFlavor: true,
			description:
				'You can communicate telepathically with any creature you can see within 10 spaces that knows at least one language.'
		},
		// Level 2 Features
		{
			id: 'psion_mind_sense',
			featureName: 'Mind Sense',
			levelGained: 2,
			description:
				'Spend 1 AP and 1 MP to sense creatures within 10 spaces (Int ≥ -3) for 1 minute.'
		},
		{
			id: 'psion_invade_mind',
			featureName: 'Invade Mind',
			levelGained: 2,
			description:
				'While Mind Sense is active, spend 1 AP and 1 SP to Assault Mind, Read Emotions, or Read Thoughts of a sensed creature within 10 spaces.'
		},
		{
			id: 'psion_psionic_resolve',
			featureName: 'Psionic Resolve',
			levelGained: 2,
			description:
				'During combat, when you make an Attribute Save, you may spend 1 SP to instead roll a different Attribute Save of your choice.'
		},
		{
			id: 'psion_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain one Talent of your choice for which you meet the prerequisites.'
		}
	],
	subclasses: []
};
````

## File: src/lib/rulesdata/classes-data/features/rogue_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const rogueClass: ClassDefinition = {
	className: 'Rogue',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons or Light Shields'],
		rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with the Toss or Thrown Property'],
		armor: ['1 set of Light Armor'],
		packs: ['X or Y Packs (Adventuring Packs Coming Soon)']
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor'],
			shields: ['Light Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Rogue Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Rogue Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Rogue Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half your maximum SP when you hit a Flanked or Prone target, hit a target with any Condition, hit a target you are Hidden from, or gain the benefits of your Cunning Action.'
		}
	},
	coreFeatures: [
		{
			id: 'rogue_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Rogues exploit weakness through nimbleness and cunning, whether learned as thieves, nobles, or assassins.'
		},
		{
			id: 'rogue_debilitating_strike',
			featureName: 'Debilitating Strike',
			levelGained: 1,
			description:
				"When you hit with a weapon attack you may spend 1 SP. The target makes a Physical Save vs your Save DC; on failure, choose Deafened, Exposed, Hindered, or Slowed 2. The effect lasts until the start of your next turn and different choices may stack but not duplicates."
		},
		{
			id: 'rogue_roguish_finesse',
			featureName: 'Roguish Finesse',
			levelGained: 1,
			description: 'Blend agility, expertise, and opportunism in combat and exploration.',
			benefits: [
				{
					name: 'Cunning Action',
					description:
						'When you take the Disengage, Feint, or Hide actions, gain free movement equal to half your Speed immediately before or after the action.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rogue_cunning_action',
							value:
								'Gain movement equal to half Speed when taking Disengage, Feint, or Hide; movement occurs immediately before or after the action.'
						}
					]
				},
				{
					name: 'Skill Expertise',
					description: 'Increase one Skill Mastery Limit by 1, up to Grandmaster (+10); only one increase per skill.',
					effects: [
						{
							type: 'INCREASE_SKILL_MASTERY_CAP',
							count: 1,
							value: 1
						}
					]
				},
				{
					name: 'Multi-Skilled',
					description: 'Gain 1 Skill Point.',
					effects: [
						{ type: 'MODIFY_STAT', target: 'skillPoints', value: 1 }
					]
				}
			]
		},
		{
			id: 'rogue_cypher_speech',
			featureName: 'Cypher Speech',
			levelGained: 1,
			isFlavor: true,
			description:
				'Become fluent in a Mortal language and craft hidden messages for a demographic of your choice, embedding simple directives in speech or writing.'
		},
		{
			id: 'rogue_cheap_shot',
			featureName: 'Cheap Shot',
			levelGained: 2,
			description:
				'You deal +1 damage on Martial Attacks against targets that are Flanked, Prone, conditioned (except Invisible), or unaware of you due to being Hidden.'
		},
		{
			id: 'rogue_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Long Death',
			description: 'Rogues who inflict lingering, inescapable wounds.',
			features: [
				{
					id: 'rogue_thousand_cuts',
					featureName: 'Thousand Cuts',
					levelGained: 3,
					description:
						'Creatures that fail their Save against your Debilitating Strike also begin Bleeding (ignores immunity). Ending the Bleeding requires your Save DC and cannot be done by regaining HP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rogue_thousand_cuts',
							value:
								'On failed Debilitating Strike saves, inflict Bleeding; DC to end equals your Save DC and regaining HP cannot end it.'
						}
					]
				},
				{
					id: 'rogue_hundred_ways_to_die',
					featureName: 'Hundred Ways to Die',
					levelGained: 3,
					isFlavor: true,
					description:
						'Gain ADV on checks to determine causes of death or ways to kill, including identifying poisons, toxins, or lethal materials.'
				}
			]
		},
		{
			subclassName: 'Swashbuckler',
			description: 'Flashy duelists who taunt foes and seize every opening.',
			features: [
				{
					id: 'rogue_renegade_duelist',
					featureName: 'Renegade Duelist',
					levelGained: 3,
					description:
						'Expand Cunning Action, taunt foes, and counterattack when they falter.',
					benefits: [
						{
							name: 'Flourishes',
							description: 'Cunning Action also grants movement when you take Disarm or Dodge.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_flourishes',
									value:
										'Cunning Action now includes Disarm and Dodge, providing the same free movement before or after the action.'
								}
							]
						},
						{
							name: 'Taunting Shot',
							description: 'Once per turn when attacking a conditioned foe, forgo Cheap Shot damage to force a Charisma Save or Taunt the target until your next turn ends.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_taunting_shot',
									value:
										'When an attack targets a creature with a Condition, you may forego Cheap Shot damage to force a Charisma Save. Failure: the creature is Taunted until the end of your next turn.'
								}
							]
						},
						{
							name: 'Riposte',
							description: 'Creatures that miss you with melee attacks provoke an Opportunity Attack.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'rogue_riposte',
									value: 'When a creature within your melee range misses you with an attack, it provokes an Opportunity Attack from you.'
								}
							]
						}
					]
				},
				{
					id: 'rogue_tall_tales',
					featureName: 'Tall Tales',
					levelGained: 3,
					isFlavor: true,
					description:
						'Spin captivating stories for up to five minutes to distract non-hostile crowds, giving them DisADV on Awareness Checks while enthralled.'
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/sorcerer_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const sorcererClass: ClassDefinition = {
	className: 'Sorcerer',
	startingEquipment: {
		weaponsOrShields: ['1 Weapon'],
		armor: '1 set of Light Armor',
		packs: 'X or Y "Packs" (Adventuring Packs Coming Soon)',
	},
	spellcasterPath: {
		spellList: ['Arcane', 'Divine', 'Primal'],
		cantrips: {
			description:
				'The number of Cantrips you know increases as shown in the Cantrips Known column of the Sorcerer Class Table.',
		},
		spells: {
			description:
				'The number of Spells you know increases as shown in the Spells Known column of the Sorcerer Class Table.',
		},
		manaPoints: {
			maximumIncreasesBy: 'as shown in the Mana Points column of the Sorcerer Class Table.',
		},
	},
	coreFeatures: [
		{
			id: 'sorcerer_innate_power',
			featureName: 'Innate Power',
			levelGained: 1,
			description:
				'Choose a Sorcerous Origin that grants you a benefit: Intuitive Magic, Resilient Magic, or Unstable Magic. Additionally, you gain the following benefits.',
			benefits: [
				{
					name: 'Increased Maximum MP',
					description: 'Your maximum MP increases by 1.',
					effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }],
				},
				{
					name: 'Free Spell Enhancement',
					description:
						'Once per Long Rest, you can use a 1 MP Spell Enhancement without spending any MP (up to your Mana Spend Limit). You regain the ability to use this benefit when you roll for Initiative.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'free_spell_enhancement',
							value: 'Once per Long Rest, use a 1 MP Spell Enhancement for free.',
						},
					],
				},
			],
			choices: [
				{
					id: 'sorcerous_origin',
					prompt: 'Choose a Sorcerous Origin',
					count: 1,
					options: [
						{
							name: 'Intuitive Magic',
							description:
								'Learn an additional Spell and Cantrip from your Sorcerer Spell List.',
							effects: [
								{
									type: 'GRANT_SPELL',
									target: 'sorcerer_spell_list',
									value: 1,
									userChoice: {
										prompt: 'Choose an additional spell from the sorcerer list',
									},
								},
								{
									type: 'GRANT_CANTRIP',
									target: 'sorcerer_spell_list',
									value: 1,
								},
							],
						},
						{
							name: 'Resilient Magic',
							description: 'You gain Dazed Resistance.',
							effects: [{ type: 'GRANT_RESISTANCE', target: 'Dazed', value: true }],
						},
						{
							name: 'Unstable Magic',
							description:
								'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'unstable_magic',
									value:
										'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table.',
								},
							],
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_overload_magic',
			featureName: 'Overload Magic',
			levelGained: 1,
			description:
				'You can spend 2 AP in Combat to channel raw magical energy for 1 minute, or until you become Incapacitated, die, or choose to end it early at any time for free.',
			benefits: [
				{
					name: 'Spell Check Bonus',
					description: 'You gain +5 to all Spell Checks you make.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'spellCheck',
							value: 5,
							condition: 'While Overload Magic is active',
						},
					],
				},
				{
					name: 'Overload Strain',
					description:
						'You must immediately make an Attribute Save (your choice) against your Save DC upon using this Feature, and again at the start of each of your turns. Failure: you gain Exhaustion. You lose any Exhaustion gained in this way when you complete a Short Rest.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'overload_strain',
							value:
								'Must save vs Exhaustion when using Overload Magic and at the start of each turn.',
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_sorcery_spell',
			featureName: 'Sorcery',
			levelGained: 1,
			isFlavor: true,
			description: 'You learn the Sorcery Spell.',
			effects: [{ type: 'GRANT_SPELL', target: 'Sorcery', value: 1 }],
		},
		{
			id: 'sorcerer_meta_magic',
			featureName: 'Meta Magic',
			levelGained: 2,
			description:
				"You gain 2 unique Spell Enhancements from the list below. You can only use 1 of these Spell Enhancements per Spell you cast. MP spent on these Spell Enhancements doesn't count against your Mana Spend Limit.",
			choices: [
				{
					id: 'meta_magic_choice',
					prompt: 'Choose 2 Spell Enhancements',
					count: 2,
					options: [
						{
							name: 'Careful Spell',
							description:
								"When you Cast a Spell that targets an Area of Effect, you can choose to protect some of the creatures from the Spell's full force. Spend 1 MP and choose a number of creatures up to your Prime Modifier. All chosen creatures are immune to the Spell's damage and effects.",
							effects: [],
						},
						{
							name: 'Heightened Spell',
							description:
								'When you Cast a Spell that forces a creature to make a Save to resist its effects, you can spend 1 MP to give 1 target DisADV on its first Save against the Spell.',
							effects: [],
						},
						{
							name: 'Quickened Spell',
							description:
								'You can spend 1 MP to reduce the AP cost of a Spell by 1 (minimum of 1 AP).',
							effects: [],
						},
						{
							name: 'Subtle Spell',
							description:
								'When you cast a Spell, you can spend 1 MP to cast it without any Somatic or Verbal Components.',
							effects: [],
						},
						{
							name: 'Transmuted Spell',
							description:
								'When you cast a Spell that deals a type of damage from the following list, you can spend 1 MP to change that damage type to one of the other listed types: Cold, Corrosion, Fire, Lightning, Poison, or Sonic.',
							effects: [],
						},
					],
				},
			],
		},
		{
			id: 'sorcerer_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'talent',
					value: 1,
					userChoice: { prompt: 'Choose 1 Talent' },
				},
			],
		},
	],
	subclasses: [
		{
			subclassName: 'Angelic',
			features: [
				{
					featureName: 'Celestial Spark',
					levelGained: 1,
					description:
						'You can use a Minor Action to emit Bright Light within a 5 Space Radius and can end the effect at any time. You also gain the following abilities:',
					benefits: [
						{
							name: 'Celestial Origin',
							description: 'You gain 2 Ancestry Points that can only be spent on Angelborn Traits.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'celestial_origin',
									value: 'Gain 2 Ancestry Points for Angelborn Traits.',
								},
							],
						},
						{
							name: 'Celestial Protection',
							description:
								'You learn the Careful Spell Meta Magic option (choose another Meta Magic option if you already know it) and Careful Spell now costs 0 MP to use.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'careful_spell',
									value: 'Learn Careful Spell. It costs 0 MP.',
								},
							],
						},
						{
							name: 'Celestial Overload',
							description:
								"Once per Combat while you're Overloaded, you can spend 1 AP to release a burst of radiant light in a 5 Space Aura. Creatures of your choice within range are either healed or seared by the light (your choice for each creature).",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'celestial_overload',
									value: 'Spend 1 AP while overloaded for AoE heal/damage.',
								},
							],
						},
					],
				},
				{
					featureName: 'Celestial Appearance (Flavor Feature)',
					levelGained: 1,
					isFlavor: true,
					description:
						"You gain additional angelic features such as sparkling skin, feathers, a faint halo, or other changes of your choice. If you already have these features, they're enhanced or expanded upon. Additionally, if you're already Fluent in Celestial, you gain 1 level of Language Mastery in another Language of your choice.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'celestial_appearance',
							value:
								'Gain angelic features. If already fluent in Celestial, gain 1 Language Mastery.',
						},
					],
				},
			],
		},
		{
			subclassName: 'Draconic',
			features: [
				{
					featureName: 'Draconic Spark',
					levelGained: 1,
					description: 'You gain the following abilities:',
					benefits: [
						{
							name: 'Draconic Origin',
							description:
								'You gain 2 Ancestry Points that can only be spent on Dragonborn Traits. Additionally, choose a Draconic Origin from the Dragonborn Ancestry if you haven’t already.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'draconic_origin',
									value:
										'Gain 2 Ancestry Points for Dragonborn Traits & choose a Draconic Origin.',
								},
							],
						},
						{
							name: 'Draconic Overload',
							description:
								'While Overloaded, you gain Resistance (1) to Physical damage and your Draconic Origin damage type.',
							effects: [
								{
									type: 'GRANT_RESISTANCE',
									target: 'Physical',
									value: 1
								},
								{
									type: 'GRANT_RESISTANCE',
									target: 'Draconic Origin Damage Type',
									value: 1
								}
							]
						},
						{
							name: 'Draconic Transmutation',
							description:
								'You gain the Transmuted Spell Meta Magic (choose another Meta Magic option if you already have Transmuted Spell). Transmuted Spell now costs you 0 MP to use if you change the damage type to your Draconic Origin damage type.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'draconic_transmutation',
									value:
										'Gain Transmuted Spell. Cost is 0 MP if changing to Draconic Origin damage type.',
								},
							],
						},
					],
				},
				{
					featureName: 'Draconic Appearance (Flavor Feature)',
					levelGained: 1,
					isFlavor: true,
					description:
						"You gain additional draconic features such as scales, fangs, claws, or other changes of your choice. If you already have these features, they're enhanced or expanded upon. Additionally, you gain 1 level of Language Mastery in Draconic. If you're already Fluent in Draconic, you gain 1 level of Language Mastery in another Language of your choice.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'draconic_appearance',
							value:
								'Gain draconic features and 1 level of Language Mastery in Draconic (or another language if already fluent).',
						},
					],
				},
			],
		},
	],
};
````

## File: src/lib/rulesdata/classes-data/features/warlock_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const warlockClass: ClassDefinition = {
	className: 'Warlock',
	spellcasterPath: {
		spellList: {
			type: 'all_schools',
			schoolCount: 4,
			description:
				'You choose 4 Spell Schools. When you learn a new Spell, you can choose any Spell from the chosen Spell Schools.'
		},
		cantrips: {
			description: 'Cantrips Known column of the Warlock Class Table'
		},
		spells: {
			description: 'Spells Known column of the Warlock Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Warlock Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'warlock_contract',
			featureName: 'Warlock Contract',
			levelGained: 1,
			description:
				'You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons.',
			benefits: [
				{
					name: 'Hasty Bargain',
					description:
						'Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'hasty_bargain',
							value: 'Once per turn: spend 1 HP to gain ADV on a Check.'
						}
					]
				},
				{
					name: 'Desperate Bargain',
					description:
						'Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'desperate_bargain',
							value:
								'Once per Combat: spend 1 AP to regain HP equal to your Prime Modifier, but become Exposed.'
						}
					]
				}
			]
		},
		{
			id: 'warlock_pact_boon',
			featureName: 'Pact Boon',
			levelGained: 1,
			description:
				'You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.',
			choices: [
				{
					id: 'warlock_pact_boon_0',
					prompt: 'Choose your Pact Boon',
					count: 1,
					options: [
						{
							name: 'Pact Weapon',
							description:
								'You can bond with a weapon, granting it magical properties and allowing you to summon it at will.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_mastery',
									value: 'Considered to have Training with your Pact Weapon.'
								},
								{ type: 'GRANT_CHOICE', target: 'maneuver_save', value: 2 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_style',
									value: "Benefit from your Pact Weapon's Style Passive."
								},
								{
									type: 'GRANT_ABILITY',
									target: 'pact_weapon_summon',
									value: 'Dismiss to and summon from a pocket dimension as a Minor Action.'
								}
							]
						},
						{
							name: 'Pact Armor',
							description:
								'You can bond with a suit of armor, granting it magical properties and allowing you to summon it onto your body.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_armor_mastery',
									value: 'Considered to have Training with your Pact Armor.'
								},
								{ type: 'GRANT_CHOICE', target: 'maneuver_defensive', value: 3 },
								{ type: 'MODIFY_STAT', target: 'mdr', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_armor_summon',
									value: 'Dismiss to and summon from a pocket dimension as a Minor Action.'
								}
							]
						},
						{
							name: 'Pact Cantrip',
							description:
								'Choose a Spell you know with the Cantrip Spell Tag. It becomes your Pact Cantrip, gaining special benefits.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'pact_cantrip',
									value:
										'Chosen cantrip deals +1 damage to Bloodied targets, its range increases, and you can grant yourself ADV on its Spell Check once per round.'
								}
							]
						},
						{
							name: 'Pact Familiar',
							description:
								'You learn the Find Familiar Spell. When you cast it, your Familiar gains 3 additional Familiar Traits of your choice for free.',
							effects: [
								{ type: 'GRANT_SPELL', target: 'Find Familiar', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'pact_familiar_bonus',
									value: 'Your familiar gains 3 additional Familiar Traits for free.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'warlock_life_tap',
			featureName: 'Life Tap',
			levelGained: 2,
			description:
				"When you produce an MP Effect, you can spend HP in place of MP. The total amount of HP and MP spent can't exceed your Mana Spend Limit. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'life_tap',
					value:
						'Once per Long Rest, you can spend HP instead of MP for spell effects (regain on initiative).'
				}
			]
		},
		{
			id: 'warlock_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'talent',
					value: 1
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Eldritch',
			description: 'Your patron gifts you with forbidden knowledge and psychic power.',
			features: [
				{
					featureName: 'Otherworldly Gift',
					levelGained: 3, // Assuming subclass features start at level 3
					description:
						'Your patron grants you the following benefits: Psychic Spellcasting, Forbidden Knowledge, and an Eldritch Bargain.',
					benefits: [
						{
							name: 'Psychic Spellcasting',
							description:
								'You learn 1 Spell of your choice with the Psychic Spell Tag. When you learn a new Spell, you can choose any Spell that has the Psychic Spell Tag.',
							effects: [
								{
									type: 'GRANT_SPELL',
									target: 'any_psychic_tag',
									value: 1
								}
							]
						},
						{
							name: 'Forbidden Knowledge',
							description:
								'When you complete a Short or Long Rest, you temporarily learn any Spell of your choice. When you cast that Spell, its MP cost is reduced by 1 (minimum of 0). You forget the Spell immediately after you cast it.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'forbidden_knowledge',
									value: 'Temporarily learn any spell after a rest with a 1 MP cost reduction.'
								}
							]
						},
						{
							name: 'Eldritch Bargain',
							description:
								'When you make an Attack against the PD or AD of a creature, you can spend 1 HP to target its other Defense instead.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'eldritch_bargain',
									value:
										"Spend 1 HP to target a creature's other defense (PD or AD) with an attack."
								}
							]
						}
					]
				},
				{
					featureName: 'Alien Comprehension (Flavor Feature)',
					levelGained: 3,
					isFlavor: true,
					description:
						'You become Fluent in Deep Speech, and you understand the writings and ramblings of lunatics.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'alien_comprehension',
							value: 'Become fluent in Deep Speech and understand mad writings.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Fey',
			description:
				'Your patron is a lord or lady of the fey, granting you beguiling and tricky powers.',
			features: [
				{
					featureName: 'Fey Aspect',
					levelGained: 3,
					description:
						'You gain benefits related to a Fey Aspect of your choice (Charmed or Intimidated).',
					choices: [
						{
							id: 'warlock_fey_aspect_0',
							prompt: 'Choose your Fey Aspect Condition',
							count: 1,
							options: [
								{
									name: 'Charmed',
									description: 'Your Fey Aspect is the Charmed condition.',
									effects: []
								},
								{
									name: 'Intimidated',
									description: 'Your Fey Aspect is the Intimidated condition.',
									effects: []
								}
							]
						}
					],
					benefits: [
						{
							name: "Can't Trick a Trickster",
							description: 'You have ADV on Saves against your Fey Aspect Condition.',
							effects: [
								{
									type: 'GRANT_ADV_ON_SAVE',
									target: 'Fey_Aspect_Condition',
									value: true
								}
							]
						},
						{
							name: 'Fey Step',
							description:
								"When you're Hit by an Attack, you can spend 1 AP as a Reaction to teleport up to 3 Spaces and become Invisible until the start of your next turn. (Once per Long Rest, regain on initiative).",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'fey_step',
									value: 'Reaction teleport when hit, becoming invisible.'
								}
							]
						},
						{
							name: 'Beguiling Bargain',
							description:
								'Once on each of your turns when you cast a Spell or make an Attack, you can spend 1 HP to force a target to make a Charisma Save. Failure: You subject the target to your Fey Aspect Condition until the end of your next turn.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'beguiling_bargain',
									value:
										'Spend 1 HP on spell/attack to force a save against your Fey Aspect Condition.'
								}
							]
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/progressions/refactor-tables.ts
````typescript
import fs from 'fs';
import path from 'path';
// --- CONFIGURATION ---
// These paths are now relative to the project root, making the script robust.
const SOURCE_DIR_RELATIVE = 'src/lib/rulesdata/classes-data/tables';
const OUTPUT_DIR_RELATIVE = 'src/lib/rulesdata/classes-data/progressions';
// --- END CONFIGURATION ---
// Define the source and destination directories from the project root
const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, SOURCE_DIR_RELATIVE);
const outputDir = path.join(projectRoot, OUTPUT_DIR_RELATIVE);
// (The rest of the script is the same as before)
interface OldClassLevel {
    level: number;
    healthPoints: number;
    attributePoints: number;
    skillPoints: number;
    tradePoints: number;
    staminaPoints: number;
    maneuversKnown: number;
    techniquesKnown: number;
    manaPoints: number;
    cantripsKnown: number;
    spellsKnown: number;
    features: string;
}
interface LevelGains {
    talents?: number;
    pathPoints?: number;
    ancestryPoints?: number;
    classFeatures?: string[];
    subclassFeatureChoice?: boolean;
    epicBoon?: boolean;
}
function parseFeaturesStringToGains(featureString: string): LevelGains {
    const gains: LevelGains = {};
    if (featureString.includes('Talent')) {
        gains.talents = 1;
    }
    if (featureString.includes('Path Point')) {
        gains.pathPoints = 1;
    }
    const ancestryMatch = featureString.match(/(\d+)\s*Ancestry\s*Points/);
    if (ancestryMatch) {
        gains.ancestryPoints = parseInt(ancestryMatch[1], 10);
    }
    if (featureString.includes('Class Features')) {
        gains.classFeatures = ['placeholder_lvl_1_features'];
    } else if (featureString.includes('Class Capstone Feature')) {
        gains.classFeatures = ['placeholder_class_capstone'];
    } else if (featureString.includes('Class Feature')) {
        gains.classFeatures = ['placeholder_class_feature'];
    }
    if (featureString.includes('Subclass Feature') || featureString.includes('Subclass Capstone Feature')) {
        gains.subclassFeatureChoice = true;
    }
    if (featureString.includes('Epic Boon')) {
        gains.epicBoon = true;
    }
    return gains;
}
function main() {
    console.log('Starting conversion of class progression tables...');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
    }
    const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('_table.json'));
    if (files.length === 0) {
        console.warn(`No JSON files found in ${sourceDir}. Aborting.`);
        return;
    }
    console.log(`Found ${files.length} class tables to convert.`);
    for (const file of files) {
        const filePath = path.join(sourceDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        const className = jsonData.className;
        const newProgressionData = jsonData.levelProgression.map((level: OldClassLevel) => {
            return {
                level: level.level,
                gainedHealth: level.healthPoints,
                gainedAttributePoints: level.attributePoints,
                gainedSkillPoints: level.skillPoints,
                gainedTradePoints: level.tradePoints,
                gainedStaminaPoints: level.staminaPoints,
                gainedManeuversKnown: level.maneuversKnown,
                gainedTechniquesKnown: level.techniquesKnown,
                gains: parseFeaturesStringToGains(level.features)
            };
        });
        const tsContent = `
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const ${className.toLowerCase()}Progression: any[] = ${JSON.stringify(newProgressionData, null, 2)};
`;
        const outputFileName = `${className.toLowerCase()}.progression.ts`;
        const outputFilePath = path.join(outputDir, outputFileName);
        fs.writeFileSync(outputFilePath, tsContent.trim());
        console.log(`✅ Converted ${file} -> ${outputFileName}`);
    }
    console.log('\nConversion complete! 🎉');
}
main();
````

## File: src/lib/rulesdata/classes-data/talents/barbarian.talents.ts
````typescript
import type { Talent } from './talent.types';
export const barbarianTalents: Talent[] = [
  {
    id: 'barbarian_unfathomable_strength',
    name: 'Unfathomable Strength',
    category: 'Class',
    description: 'While Raging, you can wield Two-Handed Weapons using only one hand. Your Jump Distance also increases by 1.',
    prerequisites: { classId: 'barbarian', feature: 'Rage', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'titan_grip', value: 'Wield Two-Handed weapons in one hand while Raging.' },
      { type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 },
    ],
  },
  {
    id: 'barbarian_swift_berserker',
    name: 'Swift Berserker',
    category: 'Class',
    description: 'You can immediately enter a Rage as a Reaction upon rolling for Initiative. The movement granted by your Charge ignores Difficult Terrain and doesn’t provoke Opportunity Attacks.',
    prerequisites: { classId: 'barbarian', feature: 'Rage', subclass: 'Berserker', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'quick_to_anger', value: 'Enter Rage as a reaction to Initiative.' },
      { type: 'GRANT_ABILITY', target: 'unstoppable_charge', value: 'Charge ignores Difficult Terrain and Opportunity Attacks.' },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/bard.talents.ts
````typescript
import type { Talent } from './talent.types';
export const bardTalents: Talent[] = [
  {
    id: 'bard_expanded_repertoire',
    name: 'Expanded Repertoire',
    category: 'Class',
    description: 'You gain 2 Skill Points, learn 2 Spells from any Spell List, and gain another manner of Magical Expression (Auditory or Visual).',
    prerequisites: { classId: 'bard', feature: 'Remarkable Repertoire', level: 3 },
    effects: [
      { type: 'MODIFY_STAT', target: 'skillPoints', value: 2 },
      { type: 'MODIFY_STAT', target: 'spellsKnown', value: 2 },
      { type: 'GRANT_CHOICE', target: 'magical_expression', value: 1 },
    ],
  },
  {
    id: 'bard_helping_hands',
    name: 'Helping Hands',
    category: 'Class',
    description: 'Once per Round, when you take the Help Action, you can grant a bonus d8 Help Die to a different creature within range (including yourself) that they can apply to the same type of Check.',
    prerequisites: { classId: 'bard', feature: 'Font of Inspiration', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'helping_hands', value: 'Once per round, grant a second d8 Help Die to a different creature.' },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/champion.talents.ts
````typescript
import type { Talent } from './talent.types';
export const championTalents: Talent[] = [
  {
    id: 'champion_champions_resolve',
    name: 'Champion’s Resolve',
    category: 'Class',
    description: 'When you use a Tactical Die, your Assault deals +1 damage, and your Deflect deals 1 damage of a physical type of your choice to the attacker if the Attack Misses.',
    prerequisites: { classId: 'champion', feature: 'Adaptive Tactics', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'champions_resolve',
        value: 'Enhances Tactical Die: Assault deals +1 damage, Deflect deals 1 damage on miss.',
      },
    ],
  },
  {
    id: 'champion_disciplined_combatant',
    name: 'Disciplined Combatant',
    category: 'Class',
    description: 'Once on each of your turns, you can spend 1 SP to gain the benefit of Combat Readiness. Additionally, you can use Second Wind without being Bloodied.',
    prerequisites: { classId: 'champion', feature: 'Fighting Spirit', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'disciplined_combatant',
        value: 'Spend 1 SP for Combat Readiness benefit. Can use Second Wind while not Bloodied.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/cleric.talents.ts
````typescript
import type { Talent } from './talent.types';
export const clericTalents: Talent[] = [
  {
    id: 'cleric_expanded_order',
    name: 'Expanded Order',
    category: 'Class',
    description: 'You gain 2 additional Divine Domains. You can’t choose the same option more than once.',
    prerequisites: { classId: 'cleric', feature: 'Cleric Order' },
    effects: [{ type: 'GRANT_CHOICE', target: 'divine_domain', value: 2 }],
  },
  {
    id: 'cleric_bountiful_blessings',
    name: 'Bountiful Blessings',
    category: 'Class',
    description: 'When Combat starts, you immediately gain a Blessing of your choice for free. Additionally, you can have 2 Blessings at the same time, but you can’t apply both to the same creature at once.',
    prerequisites: { classId: 'cleric', feature: 'Divine Blessing', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'bountiful_blessings',
        value: 'Gain a free Blessing at combat start. Can maintain 2 Blessings at once.',
      },
    ],
  },
  {
    id: 'cleric_divine_cleanse',
    name: 'Divine Cleanse',
    category: 'Class',
    description: 'When a creature fails a Save, you can spend 1 AP as a Reaction to make a Spell Check to let them succeed instead. When a creature benefits from your Lesser Divine Intervention, they are also cured of an affliction.',
    prerequisites: { classId: 'cleric', feature: 'Channel Divinity', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'saving_grace',
        value: '1 AP Reaction to turn a failed Save into a success with a Spell Check.',
      },
      {
        type: 'GRANT_ABILITY',
        target: 'cleansing_intervention',
        value: 'Lesser Divine Intervention also cures an affliction.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/commander.talents.ts
````typescript
import type { Talent } from './talent.types';
export const commanderTalents: Talent[] = [
  {
    id: 'commander_seize_momentum',
    name: 'Seize Momentum',
    category: 'Class',
    description: 'When an ally within your Commanding Aura scores a Heavy Hit, you can use your Commander’s Call as a Reaction.',
    prerequisites: { classId: 'commander', feature: 'Commander’s Call', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'seize_momentum',
        value: 'Use Commander’s Call as a Reaction when an ally scores a Heavy Hit.',
      },
    ],
  },
  {
    id: 'commander_coordinated_command',
    name: 'Coordinated Command',
    category: 'Class',
    description: 'Once per Round, when you use your Commander’s Call, you can spend 1 additional SP to target a second creature within range (including yourself).',
    prerequisites: { classId: 'commander', feature: 'Commander’s Call', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'coordinated_command',
        value: 'Spend 1 SP with Commander’s Call to target a second creature.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/druid.talents.ts
````typescript
import type { Talent } from './talent.types';
export const druidTalents: Talent[] = [
  {
    id: 'druid_wild_form_expansion',
    name: 'Wild Form Expansion',
    category: 'Class',
    description: 'At the start of each of your turns, you can transform into your True Form or a Wild Form without spending AP. When you use Wild Form, you get 2 additional Trait Points to spend.',
    prerequisites: { classId: 'druid', feature: 'Wild Form', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'free_transformation', value: 'Transform for free at the start of your turn.' },
      { type: 'MODIFY_STAT', target: 'wild_form_trait_points', value: 2 },
    ],
  },
  {
    id: 'druid_natures_vortex',
    name: 'Nature’s Vortex',
    category: 'Class',
    description: 'Creatures of your choice are immune to your Nature’s Torrent. You can increase its radius by 1 and impose DisADV on Ranged Attacks within it. You can also spend 2 AP to use it as an Aura.',
    prerequisites: { classId: 'druid', feature: 'Nature’s Torrent', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'natures_vortex',
        value: 'Enhances Nature’s Torrent with immunity for allies, larger radius, and an aura option.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/hunter.talents.ts
````typescript
import type { Talent } from './talent.types';
export const hunterTalents: Talent[] = [
  {
    id: 'hunter_expanded_terrains',
    name: 'Expanded Terrains',
    category: 'Class',
    description: 'You gain 2 additional Favored Terrains. You can’t choose the same option more than once.',
    prerequisites: { classId: 'hunter', feature: 'Favored Terrain' },
    effects: [{ type: 'GRANT_CHOICE', target: 'favored_terrain', value: 2 }],
  },
  {
    id: 'hunter_pack_leader',
    name: 'Pack Leader',
    category: 'Class',
    description: 'Creatures of your choice can add a d4 to the first Attack they make on each of their turns against your Marked target.',
    prerequisites: { classId: 'hunter', feature: 'Hunter’s Mark', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'pack_leader',
        value: 'Allies add d4 to first attack against your Marked target.',
      },
    ],
  },
  {
    id: 'hunter_big_game_hunter',
    name: 'Big Game Hunter',
    category: 'Class',
    description: 'You gain additional benefits against Marked targets that are Large or larger: +1 damage, ADV on Saves they force, and ADV on Analyze Creature checks.',
    prerequisites: { classId: 'hunter', feature: 'Hunter’s Mark', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'big_game_hunter',
        value: 'Bonuses against Large or larger Marked targets.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/monk.talents.ts
````typescript
import type { Talent } from './talent.types';
export const monkTalents: Talent[] = [
  {
    id: 'monk_expanded_stances',
    name: 'Expanded Stances',
    category: 'Class',
    description: 'You learn 2 additional Monk Stances. Once on each of your turns, you can enter a Monk Stance without spending SP.',
    prerequisites: { classId: 'monk', feature: 'Monk Stance' },
    effects: [
      { type: 'GRANT_CHOICE', target: 'monk_stance', value: 2 },
      { type: 'GRANT_ABILITY', target: 'free_stance_entry', value: 'Enter a Monk Stance for free once per turn.' },
    ],
  },
  {
    id: 'monk_internal_damage',
    name: 'Internal Damage',
    category: 'Class',
    description: 'When you make an Unarmed Strike, you can spend any amount of SP to cause the target to make a Repeated Physical Save. Failure: They become Impaired for 1 minute and take Sonic damage equal to the SP spent at the start of their turns.',
    prerequisites: { classId: 'monk', other: '1 or more Monk Features', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'internal_damage',
        value: 'Spend SP on Unarmed Strike to cause Impaired and ongoing Sonic damage.',
      },
    ],
  },
  {
    id: 'monk_steel_fist',
    name: 'Steel Fist',
    category: 'Class',
    description: 'Your Unarmed Strikes deal 2 damage but no longer have the Impact Property. Once on each of your turns, when you make a Melee Martial Attack, you can spend 1 SP to immediately make an Unarmed Strike against a creature within range.',
    prerequisites: { classId: 'monk', feature: 'Monk Training', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'steel_fist',
        value: 'Unarmed Strikes deal 2 damage (lose Impact). Spend 1 SP for an extra Unarmed Strike.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/rogue.talents.ts
````typescript
import type { Talent } from './talent.types';
export const rogueTalents: Talent[] = [
  {
    id: 'rogue_unseen_ambusher',
    name: 'Unseen Ambusher',
    category: 'Class',
    description: 'You have ADV on Stealth Checks made in Combat. Enemies you are Hidden from have DisADV on their Saves against your Debilitating Strikes.',
    prerequisites: { classId: 'rogue', feature: 'Debilitating Strike', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'skulker', value: 'ADV on Stealth Checks in Combat.' },
      {
        type: 'GRANT_ABILITY',
        target: 'backstab',
        value: 'Enemies Hidden from have DisADV on Saves vs Debilitating Strikes.',
      },
    ],
  },
  {
    id: 'rogue_sinister_shot',
    name: 'Sinister Shot',
    category: 'Class',
    description: 'Your Cheap Shot deals +1 damage for each additional Condition on the target. Multiple stacks of the same Condition count only once.',
    prerequisites: { classId: 'rogue', feature: 'Cheap Shot', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'sinister_shot',
        value: 'Cheap Shot deals +1 damage per unique Condition on the target.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/sorcerer.talents.ts
````typescript
import type { Talent } from './talent.types';
export const sorcererTalents: Talent[] = [
  {
    id: 'sorcerer_expanded_meta_magic',
    name: 'Expanded Meta Magic',
    category: 'Class',
    description: 'Your maximum MP increases by 2. You gain 2 additional Meta Magic Spell Enhancements.',
    prerequisites: { classId: 'sorcerer', feature: 'Meta Magic' },
    effects: [
      { type: 'MODIFY_STAT', target: 'mpMax', value: 2 },
      { type: 'GRANT_CHOICE', target: 'meta_magic', value: 2 },
    ],
  },
  {
    id: 'sorcerer_greater_innate_power',
    name: 'Greater Innate Power',
    category: 'Class',
    description: 'Your MP maximum increases by 1. When you use your Innate Power, you gain ADV on the Spell Check. You gain another Sorcerous Origin of your choice.',
    prerequisites: { classId: 'sorcerer', feature: 'Innate Power', level: 3 },
    effects: [
      { type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
      { type: 'GRANT_ABILITY', target: 'adv_on_innate_power', value: 'Gain ADV on Spell Check when using Innate Power.' },
      { type: 'GRANT_CHOICE', target: 'sorcerous_origin', value: 1 },
    ],
  },
  {
    id: 'sorcerer_font_of_magic',
    name: 'Font of Magic',
    category: 'Class',
    description: 'You can spend 2 Rest Points in place of 1 MP on Meta Magic. You regain 1 Rest Point when you roll for Initiative.',
    prerequisites: { classId: 'sorcerer', feature: 'Meta Magic', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'font_of_magic',
        value: 'Spend 2 Rest Points for 1 MP on Meta Magic. Regain 1 Rest Point on Initiative.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/spellblade.talents.ts
````typescript
import type { Talent } from './talent.types';
export const spellbladeTalents: Talent[] = [
  {
    id: 'spellblade_expanded_disciplines',
    name: 'Expanded Disciplines',
    category: 'Class',
    description: 'You gain 2 additional Spellblade Disciplines.',
    prerequisites: { classId: 'spellblade', feature: 'Spellblade Disciplines' },
    effects: [{ type: 'GRANT_CHOICE', target: 'spellblade_discipline', value: 2 }],
  },
  {
    id: 'spellblade_sling_blade',
    name: 'Sling-Blade',
    category: 'Class',
    description: 'The range of your Attacks with Melee Weapons is increased by 2. When you use Spellstrike, the range of the Spell changes to match your Weapon’s range.',
    prerequisites: { classId: 'spellblade', feature: 'Bound Weapon', level: 3 },
    effects: [
      { type: 'GRANT_ABILITY', target: 'distant_strike', value: 'Melee weapon attack range increased by 2.' },
      { type: 'GRANT_ABILITY', target: 'extended_spellstrike', value: 'Spellstrike range matches weapon range.' },
    ],
  },
  {
    id: 'spellblade_adaptive_bond',
    name: 'Adaptive Bond',
    category: 'Class',
    description: 'You can switch your Bound Damage type more easily. After you take Elemental or Mystical damage, you can change your Bound Damage type to match it for free. You also gain Resistance (1) to your Bound Damage type.',
    prerequisites: { classId: 'spellblade', feature: 'Bound Weapon', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'adaptive_bond',
        value: 'Adapt Bound Damage type and gain Resistance (1) to it.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/warlock.talents.ts
````typescript
import type { Talent } from './talent.types';
export const warlockTalents: Talent[] = [
  {
    id: 'warlock_expanded_boon',
    name: 'Expanded Boon',
    category: 'Class',
    description: 'You gain 1 additional Pact Boon.',
    prerequisites: { classId: 'warlock', feature: 'Pact Boon' },
    effects: [{ type: 'GRANT_CHOICE', target: 'pact_boon', value: 1 }],
  },
  {
    id: 'warlock_pact_bane',
    name: 'Pact Bane',
    category: 'Class',
    description: 'You learn the Bane Spell. Creatures subjected to Bane suffer additional effects based on your chosen Pact Boon.',
    prerequisites: { classId: 'warlock', feature: 'Pact Boon', level: 3 },
    effects: [
      { type: 'GRANT_SPELL', target: 'Bane', value: 1 },
      {
        type: 'GRANT_ABILITY',
        target: 'pact_bane',
        value: 'Bane imposes extra effects based on your Pact Boon.',
      },
    ],
  },
  {
    id: 'warlock_warlock_subcontract',
    name: 'Warlock Subcontract',
    category: 'Class',
    description: 'You can spend 1 minute to create a Warlock Subcontract with a willing creature, granting shared telepathy and allowing them to use Hasty Bargain. You can also spend their HP on your Warlock features.',
    prerequisites: { classId: 'warlock', feature: 'Warlock Contract', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'warlock_subcontract',
        value: 'Create a subcontract with an ally for shared benefits and costs.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/talents/wizard.talents.ts
````typescript
import type { Talent } from './talent.types';
export const wizardTalents: Talent[] = [
  {
    id: 'wizard_expanded_spell_school',
    name: 'Expanded Spell School',
    category: 'Class',
    description: 'Choose 1 additional Spell School. You learn 1 Arcane Cantrip and 1 Arcane Spell from this school, and can use Signature School once per chosen school.',
    prerequisites: { classId: 'wizard', feature: 'Spell School Initiate' },
    effects: [
      { type: 'GRANT_CHOICE', target: 'spell_school', value: 1 },
      { type: 'GRANT_CANTRIP', target: 'chosen_school', value: 1 },
      { type: 'GRANT_SPELL', target: 'chosen_school', value: 1 },
    ],
  },
  {
    id: 'wizard_crowned_sigil',
    name: 'Crowned Sigil',
    category: 'Class',
    description: 'When you create an Arcane Sigil, you can bind it to yourself. While bound, it moves with you and grants you a +2 bonus to your AD.',
    prerequisites: { classId: 'wizard', feature: 'Arcane Sigil', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'crowned_sigil',
        value: 'Bind Arcane Sigil to yourself for mobility and +2 AD.',
      },
    ],
  },
  {
    id: 'wizard_overly_prepared_spell',
    name: 'Overly Prepared Spell',
    category: 'Class',
    description: 'Your Prepared Spell can be changed on a Short Rest, grants Dazed Resistance while Sustaining, and you gain ADV on Spell Duels with it.',
    prerequisites: { classId: 'wizard', feature: 'Prepared Spell', level: 3 },
    effects: [
      {
        type: 'GRANT_ABILITY',
        target: 'overly_prepared_spell',
        value: 'Enhances your Prepared Spell with flexibility and power.',
      },
    ],
  },
];
````

## File: src/lib/rulesdata/classes-data/classProgressionResolver.test.ts
````typescript
/**
 * Unit tests for Class Progression Resolver (UT-2)
 * 
 * Tests the resolveClassProgression function and helper functions
 */
import { describe, it, expect } from 'vitest';
import { 
	resolveClassProgression,
	getAvailableSubclasses,
	resolveSubclassFeatures
} from './classProgressionResolver';
describe('Class Progression Resolver (UT-2)', () => {
	describe('resolveClassProgression - Basic Functionality', () => {
		it('should resolve Level 1 Barbarian progression', () => {
			const result = resolveClassProgression('barbarian', 1);
			expect(result.level).toBe(1);
			expect(result.classId).toBe('barbarian');
			expect(result.className).toBe('Barbarian');
			// Should have budgets
			expect(result.budgets).toBeDefined();
			expect(result.budgets.totalHP).toBe(9); // Level 1 HP
			expect(result.budgets.totalSP).toBe(1); // Level 1 SP
			expect(result.budgets.totalMP).toBe(0); // Martial class
			// Should have unlocked features
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);
			// Check for expected features
			const featureIds = result.unlockedFeatures.map(f => f.id || f.featureName);
			expect(featureIds).toContain('barbarian_martial_path');
			expect(featureIds).toContain('barbarian_rage');
		});
		it('should resolve Level 2 progression with accumulated budgets', () => {
			const result = resolveClassProgression('barbarian', 2);
			expect(result.level).toBe(2);
			// Budgets should accumulate
			expect(result.budgets.totalHP).toBe(12); // 9 + 3
			expect(result.budgets.totalSP).toBe(1); // 1 + 0
			// Should have features from both levels
			expect(result.unlockedFeatures.length).toBeGreaterThan(4);
			// Check for L2 features
			const featureNames = result.unlockedFeatures.map(f => f.featureName);
			expect(featureNames).toContain('Battlecry');
			expect(featureNames).toContain('Talent');
		});
		it('should resolve Level 3 progression with subclass choice', () => {
			const result = resolveClassProgression('barbarian', 3);
			expect(result.level).toBe(3);
			expect(result.budgets.totalHP).toBe(15); // 9 + 3 + 3
			// Subclass choice should be available
			expect(result.availableSubclassChoice).toBe(true);
			expect(result.subclassChoiceLevel).toBe(3);
		});
	});
	describe('resolveClassProgression - Feature Objects', () => {
		it('should return actual ClassFeature objects', () => {
			const result = resolveClassProgression('barbarian', 1);
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);
			const firstFeature = result.unlockedFeatures[0];
			// Check feature structure
			expect(firstFeature).toHaveProperty('featureName');
			expect(firstFeature).toHaveProperty('levelGained');
			expect(firstFeature).toHaveProperty('description');
			expect(typeof firstFeature.featureName).toBe('string');
			expect(typeof firstFeature.levelGained).toBe('number');
		});
		it('should include feature effects', () => {
			const result = resolveClassProgression('barbarian', 1);
			// Find a feature with effects (Martial Path has combat training effects)
			const martialPath = result.unlockedFeatures.find(
				f => f.id === 'barbarian_martial_path' || f.featureName === 'Martial Path'
			);
			expect(martialPath).toBeDefined();
			expect(martialPath?.effects).toBeDefined();
		});
		it('should track pending feature choices', () => {
			const result = resolveClassProgression('barbarian', 1);
			// Some classes have choices at L1 (e.g., Cleric, Wizard)
			expect(result.pendingFeatureChoices).toBeDefined();
			expect(Array.isArray(result.pendingFeatureChoices)).toBe(true);
		});
	});
	describe('resolveClassProgression - Spellcaster Classes', () => {
		it('should resolve Wizard with spell budgets', () => {
			const result = resolveClassProgression('wizard', 1);
			expect(result.budgets.totalMP).toBeGreaterThan(0);
			expect(result.budgets.totalCantripsKnown).toBeGreaterThan(0);
			expect(result.budgets.totalSpellsKnown).toBeGreaterThan(0);
			// Should have spellcasting path
			const hasSpellcasting = result.unlockedFeatures.some(
				f => f.id === 'wizard_spellcasting_path' || f.featureName.includes('Spellcasting')
			);
			expect(hasSpellcasting).toBe(true);
		});
		it('should accumulate spell budgets across levels', () => {
			const l1 = resolveClassProgression('wizard', 1);
			const l3 = resolveClassProgression('wizard', 3);
			expect(l3.budgets.totalMP).toBeGreaterThan(l1.budgets.totalMP);
			expect(l3.budgets.totalSpellsKnown).toBeGreaterThanOrEqual(l1.budgets.totalSpellsKnown);
		});
	});
	describe('resolveClassProgression - Talent & Path Points', () => {
		it('should not grant talents at level 1', () => {
			const result = resolveClassProgression('barbarian', 1);
			expect(result.budgets.totalTalents).toBe(0);
			expect(result.budgets.totalPathPoints).toBe(0);
		});
		it('should grant talents and path points at level 2', () => {
			const result = resolveClassProgression('barbarian', 2);
			expect(result.budgets.totalTalents).toBe(1);
			expect(result.budgets.totalPathPoints).toBe(1);
		});
		it('should accumulate talents across multiple levels', () => {
			const l2 = resolveClassProgression('barbarian', 2);
			const l4 = resolveClassProgression('barbarian', 4);
			expect(l4.budgets.totalTalents).toBeGreaterThan(l2.budgets.totalTalents);
		});
	});
	describe('getAvailableSubclasses', () => {
		it('should return subclasses for Barbarian', () => {
			const subclasses = getAvailableSubclasses('barbarian');
			expect(subclasses.length).toBeGreaterThan(0);
			expect(subclasses[0]).toHaveProperty('name');
			expect(subclasses[0]).toHaveProperty('description');
		});
		it('should return empty array for invalid class', () => {
			const subclasses = getAvailableSubclasses('invalid_class');
			expect(subclasses).toEqual([]);
		});
	});
	describe('resolveSubclassFeatures', () => {
		it('should return subclass features up to level', () => {
			const subclasses = getAvailableSubclasses('barbarian');
			expect(subclasses.length).toBeGreaterThan(0);
			const subclassName = subclasses[0].name;
			const features = resolveSubclassFeatures('barbarian', subclassName, 3);
			expect(features.length).toBeGreaterThan(0);
			// All features should be level 3 or below
			features.forEach(f => {
				expect(f.levelGained).toBeLessThanOrEqual(3);
			});
		});
		it('should return empty array for invalid subclass', () => {
			const features = resolveSubclassFeatures('barbarian', 'Nonexistent Subclass', 10);
			expect(features).toEqual([]);
		});
	});
	describe('resolveClassProgression - Multiple Classes', () => {
		const classesToTest = [
			'barbarian', 
			'cleric', 
			'wizard', 
			'rogue', 
			'monk'
		];
		classesToTest.forEach(classId => {
			it(`should resolve ${classId} without errors`, () => {
				expect(() => resolveClassProgression(classId, 1)).not.toThrow();
				expect(() => resolveClassProgression(classId, 2)).not.toThrow();
				expect(() => resolveClassProgression(classId, 3)).not.toThrow();
			});
		});
	});
	describe('Error Handling', () => {
		it('should throw for invalid class ID', () => {
			expect(() => resolveClassProgression('invalid_class', 1)).toThrow();
		});
		it('should handle level 0 gracefully', () => {
			const result = resolveClassProgression('barbarian', 0);
			// Should return empty budgets
			expect(result.budgets.totalHP).toBe(0);
			expect(result.unlockedFeatures.length).toBe(0);
		});
		it('should handle extremely high levels', () => {
			const result = resolveClassProgression('barbarian', 100);
			// Should accumulate all available levels without crashing
			expect(result.budgets.totalHP).toBeGreaterThan(0);
			expect(result.level).toBe(100);
		});
	});
	describe('Budgets Consistency', () => {
		it('should have consistent budgets between L1 features and progression', () => {
			const result = resolveClassProgression('barbarian', 1);
			// All L1 features should have levelGained === 1
			result.unlockedFeatures.forEach(feature => {
				expect(feature.levelGained).toBe(1);
			});
		});
		it('should accumulate features without duplicates', () => {
			const result = resolveClassProgression('barbarian', 3);
			const featureIds = result.unlockedFeatures.map(f => f.id || f.featureName);
			const uniqueIds = new Set(featureIds);
			// No duplicates
			expect(featureIds.length).toBe(uniqueIds.size);
		});
	});
});
````

## File: src/lib/rulesdata/classes-data/classProgressionResolver.ts
````typescript
/**
 * Class Progression Resolver
 * 
 * Resolves all progression data for a character up to a target level.
 * Returns budgets, unlocked features (with full objects), and pending choices.
 * 
 * This is the single source of truth for:
 * - What features a character has at level N
 * - What budgets (talents, path points, etc.) they have available
 * - What choices they still need to make
 */
import type { ClassFeature, FeatureChoice } from '../schemas/character.schema';
import type { IClassDefinition } from '../schemas/class.schema';
import { classesData } from '../loaders/class.loader';
import { barbarianClass } from './features/barbarian_features';
import { clericClass } from './features/cleric_features';
import { hunterClass } from './features/hunter_features';
import { championClass } from './features/champion_features';
import { wizardClass } from './features/wizard_features';
import { monkClass } from './features/monk_features';
import { rogueClass } from './features/rogue_features';
import { sorcererClass } from './features/sorcerer_features';
import { spellbladeClass } from './features/spellblade_features';
import { warlockClass } from './features/warlock_features';
import { bardClass } from './features/bard_features';
import { druidClass } from './features/druid_features';
import { commanderClass } from './features/commander_features';
import { psionClass } from './features/psion_features';
// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	hunter: hunterClass,
	champion: championClass,
	wizard: wizardClass,
	monk: monkClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	druid: druidClass,
	commander: commanderClass,
	psion: psionClass
};
/**
 * Budgets accumulated from level progression
 */
export interface ProgressionBudgets {
	totalHP: number;
	totalSP: number;
	totalMP: number;
	totalSkillPoints: number;
	totalTradePoints: number;
	totalAttributePoints: number;
	totalManeuversKnown: number;
	totalTechniquesKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	totalTalents: number;
	totalPathPoints: number;
	totalAncestryPoints: number;
}
/**
 * A pending choice from a feature
 */
export interface PendingFeatureChoice {
	featureId: string;
	feature: ClassFeature;
	choiceId: string;
	choice: FeatureChoice;
}
/**
 * Complete resolved progression for a character at a target level
 */
export interface ResolvedProgression {
	level: number;
	classId: string;
	className: string;
	budgets: ProgressionBudgets;
	unlockedFeatures: ClassFeature[];
	pendingFeatureChoices: PendingFeatureChoice[];
	availableSubclassChoice: boolean;
	subclassChoiceLevel?: number;
}
/**
 * Get class feature definition by ID
 */
function getFeatureById(classId: string, featureId: string): ClassFeature | undefined {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures) return undefined;
	// Check core features
	const coreFeature = classFeatures.coreFeatures?.find((f: ClassFeature) => f.id === featureId);
	if (coreFeature) return coreFeature;
	// Check subclass features
	for (const subclass of classFeatures.subclasses || []) {
		const subclassFeature = subclass.features?.find((f: ClassFeature) => f.id === featureId);
		if (subclassFeature) return subclassFeature;
	}
	return undefined;
}
/**
 * Resolve class progression for a character up to target level
 */
export function resolveClassProgression(
	classId: string,
	targetLevel: number
): ResolvedProgression {
	// Get class progression data
	const classProgression = classesData.find((c) => c.id === classId);
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classProgression) {
		throw new Error(`Class progression not found for classId: ${classId}`);
	}
	// Initialize budgets
	const budgets: ProgressionBudgets = {
		totalHP: 0,
		totalSP: 0,
		totalMP: 0,
		totalSkillPoints: 0,
		totalTradePoints: 0,
		totalAttributePoints: 0,
		totalManeuversKnown: 0,
		totalTechniquesKnown: 0,
		totalCantripsKnown: 0,
		totalSpellsKnown: 0,
		totalTalents: 0,
		totalPathPoints: 0,
		totalAncestryPoints: 0
	};
	const unlockedFeatures: ClassFeature[] = [];
	const pendingFeatureChoices: PendingFeatureChoice[] = [];
	let availableSubclassChoice = false;
	let subclassChoiceLevel: number | undefined;
	// Iterate through each level up to target
	for (let level = 1; level <= targetLevel; level++) {
		const levelData = classProgression.levelProgression.find((lp) => lp.level === level);
		if (!levelData) continue;
		// Accumulate numeric budgets
		budgets.totalHP += levelData.healthPoints || 0;
		budgets.totalSP += levelData.staminaPoints || 0;
		budgets.totalMP += levelData.manaPoints || 0;
		budgets.totalSkillPoints += levelData.skillPoints || 0;
		budgets.totalTradePoints += levelData.tradePoints || 0;
		budgets.totalAttributePoints += levelData.attributePoints || 0;
		budgets.totalManeuversKnown += levelData.maneuversKnown || 0;
		budgets.totalTechniquesKnown += levelData.techniquesKnown || 0;
		budgets.totalCantripsKnown += levelData.cantripsKnown || 0;
		budgets.totalSpellsKnown += levelData.spellsKnown || 0;
		// Accumulate structured gains
		if (levelData.gains) {
			budgets.totalTalents += levelData.gains.talents || 0;
			budgets.totalPathPoints += levelData.gains.pathPoints || 0;
			budgets.totalAncestryPoints += levelData.gains.ancestryPoints || 0;
			// Resolve feature objects from IDs
			if (levelData.gains.classFeatures) {
				for (const featureId of levelData.gains.classFeatures) {
					const feature = getFeatureById(classId, featureId);
					if (feature) {
						unlockedFeatures.push(feature);
						// Check for pending choices
						if (feature.choices) {
							for (const choice of feature.choices) {
								pendingFeatureChoices.push({
									featureId: feature.id || featureId,
									feature,
									choiceId: choice.id,
									choice
								});
							}
						}
					}
				}
			}
			// Track subclass choice availability
			if (levelData.gains.subclassFeatureChoice) {
				availableSubclassChoice = true;
				subclassChoiceLevel = level;
			}
		}
	}
	return {
		level: targetLevel,
		classId,
		className: classProgression.name,
		budgets,
		unlockedFeatures,
		pendingFeatureChoices,
		availableSubclassChoice,
		subclassChoiceLevel
	};
}
/**
 * Get available subclasses for a class
 */
export function getAvailableSubclasses(classId: string): Array<{ name: string; description?: string }> {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures?.subclasses) return [];
	return classFeatures.subclasses.map((sub: any) => ({
		name: sub.subclassName,
		description: sub.description
	}));
}
/**
 * Resolve a specific subclass's features up to a level
 */
export function resolveSubclassFeatures(
	classId: string,
	subclassName: string,
	upToLevel: number
): ClassFeature[] {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures?.subclasses) return [];
	const subclass = classFeatures.subclasses.find((s: any) => s.subclassName === subclassName);
	if (!subclass) return [];
	// Return features up to the specified level
	return subclass.features.filter((f: ClassFeature) => f.levelGained <= upToLevel);
}
````

## File: src/lib/rulesdata/classes-data/classUtils.ts
````typescript
/**
 * @file classUtils.ts
 * @description Helper utilities for working with class and subclass data
 */
import type { Subclass, ClassFeature } from '../schemas/character.schema';
import { barbarianClass } from './features/barbarian_features';
import { clericClass } from './features/cleric_features';
import { druidClass } from './features/druid_features';
import { wizardClass } from './features/wizard_features';
import { hunterClass } from './features/hunter_features';
import { championClass } from './features/champion_features';
import { rogueClass } from './features/rogue_features';
import { sorcererClass } from './features/sorcerer_features';
import { spellbladeClass } from './features/spellblade_features';
import { warlockClass } from './features/warlock_features';
import { bardClass } from './features/bard_features';
import { commanderClass } from './features/commander_features';
import { monkClass } from './features/monk_features';
import { psionClass } from './features/psion_features';
// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	druid: druidClass,
	wizard: wizardClass,
	hunter: hunterClass,
	champion: championClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	commander: commanderClass,
	monk: monkClass,
	psion: psionClass
};
/**
 * Get a subclass definition by class ID and subclass name
 */
export function getSubclassByName(classId: string, subclassName: string): Subclass | undefined {
	const classData = CLASS_FEATURES_MAP[classId];
	if (!classData) return undefined;
	return classData.subclasses?.find(
		(s: Subclass) => s.subclassName === subclassName
	);
}
/**
 * Get all features for a subclass up to a given level
 */
export function getSubclassFeaturesByLevel(
	classId: string,
	subclassName: string,
	level: number
): ClassFeature[] {
	const subclass = getSubclassByName(classId, subclassName);
	if (!subclass) return [];
	return subclass.features?.filter((f) => f.levelGained <= level) || [];
}
/**
 * Generate namespaced key for feature choices
 */
export function getFeatureChoiceKey(
	classId: string,
	subclassName: string,
	choiceId: string
): string {
	return `${classId}_${subclassName}_${choiceId}`;
}
/**
 * Validate all subclass feature choices are complete
 */
export function validateSubclassChoicesComplete(
	classId: string,
	subclassName: string,
	level: number,
	selectedChoices: Record<string, string[]>
): { isValid: boolean; incompleteChoices: string[] } {
	const features = getSubclassFeaturesByLevel(classId, subclassName, level);
	const incomplete: string[] = [];
	features.forEach((feature) => {
		feature.choices?.forEach((choice) => {
			const key = getFeatureChoiceKey(classId, subclassName, choice.id);
			const selections = selectedChoices[key] || [];
			if (selections.length < choice.count) {
				incomplete.push(choice.prompt);
			}
		});
	});
	return {
		isValid: incomplete.length === 0,
		incompleteChoices: incomplete
	};
}
````

## File: src/lib/rulesdata/classes-data/SUBCLASS_REFERENCE.md
````markdown
# DC20 Subclass Reference

> **Last Updated:** October 7, 2025  
> **Schema Version:** 2.1.0  
> **Status:** Current implementation state (intentional)

## Overview

This document provides a complete reference for all subclasses available in DC20Clean. Each class gains access to subclass selection at **Level 3**.

## Subclass Availability by Class

### Classes with 2 Subclasses

| Class | Subclass 1 | Subclass 2 |
|-------|-----------|-----------|
| **Barbarian** | Elemental Fury | Spirit Guardian |
| **Bard** | Eloquence | Jester |
| **Cleric** | Inquisitor | Priest |
| **Commander** | Crusader | Warlord |
| **Druid** | Phoenix | Rampant Growth |
| **Monk** | Astral Self | Shifting Tide |
| **Rogue** | Long Death | Swashbuckler |
| **Sorcerer** | Angelic | Draconic |
| **Spellblade** | Paladin | Rune Knight |
| **Warlock** | Eldritch | Fey |

### Classes with 1 Subclass

| Class | Subclass |
|-------|----------|
| **Wizard** | Portal Mage |

### Classes with 0 Subclasses (Pending Implementation)

| Class | Status |
|-------|--------|
| **Champion** | No subclasses defined |
| **Hunter** | No subclasses defined |

---

## Implementation Details

### File Structure

Each class's subclasses are defined in:
```
src/lib/rulesdata/classes-data/features/{class}_features.ts
```

### Subclass Schema

```typescript
interface Subclass {
  subclassName: string;
  description?: string; // Optional - some subclasses may not have descriptions
  features: ClassFeature[];
  levelGained?: number; // Default: undefined (available from start)
}
```

### Level Requirements

- **Level 1-2:** No subclass selection available
- **Level 3+:** Subclass choice becomes available
- All current subclasses have `levelGained: undefined`, meaning they're available as soon as subclass selection opens at level 3

---

## Subclass Details

### Barbarian

#### Elemental Fury
- **File:** `barbarian_features.ts` (line 204)
- **Description:** Harness primal elemental forces
- **Features:** Multiple elemental-themed abilities

#### Spirit Guardian
- **File:** `barbarian_features.ts` (line 347)
- **Description:** Channel ancestral spirits
- **Features:** Spirit-based protective and offensive abilities

### Bard

#### Eloquence
- **File:** `bard_features.ts` (line 192)
- **Description:** Master of persuasion and inspiration
- **Features:** Enhanced charisma-based abilities

#### Jester
- **File:** `bard_features.ts` (line 256)
- **Description:** Trickster and entertainer
- **Features:** Deceptive and unpredictable abilities

### Cleric

#### Inquisitor
- **File:** `cleric_features.ts` (line 221)
- **Description:** Agent of divine justice
- **Features:** Investigation and holy retribution abilities

#### Priest
- **File:** `cleric_features.ts` (line 239)
- **Description:** Traditional healer and spiritual guide
- **Features:** Enhanced healing and support magic

### Commander

#### Crusader
- **File:** `commander_features.ts` (line 189)
- **Description:** Holy warrior leading the faithful
- **Features:** Divine combat leadership abilities

#### Warlord
- **File:** `commander_features.ts` (line 244)
- **Description:** Tactical battlefield commander
- **Features:** Strategic positioning and command abilities

### Druid

#### Phoenix
- **File:** `druid_features.ts` (line 187)
- **Description:** Master of rebirth and fire
- **Features:** Fire-based regeneration abilities

#### Rampant Growth
- **File:** `druid_features.ts` (line 249)
- **Description:** Champion of untamed nature
- **Features:** Plant and growth manipulation

### Monk

#### Astral Self
- **File:** `monk_features.ts` (line 221)
- **Description:** Channel cosmic energy
- **Features:** Astral projection and spiritual combat

#### Shifting Tide
- **File:** `monk_features.ts` (line 270)
- **Description:** Flow like water
- **Features:** Adaptive and fluid combat style

### Rogue

#### Long Death
- **File:** `rogue_features.ts` (line 112)
- **Description:** Master of assassination
- **Features:** Death-dealing precision strikes

#### Swashbuckler
- **File:** `rogue_features.ts` (line 141)
- **Description:** Dashing duelist
- **Features:** Flashy and mobile combat style

### Sorcerer

#### Angelic
- **File:** `sorcerer_features.ts` (line 204)
- **Description:** None (features define the subclass)
- **Features:** Celestial Spark, radiant abilities
- **Note:** No subclass-level description

#### Draconic
- **File:** `sorcerer_features.ts` (line 267)
- **Description:** None (features define the subclass)
- **Features:** Draconic heritage and elemental powers
- **Note:** No subclass-level description

### Spellblade

#### Paladin
- **File:** `spellblade_features.ts` (line 225)
- **Description:** Holy warrior blending magic and martial prowess
- **Features:** Divine smite-style abilities

#### Rune Knight
- **File:** `spellblade_features.ts` (line 283)
- **Description:** Arcane warrior using runic magic
- **Features:** Rune-enhanced combat abilities

### Warlock

#### Eldritch
- **File:** `warlock_features.ts` (line 173)
- **Description:** Pact with alien entities
- **Features:** Eldritch blast enhancements and otherworldly powers

#### Fey
- **File:** `warlock_features.ts` (line 238)
- **Description:** Pact with fey creatures
- **Features:** Charm, illusion, and nature-themed abilities

### Wizard

#### Portal Mage
- **File:** `wizard_features.ts` (line 161)
- **Description:** Master of teleportation and dimensional magic
- **Features:** Portal creation and spatial manipulation

---

## Testing

Comprehensive unit tests verify subclass availability:

**Test File:** `src/lib/rulesdata/classes-data/features/subclasses.test.ts`

**Test Coverage:**
- ✅ 73 tests passing (as of October 7, 2025)
- Verifies subclass array exists for all classes
- Confirms correct subclass counts
- Validates subclass names match definitions
- Checks for unique subclass names
- Ensures all subclasses have at least one feature

**Run Tests:**
```bash
npm run test:unit -- subclasses.test.ts
```

---

## Future Additions

### Champion Subclasses (Planned)
- TBD - awaiting game design specifications

### Hunter Subclasses (Planned)
- TBD - awaiting game design specifications

---

## Notes for Developers

1. **When adding a new subclass:**
   - Add to appropriate `{class}_features.ts` file
   - Update this reference document
   - Update test expectations in `subclasses.test.ts`
   - Ensure `levelGained` is set appropriately (default: undefined for level 3)

2. **Subclass descriptions are optional:**
   - Some subclasses (e.g., Sorcerer) rely on feature names/descriptions instead
   - This is intentional and valid

3. **Level 3 is the standard:**
   - All subclass selections currently happen at level 3
   - This is enforced by the UI (`SubclassSelector.tsx`)

4. **Data-driven UI:**
   - `SubclassSelector` component reads directly from `*_features.ts` files
   - No hardcoding of subclass lists in UI components
   - Dynamic rendering based on `levelGained` and current character level

---

## Related Documentation

- **Class System:** `docs/systems/CLASS_SYSTEM.MD`
- **Leveling Epic:** `docs/plannedSpecs/LEVELING_EPIC.md`
- **Character Schema:** `src/lib/rulesdata/schemas/character.schema.ts`
- **Class Utils:** `src/lib/rulesdata/classes-data/classUtils.ts`
````

## File: src/lib/rulesdata/classes-data/features/champion_features.ts
````typescript
/**
 * Champion Class Definition - New Effect Schema
 * Based on DC20 Champion features
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const championClass: ClassDefinition = {
	className: 'Champion',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armors'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Champion Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Champion Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Champion Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you perform a Maneuver.'
		}
	},
	coreFeatures: [
		{
			id: 'champion_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armors', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{
					type: 'GRANT_ABILITY',
					target: 'learns_all_attack_maneuvers',
					value: 'You learn all Attack Maneuvers.'
				},
				{
					type: 'GRANT_ABILITY',
					target: 'stamina_regen',
					value: 'Once per round, regain up to half maximum SP when you perform a Maneuver.'
				}
			]
		},
		{
			id: 'champion_master_at_arms',
			featureName: 'Master-at-Arms',
			levelGained: 1,
			description: 'Your training in warfare has granted you extensive weapon mastery.',
			benefits: [
				{
					name: 'Weapon Master',
					description:
						'At the start of each of your turns, you can freely swap any Weapon you are currently wielding in each hand for any other Weapon without provoking Opportunity Attacks.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'weapon_master',
							value: 'Free weapon swapping at start of turn without provoking Opportunity Attacks.'
						}
					]
				},
				{
					name: 'Maneuver Master',
					description: 'You learn 2 Maneuvers of your choice.',
					effects: [{ type: 'GRANT_CHOICE', target: 'maneuver', value: 2 }]
				},
				{
					name: 'Technique Master',
					description:
						'You learn 1 Technique of your choice. Once per Combat, when you perform a Technique you can reduce its SP cost by 1.',
					effects: [
						{ type: 'GRANT_CHOICE', target: 'technique', value: 1 },
						{
							type: 'GRANT_ABILITY',
							target: 'technique_master',
							value: "Once per Combat: reduce a Technique's SP cost by 1."
						}
					]
				}
			]
		},
		{
			id: 'champion_fighting_spirit',
			featureName: 'Fighting Spirit',
			levelGained: 1,
			description: 'You stand ready for Combat at any moment.',
			benefits: [
				{
					name: 'Combat Readiness',
					description:
						'At the start of your first turn in Combat, you gain one of the following benefits: Brace (Dodge Action + ADV on next Save) or Advance (Move Action + ADV on next Physical Check).',
					effects: [
						{
							type: 'GRANT_CHOICE',
							target: 'combat_readiness',
							value: 1,
							options: [
								{
									name: 'Brace',
									description:
										'Gain the benefits of the Dodge Action and ADV on the next Save you make until the end of Combat.'
								},
								{
									name: 'Advance',
									description:
										'Gain the benefits of the Move Action and ADV on the next Physical Check you make until the end of Combat.'
								}
							]
						}
					]
				},
				{
					name: 'Second Wind',
					description:
						'Once per Combat when you start your turn Bloodied, you can regain 2 HP and 1 SP.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'second_wind',
							value: 'Once per Combat when Bloodied at turn start: regain 2 HP and 1 SP.'
						}
					]
				}
			]
		},
		{
			id: 'champion_know_your_enemy',
			featureName: 'Know Your Enemy',
			levelGained: 1,
			description:
				'You can spend 1 minute observing or interacting with a creature out of Combat (or spend 1 AP in Combat) to learn information about its physical capabilities compared to your own.',
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'know_your_enemy',
					value:
						"Spend 1 minute (or 1 AP in Combat) to assess creature's Might, Agility, PD, AD, or HP vs. yours (DC 10 Knowledge/Insight)."
				}
			]
		},
		{
			id: 'champion_adaptive_tactics',
			featureName: 'Adaptive Tactics',
			levelGained: 2,
			description:
				"When you roll for Initiative, and at the end of each of your turns, you gain a d8 Tactical Die if you don't already have one. You can spend a Tactical Die to gain one of the following Tactics: Assault or Deflect.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'adaptive_tactics',
					value:
						'Gain d8 Tactical Die at Initiative and end of turns. Spend for: Assault (+die to Attack) or Deflect (-die from Attack against you).'
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Hero',
			description: 'Your warrior spirit refuses to yield in battle.',
			features: [
				{
					id: 'hero_resolve',
					featureName: "Hero's Resolve",
					levelGained: 3,
					description: 'You gain several benefits that enhance your combat prowess.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'adrenaline_boost',
							value:
								'When you use Second Wind, gain a +5 bonus to Attack Checks until the end of your turn.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'cut_through',
							value:
								"Your Martial Attacks that score Heavy Hits ignore the target's Physical damage Resistances."
						},
						{
							type: 'GRANT_ABILITY',
							target: 'unyielding_spirit',
							value: 'While Bloodied, you gain 1 Temp HP at the start of each of your turns.'
						}
					]
				},
				{
					id: 'adventuring_hero',
					featureName: 'Adventuring Hero',
					levelGained: 3,
					description:
						'You ignore the penalties of Forced March and being Encumbered (but not Heavily Encumbered).',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'adventuring_hero',
							value: 'Ignore penalties from Forced March and being Encumbered.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Sentinel',
			description: 'You are a stalwart protector of your allies.',
			features: [
				{
					id: 'stalwart_protector',
					featureName: 'Stalwart Protector',
					levelGained: 3,
					description: 'You gain benefits that allow you to defend your allies more effectively.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'steadfast_defender',
							value:
								'You can use your Deflect Tactic against any Attack that targets a creature within your Melee Range.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'defensive_bash',
							value:
								"When you use a Defensive Maneuver as a Reaction to an Attack from a creature within 1 Space, the attacker must make a Physical Save against your Attack Check. Failure: The target is pushed 1 Space away or Taunted by you (your choice)."
						},
						{
							type: 'GRANT_ABILITY',
							target: 'not_on_my_watch',
							value: 'Creatures Taunted by you deal 1 less damage to targets within 1 Space of you.'
						}
					]
				},
				{
					id: 'vigilant_watcher',
					featureName: 'Vigilant Watcher',
					levelGained: 3,
					description:
						"During a Long Rest, if you spend both 4 hour periods doing Light Activity, you have ADV on the Might Save you make to avoid gaining Exhaustion. Additionally, the Save DC doesn't increase on a Failure.",
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'vigilant_watcher',
							value:
								'During a Long Rest with only Light Activity, gain ADV on the Might Save to avoid Exhaustion.'
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/cleric_features.ts
````typescript
/**
 * Cleric Class Definition
 * Based on the DC20 rulebook provided.
 * 10 SEPT 2025
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const clericClass: ClassDefinition = {
	className: 'Cleric',
	spellcasterPath: {
		spellList: {
			description: 'When you learn a new Spell, you can choose any Spell on the Divine Spell List.',
			type: 'divine'
		},
		cantrips: {
			description: 'The number of Cantrips you know increases as shown in the Cantrips Known column of the Cleric Class Table.'
		},
		spells: {
			description: 'The number of Spells you know increases as shown in the Spells Known column of the Cleric Class Table.'
		},
		manaPoints: {
			maximumIncreasesBy: 'Your maximum number of Mana Points increases as shown in the Mana Points column of the Cleric Class Table.'
		}
	},
	coreFeatures: [
		{
			id: 'cleric_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast spells and use divine magic.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
			id: 'cleric_order',
			featureName: 'Cleric Order',
			levelGained: 1,
			description: 'Your connection to your deity grants you the following benefits: Choose an Elemental or Mystical damage type to become your Divine Damage, and gain the benefits of 2 Divine Domains of your choice.',
			choices: [
				{
					id: 'cleric_divine_damage',
					prompt: 'Choose your Divine Damage type',
					count: 1,
					options: [
						{ name: 'Fire', description: 'Your Divine Damage type is Fire.', effects: [] },
						{ name: 'Cold', description: 'Your Divine Damage type is Cold.', effects: [] },
						{ name: 'Lightning', description: 'Your Divine Damage type is Lightning.', effects: [] },
						{ name: 'Acid', description: 'Your Divine Damage type is Corrosion.', effects: [] },
						{ name: 'Poison', description: 'Your Divine Damage type is Poison.', effects: [] },
						{ name: 'Radiant', description: 'Your Divine Damage type is Radiant.', effects: [] },
						{ name: 'Umbral', description: 'Your Divine Damage type is Umbral.', effects: [] },
						{ name: 'Psychic', description: 'Your Divine Damage type is Psychic.', effects: [] }
					]
				},
				{
					id: 'cleric_divine_domain',
					prompt: 'Choose 2 Divine Domains',
					count: 2,
					options: [
						{
							name: 'Knowledge',
							description: 'Your Mastery Limit increases by 1 for all Knowledge Trades. Additionally, you gain 2 Skill Points.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'knowledgeMasteryLimit', value: 1 },
								{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 }
							]
						},
						{
							name: 'Magic',
							description: 'Your maximum MP increases by 1. Choose a Spell Tag (such as Fire, Holy, or Undeath). You learn 1 Spell with the chosen Spell Tag, and when you learn a new Spell you can choose any Spell that also has the chosen Spell Tag.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
								{ type: 'GRANT_SPELL', target: 'by_tag', value: 1, userChoice: { prompt: 'Choose a Spell Tag', options: ['Fire', 'Holy', 'Undeath'] } }
							]
						},
						{
							name: 'Life',
							description: 'When you produce an MP Effect that restores HP to at least 1 creature, you can restore 1 HP to 1 creature of your choice within 1 Space of you (including yourself).',
							effects: []
						},
						{
							name: 'Death',
							description: "Enemy creatures within 10 Spaces of you take an additional 1 damage from Attacks while they're Well-Bloodied.",
							effects: []
						},
						{
							name: 'Grave',
							description: "Allied creatures within 10 Spaces of you take 1 less damage from Attacks while they're Well-Bloodied.",
							effects: []
						},
						{
							name: 'Light',
							description: 'When you produce an MP Effect that targets at least 1 creature, you can force 1 target to make a Might or Charisma Save. Failure: Until the end of their next turn, they shed a 1 Space Aura of Bright Light and are Hindered on their next Attack.',
							effects: []
						},
						{
							name: 'Dark',
							description: 'You gain 10 Space Darkvision (or increase it by 5). While in Dim Light, you can take the Hide Action to Hide from creatures that can see you. On a Success, you remain Hidden until you move or the area becomes Bright Light.',
							effects: [
								{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 },
								{ type: 'GRANT_ABILITY', target: 'shadow_hide', value: 'Can Hide in Dim Light; remains Hidden until moving or area becomes Bright Light.' }
							]
						},
						{
							name: 'War',
							description: 'You gain Combat Training with Weapons and access to Attack Maneuvers.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
								{ type: 'GRANT_ABILITY', target: 'Attack_Maneuvers', value: 'Gain access to Attack Maneuvers.' }
							]
						},
						{
							name: 'Peace',
							description: 'You gain Combat Training with Heavy Armor and Heavy Shields and learn 1 Defensive Maneuver of your choice.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
								{ type: 'GRANT_CHOICE', target: 'defensive_maneuver', value: 1 }
							]
						},
						{
							name: 'Order',
							description: 'Once per turn, when a creature you can see within 10 Spaces of you makes a Check, you can spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check.',
							effects: []
						},
						{
							name: 'Chaos',
							description: 'When you make a Spell Check you can choose to give yourself ADV on it, but you must also roll on the Wild Magic Table. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
							effects: []
						},
						{
							name: 'Divination',
							description: "You can't be Flanked. When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn.",
							effects: [
								{ type: 'GRANT_ABILITY', target: 'condition_immunity_flanked', value: "You can't be Flanked." },
								{ type: 'GRANT_ABILITY', target: 'see_invisible_on_mp_spend', value: 'When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn.' }
							]
						},
						{
							name: 'Trickery',
							description: 'When you produce an MP Effect that targets at least 1 creature, you can choose 1 of the targets and create an illusory duplicate of it that lasts until the start of your next turn. The next Attack made against the target has DisADV, and causes the illusory duplicate to disappear.',
							effects: []
						},
						{
							name: 'Ancestral',
							description: 'You get 2 Ancestry Points that you can spend on Traits from any Ancestry.',
							effects: [{ type: 'MODIFY_STAT', target: 'ancestryPoints', value: 2 }]
						}
					]
				}
			]
		},
		{
			id: 'cleric_divine_damage_expansion',
			featureName: 'Divine Damage Expansion',
			levelGained: 1,
			description: 'When you deal damage with a Spell you can convert the damage to your Divine Damage type. Additionally, you gain Resistance (1) to your Divine Damage type.',
			effects: []
		},
		{
			id: 'cleric_divine_blessing',
			featureName: 'Divine Blessing',
			levelGained: 1,
			description: "You can spend 1 AP to say a prayer and petition your deity for their divine blessing. Choose 1 of the blessings listed below. Each blessing has a listed MP cost that you must spend to gain the blessing. Once during the next minute, you can apply the blessing to a Spell you cast. If your Spell targets more than 1 creature, the blessing only applies to 1 target of your choice. You can only have 1 blessing at a time. If the blessing ends without granting any benefit, you regain the MP spent.",
			benefits: [
				{
					name: 'Destruction',
					description: "(1 MP) The target takes 3 Divine damage, provided that the result of your Spell Check is equal to or higher than the target's AD. If the Spell doesn't normally require a Spell Check, then you must make one when you apply this blessing.",
					effects: []
				},
				{
					name: 'Guidance',
					description: '(1 MP) The target gains a d8 Help Die that they can add to 1 Check of their choice they make within the next minute.',
					effects: []
				},
				{
					name: 'Restoration',
					description: '(1 MP) The target regains 3 HP.',
					effects: []
				}
			]
		},
		{
			id: 'cleric_divine_omen',
			featureName: 'Divine Omen (Flavor Feature)',
			levelGained: 1,
			description: 'Once per Long Rest, you can spend 10 minutes to commune with your Deity and ask one yes-or-no question.',
			effects: []
		},
		{
			id: 'cleric_channel_divinity',
			featureName: 'Channel Divinity',
			levelGained: 2,
			description: 'You gain the ability to channel the direct power of your deity. When you use this Feature, choose 1 of the options below. You can use this Feature once per Short Rest.',
			benefits: [
				{
					name: 'Divine Rebuke',
					description: "You can spend 2 AP to censure all creatures of your choice who can see or hear you within 5 Spaces. Make a Spell Check against each target's AD, and each target makes a Repeated Mental Save against your Save DC. Attack Hit: The target takes Divine Damage equal to your Prime Modifier. Save Failure: The target becomes Intimidated by you for 1 minute or until it takes damage again.",
					effects: []
				},
				{
					name: 'Lesser Divine Intervention',
					description: "You can spend 2 AP to call on your deity to intervene on your behalf when your need is great to replenish you and your allies. Make a DC 15 Spell Check. Success: You gain a pool of healing equal to your Prime Modifier that you can use to restore HP to any number of creatures within 5 Spaces, distributing the HP among them. Additionally, you regain 1 MP. Success (each 5): Increase the amount healed by an amount equal to your Prime Modifier. Failure: You can only gain a pool of healing equal to your Prime Modifier.",
					effects: []
				}
			]
		},
		{
			id: 'cleric_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Inquisitor',
			description: 'You are an agent of divine justice, rooting out heresy and deception.',
			features: [
				{
					featureName: 'Vanquish Heresy',
					levelGained: 3,
					description: 'You gain Resistance to Charmed, Intimidated, and Taunted. Creatures Intimidated by your Divine Rebuke don\'t stop being Intimidated if they take damage. You also gain the "Chastise" Divine Blessing option.',
					effects: []
				},
				{
					featureName: 'Divine Interrogator (Flavor Feature)',
					levelGained: 3,
					description: "Once per Long Rest, you can interrogate a creature by asking it a Yes or No question. It makes a Charisma Save against your Save DC. Failure: It can't tell a lie to the question that you asked it.",
					effects: []
				}
			]
		},
		{
			subclassName: 'Priest',
			description: 'You are a beacon of faith, healing the wounded and protecting the innocent.',
			features: [
				{
					featureName: 'Sanctification',
					levelGained: 3,
					description: "When you spend MP to heal a creature beyond their HP maximum, they gain an amount of Temp HP equal to the remaining healing. When you spend MP to heal a creature on Death's Door, the HP restored is increased by an amount equal to your Prime Modifier. You also gain the 'Hand of Salvation' Channel Divinity option.",
					effects: []
				},
				{
					featureName: 'All That Ails (Flavor Feature)',
					levelGained: 3,
					description: 'You have ADV on Checks made to identify or determine the effects of a Disease, Poison, or Curse affecting a creature.',
					effects: []
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/hunter_features.ts
````typescript
/**
 * Hunter Class Definition - New Effect Schema
 * Based on the DC20 rule analysis from classAndAncestryAndCalcRefactor.md
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const hunterClass: ClassDefinition = {
	className: 'Hunter',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light_Armor'],
			shields: ['Light_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Hunter Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Hunter Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Hunter Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you Hit your Marked target, it dies, or you succeed on a check to recall info or locate an Unseen creature.'
		}
	},
	coreFeatures: [
		{
			id: 'hunter_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain training in martial combat.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true },
				{
					type: 'GRANT_ABILITY',
					target: 'learns_all_attack_maneuvers',
					value: 'You learn all Attack Maneuvers.'
				}
			]
		},
		{
			id: 'hunter_mark',
			featureName: "Hunter's Mark",
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 SP to focus on and mark a creature you can see within 15 Spaces as your quarry. While marked, you gain ADV on Awareness and Survival Checks to find the target, the first Martial Attack against your target on your turn has ADV and ignores PDR, and Heavy/Critical Hits grant a d8 Help Die to the next Attack against the target. The mark lasts until the target is on a different Plane, you Long Rest, fall Unconscious, or mark another creature.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_mark',
					value:
						'Mark a creature (1 AP + 1 SP): ADV on Awareness/Survival to find, first Martial Attack has ADV and ignores PDR, Heavy/Critical Hits grant d8 Help Die.'
				}
			]
		},
		{
			id: 'hunter_favored_terrain',
			featureName: 'Favored Terrain',
			levelGained: 1,
			description:
				'You are particularly familiar with specific environments. While in your Favored Terrains, you have ADV on Stealth and Survival Checks and cannot be Surprised.',
			choices: [
				{
					id: 'hunter_favored_terrain_0',
					prompt: 'Choose 2 types of Favored Terrain',
					count: 2,
					options: [
						{
							id: 'grassland',
							name: 'Grassland',
							description: 'Your Speed and Jump Distance increases by 1.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 },
								{ type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_grassland',
									value: 'In grassland: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						},
						{
							id: 'forest',
							name: 'Forest',
							description:
								'You gain 2 Skill Points to use on up to 2 of the following Skills: Animal, Awareness, Medicine, Survival, and Stealth',
							effects: [
								{
									type: 'MODIFY_STAT',
									target: 'skillPoints',
									value: 2
								},
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_forest',
									value: 'In forest: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						},
						{
							id: 'desert',
							name: 'Desert',
							description:
								'You gain Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_desert',
									value:
										'In desert: ADV on Stealth and Survival, cannot be Surprised, resistance to hot temperature Exhaustion.'
								}
							]
						},
						{
							id: 'mountain',
							name: 'Mountain',
							description:
								'You gain a Climb Speed equal to your Ground Speed, Resistance to Exhaustion from high altitudes, and Resistance (Half) to damage from Falling',
							effects: [
								{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' },
								{ type: 'GRANT_RESISTANCE', target: 'Falling', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_mountain',
									value:
										'In mountains: ADV on Stealth and Survival, cannot be Surprised, resistance to altitude Exhaustion.'
								}
							]
						},
						{
							id: 'jungle',
							name: 'Jungle',
							description:
								'You ignore Difficult Terrain, gain Poisoned Resistance, and have ADV on Saves against contracting Diseases',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Poisoned', value: true },
								{ type: 'GRANT_ADV_ON_SAVE', target: 'disease', value: true },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_jungle',
									value:
										'In jungle: ADV on Stealth and Survival, cannot be Surprised, ignore Difficult Terrain, Poisoned resistance, ADV vs diseases.'
								}
							]
						},
						{
							id: 'swamp',
							name: 'Swamp',
							description:
								'You gain Poison Resistance (Half) and Poisoned Resistance, and have ADV on Saves against contracting Diseases',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
								{ type: 'GRANT_RESISTANCE', target: 'Poisoned', value: true },
								{ type: 'GRANT_ADV_ON_SAVE', target: 'disease', value: true },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_swamp',
									value:
										'In swamp: ADV on Stealth and Survival, cannot be Surprised, Poison resistance, Poisoned resistance, ADV vs diseases.'
								}
							]
						},
						{
							id: 'coast',
							name: 'Coast',
							description:
								'You gain a Swim Speed equal to your Ground Speed (your Weapon Attacks no longer have DisADV as a result of being underwater), you can hold your breath twice as long as normal, and you have ADV on Awareness Checks while underwater.',
							effects: [
								{ type: 'GRANT_MOVEMENT', target: 'swim', value: 'equal_to_speed' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_coast',
									value:
										'In coastal areas: ADV on Stealth and Survival, cannot be Surprised, no underwater weapon penalties, double breath holding, ADV on Awareness underwater.'
								}
							]
						},
						{
							id: 'tundra',
							name: 'Tundra',
							description:
								'You gain Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures',
							effects: [
								{ type: 'GRANT_RESISTANCE', target: 'Cold', value: 'half' },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_tundra',
									value:
										'In tundra: ADV on Stealth and Survival, cannot be Surprised, resistance to cold temperature Exhaustion.'
								}
							]
						},
						{
							id: 'subterranean',
							name: 'Subterranean',
							description:
								'You gain Darkvision 10 Spaces. If you already have Darkvision, its range is increased by 5 Spaces. Additionally, you also gain a Tremorsense of 3 Spaces. If you already have a Tremorsense, it increases by 2 Spaces.',
							effects: [
								{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 },
								{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 },
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_subterranean',
									value:
										'Underground: ADV on Stealth and Survival, cannot be Surprised. Conditional bonuses for existing senses handled separately.'
								}
							]
						},
						{
							id: 'urban',
							name: 'Urban',
							description:
								'You gain 2 Skill Points to use on up to 2 of the following Skills: Influence, Insight, Investigation, Intimidation, and Trickery.',
							effects: [
								{
									type: 'MODIFY_STAT',
									target: 'skillPoints',
									value: 2
								},
								{
									type: 'GRANT_ABILITY',
									target: 'favored_terrain_urban',
									value: 'In urban areas: ADV on Stealth and Survival, cannot be Surprised.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'hunter_bestiary',
			featureName: 'Bestiary',
			levelGained: 1,
			description:
				"You have developed a trove of knowledge hunting creatures which you've recorded in your Bestiary. You have ADV on Checks made to learn or recall information about any creature recorded in your Bestiary.",
			isFlavor: true,
			choices: [
				{
					id: 'hunter_bestiary_0',
					prompt: 'Choose a Creature Type for your starting entries',
					count: 1,
					options: [
						{ id: 'aberration', name: 'Aberration' },
						{ id: 'beast', name: 'Beast' },
						{ id: 'celestial', name: 'Celestial' },
						{ id: 'construct', name: 'Construct' },
						{ id: 'dragon', name: 'Dragon' },
						{ id: 'elemental', name: 'Elemental' },
						{ id: 'fey', name: 'Fey' },
						{ id: 'fiend', name: 'Fiend' },
						{ id: 'giant', name: 'Giant' },
						{ id: 'humanoid', name: 'Humanoid' },
						{ id: 'monstrosity', name: 'Monstrosity' },
						{ id: 'ooze', name: 'Ooze' },
						{ id: 'plant', name: 'Plant' },
						{ id: 'undead', name: 'Undead' }
					]
				}
			]
		},
		{
			id: 'hunter_strike',
			featureName: "Hunter's Strike",
			levelGained: 2,
			description:
				'You can spend 1 SP as part of a Weapon Attack to add one of the following effects: Piercing, Snare, Acid, Toxin, Flash Bang, or Fire Oil.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_strike',
					value:
						"Spend 1 SP on a Weapon Attack to add one of several effects (e.g., Piercing for Bleeding, Snare for Immobilized, etc.)."
				}
			]
		}
		// Note: Level 2 Talent is granted via progression table, not hardcoded here
	],
	subclasses: [
		{
			subclassName: 'Monster Slayer',
			description:
				'You hunt down your targets with the aid of Concoctions you have learned to create by hunting monsters.',
			features: [
				{
					id: 'monster_slayer_concoctions',
					featureName: 'Monstrous Concoctions',
					levelGained: 3,
					description: 'You learn to create potent concoctions from monster parts.',
					choices: [
						{
							id: 'monster_slayer_concoctions_0',
							prompt: 'Choose 3 Concoction Recipes',
							count: 3,
							options: [
								{
									id: 'elemental_infusion',
									name: 'Elemental Infusion',
									description:
										'Choose an Elemental damage type. Attacks against your Marked target deal +1 damage of that type. You gain Resistance (1) to that type.',
									effects: [
										{
											type: 'GRANT_CHOICE',
											target: 'elemental_infusion_type',
											value: 1,
											options: [
												{ name: 'Fire' },
												{ name: 'Cold' },
												{ name: 'Lightning' },
												{ name: 'Poison' },
												{ name: 'Corrosion' }
											]
										}
									]
								},
								{
									id: 'hydras_blood',
									name: "Hydra's Blood",
									description:
										'When you Heavy Hit your Marked target, you regain 1 HP. You have Poisoned Resistance and attackers take 1 Poison damage.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hydras_blood',
											value:
												'Regain 1 HP on Heavy Hits vs Marked target. Gain Poisoned Resistance. Melee attackers take 1 Poison damage.'
										}
									]
								},
								{
									id: 'basilisk_eye',
									name: 'Basilisk Eye',
									description:
										'You gain Tremorsense 20 Spaces for your Marked target. You gain Physical Resistance (1).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'basilisk_eye',
											value: 'Gain Tremorsense 20 for Marked target. Gain Physical Resistance (1).'
										}
									]
								},
								{
									id: 'ooze_gel',
									name: 'Ooze Gel',
									description:
										"When you Heavy Hit your Marked Target, it's Hindered. You can climb difficult surfaces and squeeze through small gaps.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'ooze_gel',
											value:
												'Heavy Hits vs Marked target cause Hindered. Gain amorphous body properties.'
										}
									]
								},
								{
									id: 'aberrant_tumor',
									name: 'Aberrant Tumor',
									description:
										'While within 20 Spaces of your Marked target, you have ADV on Analyze Creature checks and Mental Saves. You gain Psychic Resistance (1).',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'aberrant_tumor',
											value:
												'ADV on Analyze Creature and Mental Saves vs Marked target. Gain Psychic Resistance (1).'
										}
									]
								},
								{
									id: 'deathweed',
									name: 'Deathweed',
									description:
										'Heavy Hits against a Marked target bypass Physical Resistances and prevent HP regain. You gain Umbral Resistance (Half), immunity to Doomed, and ADV on Death Saves.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'deathweed',
											value:
												'Heavy Hits vs Marked target bypass Physical Resistances and stop healing. Gain death-related resistances.'
										}
									]
								},
								{
									id: 'plant_fibers',
									name: 'Plant Fibers',
									description:
										"If your Marked Target fails a Save you force, they can't move. You become Immune to Bleeding and gain 1 Temp HP at the end of each turn.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'plant_fibers',
											value:
												"Failed saves vs you stop Marked target's movement. Gain Bleeding immunity and 1 Temp HP per turn."
										}
									]
								},
								{
									id: 'divine_water',
									name: 'Divine Water',
									description:
										'Heavy Hits against your Marked target also make it Exposed. You gain Radiant Resistance (Half) and radiate Bright Light in a 5 Space Radius.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'divine_water',
											value:
												'Heavy Hits vs Marked target cause Exposed. Gain Radiant Resistance (Half) and emit light.'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'monster_hunter',
					featureName: 'Monster Hunter',
					levelGained: 3,
					description:
						'If you have 3 entries of creatures with the same Creature Type in your Bestiary, you can add the entire Creature Type as an entry.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monster_hunter',
							value:
								'After recording 3 creatures of the same type, gain a Bestiary entry for the entire type.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Trapper',
			description: 'You are able to use a variety of supplies to craft traps.',
			features: [
				{
					id: 'dynamic_traps',
					featureName: 'Dynamic Traps',
					levelGained: 3,
					description:
						"You can create, set, and trigger a number of traps equal to your Prime Modifier. Setting a trap allows you to add the damage and effect of one of your Hunter's Strike options to it.",
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'dynamic_traps',
							value:
								"Create and Set traps (max = Prime Modifier). Can spend 1 SP to add a Hunter's Strike effect to a trap upon setting it."
						}
					]
				},
				{
					id: 'discerning_eye',
					featureName: 'Discerning Eye',
					levelGained: 3,
					description:
						'You have ADV on Awareness Checks to discover Hidden Traps and on Investigation Checks to discern how to disarm them.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'discerning_eye',
							value: 'Gain ADV on checks to find and disarm traps.'
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/monk_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const monkClass: ClassDefinition = {
	className: 'Monk',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons', '3 Weapons with the Toss or Thrown Property'],
		armor: ['1 set of Light Armor'],
		packs: ['X or Y Packs (Adventuring Packs Coming Soon)']
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Monk Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Monk Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Monk Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, you can regain up to half your maximum SP when you succeed on an Attack Check, Athletics Check, or Acrobatics Check.'
		}
	},
	coreFeatures: [
		{
			id: 'monk_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Monks harness their inner Ki through training, mentorship, or deep meditation, perfecting both mind and body.'
		},
		{
			id: 'monk_training',
			featureName: 'Monk Training',
			levelGained: 1,
			description: 'Your martial arts training grants you greater offense, defense, and movement.',
			benefits: [
				{
					name: 'Iron Palm',
					description: 'Your limbs are Natural Weapons with the Impact Property that deal 1 Bludgeoning damage.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_iron_palm',
							value: 'Limbs are Natural Weapons (Impact, 1 Bludgeoning damage).'
						}
					]
				},
				{
					name: 'Patient Defense',
					description: 'While not wearing Armor, you gain +2 PD.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'pd',
							value: 2,
							condition: 'not_wearing_armor'
						}
					]
				},
				{
					name: 'Step of the Wind',
					description: 'Harness your Ki to enhance speed, mobility, and resilience while unarmored.',
					effects: [
						{
							type: 'MODIFY_STAT',
							target: 'moveSpeed',
							value: 1,
							condition: 'not_wearing_armor'
						},
						{
							type: 'MODIFY_STAT',
							target: 'jumpDistance',
							value: 1,
							condition: 'not_wearing_armor'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_step_of_the_wind_mobility',
							value:
								'Move along vertical surfaces or across liquids up to your Speed without falling during the movement.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_step_of_the_wind_prime_modifier',
							value: 'Use your Prime Modifier instead of Agility for jump distance and falling damage calculations.'
						}
					]
				}
			]
		},
		{
			id: 'monk_stance',
			featureName: 'Monk Stance',
			levelGained: 1,
			description:
				'You learn 2 Monk Stances. Start of turn: freely enter or swap stances. Spend 1 SP on your turn to change stance; only one stance active at a time.',
			benefits: ['Learn 2 Monk Stances'],
			choices: [
				{
					id: 'initial_stances',
					prompt: 'Choose 2 Monk Stances',
					count: 2,
					options: [
						{
							id: 'bear_stance',
							name: 'Bear Stance',
							description: 'Big Hits - Your attacks deal massive damage with overwhelming force.'
						},
						{
							id: 'bull_stance',
							name: 'Bull Stance',
							description: 'Knockback - Drive enemies backward with powerful strikes.'
						},
						{
							id: 'cobra_stance',
							name: 'Cobra Stance',
							description: 'Counter - Strike back at opponents who dare attack you.'
						},
						{
							id: 'gazelle_stance',
							name: 'Gazelle Stance',
							description: 'Nimble - Move with exceptional grace and speed.'
						},
						{
							id: 'mantis_stance',
							name: 'Mantis Stance',
							description: 'Grapple - Seize and control your opponents with superior technique.'
						},
						{
							id: 'mongoose_stance',
							name: 'Mongoose Stance',
							description: 'Multi - Execute rapid combinations of attacks.'
						},
						{
							id: 'scorpion_stance',
							name: 'Scorpion Stance',
							description: 'Quick Strike - Attack with blinding speed before opponents can react.'
						},
						{
							id: 'turtle_stance',
							name: 'Turtle Stance',
							description: 'Sturdy - Become an immovable fortress of defense.'
						},
						{
							id: 'wolf_stance',
							name: 'Wolf Stance',
							description: 'Hit & Run - Strike swiftly and escape before retaliation.'
						}
					]
				}
			]
		},
		{
			id: 'monk_meditation',
			featureName: 'Meditation',
			levelGained: 1,
			isFlavor: true,
			description:
				'During a Short Rest or longer, meditate to temporarily increase the Mastery level of a chosen Charisma or Intelligence skill by 1 (up to its cap). You stay alert while meditating.'
		},
		{
			id: 'monk_spiritual_balance',
			featureName: 'Spiritual Balance',
			levelGained: 2,
			description: 'Harness your inner spirit to balance your physical energy, unlocking Ki Points and Ki Actions.',
			benefits: [
				{
					name: 'Ki Points',
					description: 'You have Ki Points equal to your Stamina Points; spent Ki replenishes when combat ends or instantly outside combat.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_ki_points',
							value:
								'Whenever you spend a Stamina Point on your turn, regain a Ki Point. All Ki Points return when combat ends; outside of combat, Ki spent replenishes immediately.'
						}
					]
				},
				{
					name: 'Ki Actions',
					description: 'Spend 1 Ki to perform Deflect Attack, Slow Fall, or Uncanny Dodge.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'monk_deflect_attack',
							value:
								"When a creature misses you with a Ranged PD attack using a physical projectile, catch it if you have a free hand and redirect it at a creature within 5 spaces (Attack Check vs PD; Hit: deal the projectile's damage)."
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_slow_fall',
							value: 'Reduce fall damage you take by an amount equal to your level.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'monk_uncanny_dodge',
							value: 'When a creature attacks you, spend 1 Ki to impose DisADV on the attack.'
						}
					]
				}
			]
		},
		{
			id: 'monk_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Astral Self',
			description:
				'Manifest astral limbs and awareness, channeling mystical power through your spirit.',
			features: [
				{
					id: 'monk_astral_awakening',
					featureName: 'Astral Awakening',
					levelGained: 3,
					description:
						'Spend 1 AP and 1 SP to manifest a portion of your astral self for 1 minute, gaining astral arms and enhanced deflection.',
					benefits: [
						{
							name: 'Astral Arms',
							description:
								'Your astral arms make Unarmed Strikes with Reach, deal Astral Damage, and may target PD or AD (choose each attack).',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_astral_arms',
									value:
										'Astral arms usable only for Unarmed Strikes with Reach; deal Astral damage and can target PD or AD (choose per attack).'
								}
							]
						},
						{
							name: 'Astral Deflection',
							description: 'Deflect Attack now applies to Ranged Attacks that miss any target within 2 spaces of you.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_astral_deflection',
									value:
										'When Deflecting, you can redirect projectiles that missed any target within 2 spaces of you.'
								}
							]
						}
					]
				},
				{
					id: 'monk_astral_watch',
					featureName: 'Astral Watch',
					levelGained: 3,
					isFlavor: true,
					description:
						'While Unconscious, your astral self remains aware and can converse. During sleep, you may awaken instantly.'
				}
			]
		},
		{
			subclassName: 'Shifting Tide',
			description: 'Flow through combat with fluid stances and counterattacks inspired by water.',
			features: [
				{
					id: 'monk_ebb_and_flow',
					featureName: 'Ebb and Flow',
					levelGained: 3,
					description: 'Gain movement, counterattack opportunities, and enhanced deflection based on your Ki reactions.',
					benefits: [
						{
							name: 'Ebb',
							description: 'When you enter a new Monk Stance, gain 2 spaces of movement.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_ebb_movement',
									value: 'Gain 2 spaces of movement when you enter a new Monk Stance.'
								}
							]
						},
						{
							name: 'Flow',
							description: 'When you use Uncanny Dodge against a Melee Attack, spend 1 AP to make an Opportunity Attack against the attacker.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_flow_counter',
									value:
										'If Uncanny Dodge is used against a melee attack, spend 1 AP to make an Opportunity Attack against the attacker.'
								}
							]
						},
						{
							name: 'Changing Tides',
							description:
								'Use Deflect Attack on Melee Martial Attacks from Large or smaller creatures; redirected attack can target a different creature within 1 space of you.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'monk_changing_tides',
									value:
										'Deflect Attack works on Melee Martial Attacks from Large or smaller creatures; redirect to a different target within 1 space.'
								}
							]
						}
					]
				},
				{
					id: 'monk_fluid_movement',
					featureName: 'Fluid Movement',
					levelGained: 3,
					isFlavor: true,
					description: 'You move through spaces as though you were one size smaller.'
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/spellblade_features.ts
````typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const spellbladeClass: ClassDefinition = {
	className: 'Spellblade',
	startingEquipment: {
		weaponsOrShields: [
			'2 Weapons or Light Shields',
			'Heavy Shields (if you learn the Warrior Discipline)'
		],
		rangedWeapons: [
			'Ranged Weapon with 20 Ammo',
			'3 Weapons with the Toss or Thrown Property'
		],
		armor: ['Light Armor', 'Heavy Armor (if you learn the Warrior Discipline)'],
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor'],
			shields: ['Light Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Spellblade Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Spellblade Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Spellblade Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half maximum SP when you hit with a Spell Attack or succeed on a Spell Check.'
		}
	},
	spellcasterPath: {
		spellList: {
			description:
				'Choose spells from Destruction, Protection, and one additional School of your choice when you learn new spells.'
		},
		cantrips: {
			description: 'Cantrips Known column of the Spellblade Class Table'
		},
		spells: {
			description: 'Spells Known column of the Spellblade Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Spellblade Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'spellblade_source_of_power',
			featureName: 'Source of Power',
			levelGained: 1,
			isFlavor: true,
			description:
				'Spellblades wield magic drawn from patrons, oaths, bloodlines, personal study, artistic expression, or mysterious relics.'
		},
		{
			id: 'spellblade_bound_weapon',
			featureName: 'Bound Weapon',
			levelGained: 1,
			description:
				'Magically bond with a weapon during a Quick Rest, imbuing it with elemental or mystical power until you end the bond.',
			benefits: [
				{
					name: 'Smite',
					description:
						'Spend 1 or more SP to deal +2 Bound Damage per SP and gain the benefits of one Attack Maneuver of your choice for free.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_smite',
							value:
								'Spend 1+ SP while making a martial attack with the bonded weapon to deal +2 Bound Damage per SP and gain the benefits of one Attack Maneuver for free.'
						}
					]
				},
				{
					name: 'Illuminate',
					description: 'Emit or adjust bright/dim light in a 5-space radius from the bonded weapon at will.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_illuminate',
							value: 'Produce, extinguish, or adjust bright/dim light in a 5-space radius from the bonded weapon for free.'
						}
					]
				},
				{
					name: 'Recall',
					description: 'Summon the bonded weapon from up to 20 spaces away if it is unattended.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'spellblade_bound_weapon_recall',
							value:
								'When the bonded weapon is within 20 spaces and unsecured, call it to your hand for free; if you lack a free hand, it lands at your feet.'
						}
					]
				}
			]
		},
		{
			id: 'spellblade_disciplines',
			featureName: 'Spellblade Disciplines',
			levelGained: 1,
			description: 'Learn two Spellblade disciplines to tailor your blend of martial and arcane prowess.',
			choices: [
				{
					id: 'spellblade_disciplines_choice',
					prompt: 'Choose 2 Spellblade Disciplines',
					count: 2,
					options: [
						{
							name: 'Magus',
							description: 'Your magic deepens through increased MP and an additional spell.',
							effects: [
								{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 },
								{ type: 'GRANT_SPELL', target: 'spellblade_magus_spell', value: 1 }
							]
						},
						{
							name: 'Warrior',
							description: 'Gain heavy armor and shield training and additional maneuvers.',
							effects: [
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
								{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Shields', value: true },
								{ type: 'GRANT_MANEUVERS', target: 'spellblade_warrior_maneuvers', value: 2 }
							]
						},
						{
							name: 'Acolyte',
							description: 'Channel restorative magic for healing and curing ailments.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_acolyte',
									value:
										'Spend 1 AP and 1 MP to heal or cure: Heal – DC 10 Spell Check restores up to 3 HP (2 HP on failure, +1 HP per 5 over). Cure – Spell Check vs disease/poison DC to end it on a creature within 1 space.'
								}
							]
						},
						{
							name: 'Hex Warrior',
							description: 'Afflict foes with debilitating curses.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_hex_warrior',
									value:
										'Spend 1 AP and 1 MP to curse a creature within 10 spaces for 1 minute; Spell Check vs Repeated Physical Save. Failure: target is Dazed or Impaired (your choice), takes 1 Umbral damage each turn, and cannot regain HP.'
								}
							]
						},
						{
							name: 'Spell Breaker',
							description: 'Duel spell attacks with martial skill.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_spell_breaker',
									value:
										'Spend 2 AP to initiate a Spell Duel using your weapon against a spell attack within range. Make an Attack Check, adding SP and MP spent (up to your mana spend limit) as a bonus; gain ADV if within 1 space of the spell’s initiator.'
								}
							]
						},
						{
							name: 'Spell Warder',
							description: 'Temporarily ward yourself against the damage you unleash.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_spell_warder',
									value:
										'When you deal Elemental or Mystical damage with an attack, gain Resistance (1) to that damage type until the start of your next turn; replace or maintain the resistance on subsequent triggers.'
								}
							]
						},
						{
							name: 'Blink Blade',
							description: 'Teleport a short distance as part of your attacks.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_blink_blade',
									value:
										'Once per turn, immediately before or after making an attack, teleport to a space you can see within 1 space of your original position.'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'spellblade_sense_magic',
			featureName: 'Sense Magic',
			levelGained: 1,
			isFlavor: true,
			description:
				'Focus for 1 minute to detect certain creature types within 20 spaces; Spell Checks reveal their nature and location until the end of your next turn.'
		},
		{
			id: 'spellblade_spellstrike',
			featureName: 'Spellstrike',
			levelGained: 2,
			description:
				'Once per turn, combine a Martial Attack with a spell, reducing the spell’s AP cost and resolving them as one harmonic strike.'
		},
		{
			id: 'spellblade_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. You must meet any prerequisites to select it.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Paladin',
			description:
				'Spellblades who channel radiant conviction, defending allies while smiting foes in sacred light.',
			features: [
				{
					id: 'spellblade_paladin_holy_warrior',
					featureName: 'Holy Warrior',
					levelGained: 3,
					description: 'Sacred gifts empower your aura, divine strikes, and restorative prowess.',
					benefits: [
						{
							name: 'Aura of Protection',
							description: 'Allies of your choice within 2 spaces gain ADV on Mental Saves.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_aura_of_protection',
									value: 'Allies you choose within 2 spaces gain ADV on Mental Saves.'
								}
							]
						},
						{
							name: 'Divine Strike',
							description: 'Channel Radiant or Umbral power when you deal damage with Spellstrike.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_divine_strike',
									value: 'When you deal damage with Spellstrike, you may convert the spell’s damage to Radiant or Umbral (chosen when you gain this feature).'
								}
							]
						},
						{
							name: 'Lay on Hands',
							description:
								'You gain the Acolyte Spellblade Discipline (or another discipline if already known). Once per Long Rest, use it without MP and gain +5 to the Spell Check.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'spellblade_paladin_lay_on_hands',
									value:
										'Add the Acolyte Spellblade Discipline to your known disciplines (or another if already known). Once per Long Rest, use the Acolyte Discipline without MP and gain +5 to the Spell Check.'
								}
							]
						}
					]
				},
				{
					id: 'spellblade_paladin_oathsworn',
					featureName: 'Oathsworn',
					levelGained: 3,
					isFlavor: true,
					description:
						'You swear tenets such as Heart of Bravery, Light in the Darkness, Instill Pain, Peacekeeper, Protect the Weak, Unrelenting Effort, or Vengeance. While upholding your oath, you have ADV on Checks to rally non-hostile allies to your cause.'
				}
			]
		},
		{
			subclassName: 'Rune Knight',
			description:
				'Spellblades who carve runic power into their bound weapons, channeling elemental or mystical energy through martial skill.',
			features: [
				{
					id: 'spellblade_rune_weapon',
					featureName: 'Rune Weapon',
					levelGained: 3,
					description:
						'Inscribe a rune onto your Bound Weapon. It can hold one rune at a time, which you may swap during a Quick Rest. Learn two runes from the list.',
					choices: [
						{
							id: 'spellblade_rune_choice',
							prompt: 'Choose 2 Runes to learn',
							count: 2,
							options: [
								{
									name: 'Earth Rune',
									description: 'Shake the battlefield and resist forced movement.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_earthquake',
											value:
												'When you Smite with the rune-inscribed weapon, create Difficult Terrain in a 1-space radius sphere centered on the target.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_unmovable',
											value:
												'Gain ADV on checks and saves against being knocked prone or moved against your will.'
										}
									]
								},
								{
									name: 'Flame Rune',
									description: 'Ignite foes and kindle restorative warmth.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_scorching',
											value:
												'When you Smite a creature, it must make a Physical Save or begin Burning.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_hearth',
											value:
												'If you fought since inscribing this rune, regain 2 Rest Points when you finish a Short Rest.'
										}
									]
								},
								{
									name: 'Frost Rune',
									description: 'Freeze your foes and shield yourself in ice-born resilience.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_frostbite',
											value:
												'When you Smite a creature, it must make a Physical Save or be Grappled by ice until the end of your next turn; it may spend 1 AP to attempt an Athletics Check against your Save DC to break free.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_glacier',
											value: 'When you roll Initiative, gain 2 Temp HP.'
										}
									]
								},
								{
									name: 'Lightning Rune',
									description: 'Stun enemies with crackling power and move with electric swiftness.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_charged',
											value:
												'When you Smite a creature, it must make a Physical Save or become Stunned 1 until the end of your next turn.'
										},
										{
											type: 'MODIFY_STAT',
											target: 'moveSpeed',
											value: 1
										}
									]
								},
								{
									name: 'Water Rune',
									description: 'Crash like a wave and mend with restorative tides.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_wave',
											value:
												'When you Smite a creature, you may spend 1 AP to force a Physical Save; on failure, the target is knocked Prone.'
										},
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_healing_waters',
											value: 'When an MP effect restores your HP, regain 1 additional HP.'
										}
									]
								},
								{
									name: 'Wind Rune',
									description: 'Channel gales to push foes and leap impossible distances.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'spellblade_rune_weapon_hurricane',
											value: 'When you Smite a creature, it must make a Physical Save or be pushed 1 space in a direction you choose.'
										},
										{
											type: 'MODIFY_STAT',
											target: 'jumpDistance',
											value: 3
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'spellblade_rune_expert',
					featureName: 'Rune Expert',
					levelGained: 3,
					isFlavor: true,
					description: 'You have ADV on checks to interpret or understand magical runes you can see.'
				},
				{
					id: 'spellblade_rune_names',
					featureName: 'Rune Names',
					levelGained: 3,
					isFlavor: true,
					description:
						"Common rune names include: Earth (Uruz/Terra), Flame (Ild/Ignis), Frost (Isaz/Frigus), Lightning (Thurisaz/Fulmen), Water (Laquz/Aqua), Wind (Ansuz/Ventus)."
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/features/wizard_features.ts
````typescript
/**
 * Wizard Class Definition - New Effect Schema
 * Based on DC20 Wizard features with spell school specialization
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const wizardClass: ClassDefinition = {
	className: 'Wizard',
	spellcasterPath: {
		spellList: {
			description: 'Arcane spells from multiple schools of magic',
			type: 'arcane'
		},
		cantrips: {
			description: 'Cantrips Known column of the Wizard Class Table'
		},
		spells: {
			description: 'Spells Known column of the Wizard Class Table'
		},
		manaPoints: {
			maximumIncreasesBy: 'Mana Points column of the Wizard Class Table'
		}
	},
	coreFeatures: [
		{
			id: 'wizard_spellcasting_path',
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast arcane spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
			id: 'wizard_spell_school_initiate',
			featureName: 'Spell School Initiate',
			levelGained: 1,
			description: 'You have completed training in a specialized School of Magic.',
			choices: [
				{
					id: 'wizard_spell_school_initiate_0',
					prompt: 'Choose your specialized Spell School',
					count: 1,
					options: [
						{
							id: 'fire_flames',
							name: 'Fire & Flames',
							description: 'Specialize in fire magic and flame manipulation.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'fire_flames_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'fire_flames_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_fire',
									value:
										'Reduce MP cost by 1 for Fire & Flames spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							id: 'ice_illusions',
							name: 'Ice & Illusions',
							description: 'Specialize in ice magic and illusion spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'ice_illusions_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'ice_illusions_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_ice',
									value:
										'Reduce MP cost by 1 for Ice & Illusions spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							id: 'lightning_teleportation',
							name: 'Lightning & Teleportation',
							description: 'Specialize in lightning magic and teleportation spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'lightning_teleportation_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'lightning_teleportation_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_lightning',
									value:
										'Reduce MP cost by 1 for Lightning & Teleportation spells (once per Long Rest, regain on Initiative).'
								}
							]
						},
						{
							id: 'psychic_enchantment',
							name: 'Psychic & Enchantment',
							description: 'Specialize in psychic magic and enchantment spells.',
							effects: [
								{ type: 'GRANT_CANTRIP', target: 'psychic_enchantment_school', value: 1 },
								{ type: 'GRANT_SPELL', target: 'psychic_enchantment_school', value: 1 },
								{
									type: 'GRANT_ABILITY',
									target: 'signature_school_psychic',
									value:
										'Reduce MP cost by 1 for Psychic & Enchantment spells (once per Long Rest, regain on Initiative).'
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'wizard_arcane_sigil',
			featureName: 'Arcane Sigil',
			levelGained: 1,
			description:
				'You can spend 1 AP and 1 MP to create a 1 Space diameter Arcane Sigil on the ground beneath you that lasts for 1 minute.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'arcane_sigil',
					value:
						'Create Arcane Sigil (1 AP + 1 MP): 1 Space area, choose School/Tag, creatures within have ADV on Spell Checks for that type. Can teleport sigil 1 AP within 10 spaces.'
				}
			]
		},
		{
			id: 'wizard_ritual_caster',
			featureName: 'Ritual Caster',
			levelGained: 1,
			description:
				'You learn Arcane Spells with the Ritual Spell Tag and can cast them as rituals.',
			isFlavor: true,
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'ritual_caster',
					value:
						'Learn 1 Ritual Spell per Wizard level. Can study and learn Ritual Spells from external sources (hours = MP cost).'
				}
			]
		},
		{
			id: 'wizard_prepared_spell',
			featureName: 'Prepared Spell',
			levelGained: 2,
			description:
				'When you complete a Long Rest, choose 1 Spell you know to become your Prepared Spell.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'prepared_spell',
					value:
						'Choose 1 Prepared Spell per Long Rest: Mana Limit Break (+1 to Spend Limit once per Long Rest, regain on Initiative) and Rehearsed Casting (opponents have DisADV in Spell Duels).'
				}
			]
		}
	],
	subclasses: [
		{
			subclassName: 'Portal Mage',
			description: 'Masters of dimensional magic and teleportation.',
			features: [
				{
					id: 'portal_magic',
					featureName: 'Portal Magic',
					levelGained: 3,
					description:
						'When you use your Arcane Sigil, you can spend 1 additional MP to create a linked Arcane Portal within 10 Spaces. Creatures can spend 1 Space of Movement to teleport between the Sigil and Portal. You can cast spells or make attacks from either location.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_magic',
							value: 'Enhances Arcane Sigil to create a linked teleportation portal.'
						},
						{
							type: 'GRANT_ABILITY',
							target: 'teleportation_expert',
							value:
								'When you learn a new Spell, you can choose any Spell with the Teleportation Spell Tag.'
						}
					]
				},
				{
					id: 'portal_sage',
					featureName: 'Portal Sage',
					levelGained: 3,
					description:
						'You have ADV on Checks to learn about the Astromancy Spell School. You can spend 1 minute observing a portal to make a DC 10 Spell Check to understand its destination and duration.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_sage',
							value: 'ADV on checks related to Astromancy. Can analyze portals.'
						}
					]
				}
			]
		},
		{
			subclassName: 'Witch',
			description: 'You specialize in curses and debilitating hexes.',
			features: [
				{
					id: 'covens_gift',
					featureName: "Coven's Gift",
					levelGained: 3,
					description:
						'You learn a Spell with the Curse Spell Tag. When you learn a new Spell, you can choose any Spell with the Curse Spell Tag. Spells with this tag count as being part of your chosen Spell School.',
					effects: [
						{
							type: 'GRANT_SPELL',
							target: 'curse_tag',
							value: 1
						},
						{
							type: 'GRANT_ABILITY',
							target: 'curse_school_specialization',
							value: 'Curse spells count as part of your chosen Spell School.'
						}
					]
				},
				{
					id: 'hex_enhancements',
					featureName: 'Hex Enhancements',
					levelGained: 3,
					description:
						'You can add a Hex Enhancement to any Spell you cast, forcing a target to make a Repeated Charisma Save or suffer an effect for 1 minute.',
					choices: [
						{
							id: 'witch_hex_enhancements_0',
							prompt: 'When casting a spell, you may add one of the following Hexes',
							count: 1,
							options: [
								{
									id: 'bewitching_hex',
									name: 'Bewitching Hex',
									description: '(1 MP) The target becomes Charmed by you for the duration.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_bewitching',
											value: '1 MP: Target becomes Charmed.'
										}
									]
								},
								{
									id: 'reaping_life_hex',
									name: 'Reaping/Life Hex',
									description:
										'(1 MP) The target takes 1 True damage and you regain 1 HP at the end of each of its turns for the duration.',
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_reaping_life',
											value: '1 MP: Target takes 1 True damage and you regain 1 HP each turn.'
										}
									]
								},
								{
									id: 'vermin_hex',
									name: 'Vermin Hex',
									description:
										"(1 MP) The target can't speak and its Size decreases by 1 at the end of each of its turns until it's tiny.",
									effects: [
										{
											type: 'GRANT_ABILITY',
											target: 'hex_vermin',
											value: "1 MP: Target is silenced and shrinks over time."
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'curse_expert',
					featureName: 'Curse Expert',
					levelGained: 3,
					description:
						'You can spend 1 minute to detect the presence of Curses within 20 Spaces. If you spend 10 minutes in contact with a Cursed creature or object, you learn the nature of the Curse.',
					isFlavor: true,
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'curse_expert',
							value: 'Can detect and analyze curses.'
						}
					]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/progressions/barbarian.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const barbarianProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "barbarian_martial_path",
        "barbarian_rage",
        "barbarian_berserker",
        "barbarian_shattering_force"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "barbarian_battlecry",
        "barbarian_level_2_talent"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/bard.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const bardProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "bard_spellcasting_path",
        "bard_font_of_inspiration",
        "bard_remarkable_repertoire",
        "bard_crowd_pleaser"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "bard_bardic_performance",
        "bard_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/champion.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const championProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "champion_martial_path",
        "champion_master_at_arms",
        "champion_fighting_spirit",
        "champion_know_your_enemy"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "champion_adaptive_tactics"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/cleric.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const clericProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "cleric_spellcasting_path",
        "cleric_order",
        "cleric_divine_damage_expansion",
        "cleric_divine_blessing",
        "cleric_divine_omen"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "cleric_channel_divinity",
        "cleric_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/commander.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const commanderProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "commander_martial_path",
        "commander_inspiring_presence",
        "commander_commanders_call",
        "commander_natural_leader"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "commander_commanding_aura",
        "commander_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/druid.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const druidProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "druid_spellcasting_path",
        "druid_domain",
        "druid_wild_form",
        "druid_wild_speech"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "druid_natures_torrent",
        "druid_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/hunter.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const hunterProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "hunter_martial_path",
        "hunter_mark",
        "hunter_favored_terrain"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "hunter_strike",
        "hunter_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/monk.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const monkProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "monk_training",
        "monk_stance"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "monk_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/psion.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const psionProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "psion_spellcasting_path",
        "psion_stamina",
        "psion_psionic_mind",
        "psion_telekinesis",
        "psion_telekinetic_grapple",
        "psion_telepathy"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "psion_mind_sense",
        "psion_invade_mind",
        "psion_psionic_resolve",
        "psion_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/sorcerer.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const sorcererProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "sorcerer_innate_power",
        "sorcerer_overload_magic",
        "sorcerer_sorcery_spell"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "sorcerer_meta_magic",
        "sorcerer_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/warlock.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const warlockProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "warlock_contract",
        "warlock_pact_boon"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "warlock_life_tap",
        "warlock_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/wizard.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const wizardProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 8,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "wizard_spellcasting_path",
        "wizard_spell_school_initiate",
        "wizard_arcane_sigil",
        "wizard_ritual_caster"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "wizard_prepared_spell",
        "wizard_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/talents/talent.loader.ts
````typescript
import type { Talent } from '../talents/talent.types';
import { generalTalents, multiclassTalents } from '../talents/talents.data';
// Use Vite's import.meta.glob to dynamically import all class talent files
const classTalentModules = import.meta.glob('./*.talents.ts', { eager: true });
// Extract the talent arrays from each module
const classTalents: Talent[] = Object.values(classTalentModules).flatMap((module: any) => {
    // The talent array is expected to be the first export in each file
    const talentArray = Object.values(module).find(Array.isArray);
    return talentArray || [];
}) as Talent[];
// Combine all talents into a single array
export const allTalents: Talent[] = [
    ...generalTalents,
    ...multiclassTalents,
    ...classTalents,
];
// Helper function to find a talent by its ID
export function findTalentById(talentId: string): Talent | undefined {
    return allTalents.find(t => t.id === talentId);
}
````

## File: src/lib/rulesdata/classes-data/talents/talent.types.ts
````typescript
import type { Effect } from '../../schemas/character.schema';
export type TalentCategory = 'General' | 'Class' | 'Multiclass';
export interface TalentPrerequisites {
  level?: number;
  classId?: string; // e.g., 'barbarian'
  feature?: string; // e.g., 'Rage'
  subclass?: string; // e.g., 'Berserker'
  other?: string; // For text-based requirements like "1 or more Monk Features"
}
export interface Talent {
  id: string; // e.g., 'general_attribute_increase' or 'barbarian_unfathomable_strength'
  name: string;
  category: TalentCategory;
  description: string;
  effects: Effect[];
  prerequisites?: TalentPrerequisites;
}
````

## File: src/lib/rulesdata/classes-data/talents/talents.data.ts
````typescript
import type { Talent } from './talent.types';
export const generalTalents: Talent[] = [
  {
    id: 'general_attribute_increase',
    name: 'Attribute Increase',
    category: 'General',
    description: 'You gain 1 Attribute Point to put into any Attribute of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: 1 }],
  },
  {
    id: 'general_skill_increase',
    name: 'Skill Point Increase',
    category: 'General',
    description: 'You gain 3 Skill Points to put into any Skill of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 3 }],
  },
  {
    id: 'general_trade_increase',
    name: 'Trade Point Increase',
    category: 'General',
    description: 'You gain 3 Trade Points to put into any Trade of your choice.',
    effects: [{ type: 'MODIFY_STAT', target: 'tradePoints', value: 3 }],
  },
  {
    id: 'general_martial_expansion',
    name: 'Martial Expansion',
    category: 'General',
    description: 'You gain Combat Training with Weapons, Armor, and Shields. You learn 2 additional Maneuvers and 1 additional Technique.',
    effects: [
      { type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
      { type: 'GRANT_COMBAT_TRAINING', target: 'Armor', value: true },
      { type: 'GRANT_COMBAT_TRAINING', target: 'Shields', value: true },
      { type: 'MODIFY_STAT', target: 'maneuversKnown', value: 2 },
      { type: 'MODIFY_STAT', target: 'techniquesKnown', value: 1 },
    ],
  },
  {
    id: 'general_spellcasting_expansion',
    name: 'Spellcasting Expansion',
    category: 'General',
    description: 'Your Maximum Mana Points increases by 2. You gain access to your choice of any Spell List. You learn 1 additional Spell (from Spell Lists that you have access to).',
    effects: [
      { type: 'MODIFY_STAT', target: 'mpMax', value: 2 },
      { type: 'GRANT_ABILITY', target: 'spell_list_access', value: 'any' },
      { type: 'MODIFY_STAT', target: 'spellsKnown', value: 1 },
    ],
  },
];
export const multiclassTalents: Talent[] = [
    {
        id: 'multiclass_novice',
        name: 'Novice Multiclass',
        category: 'Multiclass',
        description: 'You can choose a 1st Level Class Feature from any Class.',
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_1', value: 1 }]
    },
    {
        id: 'multiclass_adept',
        name: 'Adept Multiclass',
        category: 'Multiclass',
        description: 'You can choose a 2nd Level Class Feature from any Class.',
        prerequisites: { level: 4 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_2', value: 1 }]
    },
    {
        id: 'multiclass_expert',
        name: 'Expert Multiclass',
        category: 'Multiclass',
        description: 'Choose a 5th Level Class Feature OR a 3rd Level Subclass Feature from a class you have at least 1 feature from.',
        prerequisites: { level: 7 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_feature_level_5_or_subclass_3', value: 1 }]
    },
    {
        id: 'multiclass_master',
        name: 'Master Multiclass',
        category: 'Multiclass',
        description: 'Choose a 6th Level Subclass Feature from a subclass you have at least 1 feature from.',
        prerequisites: { level: 10 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_feature_level_6', value: 1 }]
    },
    {
        id: 'multiclass_grandmaster',
        name: 'Grandmaster Multiclass',
        category: 'Multiclass',
        description: 'Choose an 8th Level Class Capstone Feature from any Class you have at least 2 Class Features from.',
        prerequisites: { level: 13 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_capstone_feature_level_8', value: 1 }]
    },
    {
        id: 'multiclass_legendary',
        name: 'Legendary Multiclass',
        category: 'Multiclass',
        description: 'Choose a 9th Level Subclass Capstone Feature from any Subclass you have at least 2 Subclass Features from.',
        prerequisites: { level: 17 },
        effects: [{ type: 'GRANT_CHOICE', target: 'multiclass_subclass_capstone_level_9', value: 1 }]
    }
];
````

## File: src/lib/rulesdata/classes-data/features/commander_features.ts
````typescript
/**
 * Commander Class Definition - New Effect Schema
 * Based on DC20 Commander features with martial abilities and leadership
 */
import type { ClassDefinition } from '../../schemas/character.schema';
export const commanderClass: ClassDefinition = {
	className: 'Commander',
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['All_Armor'],
			shields: ['All_Shields']
		},
		maneuvers: {
			learnsAllAttack: true,
			additionalKnown: 'Maneuvers Known column of the Commander Class Table'
		},
		techniques: {
			additionalKnown: 'Techniques Known column of the Commander Class Table'
		},
		staminaPoints: {
			maximumIncreasesBy: 'Stamina Points column of the Commander Class Table'
		},
		staminaRegen: {
			description:
				'Once per round, regain up to half maximum SP when you grant a creature a Help Die.'
		}
	},
	coreFeatures: [
		{
			id: 'commander_martial_path',
			featureName: 'Martial Path',
			levelGained: 1,
			description: 'You gain extensive combat training and martial prowess.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Weapons', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true },
				{ type: 'GRANT_MANEUVERS', target: 'all_attack', value: 4 }
			],
			benefits: [
				{
					name: 'Combat Training',
					description: 'Proficiency with all weapons, armor, and shields.',
					effects: []
				},
				{
					name: 'Maneuver Training',
					description: 'You learn all Attack Maneuvers plus additional maneuvers.',
					effects: []
				},
				{
					name: 'Stamina Regeneration',
					description:
						'Once per round, regain up to half maximum SP when you grant a creature a Help Die.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'stamina_regen',
							value: 'Regain up to half max SP when granting Help Die (once per round).'
						}
					]
				}
			]
		},
		{
			id: 'commander_inspiring_presence',
			featureName: 'Inspiring Presence',
			levelGained: 1,
			description: 'Whenever you spend SP while in Combat, you can restore HP to nearby allies.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'inspiring_presence',
					value:
						'When spending SP in combat: restore HP equal to SP spent, divide among allies within 5 Spaces.'
				}
			]
		},
		{
			id: 'commander_commanders_call',
			featureName: "Commander's Call",
			levelGained: 1,
			description: 'You can spend 1 AP and 1 SP to command a willing creature within 5 Spaces.',
			benefits: [
				{
					name: 'Attack Command',
					description: 'The creature makes an Attack with ADV without spending resources.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'attack_command',
							value: 'Command ally to Attack with ADV (1 AP + 1 SP, once per turn).'
						}
					]
				},
				{
					name: 'Dodge Command',
					description: 'The creature takes the Full Dodge Action.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'dodge_command',
							value: 'Command ally to Full Dodge (1 AP + 1 SP, once per turn).'
						}
					]
				},
				{
					name: 'Move Command',
					description:
						'The creature moves up to their Speed without provoking Opportunity Attacks.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'move_command',
							value:
								'Command ally to move up to Speed without opportunity attacks (1 AP + 1 SP, once per turn).'
						}
					]
				}
			]
		},
		{
			id: 'commander_natural_leader',
			featureName: 'Natural Leader',
			levelGained: 1,
			description:
				'You have ADV on Checks made to convince creatures that you are an authority figure.',
			isFlavor: true,
			effects: [
				{ type: 'GRANT_ADV_ON_CHECK', target: 'authority_figure', value: 'ADV' },
				{ type: 'GRANT_ADV_ON_CHECK', target: 'military_groups', value: 'ADV' }
			]
		},
		{
			id: 'commander_commanding_aura',
			featureName: 'Commanding Aura',
			levelGained: 2,
			description: "You're surrounded by a 5 Space Aura that allows you to aid and support allies.",
			benefits: [
				{
					name: 'Bolster',
					description: 'Take the Help Action to aid attacks within your aura (1 AP or Reaction).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'bolster',
							value: 'Help Action for attacks in aura (1 AP or Reaction).'
						}
					]
				},
				{
					name: 'Rally',
					description: 'Grant creatures of your choice 1 Temp HP (1 AP).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'rally',
							value: 'Grant 1 Temp HP to creatures in aura (1 AP).'
						}
					]
				},
				{
					name: 'Reinforce',
					description: 'Impose DisADV on attacks against creatures in your aura (Reaction).',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'reinforce',
							value: 'Impose DisADV on attacks in aura (Reaction).'
						}
					]
				}
			]
		},
		{
			id: 'commander_talent_level_2',
			featureName: 'Talent',
			levelGained: 2,
			description:
				'You gain 1 Talent of your choice. If the Talent has any prerequisites, you must meet those prerequisites to choose that Talent.',
			effects: [{ type: 'GRANT_CHOICE', target: 'talent', value: 1 }]
		}
	],
	subclasses: [
		{
			subclassName: 'Crusader',
			description: 'Holy warriors who protect and inspire their allies.',
			features: [
				{
					featureName: 'Virtuous Vanguard',
					levelGained: 3,
					description: 'You become a beacon of courage and protection.',
					benefits: [
						{
							name: 'Aura of Courage',
							description:
								'Allies in your Commanding Aura have Resistance to Frightened and Intimidated.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'aura_of_courage',
									value: 'Allies in aura: Resistance to Frightened and Intimidated.'
								}
							]
						},
						{
							name: 'Protective Orders',
							description: "Creatures who benefit from Commander's Call gain damage Resistance.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'protective_orders',
									value:
										"Commander's Call targets gain Resistance (1) to next damage before your next turn."
								}
							]
						},
						{
							name: 'Restoring Rally',
							description: 'Bloodied creatures regain HP instead of gaining Temp HP from Rally.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'restoring_rally',
									value: 'Rally: Bloodied creatures regain HP instead of Temp HP.'
								}
							]
						}
					]
				},
				{
					featureName: 'Gallant Hero',
					levelGained: 3,
					description: 'Your presence is a symbol of hope and safety.',
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'convince_not_afraid', value: 'ADV' }]
				}
			]
		},
		{
			subclassName: 'Warlord',
			description: 'Tactical masters who excel at aggressive battlefield control.',
			features: [
				{
					featureName: 'Offensive Tactics',
					levelGained: 3,
					description: 'You gain aggressive battlefield abilities.',
					benefits: [
						{
							name: 'Morale Breaker',
							description:
								"Once per Combat when using Commander's Call, use Intimidate Action for free.",
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'morale_breaker',
									value:
										"Commander's Call: Free Intimidate Action against creature within 15 Spaces (once per combat)."
								}
							]
						},
						{
							name: 'Battlefield Tactics',
							description:
								'Allies deal +1 damage on their first Melee Attack against flanked creatures.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'battlefield_tactics',
									value:
										'Allies in aura: +1 damage on first Melee Attack vs flanked creatures each turn.'
								}
							]
						},
						{
							name: 'Priority Target',
							description: 'Grant allies ADV on attacks against a chosen target.',
							effects: [
								{
									type: 'GRANT_ABILITY',
									target: 'priority_target',
									value:
										'Priority Target (1 AP + 1 SP): Allies in aura get ADV on first attack vs chosen target until your next turn.'
								}
							]
						}
					]
				},
				{
					featureName: 'Battlefield Tactician',
					levelGained: 3,
					description: "You've mastered military history and strategy.",
					isFlavor: true,
					effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'military_knowledge', value: 'ADV' }]
				}
			]
		}
	]
};
````

## File: src/lib/rulesdata/classes-data/progressions/rogue.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const rogueProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 4,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "rogue_debilitating_strike",
        "rogue_roguish_finesse",
        "rogue_cypher_speech"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "rogue_cheap_shot",
        "rogue_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/progressions/spellblade.progression.ts
````typescript
// This file was automatically generated by a script.
// **Manually review and update the 'classFeatures' array with correct feature IDs.**
// import { ClassLevel } from '../../schemas/class.schema'; // Adjust path as needed
// Awaiting schema update, using 'any' for now.
export const spellbladeProgression: any[] = [
  {
    "level": 1,
    "gainedHealth": 9,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 2,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "spellblade_bound_weapon",
        "spellblade_disciplines",
        "spellblade_sense_magic"
      ]
    }
  },
  {
    "level": 2,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "classFeatures": [
        "spellblade_spellstrike",
        "spellblade_talent_level_2"
      ]
    }
  },
  {
    "level": 3,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 1,
    "gainedTechniquesKnown": 1,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 4,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 5,
    "gainedHealth": 3,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "classFeatures": [
        "placeholder_class_feature"
      ]
    }
  },
  {
    "level": 6,
    "gainedHealth": 2,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 7,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "ancestryPoints": 2
    }
  },
  {
    "level": 8,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 1,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 1,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 1,
    "gains": {
      "classFeatures": [
        "placeholder_class_capstone"
      ]
    }
  },
  {
    "level": 9,
    "gainedHealth": 3,
    "gainedAttributePoints": 0,
    "gainedSkillPoints": 0,
    "gainedTradePoints": 0,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "subclassFeatureChoice": true
    }
  },
  {
    "level": 10,
    "gainedHealth": 2,
    "gainedAttributePoints": 1,
    "gainedSkillPoints": 2,
    "gainedTradePoints": 1,
    "gainedStaminaPoints": 0,
    "gainedManeuversKnown": 0,
    "gainedTechniquesKnown": 0,
    "gains": {
      "talents": 1,
      "pathPoints": 1,
      "epicBoon": true
    }
  }
];
````

## File: src/lib/rulesdata/classes-data/features/subclasses.test.ts
````typescript
import { describe, it, expect } from 'vitest';
import { barbarianClass } from './barbarian_features';
import { bardClass } from './bard_features';
import { championClass } from './champion_features';
import { clericClass } from './cleric_features';
import { commanderClass } from './commander_features';
import { druidClass } from './druid_features';
import { hunterClass } from './hunter_features';
import { monkClass } from './monk_features';
import { rogueClass } from './rogue_features';
import { sorcererClass } from './sorcerer_features';
import { spellbladeClass } from './spellblade_features';
import { warlockClass } from './warlock_features';
import { wizardClass } from './wizard_features';
/**
 * Subclass Availability Tests for All Classes
 * 
 * Purpose: Verify that each class has the expected subclasses defined at level 3.
 * This test suite ensures that the leveling UI will correctly display subclass options.
 * 
 * Test Strategy:
 * 1. Import all class feature definitions
 * 2. For each class, check that subclasses array exists and has expected entries
 * 3. Verify subclass levelGained is undefined or <= 3 (available at level 3)
 * 4. Confirm expected subclass names/IDs match actual definitions
 * 
 * Note: Expected subclass lists are based on DC20 RPG rules. Update if rules change.
 */
interface SubclassTestCase {
	classId: string;
	className: string;
	classDefinition: any;
	level: number;
	expectedSubclasses: Array<{
		id?: string;
		name: string;
		description?: string;
	}>;
}
describe('Class Subclass Availability at Level 3', () => {
	const testCases: SubclassTestCase[] = [
		{
			classId: 'barbarian',
			className: 'Barbarian',
			classDefinition: barbarianClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Elemental Fury' },
				{ name: 'Spirit Guardian' }
			]
		},
		{
			classId: 'bard',
			className: 'Bard',
			classDefinition: bardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Eloquence' },
				{ name: 'Jester' }
			]
		},
		{
			classId: 'champion',
			className: 'Champion',
			classDefinition: championClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Hero' },
				{ name: 'Sentinel' }
			]
		},
		{
			classId: 'cleric',
			className: 'Cleric',
			classDefinition: clericClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Inquisitor' },
				{ name: 'Priest' }
			]
		},
		{
			classId: 'commander',
			className: 'Commander',
			classDefinition: commanderClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Crusader' },
				{ name: 'Warlord' }
			]
		},
		{
			classId: 'druid',
			className: 'Druid',
			classDefinition: druidClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Phoenix' },
				{ name: 'Rampant Growth' }
			]
		},
		{
			classId: 'hunter',
			className: 'Hunter',
			classDefinition: hunterClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Monster Slayer' },
				{ name: 'Trapper' }
			]
		},
		{
			classId: 'monk',
			className: 'Monk',
			classDefinition: monkClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Astral Self' },
				{ name: 'Shifting Tide' }
			]
		},
		{
			classId: 'rogue',
			className: 'Rogue',
			classDefinition: rogueClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Long Death' },
				{ name: 'Swashbuckler' }
			]
		},
		{
			classId: 'sorcerer',
			className: 'Sorcerer',
			classDefinition: sorcererClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Angelic' },
				{ name: 'Draconic' }
			]
		},
		{
			classId: 'spellblade',
			className: 'Spellblade',
			classDefinition: spellbladeClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Paladin' },
				{ name: 'Rune Knight' }
			]
		},
		{
			classId: 'warlock',
			className: 'Warlock',
			classDefinition: warlockClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Eldritch' },
				{ name: 'Fey' }
			]
		},
		{
			classId: 'wizard',
			className: 'Wizard',
			classDefinition: wizardClass,
			level: 3,
			expectedSubclasses: [
				{ name: 'Portal Mage' },
				{ name: 'Witch' }
			]
		}
	];
	testCases.forEach(({ classId, className, classDefinition, level, expectedSubclasses }) => {
		describe(`${className}`, () => {
			it(`should have subclasses array defined`, () => {
				expect(classDefinition).toBeDefined();
				expect(classDefinition.subclasses).toBeDefined();
				expect(Array.isArray(classDefinition.subclasses)).toBe(true);
			});
			it(`should have ${expectedSubclasses.length} subclasses available at level ${level}`, () => {
				const subclasses = classDefinition.subclasses || [];
				// Filter subclasses available at the specified level
				const availableSubclasses = subclasses.filter((sc: any) => 
					sc.levelGained === undefined || sc.levelGained <= level
				);
				expect(availableSubclasses.length).toBe(expectedSubclasses.length);
			});
			expectedSubclasses.forEach((expected, index) => {
				it(`should have subclass "${expected.name}"`, () => {
					const subclasses = classDefinition.subclasses || [];
					const found = subclasses.find((sc: any) => 
						sc.subclassName === expected.name ||
						sc.subclassName?.toLowerCase() === expected.name.toLowerCase()
					);
					expect(found).toBeDefined();
					expect(found.subclassName).toBe(expected.name);
					// Verify subclass is available at level 3 or earlier
					if (found.levelGained !== undefined) {
						expect(found.levelGained).toBeLessThanOrEqual(level);
					}
					// Verify subclass has description (optional - some subclasses may not have descriptions)
					if (found.description) {
						expect(typeof found.description).toBe('string');
						expect(found.description.length).toBeGreaterThan(0);
					}
					// Verify subclass has features array
					expect(found.features).toBeDefined();
					expect(Array.isArray(found.features)).toBe(true);
				});
			});
			it('should have unique subclass names', () => {
				const subclasses = classDefinition.subclasses || [];
				const names = subclasses.map((sc: any) => sc.subclassName);
				const uniqueNames = new Set(names);
				expect(uniqueNames.size).toBe(names.length);
			});
			it('all subclasses should have at least one feature', () => {
				const subclasses = classDefinition.subclasses || [];
				subclasses.forEach((sc: any) => {
					expect(sc.features.length).toBeGreaterThan(0);
				});
			});
		});
	});
});
````
