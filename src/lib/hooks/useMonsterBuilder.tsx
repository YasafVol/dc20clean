/**
 * Monster Builder Hook (Context + Reducer)
 *
 * Provides state management for the Monster Designer UI.
 * Handles local editing state with auto-recalculation.
 */

import {
	createContext,
	useContext,
	useReducer,
	useCallback,
	useMemo,
	type ReactNode,
	type Dispatch,
} from 'react';
import {
	calculateMonsterStats,
	createDefaultMonster,
	validateMonsterActions,
	validateFeatureBudget,
} from '../services/monsterCalculator';
import { generateContentId } from '../utils/idGenerator';
import type {
	SavedMonster,
	MonsterAction,
	MonsterTier,
	MonsterRoleId,
	MonsterAttributes,
} from '../rulesdata/schemas/monster.schema';

// ============================================================================
// STATE & ACTIONS
// ============================================================================

export interface MonsterBuilderState {
	/** Current monster being edited */
	monster: SavedMonster;
	/** Whether there are unsaved changes */
	isDirty: boolean;
	/** Whether the monster is valid for saving */
	isValid: boolean;
	/** Validation errors */
	errors: string[];
	/** Validation warnings */
	warnings: string[];
	/** Whether save is in progress */
	isSaving: boolean;
	/** Original monster (for detecting changes) */
	originalMonster: SavedMonster | null;
}

export type MonsterBuilderAction =
	| { type: 'SET_MONSTER'; payload: SavedMonster }
	| { type: 'RESET'; payload?: Partial<SavedMonster> }
	| { type: 'SET_NAME'; payload: string }
	| { type: 'SET_DESCRIPTION'; payload: string }
	| { type: 'SET_LEVEL'; payload: number }
	| { type: 'SET_TIER'; payload: MonsterTier }
	| { type: 'SET_ROLE'; payload: MonsterRoleId }
	| { type: 'SET_ATTRIBUTES'; payload: Partial<MonsterAttributes> }
	| { type: 'ADD_FEATURE'; payload: string }
	| { type: 'REMOVE_FEATURE'; payload: string }
	| { type: 'SET_FEATURES'; payload: string[] }
	| { type: 'ADD_ACTION'; payload?: Partial<MonsterAction> }
	| { type: 'UPDATE_ACTION'; payload: { id: string; updates: Partial<MonsterAction> } }
	| { type: 'REMOVE_ACTION'; payload: string }
	| { type: 'REORDER_ACTIONS'; payload: string[] }
	| { type: 'SET_SAVING'; payload: boolean }
	| { type: 'MARK_SAVED' };

// ============================================================================
// REDUCER
// ============================================================================

function recalculateMonster(monster: SavedMonster): SavedMonster {
	const stats = calculateMonsterStats({
		level: monster.level,
		tier: monster.tier,
		roleId: monster.roleId,
	});

	return {
		...monster,
		finalHP: stats.finalHP,
		finalPD: stats.finalPD,
		finalAD: stats.finalAD,
		finalAttack: stats.finalAttack,
		finalSaveDC: stats.finalSaveDC,
		finalBaseDamage: stats.finalBaseDamage,
		featurePointsMax: stats.featurePointsMax,
		breakdowns: stats.breakdowns,
		lastModified: new Date().toISOString(),
	};
}

function validateMonster(monster: SavedMonster): { errors: string[]; warnings: string[] } {
	const errors: string[] = [];
	const warnings: string[] = [];

	// Name validation
	if (!monster.name || monster.name.trim().length === 0) {
		errors.push('Name is required');
	} else if (monster.name.length > 50) {
		errors.push('Name must be 50 characters or less');
	}

	// Level validation
	if (monster.level < -1 || monster.level > 10) {
		errors.push('Level must be between -1 (Novice) and 10');
	}

	// Feature budget validation
	const featureBudget = validateFeatureBudget(monster.featureIds, monster.featurePointsMax);
	if (!featureBudget.valid) {
		errors.push(`Feature points exceeded (${featureBudget.spent}/${monster.featurePointsMax})`);
	}

	// Action validation
	const actionResult = validateMonsterActions(monster.actions, monster.finalBaseDamage);
	for (const error of actionResult.errors) {
		errors.push(error.message);
	}
	for (const warning of actionResult.warnings) {
		warnings.push(warning.message);
	}

	return { errors, warnings };
}

