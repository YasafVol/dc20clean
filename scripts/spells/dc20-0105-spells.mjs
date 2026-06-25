#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DEFAULT_SOURCE = resolve(ROOT, 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md');
const DEFAULT_OUTPUT = resolve(ROOT, 'src/lib/rulesdata/spells-data/generated/v0105.generated.ts');
const DEFAULT_REPORT = resolve(ROOT, 'docs/migration/spells-v0105-report.json');

const VALID_SOURCES = new Set(['Arcane', 'Divine', 'Primal']);
const VALID_SCHOOLS = new Set([
	'Astromancy',
	'Conjuration',
	'Divination',
	'Elemental',
	'Enchantment',
	'Invocation',
	'Nullification',
	'Transmutation'
]);
const VALID_TAGS = new Set([
	'Aberration',
	'Ailment',
	'Air',
	'Antimagic',
	'Beast',
	'Bleeding',
	'Blinded',
	'Blood',
	'Bludgeoning',
	'Burning',
	'Celestial',
	'Chaos',
	'Charmed',
	'Cleansing',
	'Cold',
	'Communication',
	'Construct',
	'Corrosion',
	'Curse',
	'Dazed',
	'Deafened',
	'Death',
	'Disoriented',
	'Doomed',
	'Dragon',
	'Earth',
	'Elemental',
	'Embolden',
	'Emotion',
	'Emotions',
	'Enfeeble',
	'Exhaustion',
	'Exposed',
	'Fey',
	'Fiend',
	'Fire',
	'Frightened',
	'Gravity',
	'Healing',
	'Hindered',
	'Illusion',
	'Immobilized',
	'Impaired',
	'Incapacitated',
	'Intimidated',
	'Invisible',
	'Knowledge',
	'Light',
	'Lightning',
	'Madness',
	'Metamorphosis',
	'Motion',
	'Ooze',
	'Paralyzed',
	'Piercing',
	'Planes',
	'Plant',
	'Plants',
	'Poison',
	'Prone',
	'Psychic',
	'Radiant',
	'Restrained',
	'Resurrection',
	'Scent',
	'Sense',
	'Shadow',
	'Slashing',
	'Slowed',
	'Sound',
	'Spirit',
	'Strike',
	'Stunned',
	'Summoning',
	'Surprised',
	'Taunted',
	'Teleportation',
	'Terrified',
	'Tethered',
	'Thoughts',
	'Time',
	'Trap',
	'True',
	'Umbral',
	'Unconscious',
	'Undead',
	'Ward',
	'Water',
	'Weakened',
	'Weapon'
]);

