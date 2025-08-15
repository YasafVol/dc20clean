import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';
import LoadCharacter from './routes/character-creation/LoadCharacter.tsx';
import CharacterSheetRouter from './routes/character-sheet/CharacterSheetRouter';
import type { SavedCharacter } from './lib/utils/characterEdit';
import LevelUp from './routes/character-creation/LevelUp.tsx';
import { getAllSavedCharacters, saveAllCharacters } from './lib/utils/storageUtils';
import Menu from './components/Menu.tsx';
import {
	StyledApp,
	StyledHeader,
	StyledBackButton,
	StyledMain
} from './styles/App.styles';

// Import static assets
import cinzelFont from './types/Fonts/Cinzel-VariableFont_wght.ttf';
import urbanistFont from './types/Fonts/Urbanist-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cinzel';
    src: url('${cinzelFont}') format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Urbanist';
    src: url('${urbanistFont}') format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
    color: #e5e7eb;
    min-height: 100vh;
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
  }
  
  #root {
    min-height: 100vh;
  }
  
  /* Remove default focus outlines */
  button:focus {
    outline: none;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1e1b4b;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #fbbf24;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #f1bf3eff;
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
	const [currentView, setCurrentView] = useState<'menu' | 'create' | 'load' | 'sheet' | 'levelup'>(
		'menu'
	);
	const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
	const [editCharacter, setEditCharacter] = useState<SavedCharacter | null>(null);
	const [levelUpCharacter, setLevelUpCharacter] = useState<SavedCharacter | null>(null);

	const handleCreateCharacter = () => {
		setEditCharacter(null); // Clear edit mode
		setCurrentView('create');
	};

	const handleLoadCharacter = () => {
		setCurrentView('load');
	};

	const handleEditCharacter = (character: SavedCharacter) => {
		setEditCharacter(character);
		setCurrentView('create');
	};

	const handleLevelUp = (character: SavedCharacter) => {
		setLevelUpCharacter(character);
		setCurrentView('levelup');
	};

	const handleViewCharacterSheet = (characterId: string) => {
		setSelectedCharacterId(characterId);
		setCurrentView('sheet');
	};



	const handleBackToMenu = () => {
		setCurrentView('menu');
		setSelectedCharacterId(null);
		setEditCharacter(null);
		setLevelUpCharacter(null);
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
						</StyledHeader>
						<StyledMain>
							<CharacterCreation
								onNavigateToLoad={handleLoadCharacter}
								onBackToMenu={handleBackToMenu}
								editCharacter={editCharacter || undefined}
							/>
						</StyledMain>
					</CharacterProvider>
				);
			case 'load':
				return (
					<LoadCharacter
						onBack={handleBackToMenu}
						onSelectCharacter={handleViewCharacterSheet}
						onEditCharacter={handleEditCharacter}
						onLevelUp={handleLevelUp}
					/>
				);
			case 'levelup':
				return (
					<CharacterProvider>
						<StyledHeader>
							<StyledBackButton onClick={handleBackToMenu}>← Back to Menu</StyledBackButton>
							<span>Level Up Character</span>
						</StyledHeader>
						<StyledMain>
							<LevelUp
								character={levelUpCharacter!}
								onComplete={(updatedCharacter: SavedCharacter) => {
									// Update the character in the list and go back to load screen
									const savedCharacters = getAllSavedCharacters();
									const characterIndex = savedCharacters.findIndex((c: SavedCharacter) => c.id === updatedCharacter.id);
									if (characterIndex !== -1) {
										savedCharacters[characterIndex] = updatedCharacter;
										saveAllCharacters(savedCharacters);
									}
									handleLoadCharacter();
								}}
								onBack={handleBackToMenu}
							/>
						</StyledMain>
					</CharacterProvider>
				);
			case 'sheet':
				return selectedCharacterId ? (
					<CharacterSheetRouter characterId={selectedCharacterId} onBack={handleBackToMenu} />
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
			</StyledApp>
		</>
	);
}

export default App;
