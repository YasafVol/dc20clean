import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const corrosiveWave: Spell = {
	id: 'corrosive-wave',
	name: 'Corrosive Wave',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],
	isCantrip: true,
	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a wave of acid that envelops a 1 Space Arc. Make a Spell Attack against the AD of every target within the area. Hit: The target takes 1 Corrosion damage.'
		}
	],
	cantripPassive:
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
			description: "The Area's radius increases by 1 Space.",
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Aura',
			description: 'The Area becomes an Aura instead.'
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
			cost: 3,
			name: 'Exposing Acid',
			description:
				'Each target makes a Repeated Agility Save. Save Failure: The target becomes covered in acid for 1 minute or until a creature (including itself) within 1 Space spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success. While covered in acid, the target is Exposed.'
		}
	]
};
