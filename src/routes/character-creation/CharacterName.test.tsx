import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CharacterName from './CharacterName';

const dispatch = vi.fn();
const useCharacter = vi.fn();
const useCurrentUser = vi.fn();

vi.mock('../../lib/stores/characterContext', () => ({
	useCharacter: () => useCharacter()
}));

vi.mock('../../components/auth/CurrentUserContext', () => ({
	useCurrentUser: () => useCurrentUser()
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

describe('CharacterName player name default', () => {
	afterEach(cleanup);

	beforeEach(() => {
		dispatch.mockReset();
		useCurrentUser.mockReturnValue({ userId: 'user_123', name: 'Alice Player' });
		useCharacter.mockReturnValue({
			state: { finalName: '', finalPlayerName: '' },
			dispatch
		});
	});

	it('defaults an empty player name from the signed-in user', async () => {
		render(<CharacterName />);

		await waitFor(() => {
			expect(screen.getByTestId('player-name-input')).toHaveValue('Alice Player');
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UPDATE_STORE',
			updates: { finalPlayerName: 'Alice Player' }
		});
	});

	it('allows the account-name default to be edited', async () => {
		render(<CharacterName />);
		const input = await screen.findByTestId('player-name-input');
		await waitFor(() => expect(input).toHaveValue('Alice Player'));
		dispatch.mockClear();

		fireEvent.change(input, { target: { value: 'Preferred Name' } });

		expect(input).toHaveValue('Preferred Name');
		expect(dispatch).toHaveBeenCalledWith({
			type: 'UPDATE_STORE',
			updates: { finalPlayerName: 'Preferred Name' }
		});
	});

	it('preserves an existing player name', () => {
		useCharacter.mockReturnValue({
			state: { finalName: '', finalPlayerName: 'Existing Player' },
			dispatch
		});

		render(<CharacterName />);

		expect(screen.getByTestId('player-name-input')).toHaveValue('Existing Player');
		expect(dispatch).not.toHaveBeenCalled();
	});

	it('does not overwrite a name entered while the user profile is loading', () => {
		useCurrentUser.mockReturnValue(null);
		const view = render(<CharacterName />);
		fireEvent.change(screen.getByTestId('player-name-input'), {
			target: { value: 'Typed Player' }
		});

		useCurrentUser.mockReturnValue({ userId: 'user_123', name: 'Alice Player' });
		dispatch.mockClear();
		view.rerender(<CharacterName />);

		expect(screen.getByTestId('player-name-input')).toHaveValue('Typed Player');
		expect(dispatch).not.toHaveBeenCalled();
	});
});
