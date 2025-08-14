import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { StyledContainer, StyledTitle, StyledDetails } from './styles/AncestryPointsCounter.styles';

function AttributePointsCounter() {
	const { attributePointsRemaining, attributePointsSpent, totalAttributePoints } = useCharacter();

	const isOverBudget = attributePointsRemaining < 0;

	return (
		<StyledContainer>
			<StyledTitle style={{ color: isOverBudget ? '#ff4444' : undefined }}>
				Attribute Points: {attributePointsRemaining}/{totalAttributePoints}
			</StyledTitle>
			<StyledDetails>
				Spent: {attributePointsSpent} | Remaining: {attributePointsRemaining}
				{isOverBudget && <span style={{ color: '#ff4444' }}> (Over budget!)</span>}
			</StyledDetails>
		</StyledContainer>
	);
}

export default AttributePointsCounter;
