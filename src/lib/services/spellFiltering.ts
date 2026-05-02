import type { GlobalMagicProfile, SpellsKnownSlot } from '../types/effectSystem';
import type { Spell, SpellSource, SpellSchool, SpellTag } from '../rulesdata/spells-data';

export type MpCostFilter = number | 'none';

export interface SpellFacetFilters {
	sources?: SpellSource[];
	schools?: SpellSchool[];
	tags?: SpellTag[];
}

export interface SpellCostFilters {
	apCosts?: number[];
	mpCosts?: MpCostFilter[];
	minMpCost?: number;
}

type SustainedFilter = boolean | 'all' | 'yes' | 'no';

type SpellRestrictions = NonNullable<SpellsKnownSlot['specificRestrictions']>;

const hasValues = <T>(values: T[] | undefined): values is T[] => Boolean(values?.length);

const matchesSource = (spell: Spell, sources: SpellSource[] | undefined): boolean =>
	!hasValues(sources) || sources.some((source) => spell.sources.includes(source));

const matchesSchoolOrTag = (
	spell: Spell,
	schools: SpellSchool[] | undefined,
	tags: SpellTag[] | undefined
): boolean => {
	const hasSchools = hasValues(schools);
	const hasTags = hasValues(tags);

	if (!hasSchools && !hasTags) {
		return true;
	}

	return (
		(hasSchools && schools.includes(spell.school)) ||
		(hasTags && tags.some((tag) => spell.tags?.includes(tag)))
	);
};

export const matchesUserSpellFacets = (spell: Spell, filters: SpellFacetFilters): boolean => {
	const hasSources = hasValues(filters.sources);
	const hasSchools = hasValues(filters.schools);
	const hasTags = hasValues(filters.tags);

	if (!hasSources && !hasSchools && !hasTags) {
		return true;
	}

	return (
		(hasSources && filters.sources.some((source) => spell.sources.includes(source))) ||
		(hasSchools && filters.schools.includes(spell.school)) ||
		(hasTags && filters.tags.some((tag) => spell.tags?.includes(tag)))
	);
};

export const matchesSpellCost = (spell: Spell, filters: SpellCostFilters): boolean => {
	if (hasValues(filters.apCosts) && !filters.apCosts.includes(spell.cost.ap)) {
		return false;
	}

	if (hasValues(filters.mpCosts)) {
		const mpCost = spell.cost.mp;
		if (
			!filters.mpCosts.some((filter) =>
				filter === 'none' ? mpCost === undefined : mpCost === filter
			)
		) {
			return false;
		}
	}

	return filters.minMpCost === undefined || (spell.cost.mp ?? 0) >= filters.minMpCost;
};

export const matchesSpellSustained = (spell: Spell, filter: SustainedFilter): boolean => {
	if (filter === true || filter === 'yes') {
		return spell.sustained;
	}

	if (filter === 'no') {
		return !spell.sustained;
	}

	return true;
};

export const matchesGlobalMagicProfile = (spell: Spell, profile: GlobalMagicProfile): boolean =>
	matchesSource(spell, profile.sources) && matchesSchoolOrTag(spell, profile.schools, profile.tags);

export const matchesSpellRestrictions = (
	spell: Spell,
	restrictions: SpellRestrictions | undefined
): boolean => {
	if (!restrictions) {
		return true;
	}

	if (restrictions.exactSpellId) {
		return spell.id === restrictions.exactSpellId;
	}

	return (
		matchesSource(spell, restrictions.sources) &&
		matchesSchoolOrTag(spell, restrictions.schools, restrictions.tags)
	);
};
