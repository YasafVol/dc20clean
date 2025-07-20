import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { traitsData } from '../../lib/rulesdata/traits';
import type { IAncestry, ITrait } from '../../lib/rulesdata/types';
import {
  StyledOuterContainer,
  StyledMainTitle,
  StyledContainer,
  StyledAncestryDetails,
  StyledTitle,
  StyledSubtitle,
  StyledList,
  StyledListItem,
  StyledLabel,
  StyledCheckbox
} from './styles/SelectedAncestries.styles';

function SelectedAncestries() {
  const { state, dispatch } = useCharacter();
  
  const selectedAncestry1 = ancestriesData.find(a => a.id === state.ancestry1Id);
  const selectedAncestry2 = ancestriesData.find(a => a.id === state.ancestry2Id);
  const selectedTraits: string[] = JSON.parse(state.selectedTraitIds || '[]');

  function getTrait(traitId: string): ITrait | undefined {
    return traitsData.find(t => t.id === traitId);
  }

  function handleToggleTrait(traitId: string) {
    const trait = getTrait(traitId);
    if (!trait) return;

    let currentTraits = [...selectedTraits];
    
    if (currentTraits.includes(traitId)) {
      // Deselect
      currentTraits = currentTraits.filter(id => id !== traitId);
    } else {
      // Select
      currentTraits.push(traitId);
    }
    
    dispatch({ type: 'SET_TRAITS', selectedTraitIds: JSON.stringify(currentTraits) });
  }

  function renderAncestryTraits(ancestry: IAncestry) {
    return (
      <StyledAncestryDetails>
        <StyledTitle>{ancestry.name}</StyledTitle>
        
        <StyledSubtitle>Default Traits</StyledSubtitle>
        <StyledList>
          {(ancestry.defaultTraitIds || []).map(traitId => {
            const trait = getTrait(traitId);
            if (!trait) return null;
            return (
              <StyledListItem key={traitId}>
                <StyledLabel>
                  <StyledCheckbox 
                    type="checkbox" 
                    checked={selectedTraits.includes(traitId)} 
                    onChange={() => handleToggleTrait(traitId)} 
                  />
                  {trait.name} ({trait.cost} pts) - {trait.description}
                </StyledLabel>
              </StyledListItem>
            );
          })}
        </StyledList>
        
        <StyledSubtitle>Expanded Traits</StyledSubtitle>
        <StyledList>
          {(ancestry.expandedTraitIds || []).map(traitId => {
            const trait = getTrait(traitId);
            if (!trait) return null;
            return (
              <StyledListItem key={traitId}>
                <StyledLabel>
                  <StyledCheckbox 
                    type="checkbox" 
                    checked={selectedTraits.includes(traitId)} 
                    onChange={() => handleToggleTrait(traitId)} 
                  />
                  {trait.name} ({trait.cost} pts) - {trait.description}
                </StyledLabel>
              </StyledListItem>
            );
          })}
        </StyledList>
      </StyledAncestryDetails>
    );
  }

  return (
    <StyledOuterContainer>
      <StyledMainTitle>Ancestry Traits</StyledMainTitle>
      <StyledContainer>
        {selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
        {selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
      </StyledContainer>
    </StyledOuterContainer>
  );
}

export default SelectedAncestries;
