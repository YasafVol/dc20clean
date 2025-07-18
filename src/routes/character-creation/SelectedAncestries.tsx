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
  border: 2px solid #a855f7;
  padding: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

const StyledTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const StyledSubtitle = styled.h3`
  margin: 1rem 0 0.5rem 0;
  color: #ef4444;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #ef4444;
  padding-bottom: 0.25rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: rgba(139, 92, 246, 0.1);
  border-left: 3px solid #8b5cf6;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  cursor: pointer;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  
  &:hover {
    color: #fbbf24;
  }
`;

const StyledCheckbox = styled.input`
  margin-top: 0.25rem;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  accent-color: #ef4444;
  cursor: pointer;
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
