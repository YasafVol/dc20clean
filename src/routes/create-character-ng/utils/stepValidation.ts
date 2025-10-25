import type { CharacterInProgressStoreData } from '../../../lib/stores/characterContext';
import { classesData } from '../../../lib/rulesdata/loaders/class.loader';
import { ancestriesData } from '../../../lib/rulesdata/ancestries/ancestries';
import { getStep2FeatureChoices } from '../../../lib/services/classFeatures.service';
import {
	isWithinBudget,
	countZeroCostTraits,
	calculatePointsSpent,
	MAX_ANCESTRY_POINTS
} from '../../../lib/services/ancestry.service';
import {
	areAllAttributesValid,
	areAllAttributePointsSpent
} from '../../../lib/services/attributes.service';
import {
	calculateAvailablePointsWithConversions,
	calculateSkillPointsSpent,
	calculateTradePointsSpent,
	calculateLanguagePointsSpent,
	areAllProficienciesValid
} from '../../../lib/services/proficiencies.service';

// Step validation functions for character creation
// Returns true if the step is valid, false if invalid

export const validateClass = (character: CharacterInProgressStoreData): boolean => {
	return !!character.classId;
};

export const validateFeatures = (character: CharacterInProgressStoreData): boolean => {
	// If no class selected, features can't be valid
	if (!character.classId) {
		return false;
	}

	// Get the selected class
	const selectedClass = classesData.find((c) => c.id === character.classId);
	if (!selectedClass) {
		return false;
	}

	// Get all Step 2 feature choices for this class
	const featureChoices = getStep2FeatureChoices(
		selectedClass.name,
		selectedClass.levelProgression?.[0]
	);

	// If there are no choices, step is valid
	if (featureChoices.length === 0) {
		return true;
	}

	// Check each choice to ensure it's been made
	for (const choice of featureChoices) {
		const selectedValue = character.selectedFeatureChoices[choice.id];

		if (choice.type === 'select_multiple') {
			// For multiple selections, check if the required number of selections has been made
			const selectedArray = Array.isArray(selectedValue) ? selectedValue : [];
			const requiredCount = choice.maxSelections || 1;

			if (selectedArray.length !== requiredCount) {
				return false; // Not enough selections made
			}
		} else {
			// For single selections, check if a value has been selected
			if (!selectedValue || selectedValue === '') {
				return false; // No selection made
			}
		}
	}

	return true; // All choices have been made
};

export const validateAncestry = (character: CharacterInProgressStoreData): boolean => {
	// Check if ancestry is selected
	if (!character.ancestry1Id) {
		return false;
	}

	// Get the selected ancestry
	const selectedAncestry = ancestriesData.find((a) => a.id === character.ancestry1Id);
	if (!selectedAncestry) {
		return false;
	}

	// Check if points are within budget (0 to 5 points spent)
	const selectedTraits = character.selectedTraitIds || [];
	if (!isWithinBudget(selectedTraits)) {
		return false;
	}

	// Check if ALL 5 points have been spent (must use full budget)
	const pointsSpent = calculatePointsSpent(selectedTraits);
	if (pointsSpent !== MAX_ANCESTRY_POINTS) {
		return false;
	}

	// Check zero-cost trait limit (default max: 1)
	const maxZeroCost = selectedAncestry.selectionRules?.maxZeroCostTraits ?? 1;
	const zeroCostCount = countZeroCostTraits(selectedTraits);
	if (zeroCostCount > maxZeroCost) {
		return false;
	}

	// Default traits are NOT mandatory - user can select any combination within budget
	// No need to check hasAllDefaultTraits

	return true;
};

export const validateAttributes = (character: CharacterInProgressStoreData): boolean => {
	// Check if all attributes are within valid range (-2 to +3)
	if (!areAllAttributesValid(character)) {
		return false;
	}

	// Check if all attribute points have been spent (full budget usage required)
	if (!areAllAttributePointsSpent(character)) {
		return false;
	}

	return true;
};

export const validateProficiencies = (_character: CharacterInProgressStoreData): boolean => {
	const character = _character;

	// First, ensure basic rules (no overspend, mastery caps, adept limits)
	if (!areAllProficienciesValid(character)) {
		return false;
	}

	// Then require that all available points have been allocated for each category.
	// This enforces that users spend their skill/trade/language points before advancing.
	const pointsData = calculateAvailablePointsWithConversions(character);
	const skillsSpent = calculateSkillPointsSpent(character);
	const tradesSpent = calculateTradePointsSpent(character);
	const languagesSpent = calculateLanguagePointsSpent(character);

	// Require exact allocation: spent must equal available for each category.
	if (skillsSpent !== pointsData.availableSkillPoints) {
		return false;
	}

	if (tradesSpent !== pointsData.availableTradePoints) {
		return false;
	}

	if (languagesSpent !== pointsData.availableLanguagePoints) {
		return false;
	}

	// Additionally, if any category has >0 available points, ensure at least one selection exists
	const hasAnySkill = Object.values(character.skillsData || {}).some((v) => v > 0);
	const hasAnyTrade = Object.values(character.tradesData || {}).some((v) => v > 0);
	const hasAnyLanguage = Object.entries(character.languagesData || {}).some(
		([langId, data]) => langId !== 'common' && !!data && !!data.fluency
	);

	if (pointsData.availableSkillPoints > 0 && !hasAnySkill) return false;
	if (pointsData.availableTradePoints > 0 && !hasAnyTrade) return false;
	if (pointsData.availableLanguagePoints > 0 && !hasAnyLanguage) return false;

	return true;
};

export const validateSpells = (_character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Spells step succeeds (default)
	return true;
};

export const validateFinish = (_character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Finish step succeeds (default)
	return true;
};

// Map step IDs to validation functions
export const stepValidationMap = {
	class: validateClass,
	features: validateFeatures,
	ancestry: validateAncestry,
	attributes: validateAttributes,
	proficiencies: validateProficiencies,
	spells: validateSpells,
	finish: validateFinish
};

// Helper function to validate all steps
export const validateAllSteps = (character: CharacterInProgressStoreData) => {
	const results: Record<string, boolean> = {};

	Object.entries(stepValidationMap).forEach(([stepId, validationFn]) => {
		results[stepId] = validationFn(character);
	});

	return results;
};
