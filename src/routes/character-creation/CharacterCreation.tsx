import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import Background from './Background.tsx';
import SpellsAndManeuvers from './SpellsAndManeuvers.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import { completeCharacter } from '../../lib/services/characterCompletion';
import {
	completeCharacterEdit,
	convertCharacterToInProgress,
	type SavedCharacter
} from '../../lib/utils/characterEdit';
import { calculateCharacterStats } from '../../lib/services/characterCalculator';
import {
	StyledContainer,
	StyledTitle,
	StyledStepIndicator,
	StyledStepsContainer,
	StyledStep,
	StyledStepNumber,
	StyledStepLabel,
	StyledNavigationButtons,
	StyledButton
} from './styles/CharacterCreation.styles';

interface CharacterCreationProps {
	onNavigateToLoad: () => void;
	onBackToMenu: () => void;
	editCharacter?: SavedCharacter; // If provided, we're in edit mode
	isLevelUp?: boolean; // If true, we're in level up mode
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({
	onNavigateToLoad,
	editCharacter,
	onBackToMenu,
	isLevelUp
}) => {
	const { state, dispatch, attributePointsRemaining, ancestryPointsRemaining } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);

	// Initialize character state for edit mode
	useEffect(() => {
		if (editCharacter) {
			console.log('🔄 CharacterCreation: Initializing edit mode for character:', editCharacter);
			const characterInProgress = convertCharacterToInProgress(editCharacter);
			console.log('🔄 CharacterCreation: Converted to in-progress format:', {
				selectedSpells: characterInProgress.selectedSpells,
				selectedManeuvers: characterInProgress.selectedManeuvers
			});

			// Initialize the character state with the existing character data
			dispatch({ type: 'INITIALIZE_FROM_SAVED', character: characterInProgress });
		}
	}, [editCharacter, dispatch]);

	const steps = [
		{ number: 1, label: 'Class & Features' },
		{ number: 2, label: 'Attributes' },
		{ number: 3, label: 'Background' },
		{ number: 4, label: 'Ancestry' },
		{ number: 5, label: 'Spells & Maneuvers' },
		{ number: 6, label: 'Character Name' }
	];

	const handleStepClick = (step: number) => {
		dispatch({ type: 'SET_STEP', step });
	};

	const handleNext = async () => {
		if (state.currentStep === 6 && areAllStepsCompleted()) {
			// Character is complete - check if we're editing or creating new
			if (editCharacter) {
				// Edit mode: use the enhanced completion that preserves manual modifications
				await completeCharacterEdit(editCharacter.id, state, calculateCharacterStats);
				setSnackbarMessage('Character updated successfully! Manual modifications preserved.');
				setShowSnackbar(true);
				setTimeout(() => onNavigateToLoad(), 2000);
			} else {
				// Create mode: use standard completion
				await completeCharacter(state, {
					onShowSnackbar: (message: string) => {
						setSnackbarMessage(message);
						setShowSnackbar(true);
					},
					onNavigateToLoad: onNavigateToLoad
				});
			}
			return;
		} else {
			dispatch({ type: 'NEXT_STEP' });
		}
	};

	const handlePrevious = () => {
		if (state.currentStep === 1) {
			onBackToMenu(); // Go back to home screen when on first step
		} else {
			dispatch({ type: 'PREVIOUS_STEP' });
		}
	};

