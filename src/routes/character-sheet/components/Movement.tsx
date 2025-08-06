import React from 'react';
import type { CharacterSheetData } from '../../../types';
import {
	StyledMovementContainer,
	StyledMovementGrid,
	StyledMovementStat,
	StyledMovementLabel,
	StyledMovementValue
} from '../styles/Movement.styles';
import Tooltip from './Tooltip';
import { createSpeedTooltip, createJumpTooltip } from './StatTooltips';

interface MovementProps {
	characterData: CharacterSheetData;
}

const Movement: React.FC<MovementProps> = ({ characterData }) => {
	return (
		<StyledMovementContainer>
			<StyledMovementGrid>
				<StyledMovementStat>
					<StyledMovementLabel>MOVE SPEED</StyledMovementLabel>
					<Tooltip content={createSpeedTooltip(characterData)} position="top">
						<StyledMovementValue>{characterData.finalMoveSpeed}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
				<StyledMovementStat>
					<StyledMovementLabel>JUMP DISTANCE</StyledMovementLabel>
					<Tooltip content={createJumpTooltip(characterData)} position="top">
						<StyledMovementValue>{characterData.finalJumpDistance}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
			</StyledMovementGrid>
		</StyledMovementContainer>
	);
};

export default Movement;
