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
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

const StyledSection = styled.section`
  border: 2px solid #8b5cf6;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(30, 27, 75, 0.8) 0%, rgba(49, 46, 129, 0.8) 100%);
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(10px);
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  color: #fbbf24;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;
  background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledSectionTitle = styled.h2`
  margin-top: 0;
  color: #fbbf24;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
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
