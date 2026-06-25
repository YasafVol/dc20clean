/**
 * Unit tests for Class Progression Resolver (UT-2)
 *
 * Tests the resolveClassProgression function and helper functions
 */

import { describe, it, expect } from 'vitest';
import {
	resolveClassProgression,
	getAvailableSubclasses,
	resolveSubclassFeatures
} from './classProgressionResolver';
import { CLASS_PROGRESSION_DEFINITIONS } from './progressions/classProgressionDefinitions';
import { classesData } from '../loaders/class.loader';
import type { ClassFeature, Effect } from '../schemas/character.schema';

const martialClassIds = ['barbarian', 'champion', 'commander', 'hunter', 'monk', 'rogue'];
const casterClassIds = ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'];
const hybridClassIds = ['spellblade'];
const v0105ClassIds = [...martialClassIds, ...casterClassIds, ...hybridClassIds];
const v0105ExpertFeatureNames: Record<string, string> = {
	barbarian: 'Expert Barbarian',
	bard: 'Expert Bard',
	champion: 'Expert Champion',
	cleric: 'Expert Cleric',
	commander: 'Expert Commander',
	druid: 'Expert Druid',
	hunter: 'Expert Hunter',
	monk: 'Expert Monk',
	rogue: 'Expert Rogue',
	sorcerer: 'Expert Sorcerer',
	spellblade: 'Expert Spellblade',
	warlock: 'Expert Warlock',
	wizard: 'Expert Wizard'
};
const v0105ExpertFeatureEffects: Record<string, Partial<Effect>[]> = {
	bard: [
		{ type: 'MODIFY_STAT', target: 'skillPoints', value: 2 },
		{ type: 'GRANT_SPELL', target: 'any_spell_list', value: 2 }
	],
	champion: [{ type: 'GRANT_MANEUVERS', target: 'any_maneuver', value: 2 }],
	monk: [
		{ type: 'MODIFY_STAT', target: 'moveSpeed', value: 1 },
		{ type: 'MODIFY_STAT', target: 'jumpDistance', value: 1 }
	],
	rogue: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 1 }],
	sorcerer: [{ type: 'MODIFY_STAT', target: 'mpMax', value: 1 }],
	warlock: [{ type: 'MODIFY_STAT', target: 'hpMax', value: 2 }],
	wizard: [{ type: 'GRANT_SPELL', target: 'chosen_school', value: 1 }]
};
const v0105CombatTrainingTargets: Record<string, string[]> = {
	barbarian: ['All_Armor', 'All_Shields', 'Weapons'],
	bard: ['Light_Armor', 'Light_Shields', 'Spell_Focuses'],
	champion: ['All_Armor', 'All_Shields', 'Weapons'],
	cleric: [
		'Heavy_Armor',
		'Heavy_Shields',
		'Light_Armor',
		'Light_Shields',
		'Spell_Focuses',
		'Weapons'
	],
	commander: ['All_Armor', 'All_Shields', 'Weapons'],
	druid: ['Light_Armor', 'Spell_Focuses'],
	hunter: ['Light_Armor', 'Light_Shields', 'Weapons'],
	monk: ['Light_Armor', 'Weapons'],
	rogue: ['Light_Armor', 'Light_Shields', 'Weapons'],
	sorcerer: ['Light_Armor', 'Spell_Focuses'],
	spellblade: [
		'Heavy_Armor',
		'Heavy_Shields',
		'Light_Armor',
		'Light_Shields',
		'Spell_Focuses',
		'Weapons'
	],
	warlock: ['Light_Armor', 'Spell_Focuses'],
	wizard: ['Light_Armor', 'Spell_Focuses']
};

function getLevelData(classId: string, level: number) {
	const classData = classesData.find((entry) => entry.id === classId);
	if (!classData) throw new Error(`Missing class data for ${classId}`);
	const levelData = classData.levelProgression.find((entry) => entry.level === level);
	if (!levelData) throw new Error(`Missing level ${level} data for ${classId}`);
	return levelData;
}

function getAllFeatureEffects(feature: ClassFeature): Effect[] {
	return [
		...(feature.effects ?? []),
		...(feature.benefits ?? []).flatMap((benefit) => benefit.effects ?? []),
		...(feature.choices ?? []).flatMap((choice) =>
			(choice.options ?? []).flatMap((option) => option.effects ?? [])
		)
	];
}

