import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CharacterInProgress } from '@prisma/client';
import { traitsData } from '../rulesdata/_new_schema/traits';
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
import { classesData } from '../rulesdata/loaders/class.loader';
import { calculateTraitCosts } from '../utils/traitCosts';

// Define the shape of the data stored in the character store
export interface CharacterInProgressStoreData extends CharacterInProgress {
	currentStep: number;
	overflowTraitId: string | null;
	overflowAttributeName: string | null;
	level: number;
	combatMastery: number;
	// Background selections (Step 3: Skills, Trades, Languages)
	skillsJson: string;
	tradesJson: string;
	languagesJson: string;

	// NEW: Enhanced effect system support
	selectedTraitChoices: string; // JSON string of trait choices
	cachedEffectResults?: string; // JSON string of cached calculation results
	cacheTimestamp?: number;
	// Spells and Maneuvers selections
	selectedSpells: string;
	selectedManeuvers: string;
}

// Initial state for the store
const initialCharacterInProgressState: CharacterInProgressStoreData = {
	id: '',
	attribute_might: -2,
	attribute_agility: -2,
	attribute_charisma: -2,
	attribute_intelligence: -2,
	pointsSpent: 0,
	level: 1,
	combatMastery: 1,
	ancestry1Id: null,
	ancestry2Id: null,
	selectedTraitIds: '',
	ancestryPointsSpent: 0,
	classId: null,
	selectedFeatureChoices: '',
	saveMasteryMight: false,
	saveMasteryAgility: false,
	saveMasteryCharisma: false,
	saveMasteryIntelligence: false,
	finalName: null,
	finalPlayerName: null,
	createdAt: new Date(),
	updatedAt: new Date(),
	currentStep: 1,
	overflowTraitId: null,
	overflowAttributeName: null,
	// Background selections (Step 3: Skills, Trades, Languages)
	skillsJson: '{}',
	tradesJson: '{}',
	languagesJson: '{"common": {"fluency": "fluent"}}',

	// NEW: Enhanced effect system support
	selectedTraitChoices: '{}',
	cachedEffectResults: undefined,
	cacheTimestamp: undefined,
	languagesJson: '{"common": {"fluency": "fluent"}}',
	// Spells and Maneuvers selections
	selectedSpells: '[]',
	selectedManeuvers: '[]'
};

