import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import type { IClassDefinition } from '../../lib/rulesdata/types';
import {
  StyledContainer,
  StyledTitle,
  StyledSection,
  StyledSectionTitle,
  StyledCard,
  StyledCardTitle,
  StyledCardDescription,
  StyledChoiceOptions,
  StyledLabel,
  StyledRadio,
  StyledOptionDescription,
  StyledNoSelection
} from './styles/ClassFeatures.styles';

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
