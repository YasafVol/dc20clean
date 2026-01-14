import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const gravitySinkHole: Spell = {
	id: 'gravity-sink-hole',
	name: 'Gravity Sink Hole',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Restrained'],

	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create an area of intense gravity that pulls creatures and objects in a 3 Space Sphere towards its center. Make a Spell Check against the Might Save of creatures in the area. Check Success: They are pulled 1 Space towards the center. Success (Each 5): They are pulled 1 additional Space. Collision: If a creature is pushed to the center of the area, they stop and take collision damage as if they had hit a solid surface.'
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
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Stronger Pull',
			description: 'The distance pulled increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Lingering',
			description:
				'The duration of the Spell becomes 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They are pulled X Spaces towards the center.',
			variable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Black Hole',
			description:
				'Requires Lingering. If a creature pulled by this Spell ends in a center Space they become Restrained for the duration. A creature Restrained this way makes a Repeated Might Save at the end of each of their turns, ending the condition on a Success.'
		}
	]
};
