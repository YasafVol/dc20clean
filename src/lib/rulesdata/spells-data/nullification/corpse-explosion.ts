import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const corpseExplosion: Spell = {
	id: 'corpse-explosion',
	name: 'Corpse Explosion',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: [],

	cost: { ap: 1, mp: 1 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Trigger: A target within range you can see dies. Reaction: The target's corpse explodes, make an Area Spell Attack against the AD of each target within 1 Space of the corpse. Hit: The target takes 1 Umbral Damage."
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
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Disease Cloud',
			description:
				"A cloud forms in a 3 Space diameter Sphere centered on the corpse for 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a rest. This Disease can be removed by any effect that ends a Basic Disease.",
			variable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Creeping Death',
			description: "Requires Disease Cloud. Creatures Diseased by this Spell can't regain HP."
		}
	]
};
