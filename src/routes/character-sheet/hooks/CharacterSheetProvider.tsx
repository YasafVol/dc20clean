import React, { createContext, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import {
	useCharacterSheetReducer,
	type SheetState,
	type SheetAction
} from './useCharacterSheetReducer';
import { getCharacterById, saveCharacter } from '../../../lib/utils/storageUtils';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../../../lib/services/enhancedCharacterCalculator';
import { ancestriesData } from '../../../lib/rulesdata/ancestries/ancestries';
import { traitsData } from '../../../lib/rulesdata/ancestries/traits';
import { tradesData } from '../../../lib/rulesdata/trades';
import {
	findClassByName,
	getLegacyChoiceId,
	getDisplayLabel
} from '../../../lib/rulesdata/loaders/class-features.loader';
import { getDetailedClassFeatureDescription } from '../../../lib/utils/classFeatureDescriptions';

/**
 * Converts the movements array from calculator into the movement structure for SavedCharacter
 */
function processMovementsToStructure(
	movements: Array<{ type: string; speed: string; source: any }>,
	groundSpeed: number
): {
	burrow: { half: boolean; full: boolean };
	swim: { half: boolean; full: boolean };
	fly: { half: boolean; full: boolean };
	climb: { half: boolean; full: boolean };
	glide: { half: boolean; full: boolean };
} {
	const movement = {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};

	for (const m of movements) {
		const type = m.type as keyof typeof movement;
		if (!movement[type]) continue; // Skip unknown movement types

		const speedValue = parseInt(m.speed, 10);
		if (isNaN(speedValue)) continue; // Skip if speed is not a number

		// Determine if movement is half or full speed
		const halfSpeed = Math.floor(groundSpeed / 2);
		if (speedValue >= groundSpeed) {
			movement[type].full = true;
		} else if (speedValue >= halfSpeed) {
			movement[type].half = true;
		}
	}

	return movement;
}

// Simple debounce utility
function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number
): T & { cancel: () => void } {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	) as T & { cancel: () => void };

	debouncedCallback.cancel = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	return debouncedCallback;
}

// Context type that components will consume
interface CharacterSheetContextType {
	state: SheetState;
	dispatch: React.Dispatch<SheetAction>;
	// Helper functions from the reducer
	updateHP: (hp: number) => void;
	updateSP: (sp: number) => void;
	updateMP: (mp: number) => void;
	updateTempHP: (tempHP: number) => void;
	updateActionPoints: (ap: number) => void;
	updateExhaustion: (level: number) => void;
	updateDeathStep: (steps: number, isDead?: boolean) => void;
	setManualDefense: (pd?: number, ad?: number, pdr?: number) => void;
	addAttack: (attack: any) => void;
	removeAttack: (attackId: string) => void;
	updateAttack: (attackId: string, attack: any) => void;
	addSpell: (spell: any) => void;
	removeSpell: (spellId: string) => void;
	updateSpell: (spellId: string, field: string, value: any) => void;
	addManeuver: (maneuver: any) => void;
	removeManeuver: (maneuverId: string) => void;
	updateInventory: (items: any[]) => void;
	updateCurrency: (gold?: number, silver?: number, copper?: number) => void;
	updateNotes: (notes: string) => void;
	updateGritPoints: (grit: number) => void;
	updateRestPoints: (rest: number) => void;
	// Manual save function
	saveNow: () => Promise<void>;
}

const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

interface CharacterSheetProviderProps {
	children: React.ReactNode;
	characterId: string;
}

