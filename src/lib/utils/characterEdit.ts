// Character edit mode utilities
// Handles converting saved characters back to editable format while preserving manual modifications

import type { CharacterInProgressStoreData } from '../stores/characterContext';
import type { SavedCharacter } from '../types/dataContracts';
import { getCharacterState, updateCharacterState } from './characterState';
import { traitsData } from '../rulesdata/_new_schema/traits';
import { getAllSavedCharacters, saveAllCharacters } from './storageUtils';



// Convert a saved character back to character-in-progress format for editing
export const convertCharacterToInProgress = (
	savedCharacter: SavedCharacter
): CharacterInProgressStoreData => {
	// Get attribute values from the correct property names (finalMight, etc. or attribute_might, etc.)
		// Removed unused getAttribute helper

	return {
		id: savedCharacter.id,
	attribute_might: typeof savedCharacter.finalMight === 'number' ? savedCharacter.finalMight : -2,
	attribute_agility: typeof savedCharacter.finalAgility === 'number' ? savedCharacter.finalAgility : -2,
	attribute_charisma: typeof savedCharacter.finalCharisma === 'number' ? savedCharacter.finalCharisma : -2,
	attribute_intelligence: typeof savedCharacter.finalIntelligence === 'number' ? savedCharacter.finalIntelligence : -2,
		pointsSpent: calculatePointsSpent(savedCharacter),
		level: savedCharacter.level || 1,
		combatMastery: savedCharacter.finalCombatMastery || 1,
		ancestry1Id: savedCharacter.ancestry1Id ?? null,
		ancestry2Id: savedCharacter.ancestry2Id ?? null,
		selectedTraitIds: Array.isArray(savedCharacter.selectedTraitIds) ? savedCharacter.selectedTraitIds : [],
		ancestryPointsSpent: calculateAncestryPointsSpent(savedCharacter),
		classId: savedCharacter.classId,
		selectedFeatureChoices: typeof savedCharacter.selectedFeatureChoices === 'object' ? savedCharacter.selectedFeatureChoices : {},
			selectedTraitChoices: {},
			saveMasteryMight: false,
			saveMasteryAgility: false,
			saveMasteryCharisma: false,
			saveMasteryIntelligence: false,
		finalName: savedCharacter.finalName,
		finalPlayerName: savedCharacter.finalPlayerName ?? '',
	createdAt: savedCharacter.createdAt ? new Date(savedCharacter.createdAt) : new Date(),
	updatedAt: new Date(),
		currentStep: 1,
		overflowTraitId: null,
		overflowAttributeName: null,
		skillsData: typeof savedCharacter.skillsData === 'object' ? savedCharacter.skillsData : {},
		tradesData: typeof savedCharacter.tradesData === 'object' ? savedCharacter.tradesData : {},
		languagesData: typeof savedCharacter.languagesData === 'object' && !Array.isArray(savedCharacter.languagesData)
			? savedCharacter.languagesData
			: { common: { fluency: 'fluent' } },
		selectedSpells: Array.isArray(savedCharacter.spells) ? savedCharacter.spells : [],
		selectedManeuvers: Array.isArray(savedCharacter.maneuvers) ? savedCharacter.maneuvers : [],
		// CRITICAL: Restore conversions for background step validation
		skillToTradeConversions: savedCharacter.skillToTradeConversions || 0,
		tradeToSkillConversions: savedCharacter.tradeToSkillConversions || 0,
		tradeToLanguageConversions: savedCharacter.tradeToLanguageConversions || 0,
	schemaVersion: typeof savedCharacter.schemaVersion === 'number' ? savedCharacter.schemaVersion : 2
	};
};

