import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import {
  StyledContainer,
  StyledTitle
} from './styles/AncestryPointsCounter.styles';

function AncestryPointsCounter() {
  const { ancestryPointsRemaining } = useCharacter();

  return (
    <StyledContainer>
      <StyledTitle>Ancestry Points: {ancestryPointsRemaining}</StyledTitle>
    </StyledContainer>
  );
}

export default AncestryPointsCounter;