const SOURCE_EXCEPTIONS = {
	'Dispel Magic': {
		duration: 'See Effect',
		reason: 'The source omits Duration because MP effects and magic items use different durations.'
	},
	"Nature ' s Tether": {
		name: "Nature's Tether",
		reason: 'The clean Markdown contains OCR spacing around the apostrophe in the spell heading.'
	}
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

function normalizeMetadataLines(lines) {
	return lines.flatMap((line) => {
		let normalized = line;
		if (/^(?:Source|Spell List):/.test(normalized)) {
			normalized = normalized.replace(/\s+(?:Spell )?School:\s*/, '\nSchool: ');
		}
		normalized = normalized.replace(/^Spell School:\s*/, 'School: ');
		if (/^Range:/.test(normalized)) {
			normalized = normalized.replace(/\s+Duration:\s*/, '\nDuration: ');
		}
		return normalized.split('\n');
	});
}

function findSpellChapter(lines) {
	const schoolIndex = lines.indexOf('## Spells sorted by Schools');
	const start = lines.findIndex((line, index) => index > schoolIndex && line === '## Arcane Bolt');
	const end = lines.findIndex((line, index) => index > start && line === '## Starting Combat');

	if (schoolIndex < 0 || start < 0 || end < 0) {
		throw new Error('Could not locate the v0.10.5 spell chapter boundaries.');
	}

	return { start, end };
}

function isSpellHeading(lines, index, chapterEnd) {
	if (!/^## (?!#)/.test(lines[index])) return false;
	const lookahead = normalizeMetadataLines(
		lines.slice(index + 1, Math.min(index + 18, chapterEnd))
	);
	const firstContentLine = lookahead.find((line) => line.trim() && !/^<!-- page:/.test(line));
	if (!/^(?:Source|Spell List):/.test(firstContentLine ?? '')) return false;
	const text = lookahead.join('\n');
	return (
		/^(?:Source|Spell List):/m.test(text) &&
		/^(?:Spell )?School:/m.test(text) &&
		/^Cost:/m.test(text) &&
		/^Range:/m.test(text)
	);
}

function readMetadata(block, name, sourceException) {
	const normalized = normalizeMetadataLines(block);
	const fieldIndexes = new Map();
	for (let index = 0; index < normalized.length; index += 1) {
		const match = normalized[index].match(
			/^(Source|Spell List|School|Tags|Spell Tags|Cost|Range|Duration):\s*(.*)$/
		);
		if (match && !fieldIndexes.has(match[1])) {
			fieldIndexes.set(match[1], { index, value: match[2].trim() });
		}
	}

	const sourceField = fieldIndexes.get('Source') ?? fieldIndexes.get('Spell List');
	const schoolField = fieldIndexes.get('School');
	const tagsField = fieldIndexes.get('Tags') ?? fieldIndexes.get('Spell Tags');
	const costField = fieldIndexes.get('Cost');
	const rangeField = fieldIndexes.get('Range');
	const durationField = fieldIndexes.get('Duration');

	if (!sourceField || !schoolField || !costField || !rangeField) {
		throw new Error(`${name}: missing required metadata.`);
	}

	let tagsText = tagsField?.value ?? '';
	if (tagsField && costField.index > tagsField.index + 1) {
		tagsText = normalized
			.slice(tagsField.index, costField.index)
			.map((line, index) => (index === 0 ? tagsText : line.trim()))
			.filter(Boolean)
			.join(' ');
	}

	const bodyStart = (durationField ?? rangeField).index + 1;

	return {
		sources: sourceField.value.split(',').map((source) => source.trim()),
		school: schoolField.value,
		tags: tagsText
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean),
		rawCost: costField.value,
		range: rangeField.value,
		duration: durationField?.value ?? sourceException?.duration,
		bodyLines: normalized.slice(bodyStart),
		exception: sourceException
	};
}

function parseResourceCost(text, context) {
	const cost = {};
	for (const part of text.split(/\s*\+\s*/)) {
		const match = part.trim().match(/^(\d+|X)\s+(AP|MP)$/);
		if (!match) throw new Error(`${context}: unsupported resource cost "${part}".`);
		const amount = match[1] === 'X' ? 'X' : Number(match[1]);
		cost[match[2].toLowerCase()] = amount;
	}
	return cost;
}

function parseSpellCost(text, name) {
	const resourceText = text.replace(/\s*\(.*\)\s*$/, '').trim();
	const cost = parseResourceCost(resourceText, name);
	if (typeof cost.ap !== 'number') {
		throw new Error(`${name}: base AP cost must be numeric.`);
	}
	return {
		ap: cost.ap,
		...(cost.mp !== undefined ? { mp: cost.mp } : {}),
		...(text.match(/minimum of (\d+)/i)
			? { minimumMp: Number(text.match(/minimum of (\d+)/i)[1]) }
			: {}),
		...(text !== resourceText ? { raw: text } : {})
	};
}

function parseEnhancementCost(rawCost, context) {
	const parts = rawCost.split(/\s*,\s*/);
	const resourceText = parts.shift()?.trim() ?? '';
	const options = resourceText
		.split(/\s+or\s+/i)
		.map((option) => parseResourceCost(option, context));
	const modifiers = parts.map((part) => part.trim());
	const requires = modifiers
		.map((modifier) => modifier.match(/^(?:Requires|Requies)\s+(.+)$/i)?.[1])
		.filter(Boolean);

	const unsupported = modifiers.filter(
		(modifier) =>
			!/^Repeatable$/i.test(modifier) &&
			!/^Sustained$/i.test(modifier) &&
			!/^(?:Requires|Requies)\s+.+$/i.test(modifier)
	);
	if (unsupported.length) {
		throw new Error(`${context}: unsupported enhancement modifiers "${unsupported.join(', ')}".`);
	}

	return {
		cost: options[0],
		...(options.length > 1 ? { alternativeCosts: options.slice(1) } : {}),
		costText: resourceText,
		rawCost,
		...(modifiers.some((modifier) => /^Repeatable$/i.test(modifier)) ? { repeatable: true } : {}),
		...(modifiers.some((modifier) => /^Sustained$/i.test(modifier)) ? { sustained: true } : {}),
		...(resourceText.includes('X') ? { variable: true } : {}),
		...(requires.length ? { requires: requires.map(slugify) } : {})
	};
}

function findSection(lines, headingPattern) {
	const start = lines.findIndex((line) => headingPattern.test(line));
	if (start < 0) return undefined;
	const nextHeading = lines.findIndex((line, index) => index > start && /^## /.test(line));
	return {
		start,
		end: nextHeading < 0 ? lines.length : nextHeading,
		lines: lines.slice(start + 1, nextHeading < 0 ? lines.length : nextHeading)
	};
}

function parseEnhancements(lines, spellName) {
	const section = findSection(lines, /^## Spell Enhancements?$/);
	if (!section) {
		throw new Error(`${spellName}: missing Spell Enhancements section.`);
	}

	const enhancements = [];
	let current;
	for (const line of trimBlankLines(withoutPageMarkers(section.lines))) {
		const match = line.match(/^(.+?):\s*\(([^)]+)\)\s*(.*)$/);
		if (match) {
			if (current) enhancements.push(current);
			const name = match[1].trim();
			current = {
				id: slugify(name),
				name,
				description: match[3].trim(),
				...parseEnhancementCost(match[2].trim(), `${spellName} / ${name}`)
			};
			continue;
		}

		if (!line.trim()) continue;
		if (!current) {
			throw new Error(`${spellName}: unassigned enhancement text "${line}".`);
		}
		current.description = `${current.description}\n\n${line.trim()}`.trim();
	}
	if (current) enhancements.push(current);
	return { enhancements, section };
}

function parsePassive(lines) {
	const section = findSection(lines, /^## Spell Passive:\s*(.+)$/);
	if (!section) return undefined;
	const title = lines[section.start].replace(/^## Spell Passive:\s*/, '').trim();
	const description = trimBlankLines(withoutPageMarkers(section.lines)).join('\n\n').trim();
	return {
		value: description ? `${title}: ${description}` : title,
		section
	};
}

function removeSections(lines, sections) {
	const removed = new Set();
	for (const section of sections.filter(Boolean)) {
		for (let index = section.start; index < section.end; index += 1) removed.add(index);
	}
	return lines.filter((_, index) => !removed.has(index));
}

function parseSpell(block, startLine, endLine) {
	const sourceName = block[0].replace(/^## /, '').trim();
	const sourceException = SOURCE_EXCEPTIONS[sourceName];
	const name = sourceException?.name ?? sourceName;
	const metadata = readMetadata(block.slice(1), name, sourceException);
	const bodyLines = trimBlankLines(withoutPageMarkers(metadata.bodyLines));
	const { enhancements, section: enhancementsSection } = parseEnhancements(bodyLines, name);
	const passive = parsePassive(bodyLines);
	const effectLines = trimBlankLines(
		removeSections(bodyLines, [enhancementsSection, passive?.section])
	);
	const description = effectLines.join('\n\n').trim();

	if (!description) throw new Error(`${name}: empty spell description.`);

	const reportedException = metadata.exception ? { ...metadata.exception } : undefined;
	if (reportedException) {
		delete reportedException.name;
		if (sourceName !== name) reportedException.sourceName = sourceName;
	}

	return {
		id: slugify(name),
		name,
		sources: metadata.sources,
		school: metadata.school,
		tags: metadata.tags,
		cost: parseSpellCost(metadata.rawCost, name),
		isCantrip: !/\bMP\b/.test(metadata.rawCost),
		range: metadata.range,
		duration: metadata.duration,
		sustained: /\(Sustained\)/i.test(metadata.duration ?? ''),
		effects: [{ title: 'Effect', description }],
		...(passive ? { spellPassive: passive.value } : {}),
		enhancements,
		fullDescription: trimBlankLines(withoutPageMarkers(block)).join('\n').trim(),
		provenance: { startLine, endLine },
		...(reportedException ? { sourceException: reportedException } : {})
	};
}

export function parseSpellDocument(markdown, options = {}) {
	const lines = markdown.split(/\r?\n/);
	const chapter = findSpellChapter(lines);
	const starts = [];
	for (let index = chapter.start; index < chapter.end; index += 1) {
		if (isSpellHeading(lines, index, chapter.end)) starts.push(index);
	}

	const spells = starts.map((start, index) => {
		const end = starts[index + 1] ?? chapter.end;
		return parseSpell(lines.slice(start, end), start + 1, end);
	});

	if (options.validate !== false) {
		validateSpells(spells);
	}
	return spells;
}

export function validateSpells(spells) {
	const errors = [];
	const names = new Set();
	const ids = new Set();

	if (spells.length !== 160) errors.push(`Expected 160 spells, found ${spells.length}.`);
	for (const spell of spells) {
		if (names.has(spell.name)) errors.push(`Duplicate spell name: ${spell.name}.`);
		if (ids.has(spell.id)) errors.push(`Duplicate spell id: ${spell.id}.`);
		names.add(spell.name);
		ids.add(spell.id);
		for (const source of spell.sources) {
			if (!VALID_SOURCES.has(source)) errors.push(`${spell.name}: unknown source ${source}.`);
		}
		if (!VALID_SCHOOLS.has(spell.school)) {
			errors.push(`${spell.name}: unknown school ${spell.school}.`);
		}
		for (const tag of spell.tags) {
			if (!VALID_TAGS.has(tag)) errors.push(`${spell.name}: unknown tag ${tag}.`);
		}
		if (!spell.duration) errors.push(`${spell.name}: missing duration.`);
	}

	const enhancementCount = spells.reduce((count, spell) => count + spell.enhancements.length, 0);
	if (enhancementCount !== 709) {
		errors.push(`Expected 709 enhancements, found ${enhancementCount}.`);
	}
	if (errors.length) throw new Error(errors.join('\n'));
}

const serialize = (value) => JSON.stringify(value, null, '\t');

export function generateTypeScript(spells) {
	const data = spells.map((spell) => {
		const generatedSpell = { ...spell };
		delete generatedSpell.provenance;
		delete generatedSpell.sourceException;
		delete generatedSpell.fullDescription;
		return generatedSpell;
	});
	return `/* eslint-disable */\n/**\n * Generated from docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md.\n * Run npm run spells:generate:0105 to refresh. Do not edit manually.\n */\nimport type { Spell } from '../../schemas/spell.schema';\n\n// The generator validates all enum values and cost shapes before writing.\n// prettier-ignore\nexport const V0105_SPELLS = ${serialize(data)} as unknown as Spell[];\n`;
}

function createReport(spells) {
	const schools = Object.fromEntries(
		[...VALID_SCHOOLS].map((school) => [
			school,
			spells.filter((spell) => spell.school === school).length
		])
	);
	const enhancementCount = spells.reduce((count, spell) => count + spell.enhancements.length, 0);
	const exceptions = spells
		.filter((spell) => spell.sourceException)
		.map((spell) => ({ spell: spell.name, ...spell.sourceException }));
	const spellAudit = spells.map((spell) => ({
		id: spell.id,
		name: spell.name,
		sources: spell.sources,
		school: spell.school,
		tags: spell.tags,
		cost: spell.cost,
		range: spell.range,
		duration: spell.duration,
		sustained: spell.sustained,
		isCantrip: spell.isCantrip,
		enhancementCount: spell.enhancements.length,
		provenance: spell.provenance
	}));
	return {
		source: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
		spellCount: spells.length,
		enhancementCount,
		schools,
		exceptions,
		spells: spellAudit
	};
}

function writeGeneratedFile(path, content) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, content);
}

function runCli() {
	const args = new Set(process.argv.slice(2));
	const source = readFileSync(DEFAULT_SOURCE, 'utf8');
	const spells = parseSpellDocument(source);
	const generated = generateTypeScript(spells);
	const report = `${serialize(createReport(spells))}\n`;

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_OUTPUT, 'utf8');
		if (current !== generated) {
			throw new Error('Generated spell catalog is stale. Run npm run spells:generate:0105.');
		}
		console.log(
			`Validated ${spells.length} spells and 709 enhancements; generated catalog is current.`
		);
		return;
	}

	if (args.has('--write')) {
		writeGeneratedFile(DEFAULT_OUTPUT, generated);
		writeGeneratedFile(DEFAULT_REPORT, report);
		console.log(`Generated ${spells.length} spells at ${DEFAULT_OUTPUT}.`);
		return;
	}

	console.log(report.trim());
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	runCli();
}
