/**
 * Encounter Planner Hook
 *
 * Context and reducer for encounter planner UI state.
 */

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import { generateContentId } from '../utils/idGenerator';
import {
	calculateEncounterBudget,
	createDefaultEncounter
} from '../services/encounterBudgetCalculator';
import type {
	SavedEncounter,
	EncounterMonsterSlot,
	EncounterDifficulty,
	BudgetStatus
} from '../rulesdata/schemas/encounter.schema';
import type { MonsterTier } from '../rulesdata/schemas/monster.schema';

// ============================================================================
// STATE & ACTIONS
// ============================================================================

interface EncounterPlannerState {
	encounter: SavedEncounter;
	isDirty: boolean;
	isValid: boolean;
	errors: string[];
	warnings: string[];
	budgetStatus: BudgetStatus;
	budgetPercentage: number;
}

type EncounterPlannerAction =
	| { type: 'SET_NAME'; payload: string }
	| { type: 'SET_DESCRIPTION'; payload: string }
	| { type: 'SET_PARTY_SIZE'; payload: number }
	| { type: 'SET_PARTY_LEVEL'; payload: number }
	| { type: 'SET_DIFFICULTY'; payload: EncounterDifficulty }
	| { type: 'SET_ENVIRONMENT'; payload: string }
	| { type: 'SET_GM_NOTES'; payload: string }
	| { type: 'ADD_MONSTER_SLOT'; payload?: EncounterMonsterSlot }
	| {
			type: 'UPDATE_MONSTER_SLOT';
			payload: { slotId: string; updates: Partial<EncounterMonsterSlot> };
	  }
	| { type: 'REMOVE_MONSTER_SLOT'; payload: string }
	| {
			type: 'SET_SLOT_MONSTER';
			payload: { slotId: string; monsterId: string; level: number; tier: MonsterTier };
	  }
	| { type: 'CLEAR_SLOT_MONSTER'; payload: string }
	| { type: 'SET_SLOT_QUANTITY'; payload: { slotId: string; quantity: number } }
	| { type: 'LOAD_ENCOUNTER'; payload: SavedEncounter }
	| { type: 'RESET' }
	| { type: 'MARK_SAVED' }
	| {
			type: 'RECALCULATE_BUDGET';
			payload: Array<{ id: string; level: number; tier: MonsterTier }>;
	  };

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function validateEncounter(encounter: SavedEncounter): { errors: string[]; warnings: string[] } {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!encounter.name.trim()) {
		errors.push('Name is required');
	}

	if (encounter.party.size < 1 || encounter.party.size > 8) {
		errors.push('Party size must be 1-8');
	}

	if (encounter.party.averageLevel < 0 || encounter.party.averageLevel > 10) {
		errors.push('Party level must be 0-10');
	}

	const filledSlots = encounter.monsters.filter((m) => m.monsterId !== null);
	if (filledSlots.length === 0) {
		warnings.push('Add at least one monster');
	}

	if (encounter.adjustedBudget > 0) {
		const percentage = encounter.spentBudget / encounter.adjustedBudget;
		if (percentage > 1.2) {
			warnings.push('Encounter is significantly over budget (may be very difficult)');
		} else if (percentage < 0.8) {
			warnings.push('Encounter may be too easy');
		}
	}

	return { errors, warnings };
}

function recalculateBudget(
	encounter: SavedEncounter,
	monsterData?: Array<{ id: string; level: number; tier: MonsterTier }>
): SavedEncounter {
	// Build monster data from slots or use provided data
	const monsters = encounter.monsters
		.filter((slot) => slot.monsterId !== null)
		.map((slot) => {
			// Find monster data if provided
			const data = monsterData?.find((m) => m.id === slot.monsterId);
			// Use stored cost to derive level/tier, or use provided data
			const level = data?.level ?? Math.max(0, slot.cost / slot.quantity);
			const tier = data?.tier ?? 'standard';

			return {
				monsterId: slot.monsterId!,
				quantity: slot.quantity,
				monsterLevel: level,
				monsterTier: tier as MonsterTier
			};
		});

	const result = calculateEncounterBudget({
		party: encounter.party,
		difficulty: encounter.difficulty,
		monsters
	});

	// Update slot costs
	const updatedMonsters = encounter.monsters.map((slot) => {
		if (slot.monsterId === null) return { ...slot, cost: 0 };
		const slotCost = result.slotCosts.find((c) => c.monsterId === slot.monsterId);
		return {
			...slot,
			cost: slotCost?.totalCost ?? slot.cost
		};
	});

	return {
		...encounter,
		baseBudget: result.baseBudget,
		difficultyModifier: result.difficultyModifier,
		adjustedBudget: result.adjustedBudget,
		spentBudget: result.spentBudget,
		remainingBudget: result.remainingBudget,
		monsters: updatedMonsters
	};
}

// ============================================================================
// REDUCER
// ============================================================================

