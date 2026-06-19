#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/maneuvers-v0105-report.json');

const CATEGORY_HEADINGS = new Map([
	['Attack Maneuvers', 'Attack'],
	['Defense Maneuvers', 'Defense'],
	['Grapple Maneuvers', 'Grapple'],
	['Utility Maneuvers', 'Utility']
]);

const EXPECTED_TYPE_COUNTS = {
	Attack: 11,
	Defense: 7,
	Grapple: 4,
	Utility: 8
};

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

function findManeuverChapter(lines) {
	const start = lines.findIndex(
		(line, index) => line === '## Maneuvers' && lines[index + 2] === '## Attack Maneuvers'
	);
	const end = lines.findIndex((line, index) => index > start && line === '## Spellcaster Chapter');

	if (start < 0 || end < 0) {
		throw new Error('Could not locate the v0.10.5 maneuver chapter boundaries.');
	}

	return { start, end };
}

function headingText(line) {
	return line.replace(/^##\s+/, '').trim();
}

function findManeuverStarts(lines, chapter) {
	const starts = [];
	let currentType;

	for (let index = chapter.start + 1; index < chapter.end; index += 1) {
		const line = lines[index];
		if (!/^## /.test(line)) continue;
		const title = headingText(line);

		if (CATEGORY_HEADINGS.has(title)) {
			currentType = CATEGORY_HEADINGS.get(title);
			continue;
		}

		if (!currentType || title === 'Maneuvers' || title === 'Maneuver Enhancements') {
			continue;
		}

		starts.push({ index, name: title, type: currentType });
	}

	return starts;
}

function findBlockEnd(lines, start, chapterEnd) {
	for (let index = start + 1; index < chapterEnd; index += 1) {
		if (!/^## /.test(lines[index])) continue;
		const title = headingText(lines[index]);
		if (title !== 'Maneuver Enhancements') return index;
	}
	return chapterEnd;
}

function parseResourceExpression(text, context) {
	const resourceCost = {};
	const pieces = text.split(/\s*\+\s*/);

	for (const piece of pieces) {
		const match = piece.trim().match(/^(\d+|X)\s+(AP|SP)$/);
		if (!match) {
			throw new Error(`${context}: unsupported resource cost "${piece}".`);
		}
		const value = match[1] === 'X' ? 'X' : Number(match[1]);
		resourceCost[match[2].toLowerCase()] = value;
	}

	return resourceCost;
}

function parseBaseCost(text, context) {
	const parenthetical = text.match(/\(([^)]+)\)/)?.[1];
	const resourceText = (parenthetical ?? text).trim();
	const cost = parseResourceExpression(resourceText, context);
	if (typeof cost.ap !== 'number') {
		throw new Error(`${context}: base AP cost must be numeric.`);
	}
	return {
		display: text,
		ap: cost.ap,
		...(typeof cost.sp === 'number' ? { sp: cost.sp } : {})
	};
}

function parseEnhancementCost(rawCost, context) {
	const parts = rawCost.split(/\s*,\s*/);
	const resourceText = parts.shift()?.trim() ?? '';
	const options = resourceText
		.split(/\s+or\s+/i)
		.map((option) => parseResourceExpression(option, context));
	const modifiers = parts.map((part) => part.trim());
	const primaryCost = options[0] ?? {};
	const alternativeCosts = options.slice(1);
	const unsupported = modifiers.filter(
		(modifier) =>
			!/^Repeatable$/i.test(modifier) &&
			!/^Sustained$/i.test(modifier) &&
			!/^Requires\s+.+$/i.test(modifier)
	);

	if (unsupported.length) {
		throw new Error(`${context}: unsupported enhancement modifiers "${unsupported.join(', ')}".`);
	}

	return {
		costString: rawCost,
		...(typeof primaryCost.ap === 'number' ? { ap: primaryCost.ap } : {}),
		...(typeof primaryCost.sp === 'number' ? { sp: primaryCost.sp } : {}),
		...(primaryCost.ap === 'X' || primaryCost.sp === 'X' ? { variable: true } : {}),
		...(alternativeCosts.length
			? {
					alternativeCosts: alternativeCosts.map((cost) => ({
						...(typeof cost.ap === 'number' ? { ap: cost.ap } : {}),
						...(typeof cost.sp === 'number' ? { sp: cost.sp } : {}),
						...(cost.ap === 'X' || cost.sp === 'X' ? { variable: true } : {})
					}))
				}
			: {}),
		...(modifiers.some((modifier) => /^Repeatable$/i.test(modifier)) ? { repeatable: true } : {}),
		...(modifiers.some((modifier) => /^Sustained$/i.test(modifier)) ? { sustained: true } : {}),
		...(modifiers.some((modifier) => /^Requires\s+.+$/i.test(modifier))
			? {
					requires: modifiers
						.map((modifier) => modifier.match(/^Requires\s+(.+)$/i)?.[1])
						.filter(Boolean)
						.map(slugify)
				}
			: {})
	};
}

function splitEnhancementSections(lines) {
	const enhancementIndex = lines.findIndex((line) => line === '## Maneuver Enhancements');
	if (enhancementIndex < 0) {
		throw new Error('Missing Maneuver Enhancements section.');
	}
	return {
		bodyLines: lines.slice(0, enhancementIndex),
		enhancementLines: lines.slice(enhancementIndex + 1)
	};
}

function parseEnhancements(lines, maneuverName) {
	const enhancements = [];
	let current;

	for (const rawLine of trimBlankLines(withoutPageMarkers(lines))) {
		const line = rawLine.trim();
		if (!line) continue;

		const match = line.match(/^(.+?):\s*\(([^)]+)\)\s*(.*)$/);
		if (match) {
			if (current) enhancements.push(current);
			const name = match[1].trim();
			current = {
				id: slugify(name),
				name,
				...parseEnhancementCost(match[2].trim(), `${maneuverName} / ${name}`),
				description: match[3].trim()
			};
			continue;
		}

		if (!current) {
			throw new Error(`${maneuverName}: unassigned enhancement text "${line}".`);
		}
		current.description = `${current.description}\n\n${line}`.trim();
	}

	if (current) enhancements.push(current);
	return enhancements;
}

function parseManeuverCostLine(lines, maneuverName) {
	const costLine = lines.find((line) => /^- Cost:\s+/.test(line));
	if (costLine) return costLine.replace(/^- Cost:\s+/, '').trim();

	if (maneuverName === 'Heroic Pass Through') {
		return 'Pass Through Action (1 AP)';
	}

	throw new Error(`${maneuverName}: missing Cost line.`);
}

function parseManeuverRangeLine(lines, maneuverName) {
	const rangeLine = lines.find((line) => /^- Range:\s+/.test(line));
	if (rangeLine) return rangeLine.replace(/^- Range:\s+/, '').trim();

	if (maneuverName === 'Heroic Pass Through') {
		return 'Pass Through Action';
	}

	throw new Error(`${maneuverName}: missing Range line.`);
}

function parseManeuver(block, type, startLine, endLine) {
	const name = headingText(block[0]);
	const { bodyLines, enhancementLines } = splitEnhancementSections(block);
	const costText = parseManeuverCostLine(bodyLines, name);
	const range = parseManeuverRangeLine(bodyLines, name);
	const requirement = bodyLines
		.find((line) => /^- Requirements?:\s+/.test(line))
		?.replace(/^- Requirements?:\s+/, '')
		.trim();
	const trigger = bodyLines
		.find((line) => /^Trigger:\s+/.test(line))
		?.replace(/^Trigger:\s+/, '')
		.trim();
	const isReaction = bodyLines.some((line) => /^Reaction:/.test(line) || /^Trigger:/.test(line));
	const description = normalizeDescription(
		bodyLines.slice(1).filter((line) => !/^- (Cost|Range|Requirements?):\s+/.test(line))
	);
	const enhancements = parseEnhancements(enhancementLines, name);

	return {
		id: slugify(name),
		name,
		type,
		cost: parseBaseCost(costText, name),
		range,
		...(requirement ? { requirement } : {}),
		description,
		isReaction,
		...(trigger ? { trigger } : {}),
		enhancements,
		provenance: { startLine, endLine }
	};
}

export function parseManeuverDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const chapter = findManeuverChapter(lines);
	const starts = findManeuverStarts(lines, chapter);
	const maneuvers = starts.map((start) => {
		const end = findBlockEnd(lines, start.index, chapter.end);
		return parseManeuver(lines.slice(start.index, end), start.type, start.index + 1, end);
	});

	if (options.validate !== false) {
		validateManeuvers(maneuvers);
	}
	return maneuvers;
}

