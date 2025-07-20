import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CharacterInProgress } from '@prisma/client';

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
  | { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'SET_STEP'; step: number };

// Reducer function
function characterReducer(state: CharacterInProgressStoreData, action: CharacterAction): CharacterInProgressStoreData {
  switch (action.type) {
    case 'UPDATE_ATTRIBUTE':
      return {
        ...state,
        [action.attribute]: action.value,
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skillsJson: action.skillsJson,
      };
    case 'UPDATE_TRADES':
      return {
        ...state,
        tradesJson: action.tradesJson,
      };
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        languagesJson: action.languagesJson,
      };
    case 'SET_CLASS':
      return {
        ...state,
        classId: action.classId,
      };
    case 'SET_ANCESTRY':
      return {
        ...state,
        ancestry1Id: action.ancestry1Id,
        ancestry2Id: action.ancestry2Id,
      };
    case 'SET_TRAITS':
      return {
        ...state,
        selectedTraitIds: action.selectedTraitIds,
      };
    case 'SET_FEATURE_CHOICES':
      return {
        ...state,
        selectedFeatureChoices: action.selectedFeatureChoices,
      };
    case 'UPDATE_STORE':
      return {
        ...state,
        ...action.updates,
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 6),
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(action.step, 6)),
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
  ancestryPointsRemaining: number;
  combatMastery: number;
  primeModifier: { name: string; value: number };
}

// Create context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);

  // Derived values
  const attributePointsRemaining = 12 - (
    (state.attribute_might + 2) +
    (state.attribute_agility + 2) +
    (state.attribute_charisma + 2) +
    (state.attribute_intelligence + 2)
  );

  const ancestryPointsRemaining = 5 - state.ancestryPointsSpent;

  const combatMastery = Math.ceil((state.level ?? 1) / 2);

  const primeModifier = (() => {
    const attributes = [
      { name: 'Might', value: state.attribute_might },
      { name: 'Agility', value: state.attribute_agility },
      { name: 'Charisma', value: state.attribute_charisma },
      { name: 'Intelligence', value: state.attribute_intelligence },
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
    ancestryPointsRemaining,
    combatMastery,
    primeModifier,
  };

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
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
