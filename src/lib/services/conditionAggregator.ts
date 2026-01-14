/**
 * Condition Aggregator Service
 *
 * Aggregates all condition interactions (immunities, resistances, vulnerabilities)
 * from a character's features, traits, talents, and other sources.
 *
 * @see docs/plannedSpecs/CONDITIONS_SPEC.md for full specification
 */

import { ALL_CONDITIONS } from '../rulesdata/conditions/conditions.data';
import type {
	CharacterConditionStatus,
	ConditionInteraction,
	ConditionInteractionType
} from '../rulesdata/conditions/conditions.types';
import type { Effect } from '../rulesdata/schemas/character.schema';

/**
 * Minimal character data needed for condition aggregation
 */
export interface ConditionAggregatorInput {
	/** Selected ancestry traits with their effects */
	selectedTraits?: Array<{ id: string; name: string; effects?: Effect[] }>;
	/** Class name for source labeling */
	className?: string;
	/** Class features with their effects */
	classFeatures?: Array<{
		id: string;
		featureName: string;
		effects?: Effect[];
		levelGained?: number;
	}>;
	/** Subclass name for source labeling */
	subclassName?: string;
	/** Subclass features with their effects */
	subclassFeatures?: Array<{
		id: string;
		featureName: string;
		effects?: Effect[];
		levelGained?: number;
	}>;
	/** Selected talents with their effects */
	selectedTalents?: Array<{ id: string; name: string; effects?: Effect[] }>;
	/** Character level (for filtering features by level) */
	level?: number;
}

/**
 * Maps conditions to the attribute saves that can be used against them.
 * Used for expanding "ADV on X Saves" effects into condition resistances.
 */
const ATTRIBUTE_TO_CONDITIONS: Record<string, string[]> = {
	might: [
		'weakened-x',
		'restrained',
		'paralyzed',
		'petrified',
		'poisoned',
		'exhaustion-x',
		'unconscious'
	],
	agility: ['slowed-x', 'immobilized', 'restrained', 'exposed-x'],
	charisma: ['charmed', 'frightened', 'intimidated', 'taunted', 'terrified'],
	intelligence: ['dazed-x', 'disoriented-x', 'stunned-x', 'surprised']
};

/**
 * Returns all condition IDs affected by saves of a given attribute.
 * Used for expanding attribute-based save advantages into condition resistances.
 *
 * @param attribute - The attribute name (might, agility, charisma, intelligence)
 * @returns Array of condition IDs affected by that attribute's saves
 */
export function getConditionsAffectedByAttribute(attribute: string): string[] {
	return ATTRIBUTE_TO_CONDITIONS[attribute.toLowerCase()] ?? [];
}

/**
 * Processes an array of effects and extracts condition interactions.
 *
 * @param effects - Array of effects to process
 * @param sourceName - Name of the source feature/trait/talent
 * @param sourceCategory - Category of the source (e.g., "Ancestry", "Class", "Talent")
 * @param interactions - Map to store extracted interactions
 */
function processConditionEffects(
	effects: Effect[] | undefined,
	sourceName: string,
	sourceCategory: string,
	interactions: Map<string, ConditionInteraction[]>
): void {
	if (!effects) return;

	for (const effect of effects) {
		// Handle condition immunity effects
		if (effect.type === 'GRANT_CONDITION_IMMUNITY') {
			const conditionId = effect.target;
			const existingInteractions = interactions.get(conditionId) || [];

			existingInteractions.push({
				type: 'immunity' as ConditionInteractionType,
				source: `${sourceCategory}: ${sourceName}`,
				details: (effect as any).details
			});

			interactions.set(conditionId, existingInteractions);
		}

		// Handle condition resistance effects
		if (effect.type === 'GRANT_CONDITION_RESISTANCE') {
			const conditionId = effect.target;
			const existingInteractions = interactions.get(conditionId) || [];

			existingInteractions.push({
				type: 'resistance' as ConditionInteractionType,
				source: `${sourceCategory}: ${sourceName}`,
				details: (effect as any).details
			});

			interactions.set(conditionId, existingInteractions);
		}

		// Handle condition vulnerability effects
		if (effect.type === 'GRANT_CONDITION_VULNERABILITY') {
			const conditionId = effect.target;
			const existingInteractions = interactions.get(conditionId) || [];

			existingInteractions.push({
				type: 'vulnerability' as ConditionInteractionType,
				source: `${sourceCategory}: ${sourceName}`,
				details: (effect as any).details
			});

			interactions.set(conditionId, existingInteractions);
		}

		// Handle advantage on attribute saves (expand to condition resistances)
		if (effect.type === 'GRANT_ADVANTAGE_ON_SAVE') {
			const attribute = effect.target.toLowerCase();
			const affectedConditions = getConditionsAffectedByAttribute(attribute);

			for (const conditionId of affectedConditions) {
				const existingInteractions = interactions.get(conditionId) || [];

				existingInteractions.push({
					type: 'resistance' as ConditionInteractionType,
					source: `${sourceCategory}: ${sourceName}`,
					details: `ADV on ${effect.target} Saves`
				});

				interactions.set(conditionId, existingInteractions);
			}
		}
	}
}