// Action types
type CharacterAction =
	| { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
	| { type: 'UPDATE_SKILLS'; skillsJson: string }
	| { type: 'UPDATE_TRADES'; tradesJson: string }
	| { type: 'UPDATE_LANGUAGES'; languagesJson: string }
	| { type: 'SET_CLASS'; classId: string | null }
	| { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
	| { type: 'SET_TRAITS'; selectedTraitIds: string }
	| { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: string }
	| { type: 'SET_TRAIT_CHOICES'; selectedTraitChoices: string }
	| { type: 'UPDATE_TRAIT_CHOICE'; traitId: string; effectIndex: number; choice: string }
	| { type: 'INVALIDATE_CACHE' }
	| { type: 'UPDATE_SPELLS_AND_MANEUVERS'; spells: string[]; maneuvers: string[] }
	| { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
	| { type: 'INITIALIZE_FROM_SAVED'; character: CharacterInProgressStoreData }
	| { type: 'NEXT_STEP' }
	| { type: 'PREVIOUS_STEP' }
	| { type: 'SET_STEP'; step: number };

// Reducer function
function characterReducer(
	state: CharacterInProgressStoreData,
	action: CharacterAction
): CharacterInProgressStoreData {
	switch (action.type) {
		case 'UPDATE_ATTRIBUTE':
			return {
				...state,
				[action.attribute]: action.value
			};
		case 'UPDATE_SKILLS':
			return {
				...state,
				skillsJson: action.skillsJson
			};
		case 'UPDATE_TRADES':
			return {
				...state,
				tradesJson: action.tradesJson
			};
		case 'UPDATE_LANGUAGES':
			return {
				...state,
				languagesJson: action.languagesJson
			};
		case 'SET_CLASS':
			return {
				...state,
				classId: action.classId
			};
		case 'SET_ANCESTRY':
			return {
				...state,
				ancestry1Id: action.ancestry1Id,
				ancestry2Id: action.ancestry2Id
			};
		case 'SET_TRAITS':
			return {
				...state,
				selectedTraitIds: action.selectedTraitIds
			};
		case 'SET_FEATURE_CHOICES':
			return {
				...state,
				selectedFeatureChoices: action.selectedFeatureChoices
			};
		case 'SET_TRAIT_CHOICES':
			return {
				...state,
				selectedTraitChoices: action.selectedTraitChoices,
				cachedEffectResults: undefined, // Invalidate cache
				cacheTimestamp: undefined
			};
		case 'UPDATE_TRAIT_CHOICE':
			const currentChoices = JSON.parse(state.selectedTraitChoices || '{}');
			const choiceKey = `${action.traitId}-${action.effectIndex}`;
			if (action.choice === '') {
				delete currentChoices[choiceKey];
			} else {
				currentChoices[choiceKey] = action.choice;
			}
			return {
				...state,
				selectedTraitChoices: JSON.stringify(currentChoices),
				cachedEffectResults: undefined, // Invalidate cache
				cacheTimestamp: undefined
			};
		case 'INVALIDATE_CACHE':
			return {
				...state,
				cachedEffectResults: undefined,
				cacheTimestamp: undefined
			};
		case 'UPDATE_SPELLS_AND_MANEUVERS':
			console.log('🔄 CharacterContext: UPDATE_SPELLS_AND_MANEUVERS action:', {
				spells: action.spells,
				maneuvers: action.maneuvers
			});
			return {
				...state,
				selectedSpells: JSON.stringify(action.spells),
				selectedManeuvers: JSON.stringify(action.maneuvers)
			};
		case 'UPDATE_STORE':
			return {
				...state,
				...action.updates
			};
		case 'INITIALIZE_FROM_SAVED':
			console.log('🔄 CharacterContext: INITIALIZE_FROM_SAVED action:', {
				selectedSpells: action.character.selectedSpells,
				selectedManeuvers: action.character.selectedManeuvers
			});
			return {
				...action.character
			};
		case 'NEXT_STEP':
			return {
				...state,
				currentStep: Math.min(state.currentStep + 1, 7)
			};
		case 'PREVIOUS_STEP':
			return {
				...state,
				currentStep: Math.max(state.currentStep - 1, 1)
			};
		case 'SET_STEP':
			return {
				...state,
				currentStep: Math.max(1, Math.min(action.step, 7))
			};
		default:
			return state;
	}
}

// Context type
interface CharacterContextType {
	state: CharacterInProgressStoreData;
	dispatch: React.Dispatch<CharacterAction>;
	// Derived values
	attributePointsRemaining: number;
	attributePointsSpent: number;
	totalAttributePoints: number;
	ancestryPointsRemaining: number;
	ancestryPointsSpent: number;
	totalAncestryPoints: number;
	combatMastery: number;
	primeModifier: { name: string; value: number };
}

// Create context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);

	// Calculate attribute points from traits
	const calculateAttributePointsFromTraits = (): number => {
		if (!state.selectedTraitIds) return 0;

		try {
			const selectedTraitIds: string[] = JSON.parse(state.selectedTraitIds);
			let bonusPoints = 0;

			selectedTraitIds.forEach(traitId => {
				const trait = traitsData.find(t => t.id === traitId);
				if (trait) {
					trait.effects.forEach(effect => {
						if (effect.type === 'MODIFY_STAT' && effect.target === 'attributePoints') {
							bonusPoints += (effect.value as number);
						}
					});
				}
			});

			return bonusPoints;
		} catch (error) {
			console.warn('Error calculating attribute points from traits:', error);
			return 0;
		}
	};

	// Calculate total attribute points available (base 12 + trait bonuses)
	const totalAttributePoints = 12 + calculateAttributePointsFromTraits();
	
	// Calculate attribute points spent (current attributes - base of -2 each = +8 total)
	const attributePointsSpent = 
		(state.attribute_might + 2) +
		(state.attribute_agility + 2) +
		(state.attribute_charisma + 2) +
		(state.attribute_intelligence + 2);
		
	// Derived values
	const attributePointsRemaining = totalAttributePoints - attributePointsSpent;

	// Calculate ancestry points spent based on selected traits (default traits are free)
	const calculateAncestryPointsSpent = (): number => {
		if (!state.selectedTraitIds) return 0;

		try {
			const selectedTraitIds: string[] = JSON.parse(state.selectedTraitIds);
			return calculateTraitCosts(selectedTraitIds);
		} catch (error) {
			console.warn('Error calculating ancestry points:', error);
			return 0;
		}
	};

	// Calculate total ancestry points available (base + feature bonuses)
	const calculateTotalAncestryPoints = (): number => {
		let totalPoints = 5; // Base ancestry points

		// Add bonus ancestry points from feature choices
		if (state.classId && state.selectedFeatureChoices) {
			try {
				const selectedClass = classesData.find((c) => c.id.toLowerCase() === state.classId?.toLowerCase());
				const classFeatures = selectedClass ? findClassByName(selectedClass.name) : null;

				if (classFeatures) {
					const selectedChoices: { [key: string]: string } = JSON.parse(
						state.selectedFeatureChoices
					);
					const level1Features = classFeatures.coreFeatures.filter(
						(feature) => feature.levelGained === 1
					);

					level1Features.forEach((feature) => {
						if (feature.choices) {
							feature.choices.forEach((choice, choiceIndex) => {
								const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_${choiceIndex}`;
								const selectedOptions = selectedChoices[choiceId];

								if (selectedOptions) {
									let optionsToProcess: string[] = [];

									// Handle both single selection and multiple selection
									try {
										optionsToProcess = JSON.parse(selectedOptions);
										if (!Array.isArray(optionsToProcess)) {
											optionsToProcess = [selectedOptions];
										}
									} catch {
										optionsToProcess = [selectedOptions];
									}

									// Process each selected option for ancestry point bonuses
									optionsToProcess.forEach((optionName) => {
										const selectedOption = choice.options?.find((opt) => opt.name === optionName);
										if (selectedOption) {
											const description = selectedOption.description.toLowerCase();

											// Parse ancestry point bonuses: "you get X ancestry points"
											const ancestryMatch = description.match(
												/(?:you get|gain)\s*(\d+)\s*ancestry points?/i
											);
											if (ancestryMatch) {
												totalPoints += parseInt(ancestryMatch[1]);
											}
										}
									});
								}
							});
						}
					});
				}
			} catch (error) {
				console.warn('Error calculating ancestry point bonuses:', error);
			}
		}

		return totalPoints;
	};

	const ancestryPointsSpent = calculateAncestryPointsSpent();
	const totalAncestryPoints = calculateTotalAncestryPoints();
	const ancestryPointsRemaining = totalAncestryPoints - ancestryPointsSpent;

	const combatMastery = Math.ceil((state.level ?? 1) / 2);

	const primeModifier = (() => {
		const attributes = [
			{ name: 'Might', value: state.attribute_might },
			{ name: 'Agility', value: state.attribute_agility },
			{ name: 'Charisma', value: state.attribute_charisma },
			{ name: 'Intelligence', value: state.attribute_intelligence }
		];

		let highestAttribute = attributes[0];
		for (let i = 1; i < attributes.length; i++) {
			if (attributes[i].value > highestAttribute.value) {
				highestAttribute = attributes[i];
			}
		}

		return highestAttribute;
	})();

	const contextValue: CharacterContextType = {
		state,
		dispatch,
		attributePointsRemaining,
		attributePointsSpent,
		totalAttributePoints,
		ancestryPointsRemaining,
		ancestryPointsSpent,
		totalAncestryPoints,
		combatMastery,
		primeModifier
	};

	return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>;
}

// Custom hook to use the character context
export function useCharacter() {
	const context = useContext(CharacterContext);
	if (context === undefined) {
		throw new Error('useCharacter must be used within a CharacterProvider');
	}
	return context;
}

// Helper function to get an attribute's modifier
export function getModifier(attributeScore: number | null | undefined): number {
	return attributeScore ?? 0;
}
