import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './ClassFeatures.styles';

interface ClassFeaturesProps {
  // Props will be added as needed
}

const ClassFeatures: React.FC<ClassFeaturesProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Class & Features</StyledTitle>
      <StyledContent>
        <p>Class and Features step content will be implemented here.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default ClassFeatures;