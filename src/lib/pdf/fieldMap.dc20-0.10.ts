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
	{ path: 'saveDC', field: 'Save DC', type: 'text' },
	{ path: 'defense.physical', field: 'Physical Defense', type: 'text' },
	{ path: 'defense.physicalHeavyThreshold', field: 'PD Heavy Threshold', type: 'text' },
	{ path: 'defense.physicalBrutalThreshold', field: 'PD Brutal Threshold', type: 'text' },
	{ path: 'defense.mental', field: 'Mental Defense', type: 'text' },
	{ path: 'defense.mentalHeavyThreshold', field: 'MD Heavy Threshold', type: 'text' },
	{ path: 'defense.mentalBrutalThreshold', field: 'MD Brutal Threshold', type: 'text' },
	{ path: 'reduction.physical', field: 'Physical-Damage-Reduction', type: 'checkbox' },
	{ path: 'reduction.elemental', field: 'Elemantal-Damage-Reduction', type: 'checkbox' },
	{ path: 'reduction.mental', field: 'Mental-Damage-Reduction', type: 'checkbox' },

	// =========================================================================
	// RESOURCES
	// =========================================================================
	{ path: 'hitPoints.max', field: 'Hit Points Max', type: 'text' },
	{ path: 'hitPoints.current', field: 'Hit Points Current', type: 'text' },
	{ path: 'hitPoints.temp', field: 'Hit Points Temp', type: 'text' },
	{ path: 'bloodiedValue', field: 'Bloodied', type: 'text' },
	{ path: 'wellBloodiedValue', field: 'Well-Bloodied', type: 'text' },
	{ path: 'stamina.max', field: 'Stamina Points Max', type: 'text' },
	{ path: 'stamina.current', field: 'Stamina Points Current', type: 'text' },
	{ path: 'mana.max', field: 'Mana Points Max', type: 'text' },
	{ path: 'mana.current', field: 'Mana Points Current', type: 'text' },
	{ path: 'grit.cap', field: 'Grit Point Cap', type: 'text' },
	{ path: 'grit.current', field: 'Grit Point Current', type: 'text' },
	{ path: 'restPoints.cap', field: 'Rest Point Cap', type: 'text' },
	{ path: 'restPoints.current', field: 'Rest Point Current', type: 'text' },
	{ path: 'deathThreshold', field: 'Death Threshold', type: 'text' },

	// =========================================================================
	// CUSTOM RESOURCES (9 slots)
	// =========================================================================
	{ path: 'resources.0.label', field: 'Resource A', type: 'text' },
	{ path: 'resources.0.cap', field: 'Resource A Cap', type: 'text' },
	{ path: 'resources.0.current', field: 'Resource A Current', type: 'text' },
	{ path: 'resources.1.label', field: 'Resource B', type: 'text' },
	{ path: 'resources.1.cap', field: 'Resource B Cap', type: 'text' },
	{ path: 'resources.1.current', field: 'Resource B Current', type: 'text' },
	{ path: 'resources.2.label', field: 'Resource C', type: 'text' },
	{ path: 'resources.2.cap', field: 'Resource C Cap', type: 'text' },
	{ path: 'resources.2.current', field: 'Resource C Current', type: 'text' },
	{ path: 'resources.3.label', field: 'Resource D', type: 'text' },
	{ path: 'resources.3.cap', field: 'Resource D Cap', type: 'text' },
	{ path: 'resources.3.current', field: 'Resource D Current', type: 'text' },
	{ path: 'resources.4.label', field: 'Resource E', type: 'text' },
	{ path: 'resources.4.cap', field: 'Resource E Cap', type: 'text' },
	{ path: 'resources.4.current', field: 'Resource E Current', type: 'text' },
	{ path: 'resources.5.label', field: 'Resource F', type: 'text' },
	{ path: 'resources.5.cap', field: 'Resource F Cap', type: 'text' },
	{ path: 'resources.5.current', field: 'Resource F Current', type: 'text' },
	{ path: 'resources.6.label', field: 'Resource G', type: 'text' },
	{ path: 'resources.6.cap', field: 'Resource G Cap', type: 'text' },
	{ path: 'resources.6.current', field: 'Resource G Current', type: 'text' },
	{ path: 'resources.7.label', field: 'Resource H', type: 'text' },
	{ path: 'resources.7.cap', field: 'Resource H Cap', type: 'text' },
	{ path: 'resources.7.current', field: 'Resource H Current', type: 'text' },
	{ path: 'resources.8.label', field: 'Resource I', type: 'text' },
	{ path: 'resources.8.cap', field: 'Resource I Cap', type: 'text' },
	{ path: 'resources.8.current', field: 'Resource I Current', type: 'text' },

	// =========================================================================
	// MOVEMENT
	// =========================================================================
	{ path: 'moveSpeed', field: 'Move Speed', type: 'text' },
	{ path: 'movement.climb.half', field: 'Climb-Half', type: 'checkbox' },
	{ path: 'movement.climb.full', field: 'Climb-Full', type: 'checkbox' },
	{ path: 'movement.swim.half', field: 'Swim-Half', type: 'checkbox' },
	{ path: 'movement.swim.full', field: 'Swim-Full', type: 'checkbox' },
	{ path: 'movement.burrow.half', field: 'Burrow-Half', type: 'checkbox' },
	{ path: 'movement.burrow.full', field: 'Burrow-Full', type: 'checkbox' },
	{ path: 'movement.fly.half', field: 'Fly-Half', type: 'checkbox' },
	{ path: 'movement.fly.full', field: 'Fly-Full', type: 'checkbox' },
	{ path: 'movement.glide.half', field: 'Glide-Half', type: 'checkbox' },
	{ path: 'movement.glide.full', field: 'Glide-Full', type: 'checkbox' },
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
	{ path: 'proficiency.expertise', field: 'Expertise-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.athletics', field: 'Athletics-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.intimidation', field: 'Intimidation-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.acrobatics', field: 'Acrobatics-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.trickery', field: 'Trickery-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.stealth', field: 'Stealth-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.animal', field: 'Animal-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.influence', field: 'Influence-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.insight', field: 'Insight-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.investigation', field: 'Investigation-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.medicine', field: 'Medicine-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.survival', field: 'Survival-Proficiency', type: 'checkbox' },

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
	// Note: PDF has typo "Master-Influence-10" instead of "Mastery-Influence-10"
	{ path: 'mastery.Influence.10', field: 'Master-Influence-10', type: 'checkbox' },
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
	// KNOWLEDGE TRADES - Values and Mastery
	// =========================================================================
	{ path: 'arcana', field: 'Arcana', type: 'text' },
	{ path: 'history', field: 'History', type: 'text' },
	{ path: 'nature', field: 'Nature', type: 'text' },
	{ path: 'occultism', field: 'Occultism', type: 'text' },
	{ path: 'religion', field: 'Religion', type: 'text' },

	// Knowledge Trade Proficiency
	{ path: 'proficiency.arcana', field: 'Arcana-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.history', field: 'History-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.nature', field: 'Nature-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.occultism', field: 'Occultism-Proficiency', type: 'checkbox' },
	{ path: 'proficiency.religion', field: 'Religion-Proficiency', type: 'checkbox' },

	// Knowledge Trade Mastery
	{ path: 'mastery.Arcana.2', field: 'Mastery-Arcana-2', type: 'checkbox' },
	{ path: 'mastery.Arcana.4', field: 'Mastery-Arcana-4', type: 'checkbox' },
	{ path: 'mastery.Arcana.6', field: 'Mastery-Arcana-6', type: 'checkbox' },
	{ path: 'mastery.Arcana.8', field: 'Mastery-Arcana-8', type: 'checkbox' },
	{ path: 'mastery.Arcana.10', field: 'Mastery-Arcana-10', type: 'checkbox' },
	{ path: 'mastery.History.2', field: 'Mastery-History-2', type: 'checkbox' },
	{ path: 'mastery.History.4', field: 'Mastery-History-4', type: 'checkbox' },
	{ path: 'mastery.History.6', field: 'Mastery-History-6', type: 'checkbox' },
	{ path: 'mastery.History.8', field: 'Mastery-History-8', type: 'checkbox' },
	{ path: 'mastery.History.10', field: 'Mastery-History-10', type: 'checkbox' },
	{ path: 'mastery.Nature.2', field: 'Mastery-Nature-2', type: 'checkbox' },
	{ path: 'mastery.Nature.4', field: 'Mastery-Nature-4', type: 'checkbox' },
	{ path: 'mastery.Nature.6', field: 'Mastery-Nature-6', type: 'checkbox' },
	{ path: 'mastery.Nature.8', field: 'Mastery-Nature-8', type: 'checkbox' },
	{ path: 'mastery.Nature.10', field: 'Mastery-Nature-10', type: 'checkbox' },
	{ path: 'mastery.Occultism.2', field: 'Mastery-Occultism-2', type: 'checkbox' },
	{ path: 'mastery.Occultism.4', field: 'Mastery-Occultism-4', type: 'checkbox' },
	{ path: 'mastery.Occultism.6', field: 'Mastery-Occultism-6', type: 'checkbox' },
	{ path: 'mastery.Occultism.8', field: 'Mastery-Occultism-8', type: 'checkbox' },
	{ path: 'mastery.Occultism.10', field: 'Mastery-Occultism-10', type: 'checkbox' },
	{ path: 'mastery.Religion.2', field: 'Mastery-Religion-2', type: 'checkbox' },
	{ path: 'mastery.Religion.4', field: 'Mastery-Religion-4', type: 'checkbox' },
	{ path: 'mastery.Religion.6', field: 'Mastery-Religion-6', type: 'checkbox' },
	{ path: 'mastery.Religion.8', field: 'Mastery-Religion-8', type: 'checkbox' },
	{ path: 'mastery.Religion.10', field: 'Mastery-Religion-10', type: 'checkbox' },

	// =========================================================================
	// PRACTICAL TRADES A-D - Labels, Values, Mastery, Proficiency
	// =========================================================================
	{ path: 'tradeA', field: 'Trade A', type: 'text' },
	{ path: 'tradeAModifier', field: 'Trade A', type: 'text' }, // Same field used for modifier
	{ path: 'customTradeA', field: 'Custom Trade A', type: 'text' },
	{ path: 'proficiency.tradeA', field: 'Trade-A-Proficiency', type: 'checkbox' },
	{ path: 'mastery.TradeA.2', field: 'Mastery-Trade-A-2', type: 'checkbox' },
	{ path: 'mastery.TradeA.4', field: 'Mastery-Trade-A-4', type: 'checkbox' },
	{ path: 'mastery.TradeA.6', field: 'Mastery-Trade-A-6', type: 'checkbox' },
	{ path: 'mastery.TradeA.8', field: 'Mastery-Trade-A-8', type: 'checkbox' },
	{ path: 'mastery.TradeA.10', field: 'Mastery-Trade-A-10', type: 'checkbox' },

	{ path: 'tradeB', field: 'Trade B', type: 'text' },
	{ path: 'customTradeB', field: 'Custom Trade B', type: 'text' },
	{ path: 'proficiency.tradeB', field: 'Trade-B-Proficiency', type: 'checkbox' },
	{ path: 'mastery.TradeB.2', field: 'Mastery-Trade-B-2', type: 'checkbox' },
	{ path: 'mastery.TradeB.4', field: 'Mastery-Trade-B-4', type: 'checkbox' },
	{ path: 'mastery.TradeB.6', field: 'Mastery-Trade-B-6', type: 'checkbox' },
	{ path: 'mastery.TradeB.8', field: 'Mastery-Trade-B-8', type: 'checkbox' },
	{ path: 'mastery.TradeB.10', field: 'Mastery-Trade-B-10', type: 'checkbox' },

	{ path: 'tradeC', field: 'Trade C', type: 'text' },
	{ path: 'customTradeC', field: 'Custom Trade C', type: 'text' },
	{ path: 'proficiency.tradeC', field: 'Trade-C-Proficiency', type: 'checkbox' },
	{ path: 'mastery.TradeC.2', field: 'Mastery-Trade-C-2', type: 'checkbox' },
	{ path: 'mastery.TradeC.4', field: 'Mastery-Trade-C-4', type: 'checkbox' },
	{ path: 'mastery.TradeC.6', field: 'Mastery-Trade-C-6', type: 'checkbox' },
	{ path: 'mastery.TradeC.8', field: 'Mastery-Trade-C-8', type: 'checkbox' },
	{ path: 'mastery.TradeC.10', field: 'Mastery-Trade-C-10', type: 'checkbox' },

	{ path: 'tradeD', field: 'Trade D', type: 'text' },
	{ path: 'customTradeD', field: 'Custom Trade D', type: 'text' },
	{ path: 'proficiency.tradeD', field: 'Trade-D-Proficiency', type: 'checkbox' },
	{ path: 'mastery.TradeD.2', field: 'Mastery-Trade-D-2', type: 'checkbox' },
	{ path: 'mastery.TradeD.4', field: 'Mastery-Trade-D-4', type: 'checkbox' },
	{ path: 'mastery.TradeD.6', field: 'Mastery-Trade-D-6', type: 'checkbox' },
	{ path: 'mastery.TradeD.8', field: 'Mastery-Trade-D-8', type: 'checkbox' },
	{ path: 'mastery.TradeD.10', field: 'Mastery-Trade-D-10', type: 'checkbox' },

	// =========================================================================
	// LANGUAGES
	// =========================================================================
	{ path: 'languages.0.name', field: 'Language A', type: 'text' },
	{ path: 'mastery.LanguageA.Limited', field: 'Mastery-Language-A-Limited', type: 'checkbox' },
	{ path: 'mastery.LanguageA.Fluent', field: 'Mastery-Language-A-Fluent', type: 'checkbox' },
	{ path: 'languages.1.name', field: 'Language B', type: 'text' },
	{ path: 'mastery.LanguageB.Limited', field: 'Mastery-Language-B-Limited', type: 'checkbox' },
	{ path: 'mastery.LanguageB.Fluent', field: 'Mastery-Language-B-Fluent', type: 'checkbox' },
	{ path: 'languages.2.name', field: 'Language C', type: 'text' },
	{ path: 'mastery.LanguageC.Limited', field: 'Mastery-Language-C-Limited', type: 'checkbox' },
	{ path: 'mastery.LanguageC.Fluent', field: 'Mastery-Language-C-Fluent', type: 'checkbox' },
	{ path: 'languages.3.name', field: 'Language D', type: 'text' },
	{ path: 'mastery.LanguageD.Limited', field: 'Mastery-Language-D-Limited', type: 'checkbox' },
	{ path: 'mastery.LanguageD.Fluent', field: 'Mastery-Language-D-Fluent', type: 'checkbox' },

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
	{ path: 'equipped.head', field: 'Equipped on the Head', type: 'text' },
	{ path: 'equipped.neck', field: 'Equipped on the Neck', type: 'text' },
	{ path: 'equipped.mantle', field: 'Equipped on the Mantle', type: 'text' },
	{ path: 'equipped.body', field: 'Equipped on the Body', type: 'text' },
	{ path: 'equipped.waist', field: 'Equipped on the Waist', type: 'text' },
	{ path: 'equipped.hands', field: 'Equipped on the Hands', type: 'text' },
	{ path: 'equipped.ringLeft', field: 'Equipped on the Left Hand', type: 'text' },
	{ path: 'equipped.ringRight', field: 'Equipped on the Right Hand', type: 'text' },
	{ path: 'equipped.feet', field: 'Equipped on the Feet', type: 'text' },

	// =========================================================================
	// ATTUNED ITEMS
	// =========================================================================
	{ path: 'attunement.items.0.name', field: 'Attuned A', type: 'text' },
	{ path: 'attunement.items.1.name', field: 'Attuned B', type: 'text' },
	{ path: 'attunement.items.2.name', field: 'Attuned C', type: 'text' },
	{ path: 'attunement.items.3.name', field: 'Attuned D', type: 'text' },
	{ path: 'attunement.items.4.name', field: 'Attuned E', type: 'text' },
	// Note: Attuned Item fields are text fields in manifest, not checkboxes
	{ path: 'attunement.items.0.name', field: 'Attuned Item A', type: 'text' },
	{ path: 'attunement.items.1.name', field: 'Attuned Item B', type: 'text' },
	{ path: 'attunement.items.2.name', field: 'Attuned Item C', type: 'text' },
	{ path: 'attunement.items.3.name', field: 'Attuned Item D', type: 'text' },
	{ path: 'attunement.items.4.name', field: 'Attuned Item E', type: 'text' },

	// =========================================================================
	// INVENTORY / SUPPLIES
	// =========================================================================
	{ path: 'inventory.carried', field: 'Carried', type: 'text' },
	{ path: 'inventory.stored', field: 'Stored', type: 'text' },
	{ path: 'inventory.supplies.0.label', field: 'Supplies A', type: 'text' },
	{ path: 'inventory.supplies.0.amount', field: 'Supplies A Amount', type: 'text' },
	{ path: 'inventory.supplies.1.label', field: 'Supplies B', type: 'text' },
	{ path: 'inventory.supplies.1.amount', field: 'Supplies B Amount', type: 'text' },
	{ path: 'inventory.supplies.2.label', field: 'Supplies C', type: 'text' },
	{ path: 'inventory.supplies.2.amount', field: 'Supplies C Amount', type: 'text' },
	{ path: 'inventory.supplies.3.label', field: 'Supplies D', type: 'text' },
	{ path: 'inventory.supplies.3.amount', field: 'Supplies D Amount', type: 'text' },
	{ path: 'inventory.supplies.4.label', field: 'Supplies E', type: 'text' },
	{ path: 'inventory.supplies.4.amount', field: 'Supplies E Amount', type: 'text' },
	{ path: 'inventory.supplies.5.label', field: 'Supplies F', type: 'text' },
	{ path: 'inventory.supplies.5.amount', field: 'Supplies F Amount', type: 'text' },
	{ path: 'inventory.supplies.6.label', field: 'Supplies G', type: 'text' },
	{ path: 'inventory.supplies.6.amount', field: 'Supplies G Amount', type: 'text' },
	{ path: 'inventory.supplies.7.label', field: 'Supplies H', type: 'text' },
	{ path: 'inventory.supplies.7.amount', field: 'Supplies H Amount', type: 'text' },
	{ path: 'inventory.supplies.8.label', field: 'Supplies I', type: 'text' },
	{ path: 'inventory.supplies.8.amount', field: 'Supplies I Amount', type: 'text' },
	{ path: 'inventory.supplies.9.label', field: 'Supplies J', type: 'text' },
	{ path: 'inventory.supplies.9.amount', field: 'Supplies J Amount', type: 'text' },
	{ path: 'inventory.supplies.10.label', field: 'Supplies K', type: 'text' },
	{ path: 'inventory.supplies.10.amount', field: 'Supplies K Amount', type: 'text' },

	// =========================================================================
	// EXHAUSTION TRACK
	// =========================================================================
	{ path: 'exhaustion.-1', field: 'Exhaustion -1', type: 'checkbox' },
	{ path: 'exhaustion.-2', field: 'Exhaustion -2', type: 'checkbox' },
	{ path: 'exhaustion.-3', field: 'Exhaustion -3', type: 'checkbox' },
	{ path: 'exhaustion.-4', field: 'Exhaustion -4', type: 'checkbox' },
	{ path: 'exhaustion.-5', field: 'Exhaustion -5', type: 'checkbox' },

	// =========================================================================
	// MISCELLANEOUS
	// =========================================================================
	{ path: 'misc', field: 'Misc', type: 'text' }
];