// Calculate how many attribute points were spent
const calculatePointsSpent = (character: SavedCharacter): number => {
	const baseCost = 4; // Each attribute starts at -2, costs 4 points to get to 0

	// Only use final* fields from SavedCharacter
	const attributes = [
		typeof character.finalMight === 'number' ? character.finalMight : -2,
		typeof character.finalAgility === 'number' ? character.finalAgility : -2,
		typeof character.finalCharisma === 'number' ? character.finalCharisma : -2,
		typeof character.finalIntelligence === 'number' ? character.finalIntelligence : -2
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
	if (!character.selectedTraitIds || !Array.isArray(character.selectedTraitIds)) return 0;
	const selectedTraitIds: string[] = character.selectedTraitIds;
	let totalCost = 0;

	selectedTraitIds.forEach((traitId) => {
		const trait = traitsData.find((t: any) => t.id === traitId);
		if (trait) {
			totalCost += trait.cost;
		}
	});

	return totalCost;
};

// Enhanced character completion that preserves manual modifications
export const completeCharacterEdit = async (
	originalCharacterId: string,
	newCharacterState: any,
	characterCalculationFn: (data: any) => Promise<any>
): Promise<void> => {
	try {
		console.log('🔄 completeCharacterEdit: called with', { originalCharacterId, newCharacterState });
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
			selectedTraitIds: Array.isArray(newCharacterState.selectedTraitIds) ? newCharacterState.selectedTraitIds : [],
			selectedFeatureChoices: typeof newCharacterState.selectedFeatureChoices === 'object' ? newCharacterState.selectedFeatureChoices : {},
			finalName: newCharacterState.finalName,
			finalPlayerName: newCharacterState.finalPlayerName,
			skillsData: typeof newCharacterState.skillsData === 'object' ? newCharacterState.skillsData : {},
			tradesData: typeof newCharacterState.tradesData === 'object' ? newCharacterState.tradesData : {},
			languagesData: typeof newCharacterState.languagesData === 'object' ? newCharacterState.languagesData : {},
			selectedSpells: Array.isArray(newCharacterState.selectedSpells) ? newCharacterState.selectedSpells : [],
			selectedManeuvers: Array.isArray(newCharacterState.selectedManeuvers) ? newCharacterState.selectedManeuvers : [],
			// CRITICAL: Include conversions for proper background validation during editing
			skillToTradeConversions: newCharacterState.skillToTradeConversions || 0,
			tradeToSkillConversions: newCharacterState.tradeToSkillConversions || 0,
			tradeToLanguageConversions: newCharacterState.tradeToLanguageConversions || 0,
			lastModified: new Date().toISOString()
		});

		console.log('🔄 completeCharacterEdit: Data passed to characterCalculationFn:', {
			input: newCharacterState,
			output: newCalculatedCharacter
		});

		// Update the saved character in storage with NEW CALCULATED VALUES
		const savedCharacters = getAllSavedCharacters();
		console.log('🔄 completeCharacterEdit: savedCharacters before update:', savedCharacters);
		const characterIndex = savedCharacters.findIndex(
			(char: any) => char.id === originalCharacterId
		);

		if (characterIndex !== -1) {
			// Update the character with new calculated values, preserving manual modifications
			savedCharacters[characterIndex] = {
				...savedCharacters[characterIndex],
				...newCalculatedCharacter,
				selectedFeatureChoices: newCharacterState.selectedFeatureChoices,
				// CRITICAL: Save conversions for future editing
				skillToTradeConversions: newCharacterState.skillToTradeConversions || 0,
				tradeToSkillConversions: newCharacterState.tradeToSkillConversions || 0,
				tradeToLanguageConversions: newCharacterState.tradeToLanguageConversions || 0,
				// ensure we carry over latest breakdowns if provided by calculator
				breakdowns: (newCalculatedCharacter as any).breakdowns || savedCharacters[characterIndex].breakdowns,
				lastModified: new Date().toISOString()
			};

			console.log('🔄 completeCharacterEdit: savedCharacters after update:', savedCharacters);
			saveAllCharacters(savedCharacters);
		} else {
			console.warn('⚠️ completeCharacterEdit: character not found in savedCharacters:', originalCharacterId);
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
				defenseNotes: existingState.defenseNotes,
				calculation: (newCalculatedCharacter as any).breakdowns
					? { breakdowns: (newCalculatedCharacter as any).breakdowns }
					: existingState.calculation
			});
		}
	} catch (error) {
		console.error('❌ Error completing character edit:', error);
		throw error;
	}
};
