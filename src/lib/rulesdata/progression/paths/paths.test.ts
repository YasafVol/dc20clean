/**
 * Character Paths Data Integrity Tests
 *
 * Tests verify DC20 v0.10 correct values for:
 * - Path progression benefits (SP, MP, Maneuvers, Cantrips, Spells)
 * - Cross-path special rules
 * - Path structure and IDs
 *
 * See docs/systems/LEVELING_GAPS_SPEC.md for full reference
 */

import { describe, it, expect } from 'vitest';
import { CHARACTER_PATHS } from './paths.data';

describe('Character Paths Data Integrity', () => {
	describe('Path Structure', () => {
		it('should have exactly 2 paths (Martial and Spellcaster)', () => {
			expect(CHARACTER_PATHS.length).toBe(2);
		});

		it('should have martial_path and spellcaster_path IDs', () => {
			const pathIds = CHARACTER_PATHS.map((p) => p.id);
			expect(pathIds).toContain('martial_path');
			expect(pathIds).toContain('spellcaster_path');
		});

		it('should have 4 progression levels each', () => {
			for (const path of CHARACTER_PATHS) {
				expect(path.progression.length).toBe(4);
				const levels = path.progression.map((p) => p.pathLevel);
				expect(levels).toEqual([1, 2, 3, 4]);
			}
		});
	});

	describe('Martial Path Benefits (DC20 v0.10 p.161)', () => {
		const martialPath = CHARACTER_PATHS.find((p) => p.id === 'martial_path');

		it('should grant +1 SP at levels 1 and 3', () => {
			expect(martialPath).toBeDefined();
			const level1 = martialPath!.progression.find((p) => p.pathLevel === 1);
			const level3 = martialPath!.progression.find((p) => p.pathLevel === 3);

			expect(level1?.benefits.staminaPoints).toBe(1);
			expect(level3?.benefits.staminaPoints).toBe(1);
		});

		it('should grant +1 maneuver at each level', () => {
			expect(martialPath).toBeDefined();
			for (const level of martialPath!.progression) {
				expect(level.benefits.maneuversLearned).toBe(1);
			}
		});

		it('should have special rule about Spellcaster Stamina Regen', () => {
			expect(martialPath).toBeDefined();
			expect(martialPath!.specialRules).toBeDefined();
			expect(martialPath!.specialRules!.length).toBeGreaterThan(0);

			// Rule should mention "first invest" not "2 Path Points"
			const rule = martialPath!.specialRules![0];
			expect(rule).toContain('first invest');
			expect(rule).not.toContain('2 Path Points');
		});
	});

	describe('Spellcaster Path Benefits (DC20 v0.10 p.161)', () => {
		const spellcasterPath = CHARACTER_PATHS.find((p) => p.id === 'spellcaster_path');

		it('should grant +3 MP at level 1 (not +2)', () => {
			expect(spellcasterPath).toBeDefined();
			const level1 = spellcasterPath!.progression.find((p) => p.pathLevel === 1);

			// DC20 v0.10 specifies +3 MP at level 1
			expect(level1?.benefits.manaPoints).toBe(3);
		});

		it('should grant +2 MP at levels 2, 3, 4', () => {
			expect(spellcasterPath).toBeDefined();
			const level2 = spellcasterPath!.progression.find((p) => p.pathLevel === 2);
			const level3 = spellcasterPath!.progression.find((p) => p.pathLevel === 3);
			const level4 = spellcasterPath!.progression.find((p) => p.pathLevel === 4);

			expect(level2?.benefits.manaPoints).toBe(2);
			expect(level3?.benefits.manaPoints).toBe(2);
			expect(level4?.benefits.manaPoints).toBe(2);
		});

		it('should grant total of 9 MP across all 4 levels', () => {
			expect(spellcasterPath).toBeDefined();
			const totalMP = spellcasterPath!.progression.reduce(
				(sum, level) => sum + (level.benefits.manaPoints || 0),
				0
			);
			expect(totalMP).toBe(9); // 3 + 2 + 2 + 2
		});

		it('should grant cantrips at levels 1, 2, 3', () => {
			expect(spellcasterPath).toBeDefined();
			const level1 = spellcasterPath!.progression.find((p) => p.pathLevel === 1);
			const level2 = spellcasterPath!.progression.find((p) => p.pathLevel === 2);
			const level3 = spellcasterPath!.progression.find((p) => p.pathLevel === 3);
			const level4 = spellcasterPath!.progression.find((p) => p.pathLevel === 4);

			expect(level1?.benefits.cantripsLearned).toBe(1);
			expect(level2?.benefits.cantripsLearned).toBe(1);
			expect(level3?.benefits.cantripsLearned).toBe(1);
			expect(level4?.benefits.cantripsLearned).toBeUndefined();
		});

		it('should grant spells at levels 1, 3, 4', () => {
			expect(spellcasterPath).toBeDefined();
			const level1 = spellcasterPath!.progression.find((p) => p.pathLevel === 1);
			const level2 = spellcasterPath!.progression.find((p) => p.pathLevel === 2);
			const level3 = spellcasterPath!.progression.find((p) => p.pathLevel === 3);
			const level4 = spellcasterPath!.progression.find((p) => p.pathLevel === 4);

			expect(level1?.benefits.spellsLearned).toBe(1);
			expect(level2?.benefits.spellsLearned).toBeUndefined();
			expect(level3?.benefits.spellsLearned).toBe(1);
			expect(level4?.benefits.spellsLearned).toBe(1);
		});

		it('should have special rule about Spell List choice', () => {
			expect(spellcasterPath).toBeDefined();
			expect(spellcasterPath!.specialRules).toBeDefined();
			expect(spellcasterPath!.specialRules!.length).toBeGreaterThan(0);

			// Rule should mention gaining a Spell List
			const rule = spellcasterPath!.specialRules![0];
			expect(rule.toLowerCase()).toContain('spell list');
			expect(rule).toContain('first invest');
		});
	});
});
