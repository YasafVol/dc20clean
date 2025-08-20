import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import {
	findClassByName,
	getLegacyChoiceId,
	getAvailableSpellSchools
} from '../../lib/rulesdata/loaders/class-features.loader';
import { SpellSchool } from '../../lib/rulesdata/spells-data/types/spell.types';
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

	const selectedClass = classesData.find(
		(c) => c.id.toLowerCase() === state.classId?.toLowerCase()
	);
	const selectedClassFeatures = selectedClass ? findClassByName(selectedClass.name) : null;
	// NEW: Use typed data instead of JSON parsing
	const selectedFeatureChoices: { [key: string]: string } = state.selectedFeatureChoices || {};

	function handleFeatureChoice(choiceId: string, value: string) {
		const currentChoices = { ...selectedFeatureChoices };
		currentChoices[choiceId] = value;
		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: currentChoices
		});
	}

	function handleMultipleFeatureChoice(choiceId: string, value: string, isSelected: boolean) {
		const currentChoices = { ...selectedFeatureChoices };
		// Handle arrays directly (no legacy JSON string support)
		const currentValues: string[] = Array.isArray(currentChoices[choiceId])
			? [...(currentChoices[choiceId] as any)]
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

		currentChoices[choiceId] = currentValues;
		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: currentChoices
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
	const level1Features = selectedClassFeatures.coreFeatures.filter(
		(feature) => feature.levelGained === 1
	);

	// Get all feature choices from level 1 features (excluding in-game tactical choices)
	const inGameChoices = ['Divine Blessing', "Commander's Call", 'Debilitating Strike'];
	const featureChoices: any[] = [];
	level1Features.forEach((feature) => {
		// Skip features that are in-game tactical choices, not character creation choices
		if (feature.choices && !inGameChoices.includes(feature.featureName)) {
			feature.choices.forEach((choice, choiceIndex) => {
				const choiceId = getLegacyChoiceId(
					selectedClassFeatures.className,
					feature.featureName,
					choiceIndex
				);
				featureChoices.push({
					id: choiceId,
					prompt: choice.prompt,
					type: choice.count > 1 ? 'select_multiple' : 'select_one',
					maxSelections: choice.count > 1 ? choice.count : undefined,
					options:
						choice.options?.map((option) => ({
							value: option.name,
							label: option.name,
							description: option.description
						})) || []
				});
			});
		}

		// NEW: Extract userChoice options from feature effects
		if (feature.effects) {
			feature.effects.forEach((effect, effectIndex) => {
				if (effect.userChoice) {
					const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_effect_${effectIndex}_user_choice`;

					// Transform the userChoice options into the format expected by the UI
					const options =
						effect.userChoice.options?.map((optionValue: string) => {
							// Create a human-readable label from the option value
							const label = optionValue
								.replace(/_/g, ' ')
								.replace(/\b\w/g, (l: string) => l.toUpperCase());
							return {
								value: optionValue,
								label: label,
								description: `Choose ${label.toLowerCase()} for this effect.`
							};
						}) || [];

					featureChoices.push({
						id: choiceId,
						prompt: effect.userChoice.prompt,
						type: 'select_one',
						options: options
					});
				}
			});
		}

		// Also check userChoice options in choice option effects
		if (feature.choices && !inGameChoices.includes(feature.featureName)) {
			feature.choices.forEach((choice, choiceIndex) => {
				const parentChoiceId = getLegacyChoiceId(
					selectedClassFeatures.className,
					feature.featureName,
					choiceIndex
				);

				choice.options?.forEach((option, optionIndex) => {
					// Only process userChoice effects if this option is actually selected
					const isOptionSelected = (() => {
						const selectedValues = selectedFeatureChoices[parentChoiceId];
						if (choice.count > 1) {
							// Multiple selection choice - check if option is in array
							return Array.isArray(selectedValues) && selectedValues.includes(option.name);
						} else {
							// Single selection choice - check if option matches
							return selectedValues === option.name;
						}
					})();

					if (isOptionSelected && (option as any).effects) {
						(option as any).effects.forEach((effect: any, effectIndex: number) => {
							if (effect.userChoice) {
								const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_choice_${choiceIndex}_option_${optionIndex}_effect_${effectIndex}_user_choice`;

								// Transform the userChoice options into the format expected by the UI
								const options =
									effect.userChoice.options?.map((optionValue: string) => {
										// Create a human-readable label from the option value
										const label = optionValue
											.replace(/_/g, ' ')
											.replace(/\b\w/g, (l: string) => l.toUpperCase());
										return {
											value: optionValue,
											label: label,
											description: `Choose ${label.toLowerCase()} for this effect.`
										};
									}) || [];

								featureChoices.push({
									id: choiceId,
									prompt: `${option.name}: ${effect.userChoice.prompt}`,
									type: 'select_one',
									options: options
								});
							}
						});
					}
				});
			});
		}
	});

	// Add martial choices based on class table and features
	const level1Data = selectedClass.levelProgression?.[0]; // Level 1 data from table
	if (level1Data) {
		// Get base maneuvers from table
		const tableManeuvers = level1Data.maneuversKnown || 0;
		const tableTechniques = level1Data.techniquesKnown || 0;

		// Add class-specific feature bonuses
		let featureManeuvers = 0;
		let featureTechniques = 0;

		// Parse feature descriptions to extract maneuver/technique bonuses
		selectedClassFeatures.coreFeatures.forEach((feature) => {
			if (feature.levelGained === 1) {
				// Check main feature description
				const description = feature.description.toLowerCase();

				// Look for "you learn X maneuvers" pattern (handles "you learn 2 maneuvers")
				const maneuverMatch = description.match(/you learn (\d+) (?:defensive )?maneuvers?/);
				if (maneuverMatch) {
					featureManeuvers += parseInt(maneuverMatch[1]);
				}

				// Look for "you learn 1 of the following maneuvers" pattern
				const specificManeuverMatch = description.match(/you learn 1 of the following maneuvers/);
				if (specificManeuverMatch) {
					featureManeuvers += 1;
				}

				// Look for "you learn X techniques" pattern
				const techniqueMatch = description.match(/you learn (\d+) techniques?/);
				if (techniqueMatch) {
					featureTechniques += parseInt(techniqueMatch[1]);
				}

				// Check benefits for maneuver/technique learning
				feature.benefits?.forEach((benefit) => {
					const benefitDescription = benefit.description.toLowerCase();

					// Look for "you learn X maneuvers" pattern in benefits
					const benefitManeuverMatch = benefitDescription.match(
						/you learn (\d+) (?:defensive )?maneuvers?/
					);
					if (benefitManeuverMatch) {
						featureManeuvers += parseInt(benefitManeuverMatch[1]);
					}

					// Look for "you learn 1 of the following maneuvers" pattern in benefits
					const benefitSpecificManeuverMatch = benefitDescription.match(
						/you learn 1 of the following maneuvers/
					);
					if (benefitSpecificManeuverMatch) {
						featureManeuvers += 1;
					}

					// Look for "you learn X techniques" pattern in benefits
					const benefitTechniqueMatch = benefitDescription.match(/you learn (\d+) techniques?/);
					if (benefitTechniqueMatch) {
						featureTechniques += parseInt(benefitTechniqueMatch[1]);
					}
				});
			}
		});

		const totalManeuvers = tableManeuvers + featureManeuvers;
		const totalTechniques = tableTechniques + featureTechniques;

		// Check if class gets all Attack maneuvers automatically
		const getsAllAttackManeuvers =
			selectedClassFeatures.className === 'Champion' ||
			selectedClassFeatures.martialPath?.maneuvers?.learnsAllAttack === true;

		// Add maneuver choices if needed
		if (totalManeuvers > 0) {
			const availableManeuvers = getsAllAttackManeuvers
				? maneuvers.filter((m) => m.type !== ManeuverType.Attack) // Class gets all Attack maneuvers automatically
				: maneuvers; // Other classes choose from all maneuvers

			const promptText = getsAllAttackManeuvers
				? `Choose ${totalManeuvers} Maneuver${totalManeuvers > 1 ? 's' : ''} (Attack maneuvers are automatic)`
				: `Choose ${totalManeuvers} Maneuver${totalManeuvers > 1 ? 's' : ''}`;

			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_maneuvers`,
				prompt: promptText,
				type: 'select_multiple',
				maxSelections: totalManeuvers,
				options: availableManeuvers.map((maneuver) => ({
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
				options: techniques.map((technique) => ({
					value: technique.name,
					label: technique.name,
					description: `${technique.description}${technique.isReaction ? ' (Reaction)' : ''}${technique.requirement ? ` Requirement: ${technique.requirement}` : ''} Cost: ${technique.cost.ap ? `${technique.cost.ap} AP` : ''}${technique.cost.sp ? ` ${technique.cost.sp} SP` : ''}`
				}))
			});
		}
	}

	// Add spell school choices if needed
	if (selectedClassFeatures.spellcastingPath?.spellList) {
		const spellList = selectedClassFeatures.spellcastingPath.spellList;

		if (spellList.type === 'all_schools' && spellList.schoolCount) {
			// Warlock-style: choose X schools from all available
			const availableSchools = Object.values(SpellSchool);
			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_spell_schools`,
				prompt: `Choose ${spellList.schoolCount} Spell School${spellList.schoolCount > 1 ? 's' : ''}`,
				type: 'select_multiple',
				maxSelections: spellList.schoolCount,
				options: availableSchools.map((school) => ({
					value: school,
					label: school,
					description: `Access to all spells from the ${school} school`
				}))
			});
		} else if (spellList.type === 'schools' && spellList.schoolCount && spellList.schoolCount > 0) {
			// Spellblade-style: choose X additional schools (already have specificSchools)
			const availableSchools = Object.values(SpellSchool);
			const alreadyHaveSchools = spellList.specificSchools || [];
			const choosableSchools = availableSchools.filter(
				(school) => !alreadyHaveSchools.includes(school)
			);

			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_additional_spell_schools`,
				prompt: `Choose ${spellList.schoolCount} additional Spell School${spellList.schoolCount > 1 ? 's' : ''} (you already have: ${alreadyHaveSchools.join(', ')})`,
				type: spellList.schoolCount > 1 ? 'select_multiple' : 'select_one',
				maxSelections: spellList.schoolCount > 1 ? spellList.schoolCount : undefined,
				options: choosableSchools.map((school) => ({
					value: school,
					label: school,
					description: `Access to all spells from the ${school} school`
				}))
			});
		}

		// Check for level 1 features that require spell school choices (like Wizard's Spell School Initiate)
		level1Features.forEach((feature) => {
			const description = feature.description.toLowerCase();
			// Only include features that are character creation choices, not in-game tactical choices
			const isCharacterCreationChoice =
				(description.includes('choose a spell school') ||
					description.includes('choose 1 spell school')) &&
				// Exclude in-game features like Arcane Sigil
				!description.includes('when you create') &&
				!description.includes('when you cast') &&
				!description.includes('you can spend') &&
				// Include features that are clearly character creation (like training/specialization)
				(description.includes('training') ||
					description.includes('specialize') ||
					description.includes('initiate') ||
					description.includes('you gain the following benefits'));

			if (isCharacterCreationChoice) {
				const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_school`;

				// Only add if not already added
				if (!featureChoices.some((choice) => choice.id === choiceId)) {
					const availableSchools = Object.values(SpellSchool);
					featureChoices.push({
						id: choiceId,
						prompt: `${feature.featureName}: Choose a Spell School`,
						type: 'select_one',
						options: availableSchools.map((school) => ({
							value: school,
							label: school,
							description: `Specialize in the ${school} school of magic`
						}))
					});
				}
			}
		});
	}

	return (
		<StyledContainer>
			<StyledTitle>{selectedClass.name} Features</StyledTitle>

			{/* Starting Equipment Section */}
			{selectedClassFeatures.startingEquipment && (
				<StyledSection>
					<StyledSectionTitle>Starting Equipment</StyledSectionTitle>
					<StyledCard>
						<StyledCardTitle>Equipment Package</StyledCardTitle>
						<StyledBenefitsList>
							{selectedClassFeatures.startingEquipment.weaponsOrShields && (
								<StyledBenefit>
									<StyledBenefitName>Weapons/Shields</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.startingEquipment.weaponsOrShields.join(', ')}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.startingEquipment.rangedWeapon && (
								<StyledBenefit>
									<StyledBenefitName>Ranged Weapon</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.startingEquipment.rangedWeapon}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.startingEquipment.armor && (
								<StyledBenefit>
									<StyledBenefitName>Armor</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.startingEquipment.armor}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.startingEquipment.packs && (
								<StyledBenefit>
									<StyledBenefitName>Adventure Packs</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.startingEquipment.packs}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
						</StyledBenefitsList>
					</StyledCard>
				</StyledSection>
			)}

			{/* Martial Path Section */}
			{selectedClassFeatures.martialPath && (
				<StyledSection>
					<StyledSectionTitle>Martial Training</StyledSectionTitle>
					<StyledCard>
						<StyledCardTitle>Combat Proficiencies</StyledCardTitle>
						<StyledBenefitsList>
							{selectedClassFeatures.martialPath.combatTraining?.weapons && (
								<StyledBenefit>
									<StyledBenefitName>Weapon Training</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.martialPath.combatTraining.weapons.join(', ')}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.martialPath.combatTraining?.armor && (
								<StyledBenefit>
									<StyledBenefitName>Armor Training</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.martialPath.combatTraining.armor.join(', ')}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.martialPath.combatTraining?.shields && (
								<StyledBenefit>
									<StyledBenefitName>Shield Training</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.martialPath.combatTraining.shields.join(', ')}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
						</StyledBenefitsList>
					</StyledCard>

					{selectedClassFeatures.martialPath.staminaRegen && (
						<StyledCard>
							<StyledCardTitle>Stamina Regeneration</StyledCardTitle>
							<StyledCardDescription>
								{selectedClassFeatures.martialPath.staminaRegen.description}
							</StyledCardDescription>
							{selectedClassFeatures.martialPath.staminaRegen.conditions && (
								<StyledBenefitsList>
									{selectedClassFeatures.martialPath.staminaRegen.conditions.map(
										(condition, index) => (
											<StyledBenefit key={index}>
												<StyledBenefitDescription>• {condition}</StyledBenefitDescription>
											</StyledBenefit>
										)
									)}
								</StyledBenefitsList>
							)}
						</StyledCard>
					)}
				</StyledSection>
			)}

			{/* Spellcasting Path Section */}
			{selectedClassFeatures.spellcastingPath && (
				<StyledSection>
					<StyledSectionTitle>Spellcasting Training</StyledSectionTitle>

					{/* Combat Training for Spellcasters */}
					{(selectedClassFeatures.spellcastingPath.combatTraining?.armor ||
						selectedClassFeatures.spellcastingPath.combatTraining?.shields) && (
						<StyledCard>
							<StyledCardTitle>Combat Proficiencies</StyledCardTitle>
							<StyledBenefitsList>
								{selectedClassFeatures.spellcastingPath.combatTraining?.armor && (
									<StyledBenefit>
										<StyledBenefitName>Armor Training</StyledBenefitName>
										<StyledBenefitDescription>
											{selectedClassFeatures.spellcastingPath.combatTraining.armor.join(', ')}
										</StyledBenefitDescription>
									</StyledBenefit>
								)}
								{selectedClassFeatures.spellcastingPath.combatTraining?.shields && (
									<StyledBenefit>
										<StyledBenefitName>Shield Training</StyledBenefitName>
										<StyledBenefitDescription>
											{selectedClassFeatures.spellcastingPath.combatTraining.shields.join(', ')}
										</StyledBenefitDescription>
									</StyledBenefit>
								)}
							</StyledBenefitsList>
						</StyledCard>
					)}

					{/* Spell List Information */}
					{selectedClassFeatures.spellcastingPath.spellList && (
						<StyledCard>
							<StyledCardTitle>Spell List Access</StyledCardTitle>
							<StyledBenefitsList>
								{selectedClassFeatures.spellcastingPath.spellList.listName && (
									<StyledBenefit>
										<StyledBenefitName>Spell List</StyledBenefitName>
										<StyledBenefitDescription>
											{selectedClassFeatures.spellcastingPath.spellList.listName}
										</StyledBenefitDescription>
									</StyledBenefit>
								)}
								{(() => {
									const availableSchools = getAvailableSpellSchools(selectedClassFeatures);
									return availableSchools.length > 0 ? (
										<StyledBenefit>
											<StyledBenefitName>Available Schools</StyledBenefitName>
											<StyledBenefitDescription>
												{selectedClassFeatures.spellcastingPath.spellList?.type === 'all_schools'
													? `Choose ${selectedClassFeatures.spellcastingPath.spellList.schoolCount || 'any'} from: ${availableSchools.join(', ')}`
													: availableSchools.join(', ')}
											</StyledBenefitDescription>
										</StyledBenefit>
									) : null;
								})()}
								{selectedClassFeatures.spellcastingPath.spellList.spellTags && (
									<StyledBenefit>
										<StyledBenefitName>Available Spell Tags</StyledBenefitName>
										<StyledBenefitDescription>
											{selectedClassFeatures.spellcastingPath.spellList.spellTags.join(', ')}
										</StyledBenefitDescription>
									</StyledBenefit>
								)}
								{selectedClassFeatures.spellcastingPath.spellList.description && (
									<StyledBenefit>
										<StyledBenefitName>Selection Method</StyledBenefitName>
										<StyledBenefitDescription>
											{selectedClassFeatures.spellcastingPath.spellList.description}
										</StyledBenefitDescription>
									</StyledBenefit>
								)}
							</StyledBenefitsList>
							{selectedClassFeatures.spellcastingPath.spellList.betaNote && (
								<StyledCardDescription>
									<strong>Beta Note:</strong>{' '}
									{selectedClassFeatures.spellcastingPath.spellList.betaNote}
								</StyledCardDescription>
							)}
						</StyledCard>
					)}

					{/* Spellcasting Progression */}
					<StyledCard>
						<StyledCardTitle>Spellcasting Progression</StyledCardTitle>
						<StyledBenefitsList>
							{selectedClassFeatures.spellcastingPath.cantrips && (
								<StyledBenefit>
									<StyledBenefitName>Cantrips Known</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.spellcastingPath.cantrips.knownIncreasesBy}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.spellcastingPath.spells && (
								<StyledBenefit>
									<StyledBenefitName>Spells Known</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.spellcastingPath.spells.knownIncreasesBy}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
							{selectedClassFeatures.spellcastingPath.manaPoints && (
								<StyledBenefit>
									<StyledBenefitName>Mana Points</StyledBenefitName>
									<StyledBenefitDescription>
										{selectedClassFeatures.spellcastingPath.manaPoints.maximumIncreasesBy}
									</StyledBenefitDescription>
								</StyledBenefit>
							)}
						</StyledBenefitsList>
					</StyledCard>
				</StyledSection>
			)}

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

			{/* Automatic Attack Maneuvers Section */}
			{(selectedClassFeatures.className === 'Champion' ||
				selectedClassFeatures.martialPath?.maneuvers?.learnsAllAttack === true) && (
				<StyledSection>
					<StyledSectionTitle>Automatic Maneuvers</StyledSectionTitle>
					<StyledCard>
						<StyledCardTitle>Attack Maneuvers (Automatically Known)</StyledCardTitle>
						<StyledCardDescription>
							{selectedClassFeatures.className === 'Champion'
								? 'As a Champion, you automatically know all Attack maneuvers. You will also choose additional maneuvers and techniques below.'
								: 'This class automatically knows all Attack maneuvers due to their martial training. You will also choose additional maneuvers below.'}
						</StyledCardDescription>
						<StyledBenefitsList>
							{maneuvers
								.filter((m) => m.type === ManeuverType.Attack)
								.map((maneuver, index) => (
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
										// Handle arrays directly (no legacy JSON string support)
										const currentValues: string[] = selectedFeatureChoices[choice.id]
											? Array.isArray(selectedFeatureChoices[choice.id])
												? (selectedFeatureChoices[choice.id] as unknown as string[])
												: []
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
												? Array.isArray(selectedFeatureChoices[choice.id])
													? (selectedFeatureChoices[choice.id] as unknown as string[]).length
													: 0
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
