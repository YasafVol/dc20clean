/**
 * Progression Aggregation Module
 *
 * Aggregates level progression gains, path benefits, and flavor feature
 * auto-grant logic. Extracted from enhancedCharacterCalculator.ts.
 */

import {
	resolveSubclassFeatures
} from '../../rulesdata/classes-data/classProgressionResolver';
import { findClassByName } from '../../rulesdata/loaders/class-features.loader';
import { CHARACTER_PATHS } from '../../rulesdata/progression/paths/paths.data';

/**
 * Cross-path grants returned by aggregatePathBenefits (DC20 v0.10 p.161)
 */
export interface CrossPathGrants {
	/** Spellcaster taking Martial Path gets Spellcaster Stamina Regen */
	grantsSpellcasterStaminaRegen: boolean;
	/** Martial taking Spellcaster Path must choose a Spell List */
	requiresSpellListChoice: boolean;
	/** Combat Training grants from path progression */
	combatTrainingGrants: string[];
}

export interface ProgressionGains {
	totalHP: number;
	totalSP: number;
	totalMP: number;
	totalSkillPoints: number;
	totalTradePoints: number;
	totalAttributePoints: number;
	totalManeuversKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	totalTalents: number;
	totalPathPoints: number;
	totalAncestryPoints: number;
	unlockedFeatureIds: string[];
	pendingSubclassChoices: number;
	crossPathGrants: CrossPathGrants;
}

/**
 * Helper to aggregate path point benefits based on allocations
 */
export function aggregatePathBenefits(
	pathPointAllocations?: {
		martial?: number;
		spellcasting?: number;
	},
	classCategory?: 'martial' | 'spellcaster' | 'hybrid'
): {
	totalSP: number;
	totalMP: number;
	totalManeuversKnown: number;
	totalCantripsKnown: number;
	totalSpellsKnown: number;
	crossPathGrants: CrossPathGrants;
} {
	let totalSP = 0;
	let totalMP = 0;
	let totalManeuversKnown = 0;
	let totalCantripsKnown = 0;
	let totalSpellsKnown = 0;

	const crossPathGrants: CrossPathGrants = {
		grantsSpellcasterStaminaRegen: false,
		requiresSpellListChoice: false,
		combatTrainingGrants: []
	};

	if (!pathPointAllocations) {
		return {
			totalSP,
			totalMP,
			totalManeuversKnown,
			totalCantripsKnown,
			totalSpellsKnown,
			crossPathGrants
		};
	}

	// Martial Path bonuses
	if (pathPointAllocations.martial && pathPointAllocations.martial > 0) {
		const martialPath = CHARACTER_PATHS.find((p) => p.id === 'martial_path');
		if (martialPath) {
			for (let level = 1; level <= pathPointAllocations.martial; level++) {
				const levelData = martialPath.progression.find((p) => p.pathLevel === level);
				if (levelData?.benefits) {
					totalSP += levelData.benefits.staminaPoints || 0;
					totalManeuversKnown += levelData.benefits.maneuversLearned || 0;
				}
			}

			crossPathGrants.combatTrainingGrants.push('Weapons');

			if (classCategory === 'spellcaster') {
				crossPathGrants.grantsSpellcasterStaminaRegen = true;
				console.log('✨ Cross-path grant: Spellcaster Stamina Regen', {
					classCategory,
					martialPoints: pathPointAllocations.martial
				});
			}
		}
	}

	// Spellcaster Path bonuses
	if (pathPointAllocations.spellcasting && pathPointAllocations.spellcasting > 0) {
		const spellcasterPath = CHARACTER_PATHS.find((p) => p.id === 'spellcaster_path');
		if (spellcasterPath) {
			for (let level = 1; level <= pathPointAllocations.spellcasting; level++) {
				const levelData = spellcasterPath.progression.find((p) => p.pathLevel === level);
				if (levelData?.benefits) {
					totalMP += levelData.benefits.manaPoints || 0;
					totalCantripsKnown += levelData.benefits.cantripsLearned || 0;
					totalSpellsKnown += levelData.benefits.spellsLearned || 0;
				}
			}

			crossPathGrants.combatTrainingGrants.push('Spell_Focuses');

			if (classCategory === 'martial') {
				crossPathGrants.requiresSpellListChoice = true;
				console.log('✨ Cross-path grant: Requires Spell List choice', {
					classCategory,
					spellcastingPoints: pathPointAllocations.spellcasting
				});
			}
		}
	}

	return {
		totalSP,
		totalMP,
		totalManeuversKnown,
		totalCantripsKnown,
		totalSpellsKnown,
		crossPathGrants
	};
}

