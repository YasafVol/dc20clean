import type { CharacterInProgressStoreData } from '../stores/characterContext';
import { traitsData } from '../rulesdata/ancestries/traits';
import { attributeRules } from '../rulesdata/attributes';

/**
 * Service for handling attribute-related business logic
 * NO business logic should be in the frontend components!
 * All rules come from attributeRules data - NO hardcoded values!
 */

/**
 * Attribute IDs (matching character state keys)
 */
export const ATTRIBUTE_IDS = ['might', 'agility', 'charisma', 'intelligence'] as const;
export type AttributeId = (typeof ATTRIBUTE_IDS)[number];

/**
 * Calculate total available attribute points for a character
 * Base points + any bonuses from traits/features
 */
export const calculateAvailableAttributePoints = (
	character: CharacterInProgressStoreData
): number => {
	let totalPoints = attributeRules.basePoints;

	// Add bonus points from selected traits
	const selectedTraits = character.selectedTraitIds || [];
	selectedTraits.forEach((traitId) => {
		const trait = traitsData.find((t) => t.id === traitId);
		if (trait && trait.effects) {
			trait.effects.forEach((effect) => {
				if (effect.type === 'MODIFY_STAT' && effect.target === 'attributePoints') {
					totalPoints += effect.value;
				}
			});
		}
	});

	return totalPoints;
};

/**
 * Calculate cost to reach a target value from base
 * Uses attributeRules.costPerIncrement
 */
export const calculateCostToValue = (targetValue: number): number => {
	const increments = targetValue - attributeRules.baseValue;
	return increments * attributeRules.costPerIncrement;
};

/**
 * Calculate total points spent on all attributes
 */
export const calculateAttributePointsSpent = (character: CharacterInProgressStoreData): number => {
	let totalSpent = 0;

	ATTRIBUTE_IDS.forEach((attrId) => {
		const value = character[`attribute_${attrId}`] ?? attributeRules.baseValue;
		totalSpent += calculateCostToValue(value);
	});

	return totalSpent;
};

/**
 * Calculate remaining attribute points
 */
export const calculateAttributePointsRemaining = (
	character: CharacterInProgressStoreData
): number => {
	const available = calculateAvailableAttributePoints(character);
	const spent = calculateAttributePointsSpent(character);
	return available - spent;
};

/**
 * Check if an attribute can be increased
 * Must be: below max value AND have points remaining
 */
export const canIncreaseAttribute = (
	character: CharacterInProgressStoreData,
	attributeId: AttributeId
): boolean => {
	const currentValue = character[`attribute_${attributeId}`] ?? attributeRules.baseValue;

	// Check if at max
	if (currentValue >= attributeRules.maxValue) {
		return false;
	}

	// Check if we have points to spend
	const pointsRemaining = calculateAttributePointsRemaining(character);
	return pointsRemaining >= attributeRules.costPerIncrement;
};

/**
 * Check if an attribute can be decreased
 * Must be above min value
 */
export const canDecreaseAttribute = (
	character: CharacterInProgressStoreData,
	attributeId: AttributeId
): boolean => {
	const currentValue = character[`attribute_${attributeId}`] ?? attributeRules.baseValue;
	return currentValue > attributeRules.minValue;
};

/**
 * Validate that all attributes are within valid range
 */
export const areAllAttributesValid = (character: CharacterInProgressStoreData): boolean => {
	return ATTRIBUTE_IDS.every((attrId) => {
		const value = character[`attribute_${attrId}`] ?? attributeRules.baseValue;
		return value >= attributeRules.minValue && value <= attributeRules.maxValue;
	});
};

/**
 * Validate that all attribute points have been spent
 */
export const areAllAttributePointsSpent = (character: CharacterInProgressStoreData): boolean => {
	const available = calculateAvailableAttributePoints(character);
	const spent = calculateAttributePointsSpent(character);
	return spent === available;
};