function calculateFeaturePointsSpent(featureIds: string[]): number {
	// Use the imported validateFeatureBudget with a high max to just get spent count
	const result = validateFeatureBudget(featureIds, 999);
	return result.spent;
}

function monsterBuilderReducer(
	state: MonsterBuilderState,
	action: MonsterBuilderAction
): MonsterBuilderState {
	switch (action.type) {
		case 'SET_MONSTER': {
			const monster = action.payload;
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				originalMonster: monster,
				isDirty: false,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'RESET': {
			const monster = createDefaultMonster(action.payload);
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				originalMonster: null,
				isDirty: false,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_NAME': {
			const monster = { ...state.monster, name: action.payload };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_DESCRIPTION': {
			const monster = { ...state.monster, description: action.payload };
			return {
				...state,
				monster,
				isDirty: true,
			};
		}

		case 'SET_LEVEL': {
			const monster = recalculateMonster({ ...state.monster, level: action.payload });
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_TIER': {
			const monster = recalculateMonster({ ...state.monster, tier: action.payload });
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_ROLE': {
			const monster = recalculateMonster({ ...state.monster, roleId: action.payload });
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_ATTRIBUTES': {
			const attributes = { ...state.monster.attributes, ...action.payload };
			const monster = { ...state.monster, attributes };
			return {
				...state,
				monster,
				isDirty: true,
			};
		}

		case 'ADD_FEATURE': {
			const featureIds = [...state.monster.featureIds, action.payload];
			const featurePointsSpent = calculateFeaturePointsSpent(featureIds);
			const monster = { ...state.monster, featureIds, featurePointsSpent };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'REMOVE_FEATURE': {
			const featureIds = state.monster.featureIds.filter((id) => id !== action.payload);
			const featurePointsSpent = calculateFeaturePointsSpent(featureIds);
			const monster = { ...state.monster, featureIds, featurePointsSpent };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'SET_FEATURES': {
			const featureIds = action.payload;
			const featurePointsSpent = calculateFeaturePointsSpent(featureIds);
			const monster = { ...state.monster, featureIds, featurePointsSpent };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'ADD_ACTION': {
			const newAction: MonsterAction = {
				id: generateContentId('action'),
				name: 'New Action',
				apCost: 1,
				type: 'martial',
				targetDefense: 'pd',
				damage: state.monster.finalBaseDamage,
				description: '',
				...action.payload,
			};
			const actions = [...state.monster.actions, newAction];
			const monster = { ...state.monster, actions };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'UPDATE_ACTION': {
			const actions = state.monster.actions.map((a) =>
				a.id === action.payload.id ? { ...a, ...action.payload.updates } : a
			);
			const monster = { ...state.monster, actions };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'REMOVE_ACTION': {
			const actions = state.monster.actions.filter((a) => a.id !== action.payload);
			const monster = { ...state.monster, actions };
			const { errors, warnings } = validateMonster(monster);
			return {
				...state,
				monster,
				isDirty: true,
				isValid: errors.length === 0,
				errors,
				warnings,
			};
		}

		case 'REORDER_ACTIONS': {
			const actionMap = new Map(state.monster.actions.map((a) => [a.id, a]));
			const actions = action.payload
				.map((id) => actionMap.get(id))
				.filter((a): a is MonsterAction => a !== undefined);
			const monster = { ...state.monster, actions };
			return {
				...state,
				monster,
				isDirty: true,
			};
		}

		case 'SET_SAVING': {
			return {
				...state,
				isSaving: action.payload,
			};
		}

		case 'MARK_SAVED': {
			return {
				...state,
				isDirty: false,
				isSaving: false,
				originalMonster: state.monster,
			};
		}

		default:
			return state;
	}
}

// ============================================================================
// CONTEXT
// ============================================================================

interface MonsterBuilderContextValue {
	state: MonsterBuilderState;
	dispatch: Dispatch<MonsterBuilderAction>;
	// Convenience actions
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setLevel: (level: number) => void;
	setTier: (tier: MonsterTier) => void;
	setRole: (roleId: MonsterRoleId) => void;
	setAttributes: (attributes: Partial<MonsterAttributes>) => void;
	addFeature: (featureId: string) => void;
	removeFeature: (featureId: string) => void;
	addAction: (action?: Partial<MonsterAction>) => void;
	updateAction: (id: string, updates: Partial<MonsterAction>) => void;
	removeAction: (id: string) => void;
	reset: (defaults?: Partial<SavedMonster>) => void;
	loadMonster: (monster: SavedMonster) => void;
}

const MonsterBuilderContext = createContext<MonsterBuilderContextValue | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

interface MonsterBuilderProviderProps {
	children: ReactNode;
	initialMonster?: SavedMonster;
}

export function MonsterBuilderProvider({ children, initialMonster }: MonsterBuilderProviderProps) {
	const initial = initialMonster ?? createDefaultMonster();
	const { errors, warnings } = validateMonster(initial);

	const [state, dispatch] = useReducer(monsterBuilderReducer, {
		monster: initial,
		originalMonster: initialMonster ?? null,
		isDirty: false,
		isValid: errors.length === 0,
		errors,
		warnings,
		isSaving: false,
	});

	// Convenience action creators
	const setName = useCallback((name: string) => dispatch({ type: 'SET_NAME', payload: name }), []);
	const setDescription = useCallback(
		(description: string) => dispatch({ type: 'SET_DESCRIPTION', payload: description }),
		[]
	);
	const setLevel = useCallback(
		(level: number) => dispatch({ type: 'SET_LEVEL', payload: level }),
		[]
	);
	const setTier = useCallback(
		(tier: MonsterTier) => dispatch({ type: 'SET_TIER', payload: tier }),
		[]
	);
	const setRole = useCallback(
		(roleId: MonsterRoleId) => dispatch({ type: 'SET_ROLE', payload: roleId }),
		[]
	);
	const setAttributes = useCallback(
		(attributes: Partial<MonsterAttributes>) =>
			dispatch({ type: 'SET_ATTRIBUTES', payload: attributes }),
		[]
	);
	const addFeature = useCallback(
		(featureId: string) => dispatch({ type: 'ADD_FEATURE', payload: featureId }),
		[]
	);
	const removeFeature = useCallback(
		(featureId: string) => dispatch({ type: 'REMOVE_FEATURE', payload: featureId }),
		[]
	);
	const addAction = useCallback(
		(action?: Partial<MonsterAction>) => dispatch({ type: 'ADD_ACTION', payload: action }),
		[]
	);
	const updateAction = useCallback(
		(id: string, updates: Partial<MonsterAction>) =>
			dispatch({ type: 'UPDATE_ACTION', payload: { id, updates } }),
		[]
	);
	const removeAction = useCallback(
		(id: string) => dispatch({ type: 'REMOVE_ACTION', payload: id }),
		[]
	);
	const reset = useCallback(
		(defaults?: Partial<SavedMonster>) => dispatch({ type: 'RESET', payload: defaults }),
		[]
	);
	const loadMonster = useCallback(
		(monster: SavedMonster) => dispatch({ type: 'SET_MONSTER', payload: monster }),
		[]
	);

	const value = useMemo(
		() => ({
			state,
			dispatch,
			setName,
			setDescription,
			setLevel,
			setTier,
			setRole,
			setAttributes,
			addFeature,
			removeFeature,
			addAction,
			updateAction,
			removeAction,
			reset,
			loadMonster,
		}),
		[
			state,
			setName,
			setDescription,
			setLevel,
			setTier,
			setRole,
			setAttributes,
			addFeature,
			removeFeature,
			addAction,
			updateAction,
			removeAction,
			reset,
			loadMonster,
		]
	);

	return (
		<MonsterBuilderContext.Provider value={value}>{children}</MonsterBuilderContext.Provider>
	);
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook for accessing monster builder state and actions
 */
export function useMonsterBuilder(): MonsterBuilderContextValue {
	const context = useContext(MonsterBuilderContext);
	if (!context) {
		throw new Error('useMonsterBuilder must be used within a MonsterBuilderProvider');
	}
	return context;
}

/**
 * Hook for just the monster state (read-only)
 */
export function useMonsterBuilderState(): MonsterBuilderState {
	const { state } = useMonsterBuilder();
	return state;
}

/**
 * Hook for just the current monster
 */
export function useCurrentMonster(): SavedMonster {
	const { state } = useMonsterBuilder();
	return state.monster;
}
