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
		effects: [
			{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }
		]
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
		effects: [
			{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }
		]
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
		effects: [
			{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }
		]
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
		effects: [
			{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }
		]
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
		effects: [
			{ type: 'MODIFY_STAT', target: 'attributePoints', value: -1 }
		]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Small-Sized', value: 'Your Size is considered Small.' }]
	},
	{
		id: 'gremlin_sneaky',
		name: 'Sneaky',
		description: 'You can Hide while only Partially Concealed or behind 1/2 Cover.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Sneaky', value: 'You can Hide while only Partially Concealed or behind 1/2 Cover.' }]
	},
	{
		id: 'gremlin_thriller',
		name: 'Thriller',
		description:
			'Once per Round, when a hostile creature within 5 Spaces becomes Intimidated, Frightened, or Terrified, you gain ADV on the next Check or Save you make.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Thriller', value: 'Once per Round, when a hostile creature within 5 Spaces becomes Intimidated, Frightened, or Terrified, you gain ADV on the next Check or Save you make.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Deft Footwork', value: 'You can move through the space of a hostile creature 1 size larger than you as Difficult Terrain.' }]
	},
	{
		id: 'gremlin_halfling_disguise',
		name: 'Halfling Disguise',
		description:
			'You can spend 1 AP to change appearance to look like a Halfling (reverts under stress).',
		cost: 0,
		effects: [{ type: 'GRANT_ABILITY', target: 'Halfling Disguise', value: 'You can spend 1 AP to change appearance to look like a Halfling (reverts under stress).' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Natural Weapon', value: 'Natural Weapons for Unarmed Strikes.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Small-Sized', value: 'Your Size is considered Small.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Aggressive', value: 'Once per Round, you can gain ADV on a Melee Attack. You are Exposed on the next Attack against you until the start of your next turn.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Small Fury', value: 'You deal +1 damage to Large or larger creatures on a Heavy or Critical Hit.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Hit and Run', value: 'When you Hit a creature with a Melee Attack, you can spend 1 AP to immediately move up to your Speed without provoking Opportunity Attacks from the target.' }]
	},
	{
		id: 'goblin_pack_tactics',
		name: 'Pack Tactics',
		description: 'You gain an additional +2 bonus to Attacks against creatures you are Flanking.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'Pack Tactics', value: 'You gain an additional +2 bonus to Attacks against creatures you are Flanking.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Sneaky', value: 'You can Hide while only Partially Concealed or behind 1/2 Cover.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Mold Earth', value: 'You can use your hands as Sculptor\'s Tools or Mason\'s Tools to shape soil, sand, stone, or rock. When you do, you can use your Prime Modifier instead of the normal Attribute on any Checks you make.' }]
	},
	{
		id: 'terraborn_stone_blood',
		name: 'Stone Blood',
		description:
			'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Bleeding', value: 'ADV' },
			{ type: 'GRANT_ABILITY', target: 'End Bleeding (1 AP)', value: 'You can spend 1 AP to end the Bleeding Condition on yourself.' }
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
		effects: [{ type: 'GRANT_ABILITY', target: 'Earth Walker', value: 'You\'re not affected by Difficult Terrain created by rock, dirt, mud, or sand.' }]
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
	},
	
];

// Helper functions for accessing trait data
export const getTraitData = (id: string): Trait | undefined => {
	return traitsData.find((trait) => trait.id === id);
};

export const getTraitsByAncestry = (ancestryId: string): Trait[] => {
	return traitsData.filter((trait) => trait.id.startsWith(ancestryId + '_'));
};
