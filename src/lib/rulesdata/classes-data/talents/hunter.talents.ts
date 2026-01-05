import type { Talent } from './talent.types';

export const hunterTalents: Talent[] = [
	{
		id: 'hunter_expanded_terrains',
		name: 'Expanded Terrains',
		category: 'Class',
		description:
			'You gain 2 additional Favored Terrains. You can’t choose the same option more than once.',
		prerequisites: { classId: 'hunter', feature: 'Favored Terrain' },
		effects: [{ type: 'GRANT_CHOICE', target: 'favored_terrain', value: 2 }]
	},
	{
		id: 'hunter_pack_leader',
		name: 'Pack Leader',
		category: 'Class',
		description:
			'Creatures of your choice can add a d4 to the first Attack they make on each of their turns against your Marked target.',
		prerequisites: { classId: 'hunter', feature: 'Hunter’s Mark', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'pack_leader',
				value: 'Allies add d4 to first attack against your Marked target.'
			}
		]
	},
	{
		id: 'hunter_big_game_hunter',
		name: 'Big Game Hunter',
		category: 'Class',
		description:
			'You gain additional benefits against Marked targets that are Large or larger: +1 damage, ADV on Saves they force, and ADV on Analyze Creature checks.',
		prerequisites: { classId: 'hunter', feature: 'Hunter’s Mark', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'big_game_hunter',
				value: 'Bonuses against Large or larger Marked targets.'
			}
		]
	}
];
