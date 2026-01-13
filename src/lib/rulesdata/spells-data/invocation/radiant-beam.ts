import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const radiantBeam: Spell = {
	id: 'radiant-beam',
	name: 'Radiant Beam',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Blinded', 'Burning', 'Radiant'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a 6 Space Tall, 2 Space Wide Cylinder of celestial light (sun, moon or star light) fills an area within range for the duration. When a creature enters the area for the first time on its turn, or starts its turn there, it makes a Might Save against your Save DC. Save Failure: The target takes 1 Radiant damage.'
		}
	],
	cantripPassive: 'Light: The area is filled with Bright Light for the duration.',
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
			cost: 2,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Cylinder increases by 1 Space and the height by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Burning Radiance',
			description:
				'A creature that fails its Save begins Burning for the duration. Burning damage from this Enhancement deals Radiant damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Blinded',
			description: 'A creature that fails its Save becomes Blinded for 1 Round.'
		}
	]
};
