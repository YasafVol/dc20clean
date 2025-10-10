This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where empty lines have been removed.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
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
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Empty lines have been removed from all files
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
ancestries/
  ancestries.ts
  traits.ts
classes-data/
  features/
    barbarian_features.ts
    bard_features.ts
    champion_features.ts
    cleric_features.ts
    commander_features.ts
    druid_features.ts
    hunter_features.ts
    monk_features.ts
    psion_features.ts
    rogue_features.ts
    sorcerer_features.ts
    spellblade_features.ts
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
loaders/
  class-features.loader.ts
  class.loader.ts
martials/
  maneuvers.ts
  techniques.ts
paths/
  path.service.ts
  paths.data.ts
  paths.types.ts
schemas/
  character.schema.ts
  class.schema.ts
  spell.schema.ts
  types.ts
spells-data/
  spells/
    additional-spells/
      close-wounds.ts
      death-bolt.ts
      druidcraft.ts
      find-familiar.ts
      index.ts
      shield.ts
      tethering-vines.ts
    fiendborn-ancestry-spells/
      acid-bolt.ts
      index.ts
      poison-bolt.ts
    fire-and-flames/
      burning-flames.ts
      dancing-flames.ts
      fire-bolt.ts
      fire-shield.ts
      fog-cloud.ts
      grease.ts
      index.ts
      minor-flame-blade.ts
    holy-and-restoration/
      bless.ts
      guidance.ts
      guiding-bolt.ts
      heal.ts
      index.ts
      light.ts
      sacred-bolt.ts
      shield-of-faith.ts
    ice-and-illusions/
      catapult.ts
      frost-bolt.ts
      ice-knife.ts
      index.ts
      mage-hand.ts
      magic-missile.ts
      minor-illusion.ts
      silent-image.ts
    lightning-and-teleportation/
      crackling-lightning.ts
      gust.ts
      index.ts
      lightning-blade.ts
      lightning-bolt.ts
      misty-step.ts
      returning-shock.ts
      shocking-grasp.ts
    psychic-and-enchantment/
      bane.ts
      befriend.ts
      command.ts
      index.ts
      message.ts
      psi-bolt.ts
      psychic-fear.ts
      sleep.ts
    special-class-spells/
      index.ts
      sorcery.ts
    index.ts
