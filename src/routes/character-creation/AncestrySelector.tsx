import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';
import {
  StyledContainer,
  StyledTitle,
  StyledGrid,
  StyledCard,
  StyledCardHeader,
  StyledAncestryIcon,
  StyledCardTitle,
  StyledCardDescription,
  StyledCardFooter,
  StyledReadMore,
  StyledTooltip,
  StyledTooltipOverlay,
  StyledTooltipHeader,
  StyledTooltipIcon,
  StyledTooltipTitle,
  StyledTooltipContent,
  StyledCloseHint
} from './styles/AncestrySelector.styles';

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
    <StyledContainer>
      <StyledTitle>Choose Your Ancestry</StyledTitle>
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
    </StyledContainer>
  );
}

export default AncestrySelector;
