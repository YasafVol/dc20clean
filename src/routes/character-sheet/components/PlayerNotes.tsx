import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	StyledPlayerNotesContainer,
	StyledPlayerNotesTitle,
	StyledNotesContent
} from '../styles/PlayerNotes.styles';

const PlayerNotes: React.FC = () => {
	const { t } = useTranslation();
	const { updateNotes, state } = useCharacterSheet();

	if (!state.character) {
		return (
			<div style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
				<p>{t('characterSheet.notesLoading')}</p>
			</div>
		);
	}

	const currentNotes = state.character.characterState?.notes?.playerNotes || '';

	const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateNotes(event.target.value);
	};

	return (
		<StyledPlayerNotesContainer>
			<StyledPlayerNotesTitle>{t('characterSheet.notesTitle')}</StyledPlayerNotesTitle>

			<StyledNotesContent>
				<textarea
					value={currentNotes}
					onChange={handleNotesChange}
					placeholder={t('characterSheet.notesPlaceholder')}
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
