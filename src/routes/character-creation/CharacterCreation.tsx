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
	convertCharacterToInProgress
} from '../../lib/utils/characterEdit';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from '../../lib/services/enhancedCharacterCalculator';
import { traitsData } from '../../lib/rulesdata/_new_schema/traits';
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
import { CharacterCreationBG } from './styles/CharacterCreationBG.styles';
import { StyledStepsHeaderBG } from './styles/StepsHeaderBG.styles';

import { useNavigate, useLocation } from 'react-router-dom';

interface CharacterCreationProps {
	editCharacter?: SavedCharacter;
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({ editCharacter }) => {
	const navigate = useNavigate();
	const location = useLocation();
	// If editCharacter is not passed as prop, try to get it from location.state
	const editChar = editCharacter || (location.state && (location.state as any).editCharacter);
	const { state, dispatch, attributePointsRemaining, calculationResult } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);

	// Debug current state on any changes
	useEffect(() => {
		console.log('🐛 CharacterCreation State Debug:', {
			currentStep: state.currentStep,
			ancestry1Id: state.ancestry1Id,
			ancestry2Id: state.ancestry2Id,
			selectedTraitIds: state.selectedTraitIds,
			classId: state.classId,
			calculationResult: calculationResult?.ancestry
		});
	}, [state.ancestry1Id, state.ancestry2Id, state.selectedTraitIds, state.currentStep, calculationResult?.ancestry]);

	// Initialize character state for edit mode
	useEffect(() => {
		if (editChar) {
			console.log('🔄 CharacterCreation: Initializing edit mode for character:', editChar);
			const characterInProgress = convertCharacterToInProgress(editChar);
			console.log('🔄 CharacterCreation: Converted to in-progress format:', {
				selectedSpells: characterInProgress.selectedSpells,
				selectedManeuvers: characterInProgress.selectedManeuvers
			});

			// Initialize the character state with the existing character data
			dispatch({ type: 'INITIALIZE_FROM_SAVED', character: characterInProgress });
		}
	}, [editChar, dispatch]);

	const steps = [
		{ number: 1, label: 'Class & Features' },
		{ number: 2, label: 'Ancestry' },
		{ number: 3, label: 'Attributes' },
		{ number: 4, label: 'Background' },
		{ number: 5, label: 'Spells & Maneuvers' },
		{ number: 6, label: 'Character Name' }
	];

	const handleStepClick = (step: number) => {
		dispatch({ type: 'SET_STEP', step });
	};

	const handleNext = async () => {
		if (state.currentStep === 6 && areAllStepsCompleted()) {
			// Character is complete - check if we're editing or creating new
			if (editChar) {
				// Edit mode: use the enhanced completion that preserves manual modifications
				// Use enhanced calculator for character editing
				const supportedClasses = ['barbarian', 'cleric', 'hunter', 'champion', 'wizard', 'monk', 'rogue', 'sorcerer', 'spellblade', 'warlock', 'bard', 'druid', 'commander'];
				
				if (supportedClasses.includes(state.classId || '')) {
					const enhancedData = convertToEnhancedBuildData(state);
					const enhancedResult = calculateCharacterWithBreakdowns(enhancedData);
					const enhancedCalculatorFn = async () => ({ 
						...enhancedResult.stats,
						grantedAbilities: enhancedResult.grantedAbilities,
						conditionalModifiers: enhancedResult.conditionalModifiers,
						breakdowns: enhancedResult.breakdowns
					});
					await completeCharacterEdit(editChar.id, state, enhancedCalculatorFn);
					// Force reload of saved characters in LoadCharacter
					localStorage.setItem('dc20_reload', String(Date.now()));
				} else {
					throw new Error(`Class "${state.classId}" is not supported. All classes should be migrated to the enhanced calculator.`);
				}
				setSnackbarMessage('Character updated successfully! Manual modifications preserved.');
				setShowSnackbar(true);
				setTimeout(() => navigate('/load-character'), 2000);
			} else {
				// Create mode: use standard completion
				await completeCharacter(state, {
					onShowSnackbar: (message: string) => {
						setSnackbarMessage(message);
						setShowSnackbar(true);
					},
					onNavigateToLoad: () => navigate('/load-character')
				});
			}
			return;
		} else {
			dispatch({ type: 'NEXT_STEP' });
		}
	};

