/**
 * Psion Class Definition - Placeholder
 *
 * NOTE: Psion is not yet included in DC20 v0.10 rules.
 * This is a placeholder to allow compilation until the class is added.
 */

import type { ClassDefinition } from '../../schemas/character.schema';

export const psionClass: ClassDefinition = {
	className: 'Psion',
	classCategory: 'spellcaster', // Experimental class
	experimental: true, // Not yet included in DC20 v0.10 rules
	spellcasterPath: {
		spellList: {
			description: 'TBD - Psion not yet released in v0.10',
			type: 'any'
		},
		cantrips: {
			description: 'TBD'
		},
		spells: {
			description: 'TBD'
		},
		manaPoints: {
			maximumIncreasesBy: 'TBD'
		}
	},
	coreFeatures: [],
	subclasses: []
};
