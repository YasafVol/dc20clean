import React, {
	createContext,
	useContext,
	useEffect,
	useCallback,
	useMemo,
	useRef,
	useState
} from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import {
	useCharacterSheetReducer,
	type SheetState,
	type SheetAction
} from './useCharacterSheetReducer';
import { getDefaultStorage } from '../../../lib/storage';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import { logger } from '../../../lib/utils/logger';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../../../lib/services/enhancedCharacterCalculator';
import { assessCharacterCompatibility } from '../../../lib/rulesdata/versioning/compatibility';
import { ancestriesData } from '../../../lib/rulesdata/ancestries/ancestries';
import { traitsData } from '../../../lib/rulesdata/ancestries/traits';
import { tradesData } from '../../../lib/rulesdata/trades';
import { getLanguageDisplayName } from '../../../lib/rulesdata/languages';
import { findTalentById } from '../../../lib/rulesdata/classes-data/talents/talent.loader';
import {
	findClassByName,
	getLegacyChoiceId,
	getDisplayLabel
} from '../../../lib/rulesdata/loaders/class-features.loader';
import { getDetailedClassFeatureDescription } from '../../../lib/utils/classFeatureDescriptions';
import { calculateCharacterConditions } from '../../../lib/services/conditionAggregator';
import { normalizeSelectedTalents } from '../../../lib/utils/storageUtils';
import { calculateHoldBreath } from '../../../lib/utils/holdBreath';
import { useCampaignEventProducer } from './useCampaignEventProducer';

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

function sourceName(source: unknown): string {
	if (typeof source === 'string') return source;
	if (source && typeof source === 'object' && 'name' in source) {
		const name = (source as { name?: unknown }).name;
		if (typeof name === 'string' && name.length > 0) return name;
	}
	return 'Unknown Source';
}

// Simple debounce utility
function useDebounce<T extends (...args: any[]) => any>(
	callback: T,
	delay: number
): T & { cancel: () => void } {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	) as T & { cancel: () => void };

	debouncedCallback.cancel = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	return debouncedCallback;
}

type AttributeKey = 'might' | 'agility' | 'charisma' | 'intelligence';

const ATTRIBUTE_TIEBREAKER_INDEX: Record<AttributeKey, number> = {
	agility: 0,
	might: 1,
	charisma: 2,
	intelligence: 3
};

function getAttributeModifier(
	character: SavedCharacter | null | undefined,
	attribute: AttributeKey
): number {
	if (!character) {
		return 0;
	}

	switch (attribute) {
		case 'might':
			return character.finalMight ?? 0;
		case 'agility':
			return character.finalAgility ?? 0;
		case 'charisma':
			return character.finalCharisma ?? 0;
		case 'intelligence':
			return character.finalIntelligence ?? 0;
		default:
			return 0;
	}
}

interface TradeAttributeTotal {
	attribute: AttributeKey;
	total: number;
}

function sortTradeAttributeTotals(a: TradeAttributeTotal, b: TradeAttributeTotal): number {
	if (b.total !== a.total) {
		return b.total - a.total;
	}

	return ATTRIBUTE_TIEBREAKER_INDEX[a.attribute] - ATTRIBUTE_TIEBREAKER_INDEX[b.attribute];
}

type ConditionFeatureEntry = {
	id: string;
	featureName: string;
	effects?: any[];
	levelGained?: number;
};

type ConditionChoiceOption = {
	name: string;
	effects?: any[];
};

function parseSelectedFeatureChoices(rawChoices: unknown): Record<string, unknown> {
	if (rawChoices && typeof rawChoices === 'object' && !Array.isArray(rawChoices)) {
		return rawChoices as Record<string, unknown>;
	}

	if (typeof rawChoices !== 'string' || rawChoices.trim().length === 0) {
		return {};
	}

	try {
		const parsed = JSON.parse(rawChoices);
		return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
			? (parsed as Record<string, unknown>)
			: {};
	} catch {
		return {};
	}
}

function normalizeChoiceSelections(rawValue: unknown): string[] {
	if (Array.isArray(rawValue)) {
		return rawValue
			.filter((value): value is string => typeof value === 'string')
			.map((value) => value.trim())
			.filter((value) => value.length > 0);
	}

	if (typeof rawValue !== 'string') {
		return [];
	}

	const trimmed = rawValue.trim();
	if (!trimmed) {
		return [];
	}

	try {
		const parsed = JSON.parse(trimmed);
		if (Array.isArray(parsed)) {
			return normalizeChoiceSelections(parsed);
		}
		if (typeof parsed === 'string') {
			return normalizeChoiceSelections(parsed);
		}
	} catch {
		// Fall through to comma-separated handling.
	}

	return trimmed
		.split(',')
		.map((value) => value.trim())
		.filter((value) => value.length > 0);
}

