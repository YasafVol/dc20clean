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
import ConfirmationModal from '../../components/ConfirmationModal.tsx';
import { buildCharacterCreationSteps } from './characterCreationFlow';
import { completeCharacter } from '../../lib/services/characterCompletion';
import { completeCharacterEdit, convertCharacterToInProgress } from '../../lib/utils/characterEdit';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { convertSavedCharacterToContext } from '../../lib/utils/characterToContext';
import { getDefaultStorage } from '../../lib/storage';
import {
	convertToEnhancedBuildData,
	calculateCharacterWithBreakdowns
} from '../../lib/services/enhancedCharacterCalculator';
import { BuildStep } from '../../lib/types/effectSystem';
import { validateSubclassChoicesComplete } from '../../lib/rulesdata/classes-data/classUtils';
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { getPdfVersionForCharacter } from '../../lib/rulesdata/versioning/compatibility';
import { ALL_SPELLS } from '../../lib/rulesdata/spells-data';
import { allManeuvers } from '../../lib/rulesdata/martials/maneuvers';
import {
	matchesGlobalMagicProfile,
	matchesSpellRestrictions
} from '../../lib/services/spellFiltering';
import { useNavigate, useLocation } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from '../../components/styled/index';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { Check, ChevronRight } from 'lucide-react';
import { SignIn, useIsAuthenticated } from '../../components/auth';
import { debug } from '../../lib/utils/debug';
import { calculateHoldBreath } from '../../lib/utils/holdBreath';
import { useTranslation } from 'react-i18next';
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
	MainContent,
	RestartButton
} from './CharacterCreation.styled';

