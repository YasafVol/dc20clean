import { useReducer, useCallback } from 'react';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { AttackData } from '../../../types/character';

// Sheet state - wraps the SavedCharacter
export interface SheetState {
	character: SavedCharacter | null;
	loading: boolean;
	error: string | null;
	baselineAttacks: any[];
	baselineInventoryItems: any[];
	baselineSpells: any[];
	baselineManeuvers: any[];
}

// All possible actions for character sheet editing
export type SheetAction =
	| { type: 'LOAD_START' }
	| { type: 'LOAD_SUCCESS'; character: SavedCharacter }
	| { type: 'LOAD_ERROR'; error: string }
	| { type: 'UPDATE_CURRENT_HP'; hp: number }
	| { type: 'UPDATE_CURRENT_SP'; sp: number }
	| { type: 'UPDATE_CURRENT_MP'; mp: number }
	| { type: 'UPDATE_TEMP_HP'; tempHP: number }
	| { type: 'UPDATE_EXHAUSTION'; level: number }
	| { type: 'UPDATE_DEATH_STEP'; steps: number; isDead?: boolean }
	| { type: 'UPDATE_ACTION_POINTS_USED'; ap: number }
	| { type: 'SET_MANUAL_DEFENSE'; pd?: number; ad?: number; pdr?: number }
	| { type: 'SET_CONDITION_TOGGLE'; conditionId: string; active: boolean }
	| { type: 'ADD_ATTACK'; attack: AttackData }
	| { type: 'SET_CONDITION_TOGGLE'; conditionId: string; active: boolean }
	| { type: 'ADD_ATTACK'; attack: AttackData }
	| { type: 'REMOVE_ATTACK'; attackId: string }
	| { type: 'UPDATE_ATTACK'; attackId: string; attack: AttackData }
	| { type: 'RESET_ATTACKS' }
	| { type: 'ADD_SPELL'; spell: any }
	| { type: 'REMOVE_SPELL'; spellId: string }
	| { type: 'UPDATE_SPELL'; spellId: string; field: string; value: any }
	| { type: 'RESET_SPELLS' }
	| { type: 'ADD_MANEUVER'; maneuver: any }
	| { type: 'REMOVE_MANEUVER'; maneuverId: string }
	| { type: 'RESET_MANEUVERS' }
	| { type: 'UPDATE_INVENTORY'; items: any[] }
	| { type: 'RESET_INVENTORY' }
	| { type: 'UPDATE_CURRENCY'; goldPieces?: number; silverPieces?: number; copperPieces?: number }
	| { type: 'UPDATE_NOTES'; notes: string }
	| { type: 'UPDATE_CURRENT_GRIT_POINTS'; grit: number }
	| { type: 'UPDATE_CURRENT_REST_POINTS'; rest: number }
	| { type: 'TOGGLE_ACTIVE_CONDITION'; conditionId: string }
	| { type: 'SET_ACTIVE_CONDITION_STACKS'; conditionId: string; stacks: number }
	| {
			type: 'UPDATE_DEFENSE_OVERRIDES';
			overrides: { precisionAD?: number; areaAD?: number; precisionDR?: number };
	  }
	| { type: 'SET_RAGE_ACTIVE'; isRaging: boolean };

const initialState: SheetState = {
	character: null,
	loading: false,
	error: null,
	baselineAttacks: [],
	baselineInventoryItems: [],
	baselineSpells: [],
	baselineManeuvers: []
};

