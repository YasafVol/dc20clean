import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  color: #fbbf24;
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;
`;

const StyledCharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCharacterCard = styled.div`
  border: 2px solid #8b5cf6;
  border-radius: 12px;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
    border-color: #fbbf24;
  }
`;

const StyledCharacterName = styled.h2`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const StyledPlayerName = styled.p`
  margin: 0 0 1rem 0;
  color: #e5e7eb;
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
`;

const StyledCharacterDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledDetailItem = styled.div`
  text-align: center;
`;

const StyledDetailLabel = styled.div`
  color: #a855f7;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StyledDetailValue = styled.div`
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.25rem;
`;

const StyledCompletedDate = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
  font-style: italic;
`;

const StyledEmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const StyledEmptyTitle = styled.h2`
  color: #a855f7;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledEmptyText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const StyledBackButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #6b7280 0%, #4b5563 100%);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(145deg, #4b5563 0%, #374151 100%);
    transform: translateY(-2px);
  }
`;

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
}

function LoadCharacter({ onBack, onLoadCharacter }: LoadCharacterProps) {
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
            <StyledCharacterCard 
              key={character.id}
              onClick={() => handleCharacterClick(character)}
            >
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
                      character.ancestry1Id || 'Unknown',
                      character.ancestry2Id
                    )}
                  </StyledDetailValue>
                </StyledDetailItem>
                
                <StyledDetailItem>
                  <StyledDetailLabel>Class</StyledDetailLabel>
                  <StyledDetailValue>
                    {character.classId || 'Unknown'}
                  </StyledDetailValue>
                </StyledDetailItem>
              </StyledCharacterDetails>
              
              <StyledCompletedDate>
                Created: {formatDate(character.completedAt)}
              </StyledCompletedDate>
            </StyledCharacterCard>
          ))}
        </StyledCharacterGrid>
      )}
    </StyledContainer>
  );
}

export default LoadCharacter;
