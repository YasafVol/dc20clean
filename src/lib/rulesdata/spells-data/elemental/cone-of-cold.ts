import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const coneOfCold: Spell = {
	id: 'cone-of-cold',
	name: 'Cone of Cold',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold', 'Stunned'],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a rush of freezing air that envelops a 2 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Cold damage.'
		}
	],
	cantripPassive:
		'Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The length of the Cone increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Slow',
			description:
				'Each target makes a Might Save. Save Failure: The target is Slowed for 1 Round.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Frozen Stiff',
			description:
				'Each target makes a Physical Save. Save Failure: The target is Stunned for 1 Round.',
			repeatable: true
		}
	]
};
