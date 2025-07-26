import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const poisonBolt: Spell = {
	name: 'Poison Bolt',
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
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Poison damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Impaired.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Poison damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Sicken',
			description:
				'The target makes a Physical Save. Failure: Target becomes Impaired for 1 minute. A creature within 1 Space, including itself, can spend 1 AP to make a DC 10 Medicine Check to end the Condition early.'
		}
	]
};
