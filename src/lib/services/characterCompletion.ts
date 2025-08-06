// Shared character completion service
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { calculateCharacterStats, type CharacterInProgressData } from './characterCalculator';
import { assignSpellsToCharacter } from './spellAssignment';
import { allSpells } from '../rulesdata/spells-data/spells';
import { allManeuvers } from '../rulesdata/maneuvers';

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
		const characterInProgress: CharacterInProgressData = {
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

		// Calculate all derived stats using DC20 rules
		const completedCharacterData = await calculateCharacterStats(characterInProgress);
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
