import React from 'react';
import styled from 'styled-components';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import AncestryPointsCounter from './AncestryPointsCounter.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const StyledSection = styled.section`
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const StyledSectionTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

function CharacterCreation() {
  return (
    <div>
      <StyledTitle>Character Creation</StyledTitle>
      
      <StyledContainer>
        <StyledSection>
          <ClassSelector />
        </StyledSection>
        
        <StyledSection>
          <ClassFeatures />
        </StyledSection>
        
        <StyledSection>
          <Attributes />
        </StyledSection>
        
        <StyledSection>
          <StyledSectionTitle>Choose Your Ancestry</StyledSectionTitle>
          <AncestrySelector />
        </StyledSection>
        
        <StyledSection>
          <AncestryPointsCounter />
        </StyledSection>
        
        <StyledSection>
          <StyledSectionTitle>Ancestry Traits</StyledSectionTitle>
          <SelectedAncestries />
        </StyledSection>
      </StyledContainer>
    </div>
  );
}

export default CharacterCreation;
