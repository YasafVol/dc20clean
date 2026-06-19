#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/background-v0105-report.json');

const SKILL_ATTRIBUTES = ['Might', 'Agility', 'Charisma', 'Intelligence', 'Prime'];
const TRADE_CATEGORIES = ['Artistry', 'Crafting', 'Knowledge', 'Services', 'Subterfuge'];
const LANGUAGE_FAMILIES = [
	{ heading: 'Mortal Languages', family: 'mortal', checkDc: 10 },
	{ heading: 'Exotic Languages', family: 'exotic', checkDc: 15 },
	{ heading: 'Divine Languages', family: 'divine', checkDc: 15 },
	{ heading: 'Outer Languages', family: 'outer', checkDc: 20 }
];
const MASTERY_LEVELS = [
	{ characterLevel: 1, masteryLimit: 'Novice', masteryBonus: 2 },
	{ characterLevel: 5, masteryLimit: 'Adept', masteryBonus: 4 },
	{ characterLevel: 10, masteryLimit: 'Expert', masteryBonus: 6 },
	{ characterLevel: 15, masteryLimit: 'Master', masteryBonus: 8 },
	{ characterLevel: 20, masteryLimit: 'Grandmaster', masteryBonus: 10 }
];

const slugify = (value) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/['’]/g, '')
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '')
		.replace(/^_|_$/g, '');

const normalizeText = (value) => value.replace(/[’]/g, "'");

