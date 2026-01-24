import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const sanctuary: Spell = {
	id: 'sanctuary',
	name: 'Sanctuary',
	sources: [SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Embolden', 'Spirit', 'Ward'],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Choose a creature within range. Attacks are made with DisADV against the target. The target gains no benefit from this Spell for 1 Round if it makes an Attack, targets another creature with a Check, or forces a creature to make a Save.'
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
			name: 'Save Resistance',
			description: 'The creature gains ADV on Saves.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Possession Protection',
			description:
				"The target can't be possessed. If it's already possessed, it can repeat its Save against the possession at the start of each of its turns."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Enforced Peace',
			description:
				"When a creature makes an Attack against the target, it makes an Intelligence Save against your Save DC. Save Failure: The creature can't perform the Attack (it still spends the resources used on the Attack). This Save doesn't prevent the target from benefitting from this Spell for 1 Round."
		}
	]
};
