import React from 'react';
import {
	StyledPointsContainer,
	StyledPointsText,
	StyledPointsValue
} from './AttributePointsDisplay.styles';

interface Props {
	pointsSpent: number;
	maxPoints: number;
}

export const AttributePointsDisplay: React.FC<Props> = ({ pointsSpent, maxPoints }) => {
	const isOverBudget = pointsSpent > maxPoints;
	const isComplete = pointsSpent === maxPoints;

	return (
		<StyledPointsContainer $isOverBudget={isOverBudget}>
			<StyledPointsText>ATTRIBUTE POINTS</StyledPointsText>
			<StyledPointsValue $isOverBudget={isOverBudget} $isComplete={isComplete}>
				{pointsSpent}/{maxPoints}
			</StyledPointsValue>
		</StyledPointsContainer>
	);
};

export default AttributePointsDisplay;