	const isStepCompleted = (step: number) => {
		switch (step) {
			case 1: {
				if (state.classId === null) return false;

				// Check if all required feature choices have been made
				const selectedClass = classesData.find((c) => c.id.toLowerCase() === state.classId?.toLowerCase());
				if (!selectedClass) return false;

				// Check if all required feature choices have been made
				const selectedClassFeatures = findClassByName(selectedClass.name);
				if (!selectedClassFeatures) return false;

				const selectedFeatureChoices: { [key: string]: string } = JSON.parse(
					state.selectedFeatureChoices || '{}'
				);

				// Check if spell school choices are required and have been made
				const spellList = selectedClassFeatures.spellcastingPath?.spellList;
				if (spellList) {
					// Check Warlock-style spell school selection
					if (spellList.type === 'all_schools' && spellList.schoolCount) {
						const choiceId = `${selectedClassFeatures.className.toLowerCase()}_spell_schools`;
						const choice = selectedFeatureChoices[choiceId];
						if (!choice) return false;
						const selectedSchools = JSON.parse(choice);
						if (selectedSchools.length !== spellList.schoolCount) return false;
					}

					// Check Spellblade-style additional school selection
					if (spellList.type === 'schools' && spellList.schoolCount && spellList.schoolCount > 0) {
						const choiceId = `${selectedClassFeatures.className.toLowerCase()}_additional_spell_schools`;
						const choice = selectedFeatureChoices[choiceId];
						if (!choice) return false;
						if (spellList.schoolCount > 1) {
							const selectedSchools = JSON.parse(choice);
							if (selectedSchools.length !== spellList.schoolCount) return false;
						}
					}

					// Check Wizard-style feature-based spell school choices
					const level1Features = selectedClassFeatures.coreFeatures.filter(
						(feature) => feature.levelGained === 1
					);
					for (const feature of level1Features) {
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
							if (!selectedFeatureChoices[choiceId]) return false;
						}
					}
				}

				return true;
			}
			case 2:
				return attributePointsRemaining === 0;
			case 3: {
				// Background: check if ALL available points have been spent
				// Parse current selections
				let skillPointsUsed = 0;
				let tradePointsUsed = 0;
				let languagePointsUsed = 0;

				try {
					if (state.skillsJson && state.skillsJson !== '{}') {
						const skills = JSON.parse(state.skillsJson) as Record<string, number>;
						skillPointsUsed = Object.values(skills).reduce(
							(sum: number, level: number) => sum + level,
							0
						);
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.tradesJson && state.tradesJson !== '{}') {
						const trades = JSON.parse(state.tradesJson) as Record<string, number>;
						tradePointsUsed = Object.values(trades).reduce(
							(sum: number, level: number) => sum + level,
							0
						);
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.languagesJson && state.languagesJson !== '{}') {
						const languages = JSON.parse(state.languagesJson) as Record<
							string,
							{ fluency?: string }
						>;
						languagePointsUsed = Object.entries(languages).reduce(
							(sum, [langId, data]: [string, { fluency?: string }]) => {
								if (langId === 'common') return sum; // Common is free
								return (
									sum +
									(data.fluency === 'basic'
										? 1
										: data.fluency === 'advanced'
											? 2
											: data.fluency === 'fluent'
												? 3
												: 0)
								);
							},
							0
						);
					}
				} catch (e) {
					// Ignore parsing errors
				}

				// Calculate available points based on current Intelligence
				const intelligenceModifier = state.attribute_intelligence;
				const baseSkillPoints = Math.max(1, 5 + intelligenceModifier); // At least 1, even with negative Int

				// For completion, we require that:
				// 1. Skill points are exactly spent (not overspent, not underspent)
				// 2. At least some trade or language points are spent (showing engagement)
				const skillPointsRemaining = baseSkillPoints - skillPointsUsed;
				const hasExactlySpentAllSkillPoints = skillPointsRemaining === 0;
				const hasSpentSomeTradeOrLanguagePoints = tradePointsUsed > 0 || languagePointsUsed > 0;

				return hasExactlySpentAllSkillPoints && hasSpentSomeTradeOrLanguagePoints;
			}
			case 4:
				return state.ancestry1Id !== null && ancestryPointsRemaining >= 0;
			case 5:
				// Spells & Maneuvers step - validate based on class requirements
				if (!state.classId) return false;

				// Get class data to determine what's required
				const selectedClass = classesData.find((c) => c.id.toLowerCase() === state.classId?.toLowerCase());
				if (!selectedClass) return false;

				const selectedClassFeatures = findClassByName(selectedClass.name);
				if (!selectedClassFeatures) return false;

				// Parse current selections
				let selectedSpells: string[] = [];
				let selectedManeuvers: string[] = [];

				try {
					if (state.selectedSpells) {
						selectedSpells = JSON.parse(state.selectedSpells);
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.selectedManeuvers) {
						selectedManeuvers = JSON.parse(state.selectedManeuvers);
					}
				} catch (e) {
					// Ignore parsing errors
				}

				// Check if class has spellcasting
				const hasSpellcasting = selectedClassFeatures.spellcastingPath?.spellList;
				
				// Check if class has maneuvers (simplified check based on class features)
				// For now, we'll use a simple heuristic: classes that are primarily martial have maneuvers
				const martialClasses = ['barbarian', 'champion', 'hunter', 'monk', 'rogue'];
				const hasManeuvers = martialClasses.includes(selectedClass.name.toLowerCase());

				// If class has spellcasting, require spell selections
				if (hasSpellcasting) {
					// For classes with spellcasting, require at least some spell selections
					// The exact number depends on the class, but we'll require at least 1
					if (selectedSpells.length === 0) return false;
				}

				// If class has maneuvers, require maneuver selections
				if (hasManeuvers) {
					// For classes with maneuvers, require at least some maneuver selections
					// The exact number depends on the class, but we'll require at least 1
					if (selectedManeuvers.length === 0) return false;
				}

				// If class has neither spells nor maneuvers, step is complete
				if (!hasSpellcasting && !hasManeuvers) {
					return true;
				}

				// Step is complete if all required selections are made
				return true;
			case 6:
				return (
					state.finalName !== null &&
					state.finalName !== '' &&
					state.finalPlayerName !== null &&
					state.finalPlayerName !== ''
				);
			default:
				return false;
		}
	};

	const areAllStepsCompleted = () => {
		return steps.every((step) => isStepCompleted(step.number));
	};

	const renderCurrentStep = () => {
		switch (state.currentStep) {
			case 1:
				return (
					<>
						<ClassSelector />
						<ClassFeatures />
					</>
				);
			case 2:
				return <Attributes />;
			case 3:
				return <Background />;
			case 4:
				return (
					<>
						<AncestrySelector />
						<SelectedAncestries />
					</>
				);
			case 5:
				return <SpellsAndManeuvers />;
			case 6:
				return <CharacterName />;
			default:
				return null;
		}
	};

	return (
		<div>
			<StyledTitle>
				{editCharacter ? `Edit Character: ${editCharacter.finalName}` : 'Character Creation'}
			</StyledTitle>

			<StyledStepIndicator>
				<StyledNavigationButtons>
					<StyledButton
						$variant="secondary"
						onClick={handlePrevious}
					>
						← Previous
					</StyledButton>
				</StyledNavigationButtons>

				<StyledStepsContainer>
					{steps.map((step) => (
						<StyledStep
							key={step.number}
							$active={state.currentStep === step.number}
							$completed={isStepCompleted(step.number)}
							onClick={() => handleStepClick(step.number)}
						>
							<StyledStepNumber
								$active={state.currentStep === step.number}
								$completed={isStepCompleted(step.number)}
							>
								{isStepCompleted(step.number) ? '✓' : step.number}
							</StyledStepNumber>
							<StyledStepLabel
								$active={state.currentStep === step.number}
								$completed={isStepCompleted(step.number)}
							>
								{step.label}
							</StyledStepLabel>
						</StyledStep>
					))}
				</StyledStepsContainer>

				<StyledNavigationButtons>
					<StyledButton
						$variant="primary"
						onClick={handleNext}
						disabled={state.currentStep === 6 && !areAllStepsCompleted()}
					>
						{state.currentStep === 6 ? 'Complete' : 'Next →'}
					</StyledButton>
				</StyledNavigationButtons>
			</StyledStepIndicator>

			<StyledContainer>{renderCurrentStep()}</StyledContainer>

			<Snackbar
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
			/>
		</div>
	);
};

export default CharacterCreation;