function encounterPlannerReducer(
	state: EncounterPlannerState,
	action: EncounterPlannerAction
): EncounterPlannerState {
	let newEncounter: SavedEncounter;

	switch (action.type) {
		case 'SET_NAME':
			newEncounter = { ...state.encounter, name: action.payload };
			break;

		case 'SET_DESCRIPTION':
			newEncounter = { ...state.encounter, description: action.payload || undefined };
			break;

		case 'SET_PARTY_SIZE':
			newEncounter = recalculateBudget({
				...state.encounter,
				party: { ...state.encounter.party, size: action.payload }
			});
			break;

		case 'SET_PARTY_LEVEL':
			newEncounter = recalculateBudget({
				...state.encounter,
				party: { ...state.encounter.party, averageLevel: action.payload }
			});
			break;

		case 'SET_DIFFICULTY':
			newEncounter = recalculateBudget({
				...state.encounter,
				difficulty: action.payload
			});
			break;

		case 'SET_ENVIRONMENT':
			newEncounter = { ...state.encounter, environment: action.payload || undefined };
			break;

		case 'SET_GM_NOTES':
			newEncounter = { ...state.encounter, gmNotes: action.payload || undefined };
			break;

		case 'ADD_MONSTER_SLOT': {
			const newSlot: EncounterMonsterSlot = action.payload ?? {
				id: generateContentId('slot'),
				monsterId: null,
				quantity: 1,
				cost: 0
			};
			newEncounter = {
				...state.encounter,
				monsters: [...state.encounter.monsters, newSlot]
			};
			break;
		}

		case 'UPDATE_MONSTER_SLOT': {
			const updatedMonsters = state.encounter.monsters.map((slot) =>
				slot.id === action.payload.slotId ? { ...slot, ...action.payload.updates } : slot
			);
			newEncounter = recalculateBudget({
				...state.encounter,
				monsters: updatedMonsters
			});
			break;
		}

		case 'REMOVE_MONSTER_SLOT': {
			const filteredMonsters = state.encounter.monsters.filter(
				(slot) => slot.id !== action.payload
			);
			newEncounter = recalculateBudget({
				...state.encounter,
				monsters: filteredMonsters
			});
			break;
		}

		case 'SET_SLOT_MONSTER': {
			const { slotId, monsterId, level, tier } = action.payload;
			const cost = level > 0 ? level * (tier === 'legendary' ? 4 : tier === 'apex' ? 2 : 1) : 0;
			const updatedMonsters = state.encounter.monsters.map((slot) =>
				slot.id === slotId ? { ...slot, monsterId, cost: cost * slot.quantity } : slot
			);
			newEncounter = recalculateBudget({
				...state.encounter,
				monsters: updatedMonsters
			});
			break;
		}

		case 'CLEAR_SLOT_MONSTER': {
			const updatedMonsters = state.encounter.monsters.map((slot) =>
				slot.id === action.payload ? { ...slot, monsterId: null, cost: 0 } : slot
			);
			newEncounter = recalculateBudget({
				...state.encounter,
				monsters: updatedMonsters
			});
			break;
		}

		case 'SET_SLOT_QUANTITY': {
			const { slotId, quantity } = action.payload;
			const slot = state.encounter.monsters.find((s) => s.id === slotId);
			if (!slot || slot.monsterId === null) {
				newEncounter = state.encounter;
				break;
			}
			const unitCost = slot.cost / Math.max(1, slot.quantity);
			const updatedMonsters = state.encounter.monsters.map((s) =>
				s.id === slotId ? { ...s, quantity, cost: unitCost * quantity } : s
			);
			newEncounter = recalculateBudget({
				...state.encounter,
				monsters: updatedMonsters
			});
			break;
		}

		case 'LOAD_ENCOUNTER':
			newEncounter = action.payload;
			break;

		case 'RESET':
			newEncounter = createDefaultEncounter();
			break;

		case 'MARK_SAVED':
			return { ...state, isDirty: false };

		case 'RECALCULATE_BUDGET':
			newEncounter = recalculateBudget(state.encounter, action.payload);
			break;

		default:
			return state;
	}

	// Update timestamp
	newEncounter = {
		...newEncounter,
		lastModified: new Date().toISOString()
	};

	// Validate
	const { errors, warnings } = validateEncounter(newEncounter);
	const isValid = errors.length === 0;

	// Calculate budget status
	let budgetStatus: BudgetStatus = 'on_target';
	let budgetPercentage = 0;
	if (newEncounter.adjustedBudget > 0) {
		budgetPercentage = (newEncounter.spentBudget / newEncounter.adjustedBudget) * 100;
		if (budgetPercentage < 80) budgetStatus = 'under';
		else if (budgetPercentage <= 100) budgetStatus = 'on_target';
		else if (budgetPercentage <= 120) budgetStatus = 'slightly_over';
		else budgetStatus = 'over';
	}

	return {
		encounter: newEncounter,
		isDirty: true,
		isValid,
		errors,
		warnings,
		budgetStatus,
		budgetPercentage
	};
}

// ============================================================================
// CONTEXT
// ============================================================================