function getProgressionFeatureIds(classId: string): string[] {
	const classData = classesData.find((entry) => entry.id === classId);
	if (!classData) throw new Error(`Missing class data for ${classId}`);
	return classData.levelProgression.flatMap((level) => level.gains?.classFeatures ?? []);
}

function getCombatTrainingTargets(features: ClassFeature[]): string[] {
	return Array.from(
		new Set(
			features
				.flatMap(getAllFeatureEffects)
				.filter((effect) => effect.type === 'GRANT_COMBAT_TRAINING')
				.map((effect) => effect.target)
		)
	).sort();
}

describe('Class Progression Resolver (UT-2)', () => {
	describe('resolveClassProgression - Basic Functionality', () => {
		it('should resolve Level 1 Barbarian progression', () => {
			const result = resolveClassProgression('barbarian', 1);

			expect(result.level).toBe(1);
			expect(result.classId).toBe('barbarian');
			expect(result.className).toBe('Barbarian');

			// Should have budgets
			expect(result.budgets).toBeDefined();
			expect(result.budgets.totalHP).toBe(8); // Level 1 HP (DC20 v0.10)
			expect(result.budgets.totalSP).toBe(2); // Level 1 SP
			expect(result.budgets.totalMP).toBe(0); // Martial class

			// Should have unlocked features
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);

			// Check for expected features
			const featureIds = result.unlockedFeatures.map((f) => f.id || f.featureName);
			expect(featureIds).toContain('barbarian_martial_path');
			expect(featureIds).toContain('barbarian_rage');
		});

		it('should resolve Level 2 progression with accumulated budgets', () => {
			const result = resolveClassProgression('barbarian', 2);

			expect(result.level).toBe(2);

			// Budgets should accumulate
			expect(result.budgets.totalHP).toBe(10); // 8 + 2 (DC20 v0.10)
			expect(result.budgets.totalSP).toBe(2); // 2 + 0

			// Should have features from both levels (L1 + L2)
			expect(result.unlockedFeatures.length).toBeGreaterThan(0);

			// Check for L2 features - Battlecry is added at level 2
			const featureNames = result.unlockedFeatures.map((f) => f.featureName);
			expect(featureNames).toContain('Battlecry');

			// Talents are tracked in budgets, not as features
			expect(result.budgets.totalTalents).toBe(1);
		});

		it('should resolve Level 3 progression with subclass choice', () => {
			const result = resolveClassProgression('barbarian', 3);

			expect(result.level).toBe(3);
			expect(result.budgets.totalHP).toBe(12); // 8 + 2 + 2 (DC20 v0.10)

			// Subclass choice should be available
			expect(result.availableSubclassChoice).toBe(true);
			expect(result.subclassChoiceLevel).toBe(3);
		});
	});

	describe('resolveClassProgression - Feature Objects', () => {
		it('should return actual ClassFeature objects', () => {
			const result = resolveClassProgression('barbarian', 1);

			expect(result.unlockedFeatures.length).toBeGreaterThan(0);

			const firstFeature = result.unlockedFeatures[0];

			// Check feature structure
			expect(firstFeature).toHaveProperty('featureName');
			expect(firstFeature).toHaveProperty('levelGained');
			expect(firstFeature).toHaveProperty('description');
			expect(typeof firstFeature.featureName).toBe('string');
			expect(typeof firstFeature.levelGained).toBe('number');
		});

		it('should include feature and benefit effects', () => {
			const result = resolveClassProgression('barbarian', 1);

			// Martial Path stores combat training under benefits so it is not double-counted.
			const martialPath = result.unlockedFeatures.find(
				(f) => f.id === 'barbarian_martial_path' || f.featureName === 'Martial Path'
			);
			const effects = getAllFeatureEffects(martialPath as ClassFeature);

			expect(martialPath).toBeDefined();
			expect(effects.length).toBeGreaterThan(0);
		});

		it('should track pending feature choices', () => {
			const result = resolveClassProgression('barbarian', 1);

			// Some classes have choices at L1 (e.g., Cleric, Wizard)
			expect(result.pendingFeatureChoices).toBeDefined();
			expect(Array.isArray(result.pendingFeatureChoices)).toBe(true);
		});
	});

	describe('resolveClassProgression - Spellcaster Classes', () => {
		it('should resolve Wizard with spell budgets', () => {
			const result = resolveClassProgression('wizard', 1);

			expect(result.budgets.totalMP).toBeGreaterThan(0);
			// Note: Cantrips are not tracked in progression data (only spells)
			expect(result.budgets.totalSpellsKnown).toBeGreaterThan(0);

			// Should have spellcasting path
			const hasSpellcasting = result.unlockedFeatures.some(
				(f) => f.id === 'wizard_spellcasting_path' || f.featureName.includes('Spellcasting')
			);
			expect(hasSpellcasting).toBe(true);
		});

		it('should accumulate spell budgets across levels', () => {
			const l1 = resolveClassProgression('wizard', 1);
			const l3 = resolveClassProgression('wizard', 3);

			expect(l3.budgets.totalMP).toBeGreaterThan(l1.budgets.totalMP);
			expect(l3.budgets.totalSpellsKnown).toBeGreaterThanOrEqual(l1.budgets.totalSpellsKnown);
		});
	});

	describe('resolveClassProgression - Talent & Path Points', () => {
		it('should not grant talents at level 1', () => {
			const result = resolveClassProgression('barbarian', 1);
			expect(result.budgets.totalTalents).toBe(0);
			// Note: pathPoints field is not set in progression data (uses pathProgression: true flag)
			expect(result.budgets.totalPathPoints).toBe(0);
		});

		it('should grant talents and path points at level 2', () => {
			const result = resolveClassProgression('barbarian', 2);
			expect(result.budgets.totalTalents).toBe(1);
			// DC20 v0.10: Path progression at levels 2, 4, 6, 8 (1 point each)
			expect(result.budgets.totalPathPoints).toBe(1);
		});

		it('should accumulate talents across multiple levels', () => {
			const l2 = resolveClassProgression('barbarian', 2);
			const l4 = resolveClassProgression('barbarian', 4);

			expect(l4.budgets.totalTalents).toBeGreaterThan(l2.budgets.totalTalents);
		});

		it('should grant talent budgets from progression, not class feature records', () => {
			for (const classId of v0105ClassIds) {
				const result = resolveClassProgression(classId, 10);
				expect(result.budgets.totalTalents, `${classId} should have four talent points`).toBe(4);
				expect(
					result.unlockedFeatures.some((feature) => feature.featureName === 'Talent'),
					`${classId} should not expose generic Talent as a class feature`
				).toBe(false);
			}
		});
	});

	describe('getAvailableSubclasses', () => {
		it('should return subclasses for Barbarian', () => {
			const subclasses = getAvailableSubclasses('barbarian');

			expect(subclasses.length).toBeGreaterThan(0);
			expect(subclasses[0]).toHaveProperty('name');
			expect(subclasses[0]).toHaveProperty('description');
		});

		it('should return empty array for invalid class', () => {
			const subclasses = getAvailableSubclasses('invalid_class');
			expect(subclasses).toEqual([]);
		});
	});

	describe('resolveSubclassFeatures', () => {
		it('should return subclass features up to level', () => {
			const subclasses = getAvailableSubclasses('barbarian');
			expect(subclasses.length).toBeGreaterThan(0);

			const subclassName = subclasses[0].name;
			const features = resolveSubclassFeatures('barbarian', subclassName, 3);

			expect(features.length).toBeGreaterThan(0);
			// All features should be level 3 or below
			features.forEach((f) => {
				expect(f.levelGained).toBeLessThanOrEqual(3);
			});
		});

		it('should return empty array for invalid subclass', () => {
			const features = resolveSubclassFeatures('barbarian', 'Nonexistent Subclass', 10);
			expect(features).toEqual([]);
		});
	});

	describe('resolveClassProgression - Multiple Classes', () => {
		const classesToTest = ['barbarian', 'cleric', 'wizard', 'rogue', 'monk'];

		classesToTest.forEach((classId) => {
			it(`should resolve ${classId} without errors`, () => {
				expect(() => resolveClassProgression(classId, 1)).not.toThrow();
				expect(() => resolveClassProgression(classId, 2)).not.toThrow();
				expect(() => resolveClassProgression(classId, 3)).not.toThrow();
			});
		});
	});

	describe('Error Handling', () => {
		it('should throw for invalid class ID', () => {
			expect(() => resolveClassProgression('invalid_class', 1)).toThrow();
		});

		it('should throw for level 0', () => {
			// Level must be between 1 and 10
			expect(() => resolveClassProgression('barbarian', 0)).toThrow(
				'Invalid level: 0. Level must be between 1 and 10.'
			);
		});

		it('should throw for levels above 10', () => {
			// Current progression data only goes up to level 10
			expect(() => resolveClassProgression('barbarian', 100)).toThrow(
				'Invalid level: 100. Level must be between 1 and 10.'
			);
		});
	});

	describe('Progression Feature ID Validation (Phase 8c)', () => {
		const allClasses = [
			'barbarian',
			'cleric',
			'wizard',
			'rogue',
			'monk',
			'hunter',
			'champion',
			'sorcerer',
			'warlock',
			'spellblade',
			'bard',
			'druid',
			'commander'
		];

		allClasses.forEach((classId) => {
			it(`should resolve all progression feature IDs to actual features for ${classId}`, () => {
				const result = resolveClassProgression(classId, 10);
				const resolvedFeatureIds = new Set(result.unlockedFeatures.map((feature) => feature.id));
				const missingFeatureIds = getProgressionFeatureIds(classId).filter(
					(featureId) => !resolvedFeatureIds.has(featureId)
				);

				expect(missingFeatureIds).toEqual([]);

				result.unlockedFeatures.forEach((feature) => {
					// Every unlocked feature should have a name (resolved from data)
					expect(feature.featureName).toBeDefined();
					expect(feature.featureName.length).toBeGreaterThan(0);
					// Every feature should have a description (not just an ID)
					expect(feature.description).toBeDefined();
				});
			});

			it(`should have features at key levels for ${classId}`, () => {
				for (const level of [1, 2, 3, 5, 8]) {
					const result = resolveClassProgression(classId, level);
					// Every class should have at least 1 feature at L1
					if (level === 1) {
						expect(result.unlockedFeatures.length).toBeGreaterThan(0);
					}
				}
			});
		});

		for (const [classId, expectedTargets] of Object.entries(v0105CombatTrainingTargets)) {
			it(`${classId} combat training matches the v0.10.5 source`, () => {
				const result = resolveClassProgression(classId, 10);

				expect(getCombatTrainingTargets(result.unlockedFeatures)).toEqual(
					[...expectedTargets].sort()
				);
			});
		}
	});

	describe('Budgets Consistency', () => {
		it('should have consistent budgets between L1 features and progression', () => {
			const result = resolveClassProgression('barbarian', 1);

			// All L1 features should have levelGained === 1
			result.unlockedFeatures.forEach((feature) => {
				expect(feature.levelGained).toBe(1);
			});
		});

		it('should accumulate features without duplicates', () => {
			const result = resolveClassProgression('barbarian', 3);

			const featureIds = result.unlockedFeatures.map((f) => f.id || f.featureName);
			const uniqueIds = new Set(featureIds);

			// No duplicates
			expect(featureIds.length).toBe(uniqueIds.size);
		});
	});

	describe('DC20 v0.10.5 progression table', () => {
		it('defines runtime progression classification for every current class', () => {
			expect(Object.keys(CLASS_PROGRESSION_DEFINITIONS).sort()).toEqual([...v0105ClassIds].sort());
		});

		it('uses full explicit progression tables only for source exceptions', () => {
			const explicitClassIds = Object.entries(CLASS_PROGRESSION_DEFINITIONS)
				.filter(([, definition]) => Boolean(definition.explicitProgression))
				.map(([classId]) => classId)
				.sort();

			expect(explicitClassIds).toEqual(['rogue', 'warlock']);
			expect(CLASS_PROGRESSION_DEFINITIONS.barbarian.category).toBe('fullMartial');
			expect(CLASS_PROGRESSION_DEFINITIONS.wizard.category).toBe('fullCaster');
			expect(CLASS_PROGRESSION_DEFINITIONS.spellblade.category).toBe('hybrid');
		});

		casterClassIds.forEach((classId) => {
			it(`${classId} uses the v0.10.5 caster MP gains`, () => {
				expect(getLevelData(classId, 3).manaPoints).toBe(3);
				expect(getLevelData(classId, 7).manaPoints).toBe(3);
				expect(getLevelData(classId, 10).manaPoints).toBe(3);
				expect(resolveClassProgression(classId, 10).budgets.totalMP).toBe(21);
			});
		});

		it('uses the v0.10.5 hybrid starting and capstone MP gains', () => {
			expect(getLevelData('spellblade', 1).manaPoints).toBe(3);
			expect(getLevelData('spellblade', 10).manaPoints).toBe(2);
			expect(resolveClassProgression('spellblade', 10).budgets.totalMP).toBe(11);
		});

		it('uses Rogue explicit source HP progression instead of the full martial HP table', () => {
			expect(
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => getLevelData('rogue', level).healthPoints)
			).toEqual([8, 1, 2, 1, 2, 1, 2, 1, 2, 1]);
			expect(resolveClassProgression('rogue', 10).budgets.totalHP).toBe(21);
		});

		it('uses Warlock explicit source HP progression instead of the full caster HP table', () => {
			expect(
				[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => getLevelData('warlock', level).healthPoints)
			).toEqual([8, 1, 2, 1, 2, 1, 2, 1, 2, 1]);
			expect(resolveClassProgression('warlock', 10).budgets.totalHP).toBe(21);
		});

		v0105ClassIds.forEach((classId) => {
			it(`${classId} follows the v0.10.5 level 6-10 feature schedule`, () => {
				const level6Gains = getLevelData(classId, 6).gains;
				const level7Gains = getLevelData(classId, 7).gains;
				const level8Gains = getLevelData(classId, 8).gains;
				const level9Gains = getLevelData(classId, 9).gains;
				const level10Gains = getLevelData(classId, 10).gains;

				expect(level6Gains?.talents).toBe(1);
				expect(level6Gains?.pathProgression).toBe(true);
				expect(level6Gains?.subclassFeatureChoice).toBeFalsy();

				expect(level7Gains?.subclassFeatureChoice).toBe(true);
				expect(level7Gains?.talents).toBeFalsy();
				expect(level7Gains?.ancestryPoints).toBeFalsy();
				expect(level7Gains?.pathProgression).toBeFalsy();

				expect(level8Gains?.talents).toBe(1);
				expect(level8Gains?.pathProgression).toBe(true);
				expect(level8Gains?.ancestryPoints).toBe(2);
				expect(level8Gains?.classFeatures).toBeUndefined();

				expect(level9Gains?.classFeatures ?? []).toEqual([]);
				expect(level9Gains?.subclassFeatureChoice).toBeFalsy();

				expect(level10Gains?.subclassFeatureChoice).toBe(true);
				expect(level10Gains?.talents).toBeFalsy();
				expect(level10Gains?.epicBoon).toBeFalsy();
			});

			it(`${classId} surfaces path progression in formatted level rows`, () => {
				expect(getLevelData(classId, 2).features).toContain('Path Progression');
				expect(getLevelData(classId, 6).features).toContain('Path Progression');
				expect(getLevelData(classId, 8).features).toContain('Path Progression');
			});

			it(`${classId} keeps the legacy level 5 feature ID but resolves to the v0.10.5 Expert Feature`, () => {
				const expectedId = `${classId}_level_5_placeholder`;
				const result = resolveClassProgression(classId, 5);
				const expertFeature = result.unlockedFeatures.find((feature) => feature.id === expectedId);

				expect(expertFeature).toBeDefined();
				expect(expertFeature?.featureName).toBe(v0105ExpertFeatureNames[classId]);
				expect(expertFeature?.isFlavor).not.toBe(true);
				expect(expertFeature?.description).not.toMatch(/placeholder/i);
				expect(expertFeature?.description).toMatch(/benefits/i);
				expect(expertFeature?.benefits?.length).toBeGreaterThan(0);
			});

			it(`${classId} does not resolve unpublished level 9 Class Capstone placeholders`, () => {
				const level9Gains = getLevelData(classId, 9).gains;
				const result = resolveClassProgression(classId, 9);

				expect(level9Gains?.classFeatures ?? []).toEqual([]);
				expect(
					result.unlockedFeatures.some((feature) =>
						feature.id?.endsWith('_level_8_capstone_placeholder')
					)
				).toBe(false);
				expect(
					result.unlockedFeatures.some((feature) => /capstone/i.test(feature.featureName))
				).toBe(false);
			});
		});

		for (const [classId, expectedEffects] of Object.entries(v0105ExpertFeatureEffects)) {
			it(`${classId} applies the modeled v0.10.5 Expert Feature effects`, () => {
				const expectedId = `${classId}_level_5_placeholder`;
				const result = resolveClassProgression(classId, 5);
				const expertFeature = result.unlockedFeatures.find((feature) => feature.id === expectedId);
				if (!expertFeature) throw new Error(`Missing Expert Feature for ${classId}`);

				const effects = getAllFeatureEffects(expertFeature);

				for (const expectedEffect of expectedEffects) {
					expect(effects).toContainEqual(expect.objectContaining(expectedEffect));
				}
			});
		}
	});
});
