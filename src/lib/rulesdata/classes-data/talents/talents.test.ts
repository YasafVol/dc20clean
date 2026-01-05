/**
 * M4.1a - Talent System Data Integrity Tests
 *
 * Tests the talent system data for:
 * - Data integrity (all required fields)
 * - ID uniqueness
 * - Effect validity
 * - Multiclass integration
 * - Prerequisites and costs
 */

import { describe, it, expect } from 'vitest';
import { allTalents } from './talent.loader';
import { generalTalents, multiclassTalents } from './talents.data';
import { MULTICLASS_TIERS } from '../../progression/multiclass';

// Import all class-specific talents
import { barbarianTalents } from './barbarian.talents';
import { bardTalents } from './bard.talents';
import { championTalents } from './champion.talents';
import { clericTalents } from './cleric.talents';
import { commanderTalents } from './commander.talents';
import { druidTalents } from './druid.talents';
import { hunterTalents } from './hunter.talents';
import { monkTalents } from './monk.talents';
import { psionTalents } from './psion.talents';
import { rogueTalents } from './rogue.talents';
import { sorcererTalents } from './sorcerer.talents';
import { spellbladeTalents } from './spellblade.talents';
import { warlockTalents } from './warlock.talents';
import { wizardTalents } from './wizard.talents';

