import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const frostBolt: Spell = {
	id: 'frost-bolt',
	name: 'Frost Bolt',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Cold'],

	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You conjure a bolt of condensed freezing air that flies towards a target of your choice. Make a Ranged Spell Attack against the PD of a target within range. Hit: The target takes 1 Cold damage.'
		}
	],
	spellPassive:
		"Freezing: Liquids and objects not being held or carried in the target's Space frost over, causing them to adhere to nearby surfaces. A creature can use a Minor Action to make a Might Check against your Save DC to dislodge an object.",
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
			description: 'The damage increases by 1 for 1 target of your choice.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Slow',
			description:
				'1 target of your choice makes a Might Save. Save Failure: The target is Slowed for 1 Round.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Frost Bomb',
			description:
				'The projectile detonates on impact. Compare your Attack Check against the AD of every other target within 1 Space of the original target. Hit: The target takes X Cold damage.',
			variable: true
		}
	]
};
