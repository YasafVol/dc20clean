import React, { createContext, useContext, useReducer, useMemo, useEffect, ReactNode } from 'react';
import type { CharacterInProgress } from '../types/characterProgress.types';

import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../services/enhancedCharacterCalculator';
import type { EnhancedCalculationResult } from '../types/effectSystem';

// Key for storing character draft in sessionStorage
const CHARACTER_DRAFT_KEY = 'dc20_character_draft';

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
	usePrimeCapRule?: boolean;
	cachedEffectResults?: EnhancedCalculationResult;
	cacheTimestamp?: number;
	selectedSpells: Record<string, string>; // SlotID -> SpellID
	selectedManeuvers: string[];
	skillToTradeConversions?: number;
	tradeToSkillConversions?: number;
	tradeToLanguageConversions?: number;
	schemaVersion?: number;
	selectedTalents?: Record<string, number>; // Changed from string[] to count-based
	pathPointAllocations?: { martial?: number; spellcasting?: number };
	selectedMulticlassOption?:
	| 'novice'
	| 'adept'
	| 'expert'
	| 'master'
	| 'grandmaster'
	| 'legendary'
	| null;
	selectedMulticlassClass?: string;
	selectedMulticlassFeature?: string;
	selectedSubclass?: string; // Subclass selection (e.g., "Berserker" for Barbarian at Level 3)
	selectedCrossPathSpellList?: string; // Spell list chosen by martial class taking spellcaster path (DC20 v0.10 p.161)
	isLevelUpMode?: boolean; // Indicates character is being leveled up
	originalLevel?: number; // Store original level for comparison
	sourceCharacterId?: string; // Track which character is being leveled up
}

// Initial state for the store
const initialCharacterInProgressState: CharacterInProgressStoreData = {
	id: '',
	attribute_might: -2,
	attribute_agility: -2,
	attribute_charisma: -2,
	attribute_intelligence: -2,
	usePrimeCapRule: false,
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
	selectedSpells: {},
	selectedManeuvers: [],
	skillToTradeConversions: 0,
	tradeToSkillConversions: 0,
	tradeToLanguageConversions: 0,
	schemaVersion: 2
};

/**
 * Save character draft to sessionStorage (survives page reloads, cleared when tab closes)
 */
function saveCharacterDraft(state: CharacterInProgressStoreData): void {
	try {
		// Don't save if state is essentially empty (just initialized)
		const hasSignificantData = state.classId || state.ancestry1Id || state.finalName;
		if (!hasSignificantData) {
			return;
		}

		// Exclude non-serializable/cache fields
		const draftData = {
			...state,
			cachedEffectResults: undefined,
			cacheTimestamp: undefined,
			// Convert dates to ISO strings for serialization
			createdAt: state.createdAt instanceof Date ? state.createdAt.toISOString() : state.createdAt,
			updatedAt: new Date().toISOString()
		};

		sessionStorage.setItem(CHARACTER_DRAFT_KEY, JSON.stringify(draftData));
	} catch (error) {
		console.warn('Failed to save character draft:', error);
	}
}

/**
 * Load character draft from sessionStorage
 */
function loadCharacterDraft(): CharacterInProgressStoreData | null {
	try {
		const draftJson = sessionStorage.getItem(CHARACTER_DRAFT_KEY);
		if (!draftJson) {
			return null;
		}

		const draft = JSON.parse(draftJson);

		// Convert date strings back to Date objects
		return {
			...draft,
			createdAt: draft.createdAt ? new Date(draft.createdAt) : new Date(),
			updatedAt: draft.updatedAt ? new Date(draft.updatedAt) : new Date(),
			// Ensure cache is cleared
			cachedEffectResults: undefined,
			cacheTimestamp: undefined
		};
	} catch (error) {
		console.warn('Failed to load character draft:', error);
		return null;
	}
}

/**
 * Clear character draft from sessionStorage
 */
export function clearCharacterDraft(): void {
	try {
		sessionStorage.removeItem(CHARACTER_DRAFT_KEY);
	} catch (error) {
		console.warn('Failed to clear character draft:', error);
	}
}

