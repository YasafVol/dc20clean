import React, { useState } from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { nameByRace } from 'fantasy-name-generator';

const StyledContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  max-width: 600px;
  margin: 2rem auto;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  color: #fbbf24;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  border-bottom: 2px solid #ef4444;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const StyledInputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #fbbf24;
  font-weight: bold;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #a855f7;
  border-radius: 8px;
  background: rgba(45, 27, 105, 0.8);
  color: #e5e7eb;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #fbbf24;
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const StyledSuggestionSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #a855f7;
  border-radius: 8px;
  background: rgba(45, 27, 105, 0.4);
`;

const StyledSuggestionTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.1rem;
  font-weight: bold;
`;

const StyledSuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
  max-height: 200px;
  overflow-y: auto;
`;

const StyledSuggestionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #a855f7;
  border-radius: 6px;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: #a855f7;
    color: #1e1b4b;
    transform: translateY(-2px);
  }
`;

const StyledGenerateButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
  color: #1e1b4b;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledFinishButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #10b981 0%, #059669 100%);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;
  
  &:hover {
    background: linear-gradient(145deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background: linear-gradient(145deg, #6b7280 0%, #4b5563 100%);
  }
`;

const StyledCharacterInfo = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px solid #ef4444;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.1);
  text-align: center;
`;

const StyledCharacterDetails = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.6;
`;

// Name generation using fantasy-name-generator npm package
const generateNamesFromNPM = (race: string): string[] => {
  try {
    const names: string[] = [];
    
    // Generate 6 different names (3 male, 3 female)
    for (let i = 0; i < 3; i++) {
      const maleName = nameByRace(race, { gender: 'male' });
      const femaleName = nameByRace(race, { gender: 'female' });
      
      if (maleName && typeof maleName === 'string') {
        names.push(maleName);
      }
      if (femaleName && typeof femaleName === 'string') {
        names.push(femaleName);
      }
    }
    
    return names.filter(name => name.length > 0);
  } catch (error) {
    console.error('Error generating names from npm package:', error);
    return [];
  }
};

function CharacterName() {
  const { state, dispatch } = useCharacter();
  const [characterName, setCharacterName] = useState(state.finalName || '');
  const [playerName, setPlayerName] = useState(state.finalPlayerName || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const getFallbackNames = (ancestry: string) => {
    const fallbackNames: { [key: string]: string[] } = {
      human: ['Aiden', 'Brianna', 'Connor', 'Diana', 'Ethan', 'Fiona'],
      elf: ['Aerdrie', 'Berrian', 'Caelynn', 'Dayereth', 'Enna', 'Galinndan'],
      dwarf: ['Adrik', 'Baern', 'Cathra', 'Darrak', 'Eberk', 'Falkrunn'],
      halfling: ['Alton', 'Bree', 'Cora', 'Daisy', 'Eldon', 'Finnan'],
      dragonborn: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan'],
      gnome: ['Alston', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon'],
      'half-elf': ['Aramil', 'Berrian', 'Carric', 'Dayereth', 'Enna', 'Galinndan'],
      'half-orc': ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh'],
      tiefling: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados']
    };
    
    return fallbackNames[ancestry] || fallbackNames.human;
  };

  const generateNames = () => {
    // No need for rate limiting with npm package, but keep generating state for UX
    if (isGenerating) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Get character details
      const ancestry1 = state.ancestry1Id?.toLowerCase() || 'human';
      const ancestry2 = state.ancestry2Id?.toLowerCase();
      
      // Map ancestry names to npm package race names
      const raceMapping: { [key: string]: string } = {
        human: 'human',
        elf: 'elf',
        dwarf: 'dwarf',
        halfling: 'halfling',
        dragonborn: 'dragon',
        gnome: 'gnome',
        'half-elf': 'elf',
        'half-orc': 'orc',
        tiefling: 'demon',
        default: 'human'
      };
      
      // Always generate names from first ancestry
      const mappedRace1 = raceMapping[ancestry1] || 'human';
      const npmNames1 = generateNamesFromNPM(mappedRace1);
      const fallbackNames1 = getFallbackNames(ancestry1);
      let allNames = [...npmNames1, ...fallbackNames1].slice(0, 6);
      
      // If second ancestry exists, append 6 more names from it
      if (ancestry2) {
        const mappedRace2 = raceMapping[ancestry2] || 'human';
        const npmNames2 = generateNamesFromNPM(mappedRace2);
        const fallbackNames2 = getFallbackNames(ancestry2);
        const names2 = [...npmNames2, ...fallbackNames2].slice(0, 6);
        allNames = [...allNames, ...names2];
      }
      
      // Remove duplicates and limit appropriately
      const uniqueNames = [...new Set(allNames)];
      
      // Add a small delay for better UX (simulate processing)
      setTimeout(() => {
        setSuggestions(uniqueNames);
        setIsGenerating(false);
      }, 500);
      
    } catch (error) {
      console.error('Error generating names:', error);
      // Fallback to local names
      const fallbackNames = getFallbackNames(state.ancestry1Id?.toLowerCase() || 'human');
      setSuggestions(fallbackNames);
      setIsGenerating(false);
    }
  };

  const selectSuggestion = (name: string) => {
    setCharacterName(name);
    // Update the context immediately
    dispatch({ 
      type: 'UPDATE_STORE', 
      updates: { 
        finalName: name
      } 
    });
  };

  const handleSubmit = () => {
    if (characterName.trim() && playerName.trim()) {
      const completedCharacter = {
        ...state,
        finalName: characterName.trim(),
        finalPlayerName: playerName.trim(),
        completedAt: new Date().toISOString(),
        id: Date.now().toString() // Simple ID generation
      };
      
      // Save to local storage
      const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
      existingCharacters.push(completedCharacter);
      localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
      
      // Update the store
      dispatch({ 
        type: 'UPDATE_STORE', 
        updates: { 
          finalName: characterName.trim(),
          finalPlayerName: playerName.trim()
        } 
      });
      
      // Show success message
      alert('Character saved successfully!');
      
      // TODO: Navigate back to menu or show completion screen
      console.log('Character completed and saved:', completedCharacter);
    }
  };

  const getCharacterDescription = () => {
    const ancestry1 = state.ancestry1Id;
    const ancestry2 = state.ancestry2Id;
    const classId = state.classId;
    
    let ancestryDescription = 'Your Character';
    
    if (ancestry1 && ancestry2) {
      // Both ancestries exist
      ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}/${ancestry2.charAt(0).toUpperCase() + ancestry2.slice(1)}`;
    } else if (ancestry1) {
      // Only first ancestry
      ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}`;
    }
    
    if (classId) {
      return `${ancestryDescription} ${classId.charAt(0).toUpperCase() + classId.slice(1)}`;
    }
    
    return ancestryDescription;
  };

  return (
    <StyledContainer>
      <StyledTitle>Name Your Character</StyledTitle>
      
      <StyledCharacterInfo>
        <StyledCharacterDetails>
          Creating: {getCharacterDescription()}
        </StyledCharacterDetails>
      </StyledCharacterInfo>
      
      <StyledInputGroup>
        <StyledLabel htmlFor="characterName">Character Name</StyledLabel>
        <StyledInput
          id="characterName"
          type="text"
          value={characterName}
          onChange={(e) => {
            const value = e.target.value;
            setCharacterName(value);
            // Update the context immediately
            dispatch({ 
              type: 'UPDATE_STORE', 
              updates: { 
                finalName: value.trim() || null
              } 
            });
          }}
          placeholder="Enter your character's name"
        />
      </StyledInputGroup>
      
      <StyledInputGroup>
        <StyledLabel htmlFor="playerName">Player Name</StyledLabel>
        <StyledInput
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => {
            const value = e.target.value;
            setPlayerName(value);
            // Update the context immediately
            dispatch({ 
              type: 'UPDATE_STORE', 
              updates: { 
                finalPlayerName: value.trim() || null
              } 
            });
          }}
          placeholder="Enter your name"
        />
      </StyledInputGroup>
      
      <StyledSuggestionSection>
        <StyledSuggestionTitle>Name Suggestions</StyledSuggestionTitle>
        {suggestions.length > 0 && (
          <StyledSuggestionGrid>
            {suggestions.map((name, index) => (
              <StyledSuggestionButton
                key={index}
                onClick={() => selectSuggestion(name)}
              >
                {name}
              </StyledSuggestionButton>
            ))}
          </StyledSuggestionGrid>
        )}
        <StyledGenerateButton 
          onClick={generateNames}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Names'}
        </StyledGenerateButton>
      </StyledSuggestionSection>

      <StyledFinishButton
        onClick={handleSubmit}
        disabled={!characterName.trim() || !playerName.trim()}
      >
        Complete Character Creation
      </StyledFinishButton>
    </StyledContainer>
  );
}

export default CharacterName;
