import { describe, expect, it } from 'vitest';
import { mergeCharacterStateForLevelUp } from './levelUpStateMerge';
import type { CharacterState, SavedCharacter } from '../types/dataContracts';

describe('mergeCharacterStateForLevelUp', () => {
	it('preserves inventory and clamps current resources to new maxima', () => {
		const originalState: CharacterState = {
			resources: {
				current: {
					currentHP: 40,
					currentSP: 3,
					currentMP: 8,
					currentGritPoints: 6,
					currentRestPoints: 5,
					tempHP: 2,
					actionPointsUsed: 1,
					exhaustionLevel: 1,
					deathSteps: 0,
					isDead: false
				}
			},
			ui: {
				manualDefenseOverrides: { PD: 13 }
			},
			inventory: {
				items: [{ id: 'shield_1', name: 'Tower Shield' }],
				currency: { gold: 10, silver: 5, copper: 0 }
			},
			notes: {
				playerNotes: 'Keep this note'
			}
		};

		const leveledCharacter = {
			finalHPMax: 30,
			finalSPMax: 4,
			finalMPMax: 6,
			finalGritPoints: 3,
			finalRestPoints: 4,
			characterState: {
				resources: {
					current: {
						currentHP: 30,
						currentSP: 4,
						currentMP: 6,
						currentGritPoints: 3,
						currentRestPoints: 4,
						tempHP: 0,
						actionPointsUsed: 0,
						exhaustionLevel: 0,
						deathSteps: 0,
						isDead: false
					}
				},
				ui: { manualDefenseOverrides: {} },
				inventory: { items: [], currency: { gold: 0, silver: 0, copper: 0 } },
				notes: { playerNotes: '' }
			}
		} as unknown as SavedCharacter;

		const merged = mergeCharacterStateForLevelUp(originalState, leveledCharacter);

		expect(merged.inventory.items).toEqual(originalState.inventory.items);
		expect(merged.notes.playerNotes).toBe('Keep this note');
		expect(merged.resources.current.currentHP).toBe(30);
		expect(merged.resources.current.currentSP).toBe(3);
		expect(merged.resources.current.currentMP).toBe(6);
		expect(merged.resources.current.currentGritPoints).toBe(3);
		expect(merged.resources.current.currentRestPoints).toBe(4);
		expect(merged.resources.original).toEqual({
			maxHP: 30,
			maxSP: 4,
			maxMP: 6,
			maxGritPoints: 3,
			maxRestPoints: 4
		});
	});
});
