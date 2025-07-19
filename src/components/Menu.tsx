import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

const StyledTitle = styled.h1`
  margin-bottom: 3rem;
  color: #fbbf24;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;
  background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledSubtitle = styled.p`
  margin-bottom: 4rem;
  color: #e5e7eb;
  text-align: center;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  line-height: 1.6;
`;

const StyledMenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  width: 100%;
`;

const StyledMenuCard = styled.button`
  border: 2px solid #8b5cf6;
  padding: 3rem 2rem;
  border-radius: 20px;
  background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(139, 92, 246, 0.5);
    border-color: #fbbf24;
  }
`;

const StyledIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  ${StyledMenuCard}:hover & {
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    transform: scale(1.1);
  }
`;

const StyledCardTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #fbbf24;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  
  ${StyledMenuCard}:hover & {
    color: #f59e0b;
  }
`;

const StyledCardDescription = styled.p`
  margin: 0;
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  opacity: 0.9;
`;

interface MenuProps {
  onCreateCharacter: () => void;
  onLoadCharacter: () => void;
}

function Menu({ onCreateCharacter, onLoadCharacter }: MenuProps) {
  return (
    <StyledContainer>
      <StyledTitle>DC20 Character Creator</StyledTitle>
      <StyledSubtitle>
        Welcome to the ultimate D&D character creation experience. Choose your path to begin your adventure.
      </StyledSubtitle>
      
      <StyledMenuGrid>
        <StyledMenuCard onClick={onCreateCharacter}>
          <StyledIcon>⚔️</StyledIcon>
          <StyledCardTitle>Create Character</StyledCardTitle>
          <StyledCardDescription>
            Start fresh and create a new character from scratch. Choose your class, allocate attributes, and select your ancestry to forge your unique hero.
          </StyledCardDescription>
        </StyledMenuCard>
        
        <StyledMenuCard onClick={onLoadCharacter}>
          <StyledIcon>📜</StyledIcon>
          <StyledCardTitle>Load Character</StyledCardTitle>
          <StyledCardDescription>
            Continue working on an existing character or load a previously saved creation. Perfect for refining your build or making adjustments.
          </StyledCardDescription>
        </StyledMenuCard>
      </StyledMenuGrid>
    </StyledContainer>
  );
}

export default Menu;
