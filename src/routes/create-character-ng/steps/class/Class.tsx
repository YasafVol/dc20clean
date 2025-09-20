import React from 'react';
import { StyledContainer, StyledTitle, StyledContent } from './Class.styles';

interface ClassProps {
  // Props will be added as needed
}

const Class: React.FC<ClassProps> = () => {
  return (
    <StyledContainer>
      <StyledTitle>Choose Your Class</StyledTitle>
      <StyledContent>
        <p>Class selection step content will be implemented here.</p>
        <p>This step will handle choosing the character's primary class.</p>
      </StyledContent>
    </StyledContainer>
  );
};

export default Class;