import { useReducer, useCallback } from 'react';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { AttackData } from '../../../types';

// Sheet state - wraps the SavedCharacter
export interface SheetState {
	character: SavedCharacter | null;
	loading: boolean;
	error: string | null;
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
	| { type: 'ADD_ATTACK'; attack: AttackData }
	| { type: 'REMOVE_ATTACK'; attackId: string }
	| { type: 'UPDATE_ATTACK'; attackId: string; attack: AttackData }
	| { type: 'ADD_SPELL'; spell: any }
	| { type: 'REMOVE_SPELL'; spellId: string }
	| { type: 'UPDATE_SPELL'; spellId: string; field: string; value: any }
	| { type: 'ADD_MANEUVER'; maneuver: any }
	| { type: 'REMOVE_MANEUVER'; maneuverId: string }
	| { type: 'UPDATE_INVENTORY'; items: any[] }
	| { type: 'UPDATE_CURRENCY'; goldPieces?: number; silverPieces?: number; copperPieces?: number }
	| { type: 'UPDATE_NOTES'; notes: string }
	| { type: 'UPDATE_CURRENT_GRIT_POINTS'; grit: number }
	| { type: 'UPDATE_CURRENT_REST_POINTS'; rest: number };

const initialState: SheetState = {
	character: null,
	loading: false,
	error: null
};

// Reducer function
function characterSheetReducer(state: SheetState, action: SheetAction): SheetState {
	switch (action.type) {
		case 'LOAD_START':
			return { ...state, loading: true, error: null };

		case 'LOAD_SUCCESS':
			return { ...state, character: action.character, loading: false, error: null };

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

		case 'ADD_ATTACK':
			if (!state.character) return state;
			const currentAttacks = state.character.characterState.attacks || [];
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						attacks: [...currentAttacks, action.attack]
					}
				}
			};

		case 'REMOVE_ATTACK':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						attacks: (state.character.characterState.attacks || []).filter(
							(attack) => attack.id !== action.attackId
						)
					}
				}
			};

		case 'UPDATE_ATTACK':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					characterState: {
						...state.character.characterState,
						attacks: (state.character.characterState.attacks || []).map((attack) =>
							attack.id === action.attackId ? action.attack : attack
						)
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

		case 'ADD_MANEUVER':
			if (!state.character) return state;
			return {
				...state,
				character: {
					...state.character,
					maneuvers: [...(state.character.maneuvers || []), action.maneuver]
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
					)
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

		default:
			return state;
	}
}

// Custom hook that exports the reducer
export function useCharacterSheetReducer() {
	const [state, dispatch] = useReducer(characterSheetReducer, initialState);

	// Helper functions for common operations
	const updateHP = useCallback((hp: number) => {
		dispatch({ type: 'UPDATE_CURRENT_HP', hp });
	}, []);

	const updateSP = useCallback((sp: number) => {
		dispatch({ type: 'UPDATE_CURRENT_SP', sp });
	}, []);

	const updateMP = useCallback((mp: number) => {
		dispatch({ type: 'UPDATE_CURRENT_MP', mp });
	}, []);

	const updateTempHP = useCallback((tempHP: number) => {
		dispatch({ type: 'UPDATE_TEMP_HP', tempHP });
	}, []);

	const updateActionPoints = useCallback((ap: number) => {
		dispatch({ type: 'UPDATE_ACTION_POINTS_USED', ap });
	}, []);

	const updateExhaustion = useCallback((level: number) => {
		dispatch({ type: 'UPDATE_EXHAUSTION', level });
	}, []);

	const updateDeathStep = useCallback((steps: number, isDead?: boolean) => {
		dispatch({ type: 'UPDATE_DEATH_STEP', steps, isDead });
	}, []);

	const setManualDefense = useCallback((pd?: number, ad?: number, pdr?: number) => {
		dispatch({ type: 'SET_MANUAL_DEFENSE', pd, ad, pdr });
	}, []);

	const addAttack = useCallback((attack: AttackData) => {
		dispatch({ type: 'ADD_ATTACK', attack });
	}, []);

	const removeAttack = useCallback((attackId: string) => {
		dispatch({ type: 'REMOVE_ATTACK', attackId });
	}, []);

	const updateAttack = useCallback((attackId: string, attack: AttackData) => {
		dispatch({ type: 'UPDATE_ATTACK', attackId, attack });
	}, []);

	const addSpell = useCallback((spell: any) => {
		dispatch({ type: 'ADD_SPELL', spell });
	}, []);

	const removeSpell = useCallback((spellId: string) => {
		dispatch({ type: 'REMOVE_SPELL', spellId });
	}, []);

	const updateSpell = useCallback((spellId: string, field: string, value: any) => {
		dispatch({ type: 'UPDATE_SPELL', spellId, field, value });
	}, []);

	const addManeuver = useCallback((maneuver: any) => {
		dispatch({ type: 'ADD_MANEUVER', maneuver });
	}, []);

	const removeManeuver = useCallback((maneuverId: string) => {
		dispatch({ type: 'REMOVE_MANEUVER', maneuverId });
	}, []);

	const updateInventory = useCallback((items: any[]) => {
		dispatch({ type: 'UPDATE_INVENTORY', items });
	}, []);

	const updateCurrency = useCallback(
		(goldPieces?: number, silverPieces?: number, copperPieces?: number) => {
			dispatch({ type: 'UPDATE_CURRENCY', goldPieces, silverPieces, copperPieces });
		},
		[]
	);

	const updateNotes = useCallback((notes: string) => {
		dispatch({ type: 'UPDATE_NOTES', notes });
	}, []);

	const updateGritPoints = useCallback((grit: number) => {
		dispatch({ type: 'UPDATE_CURRENT_GRIT_POINTS', grit });
	}, []);

	const updateRestPoints = useCallback((rest: number) => {
		dispatch({ type: 'UPDATE_CURRENT_REST_POINTS', rest });
	}, []);

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
		addAttack,
		removeAttack,
		updateAttack,
		addSpell,
		removeSpell,
		updateSpell,
		addManeuver,
		removeManeuver,
		updateInventory,
		updateCurrency,
		updateNotes,
		updateGritPoints,
		updateRestPoints
	};
}