attributes.ts
death.ts
inventoryItems.ts
languages.ts
rulesdata.spec.ts
skills.ts
trades.spec.ts
trades.ts
```

# Files

## File: ancestries/ancestries.ts
```typescript
import type { Ancestry } from '../schemas/character.schema';
// This file mirrors the full modular content from src/lib/rulesdata/ancestries.ts
// while preserving the stricter typing from the new schema.
export const ancestriesData: Ancestry[] = [
	{
		id: 'human',
		name: 'Human',
		description:
			'Humans are the most common ancestry in the world, known for their adaptability and resilience.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'human_attribute_increase',
			'human_skill_expertise',
			'human_resolve',
			'human_undying'
		],
		expandedTraitIds: [
			'human_trade_expertise',
			'human_determination',
			'human_unbreakable',
			'human_attribute_decrease'
		]
	},
	{
		id: 'elf',
		name: 'Elf',
		description: 'Elves are graceful and long-lived beings with a deep connection to nature.',
		rulesSource: 'DC20Beta0.95',
		// INSERTED LINE
		defaultTraitIds: ['elf_elven_will', 'elf_nimble', 'elf_agile_explorer', 'elf_discerning_sight'],
		expandedTraitIds: [
			'elf_quick_reactions',
			'elf_peerless_sight',
			'elf_climb_speed',
			'elf_speed_increase',
			'elf_trade_expertise_elf',
			'elf_plant_knowledge',
			'elf_brittle',
			'elf_frail',
			'elf_might_decrease'
		]
	},
	{
		id: 'dwarf',
		name: 'Dwarf',
		description:
			'Dwarves are a stout and resilient folk, known for their craftsmanship and deep connection to the earth.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'dwarf_tough',
			'dwarf_toxic_fortitude',
			'dwarf_physically_sturdy',
			'dwarf_iron_stomach'
		],
		expandedTraitIds: [
			'dwarf_thick_skinned',
			'dwarf_natural_combatant',
			'dwarf_stone_blood',
			'dwarf_minor_tremorsense',
			'dwarf_stubborn',
			'dwarf_earthen_knowledge',
			'dwarf_charisma_attribute_decrease',
			'dwarf_short_legged'
		]
	},
	{
		id: 'halfling',
		name: 'Halfling',
		description:
			'Halflings are a small and nimble folk, known for their bravery and love of comfort.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'halfling_small_sized',
			'halfling_elusive',
			'halfling_bravery',
			'halfling_endurance',
			'halfling_deft_footwork',
			'halfling_beast_whisperer'
		],
		expandedTraitIds: [
			'halfling_beast_insight',
			'halfling_burst_of_bravery',
			'halfling_trade_expertise',
			'halfling_critter_knowledge',
			'halfling_brittle',
			'halfling_intelligence_attribute_decrease',
			'halfling_short_legged'
		]
	},
	{
		id: 'gnome',
		name: 'Gnome',
		description:
			'Gnomes are small and energetic folk, known for their inventiveness and connection to the feywild.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'gnome_small_sized',
			'gnome_escape_artist',
			'gnome_magnified_vision',
			'gnome_mental_clarity',
			'gnome_strong_minded',
			'gnome_predict_weather'
		],
		expandedTraitIds: [
			'gnome_mana_increase',
			'gnome_trapper',
			'gnome_lightning_insulation',
			'gnome_trade_expertise',
			'gnome_storm_knowledge',
			'gnome_agility_attribute_decrease',
			'gnome_short_legged'
		]
	},
	{
		id: 'orc',
		name: 'Orc',
		description:
			'Orcs are a strong and fierce folk, known for their martial prowess and intimidating presence.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'orc_cursed_mind',
			'orc_rush',
			'orc_brutal_strikes',
			'orc_tough',
			'orc_orcish_resolve',
			'orc_already_cursed'
		],
		expandedTraitIds: [
			'orc_intimidating_shout',
			'orc_dash',
			'orc_finishing_blow',
			'orc_imposing_presence',
			'orc_provocation',
			'orc_reckless'
		]
	},
	{
		id: 'dragonborn',
		name: 'Dragonborn',
		description:
			'Dragonborn are a proud and powerful folk, who trace their lineage back to dragons.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'dragonborn_darkvision',
			'dragonborn_draconic_resistance',
			'dragonborn_draconic_breath_weapon',
			'dragonborn_reptilian_superiority'
		],
		expandedTraitIds: [
			'dragonborn_mana_increase',
			'dragonborn_thick_skinned',
			'dragonborn_second_breath',
			'dragonborn_concussive_breath',
			'dragonborn_draconic_affinity',
			'dragonborn_dying_breath',
			'dragonborn_draconic_ward',
			'dragonborn_draconic_protection',
			'dragonborn_glide_speed',
			'dragonborn_guardians_bond'
		],
		origin: {
			prompt: 'Choose a Draconic Origin:',
			options: [
				'cold',
				'corrosion',
				'fire',
				'lightning',
				'poison',
				'sonic',
				'psychic',
				'radiant',
				'umbral'
			]
		}
	},
	{
		id: 'giantborn',
		name: 'Giantborn',
		description: 'Giantborn are a large and powerful folk, who trace their lineage back to giants.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'giantborn_tough',
			'giantborn_powerful_build',
			'giantborn_unstoppable',
			'giantborn_giants_resolve',
			'giantborn_unyielding_movement'
		],
		expandedTraitIds: [
			'giantborn_giants_fortitude',
			'giantborn_strong_body',
			'giantborn_mighty_hurl',
			'giantborn_titanic_toss',
			'giantborn_mighty_leap',
			'giantborn_brute',
			'giantborn_heavy_riser',
			'giantborn_clumsiness',
			'giantborn_intelligence_attribute_decrease'
		]
	},
	{
		id: 'angelborn',
		name: 'Angelborn',
		description: 'Angelborn are a celestial folk, known for their grace and divine connection.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'angelborn_radiant_resistance',
			'angelborn_celestial_magic',
			'angelborn_healing_touch',
			'angelborn_divine_glow'
		],
		expandedTraitIds: [
			'angelborn_mana_increase',
			'angelborn_celestial_clarity',
			'angelborn_angelic_insight',
			'angelborn_gift_of_the_angels',
			'angelborn_blinding_light',
			'angelborn_glide_speed',
			'angelborn_pacifist',
			'angelborn_umbral_weakness'
		],
		variantTraits: [
			{
				id: 'angelborn_fallen',
				name: 'Fallen',
				cost: 0,
				description: 'You can now spend your Ancestry Points on Fiendborn Traits.',
				effects: []
			}
		]
	},
	{
		id: 'fiendborn',
		name: 'Fiendborn',
		description: 'Fiendborn are a fiendish folk, known for their cunning and infernal connection.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [
			'fiendborn_fiendish_resistance',
			'fiendborn_fiendish_magic',
			'fiendborn_darkvision',
			'fiendborn_lights_bane'
		],
		expandedTraitIds: [
			'fiendborn_mana_increase',
			'fiendborn_silver_tongued',
			'fiendborn_fiendish_aura',
			'fiendborn_superior_darkvision',
			'fiendborn_infernal_bravery',
			'fiendborn_intimidator',
			'fiendborn_charming_gaze',
			'fiendborn_glide_speed',
			'fiendborn_radiant_weakness',
			'fiendborn_divine_dampening'
		],
		origin: {
			prompt: 'Choose a Fiendish Origin:',
			options: ['cold', 'corrosion', 'fire', 'poison', 'umbral']
		},
		variantTraits: [
			{
				id: 'fiendborn_redeemed',
				name: 'Redeemed',
				cost: 0,
				description: 'You can now spend your Ancestry Points on Angelborn Traits.',
				effects: []
			}
		]
	},
	{
		id: 'beastborn',
		name: 'Beastborn',
		description: 'Beastborn are a diverse folk, who take on the characteristics of various beasts.',
		rulesSource: 'DC20Beta0.95',
		defaultTraitIds: [],
		expandedTraitIds: [
			// Senses
			'beastborn_darkvision',
			'beastborn_echolocation',
			'beastborn_keen_sense',
			'beastborn_sunlight_sensitivity',
			// Mobility
			'beastborn_quick_reactions',
			'beastborn_climb_speed',
			'beastborn_spider_climb',
			'beastborn_web_walk',
			'beastborn_water_breathing',
			'beastborn_swim_speed',
			'beastborn_speed_increase',
			'beastborn_sprint',
			'beastborn_charge',
			'beastborn_burrow_speed',
			// Jumping
			'beastborn_jumper',
			'beastborn_strong_jumper',
			// Flying
			'beastborn_glide_speed',
			'beastborn_limited_flight',
			'beastborn_full_flight',
			'beastborn_flyby',
			'beastborn_stealth_feathers',
			'beastborn_winged_arms',
			// Body
			'beastborn_tough',
			'beastborn_thick_skinned',
			'beastborn_powerful_build',
			'beastborn_long_limbed',
			'beastborn_secondary_arms',
			'beastborn_prehensile_appendage',
			'beastborn_hazardous_hide',
			'beastborn_natural_armor',
			'beastborn_hard_shell',
			'beastborn_shell_retreat',
			'beastborn_camouflage',
			'beastborn_prowler',
			'beastborn_cold_resistance',
			'beastborn_fire_resistance',
			'beastborn_short_legged',
			'beastborn_small_sized',
			'beastborn_reckless',
			// Natural Weapons
			'beastborn_natural_weapon',
			'beastborn_extended_natural_weapon',
			'beastborn_natural_projectile',
			'beastborn_natural_weapon_passive',
			'beastborn_rend',
			'beastborn_retractable_natural_weapon',
			'beastborn_venomous_natural_weapon',
			// Miscellaneous
			'beastborn_fast_reflexes',
			'beastborn_mimicry',
			'beastborn_intimidating_shout',
			'beastborn_toxic_fortitude',
			'beastborn_shoot_webs'
		],
		origin: {
			prompt: 'Choose a type of Beast you are modeled after:',
			options: []
		}
	},
	{
		id: 'penguinborn',
		name: 'Penguinborn',
		description:
			'Penguinborn are adaptable creatures, at home in both frigid waters and bustling crowds.',
		rulesSource: 'DC20Magazine10',
		defaultTraitIds: [
			'penguinborn_slip_and_slide',
			'penguinborn_swim_speed',
			'penguinborn_insulated_movement',
			'penguinborn_unassuming',
			'penguinborn_arctic_emperor'
		],
		expandedTraitIds: [
			'penguinborn_happy_feet',
			'penguinborn_smile_and_wave',
			'penguinborn_torpedo',
			'penguinborn_natural_weapon',
			'penguinborn_keen_sense',
			'penguinborn_pack_tactics',
			'penguinborn_cold_resistance',
			'penguinborn_poor_climber',
			'penguinborn_short_legged',
			'penguinborn_waddle'
		]
	},
	{
		id: 'gremlin',
		name: 'Gremlin',
		description: 'Gremlins are small, sneaky creatures that thrive on surprise and intimidation.',
		rulesSource: 'DC20Magazine14',
		defaultTraitIds: [
			'gremlin_small_sized',
			'gremlin_sneaky',
			'gremlin_thriller',
			'gremlin_surprise',
			'gremlin_deft_footwork',
			'gremlin_halfling_disguise'
		],
		expandedTraitIds: [
			'gremlin_bravery',
			'gremlin_give_chase',
			'gremlin_quick_reactions',
			'gremlin_fearsome',
			'gremlin_natural_weapon',
			'gremlin_climb_speed',
			'gremlin_critter_knowledge'
		]
	},
	{
		id: 'goblin',
		name: 'Goblin',
		description:
			'Goblins are aggressive and eager combatants, known for their cunning traps and pack tactics.',
		rulesSource: 'DC20Magazine14',
		defaultTraitIds: [
			'goblin_small_sized',
			'goblin_escape_artist',
			'goblin_aggressive',
			'goblin_eager_for_combat',
			'goblin_small_fury',
			'goblin_natural_trapper'
		],
		expandedTraitIds: [
			'goblin_hit_and_run',
			'goblin_pack_tactics',
			'goblin_trapper',
			'goblin_trade_expertise',
			'goblin_mischievous_hands',
			'goblin_sneaky',
			'goblin_reckless'
		]
	},
	{
		id: 'terraborn',
		name: 'Terraborn',
		description:
			'Terraborn are resilient beings of earth and stone, able to burrow through the ground and sense vibrations.',
		rulesSource: 'DC20Magazine14',
		defaultTraitIds: [
			'terraborn_burrow_speed',
			'terraborn_resilient_form',
			'terraborn_tremorsense',
			'terraborn_mold_earth'
		],
		expandedTraitIds: [
			'terraborn_stone_blood',
			'terraborn_tunnel_explorer',
			'terraborn_earth_walker',
			'terraborn_superior_tremorsense',
			'terraborn_tough',
			'terraborn_toxic_fortitude',
			'terraborn_insulated_skin',
			'terraborn_natural_armor',
			'terraborn_thick_skinned',
			'terraborn_bludgeoning_weakness',
			'terraborn_slow_moving'
		]
	},
	{
		id: 'shadowborn',
		name: 'Shadowborn',
		description:
			'Shadowborn are creatures of darkness, able to cloak themselves in shadow and resist umbral energies.',
		rulesSource: 'DC20Magazine14',
		defaultTraitIds: [
			'shadowborn_shadow_cloak',
			'shadowborn_umbral_resistance',
			'shadowborn_darkvision',
			'shadowborn_sleepless'
		],
		expandedTraitIds: [
			'shadowborn_escape_artist',
			'shadowborn_illusory_magic',
			'shadowborn_indiscernible',
			'shadowborn_mana_increase',
			'shadowborn_superior_darkvision',
			'shadowborn_sunlight_sensitivity',
			'shadowborn_radiant_weakness'
		]
	},
	{
		id: 'psyborn',
		name: 'Psyborn',
		description:
			'Psyborn possess powerful minds, capable of telepathic communication and psionic feats.',
		rulesSource: 'DC20Magazine01',
		defaultTraitIds: [
			'psyborn_psychic_resistance',
			'psyborn_telepathy',
			'psyborn_psionic_hand',
			'psyborn_strong_minded',
			'psyborn_shrouded_mind'
		],
		expandedTraitIds: [
			'psyborn_telepathic_reach',
			'psyborn_telepathic_link',
			'psyborn_psionic_leap',
			'psyborn_psionic_magic',
			'psyborn_psionic_grit',
			'psyborn_strong_mind',
			'psyborn_iron_mind',
			'psyborn_frail'
		]
	},
	// Test Ancestry
	{
		id: 'test',
		name: 'Test',
		description: 'An ancestry used for testing game mechanics.',
		rulesSource: 'Test',
		defaultTraitIds: ['test_test_hp'],
		expandedTraitIds: []
	}
];
// Helper functions for accessing ancestry data
export const getAncestryData = (id: string): Ancestry | undefined => {
	return ancestriesData.find((ancestry) => ancestry.id === id);
};
```

## File: ancestries/traits.ts
```typescript
import type { Trait } from '../schemas/character.schema';
export const traitsData: Trait[] = [
	// Human Traits (p. 108)
	{
		id: 'human_attribute_increase',
		name: 'Attribute Increase',
		description: 'Grants 1 Attribute Point to spend on any Attribute (up to the Attribute Limit).',
		cost: 2,
		effects: [
			{
				type: 'MODIFY_STAT',
				target: 'attributePoints',
				value: 1
			}
		]
	},
	{
		id: 'human_skill_expertise',
		name: 'Skill Expertise',
		description:
			'Choose a Skill. Your Mastery Cap and Mastery Level in the chosen Skill both increase by 1. You can only benefit from 1 Feature that increases your Skill Mastery Limit at a time.',
		cost: 2,
		effects: [
			{
				type: 'INCREASE_SKILL_MASTERY_CAP',
				count: 1,
				value: 1
			},
			{
				type: 'MODIFY_STAT',
				target: 'skillPoints',
				value: 1
			}
		]
	},
	{
		id: 'human_resolve',
		name: 'Human Resolve',
		description: 'Your Deaths Door Threshold value is expanded by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'deathThresholdModifier', value: 1 }]
	},
	{
		id: 'human_undying',
		name: 'Undying',
		description: 'You have ADV on Saves against the Doomed Condition.',
		cost: 0,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Doomed', value: 'ADV' }]
	},
	{
		id: 'human_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1
			},
			{
				type: 'MODIFY_STAT',
				target: 'tradePoints',
				value: 1
			}
		]
	},
	{
		id: 'human_determination',
		name: 'Human Determination',
		description:
			'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'determination',
				value:
					'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.'
			}
		]
	},
	{
		id: 'human_unbreakable',
		name: 'Unbreakable',
		description: 'You have ADV on Death Saves.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Death_Save', value: 'ADV' }]
	},
	{
		id: 'human_attribute_decrease',
		name: 'Attribute Decrease',
		description:
			'Choose an Attribute. You decrease the chosen Attribute by 1 (to a minimum of -2). **.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'MODIFY_STAT',
				target: 'attributePoints',
				value: -1
			}
		]
	},
	// Elf Traits (p. 108)
	{
		id: 'elf_elven_will',
		name: 'Elven Will',
		description: 'You have ADV on Checks and Saves against being Charmed and put to Sleep.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Charmed', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Sleep_Magic', value: 'ADV' }
		]
	},
	{
		id: 'elf_nimble',
		name: 'Nimble',
		description:
			'When you take the Dodge Action, you instead gain the benefits of the Full Dodge Action.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'nimble',
				value: 'When you take the Dodge Action, you gain the benefits of the Full Dodge Action.'
			}
		]
	},
	{
		id: 'elf_agile_explorer',
		name: 'Agile Explorer',
		description: 'You are not affected by Difficult Terrain.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'agile_explorer',
				value: 'You are not affected by Difficult Terrain.'
			}
		]
	},
	{
		id: 'elf_discerning_sight',
		name: 'Discerning Sight',
		description: 'You have ADV on Checks and Saves made to discern through visual illusions.',
		cost: 0,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Discern Visual Illusions', value: 'ADV' }]
	},
	{
		id: 'elf_quick_reactions',
		name: 'Quick Reactions',
		description: 'While you are not wearing Armor, you gain +1 PD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'elf_peerless_sight',
		name: 'Peerless Sight',
		description:
			'You do not have DisADV as a result of making an Attack with a Weapon at Long Range',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'peerless_sight',
				value: 'You do not have DisADV on Ranged Weapon Attacks at Long Range.'
			}
		]
	},
	{
		id: 'elf_climb_speed',
		name: 'Climb Speed',
		description: 'You gain a Climb Speed equal to your Movement Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }]
	},
	{
		id: 'elf_speed_increase',
		name: 'Speed Increase',
		description: 'Your Speed increases by 1 Space.',
		cost: 2,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }]
	},
	{
		id: 'elf_trade_expertise_elf',
		name: 'Trade Expertise (Elf)',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				target: 'any_trade',
				value: { capIncrease: 1, levelIncrease: 1 },
				userChoice: { prompt: 'Choose a Trade for Expertise' }
			}
		]
	},
	{
		id: 'elf_plant_knowledge',
		name: 'Plant Knowledge',
		description:
			'While within forests, jungles, and swamps, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about plants.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'plant_knowledge',
				value:
					'You have ADV on Survival Checks in forests, jungles, and swamps, and ADV on Nature Checks about plants.'
			}
		]
	},
	{
		id: 'elf_brittle',
		name: 'Brittle',
		description: 'Your AD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: -1 }]
	},
	{
		id: 'elf_frail',
		name: 'Frail',
		description: 'Your HP maximum decreases by 2.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: -2 }]
	},
	{
		id: 'elf_might_decrease',
		name: 'Might Decrease',
		description: 'Your Might decreases by 1 (to a minimum of -2).**',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }]
	},
	// Dwarf Traits (p. 109)
	{
		id: 'dwarf_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]
	},
	{
		id: 'dwarf_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: 'ADV' }
		]
	},
	{
		id: 'dwarf_physically_sturdy',
		name: 'Physically Sturdy',
		description: 'You have ADV on Saves against being Impaired, Deafened, or Petrified.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Impaired', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Deafened', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Petrified', value: 'ADV' }
		]
	},
	{
		id: 'dwarf_iron_stomach',
		name: 'Iron Stomach',
		description: 'You have ADV on Saves against effects that come from consuming food or liquids.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'iron_stomach',
				value: 'You have ADV on Saves against effects from consuming food or liquids.'
			}
		]
	},
	{
		id: 'dwarf_thick_skinned',
		name: 'Thick-Skinned',
		description: 'While you are not wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'dwarf_natural_combatant',
		name: 'Natural Combatant',
		description: 'You gain Combat Training with Heavy Armor and All Shields.',
		cost: 1,
		effects: [
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor', value: true },
			{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields', value: true }
		]
	},
	{
		id: 'dwarf_stone_blood',
		name: 'Stone Blood',
		description:
			'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Bleeding', value: 'ADV' },
			{
				type: 'GRANT_ABILITY',
				target: 'stone_blood',
				value: 'You can spend 1 AP to end the Bleeding Condition on yourself.'
			}
		]
	},
	{
		id: 'dwarf_minor_tremorsense',
		name: 'Minor Tremorsense',
		description: 'You have Tremorsense 3 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 }]
	},
	{
		id: 'dwarf_stubborn',
		name: 'Stubborn',
		description: 'You have ADV on Saves against being Taunted and against being forcibly moved.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Taunted', value: 'ADV' },
			{
				type: 'GRANT_ABILITY',
				target: 'stubborn',
				value: 'You have ADV on Saves against being forcibly moved.'
			}
		]
	},
	{
		id: 'dwarf_earthen_knowledge',
		name: 'Earthen Knowledge',
		description:
			'While underground, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about stones, gems, and metals.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'earthen_knowledge',
				value:
					'You have ADV on Survival Checks while underground and ADV on Nature Checks about stones, gems, and metals.'
			}
		]
	},
	{
		id: 'dwarf_charisma_attribute_decrease',
		name: 'Charisma Decrease',
		description: 'Your Charisma decreases by 1 (to a minimum of -2).**',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }]
	},
	{
		id: 'dwarf_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]
	},
	// Halfling Traits (p. 109)
	{
		id: 'halfling_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'small_size', value: 'Your Size is considered Small.' }
		]
	},
	{
		id: 'halfling_elusive',
		name: 'Elusive',
		description:
			'When you take the Disengage Action, you instead gain the benefits of the Full Disengage Action.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'elusive',
				value:
					'When you take the Disengage Action, you gain the benefits of the Full Disengage Action.'
			}
		]
	},
	{
		id: 'halfling_bravery',
		name: 'Halfling Bravery',
		description: 'You have ADV on Saves against being Intimidated, Rattled, or Frightened',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Intimidated', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Rattled', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Frightened', value: 'ADV' }
		]
	},
	{
		id: 'halfling_endurance',
		name: 'Halfling Endurance',
		description: 'You have Exhaustion Resistance.',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Exhaustion', value: 'condition' }]
	},
	{
		id: 'halfling_deft_footwork',
		name: 'Deft Footwork',
		description:
			'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'deft_footwork',
				value:
					'You can move through the space of a hostile creature 1 size larger as if it were Difficult Terrain.'
			}
		]
	},
	{
		id: 'halfling_beast_whisperer',
		name: 'Beast Whisperer',
		description:
			'You can speak to Beasts in a limited manner. They can understand the meanings of simple words, concepts, or states of emotion.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'beast_whisperer',
				value: 'You can speak to Beasts in a limited manner.'
			}
		]
	},
	{
		id: 'halfling_beast_insight',
		name: 'Beast Insight',
		description:
			'You can understand Beasts in a limited manner. You can understand the meaning of their noises and behaviors.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'beast_insight',
				value: 'You can understand Beasts in a limited manner.'
			}
		]
	},
	{
		id: 'halfling_burst_of_bravery',
		name: 'Burst of Bravery',
		description:
			'Once per Combat, you can end the Intimidated, Rattled, or Frightened Condition on yourself for free at any time.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'burst_of_bravery',
				value: 'Once per Combat: end Intimidated, Rattled, or Frightened on yourself for free.'
			}
		]
	},
	{
		id: 'halfling_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1
			}
		]
	},
	{
		id: 'halfling_critter_knowledge',
		name: 'Critter Knowledge',
		description:
			'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'critter_knowledge',
				value: 'You have ADV on Nature, Survival, and Animal Checks involving Small creatures.'
			}
		]
	},
	{
		id: 'halfling_brittle',
		name: 'Brittle',
		description: 'Your AD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: -1 }]
	},
	{
		id: 'halfling_intelligence_attribute_decrease',
		name: 'Intelligence Decrease',
		description: 'Your Intelligence decreases by 1 (to a minimum of -2).**',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }]
	},
	{
		id: 'halfling_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]
	},
	// Gnome Traits (p. 110)
	{
		id: 'gnome_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'small_size', value: 'Your Size is considered Small.' }
		]
	},
	{
		id: 'gnome_escape_artist',
		name: 'Escape Artist',
		description:
			'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'escape_artist',
				value: 'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.'
			}
		]
	},
	{
		id: 'gnome_magnified_vision',
		name: 'Magnified Vision',
		description:
			'You have ADV on Investigation Checks made on something you are holding or touching.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'magnified_vision',
				value: 'You have ADV on Investigation Checks on things you are holding or touching.'
			}
		]
	},
	{
		id: 'gnome_mental_clarity',
		name: 'Mental Clarity',
		description: 'You have ADV on Saves against being Dazed or Stunned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Dazed', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Stunned', value: 'ADV' }
		]
	},
	{
		id: 'gnome_strong_minded',
		name: 'Strong-Minded',
		description: 'You gain Psychic Resistance (1).',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Psychic', value: 1 }]
	},
	{
		id: 'gnome_predict_weather',
		name: 'Predict Weather',
		description:
			'You can naturally tell what the weather is going to be in the next hour in the area within 1 mile of you. You do not have DisADV on Checks or Saves as a result of naturally occurring weather.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'predict_weather',
				value:
					'You can predict weather within 1 mile for the next hour and ignore DisADV from natural weather.'
			}
		]
	},
	{
		id: 'gnome_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }]
	},
	{
		id: 'gnome_trapper',
		name: 'Trapper',
		description:
			'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'trapper',
				value:
					'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.'
			}
		]
	},
	{
		id: 'gnome_lightning_insulation',
		name: 'Lightning Insulation',
		description: 'You have Lightning Resistance (Half) and cannot be struck by natural lightning.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Lightning', value: 'half' },
			{
				type: 'GRANT_ABILITY',
				target: 'lightning_insulation',
				value: "You can't be struck by natural lightning."
			}
		]
	},
	{
		id: 'gnome_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1,
				options: [
					'alchemy',
					'blacksmithing',
					'brewing',
					'calligraphy',
					'carpentry',
					'cartography',
					'cobbling',
					'cooking',
					'disguise',
					'forgery',
					'herbalism',
					'jeweler',
					'leatherworking',
					'masonry',
					'painting',
					'poisoner',
					'pottery',
					'sculpting',
					'smithing',
					'tailoring',
					'thieves',
					'woodcarving'
				]
			}
		]
	},
	// Orc Traits (p. 110)
	{
		id: 'orc_cursed_mind',
		name: 'Cursed Mind',
		description: 'You gain Psychic Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Psychic', value: 1 }]
	},
	{
		id: 'orc_rush',
		name: 'Orc Rush',
		description:
			'Once per Combat when you willingly move toward an enemy, you can spend 1 AP to gain Temp HP equal to your Prime Modifier.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'orc_rush',
				value:
					'Once per Combat: spend 1 AP to gain Temp HP equal to Prime Modifier when moving toward enemy.'
			}
		]
	},
	{
		id: 'orc_brutal_strikes',
		name: 'Brutal Strikes',
		description:
			'You deal +1 damage when you score a Brutal or Critical Hit with a Melee Weapon or Unarmed Strike.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'brutal_strikes',
				value: '+1 damage on Brutal or Critical Hits with Melee Attacks.'
			}
		]
	},
	{
		id: 'orc_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]
	},
	{
		id: 'orc_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: -1 }]
	},
	// Dragonborn Traits (p. 111)
	{
		id: 'dragonborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }]
	},
	{
		id: 'dragonborn_draconic_resistance',
		name: 'Draconic Resistance',
		description: 'You gain Resistance (Half) to your Draconic damage type.',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Draconic_damage_type', value: 'half' }]
	},
	{
		id: 'dragonborn_draconic_breath_weapon',
		name: 'Draconic Breath Weapon',
		description:
			'You gain a Breath Weapon that you can use by spending 2 AP. You can use this ability once per Long Rest, and regain the ability when you roll for Initiative.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'draconic_breath',
				value: 'Breath Weapon: 2 AP, once per Long Rest, regain on Initiative.'
			}
		]
	},
	{
		id: 'dragonborn_thick_skinned',
		name: 'Thick-Skinned',
		description: "While you aren't wearing Armor, you gain +1 AD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	// Giantborn Traits (p. 112)
	{
		id: 'giantborn_giant_blood',
		name: 'Giant Blood',
		description: 'Your Size is considered Large.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'large_size', value: 'Your Size is considered Large.' }
		]
	},
	{
		id: 'giantborn_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]
	},
	{
		id: 'giantborn_throw_ally',
		name: 'Throw Ally',
		description: 'You can throw willing allies as a Combat Action.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'throw_ally',
				value: 'You can throw willing allies as a Combat Action.'
			}
		]
	},
	{
		id: 'giantborn_clumsy',
		name: 'Clumsy',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: -1 }]
	},
	// Angelborn Traits (p. 113)
	{
		id: 'angelborn_divine_resistance',
		name: 'Divine Resistance',
		description: 'You have Holy Resistance (Half).',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Holy', value: 'half' }]
	},
	{
		id: 'angelborn_healing_hands',
		name: 'Healing Hands',
		description:
			'Once per Long Rest, you can touch a creature to heal them for 1d4 + your Prime Modifier HP.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'healing_hands',
				value: 'Once per Long Rest: heal 1d4 + Prime Modifier HP by touch.'
			}
		]
	},
	{
		id: 'angelborn_light_sensitivity',
		name: 'Light Sensitivity',
		description: 'While in bright light, you have DisADV on Attack Checks.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'light_sensitivity',
				value: 'DisADV on Attack Checks in bright light.'
			}
		]
	},
	// Fiendborn Traits (p. 114)
	{
		id: 'fiendborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }]
	},
	{
		id: 'fiendborn_hellish_resistance',
		name: 'Hellish Resistance',
		description: 'You have Fire Resistance (Half).',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' }]
	},
	{
		id: 'fiendborn_infernal_legacy',
		name: 'Infernal Legacy',
		description: 'You know one Cantrip from the Fiendborn Ancestry Spells.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_SPELL',
				target: 'fiendborn_cantrip',
				value: 'One Cantrip from Fiendborn Ancestry Spells.'
			}
		]
	},
	{
		id: 'fiendborn_holy_vulnerability',
		name: 'Holy Vulnerability',
		description: 'You have Holy Vulnerability (1).',
		cost: -2,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Holy', value: 1 }]
	},
	// Beastborn Traits (p. 115)
	{
		id: 'beastborn_keen_senses',
		name: 'Keen Senses',
		description: 'You have ADV on Awareness Checks that rely on hearing or smell.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'keen_senses',
				value: 'ADV on Awareness Checks using hearing or smell.'
			}
		]
	},
	{
		id: 'beastborn_natural_weapon',
		name: 'Natural Weapon',
		description:
			'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'natural_weapon',
				value: '2 Natural Weapons for Unarmed Strikes (1 damage, chosen type).'
			}
		]
	},
	{
		id: 'beastborn_thick_hide',
		name: 'Thick Hide',
		description: "While you aren't wearing Armor, you gain +1 AD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_wild_mind',
		name: 'Wild Mind',
		description: 'You have DisADV on Intelligence-based Checks.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'wild_mind', value: 'DisADV on Intelligence-based Checks.' }
		]
	},
	// Angelborn Traits
	{
		id: 'angelborn_radiant_resistance',
		name: 'Radiant Resistance',
		description: 'You have Resistance (Half) to Radiant damage.',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Radiant', value: 'half' }]
	},
	{
		id: 'angelborn_celestial_magic',
		name: 'Celestial Magic',
		description:
			"You learn 1 Spell of your choice from the Divine Spell List (Holy & Restoration during the Beta). Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can't exceed your Mana Spend Limit.",
		cost: 2,
		effects: [
			{ type: 'GRANT_SPELL', target: 'Divine_Spell_List', value: 1 },
			{
				type: 'GRANT_ABILITY',
				target: 'reduced_mp_cost',
				value: 'Once per Long Rest, cast chosen spell for 1 less MP (minimum 0).'
			}
		]
	},
	{
		id: 'angelborn_healing_touch',
		name: 'Healing Touch',
		description:
			'Once per Combat, you can spend 1 AP to touch a creature and Heal it. Make a DC 10 Spell Check. Success: You can restore up to 2 HP to the target. Success (each 5): +1 HP. Failure: You only restore 2 HP.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'healing_touch',
				value: 'Once per Combat, 1 AP: Touch heal (DC 10 Spell Check), 2+ HP restored.'
			}
		]
	},
	{
		id: 'angelborn_divine_glow',
		name: 'Divine Glow',
		description: 'Your body can emit a Bright Light in a 5 Space radius around you at will.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'divine_glow',
				value: 'Emit Bright Light in 5 Space radius at will.'
			}
		]
	},
	{
		id: 'angelborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }]
	},
	{
		id: 'angelborn_celestial_clarity',
		name: 'Celestial Clarity',
		description: 'You have ADV on Saves against being Blinded or Deafened.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Blinded', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Deafened', value: 'ADV' }
		]
	},
	{
		id: 'angelborn_angelic_insight',
		name: 'Angelic Insight',
		description:
			'Once per Long Rest you can grant yourself ADV on an Insight Check to see if someone is lying.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'angelic_insight',
				value: 'Once per Long Rest: ADV on Insight Check to detect lies.'
			}
		]
	},
	{
		id: 'angelborn_gift_of_the_angels',
		name: 'Gift of the Angels',
		description:
			'Once per Combat you can spend 1 AP and 1 MP and touch a creature to heal them over time. The creature recovers 1 HP at the start of each of their turns for 1 minute (5 Rounds).',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'gift_of_angels',
				value: 'Once per Combat, 1 AP + 1 MP: Touch heal over time (1 HP/turn for 5 rounds).'
			}
		]
	},
	{
		id: 'angelborn_blinding_light',
		name: 'Blinding Light',
		description:
			'Once per Combat, you can spend 1 AP to choose a creature within 5 Spaces and make a Spell Check contested by its Physical Save. Success: The target is Blinded until the end of your next turn.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'blinding_light',
				value:
					'Once per Combat, 1 AP: Spell Check vs Physical Save to Blind target (5 Spaces, until end of next turn).'
			}
		]
	},
	{
		id: 'angelborn_glide_speed',
		name: 'Glide Speed',
		description:
			"You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren't Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.",
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }]
	},
	{
		id: 'angelborn_pacifist',
		name: 'Pacifist',
		description:
			'Your divine call is to put others before yourself and resist doing harm. You suffer a -1 penalty to all Checks and Saves made during the first round of Combat.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'pacifist',
				value: '-1 penalty to all Checks and Saves during first round of Combat.'
			}
		]
	},
	{
		id: 'angelborn_umbral_weakness',
		name: 'Umbral Weakness',
		description: 'You have Umbral Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Umbral', value: 1 }]
	},
	// Dwarf Traits
	{
		id: 'dwarf_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Crafting or Services Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1,
				options: [
					'alchemy',
					'blacksmithing',
					'brewing',
					'calligraphy',
					'carpentry',
					'cartography',
					'cobbling',
					'cooking',
					'herbalism',
					'jeweler',
					'leatherworking',
					'masonry',
					'painting',
					'pottery',
					'sculpting',
					'smithing',
					'tailoring',
					'woodcarving',
					'music',
					'navigation',
					'vehicles_land',
					'vehicles_water'
				]
			}
		]
	},
	// Gnome Traits
	{
		id: 'gnome_agility_attribute_decrease',
		name: 'Agility Decrease',
		description: 'You decrease your Agility by 1 (to a minimum of -2).**',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }]
	},
	{
		id: 'gnome_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]
	},
	{
		id: 'gnome_storm_knowledge',
		name: 'Storm Knowledge',
		description:
			'While within rainy, snowy, or stormy environments, you have ADV on Survival Checks. Additionally, you have ADV on Knowledge Checks made to recall information about rain, snow, and storms.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Survival', value: 'rainy_snowy_stormy_environments' },
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Knowledge', value: 'rain_snow_storms_information' }
		]
	},
	// Orc Traits
	{
		id: 'orc_already_cursed',
		name: 'Already Cursed',
		description: 'You have ADV on Saves against Curses.',
		cost: 0,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Curses', value: 'ADV' }]
	},
	{
		id: 'orc_dash',
		name: 'Orc Dash',
		description:
			'Once per Combat you can use your Minor Action to move, as long as that movement is towards an enemy.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'orc_dash',
				value: 'Once per Combat: Use Minor Action to move toward enemy.'
			}
		]
	},
	{
		id: 'orc_finishing_blow',
		name: 'Finishing Blow',
		description: 'You deal +1 damage to creatures who are Well-Bloodied.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'finishing_blow',
				value: '+1 damage to Well-Bloodied creatures.'
			}
		]
	},
	{
		id: 'orc_imposing_presence',
		name: 'Imposing Presence',
		description:
			'Once per Combat when a creature makes an Attack against you, you can force them to make a Charisma Save. Save Failure: They must choose a new target for the Attack. If there are no other targets, then the Attack is wasted.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'imposing_presence',
				value: 'Once per Combat: Force attacker to retarget (Charisma Save).'
			}
		]
	},
	{
		id: 'orc_intimidating_shout',
		name: 'Intimidating Shout',
		description:
			'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'intimidating_shout',
				value: 'Once per Combat, 1 AP: AoE Hinder effect (5 Spaces, Charisma Save vs Attack Check).'
			}
		]
	},
	{
		id: 'orc_orcish_resolve',
		name: 'Orcish Resolve',
		description: "You gain 1 additional AP while on Death's Door.",
		cost: 1,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'orcish_resolve', value: "+1 AP while on Death's Door." }
		]
	},
	{
		id: 'orc_provocation',
		name: 'Provocation',
		description: 'You have DisADV on Checks and Saves against being Taunted.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'provocation',
				value: 'DisADV on Checks and Saves vs Taunted.'
			}
		]
	},
	// Dragonborn Traits
	{
		id: 'dragonborn_concussive_breath',
		name: 'Concussive Breath',
		description:
			'When you use your Draconic Breath Weapon, you can force all targets to make a Physical Save. Save Failure: The target is pushed 1 Space away +1 additional Space for every 5 it fails its Save by.',
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'concussive_breath',
				value: 'Draconic Breath pushes targets (Physical Save, 1+ Spaces).'
			}
		]
	},
	{
		id: 'dragonborn_draconic_affinity',
		name: 'Draconic Affinity',
		description:
			'When you take damage of the same type as your Draconic damage, your next Draconic Breath Weapon deals +1 bonus damage.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'draconic_affinity',
				value: '+1 damage on next Draconic Breath when taking same damage type.'
			}
		]
	},
	{
		id: 'dragonborn_draconic_protection',
		name: 'Draconic Protection',
		description:
			"Once per Combat, when an ally within 20 Spaces is on Death's Door, you begin to surge with an ancient power. While they remain on Death's Door their PD and AD increases by 5 until Combat ends.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'draconic_protection',
				value: "Once per Combat: +5 PD/AD to ally on Death's Door (20 Spaces)."
			}
		]
	},
	{
		id: 'dragonborn_draconic_ward',
		name: 'Draconic Ward',
		description:
			"Once per Combat when you enter Death's Door, you gain 2 Temp HP. Whenever you're Hit by a Melee Attack while you have this Temp HP, your Attacker takes 1 Draconic damage.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'draconic_ward',
				value: "Death's Door: +2 Temp HP, attackers take 1 Draconic damage."
			}
		]
	},
	{
		id: 'dragonborn_dying_breath',
		name: 'Dying Breath',
		description:
			"Once per Combat when you enter Death's Door, you regain a use of your Draconic Breath Weapon and can immediately use it as a Reaction for free (0 AP).",
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'dying_breath',
				value: "Death's Door: Regain and use Draconic Breath as Reaction (0 AP)."
			}
		]
	},
	{
		id: 'dragonborn_glide_speed',
		name: 'Glide Speed',
		description:
			"You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren't Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.",
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }]
	},
	{
		id: 'dragonborn_guardians_bond',
		name: "Guardian's Bond",
		description:
			"Once per Combat when an ally enters Death's Door within 20 Spaces of you, you take an amount of True damage equal to your Prime Modifier.",
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'guardians_bond',
				value: "Take True damage (Prime Modifier) when ally enters Death's Door."
			}
		]
	},
	{
		id: 'dragonborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mp', value: 1 }]
	},
	{
		id: 'dragonborn_reptilian_superiority',
		name: 'Reptilian Superiority',
		description:
			'You have ADV on Intimidation Checks against reptilian creatures of Medium Size and smaller (not including other Dragonborn).',
		cost: 0,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Intimidation', value: 'vs_reptilian_medium_small' }
		]
	},
	{
		id: 'dragonborn_second_breath',
		name: 'Second Breath',
		description:
			'You can now use your Draconic Breath Weapon twice per Combat. Additionally, whenever you use your Draconic Breath Weapon, you can spend 2 uses to increase the damage by 2 if its an Area, or by 4 if its Focused.',
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'second_breath',
				value: 'Draconic Breath twice per Combat, enhanced damage option.'
			}
		]
	},
	// Fiendborn Traits
	{
		id: 'fiendborn_charming_gaze',
		name: 'Charming Gaze',
		description:
			"You can spend 1 AP to gaze upon a creature you can see within 10 Spaces that can also see you. Make a Spell Check contested by the target's Repeated Charisma Save. Success: The creature becomes Charmed by you for 1 minute. You can use this ability once per Long Rest, and when you roll for Initiative, or meet some other unique criteria at the GM's discretion, this ability recharges.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'charming_gaze',
				value:
					'Once per Long Rest, 1 AP: Charm target (Spell Check vs Charisma Save, 10 Spaces, 1 minute).'
			}
		]
	},
	{
		id: 'fiendborn_divine_dampening',
		name: 'Divine Dampening',
		description: 'You recover 1 less HP when healed from divine sources.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'divine_dampening',
				value: '-1 HP from divine healing sources.'
			}
		]
	},
	{
		id: 'fiendborn_fiendish_aura',
		name: 'Fiendish Aura',
		description:
			"You learn the Sorcery Cantrip, but you must choose the type of energy that's the same as your Fiendish Origin.",
		cost: 1,
		effects: [
			{ type: 'GRANT_CANTRIP', target: 'Sorcery', value: 1 },
			{
				type: 'GRANT_ABILITY',
				target: 'sorcery_energy_type',
				value: 'Must match Fiendish Origin energy type.'
			}
		]
	},
	{
		id: 'fiendborn_fiendish_magic',
		name: 'Fiendish Magic',
		description:
			"You learn 1 Spell of your choice from the Arcane Spell List from the Destruction or Enchantment Spell Schools. If the Spell deals damage, it must be the same damage type as your Fiendish damage. Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can't exceed your Mana Spend Limit.",
		cost: 2,
		effects: [
			{ type: 'GRANT_SPELL', target: 'Arcane_Destruction_Enchantment', value: 1 },
			{
				type: 'GRANT_ABILITY',
				target: 'reduced_mp_cost',
				value: 'Once per Long Rest, cast chosen spell for 1 less MP (minimum 0).'
			}
		]
	},
	{
		id: 'fiendborn_fiendish_resistance',
		name: 'Fiendish Resistance',
		description: 'You gain Resistance (Half) to your Fiendish damage type.',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Fiendish_damage_type', value: 'half' }]
	},
	{
		id: 'fiendborn_glide_speed',
		name: 'Glide Speed',
		description:
			"You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren't Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.",
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }]
	},
	{
		id: 'fiendborn_infernal_bravery',
		name: 'Infernal Bravery',
		description: 'You have ADV on Saves against being Intimidated.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Intimidated', value: 'ADV' }]
	},
	{
		id: 'fiendborn_intimidator',
		name: 'Intimidator',
		description: 'Once per Combat you can take the Intimidate Action as a Minor Action.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'intimidator',
				value: 'Once per Combat: Intimidate as Minor Action.'
			}
		]
	},
	{
		id: 'fiendborn_lights_bane',
		name: "Light's Bane",
		description: 'You can spend 1 AP to snuff out a mundane light source within 5 Spaces of you.',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'lights_bane',
				value: '1 AP: Snuff out mundane light source (5 Spaces).'
			}
		]
	},
	{
		id: 'fiendborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mp', value: 1 }]
	},
	{
		id: 'fiendborn_radiant_weakness',
		name: 'Radiant Weakness',
		description: 'You have Radiant Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Radiant', value: 1 }]
	},
	{
		id: 'fiendborn_silver_tongued',
		name: 'Silver-Tongued',
		description:
			'Once per Long Rest you can grant yourself ADV on an Influence Check when trying to deceive someone.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'silver_tongued',
				value: 'Once per Long Rest: ADV on Influence Check to deceive.'
			}
		]
	},
	{
		id: 'fiendborn_superior_darkvision',
		name: 'Superior Darkvision',
		description: 'Your Darkvision increases to 20 Spaces.',
		cost: 1,
		prerequisites: ['fiendborn_darkvision'],
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 20 }]
	},
	// Giantborn Traits
	{
		id: 'giantborn_brute',
		name: 'Brute',
		description: 'Once per Combat, you can take the Shove or Grapple Action as a Minor Action.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'brute',
				value: 'Once per Combat: Shove or Grapple as Minor Action.'
			}
		]
	},
	{
		id: 'giantborn_clumsiness',
		name: 'Clumsiness',
		description: 'You have DisADV on Agility Checks.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'clumsiness', value: 'DisADV on Agility Checks.' }]
	},
	{
		id: 'giantborn_giants_fortitude',
		name: "Giant's Fortitude",
		description: "You also gain the benefits of your Giant's Resolve Trait while Well-Bloodied.",
		cost: 2,
		prerequisites: ['giantborn_giants_resolve'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'giants_fortitude',
				value: "Giant's Resolve benefits also apply while Well-Bloodied."
			}
		]
	},
	{
		id: 'giantborn_giants_resolve',
		name: "Giant's Resolve",
		description: "While on Death's Door, you reduce all damage taken by 1.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'giants_resolve',
				value: "Reduce all damage by 1 while on Death's Door."
			}
		]
	},
	{
		id: 'giantborn_heavy_riser',
		name: 'Heavy Riser',
		description: 'You have to spend 4 Spaces of movement to stand up from Prone.',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'heavy_riser',
				value: '4 Spaces of movement to stand up from Prone.'
			}
		]
	},
	{
		id: 'giantborn_intelligence_attribute_decrease',
		name: 'Intelligence Decrease',
		description: 'You decrease your Intelligence by 1 (to a minimum of -2).**',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }]
	},
	{
		id: 'giantborn_mighty_hurl',
		name: 'Mighty Hurl',
		description:
			'You throw creatures 1 Space farther than normal, and objects (including Weapons) 5 Spaces farther than normal.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'mighty_hurl',
				value: 'Throw creatures +1 Space, objects +5 Spaces farther.'
			}
		]
	},
	{
		id: 'giantborn_mighty_leap',
		name: 'Mighty Leap',
		description:
			'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'mighty_leap',
				value: 'Use Might for Jump Distance and Falling damage.'
			}
		]
	},
	{
		id: 'giantborn_powerful_build',
		name: 'Powerful Build',
		description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'powerful_build',
				value: '+1 Size but occupy 1 Size smaller space.'
			}
		]
	},
	{
		id: 'giantborn_strong_body',
		name: 'Strong Body',
		description:
			'Once per Combat when you take damage from an Attack, you can reduce the damage taken by an amount equal to your Might or Agility (your choice).',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'strong_body',
				value: 'Once per Combat: Reduce damage by Might or Agility.'
			}
		]
	},
	{
		id: 'giantborn_titanic_toss',
		name: 'Titanic Toss',
		description:
			"You have ADV on Checks made to throw creatures. Additionally, you don't have DisADV as a result of making an Attack with a Weapon with the Toss or Thrown Property at Long Range.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'titanic_toss',
				value: 'ADV on throwing creatures, no DisADV for long-range thrown weapons.'
			}
		]
	},
	{
		id: 'giantborn_unstoppable',
		name: 'Unstoppable',
		description: 'You have ADV on Saves against being Slowed or Stunned.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Slowed', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Stunned', value: 'ADV' }
		]
	},
	{
		id: 'giantborn_unyielding_movement',
		name: 'Unyielding Movement',
		description: "You're immune to being Slowed 2 (or higher).",
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'unyielding_movement',
				value: 'Immune to Slowed 2 or higher.'
			}
		]
	},
	// Beastborn Traits (Essential Selection)
	{
		id: 'beastborn_burrow_speed',
		name: 'Burrow Speed',
		description: 'You gain a Burrow Speed equal to half your Movement Speed.',
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'burrow', value: 'half_speed' }]
	},
	{
		id: 'beastborn_camouflage',
		name: 'Camouflage',
		description:
			'You can change the color and pattern of your body. You have ADV on Stealth Checks while motionless.',
		cost: 2,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Stealth', value: 'while_motionless' }]
	},
	{
		id: 'beastborn_charge',
		name: 'Charge',
		description:
			'If you move at least 2 Spaces in a straight line before making a Melee Attack, the damage of the Attack increases by 1.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'charge',
				value: '+1 damage on Melee Attack after moving 2+ Spaces straight.'
			}
		]
	},
	{
		id: 'beastborn_climb_speed',
		name: 'Climb Speed',
		description: 'You gain a Climb Speed equal to your Ground Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }]
	},
	{
		id: 'beastborn_cold_resistance',
		name: 'Cold Resistance',
		description:
			'You have Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Cold', value: 'half' },
			{
				type: 'GRANT_ABILITY',
				target: 'cold_exhaustion_resistance',
				value: 'Resistance to cold temperature Exhaustion.'
			}
		]
	},
	{
		id: 'beastborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }]
	},
	{
		id: 'beastborn_echolocation',
		name: 'Echolocation',
		description:
			'You can spend 1 AP to roar, scream, or screech to gain Blindsight in a 10 Spaces radius that lasts until the start of your next turn. The sound can be heard from up to 100 Spaces away. You gain no benefit from this Trait in an area of Silence.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'echolocation',
				value: '1 AP: Blindsight 10 Spaces until next turn (100 Spaces audible).'
			}
		]
	},
	{
		id: 'beastborn_natural_weapon',
		name: 'Natural Weapon',
		description:
			'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'natural_weapon',
				value: '2 Natural Weapons for Unarmed Strikes (1 damage, chosen type).'
			}
		]
	},
	{
		id: 'beastborn_swim_speed',
		name: 'Swim Speed',
		description: 'You gain a Swim Speed equal to your Ground Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'swim', value: 'equal_to_speed' }]
	},
	{
		id: 'beastborn_fire_resistance',
		name: 'Fire Resistance',
		description:
			'You have Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Fire', value: 'half' },
			{
				type: 'GRANT_ABILITY',
				target: 'heat_exhaustion_resistance',
				value: 'Resistance to hot temperature Exhaustion.'
			}
		]
	},
	{
		id: 'beastborn_natural_armor',
		name: 'Natural Armor',
		description: "While you aren't wearing Armor, you gain +1 AD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_keen_sense',
		name: 'Keen Sense',
		description:
			'Choose 1 of the following senses: hearing, sight, or smell. You make Awareness Checks with ADV using the chosen sense.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECK',
				target: 'Awareness',
				value: 'chosen_sense'
			}
		]
	},
	{
		id: 'beastborn_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'small_sized', value: 'Size is considered Small.' }]
	},
	{
		id: 'beastborn_sunlight_sensitivity',
		name: 'Sunlight Sensitivity',
		description:
			'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
		cost: -2,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'sunlight_sensitivity',
				value: 'DisADV on Attacks and sight-based Awareness in sunlight.'
			}
		]
	},
	{
		id: 'beastborn_speed_increase',
		name: 'Speed Increase',
		description: 'Your Speed increases by 1 Space.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 }]
	},
	// Additional Beastborn Traits (Part 1)
	{
		id: 'beastborn_extended_natural_weapon',
		name: 'Extended Natural Weapon',
		description: 'Your Natural Weapon now has the Reach Property.',
		cost: 2,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'extended_natural_weapon',
				value: 'Natural Weapon gains Reach Property.'
			}
		]
	},
	{
		id: 'beastborn_fast_reflexes',
		name: 'Fast Reflexes',
		description:
			'You gain ADV on Initiative Checks and on the first Attack Check you make in Combat.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Initiative', value: 'ADV' },
			{
				type: 'GRANT_ABILITY',
				target: 'first_attack_adv',
				value: 'ADV on first Attack Check in Combat.'
			}
		]
	},
	{
		id: 'beastborn_flyby',
		name: 'Flyby',
		description: "You don't provoke Opportunity Attacks when you Fly out of an enemy's reach.",
		cost: 1,
		prerequisites: ['beastborn_limited_flight'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'flyby',
				value: 'No Opportunity Attacks when flying out of reach.'
			}
		]
	},
	{
		id: 'beastborn_full_flight',
		name: 'Full Flight',
		description: 'You have a Fly Speed equal to your Ground Speed.',
		cost: 2,
		prerequisites: ['beastborn_limited_flight'],
		effects: [{ type: 'GRANT_MOVEMENT', target: 'fly', value: 'equal_to_speed' }]
	},
	{
		id: 'beastborn_glide_speed',
		name: 'Glide Speed',
		description:
			"You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren't Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.",
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'glide', value: 'wings' }]
	},
	{
		id: 'beastborn_hard_shell',
		name: 'Hard Shell',
		description:
			"You have a large shell around your body for protection. Your AD increases by 1 (while you're not wearing Armor), your Movement Speed decreases by 1, and you're immune to being Flanked.",
		cost: 1,
		prerequisites: ['beastborn_thick_skinned'],
		effects: [
			{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' },
			{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 },
			{ type: 'GRANT_ABILITY', target: 'immune_flanking', value: 'Immune to being Flanked.' }
		]
	},
	{
		id: 'beastborn_hazardous_hide',
		name: 'Hazardous Hide',
		description:
			'You have spikes, retractable barbs, poisonous skin, or some other form of defense mechanism to keep creatures from touching you. Choose 1 of the following damage types: Corrosion, Piercing, or Poison. While you are physically Grappled, your Grappler takes 1 damage of the chosen type at the start of each of its turns. Creatures that start their turn Grappled by you also take this damage.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'hazardous_hide',
				value: 'Grapplers take 1 damage (chosen type) per turn.'
			}
		]
	},
	{
		id: 'beastborn_intimidating_shout',
		name: 'Intimidating Shout',
		description:
			'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'intimidating_shout',
				value: 'Once per Combat, 1 AP: AoE Hinder effect (5 Spaces).'
			}
		]
	},
	// Additional Beastborn Traits (Part 2)
	{
		id: 'beastborn_jumper',
		name: 'Jumper',
		description:
			'Your Jump Distance increases by 2, and you can take the Jump Action as a Minor Action.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'increased_jump', value: 'Jump Distance +2.' },
			{ type: 'GRANT_ABILITY', target: 'jump_minor_action', value: 'Jump Action as Minor Action.' }
		]
	},
	{
		id: 'beastborn_limited_flight',
		name: 'Limited Flight',
		description:
			"You have a set of wings that grant you limited flight. Provided you aren't Incapacitated, you gain the following benefits: Vertical Ascent: You can spend 2 Spaces of movement to ascend 1 Space vertically. Hover: When you end your turn in the air, you maintain your altitude.",
		cost: 2,
		prerequisites: ['beastborn_glide_speed'],
		effects: [{ type: 'GRANT_MOVEMENT', target: 'limited_flight', value: 'vertical_ascent_hover' }]
	},
	{
		id: 'beastborn_long_limbed',
		name: 'Long-Limbed',
		description: 'When you make a Melee Martial Attack, your reach is 1 Space greater than normal.',
		cost: 3,
		effects: [{ type: 'GRANT_ABILITY', target: 'long_limbed', value: 'Melee reach +1 Space.' }]
	},
	{
		id: 'beastborn_mimicry',
		name: 'Mimicry',
		description:
			"You can mimic simple sounds that you've heard (such as a baby's crying, the creak of a door, or single words) and repeat short 3 word phrases that sound identical to what you heard. A creature can make an Insight Check contested by your Trickery Check to determine if this sound is real.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'mimicry',
				value: 'Mimic simple sounds and 3-word phrases (Trickery vs Insight).'
			}
		]
	},
	{
		id: 'beastborn_natural_projectile',
		name: 'Natural Projectile',
		description:
			'You can use your Natural Weapon to make a Ranged Martial Attack with a Range of 10 Spaces. The Natural Weapon might produce a spine, barb, fluid, or other harmful projectile (your choice).',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'natural_projectile',
				value: 'Natural Weapon ranged attack (10 Spaces).'
			}
		]
	},
	{
		id: 'beastborn_natural_weapon_passive',
		name: 'Natural Weapon Passive',
		description:
			"You can choose 1 Weapon Style that fits your desired Natural Weapon. You can benefit from the chosen Weapon Style's passive with your Natural Weapon.",
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'weapon_style_passive',
				value: 'Natural Weapon gains chosen Weapon Style passive.'
			}
		]
	},
	{
		id: 'beastborn_powerful_build',
		name: 'Powerful Build',
		description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'powerful_build',
				value: '+1 Size but occupy smaller space.'
			}
		]
	},
	{
		id: 'beastborn_prehensile_appendage',
		name: 'Prehensile Appendage',
		description:
			"You have a prehensile tail or trunk that has a reach of 1 Space and can lift up an amount of pounds equal to your Might times 5 (or half as many kilograms). You can use it to lift, hold, or drop objects, and to push, pull, or grapple creatures. It can't wield Weapons or Shields, you can't use tools with it that require manual precision, and you can't use it in place of Somatic Components for Spells.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'prehensile_appendage',
				value: 'Prehensile tail/trunk (1 Space reach, Might×5 lbs capacity).'
			}
		]
	},
	// Additional Beastborn Traits (Part 3 - Final)
	{
		id: 'beastborn_prowler',
		name: 'Prowler',
		description: 'You have ADV on Stealth Checks while in Darkness.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Stealth', value: 'while_in_darkness' }]
	},
	{
		id: 'beastborn_quick_reactions',
		name: 'Quick Reactions',
		description: "While you aren't wearing Armor, you gain +1 PD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: -1 }]
	},
	{
		id: 'beastborn_rend',
		name: 'Rend',
		description:
			'You can spend 1 AP when making an Attack Check with your Natural Weapon to force the target to make a Physical Save. Failure: Target begins Bleeding.',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'rend',
				value: '1 AP: Natural Weapon causes Bleeding (Physical Save).'
			}
		]
	},
	{
		id: 'beastborn_retractable_natural_weapon',
		name: 'Retractable Natural Weapon',
		description:
			'Your Natural Weapon is able to be concealed or retracted and gains the Concealable Property (gain ADV on the first Attack Check you make in Combat).',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'retractable_weapon',
				value: 'Natural Weapon gains Concealable Property.'
			}
		]
	},
	{
		id: 'beastborn_secondary_arms',
		name: 'Secondary Arms',
		description:
			"You have 2 slightly smaller secondary arms below your primary pair of arms. They function just like your primary arms, but they can't wield Weapons with the Heavy Property or Shields.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'secondary_arms',
				value: '2 secondary arms (no Heavy weapons or Shields).'
			}
		]
	},
	{
		id: 'beastborn_spider_climb',
		name: 'Spider Climb',
		description:
			'You can walk without falling on the ceiling and vertical surfaces normally without needing to Climb.',
		cost: 1,
		prerequisites: ['beastborn_climb_speed'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'spider_climb',
				value: 'Walk on vertical surfaces and ceilings.'
			}
		]
	},
	{
		id: 'beastborn_sprint',
		name: 'Sprint',
		description:
			"You can use your Minor Action to take the Move Action. Once you use this Trait, you can't use it again until you take a turn without taking the Move Action.",
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'sprint',
				value: 'Move Action as Minor Action (cooldown: no Move Action).'
			}
		]
	},
	{
		id: 'beastborn_thick_skinned',
		name: 'Thick-Skinned',
		description: "While you aren't wearing Armor, you gain +1 AD.",
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 2.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hp', value: 2 }]
	},
	{
		id: 'beastborn_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: 'ADV' }
		]
	},
	{
		id: 'beastborn_venomous_natural_weapon',
		name: 'Venomous Natural Weapon',
		description:
			'You can spend 1 AP when making an Attack Check with your Natural Weapon to force the target to make a Physical Save. Failure: Target becomes Poisoned for 1 minute.',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'venomous_weapon',
				value: '1 AP: Natural Weapon causes Poisoned (Physical Save, 1 minute).'
			}
		]
	},
	{
		id: 'beastborn_water_breathing',
		name: 'Water Breathing',
		description: 'You can breathe both air and water.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'water_breathing', value: 'Breathe air and water.' }]
	},
	{
		id: 'beastborn_web_walk',
		name: 'Web Walk',
		description: 'You ignore movement restrictions caused by webs.',
		cost: 0,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'web_walk', value: 'Ignore web movement restrictions.' }
		]
	},
	{
		id: 'beastborn_winged_arms',
		name: 'Winged Arms',
		description:
			"Your arms are replaced by wings. You can't hold items with your hands while using your wings for flight.",
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'winged_arms',
				value: "Arms are wings (can't hold items while flying)."
			}
		]
	},
	{
		id: 'beastborn_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -1 }]
	},
	// Test Traits
	{
		id: 'test_test_hp',
		name: 'Tasty HP',
		description:
			'A powerful test trait that modifies an attribute, all stats, and grants an ability.',
		cost: 5,
		effects: [
			{
				type: 'MODIFY_ATTRIBUTE',
				target: 'any_attribute',
				value: 3,
				userChoice: { prompt: 'Choose an attribute to increase by 3' }
			},
			{ type: 'MODIFY_STAT', target: 'hpMax', value: 10 },
			{ type: 'MODIFY_STAT', target: 'spMax', value: 10 },
			{ type: 'MODIFY_STAT', target: 'mpMax', value: 10 },
			{ type: 'MODIFY_STAT', target: 'pd', value: 10 },
			{ type: 'MODIFY_STAT', target: 'ad', value: 10 },
			{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 10 },
			{ type: 'MODIFY_STAT', target: 'jumpDistance', value: 10 },
			{ type: 'MODIFY_STAT', target: 'skillPoints', value: 10 },
			{ type: 'MODIFY_STAT', target: 'tradePoints', value: 10 },
			{ type: 'MODIFY_STAT', target: 'languagePoints', value: 10 },
			{
				type: 'GRANT_ABILITY',
				target: 'Test',
				value: 'You are a test subject never meant to be in the wild.'
			}
		]
	},
	// --- Gremlin Traits ---
	{
		id: 'gremlin_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'Small-Sized', value: 'Your Size is considered Small.' }
		]
	},
	{
		id: 'gremlin_sneaky',
		name: 'Sneaky',
		description: 'You can Hide while only Partially Concealed or behind 1/2 Cover.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Sneaky',
				value: 'You can Hide while only Partially Concealed or behind 1/2 Cover.'
			}
		]
	},
	{
		id: 'gremlin_thriller',
		name: 'Thriller',
		description:
			'Once per Round, when a hostile creature within 5 Spaces becomes Intimidated, Frightened, or Terrified, you gain ADV on the next Check or Save you make.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Thriller',
				value:
					'Once per Round, when a hostile creature within 5 Spaces becomes Intimidated, Frightened, or Terrified, you gain ADV on the next Check or Save you make.'
			}
		]
	},
	{
		id: 'gremlin_surprise',
		name: 'Surprise!',
		description:
			"You have ADV on Checks to impose Fear conditions on creatures you're Hidden from.",
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Impose_Fear_Conditions_while_Hidden', value: 'ADV' }
		]
	},
	{
		id: 'gremlin_deft_footwork',
		name: 'Deft Footwork',
		description:
			'You can move through the space of a hostile creature 1 size larger than you as Difficult Terrain.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Deft Footwork',
				value:
					'You can move through the space of a hostile creature 1 size larger than you as Difficult Terrain.'
			}
		]
	},
	{
		id: 'gremlin_halfling_disguise',
		name: 'Halfling Disguise',
		description:
			'You can spend 1 AP to change appearance to look like a Halfling (reverts under stress).',
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Halfling Disguise',
				value:
					'You can spend 1 AP to change appearance to look like a Halfling (reverts under stress).'
			}
		]
	},
	{
		id: 'gremlin_bravery',
		name: 'Bravery',
		description: 'ADV on Saves against Fear conditions.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Intimidated', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Frightened', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Terrified', value: 'ADV' }
		]
	},
	{
		id: 'gremlin_give_chase',
		name: 'Give Chase',
		description: 'When near a fearful creature, Speed +1.',
		cost: 1,
		effects: [
			{
				type: 'MODIFY_STAT',
				target: 'moveSpeed',
				value: 1,
				condition: 'start_turn_near_fearful_creature'
			}
		]
	},
	{
		id: 'gremlin_quick_reactions',
		name: 'Quick Reactions',
		description: 'While not wearing Armor, +1 PD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'gremlin_fearsome',
		name: 'Fearsome',
		description: 'Enhanced Intimidate Action.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Fearsome', value: 'Enhanced Intimidate Action.' }]
	},
	{
		id: 'gremlin_natural_weapon',
		name: 'Natural Weapon',
		description: 'Natural Weapons for Unarmed Strikes.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Natural Weapon',
				value: 'Natural Weapons for Unarmed Strikes.'
			}
		]
	},
	{
		id: 'gremlin_climb_speed',
		name: 'Climb Speed',
		description: 'Climb Speed equal to Movement.',
		cost: 1,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'climb', value: 'equal_to_speed' }]
	},
	{
		id: 'gremlin_critter_knowledge',
		name: 'Critter Knowledge',
		description: 'ADV on Nature/Survival/Animal Checks about small creatures.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECK',
				target: 'Nature_Survival_Animal_involving_Small_Creatures',
				value: 'ADV'
			}
		]
	},
	// --- Goblin Traits ---
	{
		id: 'goblin_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'Small-Sized', value: 'Your Size is considered Small.' }
		]
	},
	{
		id: 'goblin_escape_artist',
		name: 'Escape Artist',
		description:
			'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' }
		]
	},
	{
		id: 'goblin_aggressive',
		name: 'Aggressive',
		description:
			'Once per Round, you can gain ADV on a Melee Attack. You are Exposed on the next Attack against you until the start of your next turn.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Aggressive',
				value:
					'Once per Round, you can gain ADV on a Melee Attack. You are Exposed on the next Attack against you until the start of your next turn.'
			}
		]
	},
	{
		id: 'goblin_eager_for_combat',
		name: 'Eager for Combat',
		description: 'You have ADV on Initiative Checks.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Initiative', value: 'ADV' }]
	},
	{
		id: 'goblin_small_fury',
		name: 'Small Fury',
		description: 'You deal +1 damage to Large or larger creatures on a Heavy or Critical Hit.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Small Fury',
				value: 'You deal +1 damage to Large or larger creatures on a Heavy or Critical Hit.'
			}
		]
	},
	{
		id: 'goblin_natural_trapper',
		name: 'Natural Trapper',
		description: 'You have ADV on Checks to gather materials for Traps and to build them.',
		cost: 0,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Gather_and_Build_Traps', value: 'ADV' }]
	},
	{
		id: 'goblin_hit_and_run',
		name: 'Hit and Run',
		description:
			'When you Hit a creature with a Melee Attack, you can spend 1 AP to immediately move up to your Speed without provoking Opportunity Attacks from the target.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Hit and Run',
				value:
					'When you Hit a creature with a Melee Attack, you can spend 1 AP to immediately move up to your Speed without provoking Opportunity Attacks from the target.'
			}
		]
	},
	{
		id: 'goblin_pack_tactics',
		name: 'Pack Tactics',
		description: 'You gain an additional +2 bonus to Attacks against creatures you are Flanking.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Pack Tactics',
				value: 'You gain an additional +2 bonus to Attacks against creatures you are Flanking.'
			}
		]
	},
	{
		id: 'goblin_trapper',
		name: 'Trapper',
		description:
			'You have ADV on Investigation Checks to spot Traps and Trickery Checks to Hide Traps.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Investigation_to_spot_Traps', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Trickery_to_Hide_Traps', value: 'ADV' }
		]
	},
	{
		id: 'goblin_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'INCREASE_TRADE_MASTERY_CAP',
				count: 1,
				value: 1,
				options: [
					'alchemy',
					'blacksmithing',
					'brewing',
					'calligraphy',
					'carpentry',
					'cartography',
					'cobbling',
					'cooking',
					'disguise',
					'forgery',
					'herbalism',
					'jeweler',
					'leatherworking',
					'masonry',
					'painting',
					'poisoner',
					'pottery',
					'sculpting',
					'smithing',
					'tailoring',
					'thieves',
					'woodcarving'
				]
			}
		]
	},
	{
		id: 'goblin_mischievous_hands',
		name: 'Mischievous Hands',
		description: 'You have ADV on Trickery checks made to conceal or steal objects.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_CHECK', target: 'Trickery_Conceal_or_Steal', value: 'ADV' }]
	},
	{
		id: 'goblin_sneaky',
		name: 'Sneaky',
		description: 'You can Hide while only Partially Concealed or behind 1/2 Cover.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Sneaky',
				value: 'You can Hide while only Partially Concealed or behind 1/2 Cover.'
			}
		]
	},
	{
		id: 'goblin_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'pd', value: -1 }]
	},
	// --- Terraborn Traits ---
	{
		id: 'terraborn_burrow_speed',
		name: 'Burrow Speed',
		description: 'You gain a Burrow Speed equal to half your Movement Speed.',
		cost: 2,
		effects: [{ type: 'GRANT_MOVEMENT', target: 'burrow', value: 'half_speed' }]
	},
	{
		id: 'terraborn_resilient_form',
		name: 'Resilient Form',
		description:
			'You have ADV on Saves against being Impaired, Petrified, and transformed against your will.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Impaired', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Petrified', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Involuntary_Transformation', value: 'ADV' }
		]
	},
	{
		id: 'terraborn_tremorsense',
		name: 'Tremorsense',
		description: 'You have Tremorsense 3 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'tremorsense', value: 3 }]
	},
	{
		id: 'terraborn_mold_earth',
		name: 'Mold Earth',
		description:
			"You can use your hands as Sculptor's Tools or Mason's Tools to shape soil, sand, stone, or rock. When you do, you can use your Prime Modifier instead of the normal Attribute on any Checks you make.",
		cost: 0,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Mold Earth',
				value:
					"You can use your hands as Sculptor's Tools or Mason's Tools to shape soil, sand, stone, or rock. When you do, you can use your Prime Modifier instead of the normal Attribute on any Checks you make."
			}
		]
	},
	{
		id: 'terraborn_stone_blood',
		name: 'Stone Blood',
		description:
			'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Bleeding', value: 'ADV' },
			{
				type: 'GRANT_ABILITY',
				target: 'End Bleeding (1 AP)',
				value: 'You can spend 1 AP to end the Bleeding Condition on yourself.'
			}
		]
	},
	{
		id: 'terraborn_tunnel_explorer',
		name: 'Tunnel Explorer',
		description: 'You have ADV on Stealth and Survival Checks while in caves or mines.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECK',
				target: 'Stealth_Survival_in_Caves_Mines',
				value: 'ADV'
			}
		]
	},
	{
		id: 'terraborn_earth_walker',
		name: 'Earth Walker',
		description: "You're not affected by Difficult Terrain created by rock, dirt, mud, or sand.",
		cost: 1,
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'Earth Walker',
				value: "You're not affected by Difficult Terrain created by rock, dirt, mud, or sand."
			}
		]
	},
	{
		id: 'terraborn_superior_tremorsense',
		name: 'Superior Tremorsense',
		description: 'Your Tremorsense increases by 2 Spaces.',
		cost: 1,
		prerequisites: ['terraborn_tremorsense'],
		effects: [{ type: 'MODIFY_STAT', target: 'tremorsense', value: 2 }]
	},
	{
		id: 'terraborn_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 1 }]
	},
	{
		id: 'terraborn_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Poison', value: 'half' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Poisoned', value: 'ADV' }
		]
	},
	{
		id: 'terraborn_insulated_skin',
		name: 'Insulated Skin',
		description: 'You gain EDR.',
		cost: 2,
		effects: [{ type: 'MODIFY_STAT', target: 'edr', value: 1 }]
	},
	{
		id: 'terraborn_natural_armor',
		name: 'Natural Armor',
		description: 'You gain PDR.',
		cost: 2,
		effects: [{ type: 'MODIFY_STAT', target: 'pdr', value: 1 }]
	},
	{
		id: 'terraborn_thick_skinned',
		name: 'Thick-Skinned',
		description: 'You gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1 }]
	},
	{
		id: 'terraborn_bludgeoning_weakness',
		name: 'Bludgeoning Weakness',
		description: 'You have Bludgeoning Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Bludgeoning', value: 1 }]
	},
	{
		id: 'terraborn_slow_moving',
		name: 'Slow Moving',
		description: 'Your Speed decreases by 1 Space',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'moveSpeed', value: -5 }]
	},
	// --- Shadowborn Traits ---
	{
		id: 'shadowborn_shadow_cloak',
		name: 'Shadow Cloak',
		description:
			'While in Darkness, taking the Hide Action makes you Invisible in addition to being Hidden until you take an Action or make a noise.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Shadow Cloak', value: 'ADV' }]
	},
	{
		id: 'shadowborn_umbral_resistance',
		name: 'Umbral Resistance',
		description: 'You have Umbral Resistance (Half).',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Umbral', value: 'half' }]
	},
	{
		id: 'shadowborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces. If you already have Darkvision, increase it by 5.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'darkvision', value: 10 }]
	},
	{
		id: 'shadowborn_sleepless',
		name: 'Sleepless',
		description:
			"You don't sleep as others do. Instead, you drift into a state of semi-consciousness and become shrouded in a veil of darkness. While within this state, you appear inert but can still see and hear as normal. Taking any action, other than speaking, interrupts this state.",
		cost: 0,
		effects: [{ type: 'GRANT_ABILITY', target: 'Sleepless', value: 'ADV' }]
	},
	{
		id: 'shadowborn_escape_artist',
		name: 'Escape Artist',
		description:
			'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECK', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Avoid_or_Escape_Grapple_Restrained', value: 'ADV' }
		]
	},
	{
		id: 'shadowborn_illusory_magic',
		name: 'Illusory Magic',
		description:
			"You learn 1 Spell of your choice from the Illusion School. Once per Long Rest, you can cast the chosen Spell for 1 less MP than normal (minimum of 0 MP). The Spell's total MP cost, before all reductions, cannot exceed your Mana Spend Limit.",
		cost: 2,
		effects: [
			{
				type: 'GRANT_SPELL',
				target: 'any',
				value: 1,
				userChoice: { prompt: 'Choose 1 spell from the Illusion School.' }
			},
			{
				type: 'GRANT_ABILITY',
				target: 'Illusory Magic Discount',
				value: 'Once per Long Rest, you can cast your chosen Illusion spell for 1 less MP.'
			}
		]
	},
	{
		id: 'shadowborn_indiscernible',
		name: 'Indiscernible',
		description:
			"Effects can't sense your emotions, and Insight Checks made against you have DisADV.",
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'Indiscernible', value: 'ADV' }]
	},
	{
		id: 'shadowborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }]
	},
	{
		id: 'shadowborn_superior_darkvision',
		name: 'Superior Darkvision',
		description: 'Your Darkvision increases by 10 Spaces.',
		cost: 1,
		prerequisites: ['shadowborn_darkvision'],
		effects: [{ type: 'MODIFY_STAT', target: 'darkvision', value: 10 }]
	},
	{
		id: 'shadowborn_sunlight_sensitivity',
		name: 'Sunlight Sensitivity',
		description:
			'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
		cost: -2,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'Sunlight Sensitivity', value: 'ADV' }]
	},
	{
		id: 'shadowborn_radiant_weakness',
		name: 'Radiant Weakness',
		description: 'You have Radiant Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY', target: 'Radiant', value: 1 }]
	},
	// --- Psyborn Traits ---
	{
		id: 'psyborn_psychic_resistance',
		name: 'Psychic Resistance',
		description: 'You gain Psychic Resistance (Half).',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE', target: 'Psychic', value: 'half' }]
	},
	{
		id: 'psyborn_telepathy',
		name: 'Telepathy',
		description:
			'You can communicate telepathically with any creature you can see within 10 Spaces. If it understands at least 1 language, it can respond to you telepathically.',
		cost: 1,
		effects: [{ type: 'GRANT_SENSE', target: 'telepathy', value: 10 }]
	},
	{
		id: 'psyborn_psionic_hand',
		name: 'Psionic Hand',
		description:
			'You learn the Mage Hand Cantrip. When you cast the Spell, you can choose to make the hand Invisible.',
		cost: 1,
		effects: [
			{ type: 'GRANT_CANTRIP', target: 'Mage Hand', value: 1 },
			{
				type: 'GRANT_ABILITY',
				target: 'Invisible Mage Hand',
				value: 'When you cast Mage Hand, you can make the hand invisible.'
			}
		]
	},
	{
		id: 'psyborn_strong_minded',
		name: 'Strong Minded',
		description: 'Your MD increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'md', value: 1 }]
	},
	{
		id: 'psyborn_shrouded_mind',
		name: 'Shrouded Mind',
		description:
			"Your surface thoughts can't be read against your will, and you have ADV on Checks or Saves to resist attempts to read deeper into your mind.",
		cost: 0,
		effects: [{ type: 'GRANT_ABILITY', target: 'Shrouded Mind', value: 'ADV' }]
	},
	{
		id: 'psyborn_telepathic_reach',
		name: 'Telepathic Reach',
		description: 'The range of your Telepathy is increased to 100 Spaces.',
		cost: 1,
		prerequisites: ['psyborn_telepathy'],
		effects: [{ type: 'MODIFY_STAT', target: 'telepathy', value: 90 }]
	},
	{
		id: 'psyborn_telepathic_link',
		name: 'Telepathic Link',
		description:
			'You can spend 1 AP to establish a Telepathic Link with a creature that you can see within your Telepathy range. The target must make an Intelligence Save contested by your Spell Check. Save Failure: For the next hour, you can communicate telepathically with them as long as they remain within range and on the same plane of existence. The connection ends if you use this Trait again.',
		cost: 1,
		prerequisites: ['psyborn_telepathy'],
		effects: [{ type: 'GRANT_ABILITY', target: 'Telepathic Link', value: 'ADV' }]
	},
	{
		id: 'psyborn_psionic_leap',
		name: 'Psionic Leap',
		description:
			'You can use your Intelligence instead of Agility to determine your Jump Distance and the damage you take from Falling.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'Psionic Leap', value: 'ADV' }]
	},
	{
		id: 'psyborn_psionic_magic',
		name: 'Psionic Magic',
		description:
			"You learn 1 Spell of your choice with the Psychic or Gravity Spell Tag. Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spell's total MP cost (before all reductions) still can't exceed your Mana Spend Limit.",
		cost: 2,
		effects: [
			{
				type: 'GRANT_SPELL',
				target: 'any',
				value: 1
			},
			{
				type: 'GRANT_ABILITY',
				target: 'Psionic Magic Discount',
				value: 'Once per Long Rest, you can cast your chosen spell for 1 less MP.'
			}
		]
	},
	{
		id: 'psyborn_psionic_grit',
		name: 'Psionic Grit',
		description:
			'You can now also spend 1 Grit Point when an ally that you can see within 10 Spaces of you takes damage to reduce the damage by 1.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'Psionic Grit', value: 'ADV' }]
	},
	{
		id: 'psyborn_strong_mind',
		name: 'Strong Mind',
		description:
			'Once per Combat, when you take damage that targets your MD, you can reduce the damage taken by an amount equal to your Intelligence or Charisma (your choice).',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Strong Mind', value: 'ADV' }]
	},
	{
		id: 'psyborn_iron_mind',
		name: 'Iron Mind',
		description: 'You have ADV on Saves to maintain your Concentration.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Concentration', value: 'ADV' }]
	},
	{
		id: 'psyborn_frail',
		name: 'Frail',
		description: 'Your HP maximum decreases by 2',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_STAT', target: 'hpMax', value: -2 }]
	}
];
// Helper functions for accessing trait data
export const getTraitData = (id: string): Trait | undefined => {
	return traitsData.find((trait) => trait.id === id);
};
export const getTraitsByAncestry = (ancestryId: string): Trait[] => {
	return traitsData.filter((trait) => trait.id.startsWith(ancestryId + '_'));
};
```

## File: classes-data/features/barbarian_features.ts
```typescript
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
```

## File: classes-data/features/bard_features.ts
```typescript
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast spells from multiple schools.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
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
```

## File: classes-data/features/champion_features.ts
```typescript
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
							type: 'GRANT_ABILITY',
							target: 'combat_readiness',
							value:
								'First turn in Combat: choose Brace (Dodge + ADV on Save) or Advance (Move + ADV on Physical Check).'
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
			featureName: 'Adaptive Tactics',
			levelGained: 2,
			description:
				"When you roll for Initiative, and at the end of each of your turns, you gain a d8 Tactical Die if you don't already have one.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'adaptive_tactics',
					value:
						'Gain d8 Tactical Die at Initiative and end of turns. Spend for: Assault (+die to Attack), Defense (+die to PD/AD), or Mobility (+die to Move/Jump).'
				}
			]
		}
	],
	subclasses: []
};
```

## File: classes-data/features/cleric_features.ts
```typescript
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast spells and use divine magic.',
			effects: [
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true },
				{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Shields', value: true }
			]
		},
		{
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
			featureName: 'Divine Damage Expansion',
			levelGained: 1,
			description: 'When you deal damage with a Spell you can convert the damage to your Divine Damage type. Additionally, you gain Resistance (1) to your Divine Damage type.',
			effects: []
		},
		{
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
			featureName: 'Divine Omen (Flavor Feature)',
			levelGained: 1,
			description: 'Once per Long Rest, you can spend 10 minutes to commune with your Deity and ask one yes-or-no question.',
			effects: []
		},
		{
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
```

## File: classes-data/features/commander_features.ts
```typescript
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
```

## File: classes-data/features/druid_features.ts
```typescript
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast primal spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
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
```

## File: classes-data/features/hunter_features.ts
```typescript
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
			learnsAllAttack: false,
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
				'Once per round, you can regain up to half your maximum SP when you score a Heavy or Critical Hit.'
		}
	},
	coreFeatures: [
		{
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
			featureName: "Hunter's Strike",
			levelGained: 2,
			description:
				"When you make a Martial Attack against the target of your Hunter's Mark, you can spend 1 SP to deal +1d8 damage of the Weapon's damage type. If the Attack was a Heavy Hit, the damage becomes +2d8. If the Attack was a Critical Hit, the damage becomes +3d8.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'hunters_strike',
					value:
						"Against Hunter's Mark target: spend 1 SP for +1d8 damage (+2d8 Heavy Hit, +3d8 Critical Hit)."
				}
			]
		},
		{
			featureName: 'Bestiary',
			levelGained: 3,
			description: 'Your knowledge of creatures grants you tactical advantages when facing them.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'bestiary',
					value:
						'You have extensive knowledge of creature weaknesses and behaviors for tactical advantage.'
				}
			]
		}
	],
	subclasses: []
};
```

## File: classes-data/features/monk_features.ts
```typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const monkClass: ClassDefinition = {
	className: 'Monk',
	startingEquipment: {
		weaponsOrShields: ['2 Weapons', '3 Weapons with the Toss or Thrown Property'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
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
				'Once per round, you can regain up to half your maximum SP when you succeed on an Attack Check, Athletics Check, or Acrobatics Check.',
			conditions: []
		}
	},
	coreFeatures: [
		{
			featureName: 'Monk Training',
			levelGained: 1,
			description: 'Your martial arts training grants you greater offense, defense, and movement.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'iron_palm',
					value:
						'Your limbs are considered Natural Weapons with the Impact Property that deal 1 Bludgeoning damage.'
				},
				{
					type: 'MODIFY_STAT',
					target: 'pd',
					value: 2,
					condition: 'not_wearing_armor'
				},
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
					target: 'step_of_wind',
					value:
						'While not wearing Armor: move on vertical surfaces and across liquids, use Prime Modifier for Jump Distance and Fall damage.'
				}
			]
		},
		{
			id: 'monk_stance',
			featureName: 'Monk Stance',
			levelGained: 1,
			description:
				'You learn 2 Monk Stances. You can enter/swap stances at the start of your turn or spend 1 SP to swap during your turn.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'monk_stances',
					value: {
						prompt: 'Learn 2 Monk Stances',
						count: 2,
						options: [
							'bear_stance',
							'bull_stance',
							'cobra_stance',
							'gazelle_stance',
							'tiger_stance',
							'turtle_stance'
						]
					},
					userChoice: {
						prompt: 'Choose 2 Monk Stances to learn',
						options: [
							'Bear Stance (Big Hits)',
							'Bull Stance (Knockback)',
							'Cobra Stance (Counter)',
							'Gazelle Stance (Nimble)',
							'Tiger Stance (Mobility)',
							'Turtle Stance (Defense)'
						]
					}
				}
			]
		},
	]
};
```

## File: classes-data/features/psion_features.ts
```typescript
import type { ClassDefinition } from '../../schemas/character.schema';
/**
 * Psion Class Definition – Draft implementation derived from Spellblade template.
 * Focuses on psychic spellcasting and telekinetic abilities.
 */
