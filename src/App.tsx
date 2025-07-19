import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';
import LoadCharacter from './routes/character-creation/LoadCharacter.tsx';
import Menu from './components/Menu.tsx';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
    color: #e5e7eb;
    min-height: 100vh;
  }
  
  #root {
    min-height: 100vh;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1e1b4b;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #a855f7;
  }
  
  /* Selection colors */
  ::selection {
    background: #fbbf24;
    color: #1e1b4b;
  }
  
  ::-moz-selection {
    background: #fbbf24;
    color: #1e1b4b;
  }
`;

const StyledApp = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledBackButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #fbbf24;
  border-radius: 6px;
  background: transparent;
  color: #fbbf24;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: bold;
  
  &:hover {
    background: #fbbf24;
    color: #1e1b4b;
    transform: translateY(-2px);
  }
`;

const StyledMain = styled.main`
  flex: 1;
`;

const StyledFooter = styled.footer`
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(139, 92, 246, 0.3);
  background: rgba(30, 27, 75, 0.5);
`;

function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'create' | 'load'>('menu');

  const handleCreateCharacter = () => {
    setCurrentView('create');
  };

  const handleLoadCharacter = () => {
    setCurrentView('load');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'menu':
        return (
          <Menu 
            onCreateCharacter={handleCreateCharacter}
            onLoadCharacter={handleLoadCharacter}
          />
        );
      case 'create':
        return (
          <CharacterProvider>
            <StyledHeader>
              <StyledBackButton onClick={handleBackToMenu}>
                ← Back to Menu
              </StyledBackButton>
              <span>Created by TBD Group</span>
            </StyledHeader>
            <StyledMain>
              <CharacterCreation onNavigateToLoad={handleLoadCharacter} />
            </StyledMain>
          </CharacterProvider>
        );
      case 'load':
        return (
          <LoadCharacter onBack={handleBackToMenu} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {renderCurrentView()}
        <StyledFooter>
          All rights reserved to TBD Group, 2025
        </StyledFooter>
      </StyledApp>
    </>
  );
}

export default App;
