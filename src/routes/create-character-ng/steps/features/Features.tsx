import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Features.styles';

interface FeaturesProps {
  // Props will be added as needed
}

const Features: React.FC<FeaturesProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Class Features</StyledTitle>
      <StyledContent>
        <p>Class features selection step content will be implemented here.</p>
        <p>This step will handle selecting class-specific features, techniques, and abilities.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Features;