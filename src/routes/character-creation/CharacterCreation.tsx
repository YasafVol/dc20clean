import React, { useState, useEffect, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import LevelingChoices from './LevelingChoices.tsx';
import Background from './Background.tsx';
import SpellsAndManeuvers from './SpellsAndManeuvers.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import { completeCharacter } from '../../lib/services/characterCompletion';
import { completeCharacterEdit, convertCharacterToInProgress } from '../../lib/utils/characterEdit';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { convertSavedCharacterToContext } from '../../lib/utils/characterToContext';
import { getDefaultStorage } from '../../lib/storage';
import {
	convertToEnhancedBuildData,
	calculateCharacterWithBreakdowns
} from '../../lib/services/enhancedCharacterCalculator';
import { validateSubclassChoicesComplete } from '../../lib/rulesdata/classes-data/classUtils';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { cn } from '../../lib/utils';
import { Check, ChevronRight } from 'lucide-react';
import { AuthStatus, SignIn, useIsAuthenticated } from '../../components/auth';

/**
 * Converts the movements array from calculator into the movement structure for SavedCharacter
 */
function processMovementsToStructure(
	movements: Array<{ type: string; speed: string; source: any }>,
	groundSpeed: number
): {
	burrow: { half: boolean; full: boolean };
	swim: { half: boolean; full: boolean };
	fly: { half: boolean; full: boolean };
	climb: { half: boolean; full: boolean };
	glide: { half: boolean; full: boolean };
} {
	const movement = {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};

	for (const m of movements) {
		const type = m.type as keyof typeof movement;
		if (!movement[type]) continue; // Skip unknown movement types

		const speedValue = parseInt(m.speed, 10);
		if (isNaN(speedValue)) continue; // Skip if speed is not a number

		// Determine if movement is half or full speed
		const halfSpeed = Math.floor(groundSpeed / 2);
		if (speedValue >= groundSpeed) {
			movement[type].full = true;
		} else if (speedValue >= halfSpeed) {
			movement[type].half = true;
		}
	}

	return movement;
}

interface CharacterCreationProps {
	editCharacter?: SavedCharacter;
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({ editCharacter }) => {
	const navigate = useNavigate();
	const location = useLocation();
	// If editCharacter is not passed as prop, try to get it from location.state
	const editChar = editCharacter || (location.state && (location.state as any).editCharacter);
	// Check for level-up mode
	const levelUpCharacter = (location.state as any)?.levelUpCharacter;
	const isLevelUpMode = (location.state as any)?.isLevelUp;
	const { state, dispatch, attributePointsRemaining, calculationResult } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [showAuthDialog, setShowAuthDialog] = useState(false);
	const storage = useMemo(() => getDefaultStorage(), []);
	const isAuthenticated = useIsAuthenticated();
	const isUsingConvex = import.meta.env.VITE_USE_CONVEX === 'true';

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
	}, [
		state.ancestry1Id,
		state.ancestry2Id,
		state.selectedTraitIds,
		state.currentStep,
		calculationResult?.ancestry
	]);

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

	// Initialize character state for level-up mode
	useEffect(() => {
		if (isLevelUpMode && levelUpCharacter) {
			console.log(
				'⬆️ CharacterCreation: Initializing level-up mode for character:',
				levelUpCharacter.finalName
			);
			const contextData = convertSavedCharacterToContext(levelUpCharacter);

			// Dispatch all data
			dispatch({
				type: 'ENTER_LEVEL_UP_MODE',
				originalLevel: levelUpCharacter.level,
				characterId: levelUpCharacter.id
			});
			dispatch({ type: 'SET_CLASS', classId: contextData.classId! });
			dispatch({ type: 'SET_LEVEL', level: contextData.level! });

			if (contextData.ancestry1Id) {
				dispatch({
					type: 'SET_ANCESTRY',
					ancestry1Id: contextData.ancestry1Id,
					ancestry2Id: contextData.ancestry2Id || null
				});
			}
			if (contextData.selectedTraitIds && contextData.selectedTraitIds.length > 0) {
				dispatch({ type: 'SET_TRAITS', selectedTraitIds: contextData.selectedTraitIds });
			}
			if (contextData.selectedTraitChoices) {
				Object.entries(contextData.selectedTraitChoices).forEach(([key, value]) => {
					const [traitId, effectIndex] = key.split('-');
					dispatch({
						type: 'UPDATE_TRAIT_CHOICE',
						traitId,
						effectIndex: parseInt(effectIndex),
						choice: value
					});
				});
			}

			// Update attributes
			dispatch({
				type: 'UPDATE_STORE',
				updates: {
					attribute_might: contextData.attribute_might,
					attribute_agility: contextData.attribute_agility,
					attribute_charisma: contextData.attribute_charisma,
					attribute_intelligence: contextData.attribute_intelligence
				}
			});

			// Background
			dispatch({ type: 'UPDATE_SKILLS', skillsData: contextData.skillsData! });
			dispatch({ type: 'UPDATE_TRADES', tradesData: contextData.tradesData! });
			dispatch({ type: 'UPDATE_LANGUAGES', languagesData: contextData.languagesData! });
			dispatch({
				type: 'SET_CONVERSIONS',
				conversions: {
					skillToTrade: contextData.skillToTradeConversions,
					tradeToSkill: contextData.tradeToSkillConversions,
					tradeToLanguage: contextData.tradeToLanguageConversions
				}
			});

			// Leveling
			if (contextData.selectedTalents) {
				dispatch({ type: 'SET_SELECTED_TALENTS', talents: contextData.selectedTalents });
			}
			if (contextData.pathPointAllocations) {
				dispatch({ type: 'SET_PATH_POINTS', pathPoints: contextData.pathPointAllocations });
			}
			if (contextData.selectedSubclass) {
				dispatch({ type: 'SET_SUBCLASS', subclass: contextData.selectedSubclass });
			}
			if (contextData.selectedFeatureChoices) {
				dispatch({
					type: 'SET_FEATURE_CHOICES',
					selectedFeatureChoices: contextData.selectedFeatureChoices
				});
			}

			// Spells & Maneuvers
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: contextData.selectedSpells || [],
				maneuvers: contextData.selectedManeuvers || []
			});

			// Character Name
			dispatch({
				type: 'UPDATE_STORE',
				updates: {
					finalName: contextData.finalName,
					finalPlayerName: contextData.finalPlayerName
				}
			});

			console.log('✅ Level-up mode: Character data loaded', levelUpCharacter.finalName);
		}
	}, [isLevelUpMode, levelUpCharacter, dispatch]);

	// Dynamic steps based on level
	const getSteps = () => {
		const baseSteps = [{ number: 1, label: 'Class' }];

		// Add leveling choices step if level > 1
		if (state.level > 1) {
			baseSteps.push({ number: 2, label: 'Leveling' });
		}

		// Continue with remaining steps (offset by 1 if leveling choices exist)
		const offset = state.level > 1 ? 1 : 0;
		baseSteps.push(
			{ number: 2 + offset, label: 'Ancestry' },
			{ number: 3 + offset, label: 'Attributes' },
			{ number: 4 + offset, label: 'Background' },
			{ number: 5 + offset, label: 'Spells' },
			{ number: 6 + offset, label: 'Name' }
		);

		return baseSteps;
	};

	const steps = getSteps();
	const maxStep = steps[steps.length - 1].number;

	const handleStepClick = (step: number) => {
		dispatch({ type: 'SET_STEP', step });
	};

	const handleNext = async () => {
		// Check if current step is completed before allowing advancement
		if (!isStepCompleted(state.currentStep)) {
			setSnackbarMessage('Please complete all requirements for this step before continuing.');
			setShowSnackbar(true);
			return;
		}

		if (state.currentStep === maxStep && areAllStepsCompleted()) {
			if (isUsingConvex && !isAuthenticated) {
				setSnackbarMessage('Sign in to save to the cloud.');
				setShowSnackbar(true);
				setShowAuthDialog(true);
				return;
			}
			// Character is complete - check if we're editing, leveling up, or creating new
			if (state.isLevelUpMode && state.sourceCharacterId) {
				// Level-up mode: complete character then update existing
				console.log('⬆️ Completing level-up for character:', state.sourceCharacterId);

				// Create a custom onNavigateToLoad that updates instead of creates
				const originalId = state.sourceCharacterId;
				const allChars = await storage.getAllCharacters();
				const originalCreatedAt = allChars.find((c) => c.id === originalId)?.createdAt;

				await completeCharacter(state, {
					onShowSnackbar: (message: string) => {
						setSnackbarMessage('Character leveled up successfully!');
						setShowSnackbar(true);
					},
					onNavigateToLoad: async () => {
						// completeCharacter adds a new character, we need to replace it with updated original
						const updatedChars = await storage.getAllCharacters();
						const newChar = updatedChars[updatedChars.length - 1]; // Last one added

						// Update the original character, remove the new one
						const final = updatedChars
							.filter((c) => c.id !== newChar.id) // Remove newly created
							.map((char) => {
								if (char.id === originalId) {
									// Replace original with updated data
									return {
										...newChar,
										id: originalId,
										createdAt: originalCreatedAt || char.createdAt
									};
								}
								return char;
							});

						await storage.saveAllCharacters(final);
						console.log('✅ Character updated via level-up', originalId);
						navigate(`/character/${originalId}`);
					}
				});
			} else if (editChar) {
				// Edit mode: use the enhanced completion that preserves manual modifications
				// Use enhanced calculator for character editing
				const supportedClasses = [
					'barbarian',
					'cleric',
					'hunter',
					'champion',
					'wizard',
					'monk',
					'rogue',
					'sorcerer',
					'spellblade',
					'warlock',
					'bard',
					'druid',
					'commander'
				];

				if (supportedClasses.includes(state.classId || '')) {
					const enhancedData = convertToEnhancedBuildData(state);
					const enhancedResult = calculateCharacterWithBreakdowns(enhancedData);
					const enhancedCalculatorFn = async () => ({
						...enhancedResult.stats,
						grantedAbilities: enhancedResult.grantedAbilities,
						conditionalModifiers: enhancedResult.conditionalModifiers,
						breakdowns: enhancedResult.breakdowns,
						movement: processMovementsToStructure(
							enhancedResult.movements || [],
							enhancedResult.stats.finalMoveSpeed
						),
						holdBreath: enhancedResult.stats.finalMight
					});
					await completeCharacterEdit(editChar.id, state, enhancedCalculatorFn);
					// Force reload of saved characters in LoadCharacter
					localStorage.setItem('dc20_reload', String(Date.now()));
				} else {
					throw new Error(
						`Class "${state.classId}" is not supported. All classes should be migrated to the enhanced calculator.`
					);
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
		// Adjust step numbers based on whether leveling choices exist
		const hasLevelingStep = state.level > 1;
		const levelingStep = 2;
		const ancestryStep = hasLevelingStep ? 3 : 2;
		const attributesStep = hasLevelingStep ? 4 : 3;
		const backgroundStep = hasLevelingStep ? 5 : 4;
		const spellsStep = hasLevelingStep ? 6 : 5;
		const nameStep = hasLevelingStep ? 7 : 6;

		console.log('🔍 isStepCompleted debug:', {
			step,
			'state.level': state.level,
			hasLevelingStep,
			levelingStep,
			ancestryStep,
			attributesStep,
			backgroundStep,
			spellsStep,
			nameStep
		});

		// Step 1: Class Selection
		if (step === 1) {
			if (state.classId === null) return false;

			// Check if all required feature choices have been made
			const selectedClass = classesData.find(
				(c) => c.id.toLowerCase() === state.classId?.toLowerCase()
			);
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

			// NEW (M3.10d): Check if subclass selection is required
			const needsSubclass = calculationResult?.resolvedFeatures?.availableSubclassChoice;
			if (needsSubclass && !state.selectedSubclass) {
				const subclassLevel = calculationResult?.resolvedFeatures?.subclassChoiceLevel;
				console.log('❌ Step 1 incomplete: Subclass selection required at level', subclassLevel);
				return false;
			}

			// NEW (M3.11d): Validate all subclass feature choices are complete
			if (state.selectedSubclass && state.classId) {
				const validation = validateSubclassChoicesComplete(
					state.classId,
					state.selectedSubclass,
					state.level,
					state.selectedFeatureChoices || {}
				);

				if (!validation.isValid) {
					console.log(
						'❌ Step 1 incomplete: Subclass feature choices incomplete',
						validation.incompleteChoices
					);
					return false;
				}
			}

			return true;
		}

		// Step 2: Leveling Choices (only if level > 1)
		if (step === levelingStep && hasLevelingStep) {
			// TODO: Re-enable validation after testing phase (M4.4)
			console.warn(
				'⚠️ Leveling validation temporarily disabled - re-enable in production (see M4.4 in LEVELING_EPIC.md)'
			);
			return true; // ← Temporarily bypass validation
		}

		// Ancestry step
		if (step === ancestryStep) {
			// Use centralized calculator for ancestry points validation
			const ancestryData = calculationResult.ancestry || { ancestryPointsRemaining: 5 };
			const { ancestryPointsRemaining } = ancestryData;

			const hasAncestry = state.ancestry1Id !== null;
			const pointsValid = ancestryPointsRemaining >= 0;
			const allPointsSpent = ancestryPointsRemaining === 0;
			const isValid = hasAncestry && pointsValid && allPointsSpent;

			console.log('🔍 Ancestry validation:', { step, ancestryStep, isValid });
			return isValid;
		}

		// Attributes step
		if (step === attributesStep) {
			return attributePointsRemaining === 0;
		}

		// Background step
		if (step === backgroundStep) {
			// Use calculator's background data instead of recalculating
			const background = calculationResult?.background;
			if (!background) {
				console.warn('⚠️ Background validation: calculator result not available');
				return false;
			}

			// Calculate current usage
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
						if (langId === 'common') {
							return sum; // Common is free
						}
						const cost = data.fluency === 'limited' ? 1 : data.fluency === 'fluent' ? 2 : 0; // 'none' or any other value costs 0
						return sum + cost;
					},
					0
				);
			}

			// Use calculator's values instead of recalculating
			const availableSkillPoints = background.availableSkillPoints;
			const availableTradePoints = background.availableTradePoints;
			const availableLanguagePoints = background.availableLanguagePoints;

			// Calculate remaining points
			const skillPointsRemaining = availableSkillPoints - skillPointsUsed;
			const tradePointsRemaining = availableTradePoints - tradePointsUsed;
			const languagePointsRemaining = availableLanguagePoints - languagePointsUsed;

			// Require exact spending - no overspending or underspending allowed
			const hasExactlySpentAllSkillPoints = skillPointsRemaining === 0;
			const hasExactlySpentAllTradePoints = tradePointsRemaining === 0;
			const hasExactlySpentAllLanguagePoints = languagePointsRemaining === 0;

			// Step is complete when all skill points are spent and trade/language are spent or overspent
			const isValid =
				hasExactlySpentAllSkillPoints &&
				hasExactlySpentAllTradePoints &&
				hasExactlySpentAllLanguagePoints;

			if (!isValid) {
				console.log('❌ Background validation FAILED:', {
					hasExactlySpentAllSkillPoints,
					hasExactlySpentAllTradePoints,
					hasExactlySpentAllLanguagePoints,
					skillPointsRemaining,
					tradePointsRemaining,
					languagePointsRemaining
				});
			}

			return isValid;
		}

		// Spells & Maneuvers step
		if (step === spellsStep) {
			console.warn('⚠️ Spells & Maneuvers validation temporarily disabled');
			return true; // Always allow progression
		}

		// Character Name step
		if (step === nameStep) {
			return (
				state.finalName !== null &&
				state.finalName !== '' &&
				state.finalPlayerName !== null &&
				state.finalPlayerName !== ''
			);
		}

		// Unknown step
		return false;
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
		// Adjust step numbers dynamically
		const hasLevelingStep = state.level > 1;
		const ancestryStep = hasLevelingStep ? 3 : 2;
		const attributesStep = hasLevelingStep ? 4 : 3;
		const backgroundStep = hasLevelingStep ? 5 : 4;
		const spellsStep = hasLevelingStep ? 6 : 5;
		const nameStep = hasLevelingStep ? 7 : 6;

		if (state.currentStep === 1) {
			return (
				<>
					<ClassSelector />
					{state.classId && <ClassFeatures />}
				</>
			);
		}

		if (state.currentStep === 2 && hasLevelingStep) {
			return <LevelingChoices />;
		}

		if (state.currentStep === ancestryStep) {
			return (
				<>
					<AncestrySelector />
					<SelectedAncestries />
				</>
			);
		}

		if (state.currentStep === attributesStep) {
			return <Attributes />;
		}

		if (state.currentStep === backgroundStep) {
			return <Background />;
		}

		if (state.currentStep === spellsStep) {
			return <SpellsAndManeuvers />;
		}

		if (state.currentStep === nameStep) {
			return <CharacterName />;
		}

		return null;
	};

	return (
		<div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
			{/* Header with Navigation and Stepper */}
			<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
				<div className="container flex min-h-16 items-center justify-between px-4 py-2">
					{/* Left: Previous Button */}
					<div className="flex w-[120px] justify-start">
						<Button variant="ghost" onClick={handlePrevious} className="gap-2">
							← <span className="hidden sm:inline">Previous</span>
						</Button>
					</div>

					{/* Center: Stepper (Desktop) or Title (Mobile) */}
					<div className="flex flex-1 justify-center">
						{/* Mobile Title */}
						<span className="text-primary text-lg font-bold md:hidden">
							{editChar ? 'Edit' : 'Create'} Character
						</span>

						{/* Desktop Stepper */}
						<div className="hidden flex-1 items-center justify-center gap-1 md:flex md:flex-wrap">
							{steps.map(({ number, label }, index) => {
								const isActive = state.currentStep === number;
								const isCompleted = isStepCompleted(number);
								const isLast = index === steps.length - 1;

								return (
									<React.Fragment key={number}>
										<div
											className={cn(
												'group flex cursor-pointer items-center gap-2 rounded-full px-2 py-1.5 whitespace-nowrap transition-all duration-200',
												isActive
													? 'bg-primary text-primary-foreground shadow-md'
													: isCompleted
														? 'bg-primary/10 text-primary hover:bg-primary/20'
														: 'text-muted-foreground hover:bg-muted hover:text-foreground'
											)}
											onClick={() => handleStepClick(number)}
										>
											<div
												className={cn(
													'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors',
													isActive
														? 'bg-background text-primary'
														: isCompleted
															? 'bg-primary text-primary-foreground'
															: 'bg-muted-foreground/20'
												)}
											>
												{isCompleted && !isActive ? <Check className="h-3.5 w-3.5" /> : number}
											</div>
											<span className={cn('text-sm font-medium', isActive && 'font-bold')}>
												{label}
											</span>
										</div>
										{!isLast && (
											<ChevronRight className="text-muted-foreground/30 mx-1 h-4 w-4 shrink-0" />
										)}
									</React.Fragment>
								);
							})}
						</div>
					</div>

					{/* Right: Next Button */}
					<div className="flex w-[220px] items-center justify-end gap-3">
						<AuthStatus />
						<Button variant="default" onClick={handleNext} className="gap-2">
							<span className="hidden sm:inline">{state.currentStep === maxStep ? 'Complete' : 'Next'}</span>{' '}
							→
						</Button>
					</div>
				</div>

				{/* Mobile Stepper Progress Bar */}
				<div className="bg-muted h-1 w-full md:hidden">
					<div
						className="bg-primary h-full transition-all duration-300"
						style={{ width: `${(state.currentStep / maxStep) * 100}%` }}
					/>
				</div>
			</header>

			<main className="container mx-auto max-w-7xl flex-1 px-4 py-8">
				<h1 className="text-primary font-cinzel mb-8 text-center text-3xl font-bold md:text-4xl">
					{editChar ? `Edit Character: ${editChar.finalName}` : 'Character Creation'}
				</h1>

				{renderCurrentStep()}
			</main>

			<Snackbar
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
			/>

			<Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
				<DialogContent className="border-purple-500/50 bg-transparent p-0 shadow-none">
					<SignIn
						feature="cloud-save"
						onSuccess={() => setShowAuthDialog(false)}
						onCancel={() => setShowAuthDialog(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CharacterCreation;
