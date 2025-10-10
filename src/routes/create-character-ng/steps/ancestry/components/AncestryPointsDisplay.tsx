import React from 'react';
import {
	StyledPointsContainer,
	StyledPointsText,
	StyledPointsValue
} from './AncestryPointsDisplay.styles';

interface Props {
	pointsRemaining: number;
	maxPoints: number;
}

export const AncestryPointsDisplay: React.FC<Props> = ({ pointsRemaining, maxPoints }) => {
	const pointsSpent = maxPoints - pointsRemaining;
	const isOverBudget = pointsSpent > maxPoints;

	return (
		<StyledPointsContainer $isOverBudget={isOverBudget}>
			<StyledPointsText>ANCESTRY POINTS</StyledPointsText>
			<StyledPointsValue $isOverBudget={isOverBudget}>
				{pointsSpent}/{maxPoints}
			</StyledPointsValue>
		</StyledPointsContainer>
	);
};

export default AncestryPointsDisplay;