/**
 * Check if a class's Flavor Feature should be auto-granted (DC20 v0.10 p.161)
 * Rule: "Once you gain 2 Class Features from the same Class, you automatically
 * gain that Class's Flavor Feature."
 */
export function checkFlavorFeatureAutoGrant(
	classId: string,
	unlockedFeatureIds: string[],
	multiclassFeatures: Array<{ classId: string; featureId: string }>
): { featureId: string; featureName: string; classId: string } | null {
	const classDefinition = findClassByName(classId);
	if (!classDefinition) return null;

	const classFeatures = (classDefinition as any).coreFeatures.filter((f: any) => !f.isFlavor);

	let featureCount = 0;
	for (const feature of classFeatures) {
		const featureId = (feature as any).id || (feature as any).featureName;
		if (unlockedFeatureIds.includes(featureId)) {
			featureCount++;
		}
	}

	for (const mc of multiclassFeatures) {
		if (mc.classId === classId) {
			const feature = classFeatures.find(
				(f: any) => ((f as any).id || (f as any).featureName) === mc.featureId
			);
			if (feature && !(feature as any).isFlavor) {
				featureCount++;
			}
		}
	}

	console.log('🎭 Flavor Feature check:', {
		classId,
		featureCount,
		threshold: 2,
		qualifies: featureCount >= 2
	});

	if (featureCount >= 2) {
		const flavorFeature = (classDefinition as any).coreFeatures.find((f: any) => f.isFlavor);
		if (flavorFeature) {
			return {
				featureId: flavorFeature.id || flavorFeature.featureName,
				featureName: flavorFeature.featureName,
				classId
			};
		}
	}

	return null;
}

/**
 * Aggregate all progression gains from level 1 to target level
 */
