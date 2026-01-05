import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const arcaneWave: Spell = {
	id: 'arcane-wave',
	name: 'Arcane Wave',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Bludgeoning', 'Deafened', 'Piercing', 'Slashing'],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a burst of destructive energy that envelops a 2 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Bludgeoning, Slashing or Piercing damage (Your choice).'
		}
	],
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
			name: 'Fractured',
			description:
				'The Area becomes Difficult Terrain. A creature can spend 1 AP to clear 1 Space of this Difficult Terrain returning the Space to normal.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Reverberate',
			description:
				'Each target makes a Physical Save. Save Failure: The target is pulled toward you or pushed away from you up to X Spaces (your choice) and is Deafened for 1 Round.',
			variable: true
		}
	]
};
