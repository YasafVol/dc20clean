import type { CharacterInProgressStoreData } from '../../../lib/stores/characterContext';
import { classesData } from '../../../lib/rulesdata/loaders/class.loader';
import { getStep2FeatureChoices } from '../../../lib/services/classFeatures.service';

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
	// Mock validation: Ancestry step succeeds
	return true;
};

export const validateAttributes = (character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Attributes step fails
	return false;
};

export const validateBackground = (character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Background step succeeds
	return true;
};

export const validateSpells = (character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Spells step succeeds (default)
	return true;
};

export const validateFinish = (character: CharacterInProgressStoreData): boolean => {
	// Mock validation: Finish step succeeds (default)
	return true;
};

// Map step IDs to validation functions
export const stepValidationMap = {
	class: validateClass,
	features: validateFeatures,
	ancestry: validateAncestry,
	attributes: validateAttributes,
	background: validateBackground,
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
