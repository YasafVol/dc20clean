import type { Spell } from '../../../schemas/spell.schema';
import { SpellSchool, SpellList, PremadeSpellList } from '../../../schemas/spell.schema';

export const deathBolt: Spell = {
	name: 'Death Bolt',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Umbral damage.'
		},
		{
			title: 'Black Orb',
			description:
				'Black wispy magic swirls around your hands. Your touch send chills down the spine of creatures and make small plants wither. You can hold this dark energy in your hands for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Bloodied.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Umbral damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dampen Heal',
			description:
				'Creatures that take damage from this Spell can’t regain HP until the start of their next turn.'
		}
	]
};
