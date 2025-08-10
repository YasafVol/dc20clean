// Shared character completion service - UPDATED: Uses typed data contracts
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { assignSpellsToCharacter } from './spellAssignment';
import { allSpells } from '../rulesdata/spells-data/spells';
import { allManeuvers } from '../rulesdata/maneuvers';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import { getDefaultCharacterState } from '../utils/storageUtils';
import { getAllSavedCharacters, saveAllCharacters } from '../utils/storageUtils';
import type { SavedCharacter } from '../types/dataContracts';

export interface CharacterCompletionCallbacks {
	onShowSnackbar: (message: string) => void;
	onNavigateToLoad: () => void;
}

export const completeCharacter = async (
	characterState: any,
	callbacks: CharacterCompletionCallbacks
): Promise<void> => {
	try {
		// Build the enhanced data for calculation (still uses attribute_ for calculator)
		const enhancedData = convertToEnhancedBuildData({
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
			selectedTraitIds: characterState.selectedTraitIds || [],
			selectedFeatureChoices: characterState.selectedFeatureChoices || {},
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			skillsJson: JSON.stringify(characterState.skillsData || {}),
			tradesJson: JSON.stringify(characterState.tradesData || {}),
			languagesJson: JSON.stringify(characterState.languagesData || {}),
			createdAt: new Date(),
			completedAt: new Date().toISOString()
		});

		console.log('Calculating stats for character using enhanced calculator');

		// Run the enhanced calculator
		const calculationResult = calculateCharacterWithBreakdowns(enhancedData);

		// Create the final character with unified 'final*' schema
		const completedCharacter: SavedCharacter = {
			id: Date.now().toString(),
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			level: characterState.level || 1,
			classId: characterState.classId,
			className: calculationResult.stats.className || 'Unknown',
			ancestry1Id: characterState.ancestry1Id,
			ancestry1Name: characterState.ancestry1Name || 'Human', // TODO: Get from ancestry data
			ancestry2Id: characterState.ancestry2Id,
			ancestry2Name: calculationResult.stats.ancestry2Name || null,
			
			// Map from calculation result to final* schema
			finalMight: calculationResult.stats.finalMight,
			finalAgility: calculationResult.stats.finalAgility,
			finalCharisma: calculationResult.stats.finalCharisma,
			finalIntelligence: calculationResult.stats.finalIntelligence,
			finalPrimeModifierValue: calculationResult.stats.finalPrimeModifierValue || 0,
			finalPrimeModifierAttribute: calculationResult.stats.finalPrimeModifierAttribute || 'might',
			finalCombatMastery: calculationResult.stats.finalCombatMastery || 1,
			finalSaveMight: calculationResult.stats.finalSaveMight,
			finalSaveAgility: calculationResult.stats.finalSaveAgility,
			finalSaveCharisma: calculationResult.stats.finalSaveCharisma,
			finalSaveIntelligence: calculationResult.stats.finalSaveIntelligence,
			finalHPMax: calculationResult.stats.finalHPMax,
			finalSPMax: calculationResult.stats.finalSPMax,
			finalMPMax: calculationResult.stats.finalMPMax,
			finalPD: calculationResult.stats.finalPD,
			finalAD: calculationResult.stats.finalAD,
			finalPDR: calculationResult.stats.finalPDR,
			finalSaveDC: calculationResult.stats.finalSaveDC,
			finalDeathThreshold: calculationResult.stats.finalDeathThreshold,
			finalMoveSpeed: calculationResult.stats.finalMoveSpeed,
			finalJumpDistance: calculationResult.stats.finalJumpDistance,
			finalRestPoints: calculationResult.stats.finalRestPoints,
			finalGritPoints: calculationResult.stats.finalGritPoints,
			finalInitiativeBonus: calculationResult.stats.finalInitiativeBonus,
			
			// Store typed data directly (no more JSON strings)
			selectedTraitIds: characterState.selectedTraitIds || [],
			selectedFeatureChoices: characterState.selectedFeatureChoices || {},
			skillsData: characterState.skillsData || {},
			tradesData: characterState.tradesData || {},
			languagesData: characterState.languagesData || [],
			spells: [], // Will be populated below
			maneuvers: [], // Will be populated below
			
			// Store calculation breakdowns for transparency
			breakdowns: calculationResult.breakdowns || {},
			
			// Initialize default character state
			characterState: getDefaultCharacterState(),
			
			// Metadata
			createdAt: new Date().toISOString(),
			lastModified: new Date().toISOString(),
			completedAt: new Date().toISOString(),
			schemaVersion: '2.0.0'
		};
		
		console.log('Character stats calculated:', completedCharacter);
		console.log('Class info saved:', {
			classId: completedCharacter.classId,
			className: completedCharacter.className
		});
		console.log('Ancestry info saved:', {
			ancestry1Id: completedCharacter.ancestry1Id,
			ancestry1Name: completedCharacter.ancestry1Name,
			ancestry2Id: completedCharacter.ancestry2Id,
			ancestry2Name: completedCharacter.ancestry2Name
		});

		// Process user-selected spells from character creation
		if (completedCharacter.className && characterState.selectedSpells) {
			console.log('🔄 Processing user-selected spells:', {
				selectedSpells: characterState.selectedSpells,
				className: completedCharacter.className
			});

			try {
				// Handle both array (new) and JSON string (legacy) formats
				const selectedSpellNames = Array.isArray(characterState.selectedSpells)
					? characterState.selectedSpells
					: JSON.parse(characterState.selectedSpells);
				
				console.log('🔄 Parsed spell names:', selectedSpellNames);

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

					// Store typed spells data
					completedCharacter.spells = userSelectedSpells as any;
					console.log('🔄 User selected spells assigned:', userSelectedSpells.map((s: any) => s.spellName));
				} else {
					console.log('🔄 No user spells selected, falling back to auto-assignment');
					// Fallback to auto-assignment if no spells were selected
					const assignedSpells = assignSpellsToCharacter({
						className: completedCharacter.className,
						level: completedCharacter.level || 1,
						selectedFeatureChoices: JSON.stringify(completedCharacter.selectedFeatureChoices)
					});
					completedCharacter.spells = assignedSpells as any;
					console.log('🔄 Auto-assigned spells (no user selection):', assignedSpells.map((s: any) => s.spellName));
				}
			} catch (e) {
				console.warn('🔄 Error parsing selected spells, falling back to auto-assignment:', e);
				// Fallback to auto-assignment
				const assignedSpells = assignSpellsToCharacter({
					className: completedCharacter.className,
					level: completedCharacter.level || 1,
					selectedFeatureChoices: JSON.stringify(completedCharacter.selectedFeatureChoices)
				});
				completedCharacter.spells = assignedSpells as any;
			}
		}

		// Handle user-selected maneuvers
		if (characterState.selectedManeuvers) {
			try {
				// Handle both array (new) and JSON string (legacy) formats
				const selectedManeuverNames = Array.isArray(characterState.selectedManeuvers)
					? characterState.selectedManeuvers
					: JSON.parse(characterState.selectedManeuvers);
					
				if (Array.isArray(selectedManeuverNames) && selectedManeuverNames.length > 0) {
					// Convert selected maneuver names to ManeuverData objects
					const userSelectedManeuvers = selectedManeuverNames.map((maneuverName: string) => {
						const fullManeuver = allManeuvers.find(m => m.name === maneuverName);
						if (fullManeuver) {
							return {
								id: `maneuver_${Date.now()}_${Math.random()}`,
								name: fullManeuver.name,
								type: fullManeuver.type,
								cost: fullManeuver.cost,
								description: fullManeuver.description,
								isReaction: fullManeuver.isReaction,
								notes: ''
							};
						}
						return null;
					}).filter(Boolean);

					// Store typed maneuvers data
					completedCharacter.maneuvers = userSelectedManeuvers as any;
					console.log('🔄 User selected maneuvers assigned:', userSelectedManeuvers.map((m: any) => m.name));
				}
			} catch (e) {
				console.warn('🔄 Error parsing selected maneuvers:', e);
			}
		}

        // OPTIMIZED: Save using new typed storage utilities
        const existingCharacters = getAllSavedCharacters();
        existingCharacters.push(completedCharacter);
        saveAllCharacters(existingCharacters);
        
        console.log('🚀 OPTIMIZED: Character saved using typed contracts. Total characters:', existingCharacters.length);

		// Show success snackbar
		callbacks.onShowSnackbar('Character created successfully!');

		// Navigate to load characters page after a short delay
		setTimeout(() => {
			console.log('Navigating to character load page...');
			callbacks.onNavigateToLoad();
		}, 1500);

		console.log('🚀 Character completed with typed data contracts:', completedCharacter);
	} catch (error) {
		console.error('Error completing character:', error);
		callbacks.onShowSnackbar('Error creating character. Please try again.');
	}
};