function appendConditionFeatureEntries(
	target: ConditionFeatureEntry[],
	features: any[],
	selectedChoices: Record<string, unknown>,
	options: {
		className: string;
		classId?: string;
		subclassKey?: string;
	}
): void {
	for (const feature of features) {
		if (feature.effects?.length) {
			target.push({
				id: feature.id || feature.featureName,
				featureName: feature.featureName,
				effects: feature.effects,
				levelGained: feature.levelGained
			});
		}

		for (const benefit of feature.benefits ?? []) {
			if (benefit.effects?.length) {
				target.push({
					id: `${feature.id || feature.featureName}:${benefit.name}`,
					featureName: `${feature.featureName}: ${benefit.name}`,
					effects: benefit.effects,
					levelGained: feature.levelGained
				});
			}
		}

		for (let choiceIndex = 0; choiceIndex < (feature.choices?.length ?? 0); choiceIndex++) {
			const choice = feature.choices[choiceIndex];
			const selectionKeys = [
				choice.id,
				getLegacyChoiceId(options.className, feature.featureName, choiceIndex),
				options.classId && options.subclassKey && choice.id
					? `${options.classId}_${options.subclassKey}_${choice.id}`
					: undefined
			].filter((value): value is string => Boolean(value));

			const selectedOptionNames = Array.from(
				new Set(
					selectionKeys.flatMap((selectionKey) =>
						normalizeChoiceSelections(selectedChoices[selectionKey])
					)
				)
			);

			for (const selectedOptionName of selectedOptionNames) {
				const selectedOption = choice.options?.find(
					(option: ConditionChoiceOption) => option.name === selectedOptionName
				);

				if (selectedOption?.effects?.length) {
					target.push({
						id: `${feature.id || feature.featureName}:${choice.id || choiceIndex}:${selectedOptionName}`,
						featureName: `${feature.featureName}: ${selectedOptionName}`,
						effects: selectedOption.effects,
						levelGained: feature.levelGained
					});
				}
			}
		}
	}
}

// Context type that components will consume
interface CharacterSheetContextType {
	state: SheetState;
	dispatch: React.Dispatch<SheetAction>;
	// Helper functions from the reducer
	updateHP: (hp: number) => void;
	updateSP: (sp: number) => void;
	updateMP: (mp: number) => void;
	updateTempHP: (tempHP: number) => void;
	updateActionPoints: (ap: number) => void;
	updateExhaustion: (level: number) => void;
	updateDeathStep: (steps: number, isDead?: boolean) => void;
	setManualDefense: (pd?: number, ad?: number, pdr?: number) => void;
	setConditionToggle: (conditionId: string, active: boolean) => void;
	addAttack: (attack: any) => void;
	removeAttack: (attackId: string) => void;
	updateAttack: (attackId: string, attack: any) => void;
	resetAttacks: () => void;
	addSpell: (spell: any) => void;
	removeSpell: (spellId: string) => void;
	updateSpell: (spellId: string, field: string, value: any) => void;
	resetSpells: () => void;
	addManeuver: (maneuver: any) => void;
	removeManeuver: (maneuverId: string) => void;
	resetManeuvers: () => void;
	updateInventory: (items: any[]) => void;
	resetInventory: () => void;
	updateCurrency: (gold?: number, silver?: number, copper?: number) => void;
	updateNotes: (notes: string) => void;
	updateGritPoints: (grit: number) => void;
	updateRestPoints: (rest: number) => void;
	toggleActiveCondition: (conditionId: string) => void;
	setActiveConditionStacks: (conditionId: string, stacks: number) => void;
	updateDefenseOverrides: (overrides: {
		precisionAD?: number;
		areaAD?: number;
		precisionDR?: number;
	}) => void;
	setRageActive: (isRaging: boolean) => void;
	// Manual save function
	saveNow: () => Promise<void>;
	// Save status
	saveStatus: SaveStatus;
	retryFailedSave: () => void;
	// Read-only mode (campaign member viewing another's sheet)
	readOnly: boolean;
}

const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

