#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/classes-v0105-report.json');

const CLASS_CATEGORIES = {
	martial: ['Barbarian', 'Champion', 'Commander', 'Hunter', 'Monk', 'Rogue'],
	spellcaster: ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard'],
	hybrid: ['Spellblade']
};

const DETAILED_CLASS_NAMES = [
	'Barbarian',
	'Bard',
	'Champion',
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

const CORE_CLASS_NAMES = [
	...CLASS_CATEGORIES.martial,
	...CLASS_CATEGORIES.spellcaster,
	...CLASS_CATEGORIES.hybrid
].sort();

const UTILITY_FEATURE_HEADINGS = new Set([
	'Class',
	'Talent',
	'Path Progression',
	'Ancestry Points',
	'Subclass',
	'Subclasses'
]);

const slugify = (value) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const trimBlankLines = (lines) => {
	let start = 0;
	let end = lines.length;
	while (start < end && !lines[start].trim()) start += 1;
	while (end > start && !lines[end - 1].trim()) end -= 1;
	return lines.slice(start, end);
};

const withoutPageMarkers = (lines) =>
	lines.filter((line) => !/^<!-- page: \d+ -->$/.test(line.trim()));

const normalizeDescription = (lines) =>
	trimBlankLines(withoutPageMarkers(lines))
		.join('\n')
		.replace(/\n{2,}/g, '\n\n')
		.trim();

const headingText = (line) => line.replace(/^##\s+/, '').trim();

function findLine(lines, predicate, context) {
	const index = lines.findIndex(predicate);
	if (index < 0) throw new Error(`Could not locate ${context}.`);
	return index;
}

function getClassCategory(name) {
	for (const [category, names] of Object.entries(CLASS_CATEGORIES)) {
		if (names.includes(name)) return category;
	}
	return null;
}

function parseMarkdownTable(lines, startIndex) {
	const tableLines = [];
	for (let index = startIndex; index < lines.length; index += 1) {
		if (!lines[index].trim().startsWith('|')) break;
		tableLines.push(lines[index].trim());
	}

	if (tableLines.length < 3) return { columns: [], rows: [] };

	const splitRow = (line) =>
		line
			.replace(/^\|/, '')
			.replace(/\|$/, '')
			.split('|')
			.map((cell) => cell.trim());
	const columns = splitRow(tableLines[0]);
	const rows = tableLines.slice(2).map((line) => {
		const values = splitRow(line);
		return Object.fromEntries(columns.map((column, index) => [column, values[index] ?? '']));
	});

	return { columns, rows };
}

function findClassChapter(lines) {
	const firstDetailedClass = findLine(
		lines,
		(line, index) =>
			line === '## Barbarian' &&
			lines
				.slice(index + 1, index + 25)
				.some((lookahead) => lookahead === '## Barbarian Class Table'),
		'detailed class chapter start'
	);
	const end = findLine(
		lines,
		(line, index) => index > firstDetailedClass && line === '## 0.10.5 Changelog',
		'detailed class chapter end'
	);
	return { start: firstDetailedClass, end };
}

function findDetailedClassBlocks(lines, chapter) {
	const starts = DETAILED_CLASS_NAMES.map((name) => {
		const index = lines.findIndex(
			(line, lineIndex) =>
				lineIndex >= chapter.start && lineIndex < chapter.end && line === `## ${name}`
		);
		if (index < 0) throw new Error(`Missing detailed class heading: ${name}.`);
		return { name, index };
	}).sort((a, b) => a.index - b.index);

	return starts.map((start, index) => ({
		name: start.name,
		startLine: start.index + 1,
		endLine: (starts[index + 1]?.index ?? chapter.end) + 1,
		lines: lines.slice(start.index, starts[index + 1]?.index ?? chapter.end)
	}));
}

function extractSectionLines(blockLines, startPredicate, endPredicate) {
	const start = blockLines.findIndex(startPredicate);
	if (start < 0) return [];
	let end = blockLines.length;
	for (let index = start + 1; index < blockLines.length; index += 1) {
		if (endPredicate(blockLines[index], index)) {
			end = index;
			break;
		}
	}
	return blockLines.slice(start + 1, end);
}

function parseStartingEquipment(block) {
	const lines = extractSectionLines(
		block.lines,
		(line) => line === '## Starting Equipment',
		(line) => /^## .+(?:Martial|Spellcasting) Path$/.test(line)
	);
	const equipment = {};

	for (const line of withoutPageMarkers(lines)) {
		const match = line.trim().match(/^([^:]+):\s*(.+)$/);
		if (!match) continue;
		equipment[slugify(match[1])] = {
			label: match[1].trim(),
			text: match[2].trim()
		};
	}

	return equipment;
}

function parsePath(block) {
	const pathIndex = block.lines.findIndex((line) =>
		new RegExp(`^## ${block.name} (Martial|Spellcasting) Path$`).test(line)
	);
	if (pathIndex < 0) return null;

	const pathType = block.lines[pathIndex].includes('Martial') ? 'martial' : 'spellcasting';
	const body = extractSectionLines(
		block.lines,
		(_, index) => index === pathIndex,
		(line) => line === `## ${block.name} Features` || line === `## ${block.name} Class Features`
	);

	const fields = {};
	for (const line of withoutPageMarkers(body)) {
		const match = line.trim().match(/^([^:]+):\s*(.+)$/);
		if (!match) continue;
		fields[slugify(match[1])] = {
			label: match[1].trim(),
			text: match[2].trim()
		};
	}

	return { type: pathType, fields };
}

function parseClassTable(block) {
	const tableHeadingIndex = block.lines.findIndex((line) => {
		const text = line.replace(/^##\s+/, '').trim();
		return text === `${block.name} Class Table`;
	});
	if (tableHeadingIndex < 0) {
		throw new Error(`${block.name}: missing class table.`);
	}

	const tableStart = block.lines.findIndex(
		(line, index) => index > tableHeadingIndex && line.trim().startsWith('|')
	);
	const table = parseMarkdownTable(block.lines, tableStart);

	return {
		columns: table.columns,
		rows: table.rows,
		provenance: {
			startLine: block.startLine + tableStart,
			endLine: block.startLine + tableStart + table.rows.length + 1
		}
	};
}

function parseSubclassChoices(coreLines, blockStartLine) {
	const subclassHeadingIndex = coreLines.findIndex((line) => line === '## Subclass');
	if (subclassHeadingIndex < 0) return [];

	const choices = [];
	for (let index = subclassHeadingIndex + 1; index < coreLines.length; index += 1) {
		const line = coreLines[index].trim();
		if (/^## /.test(line)) break;
		const match = line.match(/^-\s+(.+)$/);
		if (match) {
			choices.push({
				id: slugify(match[1]),
				name: match[1],
				sourceLine: blockStartLine + index
			});
		}
	}
	return choices;
}

function parseCoreFeatures(block) {
	const start = block.lines.findIndex(
		(line) => line === `## ${block.name} Features` || line === `## ${block.name} Class Features`
	);
	if (start < 0) throw new Error(`${block.name}: missing features heading.`);

	const subclassesIndex = block.lines.findIndex(
		(line, index) => index > start && line === '## Subclasses'
	);
	const coreLines = block.lines.slice(
		start + 1,
		subclassesIndex < 0 ? block.lines.length : subclassesIndex
	);
	const features = [];
	const levelFeatureCounts = new Map();
	let currentLevel = null;

	for (const [offset, rawLine] of coreLines.entries()) {
		if (!/^## /.test(rawLine)) continue;
		const title = headingText(rawLine);
		const levelMatch = title.match(/^Level\s+(\d+)/);
		if (levelMatch) {
			currentLevel = Number(levelMatch[1]);
			continue;
		}
		if (!currentLevel) continue;
		if (UTILITY_FEATURE_HEADINGS.has(title)) continue;

		if (currentLevel === 5 && (levelFeatureCounts.get(5) ?? 0) > 0) {
			continue;
		}
		if (![1, 2, 5, 9].includes(currentLevel)) continue;

		const isFlavor = /\(Flavor Feature\)$/i.test(title);
		const name = title.replace(/\s+\(Flavor Feature\)$/i, '').trim();
		features.push({
			id: slugify(name),
			name,
			level: currentLevel,
			isFlavor,
			sourceLine: block.startLine + start + 1 + offset
		});
		levelFeatureCounts.set(currentLevel, (levelFeatureCounts.get(currentLevel) ?? 0) + 1);
	}

	return {
		features,
		subclassChoices: parseSubclassChoices(coreLines, block.startLine + start + 1)
	};
}

function parseDetailedClassBlock(block) {
	const tableHeadingIndex = block.lines.findIndex((line) => {
		const text = line.replace(/^##\s+/, '').trim();
		return text === `${block.name} Class Table`;
	});
	const description = normalizeDescription(block.lines.slice(1, tableHeadingIndex));
	const parsedFeatures = parseCoreFeatures(block);

	return {
		id: slugify(block.name),
		name: block.name,
		category: getClassCategory(block.name),
		sourceStatus: 'detailed',
		description,
		classTable: parseClassTable(block),
		startingEquipment: parseStartingEquipment(block),
		path: parsePath(block),
		coreFeatureCandidates: parsedFeatures.features,
		subclassChoices: parsedFeatures.subclassChoices,
		provenance: {
			startLine: block.startLine,
			endLine: block.endLine - 1
		}
	};
}

export function parseClassDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const chapter = findClassChapter(lines);
	const detailedClasses = findDetailedClassBlocks(lines, chapter).map(parseDetailedClassBlock);
	const detailedByName = new Map(detailedClasses.map((classData) => [classData.name, classData]));

	const classes = CORE_CLASS_NAMES.map(
		(name) =>
			detailedByName.get(name) ?? {
				id: slugify(name),
				name,
				category: getClassCategory(name),
				sourceStatus: 'listed-only',
				coreFeatureCandidates: [],
				subclassChoices: [],
				provenance: null
			}
	);

	if (options.validate !== false) validateClasses(classes);
	return classes;
}

export function validateClasses(classes) {
	const errors = [];
	if (classes.length !== CORE_CLASS_NAMES.length) {
		errors.push(`Expected ${CORE_CLASS_NAMES.length} core classes, found ${classes.length}.`);
	}

	const names = new Set(classes.map((classData) => classData.name));
	for (const name of CORE_CLASS_NAMES) {
		if (!names.has(name)) errors.push(`Missing core class: ${name}.`);
	}

	for (const classData of classes) {
		if (!classData.category) errors.push(`${classData.name}: missing class category.`);
		if (classData.sourceStatus === 'detailed') {
			if (!classData.classTable?.rows?.length)
				errors.push(`${classData.name}: missing class table rows.`);
			if (!classData.path?.type) errors.push(`${classData.name}: missing class path.`);
			if (!classData.coreFeatureCandidates.length) {
				errors.push(`${classData.name}: missing core feature candidates.`);
			}
		}
	}

	if (errors.length) throw new Error(errors.join('\n'));
}

function createReport(classes) {
	const detailedClasses = classes.filter((classData) => classData.sourceStatus === 'detailed');
	const listedOnly = classes.filter((classData) => classData.sourceStatus !== 'detailed');
	const featureCandidateCount = detailedClasses.reduce(
		(sum, classData) => sum + classData.coreFeatureCandidates.length,
		0
	);

	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		rulesVersion: 'dc20-0.10.5',
		scope: 'core-rules-classes',
		classCount: classes.length,
		detailedClassCount: detailedClasses.length,
		sourceCoreFeatureCandidateCount: featureCandidateCount,
		parserNotes: [
			'Class source uses flat ## headings for both feature names and nested option headings. coreFeatureCandidates is intentionally broad; runtime validation matches implemented feature names against these candidates.'
		],
		classes,
		findings: [
			...listedOnly.map((classData) => ({
				severity: 'info',
				className: classData.name,
				message:
					'Class is part of the core class list but has no detailed class chapter in the parsed source range.'
			}))
		]
	};
}

const serializeReport = (value) =>
	format(JSON.stringify(value), {
		parser: 'json',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100
	});

function writeGeneratedFile(path, content) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, content);
}

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const source = readFileSync(DEFAULT_SOURCE, 'utf8');
	const classes = parseClassDocument(source);
	const report = await serializeReport(createReport(classes));

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error('Generated class audit report is stale. Run npm run classes:generate:0105.');
		}
		console.log(
			`Validated ${classes.length} core classes, ${
				classes.filter((classData) => classData.sourceStatus === 'detailed').length
			} detailed class chapters, and ${classes.reduce(
				(sum, classData) => sum + (classData.coreFeatureCandidates?.length ?? 0),
				0
			)} source core feature candidates; audit report is current.`
		);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Wrote ${DEFAULT_REPORT}`);
		return;
	}

	process.stdout.write(report);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	runCli().catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
