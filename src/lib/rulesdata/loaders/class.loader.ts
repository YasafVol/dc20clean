import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';



interface ProgressionLevel {
	level: number;
	gainedHealth?: number;
	gainedAttributePoints?: number;
	gainedSkillPoints?: number;
	gainedTradePoints?: number;
	gainedStaminaPoints?: number;
	gainedManeuversKnown?: number;
	gainedManaPoints?: number;
	gainedCantripsKnown?: number;
	gainedSpellsKnown?: number;
	gains?: {
		classFeatures?: string[];
		talents?: number;
		pathPoints?: number;
		ancestryPoints?: number;
		subclassFeatureChoice?: boolean;
		epicBoon?: boolean;
	};
}

// Class metadata - names and descriptions
const CLASS_METADATA: Record<string, { name: string; description: string }> = {
	barbarian: {
		name: 'Barbarian',
		description:
			'A fierce warrior who channels primal rage to gain strength and resist harm in combat.'
	},
	bard: {
		name: 'Bard',
		description:
			'A charismatic performer whose songs and stories inspire allies and manipulate enemies through magic.'
	},
	champion: {
		name: 'Champion',
		description:
			'A martial master focused on critical strikes, resilience, and battlefield leadership.'
	},
	cleric: {
		name: 'Cleric',
		description:
			'A divine spellcaster empowered by a god to heal, protect, and smite enemies with holy might.'
	},
	commander: {
		name: 'Commander',
		description:
			'A tactical leader who inspires and directs allies with strategic maneuvers and commanding presence.'
	},
	druid: {
		name: 'Druid',
		description:
			'A nature-bound spellcaster who wields primal magic and transforms into beasts to protect the wilds.'
	},
	hunter: {
		name: 'Hunter',
		description:
			'A skilled tracker and marksman who specializes in slaying monsters and surviving the wilderness.'
	},
	monk: {
		name: 'Monk',
		description:
			'A disciplined martial artist who channels inner energy for rapid strikes and supernatural movement.'
	},

	rogue: {
		name: 'Rogue',
		description:
			'A stealthy and cunning adventurer who excels in ambushes, trickery, and precise strikes.'
	},
	sorcerer: {
		name: 'Sorcerer',
		description:
			'A natural-born spellcaster who harnesses raw arcane or elemental power from an innate source.'
	},
	spellblade: {
		name: 'Spellblade',
		description:
			'A warrior-mage hybrid who combines martial prowess with arcane magic to enchant weapons and defend.'
	},
	warlock: {
		name: 'Warlock',
		description:
			'A spellcaster who draws power from a pact with a mysterious or dark patron, gaining unique abilities.'
	},
	wizard: {
		name: 'Wizard',
		description:
			'A scholarly arcane caster who learns spells through study and masters a broad range of magical effects.'
	}
};

const progressionModules = import.meta.glob('../classes-data/progressions/*.progression.ts', {
	eager: true
});

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

// Build class data from progression files
const compatibleData = Object.entries(progressionDataByKey)
	.map(([classKey, progression]) => {
		const metadata = CLASS_METADATA[classKey];
		if (!metadata) {
			console.warn(`Missing metadata for class: ${classKey}`);
			return null;
		}

		const buildLevelEntry = (progressionLevel: ProgressionLevel) => {
			const gains = progressionLevel.gains;

			return {
				level: progressionLevel.level,
				healthPoints: progressionLevel.gainedHealth ?? 0,
				attributePoints: progressionLevel.gainedAttributePoints ?? 0,
				skillPoints: progressionLevel.gainedSkillPoints ?? 0,
				tradePoints: progressionLevel.gainedTradePoints ?? 0,
				staminaPoints: progressionLevel.gainedStaminaPoints ?? 0,
				maneuversKnown: progressionLevel.gainedManeuversKnown ?? 0,
				manaPoints: progressionLevel.gainedManaPoints ?? 0,
				cantripsKnown: progressionLevel.gainedCantripsKnown ?? 0,
				spellsKnown: progressionLevel.gainedSpellsKnown ?? 0,
				features: formatGains(gains),
				gains // Include structured gains for new calculator
			};
		};

		const levelProgression = progression.map(buildLevelEntry);
		const level1 = levelProgression[0];

		return {
			id: classKey,
			name: metadata.name,
			description: metadata.description,

			level1Stats: {
				healthPoints: level1?.healthPoints ?? 0,
				staminaPoints: level1?.staminaPoints ?? 0,
				manaPoints: level1?.manaPoints ?? 0,
				skillPoints: level1?.skillPoints ?? 0,
				tradePoints: level1?.tradePoints ?? 0,
				maneuversKnown: level1?.maneuversKnown ?? 0,
				cantripsKnown: level1?.cantripsKnown ?? 0,
				spellsKnown: level1?.spellsKnown ?? 0
			},

			levelProgression,
			level1Features: [],
			featureChoicesLvl1: []
		};
	})
	.filter((item): item is NonNullable<typeof item> => Boolean(item)); // Remove any null entries