interface CharacterSheetProviderProps {
	children: React.ReactNode;
	characterId: string;
	campaignId?: string;
}

export function CharacterSheetProvider({ children, characterId, campaignId }: CharacterSheetProviderProps) {
	const readOnly = !!campaignId;
	const {
		state,
		dispatch,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateActionPoints,
		updateExhaustion,
		updateDeathStep,
		setManualDefense,
		setConditionToggle,
		addAttack,
		removeAttack,
		updateAttack,
		resetAttacks,
		addSpell,
		removeSpell,
		updateSpell,
		resetSpells,
		addManeuver,
		removeManeuver,
		resetManeuvers,
		updateInventory,
		resetInventory,
		updateCurrency,
		updateNotes,
		updateGritPoints,
		updateRestPoints,
		toggleActiveCondition,
		setActiveConditionStacks,
		updateDefenseOverrides,
		setRageActive
	} = useCharacterSheetReducer(readOnly);

	// Campaign member view: fetch character via Convex query
	const campaignCharacter = useQuery(
		api.characters.getByIdForMember,
		campaignId ? { campaignId, characterId } : 'skip'
	);
	const storage = useMemo(() => getDefaultStorage(), []);
	const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
	const [savedHP, setSavedHP] = useState<number | null>(null);
	const [savedMaxHP, setSavedMaxHP] = useState<number | null>(null);
	const lastSavedHash = useRef<string>('');
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Save function that runs enhanced calculator and persists to storage
	const saveCharacterData = useCallback(
		async (character: SavedCharacter) => {
			if (!character) return;

			// Check if data actually changed
			const currentHash = JSON.stringify(character);
			if (currentHash === lastSavedHash.current) {
				logger.debug('storage', 'No changes detected, skipping save');
				return;
			}

			logger.debug('storage', 'Setting save status', { status: 'saving' });
			try {
				const compatibility = assessCharacterCompatibility(character);
				if (compatibility.autoSaveMode === 'none') {
					logger.warn('storage', 'Auto-save skipped for locked character', {
						characterId: character.id,
						reasons: compatibility.reasons
					});
					lastSavedHash.current = currentHash;
					setSaveStatus('idle');
					return;
				}

				if (compatibility.autoSaveMode === 'characterState') {
					await storage.saveCharacterState(character.id, character.characterState);
					lastSavedHash.current = currentHash;
					setSaveStatus('saved');
					if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
					saveTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
					return;
				}

				// Run enhanced calculator to get updated stats
				const calculationData = convertToEnhancedBuildData(character);
				const calculationResult = calculateCharacterWithBreakdowns(calculationData);

				// Update character with calculated values and original resource maxes
				const updatedCharacter: SavedCharacter = {
					...character,
					movement: processMovementsToStructure(
						calculationResult.movements || [],
						calculationResult.stats.finalMoveSpeed
					),
					holdBreath: calculateHoldBreath(calculationResult.stats.finalMight),
					resistances: calculationResult.resistances.map((resistance) => ({
						type: resistance.type,
						value: resistance.value,
						source: sourceName(resistance.source)
					})),
					vulnerabilities: calculationResult.vulnerabilities.map((vulnerability) => ({
						type: vulnerability.type,
						value: vulnerability.value,
						source: sourceName(vulnerability.source)
					})),
					senses: calculationResult.senses.map((sense) => ({
						type: sense.type,
						range: sense.range,
						source: sourceName(sense.source)
					})),
					combatTraining: calculationResult.combatTraining.map((training) => ({
						type: training.type,
						source: sourceName(training.source)
					})),
					characterState: {
						...character.characterState,
						resources: {
							...character.characterState.resources,
							original: {
								maxHP: calculationResult.stats.finalHPMax || 0,
								maxSP: calculationResult.stats.finalSPMax || 0,
								maxMP: calculationResult.stats.finalMPMax || 0,
								maxGritPoints: calculationResult.stats.finalGritPoints || 0,
								maxRestPoints: calculationResult.stats.finalRestPoints || 0
							}
						}
					}
				};

				// Save the entire character (includes spells, maneuvers, etc.)
				await storage.saveCharacter(updatedCharacter);
				lastSavedHash.current = currentHash;
				setSavedHP(updatedCharacter.characterState?.resources?.current?.currentHP ?? null);
				setSavedMaxHP(updatedCharacter.finalHPMax ?? null);

				logger.debug('storage', 'Character save successful', { characterId: character.id });
				logger.debug('storage', 'Character sheet data saved successfully', {
					characterId: character.id
				});

				// Reset to idle after 2 seconds
				if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
				saveTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
			} catch (error) {
				console.log('[GIMLI] Save FAILED! Setting status to ERROR', error);
				setSaveStatus('error');
				logger.warn(
					'calculation',
					'Calculator error during save, proceeding with last known values',
					{
						characterId: character.id,
						error: error instanceof Error ? error.message : String(error)
					}
				);
				// Save anyway with existing character data
				try {
					await storage.saveCharacter(character);

					lastSavedHash.current = currentHash;
					setSavedHP(character.characterState?.resources?.current?.currentHP ?? null);
					setSavedMaxHP(character.finalHPMax ?? null);
					setSaveStatus('saved');

					// Reset to idle after 2 seconds
					if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
					saveTimeoutRef.current = setTimeout(() => setSaveStatus('idle'), 2000);
				} catch (saveError) {
					setSaveStatus('error');
					logger.error('storage', 'Failed to save character data', {
						characterId: character.id,
						error: saveError instanceof Error ? saveError.message : String(saveError)
					});
				}
			}
		},
		[storage, setSavedHP, setSavedMaxHP]
	);

	// Debounced save function
	const debouncedSave = useDebounce(saveCharacterData, 2000);

	// Effect to auto-save when state changes (skip when readOnly)
	useEffect(() => {
		if (readOnly || !state.character) return () => debouncedSave.cancel();
		logger.debug('storage', 'Character state changed', {
			exists: !!state.character,
			id: state.character?.id,
			hpCurrent: state.character?.characterState?.resources?.current?.currentHP
		});
		logger.debug('storage', 'Auto-save effect triggered - queueing debounced save');
		debouncedSave(state.character);
		// Clean up on unmount
		return () => debouncedSave.cancel();
	}, [state.character, debouncedSave, readOnly]);

	// Cleanup save status timeout on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);

	// Effect to load character data on mount (campaign-aware)
	useEffect(() => {
		const loadCharacter = async () => {
			try {
				dispatch({ type: 'LOAD_START' });
				let characterData;
				if (campaignId) {
					// campaignCharacter: undefined = still loading, null = not found, object = found
					if (campaignCharacter === undefined) return;
					characterData = campaignCharacter ?? null;
				} else {
					characterData = await storage.getCharacterById(characterId);
				}
				if (characterData) {
					dispatch({ type: 'LOAD_SUCCESS', character: characterData });
				} else {
					dispatch({ type: 'LOAD_ERROR', error: 'Character not found' });
				}
			} catch (error) {
				logger.error('storage', 'Error loading character', {
					characterId,
					error: error instanceof Error ? error.message : String(error)
				});
				dispatch({
					type: 'LOAD_ERROR',
					error: `Failed to load character: ${error instanceof Error ? error.message : 'Unknown error'}`
				});
			}
		};
		loadCharacter();
	}, [characterId, campaignId, campaignCharacter, dispatch, storage]);

	// Manual save function exposed through context (no-op when readOnly)
	const saveNow = useCallback(async () => {
		if (readOnly) return;
		if (state.character) {
			// Cancel any pending debounced save
			debouncedSave.cancel();
			await saveCharacterData(state.character);
		}
	}, [readOnly, state.character, saveCharacterData, debouncedSave]);

	// Retry failed save function
	const retryFailedSave = useCallback(() => {
		if (readOnly || !state.character) return;
		saveCharacterData(state.character);
	}, [readOnly, state.character, saveCharacterData]);

	// Campaign event producer: fires well_bloodied / deaths_door / dead events after saves
	useCampaignEventProducer(
		state.character?.id ?? null,
		readOnly,
		savedHP,
		savedMaxHP,
		state.character?.finalName ?? null,
		state.character?.finalDeathThreshold ?? -10
	);

	const contextValue: CharacterSheetContextType = {
		state,
		dispatch,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateActionPoints,
		updateExhaustion,
		updateDeathStep,
		setManualDefense,
		setConditionToggle,
		addAttack,
		removeAttack,
		updateAttack,
		resetAttacks,
		addSpell,
		removeSpell,
		updateSpell,
		resetSpells,
		addManeuver,
		removeManeuver,
		resetManeuvers,
		updateInventory,
		resetInventory,
		updateCurrency,
		updateNotes,
		updateGritPoints,
		updateRestPoints,
		toggleActiveCondition,
		setActiveConditionStacks,
		updateDefenseOverrides,
		setRageActive,
		saveNow,
		saveStatus,
		retryFailedSave,
		readOnly
	};

	return (
		<CharacterSheetContext.Provider value={contextValue}>{children}</CharacterSheetContext.Provider>
	);
}