const headingText = (line) => line.replace(/^##\s+/, '').trim();

function findHeading(lines, heading, from = 0) {
	return lines.findIndex((line, index) => index >= from && line === `## ${heading}`);
}

function findNextHeading(lines, from, allowed = undefined) {
	for (let index = from + 1; index < lines.length; index += 1) {
		if (!/^## /.test(lines[index])) continue;
		const title = headingText(lines[index]);
		if (!allowed || allowed.includes(title)) return index;
	}
	return lines.length;
}

function findNextContentHeading(lines, from, limit = lines.length) {
	for (let index = from + 1; index < limit; index += 1) {
		if (!/^## /.test(lines[index])) continue;
		const title = headingText(lines[index]);
		if (/^Attribute:/.test(title)) continue;
		return index;
	}
	return limit;
}

function findSection(lines, startHeading, endHeading, from = 0) {
	const start = findHeading(lines, startHeading, from);
	const end = findHeading(lines, endHeading, start + 1);
	if (start < 0 || end < 0) {
		throw new Error(`Could not locate source section ${startHeading} -> ${endHeading}.`);
	}
	return { start, end };
}

function parseListItems(lines, start, end) {
	return lines
		.slice(start, end)
		.map((line) => line.trim().match(/^-\s+(.+)$/)?.[1])
		.filter(Boolean)
		.map(normalizeText);
}

function parseSkills(lines) {
	const list = findSection(lines, 'Skill List', 'Trades');
	const skillNamesByAttribute = new Map();

	for (const attribute of SKILL_ATTRIBUTES) {
		const attributeHeading = findHeading(lines, attribute, list.start);
		const nextAttribute = findNextHeading(lines, attributeHeading, SKILL_ATTRIBUTES);
		if (attributeHeading < 0 || attributeHeading >= list.end) {
			throw new Error(`Missing skill attribute section: ${attribute}.`);
		}
		skillNamesByAttribute.set(
			attribute,
			parseListItems(lines, attributeHeading + 1, nextAttribute)
		);
	}

	const detailsStart = findHeading(lines, 'Might', list.start + 1);
	const detailsEnd = list.end;
	const skills = [];

	for (const [attribute, names] of skillNamesByAttribute.entries()) {
		for (const name of names) {
			const start = findHeading(lines, name, detailsStart);
			const end = findNextHeading(lines, start);
			if (start < 0 || start >= detailsEnd) throw new Error(`Missing skill detail: ${name}.`);
			const description = normalizeText(
				lines
					.slice(start + 1, end)
					.find((line) => line.trim() && !/^<!-- page:/.test(line))
					?.trim() ?? ''
			);
			skills.push({
				id: slugify(name),
				name,
				attribute: attribute.toLowerCase(),
				description,
				provenance: { startLine: start + 1, endLine: end }
			});
		}
	}

	return skills;
}

function parseAttributeLine(value) {
	return value
		.replace(/\s+or\s+/g, ', ')
		.split(/\s*,\s*/)
		.map((part) => part.trim().toLowerCase())
		.filter(Boolean);
}

function parseTrades(lines) {
	const section = findSection(lines, 'Trades', 'Languages');
	const trades = [];

	for (const category of TRADE_CATEGORIES) {
		const categoryStart = findHeading(lines, category, section.start);
		const categoryEnd = findNextHeading(lines, categoryStart, [...TRADE_CATEGORIES, 'Languages']);
		if (categoryStart < 0 || categoryStart >= section.end) {
			throw new Error(`Missing trade category: ${category}.`);
		}

		for (let index = categoryStart + 1; index < categoryEnd; index += 1) {
			if (!/^## /.test(lines[index])) continue;
			const name = headingText(lines[index]);
			if (['Trades List', 'Trade Tools', 'Trade Attributes'].includes(name)) continue;
			if (/^Attribute:/.test(name)) continue;

			const end = findNextContentHeading(lines, index, categoryEnd);
			if (end > categoryEnd) continue;
			const block = lines
				.slice(index + 1, end)
				.map((line) => normalizeText(line.trim()))
				.map((line) => (/^## /.test(line) ? headingText(line) : line));
			const toolLine = block.find((line) => /^(Tool|Requires):\s+/.test(line));
			const attributeLine = block.find((line) => /^Attribute:\s+/.test(line));
			if (!attributeLine) continue;

			const tools = toolLine
				? normalizeText(toolLine.replace(/^(Tool|Requires):\s+/, '').trim())
				: 'none';
			const attributes = parseAttributeLine(attributeLine.replace(/^Attribute:\s+/, '').trim());
			const description = block.find(
				(line) =>
					line &&
					!/^<!-- page:/.test(line) &&
					!/^(Tool|Requires):\s+/.test(line) &&
					!/^Attribute:\s+/.test(line) &&
					!line.startsWith('- ')
			);

			trades.push({
				id: slugify(name),
				name,
				category,
				tools: tools === 'None' ? 'none' : tools,
				primaryAttribute: attributes[0],
				attributeAssociations: attributes,
				description: description ?? '',
				provenance: { startLine: index + 1, endLine: end }
			});
		}
	}

	return trades;
}

function parseLanguages(lines) {
	const section = findSection(lines, 'Languages', 'Mastery & Training');
	const languages = [];

	for (const { heading, family, checkDc } of LANGUAGE_FAMILIES) {
		const familyStart = findHeading(lines, heading, section.start);
		const familyEnd = findNextHeading(
			lines,
			familyStart,
			LANGUAGE_FAMILIES.map((item) => item.heading).concat('Mastery & Training')
		);
		if (familyStart < 0 || familyStart >= section.end) {
			throw new Error(`Missing language family section: ${heading}.`);
		}

		for (let index = familyStart + 1; index < familyEnd; index += 1) {
			if (!/^## /.test(lines[index])) continue;
			const name = headingText(lines[index]);
			const end = findNextHeading(lines, index);
			if (end > familyEnd) continue;
			const block = lines.slice(index + 1, end).map((line) => normalizeText(line.trim()));
			const typicalSpeakers = block
				.find((line) => /^Typical Speakers:\s+/.test(line))
				?.replace(/^Typical Speakers:\s+/, '')
				.trim();
			const description =
				block.find(
					(line) => line && !/^Typical Speakers:\s+/.test(line) && !/^<!-- page:/.test(line)
				) ?? '';

			languages.push({
				id: slugify(name),
				name,
				family,
				typicalSpeakers: typicalSpeakers ?? '',
				checkDc,
				description,
				provenance: { startLine: index + 1, endLine: end }
			});
		}
	}

	return languages;
}

function createBackgroundRules() {
	return {
		budgets: {
			skillPoints: {
				base: 5,
				addsIntelligence: true,
				source: 'Background grants 5 Skill Points; Intelligence modifies total Skill Points.'
			},
			tradePoints: { base: 3, source: 'Background grants 3 Trade Points.' },
			languagePoints: {
				base: 2,
				commonFluencyFree: true,
				source: 'Background grants Common Fluency and 2 Language Points.'
			}
		},
		conversions: [
			{ id: 'skillToTrade', from: 'skillPoints', fromAmount: 1, to: 'tradePoints', toAmount: 2 },
			{
				id: 'tradeToLanguage',
				from: 'tradePoints',
				fromAmount: 1,
				to: 'languagePoints',
				toAmount: 2
			}
		],
		disallowedConversions: [
			{
				id: 'tradeToSkill',
				reason: 'Source says Skill Points convert to Trade Points, but not the other way around.'
			},
			{
				id: 'languageToTrade',
				reason: 'Source says Trade Points convert to Language Points, but not the other way around.'
			}
		],
		masteryLevels: MASTERY_LEVELS,
		languageMastery: [
			{ level: 0, fluency: 'None' },
			{ level: 1, fluency: 'Limited' },
			{ level: 2, fluency: 'Fluent' }
		]
	};
}

export function parseBackgroundDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const report = {
		skills: parseSkills(lines),
		trades: parseTrades(lines),
		languages: parseLanguages(lines),
		rules: createBackgroundRules()
	};

	if (options.validate !== false) validateBackground(report);
	return report;
}

export function validateBackground(report) {
	const errors = [];
	if (report.skills.length !== 12)
		errors.push(`Expected 12 skills, found ${report.skills.length}.`);
	if (report.trades.length !== 28)
		errors.push(`Expected 28 trades, found ${report.trades.length}.`);
	if (report.languages.length !== 15)
		errors.push(`Expected 15 languages, found ${report.languages.length}.`);

	for (const entryType of ['skills', 'trades', 'languages']) {
		const ids = new Set();
		for (const entry of report[entryType]) {
			if (ids.has(entry.id)) errors.push(`Duplicate ${entryType} id: ${entry.id}.`);
			ids.add(entry.id);
		}
	}

	const expectedFamilyCounts = { mortal: 8, exotic: 4, divine: 2, outer: 1 };
	for (const [family, expected] of Object.entries(expectedFamilyCounts)) {
		const count = report.languages.filter((language) => language.family === family).length;
		if (count !== expected) {
			errors.push(`Expected ${expected} ${family} languages, found ${count}.`);
		}
	}

	const expectedConversionIds = ['skillToTrade', 'tradeToLanguage'];
	const actualConversionIds = report.rules.conversions.map((conversion) => conversion.id);
	if (JSON.stringify(actualConversionIds) !== JSON.stringify(expectedConversionIds)) {
		errors.push(`Unexpected conversion IDs: ${actualConversionIds.join(', ')}.`);
	}

	if (errors.length) throw new Error(errors.join('\n'));
}

function createReport(parsed) {
	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		rulesVersion: 'dc20-0.10.5',
		scope: 'background-skills-trades-languages',
		skillCount: parsed.skills.length,
		tradeCount: parsed.trades.length,
		languageCount: parsed.languages.length,
		...parsed
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
	const parsed = parseBackgroundDocument(source);
	const report = await serializeReport(createReport(parsed));

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated background audit report is stale. Run npm run background:generate:0105.'
			);
		}
		console.log(
			`Validated ${parsed.skills.length} skills, ${parsed.trades.length} trades, and ${parsed.languages.length} languages; audit report is current.`
		);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Generated background audit report at ${DEFAULT_REPORT}.`);
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
