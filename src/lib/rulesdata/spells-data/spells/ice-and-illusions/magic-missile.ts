import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const magicMissile: Spell = {
	name: 'Magic Missile',
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
			title: 'Glowing Darts',
			description:
				'You attempt to fire out glowing darts of magical force. Make a DC 10 Spell Check. Success: You create 2 Missiles. Success (each 5): +1 Missile. Failure: Only 1 Missile. Each Missile automatically deals 1 True damage to its target. Each missile may have the same or different targets.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: '+1 Missile.' },
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 15 Spaces.' }
	]
};
