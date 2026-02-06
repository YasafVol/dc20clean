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
import Spells from './Spells.tsx';
import Maneuvers from './Maneuvers.tsx';
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
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { useNavigate, useLocation } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from '../../components/styled/index';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { cn } from '../../lib/utils';
import { Check, ChevronRight } from 'lucide-react';
import { SignIn, useIsAuthenticated } from '../../components/auth';
import { debug } from '../../lib/utils/debug';
import {
	PageContainer,
	StepperHeader,
	MobileProgressBar,
	ProgressFill,
	HeaderContent,
	NavSection,
	MobileTitle,
	StepperContainer,
	StepItem,
	StepNumber,
	StepLabel,
	StepSeparator,
	MainContent
} from './CharacterCreation.styled';

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
	const [pendingSave, setPendingSave] = useState(false); // Track if we're waiting for auth to save
	const storage = useMemo(() => getDefaultStorage(), []);
	const isAuthenticated = useIsAuthenticated();
	const isUsingConvex = import.meta.env.VITE_USE_CONVEX === 'true';

	// Debug current state on any changes
	useEffect(() => {
		debug.state('CharacterCreation State Debug:', {
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

	// Auto-save after authentication completes (when user was waiting to save)
	useEffect(() => {
		if (pendingSave && isAuthenticated && isUsingConvex) {
			debug.character('Auth completed, triggering pending save');
			setPendingSave(false);
			// Trigger the save by calling handleNext
			handleNext();
		}
	}, [isAuthenticated, pendingSave, isUsingConvex]);

	// Clear draft when creating NEW character (not editing or leveling up)
	useEffect(() => {
		if (!editChar && !isLevelUpMode && !levelUpCharacter) {
			debug.character('CharacterCreation: Creating NEW character - clearing any existing draft/level-up state');
			dispatch({ type: 'CLEAR_DRAFT' });
		}
	}, [editChar, isLevelUpMode, levelUpCharacter, dispatch]);

	// Initialize character state for edit mode
	useEffect(() => {
		if (editChar) {
			debug.character('CharacterCreation: Initializing edit mode for character:', editChar);
			const characterInProgress = convertCharacterToInProgress(editChar);
			debug.character('CharacterCreation: Converted to in-progress format:', {
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
			debug.character(
				'CharacterCreation: Initializing level-up mode for character:',
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

			debug.character('Level-up mode: Character data loaded', levelUpCharacter.finalName);
		}
	}, [isLevelUpMode, levelUpCharacter, dispatch]);

	// Dynamic steps based on level and class capabilities
	const getSteps = () => {
		// Determine if character has spells or maneuvers based on calculator results
		const hasSpells = (calculationResult?.spellsKnownSlots?.length ?? 0) > 0;
		const hasManeuvers = (calculationResult?.levelBudgets?.totalManeuversKnown ?? 0) > 0;

		// Log step gating calculation
		debug.state('Step gating calculated', {
			hasSpells,
			hasManeuvers,
			spellSlots: calculationResult?.spellsKnownSlots?.length ?? 0,
			maneuversKnown: calculationResult?.levelBudgets?.totalManeuversKnown ?? 0
		});

		const steps: Array<{ number: number; label: string }> = [];
		let stepNumber = 0;

		// Step 1: Class (always)
		stepNumber++;
		steps.push({ number: stepNumber, label: 'Class' });

		// Step 2: Leveling (if level > 1)
		if (state.level > 1) {
			stepNumber++;
			steps.push({ number: stepNumber, label: 'Leveling' });
		}

		// Fixed steps: Ancestry, Attributes, Background
		stepNumber++;
		steps.push({ number: stepNumber, label: 'Ancestry' });
		stepNumber++;
		steps.push({ number: stepNumber, label: 'Attributes' });
		stepNumber++;
		steps.push({ number: stepNumber, label: 'Background' });

		// Conditional: Spells (if character has spell slots)
		if (hasSpells) {
			stepNumber++;
			steps.push({ number: stepNumber, label: 'Spells' });
		}

		// Conditional: Maneuvers (if character has maneuvers known)
		if (hasManeuvers) {
			stepNumber++;
			steps.push({ number: stepNumber, label: 'Maneuvers' });
		}

		// Final step: Name (always)
		stepNumber++;
		steps.push({ number: stepNumber, label: 'Name' });

		return steps;
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
				setSnackbarMessage('Sign in to save your character.');
				setShowSnackbar(true);
				setPendingSave(true); // Mark that we want to save after auth
				setShowAuthDialog(true);
				return;
			}
			// Character is complete - check if we're editing, leveling up, or creating new
			if (state.isLevelUpMode && state.sourceCharacterId) {
				// Level-up mode: complete character then update existing
				debug.character('Completing level-up for character:', state.sourceCharacterId);

				// Create a custom onNavigateToLoad that updates instead of creates
				const originalId = state.sourceCharacterId;
				const allChars = await storage.getAllCharacters();
				const originalCreatedAt = allChars.find((c) => c.id === originalId)?.createdAt;

				await completeCharacter(state, {
				onShowSnackbar: (_message: string) => {
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
						debug.character('Character updated via level-up', originalId);
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
		// Build a mapping from step number to step label for dynamic validation
		const stepMap = new Map<number, string>();
		for (const s of steps) {
			stepMap.set(s.number, s.label);
		}

		const stepLabel = stepMap.get(step);

		debug.state('isStepCompleted debug:', {
			step,
			stepLabel,
			'state.level': state.level
		});

		switch (stepLabel) {
			case 'Class': {
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
				const selectedFeatureChoices: { [key: string]: string } =
					state.selectedFeatureChoices || {};

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
					debug.state('Class step incomplete: Subclass selection required at level', subclassLevel);
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
						debug.state(
							'Class step incomplete: Subclass feature choices incomplete',
							validation.incompleteChoices
						);
						return false;
					}
				}

				return true;
			}

			case 'Leveling': {
				// L2: Validation bypass controlled by environment variable
				const skipLevelingValidation = import.meta.env.VITE_SKIP_LEVELING_VALIDATION === 'true';
				if (skipLevelingValidation) {
					console.warn('⚠️ Leveling validation skipped (VITE_SKIP_LEVELING_VALIDATION=true)');
					return true;
				}

				// Get available budgets from progression resolver
				if (!state.classId || state.level <= 1) {
					return true; // No leveling choices needed at level 1
				}

				try {
					const progression = resolveClassProgression(state.classId, state.level);
					const availableTalents = progression.budgets?.totalTalents || 0;
					const availablePathPoints = progression.budgets?.totalPathPoints || 0;

					// Count multiclass selection as a talent
					const multiclassTalentUsed =
						state.selectedMulticlassOption && state.selectedMulticlassFeature ? 1 : 0;

					// Calculate used talents and path points
					const selectedTalentsCount = Object.values(state.selectedTalents || {}).reduce(
						(sum, count) => sum + count,
						0
					);
					const totalTalentsUsed = selectedTalentsCount + multiclassTalentUsed;
					const pathPointsUsed =
						(state.pathPointAllocations?.martial || 0) +
						(state.pathPointAllocations?.spellcasting || 0);

					debug.state('Leveling validation:', {
						availableTalents,
						totalTalentsUsed,
						availablePathPoints,
						pathPointsUsed,
						level: state.level
					});

					// Validate talents are fully spent
					if (availableTalents > 0 && totalTalentsUsed < availableTalents) {
						debug.warn(
							'State',
							`Talents not fully allocated: ${totalTalentsUsed}/${availableTalents}`
						);
						return false;
					}

					// Validate path points are fully spent
					if (availablePathPoints > 0 && pathPointsUsed < availablePathPoints) {
						debug.warn(
							'State',
							`Path points not fully allocated: ${pathPointsUsed}/${availablePathPoints}`
						);
						return false;
					}

					return true;
				} catch (error) {
					console.error('Failed to resolve progression for validation:', error);
					return true; // Allow progression if validation fails to avoid blocking
				}
			}

			case 'Ancestry': {
				// Use centralized calculator for ancestry points validation
				const ancestryData = calculationResult.ancestry || { ancestryPointsRemaining: 5 };
				const { ancestryPointsRemaining } = ancestryData;

				const hasAncestry = state.ancestry1Id !== null;
				const pointsValid = ancestryPointsRemaining >= 0;
				const allPointsSpent = ancestryPointsRemaining === 0;
				const isValid = hasAncestry && pointsValid && allPointsSpent;

				debug.state('Ancestry validation:', { step, stepLabel, isValid });
				return isValid;
			}

			case 'Attributes':
				return attributePointsRemaining === 0;

			case 'Background': {
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
					debug.state('Background validation FAILED:', {
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

			case 'Spells': {
				// Validate all spell slots are filled
				const spellSlots = calculationResult?.spellsKnownSlots || [];
				const selectedSpells = state.selectedSpells || {};
				const filledSlots = Object.keys(selectedSpells).length;

				const isValid = filledSlots === spellSlots.length;
				debug.spells('Spells step validation:', {
					totalSlots: spellSlots.length,
					filledSlots,
					isValid
				});
				return isValid;
			}

			case 'Maneuvers': {
				// Validate selected maneuvers equals totalManeuversKnown
				const totalManeuversKnown = calculationResult?.levelBudgets?.totalManeuversKnown || 0;
				const selectedManeuvers = state.selectedManeuvers || [];
				const selectedCount = selectedManeuvers.length;

				const isValid = selectedCount === totalManeuversKnown;
				debug.calculation('Maneuvers step validation:', {
					totalManeuversKnown,
					selectedCount,
					isValid
				});
				return isValid;
			}

			case 'Name':
				return (
					state.finalName !== null &&
					state.finalName !== '' &&
					state.finalPlayerName !== null &&
					state.finalPlayerName !== ''
				);

			default:
				// Unknown step
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

		debug.state('areAllStepsCompleted check:', {
			results,
			allCompleted
		});

		return allCompleted;
	};

	const renderCurrentStep = () => {
		// Build a mapping from step number to step label for dynamic routing
		const stepMap = new Map<number, string>();
		for (const step of steps) {
			stepMap.set(step.number, step.label);
		}

		const currentStepLabel = stepMap.get(state.currentStep);

		switch (currentStepLabel) {
			case 'Class':
				return (
					<>
						<ClassSelector />
						{state.classId && <ClassFeatures />}
					</>
				);
			case 'Leveling':
				return <LevelingChoices />;
			case 'Ancestry':
				return (
					<>
						<AncestrySelector />
						<SelectedAncestries />
					</>
				);
			case 'Attributes':
				return <Attributes />;
			case 'Background':
				return <Background />;
			case 'Spells':
				return <Spells />;
			case 'Maneuvers':
				return <Maneuvers />;
			case 'Name':
				return <CharacterName />;
			default:
				return null;
		}
	};

	return (
		<PageContainer>
			{/* Header with Navigation and Stepper */}
			<StepperHeader>
				{/* Mobile Stepper Progress Bar */}
				<MobileProgressBar>
					<ProgressFill $progress={(state.currentStep / maxStep) * 100} />
				</MobileProgressBar>

				<HeaderContent>
					{/* Left: Previous Button */}
					<NavSection $align="start">
						<SecondaryButton onClick={handlePrevious} disabled={state.currentStep === 1}>
							← <span style={{ marginLeft: '8px' }}>Previous</span>
						</SecondaryButton>
					</NavSection>

					{/* Center: Stepper (Desktop) or Title (Mobile) */}
					<NavSection $align="center" style={{ flex: 1, minWidth: 0 }}>
						{/* Mobile Title */}
						<MobileTitle>{editChar ? 'Edit' : 'Create'} Character</MobileTitle>

						{/* Desktop Stepper */}
						<StepperContainer>
							{steps.map(({ number, label }, index) => {
								const isActive = state.currentStep === number;
								const isCompleted = isStepCompleted(number);
								const isLast = index === steps.length - 1;

								return (
									<React.Fragment key={number}>
										<StepItem
											$isActive={isActive}
											$isCompleted={isCompleted}
											onClick={() => handleStepClick(number)}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<StepNumber $isActive={isActive} $isCompleted={isCompleted}>
												{isCompleted && !isActive ? <Check size={14} /> : number}
											</StepNumber>
											<StepLabel $isActive={isActive}>{label}</StepLabel>
										</StepItem>
										{!isLast && (
											<StepSeparator>
												<ChevronRight size={16} />
											</StepSeparator>
										)}
									</React.Fragment>
								);
							})}
						</StepperContainer>
					</NavSection>

					{/* Right: Next Button */}
					<NavSection $align="end">
						<PrimaryButton onClick={handleNext}>
							<span>{state.currentStep === maxStep ? 'Complete' : 'Next'}</span> →
						</PrimaryButton>
					</NavSection>
				</HeaderContent>
			</StepperHeader>

			<MainContent>{renderCurrentStep()}</MainContent>

			<Snackbar
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
			/>

			<Dialog
				open={showAuthDialog}
				onOpenChange={(open) => {
					setShowAuthDialog(open);
					if (!open) setPendingSave(false); // Clear pending save if dialog dismissed
				}}
			>
				<DialogContent className="border-purple-500/50 bg-transparent p-0 shadow-none">
					<SignIn
						feature="cloud-save"
						onSuccess={() => setShowAuthDialog(false)}
						onCancel={() => {
							setShowAuthDialog(false);
							setPendingSave(false);
						}}
					/>
				</DialogContent>
			</Dialog>
		</PageContainer>
	);
};

export default CharacterCreation;