export const psionClass: ClassDefinition = {
	className: 'Psion',
	hybridPath: {
		martialAspect: {
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
		spellcastingAspect: {
			spellList: {
				description:
					'Psychic or Gravity Spell Tags plus Divination, Enchantment, Illusion, Protection schools',
				type: 'specific'
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
		}
	},
	coreFeatures: [
		{
			featureName: 'Psion Spellcasting',
			levelGained: 1,
			description:
				'You can cast spells from the Psychic or Gravity tags and the schools of Divination, Enchantment, Illusion, or Protection. Your combat masteries include Weapons, Light Armor, and Spellcasting. Your Cantrips Known, Spells Known, Mana Points, and Stamina Points advance as per the Psion class table.'
		},
		{
			featureName: 'Psion Stamina',
			levelGained: 1,
			description:
				'Once per round, if you take a turn in combat without expending SP you regain 1 SP.'
		},
		{
			featureName: 'Psionic Mind',
			levelGained: 1,
			description:
				'You learn the Psi Bolt cantrip, your MD increases by 2, you can spend SP on AP enhancements, and you gain the Daze and Disruption spell enhancements as well as the Psionic enhancement (1 MP) removing verbal and somatic components.'
		},
		{
			featureName: 'Telekinesis',
			levelGained: 1,
			description:
				'You can use the Object action to manipulate objects up to 100 lbs within 5 spaces via telekinesis.'
		},
		{
			featureName: 'Telekinetic Grapple',
			levelGained: 1,
			description:
				'You gain Grapple maneuvers which you perform with telekinesis. You may target creatures within 5 spaces and use Spell Checks instead of Might for related checks. Additional rules modify Body Block, Grapple, Shove, and Throw.'
		},
		{
			featureName: 'Telepathy',
			levelGained: 1,
			isFlavor: true,
			description:
				'You can communicate telepathically with any creature you can see within 10 spaces that knows at least one language.'
		},
		// Level 2 Features
		{
			featureName: 'Mind Sense',
			levelGained: 2,
			description:
				'Spend 1 AP and 1 MP to sense creatures within 10 spaces (Int ≥ -3) for 1 minute.'
		},
		{
			featureName: 'Invade Mind',
			levelGained: 2,
			description:
				'While Mind Sense is active, spend 1 AP and 1 SP to Assault Mind, Read Emotions, or Read Thoughts of a sensed creature within 10 spaces.'
		},
		{
			featureName: 'Psionic Resolve',
			levelGained: 2,
			description:
				'During combat, when you make an Attribute Save, you may spend 1 SP to instead roll a different Attribute Save of your choice.'
		},
		{
			featureName: 'Talent',
			levelGained: 2,
			description: 'You gain one Talent of your choice for which you meet the prerequisites.'
		}
	],
	subclasses: []
};
```

## File: classes-data/features/rogue_features.ts
```typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const rogueClass: ClassDefinition = {
	className: 'Rogue',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons', '1 Shield'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	martialPath: {
		combatTraining: {
			weapons: ['Weapons'],
			armor: ['Light Armor']
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
		}
	},
	coreFeatures: [
		{
			featureName: 'Expertise',
			levelGained: 1,
			description:
				'Choose 2 Skills. Your Mastery Cap and Mastery Level in those Skills both increase by 1.',
			effects: [
				{
					type: 'INCREASE_SKILL_MASTERY_CAP',
					count: 2,
					value: 1
				}
			]
		},
		{
			featureName: 'Sneak Attack',
			levelGained: 1,
			description:
				'Once per turn, you can deal extra damage when you have ADV on an Attack Check or when you Flank the target.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'sneak_attack',
					value: 'Once per turn: extra damage on attacks with ADV or when Flanking.'
				}
			]
		},
		{
			featureName: "Thieves' Cant",
			levelGained: 1,
			description:
				'You know a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'thieves_cant',
					value: 'Secret language for hiding messages in normal conversation.'
				}
			]
		},
		{
			featureName: 'Cunning Action',
			levelGained: 2,
			description: 'You can use your Minor Action to take the Disengage, Hide, or Dash action.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'cunning_action',
					value: 'Use Minor Action for Disengage, Hide, or Dash.'
				}
			]
		}
	]
};
```

## File: classes-data/features/sorcerer_features.ts
```typescript
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
			featureName: 'Sorcery',
			levelGained: 1,
			isFlavor: true,
			description: 'You learn the Sorcery Spell.',
			effects: [{ type: 'GRANT_SPELL', target: 'Sorcery', value: 1 }],
		},
		{
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
									value: 1,
									condition: 'While Overloaded',
								},
								{
									type: 'GRANT_RESISTANCE',
									target: 'Draconic Origin Damage Type',
									value: 1,
									condition: 'While Overloaded',
								},
							],
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
```

## File: classes-data/features/spellblade_features.ts
```typescript
import type { ClassDefinition } from '../../schemas/character.schema';
export const spellbladeClass: ClassDefinition = {
	className: 'Spellblade',
	startingEquipment: {
		weaponsOrShields: ['3 Weapons', '1 Shield'],
		armor: '1 set of Light Armor',
		packs: 'X or Y Packs (Adventuring Packs Coming Soon)'
	},
	hybridPath: {
		martialAspect: {
			combatTraining: {
				weapons: ['Weapons'],
				armor: ['Light Armor', 'Heavy Armor'],
				shields: ['All Shields']
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
			}
		},
		spellcastingAspect: {
			ritualCasting: false,
			spellPreparation: false
		}
	},
	coreFeatures: [
		{
			featureName: 'Fighting Style',
			levelGained: 1,
			description:
				'You adopt a particular style of fighting as your specialty. Choose one Fighting Style.',
			effects: [
				{
					type: 'GRANT_CHOICE',
					target: 'fighting_style',
					value: {
						prompt: 'Choose a Fighting Style',
						options: [
							'defense',
							'dueling',
							'great_weapon_fighting',
							'protection',
							'two_weapon_fighting'
						]
					},
					userChoice: {
						prompt: 'Choose your Fighting Style',
						options: [
							'Defense (+1 AD while wearing armor)',
							'Dueling (+2 damage with one-handed weapons)',
							'Great Weapon Fighting (reroll 1s and 2s on damage)',
							'Protection (use reaction to impose DisADV)',
							'Two-Weapon Fighting (add ability modifier to off-hand damage)'
						]
					}
				}
			]
		},
		{
			featureName: 'Spellstrike',
			levelGained: 2,
			description:
				'When you cast a spell that requires a Spell Attack, you can deliver the spell through a weapon attack.',
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'spellstrike',
					value: 'Deliver touch spells through weapon attacks.'
				}
			]
		},
		{
			id: 'arcane_weapon',
			featureName: 'Arcane Weapon',
			levelGained: 2,
			description:
				"You can use a bonus action to imbue a weapon you're holding with magical energy.",
			effects: [
				{
					type: 'GRANT_ABILITY',
					target: 'arcane_weapon',
					value: 'Imbue weapons with magical energy for enhanced damage.'
				}
			]
		}
	]
};
```

## File: classes-data/features/warlock_features.ts
```typescript
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
```

## File: classes-data/features/wizard_features.ts
```typescript
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
			featureName: 'Spellcasting Path',
			levelGained: 1,
			description: 'You gain the ability to cast arcane spells.',
			effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Light_Armor', value: true }]
		},
		{
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
					featureName: 'Portal Magic',
					levelGained: 3,
					description: 'You gain advanced teleportation abilities.',
					effects: [
						{
							type: 'GRANT_ABILITY',
							target: 'portal_magic',
							value: 'Advanced teleportation and dimensional magic abilities.'
						}
					]
				}
			]
		}
	]
};
```

## File: classes-data/progressions/barbarian.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/bard.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/champion.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/cleric.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/commander.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/druid.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/hunter.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/monk.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/psion.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/refactor-tables.ts
```typescript
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
```

## File: classes-data/progressions/rogue.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/sorcerer.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/spellblade.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/warlock.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/progressions/wizard.progression.ts
```typescript
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
        "placeholder_lvl_1_features"
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
        "placeholder_class_feature"
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
```

## File: classes-data/tables/barbarian_table.json
```json
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
```

## File: classes-data/tables/bard_table.json
```json
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
```

## File: classes-data/tables/champion_table.json
```json
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
```

## File: classes-data/tables/cleric_table.json
```json
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
```

## File: classes-data/tables/commander_table.json
```json
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
```

## File: classes-data/tables/druid_table.json
```json
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
```

## File: classes-data/tables/hunter_table.json
```json
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
```

## File: classes-data/tables/monk_table.json
```json
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
```

## File: classes-data/tables/psion_table.json
```json
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
```

## File: classes-data/tables/rogue_table.json
```json
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
```

## File: classes-data/tables/sorcerer_table.json
```json
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
```

## File: classes-data/tables/spellblade_table.json
```json
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
```

## File: classes-data/tables/warlock_table.json
```json
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
```

## File: classes-data/tables/wizard_table.json
```json
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
```

## File: classes-data/talents/barbarian.talents.ts
```typescript
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
```

## File: classes-data/talents/bard.talents.ts
```typescript
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
```

## File: classes-data/talents/champion.talents.ts
```typescript
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
```

## File: classes-data/talents/cleric.talents.ts
```typescript
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
```

## File: classes-data/talents/commander.talents.ts
```typescript
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
```

## File: classes-data/talents/druid.talents.ts
```typescript
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
```

## File: classes-data/talents/hunter.talents.ts
```typescript
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
```

## File: classes-data/talents/monk.talents.ts
```typescript
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
```

## File: classes-data/talents/rogue.talents.ts
```typescript
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
```

## File: classes-data/talents/sorcerer.talents.ts
```typescript
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
```

## File: classes-data/talents/spellblade.talents.ts
```typescript
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
```

## File: classes-data/talents/talent.loader.ts
```typescript
import type { Talent } from '../talents/talent.types';
import { generalTalents, multiclassTalents } from '../talents/talents.data';
// Use Vite's import.meta.glob to dynamically import all class talent files
const classTalentModules = import.meta.glob('../classes-data/talents/*.talents.ts', { eager: true });
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
```

## File: classes-data/talents/talent.types.ts
```typescript
import type { Effect } from '../schemas/character.schema';
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
```

## File: classes-data/talents/talents.data.ts
```typescript
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
    id: 'general_skill_or_trade_increase',
    name: 'Skill or Trade Increase',
    category: 'General',
    description: 'You gain 3 Skill or Trade Points to put into any Skill or Trade of your choice.',
    effects: [
      {
        type: 'GRANT_CHOICE',
        target: 'skill_or_trade_points',
        value: 3,
        userChoice: { prompt: 'Choose to gain 3 Skill Points or 3 Trade Points' },
      },
    ],
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
```

## File: classes-data/talents/warlock.talents.ts
```typescript
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
```

## File: classes-data/talents/wizard.talents.ts
```typescript
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
```

## File: loaders/class-features.loader.ts
```typescript
/**
 * @file class-features.loader.ts
 * @description Loader for the new class features JSON structure
 */
