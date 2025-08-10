// Shared character completion service
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { assignSpellsToCharacter } from './spellAssignment';
import { allSpells } from '../rulesdata/spells-data/spells';
import { allManeuvers } from '../rulesdata/maneuvers';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import { initializeCharacterState, saveCharacterState } from '../utils/characterState';

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
                ancestry2Name: enhancedResult.stats.ancestry2Name || null,
                // Persist breakdowns at the record level for quick access
                breakdowns: enhancedResult.breakdowns
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

		// Use user-selected spells from character creation
		if (completedCharacterData.className && characterState.selectedSpells) {
			console.log('🔄 characterCompletion: Processing user-selected spells:', {
				selectedSpells: characterState.selectedSpells,
				className: completedCharacterData.className
			});

			try {
				const selectedSpellNames = JSON.parse(characterState.selectedSpells);
				console.log('🔄 characterCompletion: Parsed spell names:', selectedSpellNames);

				if (Array.isArray(selectedSpellNames) && selectedSpellNames.length > 0) {
					// Convert selected spell names to SpellData objects
					const userSelectedSpells = selectedSpellNames.map((spellName: string) => {
						const fullSpell = allSpells.find(s => s.name === spellName);
						if (fullSpell) {
							return {
								id: `spell_${Date.now()}_${Math.random()}`,
								spellName: fullSpell.name,
								school: fullSpell.school,
								isCantrip: fullSpell.isCantrip,
								cost: fullSpell.cost,
								range: fullSpell.range,
								duration: fullSpell.duration,
								isPrepared: true,
								notes: ''
							};
						}
						return null;
					}).filter(Boolean);

					// Save the selected spell names as a string for edit functionality
					completedCharacterData.selectedSpells = characterState.selectedSpells;
					// Also add spells to the completed character data as a separate property for display
					(completedCharacterData as any).spells = userSelectedSpells;
					console.log('🔄 characterCompletion: User selected spells assigned:', userSelectedSpells.map((s: any) => s.spellName));
				} else {
					console.log('🔄 characterCompletion: No user spells selected, falling back to auto-assignment');
					// Fallback to auto-assignment if no spells were selected
					const assignedSpells = assignSpellsToCharacter({
						className: completedCharacterData.className,
						level: completedCharacterData.finalLevel || 1,
						selectedFeatureChoices: characterInProgress.selectedFeatureChoices
					});
					(completedCharacterData as any).spells = assignedSpells;
					console.log('🔄 characterCompletion: Auto-assigned spells (no user selection):', assignedSpells.map((s: any) => s.spellName));
				}
			} catch (e) {
				console.warn('🔄 characterCompletion: Error parsing selected spells, falling back to auto-assignment:', e);
				// Fallback to auto-assignment
				const assignedSpells = assignSpellsToCharacter({
					className: completedCharacterData.className,
					level: completedCharacterData.finalLevel || 1,
					selectedFeatureChoices: characterInProgress.selectedFeatureChoices
				});
				(completedCharacterData as any).spells = assignedSpells;
			}
		} else {
			console.log('🔄 characterCompletion: No spell processing - className or selectedSpells missing:', {
				className: completedCharacterData.className,
				hasSelectedSpells: !!characterState.selectedSpells
			});
		}

		// Handle user-selected maneuvers
		if (characterState.selectedManeuvers) {
			try {
				const selectedManeuverNames = JSON.parse(characterState.selectedManeuvers);
				if (Array.isArray(selectedManeuverNames) && selectedManeuverNames.length > 0) {
					// Convert selected maneuver names to ManeuverData objects
					const userSelectedManeuvers = selectedManeuverNames.map((maneuverName: string) => {
						const fullManeuver = allManeuvers.find(m => m.name === maneuverName);
						if (fullManeuver) {
							return {
								id: `maneuver_${Date.now()}_${Math.random()}`,
								maneuverName: fullManeuver.name,
								type: fullManeuver.type,
								cost: fullManeuver.cost,
								description: fullManeuver.description,
								isReaction: fullManeuver.isReaction,
								trigger: fullManeuver.trigger,
								requirement: fullManeuver.requirement,
								notes: ''
							};
						}
						return null;
					}).filter(Boolean);

					// Save the selected maneuver names as a string for edit functionality
					completedCharacterData.selectedManeuvers = characterState.selectedManeuvers;
					// Also add maneuvers to the completed character data as a separate property for display
					(completedCharacterData as any).maneuvers = userSelectedManeuvers;
					console.log('🔄 characterCompletion: User selected maneuvers assigned:', userSelectedManeuvers.map((m: any) => m.maneuverName));
				}
			} catch (e) {
				console.warn('🔄 characterCompletion: Error parsing selected maneuvers:', e);
			}
		}

        // Save to local storage with initialized CharacterState (single source of truth)
        const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
        const initialState = initializeCharacterState(completedCharacterData as any, null);
        existingCharacters.push({
            ...completedCharacterData,
            characterState: initialState
        });
        localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
        // Also ensure legacy fields and breakdowns are synced via centralized saver
        saveCharacterState(String((completedCharacterData as any).id), initialState);
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
