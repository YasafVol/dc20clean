import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { nameByRace } from 'fantasy-name-generator';
import {
	StyledContainer,
	StyledTitle,
	StyledInputGroup,
	StyledLabel,
	StyledInput,
	StyledSuggestionGrid,
	StyledSuggestionButton,
	StyledGenerateButton,
	StyledCharacterInfo,
	StyledCharacterDetails,
	StyledCharacterNameContainer
} from './styles/CharacterName.styles';

// Name generation using fantasy-name-generator npm package
const generateNamesFromNPM = (race: string): string[] => {
	try {
		const names: string[] = [];

		// Generate 6 different names (3 male, 3 female)
		for (let i = 0; i < 3; i++) {
			const maleName = nameByRace(race, { gender: 'male' });
			const femaleName = nameByRace(race, { gender: 'female' });

			if (maleName && typeof maleName === 'string') {
				names.push(maleName);
			}
			if (femaleName && typeof femaleName === 'string') {
				names.push(femaleName);
			}
		}

		return names.filter((name) => name.length > 0);
	} catch (error) {
		console.error('Error generating names from npm package:', error);
		return [];
	}
};

function CharacterName() {
	const { state, dispatch } = useCharacter();
	const [characterName, setCharacterName] = useState(state.finalName || '');
	const [playerName, setPlayerName] = useState(state.finalPlayerName || '');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const getFallbackNames = (ancestry: string) => {
		const fallbackNames: { [key: string]: string[] } = {
			human: ['Aiden', 'Brianna', 'Connor', 'Diana', 'Ethan', 'Fiona'],
			elf: ['Aerdrie', 'Berrian', 'Caelynn', 'Dayereth', 'Enna', 'Galinndan'],
			dwarf: ['Adrik', 'Baern', 'Cathra', 'Darrak', 'Eberk', 'Falkrunn'],
			halfling: ['Alton', 'Bree', 'Cora', 'Daisy', 'Eldon', 'Finnan'],
			dragonborn: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan'],
			gnome: ['Alston', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon'],
			'half-elf': ['Aramil', 'Berrian', 'Carric', 'Dayereth', 'Enna', 'Galinndan'],
			'half-orc': ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh'],
			tiefling: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados']
		};

		return fallbackNames[ancestry] || fallbackNames.human;
	};

	const generateNames = () => {
		// No need for rate limiting with npm package, but keep generating state for UX
		if (isGenerating) {
			return;
		}

		setIsGenerating(true);

		try {
			// Get character details
			const ancestry1 = state.ancestry1Id?.toLowerCase() || 'human';
			const ancestry2 = state.ancestry2Id?.toLowerCase();

			// Map ancestry names to npm package race names
			const raceMapping: { [key: string]: string } = {
				human: 'human',
				elf: 'elf',
				dwarf: 'dwarf',
				halfling: 'halfling',
				dragonborn: 'dragon',
				gnome: 'gnome',
				'half-elf': 'elf',
				'half-orc': 'orc',
				tiefling: 'demon',
				default: 'human'
			};

			// Always generate names from first ancestry
			const mappedRace1 = raceMapping[ancestry1] || 'human';
			const npmNames1 = generateNamesFromNPM(mappedRace1);
			const fallbackNames1 = getFallbackNames(ancestry1);
			let allNames = [...npmNames1, ...fallbackNames1].slice(0, 6);

			// If second ancestry exists, append 6 more names from it
			if (ancestry2) {
				const mappedRace2 = raceMapping[ancestry2] || 'human';
				const npmNames2 = generateNamesFromNPM(mappedRace2);
				const fallbackNames2 = getFallbackNames(ancestry2);
				const names2 = [...npmNames2, ...fallbackNames2].slice(0, 6);
				allNames = [...allNames, ...names2];
			}

			// Remove duplicates and limit appropriately
			const uniqueNames = [...new Set(allNames)];

			// Add a small delay for better UX (simulate processing)
			setTimeout(() => {
				setSuggestions(uniqueNames);
				setIsGenerating(false);
			}, 500);
		} catch (error) {
			console.error('Error generating names:', error);
			// Fallback to local names
			const fallbackNames = getFallbackNames(state.ancestry1Id?.toLowerCase() || 'human');
			setSuggestions(fallbackNames);
			setIsGenerating(false);
		}
	};

	const selectSuggestion = (name: string) => {
		setCharacterName(name);
		// Update the context immediately
		dispatch({
			type: 'UPDATE_STORE',
			updates: {
				finalName: name
			}
		});
	};

	const getCharacterDescription = () => {
		const ancestry1 = state.ancestry1Id;
		const ancestry2 = state.ancestry2Id;
		const classId = state.classId;

		let ancestryDescription = 'Your Character';

		if (ancestry1 && ancestry2) {
			// Both ancestries exist
			ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}/${ancestry2.charAt(0).toUpperCase() + ancestry2.slice(1)}`;
		} else if (ancestry1) {
			// Only first ancestry
			ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}`;
		}

		if (classId) {
			return `${ancestryDescription} ${classId.charAt(0).toUpperCase() + classId.slice(1)}`;
		}

		return ancestryDescription;
	};

	return (
		<StyledContainer>
			<StyledTitle>Name Your Character</StyledTitle>

			<StyledCharacterInfo>
				<StyledCharacterDetails>Creating: {getCharacterDescription()}</StyledCharacterDetails>
			</StyledCharacterInfo>

			<StyledCharacterNameContainer>
				<StyledInputGroup>
					<StyledLabel htmlFor="characterName">Character Name</StyledLabel>
					<StyledInput
						id="characterName"
						type="text"
						value={characterName}
						onChange={(e) => {
							const value = e.target.value;
							setCharacterName(value);
							// Update the context immediately
							dispatch({
								type: 'UPDATE_STORE',
								updates: {
									finalName: value.trim() || null
								}
							});
						}}
						placeholder="Enter your character's name"
					/>
				</StyledInputGroup>
				<StyledInputGroup>
					<StyledLabel htmlFor="characterName">Name Suggestion</StyledLabel>
					{suggestions.length > 0 && (
						<StyledSuggestionGrid>
							{suggestions.map((name, index) => (
								<StyledSuggestionButton key={index} onClick={() => selectSuggestion(name)}>
									{name}
								</StyledSuggestionButton>
							))}
						</StyledSuggestionGrid>
					)}
					<StyledGenerateButton onClick={generateNames} disabled={isGenerating}>
						{isGenerating ? 'Generating...' : 'Generate Names'}
					</StyledGenerateButton>
				</StyledInputGroup>
			</StyledCharacterNameContainer>

			<StyledInputGroup>
				<StyledLabel htmlFor="playerName">Player Name</StyledLabel>
				<StyledInput
					id="playerName"
					type="text"
					value={playerName}
					onChange={(e) => {
						const value = e.target.value;
						setPlayerName(value);
						// Update the context immediately
						dispatch({
							type: 'UPDATE_STORE',
							updates: {
								finalPlayerName: value.trim() || null
							}
						});
					}}
					placeholder="Enter your name"
				/>
			</StyledInputGroup>
		</StyledContainer>
	);
}

export default CharacterName;
