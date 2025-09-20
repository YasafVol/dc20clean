import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Ancestry.styles';

interface AncestryProps {
  // Props will be added as needed
}

const Ancestry: React.FC<AncestryProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Ancestry</StyledTitle>
      <StyledContent>
        <p>Ancestry step content will be implemented here.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Ancestry;