import { SpellSchool, SpellList } from '../schemas/spell.schema';
import {
	type IClassFeature,
	type IClassFeatureChoice,
	type IClassFeatureChoiceOption,
	type ITraitEffect
} from '../schemas/types';
import { traitsData } from '../ancestries/traits';
import { parseJsonSafe } from '../../utils/storageUtils';
// Define interfaces for the new class features structure
export interface ClassFeatureChoice {
	prompt: string;
	count: number;
	options?: {
		name: string;
		description: string;
	}[];
}
export interface ClassFeatureBenefit {
	name: string;
	description: string;
	effects?: {
		type: string;
		target?: string;
		value?: any;
		condition?: string;
	}[];
}
export interface ClassFeature {
	featureName: string;
	levelGained: number;
	description: string;
	isFlavor?: boolean;
	choices?: ClassFeatureChoice[];
	benefits?: ClassFeatureBenefit[];
}
export interface ClassSubclass {
	subclassName: string;
	description?: string;
	features: ClassFeature[];
}
export interface ClassDefinition {
	className: string;
	startingEquipment?: {
		weaponsOrShields?: string[];
		rangedWeapon?: string;
		alternativeWeapons?: string;
		armor?: string;
		packs?: string;
	};
	martialPath?: {
		combatTraining?: {
			weapons?: string[];
			armor?: string[];
			shields?: string[];
		};
		maneuvers?: {
			learnsAllAttack?: boolean;
			additionalKnown?: string;
		};
		techniques?: {
			additionalKnown?: string;
		};
		staminaPoints?: {
			maximumIncreasesBy?: string;
		};
		staminaRegen?: {
			description?: string;
			conditions?: string[];
		};
	};
	spellcastingPath?: {
		combatTraining?: {
			armor?: string[];
			shields?: string[];
		};
		spellList?: {
			type?: 'specific' | 'schools' | 'any' | 'all_schools';
			listName?: string;
			specificSchools?: SpellSchool[];
			spellTags?: string[];
			schoolCount?: number; // For classes that choose X schools
			description?: string;
			betaNote?: string;
		};
		cantrips?: {
			knownIncreasesBy?: string;
			description?: string;
		};
		spells?: {
			knownIncreasesBy?: string;
			description?: string;
		};
		manaPoints?: {
			maximumIncreasesBy?: string;
		};
	};
	coreFeatures: ClassFeature[];
	subclasses: ClassSubclass[];
}
// Import all the new schema class definitions
import { barbarianClass } from '../classes-data/features/barbarian_features';
import { clericClass } from '../classes-data/features/cleric_features';
import { hunterClass } from '../classes-data/features/hunter_features';
import { championClass } from '../classes-data/features/champion_features';
import { wizardClass } from '../classes-data/features/wizard_features';
import { monkClass } from '../classes-data/features/monk_features';
import { rogueClass } from '../classes-data/features/rogue_features';
import { sorcererClass } from '../classes-data/features/sorcerer_features';
import { spellbladeClass } from '../classes-data/features/spellblade_features';
import { warlockClass } from '../classes-data/features/warlock_features';
import { bardClass } from '../classes-data/features/bard_features';
import { druidClass } from '../classes-data/features/druid_features';
import { commanderClass } from '../classes-data/features/commander_features';
import { psionClass } from '../classes-data/features/psion_features';
// Use the new schema class definitions
const rawClassFeatures = [
	barbarianClass,
	clericClass,
	hunterClass,
	championClass,
	wizardClass,
	monkClass,
	rogueClass,
	sorcererClass,
	spellbladeClass,
	warlockClass,
	bardClass,
	druidClass,
	commanderClass,
	psionClass
];
// Debug logging
console.log('🔍 Class Features Debug:', {
	totalClasses: rawClassFeatures.length,
	classNames: rawClassFeatures.map((c) => c?.className || 'undefined')
});
// Export the class features data
export const classFeaturesData: ClassDefinition[] = rawClassFeatures;
// Helper function to get available spell schools for a class
export function getAvailableSpellSchools(classData: ClassDefinition): SpellSchool[] {
	const spellList = classData.spellcastingPath?.spellList;
	if (!spellList) return [];
	switch (spellList.type) {
		case 'all_schools':
			// Return all schools from the enum
			return Object.values(SpellSchool);
		case 'schools':
			// Return specific schools
			return spellList.specificSchools || [];
		default:
			return [];
	}
}
// Helper function to find a class by name
export function findClassByName(className: string): ClassDefinition | undefined {
	console.log('🔍 findClassByName called with:', className);
	console.log(
		'🔍 Available classes:',
		classFeaturesData.map((c) => c.className)
	);
	const result = classFeaturesData.find(
		(cls) => cls.className.toLowerCase() === className.toLowerCase()
	);
	console.log('🔍 findClassByName result:', result ? 'found' : 'not found');
	return result;
}
// Helper function to find a specific feature in a class
export function findFeatureInClass(
	className: string,
	featureName: string
): ClassFeature | undefined {
	const classData = findClassByName(className);
	if (!classData) return undefined;
	return classData.coreFeatures.find((feature) => feature.featureName === featureName);
}
// Helper function to find a choice option in a feature
export function findChoiceOption(
	className: string,
	featureName: string,
	choiceIndex: number,
	optionName: string
): { name: string; description: string } | undefined {
	const feature = findFeatureInClass(className, featureName);
	if (!feature?.choices?.[choiceIndex]?.options) return undefined;
	return feature.choices[choiceIndex].options.find((option) => option.name === optionName);
}
// Generic function to extract class-specific display information
export function getClassSpecificInfo(
	className: string,
	selectedFeatureChoices?: Record<string, string>
): { displayInfo: { label: string; value: string }[] } {
	const displayInfo: { label: string; value: string }[] = [];
	if (!selectedFeatureChoices) {
		return { displayInfo };
	}
	try {
		const selectedChoices: { [key: string]: string } = selectedFeatureChoices;
		const classData = findClassByName(className);
		if (!classData) {
			return { displayInfo };
		}
		// Process each core feature that has choices
		classData.coreFeatures.forEach((feature) => {
			if (feature.choices) {
				feature.choices.forEach((choice, choiceIndex) => {
					// Create a mapping for legacy choice IDs based on class and feature
					const legacyChoiceId = getLegacyChoiceId(className, feature.featureName, choiceIndex);
					const selectedValue = selectedChoices[legacyChoiceId];
					if (selectedValue && choice.options) {
						if (choice.count > 1) {
							// Handle multiple selections from stringified JSON or comma-separated list
							let selectedValues: string[] = parseJsonSafe<string[]>(selectedValue) ?? [];
							if (selectedValues.length === 0) {
								// Fallback for non-JSON strings
								if (selectedValue.includes(',')) {
									selectedValues = selectedValue.split(',').map((s: string) => s.trim());
								} else {
									selectedValues = [selectedValue];
								}
							}
							if (selectedValues.length > 0) {
								const label = getDisplayLabel(className, feature.featureName, choiceIndex);
								displayInfo.push({
									label,
									value: selectedValues.join(', ')
								});
							}
						} else {
							// Handle single selections
							const label = getDisplayLabel(className, feature.featureName, choiceIndex);
							displayInfo.push({
								label,
								value: selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
							});
						}
					}
				});
			}
			// Also check for benefits that might have user choices (like Divine Damage)
			if (feature.benefits) {
				feature.benefits.forEach((benefit) => {
					const legacyBenefitId = getLegacyBenefitId(className, feature.featureName, benefit.name);
					const selectedValue = selectedChoices[legacyBenefitId];
					if (selectedValue) {
						displayInfo.push({
							label: benefit.name,
							value: selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
						});
					}
				});
			}
		});
	} catch (error) {
		console.error('Error parsing selected feature choices:', error);
	}
	return { displayInfo };
}
// Helper function to map class/feature combinations to legacy choice IDs
export function getLegacyChoiceId(
	className: string,
	featureName: string,
	choiceIndex: number
): string {
	// Generic mapping: className_featureName_choiceIndex
	return `${className.toLowerCase()}_${featureName.toLowerCase().replace(/\s+/g, '_')}_${choiceIndex}`;
}
// Helper function to map class/feature combinations to legacy benefit IDs
export function getLegacyBenefitId(
	className: string,
	featureName: string,
	benefitName: string
): string {
	// Generic mapping: className_featureName_benefitName
	return `${className.toLowerCase()}_${featureName.toLowerCase().replace(/\s+/g, '_')}_${benefitName.toLowerCase().replace(/\s+/g, '_')}`;
}
// Helper function to get display labels for different choice types
export function getDisplayLabel(
	_className: string,
	featureName: string,
	_choiceIndex: number
): string {
	// Generic: just use the feature name as the label
	return featureName;
}
```

## File: loaders/class.loader.ts
```typescript
import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';
// Use Vite's import.meta.glob to import only the class table JSON files.
// The `eager: true` option imports the modules directly, so they are available synchronously.
const tableModules = import.meta.glob('../classes-data/tables/*_table.json', { eager: true });
// Extract the default export (the class object) from each module.
const tableData = Object.values(tableModules).map((module: any) => module.default);
// Create progression data structure from table files (stats only, no features)
const compatibleData = tableData.map((classTable: any) => {
	const className = classTable.className;
	// Map class names to their descriptions
	const classDescriptions: { [key: string]: string } = {
		Barbarian:
			'A fierce warrior who channels primal rage to gain strength and resist harm in combat.',
		Bard: 'A charismatic performer whose songs and stories inspire allies and manipulate enemies through magic.',
		Champion:
			'A martial master focused on critical strikes, resilience, and battlefield leadership.',
		Cleric:
			'A divine spellcaster empowered by a god to heal, protect, and smite enemies with holy might.',
		Commander:
			'A tactical leader who inspires and directs allies with strategic maneuvers and commanding presence.',
		Druid:
			'A nature-bound spellcaster who wields primal magic and transforms into beasts to protect the wilds.',
		Hunter:
			'A skilled tracker and marksman who specializes in slaying monsters and surviving the wilderness.',
		Monk: 'A disciplined martial artist who channels inner energy for rapid strikes and supernatural movement.',
		Rogue:
			'A stealthy and cunning adventurer who excels in ambushes, trickery, and precise strikes.',
		Sorcerer:
			'A natural-born spellcaster who harnesses raw arcane or elemental power from an innate source.',
		Spellblade:
			'A warrior-mage hybrid who combines martial prowess with arcane magic to enchant weapons and defend.',
		Warlock:
			'A spellcaster who draws power from a pact with a mysterious or dark patron, gaining unique abilities.',
		Wizard:
			'A scholarly arcane caster who learns spells through study and masters a broad range of magical effects.'
	};
	const level1 = classTable.levelProgression?.[0];
	return {
		id: className.toLowerCase(),
		name: className,
		description: classDescriptions[className] || `${className} class progression table`,
		level1Stats: {
			healthPoints: level1?.healthPoints || 0,
			staminaPoints: level1?.staminaPoints || 0,
			manaPoints: level1?.manaPoints || 0,
			skillPoints: level1?.skillPoints || 0,
			tradePoints: level1?.tradePoints || 0,
			maneuversKnown: level1?.maneuversKnown || 0,
			techniquesKnown: level1?.techniquesKnown || 0,
			cantripsKnown: level1?.cantripsKnown || 0,
			spellsKnown: level1?.spellsKnown || 0
		},
		levelProgression: classTable.levelProgression,
		level1Features: [],
		featureChoicesLvl1: []
	};
});
// Validate the combined data against the Zod schema.
// The parse method will throw a detailed error if validation fails.
const validatedData = classesDataSchema.parse(compatibleData);
// Export the validated data with the correct type.
export const classesData: IClassDefinition[] = validatedData;
```

## File: martials/maneuvers.ts
```typescript
/**
 * @file maneuvers.ts
 * @description Contains the schemas and a complete list of all Martial Maneuvers
 * from the DC20 Beta 0.9.5 rulebook (pages 48-50).
 */
