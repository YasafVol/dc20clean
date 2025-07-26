import { Spell, SpellSchool, SpellList, PremadeSpellList } from '../../types/spell.types';

export const sleep: Spell = {
	name: 'Sleep',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Magical Slumber',
			description:
				'You attempt to force creatures within 4 Spaces of a point you choose within range to fall into a magical slumber. Make a DC 10 Spell Check. Success: This Spell can effect 10 HP worth of creatures. Success (each 5): +2 HP. Failure: 5 HP. Starting with the creature with the lowest current HP, each creature affected by this Spell falls Unconscious. Subtract each creature’s HP from the total before moving on to the creature with the next lowest current HP. A creature’s HP must be equal to or less than the remaining total for that creature to be affected. The sleep lasts until the Spell ends or another creature within 1 Space spends 1 AP to shake or slap the sleeping creature awake. Undead and creatures that don’t sleep aren’t affected by this spell.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Slumber', description: 'You increase the HP affected by 10.' }
	]
};
