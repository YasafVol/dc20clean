import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const arcaneBolt: Spell = {
	id: 'arcane-bolt',
	name: 'Arcane Bolt',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Bludgeoning', 'Piercing', 'Slashing'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of pure magical energy that homes in on a target. Make a Ranged Spell Attack against the AD of a target within range. Hit: The target takes 1 Bludgeoning, Slashing or Piercing damage (your choice).'
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
			type: 'AP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1 for 1 target of your choice.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Arcane Missiles',
			description:
				'Choose X additional targets within range using the same Spell Attack for all targets.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Autonomous',
			description:
				"You can Attack a target you've seen since the start of your last turn, provided it's within range and there's a path between you and the target the projectile can follow. This attack ignores 1/2 or 3/4 Cover and you don't have DisADV if the target is Unseen by you."
		}
	]
};