//==============================================================================
// SCHEMAS / TYPES
//==============================================================================
/**
 * Categorizes maneuvers based on their function as described in the rulebook.
 */
export enum ManeuverType {
	Attack = 'Attack',
	Save = 'Save',
	Grapple = 'Grapple',
	Defense = 'Defense'
}
/**
 * Represents the resource cost of a maneuver, typically in Action Points (AP).
 */
export interface ManeuverCost {
	ap: number;
}
/**
 * The definitive blueprint for a single Maneuver object.
 */
export interface Maneuver {
	name: string;
	type: ManeuverType;
	cost: ManeuverCost;
	description: string;
	isReaction: boolean;
	trigger?: string; // Optional: The condition for using a Reaction maneuver.
	requirement?: string; // Optional: Any prerequisites for using the maneuver.
}
//==============================================================================
// MANEUVER DATA
//==============================================================================
/**
 * A comprehensive list of all martial maneuvers available in the game.
 */
export const maneuvers: Maneuver[] = [
	// --- Attack Maneuvers (Page 48) ---
	{
		name: 'Extend Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description:
			'Your Melee Attack Range is increased by 1 Space (or your Ranged Attack Range is increased by 5 Spaces) for the Attack.',
		isReaction: false
	},
	{
		name: 'Power Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description: 'You deal +1 damage with the Attack. You can use this Maneuver multiple times.',
		isReaction: false
	},
	{
		name: 'Sweep Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description:
			'Choose 1 additional target within 1 Space of the original target that’s within your Attack Range. Make 1 Attack Check against all targets. Attack Hit: The original target takes your Attack’s damage, and each additional target Hit takes 1 damage of the same type. You can use this Maneuver multiple times.',
		isReaction: false
	},
	// --- Save Maneuvers (Page 49) ---
	{
		name: 'Bleed',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description: 'The target begins Bleeding (1 True damage at the start of their turn).',
		isReaction: false
	},
	{
		name: 'Daze',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Expose',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Exposed (Attacks against it have ADV) against the next Attack made against it before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Hamstring',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Slowed (every 1 Space you move costs an extra 1 Space of movement) until the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Hinder',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Hindered (DisADV on Attacks) on the next Attack it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Impair',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Impaired (DisADV on Physical Checks) on the next Physical Check it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Knockback',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target is pushed 1 Space away + up to 1 additional Space for every 5 it fails its Save by.',
		isReaction: false
	},
	{
		name: 'Trip',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description: 'The target falls Prone.',
		isReaction: false
	},
	// --- Grapple Maneuvers (Page 49) ---
	{
		name: 'Body Block',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'You are targeted by an Attack.',
		description:
			'You reposition a creature Grappled by you to shield yourself from damage. You and the Grappled creature take half the damage dealt by the attack and you can move the Grappled creature to any space adjacent to you immediately afterwards.'
	},
	{
		name: 'Restrain',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description:
			'The target is Restrained until the Grapple ends. On its turn it can spend 1 AP to end being Restrained, but it remains Grappled until the Condition ends.',
		isReaction: false
	},
	{
		name: 'Slam',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description: 'The target takes 1 Bludgeoning damage. Success (each 5): +1 damage.',
		isReaction: false
	},
	{
		name: 'Takedown',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description: 'The target falls Prone. You don’t fall Prone unless you choose to do so.',
		isReaction: false
	},
	{
		name: 'Throw',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		requirement: 'The Grappled creature is your Size or smaller.',
		description:
			'The target is thrown up to a number of Spaces away from you equal to 1/2 of your Might (ending the Grappled Condition) + up to 1 additional Space for every 5 they fail the Contest by.',
		isReaction: false
	},
	// --- Defense Maneuvers (Page 50) ---
	{
		name: 'Parry',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger:
			'When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its PD.',
		description: 'You grant the target a +5 bonus to PD against this Attack.'
	},
	{
		name: 'Protect',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'A creature you can see within 1 Space is Hit by an Attack.',
		description:
			'The target takes half of the damage and you take the other half. The damage you take bypasses any Damage Reduction.'
	},
	{
		name: 'Raise Shield',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger:
			'When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its AD.',
		requirement: 'You’re wielding a Shield.',
		description: 'You grant the target a +5 bonus to AD against this Attack.'
	},
	{
		name: 'Side Step',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'You’re targeted by an Attack against your PD.',
		description:
			'You move 1 Space to a Space that’s still within the Attack’s range. When you do, the Attack has DisADV against you. If you move behind Cover, you don’t gain the benefit of that Cover against the Attack.'
	},
	{
		name: 'Swap',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		description:
			'You switch Spaces with a willing creature within 1 Space. If this movement would provoke an Opportunity Attack against you or the target creature, any Opportunity Attacks are made against you.',
		isReaction: false // This is a standard action, not a reaction.
	},
	{
		name: 'Taunt',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		description:
			'Choose an enemy creature that can see or hear you within 5 Spaces. Make an Attack Check, Influence Check, or Intimidation Check (your choice) contested by the target’s Mental Save. Contest Success: The target is Taunted (DisADV on Attacks against creatures other than you) by you on their next Attack.',
		isReaction: false
	}
];
/** A simple alias for the main maneuvers array. */
export const allManeuvers = maneuvers;
```

## File: martials/techniques.ts
```typescript
/**
 * @file techniques.ts
 * @description Contains the schemas and a complete list of all Martial Techniques
 * from the DC20 Beta 0.9.5 rulebook (pages 51-53).
 */
//==============================================================================
// SCHEMAS / TYPES
//==============================================================================
/**
 * Represents the resource cost of a technique or its enhancement.
 */
export interface MartialAbilityCost {
	ap?: number;
	sp?: number;
}
/**
 * The blueprint for a Technique's optional enhancement.
 */
export interface TechniqueEnhancement {
	name: string;
	cost: {
		ap?: number;
		sp: number;
	};
	description: string;
}
/**
 * The definitive blueprint for a single Technique object.
 */
export interface Technique {
	name: string;
	cost: MartialAbilityCost;
	description: string;
	isReaction: boolean;
	trigger?: string;
	requirement?: string;
	enhancements: TechniqueEnhancement[];
}
//==============================================================================
// TECHNIQUE DATA
//==============================================================================
/**
 * A comprehensive list of all martial techniques available in the game.
 */
export const techniques: Technique[] = [
	{
		name: 'Forbearance',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'When a creature you can see within 1 Space is targeted by an Attack.',
		description:
			'You become the new target of the Check, and choose to switch places with the original target (if it’s willing). If the Check is accompanied by a Save, you make the Save instead of the original target.',
		enhancements: [
			{
				name: 'Steadfast Forbearance',
				cost: { sp: 1 },
				description:
					'If multiple creatures within 1 Space of you are targeted by the same Check, you can attempt to protect them as well. You can spend 1 SP per additional target to become the new target of its Check as well. You take the collective damage of all protected creatures against the Check.'
			},
			{
				name: 'Immense Defense',
				cost: { sp: 2 },
				description: 'You gain Resistance (Half) against all damage taken using this Technique.'
			}
		]
	},
	{
		name: 'Heroic Bash',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			"Using a Melee Weapon (or Unarmed Strike) you can attempt to send an enemy hurling through the air. Make an Attack Check against the PD of a target within 1 Space of you, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon's (or Unarmed Strike) damage. Save Failure: It gets knockback horizontally up to 3 Spaces + 1 additional Space for every 5 it fails the Save by.",
		enhancements: [
			{
				name: 'Extended Knockback',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the Knockback distance by 2 Spaces and increase the damage by 1.'
			},
			{
				name: 'Painful Knockback',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the damage by 2.'
			},
			{
				name: 'Bash & Smash',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend an additional 1 AP and 1 SP to change the Target from one creature to every creature’s PD within 1 Space.'
			}
		]
	},
	{
		name: 'Heroic Leap',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You perform an exceptional leap and assault a creature. You gain up to your Speed in Spaces and increase your Jump Distance by 1 on the next Long or Vertical Jump you make. You leap into the air and make an Attack Check against the PD of a target within 1 Space of where you land, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon (or Unarmed Strike) damage. Save Failure: The target falls Prone.',
		enhancements: [
			{
				name: 'Brutal Leap',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to transfer all of the Falling damage you would usually take into the target instead.'
			},
			{
				name: 'Far Leap',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase your damage by 1 and your Jump Distance by 2.'
			},
			{
				name: 'Heroic Slam',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend 1 AP and 1 SP to compare your Attack Check against the AD of all creatures within 1 Space of where you land (instead of a single target).'
			}
		]
	},
	{
		name: 'Heroic Parry',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger:
			'You or a creature you can see within 1 Space are targeted by an Attack against its PD.',
		description: 'You grant the target a +5 bonus to its PD until the start of its next turn.',
		enhancements: [
			{
				name: 'Heroic Disengage',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to allow the target to Disengage and move up to half its Speed after the Attack.'
			}
		]
	},
	{
		name: 'Heroic Taunt',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You attempt to Taunt all enemies within 5 Spaces. Make an Attack Check or Intimidation Check (your choice) contested by each target’s Mental Save. Contest Success: Each creature you beat is Taunted (DisADV on Attack and Spell Checks against creatures other than you) by you until the end of your next turn.',
		enhancements: [
			{
				name: 'Legendary Taunt',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to have any damage dealt by Taunted enemies to be halved against any creatures other than you.'
			}
		]
	},
	{
		name: 'Slip Away',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'A Creature misses you with an Attack.',
		description: 'You take the Full Dodge Action and move up to your Speed.',
		enhancements: [
			{
				name: 'Diving Attack',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to make an Attack Check against a creature within 1 Space of you as part of Slip Away (you make this attack before the creature makes theirs).'
			}
		]
	},
	{
		name: 'Sunder Armor',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You make a Martial Attack against a creature’s PD. Hit: Until the start of your next turn, the target gains Vulnerability (1) to a damage type dealt by the Attack.',
		enhancements: []
	},
	{
		name: 'Tumble and Dive',
		cost: { ap: 2, sp: 1 },
		isReaction: true,
		trigger: 'You are the target of an Attack.',
		description:
			'You move up to your Speed and avoid the attack entirely as long as you end your movement outside the range or behind Full Cover of the Attack. Additional Opportunity Attacks are still able to be made against you.',
		enhancements: [
			{
				name: 'Heroic Dive',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to bring a willing creature within 1 Space along with you as part of Tumble and Dive. They move the same amount of Spaces as you and must also end their movement within 1 Space of you.'
			}
		]
	},
	{
		name: 'Volley',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Ranged Weapon',
		description:
			'You launch a volley of projectiles. Choose a point within your Weapon’s range. Make a single Attack Check and compare it against the AD of all creatures of your choice within 1 Space of the chosen point. Attack Hit: You deal 2 damage of the Weapon’s type to each creature.',
		enhancements: [
			{
				name: 'Impairing Volley',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to cause each creature within the area to make a Physical Save against your Save DC. Failure: They’re Impaired (DisADV on Physical Checks) until the end of your next turn.'
			},
			{
				name: 'Blanket of Arrows',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the area to 3 Spaces from the chosen point.'
			},
			{
				name: 'Line of Arrows',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to also target each creature occupying a Space in a Line between you and the chosen point.'
			}
		]
	},
	{
		name: 'Whirlwind',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You make a single Attack Check against the AD of all creatures of your choice within 1 Space of you. Attack Hit: You deal your Weapon (or Unarmed Strike) damage to each creature.',
		enhancements: [
			{
				name: 'Blood Whirl',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to force each creature targeted to make a Physical Save against your Save DC. Failure: They begin Bleeding.'
			},
			{
				name: 'Wide Swing',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the range of Whirlwind by 1 Space, targeting each creature of your choice within 2 Spaces of you.'
			},
			{
				name: 'Throwing Finisher',
				cost: { sp: 1 },
				description:
					'If you’re wielding a Melee Weapon, you can choose to spend an extra 1 SP at the end of the Whirlwind to throw the Weapon at a target within 5 Spaces. Use the same single Attack Check against this target as well. The weapon lands within 1 Space of the target (GM discretion).'
			}
		]
	}
];
/** A simple alias for the main techniques array. */
export const allTechniques = techniques;
```

## File: paths/path.service.ts
```typescript
// path.service.ts
import { CharacterPath, PathBenefits, PathId } from './path.types';
import { CHARACTER_PATHS } from './paths.data';
// A type defining the character's state for path progression.
// Example: { spellcaster_path: 2, martial_path: 0 }
export type PathProgressionState = Record<PathId, number>;
/**
 * Calculates the total accumulated benefits from all character paths
 * based on the number of points a character has invested.
 *
 * @param progressionState - An object representing the points spent in each path.
 * @returns An object containing the sum of all benefits.
 */
export function calculateTotalPathBenefits(progressionState: PathProgressionState): PathBenefits {
  // Start with a blank slate of benefits.
  const totalBenefits: PathBenefits = {
    staminaPoints: 0,
    maneuversLearned: 0,
    techniquesLearned: 0,
    manaPoints: 0,
    cantripsLearned: 0,
    spellsLearned: 0,
  };
  // Loop through each path in our static data (e.g., 'martial_path', 'spellcaster_path')
  for (const pathDefinition of CHARACTER_PATHS) {
    const pathId = pathDefinition.id;
    const pointsSpent = progressionState[pathId] || 0;
    // If the character has spent no points in this path, skip it.
    if (pointsSpent === 0) {
      continue;
    }
    // Filter the progression table to get only the levels the character has unlocked.
    const unlockedTiers = pathDefinition.progression.filter(
      (level) => level.pathLevel <= pointsSpent
    );
    // Sum the benefits from each unlocked tier.
    for (const tier of unlockedTiers) {
      totalBenefits.staminaPoints += tier.benefits.staminaPoints ?? 0;
      totalBenefits.maneuversLearned += tier.benefits.maneuversLearned ?? 0;
      totalBenefits.techniquesLearned += tier.benefits.techniquesLearned ?? 0;
      totalBenefits.manaPoints += tier.benefits.manaPoints ?? 0;
      totalBenefits.cantripsLearned += tier.benefits.cantripsLearned ?? 0;
      totalBenefits.spellsLearned += tier.benefits.spellsLearned ?? 0;
    }
  }
  return totalBenefits;
}
// --- EXAMPLE USAGE ---
// Let's create a character's path progression state.
// This character has spent 2 points in the Spellcaster Path and 1 in the Martial Path.
const hybridCharacterProgression: PathProgressionState = {
  spellcaster_path: 2,
  martial_path: 1,
};
// Now, we use our service function to calculate the total benefits.
const derivedBenefits = calculateTotalPathBenefits(hybridCharacterProgression);
/*
Expected Calculation:
- From Spellcaster Path (Level 1 & 2):
  - manaPoints: 2 + 2 = 4
  - cantripsLearned: 1 + 1 = 2
  - spellsLearned: 1 + 0 = 1
- From Martial Path (Level 1):
  - staminaPoints: 1
  - maneuversLearned: 1
  - techniquesLearned: 1
The console output will be:
{
  staminaPoints: 1,
  maneuversLearned: 1,
  techniquesLearned: 1,
  manaPoints: 4,
  cantripsLearned: 2,
  spellsLearned: 1
}
*/
console.log(derivedBenefits);
```

## File: paths/paths.data.ts
```typescript
// paths.data.ts
import { CharacterPath } from './path.types';
/**
 * An array containing the definitions for all available Character Paths.
 * This is the static "game rule" data for your application.
 */
export const CHARACTER_PATHS: CharacterPath[] = [
  {
    id: 'martial_path',
    name: 'Martial Path',
    description: 'Focuses on combat training, maneuvers, and techniques.',
    progression: [
      { pathLevel: 1, benefits: { staminaPoints: 1, maneuversLearned: 1, techniquesLearned: 1 } },
      { pathLevel: 2, benefits: { staminaPoints: 1 } },
      { pathLevel: 3, benefits: { staminaPoints: 1, maneuversLearned: 1, techniquesLearned: 1 } },
      { pathLevel: 4, benefits: { staminaPoints: 1 } },
    ],
    specialRules: [
      // CORRECTED RULE:
      "Spellcaster Stamina: A Spellcaster gains this benefit after spending 2 Path Points on the Martial Path. Benefit: Once per round, you regain up to half your maximum SP when you use a Spell Enhancement."
    ]
  },
  {
    id: 'spellcaster_path',
    name: 'Spellcaster Path',
    description: 'Focuses on increasing magical resources and known spells.',
    progression: [
      { pathLevel: 1, benefits: { manaPoints: 2, cantripsLearned: 1, spellsLearned: 1 } },
      { pathLevel: 2, benefits: { manaPoints: 2, cantripsLearned: 1 } },
      { pathLevel: 3, benefits: { manaPoints: 2, cantripsLearned: 1, spellsLearned: 1 } },
      { pathLevel: 4, benefits: { manaPoints: 2, spellsLearned: 1 } },
    ],
  },
];
```

## File: paths/paths.types.ts
```typescript
// path.types.ts
/**
 * A unique identifier for each character path.
 * Using a union of string literals provides type safety and autocompletion.
 */
export type PathId = 'martial_path' | 'spellcaster_path';
/**
 * Defines the specific benefits gained at a single level of a path's progression.
 * All properties are optional because a level might only grant one or two things.
 */
export interface PathBenefits {
  staminaPoints?: number;
  maneuversLearned?: number;
  techniquesLearned?: number;
  manaPoints?: number;
  cantripsLearned?: number;
  spellsLearned?: number;
}
/**
 * Represents a single tier in a path's progression table.
 */
export interface PathLevel {
  pathLevel: number; // The number of Path Points spent to unlock this tier
  benefits: PathBenefits;
}
/**
 * The complete data structure for a single Character Path.
 */
export interface CharacterPath {
  id: PathId;
  name: string;
  description: string;
  progression: PathLevel[];
  specialRules?: string[];
}
```

## File: schemas/character.schema.ts
```typescript
/**
 * @file src/lib/rulesdata/schemas/character.schema.ts
 * @description The definitive schema for all character creation data, designed for robust, machine-readable processing.
 */
// ================================================================= //
// I. CORE EFFECT MODEL - The Heart of the System
// ================================================================= //
/** A universal, machine-readable representation of a single mechanical effect. */
export type Effect =
	| ModifyAttributeEffect
	| ModifyStatEffect
	| SetValueEffect
	| GrantAbilityEffect
	| GrantResistanceEffect
	| GrantVulnerabilityEffect
	| GrantAdvantageOnSaveEffect
	| GrantAdvantageOnCheckEffect
	| GrantCombatTrainingEffect
	| GrantMovementEffect
	| GrantSenseEffect
	| GrantChoiceEffect
	| GrantSkillExpertiseEffect
	| GrantTradeExpertiseEffect
	| GrantSpellEffect
	| GrantCantripEffect
	| GrantManeuverEffect
	| ModifyMasteryCapEffect
	| IncreaseMasteryCapEffect;
// --- Effect Type Interfaces ---
export interface ModifyAttributeEffect {
	type: 'MODIFY_ATTRIBUTE';
	target: string;
	value: number;
	userChoice?: { prompt: string; options?: string[] };
}
export interface ModifyStatEffect {
	type: 'MODIFY_STAT';
	target: string;
	value: number;
	condition?: string;
}
export interface SetValueEffect {
	type: 'SET_VALUE';
	target: string;
	value: string | number;
}
export interface GrantAbilityEffect {
	type: 'GRANT_ABILITY';
	target: string;
	value: string;
}
export interface GrantResistanceEffect {
	type: 'GRANT_RESISTANCE';
	target: string;
	value: string | number | boolean;
	optional?: string;
}
export interface GrantVulnerabilityEffect {
	type: 'GRANT_VULNERABILITY';
	target: string;
	value: number;
}
export interface GrantAdvantageOnSaveEffect {
	type: 'GRANT_ADV_ON_SAVE';
	target: string;
	value: string | boolean;
}
export interface GrantAdvantageOnCheckEffect {
	type: 'GRANT_ADV_ON_CHECK';
	target: string;
	value: string | boolean;
}
export interface GrantCombatTrainingEffect {
	type: 'GRANT_COMBAT_TRAINING';
	target: string;
	value: boolean;
}
export interface GrantMovementEffect {
	type: 'GRANT_MOVEMENT';
	target: string;
	value: string;
}
export interface GrantSenseEffect {
	type: 'GRANT_SENSE';
	target: string;
	value: number;
}
export interface GrantChoiceEffect {
	type: 'GRANT_CHOICE';
	target: string;
	value: number;
	userChoice?: { prompt: string; options?: string[] };
}
export interface GrantSkillExpertiseEffect {
	type: 'GRANT_SKILL_EXPERTISE';
	target: string;
	value: { capIncrease: number; levelIncrease: number };
	userChoice?: { prompt: string; count?: number };
}
export interface GrantTradeExpertiseEffect {
	type: 'GRANT_TRADE_EXPERTISE';
	target: string;
	value: { capIncrease: number; levelIncrease: number };
	userChoice?: { prompt: string };
}
export interface GrantSpellEffect {
	type: 'GRANT_SPELL';
	target: string;
	value: number | string;
	userChoice?: { prompt: string; options?: string[] };
}
export interface GrantCantripEffect {
	type: 'GRANT_CANTRIP';
	target: string;
	value: number;
}
export interface GrantManeuverEffect {
	type: 'GRANT_MANEUVERS' | 'GRANT_TECHNIQUES';
	target: string;
	value: number;
}
export interface ModifyMasteryCapEffect {
	type: 'MODIFY_SKILL_MASTERY_CAP' | 'MODIFY_TRADE_MASTERY_CAP';
	tier: 'Adept' | 'Expert' | 'Master' | 'Grandmaster';
	count: number;
	options?: string[];
}
export interface IncreaseMasteryCapEffect {
	type: 'INCREASE_SKILL_MASTERY_CAP' | 'INCREASE_TRADE_MASTERY_CAP';
	count: number;
	value: number;
	options?: string[];
}
// ================================================================= //
// II. ANCESTRY & TRAIT SCHEMAS
// ================================================================= //
export interface Trait {
	id: string;
	name: string;
	description: string;
	cost: number;
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
	/** Reference to the PDF / patch version the rules were sourced from. */
	rulesSource?: string;
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
	name: string; // The value/ID of the option.
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
	// Path objects define the class's progression mechanics
	martialPath?: {
		combatTraining?: {
			weapons?: string[];
			armor?: string[];
			shields?: string[];
		};
		maneuvers?: {
			learnsAllAttack?: boolean;
			additionalKnown?: string;
		};
		techniques?: {
			additionalKnown?: string;
		};
		staminaPoints?: {
			maximumIncreasesBy?: string;
		};
		staminaRegen?: {
			description?: string;
			conditions?: string[];
		};
	};
	spellcasterPath?: {
		spellList?: any;
		cantrips?: {
			description?: string;
		};
		spells?: {
			description?: string;
		};
		manaPoints?: {
			maximumIncreasesBy?: string;
		};
	};
	hybridPath?: {
		martialAspect?: {
			combatTraining?: {
				weapons?: string[];
				armor?: string[];
				shields?: string[];
			};
			maneuvers?: {
				learnsAllAttack?: boolean;
				additionalKnown?: string;
			};
			techniques?: {
				additionalKnown?: string;
			};
			staminaPoints?: {
				maximumIncreasesBy?: string;
			};
			staminaRegen?: {
				description?: string;
				conditions?: string[];
			};
		};
		spellcastingAspect?: {
			spellList?: any;
			cantrips?: {
				description?: string;
			};
			spells?: {
				description?: string;
			};
			manaPoints?: {
				maximumIncreasesBy?: string;
			};
		};
	};
	coreFeatures: ClassFeature[];
	subclasses: Subclass[];
}
// ================================================================= //
// IV. CALCULATION DATA STRUCTURES
// ================================================================= //
/** Aggregated stat modifiers from all effects */
export interface StatModifiers {
	// Attributes
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
	// Core Stats
	hpMax: number;
	spMax: number;
	mpMax: number;
	pd: number;
	ad: number;
	pdr: number;
	// Movement & Combat
	moveSpeed: number;
	jumpDistance: number;
	deathThresholdModifier: number;
	saveDC: number;
	initiativeBonus: number;
	// Resource Stats
	skillPoints: number;
	tradePoints: number;
	languagePoints: number;
	attributePoints: number;
	ancestryPoints: number;
	restPoints: number;
	gritPoints: number;
	// Learning Stats
	maneuversKnown: number;
	techniquesKnown: number;
	cantripsKnown: number;
	spellsKnown: number;
	skillMasteryLimit: number;
	tradeMasteryLimit: number;
	knowledgeMasteryLimit: number;
}
/** Conditional modifiers that depend on circumstances */
export interface ConditionalModifier {
	effect: Effect;
	condition: string;
	description: string;
}
/** Abilities granted to the character (displayed as features) */
export interface GrantedAbility {
	name: string;
	description: string;
	source: string; // e.g., "Human Trait: Determination"
	type: 'passive' | 'active' | 'resistance' | 'advantage';
}
/** Result of effect processing */
export interface EffectProcessingResult {
	statModifiers: StatModifiers;
	conditionalModifiers: ConditionalModifier[];
	grantedAbilities: GrantedAbility[];
	combatTraining: string[];
	resistances: Array<{ type: string; value: string }>;
	vulnerabilities: Array<{ type: string; value: string }>;
	senses: Array<{ type: string; range: number }>;
	movements: Array<{ type: string; speed: string }>;
}
```

## File: schemas/class.schema.ts
```typescript
import { z } from 'zod';
// Schema for IEffect
const effectSchema = z.object({
	type: z.string(),
	target: z.string().optional(),
	value: z.any().optional(),
	condition: z.string().optional(),
	userChoiceRequired: z
		.object({
			prompt: z.string(),
			options: z.array(z.string()).optional()
		})
		.optional(),
	descriptionOverride: z.string().optional(),
	subFeature: z.string().optional(),
	schools: z.array(z.string()).optional()
});
// Schema for IClassFeatureChoiceOption
const classFeatureChoiceOptionSchema = z.object({
	value: z.string(),
	label: z.string(),
	description: z.string().optional(),
	effectsOnChoice: z.array(effectSchema).optional()
});
// Schema for IClassFeatureChoice
const classFeatureChoiceSchema = z.object({
	id: z.string(),
	prompt: z.string(),
	type: z.enum(['select_one', 'select_multiple']),
	maxSelections: z.number().optional(),
	options: z.array(classFeatureChoiceOptionSchema)
});
// Schema for IBenefit
const benefitSchema = z.object({
	name: z.string(),
	description: z.string(),
	effects: z.array(effectSchema).optional()
});
// Schema for IClassFeature
const classFeatureSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	level: z.number(),
	effects: z.array(effectSchema).optional(),
	benefits: z.array(benefitSchema).optional()
});
// ADD THESE SCHEMAS
const combatTrainingSchema = z
	.object({
		weapons: z.array(z.string()).optional(),
		armor: z.array(z.string()).optional(),
		shields: z.array(z.string()).optional()
	})
	.optional();
