// Comprehensive character state management utility
// Handles all character data persistence with original/current value separation

import type {
	CharacterState,
	CharacterSheetData,
	AttackData,
	InventoryItemData,
	CurrentValues
} from '../../types';

// Get character state from localStorage
export const getCharacterState = (characterId: string): CharacterState | null => {
	try {
		const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		const character = savedCharacters.find((char: any) => char.id === characterId);

		if (!character) return null;

		// Return the character's state, or null if not found
		return character.characterState || null;
	} catch (error) {
		console.error('Error getting character state:', error);
		return null;
	}
};

// Initialize character state from character data
export const initializeCharacterState = (
	characterData: CharacterSheetData,
	existingState?: CharacterState | null
): CharacterState => {
	// Calculate original values from character data
	const originalResources = {
		maxHP: characterData.finalHPMax || 0,
		maxSP: characterData.finalSPMax || 0,
		maxMP: characterData.finalMPMax || 0,
		maxGritPoints: characterData.finalGritPoints || 0,
		maxRestPoints: characterData.finalRestPoints || 0
	};

	const originalCurrency = {
		goldPieces: 0,
		silverPieces: 0,
		copperPieces: 0,
		electrumPieces: 0,
		platinumPieces: 0
	};

	const originalAttacks: AttackData[] = [
		{
			id: '1',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		},
		{
			id: '2',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		},
		{
			id: '3',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		}
	];

	const originalInventory: InventoryItemData[] = [];

	// Use existing state if available, otherwise initialize with defaults
	return {
		resources: {
			original: originalResources,
			current: existingState?.resources.current || {
				currentHP:
					characterData.currentHP !== undefined ? characterData.currentHP : originalResources.maxHP,
				currentSP:
					characterData.currentSP !== undefined ? characterData.currentSP : originalResources.maxSP,
				currentMP:
					characterData.currentMP !== undefined ? characterData.currentMP : originalResources.maxMP,
				currentGritPoints:
					characterData.currentGritPoints !== undefined
						? characterData.currentGritPoints
						: originalResources.maxGritPoints,
				currentRestPoints:
					characterData.currentRestPoints !== undefined
						? characterData.currentRestPoints
						: originalResources.maxRestPoints,
				tempHP: characterData.tempHP || 0,
				actionPointsUsed: characterData.actionPointsUsed || 0,
				exhaustionLevel: characterData.exhaustionLevel || 0
			}
		},
		currency: {
			original: originalCurrency,
			current: existingState?.currency.current || {
				goldPieces: 0,
				silverPieces: 0,
				copperPieces: 0,
				electrumPieces: 0,
				platinumPieces: 0
			}
		},
		attacks: {
			original: originalAttacks,
			current: existingState?.attacks.current || [...originalAttacks]
		},
		inventory: {
			original: originalInventory,
			current: existingState?.inventory.current || []
		},
		defenseNotes: existingState?.defenseNotes
	};
};

// Save complete character state to localStorage
export const saveCharacterState = (characterId: string, state: CharacterState): void => {
	try {
		const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

		if (characterIndex !== -1) {
			// Update the character's state
			savedCharacters[characterIndex] = {
				...savedCharacters[characterIndex],
				characterState: state,
				// Also maintain backwards compatibility with old format
				currentHP: state.resources.current.currentHP,
				currentSP: state.resources.current.currentSP,
				currentMP: state.resources.current.currentMP,
				currentGritPoints: state.resources.current.currentGritPoints,
				currentRestPoints: state.resources.current.currentRestPoints,
				tempHP: state.resources.current.tempHP,
				actionPointsUsed: state.resources.current.actionPointsUsed,
				exhaustionLevel: state.resources.current.exhaustionLevel,
				goldPieces: state.currency.current.goldPieces,
				silverPieces: state.currency.current.silverPieces,
				copperPieces: state.currency.current.copperPieces,
				electrumPieces: state.currency.current.electrumPieces,
				platinumPieces: state.currency.current.platinumPieces,
				defenseNotes: state.defenseNotes,
				lastModified: new Date().toISOString()
			};

			localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
			console.log('Character state saved to localStorage');
		}
	} catch (error) {
		console.error('Error saving character state:', error);
	}
};

