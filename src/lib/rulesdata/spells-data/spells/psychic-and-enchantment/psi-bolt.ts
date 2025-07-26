import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const psiBolt: Spell = {
	name: 'Psi Bolt',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Psychic damage.'
		},
		{
			title: 'Headache',
			description:
				'You tear into the mind of a creature you can see within range and give them a mild headache for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Dazed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Psychic damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dazed',
			description:
				'The target makes a Mental Save. Failure: Target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.'
		}
	]
};
