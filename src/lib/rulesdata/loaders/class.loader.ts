import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';

type LegacyLevelEntry = {
	level: number;
	healthPoints?: number;
	attributePoints?: number;
	skillPoints?: number;
	tradePoints?: number;
	staminaPoints?: number;
	maneuversKnown?: number;
	techniquesKnown?: number;
	manaPoints?: number;
	cantripsKnown?: number;
	spellsKnown?: number;
	features?: string;
};

interface ProgressionLevel {
	level: number;
	gainedHealth?: number;
	gainedAttributePoints?: number;
	gainedSkillPoints?: number;
	gainedTradePoints?: number;
	gainedStaminaPoints?: number;
	gainedManeuversKnown?: number;
	gainedTechniquesKnown?: number;
	gains?: {
		classFeatures?: string[];
		talents?: number;
		pathPoints?: number;
		ancestryPoints?: number;
		subclassFeatureChoice?: boolean;
		epicBoon?: boolean;
	};
}

const classDescriptions: Record<string, string> = {
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

const tableModules = import.meta.glob('../classes-data/tables/*_table.json', { eager: true });
const progressionModules = import.meta.glob('../classes-data/progressions/*.progression.ts', { eager: true });

const progressionDataByKey: Record<string, ProgressionLevel[]> = {};

for (const [filePath, module] of Object.entries(progressionModules)) {
	const fileName = filePath.split('/').pop();
	if (!fileName) continue;
	const match = fileName.match(/^(.*)\.progression\.ts$/);
	if (!match) continue;
	const key = match[1];
	const exportName = `${key}Progression`;
	const progression = (module as Record<string, unknown>)[exportName];
	if (Array.isArray(progression)) {
		progressionDataByKey[key] = progression as ProgressionLevel[];
	}
}

function formatGains(gains?: ProgressionLevel['gains'], legacy?: string): string {
	if (!gains) return legacy ?? '';
	const parts: string[] = [];
	const featureCount = gains.classFeatures?.length ?? 0;
	if (featureCount > 0) {
		parts.push(featureCount === 1 ? 'Class Feature' : 'Class Features');
	}
	if (gains.talents) {
		parts.push(gains.talents === 1 ? 'Talent' : `${gains.talents} Talents`);
	}
	if (gains.pathPoints) {
		parts.push(gains.pathPoints === 1 ? '1 Path Point' : `${gains.pathPoints} Path Points`);
	}
	if (gains.ancestryPoints) {
		parts.push(`${gains.ancestryPoints} Ancestry Points`);
	}
	if (gains.subclassFeatureChoice) {
		parts.push('Subclass Feature');
	}
	if (gains.epicBoon) {
		parts.push('Epic Boon');
	}
	if (parts.length === 0) {
		return legacy ?? '';
	}
	return parts.join(', ');
}

const tableData = Object.values(tableModules).map((module: any) => module.default);

const compatibleData = tableData.map((classTable: any) => {
	const className: string = classTable.className;
	const classKey = className?.toLowerCase() ?? '';
	const progression = progressionDataByKey[classKey] ?? [];

	const buildLevelEntry = (legacyLevel: LegacyLevelEntry) => {
		const newLevel = progression.find((p) => p.level === legacyLevel.level);
		const gains = newLevel?.gains;
		
		console.log(`🔧 Building level ${legacyLevel.level}:`, {
			foundNewLevel: !!newLevel,
			hasGains: !!gains,
			gainsValue: JSON.stringify(gains)
		});
		
		return {
			level: legacyLevel.level,
			healthPoints: newLevel?.gainedHealth ?? legacyLevel.healthPoints ?? 0,
			attributePoints: newLevel?.gainedAttributePoints ?? legacyLevel.attributePoints ?? 0,
			skillPoints: newLevel?.gainedSkillPoints ?? legacyLevel.skillPoints ?? 0,
			tradePoints: newLevel?.gainedTradePoints ?? legacyLevel.tradePoints ?? 0,
			staminaPoints: newLevel?.gainedStaminaPoints ?? legacyLevel.staminaPoints ?? 0,
			maneuversKnown: newLevel?.gainedManeuversKnown ?? legacyLevel.maneuversKnown ?? 0,
			techniquesKnown: newLevel?.gainedTechniquesKnown ?? legacyLevel.techniquesKnown ?? 0,
			manaPoints: legacyLevel.manaPoints ?? 0,
			cantripsKnown: legacyLevel.cantripsKnown ?? 0,
			spellsKnown: legacyLevel.spellsKnown ?? 0,
			features: formatGains(gains, legacyLevel.features),
			gains // Include structured gains for new calculator
		};
	};

	const levelProgression = (classTable.levelProgression as LegacyLevelEntry[]).map(buildLevelEntry);
	const level1 = levelProgression[0];

	return {
		id: classKey,
		name: className,
		description: classDescriptions[className] || `${className} class progression table`,

		level1Stats: {
			healthPoints: level1?.healthPoints ?? 0,
			staminaPoints: level1?.staminaPoints ?? 0,
			manaPoints: level1?.manaPoints ?? 0,
			skillPoints: level1?.skillPoints ?? 0,
			tradePoints: level1?.tradePoints ?? 0,
			maneuversKnown: level1?.maneuversKnown ?? 0,
			techniquesKnown: level1?.techniquesKnown ?? 0,
			cantripsKnown: level1?.cantripsKnown ?? 0,
			spellsKnown: level1?.spellsKnown ?? 0
		},

		levelProgression,
		level1Features: [],
		featureChoicesLvl1: []
	};
});

console.log('🔍 BEFORE ZOD PARSE - Sample Barbarian Level 2:', 
	compatibleData.find((c: any) => c.id === 'barbarian')?.levelProgression?.find((l: any) => l.level === 2)
);

const validatedData = classesDataSchema.parse(compatibleData);

console.log('🔍 AFTER ZOD PARSE - Sample Barbarian Level 2:', 
	validatedData.find((c: any) => c.id === 'barbarian')?.levelProgression?.find((l: any) => l.level === 2)
);

export const classesData: IClassDefinition[] = validatedData;
