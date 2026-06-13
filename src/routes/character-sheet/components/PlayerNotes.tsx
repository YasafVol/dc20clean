import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledPlayerNotesContainer,
	StyledPlayerNotesTitle,
	StyledNotesContent,
	StyledNotesList,
	StyledNoteItem,
	StyledNoteInput,
	StyledAddButton,
	StyledDeleteButton,
	StyledEmptyNotesMessage,
	StyledAddNoteSection
} from '../styles/PlayerNotes.styles';

// Multi-note data model. Stored inside the existing `notes.playerNotes` string
// field as a JSON-encoded array so we don't need to migrate the reducer/schema.
// Legacy single-string notes are auto-wrapped in one Note on first load.
interface Note {
	id: string;
	title: string;
	body: string;
	createdAt: string;
}

const NOTES_JSON_MARKER = '__NOTES_V2__';

/** Parse the persisted string into an array of notes (handles legacy strings). */
function parseNotes(raw: string | undefined | null): Note[] {
	if (!raw) return [];
	const trimmed = raw.trim();
	if (!trimmed) return [];

	// New format: starts with the marker, followed by JSON array
	if (trimmed.startsWith(NOTES_JSON_MARKER)) {
		try {
			const json = trimmed.slice(NOTES_JSON_MARKER.length);
			const parsed = JSON.parse(json);
			if (Array.isArray(parsed)) {
				return parsed.filter(
					(n): n is Note => n && typeof n.id === 'string' && typeof n.body === 'string'
				);
			}
		} catch {
			// Fall through to legacy handling below
		}
	}

	// Legacy: single string of notes — wrap as one note so we don't lose data
	return [
		{
			id: 'legacy_note',
			title: 'Notes',
			body: trimmed,
			createdAt: new Date().toISOString()
		}
	];
}

/** Serialize notes back into the marker + JSON string for storage. */
function serializeNotes(notes: Note[]): string {
	if (notes.length === 0) return '';
	return NOTES_JSON_MARKER + JSON.stringify(notes);
}

const PlayerNotes: React.FC = () => {
	const { t } = useTranslation();
	const { updateNotes, state } = useCharacterSheet();

	const rawNotes = state.character?.characterState?.notes?.playerNotes || '';
	const notes = useMemo(() => parseNotes(rawNotes), [rawNotes]);

	// Local edit state for title — body edits flow directly to storage so they're
	// auto-saved like every other field on the sheet.
	const [editingTitleId, setEditingTitleId] = useState<string | null>(null);

	if (!state.character) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>{t('characterSheet.notesLoading')}</p>
			</div>
		);
	}

	const persist = (next: Note[]) => {
		updateNotes(serializeNotes(next));
	};

	const handleAddNote = () => {
		const newNote: Note = {
			id: `note_${Date.now()}`,
			title: t('characterSheet.notesUntitled'),
			body: '',
			createdAt: new Date().toISOString()
		};
		persist([...notes, newNote]);
		setEditingTitleId(newNote.id);
	};

	const handleUpdateBody = (id: string, body: string) => {
		persist(notes.map((n) => (n.id === id ? { ...n, body } : n)));
	};

	const handleUpdateTitle = (id: string, title: string) => {
		persist(notes.map((n) => (n.id === id ? { ...n, title } : n)));
	};

	const handleDeleteNote = (id: string) => {
		const confirmed = window.confirm(t('characterSheet.notesDeleteConfirm'));
		if (!confirmed) return;
		persist(notes.filter((n) => n.id !== id));
	};

	return (
		<StyledPlayerNotesContainer>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '1rem',
					gap: '1rem'
				}}
			>
				<StyledPlayerNotesTitle style={{ margin: 0, textAlign: 'left', flex: 1 }}>
					{t('characterSheet.notesTitle')}
				</StyledPlayerNotesTitle>
				<StyledAddButton onClick={handleAddNote} type="button">
					+ {t('characterSheet.notesNewNote')}
				</StyledAddButton>
			</div>

			<StyledNotesContent>
				{notes.length === 0 ? (
					<StyledEmptyNotesMessage>{t('characterSheet.notesEmpty')}</StyledEmptyNotesMessage>
				) : (
					<StyledNotesList>
						{notes.map((note) => (
							<StyledNoteItem key={note.id}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: '0.5rem',
										marginBottom: '0.5rem'
									}}
								>
									{editingTitleId === note.id ? (
										<input
											type="text"
											value={note.title}
											onChange={(e) => handleUpdateTitle(note.id, e.target.value)}
											onBlur={() => setEditingTitleId(null)}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === 'Escape') {
													(e.target as HTMLInputElement).blur();
												}
											}}
											autoFocus
											style={{
												flex: 1,
												background: 'transparent',
												border: '1px solid #555',
												borderRadius: '4px',
												color: '#fff',
												padding: '0.25rem 0.5rem',
												fontSize: '0.95rem',
												fontWeight: 600
											}}
										/>
									) : (
										<button
											type="button"
											onClick={() => setEditingTitleId(note.id)}
											title={t('characterSheet.notesEditTitle')}
											style={{
												flex: 1,
												textAlign: 'left',
												background: 'transparent',
												border: 'none',
												color: '#fff',
												padding: '0.25rem 0',
												fontSize: '0.95rem',
												fontWeight: 600,
												cursor: 'text'
											}}
										>
											{note.title || t('characterSheet.notesUntitled')}
										</button>
									)}
									<StyledDeleteButton
										onClick={() => handleDeleteNote(note.id)}
										title={t('characterSheet.notesDelete')}
										type="button"
									>
										×
									</StyledDeleteButton>
								</div>
								<StyledNoteInput
									value={note.body}
									onChange={(e) => handleUpdateBody(note.id, e.target.value)}
									placeholder={t('characterSheet.notesPlaceholder')}
								/>
							</StyledNoteItem>
						))}
					</StyledNotesList>
				)}
			</StyledNotesContent>

			{notes.length > 0 && (
				<StyledAddNoteSection>
					<StyledAddButton onClick={handleAddNote} type="button">
						+ {t('characterSheet.notesNewNote')}
					</StyledAddButton>
				</StyledAddNoteSection>
			)}
		</StyledPlayerNotesContainer>
	);
};

export default PlayerNotes;