const martialPathSchema = z
	.object({
		combatTraining: combatTrainingSchema,
		maneuvers: z
			.object({ learnsAllAttack: z.boolean().optional(), additionalKnown: z.string().optional() })
			.optional(),
		techniques: z.object({ additionalKnown: z.string().optional() }).optional(),
		staminaPoints: z.object({ maximumIncreasesBy: z.string().optional() }).optional(),
		staminaRegen: z
			.object({ description: z.string().optional(), conditions: z.array(z.string()).optional() })
			.optional()
	})
	.optional();
const spellcasterPathSchema = z
	.object({
		spellList: z.any().optional(),
		cantrips: z.object({ description: z.string() }).optional(),
		spells: z.object({ description: z.string() }).optional(),
		manaPoints: z.object({ maximumIncreasesBy: z.string().optional() }).optional()
	})
	.optional();
const hybridPathSchema = z
	.object({
		martialAspect: martialPathSchema,
		spellcastingAspect: spellcasterPathSchema
	})
	.optional();
// Schema for IClassDefinition
export const classSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	level1Stats: z.object({
		healthPoints: z.number(),
		staminaPoints: z.number(),
		manaPoints: z.number(),
		skillPoints: z.number(),
		tradePoints: z.number(),
		maneuversKnown: z.number(),
		techniquesKnown: z.number(),
		cantripsKnown: z.number(),
		spellsKnown: z.number()
	}),
	levelProgression: z.array(
		z.object({
			level: z.number(),
			healthPoints: z.number(),
			attributePoints: z.number(),
			skillPoints: z.number(),
			tradePoints: z.number(),
			staminaPoints: z.number(),
			maneuversKnown: z.number(),
			techniquesKnown: z.number(),
			manaPoints: z.number(),
			cantripsKnown: z.number(),
			spellsKnown: z.number(),
			features: z.string()
		})
	),
	martialPath: martialPathSchema,
	spellcasterPath: spellcasterPathSchema,
	hybridPath: hybridPathSchema,
	level1Features: z.array(classFeatureSchema).optional(),
	featureChoicesLvl1: z.array(classFeatureChoiceSchema).optional()
});
// Schema for an array of class definitions
export const classesDataSchema = z.array(classSchema);
// Infer the TypeScript type from the schema
export type IClassDefinition = z.infer<typeof classSchema>;
```

## File: schemas/spell.schema.ts
```typescript
// ./spells-data/types/spell.types.ts
/**
 * @file spell.types.ts
 * @description This file contains the definitive TypeScript schemas and enumerations
 * for modeling all spells in the DC20 system.
 */
export enum SpellSchool {
	Astromancy = 'Astromancy',
	Conjuration = 'Conjuration',
	Destruction = 'Destruction',
	Divination = 'Divination',
	Enchantment = 'Enchantment',
	Illusion = 'Illusion',
	Protection = 'Protection',
	Restoration = 'Restoration',
	Transmutation = 'Transmutation',
	Abjuration = 'Abjuration'
}
export enum SpellList {
	Arcane = 'Arcane',
	Primal = 'Primal',
	Divine = 'Divine'
}
export enum ClassName {
	Wizard = 'Wizard',
	Sorcerer = 'Sorcerer',
	Cleric = 'Cleric',
	Druid = 'Druid'
}
export enum PremadeSpellList {
	FireAndFlames = 'Fire & Flames List',
	IceAndIllusions = 'Ice & Illusions List',
	LightningAndTeleportation = 'Lightning & Teleportation List',
	PsychicAndEnchantment = 'Psychic & Enchantment List',
	HolyAndRestoration = 'Holy & Restoration List',
	SpecialClass = 'Special Class Feature Spells',
	FiendbornAncestry = 'Fiendborn Ancestry Trait Spells',
	Additional = 'Additional Spells'
}
export interface SpellCost {
	ap: number;
	mp?: number;
}
export interface SpellEffect {
	title: string;
	description: string;
}
export interface SpellEnhancement {
	type: 'AP' | 'MP';
	cost: number;
	name: string;
	description: string;
}
export interface Spell {
	name: string;
	premadeList: PremadeSpellList;
	school: SpellSchool;
	isCantrip: boolean;
	isRitual?: boolean;
	cost: SpellCost;
	range: string;
	duration: string;
	spellLists: SpellList[];
	availableClasses: ClassName[];
	effects: SpellEffect[];
	cantripPassive?: string;
	enhancements: SpellEnhancement[];
}
```

## File: schemas/types.ts
```typescript
// src/lib/rulesdata/types.ts
// Interface for Attribute Data
export interface IAttributeData {
	id: 'might' | 'agility' | 'charisma' | 'intelligence';
	name: string;
	description: string;
	derivedStats?: Array<{ statName: string; formula: string }>;
}
// Interface for Trait Effects
export interface ITraitEffect {
	type: string; // e.g., 'MODIFY_ATTRIBUTE', 'GRANT_SKILL_EXPERTISE', 'GRANT_FEATURE'
	target?: string; // e.g., attribute ID ('might'), skill ID ('athletics'), feature ID ('rage')
	value?: any; // e.g., number for attribute modification, object for skill expertise details
	condition?: string; // Optional condition for the effect to apply
	userChoiceRequired?: {
		// Details if the user needs to make a choice for this effect
		prompt: string; // Prompt shown to the user
		options?: string[]; // Optional list of specific options (e.g., skill IDs, attribute IDs)
	};
	descriptionOverride?: string; // Optional override for how this effect is described
	subFeature?: string; // Optional sub-feature identifier for complex effects
	schools?: string[]; // Optional list of spell schools associated with the effect
}
// Interface for Traits
export interface ITrait {
	id: string;
	name: string;
	description: string;
	cost: number; // Ancestry points cost
	isNegative?: boolean; // True if this is a Negative Trait (grants points)
	effects?: ITraitEffect[]; // Array of effects the trait grants
	prerequisites?: any[]; // Optional prerequisites for taking this trait
	sourceAncestryId?: string; // ID of the ancestry this trait belongs to (for combined lists)
}
// Interface for Ancestries
export interface IAncestry {
	id: string;
	name: string;
	description: string;
	defaultTraitIds?: string[]; // Traits automatically granted
	expandedTraitIds: string[]; // Traits available for selection
	rulesSource?: string; // e.g., 'DC20Beta0.95' to track PDF/patch version
	origin?: {
		// Optional origin property for ancestries with specific origins (e.g., Dragonborn, Fiendborn, Beastborn)
		prompt: string; // Prompt shown to the user for choosing an origin
		options?: string[]; // Optional list of specific options for the origin
	};
	variantTraits?: ITrait[]; // Optional list of variant traits (e.g., Fallen Angelborn, Redeemed Fiendborn)
}
// Interface for Class Feature Choice Options
export interface IClassFeatureChoiceOption {
	value: string; // Internal value for the choice
	label: string; // Display label for the choice
	description?: string; // Optional description for the choice
	effectsOnChoice?: ITraitEffect[]; // Effects granted if this option is chosen
}
// Interface for Class Feature Choices
export interface IClassFeatureChoice {
	id: string; // Internal ID for the choice (e.g., 'sorcerousOrigin')
	prompt: string; // Prompt shown to the user
	type: 'select_one' | 'select_multiple'; // Type of selection
	maxSelections?: number; // Max number of options if type is 'select_multiple'
	options: IClassFeatureChoiceOption[]; // Available options for the choice
}
// Interface for Class Features
export interface IClassFeature {
	id: string;
	name: string;
	description: string;
	level: number; // Level at which the feature is gained
	effects?: ITraitEffect[]; // Effects granted by the feature
}
// Interface for Class Definitions
export interface IClassDefinition {
	id: string;
	name: string;
	description: string;
	// Base stats granted by the class at Level 1
	baseHpContribution: number;
	startingSP: number;
	startingMP: number;
	skillPointGrantLvl1?: number; // Additional skill points granted at Lvl 1 (beyond Int mod)
	tradePointGrantLvl1?: number; // Additional trade points granted at Lvl 1 (beyond Int mod)
	combatTraining?: string[]; // Array of combat training proficiencies (e.g., 'Weapons', 'All Armor')
	maneuversKnownLvl1?: string | number; // Maneuvers known at Level 1 (can be 'All Attack' or a number)
	techniquesKnownLvl1?: number; // Techniques known at Level 1
	saveDCBase: number;
	deathThresholdBase: number;
	moveSpeedBase: number;
	restPointsBase: number;
	gritPointsBase: number; // Base grit points (before Charisma mod)
	initiativeBonusBase: number; // Base initiative bonus (before Agility mod)
	// Add cantripsKnownLvl1, spellsKnownLvl1 if applicable (not for Barbarian L1)
	cantripsKnownLvl1?: number;
	spellsKnownLvl1?: number;
	level1Features: IClassFeature[]; // Features gained at Level 1
	featureChoicesLvl1?: IClassFeatureChoice[]; // Choices available for features at Level 1
	// ... other level-specific data to be added later
}
// Interface for Skill Data
export interface ISkillData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence' | 'prime'; // Associated attribute
	description: string;
}
// Interface for Trade Data
export interface ITradeData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence'; // Associated attribute
	description: string;
	tools?: string; // Required tools for the trade
}
// Interface for Language Data
export interface ILanguageData {
	id: string;
	name: string;
	type: 'standard' | 'exotic'; // Type of language
	description: string;
}
```

## File: spells-data/spells/additional-spells/close-wounds.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const closeWounds: Spell = {
	name: 'Close Wounds',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Restoration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Allied Creature',
			description:
				'You touch an allied creature that has at least 1 HP, tapping into its inner life force to cause a surge of natural healing. Make a DC 10 Spell Check. Success: The target can spend 1 Rest Point to regain 2 HP. Failure: The target spends 1 Rest Point to regain 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description: 'You increase the range to 10 Spaces (and don’t have to touch the target).'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bolster',
			description:
				'You increase the HP regained by 3. You can take this enhancement multiple times.'
		}
	]
};
```

## File: spells-data/spells/additional-spells/death-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const deathBolt: Spell = {
	name: 'Death Bolt',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Umbral damage.'
		},
		{
			title: 'Black Orb',
			description:
				'Black wispy magic swirls around your hands. Your touch send chills down the spine of creatures and make small plants wither. You can hold this dark energy in your hands for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Bloodied.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Umbral damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dampen Heal',
			description:
				'Creatures that take damage from this Spell can’t regain HP until the start of their next turn.'
		}
	]
};
```

## File: spells-data/spells/additional-spells/druidcraft.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const druidcraft: Spell = {
	name: 'Druidcraft',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Transmutation,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Natural Sensory Effect',
			description:
				'You target an area within range and produce a harmless natural smell (such as flowers, faint odor of skunk, etc.) or sound (rustling leaves, a small animal, etc.).'
		},
		{
			title: 'Accelerate Plant Growth',
			description:
				'You target a living mundane plant and instantly accelerate the growth of the plant (flowers bloom, seeds open, etc.).'
		},
		{
			title: 'Revive Plant',
			description:
				'You target a wounded or dead mundane plant (smaller than a 1 Space cube) and bring it back to life.'
		}
	],
	enhancements: [] // No enhancements specified in PDF
};
```

## File: spells-data/spells/additional-spells/find-familiar.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const findFamiliar: Spell = {
	name: 'Find Familiar',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	isRitual: true,
	cost: { ap: 1, mp: 1 },
	range: '2 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Summon Familiar',
			description:
				'You summon a friendly spirit that enters your service. It takes the form of a Tiny creature of your choice, but with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below: Familiar Level 1/8, Tiny (Chosen Type) HP Shared Prime & CM Shared PD 8+CM PDR 0 AD 8+CM MDR 0 MIG 0 CHA 0 AGI 0 INT 0 Check Shared Save DC Shared AP Shared Speed 5 Recasting the Spell: You can’t have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits. Base Familiar Traits: Your Familiar has the following Familiar Traits: Familiar Bond: Your Familiar shares your HP and Death’s Door Threshold. If you both take damage from the same source, you only take 1 instance of that damage. While your Familiar occupies the same Space as you, it can’t be targeted by Attacks. Shared Telepathy: While within 20 Spaces, you and your Familiar can speak Telepathically with each other. Spell Delivery: While within 10 Spaces of your Familiar, you can cast a Spell with a range of Touch as if you were standing in your Familiar’s Space. Additional Traits: When you cast this Spell, you can spend additional MP (up to your Mana Spend Limit) to grant your Familiar 2 additional Traits per MP spent. You can choose Traits from the Familiar Traits or Beast Traits (you can’t choose Negative Traits). Spell Actions: Pocket Dimension: You can spend a Minor Action to dismiss the Familiar into a pocket dimension, summon it from that pocket dimension, or summon it from anywhere on the same plane of existence. When dismissed, any items it was carrying are left behind. When summoned, it appears in the nearest unoccupied Space of your choice. Shared Senses: While your Familiar is within 20 Spaces, you can spend 1 AP to connect your senses to the Familiar’s senses until the end of your next turn. For the duration, you’re Deafened and Blinded to your own senses but you can see what your Familiar sees and hear what it hears. The connection ends early if either of you moves farther than 20 Spaces from each other. Managing the Familiar: Combat: The Familiar shares your Initiative, acting on your turn. You can spend 1 AP to command the Familiar to use an Action. It can’t take the Attack Action or Spell Action unless it has a Familiar Feature that allows it to. When you take an Action, your Familiar can move up to its Speed immediately before or after the Action. If you don’t command it, it takes the Dodge Action. Shared MCP: When the Familiar makes a Check, it shares your Multiple Check Penalty. Death & Resurrection: Your Familiar dies when you die. When it does, its body disappears and its spirit returns from which it came. If you’re resurrected, the Familiar doesn’t return to life until the next time you cast this Spell. When it does, you follow the normal rules for recasting the Spell.'
		}
	],
	enhancements: [] // No enhancements specified in PDF
};
```

## File: spells-data/spells/additional-spells/index.ts
```typescript
import { druidcraft } from './druidcraft';
import { findFamiliar } from './find-familiar';
import { shield } from './shield';
import { tetheringVines } from './tethering-vines';
import { closeWounds } from './close-wounds';
import { deathBolt } from './death-bolt';
export const additionalSpells = [
	druidcraft,
	findFamiliar,
	shield,
	tetheringVines,
	closeWounds,
	deathBolt
];
```

## File: spells-data/spells/additional-spells/shield.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, PremadeSpellList } from '../../../schemas/spell.schema';
export const shield: Spell = {
	name: 'Shield',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Protection,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Barrier',
			description:
				'You create a barrier of magic to protect yourself or another creature nearby. Trigger: When a creature you can see within range (including yourself) is targeted by an Attack. Reaction: You grant the target a +5 bonus to its PD and AD against the Attack.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Increase Range',
			description: 'The range increases to 5 Spaces.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Multiple Targets',
			description:
				'You can target 1 additional creature in range from the same triggering Attack (such as an Area of Effect).'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Increase Duration',
			description: 'The PD and AD bonus lasts until the start of your next turn.'
		}
	]
};
```

## File: spells-data/spells/additional-spells/tethering-vines.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const tetheringVines: Spell = {
	name: 'Tethering Vines',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Sprout Vines',
			description:
				'Choose a Space within range. Vines and weeds sprout up from the ground in a 3 Space Radius from the chosen Space, making the area Difficult Terrain. Make a Spell Check Contested by a Physical Save from all creatures (other than you) within range. Success: The creature is Tethered. Tethered: While Tethered, the creature can’t leave the area. The creature can spend 1 AP to make a Physical Check of your choice against your Save DC. Success: The target is no longer Tethered. When the Spell ends, the conjured plants wilt away.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Widen Vines', description: 'The radius increases by 1 Space.' }
	]
};
```

## File: spells-data/spells/fiendborn-ancestry-spells/acid-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const acidBolt: Spell = {
	name: 'Acid Bolt',
	premadeList: PremadeSpellList.FiendbornAncestry,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Corrosion damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Hindered.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Corrosion damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Corrode',
			description:
				'The target makes a Physical Save. Failure: Target becomes Hindered for 1 minute or until a creature (including itself) within 1 Space spends 1 AP to clear off the acid.'
		}
	]
};
```

## File: spells-data/spells/fiendborn-ancestry-spells/index.ts
```typescript
import { poisonBolt } from './poison-bolt';
import { acidBolt } from './acid-bolt';
export const fiendbornAncestrySpells = [poisonBolt, acidBolt];
```

## File: spells-data/spells/fiendborn-ancestry-spells/poison-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const poisonBolt: Spell = {
	name: 'Poison Bolt',
	premadeList: PremadeSpellList.FiendbornAncestry,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Poison damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Impaired.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Poison damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Sicken',
			description:
				'The target makes a Physical Save. Failure: Target becomes Impaired for 1 minute. A creature within 1 Space, including itself, can spend 1 AP to make a DC 10 Medicine Check to end the Condition early.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/burning-flames.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const burningFlames: Spell = {
	name: 'Burning Flames',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self (10 Spaces)',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Area of Effect',
			description:
				'A brilliant flame manifests around you. Choose a type of area: Line, Cone, or Sphere. You are the Spell’s Point of Origin. Line: The Spell affects every target in a 1 Space wide and 10 Space long line. Cone: The Spell creates a 3 Space long Cone. Sphere: The Spell affects every target in a 2 Space radius. Make a Spell Check against every target’s AD within the Spell’s area. Hit: The target takes 2 Fire damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Burning',
			description:
				'Each target makes a Physical Save. Failure: The target begins Burning until a creature (including itself) within 1 Space spends 1 AP to put it out.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The Point of Origin of the Spell becomes a point of your choice within 15 Spaces (instead of Self).'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/dancing-flames.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const dancingFlames: Spell = {
	name: 'Dancing Flames',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '20 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Flames',
			description:
				'Make a DC 10 Spell Check. Success: You create up to 3 torch-sized Flames within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. Success (each 5): +1 Flame. Failure: 2 Flames. You can also combine 4 Flames into 1 glowing vaguely humanoid form of Medium Size. Whichever form you choose, each Flame sheds Bright Light in a 2 Space radius. You can spend 1 AP to move the Flames up to 10 Spaces to a new Space within range. A Flame must be within 5 Spaces of another Flame created by this Spell and be within 20 Spaces from you, or it winks out of existence.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 2,
			name: 'Detonate',
			description:
				'Spend 2 AP and 1 MP to detonate the Flames. Make a single Spell Check and compare it against the AD of each target sharing a Space with a Flame. Hit: Each Flame in that Space deals 1 Fire damage to the target, but doesn’t benefit from Heavy, Brutal, or Critical Hits.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/fire-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const fireBolt: Spell = {
	name: 'Fire Bolt',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Fire damage.'
		},
		{
			title: 'Fire Orb',
			description:
				'A flickering flame appears in your hand. The flame can remain there for 10 minutes and harms neither you nor your equipment. The flame sheds Bright Light in a 5 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Burning.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Fire damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by +5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Burning',
			description: 'The target makes a Physical Save. Failure: Target begins Burning.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/fire-shield.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const fireShield: Spell = {
	name: 'Fire Shield',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 1, mp: 2 },
	range: 'Self',
	duration: '1 minute',
	spellLists: [SpellList.Wizard],
	availableClasses: [],
	effects: [
		{
			title: 'Protective Flames',
			description:
				'A shield of fire surrounds you, granting you Fire Resistance (Half). When a creature within 1 Space of you hits you with a Melee Attack, it takes 2 Fire damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Burning Retribution',
			description: 'The damage dealt to attackers increases to 3 Fire damage.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/fog-cloud.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const fogCloud: Spell = {
	name: 'Fog Cloud',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '20 Spaces',
	duration: '1 hour (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Fog',
			description:
				'Make a DC 10 Spell Check. Success: You create a sphere of fog with up to a 4 Space radius, centered on a point within range. Succeed (each 5): Radius increases by 1 Space. Failure: 3 Space radius. The Sphere spreads around corners and its area is Fully Concealed. Creatures within 1 Space of each other can see each other normally. The fog lasts for the duration or until a wind of moderate or greater speed disperses it.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Area of Effect',
			description: 'The radius of the Spell’s effect increases by 3 Spaces.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/grease.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const grease: Spell = {
	name: 'Grease',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Slick Ground',
			description:
				'Make a DC 10 Spell Check. Success: Slick grease covers the ground in 4 Spaces of your choosing within range. Failure: Only 3 Spaces. The Spaces must connect to each other and all be within range of the Spell. These Spaces are considered to be Difficult Terrain for the duration and are flammable. If fire touches one of these Spaces, the grease ignites and deals 1 Fire damage to any creature within the Space instantly and again to any creature who ends their turn in this Space before the Spell ends. If a creature is standing in one of the Spaces when the grease initially appears, when they end their turn, or when they enter it for the first time on a turn they must make an Agility Save. Failure: They fall Prone.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'More Grease', description: 'You add 4 more Spaces of grease.' },
		{
			type: 'MP',
			cost: 1,
			name: 'More Fire',
			description: 'Fire damage dealt by the Spell is increased by 1.'
		}
	]
};
```

## File: spells-data/spells/fire-and-flames/index.ts
```typescript
import { fireBolt } from './fire-bolt';
import { minorFlameBlade } from './minor-flame-blade';
import { dancingFlames } from './dancing-flames';
import { burningFlames } from './burning-flames';
import { fogCloud } from './fog-cloud';
import { fireShield } from './fire-shield';
import { grease } from './grease';
export const fireAndFlamesSpells = [
	fireBolt,
	minorFlameBlade,
	dancingFlames,
	burningFlames,
	fogCloud,
	fireShield,
	grease
];
```

## File: spells-data/spells/fire-and-flames/minor-flame-blade.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const minorFlameBlade: Spell = {
	name: 'Minor Flame Blade',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Self',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Imbue Weapon',
			description:
				'You imbue a Melee Weapon you’re wielding with flames. Until the end of your next turn, the next Attack Check that hits with this weapon deals an additional 1 Fire damage to your target or a creature within 1 Space of the target.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Flame Strike',
			description:
				'You deal an extra 2 Fire damage to the target (must be done before the Attack is made). Miss: Deal 1 Fire damage to the target.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Flame Bound',
			description:
				'You deal an extra 1 Fire damage to the target and another target within 1 Space.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/bless.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const bless: Spell = {
	name: 'Bless',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Bless Creatures',
			description:
				'Make a DC 10 Spell Check. Success: You bless up to 3 creatures of your choice within range. Success (each 10): +1 additional creature. Failure: Only 2 creatures. Whenever a target makes a Check or Save before the Spell ends, the target can roll a d4 and add the number rolled to the total.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by 1.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Grace',
			description: 'You change the d4 granted by the Spell to a d6.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/guidance.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const guidance: Spell = {
	name: 'Guidance',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Grant Help Die',
			description:
				'You grant a Help Die (d8) to an ally within range. The target can use this Help Die to add to any Check they make before the start of your next turn. Casting Guidance counts as taking the Help Action and still triggers the “Multiple Action Penalty (Help)”. If you cast Guidance again or take the Help Action, the Help Die would be a d6, then a d4, then you wouldn’t be able to grant any more during the same round of Combat.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sustained',
			description: 'The duration increases to 1 minute, but it requires the Sustain Action.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Expand',
			description:
				'You grant an additional Help Die (of the same size you granted with the casting of the Spell).'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/guiding-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const guidingBolt: Spell = {
	name: 'Guiding Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Flash of Light',
			description:
				'A flash of light streaks toward a creature of your choice within range, surrounding them in a holy glow. Make a Spell Check against the target’s PD. Hit: The target takes 3 Radiant damage and the next Attack Check made against the target before the end of your next turn has ADV.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Guiding Damage',
			description:
				'The next Attack Check made against the target also deals an extra 3 Radiant damage on a Hit.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/heal.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const heal: Spell = {
	name: 'Heal',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Restoration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Target',
			description:
				'Make a DC 10 Spell Check. Success: You heal the target creature within range for 3 HP. Success (each 5): + 1 HP. Critical Success: +2 HP. Failure: Only heal for 2 HP. If you’re touching the target of this Spell when you cast it, they regain an extra 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Quick Heal',
			description: 'You reduce the AP cost of this Spell by 1.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bolster',
			description:
				'You increase the HP regained by 3. You can take this enhancement multiple times.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/index.ts
```typescript
import { sacredBolt } from './sacred-bolt';
import { guidance } from './guidance';
import { light } from './light';
import { guidingBolt } from './guiding-bolt';
import { bless } from './bless';
import { heal } from './heal';
import { shieldOfFaith } from './shield-of-faith';
export const holyAndRestorationSpells = [
	sacredBolt,
	guidance,
	light,
	guidingBolt,
	bless,
	heal,
	shieldOfFaith
];
```

## File: spells-data/spells/holy-and-restoration/light.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const light: Spell = {
	name: 'Light',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Conjuration,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Touch',
	duration: '1 hour',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shed Light',
			description:
				'You touch an object that’s no larger than Medium. Until the spell ends, the object sheds Bright Light in a 5 Space radius. You choose the color of the light. Completely covering the object with something opaque blocks the light. The Spell ends if you cast it again or dismiss it as a Free Action. If you target an object held or worn by a hostile creature, make an Attack Check contested by the target’s Agility Save. Success: You cast Light on the object.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Blinding Light',
			description:
				'You make a Spell Check contested by a Physical Save from all targets within 2 Spaces of the Light source. Failure: The target is Blinded for 1 Round.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/sacred-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const sacredBolt: Spell = {
	name: 'Sacred Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [ClassName.Cleric],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Radiant damage.'
		},
		{
			title: 'Sacred Glow',
			description:
				'A beam of Bright Light illuminates a creature that you can see within range, or you can make a creature within range glow with a subtle Dim Light for 10 minutes.'
		}
	],
	cantripPassive: 'You deal +1 Radiant damage against Undead and Exposed creatures.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Radiant damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Holy Bolt',
			description:
				'The target makes a Mental Save. Failure: Target becomes Exposed (Attack Checks against it have ADV) against the next Attack Check made against it before the end of your next turn.'
		}
	]
};
```

