import type { Spell } from '../../../schemas/spell.schema';
import {
	SpellSchool,
	SpellList,
	ClassName,
	PremadeSpellList
} from '../../../schemas/spell.schema';

export const frostBolt: Spell = {
	name: 'Frost Bolt',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Cold damage.'
		},
		{
			title: 'Ice Orb',
			description:
				'A flurry of ice appears in your hand. The ice can remain there for 10 minutes and harms neither you nor your equipment, cooling the area within 5 Spaces. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Slowed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Cold damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Slow',
			description:
				'The target makes a Physical Save. Failure: Target becomes Slowed until the end of your next turn.'
		}
	]
};
