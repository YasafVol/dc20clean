import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';

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
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: #9ca3af;
  font-size: 0.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

function App() {
  return (
    <CharacterProvider>
      <GlobalStyle />
      <StyledApp>
        <StyledHeader>
          Created by TBD Group
        </StyledHeader>
        <CharacterCreation />
        <StyledFooter>
          All rights reserved to TBD Group, 2025
        </StyledFooter>
      </StyledApp>
    </CharacterProvider>
  );
}

export default App;