// Custom hook to consume the context
export function useCharacterSheet() {
	const context = useContext(CharacterSheetContext);
	if (context === undefined) {
		throw new Error('useCharacterSheet must be used within a CharacterSheetProvider');
	}
	return context;
}

// Selector hooks for commonly accessed data
export function useCharacterResources() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character?.characterState?.resources) return null;

		const resources = state.character.characterState.resources;
		const current = resources.current;

		// Handle cases where original might be missing (legacy data)
		const original = resources.original || {
			maxHP: state.character.finalHPMax || 0,
			maxSP: state.character.finalSPMax || 0,
			maxMP: state.character.finalMPMax || 0,
			maxGritPoints: state.character.finalGritPoints || 0,
			maxRestPoints: state.character.finalRestPoints || 0
		};

		// Clamp/sync Rest Points current to calculated max (handles ancestry HP bonuses changing max)
		const adjustedCurrent = {
			...current,
			currentRestPoints:
				current.currentRestPoints && current.currentRestPoints > 0
					? Math.min(current.currentRestPoints, original.maxRestPoints)
					: original.maxRestPoints
		};

		return {
			current: adjustedCurrent,
			original,
			// Derived values
			hpPercentage: original.maxHP > 0 ? (adjustedCurrent.currentHP / original.maxHP) * 100 : 0,
			spPercentage: original.maxSP > 0 ? (adjustedCurrent.currentSP / original.maxSP) * 100 : 0,
			mpPercentage: original.maxMP > 0 ? (adjustedCurrent.currentMP / original.maxMP) * 100 : 0
		};
	}, [
		state.character?.characterState?.resources,
		state.character?.finalHPMax,
		state.character?.finalSPMax,
		state.character?.finalMPMax
	]);
}

