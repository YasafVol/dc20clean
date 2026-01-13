import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const bind: Spell = {
	id: 'bind',
	name: 'Bind',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Restrained', 'True'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You bind a creature within range. Make a Spell Check contested by the target's Repeated Might Save. Check Success: The target is Immobilized for the duration."
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
			name: 'Restrain',
			description: 'On a Success, the target is Restrained instead.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Constrict',
			description:
				"Once per round, when you Sustain this Spell or by spending 1 AP, you can make a Melee Spell Attack against the target's AD. Hit: They take X True damage.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Lingering Bind',
			description:
				'Instead of the Save being Repeated, once on each of their turns the target can spend 1 AP to attempt the Save again.'
		}
	]
};
