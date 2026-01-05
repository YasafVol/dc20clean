/**
 * DC20 v0.10 PDF Field Map
 *
 * Maps PdfExportData paths to the actual PDF form field names in the
 * DC20 Beta 0.10 (fillable) Character Sheet.pdf
 *
 * Generated from: src/lib/pdf/010/field-manifest.json (309 fields)
 */

export type FieldMapItem = {
	path: string; // path in PdfExportData, e.g. "characterName", "hitPoints.max"
	field: string; // PDF field name
	type: 'text' | 'checkbox';
};

export const fieldMap_dc20_010: FieldMapItem[] = [
	// =========================================================================
	// IDENTITY
	// =========================================================================
	{ path: 'characterName', field: 'Character Name', type: 'text' },
	{ path: 'playerName', field: 'Player Name', type: 'text' },
	{ path: 'level', field: 'Level', type: 'text' },
	{ path: 'ancestry', field: 'Ancestry', type: 'text' },
	{ path: 'classAndSubclass', field: 'Class & Subclass', type: 'text' },
	{ path: 'features', field: 'Features', type: 'text' },

	// =========================================================================
	// ATTRIBUTES
	// =========================================================================
	{ path: 'prime', field: 'Prime', type: 'text' },
	{ path: 'might', field: 'Might', type: 'text' },
	{ path: 'agility', field: 'Agility', type: 'text' },
	{ path: 'charisma', field: 'Charisma', type: 'text' },
	{ path: 'intelligence', field: 'Intelligence', type: 'text' },
	{ path: 'combatMastery', field: 'Combat Mastery', type: 'text' },

	// =========================================================================
	// SAVES
	// =========================================================================
	{ path: 'mightSave', field: 'Might Save', type: 'text' },
	{ path: 'agilitySave', field: 'Agility Save', type: 'text' },
	{ path: 'charismaSave', field: 'Charisma Save', type: 'text' },
	{ path: 'intelligenceSave', field: 'Intelligence Save', type: 'text' },

	// =========================================================================
	// COMBAT STATS
	// =========================================================================
	{ path: 'initiative', field: 'Initiative', type: 'text' },
	{ path: 'attackCheck', field: 'Attack Check', type: 'text' },
	{ path: 'spellCheck', field: 'Spell Check', type: 'text' },
	{ path: 'saveDC', field: 'Save DC', type: 'text' },
	{ path: 'physicalDefense', field: 'Physical Defense', type: 'text' },
	{ path: 'mysticalDefense', field: 'Mystical Defense', type: 'text' },
	{ path: 'pdr', field: 'Physical-Damage-Reduction', type: 'text' },
	{ path: 'edr', field: 'Elemantal-Damage-Reduction', type: 'text' },
	{ path: 'mdr', field: 'Mystical-Damage-Reduction', type: 'text' },

	// =========================================================================
	// RESOURCES
	// =========================================================================
	{ path: 'hitPoints.max', field: 'Hit Points Max', type: 'text' },
	{ path: 'hitPoints.current', field: 'Hit Points Current', type: 'text' },
	{ path: 'hitPoints.temp', field: 'Hit Points Temp', type: 'text' },
	{ path: 'bloodied', field: 'Bloodied', type: 'text' },
	{ path: 'staminaPoints.max', field: 'Stamina Point Cap', type: 'text' },
	{ path: 'staminaPoints.current', field: 'Stamina Point Current', type: 'text' },
	{ path: 'manaPoints.max', field: 'Mana Point Cap', type: 'text' },
	{ path: 'manaPoints.current', field: 'Mana Point Current', type: 'text' },
	{ path: 'gritPoints.max', field: 'Grit Point Cap', type: 'text' },
	{ path: 'gritPoints.current', field: 'Grit Point Current', type: 'text' },
	{ path: 'deathThreshold', field: 'Death Threshold', type: 'text' },

	// =========================================================================
	// MOVEMENT
	// =========================================================================
	{ path: 'moveSpeed', field: 'Speed', type: 'text' },
	{ path: 'climbSpeedHalf', field: 'Climb-Half', type: 'checkbox' },
	{ path: 'climbSpeedFull', field: 'Climb-Full', type: 'checkbox' },
	{ path: 'swimSpeedHalf', field: 'Swim-Half', type: 'checkbox' },
	{ path: 'swimSpeedFull', field: 'Swim-Full', type: 'checkbox' },
	{ path: 'burrowSpeedHalf', field: 'Burrow-Half', type: 'checkbox' },
	{ path: 'burrowSpeedFull', field: 'Burrow-Full', type: 'checkbox' },
	{ path: 'flySpeedHalf', field: 'Fly-Half', type: 'checkbox' },
	{ path: 'flySpeedFull', field: 'Fly-Full', type: 'checkbox' },
	{ path: 'glideSpeedHalf', field: 'Glide-Half', type: 'checkbox' },
	{ path: 'glideSpeedFull', field: 'Glide-Full', type: 'checkbox' },
	{ path: 'jumpDistance', field: 'Jump Distance', type: 'text' },
	{ path: 'holdBreath', field: 'Hold Breath', type: 'text' },

	// =========================================================================
	// SKILLS - Values and Proficiency Checkboxes
	// =========================================================================
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

	// Skill Proficiency checkboxes
	{ path: 'skillProficiency.Athletics', field: 'Athletics-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Intimidation', field: 'Intimidation-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Acrobatics', field: 'Acrobatics-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Trickery', field: 'Trickery-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Stealth', field: 'Stealth-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Animal', field: 'Animal-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Influence', field: 'Influence-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Insight', field: 'Insight-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Investigation', field: 'Investigation-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Medicine', field: 'Medicine-Proficiency', type: 'checkbox' },
	{ path: 'skillProficiency.Survival', field: 'Survival-Proficiency', type: 'checkbox' },

	// =========================================================================
	// SKILL MASTERY CHECKBOXES (5 tiers per skill)
	// =========================================================================
	{ path: 'mastery.Awareness.2', field: 'Mastery-Awareness-2', type: 'checkbox' },
	{ path: 'mastery.Awareness.4', field: 'Mastery-Awareness-4', type: 'checkbox' },
	{ path: 'mastery.Awareness.6', field: 'Mastery-Awareness-6', type: 'checkbox' },
	{ path: 'mastery.Awareness.8', field: 'Mastery-Awareness-8', type: 'checkbox' },
	{ path: 'mastery.Awareness.10', field: 'Mastery-Awareness-10', type: 'checkbox' },
	{ path: 'mastery.Athletics.2', field: 'Mastery-Athletics-2', type: 'checkbox' },
	{ path: 'mastery.Athletics.4', field: 'Mastery-Athletics-4', type: 'checkbox' },
	{ path: 'mastery.Athletics.6', field: 'Mastery-Athletics-6', type: 'checkbox' },
	{ path: 'mastery.Athletics.8', field: 'Mastery-Athletics-8', type: 'checkbox' },
	{ path: 'mastery.Athletics.10', field: 'Mastery-Athletics-10', type: 'checkbox' },
	{ path: 'mastery.Intimidation.2', field: 'Mastery-Intimidation-2', type: 'checkbox' },
	{ path: 'mastery.Intimidation.4', field: 'Mastery-Intimidation-4', type: 'checkbox' },
	{ path: 'mastery.Intimidation.6', field: 'Mastery-Intimidation-6', type: 'checkbox' },
	{ path: 'mastery.Intimidation.8', field: 'Mastery-Intimidation-8', type: 'checkbox' },
	{ path: 'mastery.Intimidation.10', field: 'Mastery-Intimidation-10', type: 'checkbox' },
	{ path: 'mastery.Acrobatics.2', field: 'Mastery-Acrobatics-2', type: 'checkbox' },
	{ path: 'mastery.Acrobatics.4', field: 'Mastery-Acrobatics-4', type: 'checkbox' },
	{ path: 'mastery.Acrobatics.6', field: 'Mastery-Acrobatics-6', type: 'checkbox' },
	{ path: 'mastery.Acrobatics.8', field: 'Mastery-Acrobatics-8', type: 'checkbox' },
	{ path: 'mastery.Acrobatics.10', field: 'Mastery-Acrobatics-10', type: 'checkbox' },
	{ path: 'mastery.Trickery.2', field: 'Mastery-Trickery-2', type: 'checkbox' },
	{ path: 'mastery.Trickery.4', field: 'Mastery-Trickery-4', type: 'checkbox' },
	{ path: 'mastery.Trickery.6', field: 'Mastery-Trickery-6', type: 'checkbox' },
	{ path: 'mastery.Trickery.8', field: 'Mastery-Trickery-8', type: 'checkbox' },
	{ path: 'mastery.Trickery.10', field: 'Mastery-Trickery-10', type: 'checkbox' },
	{ path: 'mastery.Stealth.2', field: 'Mastery-Stealth-2', type: 'checkbox' },
	{ path: 'mastery.Stealth.4', field: 'Mastery-Stealth-4', type: 'checkbox' },
	{ path: 'mastery.Stealth.6', field: 'Mastery-Stealth-6', type: 'checkbox' },
	{ path: 'mastery.Stealth.8', field: 'Mastery-Stealth-8', type: 'checkbox' },
	{ path: 'mastery.Stealth.10', field: 'Mastery-Stealth-10', type: 'checkbox' },
	{ path: 'mastery.Animal.2', field: 'Mastery-Animal-2', type: 'checkbox' },
	{ path: 'mastery.Animal.4', field: 'Mastery-Animal-4', type: 'checkbox' },
	{ path: 'mastery.Animal.6', field: 'Mastery-Animal-6', type: 'checkbox' },
	{ path: 'mastery.Animal.8', field: 'Mastery-Animal-8', type: 'checkbox' },
	{ path: 'mastery.Animal.10', field: 'Mastery-Animal-10', type: 'checkbox' },
	{ path: 'mastery.Influence.2', field: 'Mastery-Influence-2', type: 'checkbox' },
	{ path: 'mastery.Influence.4', field: 'Mastery-Influence-4', type: 'checkbox' },
	{ path: 'mastery.Influence.6', field: 'Mastery-Influence-6', type: 'checkbox' },
	{ path: 'mastery.Influence.8', field: 'Mastery-Influence-8', type: 'checkbox' },
	{ path: 'mastery.Influence.10', field: 'Mastery-Influence-10', type: 'checkbox' },
	{ path: 'mastery.Insight.2', field: 'Mastery-Insight-2', type: 'checkbox' },
	{ path: 'mastery.Insight.4', field: 'Mastery-Insight-4', type: 'checkbox' },
	{ path: 'mastery.Insight.6', field: 'Mastery-Insight-6', type: 'checkbox' },
	{ path: 'mastery.Insight.8', field: 'Mastery-Insight-8', type: 'checkbox' },
	{ path: 'mastery.Insight.10', field: 'Mastery-Insight-10', type: 'checkbox' },
	{ path: 'mastery.Investigation.2', field: 'Mastery-Investigation-2', type: 'checkbox' },
	{ path: 'mastery.Investigation.4', field: 'Mastery-Investigation-4', type: 'checkbox' },
	{ path: 'mastery.Investigation.6', field: 'Mastery-Investigation-6', type: 'checkbox' },
	{ path: 'mastery.Investigation.8', field: 'Mastery-Investigation-8', type: 'checkbox' },
	{ path: 'mastery.Investigation.10', field: 'Mastery-Investigation-10', type: 'checkbox' },
	{ path: 'mastery.Medicine.2', field: 'Mastery-Medicine-2', type: 'checkbox' },
	{ path: 'mastery.Medicine.4', field: 'Mastery-Medicine-4', type: 'checkbox' },
	{ path: 'mastery.Medicine.6', field: 'Mastery-Medicine-6', type: 'checkbox' },
	{ path: 'mastery.Medicine.8', field: 'Mastery-Medicine-8', type: 'checkbox' },
	{ path: 'mastery.Medicine.10', field: 'Mastery-Medicine-10', type: 'checkbox' },
	{ path: 'mastery.Survival.2', field: 'Mastery-Survival-2', type: 'checkbox' },
	{ path: 'mastery.Survival.4', field: 'Mastery-Survival-4', type: 'checkbox' },
	{ path: 'mastery.Survival.6', field: 'Mastery-Survival-6', type: 'checkbox' },
	{ path: 'mastery.Survival.8', field: 'Mastery-Survival-8', type: 'checkbox' },
	{ path: 'mastery.Survival.10', field: 'Mastery-Survival-10', type: 'checkbox' },

	// =========================================================================
	// KNOWLEDGE TRADES
	// =========================================================================
	{ path: 'arcana', field: 'Arcana', type: 'text' },
	{ path: 'history', field: 'History', type: 'text' },
	{ path: 'nature', field: 'Nature', type: 'text' },
	{ path: 'occultism', field: 'Occultism', type: 'text' },
	{ path: 'religion', field: 'Religion', type: 'text' },
	{ path: 'engineering', field: 'Engineering', type: 'text' },

	// Knowledge Trade Proficiency
	{ path: 'tradeProficiency.Arcana', field: 'Arcana-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.History', field: 'History-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.Nature', field: 'Nature-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.Occultism', field: 'Occultism-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.Religion', field: 'Religion-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.Engineering', field: 'Engineering-Proficiency', type: 'checkbox' },
	{ path: 'tradeProficiency.Expertise', field: 'Expertise-Proficiency', type: 'checkbox' },

	// Custom Trades
	{ path: 'customTradeA', field: 'Custom Trade A', type: 'text' },
	{ path: 'customTradeB', field: 'Custom Trade B', type: 'text' },
	{ path: 'customTradeC', field: 'Custom Trade C', type: 'text' },
	{ path: 'customTradeD', field: 'Custom Trade D', type: 'text' },

	// =========================================================================
	// LANGUAGES
	// =========================================================================
	{ path: 'languages.0', field: 'Language A', type: 'text' },
	{ path: 'languages.1', field: 'Language B', type: 'text' },
	{ path: 'languages.2', field: 'Language C', type: 'text' },
	{ path: 'languages.3', field: 'Language D', type: 'text' },

	// =========================================================================
	// ATTACKS
	// =========================================================================
	{ path: 'attacks.0.name', field: 'Attack A', type: 'text' },
	{ path: 'attacks.0.damage', field: 'Attack A Dmg', type: 'text' },
	{ path: 'attacks.0.type', field: 'Attack A Type', type: 'text' },
	{ path: 'attacks.0.notes', field: 'Attack A Notes', type: 'text' },
	{ path: 'attacks.1.name', field: 'Attack B', type: 'text' },
	{ path: 'attacks.1.damage', field: 'Attack B Dmg', type: 'text' },
	{ path: 'attacks.1.type', field: 'Attack B Type', type: 'text' },
	{ path: 'attacks.1.notes', field: 'Attack B Notes', type: 'text' },
	{ path: 'attacks.2.name', field: 'Attack C', type: 'text' },
	{ path: 'attacks.2.damage', field: 'Attack C Dmg', type: 'text' },
	{ path: 'attacks.2.type', field: 'Attack C Type', type: 'text' },
	{ path: 'attacks.2.notes', field: 'Attack C Notes', type: 'text' },
	{ path: 'attacks.3.name', field: 'Attack D', type: 'text' },
	{ path: 'attacks.3.damage', field: 'Attack D Dmg', type: 'text' },
	{ path: 'attacks.3.type', field: 'Attack D Type', type: 'text' },
	{ path: 'attacks.3.notes', field: 'Attack D Notes', type: 'text' },

	// =========================================================================
	// EQUIPMENT SLOTS
	// =========================================================================
	{ path: 'equipment.head', field: 'Equipped on the Head', type: 'text' },
	{ path: 'equipment.neck', field: 'Equipped on the Neck', type: 'text' },
	{ path: 'equipment.mantle', field: 'Equipped on the Mantle', type: 'text' },
	{ path: 'equipment.body', field: 'Equipped on the Body', type: 'text' },
	{ path: 'equipment.waist', field: 'Equipped on the Waist', type: 'text' },
	{ path: 'equipment.hands', field: 'Equipped on the Hands', type: 'text' },
	{ path: 'equipment.leftHand', field: 'Equipped on the Left Hand', type: 'text' },
	{ path: 'equipment.rightHand', field: 'Equipped on the Right Hand', type: 'text' },
	{ path: 'equipment.feet', field: 'Equipped on the Feet', type: 'text' },

	// =========================================================================
	// ATTUNED ITEMS
	// =========================================================================
	{ path: 'attuned.0', field: 'Attuned A', type: 'text' },
	{ path: 'attuned.1', field: 'Attuned B', type: 'text' },
	{ path: 'attuned.2', field: 'Attuned C', type: 'text' },
	{ path: 'attuned.3', field: 'Attuned D', type: 'text' },
	{ path: 'attuned.4', field: 'Attuned E', type: 'text' },
	{ path: 'attunedItems.0', field: 'Attuned Item A', type: 'text' },
	{ path: 'attunedItems.1', field: 'Attuned Item B', type: 'text' },
	{ path: 'attunedItems.2', field: 'Attuned Item C', type: 'text' },
	{ path: 'attunedItems.3', field: 'Attuned Item D', type: 'text' },
	{ path: 'attunedItems.4', field: 'Attuned Item E', type: 'text' },

	// =========================================================================
	// INVENTORY / SUPPLIES
	// =========================================================================
	{ path: 'carried', field: 'Carried', type: 'text' },
	{ path: 'stored', field: 'Stored', type: 'text' },
	{ path: 'supplies.0.name', field: 'Supplies A', type: 'text' },
	{ path: 'supplies.0.amount', field: 'Supplies A Amount', type: 'text' },
	{ path: 'supplies.1.name', field: 'Supplies B', type: 'text' },
	{ path: 'supplies.1.amount', field: 'Supplies B Amount', type: 'text' },
	{ path: 'supplies.2.name', field: 'Supplies C', type: 'text' },
	{ path: 'supplies.2.amount', field: 'Supplies C Amount', type: 'text' },
	{ path: 'supplies.3.name', field: 'Supplies D', type: 'text' },
	{ path: 'supplies.3.amount', field: 'Supplies D Amount', type: 'text' },
	{ path: 'supplies.4.name', field: 'Supplies E', type: 'text' },
	{ path: 'supplies.4.amount', field: 'Supplies E Amount', type: 'text' },
	{ path: 'supplies.5.name', field: 'Supplies F', type: 'text' },
	{ path: 'supplies.5.amount', field: 'Supplies F Amount', type: 'text' },
	{ path: 'supplies.6.name', field: 'Supplies G', type: 'text' },
	{ path: 'supplies.6.amount', field: 'Supplies G Amount', type: 'text' },
	{ path: 'supplies.7.name', field: 'Supplies H', type: 'text' },
	{ path: 'supplies.7.amount', field: 'Supplies H Amount', type: 'text' },
	{ path: 'supplies.8.name', field: 'Supplies I', type: 'text' },
	{ path: 'supplies.8.amount', field: 'Supplies I Amount', type: 'text' },
	{ path: 'supplies.9.name', field: 'Supplies J', type: 'text' },
	{ path: 'supplies.9.amount', field: 'Supplies J Amount', type: 'text' },
	{ path: 'supplies.10.name', field: 'Supplies K', type: 'text' },
	{ path: 'supplies.10.amount', field: 'Supplies K Amount', type: 'text' },

	// =========================================================================
	// EXHAUSTION TRACK
	// =========================================================================
	{ path: 'exhaustion.1', field: 'Exhaustion -1', type: 'checkbox' },
	{ path: 'exhaustion.2', field: 'Exhaustion -2', type: 'checkbox' },
	{ path: 'exhaustion.3', field: 'Exhaustion -3', type: 'checkbox' },
	{ path: 'exhaustion.4', field: 'Exhaustion -4', type: 'checkbox' },
	{ path: 'exhaustion.5', field: 'Exhaustion -5', type: 'checkbox' }
];
