import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import {
	CharacterSheetProvider,
	useCharacterCalculatedData,
	useCharacterSheet
} from './CharacterSheetProvider';

const {
	mockGetCharacterById,
	mockSaveCharacter,
	mockSaveCharacterState,
	mockCalculateCharacterWithBreakdowns,
	mockConvertToEnhancedBuildData
} = vi.hoisted(() => ({
	mockGetCharacterById: vi.fn(),
	mockSaveCharacter: vi.fn(),
	mockSaveCharacterState: vi.fn(),
	mockCalculateCharacterWithBreakdowns: vi.fn(),
	mockConvertToEnhancedBuildData: vi.fn()
}));

vi.mock('convex/react', () => ({
	useQuery: vi.fn().mockReturnValue(undefined),
	useMutation: vi.fn()
}));

vi.mock('../../../../convex/_generated/api', () => ({
	api: { characters: { getByIdForMember: 'characters:getByIdForMember' } }
}));

vi.mock('../../../components/auth/AuthModeContext', () => ({
	useAppAuth: () => ({ isConvexEnabled: false, isAuthenticated: false, isLoading: false })
}));

vi.mock('../../../lib/storage', () => ({
	getDefaultStorage: () => ({
		getCharacterById: mockGetCharacterById,
		saveCharacter: mockSaveCharacter,
		saveCharacterState: mockSaveCharacterState
	})
}));

vi.mock('../../../lib/services/enhancedCharacterCalculator', () => ({
	calculateCharacterWithBreakdowns: mockCalculateCharacterWithBreakdowns,
	convertToEnhancedBuildData: mockConvertToEnhancedBuildData
}));

vi.mock('../../../lib/utils/logger', () => ({
	logger: {
		debug: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		info: vi.fn()
	}
}));

const makeLegacyV010Character = (): SavedCharacter =>
	({
		id: 'legacy-v010-sheet',
		finalName: 'Legacy v0.10 Sheet',
		rulesVersion: 'dc20-0.10',
		schemaVersion: '2.2.0',
		finalHPMax: 12,
		finalSPMax: 3,
		finalMPMax: 0,
		characterState: {
			resources: {
				current: {
					currentHP: 10,
					currentSP: 2,
					currentMP: 0,
					currentGritPoints: 1,
					currentRestPoints: 8,
					tempHP: 0,
					actionPointsUsed: 1,
					exhaustionLevel: 0,
					deathSteps: 1,
					isDead: false
				},
				original: {
					maxHP: 12,
					maxSP: 3,
					maxMP: 0
				}
			},
			attacks: [{ id: 'kept-attack', name: 'Legacy Attack' }],
			spells: [],
			maneuvers: [],
			inventory: {
				items: [{ id: 'kept-item', itemName: 'Legacy Item' }],
				currency: {
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0
				}
			},
			notes: {
				playerNotes: 'Legacy note'
			},
			ui: {
				manualDefenseOverrides: {},
				activeConditions: {},
				combatToggles: {}
			}
		}
	}) as unknown as SavedCharacter;

function SheetProbe() {
	const {
		state,
		readOnly,
		canManageResources,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateGritPoints,
		updateRestPoints,
		updateExhaustion,
		updateInventory,
		updateNotes,
		saveNow
	} = useCharacterSheet();
	const calculated = useCharacterCalculatedData();

	if (state.loading || !state.character) {
		return <div data-testid="sheet-state">loading</div>;
	}

	return (
		<div>
			<div data-testid="sheet-state">loaded</div>
			<div data-testid="character-name">{state.character.finalName}</div>
			<div data-testid="calculation-mode">{calculated ? 'calculated' : 'stored'}</div>
			<div data-testid="current-hp">
				{state.character.characterState.resources.current.currentHP}
			</div>
			<div data-testid="editability">
				{readOnly ? 'read-only' : 'editable'}:{canManageResources ? 'resources' : 'locked'}
			</div>
			<button
				type="button"
				onClick={() => {
					updateHP(7);
					updateSP(1);
					updateMP(0);
					updateTempHP(2);
					updateGritPoints(0);
					updateRestPoints(7);
					updateExhaustion(2);
				}}
			>
				Change Resources
			</button>
			<button
				type="button"
				onClick={() => {
					updateInventory([]);
					updateNotes('Changed note');
				}}
			>
				Attempt Locked Changes
			</button>
			<button type="button" onClick={() => void saveNow()}>
				Save Now
			</button>
		</div>
	);
}

describe('CharacterSheetProvider compatibility fence', () => {
	beforeEach(() => {
		mockGetCharacterById.mockReset();
		mockSaveCharacter.mockReset();
		mockSaveCharacterState.mockReset();
		mockCalculateCharacterWithBreakdowns.mockReset();
		mockConvertToEnhancedBuildData.mockReset();
	});

	afterEach(() => {
		cleanup();
	});

	it('lets legacy owners change only resource counters and saves no structural changes', async () => {
		mockGetCharacterById.mockResolvedValue(makeLegacyV010Character());
		mockSaveCharacter.mockResolvedValue(undefined);
		mockSaveCharacterState.mockResolvedValue(undefined);

		render(
			<CharacterSheetProvider characterId="legacy-v010-sheet">
				<SheetProbe />
			</CharacterSheetProvider>
		);

		expect(await screen.findByTestId('character-name')).toHaveTextContent('Legacy v0.10 Sheet');
		expect(screen.getByTestId('calculation-mode')).toHaveTextContent('stored');
		expect(screen.getByTestId('editability')).toHaveTextContent('read-only:resources');
		expect(mockConvertToEnhancedBuildData).not.toHaveBeenCalled();
		expect(mockCalculateCharacterWithBreakdowns).not.toHaveBeenCalled();

		fireEvent.click(screen.getByRole('button', { name: 'Change Resources' }));
		fireEvent.click(screen.getByRole('button', { name: 'Attempt Locked Changes' }));
		expect(screen.getByTestId('current-hp')).toHaveTextContent('7');
		fireEvent.click(screen.getByRole('button', { name: 'Save Now' }));

		await waitFor(() => {
			expect(mockSaveCharacterState).toHaveBeenCalledTimes(1);
		});
		expect(mockSaveCharacterState).toHaveBeenCalledWith(
			'legacy-v010-sheet',
			expect.objectContaining({
				resources: expect.objectContaining({
					current: expect.objectContaining({
						currentHP: 7,
						currentSP: 1,
						currentMP: 0,
						currentGritPoints: 0,
						currentRestPoints: 7,
						tempHP: 2,
						exhaustionLevel: 2,
						actionPointsUsed: 1,
						deathSteps: 1,
						isDead: false
					})
				}),
				inventory: expect.objectContaining({
					items: [expect.objectContaining({ id: 'kept-item' })]
				}),
				notes: { playerNotes: 'Legacy note' },
				attacks: [expect.objectContaining({ id: 'kept-attack' })]
			})
		);
		expect(mockSaveCharacter).not.toHaveBeenCalled();
		expect(mockConvertToEnhancedBuildData).not.toHaveBeenCalled();
		expect(mockCalculateCharacterWithBreakdowns).not.toHaveBeenCalled();
	});
});
