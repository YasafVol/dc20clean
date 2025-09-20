import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Background.styles';

interface BackgroundProps {
  // Props will be added as needed
}

const Background: React.FC<BackgroundProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Background</StyledTitle>
      <StyledContent>
        <p>Background step content will be implemented here.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Background;