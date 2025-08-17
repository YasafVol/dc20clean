
import { useCharacter } from '../../lib/stores/characterContext';
import { StyledContainer, StyledTitle, StyledDetails } from './styles/AncestryPointsCounter.styles';

function AncestryPointsCounter() {
	const { calculationResult } = useCharacter();
	
	// Use centralized calculator for ancestry points (includes Cleric domain bonuses, etc.)
	const ancestryData = calculationResult.ancestry || {
		baseAncestryPoints: 5,
		ancestryPointsUsed: 0,
		ancestryPointsRemaining: 5
	};
	const { ancestryPointsUsed: ancestryPointsSpent, ancestryPointsRemaining } = ancestryData;

	const isOverBudget = ancestryPointsRemaining < 0;

	return (
		<StyledContainer>
			<StyledTitle style={{ color: isOverBudget ? '#ff4444' : undefined }}>
				Ancestry Points: {ancestryPointsRemaining}/{ancestryPointsSpent + ancestryPointsRemaining}
			</StyledTitle>
			<StyledDetails>
				Spent: {ancestryPointsSpent} | Remaining: {ancestryPointsRemaining}
				{isOverBudget && <span style={{ color: '#ff4444' }}> (Over budget!)</span>}
			</StyledDetails>
		</StyledContainer>
	);
}

export default AncestryPointsCounter;
