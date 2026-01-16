import { DefenseNote } from '../../types/defenseNotes';
import { getDefaultStorage } from '../storage';

// Get character from storage using centralized utility
const getCharacterFromStorage = async (characterId: string) => {
	const storage = getDefaultStorage();
	return storage.getCharacterById(characterId);
};

// Save character back to storage using centralized utility
const saveCharacterToStorage = async (characterId: string, updates: any) => {
	const storage = getDefaultStorage();
	const character = await storage.getCharacterById(characterId);
	if (!character) return;

	await storage.saveCharacter({
		...character,
		...updates,
		lastModified: new Date().toISOString()
	});
};

// Get all defense notes for a character
export const getDefenseNotes = async (characterId: string): Promise<DefenseNote[]> => {
	try {
		const character = await getCharacterFromStorage(characterId);
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
export const getDefenseNotesForField = async (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD'
): Promise<DefenseNote[]> => {
	const allNotes = await getDefenseNotes(characterId);
	return allNotes
		.filter((note) => note.field === field)
		.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Add a new defense note
export const addDefenseNote = async (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD',
	oldValue: number,
	newValue: number,
	reason: string
): Promise<void> => {
	try {
		const character = await getCharacterFromStorage(characterId);
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

		await saveCharacterToStorage(characterId, { defenseNotes: updatedNotes });

		console.log(`Defense note added for ${characterId} - ${field}: ${reason}`);
	} catch (error) {
		console.error('Error saving defense note:', error);
	}
};

// Remove all defense notes for a specific field (when reverting to auto)
export const clearDefenseNotesForField = async (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD'
): Promise<void> => {
	try {
		const character = await getCharacterFromStorage(characterId);
		if (!character || !character.defenseNotes) return;

		const filteredNotes = character.defenseNotes.filter(
			(note: DefenseNote) => note.field !== field
		);

		await saveCharacterToStorage(characterId, { defenseNotes: filteredNotes });

		console.log(`Defense notes cleared for ${characterId} - ${field}`);
	} catch (error) {
		console.error('Error clearing defense notes:', error);
	}
};

// Get formatted tooltip text for a defense field
export const getDefenseTooltipWithNotes = async (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD',
	baseTooltip: string
): Promise<string> => {
	const notes = await getDefenseNotesForField(characterId, field);

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
