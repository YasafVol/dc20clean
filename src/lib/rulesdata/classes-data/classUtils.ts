/**
 * @file classUtils.ts
 * @description Helper utilities for working with class and subclass data
 */

import type { Subclass, ClassFeature } from '../schemas/character.schema';
import { barbarianClass } from './features/barbarian_features';
import { clericClass } from './features/cleric_features';
import { druidClass } from './features/druid_features';
import { wizardClass } from './features/wizard_features';
import { hunterClass } from './features/hunter_features';
import { championClass } from './features/champion_features';
import { rogueClass } from './features/rogue_features';
import { sorcererClass } from './features/sorcerer_features';
import { spellbladeClass } from './features/spellblade_features';
import { warlockClass } from './features/warlock_features';
import { bardClass } from './features/bard_features';
import { commanderClass } from './features/commander_features';
import { monkClass } from './features/monk_features';


// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	druid: druidClass,
	wizard: wizardClass,
	hunter: hunterClass,
	champion: championClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	commander: commanderClass,
	monk: monkClass
};

/**
 * Get a subclass definition by class ID and subclass name
 */
export function getSubclassByName(classId: string, subclassName: string): Subclass | undefined {
	const classData = CLASS_FEATURES_MAP[classId];
	if (!classData) return undefined;

	return classData.subclasses?.find((s: Subclass) => s.subclassName === subclassName);
}

/**
 * Get all features for a subclass up to a given level
 */
export function getSubclassFeaturesByLevel(
	classId: string,
	subclassName: string,
	level: number
): ClassFeature[] {
	const subclass = getSubclassByName(classId, subclassName);
	if (!subclass) return [];

	return subclass.features?.filter((f) => f.levelGained <= level) || [];
}

/**
 * Generate namespaced key for feature choices
 */
export function getFeatureChoiceKey(
	classId: string,
	subclassName: string,
	choiceId: string
): string {
	return `${classId}_${subclassName}_${choiceId}`;
}

/**
 * Validate all subclass feature choices are complete
 */
export function validateSubclassChoicesComplete(
	classId: string,
	subclassName: string,
	level: number,
	selectedChoices: Record<string, string[]>
): { isValid: boolean; incompleteChoices: string[] } {
	const features = getSubclassFeaturesByLevel(classId, subclassName, level);
	const incomplete: string[] = [];

	features.forEach((feature) => {
		feature.choices?.forEach((choice) => {
			const key = getFeatureChoiceKey(classId, subclassName, choice.id);
			const selections = selectedChoices[key] || [];

			if (selections.length < choice.count) {
				incomplete.push(choice.prompt);
			}
		});
	});

	return {
		isValid: incomplete.length === 0,
		incompleteChoices: incomplete
	};
}
