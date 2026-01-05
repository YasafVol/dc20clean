import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const chaosBomb: Spell = {
	id: 'chaos-bomb',
	name: 'Chaos Bomb',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Chaos'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 Minute',
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a Tiny sized Chaos Bomb in a Space within range. At the end of each of your turns, make a Fate Check. Result of 10 or above: The Chaos Bomb detonates.'
		}
	],
	cantripPassive:
		'Wild Magic Surge: When you Critically Fail or Critically Succeed on a Check made to cast this Spell, you roll on the Wild Magic Table.',
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
			name: 'Chaotic Expansion',
			description:
				"When you roll for Detonation and it doesn't detonate, the diameter of the Sphere increases by 1 Space."
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Controlled Entropy',
			description: 'When you roll the Fate Check, you roll twice and choose which result to use.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Sticky',
			description:
				"When you cast the Spell, you can attach the Chaos Bomb to an object or creature within range. If the target isn't willing, make a Spell Check against the target's Agility Save. Check Success: The Bomb is magically attached to the target. A creature can spend 1 AP to make a Trickery Check against your Save DC to remove it from a target within 1 Space (including themselves). Success: The Bomb is magically attached to the creature that removed it. Success (5): The Bomb stops magically sticking to objects or creatures."
		}
	]
};
