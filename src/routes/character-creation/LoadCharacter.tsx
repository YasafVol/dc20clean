import { useState, useEffect } from 'react';
import type { SavedCharacter } from '../../lib/utils/characterEdit';
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
	StyledModalButton
} from './styles/LoadCharacter.styles';

interface LoadCharacterProps {
	onBack: () => void;
	onLoadCharacter?: (character: SavedCharacter) => void;
	onSelectCharacter?: (characterId: string) => void;
	onEditCharacter?: (character: SavedCharacter) => void;
	onLevelUp?: (character: SavedCharacter) => void;
}

function LoadCharacter({
	onBack,
	onLoadCharacter,
	onSelectCharacter,
	onEditCharacter,
	onLevelUp
}: LoadCharacterProps) {
	const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState<SavedCharacter | null>(null);

	useEffect(() => {
		const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		setSavedCharacters(characters);
	}, []);

	const handleCharacterClick = (character: SavedCharacter) => {
		if (onEditCharacter) {
			onEditCharacter(character);
		} else if (onLoadCharacter) {
			onLoadCharacter(character);
		} else {
			console.log('Loading character:', character);
			// TODO: Implement character loading logic
		}
	};

	const handleViewCharacterSheet = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		if (onSelectCharacter) {
			onSelectCharacter(character.id);
		}
	};

	const handleLevelUp = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		if (onLevelUp) {
			onLevelUp(character);
		}
	};

	const handleDeleteClick = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		setCharacterToDelete(character);
		setDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (characterToDelete) {
			// Remove character from localStorage
			const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
			const updatedCharacters = characters.filter((char: SavedCharacter) => char.id !== characterToDelete.id);
			localStorage.setItem('savedCharacters', JSON.stringify(updatedCharacters));
			
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
			<StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>

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
									onClick={(e) => handleLevelUp(character, e)}
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

			{/* Delete Confirmation Modal */}
			{deleteModalOpen && characterToDelete && (
				<StyledModalOverlay>
					<StyledModalContent>
						<StyledModalTitle>Delete Character</StyledModalTitle>
						<StyledModalMessage>
							Are you sure you want to delete "{characterToDelete.finalName || 'Unnamed Character'}"?
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
