#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/ancestries-v0105-report.json');

const CORE_ANCESTRIES = [
	'Human',
	'Elf',
	'Dwarf',
	'Halfling',
	'Gnome',
	'Orc',
	'Dragonborn',
	'Giantborn',
	'Angelborn',
	'Fiendborn',
	'Beastborn'
];

const EXPECTED_ANCESTRY_COUNT = 11;

const slugify = (value) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/['’]/g, '')
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '');

const withoutPageMarkers = (lines) =>
	lines.filter((line) => !/^<!-- page: \d+ -->$/.test(line.trim()));

const headingText = (line) => line.replace(/^##\s+/, '').trim();

function findLine(lines, predicate, context) {
	const index = lines.findIndex(predicate);
	if (index < 0) throw new Error(`Could not locate ${context}.`);
	return index;
}

function findHeading(lines, heading, from = 0) {
	return lines.findIndex((line, index) => index >= from && line === `## ${heading}`);
}

function findPreviousHeading(lines, heading, from) {
	for (let index = from; index >= 0; index -= 1) {
		if (lines[index] === `## ${heading}`) return index;
	}
	return -1;
}

function findChapter(lines) {
	const systemStart = findLine(
		lines,
		(line, index) => line === '## Ancestry System' && index > findHeading(lines, 'Ancestries'),
		'Ancestry System chapter start'
	);
	const firstAncestry = findHeading(lines, 'Human', systemStart);
	const end = findLine(
		lines,
		(line, index) => index > firstAncestry && line === '## CHAPTER 6 Classes',
		'Ancestry chapter end'
	);
	return { start: firstAncestry, end };
}

function findCoreStarts(lines, chapter) {
	const starts = new Map();
	for (const name of CORE_ANCESTRIES) {
		if (name === 'Gnome') continue;
		const index = findHeading(lines, name, chapter.start);
		if (index < 0 || index >= chapter.end)
			throw new Error(`Missing source ancestry heading: ${name}.`);
		starts.set(name, index);
	}

	const predictWeather = findLine(
		lines,
		(line, index) => index > starts.get('Halfling') && line.includes('(0) Predict Weather:'),
		'Gnome trait block'
	);
	const gnomeStart = findPreviousHeading(lines, 'Default Traits', predictWeather);
	if (gnomeStart < 0 || gnomeStart >= starts.get('Orc')) {
		throw new Error('Could not infer malformed Gnome source block start.');
	}
	starts.set('Gnome', gnomeStart);

	return CORE_ANCESTRIES.map((name) => ({ name, index: starts.get(name) })).sort(
		(a, b) => a.index - b.index
	);
}

function splitAncestryBlocks(lines, chapter) {
	const starts = findCoreStarts(lines, chapter);
	return starts.map((start, index) => ({
		name: start.name,
		startLine: start.index + 1,
		endLine: (starts[index + 1]?.index ?? chapter.end) + 1,
		lines: withoutPageMarkers(lines.slice(start.index, starts[index + 1]?.index ?? chapter.end))
	}));
}

function currentTraitCategory(line, current) {
	if (line === '## Default Traits') return 'default';
	if (line === '## Expanded Traits' || line === '## Beast Traits') return 'expanded';
	if (line.endsWith('Origin')) return 'origin';
	if (line.includes('Fallen Angelborn') || line.includes('Fiendborn Redemption')) return 'variant';
	return current;
}

function parseTraitLine(line) {
	const match = line.trim().match(/^(?:-\s*)?(?:\d+\.\s*)?\((-?\d+)\)\s+([^:]+):\s*(.*)$/);
	if (!match) return undefined;

	const rawName = match[2].trim();
	const requirement = rawName.match(/^(.*?)\s+\(requires\s+(.+?)\)$/i);
	const name = requirement ? requirement[1].trim() : rawName;
	return {
		name,
		id: slugify(name),
		cost: Number(match[1]),
		...(requirement ? { requires: requirement[2].trim() } : {}),
		description: match[3].trim()
	};
}

function parseAncestryBlock(block) {
	const traits = [];
	let category = block.name === 'Beastborn' ? 'origin' : 'lore';
	let currentTrait;

	for (const [lineOffset, rawLine] of block.lines.entries()) {
		const line = rawLine.trim();
		if (!line) continue;

		if (line.startsWith('## ')) {
			category = currentTraitCategory(line, category);
			continue;
		}

		const trait = parseTraitLine(line);
		if (trait) {
			currentTrait = {
				...trait,
				category,
				sourceLine: block.startLine + lineOffset
			};
			traits.push(currentTrait);
			continue;
		}

		if (currentTrait && !line.startsWith('DC Tip:')) {
			currentTrait.description = `${currentTrait.description} ${line.replace(/^-\s*/, '')}`.trim();
		}
	}

	const traitCounts = {
		default: traits.filter((trait) => trait.category === 'default').length,
		expanded: traits.filter((trait) => trait.category === 'expanded').length,
		origin: traits.filter((trait) => trait.category === 'origin').length,
		variant: traits.filter((trait) => trait.category === 'variant').length
	};

	return {
		id: slugify(block.name),
		name: block.name,
		traitCount: traits.length,
		traitCounts,
		traits,
		provenance: {
			startLine: block.startLine,
			endLine: block.endLine - 1
		}
	};
}

export function parseAncestryDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const chapter = findChapter(lines);
	const ancestries = splitAncestryBlocks(lines, chapter).map(parseAncestryBlock);

	if (options.validate !== false) validateAncestries(ancestries);
	return ancestries;
}

export function validateAncestries(ancestries) {
	const errors = [];
	if (ancestries.length !== EXPECTED_ANCESTRY_COUNT) {
		errors.push(`Expected ${EXPECTED_ANCESTRY_COUNT} core ancestries, found ${ancestries.length}.`);
	}

	const names = new Set();
	for (const ancestry of ancestries) {
		if (names.has(ancestry.name)) errors.push(`Duplicate ancestry name: ${ancestry.name}.`);
		names.add(ancestry.name);
		if (!ancestry.traitCount) errors.push(`${ancestry.name}: missing source traits.`);
		if (ancestry.name !== 'Beastborn' && ancestry.traitCounts.default === 0) {
			errors.push(`${ancestry.name}: missing default traits.`);
		}
		if (ancestry.traitCounts.expanded === 0) {
			errors.push(`${ancestry.name}: missing expanded traits.`);
		}
	}

	if (errors.length) throw new Error(errors.join('\n'));
}

function createReport(ancestries) {
	const traitCount = ancestries.reduce((sum, ancestry) => sum + ancestry.traitCount, 0);
	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		rulesVersion: 'dc20-0.10.5',
		scope: 'core-rules-ancestries',
		ancestryCount: ancestries.length,
		traitCount,
		ancestries
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
	const ancestries = parseAncestryDocument(source);
	const report = await serializeReport(createReport(ancestries));

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated ancestry audit report is stale. Run npm run ancestries:generate:0105.'
			);
		}
		console.log(
			`Validated ${ancestries.length} core ancestries and ${ancestries.reduce(
				(sum, ancestry) => sum + ancestry.traitCount,
				0
			)} source traits; audit report is current.`
		);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Generated ancestry audit report at ${DEFAULT_REPORT}.`);
		return;
	}

	console.log(report.trim());
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	runCli().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
}
