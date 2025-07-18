import React, { useState } from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import AncestryPointsCounter from './AncestryPointsCounter.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  color: #fbbf24;
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;
  background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledStepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const StyledStepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

const StyledStep = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledStepNumber = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  ${props => props.$completed && `
    background: linear-gradient(145deg, #10b981 0%, #059669 100%);
    color: white;
    border: 2px solid #10b981;
  `}
  
  ${props => props.$active && !props.$completed && `
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    border: 2px solid #fbbf24;
  `}
  
  ${props => !props.$active && !props.$completed && `
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
  `}
`;

const StyledStepLabel = styled.span<{ $active: boolean; $completed: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  
  ${props => props.$completed && `
    color: #10b981;
  `}
  
  ${props => props.$active && !props.$completed && `
    color: #fbbf24;
  `}
  
  ${props => !props.$active && !props.$completed && `
    color: #9ca3af;
  `}
`;

const StyledNavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 80px;
  
  ${props => props.$variant === 'primary' && `
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    
    &:hover {
      background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
    
    &:hover {
      color: #fbbf24;
      border-color: #fbbf24;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

function CharacterCreation({ onNavigateToLoad }: { onNavigateToLoad: () => void }) {
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
}

export default CharacterCreation;