export function CharacterSheetProvider({ children, characterId }: CharacterSheetProviderProps) {
	const {
		state,
		dispatch,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateActionPoints,
		updateExhaustion,
		updateDeathStep,
		setManualDefense,
		addAttack,
		removeAttack,
		updateAttack,
		addSpell,
		removeSpell,
		updateSpell,
		addManeuver,
		removeManeuver,
		updateInventory,
		updateCurrency,
		updateNotes,
		updateGritPoints,
		updateRestPoints
	} = useCharacterSheetReducer();

	// Save function that runs enhanced calculator and persists to storage
	const saveCharacterData = useCallback(async (character: SavedCharacter) => {
		if (!character) return;

		console.log('Saving character data:', character.id);

		try {
			// Run enhanced calculator to get updated stats
			const calculationData = convertToEnhancedBuildData(character);
			const calculationResult = calculateCharacterWithBreakdowns(calculationData);

		// Update character with calculated values and original resource maxes
		const updatedCharacter: SavedCharacter = {
			...character,
			movement: processMovementsToStructure(
				calculationResult.movements || [],
				calculationResult.stats.finalMoveSpeed
			),
			holdBreath: calculationResult.stats.finalMight,
			characterState: {
				...character.characterState,
				resources: {
					...character.characterState.resources,
					original: {
						maxHP: calculationResult.stats.finalHPMax || 0,
						maxSP: calculationResult.stats.finalSPMax || 0,
						maxMP: calculationResult.stats.finalMPMax || 0,
						maxGritPoints: calculationResult.stats.finalGritPoints || 0,
						maxRestPoints: calculationResult.stats.finalRestPoints || 0
					}
				}
			}
		};

			// Save the entire character (includes spells, maneuvers, etc.)
			await saveCharacter(updatedCharacter);

			console.log('Character sheet data saved successfully');
		} catch (error) {
			console.warn('Calculator error during save, proceeding with last known values:', error);
			// Save anyway with existing character data
			try {
				await saveCharacter(character);
			} catch (saveError) {
				console.error('Failed to save character data:', saveError);
			}
		}
	}, []);

	// Debounced save function
	const debouncedSave = useDebounce(saveCharacterData, 2000);

	// Effect to auto-save when state changes
	useEffect(() => {
		if (state.character) {
			debouncedSave(state.character);
		}
		// Clean up on unmount
		return () => debouncedSave.cancel();
	}, [state.character, debouncedSave]);

	// Effect to load character data on mount
	useEffect(() => {
		const loadCharacter = async () => {
			try {
				dispatch({ type: 'LOAD_START' });
				const characterData = await getCharacterById(characterId);
				if (characterData) {
					dispatch({ type: 'LOAD_SUCCESS', character: characterData });
				} else {
					dispatch({ type: 'LOAD_ERROR', error: 'Character not found' });
				}
			} catch (error) {
				console.error('Error loading character:', error);
				dispatch({
					type: 'LOAD_ERROR',
					error: `Failed to load character: ${error instanceof Error ? error.message : 'Unknown error'}`
				});
			}
		};
		loadCharacter();
	}, [characterId, dispatch]);

	// Manual save function exposed through context
	const saveNow = useCallback(async () => {
		if (state.character) {
			// Cancel any pending debounced save
			debouncedSave.cancel();
			await saveCharacterData(state.character);
		}
	}, [state.character, saveCharacterData, debouncedSave]);

	const contextValue: CharacterSheetContextType = {
		state,
		dispatch,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateActionPoints,
		updateExhaustion,
		updateDeathStep,
		setManualDefense,
		addAttack,
		removeAttack,
		updateAttack,
		addSpell,
		removeSpell,
		updateSpell,
		addManeuver,
		removeManeuver,
		updateInventory,
		updateCurrency,
		updateNotes,
		updateGritPoints,
		updateRestPoints,
		saveNow
	};

	return (
		<CharacterSheetContext.Provider value={contextValue}>{children}</CharacterSheetContext.Provider>
	);
}

// Custom hook to consume the context
export function useCharacterSheet() {
	const context = useContext(CharacterSheetContext);
	if (context === undefined) {
		throw new Error('useCharacterSheet must be used within a CharacterSheetProvider');
	}
	return context;
}

// Selector hooks for commonly accessed data
export function useCharacterResources() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character?.characterState?.resources) return null;

		const resources = state.character.characterState.resources;
		const current = resources.current;

		// Handle cases where original might be missing (legacy data)
		const original = resources.original || {
			maxHP: state.character.finalHPMax || 0,
			maxSP: state.character.finalSPMax || 0,
			maxMP: state.character.finalMPMax || 0,
			maxGritPoints: state.character.finalGritPoints || 0,
			maxRestPoints: state.character.finalRestPoints || 0
		};

		// Clamp/sync Rest Points current to calculated max (handles ancestry HP bonuses changing max)
		const adjustedCurrent = {
			...current,
			currentRestPoints:
				current.currentRestPoints && current.currentRestPoints > 0
					? Math.min(current.currentRestPoints, original.maxRestPoints)
					: original.maxRestPoints
		};

		return {
			current: adjustedCurrent,
			original,
			// Derived values
			hpPercentage: original.maxHP > 0 ? (adjustedCurrent.currentHP / original.maxHP) * 100 : 0,
			spPercentage: original.maxSP > 0 ? (adjustedCurrent.currentSP / original.maxSP) * 100 : 0,
			mpPercentage: original.maxMP > 0 ? (adjustedCurrent.currentMP / original.maxMP) * 100 : 0
		};
	}, [
		state.character?.characterState?.resources,
		state.character?.finalHPMax,
		state.character?.finalSPMax,
		state.character?.finalMPMax
	]);
}

