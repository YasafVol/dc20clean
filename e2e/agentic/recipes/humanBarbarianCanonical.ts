import type { AgenticCharacterRecipe } from './types';

export const humanBarbarianCanonicalRecipe: AgenticCharacterRecipe = {
	id: 'human-barbarian-canonical',
	name: 'Human Barbarian canonical',
	tags: ['smoke', 'canonical', 'creation', 'barbarian', 'background', 'maneuvers'],
	characterName: 'agentic human barbarian canonical',
	playerName: 'agentic qa',
	level: 1,
	classId: 'barbarian',
	ancestry: {
		id: 'human',
		traits: [
			{ label: /Attribute Increase/i, expectedId: 'human_attribute_increase' },
			{ label: /Human Resolve/i, expectedId: 'human_resolve' },
			{ label: /Human Determination/i, expectedId: 'human_determination' },
			{ label: /Unbreakable/i, expectedId: 'human_unbreakable' }
		]
	},
	attributeClicks: {
		might: 5,
		agility: 3,
		charisma: 2,
		intelligence: 3
	},
	background: {
		skills: {
			athletics: 1,
			intimidation: 1,
			acrobatics: 1,
			survival: 1,
			awareness: 1,
			stealth: 1
		},
		trades: {
			blacksmithing: 1,
			leatherworking: 1,
			cooking: 1
		},
		languages: {
			human: 'Fluent'
		}
	},
	maneuvers: {
		mode: 'by-id',
		maxSelections: 2,
		ids: ['heroic-bash', 'savage-strike']
	},
	expectedSaved: {
		identity: {
			classId: 'barbarian',
			ancestry1Id: 'human',
			level: 1
		},
		finalStats: {
			finalMight: 3,
			finalAgility: 1,
			finalCharisma: 0,
			finalIntelligence: 1,
			finalHPMax: 11,
			finalSPMax: 2,
			finalMPMax: 0,
			finalPD: 11,
			finalAD: 14,
			finalPDR: 0,
			finalSaveDC: 14,
			finalMoveSpeed: 6,
			finalJumpDistance: 3,
			finalRestPoints: 11,
			finalGritPoints: 2,
			finalInitiativeBonus: 2
		},
		selectedTraitIds: [
			'human_attribute_increase',
			'human_resolve',
			'human_determination',
			'human_unbreakable'
		],
		skillsData: {
			athletics: 1,
			intimidation: 1,
			acrobatics: 1,
			survival: 1,
			awareness: 1,
			stealth: 1
		},
		tradesData: {
			blacksmithing: 1,
			leatherworking: 1,
			cooking: 1
		},
		languagesData: {
			common: 'fluent',
			human: 'fluent'
		},
		spells: [],
		maneuvers: ['Heroic Bash', 'Savage Strike'],
		combatTraining: ['Weapons', 'All_Armor', 'All_Shields']
	},
	expectedSheet: {
		visibleText: ['agentic human barbarian canonical', 'Barbarian', 'Human']
	}
};
