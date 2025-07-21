import React from 'react';
import type { CharacterSheetData } from '../types';
import {
  StyledMovementContainer,
  StyledMovementGrid,
  StyledMovementStat,
  StyledMovementLabel,
  StyledMovementValue
} from '../routes/character-sheet/styles/Movement.styles';

interface MovementProps {
  characterData: CharacterSheetData;
}

const Movement: React.FC<MovementProps> = ({ characterData }) => {
  return (
    <StyledMovementContainer>
      <StyledMovementGrid>
        <StyledMovementStat>
          <StyledMovementLabel>MOVE SPEED</StyledMovementLabel>
          <StyledMovementValue>{characterData.finalMoveSpeed}</StyledMovementValue>
        </StyledMovementStat>
        <StyledMovementStat>
          <StyledMovementLabel>JUMP DISTANCE</StyledMovementLabel>
          <StyledMovementValue>{characterData.finalJumpDistance}</StyledMovementValue>
        </StyledMovementStat>
      </StyledMovementGrid>
    </StyledMovementContainer>
  );
};

export default Movement;
