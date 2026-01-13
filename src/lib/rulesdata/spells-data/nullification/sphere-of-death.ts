import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const sphereOfDeath: Spell = {
	id: 'sphere-of-death',
	name: 'Sphere of Death',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Exhaustion'],
	isCantrip: true,
	cost: { ap: 2 },
	range: '5 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a burst of shadow magic that envelops a 2 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Umbral damage.'
		}
	],
	cantripPassive:
		"Obscure: The Light level in the target's Space decreases by 1 until the end of the turn.",
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
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Sphere increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Doom',
			description: 'Each target makes a Repeated Charisma Save. Failure: The target is Doomed X.',
			variable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Exhaustion',
			description: 'Each target makes a Might Save. Save Failure: The target gains Exhaustion.'
		}
	]
};
