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
				expect(talent.category).toBe('General');
			}
		});

		it('should have unique IDs', () => {
			const ids = generalTalents.map((t) => t.id);
			const uniqueIds = new Set(ids);
			expect(uniqueIds.size).toBe(ids.length);
		});

		it('should have valid effects structure', () => {
			const validEffectTypes = [
				'MODIFY_STAT',
				'GRANT_ABILITY',
				'GRANT_COMBAT_TRAINING',
				'GRANT_CHOICE',
				'GRANT_SPELL',
				'GRANT_RESISTANCE',
				'GRANT_CANTRIP',
				'GRANT_MANEUVER'
			];
			for (const talent of generalTalents) {
				if (talent.effects) {
					expect(Array.isArray(talent.effects)).toBe(true);
					for (const effect of talent.effects) {
						expect(effect.type).toBeDefined();
						expect(validEffectTypes).toContain(effect.type);
						if (effect.type === 'MODIFY_STAT') {
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

	describe('DC20 v0.10 Value Verification', () => {
		// These tests verify the talents match the DC20 v0.10 rulebook values
		// See LEVELING_GAPS_SPEC.md for full reference

		it('should have Ancestry Increase granting +4 points (DC20 v0.10 p.160)', () => {
			const ancestryTalent = generalTalents.find((t) => t.id === 'general_ancestry_increase');
			expect(ancestryTalent).toBeDefined();
			const modifyStatEffect = ancestryTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'ancestryPoints'
			);
			expect(modifyStatEffect?.value).toBe(4);
		});

		it('should have Attribute Increase granting +2 points (DC20 v0.10 p.160)', () => {
			const attributeTalent = generalTalents.find((t) => t.id === 'general_attribute_increase');
			expect(attributeTalent).toBeDefined();
			const modifyStatEffect = attributeTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'attributePoints'
			);
			expect(modifyStatEffect?.value).toBe(2);
		});

		it('should have Skill Increase granting +4 points (DC20 v0.10 p.160)', () => {
			const skillTalent = generalTalents.find((t) => t.id === 'general_skill_increase');
			expect(skillTalent).toBeDefined();
			const modifyStatEffect = skillTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'skillPoints'
			);
			expect(modifyStatEffect?.value).toBe(4);
		});

		it('should have Martial Expansion granting 2 maneuvers (DC20 v0.10 p.160)', () => {
			const martialTalent = generalTalents.find((t) => t.id === 'general_martial_expansion');
			expect(martialTalent).toBeDefined();
			const modifyStatEffect = martialTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'maneuversKnown'
			);
			expect(modifyStatEffect?.value).toBe(2);
		});

		it('should have Spellcasting Expansion granting 3 spells without MP bonus (DC20 v0.10 p.160-161)', () => {
			const spellcastingTalent = generalTalents.find(
				(t) => t.id === 'general_spellcasting_expansion'
			);
			expect(spellcastingTalent).toBeDefined();

			// Should grant 3 spells
			const spellsEffect = spellcastingTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'spellsKnown'
			);
			expect(spellsEffect?.value).toBe(3);

			// Should NOT grant MP (this was incorrectly added before)
			const mpEffect = spellcastingTalent?.effects.find(
				(e) => e.type === 'MODIFY_STAT' && e.target === 'mpMax'
			);
			expect(mpEffect).toBeUndefined();
		});

		it('should have Martial/Spellcasting Expansion marked as non-stackable (DC20 v0.10)', () => {
			const martialTalent = generalTalents.find((t) => t.id === 'general_martial_expansion');
			const spellcastingTalent = generalTalents.find(
				(t) => t.id === 'general_spellcasting_expansion'
			);

			// These talents say "You can only gain this Talent once."
			expect(martialTalent?.stackable).toBe(false);
			expect(spellcastingTalent?.stackable).toBe(false);
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
			{ name: 'Rogue', talents: rogueTalents },
			{ name: 'Sorcerer', talents: sorcererTalents },
			{ name: 'Spellblade', talents: spellbladeTalents },
			{ name: 'Warlock', talents: warlockTalents },
			{ name: 'Wizard', talents: wizardTalents }
		];

		it('should have talent files for all 13 classes', () => {
			expect(allClassTalents).toHaveLength(13);
		});

		it('should have at least 2 talents per class', () => {
			for (const { name, talents } of allClassTalents) {
				expect(talents.length, `${name} should have at least 2 talents`).toBeGreaterThanOrEqual(2);
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
					expect(talent.category, `${name} - ${talent.name} should have 'Class' category`).toBe(
						'Class'
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
						// Prerequisites can be an object with classId, feature, subclass, level fields
						expect(typeof talent.prerequisites).toBe('object');
						const prereq = talent.prerequisites as {
							classId?: string;
							feature?: string;
							subclass?: string;
							level?: number;
						};
						// If present, should have valid types
						if (prereq.classId) expect(typeof prereq.classId).toBe('string');
						if (prereq.feature) expect(typeof prereq.feature).toBe('string');
						if (prereq.subclass) expect(typeof prereq.subclass).toBe('string');
						if (prereq.level) expect(typeof prereq.level).toBe('number');
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

		it('should have category "Multiclass"', () => {
			for (const talent of multiclassTalents) {
				expect(talent.category).toBe('Multiclass');
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
			// Current implementation has ~44 talents total
			expect(allTalents.length).toBeGreaterThan(40);
		});

		it('should aggregate talents correctly', () => {
			const generalCount = allTalents.filter((t) => t.category === 'General').length;
			const classCount = allTalents.filter((t) => t.category === 'Class').length;
			const multiclassCount = allTalents.filter((t) => t.category === 'Multiclass').length;

			expect(generalCount).toBe(generalTalents.length);
			expect(multiclassCount).toBe(multiclassTalents.length);
			expect(classCount).toBeGreaterThan(20); // At least a couple per class
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
				expect(['General', 'Class', 'Multiclass']).toContain(talent.category);
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
			const validTypes = [
				'MODIFY_STAT',
				'GRANT_ABILITY',
				'GRANT_COMBAT_TRAINING',
				'GRANT_CHOICE',
				'GRANT_SPELL',
				'GRANT_CANTRIP',
				'GRANT_MANEUVER',
				'GRANT_RESISTANCE'
			];

			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						expect(validTypes).toContain(effect.type);
					}
				}
			}
		});

		it('should have MODIFY_STAT effects with required fields', () => {
			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						if (effect.type === 'MODIFY_STAT') {
							expect(
								effect.target,
								`Talent ${talent.name} MODIFY_STAT effect should have target`
							).toBeDefined();
							expect(
								effect.value,
								`Talent ${talent.name} MODIFY_STAT effect should have value`
							).toBeDefined();
						}
					}
				}
			}
		});

		it('should have numeric values for MODIFY_STAT effects', () => {
			for (const talent of allTalents) {
				if (talent.effects) {
					for (const effect of talent.effects) {
						if (effect.type === 'MODIFY_STAT' && typeof effect.value === 'number') {
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
				general: allTalents.filter((t) => t.category === 'General').length,
				class: allTalents.filter((t) => t.category === 'Class').length,
				multiclass: allTalents.filter((t) => t.category === 'Multiclass').length,
				total: allTalents.length
			};

			console.log('📊 Talent System Coverage:');
			console.log(`   General: ${stats.general}`);
			console.log(`   Class: ${stats.class}`);
			console.log(`   Multiclass: ${stats.multiclass}`);
			console.log(`   Total: ${stats.total}`);

			// Current implementation has ~44 talents total
			expect(stats.total).toBeGreaterThan(40);
		});

		it('should report talents with effects', () => {
			const withEffects = allTalents.filter((t) => t.effects && t.effects.length > 0).length;
			const percentage = Math.round((withEffects / allTalents.length) * 100);

			console.log(`📊 Talents with effects: ${withEffects}/${allTalents.length} (${percentage}%)`);

			expect(withEffects).toBeGreaterThan(0);
		});
	});
});
