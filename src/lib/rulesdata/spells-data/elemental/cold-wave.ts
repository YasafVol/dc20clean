import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const coldWave: Spell = {
	id: 'cold-wave',
	name: 'Cold Wave',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold', 'Slowed', 'Trap'],

	cost: { ap: 2 },
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You conjure a rush of freezing air that envelops a 1 Space Arc. Make an Area Spell Attack against the AD of every target within the Spell's area. Hit: The target takes 1 Cold damage."
		}
	],
	spellPassive:
		'Freezing: Liquids and objects not being held or carried in the area frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.',
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
			name: 'Slow',
			description:
				'Each target makes a Repeated Might Save. Save Failure: The target is Slowed for 1 Round.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Encasing Frost',
			description:
				'Each target makes a Might Save against your Save DC. Save Failure: For the next round, the first time the target willingly moves or takes a Reaction it takes X Cold damage.',
			variable: true
		}
	]
};
