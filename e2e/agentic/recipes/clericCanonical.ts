import type { AgenticCharacterRecipe } from './types';

export const clericCanonicalRecipe: AgenticCharacterRecipe = {
	id: 'cleric-level-3-canonical',
	name: 'Cleric level 3 canonical',
	tags: ['canonical', 'creation', 'cleric', 'level-3', 'dual-ancestry', 'oracle'],
	characterName: 'agentic cleric canonical',
	playerName: 'agentic qa',
	level: 3,
	classId: 'cleric',
	classChoices: [
		{
			selector: 'input[type=radio][name="cleric_cleric_order_0"][value="Radiant"]',
			description: 'Cleric divine damage: Radiant'
		},
		{
			selector: 'input[type=checkbox][name="cleric_cleric_order_1"][value="Knowledge"]',
			description: 'Cleric domain: Knowledge'
		},
		{
			selector: 'input[type=checkbox][name="cleric_cleric_order_1"][value="Dark"]',
			description: 'Cleric domain: Dark'
		}
	],
	subclass: {
		id: 'inquisitor'
	},
	leveling: {
		talents: {
			general_martial_expansion: 1
		},
		pathPointAllocations: {
			martial: 1
		}
	},
	ancestry: {
		id: 'human',
		ids: ['human', 'dragonborn'],
		traits: [
			{ label: /Attribute Increase/i, expectedId: 'human_attribute_increase' },
			{ label: /Skill Expertise/i, expectedId: 'human_skill_expertise' },
			{ label: /Darkvision/i, expectedId: 'dragonborn_darkvision' }
		]
	},
	attributeClicks: {
		might: 4,
		agility: 2,
		charisma: 3,
		intelligence: 5
	},
	background: {
		conversions: {
			skillToTrade: 2,
			tradeToLanguage: 1
		},
		skills: {
			athletics: 2,
			acrobatics: 1,
			animal: 1,
			awareness: 1,
			intimidation: 2,
			investigation: 1,
			stealth: 1
		},
		trades: {
			arcana: 1,
			history: 1,
			blacksmithing: 1,
			herbalism: 1,
			religion: 1,
			alchemy: 1,
			leatherworking: 1
		},
		languages: {
			elvish: 'Fluent',
			draconic: 'Limited',
			dwarvish: 'Limited'
		}
	},
	spells: {
		mode: 'by-id',
		maxSelections: 5,
		ids: ['bless', 'heal', 'sanctuary', 'light', 'bane']
	},
	maneuvers: {
		mode: 'by-id',
		maxSelections: 3,
		ids: ['heroic-bash', 'parry', 'protect']
	},
	expectedSaved: {
		identity: {
			classId: 'cleric',
			ancestry1Id: 'human',
			ancestry2Id: 'dragonborn',
			level: 3
		},
		finalStats: {
			finalMight: 2,
			finalAgility: 0,
			finalCharisma: 1,
			finalIntelligence: 3,
			finalHPMax: 11,
			finalSPMax: 1,
			finalMPMax: 9,
			finalPD: 13,
			finalAD: 13,
			finalPDR: 0,
			finalSaveDC: 15,
			finalMoveSpeed: 5,
			finalJumpDistance: 0,
			finalRestPoints: 11,
			finalGritPoints: 3,
			finalInitiativeBonus: 2
		},
		selectedTraitIds: [
			'human_attribute_increase',
			'human_skill_expertise',
			'dragonborn_darkvision'
		],
		skillsData: {
			athletics: 2,
			acrobatics: 1,
			animal: 1,
			awareness: 1,
			intimidation: 2,
			investigation: 1,
			stealth: 1
		},
		tradesData: {
			arcana: 1,
			history: 1,
			blacksmithing: 1,
			herbalism: 1,
			religion: 1,
			alchemy: 1,
			leatherworking: 1
		},
		languagesData: {
			common: 'fluent',
			elvish: 'fluent',
			draconic: 'limited',
			dwarvish: 'limited'
		},
		spells: ['Bless', 'Heal', 'Sanctuary', 'Light', 'Bane'],
		maneuvers: ['Heroic Bash', 'Parry', 'Protect'],
		combatTraining: [
			'Spell_Focuses',
			'Light_Armor',
			'Light_Shields',
			'Weapons',
			'Heavy_Armor',
			'All_Shields'
		],
		selectedFeatureChoices: {
			cleric_divine_damage: 'Radiant',
			cleric_divine_domain: ['Knowledge', 'Dark']
		},
		selectedTalents: {
			general_martial_expansion: 1
		},
		pathPointAllocations: {
			martial: 1,
			spellcasting: 0
		},
		selectedSubclass: 'Inquisitor',
		senses: {
			darkvision: 15
		},
		backgroundConversions: {
			skillToTrade: 2,
			tradeToLanguage: 1
		}
	},
	expectedSheet: {
		visibleText: ['agentic cleric canonical', 'Cleric', 'Human']
	}
};
