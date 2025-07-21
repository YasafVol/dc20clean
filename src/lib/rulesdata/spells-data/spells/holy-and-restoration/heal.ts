import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const heal: Spell = {
	name: 'Heal',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Restoration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Target',
			description:
				'Make a DC 10 Spell Check. Success: You heal the target creature within range for 3 HP. Success (each 5): + 1 HP. Critical Success: +2 HP. Failure: Only heal for 2 HP. If you’re touching the target of this Spell when you cast it, they regain an extra 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Quick Heal',
			description: 'You reduce the AP cost of this Spell by 1.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bolster',
			description:
				'You increase the HP regained by 3. You can take this enhancement multiple times.'
		}
	]
};