export function validateManeuvers(maneuvers) {
	const errors = [];
	const names = new Set();
	const ids = new Set();
	const typeCounts = Object.fromEntries([...CATEGORY_HEADINGS.values()].map((type) => [type, 0]));

	for (const maneuver of maneuvers) {
		if (names.has(maneuver.name)) errors.push(`Duplicate maneuver name: ${maneuver.name}.`);
		if (ids.has(maneuver.id)) errors.push(`Duplicate maneuver id: ${maneuver.id}.`);
		names.add(maneuver.name);
		ids.add(maneuver.id);
		typeCounts[maneuver.type] = (typeCounts[maneuver.type] ?? 0) + 1;
		if (!maneuver.description) errors.push(`${maneuver.name}: missing description.`);
		if (!maneuver.enhancements.length) errors.push(`${maneuver.name}: missing enhancements.`);
	}

	for (const [type, expected] of Object.entries(EXPECTED_TYPE_COUNTS)) {
		if (typeCounts[type] !== expected) {
			errors.push(`Expected ${expected} ${type} maneuvers, found ${typeCounts[type]}.`);
		}
	}

	const expectedTotal = Object.values(EXPECTED_TYPE_COUNTS).reduce((sum, count) => sum + count, 0);
	if (maneuvers.length !== expectedTotal) {
		errors.push(`Expected ${expectedTotal} maneuvers, found ${maneuvers.length}.`);
	}

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

function createReport(maneuvers) {
	const typeCounts = Object.fromEntries(
		[...CATEGORY_HEADINGS.values()].map((type) => [
			type,
			maneuvers.filter((maneuver) => maneuver.type === type).length
		])
	);
	const enhancementCount = maneuvers.reduce(
		(count, maneuver) => count + maneuver.enhancements.length,
		0
	);

	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		maneuverCount: maneuvers.length,
		enhancementCount,
		typeCounts,
		maneuvers: maneuvers.map((maneuver) => ({
			id: maneuver.id,
			name: maneuver.name,
			type: maneuver.type,
			cost: maneuver.cost,
			range: maneuver.range,
			...(maneuver.requirement ? { requirement: maneuver.requirement } : {}),
			isReaction: maneuver.isReaction,
			...(maneuver.trigger ? { trigger: maneuver.trigger } : {}),
			enhancementCount: maneuver.enhancements.length,
			enhancements: maneuver.enhancements.map((enhancement) => ({
				id: enhancement.id,
				name: enhancement.name,
				costString: enhancement.costString,
				...(enhancement.ap !== undefined ? { ap: enhancement.ap } : {}),
				...(enhancement.sp !== undefined ? { sp: enhancement.sp } : {}),
				...(enhancement.variable ? { variable: true } : {}),
				...(enhancement.repeatable ? { repeatable: true } : {}),
				...(enhancement.sustained ? { sustained: true } : {}),
				...(enhancement.requires ? { requires: enhancement.requires } : {}),
				...(enhancement.alternativeCosts ? { alternativeCosts: enhancement.alternativeCosts } : {})
			})),
			provenance: maneuver.provenance
		}))
	};
}

function writeGeneratedFile(path, content) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, content);
}

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const source = readFileSync(DEFAULT_SOURCE, 'utf8');
	const maneuvers = parseManeuverDocument(source);
	const report = await serializeReport(createReport(maneuvers));

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated maneuver audit report is stale. Run npm run martials:generate:0105.'
			);
		}
		console.log(
			`Validated ${maneuvers.length} maneuvers and ${maneuvers.reduce(
				(count, maneuver) => count + maneuver.enhancements.length,
				0
			)} enhancements; audit report is current.`
		);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Generated maneuver audit report at ${DEFAULT_REPORT}.`);
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
