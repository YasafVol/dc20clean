import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const vampiricTouch: Spell = {
	id: 'vampiric-touch',
	name: 'Vampiric Touch',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Nullification,
	tags: ['Healing'],

	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Make a Melee Spell Attack against the PD of a creature in range. Hit: The target takes 1 Umbral damage and you can spend 1 Rest Point to regain 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 1 Space. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Leeching Grab',
			description:
				'The target makes a Might Save against your Save DC. Save Failure: The target is Slowed for 1 round.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Doomed',
			description:
				'The target makes a Repeated Charisma Save against your Save DC. Save Failure: The target is Doomed for 1 minute.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Life Drain',
			description:
				'The damage increases by 1 and you regain 1 HP on a Hit (You regain this HP without spending Rest Points).',
			repeatable: true
		}
	]
};
