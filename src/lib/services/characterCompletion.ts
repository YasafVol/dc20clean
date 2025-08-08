// Shared character completion service
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';

export interface CharacterCompletionCallbacks {
	onShowSnackbar: (message: string) => void;
	onNavigateToLoad: () => void;
}

export const completeCharacter = async (
	characterState: any,
	callbacks: CharacterCompletionCallbacks
): Promise<void> => {
	try {
		// Character is complete, prepare the data for calculation
		const characterInProgress = {
			id: Date.now().toString(),
			attribute_might: characterState.attribute_might,
			attribute_agility: characterState.attribute_agility,
			attribute_charisma: characterState.attribute_charisma,
			attribute_intelligence: characterState.attribute_intelligence,
			level: characterState.level || 1,
			combatMastery: characterState.combatMastery || 1,
			classId: characterState.classId,
			ancestry1Id: characterState.ancestry1Id,
			ancestry2Id: characterState.ancestry2Id,
			selectedTraitIds: characterState.selectedTraitIds || '',
			selectedFeatureChoices: characterState.selectedFeatureChoices || '',
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			skillsJson: characterState.skillsJson || '', // Default empty for now
			tradesJson: characterState.tradesJson || '', // Default empty for now
			languagesJson: characterState.languagesJson || '', // Default empty for now
			createdAt: new Date(),
			completedAt: new Date().toISOString()
		};

		console.log('Calculating stats for character:', characterInProgress);

		// Check if we should use the enhanced calculator for supported classes
		const supportedClasses = ['barbarian', 'cleric', 'hunter', 'champion', 'wizard', 'monk', 'rogue', 'sorcerer', 'spellblade', 'warlock', 'bard', 'druid', 'commander'];
	const useEnhancedCalculator = supportedClasses.includes(characterInProgress.classId || '');

		let completedCharacterData;
		if (useEnhancedCalculator) {
			console.log('Using enhanced calculator for class:', characterInProgress.classId);
			// Convert to enhanced build data and calculate
			const enhancedBuildData = convertToEnhancedBuildData(characterInProgress);
			const enhancedResult = calculateCharacterWithBreakdowns(enhancedBuildData);
			
			// Convert enhanced result back to the expected format
			completedCharacterData = {
				...characterInProgress,
				// Core stats from enhanced calculator
				finalMight: enhancedResult.stats.finalMight,
				finalAgility: enhancedResult.stats.finalAgility,
				finalCharisma: enhancedResult.stats.finalCharisma,
				finalIntelligence: enhancedResult.stats.finalIntelligence,
				finalHPMax: enhancedResult.stats.finalHPMax,
				finalSPMax: enhancedResult.stats.finalSPMax,
				finalMPMax: enhancedResult.stats.finalMPMax,
				finalPD: enhancedResult.stats.finalPD,
				finalAD: enhancedResult.stats.finalAD,
				finalPDR: enhancedResult.stats.finalPDR,
				finalMoveSpeed: enhancedResult.stats.finalMoveSpeed,  // This will now include Grassland +1
				finalJumpDistance: enhancedResult.stats.finalJumpDistance, // This will now include Grassland +1
				finalDeathThreshold: enhancedResult.stats.finalDeathThreshold,
				finalGritPoints: enhancedResult.stats.finalGritPoints,
				finalRestPoints: enhancedResult.stats.finalRestPoints,
				finalInitiativeBonus: enhancedResult.stats.finalInitiativeBonus,
				finalSaveDC: enhancedResult.stats.finalSaveDC,
				finalSaveMight: enhancedResult.stats.finalSaveMight,
				finalSaveAgility: enhancedResult.stats.finalSaveAgility,
				finalSaveCharisma: enhancedResult.stats.finalSaveCharisma,
				finalSaveIntelligence: enhancedResult.stats.finalSaveIntelligence,
				// Add granted abilities and effects for display
				grantedAbilities: enhancedResult.grantedAbilities,
				conditionalModifiers: enhancedResult.conditionalModifiers,
				className: enhancedResult.stats.className || 'Unknown',
				ancestry1Name: 'Human', // TODO: Get from enhanced data  
				ancestry2Name: enhancedResult.stats.ancestry2Name || null
			};
		} else {
			// All classes are now migrated, this should not happen anymore
			throw new Error(`Class "${characterInProgress.classId}" is not supported in the enhanced calculator. All classes should be migrated.`);
		}
		console.log('Character stats calculated:', completedCharacterData);
		console.log('Class info saved:', {
			classId: completedCharacterData.classId,
			className: completedCharacterData.className
		});
		console.log('Ancestry info saved:', {
			ancestry1Id: completedCharacterData.ancestry1Id,
			ancestry1Name: completedCharacterData.ancestry1Name,
			ancestry2Id: completedCharacterData.ancestry2Id,
			ancestry2Name: completedCharacterData.ancestry2Name
		});

		// Save to local storage
		const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		existingCharacters.push(completedCharacterData);
		localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
		console.log('Character saved to localStorage. Total characters:', existingCharacters.length);

		// Show success snackbar
		callbacks.onShowSnackbar('Character created successfully!');

		// Navigate to load characters page after a short delay
		setTimeout(() => {
			console.log('Navigating to character load page...');
			callbacks.onNavigateToLoad();
		}, 1500);

		console.log('Character completed with calculated stats:', completedCharacterData);
	} catch (error) {
		console.error('Error completing character:', error);
		callbacks.onShowSnackbar('Error creating character. Please try again.');
	}
};
