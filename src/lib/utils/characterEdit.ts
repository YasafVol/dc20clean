// Character edit mode utilities
// Handles converting saved characters back to editable format while preserving manual modifications

import type { CharacterInProgressStoreData } from '../stores/characterContext';
import { getCharacterState, updateCharacterState } from './characterState';
import { traitsData } from '../rulesdata/traits';

export interface SavedCharacter {
	id: string;
	finalName: string;
	finalPlayerName: string;
	classId: string;
	ancestry1Id: string;
	ancestry2Id?: string;
	// The saved character uses finalMight, finalAgility, etc.
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;
	// But also check for the attribute_ format for backwards compatibility
	attribute_might?: number;
	attribute_agility?: number;
	attribute_charisma?: number;
	attribute_intelligence?: number;
	level: number;
	combatMastery: number;
	selectedTraitIds: string;
	selectedFeatureChoices: string;
	skillsJson: string;
	tradesJson: string;
	languagesJson: string;
	selectedSpells?: string;
	selectedManeuvers?: string;
	completedAt: string;
	[key: string]: any;
}

// Convert a saved character back to character-in-progress format for editing
export const convertCharacterToInProgress = (
	savedCharacter: SavedCharacter
): CharacterInProgressStoreData => {
	// Get attribute values from the correct property names (finalMight, etc. or attribute_might, etc.)
	const getAttribute = (
		finalName: keyof SavedCharacter,
		attributeName: keyof SavedCharacter
	): number => {
		// Try final* first (current format), then attribute_* (legacy format), then default to -2
		if (savedCharacter[finalName] !== undefined) {
			return savedCharacter[finalName] as number;
		}
		if (savedCharacter[attributeName] !== undefined) {
			return savedCharacter[attributeName] as number;
		}
		return -2;
	};

	return {
		id: savedCharacter.id,
		// Basic character build data (what we want to edit)
		attribute_might: getAttribute('finalMight', 'attribute_might'),
		attribute_agility: getAttribute('finalAgility', 'attribute_agility'),
		attribute_charisma: getAttribute('finalCharisma', 'attribute_charisma'),
		attribute_intelligence: getAttribute('finalIntelligence', 'attribute_intelligence'),
		pointsSpent: calculatePointsSpent(savedCharacter),
		level: savedCharacter.level || 1,
		combatMastery: savedCharacter.combatMastery || 1,
		ancestry1Id: savedCharacter.ancestry1Id,
		ancestry2Id: savedCharacter.ancestry2Id || null,
		selectedTraitIds: savedCharacter.selectedTraitIds || '',
		ancestryPointsSpent: calculateAncestryPointsSpent(savedCharacter),
		classId: savedCharacter.classId,
		selectedFeatureChoices: savedCharacter.selectedFeatureChoices || '',
		// Save masteries (default to false, but try to get from saved character if available)
		saveMasteryMight:
			savedCharacter.saveMasteryMight !== undefined ? savedCharacter.saveMasteryMight : false,
		saveMasteryAgility:
			savedCharacter.saveMasteryAgility !== undefined ? savedCharacter.saveMasteryAgility : false,
		saveMasteryCharisma:
			savedCharacter.saveMasteryCharisma !== undefined ? savedCharacter.saveMasteryCharisma : false,
		saveMasteryIntelligence:
			savedCharacter.saveMasteryIntelligence !== undefined
				? savedCharacter.saveMasteryIntelligence
				: false,
		finalName: savedCharacter.finalName,
		finalPlayerName: savedCharacter.finalPlayerName,
		createdAt: new Date(savedCharacter.completedAt),
		updatedAt: new Date(),
		currentStep: 1, // Start from the beginning when editing
		overflowTraitId: null,
		overflowAttributeName: null,
		// Background selections
		skillsJson: savedCharacter.skillsJson || '{}',
		tradesJson: savedCharacter.tradesJson || '{}',
		languagesJson: savedCharacter.languagesJson || '{"common": {"fluency": "fluent"}}',
		// Spells and Maneuvers selections
		selectedSpells: savedCharacter.selectedSpells || '[]',
		selectedManeuvers: savedCharacter.selectedManeuvers || '[]'
	};
};