// Action types
type CharacterAction =
	| { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
	| { type: 'UPDATE_SKILLS'; skillsData: Record<string, number> }
	| { type: 'UPDATE_TRADES'; tradesData: Record<string, number> }
	| { type: 'UPDATE_LANGUAGES'; languagesData: Record<string, { fluency: 'limited' | 'fluent' }> }
	| { type: 'SET_CLASS'; classId: string | null }
	| { type: 'SET_LEVEL'; level: number }
	| { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
	| { type: 'SET_TRAITS'; selectedTraitIds: string[] }
	| { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: Record<string, any> }
	| { type: 'UPDATE_TRAIT_CHOICE'; traitId: string; effectIndex: number; choice: string }
	| { type: 'INVALIDATE_CACHE' }
	| { type: 'UPDATE_SPELLS_AND_MANEUVERS'; spells: Record<string, string>; maneuvers: string[] }
	| { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
	| { type: 'INITIALIZE_FROM_SAVED'; character: CharacterInProgressStoreData }
	| { type: 'NEXT_STEP' }
	| { type: 'PREVIOUS_STEP' }
	| { type: 'SET_STEP'; step: number }
	| { type: 'TOGGLE_PRIME_CAP_RULE'; value?: boolean }
	| {
		type: 'SET_CONVERSIONS';
		conversions: { skillToTrade?: number; tradeToSkill?: number; tradeToLanguage?: number };
	}
	| { type: 'SET_SELECTED_TALENTS'; talents: Record<string, number> }
	| { type: 'SET_PATH_POINTS'; pathPoints: { martial?: number; spellcasting?: number } }
	| {
		type: 'SET_MULTICLASS';
		option: 'novice' | 'adept' | 'expert' | 'master' | 'grandmaster' | 'legendary' | null;
		classId: string;
		featureId: string;
	}
	| { type: 'SET_SUBCLASS'; subclass: string | null }
	| { type: 'SET_CROSS_PATH_SPELL_LIST'; spellList: string }
	| { type: 'ENTER_LEVEL_UP_MODE'; originalLevel: number; characterId: string }
	| { type: 'CLEAR_DRAFT' }
	| { type: 'RESTORE_FROM_DRAFT'; draft: CharacterInProgressStoreData };

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
		case 'SET_LEVEL':
			return { ...state, level: action.level };
		case 'SET_SELECTED_TALENTS':
			return { ...state, selectedTalents: action.talents };
		case 'SET_PATH_POINTS':
			return { ...state, pathPointAllocations: action.pathPoints };
		case 'SET_MULTICLASS':
			return {
				...state,
				selectedMulticlassOption: action.option,
				selectedMulticlassClass: action.classId,
				selectedMulticlassFeature: action.featureId
			};
		case 'SET_SUBCLASS':
			return { ...state, selectedSubclass: action.subclass ?? undefined };
		case 'SET_CROSS_PATH_SPELL_LIST':
			return { ...state, selectedCrossPathSpellList: action.spellList };
		case 'ENTER_LEVEL_UP_MODE':
			return {
				...state,
				isLevelUpMode: true,
				originalLevel: action.originalLevel,
				sourceCharacterId: action.characterId
			};
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
		case 'TOGGLE_PRIME_CAP_RULE':
			return {
				...state,
				usePrimeCapRule: action.value ?? !state.usePrimeCapRule
			};
		case 'CLEAR_DRAFT':
			clearCharacterDraft();
			return initialCharacterInProgressState;
		case 'RESTORE_FROM_DRAFT':
			return { ...action.draft };
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
	totalAttributePoints: number;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
	// Initialize state: check for saved draft first
	const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState, () => {
		const draft = loadCharacterDraft();
		if (draft) {
			console.log('Restored character draft from sessionStorage');
			return draft;
		}
		return initialCharacterInProgressState;
	});

	// Save draft to sessionStorage whenever state changes (debounced effect)
	useEffect(() => {
		// Don't save on initial render if state is empty
		const hasSignificantData = state.classId || state.ancestry1Id || state.finalName;
		if (hasSignificantData) {
			saveCharacterDraft(state);
		}
	}, [state]);

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
			state.attribute_might +
			2 +
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

	// Calculate total attribute points
	const totalAttributePoints = calculationResult.stats.finalAttributePoints ?? 12;

	// Provide both the new result and the old values
	const contextValue: CharacterContextType = useMemo(
		() => ({
			state,
			dispatch,
			calculationResult,
			attributePointsRemaining,
			totalAttributePoints
		}),
		[state, dispatch, calculationResult, attributePointsRemaining, totalAttributePoints]
	);

	return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
	const context = useContext(CharacterContext);
	if (context === undefined) {
		throw new Error('useCharacter must be used within a CharacterProvider');
	}
	return context;
}
