import React from 'react';
import type { CharacterSheetData } from '../../../types';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import {
	StyledMovementContainer,
	StyledMovementGrid,
	StyledMovementStat,
	StyledMovementLabel,
	StyledMovementValue
} from '../styles/Movement.styles';
import Tooltip from './Tooltip';
import { createSpeedTooltip, createJumpTooltip } from './StatTooltips';
import { createEnhancedTooltip } from './EnhancedStatTooltips';

interface MovementProps {
	characterData: CharacterSheetData;
	breakdowns?: Record<string, EnhancedStatBreakdown>;
}

const Movement: React.FC<MovementProps> = ({ characterData, breakdowns }) => {
	return (
		<StyledMovementContainer>
			<StyledMovementGrid>
				<StyledMovementStat>
					<StyledMovementLabel>MOVE SPEED</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.move_speed
								? createEnhancedTooltip('Move Speed', breakdowns.move_speed)
							: createSpeedTooltip(characterData)
						}
						position="top"
					>
						<StyledMovementValue>{characterData.finalMoveSpeed}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
				<StyledMovementStat>
					<StyledMovementLabel>JUMP DISTANCE</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.jump_distance
								? createEnhancedTooltip('Jump Distance', breakdowns.jump_distance)
							: createJumpTooltip(characterData)
						}
						position="top"
					>
						<StyledMovementValue>{characterData.finalJumpDistance}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
			</StyledMovementGrid>
		</StyledMovementContainer>
	);
};

export default Movement;
