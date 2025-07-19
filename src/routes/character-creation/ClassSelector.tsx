import { useState } from 'react';
import styled from 'styled-components';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/classes';
import type { IClassDefinition } from '../../lib/rulesdata/types';

// Class-specific icons using Unicode symbols and emojis
const classIcons: { [key: string]: string } = {
  'fighter': '⚔️',
  'wizard': '🧙‍♂️',
  'rogue': '🗡️',
  'cleric': '✨',
  'ranger': '🏹',
  'barbarian': '🪓',
  'bard': '🎭',
  'druid': '🌿',
  'monk': '👊',
  'paladin': '🛡️',
  'sorcerer': '🔥',
  'warlock': '👹',
  'default': '⚡'
};

const StyledContainer = styled.div`
  border: 2px solid #8b5cf6;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  margin-top: 2rem;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
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
  margin-bottom: 1rem;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  flex: 1;
  min-width: 280px;
  max-width: 280px;
  height: 200px;
  text-align: left;
  box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

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

const StyledClassIcon = styled.div`
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

function ClassSelector() {
  const { state, dispatch } = useCharacter();
  const selectedClassId = state.classId;
  const [popupClass, setPopupClass] = useState<string | null>(null);

  function handleSelectClass(classId: string) {
    if (state.classId === classId) {
      dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
    } else {
      dispatch({ type: 'SET_CLASS', classId }); // Select new class
    }
  }

  function getClassIcon(classId: string): string {
    return classIcons[classId.toLowerCase()] || classIcons.default;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  function needsReadMore(text: string, maxLength: number): boolean {
    return text.length > maxLength;
  }

  function openPopup(classId: string) {
    setPopupClass(classId);
  }

  function closePopup() {
    setPopupClass(null);
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
            <StyledCardHeader>
              <StyledClassIcon>{getClassIcon(classDef.id)}</StyledClassIcon>
              <StyledCardTitle>{classDef.name}</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardDescription>
              {truncateText(classDef.description, 80)}
            </StyledCardDescription>
            {needsReadMore(classDef.description, 80) && (
              <StyledCardFooter>
                <StyledReadMore 
                  onClick={(e) => {
                    e.stopPropagation();
                    openPopup(classDef.id);
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
        $show={popupClass !== null} 
        onClick={closePopup}
      />
      {popupClass && (
        <StyledTooltip $show={popupClass !== null}>
          <StyledTooltipHeader>
            <StyledTooltipIcon>
              {getClassIcon(popupClass)}
            </StyledTooltipIcon>
            <StyledTooltipTitle>
              {classesData.find(c => c.id === popupClass)?.name}
            </StyledTooltipTitle>
          </StyledTooltipHeader>
          <StyledTooltipContent>
            {classesData.find(c => c.id === popupClass)?.description}
          </StyledTooltipContent>
          <StyledCloseHint>
            Click anywhere to close
          </StyledCloseHint>
        </StyledTooltip>
      )}
    </StyledContainer>
  );
}

export default ClassSelector;
