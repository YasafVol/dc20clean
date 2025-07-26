import { DefenseNote } from '../../types/defenseNotes';

// Get character from localStorage
const getCharacterFromStorage = (characterId: string) => {
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	return savedCharacters.find((char: any) => char.id === characterId);
};

// Save character back to localStorage
const saveCharacterToStorage = (characterId: string, updates: any) => {
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

	if (characterIndex !== -1) {
		savedCharacters[characterIndex] = {
			...savedCharacters[characterIndex],
			...updates,
			lastModified: new Date().toISOString()
		};
		localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
	}
};

// Get all defense notes for a character
export const getDefenseNotes = (characterId: string): DefenseNote[] => {
	try {
		const character = getCharacterFromStorage(characterId);
		if (!character || !character.defenseNotes) return [];

		return character.defenseNotes.map((note: any) => ({
			...note,
			timestamp: new Date(note.timestamp)
		}));
	} catch (error) {
		console.error('Error loading defense notes:', error);
		return [];
	}
};

// Get notes for a specific defense field
export const getDefenseNotesForField = (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD'
): DefenseNote[] => {
	const allNotes = getDefenseNotes(characterId);
	return allNotes
		.filter((note) => note.field === field)
		.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Add a new defense note
export const addDefenseNote = (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD',
	oldValue: number,
	newValue: number,
	reason: string
): void => {
	try {
		const character = getCharacterFromStorage(characterId);
		if (!character) return;

		const newNote: DefenseNote = {
			id: `${characterId}_${field}_${Date.now()}`,
			timestamp: new Date(),
			reason,
			oldValue,
			newValue,
			field
		};

		const existingNotes = character.defenseNotes || [];
		const updatedNotes = [...existingNotes, newNote];

		saveCharacterToStorage(characterId, { defenseNotes: updatedNotes });

		console.log(`Defense note added for ${characterId} - ${field}: ${reason}`);
	} catch (error) {
		console.error('Error saving defense note:', error);
	}
};

// Remove all defense notes for a specific field (when reverting to auto)
export const clearDefenseNotesForField = (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD'
): void => {
	try {
		const character = getCharacterFromStorage(characterId);
		if (!character || !character.defenseNotes) return;

		const filteredNotes = character.defenseNotes.filter(
			(note: DefenseNote) => note.field !== field
		);

		saveCharacterToStorage(characterId, { defenseNotes: filteredNotes });

		console.log(`Defense notes cleared for ${characterId} - ${field}`);
	} catch (error) {
		console.error('Error clearing defense notes:', error);
	}
};

// Get formatted tooltip text for a defense field
export const getDefenseTooltipWithNotes = (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD',
	baseTooltip: string
): string => {
	const notes = getDefenseNotesForField(characterId, field);

	if (notes.length === 0) {
		return baseTooltip;
	}

	const recentNotes = notes.slice(0, 3); // Show last 3 changes
	const notesText = recentNotes
		.map((note) => {
			const date = note.timestamp.toLocaleDateString();
			const time = note.timestamp.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit'
			});
			return `• ${date} ${time}: ${note.oldValue} → ${note.newValue} (${note.reason})`;
		})
		.join('\n');

	const moreText = notes.length > 3 ? `\n... and ${notes.length - 3} more changes` : '';

	return `${baseTooltip}\n\nRecent Changes:\n${notesText}${moreText}`;
};

// Get defense field display name
export const getDefenseDisplayName = (field: 'manualPD' | 'manualPDR' | 'manualAD'): string => {
	switch (field) {
		case 'manualPD':
			return 'Precision Defense';
		case 'manualPDR':
			return 'Precision Damage Reduction';
		case 'manualAD':
			return 'Area Defense';
		default:
			return field;
	}
};
