/**
 * DC20 v0.10.5 Spells - Main Export
 *
 * Base v0.10 spells are organized by magical School, then the current
 * selectable catalog is produced by the v0.10.5 compatibility overlay:
 * - Astromancy (10) - Space, time, and force magic
 * - Conjuration (14) - Creation and summoning
 * - Divination (2) - Knowledge and foresight
 * - Elemental (41) - Fire, ice, lightning, water, wind, earth
 * - Enchantment (12) - Mind and emotion manipulation
 * - Invocation (14) - Healing and radiant energy
 * - Nullification (16) - Negation, death, and shadows
 * - Transmutation (16) - Transformation and enhancement
 */

// Export all schools
export * from './astromancy';
export * from './conjuration';
export * from './divination';
export * from './elemental';
export * from './enchantment';
export * from './invocation';
export * from './nullification';
export * from './transmutation';

// Export schema types
export type {
	Spell,
	SpellCost,
	SpellEffect,
	SpellEnhancement,
	SpellTag
} from '../schemas/spell.schema';
export { SpellSchool, SpellSource, SpellcasterClass } from '../schemas/spell.schema';

// Import all school spell arrays
import { astromancySpells } from './astromancy';
import { conjurationSpells } from './conjuration';
import { divinationSpells } from './divination';
import { elementalSpells } from './elemental';
import { enchantmentSpells } from './enchantment';
import { invocationSpells } from './invocation';
import { nullificationSpells } from './nullification';
import { transmutationSpells } from './transmutation';

import type { Spell } from '../schemas/spell.schema';
import { resolveAliasId } from '../versioning/aliases';
import { applyV0105SpellCatalog } from './v0105Catalog';

// Base v0.10 catalog, kept as the non-destructive source for legacy aliases.
const BASE_SPELLS: Spell[] = [
	...astromancySpells,
	...conjurationSpells,
	...divinationSpells,
	...elementalSpells,
	...enchantmentSpells,
	...invocationSpells,
	...nullificationSpells,
	...transmutationSpells
];

// Current selectable spell catalog.
export const ALL_SPELLS: Spell[] = applyV0105SpellCatalog(BASE_SPELLS);

// Lookup utilities
export function getSpellById(id: string): Spell | undefined {
	const resolvedId = resolveAliasId('spell', id);
	return (
		ALL_SPELLS.find((s) => s.id === id) ??
		ALL_SPELLS.find((s) => s.id === resolvedId || s.name === resolvedId)
	);
}

export function getSpellsBySchool(school: string): Spell[] {
	return ALL_SPELLS.filter((s) => s.school.toLowerCase() === school.toLowerCase());
}

export function getSpellsBySource(source: string): Spell[] {
	return ALL_SPELLS.filter((s) =>
		s.sources.some((src) => src.toLowerCase() === source.toLowerCase())
	);
}

export function getCantrips(): Spell[] {
	return ALL_SPELLS.filter((s) => s.isCantrip);
}

export function getNonCantrips(): Spell[] {
	return ALL_SPELLS.filter((s) => !s.isCantrip);
}

// Export school arrays for convenience
export {
	astromancySpells,
	conjurationSpells,
	divinationSpells,
	elementalSpells,
	enchantmentSpells,
	invocationSpells,
	nullificationSpells,
	transmutationSpells
};