export function useCharacterDefenses() {
	const { state } = useCharacterSheet();
	const calculatedData = useCharacterCalculatedData();

	return useMemo(() => {
		if (!state.character) return null;

		// Get manual overrides from UI state
		const manualOverrides = state.character.characterState?.ui?.manualDefenseOverrides || {};

		// Get calculated base values (these would come from character calculation)
		const baseDefenses = calculatedData?.stats
			? {
					PD: calculatedData.stats.finalPD || 0,
					AD: calculatedData.stats.finalAD || 0,
					PDR: calculatedData.stats.finalPDR || 0
				}
			: {
					PD: state.character.finalPD || 0,
					AD: state.character.finalAD || 0,
					PDR: state.character.finalPDR || 0
				};

		// Return effective values (manual override takes precedence)
		return {
			PD: manualOverrides.PD ?? baseDefenses.PD,
			AD: manualOverrides.AD ?? baseDefenses.AD,
			PDR: manualOverrides.PDR ?? baseDefenses.PDR,
			manualOverrides
		};
	}, [state.character, calculatedData]);
}

export function useCharacterAttacks() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		return state.character?.characterState?.attacks || [];
	}, [state.character?.characterState?.attacks]);
}

export function useCharacterInventory() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		return (
			state.character?.characterState?.inventory || {
				items: [],
				currency: { goldPieces: 0, silverPieces: 0, copperPieces: 0 }
			}
		);
	}, [state.character?.characterState?.inventory]);
}

export function useCharacterSpells() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return state.character?.spells || [];
	}, [state.character?.spells]);
}

export function useCharacterManeuvers() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return state.character?.maneuvers || [];
	}, [state.character?.maneuvers]);
}

