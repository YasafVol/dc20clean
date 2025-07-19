import React, { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import AncestryPointsCounter from './AncestryPointsCounter.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import {
  StyledContainer,
  StyledTitle,
  StyledStepIndicator,
  StyledStepsContainer,
  StyledStep,
  StyledStepNumber,
  StyledStepLabel,
  StyledNavigationButtons,
  StyledButton
} from './styles/CharacterCreation.styles';

const CharacterCreation: React.FC<{ onNavigateToLoad: () => void }> = ({ onNavigateToLoad }) => {
  const { state, dispatch, attributePointsRemaining } = useCharacter();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const steps = [
    { number: 1, label: 'Class & Features' },
    { number: 2, label: 'Attributes' },
    { number: 3, label: 'Ancestry' },
    { number: 4, label: 'Character Name' },
  ];

  const handleStepClick = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
  };

  const handleNext = () => {
    if (state.currentStep === 4 && isStepCompleted(4)) {
      // Character is complete, trigger completion
      const completedCharacter = {
        ...state,
        completedAt: new Date().toISOString(),
        id: Date.now().toString()
      };
      
      // Save to local storage
      const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
      existingCharacters.push(completedCharacter);
      localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
      
      // Show success snackbar
      setShowSnackbar(true);
      
      // Navigate to load characters page after a short delay
      setTimeout(() => {
        onNavigateToLoad();
      }, 1500);
      
      console.log('Character completed:', completedCharacter);
    } else {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
  };

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return state.classId !== null;
      case 2:
        return attributePointsRemaining === 0;
      case 3:
        return state.ancestry1Id !== null;
      case 4:
        return state.finalName !== null && state.finalName !== '' && 
               state.finalPlayerName !== null && state.finalPlayerName !== '';
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <>
            <ClassSelector />
            <ClassFeatures />
          </>
        );
      case 2:
        return <Attributes />;
      case 3:
        return (
          <>
            <AncestrySelector />
            <AncestryPointsCounter />
            <SelectedAncestries />
          </>
        );
      case 4:
        return <CharacterName />;
      default:
        return null;
    }
  };

  return (
    <div>
      <StyledTitle>Character Creation</StyledTitle>
      
      <StyledStepIndicator>
        <StyledNavigationButtons>
          <StyledButton 
            $variant="secondary" 
            onClick={handlePrevious}
            disabled={state.currentStep === 1}
          >
            ← Previous
          </StyledButton>
        </StyledNavigationButtons>

        <StyledStepsContainer>
          {steps.map((step) => (
            <StyledStep 
              key={step.number} 
              $active={state.currentStep === step.number}
              $completed={isStepCompleted(step.number)}
              onClick={() => handleStepClick(step.number)}
            >
              <StyledStepNumber 
                $active={state.currentStep === step.number}
                $completed={isStepCompleted(step.number)}
              >
                {isStepCompleted(step.number) ? '✓' : step.number}
              </StyledStepNumber>
              <StyledStepLabel 
                $active={state.currentStep === step.number}
                $completed={isStepCompleted(step.number)}
              >
                {step.label}
              </StyledStepLabel>
            </StyledStep>
          ))}
        </StyledStepsContainer>

        <StyledNavigationButtons>
          <StyledButton 
            $variant="primary" 
            onClick={handleNext}
            disabled={state.currentStep === 4 && !isStepCompleted(4)}
          >
            {state.currentStep === 4 ? 'Complete' : 'Next →'}
          </StyledButton>
        </StyledNavigationButtons>
      </StyledStepIndicator>

      <StyledContainer>
        {renderCurrentStep()}
      </StyledContainer>

      <Snackbar
        message="Character created successfully!"
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        duration={3000}
      />
    </div>
  );
};

export default CharacterCreation;
