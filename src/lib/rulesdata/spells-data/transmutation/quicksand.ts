import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const quicksand: Spell = {
	id: 'quicksand',
	name: 'Quicksand',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Earth', 'Hindered', 'Illusion', 'Motion', 'Slowed', 'Tethered'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You turn 3 Space diameter Sphere of ground within range into quicksand for the duration. Creatures in the area are Slowed 2. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target is Hindered for the duration or until it leaves the area.'
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
			description: 'The area of the Sphere increases by 1 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Grasping Sand',
			description:
				'Creatures Hindered by this Spell are also Tethered to the area. A creature can spend 1 AP to make a Repeated Might Save. Save Success: The target is no longer Tethered to the area.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'False Appearance',
			description:
				'The Spell lasts for 1 hour and the area appears as normal terrain. A creature can discern a Space has been altered with a successful Nature Check against your Save DC.'
		}
	]
};
