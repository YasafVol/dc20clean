import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const corrosiveBolt: Spell = {
	id: 'corrosive-bolt',
	name: 'Corrosive Bolt',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: [],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of acid that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Corrosion damage.'
		}
	],
	spellPassive:
		"Acidic: Mundane materials in the target's Space (wood, leather, rope, non-magical metals) that are not being worn or held partially erode or decay, weakening structures and gear.",
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
			type: 'AP',
			cost: 1,
			name: 'Dissolve',
			description:
				'1 target makes a Repeated Agility Save. Save Failure: The target no longer benefits from PDR or EDR for 1 minute.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Acid',
			description:
				'The target makes a Repeated Agility Save. Save Failure: The Target becomes covered in acid for 1 minute. While covered in acid, the target is Hindered and take X Corrosion damage at the start of each of their turns. A creature within 1 Space (including itself) spends 1 AP to make a Survival Check against your Save DC, removing the acid on a Success.',
			variable: true
		}
	]
};
