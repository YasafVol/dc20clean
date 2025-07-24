import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const guidance: Spell = {
	name: 'Guidance',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Grant Help Die',
			description:
				'You grant a Help Die (d8) to an ally within range. The target can use this Help Die to add to any Check they make before the start of your next turn. Casting Guidance counts as taking the Help Action and still triggers the “Multiple Action Penalty (Help)”. If you cast Guidance again or take the Help Action, the Help Die would be a d6, then a d4, then you wouldn’t be able to grant any more during the same round of Combat.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sustained',
			description: 'The duration increases to 1 minute, but it requires the Sustain Action.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Expand',
			description:
				'You grant an additional Help Die (of the same size you granted with the casting of the Spell).'
		}
	]
};
