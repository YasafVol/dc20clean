import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { StyledContainer, StyledTitle, StyledDetails } from './styles/AncestryPointsCounter.styles';

function AncestryPointsCounter() {
	const { ancestryPointsRemaining, ancestryPointsSpent } = useCharacter();
	
	const isOverBudget = ancestryPointsRemaining < 0;

	return (
		<StyledContainer>
			<StyledTitle style={{ color: isOverBudget ? '#ff4444' : undefined }}>
				Ancestry Points: {ancestryPointsRemaining}/5
			</StyledTitle>
			<StyledDetails>
				Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}
				{isOverBudget && <span style={{ color: '#ff4444' }}> (Over budget!)</span>}
			</StyledDetails>
		</StyledContainer>
	);
}

export default AncestryPointsCounter;
