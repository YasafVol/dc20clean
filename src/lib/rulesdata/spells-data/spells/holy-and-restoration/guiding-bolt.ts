import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const guidingBolt: Spell = {
	name: 'Guiding Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Flash of Light',
			description:
				'A flash of light streaks toward a creature of your choice within range, surrounding them in a holy glow. Make a Spell Check against the target’s PD. Hit: The target takes 3 Radiant damage and the next Attack Check made against the target before the end of your next turn has ADV.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Guiding Damage',
			description:
				'The next Attack Check made against the target also deals an extra 3 Radiant damage on a Hit.'
		}
	]
};