export function useCharacterFeatures() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;
		const features: any[] = [];

		// Get ancestry default traits
		const ancestry1 = ancestriesData.find((a) => a.name === character.ancestry1Name);
		if (ancestry1) {
			ancestry1.defaultTraitIds?.forEach((traitId) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait) {
					features.push({
						id: trait.id,
						name: trait.name,
						description: trait.description,
						source: 'ancestry',
						sourceDetail: `${ancestry1.name} (Default)`
					});
				}
			});
		}

		// Get selected ancestry traits
		if (character.selectedTraitIds) {
			try {
				let selectedTraitIds: string[] = [];

				if (Array.isArray(character.selectedTraitIds)) {
					// Already an array
					selectedTraitIds = character.selectedTraitIds;
				} else {
					// Convert to string to handle parsing
					const traitIdsStr = String(character.selectedTraitIds);

					// Handle both JSON string and comma-separated string formats
					if (traitIdsStr.startsWith('[') || traitIdsStr.startsWith('{')) {
						// Looks like JSON, try parsing
						selectedTraitIds = JSON.parse(traitIdsStr);
					} else {
						// Assume comma-separated string (legacy format)
						selectedTraitIds = traitIdsStr
							.split(',')
							.map((id: string) => id.trim())
							.filter((id: string) => id.length > 0);
					}
				}

				selectedTraitIds.forEach((traitId) => {
					const trait = traitsData.find((t) => t.id === traitId);
					if (trait) {
						// Check if this trait is not already added as default
						const alreadyAdded = features.some((f) => f.id === trait.id);
						if (!alreadyAdded) {
							const sourceAncestry = ancestriesData.find(
								(a) => a.expandedTraitIds.includes(traitId) || a.defaultTraitIds?.includes(traitId)
							);
							features.push({
								id: trait.id,
								name: trait.name,
								description: trait.description,
								source: 'ancestry',
								sourceDetail: `${sourceAncestry?.name || 'Unknown'} (Selected)`
							});
						}
					}
				});
			} catch (error) {
				logger.error('ui', 'Error parsing selected traits', {
					error: error instanceof Error ? error.message : String(error),
					selectedTraitIds: character.selectedTraitIds
				});
			}
		}

		// Get class features from the new class features structure
		const selectedClassFeatures = findClassByName(character.className);

		if (selectedClassFeatures) {
			// Add level 1 core features
			selectedClassFeatures.coreFeatures
				.filter((feature: any) => feature.levelGained === 1)
				.forEach((feature: any) => {
					features.push({
						id: feature.featureName,
						name: feature.featureName,
						description: feature.description,
						source: 'class',
						sourceDetail: `${selectedClassFeatures.className} (Lvl 1)`
					});
				});

			// Add selected feature choices
			if (character.selectedFeatureChoices) {
				try {
					// Try to parse as JSON first
					let selectedChoices: { [key: string]: string } = {};

					// Handle new data structure - selectedFeatureChoices is already an object
					if (
						typeof character.selectedFeatureChoices === 'object' &&
						character.selectedFeatureChoices !== null
					) {
						selectedChoices = character.selectedFeatureChoices as { [key: string]: string };
					} else if (typeof character.selectedFeatureChoices === 'string') {
						// Legacy handling - try to parse as JSON string
						try {
							selectedChoices = JSON.parse(character.selectedFeatureChoices);
						} catch (jsonError) {
							// If JSON parsing fails, it might be legacy comma-separated data
							logger.warn(
								'ui',
								'Failed to parse selectedFeatureChoices as JSON, attempting legacy format conversion',
								{ selectedFeatureChoices: character.selectedFeatureChoices }
							);
							logger.warn('ui', 'Skipping feature choices processing due to legacy data format');
							return features;
						}
					}

					// Process each core feature that has choices
					selectedClassFeatures.coreFeatures.forEach((feature) => {
						if (feature.choices) {
							feature.choices.forEach((choice, choiceIndex) => {
								// Use the same mapping logic as the class-features loader
								const choiceId = getLegacyChoiceId(
									selectedClassFeatures.className,
									feature.featureName,
									choiceIndex
								);
								const selectedOptionValues = selectedChoices[choiceId];

								if (selectedOptionValues && choice.options) {
									if (choice.count > 1) {
										// Handle multiple selections (like cleric domains)
										let selectedValueArray: string[] = [];

										if (Array.isArray(selectedOptionValues)) {
											// New format - already an array
											selectedValueArray = selectedOptionValues;
										} else if (typeof selectedOptionValues === 'string') {
											// Legacy format - JSON string or comma-separated
											try {
												selectedValueArray = JSON.parse(selectedOptionValues);
											} catch (parseError) {
												// Try comma-separated format
												selectedValueArray = selectedOptionValues.split(',').map((v) => v.trim());
											}
										} else {
											logger.warn('ui', 'Unexpected format for choice values', {
												selectedOptionValues
											});
											return;
										}

										selectedValueArray.forEach((value) => {
											const selectedOption = choice.options?.find((opt) => opt.name === value);

											if (selectedOption) {
												// Get the detailed description
												let description = selectedOption.description || 'Feature choice selected.';
												const detailedDescription = getDetailedClassFeatureDescription(
													choiceId,
													value
												);
												if (detailedDescription) {
													description = detailedDescription;
												}

												// Use generic display label
												const displayLabel = getDisplayLabel(
													selectedClassFeatures.className,
													feature.featureName,
													choiceIndex
												);
												const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

												const featureToAdd = {
													id: `${choiceId}_${value}`,
													name: selectedOption.name,
													description: description,
													source: 'class' as const,
													sourceDetail: sourceDetail
												};
												features.push(featureToAdd);
											}
										});
									} else {
										// Handle single selections
										const selectedOption = choice.options?.find(
											(opt) => opt.name === selectedOptionValues
										);
										if (selectedOption) {
											// Get the detailed description
											let description = selectedOption.description || 'Feature choice selected.';
											const detailedDescription = getDetailedClassFeatureDescription(
												choiceId,
												selectedOptionValues
											);
											if (detailedDescription) {
												description = detailedDescription;
											}

											// Use generic display label
											const displayLabel = getDisplayLabel(
												selectedClassFeatures.className,
												feature.featureName,
												choiceIndex
											);
											const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

											features.push({
												id: `${choiceId}_${selectedOptionValues}`,
												name: selectedOption.name,
												description: description,
												source: 'class',
												sourceDetail: sourceDetail
											});
										}
									}
								}
							});
						}
					});
				} catch (error) {
					logger.error('ui', 'Error processing selected feature choices', {
						error: error instanceof Error ? error.message : String(error)
					});
				}
			}
		}

		return features;
	}, [state.character]);
}

