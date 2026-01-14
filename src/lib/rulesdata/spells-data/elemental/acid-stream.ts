import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const acidStream: Spell = {
	id: 'acid-stream',
	name: 'Acid Stream',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You produce a stream of acid that project in a 4 Space Line. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Corrosion damage.'
		}
	],
	spellPassive:
		'Acidic: Mundane materials in the area (wood, leather, rope, non-magical metals) that are not being worn or held partially erode or decay, weakening structures and gear.',
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
			description: 'The length of the Line increases by 6 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Dissolve',
			description:
				'Each target makes a Repeated Agility Save. Save Failure: They no longer benefit from PDR or EDR for the 1 minute.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Hinder',
			description:
				'Each target makes a Repeated Agility Save. Save Failure: The Target becomes covered in acid for 1 minute. While covered in acid, the target is Hindered. A creature within 1 Space (including itself) spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success.'
		}
	]
};