## File: spells-data/spells/holy-and-restoration/shield-of-faith.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const shieldOfFaith: Spell = {
	name: 'Shield of Faith',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Protection,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Protective Field',
			description:
				'A shimmering field appears and surrounds a creature of your choice within range. Make a DC 10 Spell Check. Success: The target gains +2 PD for the duration. Success (each 10): +1 PD. Failure: The target gains 1 PD instead.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of creatures you can affect by 1.'
		}
	]
};
```

## File: spells-data/spells/ice-and-illusions/catapult.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const catapult: Spell = {
	name: 'Catapult',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Launch Object',
			description:
				'Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 15 Spaces in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If you attempt to strike a creature, make a Spell Check against the target’s PD. Hit: 3 Bludgeoning damage.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: 'You deal +2 Bludgeoning damage.' }
	]
};
```

## File: spells-data/spells/ice-and-illusions/frost-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const frostBolt: Spell = {
	name: 'Frost Bolt',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Cold damage.'
		},
		{
			title: 'Ice Orb',
			description:
				'A flurry of ice appears in your hand. The ice can remain there for 10 minutes and harms neither you nor your equipment, cooling the area within 5 Spaces. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Slowed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Cold damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Slow',
			description:
				'The target makes a Physical Save. Failure: Target becomes Slowed until the end of your next turn.'
		}
	]
};
```

## File: spells-data/spells/ice-and-illusions/ice-knife.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const iceKnife: Spell = {
	name: 'Ice Knife',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Ice Shard',
			description:
				'You create a shard of ice and fling it at one creature within range. Make a Spell Check against the target’s PD. Hit: The target takes 2 Cold damage and then the ice explodes. Compare the Spell Check to the AD of each creature within 1 space of the original target (including the target). Hit: Deal 1 Cold damage. Miss: The spell doesn’t explode and only deals half damage to the original target.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'You increase the damage of the initial hit and the explosion by 1 each.'
		}
	]
};
```

## File: spells-data/spells/ice-and-illusions/index.ts
```typescript
import { frostBolt } from './frost-bolt';
import { minorIllusion } from './minor-illusion';
import { mageHand } from './mage-hand';
import { catapult } from './catapult';
import { magicMissile } from './magic-missile';
import { iceKnife } from './ice-knife';
import { silentImage } from './silent-image';
export const iceAndIllusionsSpells = [
	frostBolt,
	minorIllusion,
	mageHand,
	catapult,
	magicMissile,
	iceKnife,
	silentImage
];
```

## File: spells-data/spells/ice-and-illusions/mage-hand.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const mageHand: Spell = {
	name: 'Mage Hand',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Conjuration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spectral Hand',
			description:
				'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as a Free Action. The hand vanishes if it ever moves outside of the Spell’s range or if you cast this Spell again. When you cast the Spell, and by spending 1 AP while the Spell is active, you can control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a container. You can move the hand up to 5 Spaces each time you use it, but it must stay within range. The hand can’t Attack, activate magic items, or carry more than 10 pounds.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range Hand', description: 'The range increases to 20 Spaces.' },
		{ type: 'MP', cost: 1, name: 'Lasting Hand', description: 'The duration increases to 1 hour.' }
	]
};
```

## File: spells-data/spells/ice-and-illusions/magic-missile.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const magicMissile: Spell = {
	name: 'Magic Missile',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Glowing Darts',
			description:
				'You attempt to fire out glowing darts of magical force. Make a DC 10 Spell Check. Success: You create 2 Missiles. Success (each 5): +1 Missile. Failure: Only 1 Missile. Each Missile automatically deals 1 True damage to its target. Each missile may have the same or different targets.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: '+1 Missile.' },
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 15 Spaces.' }
	]
};
```

## File: spells-data/spells/ice-and-illusions/minor-illusion.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const minorIllusion: Spell = {
	name: 'Minor Illusion',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Sound or Image',
			description:
				'You create a sound or an image of an object within range that lasts for the duration. The illusion ends if you dismiss it for 1 AP or cast this Spell again. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound can continue unabated throughout the duration or you can make discrete sounds at different times before the Spell ends. If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than 1 Space. The image can’t create sound, light, smell, or any other sensory effect. Discerning the Illusion: If the illusion is an image, any physical interaction with the image reveals it to be an illusion as things pass through it. A creature can spend 1 AP to examine the sound or image to attempt to determine if the illusion is real, by making an Investigation Check against your Save DC. Success: The creature discerns that the objects or sounds made by the Spell are illusions. If the illusion is an image, the illusion becomes transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sight and Sound',
			description: 'The illusion can include both a sound and an image.'
		}
	]
};
```

## File: spells-data/spells/ice-and-illusions/silent-image.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const silentImage: Spell = {
	name: 'Silent Image',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Image',
			description:
				'You create the image of an object, a creature, or some other visible phenomenon in a 3 Space cube. The image appears at a spot within range and lasts for the duration. The image is purely visual and isn’t accompanied by sound, smell, or other sensory effects. You can spend 1 AP to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural. Discerning the Illusion: Physical interaction with the image reveals it to be an illusion. Alternatively, a creature can spend 1 AP to examine the image to attempt to determine if the illusion is real. The creature makes an Investigation Check against your Save DC. Success: The creature discerns the illusion for what it is, revealing it to be false and making the illusion transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sound and Smell',
			description: 'You can add sounds and a smell to the illusion.'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/crackling-lightning.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const cracklingLightning: Spell = {
	name: 'Crackling Lightning',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self (10 Spaces)',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Area of Effect',
			description:
				'Crackling lightning forms around you. Choose a type of area: Line, Cone, or Sphere. You are the Spell’s Point of Origin. Line: The Spell affects every target in a 1 Space wide and 10 Space long line. Cone: The Spell creates a 3 Space long Cone. Sphere: The Spell affects every target in a 2 Space radius. Make a Spell Check against every target’s AD within the Spell’s area. Hit: The target takes 2 Lightning damage.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Frazzled',
			description:
				'Each target makes a Mental Save. Failure: The target becomes Dazed for 1 minute.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The Point of Origin of the Spell becomes a point of your choice within 15 Spaces (instead of Self).'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/gust.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const gust: Spell = {
	name: 'Gust',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Push Creature',
			description:
				'Choose a Medium or smaller creature and make a Spell Check contested by their Might Save. Success: Target is pushed 1 Space in a direction of your choice. Success (each 5): +1 Space.'
		},
		{
			title: 'Push Object',
			description:
				'Choose an object that’s neither held nor carried and that weighs no more than 5 pounds. Make a DC 10 Spell Check. Success: The object is pushed up to 3 Spaces away from you. Success (each 5): +1 Space. Failure: Only 2 Spaces.'
		},
		{
			title: 'Sensory Effect',
			description:
				'You create a harmless sensory effect using air, such as causing leaves to rustle, wind to slam shutters closed, or your clothing to ripple as in a breeze.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Wind Tunnel',
			description:
				'You create a 10 Space long and 2 Space wide Line that lasts 1 minute and requires the Sustain Action. The start of the Wind Tunnel must be within 5 Spaces of you. You choose the direction the Line goes in and what direction the wind is blowing. Creatures in the Wind Tunnel are Slowed 1 moving against the wind, but can move 2 Spaces for every 1 Space spent moving the same direction as the wind. Any creature that starts their turn in the Wind Tunnel must make a Might Save or be pushed 4 Spaces in the direction of the wind. You can spend 1 AP to reverse the direction of the wind in the tunnel.'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/index.ts
```typescript
import { lightningBolt } from './lightning-bolt';
import { lightningBlade } from './lightning-blade';
import { shockingGrasp } from './shocking-grasp';
import { gust } from './gust';
import { returningShock } from './returning-shock';
import { mistyStep } from './misty-step';
import { cracklingLightning } from './crackling-lightning';
export const lightningAndTeleportationSpells = [
	lightningBolt,
	lightningBlade,
	shockingGrasp,
	gust,
	returningShock,
	mistyStep,
	cracklingLightning
];
```

## File: spells-data/spells/lightning-and-teleportation/lightning-blade.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const lightningBlade: Spell = {
	name: 'Lightning Blade',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Self (1 Space radius)',
	duration: '1 round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Imbue Weapon',
			description:
				'You imbue a Melee Weapon you’re wielding with crackling energy. The next Attack Check that hits with this weapon sheathes the target in booming energy. If the target leaves, or is moved from, the current Space they’re in, they automatically take 2 Lightning damage and the Spell ends. This effect can be stacked multiple times from the same or different sources.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'You increase the Lightning damage dealt by 2.'
		},
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration to 1 minute.' }
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/lightning-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const lightningBolt: Spell = {
	name: 'Lightning Bolt',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Lightning damage.'
		},
		{
			title: 'Lightning Orb',
			description:
				'Crackling lightning appears between both of your hands. The electric energy can remain there for 10 minutes and harms neither you nor your equipment. The energy sheds Bright Light in a 10 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, stop using both hands, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are wearing metal armor.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Lightning damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Chain',
			description:
				'Choose 1 additional target within 2 Spaces of the original target. Compare your Spell Check against the new target’s PD. Hit: The additional target takes 2 Lightning damage and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher (except the Cantrip Passive). You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/misty-step.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const mistyStep: Spell = {
	name: 'Misty Step',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Astromancy,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Teleport',
			description:
				'You are briefly surrounded by a silvery mist and attempt to teleport to a new location. Make a DC 20 Spell Check. Success: You teleport up to 5 Spaces to an unoccupied Space that you can see. Success (each 5): +2 Spaces. Failure: Only 3 Spaces.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Far Step',
			description: 'You increase the distance you can teleport by 4 Spaces.'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/returning-shock.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const returningShock: Spell = {
	name: 'Returning Shock',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '15 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock on Damage',
			description:
				'Trigger: You are damaged by a creature within range. Reaction: Make a Spell Check against the target’s PD. Hit: 3 Lightning damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Chain',
			description:
				'You can choose 1 additional target within 2 Spaces of the original target. Compare you Spell Check against the new target’s PD. Hit: The additional target takes 3 Lightning damage, and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher. You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
```

## File: spells-data/spells/lightning-and-teleportation/shocking-grasp.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const shockingGrasp: Spell = {
	name: 'Shocking Grasp',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock',
			description:
				'Lightning springs from your hand to shock a creature within range. Make a Spell Check against the target’s PD, and you have ADV if they’re wearing armor made of metal. The target must make a Physical Save. Hit: 1 Lightning damage. Failed Save: Target can’t spend AP until the start of its next turn.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Lightning Lure',
			description:
				'The damage increases by 1 and the range becomes 5 Spaces. Additionally, if the target fails their Save you can pull them up to 3 spaces toward you.'
		}
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/bane.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const bane: Spell = {
	name: 'Bane',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Curse',
			description:
				'Choose 3 creatures that you can see within range. Make a Spell Check contested by their Mental Save. Failure: The target must roll a d4 and subtract the number from each Attack Check or Save they make until the Spell ends.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by 1.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Dread',
			description: 'Targets subtract a d6 instead of a d4 from their Attack Checks and Saves.'
		}
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/befriend.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const befriend: Spell = {
	name: 'Befriend',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Charm Creature',
			description:
				'You attempt to Charm a creature within range. Choose a non-hostile creature that can see and hear you and make a Spell Check contested by the target’s Charisma Save. Success: The creature is Charmed by you for the duration or until it takes damage. When the Spell effect ends or you fail the Check, the creature realizes that you used magic to influence its mood and may become hostile toward you.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Hostile Charm',
			description: 'You can target even hostile creatures with the Spell.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Clear Suspicion',
			description: 'The target doesn’t realize that magic was used on them when the Spell ends.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'More Friends',
			description: 'You can target an additional creature and increase the range by 10 Spaces.'
		}
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/command.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const command: Spell = {
	name: 'Command',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Issue Command',
			description:
				'You speak a command to a creature that you can see within range that can hear you. You don’t have to see the creature if you’ve seen them within the last minute. Make a Spell Check contested by the target’s Charisma Save. Success: The creature immediately spends 2 AP to follow the command given, regardless of its usual AP cost. The creature can’t spend any resources (AP, SP, or MP) to modify the Action it takes. Ignoring a Command: The Spell has no effect if the target doesn’t understand your language, if it’s unable to follow your command, or if your command is directly harmful to itself. Choosing a Command: You can choose from the list of example commands below or improvise your own at the GM’s discretion. Move: The target moves up to its Speed to a location (or in a direction) of your choice. Prone: The target falls Prone. Drop: The target drops anything it’s holding. Attack: The target makes 1 Attack Check or Spell Check (your choice) that normally costs 1 AP. You choose the target of the Attack, which must be within the commanded creature’s range.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration by 1 Round.' },
		{ type: 'MP', cost: 2, name: 'Targets', description: 'You can add 1 additional target.' }
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/index.ts
```typescript
import { psiBolt } from './psi-bolt';
import { message } from './message';
import { befriend } from './befriend';
import { psychicFear } from './psychic-fear';
import { bane } from './bane';
import { command } from './command';
import { sleep } from './sleep';
export const psychicAndEnchantmentSpells = [
	psiBolt,
	message,
	befriend,
	psychicFear,
	bane,
	command,
	sleep
];
```

## File: spells-data/spells/psychic-and-enchantment/message.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const message: Spell = {
	name: 'Message',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 Round (each way)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Whisper Message',
			description:
				'You point your finger toward a creature you can see within range and verbally whisper a message. The target hears the message in their head and they can reply back with a whisper that you can hear in your head. If you’re familiar with a creature, but you can’t see them or you know they’re beyond a wall or barrier, you can still target them with this Spell but the range is reduced by half.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 30 Spaces.' }
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/psi-bolt.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const psiBolt: Spell = {
	name: 'Psi Bolt',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Psychic,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Psychic damage.'
		},
		{
			title: 'Headache',
			description:
				'You tear into the mind of a creature you can see within range and give them a mild headache for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Dazed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Psychic damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dazed',
			description:
				'The target makes a Mental Save. Failure: Target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.'
		}
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/psychic-fear.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const psychicFear: Spell = {
	name: 'Psychic Fear',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Discordant Melody',
			description:
				'You whisper a discordant melody, only audible to your target, to a creature of your choice within range that you can see and that can hear you, wracking it with terrible pain. Make a Spell Check against the target’s AD while it makes an Intelligence Save. Hit: The target takes 2 Psychic damage. Save Failure: If it has any AP, the target spends 1 AP to move as far as its Speed allows away from you. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Loud Whispers',
			description:
				'On a failed Save, the target to uses an additional 1 AP (if available) to move an additional number of Spaces away from you equal to its Speed.'
		}
	]
};
```

## File: spells-data/spells/psychic-and-enchantment/sleep.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';
export const sleep: Spell = {
	name: 'Sleep',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Magical Slumber',
			description:
				'You attempt to force creatures within 4 Spaces of a point you choose within range to fall into a magical slumber. Make a DC 10 Spell Check. Success: This Spell can effect 10 HP worth of creatures. Success (each 5): +2 HP. Failure: 5 HP. Starting with the creature with the lowest current HP, each creature affected by this Spell falls Unconscious. Subtract each creature’s HP from the total before moving on to the creature with the next lowest current HP. A creature’s HP must be equal to or less than the remaining total for that creature to be affected. The sleep lasts until the Spell ends or another creature within 1 Space spends 1 AP to shake or slap the sleeping creature awake. Undead and creatures that don’t sleep aren’t affected by this spell.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Slumber', description: 'You increase the HP affected by 10.' }
	]
};
```

## File: spells-data/spells/special-class-spells/index.ts
```typescript
import { sorcery } from './sorcery';
export const specialClassSpells = [sorcery];
```

## File: spells-data/spells/special-class-spells/sorcery.ts
```typescript
import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, ClassName, PremadeSpellList } from '../../../schemas/spell.schema';
export const sorcery: Spell = {
	name: 'Sorcery',
	premadeList: PremadeSpellList.SpecialClass,
	school: SpellSchool.Transmutation,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [ClassName.Sorcerer],
	effects: [
		{
			title: 'Minor Wonder',
			description:
				'You manifest a minor wonder (Divine), a sign of supernatural power (Primal), or arcane prowess (Arcane) depending on which Spell List you have access to. When you gain this Spell, choose from the following types of energy: Fire, Water, Lightning, Earth, Holy, Unholy, or Arcane (which manifests as energy of a specific color). This chosen type will be the form this Spell’s energy takes. You create one of the following magical effects of your chosen energy type within range and can dismiss it by spending 1 AP: Your voice booms up to 3 times louder than normal. You summon harmless magic of your chosen energy type to swirl around you in a visual display. Your eyes glow with your chosen energy type.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Multiple Effects',
			description: 'You can have up to all 3 of the effects going at once.'
		}
	]
};
```

## File: spells-data/spells/index.ts
```typescript
import { fireAndFlamesSpells } from './fire-and-flames';
import { iceAndIllusionsSpells } from './ice-and-illusions';
import { lightningAndTeleportationSpells } from './lightning-and-teleportation';
import { psychicAndEnchantmentSpells } from './psychic-and-enchantment';
import { holyAndRestorationSpells } from './holy-and-restoration';
import { specialClassSpells } from './special-class-spells';
import { fiendbornAncestrySpells } from './fiendborn-ancestry-spells';
import { additionalSpells } from './additional-spells';
export * from './fire-and-flames';
export * from './ice-and-illusions';
export * from './lightning-and-teleportation';
export * from './psychic-and-enchantment';
export * from './holy-and-restoration';
export * from './special-class-spells';
export * from './fiendborn-ancestry-spells';
export * from './additional-spells';
export const allSpells = [
	...fireAndFlamesSpells,
	...iceAndIllusionsSpells,
	...lightningAndTeleportationSpells,
	...psychicAndEnchantmentSpells,
	...holyAndRestorationSpells,
	...specialClassSpells,
	...fiendbornAncestrySpells,
	...additionalSpells
];
```

## File: attributes.ts
```typescript
// src/lib/rulesdata/attributes.ts
import { IAttributeData } from './schemas/types';
// To be placed in: src/lib/rulesdata/attributes.ts
export const attributesData: IAttributeData[] = [
	// TODO: Replace bracketed placeholders with accurate information from the DC20 Beta 0.9.5 rulebook.
	{
		id: 'might',
		name: 'Might',
		description: 'Your Strength of Body.',
		derivedStats: [
			// Examples, verify/adjust based on actual rules for each attribute
			{ statName: 'AD (area defense)', formula: '8 + CM + Might + Charisma + Bonuses' },
			{ statName: 'Max HP', formula: 'Class HP + Might + Ancestry HP' }
		]
	},
	{
		id: 'agility',
		name: 'Agility',
		description: 'Your Balance, Nimbleness, and Dexterity.',
		derivedStats: [
			{ statName: 'PD (precision defense)', formula: '8 + CM + Agility + Intelligence + Bonuses' },
			{ statName: 'Jump Distance', formula: 'Agility (min 1)' },
			{ statName: 'Initiative', formula: 'CM + Agility' },
			{ statName: 'Movement Speed', formula: '5 spaces (base) + trait modifiers' }
		]
	},
	{
		id: 'charisma',
		name: 'Charisma',
		description: 'Your Charm, Presence, Persuasiveness, and Force of Will.',
		derivedStats: [{ statName: 'Grit Points', formula: '2 + Charisma' }]
	},
	{
		id: 'intelligence',
		name: 'Intelligence',
		description: 'Your Reasoning, Understanding, and Wisdom.',
		derivedStats: [{ statName: 'Base Skill Points', formula: '5 + Intelligence' }]
	}
];
```

## File: death.ts
```typescript
/**
 * DC20 Death & Health Threshold Rules
 * Based on official DC20 rulebook pages for Health Points & Death's Door
 */
export interface HealthStatus {
	status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
	description: string;
	effects: string[];
}
export interface DeathSaveResult {
	success: boolean;
	effect: string;
}
/**
 * Calculate current health status based on HP
 */
export function getHealthStatus(
	currentHP: number,
	maxHP: number,
	deathThreshold: number
): HealthStatus {
	const halfHP = Math.floor(maxHP / 2);
	const quarterHP = Math.floor(maxHP / 4);
	if (currentHP <= deathThreshold) {
		return {
			status: 'dead',
			description: 'Dead',
			effects: ['Character is dead']
		};
	}
	if (currentHP <= 0) {
		return {
			status: 'deaths-door',
			description: "Death's Door",
			effects: [
				'Immediately gain Exhaustion 1',
				'Action Point Limit: 1 AP until end of next turn or restored to 1 HP',
				"Can't Concentrate",
				'Death Saves at end of turns (d20, 10+ succeeds)',
				'Failure: 1 True damage, Critical Failure: Unconscious until 1 HP',
				'Critical Success: Restored to 1 HP'
			]
		};
	}
	if (currentHP <= quarterHP) {
		return {
			status: 'well-bloodied',
			description: 'Well-Bloodied',
			effects: ['HP is 1/4 or lower of maximum', 'Subject to Well-Bloodied effects from abilities']
		};
	}
	if (currentHP <= halfHP) {
		return {
			status: 'bloodied',
			description: 'Bloodied',
			effects: ['HP is 1/2 or lower of maximum', 'Subject to Bloodied effects from abilities']
		};
	}
	return {
		status: 'healthy',
		description: 'Healthy',
		effects: ['No health penalties']
	};
}
/**
 * Calculate Death Threshold
 * Death Threshold = 0 HP minus Prime Modifier + Combat Mastery
 */
export function calculateDeathThreshold(primeModifier: number, combatMastery: number): number {
	return -(primeModifier + combatMastery);
}
/**
 * Death Save mechanics
 */
export function processDeathSave(roll: number): DeathSaveResult {
	if (roll === 1) {
		return {
			success: false,
			effect:
				'Critical Failure: Take 1 True damage and become Unconscious until restored to 1 HP or higher'
		};
	}
	if (roll === 20) {
		return {
			success: true,
			effect: 'Critical Success: Restored to 1 HP'
		};
	}
	if (roll >= 10) {
		return {
			success: true,
			effect: 'Success: Become Stabilized'
		};
	}
	return {
		success: false,
		effect: 'Failure: Take 1 True damage'
	};
}
/**
 * Death's Door After Combat rules
 */
export function getDeathsDoorAfterCombat(): string[] {
	return [
		"When Combat ends, any creature on Death's Door must immediately make a Death Save",
		'They repeat this Death Save every 12 seconds until they become Stabilized, are restored to 1 HP or higher, or die',
		'Failure: Take 1 True damage and fall Unconscious until Stabilized',
		'Success: Become Stabilized'
	];
}
/**
 * Stabilization rules
 */
export function getStabilizationRules(): string[] {
	return [
		"A creature that takes the Medicine Action and succeeds on a DC 10 Medicine Check can Stabilize a creature on Death's Door",
		"A Stabilized creature doesn't make Death Saves while on Death's Door",
		"A creature remains Stabilized until it's restored to 1 HP or takes damage"
	];
}
/**
 * Continuous damage rules (Bleeding, Burning)
 */
export function getContinuousDamageRules(): string[] {
	return [
		"Continuous damage (such as Bleeding and Burning) does not affect you while on Death's Door",
		"You still have these conditions on you, but they don't deal damage unless you're above 0 HP"
	];
}
/**
 * Death's Door threshold tracking for UI
 * Returns how many "steps" until death based on current HP and death threshold
 */
export function getDeathSteps(
	currentHP: number,
	deathThreshold: number
): {
	currentStep: number;
	maxSteps: number;
	isDead: boolean;
} {
	if (currentHP > 0) {
		return { currentStep: 0, maxSteps: 0, isDead: false };
	}
	const maxSteps = Math.abs(deathThreshold);
	const currentStep = Math.abs(currentHP);
	const isDead = currentHP <= deathThreshold;
	return { currentStep, maxSteps, isDead };
}
```

