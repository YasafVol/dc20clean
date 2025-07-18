import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/classes';
import type { IClassDefinition } from '../../lib/rulesdata/types';

const StyledContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledSection = styled.div`
  margin-top: 1rem;
`;

const StyledSectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
`;

const StyledCard = styled.div`
  border: 2px solid #a855f7;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

const StyledCardTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const StyledCardDescription = styled.p`
  margin: 0;
  color: #e5e7eb;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const StyledChoiceOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #fbbf24;
    background: rgba(139, 92, 246, 0.1);
  }
`;

const StyledRadio = styled.input`
  margin-top: 0.25rem;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  accent-color: #ef4444;
  cursor: pointer;
`;

const StyledOptionDescription = styled.span`
  font-size: 0.9em;
  color: #9ca3af;
  margin-left: 0.5rem;
  font-style: italic;
`;

const StyledNoSelection = styled.p`
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

function ClassFeatures() {
  const { state, dispatch } = useCharacter();
  
  const selectedClass = classesData.find(c => c.id === state.classId);
  const selectedFeatureChoices: { [key: string]: string } = JSON.parse(state.selectedFeatureChoices || '{}');

  function handleFeatureChoice(choiceId: string, value: string) {
    const currentChoices = { ...selectedFeatureChoices };
    currentChoices[choiceId] = value;
    dispatch({ type: 'SET_FEATURE_CHOICES', selectedFeatureChoices: JSON.stringify(currentChoices) });
  }

  if (!selectedClass) {
    return (
      <StyledContainer>
        <StyledNoSelection>Select a Class to see its features.</StyledNoSelection>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledTitle>{selectedClass.name} Features</StyledTitle>

      <StyledSection>
        <StyledSectionTitle>Level 1 Features</StyledSectionTitle>
        {(selectedClass.level1Features || []).map((feature, index) => (
          <StyledCard key={index}>
            <StyledCardTitle>{feature.name}</StyledCardTitle>
            <StyledCardDescription>{feature.description}</StyledCardDescription>
          </StyledCard>
        ))}
      </StyledSection>

      {selectedClass.featureChoicesLvl1 && selectedClass.featureChoicesLvl1.length > 0 && (
        <StyledSection>
          <StyledSectionTitle>Feature Choices</StyledSectionTitle>
          {selectedClass.featureChoicesLvl1.map((choice) => (
            <StyledCard key={choice.id}>
              <StyledCardTitle>{choice.prompt}</StyledCardTitle>
              {choice.type === 'select_one' && (
                <StyledChoiceOptions>
                  {choice.options.map((option) => (
                    <StyledLabel key={option.value}>
                      <StyledRadio
                        type="radio"
                        name={choice.id}
                        value={option.value}
                        checked={selectedFeatureChoices[choice.id] === option.value}
                        onChange={() => handleFeatureChoice(choice.id, option.value)}
                      />
                      {option.label}
                      {option.description && (
                        <StyledOptionDescription>({option.description})</StyledOptionDescription>
                      )}
                    </StyledLabel>
                  ))}
                </StyledChoiceOptions>
              )}
            </StyledCard>
          ))}
        </StyledSection>
      )}
    </StyledContainer>
  );
}

export default ClassFeatures;
