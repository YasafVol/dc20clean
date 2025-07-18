import { useState } from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';

// Ancestry-specific icons using Unicode symbols and emojis
const ancestryIcons: { [key: string]: string } = {
  'human': '👤',
  'elf': '🧝‍♂️',
  'dwarf': '🧔',
  'halfling': '🧙‍♂️',
  'dragonborn': '🐉',
  'gnome': '🎭',
  'half-elf': '🧝‍♀️',
  'half-orc': '👹',
  'tiefling': '😈',
  'orc': '🗡️',
  'goblin': '👺',
  'kobold': '🦎',
  'default': '🌟'
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StyledCard = styled.button<{ $selected: boolean }>`
  border: 2px solid #a855f7;
  padding: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
    border-color: #fbbf24;
  }

  ${props => props.$selected && `
    border-color: #ef4444;
    background: linear-gradient(145deg, #991b1b 0%, #dc2626 100%);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
    transform: translateY(-2px);
  `}
`;

const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledAncestryIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
  background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const StyledCardTitle = styled.h3`
  margin: 0;
  color: #fbbf24;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const StyledCardDescription = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 0.9rem;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
`;

const StyledCardFooter = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledReadMore = styled.button`
  color: #fbbf24;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #f59e0b;
    background: rgba(251, 191, 36, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const StyledTooltip = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
  color: #e5e7eb;
  padding: 2rem;
  border-radius: 12px;
  border: 3px solid #8b5cf6;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  z-index: 2000;
  width: 90vw;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  font-size: 1rem;
  line-height: 1.6;
  opacity: ${props => props.$show ? 1 : 0};
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  
  /* Custom scrollbar for popup */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1e1b4b;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #a855f7;
  }
`;

const StyledTooltipOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1999;
  opacity: ${props => props.$show ? 1 : 0};
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`;

const StyledTooltipHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #8b5cf6;
`;

const StyledTooltipIcon = styled.div`
  font-size: 3rem;
  background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
`;

const StyledTooltipTitle = styled.h3`
  margin: 0;
  color: #fbbf24;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const StyledTooltipContent = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 1.1rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const StyledCloseHint = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #8b5cf6;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  font-style: italic;
`;

function AncestrySelector() {
  const { state, dispatch } = useCharacter();
  const [popupAncestry, setPopupAncestry] = useState<string | null>(null);
  
  const selectedAncestries: string[] = [];
  if (state.ancestry1Id) selectedAncestries.push(state.ancestry1Id);
  if (state.ancestry2Id) selectedAncestries.push(state.ancestry2Id);

  function handleSelectAncestry(ancestryId: string) {
    const isSelected = selectedAncestries.includes(ancestryId);
    
    if (isSelected) {
      // Deselect
      let newAncestry1Id = state.ancestry1Id;
      let newAncestry2Id = state.ancestry2Id;
      
      if (state.ancestry1Id === ancestryId) {
        newAncestry1Id = null;
      } else if (state.ancestry2Id === ancestryId) {
        newAncestry2Id = null;
      }
      
      dispatch({ type: 'SET_ANCESTRY', ancestry1Id: newAncestry1Id, ancestry2Id: newAncestry2Id });
    } else {
      // Select
      if (!state.ancestry1Id) {
        dispatch({ type: 'SET_ANCESTRY', ancestry1Id: ancestryId, ancestry2Id: state.ancestry2Id });
      } else if (!state.ancestry2Id) {
        dispatch({ type: 'SET_ANCESTRY', ancestry1Id: state.ancestry1Id, ancestry2Id: ancestryId });
      }
    }
  }

  function getAncestryIcon(ancestryId: string): string {
    return ancestryIcons[ancestryId.toLowerCase()] || ancestryIcons.default;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  function needsReadMore(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

  function openPopup(ancestryId: string) {
    setPopupAncestry(ancestryId);
  }

  function closePopup() {
    setPopupAncestry(null);
  }

  return (
    <>
      <StyledGrid>
        {ancestriesData.map((ancestry: IAncestry) => (
          <StyledCard
            key={ancestry.id}
            type="button"
            $selected={selectedAncestries.includes(ancestry.id)}
            onClick={() => handleSelectAncestry(ancestry.id)}
          >
            <StyledCardHeader>
              <StyledAncestryIcon>{getAncestryIcon(ancestry.id)}</StyledAncestryIcon>
              <StyledCardTitle>{ancestry.name}</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardDescription>
              {truncateText(ancestry.description, 80)}
            </StyledCardDescription>
            {needsReadMore(ancestry.description, 80) && (
              <StyledCardFooter>
                <StyledReadMore 
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopup(ancestry.id);
                  }}
                >
                  read more...
                </StyledReadMore>
              </StyledCardFooter>
            )}
          </StyledCard>
        ))}
      </StyledGrid>
      
      {/* Popup overlay and content */}
      <StyledTooltipOverlay 
        $show={popupAncestry !== null} 
        onClick={closePopup}
      />
      {popupAncestry && (
        <StyledTooltip $show={popupAncestry !== null}>
          <StyledTooltipHeader>
            <StyledTooltipIcon>
              {getAncestryIcon(popupAncestry)}
            </StyledTooltipIcon>
            <StyledTooltipTitle>
              {ancestriesData.find(a => a.id === popupAncestry)?.name}
            </StyledTooltipTitle>
          </StyledTooltipHeader>
          <StyledTooltipContent>
            {ancestriesData.find(a => a.id === popupAncestry)?.description}
          </StyledTooltipContent>
          <StyledCloseHint>
            Click anywhere to close
          </StyledCloseHint>
        </StyledTooltip>
      )}
    </>
  );
}

export default AncestrySelector;
