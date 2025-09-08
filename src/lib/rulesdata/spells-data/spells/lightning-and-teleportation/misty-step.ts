import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const mistyStep: Spell = {
	name: 'Misty Step',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Astromancy,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Teleport',
			description:
				'You are briefly surrounded by a silvery mist and attempt to teleport to a new location. Make a DC 20 Spell Check. Success: You teleport up to 5 Spaces to an unoccupied Space that you can see. Success (each 5): +2 Spaces. Failure: Only 3 Spaces.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Far Step',
			description: 'You increase the distance you can teleport by 4 Spaces.'
		}
	]
};