export function useCharacterDefenses() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return null;

		// Get manual overrides from UI state
		const manualOverrides = state.character.characterState?.ui?.manualDefenseOverrides || {};

		// Get calculated base values (these would come from character calculation)
		const baseDefenses = {
			PD: state.character.finalPD || 0,
			AD: state.character.finalAD || 0,
			PDR: state.character.finalPDR || 0
		};

		// Return effective values (manual override takes precedence)
		return {
			PD: manualOverrides.PD ?? baseDefenses.PD,
			AD: manualOverrides.AD ?? baseDefenses.AD,
			PDR: manualOverrides.PDR ?? baseDefenses.PDR,
			manualOverrides
		};
	}, [state.character]);
}

export function useCharacterAttacks() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		return state.character?.characterState?.attacks || [];
	}, [state.character?.characterState?.attacks]);
}

export function useCharacterInventory() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		return (
			state.character?.characterState?.inventory || {
				items: [],
				currency: { goldPieces: 0, silverPieces: 0, copperPieces: 0 }
			}
		);
	}, [state.character?.characterState?.inventory]);
}

export function useCharacterSpells() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return state.character?.spells || [];
	}, [state.character?.spells]);
}

export function useCharacterManeuvers() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return state.character?.maneuvers || [];
	}, [state.character?.maneuvers]);
}

