import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';
import { CharacterProvider } from './lib/stores/characterContext';
import LoadCharacter from './routes/character-creation/LoadCharacter.tsx';
import CharacterSheetRouter from './routes/character-sheet/CharacterSheetRouter';
import LevelUp from './routes/character-creation/LevelUp';
import Menu from './components/Menu.tsx';
import Spellbook from './routes/spellbook/Spellbook.tsx';
import CustomEquipment from './routes/custom-equipment/CustomEquipment.tsx';
import Conditions from './routes/conditions/Conditions.tsx';
import { MonsterList, MonsterDesigner } from './routes/dm/monsters';
import { EncounterList, EncounterPlanner } from './routes/dm/encounters';
import SystemsExplorer from './routes/systems/SystemsExplorer.tsx';

import { StyledApp } from './styles/App.styles';

// Import fonts for GlobalStyle

import cinzelFont from './types/Fonts/Cinzel-VariableFont_wght.ttf';
import urbanistFont from './types/Fonts/Urbanist-VariableFont_wght.ttf';
import libreBaskervilleItalic from './types/Fonts/LibreBaskerville-Italic.ttf';

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
	@font-face {
		font-family: 'Libre Baskerville';
		src: url('${libreBaskervilleItalic}') format('truetype');
		font-weight: normal;
		font-style: italic;
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
	button:focus {
		outline: none;
	}
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
	return (
		<>
			<GlobalStyle />
			<StyledApp>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="/menu" replace />} />
						<Route path="/menu" element={<Menu />} />
						<Route
							path="/create-character"
							element={
								<CharacterProvider>
									<CharacterCreation />
								</CharacterProvider>
							}
						/>
						<Route path="/load-character" element={<LoadCharacter />} />
						<Route path="/spellbook" element={<Spellbook />} />
						<Route path="/conditions" element={<Conditions />} />
						<Route path="/custom-equipment" element={<CustomEquipment />} />
						<Route path="/character/:id" element={<CharacterSheetRouteWrapper />} />
						<Route
							path="/character/:id/edit"
							element={
								<CharacterProvider>
									<CharacterCreation />
								</CharacterProvider>
							}
						/>
						<Route path="/character/:id/levelup" element={<LevelUp />} />
						{/* DM Tools */}
						<Route path="/dm/monsters" element={<MonsterList />} />
						<Route path="/dm/monsters/:id" element={<MonsterDesigner />} />
						<Route path="/dm/encounters" element={<EncounterList />} />
						<Route path="/dm/encounters/:id" element={<EncounterPlanner />} />
						<Route path="/systems" element={<SystemsExplorer />} />
					</Routes>
				</BrowserRouter>
			</StyledApp>
		</>
	);
}

function CharacterSheetRouteWrapper() {
	const { id } = useParams();
	return id ? <CharacterSheetRouter characterId={id} /> : null;
}

export default App;
