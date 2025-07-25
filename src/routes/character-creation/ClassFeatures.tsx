import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { getDetailedClassFeatureDescription } from '../../lib/utils/classFeatureDescriptions';
import {
	StyledContainer,
	StyledTitle,
	StyledSection,
	StyledSectionTitle,
	StyledCard,
	StyledCardTitle,
	StyledCardDescription,
	StyledChoiceOptions,
	StyledLabel,
	StyledRadio,
	StyledOptionDescription,
	StyledNoSelection
} from './styles/ClassFeatures.styles';

function ClassFeatures() {
	const { state, dispatch } = useCharacter();

	const selectedClass = classesData.find((c) => c.id === state.classId);
	const selectedFeatureChoices: { [key: string]: string } = JSON.parse(
		state.selectedFeatureChoices || '{}'
	);

	function handleFeatureChoice(choiceId: string, value: string) {
		const currentChoices = { ...selectedFeatureChoices };
		currentChoices[choiceId] = value;
		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: JSON.stringify(currentChoices)
		});
	}

	function handleMultipleFeatureChoice(choiceId: string, value: string, isSelected: boolean) {
		const currentChoices = { ...selectedFeatureChoices };
		const currentValues: string[] = currentChoices[choiceId] ? JSON.parse(currentChoices[choiceId]) : [];
		
		if (isSelected) {
			// Add the value if not already present
			if (!currentValues.includes(value)) {
				currentValues.push(value);
			}
		} else {
			// Remove the value
			const index = currentValues.indexOf(value);
			if (index > -1) {
				currentValues.splice(index, 1);
			}
		}
		
		currentChoices[choiceId] = JSON.stringify(currentValues);
		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: JSON.stringify(currentChoices)
		});
	}

	if (!selectedClass) {
		return (
			<StyledContainer>
				<StyledNoSelection>Select a Class to see its features.</StyledNoSelection>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<StyledTitle>{selectedClass.name} Features</StyledTitle>

			<StyledSection>
				<StyledSectionTitle>Level 1 Features</StyledSectionTitle>
				{(selectedClass.level1Features || []).map((feature: any, index: number) => (
					<StyledCard key={index}>
						<StyledCardTitle>{feature.name}</StyledCardTitle>
						<StyledCardDescription>{feature.description}</StyledCardDescription>
					</StyledCard>
				))}
			</StyledSection>

			{selectedClass.featureChoicesLvl1 && selectedClass.featureChoicesLvl1.length > 0 && (
				<StyledSection>
					<StyledSectionTitle>Feature Choices</StyledSectionTitle>
					{selectedClass.featureChoicesLvl1.map((choice: any) => (
						<StyledCard key={choice.id}>
							<StyledCardTitle>{choice.prompt}</StyledCardTitle>
							{choice.type === 'select_one' && (
								<StyledChoiceOptions>
									{choice.options.map((option: any) => {
										const detailedDescription = getDetailedClassFeatureDescription(choice.id, option.value);
										return (
											<StyledLabel key={option.value}>
												<StyledRadio
													type="radio"
													name={choice.id}
													value={option.value}
													checked={selectedFeatureChoices[choice.id] === option.value}
													onChange={() => handleFeatureChoice(choice.id, option.value)}
												/>
												{option.label}
												{(option.description || detailedDescription) && (
													<StyledOptionDescription>({option.description || detailedDescription})</StyledOptionDescription>
												)}
											</StyledLabel>
										);
									})}
								</StyledChoiceOptions>
							)}
							{choice.type === 'select_multiple' && (
								<StyledChoiceOptions>
									{choice.options.map((option: any) => {
										const currentValues: string[] = selectedFeatureChoices[choice.id] ? JSON.parse(selectedFeatureChoices[choice.id]) : [];
										const isSelected = currentValues.includes(option.value);
										const canSelect = currentValues.length < (choice.maxSelections || 999);
										const isDisabled = !isSelected && !canSelect;
										const detailedDescription = getDetailedClassFeatureDescription(choice.id, option.value);
										
										return (
											<StyledLabel key={option.value} style={{ opacity: isDisabled ? 0.5 : 1 }}>
												<StyledRadio
													type="checkbox"
													name={choice.id}
													value={option.value}
													checked={isSelected}
													disabled={isDisabled}
													onChange={(e) => handleMultipleFeatureChoice(choice.id, option.value, e.target.checked)}
												/>
												{option.label}
												{(option.description || detailedDescription) && (
													<StyledOptionDescription>{option.description || detailedDescription}</StyledOptionDescription>
												)}
											</StyledLabel>
										);
									})}
									{choice.maxSelections && (
										<StyledOptionDescription style={{ marginTop: '8px', fontStyle: 'italic' }}>
											Select up to {choice.maxSelections} options ({(selectedFeatureChoices[choice.id] ? JSON.parse(selectedFeatureChoices[choice.id]).length : 0)}/{choice.maxSelections} selected)
										</StyledOptionDescription>
									)}
								</StyledChoiceOptions>
							)}
						</StyledCard>
					))}
				</StyledSection>
			)}
		</StyledContainer>
	);
}

export default ClassFeatures;
