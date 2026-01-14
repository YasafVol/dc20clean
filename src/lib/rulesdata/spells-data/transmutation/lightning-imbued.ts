import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const lightningImbued: Spell = {
	id: 'lightning-imbued',
	name: 'Lightning Imbued',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Lightning'],

	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Lightning damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Lightning damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description: 'You no longer need to Sustain the Spell.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Chain Lightning',
			description:
				'Once per Round, when you make an Attack affected by this Spell, you can choose 1 additional target within 3 Spaces of the original target using the same Martial Attack for the additional target. Hit: The Target takes X Lightning damage.',
			variable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Static Strike',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Physical Save against your Save DC. Save Failure: For the next round, the first time the target willingly moves or takes a Reaction it takes X Lightning damage.',
			variable: true
		}
	]
};
