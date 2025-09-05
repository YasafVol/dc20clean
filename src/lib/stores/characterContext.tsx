import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import type { CharacterInProgress } from '@prisma/client';
import { traitsData } from '../rulesdata/ancestries/traits';
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
import { classesData } from '../rulesdata/loaders/class.loader';

import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../services/enhancedCharacterCalculator';
import type { EnhancedCalculationResult } from '../types/effectSystem';

// Define the shape of the data stored in the character store
export interface CharacterInProgressStoreData
	extends Omit<
		CharacterInProgress,
		| 'selectedTraitIds'
		| 'selectedFeatureChoices'
		| 'skillsJson'
		| 'tradesJson'
		| 'languagesJson'
		| 'selectedTraitChoices'
		| 'selectedSpells'
		| 'selectedManeuvers'
	> {
	currentStep: number;
	overflowTraitId: string | null;
	overflowAttributeName: string | null;
	level: number;
	combatMastery: number;
	selectedTraitIds: string[];
	selectedFeatureChoices: Record<string, any>;
	selectedTraitChoices: Record<string, string>;
	skillsData: Record<string, number>;
	tradesData: Record<string, number>;
	languagesData: Record<string, { fluency: 'limited' | 'fluent' }>;
	cachedEffectResults?: EnhancedCalculationResult;
	cacheTimestamp?: number;
	selectedSpells: string[];
	selectedManeuvers: string[];
	skillToTradeConversions?: number;
	tradeToSkillConversions?: number;
	tradeToLanguageConversions?: number;
	schemaVersion?: number;
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
	selectedTraitIds: [],
	ancestryPointsSpent: 0,
	classId: null,
	selectedFeatureChoices: {},
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
	skillsData: {},
	tradesData: {},
	languagesData: { common: { fluency: 'fluent' } },
	selectedTraitChoices: {},
	cachedEffectResults: undefined,
	cacheTimestamp: undefined,
	selectedSpells: [],
	selectedManeuvers: [],
	skillToTradeConversions: 0,
	tradeToSkillConversions: 0,
	tradeToLanguageConversions: 0,
	schemaVersion: 2
};

