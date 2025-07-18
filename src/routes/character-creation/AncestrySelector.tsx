import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StyledCard = styled.button<{ $selected: boolean }>`
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background-color: #f0f0f0;
  }

  ${props => props.$selected && `
    border-color: #007bff;
    background-color: #e6f3ff;
  `}
`;

const StyledCardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const StyledCardDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

function AncestrySelector() {
  const { state, dispatch } = useCharacter();
  
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

  return (
    <StyledGrid>
      {ancestriesData.map((ancestry: IAncestry) => (
        <StyledCard
          key={ancestry.id}
          type="button"
          $selected={selectedAncestries.includes(ancestry.id)}
          onClick={() => handleSelectAncestry(ancestry.id)}
        >
          <StyledCardTitle>{ancestry.name}</StyledCardTitle>
          <StyledCardDescription>{ancestry.description}</StyledCardDescription>
        </StyledCard>
      ))}
    </StyledGrid>
  );
}

export default AncestrySelector;