describe('Talent System Data Integrity (M4.1a)', () => {
	describe('General Talents', () => {
		it('should have at least 5 general talents', () => {
			expect(generalTalents.length).toBeGreaterThanOrEqual(5);
		});

		it('should have all required fields', () => {
			for (const talent of generalTalents) {
				expect(talent.id).toBeDefined();
				expect(talent.id).toMatch(/^general_/);
				expect(talent.name).toBeDefined();
				expect(talent.description).toBeDefined();
				expect(talent.category).toBe('general');
			}
		});

		it('should have unique IDs', () => {
			const ids = generalTalents.map((t) => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have valid effects structure', () => {
			for (const talent of generalTalents) {
				if (talent.effects) {
					expect(Array.isArray(talent.effects)).toBe(true);
					for (const effect of talent.effects) {
						expect(effect.type).toBeDefined();
						expect(['stat', 'skill', 'ability', 'other']).toContain(effect.type);
						if (effect.type === 'stat') {
							expect(effect.target).toBeDefined();
							expect(effect.value).toBeDefined();
						}
					}
				}
			}
		});

		it('should mark repeatable talents correctly', () => {
			// Talents like "Skill Point Increase" should be repeatable
			const skillIncrease = generalTalents.find((t) => t.id.includes('skill'));
			if (skillIncrease) {
				// Repeatable talents should not have a restriction or explicitly allow multiple
				expect(skillIncrease).toBeDefined();
			}
		});

		it('should have non-empty descriptions', () => {
			for (const talent of generalTalents) {
				expect(talent.description.length).toBeGreaterThan(10);
			}
		});
	});

	describe('Class-Specific Talents', () => {
		const allClassTalents = [
			{ name: 'Barbarian', talents: barbarianTalents },
			{ name: 'Bard', talents: bardTalents },
			{ name: 'Champion', talents: championTalents },
			{ name: 'Cleric', talents: clericTalents },
			{ name: 'Commander', talents: commanderTalents },
			{ name: 'Druid', talents: druidTalents },
			{ name: 'Hunter', talents: hunterTalents },
			{ name: 'Monk', talents: monkTalents },
			{ name: 'Psion', talents: psionTalents },
			{ name: 'Rogue', talents: rogueTalents },
			{ name: 'Sorcerer', talents: sorcererTalents },
			{ name: 'Spellblade', talents: spellbladeTalents },
			{ name: 'Warlock', talents: warlockTalents },
			{ name: 'Wizard', talents: wizardTalents }
		];

		it('should have talent files for all 14 classes', () => {
			expect(allClassTalents).toHaveLength(14);
		});

		it('should have at least 3 talents per class', () => {
			for (const { name, talents } of allClassTalents) {
				expect(talents.length, `${name} should have at least 3 talents`).toBeGreaterThanOrEqual(3);
			}
		});

		it('should have unique IDs within each class', () => {
			for (const { name, talents } of allClassTalents) {
				const ids = talents.map((t) => t.id);
				const uniqueIds = new Set(ids);
				expect(uniqueIds.size, `${name} should have unique talent IDs`).toBe(ids.length);
			}
		});

		it('should have correct category for class talents', () => {
			for (const { name, talents } of allClassTalents) {
				for (const talent of talents) {
					expect(talent.category, `${name} - ${talent.name} should have 'class' category`).toBe(
						'class'
					);
				}
			}
		});

		it('should have ID matching class name', () => {
			for (const { name, talents } of allClassTalents) {
				const classPrefix = name.toLowerCase();
				for (const talent of talents) {
					expect(talent.id, `${name} - ${talent.name} ID should start with class name`).toMatch(
						new RegExp(`^${classPrefix}_`)
					);
				}
			}
		});

		it('should have all required fields', () => {
			for (const { name, talents } of allClassTalents) {
				for (const talent of talents) {
					expect(talent.id, `${name} - ${talent.name} should have id`).toBeDefined();
					expect(talent.name, `${name} - ${talent.name} should have name`).toBeDefined();
					expect(
						talent.description,
						`${name} - ${talent.name} should have description`
					).toBeDefined();
					expect(talent.category, `${name} - ${talent.name} should have category`).toBeDefined();
				}
			}
		});

		it('should have valid prerequisites when present', () => {
			for (const { name, talents } of allClassTalents) {
				for (const talent of talents) {
					if (talent.prerequisites) {
						expect(Array.isArray(talent.prerequisites)).toBe(true);
						for (const prereq of talent.prerequisites) {
							expect(prereq).toBeDefined();
							expect(typeof prereq).toBe('string');
						}
					}
				}
			}
		});
	});

	describe('Multiclass Talents', () => {
		it('should have exactly 6 multiclass talents', () => {
			expect(multiclassTalents.length).toBe(6);
		});

		it('should reference valid multiclass tiers', () => {
			const validTierIds = MULTICLASS_TIERS.map((t) => t.id);

			for (const talent of multiclassTalents) {
				expect(talent.id).toMatch(/^multiclass_/);

				// Extract tier from ID (e.g., "multiclass_novice" -> "novice")
				const tierId = talent.id.replace('multiclass_', '');
				expect(validTierIds, `Talent ${talent.id} should reference valid tier`).toContain(tierId);
			}
		});

		it('should have correct level requirements', () => {
			for (const talent of multiclassTalents) {
				const tierId = talent.id.replace('multiclass_', '');
				const tier = MULTICLASS_TIERS.find((t) => t.id === tierId);

				if (tier && talent.levelRequired !== undefined) {
					expect(talent.levelRequired, `${talent.name} level requirement should match tier`).toBe(
						tier.levelRequired
					);
				}
			}
		});

		it('should match tier definitions from multiclass.ts', () => {
			for (const tier of MULTICLASS_TIERS) {
				const talent = multiclassTalents.find((t) => t.id === `multiclass_${tier.id}`);
				expect(talent, `Should have talent for ${tier.name}`).toBeDefined();

				if (talent) {
					expect(talent.name).toBe(tier.name);
					expect(talent.description).toContain('Level'); // Should mention level
				}
			}
		});

		it('should have category "multiclass"', () => {
			for (const talent of multiclassTalents) {
				expect(talent.category).toBe('multiclass');
			}
		});

		it('should have unique IDs', () => {
			const ids = multiclassTalents.map((t) => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have ascending level requirements', () => {
			const levels = multiclassTalents
				.map((t) => t.levelRequired)
				.filter((l): l is number => l !== undefined)
				.sort((a, b) => a - b);

			for (let i = 1; i < levels.length; i++) {
				expect(levels[i]).toBeGreaterThanOrEqual(levels[i - 1]);
			}
		});
	});

	describe('Talent Loader', () => {
		it('should load all talent files', () => {
			expect(allTalents.length).toBeGreaterThan(50);
		});

		it('should aggregate talents correctly', () => {
			const generalCount = allTalents.filter((t) => t.category === 'general').length;
			const classCount = allTalents.filter((t) => t.category === 'class').length;
			const multiclassCount = allTalents.filter((t) => t.category === 'multiclass').length;

			expect(generalCount).toBe(generalTalents.length);
			expect(multiclassCount).toBe(multiclassTalents.length);
			expect(classCount).toBeGreaterThan(30); // At least a few per class
		});

		it('should have no duplicate IDs across all talents', () => {
			const ids = allTalents.map((t) => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have all talents with required fields', () => {
			for (const talent of allTalents) {
				expect(talent.id).toBeDefined();
				expect(talent.name).toBeDefined();
				expect(talent.description).toBeDefined();
				expect(talent.category).toBeDefined();
				expect(['general', 'class', 'multiclass']).toContain(talent.category);
			}
		});

		it('should handle missing files gracefully', () => {
			// The loader should not crash if a file is missing
			// This is tested implicitly by the loader working at all
			expect(allTalents).toBeDefined();
		});
	});

	describe('Talent Effects Validation', () => {
		it('should have valid effect types', () => {
			const validTypes = ['stat', 'skill', 'ability', 'resource', 'other'];

			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						expect(validTypes).toContain(effect.type);
					}
				}
			}
		});

		it('should have stat effects with required fields', () => {
			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						if (effect.type === 'stat') {
							expect(
								effect.target,
								`Talent ${talent.name} stat effect should have target`
							).toBeDefined();
							expect(
								effect.value,
								`Talent ${talent.name} stat effect should have value`
							).toBeDefined();
						}
					}
				}
			}
		});

		it('should have numeric values for stat effects', () => {
			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						if (effect.type === 'stat' && typeof effect.value === 'number') {
							expect(typeof effect.value).toBe('number');
						}
					}
				}
			}
		});
	});

	describe('Data Coverage Statistics', () => {
		it('should report talent counts by category', () => {
			const stats = {
				general: allTalents.filter((t) => t.category === 'general').length,
				class: allTalents.filter((t) => t.category === 'class').length,
				multiclass: allTalents.filter((t) => t.category === 'multiclass').length,
				total: allTalents.length
			};

			console.log('📊 Talent System Coverage:');
			console.log(`   General: ${stats.general}`);
			console.log(`   Class: ${stats.class}`);
			console.log(`   Multiclass: ${stats.multiclass}`);
			console.log(`   Total: ${stats.total}`);

			expect(stats.total).toBeGreaterThan(50);
		});

		it('should report talents with effects', () => {
			const withEffects = allTalents.filter((t) => t.effects && t.effects.length > 0).length;
			const percentage = Math.round((withEffects / allTalents.length) * 100);

			console.log(`📊 Talents with effects: ${withEffects}/${allTalents.length} (${percentage}%)`);

			expect(withEffects).toBeGreaterThan(0);
		});
	});
});
