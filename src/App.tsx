import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';
import LoadCharacter from './routes/character-creation/LoadCharacter.tsx';
import CharacterSheet from './routes/character-sheet/CharacterSheetClean.tsx';
import Menu from './components/Menu.tsx';
import {
	StyledApp,
	StyledHeader,
	StyledBackButton,
	StyledMain,
	StyledFooter
} from './styles/App.styles';

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

function App() {
	const [currentView, setCurrentView] = useState<'menu' | 'create' | 'load' | 'sheet'>('menu');
	const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

	const handleCreateCharacter = () => {
		setCurrentView('create');
	};

	const handleLoadCharacter = () => {
		setCurrentView('load');
	};

	const handleViewCharacterSheet = (characterId: string) => {
		setSelectedCharacterId(characterId);
		setCurrentView('sheet');
	};

	const handleBackToMenu = () => {
		setCurrentView('menu');
		setSelectedCharacterId(null);
	};

	const renderCurrentView = () => {
		switch (currentView) {
			case 'menu':
				return (
					<Menu onCreateCharacter={handleCreateCharacter} onLoadCharacter={handleLoadCharacter} />
				);
			case 'create':
				return (
					<CharacterProvider>
						<StyledHeader>
							<StyledBackButton onClick={handleBackToMenu}>← Back to Menu</StyledBackButton>
							<span>Created by TBD Group</span>
						</StyledHeader>
						<StyledMain>
							<CharacterCreation onNavigateToLoad={handleLoadCharacter} />
						</StyledMain>
					</CharacterProvider>
				);
			case 'load':
				return (
					<LoadCharacter onBack={handleBackToMenu} onSelectCharacter={handleViewCharacterSheet} />
				);
			case 'sheet':
				return selectedCharacterId ? (
					<CharacterSheet characterId={selectedCharacterId} onBack={handleBackToMenu} />
				) : null;
			default:
				return null;
		}
	};

	return (
		<>
			<GlobalStyle />
			<StyledApp>
				{renderCurrentView()}
				<StyledFooter>All rights reserved to TBD Group, 2025</StyledFooter>
			</StyledApp>
		</>
	);
}

export default App;
