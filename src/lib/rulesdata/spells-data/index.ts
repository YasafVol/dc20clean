/**
 * DC20 v0.10.5 Spells - Main Export
 *
 * The generated v0.10.5 catalog is the only runtime spell dataset.
 */

// Export schema types
export type {
	Spell,
	SpellCost,
	SpellEffect,
	SpellEnhancement,
	SpellTag
} from '../schemas/spell.schema';
export { SpellSchool, SpellSource, SpellcasterClass } from '../schemas/spell.schema';

import type { Spell } from '../schemas/spell.schema';
import { resolveAliasId } from '../versioning/aliases';
import { V0105_SPELLS } from './generated/v0105.generated';

// The sole runtime catalog, generated from the v0.10.5 clean rules source.
export const ALL_SPELLS: Spell[] = V0105_SPELLS;

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
