import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/classes';
import type { IClassDefinition } from '../../lib/rulesdata/types';

const StyledContainer = styled.div`
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 2rem;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

const StyledSection = styled.div`
  margin-top: 1rem;
`;

const StyledSectionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #555;
`;

const StyledCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #fff;
`;

const StyledCardTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const StyledCardDescription = styled.p`
  margin: 0;
  color: #666;
`;

const StyledChoiceOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
`;

const StyledRadio = styled.input`
  margin-top: 0.25rem;
  flex-shrink: 0;
`;

const StyledOptionDescription = styled.span`
  font-size: 0.9em;
  color: #666;
  margin-left: 0.5rem;
`;

const StyledNoSelection = styled.p`
  color: #666;
  font-style: italic;
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
