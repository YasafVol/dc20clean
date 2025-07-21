import React from 'react';
import {
  StyledRightResourcesContainer,
  StyledRightResourcesTitle,
  StyledRightResourceRow,
  StyledRightResourceLabel,
  StyledRightResourceControls,
  StyledRightResourceInput,
  StyledRightResourceMax
} from '../routes/character-sheet/styles/RightColumnResources.styles';

interface CharacterSheetData {
  finalRestPoints: number;
  finalGritPoints: number;
}

interface CurrentValues {
  currentRestPoints: number;
  currentGritPoints: number;
}

interface RightColumnResourcesProps {
  characterData: CharacterSheetData;
  currentValues: CurrentValues;
  onResourceInputChange: (resource: keyof CurrentValues, value: string) => void;
}

const RightColumnResources: React.FC<RightColumnResourcesProps> = ({
  characterData,
  currentValues,
  onResourceInputChange
}) => {
  return (
    <StyledRightResourcesContainer>
      <StyledRightResourcesTitle>RESOURCES</StyledRightResourcesTitle>
      
      <StyledRightResourceRow>
        <StyledRightResourceLabel>REST POINTS</StyledRightResourceLabel>
        <StyledRightResourceControls>
          <StyledRightResourceInput
            type="number"
            value={currentValues.currentRestPoints}
            onChange={(e) => onResourceInputChange('currentRestPoints', e.target.value)}
          />
          <StyledRightResourceMax>/ {characterData.finalRestPoints}</StyledRightResourceMax>
        </StyledRightResourceControls>
      </StyledRightResourceRow>
      
      <StyledRightResourceRow>
        <StyledRightResourceLabel>GRIT POINTS</StyledRightResourceLabel>
        <StyledRightResourceControls>
          <StyledRightResourceInput
            type="number"
            value={currentValues.currentGritPoints}
            onChange={(e) => onResourceInputChange('currentGritPoints', e.target.value)}
          />
          <StyledRightResourceMax>/ {characterData.finalGritPoints}</StyledRightResourceMax>
        </StyledRightResourceControls>
      </StyledRightResourceRow>
    </StyledRightResourcesContainer>
  );
};

export default RightColumnResources;
