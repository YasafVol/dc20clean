import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';

// Use Vite's import.meta.glob to import only the class table JSON files.
// The `eager: true` option imports the modules directly, so they are available synchronously.
const tableModules = import.meta.glob('../_new_schema/*_table.json', { eager: true });

// Extract the default export (the class object) from each module.
const tableData = Object.values(tableModules).map((module: any) => module.default);

// Create progression data structure from table files (stats only, no features)
const compatibleData = tableData.map((classTable: any) => {
	const className = classTable.className;

	return {
		id: className.toLowerCase(),
		name: className,
		description: `${className} class progression table`,
		baseHpContribution: classTable.levelProgression?.[0]?.healthPoints || 0,
		startingSP: classTable.levelProgression?.[0]?.staminaPoints || 0,
		startingMP: classTable.levelProgression?.[0]?.manaPoints || 0,
		// Add other required fields with default values
		skillPointGrantLvl1: classTable.levelProgression?.[0]?.skillPoints || 0,
		tradePointGrantLvl1: classTable.levelProgression?.[0]?.tradePoints || 0,
		combatTraining: [],
		maneuversKnownLvl1: classTable.levelProgression?.[0]?.maneuversKnown || 0,
		techniquesKnownLvl1: classTable.levelProgression?.[0]?.techniquesKnown || 0,
		saveDCBase: 8,
		deathThresholdBase: 10,
		moveSpeedBase: 5, // DC20: Base movement speed is 5 spaces
		restPointsBase: 4,
		gritPointsBase: 2,
		initiativeBonusBase: 0,
		cantripsKnownLvl1: classTable.levelProgression?.[0]?.cantripsKnown || 0,
		spellsKnownLvl1: classTable.levelProgression?.[0]?.spellsKnown || 0,
		// Store the full level progression for future level gaining
		levelProgression: classTable.levelProgression,
		// Empty arrays for features - these should be handled by class-features.loader.ts
		level1Features: [],
		featureChoicesLvl1: []
	};
});

// Validate the combined data against the Zod schema.
// The parse method will throw a detailed error if validation fails.
const validatedData = classesDataSchema.parse(compatibleData);

// Export the validated data with the correct type.
export const classesData: IClassDefinition[] = validatedData;
