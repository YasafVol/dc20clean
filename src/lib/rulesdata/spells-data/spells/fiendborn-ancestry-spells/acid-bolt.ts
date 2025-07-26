import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const acidBolt: Spell = {
	name: 'Acid Bolt',
	premadeList: PremadeSpellList.FiendbornAncestry,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Corrosion damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Hindered.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Corrosion damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Corrode',
			description:
				'The target makes a Physical Save. Failure: Target becomes Hindered for 1 minute or until a creature (including itself) within 1 Space spends 1 AP to clear off the acid.'
		}
	]
};
