import React, { createContext, useContext, useState, ReactNode } from 'react';
import { validateAllSteps } from '../utils/stepValidation';

// Types
export type StepStatus = 'upcoming' | 'in-progress' | 'completed' | 'error';

export type Step = {
  id: string;
  label: string;
  status?: StepStatus;
};

// Character creation steps definition
export const characterCreationSteps: Step[] = [
  { id: 'class', label: 'CLASS &\nFEATURES' },
  { id: 'ancestry', label: 'ANCESTRY' },
  { id: 'attributes', label: 'ATTRIBUTES' },
  { id: 'background', label: 'BACKGROUND' },
  { id: 'spells', label: 'SPELLS &\nMANEUVERS' },
  { id: 'finish', label: 'FINISH' }
];

// Context types
interface CharacterCreationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: Step[];
  validationResults: Record<string, boolean>;
  setValidationResults: (results: Record<string, boolean>) => void;
  validateCurrentStep: () => void;
}

// Create context
const CharacterCreationContext = createContext<CharacterCreationContextType | undefined>(undefined);

// Provider component
interface CharacterCreationProviderProps {
  children: ReactNode;
}

export const CharacterCreationProvider: React.FC<CharacterCreationProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>(() => {
    // Initialize with validation results
    return validateAllSteps();
  });

  const validateCurrentStep = () => {
    // Re-run validation for all steps
    const newValidationResults = validateAllSteps();
    setValidationResults(newValidationResults);
  };

  const value: CharacterCreationContextType = {
    currentStep,
    setCurrentStep,
    steps: characterCreationSteps,
    validationResults,
    setValidationResults,
    validateCurrentStep,
  };

  return (
    <CharacterCreationContext.Provider value={value}>
      {children}
    </CharacterCreationContext.Provider>
  );
};

// Custom hook to use the context
export const useCharacterCreation = (): CharacterCreationContextType => {
  const context = useContext(CharacterCreationContext);
  if (context === undefined) {
    throw new Error('useCharacterCreation must be used within a CharacterCreationProvider');
  }
  return context;
};