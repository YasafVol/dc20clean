import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';

// Use Vite's import.meta.glob to import only the class table JSON files.
// The `eager: true` option imports the modules directly, so they are available synchronously.
const tableModules = import.meta.glob('../_new_schema/*_table.json', { eager: true });

// Extract the default export (the class object) from each module.
const tableData = Object.values(tableModules).map((module: any) => module.default);

// Create progression data structure from table files (stats only, no features)
const compatibleData = tableData.map((classTable: any) => {
	const className = classTable.className;

	// Map class names to their descriptions
	const classDescriptions: { [key: string]: string } = {
		Barbarian:
			'A fierce warrior who channels primal rage to gain strength and resist harm in combat.',
		Bard: 'A charismatic performer whose songs and stories inspire allies and manipulate enemies through magic.',
		Champion:
			'A martial master focused on critical strikes, resilience, and battlefield leadership.',
		Cleric:
			'A divine spellcaster empowered by a god to heal, protect, and smite enemies with holy might.',
		Commander:
			'A tactical leader who inspires and directs allies with strategic maneuvers and commanding presence.',
		Druid:
			'A nature-bound spellcaster who wields primal magic and transforms into beasts to protect the wilds.',
		Hunter:
			'A skilled tracker and marksman who specializes in slaying monsters and surviving the wilderness.',
		Monk: 'A disciplined martial artist who channels inner energy for rapid strikes and supernatural movement.',
		Rogue:
			'A stealthy and cunning adventurer who excels in ambushes, trickery, and precise strikes.',
		Sorcerer:
			'A natural-born spellcaster who harnesses raw arcane or elemental power from an innate source.',
		Spellblade:
			'A warrior-mage hybrid who combines martial prowess with arcane magic to enchant weapons and defend.',
		Warlock:
			'A spellcaster who draws power from a pact with a mysterious or dark patron, gaining unique abilities.',
		Wizard:
			'A scholarly arcane caster who learns spells through study and masters a broad range of magical effects.'
	};

	const level1 = classTable.levelProgression?.[0];

	return {
		id: className.toLowerCase(),
		name: className,
		description: classDescriptions[className] || `${className} class progression table`,

		level1Stats: {
			healthPoints: level1?.healthPoints || 0,
			staminaPoints: level1?.staminaPoints || 0,
			manaPoints: level1?.manaPoints || 0,
			skillPoints: level1?.skillPoints || 0,
			tradePoints: level1?.tradePoints || 0,
			maneuversKnown: level1?.maneuversKnown || 0,
			techniquesKnown: level1?.techniquesKnown || 0,
			cantripsKnown: level1?.cantripsKnown || 0,
			spellsKnown: level1?.spellsKnown || 0
		},

		levelProgression: classTable.levelProgression,
		level1Features: [],
		featureChoicesLvl1: []
	};
});

// Validate the combined data against the Zod schema.
// The parse method will throw a detailed error if validation fails.
const validatedData = classesDataSchema.parse(compatibleData);

// Export the validated data with the correct type.
export const classesData: IClassDefinition[] = validatedData;
