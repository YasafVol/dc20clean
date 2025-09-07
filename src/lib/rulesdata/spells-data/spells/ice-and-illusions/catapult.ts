import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const catapult: Spell = {
	name: 'Catapult',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Launch Object',
			description:
				'Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 15 Spaces in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If you attempt to strike a creature, make a Spell Check against the target’s PD. Hit: 3 Bludgeoning damage.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: 'You deal +2 Bludgeoning damage.' }
	]
};
