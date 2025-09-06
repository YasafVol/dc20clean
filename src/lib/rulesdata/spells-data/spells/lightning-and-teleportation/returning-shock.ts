import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, PremadeSpellList } from '../../../schemas/spell.schema';

export const returningShock: Spell = {
	name: 'Returning Shock',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '15 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock on Damage',
			description:
				'Trigger: You are damaged by a creature within range. Reaction: Make a Spell Check against the target’s PD. Hit: 3 Lightning damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Chain',
			description:
				'You can choose 1 additional target within 2 Spaces of the original target. Compare you Spell Check against the new target’s PD. Hit: The additional target takes 3 Lightning damage, and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher. You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
