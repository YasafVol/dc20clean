import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const poisonBolt: Spell = {
	id: 'poison-bolt',
	name: 'Poison Bolt',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Poison'],
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of condensed poisonous gas that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Poison damage.'
		}
	],
	cantripPassive:
		"Noxious: Plant life in the target's Space that is not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.",
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
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Debilitating Poison',
			description:
				'The target makes a Repeated Might Save. Failure: The target is afflicted by a Basic Poison for 1 minute. Creatures Poisoned by this Spell are Hindered or Impaired (your choice when you use this Enhancement).'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Deadly Poison',
			description:
				'The target makes a Repeated Might Save. Save Failure: The target is Poisoned for 1 minute. Creatures Poisoned by this Spell take X Poison damage at the start of each of their turns. This Poison can be removed by any effect that ends a Basic Poison.',
			variable: true
		}
	]
};