// Spell restrictions configuration
const CLASS_SPELL_CONFIG: Record<
	string,
	{ allowedSources?: string[]; allowedSchools?: string[]; allowedTags?: string[] }
> = {
	barbarian: {
		allowedSources: [], // Barbarians don't cast spells by default
		allowedSchools: []
	},
	bard: {
		allowedSources: ['Arcane'],
		allowedSchools: ['Enchantment', 'Illusion', 'Transmutation'],
		allowedTags: ['Sonic', 'Performance']
	},
	cleric: {
		allowedSources: ['Divine'],
		allowedSchools: [
			'Divination',
			'Enchantment',
			'Nullification',
			'Transmutation',
			'Astromancy',
			'Conjuration',
			'Elemental',
			'Illusion',
			'Invocation'
		]
	},
	druid: {
		allowedSources: ['Primal'],
		allowedSchools: [
			'Conjuration',
			'Elemental',
			'Transmutation',
			'Astromancy',
			'Divination',
			'Enchantment',
			'Illusion',
			'Invocation',
			'Nullification'
		]
	},
	sorcerer: {
		allowedSources: ['Arcane'],
		allowedSchools: [
			'Elemental',
			'Invocation',
			'Transmutation',
			'Astromancy',
			'Conjuration',
			'Divination',
			'Enchantment',
			'Illusion',
			'Nullification'
		]
	},
	warlock: {
		allowedSources: ['Arcane'],
		allowedSchools: [] // Choose 3 via choices (will be handled by Global Expansion logic)
	},
	wizard: {
		allowedSources: ['Arcane'],
		allowedSchools: [
			'Astromancy',
			'Conjuration',
			'Divination',
			'Elemental',
			'Enchantment',
			'Illusion',
			'Invocation',
			'Nullification',
			'Transmutation'
		]
	},
	spellblade: {
		allowedSources: ['Arcane'],
		allowedSchools: [], // Choose 2 via choices
		allowedTags: ['Weapon', 'Ward']
	},
	paladin: {
		allowedSources: ['Divine'],
		allowedSchools: [
			'Abjuration', // Mapping old school names if present, or new ones
			'Divination',
			'Enchantment',
			'Nullification',
			'Transmutation',
			'Astromancy',
			'Conjuration',
			'Elemental',
			'Illusion',
			'Invocation'
		]
	},
	ranger: {
		allowedSources: ['Primal'],
		allowedSchools: [
			'Conjuration',
			'Divination',
			'Transmutation',
			'Astromancy',
			'Elemental',
			'Enchantment',
			'Illusion',
			'Invocation',
			'Nullification'
		]
	},
	hunter: {
		allowedSources: ['Primal'],
		allowedSchools: ['Conjuration', 'Divination', 'Transmutation'],
		allowedTags: []
	},
	monk: { allowedSources: [], allowedSchools: [] },
	rogue: { allowedSources: [], allowedSchools: [] },
	fighter: { allowedSources: [], allowedSchools: [] },
	champion: { allowedSources: [], allowedSchools: [] },
	commander: { allowedSources: [], allowedSchools: [] }
};

const finalData = compatibleData.map((data) => {
	const spellConfig = CLASS_SPELL_CONFIG[data.id.toLowerCase()];
	return {
		...data,
		spellRestrictions: spellConfig
			? {
				allowedSources: spellConfig.allowedSources,
				allowedSchools: spellConfig.allowedSchools,
				allowedTags: spellConfig.allowedTags
			}
			: undefined
	};
});

const validatedData = classesDataSchema.parse(finalData);

export const classesData: IClassDefinition[] = validatedData;
