import type { Trait } from '../schemas/character.schema';

export const traitsData: Trait[] = [
	// Human Traits (p. 108)
	{
		id: 'human_attribute_increase',
		name: 'Attribute Increase',
		description:
			'Grants 1 Attribute Point to spend on any Attribute (up to the Attribute Limit).',
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
				type: 'MODIFY_STAT',
				target: 'skillPoints',
				value: 1
			},
			{
				type: 'GRANT_SKILL_EXPERTISE',
				target: 'any_skill',
				value: { capIncrease: 1, levelIncrease: 1 },
				userChoice: { prompt: 'Choose a skill for Expertise' }
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
		isMinor: true,
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
				type: 'GRANT_TRADE_EXPERTISE',
				target: 'any_trade',
				value: { capIncrease: 1, levelIncrease: 1 },
				userChoice: { prompt: 'Choose a Trade for Expertise' }
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
				value: 'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.'
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
			'Choose an Attribute. You decrease the chosen Attribute by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'MODIFY_ATTRIBUTE',
				target: 'any_attribute',
				value: -1,
				userChoice: { prompt: 'Choose an Attribute to decrease by 1', options: ['might', 'agility', 'charisma', 'intelligence'] }
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
			{ type: 'GRANT_ABILITY', target: 'nimble', value: 'When you take the Dodge Action, you gain the benefits of the Full Dodge Action.' }
		]
	},
	{
		id: 'elf_agile_explorer',
		name: 'Agile Explorer',
		description: 'You are not affected by Difficult Terrain.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'agile_explorer', value: 'You are not affected by Difficult Terrain.' }]
	},
	{
		id: 'elf_discerning_sight',
		name: 'Discerning Sight',
		description: 'You have ADV on Checks and Saves made to discern through visual illusions.',
		cost: 0,
		isMinor: true,
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
		effects: [{ type: 'GRANT_ABILITY', target: 'peerless_sight', value: 'You do not have DisADV on Ranged Weapon Attacks at Long Range.' }]
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
		isMinor: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'plant_knowledge', value: 'You have ADV on Survival Checks in forests, jungles, and swamps, and ADV on Nature Checks about plants.' }
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
		description: 'Your Might decreases by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'might', value: -1 }]
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
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'iron_stomach', value: 'You have ADV on Saves against effects from consuming food or liquids.' }]
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
			{ type: 'GRANT_ABILITY', target: 'stone_blood', value: 'You can spend 1 AP to end the Bleeding Condition on yourself.' }
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
			{ type: 'GRANT_ABILITY', target: 'stubborn', value: 'You have ADV on Saves against being forcibly moved.' }
		]
	},
	{
		id: 'dwarf_earthen_knowledge',
		name: 'Earthen Knowledge',
		description:
			'While underground, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about stones, gems, and metals.',
		cost: 0,
		isMinor: true,
		effects: [
			{ type: 'GRANT_ABILITY', target: 'earthen_knowledge', value: 'You have ADV on Survival Checks while underground and ADV on Nature Checks about stones, gems, and metals.' }
		]
	},
	{
		id: 'dwarf_charisma_attribute_decrease',
		name: 'Charisma Decrease',
		description: 'Your Charisma decreases by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'charisma', value: -1 }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'small_size', value: 'Your Size is considered Small.' }]
	},
	{
		id: 'halfling_elusive',
		name: 'Elusive',
		description: 'When you take the Disengage Action, you instead gain the benefits of the Full Disengage Action.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'elusive', value: 'When you take the Disengage Action, you gain the benefits of the Full Disengage Action.' }]
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
		description: 'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'deft_footwork', value: 'You can move through the space of a hostile creature 1 size larger as if it were Difficult Terrain.' }]
	},
	{
		id: 'halfling_beast_whisperer',
		name: 'Beast Whisperer',
		description: 'You can speak to Beasts in a limited manner. They can understand the meanings of simple words, concepts, or states of emotion.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'beast_whisperer', value: 'You can speak to Beasts in a limited manner.' }]
	},
	{
		id: 'halfling_beast_insight',
		name: 'Beast Insight',
		description: 'You can understand Beasts in a limited manner. You can understand the meaning of their noises and behaviors.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'beast_insight', value: 'You can understand Beasts in a limited manner.' }]
	},
	{
		id: 'halfling_burst_of_bravery',
		name: 'Burst of Bravery',
		description: 'Once per Combat, you can end the Intimidated, Rattled, or Frightened Condition on yourself for free at any time.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'burst_of_bravery', value: 'Once per Combat: end Intimidated, Rattled, or Frightened on yourself for free.' }]
	},
	{
		id: 'halfling_trade_expertise',
		name: 'Trade Expertise',
		description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
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
		id: 'halfling_critter_knowledge',
		name: 'Critter Knowledge',
		description: 'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'critter_knowledge', value: 'You have ADV on Nature, Survival, and Animal Checks involving Small creatures.' }]
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
		description: 'Your Intelligence decreases by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'intelligence', value: -1 }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'small_size', value: 'Your Size is considered Small.' }]
	},
	{
		id: 'gnome_escape_artist',
		name: 'Escape Artist',
		description: 'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'escape_artist', value: 'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.' }]
	},
	{
		id: 'gnome_magnified_vision',
		name: 'Magnified Vision',
		description: 'You have ADV on Investigation Checks made on something you are holding or touching.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'magnified_vision', value: 'You have ADV on Investigation Checks on things you are holding or touching.' }]
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
		description: 'You can naturally tell what the weather is going to be in the next hour in the area within 1 mile of you. You do not have DisADV on Checks or Saves as a result of naturally occurring weather.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'predict_weather', value: 'You can predict weather within 1 mile for the next hour and ignore DisADV from natural weather.' }]
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
		description: 'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'trapper', value: 'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.' }]
	},
	{
		id: 'gnome_lightning_insulation',
		name: 'Lightning Insulation',
		description: 'You have Lightning Resistance (Half) and cannot be struck by natural lightning.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE', target: 'Lightning', value: 'half' },
			{ type: 'GRANT_ABILITY', target: 'lightning_insulation', value: 'You can\'t be struck by natural lightning.' }
		]
	},
	{
		id: 'gnome_trade_expertise',
		name: 'Trade Expertise',
		description: 'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				target: 'crafting_or_subterfuge_trade',
				value: { capIncrease: 1, levelIncrease: 1 },
				userChoice: { prompt: 'Choose a Crafting or Subterfuge Trade for Expertise' }
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
		description: 'Once per Combat when you willingly move toward an enemy, you can spend 1 AP to gain Temp HP equal to your Prime Modifier.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'orc_rush', value: 'Once per Combat: spend 1 AP to gain Temp HP equal to Prime Modifier when moving toward enemy.' }]
	},
	{
		id: 'orc_brutal_strikes',
		name: 'Brutal Strikes',
		description: 'You deal +1 damage when you score a Brutal or Critical Hit with a Melee Weapon or Unarmed Strike.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'brutal_strikes', value: '+1 damage on Brutal or Critical Hits with Melee Attacks.' }]
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
		description: 'You gain a Breath Weapon that you can use by spending 2 AP. You can use this ability once per Long Rest, and regain the ability when you roll for Initiative.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'draconic_breath', value: 'Breath Weapon: 2 AP, once per Long Rest, regain on Initiative.' }]
	},
	{
		id: 'dragonborn_thick_skinned',
		name: 'Thick-Skinned',
		description: 'While you aren\'t wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},

	// Giantborn Traits (p. 112)
	{
		id: 'giantborn_giant_blood',
		name: 'Giant Blood',
		description: 'Your Size is considered Large.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'large_size', value: 'Your Size is considered Large.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'throw_ally', value: 'You can throw willing allies as a Combat Action.' }]
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
		description: 'Once per Long Rest, you can touch a creature to heal them for 1d4 + your Prime Modifier HP.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'healing_hands', value: 'Once per Long Rest: heal 1d4 + Prime Modifier HP by touch.' }]
	},
	{
		id: 'angelborn_light_sensitivity',
		name: 'Light Sensitivity',
		description: 'While in bright light, you have DisADV on Attack Checks.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'light_sensitivity', value: 'DisADV on Attack Checks in bright light.' }]
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
		effects: [{ type: 'GRANT_SPELL', target: 'fiendborn_cantrip', value: 'One Cantrip from Fiendborn Ancestry Spells.' }]
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
		effects: [{ type: 'GRANT_ABILITY', target: 'keen_senses', value: 'ADV on Awareness Checks using hearing or smell.' }]
	},
	{
		id: 'beastborn_natural_weapons',
		name: 'Natural Weapons',
		description: 'Your claws and teeth are Natural Weapons that deal 1 Slashing or Piercing damage.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'natural_weapons', value: 'Claws and teeth are Natural Weapons dealing 1 damage.' }]
	},
	{
		id: 'beastborn_thick_hide',
		name: 'Thick Hide',
		description: 'While you aren\'t wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'ad', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_wild_mind',
		name: 'Wild Mind',
		description: 'You have DisADV on Intelligence-based Checks.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'wild_mind', value: 'DisADV on Intelligence-based Checks.' }]
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
			'You learn 1 Spell of your choice from the Divine Spell List (Holy & Restoration during the Beta). Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can\'t exceed your Mana Spend Limit.',
		cost: 2,
		effects: [
			{ type: 'GRANT_SPELL', target: 'Divine_Spell_List', value: 1 },
			{ type: 'GRANT_ABILITY', target: 'reduced_mp_cost', value: 'Once per Long Rest, cast chosen spell for 1 less MP (minimum 0).' }
		]
	},
	{
		id: 'angelborn_healing_touch',
		name: 'Healing Touch',
		description:
			'Once per Combat, you can spend 1 AP to touch a creature and Heal it. Make a DC 10 Spell Check. Success: You can restore up to 2 HP to the target. Success (each 5): +1 HP. Failure: You only restore 2 HP.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'healing_touch', value: 'Once per Combat, 1 AP: Touch heal (DC 10 Spell Check), 2+ HP restored.' }]
	},
	{
		id: 'angelborn_divine_glow',
		name: 'Divine Glow',
		description: 'Your body can emit a Bright Light in a 5 Space radius around you at will.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'divine_glow', value: 'Emit Bright Light in 5 Space radius at will.' }]
	},
	{
		id: 'angelborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_STAT', target: 'mp', value: 1 }]
	},
	{
		id: 'angelborn_celestial_clarity',
		name: 'Celestial Clarity',
		description: 'You have ADV on Saves against being Blinded or Deafened.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Blinded', value: true },
			{ type: 'GRANT_ADV_ON_SAVE', target: 'Deafened', value: true }
		]
	},
	{
		id: 'angelborn_angelic_insight',
		name: 'Angelic Insight',
		description:
			'Once per Long Rest you can grant yourself ADV on an Insight Check to see if someone is lying.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'angelic_insight', value: 'Once per Long Rest: ADV on Insight Check to detect lies.' }]
	},
	{
		id: 'angelborn_gift_of_the_angels',
		name: 'Gift of the Angels',
		description:
			'Once per Combat you can spend 1 AP and 1 MP and touch a creature to heal them over time. The creature recovers 1 HP at the start of each of their turns for 1 minute (5 Rounds).',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'gift_of_angels', value: 'Once per Combat, 1 AP + 1 MP: Touch heal over time (1 HP/turn for 5 rounds).' }]
	},
	{
		id: 'angelborn_blinding_light',
		name: 'Blinding Light',
		description:
			'Once per Combat, you can spend 1 AP to choose a creature within 5 Spaces and make a Spell Check contested by its Physical Save. Success: The target is Blinded until the end of your next turn.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'blinding_light', value: 'Once per Combat, 1 AP: Spell Check vs Physical Save to Blind target (5 Spaces, until end of next turn).' }]
	},
	{
		id: 'angelborn_glide_speed',
		name: 'Glide Speed',
		description:
			'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren\'t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
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
		effects: [{ type: 'GRANT_ABILITY', target: 'pacifist', value: '-1 penalty to all Checks and Saves during first round of Combat.' }]
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
				type: 'GRANT_TRADE_EXPERTISE',
				target: 'any_crafting_or_services_trade',
				value: { capIncrease: 1, levelIncrease: 1 },
				userChoice: { prompt: 'Choose a Crafting or Services Trade for Expertise' }
			}
		]
	},

	// Gnome Traits
	{
		id: 'gnome_agility_attribute_decrease',
		name: 'Agility Decrease',
		description: 'You decrease your Agility by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'agility', value: -1 }]
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
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Curses', value: true }]
	},
	{
		id: 'orc_dash',
		name: 'Orc Dash',
		description:
			'Once per Combat you can use your Minor Action to move, as long as that movement is towards an enemy.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'orc_dash', value: 'Once per Combat: Use Minor Action to move toward enemy.' }]
	},
	{
		id: 'orc_finishing_blow',
		name: 'Finishing Blow',
		description: 'You deal +1 damage to creatures who are Well-Bloodied.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'finishing_blow', value: '+1 damage to Well-Bloodied creatures.' }]
	},
	{
		id: 'orc_imposing_presence',
		name: 'Imposing Presence',
		description:
			'Once per Combat when a creature makes an Attack against you, you can force them to make a Charisma Save. Save Failure: They must choose a new target for the Attack. If there are no other targets, then the Attack is wasted.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'imposing_presence', value: 'Once per Combat: Force attacker to retarget (Charisma Save).' }]
	},
	{
		id: 'orc_intimidating_shout',
		name: 'Intimidating Shout',
		description:
			'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', target: 'intimidating_shout', value: 'Once per Combat, 1 AP: AoE Hinder effect (5 Spaces, Charisma Save vs Attack Check).' }]
	},
	{
		id: 'orc_orcish_resolve',
		name: 'Orcish Resolve',
		description: 'You gain 1 additional AP while on Death\'s Door.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', target: 'orcish_resolve', value: '+1 AP while on Death\'s Door.' }]
	},
	{
		id: 'orc_provocation',
		name: 'Provocation',
		description: 'You have DisADV on Checks and Saves against being Taunted.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_ABILITY', target: 'provocation', value: 'DisADV on Checks and Saves vs Taunted.' }]
	}
];

// Helper functions for accessing trait data
export const getTraitData = (id: string): Trait | undefined => {
	return traitsData.find(trait => trait.id === id);
};

export const getTraitsByAncestry = (ancestryId: string): Trait[] => {
	return traitsData.filter(trait => trait.id.startsWith(ancestryId + '_'));
};