	const handlePrevious = () => {
		if (state.currentStep === 1) {
			navigate('/menu'); // Go back to home screen when on first step
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

				// FIXED: Use typed data instead of JSON parsing
				const selectedFeatureChoices: { [key: string]: string } = state.selectedFeatureChoices || {};

				// Check if spell school choices are required and have been made
				const spellList = selectedClassFeatures.spellcastingPath?.spellList;
				if (spellList) {
					// Check Warlock-style spell school selection
					if (spellList.type === 'all_schools' && spellList.schoolCount) {
						const choiceId = `${selectedClassFeatures.className.toLowerCase()}_spell_schools`;
						const choice = selectedFeatureChoices[choiceId];
						if (!choice) return false;
						// Expect arrays directly (no more legacy JSON string support)
						const selectedSchools = Array.isArray(choice) ? choice : [choice];
						if (selectedSchools.length !== spellList.schoolCount) return false;
					}

					// Check Spellblade-style additional school selection
					if (spellList.type === 'schools' && spellList.schoolCount && spellList.schoolCount > 0) {
						const choiceId = `${selectedClassFeatures.className.toLowerCase()}_additional_spell_schools`;
						const choice = selectedFeatureChoices[choiceId];
						if (!choice) return false;
						if (spellList.schoolCount > 1) {
							const selectedSchools = Array.isArray(choice) ? choice : [choice];
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
			case 2: {
				// Use centralized calculator for ancestry points validation
				const ancestryData = calculationResult.ancestry || { ancestryPointsRemaining: 5 };
				const { ancestryPointsRemaining } = ancestryData;
				
				// Step is complete if:
				// 1. At least one ancestry is selected AND
				// 2. Points are not over budget (>= 0) AND  
				// 3. All points are spent (== 0) for completion
				const hasAncestry = state.ancestry1Id !== null;
				const pointsValid = ancestryPointsRemaining >= 0;
				const allPointsSpent = ancestryPointsRemaining === 0;
				const isValid = hasAncestry && pointsValid && allPointsSpent;
				
				console.log('🔍 Step 2 (Ancestry) validation:', {
					ancestry1Id: state.ancestry1Id,
					ancestry2Id: state.ancestry2Id,
					selectedTraitIds: state.selectedTraitIds,
					ancestryPointsRemaining,
					hasAncestry,
					pointsValid,
					allPointsSpent,
					isValid
				});
				return isValid;
			}
			case 3:
				return attributePointsRemaining === 0;
			case 4: {
				// Background: check if ALL available points have been spent
				// Parse current selections
				let skillPointsUsed = 0;
				let tradePointsUsed = 0;
				let languagePointsUsed = 0;

				// FIXED: Use typed skillsData instead of JSON parsing
				if (state.skillsData && Object.keys(state.skillsData).length > 0) {
					skillPointsUsed = Object.values(state.skillsData).reduce(
						(sum: number, level: number) => sum + level,
						0
					);
				}

				// FIXED: Use typed tradesData instead of JSON parsing
				if (state.tradesData && Object.keys(state.tradesData).length > 0) {
					tradePointsUsed = Object.values(state.tradesData).reduce(
						(sum: number, level: number) => sum + level,
						0
					);
				}

				// FIXED: Use typed languagesData instead of JSON parsing
				if (state.languagesData && Object.keys(state.languagesData).length > 0) {
					languagePointsUsed = Object.entries(state.languagesData).reduce(
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

                // Available points should match BackgroundPointsManager (include bonus points and conversions)
                const intelligenceModifier = state.attribute_intelligence;
                
                // Calculate bonus skill points from traits and class features (same logic as BackgroundPointsManager)
                let bonusSkillPoints = 0;
                
                // From traits - FIXED: Use typed data instead of JSON parsing
                if (state.selectedTraitIds && Array.isArray(state.selectedTraitIds)) {
                    const selectedTraitIdsList: string[] = state.selectedTraitIds;
                    
                    console.log('🔍 Selected trait IDs:', selectedTraitIdsList);
                    
                    selectedTraitIdsList.forEach((traitId: string) => {
                            const trait = traitsData.find((t: any) => t.id === traitId);
                            console.log(`🔍 Processing trait ${traitId}:`, trait);
                            if (trait) {
                                trait.effects.forEach((effect: any) => {
                                    if (effect.type === 'MODIFY_STAT' && effect.target === 'skillPoints') {
                                        console.log(`🔍 Found skillPoints bonus: +${effect.value} from trait ${traitId}`);
                                        bonusSkillPoints += (effect.value as number);
                                    }
                                });
                            } else {
                                console.warn(`🚨 Trait not found: ${traitId}`);
                            }
                        });
                }
                
                // From class features  
                if (state.classId && state.selectedFeatureChoices) {
                    try {
                        const selectedClass = classesData.find((c) => c.id.toLowerCase() === state.classId?.toLowerCase());
                        const classFeatures = selectedClass ? findClassByName(selectedClass.name) : null;
                        
                        if (classFeatures) {
                            // FIXED: Use typed data instead of JSON parsing
                            const selectedChoices: { [key: string]: string } = state.selectedFeatureChoices || {};
                            const level1Features = classFeatures.coreFeatures.filter(
                                (feature: any) => feature.levelGained === 1
                            );

                            level1Features.forEach((feature: any) => {
                                // Check for direct feature effects first
                                if (feature.effects) {
                                    feature.effects.forEach((effect: any) => {
                                        if (effect.type === 'MODIFY_STAT' && effect.target === 'skillPoints') {
                                            bonusSkillPoints += (effect.value as number);
                                        }
                                    });
                                }

                                // Check for choice-based effects
                                if (feature.choices) {
                                    feature.choices.forEach((choice: any, choiceIndex: number) => {
                                        const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_${choiceIndex}`;
                                        const selectedOptions = selectedChoices[choiceId];

                                        if (selectedOptions) {
                                            let optionsToProcess: string[] = [];
                                            
                                            // Expect arrays directly (no more legacy JSON string support)
                                            if (Array.isArray(selectedOptions)) {
                                                optionsToProcess = selectedOptions;
                                            } else {
                                                optionsToProcess = [selectedOptions];
                                            }

                                            optionsToProcess.forEach((optionName) => {
                                                const selectedOption = choice.options?.find((opt: any) => opt.name === optionName);
                                                if (selectedOption && selectedOption.effects) {
                                                    selectedOption.effects.forEach((effect: any) => {
                                                        if (effect.type === 'MODIFY_STAT' && effect.target === 'skillPoints') {
                                                            bonusSkillPoints += (effect.value as number);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    } catch (error) {
                        // Ignore parsing errors
                    }
                }
                
                const baseSkillPoints = Math.max(1, 5 + intelligenceModifier + bonusSkillPoints);
                
                console.log('🔍 Skill Points Calculation:', {
                    base: 5,
                    intelligence: intelligenceModifier,
                    bonusFromTraits: bonusSkillPoints,
                    total: baseSkillPoints
                });
                const skillToTrade = state.skillToTradeConversions || 0;
                const tradeToSkill = state.tradeToSkillConversions || 0;
                const availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);

                // For completion, require exact spend of available skill points
                const skillPointsRemaining = availableSkillPoints - skillPointsUsed;
				const hasExactlySpentAllSkillPoints = skillPointsRemaining === 0;
				// Calculate available trade and language points using same logic as BackgroundPointsManager
				const bonusTradePoints = 0;
				const bonusLanguagePoints = 0;
				
				// Check for ancestry bonuses (simplified calculation)
				const baseTradePoints = 3 + bonusTradePoints;
				const baseLanguagePoints = 2 + bonusLanguagePoints;
				
				const availableTradePoints = baseTradePoints + Math.floor(skillToTrade / 2) - Math.floor(tradeToSkill / 2);
				const availableLanguagePoints = baseLanguagePoints; // No conversions affect language points currently
				
				// Allow completion if all skill points are spent AND either:
				// 1. Some trade/language points were spent, OR 
				// 2. No trade/language points are available to spend
				const hasSpentSomeTradeOrLanguagePoints = tradePointsUsed > 0 || languagePointsUsed > 0;
				const hasNoTradeOrLanguagePointsToSpend = availableTradePoints <= 0 && availableLanguagePoints <= 0;
				
				const isValid = hasExactlySpentAllSkillPoints && (hasSpentSomeTradeOrLanguagePoints || hasNoTradeOrLanguagePointsToSpend);

				console.log('🔍 Step 4 (Background) validation:', {
					baseSkillPoints,
					bonusSkillPoints,
					skillToTrade,
					tradeToSkill,
					availableSkillPoints,
					skillPointsUsed,
					skillPointsRemaining,
					baseTradePoints,
					baseLanguagePoints,
					availableTradePoints,
					availableLanguagePoints,
					tradePointsUsed,
					languagePointsUsed,
					hasExactlySpentAllSkillPoints,
					hasSpentSomeTradeOrLanguagePoints,
					hasNoTradeOrLanguagePointsToSpend,
					isValid
				});

				return isValid;
			}
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

				// Use typed arrays directly
				selectedSpells = state.selectedSpells || [];
				selectedManeuvers = state.selectedManeuvers || [];

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
		const results = steps.map((step) => ({
			step: step.number,
			label: step.label,
			completed: isStepCompleted(step.number)
		}));
		
		const allCompleted = results.every((result) => result.completed);
		
		console.log('🔍 areAllStepsCompleted check:', {
			results,
			allCompleted
		});
		
		return allCompleted;
	};

	const renderCurrentStep = () => {
		switch (state.currentStep) {
			case 1:
				return (
					<>
						<ClassSelector />
						{state.classId && <ClassFeatures />}
					</>
				);
			case 2:
				return (
					<>
						<AncestrySelector />
						<SelectedAncestries />
					</>
				);
			case 3:
				return <Attributes />;
			case 4:
				return <Background />;
			case 5:
				return <SpellsAndManeuvers />;
			case 6:
				return <CharacterName />;
			default:
				return null;
		}
	};

	return (
		<div style={{ position: 'relative', zIndex: 1 }}>
			<CharacterCreationBG />
			<StyledTitle>
				{editChar ? `Edit Character: ${editChar.finalName}` : 'Character Creation'}
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
					{steps.map(({ number, label }) => {
						const $active = state.currentStep === number;
						const $completed = number < state.currentStep;
						return (
							<StyledStep
								key={number}
								$active={$active}
								$completed={$completed}
								onClick={() => handleStepClick(number)}
							>
								<StyledStepNumber $active={$active} $completed={$completed}>
									{number}
								</StyledStepNumber>
								<StyledStepLabel $active={$active} $completed={$completed}>
									{label}
								</StyledStepLabel>
							</StyledStep>
						);
					})}
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

			<StyledStepsHeaderBG>
				<StyledContainer>{renderCurrentStep()}</StyledContainer>
			</StyledStepsHeaderBG>

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
