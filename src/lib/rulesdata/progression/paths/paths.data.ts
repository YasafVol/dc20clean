// paths.data.ts

import { CharacterPath } from './paths.types';

/**
 * An array containing the definitions for all available Character Paths.
 * This is the static "game rule" data for your application.
 */
export const CHARACTER_PATHS: CharacterPath[] = [
	{
		id: 'martial_path',
		name: 'Martial Path',
		description: 'Focuses on combat training and maneuvers.',
		progression: [
			{ pathLevel: 1, benefits: { staminaPoints: 1, maneuversLearned: 1 } },
			{ pathLevel: 2, benefits: { maneuversLearned: 1 } },
			{ pathLevel: 3, benefits: { staminaPoints: 1, maneuversLearned: 1 } },
			{ pathLevel: 4, benefits: { maneuversLearned: 1 } }
		],
		specialRules: [
			// DC20 v0.10 p.161: "A Class that starts without a Stamina Regen gains the Spellcaster Stamina Regen
			// listed below when they choose the Martial Path for the first time."
			'Classes Lacking Stamina Regen: When you first invest in this path, you gain Spellcaster Stamina Regen - Once per round, you regain up to half your maximum SP when you use a Spell Enhancement.'
		]
	},
	{
		id: 'spellcaster_path',
		name: 'Spellcaster Path',
		description: 'Focuses on increasing magical resources and known spells.',
		progression: [
			// DC20 v0.10 p.161: Level 1 grants +3 MP (not +2)
			{ pathLevel: 1, benefits: { manaPoints: 3, cantripsLearned: 1, spellsLearned: 1 } },
			{ pathLevel: 2, benefits: { manaPoints: 2, cantripsLearned: 1 } },
			{ pathLevel: 3, benefits: { manaPoints: 2, cantripsLearned: 1, spellsLearned: 1 } },
			{ pathLevel: 4, benefits: { manaPoints: 2, spellsLearned: 1 } }
		],
		specialRules: [
			// DC20 v0.10 p.161: "A Class that starts without a Spell List gains a Spell List of their choice
			// from any Class when they choose the Spellcaster Path for the first time."
			'Classes Lacking a Spell List: When you first invest in this path, you gain a Spell List of your choice from any Class.'
		]
	}
];
