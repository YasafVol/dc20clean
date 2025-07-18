import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { traitsData } from '../../lib/rulesdata/traits';
import type { IAncestry, ITrait } from '../../lib/rulesdata/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledAncestryDetails = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
`;

const StyledTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #333;
`;

const StyledSubtitle = styled.h3`
  margin: 1rem 0 0.5rem 0;
  color: #555;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  margin-top: 0.25rem;
  flex-shrink: 0;
`;

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
    <StyledContainer>
      {selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
      {selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
    </StyledContainer>
  );
}

export default SelectedAncestries;
