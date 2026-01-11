import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { nameByRace } from 'fantasy-name-generator';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

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
		<Card className="mx-auto mt-8 max-w-[600px] border-white/50 bg-transparent">
			<CardContent className="space-y-6 p-8">
				<h2 className="font-cinzel text-primary mb-8 text-center text-3xl font-bold tracking-wide">
					Name Your Character
				</h2>

				{/* Character Info */}
				<div className="mb-6 rounded-lg border border-white/50 bg-transparent p-4 text-center">
					<p className="text-foreground">Creating: {getCharacterDescription()}</p>
				</div>

				{/* Character Name and Suggestions Row */}
				<div className="flex flex-col gap-4 md:flex-row">
					{/* Character Name Input */}
					<div className="flex-1 space-y-2">
						<Label htmlFor="characterName" className="text-primary font-bold">
							Character Name
						</Label>
						<Input
							id="characterName"
							type="text"
							value={characterName}
							onChange={(e) => {
								const value = e.target.value;
								setCharacterName(value);
								dispatch({
									type: 'UPDATE_STORE',
									updates: {
										finalName: value.trim() || null
									}
								});
							}}
							placeholder="Enter your character's name"
							className="border-white/50 bg-transparent"
						/>
					</div>

					{/* Name Suggestions */}
					<div className="flex-1 space-y-2">
						<Label className="text-primary font-bold">Name Suggestion</Label>
						{suggestions.length > 0 && (
							<div className="mb-3 grid max-h-[200px] grid-cols-2 gap-2 overflow-y-auto">
								{suggestions.map((name, index) => (
									<Button
										key={index}
										variant="outline"
										size="sm"
										onClick={() => selectSuggestion(name)}
										className="hover:border-primary border-white/50 bg-transparent"
									>
										{name}
									</Button>
								))}
							</div>
						)}
						<Button
							variant="outline"
							onClick={generateNames}
							disabled={isGenerating}
							className="hover:border-primary w-full border-white/50 bg-transparent font-bold"
						>
							{isGenerating ? 'Generating...' : 'Generate Names'}
						</Button>
					</div>
				</div>

				{/* Player Name Input */}
				<div className="space-y-2">
					<Label htmlFor="playerName" className="text-primary font-bold">
						Player Name
					</Label>
					<Input
						id="playerName"
						type="text"
						value={playerName}
						onChange={(e) => {
							const value = e.target.value;
							setPlayerName(value);
							dispatch({
								type: 'UPDATE_STORE',
								updates: {
									finalPlayerName: value.trim() || null
								}
							});
						}}
						placeholder="Enter your name"
						className="border-white/50 bg-transparent"
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default CharacterName;
