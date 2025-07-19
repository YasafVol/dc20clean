import styled from 'styled-components';

export const StyledContainer = styled.div`
  min-height: 100vh;
  background: #f5f3f0;
  padding: 1rem;
  font-family: 'Georgia', serif;
  color: #2d2d2d;
`;

export const StyledBackButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid #8b4513;
  border-radius: 4px;
  background: #f5f3f0;
  color: #8b4513;
  cursor: pointer;
  font-weight: bold;
  z-index: 100;
  
  &:hover {
    background: #8b4513;
    color: #f5f3f0;
  }
`;

export const StyledCharacterSheet = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border: 3px solid #8b4513;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%);
    pointer-events: none;
    border-radius: 5px;
  }
`;

export const StyledMainGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 250px;
  gap: 1.5rem;
  height: auto;
`;

export const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledMiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
