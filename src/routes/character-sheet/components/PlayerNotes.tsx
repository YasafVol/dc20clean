import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
	StyledPlayerNotesContainer,
	StyledPlayerNotesTitle,
	StyledNotesContent,
	StyledNotesList,
	StyledNoteItem,
	StyledNoteText,
	StyledNoteActions,
	StyledDeleteButton,
	StyledEditButton,
	StyledAddNoteSection,
	StyledNoteInput,
	StyledAddButton,
	StyledCancelButton,
	StyledSaveButton,
	StyledEmptyNotesMessage
} from '../styles/PlayerNotes.styles';

interface PlayerNote {
	id: string;
	text: string;
	createdAt: Date;
}

interface PlayerNotesProps {
	characterId: string;
}

const PlayerNotes: React.FC<PlayerNotesProps> = ({ characterId }) => {
	const [notes, setNotes] = useState<PlayerNote[]>(() => {
		const savedNotes = localStorage.getItem(`playerNotes_${characterId}`);
		return savedNotes ? JSON.parse(savedNotes) : [];
	});
	
	const [newNoteText, setNewNoteText] = useState('');
	const [isAddingNote, setIsAddingNote] = useState(false);
	const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
	const [editingText, setEditingText] = useState('');

	const saveNotesToStorage = (updatedNotes: PlayerNote[]) => {
		localStorage.setItem(`playerNotes_${characterId}`, JSON.stringify(updatedNotes));
		setNotes(updatedNotes);
	};

	const handleAddNote = () => {
		if (newNoteText.trim()) {
			const newNote: PlayerNote = {
				id: Date.now().toString(),
				text: newNoteText.trim(),
				createdAt: new Date()
			};
			const updatedNotes = [...notes, newNote];
			saveNotesToStorage(updatedNotes);
			setNewNoteText('');
			setIsAddingNote(false);
		}
	};

	const handleDeleteNote = (noteId: string) => {
		const updatedNotes = notes.filter(note => note.id !== noteId);
		saveNotesToStorage(updatedNotes);
	};

	const handleStartEdit = (note: PlayerNote) => {
		setEditingNoteId(note.id);
		setEditingText(note.text);
	};

	const handleSaveEdit = () => {
		if (editingText.trim() && editingNoteId) {
			const updatedNotes = notes.map(note =>
				note.id === editingNoteId
					? { ...note, text: editingText.trim() }
					: note
			);
			saveNotesToStorage(updatedNotes);
			setEditingNoteId(null);
			setEditingText('');
		}
	};

	const handleCancelEdit = () => {
		setEditingNoteId(null);
		setEditingText('');
	};

	const handleCancelAdd = () => {
		setIsAddingNote(false);
		setNewNoteText('');
	};

	return (
		<StyledPlayerNotesContainer>
			<StyledPlayerNotesTitle>Player Notes</StyledPlayerNotesTitle>
			
			<StyledNotesContent>
				{notes.length === 0 && !isAddingNote && (
					<StyledEmptyNotesMessage>
						No notes yet. Click "Add Note" to create your first note.
					</StyledEmptyNotesMessage>
				)}

				<StyledNotesList>
					{notes.map((note) => (
						<StyledNoteItem key={note.id}>
							{editingNoteId === note.id ? (
								<>
									<StyledNoteInput
										value={editingText}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingText(e.target.value)}
										onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
											if (e.key === 'Enter' && !e.shiftKey) {
												e.preventDefault();
												handleSaveEdit();
											} else if (e.key === 'Escape') {
												handleCancelEdit();
											}
										}}
										placeholder="Enter your note..."
										autoFocus
									/>
									<StyledNoteActions>
										<StyledSaveButton onClick={handleSaveEdit}>
											Save
										</StyledSaveButton>
										<StyledCancelButton onClick={handleCancelEdit}>
											Cancel
										</StyledCancelButton>
									</StyledNoteActions>
								</>
							) : (
								<>
									<StyledNoteText>• {note.text}</StyledNoteText>
									<StyledNoteActions>
										<StyledEditButton onClick={() => handleStartEdit(note)} title="Edit note">
											<EditIcon fontSize="small" />
										</StyledEditButton>
										<StyledDeleteButton onClick={() => handleDeleteNote(note.id)} title="Delete note">
											×
										</StyledDeleteButton>
									</StyledNoteActions>
								</>
							)}
						</StyledNoteItem>
					))}
				</StyledNotesList>

				<StyledAddNoteSection>
					{isAddingNote ? (
						<>
							<StyledNoteInput
								value={newNoteText}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewNoteText(e.target.value)}
								onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										handleAddNote();
									} else if (e.key === 'Escape') {
										handleCancelAdd();
									}
								}}
								placeholder="Enter your note..."
								autoFocus
							/>
							<StyledNoteActions>
								<StyledAddButton onClick={handleAddNote}>
									Add Note
								</StyledAddButton>
								<StyledCancelButton onClick={handleCancelAdd}>
									Cancel
								</StyledCancelButton>
							</StyledNoteActions>
						</>
					) : (
						<StyledAddButton onClick={() => setIsAddingNote(true)}>
							+ Add Note
						</StyledAddButton>
					)}
				</StyledAddNoteSection>
			</StyledNotesContent>
		</StyledPlayerNotesContainer>
	);
};

export default PlayerNotes;
