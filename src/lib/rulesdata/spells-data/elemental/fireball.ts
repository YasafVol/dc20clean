import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fireball: Spell = {
	id: 'fireball',
	name: 'Fireball',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Burning', 'Fire'],

	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a brilliant flame that envelops a 2 Space Diameter Sphere area within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Fire damage.'
		}
	],
	spellPassive:
		"Ignite: Flammable objects that are not being worn or held in the target's Space catch fire. A creature can spend 1 AP to put out a mundane fire within 1 Space of them.",
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description: 'The range of the Spell increases by 5 Spaces.'
		},
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
			description: 'The diameter of a Sphere of your choice increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Burning',
			description:
				'Each target makes a Repeated Physical Save. Save Failure: The target begins Burning for 1 minute.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Fireball Swarm',
			description:
				'You produce another 2 Space diameter Sphere within range using the same Spell Attack for all targets in each area.',
			repeatable: true
		}
	]
};
