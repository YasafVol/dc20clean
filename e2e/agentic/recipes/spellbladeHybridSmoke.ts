import type { AgenticCharacterRecipe } from './types';
import { clericCanonicalRecipe } from './clericCanonical';
import { humanBarbarianCanonicalRecipe } from './humanBarbarianCanonical';

export const spellbladeHybridSmokeRecipe: AgenticCharacterRecipe = {
	id: 'spellblade-hybrid-smoke',
	name: 'Spellblade hybrid smoke',
	tags: ['smoke', 'creation', 'hybrid', 'spells', 'maneuvers'],
	characterName: 'agentic spellblade smoke',
	playerName: 'agentic qa',
	level: 1,
	classId: 'spellblade',
	ancestry: {
		id: 'human',
		traits: [
			{ label: /Attribute Increase/i, expectedId: 'human_attribute_increase' },
			{ label: /Skill Expertise/i, expectedId: 'human_skill_expertise' },
			{ label: /Human Resolve/i, expectedId: 'human_resolve' },
			{ label: /Undying/i, expectedId: 'human_undying' },
			{ label: /Trade Expertise/i, expectedId: 'human_trade_expertise' }
		]
	},
	attributeClicks: {
		might: 4,
		agility: 3,
		charisma: 3,
		intelligence: 3
	},
	background: {
		conversions: {
			skillToTrade: 1
		},
		skills: {
			athletics: 2,
			acrobatics: 1,
			investigation: 1,
			awareness: 1,
			intimidation: 1
		},
		trades: {
			blacksmithing: 1,
			alchemy: 1,
			herbalism: 1,
			leatherworking: 1,
			cooking: 1
		},
		languages: {
			elvish: 'Fluent'
		}
	},
	spells: {
		mode: 'by-id',
		maxSelections: 2,
		optional: true,
		ids: ['reduce-inertia', 'arcane-barrier']
	},
	maneuvers: {
		mode: 'by-id',
		maxSelections: 1,
		optional: true,
		ids: ['heroic-bash']
	},
	expectedSaved: {
		identity: {
			classId: 'spellblade',
			ancestry1Id: 'human',
			level: 1
		},
		finalStats: {
			finalMight: 2,
			finalAgility: 1,
			finalCharisma: 1,
			finalIntelligence: 1,
			finalHPMax: 10,
			finalSPMax: 1,
			finalMPMax: 3,
			finalPD: 11,
			finalAD: 12,
			finalSaveDC: 13,
			finalMoveSpeed: 5,
			finalJumpDistance: 1,
			finalRestPoints: 10,
			finalGritPoints: 3,
			finalInitiativeBonus: 2
		},
		selectedTraitIds: [
			'human_attribute_increase',
			'human_skill_expertise',
			'human_resolve',
			'human_undying'
		],
		skillsData: {
			athletics: 2,
			acrobatics: 1,
			investigation: 1,
			awareness: 1,
			intimidation: 1
		},
		tradesData: {
			blacksmithing: 1,
			alchemy: 1,
			herbalism: 1,
			leatherworking: 1,
			cooking: 1
		},
		languagesData: {
			common: 'fluent',
			elvish: 'fluent'
		},
		spells: ['Reduce Inertia', 'Arcane Barrier'],
		maneuvers: ['Heroic Bash'],
		combatTraining: ['Weapons', 'Spell_Focuses', 'Light_Armor', 'Light_Shields'],
		backgroundConversions: {
			skillToTrade: 1,
			tradeToLanguage: 0
		}
	},
	expectedSheet: {
		visibleText: ['agentic spellblade smoke', 'Spellblade', 'Human']
	}
};

export const smokeRecipes = [
	spellbladeHybridSmokeRecipe,
	humanBarbarianCanonicalRecipe,
	clericCanonicalRecipe
];