// Calculate how many attribute points were spent
const calculatePointsSpent = (character: SavedCharacter): number => {
	const baseCost = 4; // Each attribute starts at -2, costs 4 points to get to 0

	// Helper to get attribute values from either format
	const getAttribute = (
		finalName: keyof SavedCharacter,
		attributeName: keyof SavedCharacter
	): number => {
		if (character[finalName] !== undefined) {
			return character[finalName] as number;
		}
		if (character[attributeName] !== undefined) {
			return character[attributeName] as number;
		}
		return -2;
	};

	const attributes = [
		getAttribute('finalMight', 'attribute_might'),
		getAttribute('finalAgility', 'attribute_agility'),
		getAttribute('finalCharisma', 'attribute_charisma'),
		getAttribute('finalIntelligence', 'attribute_intelligence')
	];

	let totalSpent = 0;
	attributes.forEach((value) => {
		if (value > -2) {
			totalSpent += baseCost + Math.max(0, value * 2); // Each point above 0 costs 2
		}
	});

	return totalSpent;
};

// Calculate how many ancestry points were spent (based on selected traits)
const calculateAncestryPointsSpent = (character: SavedCharacter): number => {
	if (!character.selectedTraitIds) return 0;

	try {
		const selectedTraitIds: string[] = JSON.parse(character.selectedTraitIds);
		let totalCost = 0;

		selectedTraitIds.forEach((traitId) => {
			const trait = traitsData.find((t: any) => t.id === traitId);
			if (trait) {
				totalCost += trait.cost;
			}
		});

		return totalCost;
	} catch (error) {
		console.warn('Error calculating ancestry points for edit mode:', error);
		return 0;
	}
};

// Enhanced character completion that preserves manual modifications
export const completeCharacterEdit = async (
	originalCharacterId: string,
	newCharacterState: any,
	characterCalculationFn: (data: any) => Promise<any>
): Promise<void> => {
	try {
		// Get the existing character state (manual modifications)
		const existingState = getCharacterState(originalCharacterId);

		// Calculate new stats based on the edited character build
		const newCalculatedCharacter = await characterCalculationFn({
			id: originalCharacterId, // Keep the same ID
			attribute_might: newCharacterState.attribute_might,
			attribute_agility: newCharacterState.attribute_agility,
			attribute_charisma: newCharacterState.attribute_charisma,
			attribute_intelligence: newCharacterState.attribute_intelligence,
			level: newCharacterState.level || 1,
			combatMastery: newCharacterState.combatMastery || 1,
			classId: newCharacterState.classId,
			ancestry1Id: newCharacterState.ancestry1Id,
			ancestry2Id: newCharacterState.ancestry2Id,
			selectedTraitIds: newCharacterState.selectedTraitIds || '',
			selectedFeatureChoices: newCharacterState.selectedFeatureChoices || '',
			finalName: newCharacterState.finalName,
			finalPlayerName: newCharacterState.finalPlayerName,
			skillsJson: newCharacterState.skillsJson || '',
			tradesJson: newCharacterState.tradesJson || '',
			languagesJson: newCharacterState.languagesJson || '',
			selectedSpells: newCharacterState.selectedSpells || '[]',
			selectedManeuvers: newCharacterState.selectedManeuvers || '[]',
			lastModified: new Date().toISOString()
		});

		console.log('🔄 completeCharacterEdit: Data passed to characterCalculationFn:', {
			selectedSpells: newCharacterState.selectedSpells,
			selectedManeuvers: newCharacterState.selectedManeuvers
		});

		// Update the saved character in localStorage with NEW CALCULATED VALUES
		const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		const characterIndex = savedCharacters.findIndex(
			(char: any) => char.id === originalCharacterId
		);

		if (characterIndex !== -1) {
			// Update the character with new calculated values, preserving manual modifications
			savedCharacters[characterIndex] = {
				...savedCharacters[characterIndex],
				...newCalculatedCharacter,
				lastModified: new Date().toISOString()
			};

			localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
		}

		// Update the character state to reflect new original values while preserving current (manual) values
		if (existingState) {
			updateCharacterState(originalCharacterId, {
				resources: {
					// Update original values with new calculated maximums
					original: {
						maxHP: newCalculatedCharacter.finalHPMax || 0,
						maxSP: newCalculatedCharacter.finalSPMax || 0,
						maxMP: newCalculatedCharacter.finalMPMax || 0,
						maxGritPoints: newCalculatedCharacter.finalGritPoints || 0,
						maxRestPoints: newCalculatedCharacter.finalRestPoints || 0
					},
					// Keep existing current values (manual modifications)
					current: existingState.resources.current
				},
				// Currency and other data types keep their existing state
				currency: existingState.currency,
				attacks: existingState.attacks,
				inventory: existingState.inventory,
				defenseNotes: existingState.defenseNotes
			});
		}
	} catch (error) {
		console.error('Error completing character edit:', error);
		throw error;
	}
};
