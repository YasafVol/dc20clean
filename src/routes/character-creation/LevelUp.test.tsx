import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LevelUp from './LevelUp';

const { mockGetCharacterById, mockSaveCharacter, routeParams } = vi.hoisted(() => ({
	mockGetCharacterById: vi.fn(),
	mockSaveCharacter: vi.fn(),
	routeParams: { id: 'test-character' }
}));

vi.mock('react-router-dom', () => ({
	useParams: () => routeParams
}));

vi.mock('../../lib/storage', () => ({
	getDefaultStorage: () => ({
		getCharacterById: mockGetCharacterById,
		saveCharacter: mockSaveCharacter
	})
}));

describe('LevelUp compatibility gate', () => {
	beforeEach(() => {
		routeParams.id = 'test-character';
		mockGetCharacterById.mockReset();
		mockSaveCharacter.mockReset();
	});

	afterEach(() => {
		cleanup();
	});

	it('blocks direct level-up for legacy rules characters', async () => {
		mockGetCharacterById.mockResolvedValue({
			id: 'legacy-v010',
			finalName: 'Legacy v0.10',
			level: 1,
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0'
		});

		render(<LevelUp />);

		expect(await screen.findByText('Level Up Blocked')).toBeInTheDocument();
		expect(
			screen.getByText('This character must be upgraded before it can be leveled up.')
		).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Complete Level Up' })).not.toBeInTheDocument();
		expect(mockSaveCharacter).not.toHaveBeenCalled();
	});

	it('persists level-up for current rules characters', async () => {
		mockGetCharacterById.mockResolvedValue({
			id: 'current-v0105',
			finalName: 'Current v0.10.5',
			level: 1,
			rulesVersion: 'dc20-0.10.5',
			schemaVersion: '2.2.0'
		});

		render(<LevelUp />);

		fireEvent.click(await screen.findByRole('button', { name: 'Complete Level Up' }));

		await waitFor(() => {
			expect(mockSaveCharacter).toHaveBeenCalledWith(
				expect.objectContaining({ id: 'current-v0105', level: 2 })
			);
		});
	});
});
