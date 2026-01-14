import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const arcaneShield: Spell = {
	id: 'arcane-shield',
	name: 'Arcane Shield',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Nullification,
	tags: [],

	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a barrier of magic to protect yourself or another creature nearby. Trigger: When a target you can see within range (including yourself) is targeted by an Attack against its AD. Reaction: You grant the target a +5 bonus to its AD.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Multiple Targets',
			description:
				"You target 1 additional creature within range that's also targeted by the same Attack.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Arcane Absorption',
			description:
				'Immediately after the Attack, you gain 2 Temp HP. The Temp HP increases by 2 each time you use this Enhancement.',
			repeatable: true
		}
	]
};
