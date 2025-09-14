export type FieldMapItem = {
	path: string; // path in PdfExportData, e.g. "characterName", "hitPoints.max"
	field: string; // PDF field name
	type: 'text' | 'checkbox';
};

// Minimal but useful initial mapping. Extend as needed.
export const fieldMap_dc20_095: FieldMapItem[] = [
	// Identity
	{ path: 'characterName', field: 'Character Name', type: 'text' },
	{ path: 'playerName', field: 'Player Name', type: 'text' },
	{ path: 'level', field: 'Level', type: 'text' },
	{ path: 'ancestry', field: 'Ancestry', type: 'text' },
	{ path: 'classAndSubclass', field: 'Class & Subclass', type: 'text' },
	{ path: 'features', field: 'Features', type: 'text' },

	// Attributes
	{ path: 'prime', field: 'Prime', type: 'text' },
	{ path: 'might', field: 'Might', type: 'text' },
	{ path: 'agility', field: 'Agility', type: 'text' },
	{ path: 'charisma', field: 'Charisma', type: 'text' },
	{ path: 'intelligence', field: 'Intelligence', type: 'text' },
	{ path: 'combatMastery', field: 'Combat Mastery', type: 'text' },

	// Saves
	{ path: 'mightSave', field: 'Might Save', type: 'text' },
	{ path: 'agilitySave', field: 'Agility Save', type: 'text' },
	{ path: 'charismaSave', field: 'Charisma Save', type: 'text' },
	{ path: 'intelligenceSave', field: 'Intelligence Save', type: 'text' },

	// Skills
	{ path: 'awareness', field: 'Awareness', type: 'text' },
	{ path: 'athletics', field: 'Athletics', type: 'text' },
	{ path: 'intimidation', field: 'Intimidation', type: 'text' },
	{ path: 'acrobatics', field: 'Acrobatics', type: 'text' },
	{ path: 'trickery', field: 'Trickery', type: 'text' },
	{ path: 'stealth', field: 'Stealth', type: 'text' },
	{ path: 'animal', field: 'Animal', type: 'text' },
	{ path: 'influence', field: 'Influence', type: 'text' },
	{ path: 'insight', field: 'Insight', type: 'text' },
	{ path: 'investigation', field: 'Investigation', type: 'text' },
	{ path: 'medicine', field: 'Medicine', type: 'text' },
	{ path: 'survival', field: 'Survival', type: 'text' },
	{ path: 'arcana', field: 'Arcana', type: 'text' },
	{ path: 'history', field: 'History', type: 'text' },
	{ path: 'nature', field: 'Nature', type: 'text' },
	{ path: 'occultism', field: 'Occultism', type: 'text' },
	{ path: 'religion', field: 'Religion', type: 'text' },

	// Combat stats
	{ path: 'attackCheck', field: 'Attack Check', type: 'text' },
	{ path: 'saveDC', field: 'Save DC', type: 'text' },
	{ path: 'initiative', field: 'Initiative', type: 'text' },

	// HP/SP/MP/Grit/Rest
	{ path: 'hitPoints.max', field: 'Hit Points Max', type: 'text' },
	{ path: 'hitPoints.current', field: 'Hit Points Current', type: 'text' },
	{ path: 'hitPoints.temp', field: 'Hit Points Temp', type: 'text' },
	{ path: 'stamina.max', field: 'Stamina Points Max', type: 'text' },
	{ path: 'stamina.current', field: 'Stamina Points Current', type: 'text' },
	{ path: 'mana.max', field: 'Mana Points Max', type: 'text' },
	{ path: 'mana.current', field: 'Mana Points Current', type: 'text' },
	{ path: 'grit.cap', field: 'Grit Point Cap', type: 'text' },
	{ path: 'grit.current', field: 'Grit Point Current', type: 'text' },
	{ path: 'restPoints.cap', field: 'Rest Point Cap', type: 'text' },
	{ path: 'restPoints.current', field: 'Rest Point Current', type: 'text' },

	// Defense
	{ path: 'defense.mental', field: 'Mental Defense', type: 'text' },
	{ path: 'defense.mentalHeavyThreshold', field: 'MD Heavy Threshold', type: 'text' },
	{ path: 'defense.mentalBrutalThreshold', field: 'MD Brutal Threshold', type: 'text' },
	{ path: 'defense.physical', field: 'Physical Defense', type: 'text' },
	{ path: 'defense.physicalHeavyThreshold', field: 'PD Heavy Threshold', type: 'text' },
	{ path: 'defense.physicalBrutalThreshold', field: 'PD Brutal Threshold', type: 'text' },

	// Bloodied values (as text fields in the sheet)
	{ path: 'bloodiedValue', field: 'Bloodied', type: 'text' },
	{ path: 'wellBloodiedValue', field: 'Well-Bloodied', type: 'text' },

	// Movement & misc
	{ path: 'moveSpeed', field: 'Move Speed', type: 'text' },
	{ path: 'jumpDistance', field: 'Jump Distance', type: 'text' },
	{ path: 'deathThreshold', field: 'Death Threshold', type: 'text' },

	// Languages
	{ path: 'languages[0].name', field: 'Language A', type: 'text' },
	{ path: 'languages[1].name', field: 'Language B', type: 'text' },
	{ path: 'languages[2].name', field: 'Language C', type: 'text' },
	{ path: 'languages[3].name', field: 'Language D', type: 'text' },

	// Reduction checkboxes
	{ path: 'reduction.physical', field: 'Physical-Damage-Reduction', type: 'checkbox' },
	{ path: 'reduction.elemental', field: 'Elemantal-Damage-Reduction', type: 'checkbox' },
	{ path: 'reduction.mental', field: 'Mental-Damage-Reduction', type: 'checkbox' },

	// Exhaustion
	{ path: "exhaustion['-1']", field: 'Exhaustion -1', type: 'checkbox' },
	{ path: "exhaustion['-2']", field: 'Exhaustion -2', type: 'checkbox' },
	{ path: "exhaustion['-3']", field: 'Exhaustion -3', type: 'checkbox' },
	{ path: "exhaustion['-4']", field: 'Exhaustion -4', type: 'checkbox' },
	{ path: "exhaustion['-5']", field: 'Exhaustion -5', type: 'checkbox' },

	// Attacks (first row only for initial mapping)
	{ path: 'attacks[0].name', field: 'Attack A', type: 'text' },
	{ path: 'attacks[0].damage', field: 'Attack A Dmg', type: 'text' },
	{ path: 'attacks[0].type', field: 'Attack A Type', type: 'text' },
	{ path: 'attacks[0].notes', field: 'Attack A Notes', type: 'text' },

	// Trades labels
	{ path: 'tradeA', field: 'Custom Trade A', type: 'text' },
	{ path: 'tradeB', field: 'Custom Trade B', type: 'text' },
	{ path: 'tradeC', field: 'Custom Trade C', type: 'text' },
	{ path: 'tradeD', field: 'Custom Trade D', type: 'text' }
];