// Update a specific part of character state
export const updateCharacterState = (
	characterId: string,
	updates: Partial<CharacterState>
): void => {
	let currentState = getCharacterState(characterId);

	// If no character state exists, try to create a minimal one from localStorage character data
	if (!currentState) {
		console.log('No character state found for ID:', characterId, '- creating minimal state');

		// Get character data from localStorage to initialize state
		try {
			const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
			const character = savedCharacters.find((char: any) => char.id === characterId);

			if (!character) {
				console.error('No character found in localStorage for ID:', characterId);
				return;
			}

			// Create minimal character state with default values
			currentState = {
				resources: {
					original: {
						maxHP: character.finalHPMax || 0,
						maxSP: character.finalSPMax || 0,
						maxMP: character.finalMPMax || 0,
						maxGritPoints: character.finalGritPoints || 0,
						maxRestPoints: character.finalRestPoints || 0
					},
					current: {
						currentHP:
							character.currentHP !== undefined ? character.currentHP : character.finalHPMax || 0,
						currentSP:
							character.currentSP !== undefined ? character.currentSP : character.finalSPMax || 0,
						currentMP:
							character.currentMP !== undefined ? character.currentMP : character.finalMPMax || 0,
						currentGritPoints:
							character.currentGritPoints !== undefined
								? character.currentGritPoints
								: character.finalGritPoints || 0,
						currentRestPoints:
							character.currentRestPoints !== undefined
								? character.currentRestPoints
								: character.finalRestPoints || 0,
						tempHP: character.tempHP || 0,
						actionPointsUsed: character.actionPointsUsed || 0,
						exhaustionLevel: character.exhaustionLevel || 0
					}
				},
				currency: {
					original: {
						goldPieces: 0,
						silverPieces: 0,
						copperPieces: 0,
						electrumPieces: 0,
						platinumPieces: 0
					},
					current: {
						goldPieces: character.goldPieces || 0,
						silverPieces: character.silverPieces || 0,
						copperPieces: character.copperPieces || 0,
						electrumPieces: character.electrumPieces || 0,
						platinumPieces: character.platinumPieces || 0
					}
				},
				attacks: {
					original: [],
					current: []
				},
				inventory: {
					original: [],
					current: []
				},
				defenseNotes: character.defenseNotes
			};
		} catch (error) {
			console.error('Error creating minimal character state:', error);
			return;
		}
	}

	const newState: CharacterState = {
		...currentState,
		...updates,
		// Deep merge nested objects
		resources: updates.resources
			? {
					...currentState.resources,
					...updates.resources,
					current: updates.resources.current
						? {
								...currentState.resources.current,
								...updates.resources.current
							}
						: currentState.resources.current,
					original: updates.resources.original
						? {
								...currentState.resources.original,
								...updates.resources.original
							}
						: currentState.resources.original
				}
			: currentState.resources,
		currency: updates.currency
			? {
					...currentState.currency,
					...updates.currency,
					current: updates.currency.current
						? {
								...currentState.currency.current,
								...updates.currency.current
							}
						: currentState.currency.current,
					original: updates.currency.original
						? {
								...currentState.currency.original,
								...updates.currency.original
							}
						: currentState.currency.original
				}
			: currentState.currency,
		attacks: updates.attacks
			? {
					...currentState.attacks,
					...updates.attacks
				}
			: currentState.attacks,
		inventory: updates.inventory
			? {
					...currentState.inventory,
					...updates.inventory
				}
			: currentState.inventory
	};

	saveCharacterState(characterId, newState);
};

// Revert a specific data type to original values
export const revertToOriginal = (
	characterId: string,
	dataType: 'resources' | 'currency' | 'attacks' | 'inventory'
): void => {
	const currentState = getCharacterState(characterId);
	if (!currentState) {
		console.log('No character state found for revert operation on ID:', characterId);
		// Try to initialize the state first, then revert won't be needed since it will be at defaults
		return;
	}

	const updates: Partial<CharacterState> = {};

	switch (dataType) {
		case 'resources':
			updates.resources = {
				...currentState.resources,
				current: {
					currentHP: currentState.resources.original.maxHP,
					currentSP: currentState.resources.original.maxSP,
					currentMP: currentState.resources.original.maxMP,
					currentGritPoints: currentState.resources.original.maxGritPoints,
					currentRestPoints: currentState.resources.original.maxRestPoints,
					tempHP: 0,
					actionPointsUsed: 0,
					exhaustionLevel: 0
				}
			};
			break;
		case 'currency':
			updates.currency = {
				...currentState.currency,
				current: { ...currentState.currency.original }
			};
			break;
		case 'attacks':
			updates.attacks = {
				...currentState.attacks,
				current: [...currentState.attacks.original]
			};
			break;
		case 'inventory':
			updates.inventory = {
				...currentState.inventory,
				current: [...currentState.inventory.original]
			};
			break;
	}

	updateCharacterState(characterId, updates);
};

// Convert new CharacterState to legacy CurrentValues format for backwards compatibility
export const characterStateToCurrentValues = (state: CharacterState): CurrentValues => {
	return {
		currentHP: state.resources.current.currentHP,
		currentSP: state.resources.current.currentSP,
		currentMP: state.resources.current.currentMP,
		currentGritPoints: state.resources.current.currentGritPoints,
		currentRestPoints: state.resources.current.currentRestPoints,
		tempHP: state.resources.current.tempHP,
		actionPointsUsed: state.resources.current.actionPointsUsed,
		exhaustionLevel: state.resources.current.exhaustionLevel,
		goldPieces: state.currency.current.goldPieces,
		silverPieces: state.currency.current.silverPieces,
		copperPieces: state.currency.current.copperPieces,
		electrumPieces: state.currency.current.electrumPieces,
		platinumPieces: state.currency.current.platinumPieces
	};
};