/**
 * Aggregates all condition interactions for a character.
 *
 * @param input - Character data with selected features and traits
 * @returns Array of condition statuses covering all DC20 conditions
 *
 * @example
 * const conditions = calculateCharacterConditions({
 *   selectedTraits: [{ id: 'human_undying', name: 'Undying', effects: [...] }],
 *   className: 'Barbarian',
 *   classFeatures: [{ id: 'barbarian_rage', featureName: 'Rage', effects: [...] }],
 *   level: 5
 * });
 */
export function calculateCharacterConditions(
	input: ConditionAggregatorInput
): CharacterConditionStatus[] {
	const interactions = new Map<string, ConditionInteraction[]>();

	// 1. Initialize all conditions with empty interactions
	for (const condition of ALL_CONDITIONS) {
		interactions.set(condition.id, []);
	}

	// 2. Scan ancestry traits
	if (input.selectedTraits) {
		for (const trait of input.selectedTraits) {
			processConditionEffects(trait.effects, trait.name, 'Ancestry', interactions);
		}
	}

	// 3. Scan class features (filter by level if provided)
	if (input.classFeatures) {
		const className = input.className || 'Class';
		for (const feature of input.classFeatures) {
			// Skip features above character level
			if (input.level !== undefined && feature.levelGained !== undefined) {
				if (feature.levelGained > input.level) continue;
			}
			processConditionEffects(feature.effects, feature.featureName, className, interactions);
		}
	}

	// 4. Scan subclass features (filter by level if provided)
	if (input.subclassFeatures) {
		const subclassName = input.subclassName || 'Subclass';
		for (const feature of input.subclassFeatures) {
			// Skip features above character level
			if (input.level !== undefined && feature.levelGained !== undefined) {
				if (feature.levelGained > input.level) continue;
			}
			processConditionEffects(feature.effects, feature.featureName, subclassName, interactions);
		}
	}

	// 5. Scan selected talents
	if (input.selectedTalents) {
		for (const talent of input.selectedTalents) {
			processConditionEffects(talent.effects, talent.name, 'Talent', interactions);
		}
	}

	// 6. Convert map to CharacterConditionStatus array
	return Array.from(interactions.entries()).map(([conditionId, interactionList]) => ({
		conditionId,
		interactions: interactionList
	}));
}

/**
 * Filters condition statuses to only those with interactions.
 * Useful for displaying a condensed view.
 *
 * @param conditions - Full array of condition statuses
 * @returns Only conditions that have at least one interaction
 */
export function getConditionsWithInteractions(
	conditions: CharacterConditionStatus[]
): CharacterConditionStatus[] {
	return conditions.filter((cs) => cs.interactions.length > 0);
}

/**
 * Groups conditions by interaction type.
 * Returns separate arrays for immunities, resistances, and vulnerabilities.
 *
 * @param conditions - Full array of condition statuses
 * @returns Object with grouped conditions
 */
export function groupConditionsByType(conditions: CharacterConditionStatus[]): {
	immunities: CharacterConditionStatus[];
	resistances: CharacterConditionStatus[];
	vulnerabilities: CharacterConditionStatus[];
	noInteractions: CharacterConditionStatus[];
} {
	const immunities = conditions.filter((cs) => cs.interactions.some((i) => i.type === 'immunity'));

	const resistances = conditions.filter((cs) =>
		cs.interactions.some((i) => i.type === 'resistance')
	);

	const vulnerabilities = conditions.filter((cs) =>
		cs.interactions.some((i) => i.type === 'vulnerability')
	);

	const noInteractions = conditions.filter((cs) => cs.interactions.length === 0);

	return { immunities, resistances, vulnerabilities, noInteractions };
}

/**
 * Gets the condition definition by ID.
 *
 * @param conditionId - The condition ID to look up
 * @returns The condition definition or undefined if not found
 */
export function getConditionById(conditionId: string) {
	return ALL_CONDITIONS.find((c) => c.id === conditionId);
}
