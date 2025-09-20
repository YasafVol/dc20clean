import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Finish.styles';

interface FinishProps {
  // Props will be added as needed
}

const Finish: React.FC<FinishProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Finish</StyledTitle>
      <StyledContent>
        <p>Character creation completion step will be implemented here.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Finish;