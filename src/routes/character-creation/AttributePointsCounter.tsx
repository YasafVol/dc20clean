import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { StyledContainer, StyledTitle, StyledDetails } from './styles/AncestryPointsCounter.styles';

function AttributePointsCounter() {
	const { calculationResult } = useCharacter();
	const limits = calculationResult.validation.attributeLimits;
	// Base 12 total points + trait bonuses
	const total = 12 + Object.values(limits).reduce((sum, lim) => sum + (lim.traitBonuses || 0), 0);
	// Each attribute baseline is -2; spent is sum(current + 2)
	const spent = Object.values(limits).reduce((sum, lim) => sum + (lim.current + 2), 0);
	const remaining = total - spent;

	const isOverBudget = remaining < 0;

	return (
		<StyledContainer>
			<StyledTitle style={{ color: isOverBudget ? '#ff4444' : undefined }}>
				Attribute Points: {remaining}/{total}
			</StyledTitle>
			<StyledDetails>
				Spent: {spent} | Remaining: {remaining}
				{isOverBudget && <span style={{ color: '#ff4444' }}> (Over budget!)</span>}
			</StyledDetails>
		</StyledContainer>
	);
}

export default AttributePointsCounter;
