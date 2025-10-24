import type { CharacterInProgressStoreData } from '../stores/characterContext';
import { traitsData } from '../rulesdata/ancestries/traits';
import { attributeRules } from '../rulesdata/attributes';
import { getLevelCaps } from '../rulesdata/progression/levelCaps';
import { classesData } from '../rulesdata/loaders/class.loader';

/**
 * Service for handling attribute-related business logic
 * NO business logic should be in the frontend components!
 * All rules come from attributeRules data and LEVEL_CAPS_TABLE - NO hardcoded values!
 */

/**
 * Attribute IDs (matching character state keys)
 */
export const ATTRIBUTE_IDS = ['might', 'agility', 'charisma', 'intelligence'] as const;
export type AttributeId = (typeof ATTRIBUTE_IDS)[number];

/**
 * Get max attribute value for a character's level
 * Pulls from LEVEL_CAPS_TABLE
 */
export const getMaxAttributeValue = (character: CharacterInProgressStoreData): number => {
	const levelCaps = getLevelCaps(character.level);
	return levelCaps.maxAttributeValue;
};

/**
 * Calculate base attribute points from class level progression
 * Accumulates gainedAttributePoints from level 1 up to current level
 */
const calculateBaseAttributePointsFromProgression = (
	character: CharacterInProgressStoreData
): number => {
	if (!character.classId) {
		// No class selected, use base 12 for level 1 character creation
		return 12;
	}

	const characterClass = classesData.find((c) => c.id === character.classId);
	if (!characterClass) {
		return 12; // Fallback if class not found
	}

	// Accumulate attribute points from level 1 up to current level
	let totalPoints = 12; // Base starting points at level 1

	characterClass.levelProgression.forEach((levelEntry) => {
		if (levelEntry.level <= character.level && levelEntry.level > 1) {
			totalPoints += levelEntry.attributePoints ?? 0;
		}
	});

	return totalPoints;
};

/**
 * Calculate total available attribute points for a character
 * Base points from level progression + any bonuses from traits/features
 */
export const calculateAvailableAttributePoints = (
	character: CharacterInProgressStoreData
): number => {
	// Get base points from class progression
	let totalPoints = calculateBaseAttributePointsFromProgression(character);

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
 * Must be: below max value (from level caps) AND have points remaining
 */
export const canIncreaseAttribute = (
	character: CharacterInProgressStoreData,
	attributeId: AttributeId
): boolean => {
	const currentValue = character[`attribute_${attributeId}`] ?? attributeRules.baseValue;
	const maxValue = getMaxAttributeValue(character);

	// Check if at max for this level
	if (currentValue >= maxValue) {
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
 * Min is always -2, Max depends on character level
 */
export const areAllAttributesValid = (character: CharacterInProgressStoreData): boolean => {
	const maxValue = getMaxAttributeValue(character);

	return ATTRIBUTE_IDS.every((attrId) => {
		const value = character[`attribute_${attrId}`] ?? attributeRules.baseValue;
		return value >= attributeRules.minValue && value <= maxValue;
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
