import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const planarProtection: Spell = {
	id: 'planar-protection',
	name: 'Planar Protection',
	sources: [SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You ward a creature within range against Planar influence. The target gains MDR and Resistance to one of the following Conditions for the duration: Charmed, Taunted, Intimidated. If the target is already affected by the chosen Condition, make a Spell Check against the Save DC of the Condition. Success: The chosen Condition immediately ends on the target.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Mystic Resistance',
			description: 'The target gains Mystical Resistance (Half) for the duration instead of MDR.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Condition Resistance',
			description: 'Choose an additional Condition from the list.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Mental Barrier',
			description: "The target's thoughts can't be read for the duration."
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Manipulation Protection',
			description: 'The target gains ADV on all Mental Saves for the duration.'
		}
	]
};
