import { describe, expect, it } from 'vitest';
import { SpellSchool, SpellSource, type Spell, type SpellTag } from '../rulesdata/spells-data';
import {
	matchesGlobalMagicProfile,
	matchesSpellCost,
	matchesSpellRestrictions,
	matchesSpellSlot,
	matchesSpellSustained,
	matchesUserSpellFacets
} from './spellFiltering';
import type { SpellsKnownSlot } from '../types/effectSystem';

const makeSpell = (overrides: Partial<Spell>): Spell =>
	({
		id: 'test_spell',
		name: 'Test Spell',
		sources: [SpellSource.Arcane],
		school: SpellSchool.Astromancy,
		tags: [],
		isCantrip: false,
		cost: { ap: 1 },
		range: '5 Spaces',
		duration: 'Instant',
		sustained: false,
		effects: [],
		enhancements: [],
		...overrides
	}) as Spell;

describe('spell filtering', () => {
	it('matches any selected source, school, or tag facet', () => {
		const spell = makeSpell({
			sources: [SpellSource.Arcane],
			school: SpellSchool.Astromancy,
			tags: ['Fire']
		});

		expect(
			matchesUserSpellFacets(spell, {
				sources: [SpellSource.Divine],
				schools: [SpellSchool.Elemental],
				tags: ['Fire']
			})
		).toBe(true);
	});

	it('allows all spells when no source, school, or tag facets are selected', () => {
		const spell = makeSpell({
			sources: [SpellSource.Primal],
			school: SpellSchool.Nullification,
			tags: ['Curse']
		});

		expect(matchesUserSpellFacets(spell, {})).toBe(true);
	});

	it('keeps cost as a narrowing filter after OR facets', () => {
		const spell = makeSpell({
			sources: [SpellSource.Arcane],
			school: SpellSchool.Elemental,
			tags: ['Fire'],
			cost: { ap: 2, mp: 1 }
		});

		expect(matchesSpellCost(spell, { apCosts: [2], mpCosts: [1] })).toBe(true);
		expect(matchesSpellCost(spell, { apCosts: [1], mpCosts: [1] })).toBe(false);
		expect(matchesSpellCost(spell, { apCosts: [2], mpCosts: [2] })).toBe(false);
	});

	it('keeps sustained as a narrowing filter after OR facets', () => {
		const sustainedSpell = makeSpell({ sustained: true });
		const instantSpell = makeSpell({ sustained: false });

		expect(matchesSpellSustained(sustainedSpell, true)).toBe(true);
		expect(matchesSpellSustained(instantSpell, true)).toBe(false);
		expect(matchesSpellSustained(instantSpell, false)).toBe(true);
	});

	it('allows Bard-style access by school or tag', () => {
		const healingSpell = makeSpell({
			school: SpellSchool.Invocation,
			tags: ['Healing']
		});

		expect(
			matchesGlobalMagicProfile(healingSpell, {
				sources: [],
				schools: [SpellSchool.Enchantment],
				tags: ['Embolden', 'Enfeeble', 'Healing', 'Illusion', 'Sound'] as SpellTag[]
			})
		).toBe(true);
	});

	it('allows slot restrictions by school or tag when both are present', () => {
		const wardSpell = makeSpell({
			school: SpellSchool.Transmutation,
			tags: ['Ward']
		});

		expect(
			matchesSpellRestrictions(wardSpell, {
				schools: [SpellSchool.Elemental],
				tags: ['Ward']
			})
		).toBe(true);
	});

	it('uses exact spell restrictions as exact-only matches', () => {
		const spell = makeSpell({
			id: 'not_find_familiar',
			school: SpellSchool.Conjuration,
			tags: ['Summoning']
		});

		expect(
			matchesSpellRestrictions(spell, {
				exactSpellId: 'find_familiar',
				schools: [SpellSchool.Conjuration],
				tags: ['Summoning']
			})
		).toBe(false);
	});

	it('applies the global profile only to global slots', () => {
		const spell = makeSpell({
			id: 'fireball',
			school: SpellSchool.Elemental,
			tags: ['Fire']
		});
		const bardProfile = {
			sources: [],
			schools: [SpellSchool.Enchantment],
			tags: ['Embolden', 'Enfeeble', 'Healing', 'Illusion', 'Sound'] as SpellTag[]
		};
		const globalSlot: SpellsKnownSlot = {
			id: 'global_spell_0',
			type: 'spell',
			sourceName: 'Bard Progression',
			isGlobal: true
		};
		const magicalSecretsSlot: SpellsKnownSlot = {
			id: 'specialized_bard_magical_secrets_0_0',
			type: 'spell',
			sourceName: 'Magical Secrets',
			isGlobal: false,
			specificRestrictions: {}
		};

		expect(matchesSpellSlot(spell, globalSlot, bardProfile)).toBe(false);
		expect(matchesSpellSlot(spell, magicalSecretsSlot, bardProfile)).toBe(true);
	});

	it('treats catalog isCantrip flags as display metadata for slot matching', () => {
		const cantripFlaggedSpell = makeSpell({ isCantrip: true });
		const spell = makeSpell({ isCantrip: false });
		const spellSlot: SpellsKnownSlot = {
			id: 'spell_slot',
			type: 'spell',
			sourceName: 'Spell Grant',
			isGlobal: false,
			specificRestrictions: {}
		};

		expect(matchesSpellSlot(spell, spellSlot)).toBe(true);
		expect(matchesSpellSlot(cantripFlaggedSpell, spellSlot)).toBe(true);
	});
});
