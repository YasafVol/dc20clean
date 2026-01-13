import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const toxicAura: Spell = {
	id: 'toxic-aura',
	name: 'Toxic Aura',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Poison'],
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You emit toxic air that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of each target in the area. Hit: They take 1 Poison damage.'
		}
	],
	cantripPassive:
		'Noxious: Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.',
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
			description: 'The radius of the Aura increases by 1 Space.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Disease',
			description:
				"Each target makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a rest. This Disease can be removed by any effect that ends a Basic Disease.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Spreading Plague',
			description:
				'Requires Disease. Creatures Diseased by this Spell also emit a 1 Space Aura of diseased air. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target also becomes Diseased by this spell for 1 minute. You are immune to the effects of Spreading Plague.'
		}
	]
};
