import type { Spell } from '../../lib/rulesdata/schemas/spell.schema';
import type { SpellData } from '../../types';

export function createSpellDataFromSpell(spell: Spell, id = `spell_${Date.now()}`): SpellData {
	return {
		id,
		spellName: spell.name,
		school: spell.school,
		cost: { ...spell.cost },
		range: spell.range,
		duration: spell.duration,
		isPrepared: false,
		notes: '',
		effects: spell.effects,
		enhancements: spell.enhancements,
		isRitual: spell.isRitual,
		spellPassive: spell.spellPassive
	};
}