// Action types
type CharacterAction =
	| { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
	| { type: 'UPDATE_SKILLS'; skillsData: Record<string, number> }
	| { type: 'UPDATE_TRADES'; tradesData: Record<string, number> }
	| { type: 'UPDATE_LANGUAGES'; languagesData: Record<string, { fluency: 'limited' | 'fluent' }> }
	| { type: 'SET_CLASS'; classId: string | null }
	| { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
	| { type: 'SET_TRAITS'; selectedTraitIds: string[] }
	| { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: Record<string, any> }
	| { type: 'UPDATE_TRAIT_CHOICE'; traitId: string; effectIndex: number; choice: string }
	| { type: 'INVALIDATE_CACHE' }
	| { type: 'UPDATE_SPELLS_AND_MANEUVERS'; spells: string[]; maneuvers: string[] }
	| { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
	| { type: 'INITIALIZE_FROM_SAVED'; character: CharacterInProgressStoreData }
	| { type: 'NEXT_STEP' }
	| { type: 'PREVIOUS_STEP' }
	| { type: 'SET_STEP'; step: number }
	| {
			type: 'SET_CONVERSIONS';
			conversions: { skillToTrade?: number; tradeToSkill?: number; tradeToLanguage?: number };
	  };

// Reducer function
function characterReducer(
	state: CharacterInProgressStoreData,
	action: CharacterAction
): CharacterInProgressStoreData {
	switch (action.type) {
		case 'UPDATE_ATTRIBUTE':
			return { ...state, [action.attribute]: action.value };
		case 'UPDATE_SKILLS':
			return { ...state, skillsData: action.skillsData };
		case 'UPDATE_TRADES':
			return { ...state, tradesData: action.tradesData };
		case 'UPDATE_LANGUAGES':
			return { ...state, languagesData: action.languagesData };
		case 'SET_CLASS':
			return { ...state, classId: action.classId };
		case 'SET_ANCESTRY':
			return { ...state, ancestry1Id: action.ancestry1Id, ancestry2Id: action.ancestry2Id };
		case 'SET_TRAITS':
			return { ...state, selectedTraitIds: action.selectedTraitIds };
		case 'SET_FEATURE_CHOICES':
			return { ...state, selectedFeatureChoices: action.selectedFeatureChoices };
		case 'UPDATE_TRAIT_CHOICE': {
			const currentChoices = { ...state.selectedTraitChoices };
			const choiceKey = `${action.traitId}-${action.effectIndex}`;
			if (action.choice === '') {
				delete currentChoices[choiceKey];
			} else {
				currentChoices[choiceKey] = action.choice;
			}
			return {
				...state,
				selectedTraitChoices: currentChoices,
				cachedEffectResults: undefined,
				cacheTimestamp: undefined
			};
		}
		case 'INVALIDATE_CACHE':
			return { ...state, cachedEffectResults: undefined, cacheTimestamp: undefined };
		case 'UPDATE_SPELLS_AND_MANEUVERS':
			return { ...state, selectedSpells: action.spells, selectedManeuvers: action.maneuvers };
		case 'UPDATE_STORE':
			return { ...state, ...action.updates };
		case 'INITIALIZE_FROM_SAVED':
			return { ...action.character };
		case 'NEXT_STEP':
			return { ...state, currentStep: Math.min(state.currentStep + 1, 7) };
		case 'PREVIOUS_STEP':
			return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
		case 'SET_STEP':
			return { ...state, currentStep: Math.max(1, Math.min(action.step, 7)) };
		case 'SET_CONVERSIONS':
			return {
				...state,
				skillToTradeConversions:
					action.conversions.skillToTrade ?? state.skillToTradeConversions ?? 0,
				tradeToSkillConversions:
					action.conversions.tradeToSkill ?? state.tradeToSkillConversions ?? 0,
				tradeToLanguageConversions:
					action.conversions.tradeToLanguage ?? state.tradeToLanguageConversions ?? 0
			};
		default:
			return state;
	}
}

// Context type
interface CharacterContextType {
	state: CharacterInProgressStoreData;
	dispatch: React.Dispatch<CharacterAction>;
	// New centralized calculation result only
	calculationResult: EnhancedCalculationResult;
	attributePointsRemaining: number;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);

	// The new central engine runs on every state change
	const calculationResult = useMemo(() => {
		const buildData = convertToEnhancedBuildData(state);
		return calculateCharacterWithBreakdowns(buildData);
	}, [state]);

	// Removed legacy derived values; all consumers should use calculationResult instead

	// NEW: Calculate attribute points remaining
	const attributePointsRemaining = useMemo(() => {
		const totalAttributePoints = calculationResult.stats.finalAttributePoints ?? 12;
		const attributePointsSpent =
			(state.attribute_might + 2) +
			(state.attribute_agility + 2) +
			(state.attribute_charisma + 2) +
			(state.attribute_intelligence + 2);
		return totalAttributePoints - attributePointsSpent;
	}, [
		calculationResult.stats.finalAttributePoints,
		state.attribute_might,
		state.attribute_agility,
		state.attribute_charisma,
		state.attribute_intelligence
	]);

	// Provide both the new result and the old values
	const contextValue: CharacterContextType = useMemo(
		() => ({
			state,
			dispatch,
			calculationResult,
			attributePointsRemaining
		}),
		[state, dispatch, calculationResult, attributePointsRemaining]
	);

	return (
		<CharacterContext.Provider value={contextValue}>
			{children}
		</CharacterContext.Provider>
	);
}

export function useCharacter() {
	const context = useContext(CharacterContext);
	if (context === undefined) {
		throw new Error('useCharacter must be used within a CharacterProvider');
	}
	return context;
}
