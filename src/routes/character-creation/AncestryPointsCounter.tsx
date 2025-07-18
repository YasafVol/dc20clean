import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';

const StyledContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h2`
  margin: 0;
  color: #333;
`;

function AncestryPointsCounter() {
  const { ancestryPointsRemaining } = useCharacter();

  return (
    <StyledContainer>
      <StyledTitle>Ancestry Points: {ancestryPointsRemaining}</StyledTitle>
    </StyledContainer>
  );
}

export default AncestryPointsCounter;
