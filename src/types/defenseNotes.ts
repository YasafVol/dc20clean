export interface DefenseNote {
	id: string;
	timestamp: Date;
	reason: string;
	oldValue: number;
	newValue: number;
	field: 'manualPD' | 'manualPDR' | 'manualAD';
}

export interface DefenseNotesData {
	characterId: string;
	notes: DefenseNote[];
}