export function aggregateProgressionGains(
	classProgressionData: any,
	targetLevel: number,
	pathPointAllocations?: { martial?: number; spellcasting?: number },
	selectedSubclass?: string,
	classCategory?: 'martial' | 'spellcaster' | 'hybrid'
): ProgressionGains {
	let totalHP = 0;
	let totalSP = 0;
	let totalMP = 0;
	let totalSkillPoints = 0;
	let totalTradePoints = 0;
	let totalAttributePoints = 0;
	let totalManeuversKnown = 0;
	let totalCantripsKnown = 0;
	let totalSpellsKnown = 0;
	let totalTalents = 0;
	let totalPathPoints = 0;
	let totalAncestryPoints = 0;
	const unlockedFeatureIds: string[] = [];
	let pendingSubclassChoices = 0;

	if (!classProgressionData?.levelProgression) {
		return {
			totalHP,
			totalSP,
			totalMP,
			totalSkillPoints,
			totalTradePoints,
			totalAttributePoints,
			totalManeuversKnown,
			totalSpellsKnown,
			totalTalents,
			totalPathPoints,
			totalAncestryPoints,
			unlockedFeatureIds,
			pendingSubclassChoices,
			totalCantripsKnown: 0,
			crossPathGrants: {
				grantsSpellcasterStaminaRegen: false,
				requiresSpellListChoice: false,
				combatTrainingGrants: []
			}
		};
	}

	console.log('🔍 AGGREGATION START:', {
		classId: classProgressionData?.id,
		targetLevel,
		hasProgression: !!classProgressionData?.levelProgression,
		progressionLength: classProgressionData?.levelProgression?.length
	});

	for (let level = 1; level <= targetLevel; level++) {
		const levelData = classProgressionData.levelProgression.find((lp: any) => lp.level === level);
		if (!levelData) {
			console.warn(`⚠️ Level ${level} not found in progression!`);
			continue;
		}

		console.log(`📊 Level ${level} data:`, {
			hasGains: !!levelData.gains,
			gains: JSON.stringify(levelData.gains),
			talents: levelData.gains?.talents,
			pathPoints: levelData.gains?.pathPoints
		});

		// Aggregate numeric stats from progression files (gained* fields)
		totalHP += levelData.gainedHealth || levelData.healthPoints || 0;
		totalSP += levelData.gainedStaminaPoints || levelData.staminaPoints || 0;
		totalMP += levelData.gainedManaPoints || levelData.manaPoints || 0;
		totalSkillPoints += levelData.gainedSkillPoints || levelData.skillPoints || 0;
		totalTradePoints += levelData.gainedTradePoints || levelData.tradePoints || 0;
		totalAttributePoints += levelData.gainedAttributePoints || levelData.attributePoints || 0;
		totalManeuversKnown += levelData.gainedManeuversKnown || levelData.maneuversKnown || 0;
		totalSpellsKnown +=
			(levelData.gainedSpellsKnown || levelData.spellsKnown || 0) +
			(levelData.gainedCantripsKnown || levelData.cantripsKnown || 0);

		// Aggregate new structured gains (if present)
		if (levelData.gains) {
			totalTalents += levelData.gains.talents || 0;
			totalPathPoints += levelData.gains.pathPoints || (levelData.gains.pathProgression ? 1 : 0);
			totalAncestryPoints += levelData.gains.ancestryPoints || 0;

			if (levelData.gains.classFeatures) {
				unlockedFeatureIds.push(...levelData.gains.classFeatures);
			}

			if (levelData.gains.subclassFeatureChoice) {
				pendingSubclassChoices++;
			}
		}
	}

	console.log('✅ AGGREGATION COMPLETE (before path bonuses):', {
		totalTalents,
		totalPathPoints,
		totalSkillPoints,
		totalTradePoints,
		unlockedFeatureIds: unlockedFeatureIds.length,
		totalSP,
		totalMP,
		totalManeuversKnown
	});

	// Add path bonuses to progression totals (with cross-path grants)
	const pathBonuses = aggregatePathBenefits(pathPointAllocations, classCategory);
	totalSP += pathBonuses.totalSP;
	totalMP += pathBonuses.totalMP;
	totalManeuversKnown += pathBonuses.totalManeuversKnown;
	totalCantripsKnown += pathBonuses.totalCantripsKnown;
	totalSpellsKnown += pathBonuses.totalSpellsKnown;

	console.log('✅ PATH BONUSES APPLIED:', {
		pathAllocations: pathPointAllocations,
		classCategory,
		bonuses: pathBonuses,
		crossPathGrants: pathBonuses.crossPathGrants,
		finalSP: totalSP,
		finalMP: totalMP,
		finalManeuvers: totalManeuversKnown
	});

	// Apply subclass features (M3.10c)
	if (selectedSubclass && classProgressionData?.id) {
		try {
			const subclassFeatures = resolveSubclassFeatures(
				classProgressionData.id,
				selectedSubclass,
				targetLevel
			);

			console.log('🎭 SUBCLASS FEATURES APPLIED:', {
				subclass: selectedSubclass,
				featuresCount: subclassFeatures.length,
				featureIds: subclassFeatures.map((f) => f.id || f.featureName)
			});

			subclassFeatures.forEach((feature) => {
				const featureId = feature.id || feature.featureName;
				if (featureId) {
					unlockedFeatureIds.push(featureId);
				}
			});
		} catch (error) {
			console.error('Failed to resolve subclass features:', error);
		}
	}

	return {
		totalHP,
		totalSP,
		totalMP,
		totalSkillPoints,
		totalTradePoints,
		totalAttributePoints,
		totalManeuversKnown,
		totalCantripsKnown,
		totalSpellsKnown,
		totalTalents,
		totalPathPoints,
		totalAncestryPoints,
		unlockedFeatureIds,
		pendingSubclassChoices,
		crossPathGrants: pathBonuses.crossPathGrants
	};
}
