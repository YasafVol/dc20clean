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

function CharacterCreation() {
  return (
    <div>
      <StyledTitle>Character Creation</StyledTitle>
      
      <StyledContainer>
        <ClassSelector />
        <ClassFeatures />
        <Attributes />
        <AncestrySelector />
        <AncestryPointsCounter />
        <SelectedAncestries />
      </StyledContainer>
    </div>
  );
}

export default CharacterCreation;
