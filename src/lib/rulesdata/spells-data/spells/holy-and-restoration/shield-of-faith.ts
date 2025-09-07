import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const shieldOfFaith: Spell = {
	name: 'Shield of Faith',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Protection,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Protective Field',
			description:
				'A shimmering field appears and surrounds a creature of your choice within range. Make a DC 10 Spell Check. Success: The target gains +2 PD for the duration. Success (each 10): +1 PD. Failure: The target gains 1 PD instead.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of creatures you can affect by 1.'
		}
	]
};
