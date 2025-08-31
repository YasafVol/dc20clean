import { useCharacter } from '../../lib/stores/characterContext';
import { 
	StyledContainer, 
	StyledPointsFrame, 
	StyledPointsRow, 
	StyledPointsLabel, 
	StyledPointsValue 
} from './styles/AncestryPointsCounter.styles';

function AttributePointsCounter() {
	const { attributePointsRemaining, attributePointsSpent, totalAttributePoints } = useCharacter();

	const basePoints = 11; // Standard base points
	const bonusPoints = totalAttributePoints - basePoints; // Points from traits

	return (
		<StyledContainer>			
			<StyledPointsFrame>
				<StyledPointsRow>
					<StyledPointsLabel>Base Points:</StyledPointsLabel>
					<StyledPointsValue $highlight>{basePoints}</StyledPointsValue>
				</StyledPointsRow>
				<StyledPointsRow>
					<StyledPointsLabel>Bonus from Traits:</StyledPointsLabel>
					<StyledPointsValue $highlight>{bonusPoints}</StyledPointsValue>
				</StyledPointsRow>
				<StyledPointsRow>
					<StyledPointsLabel>Spent on Attributes:</StyledPointsLabel>
					<StyledPointsValue>{attributePointsSpent}</StyledPointsValue>
				</StyledPointsRow>
				<StyledPointsRow>
					<StyledPointsLabel>Points Remaining:</StyledPointsLabel>
					<StyledPointsValue $highlight>{attributePointsRemaining}</StyledPointsValue>
				</StyledPointsRow>
			</StyledPointsFrame>
		</StyledContainer>
	);
}

export default AttributePointsCounter;
