import React from 'react';
import {
	StyledMovementContainer,
	StyledMovementGrid,
	StyledMovementStat,
	StyledMovementLabel,
	StyledMovementValue
} from '../styles/Movement.styles';
import Tooltip from './Tooltip';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
import { useCharacterSheet, useCharacterCalculatedData } from '../hooks/CharacterSheetProvider';

interface MovementProps {
	// No props needed - data comes from context
}

const Movement: React.FC<MovementProps> = () => {
	const { state } = useCharacterSheet();
	const calculation = useCharacterCalculatedData();

	if (!state.character || !calculation) {
		return <div>Loading movement...</div>;
	}

	const breakdowns = calculation.breakdowns;

	// Use calculated stats for speed and jump distance
	const speed = calculation.stats.finalMoveSpeed;
	const jumpDistance = calculation.stats.finalJumpDistance;
	return (
		<StyledMovementContainer>
			<StyledMovementGrid>
				<StyledMovementStat>
					<StyledMovementLabel>MOVE SPEED</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.move_speed
								? createEnhancedTooltip('Move Speed', breakdowns.move_speed)
								: `Base Movement Speed: ${speed} ft`
						}
						position="top"
					>
						<StyledMovementValue>{speed}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
				<StyledMovementStat>
					<StyledMovementLabel>JUMP DISTANCE</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.jump_distance
								? createEnhancedTooltip('Jump Distance', breakdowns.jump_distance)
								: `Jump Distance: ${jumpDistance} ft`
						}
						position="top"
					>
						<StyledMovementValue>{jumpDistance}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
			</StyledMovementGrid>
		</StyledMovementContainer>
	);
};

export default Movement;
