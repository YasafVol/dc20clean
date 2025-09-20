import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Spells.styles';

interface SpellsProps {
  // Props will be added as needed
}

const Spells: React.FC<SpellsProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Spells & Maneuvers</StyledTitle>
      <StyledContent>
        <p>Spells & Maneuvers step content will be implemented here.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Spells;