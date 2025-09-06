import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const fireShield: Spell = {
	name: 'Fire Shield',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 1, mp: 2 },
	range: 'Self',
	duration: '1 minute',
	spellLists: [SpellList.Wizard],
	availableClasses: [],
	effects: [
		{
			title: 'Protective Flames',
			description:
				'A shield of fire surrounds you, granting you Fire Resistance (Half). When a creature within 1 Space of you hits you with a Melee Attack, it takes 2 Fire damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Burning Retribution',
			description: 'The damage dealt to attackers increases to 3 Fire damage.'
		}
	]
};
