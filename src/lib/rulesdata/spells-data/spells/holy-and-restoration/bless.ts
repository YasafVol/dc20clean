import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const bless: Spell = {
	name: 'Bless',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Bless Creatures',
			description:
				'Make a DC 10 Spell Check. Success: You bless up to 3 creatures of your choice within range. Success (each 10): +1 additional creature. Failure: Only 2 creatures. Whenever a target makes a Check or Save before the Spell ends, the target can roll a d4 and add the number rolled to the total.'
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
			name: 'Grace',
			description: 'You change the d4 granted by the Spell to a d6.'
		}
	]
};
