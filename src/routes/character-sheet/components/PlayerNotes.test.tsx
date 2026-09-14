import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PlayerNotes from './PlayerNotes';

const notesState = vi.hoisted(() => ({
	readOnly: true,
	rawNotes:
		'__NOTES_V2__[{"id":"note-1","title":"Battle plan","body":"Hold the bridge","createdAt":"2026-09-13T00:00:00.000Z"}]'
}));

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key: string) => key })
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterSheet: () => ({
		updateNotes: vi.fn(),
		readOnly: notesState.readOnly,
		state: {
			character: {
				characterState: {
					notes: { playerNotes: notesState.rawNotes }
				}
			}
		}
	})
}));

afterEach(cleanup);

describe('PlayerNotes', () => {
	it('renders note content without mutation controls in read-only mode', () => {
		render(<PlayerNotes showTitle={false} explicitEditMode />);

		expect(screen.getByText('Battle plan')).toBeInTheDocument();
		expect(screen.getByText('Hold the bridge')).toBeInTheDocument();
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Battle plan' })).toBeDisabled();
		expect(screen.queryByRole('button', { name: 'Edit note' })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Delete note' })).not.toBeInTheDocument();
		expect(screen.queryByText(/characterSheet\.notesNewNote/)).not.toBeInTheDocument();
	});
});