interface EncounterPlannerContextValue extends EncounterPlannerState {
	dispatch: React.Dispatch<EncounterPlannerAction>;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setPartySize: (size: number) => void;
	setPartyLevel: (level: number) => void;
	setDifficulty: (difficulty: EncounterDifficulty) => void;
	setEnvironment: (environment: string) => void;
	setGmNotes: (notes: string) => void;
	addMonsterSlot: (slot?: EncounterMonsterSlot) => void;
	updateMonsterSlot: (slotId: string, updates: Partial<EncounterMonsterSlot>) => void;
	removeMonsterSlot: (slotId: string) => void;
	setSlotMonster: (slotId: string, monsterId: string, level: number, tier: MonsterTier) => void;
	clearSlotMonster: (slotId: string) => void;
	setSlotQuantity: (slotId: string, quantity: number) => void;
	loadEncounter: (encounter: SavedEncounter) => void;
	reset: () => void;
}

const EncounterPlannerContext = createContext<EncounterPlannerContextValue | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

interface EncounterPlannerProviderProps {
	children: ReactNode;
	initialEncounter?: SavedEncounter;
}

export function EncounterPlannerProvider({
	children,
	initialEncounter
}: EncounterPlannerProviderProps) {
	const defaultEncounter = initialEncounter ?? createDefaultEncounter();
	const { errors, warnings } = validateEncounter(defaultEncounter);

	const initialState: EncounterPlannerState = {
		encounter: defaultEncounter,
		isDirty: false,
		isValid: errors.length === 0,
		errors,
		warnings,
		budgetStatus: 'on_target',
		budgetPercentage: 0
	};

	const [state, dispatch] = useReducer(encounterPlannerReducer, initialState);

	const setName = useCallback((name: string) => dispatch({ type: 'SET_NAME', payload: name }), []);
	const setDescription = useCallback(
		(description: string) => dispatch({ type: 'SET_DESCRIPTION', payload: description }),
		[]
	);
	const setPartySize = useCallback(
		(size: number) => dispatch({ type: 'SET_PARTY_SIZE', payload: size }),
		[]
	);
	const setPartyLevel = useCallback(
		(level: number) => dispatch({ type: 'SET_PARTY_LEVEL', payload: level }),
		[]
	);
	const setDifficulty = useCallback(
		(difficulty: EncounterDifficulty) => dispatch({ type: 'SET_DIFFICULTY', payload: difficulty }),
		[]
	);
	const setEnvironment = useCallback(
		(environment: string) => dispatch({ type: 'SET_ENVIRONMENT', payload: environment }),
		[]
	);
	const setGmNotes = useCallback(
		(notes: string) => dispatch({ type: 'SET_GM_NOTES', payload: notes }),
		[]
	);
	const addMonsterSlot = useCallback(
		(slot?: EncounterMonsterSlot) => dispatch({ type: 'ADD_MONSTER_SLOT', payload: slot }),
		[]
	);
	const updateMonsterSlot = useCallback(
		(slotId: string, updates: Partial<EncounterMonsterSlot>) =>
			dispatch({ type: 'UPDATE_MONSTER_SLOT', payload: { slotId, updates } }),
		[]
	);
	const removeMonsterSlot = useCallback(
		(slotId: string) => dispatch({ type: 'REMOVE_MONSTER_SLOT', payload: slotId }),
		[]
	);
	const setSlotMonster = useCallback(
		(slotId: string, monsterId: string, level: number, tier: MonsterTier) =>
			dispatch({ type: 'SET_SLOT_MONSTER', payload: { slotId, monsterId, level, tier } }),
		[]
	);
	const clearSlotMonster = useCallback(
		(slotId: string) => dispatch({ type: 'CLEAR_SLOT_MONSTER', payload: slotId }),
		[]
	);
	const setSlotQuantity = useCallback(
		(slotId: string, quantity: number) =>
			dispatch({ type: 'SET_SLOT_QUANTITY', payload: { slotId, quantity } }),
		[]
	);
	const loadEncounter = useCallback(
		(encounter: SavedEncounter) => dispatch({ type: 'LOAD_ENCOUNTER', payload: encounter }),
		[]
	);
	const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

	const value: EncounterPlannerContextValue = {
		...state,
		dispatch,
		setName,
		setDescription,
		setPartySize,
		setPartyLevel,
		setDifficulty,
		setEnvironment,
		setGmNotes,
		addMonsterSlot,
		updateMonsterSlot,
		removeMonsterSlot,
		setSlotMonster,
		clearSlotMonster,
		setSlotQuantity,
		loadEncounter,
		reset
	};

	return (
		<EncounterPlannerContext.Provider value={value}>{children}</EncounterPlannerContext.Provider>
	);
}

// ============================================================================
// HOOKS
// ============================================================================

export function useEncounterPlanner() {
	const context = useContext(EncounterPlannerContext);
	if (!context) {
		throw new Error('useEncounterPlanner must be used within an EncounterPlannerProvider');
	}
	return context;
}

export function useEncounterPlannerState() {
	const { encounter, isDirty, isValid, errors, warnings, budgetStatus, budgetPercentage } =
		useEncounterPlanner();
	return { encounter, isDirty, isValid, errors, warnings, budgetStatus, budgetPercentage };
}

export function useCurrentEncounter() {
	const { encounter } = useEncounterPlanner();
	return encounter;
}
