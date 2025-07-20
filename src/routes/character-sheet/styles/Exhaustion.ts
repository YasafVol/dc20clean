import styled from 'styled-components';

export const StyledExhaustionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

export const StyledExhaustionLevel = styled.div<{ filled: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid #8b4513;
  background: ${props => props.filled ? '#8b4513' : 'white'};
  color: ${props => props.filled ? 'white' : '#8b4513'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.filled ? '#654321' : '#f5f5dc'};
    transform: scale(1.1);
  }
`;

export const StyledExhaustionTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  z-index: 1000;
  margin-bottom: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
  }
  
  ${StyledExhaustionLevel}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
