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
			'dwarf_trade_expertise',
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
			// Flying
			'beastborn_glide_speed',
			'beastborn_limited_flight',
			'beastborn_full_flight',
			'beastborn_flyby',
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
			'beastborn_toxic_fortitude'
		],
		origin: {
			prompt: 'Choose a type of Beast you are modeled after:',
			options: []
		}
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
	}
];

// Helper functions for accessing ancestry data
export const getAncestryData = (id: string): Ancestry | undefined => {
	return ancestriesData.find((ancestry) => ancestry.id === id);
};
