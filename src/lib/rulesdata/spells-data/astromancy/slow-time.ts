import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const slowTime: Spell = {
	id: 'slow-time',
	name: 'Slow Time',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Stunned', 'Paralyzed'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You slow time for a creature in range. Make a Spell Check Check contested by the target's Repeated Charisma Save. Success: The target is Slowed and Stunned."
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
			name: 'Lethargy',
			description: 'The target is Slowed and Stunned 2 instead.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Stolen Time',
			description: "You gain half the target's Speed for the duration."
		},
		{
			type: 'MP',
			cost: 4,
			name: 'Stop Time',
			description: 'The creature is Paralyzed instead.'
		}
	]
};
