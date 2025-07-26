import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const bane: Spell = {
	name: 'Bane',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Curse',
			description:
				'Choose 3 creatures that you can see within range. Make a Spell Check contested by their Mental Save. Failure: The target must roll a d4 and subtract the number from each Attack Check or Save they make until the Spell ends.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by 1.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Dread',
			description: 'Targets subtract a d6 instead of a d4 from their Attack Checks and Saves.'
		}
	]
};