// Reducer function
function characterSheetReducer(state: SheetState, action: SheetAction): SheetState {
	switch (action.type) {
		case 'LOAD_START':
			return { ...state, loading: true, error: null };

		case 'LOAD_SUCCESS':
			// Keep the character as-is. We intentionally do NOT normalize attacks here.
			// The app will preserve the shape (array or object) supplied at creation.
			return {
				...state,
				character: action.character,
				loading: false,
				error: null,
				baselineAttacks: [...(action.character.characterState?.attacks || [])],
				baselineInventoryItems: [...(action.character.characterState?.inventory?.items || [])],
				baselineSpells: [...(action.character.spells || [])],
				baselineManeuvers: [...(action.character.maneuvers || [])]
			};

		case 'LOAD_ERROR':
			return { ...state, loading: false, error: action.error };

		case 'UPDATE_CURRENT_HP':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								currentHP: action.hp
							}
						}
					}
				}
			};

		case 'UPDATE_CURRENT_SP':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								currentSP: action.sp
							}
						}
					}
				}
			};

		case 'UPDATE_CURRENT_MP':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								currentMP: action.mp
							}
						}
					}
				}
			};

		case 'UPDATE_TEMP_HP':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								tempHP: action.tempHP
							}
						}
					}
				}
			};

		case 'UPDATE_EXHAUSTION':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								exhaustionLevel: action.level
							}
						}
					}
				}
			};

		case 'UPDATE_DEATH_STEP':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								deathSteps: action.steps,
								isDead: action.isDead ?? false
							}
						}
					}
				}
			};

		case 'UPDATE_ACTION_POINTS_USED':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								actionPointsUsed: action.ap
							}
						}
					}
				}
			};

		case 'SET_MANUAL_DEFENSE':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						ui: {
							...state.character.characterState.ui,
							manualDefenseOverrides: {
								...state.character.characterState.ui.manualDefenseOverrides,
								...(action.pd !== undefined && { PD: action.pd }),
								...(action.ad !== undefined && { AD: action.ad }),
								...(action.pdr !== undefined && { PDR: action.pdr })
							}
						}
					}
				}
			};

		case 'SET_CONDITION_TOGGLE':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						ui: {
							...state.character.characterState.ui,
							activeConditions: {
								...(state.character.characterState.ui?.activeConditions || {}),
								[action.conditionId]: action.active
							}
						}
					}
				}
			};

		case 'ADD_ATTACK':
			if (!state.character) return state;
			{
				const arr = state.character.characterState.attacks || [];
				return {
					...state,
					character: {
						...state.character,
						characterState: {
							...state.character.characterState,
							attacks: [...arr, action.attack]
						}
					}
				};
			}

		case 'REMOVE_ATTACK':
			if (!state.character) return state;
			{
				const arr = state.character.characterState.attacks || [];
				return {
					...state,
					character: {
						...state.character,
						characterState: {
							...state.character.characterState,
							attacks: arr.filter((attack: any) => attack.id !== action.attackId)
						}
					}
				};
			}

		case 'UPDATE_ATTACK':
			if (!state.character) return state;
			{
				const arr = state.character.characterState.attacks || [];
				return {
					...state,
					character: {
						...state.character,
						characterState: {
							...state.character.characterState,
							attacks: arr.map((attack: any) =>
								attack.id === action.attackId ? action.attack : attack
							)
						}
					}
				};
			}

		case 'RESET_ATTACKS':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						attacks: [...state.baselineAttacks]
					}
				}
			};

		case 'ADD_SPELL':
			if (!state.character) return state;
			const newSpells = [...(state.character.spells || []), action.spell];
			return {
				...state,
				character: {
					...state.character,
					spells: newSpells,
					characterState: {
						...state.character.characterState,
						spells: newSpells
					}
				}
			};

		case 'REMOVE_SPELL':
			if (!state.character) return state;
			const filteredSpells = (state.character.spells || []).filter(
				(s: any) => s.id !== action.spellId
			);
			return {
				...state,
				character: {
					...state.character,
					spells: filteredSpells,
					characterState: {
						...state.character.characterState,
						spells: filteredSpells
					}
				}
			};

		case 'UPDATE_SPELL':
			if (!state.character) return state;
			const updatedSpells = (state.character.spells || []).map((s: any) =>
				s.id === action.spellId ? { ...s, [action.field]: action.value } : s
			);
			return {
				...state,
				character: {
					...state.character,
					spells: updatedSpells,
					characterState: {
						...state.character.characterState,
						spells: updatedSpells
					}
				}
			};

		case 'RESET_SPELLS':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					spells: [...state.baselineSpells],
					characterState: {
						...state.character.characterState,
						spells: [...state.baselineSpells]
					}
				}
			};

		case 'ADD_MANEUVER':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					maneuvers: [...(state.character.maneuvers || []), action.maneuver],
					characterState: {
						...state.character.characterState,
						maneuvers: [...(state.character.maneuvers || []), action.maneuver]
					}
				}
			};

		case 'REMOVE_MANEUVER':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					maneuvers: (state.character.maneuvers || []).filter(
						(m: any) => m.id !== action.maneuverId
					),
					characterState: {
						...state.character.characterState,
						maneuvers: (state.character.maneuvers || []).filter(
							(m: any) => m.id !== action.maneuverId
						)
					}
				}
			};

		case 'RESET_MANEUVERS':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					maneuvers: [...state.baselineManeuvers],
					characterState: {
						...state.character.characterState,
						maneuvers: [...state.baselineManeuvers]
					}
				}
			};

		case 'UPDATE_CURRENCY':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						inventory: {
							...state.character.characterState.inventory,
							currency: {
								...state.character.characterState.inventory.currency,
								...(action.goldPieces !== undefined && { goldPieces: action.goldPieces }),
								...(action.silverPieces !== undefined && { silverPieces: action.silverPieces }),
								...(action.copperPieces !== undefined && { copperPieces: action.copperPieces })
							}
						}
					}
				}
			};

		case 'UPDATE_INVENTORY':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						inventory: {
							...state.character.characterState.inventory,
							items: action.items
						}
					}
				}
			};

		case 'RESET_INVENTORY':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						inventory: {
							...state.character.characterState.inventory,
							items: [...state.baselineInventoryItems]
						}
					}
				}
			};

		case 'UPDATE_NOTES':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						notes: {
							...state.character.characterState.notes,
							playerNotes: action.notes
						}
					}
				}
			};

		case 'UPDATE_CURRENT_GRIT_POINTS':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								currentGritPoints: action.grit
							}
						}
					}
				}
			};
		case 'UPDATE_CURRENT_REST_POINTS':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						resources: {
							...state.character.characterState.resources,
							current: {
								...state.character.characterState.resources.current,
								currentRestPoints: action.rest
							}
						}
					}
				}
			};

		case 'TOGGLE_ACTIVE_CONDITION':
			if (!state.character) return state;
			const currentConditions = state.character.characterState.activeConditions || [];
			const conditionIndex = currentConditions.indexOf(action.conditionId);
			const newConditions =
				conditionIndex >= 0
					? currentConditions.filter((id) => id !== action.conditionId) // Remove if exists
					: [...currentConditions, action.conditionId]; // Add if doesn't exist

			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						activeConditions: newConditions
					}
				}
			};

		case 'SET_ACTIVE_CONDITION_STACKS':
			if (!state.character) return state;
			const baseConditionId = action.conditionId;
			const stackPrefix = baseConditionId.replace(/-x$/, '');
			const nextConditions = (state.character.characterState.activeConditions || []).filter(
				(id) => id !== baseConditionId && !id.startsWith(`${stackPrefix}-`)
			);
			const nextStacks = Math.max(0, Math.floor(action.stacks));
			const nextConditionId =
				nextStacks > 0 ? baseConditionId.replace(/-x$/, `-${nextStacks}`) : undefined;

			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						activeConditions: nextConditionId
							? [...nextConditions, nextConditionId]
							: nextConditions
					}
				}
			};

		case 'UPDATE_DEFENSE_OVERRIDES':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						defenseOverrides: action.overrides
					}
				}
			};

		case 'SET_RAGE_ACTIVE':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						ui: {
							...(state.character.characterState.ui || { manualDefenseOverrides: {} }),
							activeConditions: {
								...(state.character.characterState.ui?.activeConditions || {}),
								while_raging: action.isRaging
							},
							combatToggles: {
								...state.character.characterState.ui?.combatToggles,
								isRaging: action.isRaging
							}
						}
					}
				}
			};

		default:
			return state;
	}
}

