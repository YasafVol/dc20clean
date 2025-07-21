import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const sacredBolt: Spell = {
	name: 'Sacred Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [ClassName.Cleric],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Radiant damage.'
		},
		{
			title: 'Sacred Glow',
			description:
				'A beam of Bright Light illuminates a creature that you can see within range, or you can make a creature within range glow with a subtle Dim Light for 10 minutes.'
		}
	],
	cantripPassive: 'You deal +1 Radiant damage against Undead and Exposed creatures.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Radiant damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Holy Bolt',
			description:
				'The target makes a Mental Save. Failure: Target becomes Exposed (Attack Checks against it have ADV) against the next Attack Check made against it before the end of your next turn.'
		}
	]
};
