import React, { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import Background from './Background.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import { completeCharacter } from '../../lib/services/characterCompletion';
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

const CharacterCreation: React.FC<{ onNavigateToLoad: () => void }> = ({ onNavigateToLoad }) => {
	const { state, dispatch, attributePointsRemaining, ancestryPointsRemaining } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);

	const steps = [
		{ number: 1, label: 'Class & Features' },
		{ number: 2, label: 'Attributes' },
		{ number: 3, label: 'Background' },
		{ number: 4, label: 'Ancestry' },
		{ number: 5, label: 'Character Name' }
	];

	const handleStepClick = (step: number) => {
		dispatch({ type: 'SET_STEP', step });
	};

	const handleNext = async () => {
		if (state.currentStep === 5 && areAllStepsCompleted()) {
			// Character is complete, trigger completion using the service
			await completeCharacter(state, {
				onShowSnackbar: (message: string) => {
					setSnackbarMessage(message);
					setShowSnackbar(true);
				},
				onNavigateToLoad: onNavigateToLoad
			});
			return;
		} else {
			dispatch({ type: 'NEXT_STEP' });
		}
	};

	const handlePrevious = () => {
		dispatch({ type: 'PREVIOUS_STEP' });
	};

	const isStepCompleted = (step: number) => {
		switch (step) {
			case 1:
				return state.classId !== null;
			case 2:
				return attributePointsRemaining === 0;
			case 3: {
				// Background: check if meaningful selections have been made
				// Since conversions are local state and not persisted, we check for reasonable selections

				// Parse current selections
				let hasSkillSelections = false;
				let hasTradeSelections = false;
				let hasLanguageSelections = false;
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
						hasSkillSelections = skillPointsUsed > 0;
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
						hasTradeSelections = tradePointsUsed > 0;
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.languagesJson && state.languagesJson !== '{}') {
						const languages = JSON.parse(state.languagesJson) as Record<string, { fluency?: string }>;
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
						hasLanguageSelections = languagePointsUsed > 0;
					}
				} catch (e) {
					// Ignore parsing errors
				}

				// Calculate minimum expected points (without conversions)
				const intelligenceModifier = state.attribute_intelligence;
				const minSkillPoints = Math.max(1, 5 + intelligenceModifier); // At least 1, even with negative Int
				const minTradePoints = 3; // Base trade points
				const minLanguagePoints = 2; // Base language points

				// Step is complete if:
				// 1. User has made skill selections (at least some points spent)
				// 2. User has made selections in trades OR languages (or both)
				// 3. Total points used suggests they've engaged with the system meaningfully

				const totalMinPoints = minSkillPoints + minTradePoints + minLanguagePoints;
				const totalPointsUsed = skillPointsUsed + tradePointsUsed + languagePointsUsed;

				return (
					hasSkillSelections &&
					(hasTradeSelections || hasLanguageSelections) &&
					totalPointsUsed >= Math.floor(totalMinPoints * 0.6)
				); // Used at least 60% of base allocation
			}
			case 4:
				return state.ancestry1Id !== null && ancestryPointsRemaining >= 0;
			case 5:
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
				return <CharacterName />;
			default:
				return null;
		}
	};

	return (
		<div>
			<StyledTitle>Character Creation</StyledTitle>

			<StyledStepIndicator>
				<StyledNavigationButtons>
					<StyledButton
						$variant="secondary"
						onClick={handlePrevious}
						disabled={state.currentStep === 1}
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
						disabled={state.currentStep === 5 && !areAllStepsCompleted()}
					>
						{state.currentStep === 5 ? 'Complete' : 'Next →'}
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
