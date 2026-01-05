import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const wildGuard: Spell = {
	id: 'wild-guard',
	name: 'Wild Guard',
	sources: [SpellSource.Primal],
	school: SpellSchool.Nullification,
	tags: [],
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You manipulate nature to protect yourself or another creature nearby. Trigger: When a target you can see within range (including yourself) is targeted by an Attack against their PD. Reaction: You grant the target a +5 bonus to its PD.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Grapple',
			description:
				'If the Attacker is within 1 Space of you, they make a Physical Save. Save Failure: The Attacker becomes Grappled by you once the Attack is resolved.'
		},
		{
			type: 'MP',
			cost: 1,
			name: "Nature's Intervention",
			description:
				'After the Attack is resolved, the target immediately moves 2 Space for free without provoking Opportunity Attacks.'
		}
	]
};
