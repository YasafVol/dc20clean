// src/lib/rulesdata/attributes.ts

import type { IAttributeData } from './types';
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
			{ statName: 'Initiative', formula: 'CM + Agility' }
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