export function useCharacterFeatures() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;
		const features: any[] = [];

		// Get ancestry default traits
		const ancestry1 = ancestriesData.find((a) => a.name === character.ancestry1Name);
		if (ancestry1) {
			ancestry1.defaultTraitIds?.forEach((traitId) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait) {
					features.push({
						id: trait.id,
						name: trait.name,
						description: trait.description,
						source: 'ancestry',
						sourceDetail: `${ancestry1.name} (Default)`
					});
				}
			});
		}

		// Get selected ancestry traits
		if (character.selectedTraitIds) {
			try {
				let selectedTraitIds: string[] = [];

				if (Array.isArray(character.selectedTraitIds)) {
					// Already an array
					selectedTraitIds = character.selectedTraitIds;
				} else {
					// Convert to string to handle parsing
					const traitIdsStr = String(character.selectedTraitIds);

					// Handle both JSON string and comma-separated string formats
					if (traitIdsStr.startsWith('[') || traitIdsStr.startsWith('{')) {
						// Looks like JSON, try parsing
						selectedTraitIds = JSON.parse(traitIdsStr);
					} else {
						// Assume comma-separated string (legacy format)
						selectedTraitIds = traitIdsStr
							.split(',')
							.map((id: string) => id.trim())
							.filter((id: string) => id.length > 0);
					}
				}

				selectedTraitIds.forEach((traitId) => {
					const trait = traitsData.find((t) => t.id === traitId);
					if (trait) {
						// Check if this trait is not already added as default
						const alreadyAdded = features.some((f) => f.id === trait.id);
						if (!alreadyAdded) {
							const sourceAncestry = ancestriesData.find(
								(a) => a.expandedTraitIds.includes(traitId) || a.defaultTraitIds?.includes(traitId)
							);
							features.push({
								id: trait.id,
								name: trait.name,
								description: trait.description,
								source: 'ancestry',
								sourceDetail: `${sourceAncestry?.name || 'Unknown'} (Selected)`
							});
						}
					}
				});
			} catch (error) {
				console.error('Error parsing selected traits:', error);
				console.error('selectedTraitIds value:', character.selectedTraitIds);
			}
		}

		// Get class features from the new class features structure
		const selectedClassFeatures = findClassByName(character.className);

		if (selectedClassFeatures) {
			// Add level 1 core features
			selectedClassFeatures.coreFeatures
				.filter((feature: any) => feature.levelGained === 1)
				.forEach((feature: any) => {
					features.push({
						id: feature.featureName,
						name: feature.featureName,
						description: feature.description,
						source: 'class',
						sourceDetail: `${selectedClassFeatures.className} (Lvl 1)`
					});
				});

			// Add selected feature choices
			if (character.selectedFeatureChoices) {
				try {
					// Try to parse as JSON first
					let selectedChoices: { [key: string]: string } = {};

					// Handle new data structure - selectedFeatureChoices is already an object
					if (
						typeof character.selectedFeatureChoices === 'object' &&
						character.selectedFeatureChoices !== null
					) {
						selectedChoices = character.selectedFeatureChoices as { [key: string]: string };
					} else if (typeof character.selectedFeatureChoices === 'string') {
						// Legacy handling - try to parse as JSON string
						try {
							selectedChoices = JSON.parse(character.selectedFeatureChoices);
						} catch (jsonError) {
							// If JSON parsing fails, it might be legacy comma-separated data
							console.warn(
								'Failed to parse selectedFeatureChoices as JSON, attempting legacy format conversion:',
								character.selectedFeatureChoices
							);
							console.warn('Skipping feature choices processing due to legacy data format');
							return features;
						}
					}

					// Process each core feature that has choices
					selectedClassFeatures.coreFeatures.forEach((feature) => {
						if (feature.choices) {
							feature.choices.forEach((choice, choiceIndex) => {
								// Use the same mapping logic as the class-features loader
								const choiceId = getLegacyChoiceId(
									selectedClassFeatures.className,
									feature.featureName,
									choiceIndex
								);
								const selectedOptionValues = selectedChoices[choiceId];

								if (selectedOptionValues && choice.options) {
									if (choice.count > 1) {
										// Handle multiple selections (like cleric domains)
										let selectedValueArray: string[] = [];

										if (Array.isArray(selectedOptionValues)) {
											// New format - already an array
											selectedValueArray = selectedOptionValues;
										} else if (typeof selectedOptionValues === 'string') {
											// Legacy format - JSON string or comma-separated
											try {
												selectedValueArray = JSON.parse(selectedOptionValues);
											} catch (parseError) {
												// Try comma-separated format
												selectedValueArray = selectedOptionValues.split(',').map((v) => v.trim());
											}
										} else {
											console.warn('Unexpected format for choice values:', selectedOptionValues);
											return;
										}

										selectedValueArray.forEach((value) => {
											const selectedOption = choice.options?.find((opt) => opt.name === value);

											if (selectedOption) {
												// Get the detailed description
												let description = selectedOption.description || 'Feature choice selected.';
												const detailedDescription = getDetailedClassFeatureDescription(
													choiceId,
													value
												);
												if (detailedDescription) {
													description = detailedDescription;
												}

												// Use generic display label
												const displayLabel = getDisplayLabel(
													selectedClassFeatures.className,
													feature.featureName,
													choiceIndex
												);
												const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

												const featureToAdd = {
													id: `${choiceId}_${value}`,
													name: selectedOption.name,
													description: description,
													source: 'class' as const,
													sourceDetail: sourceDetail
												};
												features.push(featureToAdd);
											}
										});
									} else {
										// Handle single selections
										const selectedOption = choice.options?.find(
											(opt) => opt.name === selectedOptionValues
										);
										if (selectedOption) {
											// Get the detailed description
											let description = selectedOption.description || 'Feature choice selected.';
											const detailedDescription = getDetailedClassFeatureDescription(
												choiceId,
												selectedOptionValues
											);
											if (detailedDescription) {
												description = detailedDescription;
											}

											// Use generic display label
											const displayLabel = getDisplayLabel(
												selectedClassFeatures.className,
												feature.featureName,
												choiceIndex
											);
											const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

											features.push({
												id: `${choiceId}_${selectedOptionValues}`,
												name: selectedOption.name,
												description: description,
												source: 'class',
												sourceDetail: sourceDetail
											});
										}
									}
								}
							});
						}
					});
				} catch (error) {
					console.error('Error processing selected feature choices:', error);
				}
			}
		}

		return features;
	}, [state.character]);
}

