import { useState, useEffect } from 'react';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { getAllSavedCharacters, saveAllCharacters, getInitializedCharacterState } from '../../lib/utils/storageUtils';
import {
	StyledContainer,
	StyledTitle,
	StyledCharacterGrid,
	StyledCharacterCard,
	StyledCardActions,
	StyledActionButton,
	StyledCharacterName,
	StyledPlayerName,
	StyledCharacterDetails,
	StyledDetailItem,
	StyledDetailLabel,
	StyledDetailValue,
	StyledCompletedDate,
	StyledEmptyState,
	StyledEmptyTitle,
	StyledEmptyText,
	StyledBackButton,
	StyledModalOverlay,
	StyledModalContent,
	StyledModalTitle,
	StyledModalMessage,
	StyledModalActions,
	StyledModalButton,
	StyledImportButton,
	StyledImportModalContent,
	StyledImportModalTitle,
	StyledImportTextarea,
	StyledImportActions,
	StyledImportButton2,
	StyledImportMessage,
	StyledButtonRow
} from './styles/LoadCharacter.styles';

import { useNavigate } from 'react-router-dom';

function LoadCharacter() {
	const navigate = useNavigate();
	const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState<SavedCharacter | null>(null);
	
	// Import functionality state
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [importJsonText, setImportJsonText] = useState('');
	const [importMessage, setImportMessage] = useState<{ text: string; type: 'error' | 'success' | 'info' } | null>(null);
	const [isImporting, setIsImporting] = useState(false);

	useEffect(() => {
		const characters = getAllSavedCharacters();
		setSavedCharacters(characters);
	}, []);

	const handleCharacterClick = (character: SavedCharacter) => {
		// Edit character
		navigate(`/character/${character.id}/edit`, { state: { editCharacter: character } });
	};

	const handleViewCharacterSheet = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		navigate(`/character/${character.id}`);
	};

	// Level up handler placeholder

	const handleDeleteClick = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		setCharacterToDelete(character);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (characterToDelete) {
			// Remove character from localStorage
			const characters = getAllSavedCharacters();
			const updatedCharacters = characters.filter(
				(char: SavedCharacter) => char.id !== characterToDelete.id
			);
			saveAllCharacters(updatedCharacters);

			// Update state
			setSavedCharacters(updatedCharacters);

			// Close modal
			setDeleteModalOpen(false);
			setCharacterToDelete(null);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalOpen(false);
		setCharacterToDelete(null);
	};

	// Import functionality handlers
	const handleImportClick = () => {
		setImportModalOpen(true);
		setImportJsonText('');
		setImportMessage(null);
	};

	const handleImportCancel = () => {
		setImportModalOpen(false);
		setImportJsonText('');
		setImportMessage(null);
		setIsImporting(false);
	};

	const generateNewCharacterId = (): string => {
		return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	};

	const handleImportCharacter = async () => {
		if (!importJsonText.trim()) {
			setImportMessage({ text: 'Please paste character JSON data', type: 'error' });
			return;
		}

		setIsImporting(true);
		setImportMessage(null);

		try {
			// Parse the JSON
			const parsedData = JSON.parse(importJsonText);

			// Basic validation - check if it looks like a character
			if (!parsedData || typeof parsedData !== 'object') {
				throw new Error('Invalid character data: not a valid object');
			}

			// Check for essential character properties
			const hasRequiredFields = parsedData.finalName || parsedData.id || parsedData.ancestry1Id || parsedData.classId;
			if (!hasRequiredFields) {
				throw new Error('Invalid character data: missing required character fields');
			}

			// Get current characters to check for duplicates
			const existingCharacters = getAllSavedCharacters();
			
			// Check if character with same ID already exists
			const existingCharacter = existingCharacters.find(char => char.id === parsedData.id);
			
			let characterToImport = { ...parsedData };

			if (existingCharacter) {
				// Generate new ID for duplicate
				const newId = generateNewCharacterId();
				characterToImport.id = newId;
				characterToImport.finalName = `${parsedData.finalName || 'Imported Character'} (Copy)`;
				setImportMessage({ 
					text: `Character with ID "${parsedData.id}" already exists. Importing as new character with ID "${newId}"`, 
					type: 'info' 
				});
			}

			// Ensure character has proper structure
			characterToImport = {
				...characterToImport,
				id: characterToImport.id || generateNewCharacterId(),
				importedAt: new Date().toISOString(),
				lastModified: new Date().toISOString(),
				schemaVersion: 2,
				// Ensure character state exists
				characterState: characterToImport.characterState || getInitializedCharacterState(characterToImport),
				// Ensure required arrays exist
				selectedTraitIds: characterToImport.selectedTraitIds || [],
				selectedFeatureChoices: characterToImport.selectedFeatureChoices || {},
				skillsData: characterToImport.skillsData || {},
				tradesData: characterToImport.tradesData || {},
				languagesData: characterToImport.languagesData || { common: { fluency: 'fluent' } },
				spells: characterToImport.spells || [],
				maneuvers: characterToImport.maneuvers || []
			};

			// Add to characters list and save
			const updatedCharacters = [...existingCharacters, characterToImport as SavedCharacter];
			saveAllCharacters(updatedCharacters);
			setSavedCharacters(updatedCharacters);

			setImportMessage({ 
				text: `Successfully imported character "${characterToImport.finalName || characterToImport.id}"!`, 
				type: 'success' 
			});

			// Close modal after a short delay
			setTimeout(() => {
				handleImportCancel();
			}, 2000);

		} catch (error) {
			console.error('Import error:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			setImportMessage({ 
				text: `Failed to import character: ${errorMessage}`, 
				type: 'error' 
			});
		} finally {
			setIsImporting(false);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			// Check if the date is valid
			if (isNaN(date.getTime())) {
				return 'Unknown Date';
			}
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		} catch (error) {
			return 'Unknown Date';
		}
	};

	const formatAncestry = (ancestry1: string, ancestry2?: string) => {
		if (ancestry2) {
			return `${ancestry1}/${ancestry2}`;
		}
		return ancestry1;
	};

	return (
		<StyledContainer>
			<StyledButtonRow>
				<StyledBackButton onClick={() => navigate('/menu')}>← Back to Menu</StyledBackButton>
				<StyledImportButton onClick={handleImportClick}>📥 Import from JSON</StyledImportButton>
			</StyledButtonRow>

			<StyledTitle>Load Character</StyledTitle>

			{savedCharacters.length === 0 ? (
				<StyledEmptyState>
					<StyledEmptyTitle>No Saved Characters</StyledEmptyTitle>
					<StyledEmptyText>
						You haven't created any characters yet.
						<br />
						Go back to the menu and create your first character!
					</StyledEmptyText>
				</StyledEmptyState>
			) : (
				<StyledCharacterGrid>
					{savedCharacters.map((character) => (
						<StyledCharacterCard key={character.id}>
							<StyledCharacterName>
								{character.finalName || 'Unnamed Character'}
							</StyledCharacterName>

							<StyledPlayerName>Player: {character.finalPlayerName || 'Unknown'}</StyledPlayerName>

							<StyledCharacterDetails>
								<StyledDetailItem>
									<StyledDetailLabel>Race</StyledDetailLabel>
									<StyledDetailValue>
										{formatAncestry(
											character.ancestry1Name || character.ancestry1Id || 'Unknown',
											character.ancestry2Name || character.ancestry2Id
										)}
									</StyledDetailValue>
								</StyledDetailItem>

								<StyledDetailItem>
									<StyledDetailLabel>Class</StyledDetailLabel>
									<StyledDetailValue>
										{character.className || character.classId || 'Unknown'}
									</StyledDetailValue>
								</StyledDetailItem>
							</StyledCharacterDetails>

							<StyledCompletedDate>
								Created: {formatDate(character.createdAt || character.completedAt)}
							</StyledCompletedDate>

							<StyledCardActions>
								<StyledActionButton
									variant="primary"
									onClick={(e) => handleViewCharacterSheet(character, e)}
								>
									View Sheet
								</StyledActionButton>
								<StyledActionButton
									variant="secondary"
									onClick={() => handleCharacterClick(character)}
								>
									Edit
								</StyledActionButton>
								<StyledActionButton
									variant="secondary"
									onClick={() => navigate(`/character/${character.id}/levelup`)}
								>
									Level Up
								</StyledActionButton>
								<StyledActionButton
									variant="danger"
									onClick={(e) => handleDeleteClick(character, e)}
								>
									Delete
								</StyledActionButton>
							</StyledCardActions>
						</StyledCharacterCard>
					))}
				</StyledCharacterGrid>
			)}

			{/* Import Character Modal */}
			{importModalOpen && (
				<StyledModalOverlay>
					<StyledImportModalContent>
						<StyledImportModalTitle>Import Character from JSON</StyledImportModalTitle>
						<p style={{ color: '#e5e7eb', marginBottom: '1rem' }}>
							Paste the character JSON data from the clipboard (exported from character sheet):
						</p>
						
						<StyledImportTextarea
							value={importJsonText}
							onChange={(e) => setImportJsonText(e.target.value)}
							placeholder="Paste character JSON data here..."
						/>

						{importMessage && (
							<StyledImportMessage type={importMessage.type}>
								{importMessage.text}
							</StyledImportMessage>
						)}

						<StyledImportActions>
							<StyledImportButton2 variant="cancel" onClick={handleImportCancel}>
								Cancel
							</StyledImportButton2>
							<StyledImportButton2 
								variant="import" 
								onClick={handleImportCharacter}
								disabled={isImporting || !importJsonText.trim()}
							>
								{isImporting ? 'Importing...' : 'Import Character'}
							</StyledImportButton2>
						</StyledImportActions>
					</StyledImportModalContent>
				</StyledModalOverlay>
			)}

			{/* Delete Confirmation Modal */}
			{deleteModalOpen && characterToDelete && (
				<StyledModalOverlay>
					<StyledModalContent>
						<StyledModalTitle>Delete Character</StyledModalTitle>
						<StyledModalMessage>
							Are you sure you want to delete "{characterToDelete.finalName || 'Unnamed Character'}
							"?
							<br />
							This action cannot be undone.
						</StyledModalMessage>
						<StyledModalActions>
							<StyledModalButton variant="cancel" onClick={handleCancelDelete}>
								Cancel
							</StyledModalButton>
							<StyledModalButton variant="delete" onClick={handleConfirmDelete}>
								Delete
							</StyledModalButton>
						</StyledModalActions>
					</StyledModalContent>
				</StyledModalOverlay>
			)}
		</StyledContainer>
	);
}

export default LoadCharacter;
