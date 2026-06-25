import { describe, expect, it } from 'vitest';
import { ALL_SPELLS } from '../spells-data';
import { RULES_ALIASES } from './aliases';

const currentSpellKeys = new Set(ALL_SPELLS.flatMap((spell) => [spell.id, spell.name]));

describe('rules alias policy', () => {
	it('keeps spell aliases limited to verified pure identity renames', () => {
		const spellAliases = RULES_ALIASES.filter(
			(alias) => alias.domain === 'spell' && alias.status === 'alias'
		);

		expect(spellAliases.length).toBeGreaterThan(0);

		for (const alias of spellAliases) {
			expect(alias.compatibilityState).toBe('editable');
			expect(alias.toId, alias.fromId).toBeDefined();
			expect(currentSpellKeys.has(alias.toId!), alias.fromId).toBe(true);
			expect(alias.note).not.toMatch(/candidate|pending|verify|verification|rework|differ/i);
		}
	});

	it('requires explicit migration for spell changes that may alter function or cost', () => {
		const reworkedSpells = RULES_ALIASES.filter(
			(alias) => alias.domain === 'spell' && alias.status === 'reworked'
		);

		expect(reworkedSpells.length).toBeGreaterThan(0);

		for (const alias of reworkedSpells) {
			expect(alias.compatibilityState).toBe('upgrade-required');
			if (alias.toId) {
				expect(currentSpellKeys.has(alias.toId), alias.fromId).toBe(true);
			}
		}
	});
});
