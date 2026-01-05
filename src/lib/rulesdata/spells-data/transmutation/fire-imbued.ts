import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const fireImbued: Spell = {
	id: 'fire-imbued',
	name: 'Fire Imbued',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Burning', 'Fire'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: '1 Minute (Sustained)',
	effects: [
		{
			title: 'Effect',
			description: 'For the duration, you deal +1 Fire damage on Martial Attacks.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 2,
			name: 'Damage',
			description: 'Your Attacks affected by this Spell deal +1 Fire damage.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description: 'You no longer need to Sustain the Spell.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Flame Lash',
			description:
				'The range of Attacks affected by this Spell increase by 1 Space for Melee Attacks, or by 5 Spaces for Ranged Attacks.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Burning Strikes',
			description:
				'Once per round, 1 target of an Attack affected by this Spell makes a Repeated Physical Save against your Save DC. Save Failure: The target is Burning X for 1 minute.',
			variable: true
		}
	]
};