// Custom hook that exports the reducer
export function useCharacterSheetReducer(readOnly = false) {
	const [state, dispatch] = useReducer(characterSheetReducer, initialState);

	// Helper functions for common operations
	const updateHP = useCallback((hp: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_CURRENT_HP', hp });
	}, [readOnly]);

	const updateSP = useCallback((sp: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_CURRENT_SP', sp });
	}, [readOnly]);

	const updateMP = useCallback((mp: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_CURRENT_MP', mp });
	}, [readOnly]);

	const updateTempHP = useCallback((tempHP: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_TEMP_HP', tempHP });
	}, [readOnly]);

	const updateActionPoints = useCallback((ap: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_ACTION_POINTS_USED', ap });
	}, [readOnly]);

	const updateExhaustion = useCallback((level: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_EXHAUSTION', level });
	}, [readOnly]);

	const updateDeathStep = useCallback((steps: number, isDead?: boolean) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_DEATH_STEP', steps, isDead });
	}, [readOnly]);

	const setManualDefense = useCallback((pd?: number, ad?: number, pdr?: number) => {
		if (readOnly) return;
		dispatch({ type: 'SET_MANUAL_DEFENSE', pd, ad, pdr });
	}, [readOnly]);

	const setConditionToggle = useCallback((conditionId: string, active: boolean) => {
		if (readOnly) return;
		dispatch({ type: 'SET_CONDITION_TOGGLE', conditionId, active });
	}, [readOnly]);

	const addAttack = useCallback((attack: AttackData) => {
		if (readOnly) return;
		dispatch({ type: 'ADD_ATTACK', attack });
	}, [readOnly]);

	const removeAttack = useCallback((attackId: string) => {
		if (readOnly) return;
		dispatch({ type: 'REMOVE_ATTACK', attackId });
	}, [readOnly]);

	const updateAttack = useCallback((attackId: string, attack: AttackData) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_ATTACK', attackId, attack });
	}, [readOnly]);

	const resetAttacks = useCallback(() => {
		if (readOnly) return;
		dispatch({ type: 'RESET_ATTACKS' });
	}, [readOnly]);

	const addSpell = useCallback((spell: any) => {
		if (readOnly) return;
		dispatch({ type: 'ADD_SPELL', spell });
	}, [readOnly]);

	const removeSpell = useCallback((spellId: string) => {
		if (readOnly) return;
		dispatch({ type: 'REMOVE_SPELL', spellId });
	}, [readOnly]);

	const updateSpell = useCallback((spellId: string, field: string, value: any) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_SPELL', spellId, field, value });
	}, [readOnly]);

	const resetSpells = useCallback(() => {
		if (readOnly) return;
		dispatch({ type: 'RESET_SPELLS' });
	}, [readOnly]);

	const addManeuver = useCallback((maneuver: any) => {
		if (readOnly) return;
		dispatch({ type: 'ADD_MANEUVER', maneuver });
	}, [readOnly]);

	const removeManeuver = useCallback((maneuverId: string) => {
		if (readOnly) return;
		dispatch({ type: 'REMOVE_MANEUVER', maneuverId });
	}, [readOnly]);

	const resetManeuvers = useCallback(() => {
		if (readOnly) return;
		dispatch({ type: 'RESET_MANEUVERS' });
	}, [readOnly]);

	const updateInventory = useCallback((items: any[]) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_INVENTORY', items });
	}, [readOnly]);

	const resetInventory = useCallback(() => {
		if (readOnly) return;
		dispatch({ type: 'RESET_INVENTORY' });
	}, [readOnly]);

	const updateCurrency = useCallback(
		(goldPieces?: number, silverPieces?: number, copperPieces?: number) => {
			if (readOnly) return;
			dispatch({ type: 'UPDATE_CURRENCY', goldPieces, silverPieces, copperPieces });
		},
		[readOnly]
	);

	const updateNotes = useCallback((notes: string) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_NOTES', notes });
	}, [readOnly]);

	const updateGritPoints = useCallback((grit: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_CURRENT_GRIT_POINTS', grit });
	}, [readOnly]);

	const updateRestPoints = useCallback((rest: number) => {
		if (readOnly) return;
		dispatch({ type: 'UPDATE_CURRENT_REST_POINTS', rest });
	}, [readOnly]);

	const toggleActiveCondition = useCallback((conditionId: string) => {
		if (readOnly) return;
		dispatch({ type: 'TOGGLE_ACTIVE_CONDITION', conditionId });
	}, [readOnly]);

	const setActiveConditionStacks = useCallback((conditionId: string, stacks: number) => {
		if (readOnly) return;
		dispatch({ type: 'SET_ACTIVE_CONDITION_STACKS', conditionId, stacks });
	}, [readOnly]);

	const updateDefenseOverrides = useCallback(
		(overrides: { precisionAD?: number; areaAD?: number; precisionDR?: number }) => {
			if (readOnly) return;
			dispatch({ type: 'UPDATE_DEFENSE_OVERRIDES', overrides });
		},
		[readOnly]
	);

	const setRageActive = useCallback((isRaging: boolean) => {
		if (readOnly) return;
		dispatch({ type: 'SET_RAGE_ACTIVE', isRaging });
	}, [readOnly]);

	return {
		state,
		dispatch,
		// Helper functions
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
	};
}