export function useCharacterCurrency() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return (
			state.character?.characterState?.inventory?.currency || {
				goldPieces: 0,
				silverPieces: 0,
				copperPieces: 0
			}
		);
	}, [state.character?.characterState?.inventory?.currency]);
}

// Hook for calculated character data with breakdowns
export function useCharacterCalculatedData() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return null;

		// Convert SavedCharacter to EnhancedCharacterBuildData
		const buildData = convertToEnhancedBuildData(state.character);
		// Run calculation to get CharacterSheetData with breakdowns
		const calculationResult = calculateCharacterWithBreakdowns(buildData);
		return calculationResult;
	}, [state.character]);
}

// Hook for character knowledge data
export function useCharacterKnowledge() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;

		// Parse character's trade proficiencies (knowledge is stored in tradesData)
		let characterTrades: Record<string, number> = {};
		if (character?.tradesData) {
			characterTrades = character.tradesData;
		}

		// Show ALL knowledge skills with their proficiency levels and calculated bonuses
		const knowledgeWithProficiency = tradesData
			.filter((trade) => trade.tools === 'none')
			.map((knowledge) => {
				const proficiency = characterTrades[knowledge.id] || 0;
				const masteryBonus = proficiency * 2;

				// Get attribute modifier based on knowledge's attribute association
				let attributeModifier = 0;
				switch (knowledge.attributeAssociation.toLowerCase()) {
					case 'might':
						attributeModifier = character?.finalMight || 0;
						break;
					case 'agility':
						attributeModifier = character?.finalAgility || 0;
						break;
					case 'charisma':
						attributeModifier = character?.finalCharisma || 0;
						break;
					case 'intelligence':
						attributeModifier = character?.finalIntelligence || 0;
						break;
					default:
						attributeModifier = 0;
				}

				const totalBonus = attributeModifier + masteryBonus;

				return {
					id: knowledge.id,
					name: knowledge.name,
					proficiency,
					bonus: totalBonus
				};
			});

		return knowledgeWithProficiency;
	}, [
		state.character?.tradesData,
		state.character?.finalMight,
		state.character?.finalAgility,
		state.character?.finalCharisma,
		state.character?.finalIntelligence
	]);
}

// Hook for character trades data
export function useCharacterTrades() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;

		// Parse character's trade proficiencies
		let characterTrades: Record<string, number> = {};
		if (character?.tradesData) {
			characterTrades = character.tradesData;
		}

		// Only show trades that have been selected (proficiency > 0) from tradesData only
		const filteredTrades = tradesData
			.filter((trade) => {
				return characterTrades[trade.id] && characterTrades[trade.id] > 0;
			})
			.map((trade) => {
				const proficiency = characterTrades[trade.id] || 0;
				const masteryBonus = proficiency * 2;

				// Get attribute modifier based on trade's attribute association
				let attributeModifier = 0;
				switch (trade.attributeAssociation.toLowerCase()) {
					case 'might':
						attributeModifier = character?.finalMight || 0;
						break;
					case 'agility':
						attributeModifier = character?.finalAgility || 0;
						break;
					case 'charisma':
						attributeModifier = character?.finalCharisma || 0;
						break;
					case 'intelligence':
						attributeModifier = character?.finalIntelligence || 0;
						break;
					default:
						attributeModifier = 0;
				}

				const totalBonus = attributeModifier + masteryBonus;

				return {
					id: trade.id,
					name: trade.name,
					proficiency,
					bonus: totalBonus
				};
			});

		return filteredTrades;
	}, [
		state.character?.tradesData,
		state.character?.finalMight,
		state.character?.finalAgility,
		state.character?.finalCharisma,
		state.character?.finalIntelligence
	]);
}

// Hook for character languages
export function useCharacterLanguages() {
	const { state } = useCharacterSheet();
	return React.useMemo(() => {
		if (!state.character?.languagesData) {
			return [];
		}
		try {
			const languagesFromDB = state.character.languagesData;
			return Object.entries(languagesFromDB)
				.filter(([_, data]: [string, any]) => data.fluency !== 'none')
				.map(([langId, data]: [string, any]) => ({
					id: langId,
					name: data.name || langId.charAt(0).toUpperCase() + langId.slice(1),
					fluency: data.fluency as 'limited' | 'fluent'
				}));
		} catch (error) {
			console.error('Error parsing languages JSON:', error);
			return [];
		}
	}, [state.character?.languagesData]);
}
