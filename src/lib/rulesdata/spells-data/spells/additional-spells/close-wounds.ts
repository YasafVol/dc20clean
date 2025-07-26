import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const closeWounds: Spell = {
	name: 'Close Wounds',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Restoration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Allied Creature',
			description:
				'You touch an allied creature that has at least 1 HP, tapping into its inner life force to cause a surge of natural healing. Make a DC 10 Spell Check. Success: The target can spend 1 Rest Point to regain 2 HP. Failure: The target spends 1 Rest Point to regain 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description: 'You increase the range to 10 Spaces (and don’t have to touch the target).'
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
