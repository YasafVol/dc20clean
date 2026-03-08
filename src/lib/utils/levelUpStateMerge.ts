import type { CharacterState, SavedCharacter } from '../types/dataContracts';

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Preserve mutable runtime state while applying new max resources from level-up.
 */
export function mergeCharacterStateForLevelUp(
	originalState: CharacterState | undefined,
	leveledCharacter: SavedCharacter
): CharacterState {
	const nextState = leveledCharacter.characterState;

	if (!originalState) {
		return nextState;
	}

	const current = originalState.resources?.current ?? nextState.resources.current;

	return {
		...nextState,
		...originalState,
		resources: {
			...nextState.resources,
			...originalState.resources,
			current: {
				...nextState.resources.current,
				...current,
				currentHP: clamp(current.currentHP ?? nextState.resources.current.currentHP, 0, leveledCharacter.finalHPMax),
				currentSP: clamp(current.currentSP ?? nextState.resources.current.currentSP, 0, leveledCharacter.finalSPMax),
				currentMP: clamp(current.currentMP ?? nextState.resources.current.currentMP, 0, leveledCharacter.finalMPMax),
				currentGritPoints: clamp(
					current.currentGritPoints ?? nextState.resources.current.currentGritPoints,
					0,
					leveledCharacter.finalGritPoints
				),
				currentRestPoints: clamp(
					current.currentRestPoints ?? nextState.resources.current.currentRestPoints,
					0,
					leveledCharacter.finalRestPoints
				)
			},
			original: {
				maxHP: leveledCharacter.finalHPMax,
				maxSP: leveledCharacter.finalSPMax,
				maxMP: leveledCharacter.finalMPMax,
				maxGritPoints: leveledCharacter.finalGritPoints,
				maxRestPoints: leveledCharacter.finalRestPoints
			}
		}
	};
}
