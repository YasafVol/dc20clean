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
	isMobile?: boolean;
}

const Movement: React.FC<MovementProps> = ({ isMobile }) => {
	const { state } = useCharacterSheet();
	const calculation = useCharacterCalculatedData();

	if (!state.character || !calculation) {
		return <div>Loading movement...</div>;
	}

	const breakdowns = calculation.breakdowns;

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	// Use calculated stats for speed and jump distance
	const speed = calculation.stats.finalMoveSpeed;
	const jumpDistance = calculation.stats.finalJumpDistance;
	return (
		<StyledMovementContainer $isMobile={effectiveIsMobile}>
			<StyledMovementGrid $isMobile={effectiveIsMobile}>
				<StyledMovementStat $isMobile={effectiveIsMobile}>
					<StyledMovementLabel $isMobile={effectiveIsMobile}>MOVE SPEED</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.move_speed
								? createEnhancedTooltip('Move Speed', breakdowns.move_speed)
								: `Base Movement Speed: ${speed} ft`
						}
						position="top"
					>
						<StyledMovementValue $isMobile={effectiveIsMobile}>{speed}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
				<StyledMovementStat $isMobile={effectiveIsMobile}>
					<StyledMovementLabel $isMobile={effectiveIsMobile}>JUMP DISTANCE</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.jump_distance
								? createEnhancedTooltip('Jump Distance', breakdowns.jump_distance)
								: `Jump Distance: ${jumpDistance} ft`
						}
						position="top"
					>
						<StyledMovementValue $isMobile={effectiveIsMobile}>{jumpDistance}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
			</StyledMovementGrid>
		</StyledMovementContainer>
	);
};

export default Movement;
