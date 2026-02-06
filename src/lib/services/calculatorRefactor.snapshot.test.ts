/**
 * Snapshot test for calculator refactor (Phase 8b)
 *
 * Captures the full EnhancedCalculationResult for representative characters
 * to detect any output drift during extraction. Run BEFORE refactor to
 * capture baseline, then after each extraction to verify no regression.
 */

import { describe, it, expect } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import type { EnhancedCharacterBuildData } from '../types/effectSystem';

// Helper to create a minimal build data fixture
function createFixture(
	overrides: Partial<EnhancedCharacterBuildData> & { classId: string; level: number }
): EnhancedCharacterBuildData {
	return {
		id: `snapshot-${overrides.classId}-${overrides.level}`,
		finalName: `Snapshot ${overrides.classId} L${overrides.level}`,
		attribute_might: 2,
		attribute_agility: 2,
		attribute_charisma: 0,
		attribute_intelligence: 0,
		combatMastery: Math.ceil(overrides.level / 2),
		selectedTraitIds: [],
		selectedTraitChoices: {},
		featureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		selectedSpells: {},
		selectedManeuvers: [],
		lastModified: 0, // Deterministic
		...overrides
	};
}

// Strip non-deterministic fields for stable snapshots
function stabilize(result: any): any {
	const copy = JSON.parse(JSON.stringify(result));
	delete copy.cacheTimestamp;
	delete copy.isFromCache;
	return copy;
}

describe('Calculator Refactor Snapshot (Phase 8b)', () => {
	const fixtures: Array<{ name: string; data: EnhancedCharacterBuildData }> = [
		{
			name: 'Barbarian L1',
			data: createFixture({
				classId: 'barbarian',
				level: 1,
				attribute_might: 3,
				attribute_agility: 2,
				attribute_charisma: 0,
				attribute_intelligence: 0
			})
		},
		{
			name: 'Wizard L5 with subclass',
			data: createFixture({
				classId: 'wizard',
				level: 5,
				attribute_might: -1,
				attribute_agility: 0,
				attribute_charisma: 1,
				attribute_intelligence: 4,
				selectedSubclass: 'Archmage',
				pathPointAllocations: { spellcasting: 5 }
			})
		},
		{
			name: 'Spellblade L3 multipath',
			data: createFixture({
				classId: 'spellblade',
				level: 3,
				attribute_might: 2,
				attribute_agility: 1,
				attribute_charisma: 0,
				attribute_intelligence: 2,
				pathPointAllocations: { martial: 2, spellcasting: 1 }
			})
		},
		{
			name: 'Dwarf Rogue L2 with traits',
			data: createFixture({
				classId: 'rogue',
				level: 2,
				attribute_might: 1,
				attribute_agility: 3,
				attribute_charisma: 1,
				attribute_intelligence: 0,
				ancestry1Id: 'dwarf',
				selectedTraitIds: [
					'dwarf_darkvision',
					'dwarf_earthen_durability',
					'dwarf_earthen_knowledge'
				]
			})
		}
	];

	for (const fixture of fixtures) {
		it(`should match snapshot for ${fixture.name}`, () => {
			const result = calculateCharacterWithBreakdowns(fixture.data);
			expect(stabilize(result)).toMatchSnapshot();
		});
	}
});
