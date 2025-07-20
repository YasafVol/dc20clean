import React, { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import AncestryPointsCounter from './AncestryPointsCounter.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import Background from './Background.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import { completeCharacter } from '../../lib/services/characterCompletion';
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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

    const steps = [
    { number: 1, label: 'Class & Features' },
    { number: 2, label: 'Attributes' },
    { number: 3, label: 'Background' },
    { number: 4, label: 'Ancestry' },
    { number: 5, label: 'Character Name' },
  ];

  const handleStepClick = (step: number) => {
    dispatch({ type: 'SET_STEP', step });
  };

  const handleNext = async () => {
    if (state.currentStep === 5 && areAllStepsCompleted()) {
      // Character is complete, trigger completion using the service
      await completeCharacter(state, {
        onShowSnackbar: (message: string) => {
          setSnackbarMessage(message);
          setShowSnackbar(true);
        },
        onNavigateToLoad: onNavigateToLoad
      });
      return;
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
        // Background: check if all points have been spent
        const hasSkillSelections = state.skillsJson && state.skillsJson !== '{}';
        const hasTradeSelections = state.tradesJson && state.tradesJson !== '{}';
        
        // Parse languages to check points spent
        let languagePointsUsed = 0;
        try {
          const languages = JSON.parse(state.languagesJson || '{}');
          languagePointsUsed = Object.entries(languages).reduce((sum, [langId, data]: [string, any]) => {
            if (langId === 'common') return sum; // Common is free
            return sum + (data.fluency === 'basic' ? 1 : data.fluency === 'advanced' ? 2 : data.fluency === 'fluent' ? 3 : 0);
          }, 0);
        } catch (e) {
          languagePointsUsed = 0;
        }
        
        // Calculate points used for skills and trades
        let skillPointsUsed = 0;
        let tradePointsUsed = 0;
        
        try {
          if (hasSkillSelections) {
            const skills = JSON.parse(state.skillsJson);
            skillPointsUsed = Object.values(skills).reduce((sum: number, level: any) => sum + level, 0);
          }
        } catch (e) {
          skillPointsUsed = 0;
        }
        
        try {
          if (hasTradeSelections) {
            const trades = JSON.parse(state.tradesJson);
            tradePointsUsed = Object.values(trades).reduce((sum: number, level: any) => sum + level, 0);
          }
        } catch (e) {
          tradePointsUsed = 0;
        }
        
        // Background gives 5 points each for skills, trades, and 3 points for languages (DC20 rules)
        const maxSkillPoints = 5;
        const maxTradePoints = 5;
        const maxLanguagePoints = 3;
        
        // Step is complete only if ALL points have been used
        return skillPointsUsed === maxSkillPoints && 
               tradePointsUsed === maxTradePoints && 
               languagePointsUsed === maxLanguagePoints;
      case 4:
        return state.ancestry1Id !== null;
      case 5:
        return state.finalName !== null && state.finalName !== '' && 
               state.finalPlayerName !== null && state.finalPlayerName !== '';
      default:
        return false;
    }
  };

  const areAllStepsCompleted = () => {
    return steps.every(step => isStepCompleted(step.number));
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
        return <Background />;
      case 4:
        return (
          <>
            <AncestrySelector />
            <AncestryPointsCounter />
            <SelectedAncestries />
          </>
        );
      case 5:
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
            disabled={state.currentStep === 5 && !areAllStepsCompleted()}
          >
            {state.currentStep === 5 ? 'Complete' : 'Next →'}
          </StyledButton>
        </StyledNavigationButtons>
      </StyledStepIndicator>

      <StyledContainer>
        {renderCurrentStep()}
      </StyledContainer>

      <Snackbar
        message={snackbarMessage}
        isVisible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        duration={3000}
      />
    </div>
  );
};

export default CharacterCreation;
