/**
 * Monster Calculator Tests (TDD)
 *
 * Tests for the monster stat calculation system.
 * Following the calculation order from MONSTER_SYSTEM_SPEC.MD:
 *
 * 1. Lookup base stats for level
 * 2. Apply role HP modifier (multiply)
 * 3. Apply tier HP multiplier (multiply)
 * 4. Round HP to nearest integer
 * 5. Apply role PD/AD offsets (add)
 * 6. Copy Attack, Save DC, Base Damage from table
 * 7. Calculate Feature Power budget from table
 * 8. Calculate Encounter Cost = Level × Tier Multiplier
 */

import { describe, it, expect } from 'vitest';
import {
	calculateMonsterStats,
	validateMonsterActions,
	validateFeatureBudget,
	createDefaultMonster,
	type MonsterCalculationInput,
	type MonsterCalculationResult,
} from './monsterCalculator';
import { MONSTER_STATISTICS_TABLE } from '../rulesdata/dm/monsterStatistics';
import { MONSTER_ROLES } from '../rulesdata/dm/monsterRoles';
import type { MonsterAction, MonsterTier, MonsterRoleId } from '../rulesdata/schemas/monster.schema';

describe('Monster Calculator', () => {
	// ========================================================================
	// BASE STATS LOOKUP
	// ========================================================================
	describe('Base Stats Lookup', () => {
		it('should return correct base stats for level 0', () => {
			const input: MonsterCalculationInput = {
				level: 0,
				tier: 'standard',
				roleId: 'controller', // No modifiers
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(8);
			expect(result.finalPD).toBe(11);
			expect(result.finalAD).toBe(11);
			expect(result.finalAttack).toBe(3);
			expect(result.finalSaveDC).toBe(13);
			expect(result.finalBaseDamage).toBe(1);
			expect(result.featurePointsMax).toBe(1);
		});

		it('should return correct base stats for level 4', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(18);
			expect(result.finalPD).toBe(13);
			expect(result.finalAD).toBe(13);
			expect(result.finalAttack).toBe(5);
			expect(result.finalSaveDC).toBe(15);
			expect(result.finalBaseDamage).toBe(3.5);
			expect(result.featurePointsMax).toBe(3);
		});

		it('should return correct base stats for level 10', () => {
			const input: MonsterCalculationInput = {
				level: 10,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(31);
			expect(result.finalPD).toBe(18);
			expect(result.finalAD).toBe(18);
			expect(result.finalAttack).toBe(10);
			expect(result.finalSaveDC).toBe(20);
			expect(result.finalBaseDamage).toBe(8);
			expect(result.featurePointsMax).toBe(6);
		});

		it('should return correct base stats for level -1 (Novice)', () => {
			const input: MonsterCalculationInput = {
				level: -1,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(5);
			expect(result.finalPD).toBe(10);
			expect(result.finalAD).toBe(10);
			expect(result.finalAttack).toBe(2);
			expect(result.finalSaveDC).toBe(12);
			expect(result.finalBaseDamage).toBe(1);
			expect(result.featurePointsMax).toBe(0);
		});

		it('should throw error for invalid level below -1', () => {
			const input: MonsterCalculationInput = {
				level: -2,
				tier: 'standard',
				roleId: 'controller',
			};

			expect(() => calculateMonsterStats(input)).toThrow();
		});

		it('should throw error for invalid level above 10', () => {
			const input: MonsterCalculationInput = {
				level: 11,
				tier: 'standard',
				roleId: 'controller',
			};

			expect(() => calculateMonsterStats(input)).toThrow();
		});

		it('should match all levels in statistics table', () => {
			for (const stats of MONSTER_STATISTICS_TABLE) {
				const input: MonsterCalculationInput = {
					level: stats.level,
					tier: 'standard',
					roleId: 'controller', // No modifiers
				};

				const result = calculateMonsterStats(input);

				expect(result.finalHP).toBe(stats.hp);
				expect(result.finalPD).toBe(stats.pd);
				expect(result.finalAD).toBe(stats.ad);
				expect(result.finalAttack).toBe(stats.attack);
				expect(result.finalSaveDC).toBe(stats.saveDC);
				expect(result.finalBaseDamage).toBe(stats.baseDamage);
				expect(result.featurePointsMax).toBe(stats.featurePower);
			}
		});
	});

	// ========================================================================
	// ROLE MODIFIERS
	// ========================================================================
	describe('Role Modifiers', () => {
		it('should apply Brute HP modifier (+25%)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'brute',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 1.25 = 22.5, rounded = 23
			expect(result.finalHP).toBe(23);
		});

		it('should apply Brute defense offsets (PD -2, AD +2)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'brute',
			};

			const result = calculateMonsterStats(input);

			// Base PD 13 - 2 = 11, Base AD 13 + 2 = 15
			expect(result.finalPD).toBe(11);
			expect(result.finalAD).toBe(15);
		});

		it('should apply Lurker HP modifier (-20%)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'lurker',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 0.8 = 14.4, rounded = 14
			expect(result.finalHP).toBe(14);
		});

		it('should apply Lurker defense offsets (PD +3, AD -3)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'lurker',
			};

			const result = calculateMonsterStats(input);

			// Base PD 13 + 3 = 16, Base AD 13 - 3 = 10
			expect(result.finalPD).toBe(16);
			expect(result.finalAD).toBe(10);
		});

		it('should apply Defender modifiers (+10% HP, +2 PD, +2 AD)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'defender',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 1.1 = 19.8, rounded = 20
			expect(result.finalHP).toBe(20);
			// Base PD 13 + 2 = 15, Base AD 13 + 2 = 15
			expect(result.finalPD).toBe(15);
			expect(result.finalAD).toBe(15);
		});

		it('should apply Support modifiers (-15% HP, -2 PD, -2 AD)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'support',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 0.85 = 15.3, rounded = 15
			expect(result.finalHP).toBe(15);
			// Base PD 13 - 2 = 11, Base AD 13 - 2 = 11
			expect(result.finalPD).toBe(11);
			expect(result.finalAD).toBe(11);
		});

		it('should apply Artillerist modifiers (-10% HP, +2 PD, -2 AD)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'artillerist',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 0.9 = 16.2, rounded = 16
			expect(result.finalHP).toBe(16);
			// Base PD 13 + 2 = 15, Base AD 13 - 2 = 11
			expect(result.finalPD).toBe(15);
			expect(result.finalAD).toBe(11);
		});

		it('should apply Skirmisher modifiers (0% HP, +1 PD, +1 AD)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'skirmisher',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 1.0 = 18
			expect(result.finalHP).toBe(18);
			// Base PD 13 + 1 = 14, Base AD 13 + 1 = 14
			expect(result.finalPD).toBe(14);
			expect(result.finalAD).toBe(14);
		});

		it('should not modify Attack, Save DC, or Base Damage for any role', () => {
			const roles: MonsterRoleId[] = ['brute', 'lurker', 'defender', 'support', 'artillerist', 'skirmisher', 'controller', 'leader'];

			for (const roleId of roles) {
				const input: MonsterCalculationInput = {
					level: 4,
					tier: 'standard',
					roleId,
				};

				const result = calculateMonsterStats(input);

				expect(result.finalAttack).toBe(5);
				expect(result.finalSaveDC).toBe(15);
				expect(result.finalBaseDamage).toBe(3.5);
			}
		});

		it('should include role information in breakdowns', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'brute',
			};

			const result = calculateMonsterStats(input);

			expect(result.breakdowns.hp.modifiers).toContainEqual(
				expect.objectContaining({ source: 'Brute role', value: expect.any(Number) })
			);
		});
	});

	// ========================================================================
	// TIER MULTIPLIERS
	// ========================================================================
	describe('Tier Multipliers', () => {
		it('should apply Standard tier (1× HP)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(18);
		});

		it('should apply Apex tier (2× HP)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'apex',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 2 = 36
			expect(result.finalHP).toBe(36);
		});

		it('should apply Legendary tier (4× HP)', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'legendary',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Base HP 18 × 4 = 72
			expect(result.finalHP).toBe(72);
		});

		it('should combine role and tier HP modifiers correctly', () => {
			// Example from spec: Level 4 Brute Apex
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'apex',
				roleId: 'brute',
			};

			const result = calculateMonsterStats(input);

			// Base HP: 18
			// Role (Brute): HP × 1.25 = 22.5
			// Tier (Apex): HP × 2 = 45
			expect(result.finalHP).toBe(45);
			// PD: 13 - 2 = 11
			expect(result.finalPD).toBe(11);
			// AD: 13 + 2 = 15
			expect(result.finalAD).toBe(15);
		});

		it('should calculate correct encounter cost for Standard tier', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Level 4 × 1 = 4
			expect(result.encounterCost).toBe(4);
		});

		it('should calculate correct encounter cost for Apex tier', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'apex',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Level 4 × 2 = 8
			expect(result.encounterCost).toBe(8);
		});

		it('should calculate correct encounter cost for Legendary tier', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'legendary',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Level 4 × 4 = 16
			expect(result.encounterCost).toBe(16);
		});

		it('should not modify defenses for tier', () => {
			const tiers: MonsterTier[] = ['standard', 'apex', 'legendary'];

			for (const tier of tiers) {
				const input: MonsterCalculationInput = {
					level: 4,
					tier,
					roleId: 'controller',
				};

				const result = calculateMonsterStats(input);

				// Controller has no defense modifiers
				expect(result.finalPD).toBe(13);
				expect(result.finalAD).toBe(13);
			}
		});

		it('should include tier information in breakdowns', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'apex',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			expect(result.breakdowns.hp.modifiers).toContainEqual(
				expect.objectContaining({ source: 'Apex tier', value: expect.any(Number) })
			);
		});
	});

	// ========================================================================
	// FEATURE BUDGET VALIDATION
	// ========================================================================
	describe('Feature Budget Validation', () => {
		it('should validate features within budget', () => {
			const result = validateFeatureBudget(
				['feat_d4e5f678-1234-4abc-9def-012345678901'], // 1-point feature
				3 // max points
			);

			expect(result.valid).toBe(true);
			expect(result.spent).toBe(1);
			expect(result.remaining).toBe(2);
			expect(result.overBy).toBe(0);
		});

		it('should validate features at exact budget', () => {
			const result = validateFeatureBudget(
				[
					'feat_d4e5f678-1234-4abc-9def-012345678901', // 1-point
					'feat_c9d0e1f2-def0-4678-9abc-345678cdefab', // 2-point
				],
				3
			);

			expect(result.valid).toBe(true);
			expect(result.spent).toBe(3);
			expect(result.remaining).toBe(0);
		});

		it('should invalidate features over budget', () => {
			const result = validateFeatureBudget(
				[
					'feat_f8a9b0c1-6789-4f01-2345-234567fabcde', // 3-point (Spellcaster)
					'feat_c9d0e1f2-def0-4678-9abc-345678cdefab', // 2-point
				],
				3
			);

			expect(result.valid).toBe(false);
			expect(result.spent).toBe(5);
			expect(result.overBy).toBe(2);
		});

		it('should handle empty feature list', () => {
			const result = validateFeatureBudget([], 3);

			expect(result.valid).toBe(true);
			expect(result.spent).toBe(0);
			expect(result.remaining).toBe(3);
		});

		it('should handle zero budget with no features', () => {
			const result = validateFeatureBudget([], 0);

			expect(result.valid).toBe(true);
			expect(result.spent).toBe(0);
		});

		it('should warn for unknown feature IDs but not count them', () => {
			const result = validateFeatureBudget(
				['feat_unknown-uuid-here-0000-000000000000'],
				3
			);

			expect(result.valid).toBe(true);
			expect(result.spent).toBe(0);
		});
	});

	// ========================================================================
	// ACTION VALIDATION
	// ========================================================================
	describe('Action Validation', () => {
		const createValidAction = (overrides?: Partial<MonsterAction>): MonsterAction => ({
			id: 'act_12345678-1234-4abc-9def-012345678901',
			name: 'Claw Attack',
			apCost: 1,
			type: 'martial',
			targetDefense: 'pd',
			damage: 4,
			description: 'A slashing claw attack.',
			...overrides,
		});

		it('should validate action with normal damage', () => {
			const result = validateMonsterActions([createValidAction()], 3.5);

			expect(result.valid).toBe(true);
			expect(result.errors).toHaveLength(0);
			expect(result.warnings).toHaveLength(0);
		});

		it('should warn when damage exceeds 1.5× base damage', () => {
			const action = createValidAction({ damage: 6 }); // > 3.5 × 1.5 = 5.25
			const result = validateMonsterActions([action], 3.5);

			expect(result.valid).toBe(true);
			expect(result.warnings).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('exceeds recommended maximum'),
				})
			);
		});

		it('should info when damage is less than 0.5× base damage', () => {
			const action = createValidAction({ damage: 1 }); // < 3.5 × 0.5 = 1.75
			const result = validateMonsterActions([action], 3.5);

			expect(result.valid).toBe(true);
			expect(result.infos).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('below recommended minimum'),
				})
			);
		});

		it('should validate AP cost between 1 and 4', () => {
			const validActions = [1, 2, 3, 4].map((apCost) => createValidAction({ apCost }));
			
			for (const action of validActions) {
				const result = validateMonsterActions([action], 3.5);
				expect(result.valid).toBe(true);
				expect(result.errors).toHaveLength(0);
			}
		});

		it('should error on AP cost below 1', () => {
			const action = createValidAction({ apCost: 0 });
			const result = validateMonsterActions([action], 3.5);

			expect(result.errors).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('AP cost'),
				})
			);
		});

		it('should error on AP cost above 4', () => {
			const action = createValidAction({ apCost: 5 });
			const result = validateMonsterActions([action], 3.5);

			expect(result.errors).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('AP cost'),
				})
			);
		});

		it('should error when no actions provided', () => {
			const result = validateMonsterActions([], 3.5);

			expect(result.valid).toBe(false);
			expect(result.errors).toContainEqual(
				expect.objectContaining({
					message: expect.stringContaining('least one action'),
				})
			);
		});

		it('should validate multiple actions independently', () => {
			const actions = [
				createValidAction({ id: 'act_11111111-1111-4111-8111-111111111111', damage: 3 }),
				createValidAction({ id: 'act_22222222-2222-4222-8222-222222222222', damage: 6 }), // High damage
			];

			const result = validateMonsterActions(actions, 3.5);

			expect(result.valid).toBe(true);
			expect(result.warnings).toHaveLength(1);
			expect(result.warnings[0].actionId).toBe('act_22222222-2222-4222-8222-222222222222');
		});

		it('should validate action name length', () => {
			const action = createValidAction({ name: '' });
			const result = validateMonsterActions([action], 3.5);

			expect(result.errors).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('name'),
				})
			);
		});

		it('should validate action name max length', () => {
			const action = createValidAction({ name: 'A'.repeat(51) });
			const result = validateMonsterActions([action], 3.5);

			expect(result.errors).toContainEqual(
				expect.objectContaining({
					actionId: action.id,
					message: expect.stringContaining('50 characters'),
				})
			);
		});
	});

	// ========================================================================
	// BREAKDOWNS
	// ========================================================================
	describe('Calculation Breakdowns', () => {
		it('should provide HP breakdown with base, role, and tier', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'apex',
				roleId: 'brute',
			};

			const result = calculateMonsterStats(input);

			expect(result.breakdowns.hp.base).toBe(18);
			expect(result.breakdowns.hp.total).toBe(45);
			expect(result.breakdowns.hp.modifiers.length).toBeGreaterThan(0);
		});

		it('should provide PD breakdown with base and role offset', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'lurker',
			};

			const result = calculateMonsterStats(input);

			expect(result.breakdowns.pd.base).toBe(13);
			expect(result.breakdowns.pd.total).toBe(16);
			expect(result.breakdowns.pd.modifiers).toContainEqual(
				expect.objectContaining({ source: 'Lurker role', value: 3 })
			);
		});

		it('should provide AD breakdown with base and role offset', () => {
			const input: MonsterCalculationInput = {
				level: 4,
				tier: 'standard',
				roleId: 'lurker',
			};

			const result = calculateMonsterStats(input);

			expect(result.breakdowns.ad.base).toBe(13);
			expect(result.breakdowns.ad.total).toBe(10);
			expect(result.breakdowns.ad.modifiers).toContainEqual(
				expect.objectContaining({ source: 'Lurker role', value: -3 })
			);
		});
	});

	// ========================================================================
	// DEFAULT MONSTER CREATION
	// ========================================================================
	describe('Default Monster Creation', () => {
		it('should create a valid default monster', () => {
			const monster = createDefaultMonster();

			expect(monster.id).toMatch(/^mon_[a-f0-9-]+$/);
			expect(monster.name).toBe('New Monster');
			expect(monster.level).toBe(1);
			expect(monster.tier).toBe('standard');
			expect(monster.roleId).toBe('controller');
			expect(monster.actions.length).toBeGreaterThan(0);
			expect(monster.visibility).toBe('private');
			expect(monster.approvalStatus).toBe('draft');
			expect(monster.schemaVersion).toBeDefined();
		});

		it('should allow overriding default values', () => {
			const monster = createDefaultMonster({
				name: 'Goblin',
				level: 2,
				tier: 'apex',
				roleId: 'lurker',
			});

			expect(monster.name).toBe('Goblin');
			expect(monster.level).toBe(2);
			expect(monster.tier).toBe('apex');
			expect(monster.roleId).toBe('lurker');
		});

		it('should calculate stats correctly for default monster', () => {
			const monster = createDefaultMonster();

			// Level 1 Controller Standard
			expect(monster.finalHP).toBe(10);
			expect(monster.finalPD).toBe(12);
			expect(monster.finalAD).toBe(12);
		});
	});

	// ========================================================================
	// EDGE CASES
	// ========================================================================
	describe('Edge Cases', () => {
		it('should handle level -1 with Lurker role (minimum HP)', () => {
			const input: MonsterCalculationInput = {
				level: -1,
				tier: 'standard',
				roleId: 'lurker', // -20% HP
			};

			const result = calculateMonsterStats(input);

			// Base HP 5 × 0.8 = 4
			expect(result.finalHP).toBe(4);
			// Ensure HP is at least 1
			expect(result.finalHP).toBeGreaterThanOrEqual(1);
		});

		it('should handle level 10 Legendary Defender (maximum stats)', () => {
			const input: MonsterCalculationInput = {
				level: 10,
				tier: 'legendary',
				roleId: 'defender',
			};

			const result = calculateMonsterStats(input);

			// Base HP 31 × 1.1 × 4 = 136.4, rounded = 136
			expect(result.finalHP).toBe(136);
			// PD 18 + 2 = 20, AD 18 + 2 = 20
			expect(result.finalPD).toBe(20);
			expect(result.finalAD).toBe(20);
			// Encounter cost: 10 × 4 = 40
			expect(result.encounterCost).toBe(40);
		});

		it('should round HP correctly (0.5 rounds up)', () => {
			// Level 1 Support: 10 × 0.85 = 8.5, should round to 9
			const input: MonsterCalculationInput = {
				level: 1,
				tier: 'standard',
				roleId: 'support',
			};

			const result = calculateMonsterStats(input);

			expect(result.finalHP).toBe(9);
		});

		it('should handle encounter cost for level 0', () => {
			const input: MonsterCalculationInput = {
				level: 0,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Level 0 × 1 = 0 (or maybe minimum 1?)
			// Based on spec, it should be 0
			expect(result.encounterCost).toBe(0);
		});

		it('should handle encounter cost for level -1', () => {
			const input: MonsterCalculationInput = {
				level: -1,
				tier: 'standard',
				roleId: 'controller',
			};

			const result = calculateMonsterStats(input);

			// Level -1 should have encounter cost of 0 (or possibly -1)
			// Likely minimum of 0
			expect(result.encounterCost).toBeLessThanOrEqual(0);
		});

		it('should handle all role + tier combinations without error', () => {
			const roles: MonsterRoleId[] = ['artillerist', 'brute', 'controller', 'defender', 'leader', 'lurker', 'skirmisher', 'support'];
			const tiers: MonsterTier[] = ['standard', 'apex', 'legendary'];
			const levels = [-1, 0, 1, 5, 10];

			for (const roleId of roles) {
				for (const tier of tiers) {
					for (const level of levels) {
						const input: MonsterCalculationInput = { level, tier, roleId };
						expect(() => calculateMonsterStats(input)).not.toThrow();
					}
				}
			}
		});
	});
});