type CompletionAction = 'sheet' | 'pdf';

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
	const { t } = useTranslation();
	// If editCharacter is not passed as prop, try to get it from location.state
	const editChar = editCharacter || (location.state && (location.state as any).editCharacter);
	// Check for level-up mode
	const levelUpCharacter = (location.state as any)?.levelUpCharacter;
	const isLevelUpMode = (location.state as any)?.isLevelUp;
	const { state, dispatch, attributePointsRemaining, calculationResult } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [showAuthDialog, setShowAuthDialog] = useState(false);
	const [pendingCompletionAction, setPendingCompletionAction] = useState<CompletionAction | null>(
		null
	);
	const [showRestartModal, setShowRestartModal] = useState(false);
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
		if (pendingCompletionAction && isAuthenticated && isUsingConvex) {
			debug.character('Auth completed, triggering pending save');
			const action = pendingCompletionAction;
			setPendingCompletionAction(null);
			void completeCurrentCharacter(action);
		}
	}, [isAuthenticated, pendingCompletionAction, isUsingConvex]);

	// NOTE: Draft clearing and flow validation is now handled in characterContext.tsx
	// via getCurrentFlowType() and smart initialization logic. We no longer need
	// to manually clear drafts here - the context will automatically clear mismatched
	// flows and preserve drafts within the same flow.

	// Only set flowType to 'create' on mount for new characters (not editing/leveling)
	useEffect(() => {
		if (!editChar && !isLevelUpMode && !levelUpCharacter) {
			// Ensure flowType is set to 'create' for new character flow
			// But don't clear the draft - let the context handle that
			dispatch({ type: 'UPDATE_STORE', updates: { flowType: 'create' } });
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
				type: 'UPDATE_SKILL_LIMIT_ELEVATIONS',
				elevations: contextData.skillMasteryLimitElevations || {}
			});
			dispatch({
				type: 'UPDATE_TRADE_LIMIT_ELEVATIONS',
				elevations: contextData.tradeMasteryLimitElevations || {}
			});
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
				spells: contextData.selectedSpells || {},
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

		return buildCharacterCreationSteps({
			level: state.level,
			hasSpells,
			hasManeuvers,
			labels: {
				class: t('characterCreation.stepClass'),
				leveling: t('characterCreation.stepLeveling'),
				ancestry: t('characterCreation.stepAncestry'),
				attributes: t('characterCreation.stepAttributes'),
				background: t('characterCreation.stepBackground'),
				spells: t('characterCreation.stepSpells'),
				maneuvers: t('characterCreation.stepManeuvers'),
				name: t('characterCreation.stepName')
			}
		});
	};

	const steps = getSteps();
	const maxStep = steps[steps.length - 1].number;

	useEffect(() => {
		if (state.currentStep > maxStep) {
			dispatch({ type: 'SET_STEP', step: maxStep, maxStep });
		}
	}, [state.currentStep, maxStep, dispatch]);

	const handleStepClick = (step: number) => {
		if (!canNavigateToStep(step)) {
			setSnackbarMessage('Please complete prior steps before jumping ahead.');
			setShowSnackbar(true);
			return;
		}
		dispatch({ type: 'SET_STEP', step, maxStep });
	};

	const getSafeCharacterFileName = (character: SavedCharacter, extension: string) => {
		const safeName = (character.finalName || character.id || 'Character')
			.replace(/[^A-Za-z0-9]+/g, '_')
			.replace(/^_+|_+$/g, '')
			.slice(0, 60);
		return `${safeName || 'Character'}_vDC20-${(character.rulesVersion || '').replace('dc20-', '')}.${extension}`;
	};

	const exportSavedCharacterPdf = async (character: SavedCharacter) => {
		const pdf = await import('../../lib/pdf/transformers');
		const { fillPdfFromData } = await import('../../lib/pdf/fillPdf');
		const pdfData = pdf.transformSavedCharacterToPdfData(character);
		const blob = await fillPdfFromData(pdfData, {
			flatten: false,
			version: getPdfVersionForCharacter(character)
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = getSafeCharacterFileName(character, 'pdf');
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const completeCurrentCharacter = async (action: CompletionAction) => {
		if (!areAllStepsCompleted()) {
			setSnackbarMessage('Please complete all requirements before finishing.');
			setShowSnackbar(true);
			return;
		}

		if (isUsingConvex && !isAuthenticated) {
			setSnackbarMessage(t('characterCreation.signInToSave'));
			setShowSnackbar(true);
			setPendingCompletionAction(action);
			setShowAuthDialog(true);
			return;
		}

		let savedCharacter: SavedCharacter | null = null;

		if (state.isLevelUpMode && state.sourceCharacterId) {
			debug.character('Completing level-up for character:', state.sourceCharacterId);

			const originalId = state.sourceCharacterId;
			const allChars = await storage.getAllCharacters();
			const originalCharacter = allChars.find((c) => c.id === originalId);
			const createdCharacter = await completeCharacter(state, {
				onShowSnackbar: (_message: string) => {
					setSnackbarMessage(t('characterCreation.leveledUpSuccess'));
					setShowSnackbar(true);
				}
			});

			if (!createdCharacter) return;

			savedCharacter = {
				...createdCharacter,
				id: originalId,
				createdAt: originalCharacter?.createdAt || createdCharacter.createdAt
			};
			const updatedChars = (await storage.getAllCharacters())
				.filter((character) => character.id !== createdCharacter.id)
				.map((character) => (character.id === originalId ? savedCharacter! : character));

			await storage.saveAllCharacters(updatedChars);
			debug.character('Character updated via level-up', originalId);
		} else if (editChar) {
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

			if (!supportedClasses.includes(state.classId || '')) {
				throw new Error(
					`Class "${state.classId}" is not supported. All classes should be migrated to the enhanced calculator.`
				);
			}

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
				holdBreath: calculateHoldBreath(enhancedResult.stats.finalMight)
			});
			await completeCharacterEdit(editChar.id, state, enhancedCalculatorFn);
			localStorage.setItem('dc20_reload', String(Date.now()));
			savedCharacter =
				(await storage.getAllCharacters()).find((character) => character.id === editChar.id) ||
				null;
			setSnackbarMessage(t('characterCreation.updateSuccess'));
			setShowSnackbar(true);
		} else {
			savedCharacter = await completeCharacter(state, {
				onShowSnackbar: (message: string) => {
					setSnackbarMessage(message);
					setShowSnackbar(true);
				}
			});
		}

		if (!savedCharacter) return;

		if (action === 'pdf') {
			await exportSavedCharacterPdf(savedCharacter);
		}

		navigate(`/character/${savedCharacter.id}`);
	};

	const handleNext = async () => {
		// Check if current step is completed before allowing advancement
		if (!isStepCompleted(state.currentStep)) {
			setSnackbarMessage('Please complete all requirements for this step before continuing.');
			setShowSnackbar(true);
			return;
		}

		if (state.currentStep === maxStep && areAllStepsCompleted()) {
			await completeCurrentCharacter('sheet');
			return;
		} else {
			dispatch({ type: 'NEXT_STEP', maxStep });
		}
	};

	const handlePrevious = () => {
		if (state.currentStep === 1) {
			navigate('/menu'); // Go back to home screen when on first step
		} else {
			dispatch({ type: 'PREVIOUS_STEP' });
		}
	};

	const handleRestart = () => {
		setShowRestartModal(true);
	};

	const confirmRestart = () => {
		debug.character('Restarting character creation - clearing all data');
		dispatch({ type: 'CLEAR_DRAFT' });
		dispatch({ type: 'SET_STEP', step: 1, maxStep });
		setSnackbarMessage(t('characterCreation.restartSuccess'));
		setShowSnackbar(true);
		setShowRestartModal(false);
	};

	const canNavigateToStep = (targetStep: number) => {
		if (targetStep <= state.currentStep) return true;
		return steps
			.filter((step) => step.number < targetStep)
			.every((step) => isStepCompleted(step.number));
	};

	const getValidSpellSelections = () => {
		const spellSlots = calculationResult?.spellsKnownSlots || [];
		const selectedSpells = state.selectedSpells || {};
		const slotIds = new Set(spellSlots.map((slot: any) => slot.id));
		const entries = Object.entries(selectedSpells).filter(
			([slotId, spellId]) =>
				slotIds.has(slotId) && typeof spellId === 'string' && spellId.length > 0
		);
		const uniqueSpellIds = new Set(entries.map(([, spellId]) => spellId));

		const validEntries = entries.filter(([slotId, spellId]) => {
			const slot = spellSlots.find((candidate: any) => candidate.id === slotId) as any;
			const spell = ALL_SPELLS.find((candidate) => candidate.id === spellId);
			if (!slot || !spell) return false;
			if (
				slot.specificRestrictions &&
				!matchesSpellRestrictions(spell, slot.specificRestrictions)
			) {
				return false;
			}
			if (slot.isGlobal && calculationResult?.globalMagicProfile) {
				return matchesGlobalMagicProfile(spell, calculationResult.globalMagicProfile);
			}
			return true;
		});

		return {
			totalSlots: spellSlots.length,
			validCount: validEntries.length,
			selectedCount: Object.keys(selectedSpells).length,
			hasDuplicates: uniqueSpellIds.size !== entries.length
		};
	};

	const getValidManeuverSelections = () => {
		const selectedManeuvers = state.selectedManeuvers || [];
		const maneuverNames = new Set(allManeuvers.map((maneuver) => maneuver.name));
		const uniqueNames = new Set(selectedManeuvers);
		const validCount = selectedManeuvers.filter((maneuverName) =>
			maneuverNames.has(maneuverName)
		).length;

		return {
			selectedCount: selectedManeuvers.length,
			validCount,
			hasDuplicates: uniqueNames.size !== selectedManeuvers.length
		};
	};

	const isStepCompleted = (step: number) => {
		// Build a mapping from step number to step ID for language-independent validation
		const stepIdMap = new Map<number, string>();
		for (const s of steps) {
			stepIdMap.set(s.number, s.id);
		}

		const stepId = stepIdMap.get(step);

		debug.state('isStepCompleted debug:', {
			step,
			stepId,
			'state.level': state.level
		});

		switch (stepId) {
			case 'class': {
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

			case 'leveling': {
				// L2: Validation bypass controlled by environment variable
				const skipLevelingValidation = import.meta.env.VITE_SKIP_LEVELING_VALIDATION === 'true';
				if (skipLevelingValidation) {
					debug.warn('State', 'Leveling validation skipped (VITE_SKIP_LEVELING_VALIDATION=true)');
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
					debug.error('State', 'Failed to resolve progression for validation', error);
					return true; // Allow progression if validation fails to avoid blocking
				}
			}

			case 'ancestry': {
				// Use centralized calculator for ancestry points validation
				const ancestryData = calculationResult.ancestry || { ancestryPointsRemaining: 5 };
				const { ancestryPointsRemaining } = ancestryData;

				const hasAncestry = state.ancestry1Id !== null;
				const pointsValid = ancestryPointsRemaining >= 0;
				const allPointsSpent = ancestryPointsRemaining === 0;
				const isValid = hasAncestry && pointsValid && allPointsSpent;

				debug.state('Ancestry validation:', { step, stepId, isValid });
				return isValid;
			}

			case 'attributes':
				return attributePointsRemaining === 0;

			case 'background': {
				// Use calculator's background data instead of recalculating
				const background = calculationResult?.background;
				if (!background) {
					debug.warn('State', 'Background validation: calculator result not available');
					return false;
				}

				const availableSkillPoints = background.availableSkillPoints;
				const availableTradePoints = background.availableTradePoints;
				const availableLanguagePoints = background.availableLanguagePoints;

				// Calculate remaining points
				const skillPointsRemaining = availableSkillPoints - background.skillPointsUsed;
				const tradePointsRemaining = availableTradePoints - background.tradePointsUsed;
				const languagePointsRemaining = availableLanguagePoints - background.languagePointsUsed;

				// Require exact spending - no overspending or underspending allowed
				const hasExactlySpentAllSkillPoints = skillPointsRemaining === 0;
				const hasExactlySpentAllTradePoints = tradePointsRemaining === 0;
				const hasExactlySpentAllLanguagePoints = languagePointsRemaining === 0;
				const hasNoBackgroundErrors = !calculationResult.validation.errors.some(
					(error) => error.step === BuildStep.Background
				);

				// Step is complete when all background points are spent and calculator validation passes.
				const isValid =
					hasExactlySpentAllSkillPoints &&
					hasExactlySpentAllTradePoints &&
					hasExactlySpentAllLanguagePoints &&
					hasNoBackgroundErrors;

				if (!isValid) {
					debug.state('Background validation FAILED:', {
						hasExactlySpentAllSkillPoints,
						hasExactlySpentAllTradePoints,
						hasExactlySpentAllLanguagePoints,
						hasNoBackgroundErrors,
						skillPointsRemaining,
						tradePointsRemaining,
						languagePointsRemaining
					});
				}

				return isValid;
			}

			case 'spells': {
				const spellSelections = getValidSpellSelections();

				const isValid =
					spellSelections.selectedCount === spellSelections.totalSlots &&
					spellSelections.validCount === spellSelections.totalSlots &&
					!spellSelections.hasDuplicates;
				debug.spells('Spells step validation:', {
					totalSlots: spellSelections.totalSlots,
					selectedCount: spellSelections.selectedCount,
					validCount: spellSelections.validCount,
					hasDuplicates: spellSelections.hasDuplicates,
					isValid
				});
				return isValid;
			}

			case 'maneuvers': {
				// Validate selected maneuvers equals totalManeuversKnown
				const totalManeuversKnown = calculationResult?.levelBudgets?.totalManeuversKnown || 0;
				const maneuverSelections = getValidManeuverSelections();

				const isValid =
					maneuverSelections.selectedCount === totalManeuversKnown &&
					maneuverSelections.validCount === totalManeuversKnown &&
					!maneuverSelections.hasDuplicates;
				debug.calculation('Maneuvers step validation:', {
					totalManeuversKnown,
					selectedCount: maneuverSelections.selectedCount,
					validCount: maneuverSelections.validCount,
					hasDuplicates: maneuverSelections.hasDuplicates,
					isValid
				});
				return isValid;
			}

			case 'name':
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
		// Build a mapping from step number to step ID for dynamic routing (language-independent)
		const stepMap = new Map<number, string>();
		for (const step of steps) {
			stepMap.set(step.number, step.id);
		}

		const currentStepId = stepMap.get(state.currentStep);

		switch (currentStepId) {
			case 'class':
				return (
					<>
						<ClassSelector />
						{state.classId && <ClassFeatures />}
					</>
				);
			case 'leveling':
				return <LevelingChoices />;
			case 'ancestry':
				return (
					<>
						<AncestrySelector />
						<SelectedAncestries />
					</>
				);
			case 'attributes':
				return <Attributes />;
			case 'background':
				return <Background />;
			case 'spells':
				return <Spells />;
			case 'maneuvers':
				return <Maneuvers />;
			case 'name':
				return (
					<CharacterName
						onFinish={() => void completeCurrentCharacter('sheet')}
						onPrintPdf={() => void completeCurrentCharacter('pdf')}
					/>
				);
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
					{/* Left: Previous Button and Restart */}
					<NavSection $align="start">
						<SecondaryButton
							onClick={handlePrevious}
							disabled={state.currentStep === 1}
							data-testid="creation-previous"
						>
							{t('characterCreation.previous')}
						</SecondaryButton>
					</NavSection>

					{/* Center: Stepper (Desktop) or Title (Mobile) */}
					<NavSection $align="center" style={{ flex: 1, minWidth: 0 }}>
						{/* Mobile Title */}
						<MobileTitle>
							{editChar
								? t('characterCreation.editCharacter')
								: t('characterCreation.createCharacter')}
						</MobileTitle>

						{/* Desktop Stepper */}
						<StepperContainer>
							{steps.map(({ number, id, label }, index) => {
								const isActive = state.currentStep === number;
								const isCompleted = isStepCompleted(number);
								const isLast = index === steps.length - 1;

								return (
									<React.Fragment key={number}>
										<StepItem
											$isActive={isActive}
											$isCompleted={isCompleted}
											data-testid={`creation-step-${id}`}
											data-step-id={id}
											aria-current={isActive ? 'step' : undefined}
											onClick={() => handleStepClick(number)}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<StepNumber
												$isActive={isActive}
												$isCompleted={isCompleted}
												data-testid={`creation-step-number-${id}`}
											>
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
						{state.currentStep !== maxStep && (
							<PrimaryButton onClick={handleNext} data-testid="creation-next">
								<span>{t('characterCreation.next')}</span> →
							</PrimaryButton>
						)}
					</NavSection>
					<RestartButton onClick={handleRestart} title={t('characterCreation.restartTooltip')}>
						{t('characterCreation.restart')}
					</RestartButton>
				</HeaderContent>
			</StepperHeader>

			<MainContent>{renderCurrentStep()}</MainContent>

			<Snackbar
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
			/>

			<ConfirmationModal
				isOpen={showRestartModal}
				title={t('characterCreation.restartModalTitle')}
				message={t('characterCreation.restartModalMessage')}
				confirmText={t('characterCreation.yesRestart')}
				cancelText={t('common.cancel')}
				variant="danger"
				onConfirm={confirmRestart}
				onCancel={() => setShowRestartModal(false)}
			/>

			<Dialog
				open={showAuthDialog}
				onOpenChange={(open) => {
					setShowAuthDialog(open);
					if (!open) setPendingCompletionAction(null);
				}}
			>
				<DialogContent className="border-purple-500/50 bg-transparent p-0 shadow-none">
					<SignIn
						feature="cloud-save"
						onSuccess={() => setShowAuthDialog(false)}
						onCancel={() => {
							setShowAuthDialog(false);
							setPendingCompletionAction(null);
						}}
					/>
				</DialogContent>
			</Dialog>
		</PageContainer>
	);
};

export default CharacterCreation;
