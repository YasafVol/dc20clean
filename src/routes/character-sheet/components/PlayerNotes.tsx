import React from 'react';
import { useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledPlayerNotesContainer,
	StyledPlayerNotesTitle,
	StyledNotesContent
} from '../styles/PlayerNotes.styles';

const PlayerNotes: React.FC = () => {
	const { updateNotes, state } = useCharacterSheet();

	if (!state.character) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>Loading notes...</p>
			</div>
		);
	}

	const currentNotes = state.character.characterState?.notes?.playerNotes || '';

	const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateNotes(event.target.value);
	};

	return (
		<StyledPlayerNotesContainer>
			<StyledPlayerNotesTitle>Player Notes</StyledPlayerNotesTitle>

			<StyledNotesContent>
				<textarea
					value={currentNotes}
					onChange={handleNotesChange}
					placeholder="Write your notes here..."
					style={{
						width: '100%',
						minHeight: '200px',
						padding: '0.75rem',
						border: '1px solid #555',
						borderRadius: '4px',
						backgroundColor: '#1a1a1a',
						color: '#fff',
						fontFamily: 'inherit',
						fontSize: '0.9rem',
						resize: 'vertical'
					}}
				/>
			</StyledNotesContent>
		</StyledPlayerNotesContainer>
	);
};

export default PlayerNotes;
