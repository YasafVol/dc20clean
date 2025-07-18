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
`;

function App() {
  return (
    <CharacterProvider>
      <GlobalStyle />
      <StyledApp>
        <CharacterCreation />
      </StyledApp>
    </CharacterProvider>
  );
}

export default App;
