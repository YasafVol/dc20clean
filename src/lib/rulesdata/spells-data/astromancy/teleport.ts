import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const teleport: Spell = {
	id: 'teleport',
	name: 'Teleport',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Motion', 'Slowed', 'Teleportation'],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You teleport to a new location. Make a DC 15 Spell Check. Failure: You teleport up to 3 Spaces. Success: You teleport up to 5 Spaces to an unoccupied Space that you can see. Success (each 5): +2 Space.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Distance',
			description: 'The distance of the teleport increases by 3 Spaces.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Passenger',
			description:
				'X willing creatures within 2 Spaces of you are also teleported, appearing in an unoccupied space within 2 Spaces of where you appear after teleporting.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Temporal Shiver',
			description:
				'Creatures within 1 Spaces of you before you teleport make an Intelligence Save against your Save DC. Save Failure: The target is Slowed for 1 Round.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Temporal Repulse',
			description:
				'After you teleport, creatures within 1 Space of you make a Might Save against your Save DC. Save Failure: The target is pushed X Spaces away from you.',
			variable: true
		}
	]
};
