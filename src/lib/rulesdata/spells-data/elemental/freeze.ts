import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const freeze: Spell = {
	id: 'freeze',
	name: 'Freeze',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold', 'Enfeeble', 'Slowed', 'Stunned'],

	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You gather freezing wind around a target within range for the duration. Make a Spell Check contested by the target's Repeated Might Save. Save Failure: The target is Slowed for the duration. While Slowed this way, the target takes 1 Cold damage at the start of each of their turns."
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
			name: 'Brittle',
			description: 'While Slowed this way, the target gains Vulnerability (1) to Physical damage.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Frostbite',
			description:
				'The target gains an additional stack of Slowed and the damage the target takes at the start of each of their turns increases by 1.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Frozen Solid',
			description: 'The target becomes Stunned X for the duration.',
			variable: true
		}
	]
};
