/**
 * Class Progression Resolver
 *
 * Resolves all progression data for a character up to a target level.
 * Returns budgets, unlocked features (with full objects), and pending choices.
 *
 * This is the single source of truth for:
 * - What features a character has at level N
 * - What budgets (talents, path points, etc.) they have available
 * - What choices they still need to make
 */

import type { ClassFeature, FeatureChoice } from '../schemas/character.schema';
import type { IClassDefinition } from '../schemas/class.schema';
import { classesData } from '../loaders/class.loader';
import { barbarianClass } from './features/barbarian_features';
import { clericClass } from './features/cleric_features';
import { hunterClass } from './features/hunter_features';
import { championClass } from './features/champion_features';
import { wizardClass } from './features/wizard_features';
import { monkClass } from './features/monk_features';
import { rogueClass } from './features/rogue_features';
import { sorcererClass } from './features/sorcerer_features';
import { spellbladeClass } from './features/spellblade_features';
import { warlockClass } from './features/warlock_features';
import { bardClass } from './features/bard_features';
import { druidClass } from './features/druid_features';
import { commanderClass } from './features/commander_features';

// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	hunter: hunterClass,
	champion: championClass,
	wizard: wizardClass,
	monk: monkClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	druid: druidClass,
	commander: commanderClass
};

/**
 * Budgets accumulated from level progression
 */
export interface ProgressionBudgets {
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
}

/**
 * A pending choice from a feature
 */
export interface PendingFeatureChoice {
	featureId: string;
	feature: ClassFeature;
	choiceId: string;
	choice: FeatureChoice;
}

/**
 * Complete resolved progression for a character at a target level
 */
export interface ResolvedProgression {
	level: number;
	classId: string;
	className: string;
	budgets: ProgressionBudgets;
	unlockedFeatures: ClassFeature[];
	pendingFeatureChoices: PendingFeatureChoice[];
	availableSubclassChoice: boolean;
	subclassChoiceLevel?: number;
}

/**
 * Get class feature definition by ID
 */
function getFeatureById(classId: string, featureId: string): ClassFeature | undefined {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures) return undefined;

	// Check core features
	const coreFeature = classFeatures.coreFeatures?.find((f: ClassFeature) => f.id === featureId);
	if (coreFeature) return coreFeature;

	// Check subclass features
	for (const subclass of classFeatures.subclasses || []) {
		const subclassFeature = subclass.features?.find((f: ClassFeature) => f.id === featureId);
		if (subclassFeature) return subclassFeature;
	}

	return undefined;
}

/**
 * Resolve class progression for a character up to target level
 */
export function resolveClassProgression(classId: string, targetLevel: number): ResolvedProgression {
	// Validate inputs
	if (targetLevel < 1 || targetLevel > 10) {
		throw new Error(`Invalid level: ${targetLevel}. Level must be between 1 and 10.`);
	}

	// Get class progression data
	const classProgression = classesData.find((c) => c.id === classId);
	const classFeatures = CLASS_FEATURES_MAP[classId];

	if (!classProgression) {
		throw new Error(`Class progression not found for classId: ${classId}`);
	}

	// Initialize budgets
	const budgets: ProgressionBudgets = {
		totalHP: 0,
		totalSP: 0,
		totalMP: 0,
		totalSkillPoints: 0,
		totalTradePoints: 0,
		totalAttributePoints: 0,
		totalManeuversKnown: 0,
		totalCantripsKnown: 0,
		totalSpellsKnown: 0,
		totalTalents: 0,
		totalPathPoints: 0,
		totalAncestryPoints: 0
	};

	const unlockedFeatures: ClassFeature[] = [];
	const pendingFeatureChoices: PendingFeatureChoice[] = [];
	let availableSubclassChoice = false;
	let subclassChoiceLevel: number | undefined;

	// Iterate through each level up to target
	for (let level = 1; level <= targetLevel; level++) {
		const levelData = classProgression.levelProgression.find((lp) => lp.level === level);
		if (!levelData) continue;

		// Accumulate numeric budgets
		budgets.totalHP += levelData.healthPoints || 0;
		budgets.totalSP += levelData.staminaPoints || 0;
		budgets.totalMP += levelData.manaPoints || 0;
		budgets.totalSkillPoints += levelData.skillPoints || 0;
		budgets.totalTradePoints += levelData.tradePoints || 0;
		budgets.totalAttributePoints += levelData.attributePoints || 0;
		budgets.totalManeuversKnown += levelData.maneuversKnown || 0;
		budgets.totalCantripsKnown += levelData.cantripsKnown || 0;
		budgets.totalSpellsKnown += levelData.spellsKnown || 0;

		// Accumulate structured gains
		if (levelData.gains) {
			budgets.totalTalents += levelData.gains.talents || 0;
			budgets.totalPathPoints += levelData.gains.pathPoints || 0;
			budgets.totalAncestryPoints += levelData.gains.ancestryPoints || 0;

			// Resolve feature objects from IDs
			if (levelData.gains.classFeatures) {
				for (const featureId of levelData.gains.classFeatures) {
					const feature = getFeatureById(classId, featureId);
					if (feature) {
						// Add feature with levelGained set to current level
						const featureWithLevel = { ...feature, levelGained: level };
						unlockedFeatures.push(featureWithLevel);

						// Check for pending choices
						if (feature.choices) {
							for (const choice of feature.choices) {
								pendingFeatureChoices.push({
									featureId: feature.id || featureId,
									feature: featureWithLevel,
									choiceId: choice.id,
									choice
								});
							}
						}
					}
				}
			}

			// Track subclass choice availability
			if (levelData.gains.subclassFeatureChoice) {
				availableSubclassChoice = true;
				subclassChoiceLevel = level;
			}
		}
	}

	return {
		level: targetLevel,
		classId,
		className: classProgression.name,
		budgets,
		unlockedFeatures,
		pendingFeatureChoices,
		availableSubclassChoice,
		subclassChoiceLevel
	};
}

/**
 * Get available subclasses for a class
 */
export function getAvailableSubclasses(
	classId: string
): Array<{ name: string; description?: string }> {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures?.subclasses) return [];

	return classFeatures.subclasses.map((sub: any) => ({
		name: sub.subclassName,
		description: sub.description
	}));
}

/**
 * Resolve a specific subclass's features up to a level
 */
export function resolveSubclassFeatures(
	classId: string,
	subclassName: string,
	upToLevel: number
): ClassFeature[] {
	const classFeatures = CLASS_FEATURES_MAP[classId];
	if (!classFeatures?.subclasses) return [];

	const subclass = classFeatures.subclasses.find((s: any) => s.subclassName === subclassName);
	if (!subclass) return [];

	// Return features up to the specified level
	return subclass.features.filter((f: ClassFeature) => f.levelGained <= upToLevel);
}
