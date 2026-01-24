import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const mindBlast: Spell = {
	id: 'mind-blast',
	name: 'Mind Blast',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Enchantment,
	tags: ['Dazed', 'Psychic', 'Sense'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a blast of psychic energy that projects in a 2 Space Cone. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Psychic damage.'
		}
	],
	spellPassive:
		'Untraceable: Damage from this Spell leaves no visible trace on any affected creatures or the surrounding environment.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by 1.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The length of the Cone increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Dazed',
			description:
				'Each target makes an Intelligence Save. Save Failure: The target is Dazed for 1 round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Psionic Trail',
			description:
				"Each target makes an Intelligence Save. Save Failure: For the next 10 minutes, you know the target's exact location while it's within 10 Spaces of you."
		}
	]
};
