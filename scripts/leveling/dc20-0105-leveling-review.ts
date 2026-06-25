import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { format } from 'prettier';
import classesReport from '../../docs/migration/classes-v0105-report.json';
import {
	CLASS_PROGRESSION_DEFINITIONS,
	type ClassProgressionCategory
} from '../../src/lib/rulesdata/classes-data/progressions/classProgressionDefinitions';
import {
	allTalents,
	selectableTalents
} from '../../src/lib/rulesdata/classes-data/talents/talent.loader';
import { classesData } from '../../src/lib/rulesdata/loaders/class.loader';
import { CHARACTER_PATHS } from '../../src/lib/rulesdata/progression/paths/paths.data';

const SOURCE_PATH = resolve('docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const REPORT_PATH = resolve('docs/migration/leveling-v0105-review.json');
const CLASS_NAMES = [
	'Barbarian',
	'Bard',
	'Champion',
	'Cleric',
	'Commander',
	'Druid',
	'Hunter',
	'Monk',
	'Rogue',
	'Sorcerer',
	'Spellblade',
	'Warlock',
	'Wizard'
];
const SOURCE_TO_RUNTIME_CATEGORY: Record<string, ClassProgressionCategory> = {
	martial: 'fullMartial',
	spellcaster: 'fullCaster',
	hybrid: 'hybrid'
};
const EXPLICIT_PROGRESSION_CLASS_IDS = new Set(
	Object.entries(CLASS_PROGRESSION_DEFINITIONS)
		.filter(([, definition]) => Boolean(definition.explicitProgression))
		.map(([classId]) => classId)
);

const classIdFromName = (name: string) => name.toLowerCase();

function parseNumberCell(value: unknown): number {
	const match = String(value ?? '').match(/-?\d+/);
	return match ? Number(match[0]) : 0;
}

function normalizeName(value: string): string {
	return value
		.replace(/[’]/g, "'")
		.replace(/\s+'\s*s/g, "'s")
		.replace(/\s+/g, ' ')
		.trim()
		.toLowerCase();
}

function headingText(line: string): string | undefined {
	return line.match(/^##\s+(.+)$/)?.[1]?.trim();
}

function parseSourceTalents(markdown: string) {
	const lines = markdown.split(/\r?\n/);
	const talents = {
		general: [] as Array<{ name: string; sourceLine: number }>,
		class: {} as Record<string, Array<{ name: string; sourceLine: number }>>,
		multiclass: [] as Array<{ name: string; sourceLine: number }>
	};
	const classNameSet = new Set(CLASS_NAMES);
	let mode: 'none' | 'general' | 'class' | 'multiclass' = 'none';
	let currentClassId: string | undefined;

	for (let index = 0; index < lines.length; index += 1) {
		const title = headingText(lines[index]);
		if (!title) continue;

		if (title === 'General Talents') {
			mode = 'general';
			continue;
		}
		if (title === 'Class Talents') {
			mode = 'class';
			continue;
		}
		if (title === 'Multiclass Talents') {
			mode = 'multiclass';
			currentClassId = undefined;
			continue;
		}
		if (title === 'Character Paths') break;

		if (mode === 'class' && classNameSet.has(title)) {
			currentClassId = classIdFromName(title);
			talents.class[currentClassId] ??= [];
			continue;
		}

		if (mode === 'general') {
			const nextMeaningfulLine = lines
				.slice(index + 1, index + 5)
				.find((line) => line.trim() && !line.startsWith('<!-- page:'));
			if (nextMeaningfulLine?.trim() === 'General Talent') {
				talents.general.push({ name: title, sourceLine: index + 1 });
			}
			continue;
		}

		if (mode === 'class' && currentClassId) {
			talents.class[currentClassId].push({ name: title, sourceLine: index + 1 });
			continue;
		}

		if (mode === 'multiclass' && title.endsWith('Multiclass')) {
			talents.multiclass.push({ name: title, sourceLine: index + 1 });
		}
	}

	return talents;
}

function summarizeTalentDiffs(sourceTalents: ReturnType<typeof parseSourceTalents>) {
	const currentTalents = selectableTalents.filter((talent) => !talent.deprecated);
	const byCategory = {
		general: currentTalents.filter((talent) => talent.category === 'General'),
		multiclass: currentTalents.filter((talent) => talent.category === 'Multiclass'),
		class: currentTalents.filter((talent) => talent.category === 'Class')
	};

	const compareNames = (
		source: Array<{ name: string }>,
		runtime: Array<{ name: string; id: string }>
	) => {
		const sourceNames = new Set(source.map((talent) => normalizeName(talent.name)));
		const runtimeNames = new Set(runtime.map((talent) => normalizeName(talent.name)));
		return {
			missingInRuntime: [...sourceNames].filter((name) => !runtimeNames.has(name)).sort(),
			extraRuntimeCurrent: [...runtimeNames].filter((name) => !sourceNames.has(name)).sort()
		};
	};

	const classDiffs = Object.fromEntries(
		CLASS_NAMES.map((className) => {
			const classId = classIdFromName(className);
			const source = sourceTalents.class[classId] ?? [];
			const runtime = byCategory.class.filter(
				(talent) => talent.prerequisites?.classId === classId
			);
			return [
				classId,
				{
					sourceCount: source.length,
					runtimeCurrentCount: runtime.length,
					...compareNames(source, runtime)
				}
			];
		})
	);

	return {
		counts: {
			source: {
				general: sourceTalents.general.length,
				class: Object.values(sourceTalents.class).reduce((sum, talents) => sum + talents.length, 0),
				multiclass: sourceTalents.multiclass.length
			},
			runtimeCurrent: {
				general: byCategory.general.length,
				class: byCategory.class.length,
				multiclass: byCategory.multiclass.length
			},
			runtimeLegacyDeprecated: allTalents.filter((talent) => talent.deprecated).length
		},
		general: compareNames(sourceTalents.general, byCategory.general),
		multiclass: compareNames(sourceTalents.multiclass, byCategory.multiclass),
		class: classDiffs
	};
}

function expectedScheduleFromFeatures(features: string) {
	return {
		talents: /\bTalents?\b/.test(features) ? 1 : 0,
		pathProgression: /Path Progression/.test(features),
		ancestryPoints: parseNumberCell(features.match(/(\d+)\s+Ancestry Points/)?.[1]),
		subclassFeatureChoice: /Subclass/.test(features),
		classFeatureSlot: /Class (?:Features?|Expert Feature|Capstone Feature)/.test(features)
	};
}

function progressionShapeSignature(row: Record<string, unknown>) {
	return {
		healthPoints: row.healthPoints ?? 0,
		attributePoints: row.attributePoints ?? 0,
		skillPoints: row.skillPoints ?? 0,
		tradePoints: row.tradePoints ?? 0,
		staminaPoints: row.staminaPoints ?? 0,
		maneuversKnown: row.maneuversKnown ?? 0,
		manaPoints: row.manaPoints ?? 0,
		spellsKnown: row.spellsKnown ?? 0,
		talents: row.talents ?? 0,
		pathProgression: row.pathProgression ?? false,
		ancestryPoints: row.ancestryPoints ?? 0,
		subclassFeatureChoice: row.subclassFeatureChoice ?? false,
		classFeatureSlot: row.classFeatureSlot ?? false
	};
}

function compareSignatures(
	subjectId: string,
	baselineId: string,
	subjectRows: Array<{ level: number; signature: Record<string, unknown> }>,
	baselineRows: Array<{ level: number; signature: Record<string, unknown> }>
) {
	const baselineByLevel = new Map(baselineRows.map((row) => [row.level, row.signature]));
	const mismatches: string[] = [];

	for (const row of subjectRows) {
		const baseline = baselineByLevel.get(row.level);
		if (!baseline) {
			mismatches.push(`${subjectId} level ${row.level}: missing ${baselineId} baseline row.`);
			continue;
		}
		for (const [field, value] of Object.entries(baseline)) {
			if (row.signature[field] !== value) {
				mismatches.push(
					`${subjectId} level ${row.level}: ${field} differs from ${baselineId}; expected ${value}, got ${row.signature[field]}.`
				);
			}
		}
	}

	return mismatches;
}

function sourceRowsForShape(sourceClass: any) {
	if (sourceClass.sourceStatus !== 'detailed') return [];

	return sourceClass.classTable.rows.map((sourceRow: any) => ({
		level: parseNumberCell(sourceRow['Char Level']),
		signature: progressionShapeSignature({
			healthPoints: parseNumberCell(sourceRow['Health Points']),
			attributePoints: parseNumberCell(sourceRow['Attribute Points']),
			skillPoints: parseNumberCell(sourceRow['Skill Points']),
			tradePoints: parseNumberCell(sourceRow['Trade Points']),
			staminaPoints: parseNumberCell(sourceRow['Stamina Points']),
			maneuversKnown: parseNumberCell(sourceRow['Maneuvers Known']),
			manaPoints: parseNumberCell(sourceRow['Mana Points']),
			spellsKnown: parseNumberCell(sourceRow['Spells Known']),
			...expectedScheduleFromFeatures(sourceRow.Features ?? '')
		})
	}));
}

function runtimeRowsForShape(runtimeClass: (typeof classesData)[number]) {
	return runtimeClass.levelProgression.map((row) => ({
		level: row.level,
		signature: progressionShapeSignature({
			healthPoints: row.healthPoints,
			attributePoints: row.attributePoints,
			skillPoints: row.skillPoints,
			tradePoints: row.tradePoints,
			staminaPoints: row.staminaPoints,
			maneuversKnown: row.maneuversKnown,
			manaPoints: row.manaPoints,
			spellsKnown: row.spellsKnown,
			talents: row.gains?.talents ?? 0,
			pathProgression: Boolean(row.gains?.pathProgression || row.gains?.pathPoints),
			ancestryPoints: row.gains?.ancestryPoints ?? 0,
			subclassFeatureChoice: Boolean(row.gains?.subclassFeatureChoice),
			classFeatureSlot: (row.gains?.classFeatures?.length ?? 0) > 0
		})
	}));
}

function validateCategoryConformance() {
	const runtimeById = new Map(classesData.map((classData) => [classData.id, classData]));
	const categories = ['martial', 'spellcaster', 'hybrid'];

	return Object.fromEntries(
		categories.map((category) => {
			const sourceClasses = classesReport.classes.filter((sourceClass: any) => {
				return sourceClass.category === category;
			});
			const detailedSourceClasses = sourceClasses.filter(
				(sourceClass: any) => sourceClass.sourceStatus === 'detailed'
			);
			const runtimeClasses = sourceClasses
				.map((sourceClass: any) => runtimeById.get(sourceClass.id))
				.filter(Boolean) as Array<(typeof classesData)[number]>;
			const defaultRuntimeClasses = runtimeClasses.filter(
				(runtimeClass) => !EXPLICIT_PROGRESSION_CLASS_IDS.has(runtimeClass.id)
			);
			const sourceBaseline = detailedSourceClasses[0];
			const runtimeBaseline = defaultRuntimeClasses[0];
			const sourceMismatches =
				sourceBaseline && detailedSourceClasses.length > 1
					? detailedSourceClasses.flatMap((sourceClass: any) =>
							sourceClass.id === sourceBaseline.id
								? []
								: compareSignatures(
										sourceClass.id,
										sourceBaseline.id,
										sourceRowsForShape(sourceClass),
										sourceRowsForShape(sourceBaseline)
									)
						)
					: [];
			const runtimeMismatches =
				runtimeBaseline && defaultRuntimeClasses.length > 1
					? defaultRuntimeClasses.flatMap((runtimeClass) =>
							runtimeClass.id === runtimeBaseline.id
								? []
								: compareSignatures(
										runtimeClass.id,
										runtimeBaseline.id,
										runtimeRowsForShape(runtimeClass),
										runtimeRowsForShape(runtimeBaseline)
									)
						)
					: [];

			return [
				category,
				{
					sourceBaselineClassId: sourceBaseline?.id ?? null,
					runtimeBaselineClassId: runtimeBaseline?.id ?? null,
					sourceDetailedClassIds: detailedSourceClasses.map((sourceClass: any) => sourceClass.id),
					runtimeClassIds: runtimeClasses.map((runtimeClass) => runtimeClass.id),
					runtimeDefaultClassIds: defaultRuntimeClasses.map((runtimeClass) => runtimeClass.id),
					runtimeExplicitClassIds: runtimeClasses
						.filter((runtimeClass) => EXPLICIT_PROGRESSION_CLASS_IDS.has(runtimeClass.id))
						.map((runtimeClass) => runtimeClass.id),
					sourceSharedShapeValid: sourceMismatches.length === 0,
					runtimeSharedShapeValid: runtimeMismatches.length === 0,
					sourceMismatchCount: sourceMismatches.length,
					runtimeMismatchCount: runtimeMismatches.length,
					sourceMismatches,
					runtimeMismatches
				}
			];
		})
	);
}

function summarizeProgressionModel() {
	const sourceClassIds = classesReport.classes.map((sourceClass: any) => sourceClass.id);
	const definitionClassIds = Object.keys(CLASS_PROGRESSION_DEFINITIONS);
	const classificationMismatches = classesReport.classes.flatMap((sourceClass: any) => {
		const definition =
			CLASS_PROGRESSION_DEFINITIONS[sourceClass.id as keyof typeof CLASS_PROGRESSION_DEFINITIONS];
		if (!definition) return [`${sourceClass.id}: missing runtime progression definition.`];

		const expectedCategory = SOURCE_TO_RUNTIME_CATEGORY[sourceClass.category];
		if (definition.category !== expectedCategory) {
			return [
				`${sourceClass.id}: expected progression category ${expectedCategory}, got ${definition.category}.`
			];
		}

		return [];
	});

	return {
		defaultResolution:
			'Runtime resolves class progression from class progression category unless the class provides a full explicit progression table.',
		classificationMismatches,
		missingDefinitions: sourceClassIds.filter(
			(classId: string) => !definitionClassIds.includes(classId)
		),
		extraDefinitions: definitionClassIds.filter((classId) => !sourceClassIds.includes(classId)),
		explicitProgressionClassIds: [...EXPLICIT_PROGRESSION_CLASS_IDS].sort(),
		categoryByClassId: Object.fromEntries(
			Object.entries(CLASS_PROGRESSION_DEFINITIONS).map(([classId, definition]) => [
				classId,
				definition.category
			])
		)
	};
}

function compareProgressionTables() {
	const runtimeById = new Map(classesData.map((classData) => [classData.id, classData]));
	const mismatches: string[] = [];
	const sourceOnlyNotes: string[] = [];
	const classes = classesReport.classes.map((sourceClass: any) => {
		const runtime = runtimeById.get(sourceClass.id);
		if (!runtime) {
			mismatches.push(`${sourceClass.id}: missing runtime class progression.`);
			return { id: sourceClass.id, name: sourceClass.name, status: 'missing-runtime' };
		}

		if (sourceClass.sourceStatus !== 'detailed') {
			sourceOnlyNotes.push(
				`${sourceClass.id}: source report status is ${sourceClass.sourceStatus}.`
			);
			return {
				id: sourceClass.id,
				name: sourceClass.name,
				status: 'source-table-unavailable',
				sourceStatus: sourceClass.sourceStatus
			};
		}

		const rowComparisons = sourceClass.classTable.rows.map((sourceRow: any) => {
			const level = parseNumberCell(sourceRow['Char Level']);
			const runtimeRow = runtime.levelProgression.find((row) => row.level === level);
			const expected = {
				healthPoints: parseNumberCell(sourceRow['Health Points']),
				attributePoints: parseNumberCell(sourceRow['Attribute Points']),
				skillPoints: parseNumberCell(sourceRow['Skill Points']),
				tradePoints: parseNumberCell(sourceRow['Trade Points']),
				staminaPoints: parseNumberCell(sourceRow['Stamina Points']),
				maneuversKnown: parseNumberCell(sourceRow['Maneuvers Known']),
				manaPoints: parseNumberCell(sourceRow['Mana Points']),
				spellsKnown: parseNumberCell(sourceRow['Spells Known']),
				...expectedScheduleFromFeatures(sourceRow.Features ?? '')
			};
			const actual = {
				healthPoints: runtimeRow?.healthPoints ?? 0,
				attributePoints: runtimeRow?.attributePoints ?? 0,
				skillPoints: runtimeRow?.skillPoints ?? 0,
				tradePoints: runtimeRow?.tradePoints ?? 0,
				staminaPoints: runtimeRow?.staminaPoints ?? 0,
				maneuversKnown: runtimeRow?.maneuversKnown ?? 0,
				manaPoints: runtimeRow?.manaPoints ?? 0,
				spellsKnown: runtimeRow?.spellsKnown ?? 0,
				talents: runtimeRow?.gains?.talents ?? 0,
				pathProgression: Boolean(
					runtimeRow?.gains?.pathProgression || runtimeRow?.gains?.pathPoints
				),
				ancestryPoints: runtimeRow?.gains?.ancestryPoints ?? 0,
				subclassFeatureChoice: Boolean(runtimeRow?.gains?.subclassFeatureChoice),
				classFeatureCount: runtimeRow?.gains?.classFeatures?.length ?? 0
			};

			const rowMismatches = Object.entries(expected)
				.filter(([key, value]) => {
					if (key === 'classFeatureSlot') return false;
					return actual[key as keyof typeof actual] !== value;
				})
				.map(([key, value]) => ({
					field: key,
					expected: value,
					actual: actual[key as keyof typeof actual]
				}));

			if (expected.classFeatureSlot && actual.classFeatureCount === 0) {
				sourceOnlyNotes.push(
					`${sourceClass.id} level ${level}: source has a class feature slot, runtime has no class feature ID. Level 9 capstone slots are intentionally source-only until mechanics are published.`
				);
			}

			for (const mismatch of rowMismatches) {
				mismatches.push(
					`${sourceClass.id} level ${level}: ${mismatch.field} expected ${mismatch.expected}, got ${mismatch.actual}.`
				);
			}

			return {
				level,
				sourceFeatures: sourceRow.Features ?? '',
				expected,
				actual,
				mismatches: rowMismatches
			};
		});

		return {
			id: sourceClass.id,
			name: sourceClass.name,
			status: rowComparisons.some((row: any) => row.mismatches.length) ? 'mismatch' : 'ok',
			rows: rowComparisons
		};
	});

	return {
		mismatchCount: mismatches.length,
		mismatches,
		sourceOnlyNotes: [...new Set(sourceOnlyNotes)].sort(),
		classes
	};
}

function summarizePaths() {
	const sourceExtractedRules = {
		pathProgressionLevels: [2, 4, 6, 8],
		martialPath:
			'Combat Training: Weapons; Maneuvers: learn 1 Maneuver; Stamina Points: gain 1 maximum Stamina Point.',
		spellcasterPath:
			'Combat Training: Spell Focuses; Spells Known: learn 1 Spell; Mana Points: gain 3 maximum Mana Points.',
		crossPathRules: [
			'Classes lacking Stamina Regen gain Spellcaster Stamina Regen when first choosing Martial Path.',
			'Classes lacking a Spell List gain a Spell List of choice when first choosing Spellcaster Path.'
		],
		parserNote:
			'The clean source references path tables but exposes path benefits mostly as prose. Runtime uses explicit four-tier path tables; keep under human review when auditing path math.'
	};

	return {
		sourceExtractedRules,
		runtime: CHARACTER_PATHS.map((path) => ({
			id: path.id,
			name: path.name,
			progression: path.progression,
			specialRules: path.specialRules ?? []
		}))
	};
}

async function createReport() {
	const source = await readFile(SOURCE_PATH, 'utf8');
	const sourceTalents = parseSourceTalents(source);
	const talentReview = summarizeTalentDiffs(sourceTalents);
	const progressionReview = compareProgressionTables();
	const categoryConformance = validateCategoryConformance();
	const progressionModel = summarizeProgressionModel();
	const categoryRuntimeMismatches = Object.entries(categoryConformance).flatMap(
		([category, review]: [string, any]) =>
			review.runtimeMismatches.map((message: string) => `${category}: ${message}`)
	);
	const categorySourceMismatches = Object.entries(categoryConformance).flatMap(
		([category, review]: [string, any]) =>
			review.sourceMismatches
				.filter((message: string) => {
					const subjectClassId = message.split(' ')[0];
					return !EXPLICIT_PROGRESSION_CLASS_IDS.has(subjectClassId);
				})
				.map((message: string) => `${category}: ${message}`)
	);

	return {
		rulesVersion: 'dc20-0.10.5',
		scope: 'leveling-talents-path-points-progression',
		generatedFrom: {
			source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
			classReport: 'docs/migration/classes-v0105-report.json'
		},
		knownGaps: [
			{
				id: 'actual-level-split-multiclassing',
				status: 'not-implemented',
				description:
					'Current character state has one primary classId and one total level. Multiclass talents can grant features, but the app does not model per-class levels such as Barbarian 1 / Wizard 1.'
			}
		],
		talents: talentReview,
		paths: summarizePaths(),
		progressionModel,
		categoryConformance,
		progression: progressionReview,
		findings: [
			...progressionModel.classificationMismatches.map((message) => ({
				severity: 'error',
				message
			})),
			...progressionModel.missingDefinitions.map((classId: string) => ({
				severity: 'error',
				message: `${classId}: missing runtime progression definition.`
			})),
			...progressionModel.extraDefinitions.map((classId: string) => ({
				severity: 'error',
				message: `${classId}: runtime progression definition has no source class.`
			})),
			...progressionReview.mismatches.map((message) => ({ severity: 'error', message })),
			...categoryRuntimeMismatches.map((message) => ({
				severity: 'review',
				message: `Runtime category progression variant: ${message}`
			})),
			...categorySourceMismatches.map((message) => ({
				severity: 'review',
				message: `Source class-specific progression variant: ${message}`
			})),
			...progressionReview.sourceOnlyNotes.map((message) => ({ severity: 'review', message })),
			...(talentReview.general.missingInRuntime.length
				? [
						{
							severity: 'error',
							message: `Missing current General talents: ${talentReview.general.missingInRuntime.join(', ')}.`
						}
					]
				: []),
			...(talentReview.multiclass.missingInRuntime.length
				? [
						{
							severity: 'error',
							message: `Missing current Multiclass talents: ${talentReview.multiclass.missingInRuntime.join(', ')}.`
						}
					]
				: [])
		]
	};
}

const serialize = (value: unknown) =>
	format(JSON.stringify(value), {
		parser: 'json',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100
	});

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const report = await serialize(await createReport());

	if (args.has('--check')) {
		const current = await readFile(REPORT_PATH, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated leveling review report is stale. Run npm run leveling:review:generate:0105.'
			);
		}
		console.log('Validated leveling review report.');
		return;
	}

	if (args.has('--write')) {
		await mkdir(dirname(REPORT_PATH), { recursive: true });
		await writeFile(REPORT_PATH, report);
		console.log(`Generated leveling review report at ${REPORT_PATH}.`);
		return;
	}

	console.log(report.trim());
}

runCli().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
