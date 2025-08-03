import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName, getLegacyChoiceId } from '../../lib/rulesdata/loaders/class-features.loader';
import { getDetailedClassFeatureDescription } from '../../lib/utils/classFeatureDescriptions';
import { maneuvers, ManeuverType } from '../../lib/rulesdata/maneuvers';
import { techniques } from '../../lib/rulesdata/techniques';
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
	StyledNoSelection,
	StyledBenefitsList,
	StyledBenefit,
	StyledBenefitName,
	StyledBenefitDescription
} from './styles/ClassFeatures.styles';

function ClassFeatures() {
	const { state, dispatch } = useCharacter();

	const selectedClass = classesData.find((c) => c.id === state.classId);
	const selectedClassFeatures = selectedClass ? findClassByName(selectedClass.name) : null;
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
		const currentValues: string[] = currentChoices[choiceId]
			? JSON.parse(currentChoices[choiceId])
			: [];

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

	if (!selectedClass || !selectedClassFeatures) {
		return (
			<StyledContainer>
				<StyledNoSelection>Select a Class to see its features.</StyledNoSelection>
			</StyledContainer>
		);
	}

	// Get level 1 features
	const level1Features = selectedClassFeatures.coreFeatures.filter(feature => feature.levelGained === 1);

	// Get all feature choices from level 1 features
	const featureChoices: any[] = [];
	level1Features.forEach((feature) => {
		if (feature.choices) {
			feature.choices.forEach((choice, choiceIndex) => {
				const choiceId = getLegacyChoiceId(selectedClassFeatures.className, feature.featureName, choiceIndex);
				featureChoices.push({
					id: choiceId,
					prompt: choice.prompt,
					type: choice.count > 1 ? 'select_multiple' : 'select_one',
					maxSelections: choice.count > 1 ? choice.count : undefined,
					options: choice.options?.map(option => ({
						value: option.name,
						label: option.name,
						description: option.description
					})) || []
				});
			});
		}
	});

	// Add martial choices based on class table and features
	const level1Data = selectedClass.levelProgression?.[0]; // Level 1 data from table
	if (level1Data) {
		// Get base maneuvers from table
		let tableManeuvers = level1Data.maneuversKnown || 0;
		let tableTechniques = level1Data.techniquesKnown || 0;
		
		// Add class-specific feature bonuses
		let featureManeuvers = 0;
		let featureTechniques = 0;
		
		// Check for class-specific martial bonuses from features
		if (selectedClassFeatures.className === 'Champion') {
			// Champion gets +2 maneuvers and +1 technique from Master-At-Arms
			featureManeuvers = 2;
			featureTechniques = 1;
		}
		
		const totalManeuvers = tableManeuvers + featureManeuvers;
		const totalTechniques = tableTechniques + featureTechniques;
		
		// Add maneuver choices if needed
		if (totalManeuvers > 0) {
			const availableManeuvers = selectedClassFeatures.className === 'Champion' 
				? maneuvers.filter(m => m.type !== ManeuverType.Attack) // Champion gets all Attack maneuvers automatically
				: maneuvers; // Other classes choose from all maneuvers
			
			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_maneuvers`,
				prompt: `Choose ${totalManeuvers} Maneuver${totalManeuvers > 1 ? 's' : ''}`,
				type: 'select_multiple',
				maxSelections: totalManeuvers,
				options: availableManeuvers.map(maneuver => ({
					value: maneuver.name,
					label: maneuver.name,
					description: `${maneuver.description}${maneuver.isReaction ? ' (Reaction)' : ''}${maneuver.requirement ? ` Requirement: ${maneuver.requirement}` : ''}`
				}))
			});
		}
		
		// Add technique choices if needed  
		if (totalTechniques > 0) {
			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_techniques`,
				prompt: `Choose ${totalTechniques} Technique${totalTechniques > 1 ? 's' : ''}`,
				type: totalTechniques > 1 ? 'select_multiple' : 'select_one',
				maxSelections: totalTechniques > 1 ? totalTechniques : undefined,
				options: techniques.map(technique => ({
					value: technique.name,
					label: technique.name,
					description: `${technique.description}${technique.isReaction ? ' (Reaction)' : ''}${technique.requirement ? ` Requirement: ${technique.requirement}` : ''} Cost: ${technique.cost.ap ? `${technique.cost.ap} AP` : ''}${technique.cost.sp ? ` ${technique.cost.sp} SP` : ''}`
				}))
			});
		}
	}

	return (
		<StyledContainer>
			<StyledTitle>{selectedClass.name} Features</StyledTitle>

			<StyledSection>
				<StyledSectionTitle>Level 1 Features</StyledSectionTitle>
				{level1Features.map((feature, index) => (
					<StyledCard key={index}>
						<StyledCardTitle>{feature.featureName}</StyledCardTitle>
						<StyledCardDescription>{feature.description}</StyledCardDescription>
						{feature.benefits && (
							<StyledBenefitsList>
								{feature.benefits.map((benefit, benefitIndex) => (
									<StyledBenefit key={benefitIndex}>
										<StyledBenefitName>{benefit.name}</StyledBenefitName>
										<StyledBenefitDescription>{benefit.description}</StyledBenefitDescription>
									</StyledBenefit>
								))}
							</StyledBenefitsList>
						)}
					</StyledCard>
				))}
			</StyledSection>

			{selectedClassFeatures.className === 'Champion' && (
				<StyledSection>
					<StyledSectionTitle>Automatic Maneuvers</StyledSectionTitle>
					<StyledCard>
						<StyledCardTitle>Attack Maneuvers (Automatically Known)</StyledCardTitle>
						<StyledCardDescription>
							As a Champion, you automatically know all Attack maneuvers. You will also choose 6 additional maneuvers and 1 technique below.
						</StyledCardDescription>
						<StyledBenefitsList>
							{maneuvers.filter(m => m.type === ManeuverType.Attack).map((maneuver, index) => (
								<StyledBenefit key={index}>
									<StyledBenefitName>{maneuver.name}</StyledBenefitName>
									<StyledBenefitDescription>{maneuver.description}</StyledBenefitDescription>
								</StyledBenefit>
							))}
						</StyledBenefitsList>
					</StyledCard>
				</StyledSection>
			)}

			{featureChoices.length > 0 && (
				<StyledSection>
					<StyledSectionTitle>Feature Choices</StyledSectionTitle>
					{featureChoices.map((choice: any) => (
						<StyledCard key={choice.id}>
							<StyledCardTitle>{choice.prompt}</StyledCardTitle>
							{choice.type === 'select_one' && (
								<StyledChoiceOptions>
									{choice.options.map((option: any) => {
										const detailedDescription = getDetailedClassFeatureDescription(
											choice.id,
											option.value
										);
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
													<StyledOptionDescription>
														{option.description || detailedDescription}
													</StyledOptionDescription>
												)}
											</StyledLabel>
										);
									})}
								</StyledChoiceOptions>
							)}
							{choice.type === 'select_multiple' && (
								<StyledChoiceOptions>
									{choice.options.map((option: any) => {
										const currentValues: string[] = selectedFeatureChoices[choice.id]
											? JSON.parse(selectedFeatureChoices[choice.id])
											: [];
										const isSelected = currentValues.includes(option.value);
										const canSelect = currentValues.length < (choice.maxSelections || 999);
										const isDisabled = !isSelected && !canSelect;
										const detailedDescription = getDetailedClassFeatureDescription(
											choice.id,
											option.value
										);

										return (
											<StyledLabel key={option.value} style={{ opacity: isDisabled ? 0.5 : 1 }}>
												<StyledRadio
													type="checkbox"
													name={choice.id}
													value={option.value}
													checked={isSelected}
													disabled={isDisabled}
													onChange={(e) =>
														handleMultipleFeatureChoice(choice.id, option.value, e.target.checked)
													}
												/>
												{option.label}
												{(option.description || detailedDescription) && (
													<StyledOptionDescription>
														{option.description || detailedDescription}
													</StyledOptionDescription>
												)}
											</StyledLabel>
										);
									})}
									{choice.maxSelections && (
										<StyledOptionDescription style={{ marginTop: '8px', fontStyle: 'italic' }}>
											Select up to {choice.maxSelections} options (
											{selectedFeatureChoices[choice.id]
												? JSON.parse(selectedFeatureChoices[choice.id]).length
												: 0}
											/{choice.maxSelections} selected)
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
