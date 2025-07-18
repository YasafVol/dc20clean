import React from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/classes';
import type { IClassDefinition } from '../../lib/rulesdata/types';

const StyledContainer = styled.div`
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 2rem;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  flex: 1;
  min-width: 200px;
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

function ClassSelector() {
  const { state, dispatch } = useCharacter();
  const selectedClassId = state.classId;

  function handleSelectClass(classId: string) {
    if (state.classId === classId) {
      dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
    } else {
      dispatch({ type: 'SET_CLASS', classId }); // Select new class
    }
  }

  return (
    <StyledContainer>
      <StyledTitle>Choose Your Class</StyledTitle>
      <StyledGrid>
        {classesData.map((classDef: IClassDefinition) => (
          <StyledCard
            key={classDef.id}
            type="button"
            $selected={selectedClassId === classDef.id}
            onClick={() => handleSelectClass(classDef.id)}
          >
            <StyledCardTitle>{classDef.name}</StyledCardTitle>
            <StyledCardDescription>{classDef.description}</StyledCardDescription>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
}

export default ClassSelector;
