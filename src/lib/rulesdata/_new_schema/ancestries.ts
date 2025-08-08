import type { Ancestry } from '../schemas/character.schema';

export const ancestriesData: Ancestry[] = [
	{
		id: 'human',
		name: 'Human',
		description:
			'Humans are the most common ancestry in the world, known for their adaptability and resilience.',
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
		description: 'Halflings are small, cheerful people with an affinity for nature and simple pleasures.',
		defaultTraitIds: [
			'halfling_small_sized',
			'halfling_elusive',
			'halfling_bravery',
			'halfling_endurance'
		],
		expandedTraitIds: [
			'halfling_deft_footwork',
			'halfling_beast_whisperer',
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
		description: 'Gnomes are small, curious beings with a natural affinity for magic and technology.',
		defaultTraitIds: [
			'gnome_small_sized',
			'gnome_escape_artist',
			'gnome_magnified_vision',
			'gnome_mental_clarity'
		],
		expandedTraitIds: [
			'gnome_strong_minded',
			'gnome_predict_weather',
			'gnome_mana_increase',
			'gnome_trapper',
			'gnome_lightning_insulation',
			'gnome_trade_expertise'
		]
	},
	{
		id: 'orc',
		name: 'Orc',
		description: 'Orcs are fierce warriors with a strong tribal culture and savage fighting instincts.',
		defaultTraitIds: [
			'orc_cursed_mind',
			'orc_rush',
			'orc_brutal_strikes',
			'orc_tough'
		],
		expandedTraitIds: [
			'orc_reckless'
		]
	},
	{
		id: 'dragonborn',
		name: 'Dragonborn',
		description: 'Dragonborn are draconic humanoids with breath weapons and draconic heritage.',
		defaultTraitIds: [
			'dragonborn_darkvision',
			'dragonborn_draconic_resistance',
			'dragonborn_draconic_breath_weapon',
			'dragonborn_thick_skinned'
		],
		expandedTraitIds: []
	},
	{
		id: 'giantborn',
		name: 'Giantborn',
		description: 'Giantborn are descendants of giants, large and strong but sometimes clumsy.',
		defaultTraitIds: [
			'giantborn_giant_blood',
			'giantborn_tough',
			'giantborn_throw_ally',
			'giantborn_clumsy'
		],
		expandedTraitIds: []
	},
	{
		id: 'angelborn',
		name: 'Angelborn',
		description: 'Angelborn have celestial heritage, bringing light and healing but sensitive to darkness.',
		defaultTraitIds: [
			'angelborn_divine_resistance',
			'angelborn_healing_hands',
			'angelborn_light_sensitivity'
		],
		expandedTraitIds: []
	},
	{
		id: 'fiendborn',
		name: 'Fiendborn',
		description: 'Fiendborn have infernal heritage, with dark powers but weakness to holy energy.',
		defaultTraitIds: [
			'fiendborn_darkvision',
			'fiendborn_hellish_resistance',
			'fiendborn_infernal_legacy',
			'fiendborn_holy_vulnerability'
		],
		expandedTraitIds: []
	},
	{
		id: 'beastborn',
		name: 'Beastborn',
		description: 'Beastborn have animal traits, with enhanced senses and natural weapons but wild instincts.',
		defaultTraitIds: [
			'beastborn_keen_senses',
			'beastborn_natural_weapons',
			'beastborn_thick_hide',
			'beastborn_wild_mind'
		],
		expandedTraitIds: []
	}
];

// Helper functions for accessing ancestry data
export const getAncestryData = (id: string): Ancestry | undefined => {
	return ancestriesData.find(ancestry => ancestry.id === id);
};
