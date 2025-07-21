import React from 'react';
import {
	MovementContainer,
	MovementStats,
	MovementStat,
	StatLabel,
	StatValue
} from '../styles/Movement';

interface MovementProps {
	characterData: {
		finalMoveSpeed: number;
		finalJumpDistance: number;
	};
}

const Movement: React.FC<MovementProps> = ({ characterData }) => {
	return (
		<MovementContainer>
			<MovementStats>
				<MovementStat>
					<StatLabel>MOVE SPEED</StatLabel>
					<StatValue>{characterData.finalMoveSpeed}</StatValue>
				</MovementStat>
				<MovementStat>
					<StatLabel>JUMP DISTANCE</StatLabel>
					<StatValue>{characterData.finalJumpDistance}</StatValue>
				</MovementStat>
			</MovementStats>
		</MovementContainer>
	);
};

export default Movement;