export function useCharacterCurrency() {
	const { state } = useCharacterSheet();
	return useMemo(() => {
		return (
			state.character?.characterState?.inventory?.currency || {
				goldPieces: 0,
				silverPieces: 0,
				copperPieces: 0
			}
		);
	}, [state.character?.characterState?.inventory?.currency]);
}

// Hook for calculated character data with breakdowns
export function useCharacterCalculatedData() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return null;
		const compatibility = assessCharacterCompatibility(state.character);
		if (compatibility.autoSaveMode !== 'full') return null;

		// Convert SavedCharacter to EnhancedCharacterBuildData
		const buildData = convertToEnhancedBuildData(state.character);
		// Run calculation to get CharacterSheetData with breakdowns
		const calculationResult = calculateCharacterWithBreakdowns(buildData);
		return calculationResult;
	}, [state.character]);
}

// Hook for character knowledge data
export function useCharacterKnowledge() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;

		// Parse character's trade proficiencies (knowledge is stored in tradesData)
		let characterTrades: Record<string, number> = {};
		if (character?.tradesData) {
			characterTrades = character.tradesData;
		}

		// Show ALL knowledge skills with their proficiency levels and calculated bonuses
		const knowledgeWithProficiency = tradesData
			.filter((trade) => trade.tools === 'none')
			.map((knowledge) => {
				const proficiency = characterTrades[knowledge.id] || 0;
				const masteryBonus = proficiency * 2;

				const attributeModifier = getAttributeModifier(character, knowledge.primaryAttribute);
				const totalBonus = attributeModifier + masteryBonus;

				return {
					id: knowledge.id,
					name: knowledge.name,
					proficiency,
					primaryAttribute: knowledge.primaryAttribute,
					bonus: totalBonus
				};
			});

		return knowledgeWithProficiency;
	}, [
		state.character?.tradesData,
		state.character?.finalMight,
		state.character?.finalAgility,
		state.character?.finalCharisma,
		state.character?.finalIntelligence
	]);
}

// Hook for character trades data
export function useCharacterTrades() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;

		// Parse character's trade proficiencies
		let characterTrades: Record<string, number> = {};
		if (character?.tradesData) {
			characterTrades = character.tradesData;
		}

		// Only show trades that have been selected (proficiency > 0) from tradesData only
		const filteredTrades = tradesData
			.filter((trade) => {
				return characterTrades[trade.id] && characterTrades[trade.id] > 0;
			})
			.map((trade) => {
				const proficiency = characterTrades[trade.id] || 0;
				const masteryBonus = proficiency * 2;

				const associations = trade.attributeAssociations.length
					? trade.attributeAssociations
					: [trade.primaryAttribute];
				const attributeTotals = associations.map<TradeAttributeTotal>((attribute) => ({
					attribute,
					total: masteryBonus + getAttributeModifier(character, attribute)
				}));
				const bonuses = attributeTotals.sort(sortTradeAttributeTotals);
				const highestTotal = bonuses[0]?.total ?? masteryBonus;

				return {
					id: trade.id,
					name: trade.name,
					proficiency,
					primaryAttribute: trade.primaryAttribute,
					bonus: highestTotal,
					bonuses
				};
			});

		return filteredTrades;
	}, [
		state.character?.tradesData,
		state.character?.finalMight,
		state.character?.finalAgility,
		state.character?.finalCharisma,
		state.character?.finalIntelligence
	]);
}