## File: inventoryItems.ts
```typescript
// inventoryItems.ts
//==============================================================================
// SCHEMAS / TYPES
//==============================================================================
export enum ItemType {
	Weapon = 'Weapon',
	Armor = 'Armor',
	Shield = 'Shield',
	AdventuringSupply = 'Adventuring Supply',
	Potion = 'Potion'
}
export enum WeaponType {
	Melee = 'Melee',
	Ranged = 'Ranged',
	Special = 'Special'
}
export enum WeaponHandedness {
	OneHanded = 'One-Handed',
	Versatile = 'Versatile',
	TwoHanded = 'Two-Handed'
}
export enum WeaponStyle {
	Axe = 'Axe',
	Fist = 'Fist',
	Hammer = 'Hammer',
	Pick = 'Pick',
	Spear = 'Spear',
	Sword = 'Sword',
	Whip = 'Whip',
	Chained = 'Chained',
	Bow = 'Bow',
	Crossbow = 'Crossbow',
	AxePick = 'Axe/Pick',
	HammerPick = 'Hammer/Pick',
	SwordSpear = 'Sword/Spear',
	ChainedHammer = 'Chained/Hammer',
	Staff = 'Staff'
}
export enum DamageType {
	Slashing = 'S',
	Piercing = 'P',
	Bludgeoning = 'B',
	SlashingOrPiercing = 'S/P',
	BludgeoningOrPiercing = 'B/P'
}
// Based on properties from pages 76 & 77
export type WeaponProperty =
	| 'Ammo'
	| 'Concealable'
	| 'Guard'
	| 'Heavy'
	| 'Impact'
	| 'Long-Ranged'
	| 'Multi-Faceted'
	| 'Reach'
	| 'Reload'
	| 'Silent'
	| 'Toss (5/10)'
	| 'Thrown (10/20)'
	| 'Two-Handed'
	| 'Unwieldy'
	| 'Versatile'
	| 'Returning'
	| 'Capture (5/10)'
	| 'Capture (10/20)'
	| 'Range (15/45)'
	| 'Range (30/90)';
export interface Weapon {
	itemType: ItemType.Weapon;
	name: string;
	type: WeaponType;
	style: WeaponStyle | WeaponStyle[];
	handedness: WeaponHandedness;
	damage: string; // Using string to accommodate '0 B' etc.
	properties: WeaponProperty[];
}
export enum ArmorType {
	Light = 'Light Armor',
	Heavy = 'Heavy Armor'
}
export interface Armor {
	itemType: ItemType.Armor;
	name: string;
	type: ArmorType;
	pdBonus: number;
	adBonus: number;
	pdr?: 'Half';
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
}
export enum ShieldType {
	Light = 'Light Shield',
	Heavy = 'Heavy Shield'
}
export type ShieldProperty = 'Grasp' | 'Toss (5/10)' | 'Mounted';
export interface Shield {
	itemType: ItemType.Shield;
	name: string;
	type: ShieldType;
	pdBonus: number;
	adBonus: number;
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
	properties?: ShieldProperty[];
}
export interface AdventuringSupply {
	itemType: ItemType.AdventuringSupply;
	name: string;
	description: string;
	price?: string; // e.g., "5g"
}
export interface HealingPotion {
	itemType: ItemType.Potion;
	name: string;
	level: number;
	healing: string; // e.g., "2 HP"
	price: number; // in gold pieces (g)
}
// Union type for all inventory items
export type InventoryItem = Weapon | Armor | Shield | AdventuringSupply | HealingPotion;
//==============================================================================
// INVENTORY DATA
//==============================================================================
export const weapons: Weapon[] = [
	// Melee Weapons - One-Handed
	{
		itemType: ItemType.Weapon,
		name: 'Sickle',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Hand Axe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Throwing Star',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Brass Knuckles',
		type: WeaponType.Melee,
		style: WeaponStyle.Fist,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Concealable', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Club',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Light Hammer',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Impact', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Dart',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Mining Pick',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Javelin',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Thrown (10/20)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Throwing Dagger',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Short Sword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Guard', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Rapier',
		type: WeaponType.Melee,
		style: [WeaponStyle.Sword, WeaponStyle.Spear],
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S/P',
		properties: ['Guard', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Chain Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Reach', 'Impact']
	},
	// Melee Weapons - Versatile
	{
		itemType: ItemType.Weapon,
		name: 'Battleaxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Flail',
		type: WeaponType.Melee,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.Versatile,
		damage: '1 B',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Morningstar',
		type: WeaponType.Melee,
		style: [WeaponStyle.Hammer, WeaponStyle.Pick],
		handedness: WeaponHandedness.Versatile,
		damage: '1 B/P',
		properties: ['Versatile', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Warhammer',
		type: WeaponType.Melee,
		style: [WeaponStyle.Hammer, WeaponStyle.Pick],
		handedness: WeaponHandedness.Versatile,
		damage: '1 B/P',
		properties: ['Versatile', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Pickaxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Spear',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Long Spear',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Quarterstaff',
		type: WeaponType.Melee,
		style: WeaponStyle.Staff,
		handedness: WeaponHandedness.Versatile,
		damage: '1 B',
		properties: ['Versatile', 'Guard']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longsword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Guard']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Bastard Sword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Bull Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Reach', 'Unwieldy', 'Impact']
	},
	// Melee Weapons - Two-Handed
	{
		itemType: ItemType.Weapon,
		name: 'Scythe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greataxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Halberd',
		type: WeaponType.Melee,
		style: [WeaponStyle.Axe, WeaponStyle.Pick],
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 S/P',
		properties: ['Two-Handed', 'Multi-Faceted', 'Reach', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'War Flail',
		type: WeaponType.Melee,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Meteor Hammer',
		type: WeaponType.Melee,
		style: [WeaponStyle.Chained, WeaponStyle.Hammer],
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Multi-Faceted', 'Reach', 'Unwieldy']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatmaul',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Pike',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Heavy', 'Reach', 'Impact', 'Unwieldy']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longpole',
		type: WeaponType.Melee,
		style: WeaponStyle.Staff,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 B',
		properties: ['Two-Handed', 'Guard', 'Reach', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Glaive',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatsword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Great Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach', 'Impact', 'Unwieldy']
	},
	// Ranged Weapons
	{
		itemType: ItemType.Weapon,
		name: 'Sling',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 B',
		properties: ['Ammo', 'Unwieldy', 'Impact', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Shortbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Silent', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Impact', 'Long-Ranged']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Heavy', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Blowgun (Needle)',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Silent', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Hand Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Ammo', 'Reload', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Light Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Ammo', 'Reload', 'Impact', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Heavy Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '3 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Reload', 'Heavy', 'Range (15/45)']
	},
	// Special Weapons
	{
		itemType: ItemType.Weapon,
		name: 'Bolas',
		type: WeaponType.Special,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.OneHanded,
		damage: '0 B',
		properties: ['Thrown (10/20)', 'Capture (10/20)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Net',
		type: WeaponType.Special,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.Versatile,
		damage: '0 B',
		properties: ['Toss (5/10)', 'Versatile', 'Capture (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Boomerang',
		type: WeaponType.Special,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Toss (5/10)', 'Returning']
	}
];
export const armors: Armor[] = [
	// Light Armor
	{
		itemType: ItemType.Armor,
		name: 'Light Defensive Armor',
		type: ArmorType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Deflecting Armor',
		type: ArmorType.Light,
		pdBonus: 2,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Fortified Armor',
		type: ArmorType.Light,
		pdBonus: 0,
		adBonus: 2,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	// Heavy Armor
	{
		itemType: ItemType.Armor,
		name: 'Heavy Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 1,
		adBonus: 1,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Deflecting Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 0,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Fortified Armor',
		type: ArmorType.Heavy,
		pdBonus: 0,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Highly Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	}
];
export const shields: Shield[] = [
	// Light Shields
	{
		itemType: ItemType.Shield,
		name: 'Buckler',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Grasp']
	},
	{
		itemType: ItemType.Shield,
		name: 'Round Shield',
		type: ShieldType.Light,
		pdBonus: 0,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Toss (5/10)']
	},
	{
		itemType: ItemType.Shield,
		name: 'Heater Shield',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: []
	},
	// Heavy Shields
	{
		itemType: ItemType.Shield,
		name: 'Kite Shield',
		type: ShieldType.Heavy,
		pdBonus: 1,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: ['Mounted']
	},
	{
		itemType: ItemType.Shield,
		name: 'Tower Shield',
		type: ShieldType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: []
	}
];
export const adventuringSupplies: AdventuringSupply[] = [
	{
		itemType: ItemType.AdventuringSupply,
		name: 'Gauntlet',
		description:
			'Wearing a Gauntlet gives your Unarmed Strikes with that hand the Impact Weapon Property (+1 damage on Heavy Hits).',
		price: '5g'
	},
	{
		itemType: ItemType.AdventuringSupply,
		name: 'First Aid Kit',
		description:
			"A fully stocked kit contains 5 charges, which can be spent to treat a creature's wounds or cure an ailment by taking the Object Action."
	}
];
export const healingPotions: HealingPotion[] = [
	{
		itemType: ItemType.Potion,
		name: '1st Level Healing Potion',
		level: 1,
		healing: '2 HP',
		price: 10
	},
	{
		itemType: ItemType.Potion,
		name: '2nd Level Healing Potion',
		level: 2,
		healing: '4 HP',
		price: 25
	},
	{
		itemType: ItemType.Potion,
		name: '3rd Level Healing Potion',
		level: 3,
		healing: '6 HP',
		price: 40
	},
	{
		itemType: ItemType.Potion,
		name: '4th Level Healing Potion',
		level: 4,
		healing: '8 HP',
		price: 60
	},
	{
		itemType: ItemType.Potion,
		name: '5th Level Healing Potion',
		level: 5,
		healing: '10 HP',
		price: 100
	}
];
export const allItems = [
	...weapons,
	...armors,
	...shields,
	...adventuringSupplies,
	...healingPotions
];
```

## File: languages.ts
```typescript
import { ILanguageData } from './schemas/types';
export const languagesData: ILanguageData[] = [
	{
		id: 'common',
		name: 'Common',
		type: 'standard', // From DC20 p.18
		description:
			'Common is the most simple and universal language in the world. All Player Characters start Fluent in Common.'
	},
	{
		id: 'elvish',
		name: 'Elvish',
		type: 'standard', // From DC20 p.18
		description: 'Elvish is a fluid and melodic language spoken by Elves. Typical Speakers: Elves.'
	},
	{
		id: 'draconic',
		name: 'Draconic',
		type: 'exotic', // From DC20 p.18
		description:
			'Draconic is a harsh, guttural language spoken by Dragons and Dragonkin. Typical Speakers: Dragons, Dragonkin.'
	},
	{
		id: 'dwarvish',
		name: 'Dwarvish',
		type: 'standard', // From DC20 p.18
		description:
			'Dwarvish is a language of hard consonants and guttural sounds, spoken by Dwarves. Typical Speakers: Dwarves.'
	},
	{
		id: 'gnomish',
		name: 'Gnomish',
		type: 'standard', // From DC20 p.18
		description:
			'Gnomish is a language filled with trills and clicks, spoken by Gnomes. Typical Speakers: Gnomes.'
	},
	{
		id: 'goblin',
		name: 'Goblin',
		type: 'standard', // From DC20 p.18
		description:
			'Goblin is a rough and simple language spoken by Goblins, Hobgoblins, and Bugbears. Typical Speakers: Goblins, Hobgoblins, Bugbears.'
	},
	{
		id: 'halfling',
		name: 'Halfling',
		type: 'standard', // From DC20 p.18
		description:
			'Halfling is a soft and gentle language spoken by Halflings. Typical Speakers: Halflings.'
	},
	{
		id: 'orcish',
		name: 'Orcish',
		type: 'standard', // From DC20 p.18
		description: 'Orcish is a brutal and harsh language spoken by Orcs. Typical Speakers: Orcs.'
	},
	{
		id: 'primordial',
		name: 'Primordial',
		type: 'exotic', // From DC20 p.18
		description: 'Primordial is the language of Elementals. Typical Speakers: Elementals.'
	},
	{
		id: 'celestial',
		name: 'Celestial',
		type: 'exotic', // From DC20 p.18
		description: 'Celestial is the language of Celestials. Typical Speakers: Celestials.'
	},
	{
		id: 'abyssal',
		name: 'Abyssal',
		type: 'exotic', // From DC20 p.18
		description: 'Abyssal is the language of Demons. Typical Speakers: Demons.'
	},
	{
		id: 'infernal',
		name: 'Infernal',
		type: 'exotic', // From DC20 p.18
		description: 'Infernal is the language of Devils. Typical Speakers: Devils.'
	},
	{
		id: 'undercommon',
		name: 'Undercommon',
		type: 'exotic', // From DC20 p.18
		description:
			'Undercommon is a language spoken by inhabitants of the Underdark, such as Drow. Typical Speakers: Drow, Underdark inhabitants.'
	}
];
```

## File: rulesdata.spec.ts
```typescript
import { describe, it, expect } from 'vitest';
import { classesDataSchema } from './schemas/class.schema';
import { classesData } from './loaders/class.loader';
import { traitsData as newTraitsData } from './ancestries/traits';
import { ancestriesData as newAncestriesData } from './ancestries/ancestries';
import { allSpells } from './spells-data/spells';
import { allManeuvers } from './martials/maneuvers';
import { allTechniques } from './martials/techniques';
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
			expect(ancestry).toHaveProperty('rulesSource');
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

## File: skills.ts
```typescript
import { ISkillData } from './schemas/types';
export const skillsData: ISkillData[] = [
	{
		id: 'athletics',
		name: 'Athletics',
		attributeAssociation: 'might',
		description:
			'Athletics covers activities that involve physical prowess, such as climbing, swimming, and jumping in difficult circumstances, or participating in a Grapple.'
	},
	{
		id: 'intimidation',
		name: 'Intimidation',
		attributeAssociation: 'might',
		description:
			'Intimidation covers attempts to influence a creature’s behavior using threats, hostile actions, and physical violence.'
	},
	{
		id: 'acrobatics',
		name: 'Acrobatics',
		attributeAssociation: 'agility',
		description: 'Acrobatics covers activities that require flexibility, nimbleness, and balance.'
	},
	{
		id: 'trickery',
		name: 'Trickery',
		attributeAssociation: 'agility',
		description:
			'Trickery covers non-verbal means of deceiving others, such as pickpocketing things, concealing an object on your person, or other forms of physical deception.'
	},
	{
		id: 'stealth',
		name: 'Stealth',
		attributeAssociation: 'agility',
		description:
			'Stealth covers attempts to avoid being seen or heard by other creatures, such as sneaking about or hiding behind cover.'
	},
	{
		id: 'animal',
		name: 'Animal',
		attributeAssociation: 'charisma',
		description:
			'Animal covers interactions such as corralling, training, calming, and gauging the intention of Beasts.'
	},
	{
		id: 'insight',
		name: 'Insight',
		attributeAssociation: 'charisma',
		description:
			'Insight governs your ability to discern intentions. This could be from observing a creature’s body language, facial cues, and mannerisms. Alternatively, Insight can represent a gut feeling or intuition about a situation.'
	},
	{
		id: 'influence',
		name: 'Influence',
		attributeAssociation: 'charisma',
		description:
			'Influence covers your attempts to manipulate a creature’s behavior using compelling arguments based on truth, half-truths, lies, or some combination in between.'
	},
	{
		id: 'investigation',
		name: 'Investigation',
		attributeAssociation: 'intelligence',
		description:
			'Investigation covers using your senses to search for and discover things that are not readily observable. You look for clues and then make deductions on those clues to try and discern the locations of things or how they work (finding hidden objects, secret doors, or weak points in structures). It also covers the process of researching information through various texts.'
	},
	{
		id: 'medicine',
		name: 'Medicine',
		attributeAssociation: 'intelligence',
		description:
			'Medicine covers activities that involve medical knowledge and application, such as treating a wounded creature, diagnosing an illness, or identifying a cure to an ailment.'
	},
	{
		id: 'survival',
		name: 'Survival',
		attributeAssociation: 'intelligence',
		description:
			'Survival covers the activities required to survive in the wilderness, such as tracking quarry, foraging for food and water, and navigating through uncharted territory.'
	},
	{
		id: 'awareness',
		name: 'Awareness',
		attributeAssociation: 'prime', // Uses Prime Modifier
		description:
			'Awareness governs your ability to detect the presence of other creatures or objects using your sight, hearing, smell, or other senses.'
	}
];
```

## File: trades.spec.ts
```typescript
import { describe, it, expect } from 'vitest';
import { tradesData } from './trades';
describe('tradesData', () => {
	it('should contain all original trades and knowledge trades', () => {
		const tradeIds = tradesData.map((t) => t.id);
		// Check for some original trades
		expect(tradeIds).toContain('alchemy');
		expect(tradeIds).toContain('blacksmithing');
		expect(tradeIds).toContain('carpentry');
		// Check for knowledge trades
		expect(tradeIds).toContain('arcana');
		expect(tradeIds).toContain('history');
		expect(tradeIds).toContain('nature');
		expect(tradeIds).toContain('religion');
		expect(tradeIds).toContain('occultism');
	});
	it("should have 'tools' property set to 'none' for all knowledge trades", () => {
		const knowledgeTrades = [
			'arcana',
			'history',
			'nature',
			'religion',
			'occultism',
			'architecture',
			'deciphering',
			'linguistics',
			'survival'
		];
		knowledgeTrades.forEach((tradeId) => {
			const trade = tradesData.find((t) => t.id === tradeId);
			expect(trade).toBeDefined();
			expect(trade?.tools).toBe('none');
		});
	});
	it('should not have undefined tools for any trade', () => {
		const tradesWithUndefinedTools = tradesData.filter((t) => t.tools === undefined);
		expect(tradesWithUndefinedTools).toHaveLength(0);
	});
});
```

## File: trades.ts
```typescript
import { ITradeData } from './schemas/types';
export const tradesData: ITradeData[] = [
	{
		id: 'alchemy',
		name: 'Alchemy',
		attributeAssociation: 'intelligence',
		description:
			'Alchemy is the practice of creating something by combining or changing other things. This includes creating potions, poisons, and other alchemical substances.',
		tools: "Alchemist's Supplies"
	},
	{
		id: 'architecture',
		name: 'Architecture',
		attributeAssociation: 'intelligence',
		description:
			'Architecture is the knowledge of building design, construction, and structural integrity. This includes understanding how buildings are constructed, identifying weak points, and designing structures.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'blacksmithing',
		name: 'Blacksmithing',
		attributeAssociation: 'might',
		description:
			'Blacksmithing is the crafting and repairing of metal objects, including weapons and armor. This includes working with forges, hammers, and other tools to shape metal.',
		tools: "Smith's Tools"
	},
	{
		id: 'brewing',
		name: 'Brewing',
		attributeAssociation: 'intelligence',
		description:
			'Brewing is the art of creating beverages through fermentation, such as beer, wine, and spirits. This includes understanding the process of fermentation and using brewing equipment.',
		tools: "Brewer's Supplies"
	},
	{
		id: 'calligraphy',
		name: 'Calligraphy',
		attributeAssociation: 'agility',
		description:
			'Calligraphy is the art of decorative handwriting and lettering. This includes using various pens, inks, and techniques to create visually appealing text.',
		tools: "Calligrapher's Supplies"
	},
	{
		id: 'carpentry',
		name: 'Carpentry',
		attributeAssociation: 'might',
		description:
			'Carpentry is the crafting and repairing of wooden objects and structures. This includes working with wood, saws, hammers, and other tools to build and repair.',
		tools: "Carpenter's Tools"
	},
	{
		id: 'cartography',
		name: 'Cartography',
		attributeAssociation: 'intelligence',
		description:
			'Cartography is the art and science of mapmaking. This includes creating maps, reading maps, and navigating using maps.',
		tools: "Cartographer's Tools"
	},
	{
		id: 'cobbling',
		name: 'Cobbling',
		attributeAssociation: 'agility',
		description:
			'Cobbling is the crafting and repairing of footwear. This includes working with leather, thread, and tools to create and repair shoes and boots.',
		tools: "Cobbler's Tools"
	},
	{
		id: 'cooking',
		name: 'Cooking',
		attributeAssociation: 'intelligence',
		description:
			'Cooking is the preparation of food for consumption. This includes understanding ingredients, recipes, and cooking techniques.',
		tools: "Cook's Utensils"
	},
	{
		id: 'deciphering',
		name: 'Deciphering',
		attributeAssociation: 'intelligence',
		description:
			'Deciphering is the understanding of coded messages, ancient scripts, or hidden meanings. This includes analyzing patterns, symbols, and languages to uncover hidden information.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'disguise',
		name: 'Disguise',
		attributeAssociation: 'charisma',
		description:
			"Disguise is the altering of one's appearance to resemble someone else or a different type of person. This includes using makeup, costumes, and props to change appearance.",
		tools: 'Disguise Kit'
	},
	{
		id: 'forgery',
		name: 'Forgery',
		attributeAssociation: 'agility',
		description:
			'Forgery is the creating of convincing copies of documents, signatures, or objects. This includes replicating details and materials to create fakes.',
		tools: 'Forgery Kit'
	},
	{
		id: 'gaming',
		name: 'Gaming',
		attributeAssociation: 'charisma',
		description:
			'Gaming is the proficiency in various games of chance or skill. This includes understanding rules, strategies, and playing games.',
		tools: 'Gaming Set'
	},
	{
		id: 'herbalism',
		name: 'Herbalism',
		attributeAssociation: 'intelligence',
		description:
			'Herbalism is the knowledge of plants, their properties, and uses. This includes identifying plants, preparing herbal remedies, and understanding plant effects.',
		tools: 'Herbalism Kit'
	},
	{
		id: 'jeweler',
		name: 'Jeweler',
		attributeAssociation: 'agility',
		description:
			'Jeweler is the crafting and repairing of jewelry. This includes working with precious metals, gems, and tools to create and repair jewelry.',
		tools: "Jeweler's Tools"
	},
	{
		id: 'leatherworking',
		name: 'Leatherworking',
		attributeAssociation: 'agility',
		description:
			'Leatherworking is the crafting and repairing of leather goods. This includes working with leather, tools, and techniques to create and repair items.',
		tools: "Leatherworker's Tools"
	},
	{
		id: 'linguistics',
		name: 'Linguistics',
		attributeAssociation: 'intelligence',
		description:
			'Linguistics is the study of languages, their structure, and origins. This includes understanding grammar, syntax, and the history of languages.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'masonry',
		name: 'Masonry',
		attributeAssociation: 'might',
		description:
			'Masonry is the working with stone to build structures or objects. This includes cutting, shaping, and laying stone to create buildings and other structures.',
		tools: "Mason's Tools"
	},
	{
		id: 'medicine',
		name: 'Medicine',
		attributeAssociation: 'intelligence',
		description:
			'Medicine is the knowledge and practice of healing injuries and treating diseases. This includes diagnosing ailments, administering treatments, and understanding medical procedures.',
		tools: "Healer's Kit"
	},
	{
		id: 'music',
		name: 'Music',
		attributeAssociation: 'charisma',
		description:
			'Music is the performance of music using instruments or voice. This includes playing instruments, singing, and understanding musical theory.',
		tools: 'Musical Instrument'
	},
	{
		id: 'navigation',
		name: 'Navigation',
		attributeAssociation: 'intelligence',
		description:
			"Navigation is the determining of one's position and plotting a course. This includes using maps, compasses, and celestial bodies to navigate.",
		tools: "Navigator's Tools"
	},
	{
		id: 'painting',
		name: 'Painting',
		attributeAssociation: 'agility',
		description:
			'Painting is the creating of art using paints. This includes using various paints, brushes, and techniques to create visual art.',
		tools: "Painter's Supplies"
	},
	{
		id: 'poisoner',
		name: 'Poisoner',
		attributeAssociation: 'intelligence',
		description:
			'Poisoner is the knowledge and creation of poisons. This includes identifying poisonous substances, preparing poisons, and understanding their effects.',
		tools: "Poisoner's Kit"
	},
	{
		id: 'pottery',
		name: 'Pottery',
		attributeAssociation: 'agility',
		description:
			'Pottery is the crafting of objects from clay. This includes shaping, firing, and glazing clay to create various objects.',
		tools: "Potter's Tools"
	},
	{
		id: 'sculpting',
		name: 'Sculpting',
		attributeAssociation: 'might',
		description:
			'Sculpting is the creating of three-dimensional art from various materials. This includes shaping materials like stone, wood, or clay to create sculptures.',
		tools: "Sculptor's Tools"
	},
	{
		id: 'smithing',
		name: 'Smithing',
		attributeAssociation: 'might',
		description:
			'Smithing is the general knowledge of working with metals. This includes understanding different metals, their properties, and basic metalworking techniques.',
		tools: "Smith's Tools"
	},
	{
		id: 'survival',
		name: 'Survival',
		attributeAssociation: 'intelligence',
		description:
			'Survival is the knowledge and skills needed to survive in the wilderness. This includes tracking, foraging, shelter building, and navigating in natural environments.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'tailoring',
		name: 'Tailoring',
		attributeAssociation: 'agility',
		description:
			'Tailoring is the crafting and repairing of clothing and textiles. This includes working with fabric, needles, and thread to create and repair garments.',
		tools: "Weaver's Tools"
	},
	{
		id: 'thieves',
		name: "Thieves'",
		attributeAssociation: 'agility',
		description:
			"Thieves' is the knowledge and skills related to thievery, including lockpicking and disarming traps. This includes understanding security measures and using specialized tools.",
		tools: "Thieves' Tools"
	},
	{
		id: 'vehicles_land',
		name: 'Vehicles (Land)',
		attributeAssociation: 'agility',
		description:
			'Vehicles (Land) is the proficiency in operating land-based vehicles. This includes riding horses, driving carts, and operating other land vehicles.',
		tools: 'none'
	},
	{
		id: 'vehicles_water',
		name: 'Vehicles (Water)',
		attributeAssociation: 'agility',
		description:
			'Vehicles (Water) is the proficiency in operating water-based vehicles. This includes sailing boats, piloting ships, and operating other water vehicles.',
		tools: 'none'
	},
	{
		id: 'woodcarving',
		name: 'Woodcarving',
		attributeAssociation: 'agility',
		description:
			'Woodcarving is the creating of art or objects from wood. This includes shaping wood using knives, chisels, and other tools.',
		tools: "Woodcarver's Tools"
	},
	{
		id: 'arcana',
		name: 'Arcana',
		attributeAssociation: 'intelligence',
		description:
			'Arcana is the study of magic, its history, theories, and the planes of existence. This includes recalling information about spells, magical creatures, and magical phenomena.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'history',
		name: 'History',
		attributeAssociation: 'intelligence',
		description:
			'History is the study of past events, ancient lore, and how civilizations have shaped the present. This includes recalling information about historical figures, events, and cultures.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'nature',
		name: 'Nature',
		attributeAssociation: 'intelligence',
		description:
			'Nature is the study of the natural world, including plants, animals, weather patterns, and natural phenomena.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'religion',
		name: 'Religion',
		attributeAssociation: 'intelligence',
		description:
			'Religion is the knowledge of deities, religious practices, and holy texts. This includes understanding religious beliefs, rituals, and scriptures.',
		tools: 'none' // Knowledge trade
	},
	{
		id: 'occultism',
		name: 'Occultism',
		attributeAssociation: 'intelligence',
		description:
			'Occultism is the study of hidden mysteries, forbidden lore, and supernatural phenomena beyond normal magical understanding.',
		tools: 'none' // Knowledge trade
	}
];
```
