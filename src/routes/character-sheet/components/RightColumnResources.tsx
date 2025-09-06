import React from 'react';
import {
	StyledRightResourcesContainer,
	StyledRightResourcesTitle,
	StyledRightResourceRow,
	StyledRightResourceLabel,
	StyledRightResourceControls,
	StyledRightResourceInput,
	StyledRightResourceMax
} from '../styles/RightColumnResources.styles';
import {
	useCharacterSheet,
	useCharacterResources,
	useCharacterCalculatedData
} from '../hooks/CharacterSheetProvider';

interface RightColumnResourcesProps {
	isMobile?: boolean;
}

const RightColumnResources: React.FC<RightColumnResourcesProps> = ({ isMobile = false }) => {
	const { state, updateGritPoints, updateRestPoints } = useCharacterSheet();
	const resources = useCharacterResources();
	const calculatedData = useCharacterCalculatedData();

	if (!state.character || !resources || !calculatedData) {
		return <div>Loading resources...</div>;
	}
	const currentValues = resources.current;

	return (
		<StyledRightResourcesContainer $isMobile={isMobile}>
			<StyledRightResourcesTitle $isMobile={isMobile}>RESOURCES</StyledRightResourcesTitle>

			<StyledRightResourceRow>
				<StyledRightResourceLabel $isMobile={isMobile}>REST POINTS</StyledRightResourceLabel>
				<StyledRightResourceControls>
					<StyledRightResourceInput
						$isMobile={isMobile}
						type="number"
						value={currentValues.currentRestPoints}
						min={0}
						max={calculatedData.stats.finalRestPoints}
						onChange={(e) => {
							const val = Math.max(
								0,
								Math.min(Number(e.target.value), calculatedData.stats.finalRestPoints)
							);
							updateRestPoints(val);
						}}
					/>
					<StyledRightResourceMax $isMobile={isMobile}>/ {calculatedData.stats.finalRestPoints}</StyledRightResourceMax>
				</StyledRightResourceControls>
			</StyledRightResourceRow>

			<StyledRightResourceRow>
				<StyledRightResourceLabel $isMobile={isMobile}>GRIT POINTS</StyledRightResourceLabel>
				<StyledRightResourceControls>
					<StyledRightResourceInput
						$isMobile={isMobile}
						type="number"
						value={currentValues.currentGritPoints}
						min={0}
						max={calculatedData.stats.finalGritPoints}
						onChange={(e) => {
							const val = Math.max(
								0,
								Math.min(Number(e.target.value), calculatedData.stats.finalGritPoints)
							);
							updateGritPoints(val);
						}}
					/>
					<StyledRightResourceMax $isMobile={isMobile}>/ {calculatedData.stats.finalGritPoints}</StyledRightResourceMax>
				</StyledRightResourceControls>
			</StyledRightResourceRow>
		</StyledRightResourcesContainer>
	);
};

export default RightColumnResources;
