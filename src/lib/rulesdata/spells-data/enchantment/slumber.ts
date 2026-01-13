import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const slumber: Spell = {
	id: 'slumber',
	name: 'Slumber',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Enchantment,
	tags: ['Blinded', 'Deafened'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to cause a state of magical slumberness into creatures of your choice in a 2 Space diameter Sphere within range. Make a Spell Check contested by each target's Repeated Intelligence Save. Check Success: The target is Incapacitated for the duration or until it takes damage, makes a Save, or another creature spends 1 AP to shake or slap it out of it, removing the Condition."
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
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Lethargy',
			description:
				'When they lose the Condition, affected creatures make a Might Save against your Save DC. Failure: The target has DisADV on all Checks for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Unaware',
			description: 'Creatures Incapacitated by this Spell are Blinded and Deafened.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Sleep',
			description: 'On a Success, the target is Unconscious instead.'
		}
	]
};
