import { describe, it, expect } from 'vitest';
import { useCharacterSheetReducer } from './useCharacterSheetReducer';
import { renderHook, act } from '@testing-library/react';

describe('useCharacterSheetReducer', () => {
	it('should initialize with correct initial state', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		expect(result.current.state.character).toBe(null);
		expect(result.current.state.loading).toBe(false);
		expect(result.current.state.error).toBe(null);
	});

	it('should handle LOAD_START action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		act(() => {
			result.current.dispatch({ type: 'LOAD_START' });
		});

		expect(result.current.state.loading).toBe(true);
		expect(result.current.state.error).toBe(null);
	});

	it('should handle LOAD_SUCCESS action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			finalName: 'Test Character',
			level: 1,
			classId: 'fighter',
			className: 'Fighter',
			finalMight: 16,
			finalAgility: 14,
			finalCharisma: 12,
			finalIntelligence: 10,
			finalHPMax: 10,
			finalSPMax: 5,
			finalMPMax: 0,
			characterState: {
				resources: {
					current: {
						currentHP: 10,
						currentSP: 5,
						currentMP: 0,
						currentGritPoints: 0,
						currentRestPoints: 0,
						tempHP: 0,
						actionPointsUsed: 0,
						exhaustionLevel: 0,
						deathSteps: 0,
						isDead: false
					},
					original: {
						maxHP: 10,
						maxSP: 5,
						maxMP: 0
					}
				}
			}
		} as any;

		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		expect(result.current.state.loading).toBe(false);
		expect(result.current.state.character).toEqual(mockCharacter);
		expect(result.current.state.error).toBe(null);
	});

	it('should handle LOAD_ERROR action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const errorMessage = 'Failed to load character';

		act(() => {
			result.current.dispatch({ type: 'LOAD_ERROR', error: errorMessage });
		});

		expect(result.current.state.loading).toBe(false);
		expect(result.current.state.error).toBe(errorMessage);
	});

	it('should handle UPDATE_CURRENT_HP action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				resources: {
					current: { currentHP: 10, currentSP: 5, currentMP: 0 },
					original: { maxHP: 10, maxSP: 5, maxMP: 0 }
				}
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then update HP
		act(() => {
			result.current.dispatch({ type: 'UPDATE_CURRENT_HP', hp: 8 });
		});

		expect(result.current.state.character?.characterState.resources.current.currentHP).toBe(8);
	});

	it('should handle ADD_ATTACK action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				attacks: []
			}
		} as any;

		const newAttack = {
			id: 'attack-1',
			name: 'Sword',
			attackBonus: 5,
			damage: '1d8+3'
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then add an attack
		act(() => {
			result.current.dispatch({ type: 'ADD_ATTACK', attack: newAttack });
		});

		expect(result.current.state.character?.characterState.attacks).toHaveLength(1);
		expect(result.current.state.character?.characterState.attacks[0]).toEqual(newAttack);
	});

	it('should handle REMOVE_ATTACK action for array attacks', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				attacks: [
					{ id: 'a1', name: 'Spear' },
					{ id: 'a2', name: 'Dagger' }
				]
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then remove an attack
		act(() => {
			result.current.dispatch({ type: 'REMOVE_ATTACK', attackId: 'a1' });
		});

		expect((result.current.state.character!.characterState.attacks as any[])).toHaveLength(1);
		expect(((result.current.state.character!.characterState.attacks as any[])[0].id)).toBe('a2');
	});

	it('should handle UPDATE_ATTACK action for array attacks', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				attacks: [
					{ id: 'a1', name: 'Spear', attackBonus: 1 },
					{ id: 'a2', name: 'Dagger', attackBonus: 2 }
				]
			}
		} as any;

		const updatedAttack = { id: 'a2', name: 'Dagger', attackBonus: 5 } as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then update an attack
		act(() => {
			result.current.dispatch({ type: 'UPDATE_ATTACK', attackId: 'a2', attack: updatedAttack });
		});

		const attacksArr = result.current.state.character!.characterState.attacks as any[];
		expect(attacksArr.find((a: any) => a.id === 'a2').attackBonus).toBe(5);
	});

	it('should handle SET_MANUAL_DEFENSE action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				ui: { manualDefenseOverrides: {} }
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then set manual defense
		act(() => {
			result.current.dispatch({ type: 'SET_MANUAL_DEFENSE', pd: 15, ad: 12 });
		});

		expect(result.current.state.character?.characterState.ui.manualDefenseOverrides.PD).toBe(15);
		expect(result.current.state.character?.characterState.ui.manualDefenseOverrides.AD).toBe(12);
	});

	it('should provide helper functions', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		expect(typeof result.current.updateHP).toBe('function');
		expect(typeof result.current.updateSP).toBe('function');
		expect(typeof result.current.updateMP).toBe('function');
		expect(typeof result.current.setManualDefense).toBe('function');
		expect(typeof result.current.addAttack).toBe('function');
		expect(typeof result.current.removeAttack).toBe('function');
		expect(typeof result.current.updateCurrency).toBe('function');
		expect(typeof result.current.updateNotes).toBe('function');
	});

	it('should handle UPDATE_TEMP_HP action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				resources: {
					current: { tempHP: 0 }
				}
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then update temp HP
		act(() => {
			result.current.dispatch({ type: 'UPDATE_TEMP_HP', tempHP: 5 });
		});

		expect(result.current.state.character?.characterState.resources.current.tempHP).toBe(5);
	});

	it('should handle UPDATE_ACTION_POINTS_USED action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				resources: {
					current: { actionPointsUsed: 0 }
				}
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then update action points used
		act(() => {
			result.current.dispatch({ type: 'UPDATE_ACTION_POINTS_USED', ap: 3 });
		});

		expect(result.current.state.character?.characterState.resources.current.actionPointsUsed).toBe(
			3
		);
	});

	it('should handle UPDATE_EXHAUSTION action', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		const mockCharacter = {
			id: 'test-id',
			characterState: {
				resources: {
					current: { exhaustionLevel: 0 }
				}
			}
		} as any;

		// First load a character
		act(() => {
			result.current.dispatch({ type: 'LOAD_SUCCESS', character: mockCharacter });
		});

		// Then update exhaustion
		act(() => {
			result.current.dispatch({ type: 'UPDATE_EXHAUSTION', level: 2 });
		});

		expect(result.current.state.character?.characterState.resources.current.exhaustionLevel).toBe(
			2
		);
	});

	it('should provide new helper functions', () => {
		const { result } = renderHook(() => useCharacterSheetReducer());

		expect(typeof result.current.updateTempHP).toBe('function');
		expect(typeof result.current.updateActionPoints).toBe('function');
		expect(typeof result.current.updateExhaustion).toBe('function');
		expect(typeof result.current.updateAttack).toBe('function');
		expect(typeof result.current.updateInventory).toBe('function');
	});
});
