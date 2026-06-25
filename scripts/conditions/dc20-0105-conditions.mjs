#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/conditions-v0105-report.json');

const EXPECTED_CONDITION_COUNT = 28;
const NON_CONDITION_HEADINGS = new Set(['Medicine (Action)', 'Conditions']);

const slugify = (value) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/['’]/g, '')
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.replace(/-x$/, '-x');

const normalizeDescriptionText = (lines) =>
	lines
		.map((line) => line.trim())
		.filter((line) => line && !/^<!-- page:/.test(line))
		.map((line) => line.replace(/^-\s*/, ''))
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();

const headingText = (line) => line.replace(/^##\s+/, '').trim();

function findHeading(lines, heading, from = 0) {
	return lines.findIndex((line, index) => index >= from && line === `## ${heading}`);
}

function findNextHeading(lines, from, end = lines.length) {
	for (let index = from + 1; index < end; index += 1) {
		if (/^## /.test(lines[index])) return index;
	}
	return end;
}

function findConditionChapter(lines) {
	const start = findHeading(lines, 'Conditions List');
	const end = findHeading(lines, 'Condition Resistance, Immunity, & Vulnerability', start);
	if (start < 0 || end < 0) throw new Error('Could not locate condition catalog boundaries.');
	return { start, end };
}

function findRulesChapter(lines, chapter) {
	const start = findHeading(lines, 'Condition Stacking & Overlapping', chapter.end);
	const end = findHeading(lines, 'Resting', start);
	if (start < 0 || end < 0) throw new Error('Could not locate condition stacking rules.');
	return { start, end };
}

function parseOverlappingNames(lines, rulesChapter) {
	const start = findHeading(lines, 'Overlapping Conditions', rulesChapter.start);
	const end = findHeading(lines, 'Excluded Conditions', start);
	if (start < 0 || end < 0) throw new Error('Could not locate overlapping conditions section.');

	return new Set(
		lines
			.slice(start + 1, end)
			.filter((line) => /^## /.test(line))
			.map(headingText)
	);
}

function parseExcludedNames(lines, rulesChapter) {
	const start = findHeading(lines, 'Excluded Conditions', rulesChapter.start);
	if (start < 0) throw new Error('Could not locate excluded conditions section.');

	const sectionText = normalizeDescriptionText(
		lines.slice(start + 1, findNextHeading(lines, start, rulesChapter.end))
	);
	const [, listText] =
		sectionText.match(/Conditions don't stack or overlap in any way:\s(.+)\./) ?? [];
	if (!listText) throw new Error('Could not parse excluded condition list.');

	return new Set(
		listText
			.replace(/, and /g, ', ')
			.split(',')
			.map((name) => name.trim())
			.filter(Boolean)
	);
}

function getSourceTags(name, sourceCategories) {
	if (/\sX$/.test(name)) return ['stacking'];
	if (sourceCategories.overlapping.has(name)) return ['overlapping'];
	if (sourceCategories.excluded.has(name)) return ['excluded'];
	return ['catalog-only'];
}

function parseConditions(lines, chapter, sourceCategories) {
	const conditions = [];

	for (let index = chapter.start + 1; index < chapter.end; index += 1) {
		if (!/^## /.test(lines[index])) continue;
		const name = headingText(lines[index]);
		if (NON_CONDITION_HEADINGS.has(name)) continue;

		const next = findNextHeading(lines, index, chapter.end);
		let descriptionEnd = next;
		if (name === 'Bleeding X') {
			const medicineAction = findHeading(lines, 'Medicine (Action)', index);
			if (medicineAction > index && medicineAction < next) descriptionEnd = medicineAction;
		}

		const condition = {
			id: slugify(name),
			name,
			sourceTags: getSourceTags(name, sourceCategories),
			description: normalizeDescriptionText(lines.slice(index + 1, descriptionEnd)),
			provenance: {
				startLine: index + 1,
				endLine: descriptionEnd
			}
		};
		conditions.push(condition);
	}

	return conditions;
}

function createReport(conditions) {
	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		rulesVersion: 'dc20-0.10.5',
		scope: 'universal-conditions',
		conditionCount: conditions.length,
		conditions,
		effectSpecificAfflictions: [
			{
				id: 'poisoned',
				name: 'Poisoned',
				note: 'Not a universal v0.10.5 condition. Individual poisons define their own duration, damage, and rider effects.'
			}
		],
		rules: {
			conditionResistance: 'ADV on Checks and Saves against the Condition.',
			conditionImmunity: "Can't be subjected to the Condition.",
			conditionVulnerability: 'DisADV on Checks and Saves against the Condition.',
			stacking:
				'If a stacking Condition does not include an X value, the value equals 1. Multiple stacks add their X values together.',
			overlapping:
				'Overlapping Conditions can have multiple sources, but the same Condition does not increase potency from duplicate sources.'
		},
		findings: [
			{
				id: 'intimidated-catalog-only',
				severity: 'source-note',
				summary:
					'Intimidated appears in the flat source condition list and carries the catalog-only metadata tag because it is not named in the source Overlapping Conditions or Excluded Conditions sections.'
			}
		]
	};
}

export function parseConditionDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const chapter = findConditionChapter(lines);
	const rulesChapter = findRulesChapter(lines, chapter);
	const sourceCategories = {
		overlapping: parseOverlappingNames(lines, rulesChapter),
		excluded: parseExcludedNames(lines, rulesChapter)
	};
	const conditions = parseConditions(lines, chapter, sourceCategories);
	if (options.validate !== false) validateConditions(conditions);
	return conditions;
}

export function validateConditions(conditions) {
	const errors = [];
	if (conditions.length !== EXPECTED_CONDITION_COUNT) {
		errors.push(`Expected ${EXPECTED_CONDITION_COUNT} conditions, found ${conditions.length}.`);
	}
	const ids = new Set();
	const names = new Set();
	for (const condition of conditions) {
		if (ids.has(condition.id)) errors.push(`Duplicate condition id: ${condition.id}.`);
		if (names.has(condition.name)) errors.push(`Duplicate condition name: ${condition.name}.`);
		if (!condition.description) errors.push(`${condition.name}: missing description.`);
		ids.add(condition.id);
		names.add(condition.name);
	}
	if (ids.has('poisoned')) errors.push('Poisoned must not be a universal condition.');
	if (errors.length) throw new Error(errors.join('\n'));
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
	const conditions = parseConditionDocument(source);
	const report = await serializeReport(createReport(conditions));

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated condition audit report is stale. Run npm run conditions:generate:0105.'
			);
		}
		console.log(`Validated ${conditions.length} universal conditions; audit report is current.`);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Generated condition audit report at ${DEFAULT_REPORT}.`);
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
