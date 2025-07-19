import { useState, useEffect } from 'react';
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
  StyledBackButton
} from './styles/LoadCharacter.styles';

interface SavedCharacter {
  id: string;
  finalName: string;
  finalPlayerName: string;
  classId: string;
  ancestry1Id: string;
  ancestry2Id?: string;
  completedAt: string;
  [key: string]: any;
}

interface LoadCharacterProps {
  onBack: () => void;
  onLoadCharacter?: (character: SavedCharacter) => void;
  onSelectCharacter?: (characterId: string) => void;
}

function LoadCharacter({ onBack, onLoadCharacter, onSelectCharacter }: LoadCharacterProps) {
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);

  useEffect(() => {
    const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    setSavedCharacters(characters);
  }, []);

  const handleCharacterClick = (character: SavedCharacter) => {
    if (onLoadCharacter) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

const formatAncestry = (ancestry1: string, ancestry2?: string) => {
    if (ancestry2) {
      return `${ancestry1}/${ancestry2}`;
    }
    return ancestry1;
  };

  return (
    <StyledContainer>
      <StyledBackButton onClick={onBack}>
        ← Back to Menu
      </StyledBackButton>
      
      <StyledTitle>Load Character</StyledTitle>
      
      {savedCharacters.length === 0 ? (
        <StyledEmptyState>
          <StyledEmptyTitle>No Saved Characters</StyledEmptyTitle>
          <StyledEmptyText>
            You haven't created any characters yet.<br />
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
              
              <StyledPlayerName>
                Player: {character.finalPlayerName || 'Unknown'}
              </StyledPlayerName>
              
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
              </StyledCardActions>
            </StyledCharacterCard>
          ))}
        </StyledCharacterGrid>
      )}
    </StyledContainer>
  );
}

export default LoadCharacter;