// Hook for character languages
export function useCharacterLanguages() {
	const { state } = useCharacterSheet();
	return React.useMemo(() => {
		if (!state.character?.languagesData) {
			return [];
		}
		try {
			const languagesFromDB = state.character.languagesData;
			return Object.entries(languagesFromDB)
				.filter(([_, data]: [string, any]) => data.fluency !== 'none')
				.map(([langId, data]: [string, any]) => ({
					id: langId,
					name: getLanguageDisplayName(langId, data.name),
					fluency: data.fluency as 'limited' | 'fluent'
				}));
		} catch (error) {
			logger.error('ui', 'Error parsing languages JSON', {
				error: error instanceof Error ? error.message : String(error)
			});
			return [];
		}
	}, [state.character?.languagesData]);
}

// Hook for character condition interactions
export function useCharacterConditions() {
	const { state } = useCharacterSheet();

	return useMemo(() => {
		if (!state.character) return [];

		const character = state.character;
		const legacySubclass = character as SavedCharacter & {
			subclassId?: string;
			subclassName?: string;
		};
		const selectedFeatureChoices = parseSelectedFeatureChoices(character.selectedFeatureChoices);

		// Build input for condition aggregator
		const input = {
			selectedTraits: [] as Array<{ id: string; name: string; effects?: any[] }>,
			className: character.className,
			classFeatures: [] as Array<{
				id: string;
				featureName: string;
				effects?: any[];
				levelGained?: number;
			}>,
			subclassName: legacySubclass.subclassName,
			subclassFeatures: [] as Array<{
				id: string;
				featureName: string;
				effects?: any[];
				levelGained?: number;
			}>,
			selectedTalents: [] as Array<{ id: string; name: string; effects?: any[] }>,
			level: character.level
		};

		// Gather ancestry traits
		if (character.selectedTraitIds) {
			character.selectedTraitIds.forEach((traitId: string) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait) {
					input.selectedTraits.push({
						id: trait.id,
						name: trait.name,
						effects: trait.effects
					});
				}
			});
		}

		// Gather class features
		if (character.className) {
			const classDef = findClassByName(character.className);
			if (classDef?.coreFeatures) {
				appendConditionFeatureEntries(
					input.classFeatures,
					classDef.coreFeatures.filter((feature) => feature.levelGained <= character.level),
					selectedFeatureChoices,
					{
						className: classDef.className,
						classId: character.classId
					}
				);
			}

			// Gather subclass features, benefits, and selected choices
			const selectedSubclassKey =
				character.selectedSubclass || legacySubclass.subclassId || legacySubclass.subclassName;
			if (selectedSubclassKey && classDef?.subclasses) {
				const subclass = classDef.subclasses.find(
					(s: any) =>
						s.id === selectedSubclassKey ||
						s.subclassName === selectedSubclassKey ||
						s.subclassName === legacySubclass.subclassName
				);
				if (subclass?.features) {
					input.subclassName = subclass.subclassName || legacySubclass.subclassName;
					appendConditionFeatureEntries(
						input.subclassFeatures,
						subclass.features.filter((feature: any) => feature.levelGained <= character.level),
						selectedFeatureChoices,
						{
							className: classDef.className,
							classId: character.classId,
							subclassKey: String(selectedSubclassKey)
						}
					);
				}
			}
		}

		// Gather selected talents (count-based, with legacy array support)
		for (const [talentId, count] of Object.entries(
			normalizeSelectedTalents(character.selectedTalents as any)
		)) {
			const talent = findTalentById(talentId);
			if (!talent?.effects || count <= 0) {
				continue;
			}

			for (let index = 0; index < count; index++) {
				input.selectedTalents.push({
					id: `${talentId}:${index}`,
					name: talent.name,
					effects: talent.effects
				});
			}
		}

		return calculateCharacterConditions(input);
	}, [state.character]);
}
