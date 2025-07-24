import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const fireBolt: Spell = {
	name: 'Fire Bolt',
	premadeList: PremadeSpellList.FireAndFlames,
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
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Fire damage.'
		},
		{
			title: 'Fire Orb',
			description:
				'A flickering flame appears in your hand. The flame can remain there for 10 minutes and harms neither you nor your equipment. The flame sheds Bright Light in a 5 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Burning.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Fire damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by +5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Burning',
			description: 'The target makes a Physical Save. Failure: Target begins Burning.'
		}
	]
};
