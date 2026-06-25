import { describe, expect, it } from 'vitest';
import { isCustomSpellName, resolveCatalogSpell } from './Spells';

describe('Spells alias-aware catalog lookup', () => {
	it('resolves legacy aliased spell names through the canonical catalog', () => {
		expect(resolveCatalogSpell('Summon Familiar')?.name).toBe('Call Familiar');
		expect(isCustomSpellName('Summon Familiar')).toBe(false);
	});

	it('still treats unknown names as custom spells', () => {
		expect(resolveCatalogSpell('My House Spell')).toBeUndefined();
		expect(isCustomSpellName('My House Spell')).toBe(true);
	});
});
