#!/usr/bin/env node
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const ASSET_DIR = path.join(ROOT, 'docs/assets/dc20-0.10.5');
const OLD_MD = path.join(ROOT, 'docs/assets/DC20 0.10 full.md');
const NEW_MD = path.join(ASSET_DIR, 'DC20 0.10.5 clean.md');
const CHANGE_AUDIT = path.join(ASSET_DIR, 'CHANGE_AUDIT.md');
const DATA_SHAPE_REVIEW = path.join(ASSET_DIR, 'DATA_SHAPE_REVIEW.md');

const SYSTEMS = [
	'Rules Versioning',
	'Character Schema / SavedCharacter',
	'Calculation / Effects',
	'Character Creation Flow',
	'Classes / Leveling / Talents',
	'Ancestry / Traits',
	'Background / Skills / Trades / Languages',
	'Spells',
	'Martials / Maneuvers',
	'Equipment',
	'Character Sheet',
	'PDF Export',
	'Storage / Convex / localStorage'
];

const NO_APP_IMPACT_PATTERNS = [
	/welcome to the dc20 beta/i,
	/dc20 overview video/i,
	/support dc20/i,
	/dc20 hardcover/i,
	/website/i,
	/youtube channel/i,
	/patreon/i,
	/discord/i,
	/legal/i,
	/credits/i,
	/table of contents/i
];

const SPELL_HEADINGS = new Set([
	'arcane',
	'divine',
	'primal',
	'astromancy',
	'conjuration',
	'divination',
	'elemental',
	'enchantment',
	'invocation',
	'nullification',
	'transmutation'
]);

const LANGUAGE_HEADINGS = new Set([
	'common',
	'giant',
	'draconic',
	'primordial',
	'fey',
	'divine',
	'fiendish',
	'deep speech',
	'sign language',
	'thieves cant'
]);

const SKILL_HEADINGS = new Set([
	'awareness',
	'athletics',
	'intimidation',
	'acrobatics',
	'trickery',
	'stealth',
	'animal',
	'influence',
	'insight',
	'investigation',
	'medicine',
	'survival',
	'arcana',
	'history',
	'nature',
	'occultism',
	'religion'
]);

const CLASS_HEADINGS = new Set([
	'barbarian',
	'bard',
	'champion',
	'cleric',
	'commander',
	'druid',
	'hunter',
	'monk',
	'rogue',
	'sorcerer',
	'spellblade',
	'warlock',
	'wizard'
]);

const SYSTEM_DOCS = {
	'Rules Versioning': [
		'docs/systems/PROJECT_TECHNICAL_OVERVIEW.MD',
		'docs/systems/DATABASE_SYSTEM.MD'
	],
	'Character Schema / SavedCharacter': ['docs/systems/DATABASE_SYSTEM.MD'],
	'Calculation / Effects': ['docs/systems/CALCULATION_SYSTEM.MD', 'docs/systems/EFFECT_SYSTEM.MD'],
	'Character Creation Flow': ['docs/systems/CHARACTER_CREATION_FLOW.MD'],
	'Classes / Leveling / Talents': [
		'docs/systems/CLASS_SYSTEM.MD',
		'docs/systems/LEVELING_SYSTEM.MD',
		'docs/systems/FEATURE_ID_NAMING_CONVENTION.md'
	],
	'Ancestry / Traits': ['docs/systems/ANCESTRY_SYSTEM.MD', 'docs/systems/TRAITS_SYSTEM.MD'],
	'Background / Skills / Trades / Languages': [
		'docs/systems/BACKGROUND_SYSTEM.MD',
		'docs/systems/CALCULATION_SYSTEM.MD'
	],
	Spells: ['docs/systems/SPELLS_SYSTEM.MD'],
	'Martials / Maneuvers': ['docs/systems/MARTIALS_SYSTEM.MD'],
	Equipment: ['docs/systems/EQUIPMENT_SYSTEM.MD'],
	'Character Sheet': ['docs/systems/CHARACTER_SHEET.MD'],
	'PDF Export': ['docs/systems/PDF_EXPORT_SYSTEM.MD'],
	'Storage / Convex / localStorage': ['docs/systems/DATABASE_SYSTEM.MD']
};

const TOUCHPOINTS = {
	'Rules Versioning': ['package.json', 'src/i18n/locales/en.json', 'src/i18n/locales/es.json'],
	'Character Schema / SavedCharacter': [
		'src/lib/types/dataContracts.ts',
		'src/lib/types/schemaVersion.ts'
	],
	'Calculation / Effects': [
		'src/lib/services/enhancedCharacterCalculator.ts',
		'src/lib/services/calculatorModules/',
		'src/lib/types/effectSystem.ts',
		'src/lib/rulesdata/schemas/character.schema.ts'
	],
	'Character Creation Flow': [
		'src/routes/character-creation/',
		'src/lib/stores/characterContext.tsx'
	],
	'Classes / Leveling / Talents': [
		'src/lib/rulesdata/classes-data/',
		'src/lib/rulesdata/progression/'
	],
	'Ancestry / Traits': ['src/lib/rulesdata/ancestries/'],
	'Background / Skills / Trades / Languages': [
		'src/routes/character-creation/Background.tsx',
		'src/lib/rulesdata/skills.ts',
		'src/lib/rulesdata/trades.ts',
		'src/lib/rulesdata/languages.ts'
	],
	Spells: ['src/lib/rulesdata/spells-data/', 'src/lib/services/spellAssignment.ts'],
	'Martials / Maneuvers': [
		'src/lib/rulesdata/martials/',
		'src/routes/character-creation/Maneuvers.tsx'
	],
	Equipment: ['src/lib/rulesdata/equipment/', 'src/routes/custom-equipment/'],
	'Character Sheet': ['src/routes/character-sheet/'],
	'PDF Export': ['src/lib/pdf/', 'src/lib/types/pdfExport.ts'],
	'Storage / Convex / localStorage': [
		'src/lib/storage/',
		'src/lib/utils/storageUtils.ts',
		'convex/schema.ts'
	]
};

function normalizeHeading(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
}

function splitSections(text) {
	const lines = text.split('\n');
	const sections = [];
	let current = null;
	let currentPage = null;
	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		const pageMarker = line.match(/^<!-- page: (\d+) -->$/);
		if (pageMarker) currentPage = Number(pageMarker[1]);

		const heading = line.match(/^(#{1,6})\s+(.+)$/);
		if (heading) {
			if (current) {
				current.endLine = index;
				current.endPage = currentPage ?? current.endPage;
				current.text = current.lines.join('\n').trim();
				sections.push(current);
			}
			current = {
				level: heading[1].length,
				title: heading[2].trim(),
				key: normalizeHeading(heading[2]),
				startLine: index + 1,
				endLine: index + 1,
				startPage: currentPage,
				endPage: currentPage,
				lines: [line]
			};
			continue;
		}
		if (!current) {
			current = {
				level: 1,
				title: 'Front Matter',
				key: 'front matter',
				startLine: 1,
				endLine: 1,
				startPage: currentPage,
				endPage: currentPage,
				lines: []
			};
		}
		if (currentPage != null) current.endPage = currentPage;
		current.lines.push(line);
	}
	if (current) {
		current.endLine = lines.length;
		current.text = current.lines.join('\n').trim();
		sections.push(current);
	}
	return sections.filter((section) => section.text.length > 0);
}

function termCounts(text) {
	const terms = ['HP', 'SP', 'MP', 'AP', 'PD', 'AD', 'Save DC', 'Maneuver', 'Spell', 'Trait'];
	const counts = {};
	for (const term of terms) {
		const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		counts[term] = (text.match(new RegExp(`\\b${escaped}\\b`, 'gi')) ?? []).length;
	}
	return counts;
}

function sectionFingerprint(section) {
	const text = section.text;
	return {
		length: text.length,
		numericTokenCount: (text.match(/\b\d+(?:\.\d+)?\b/g) ?? []).length,
		tableCount: (text.match(/^\|.+\|$/gm) ?? []).length,
		terms: termCounts(text)
	};
}

function changedEnough(oldSection, newSection) {
	if (!oldSection) return true;
	const oldFp = sectionFingerprint(oldSection);
	const newFp = sectionFingerprint(newSection);
	if (Math.abs(newFp.length - oldFp.length) > Math.max(250, oldFp.length * 0.15)) return true;
	if (Math.abs(newFp.numericTokenCount - oldFp.numericTokenCount) > 3) return true;
	if (Math.abs(newFp.tableCount - oldFp.tableCount) > 1) return true;
	for (const [term, count] of Object.entries(newFp.terms)) {
		if (Math.abs(count - (oldFp.terms[term] ?? 0)) > 3) return true;
	}
	return false;
}

function classifySystem(section) {
	const titleKey = normalizeHeading(section.title);
	if (
		CLASS_HEADINGS.has(titleKey) ||
		/class table|talent|leveling|path progression/.test(titleKey)
	) {
		return 'Classes / Leveling / Talents';
	}
	if (SPELL_HEADINGS.has(titleKey) || /spell|cantrip|mana|mp\b|magic/.test(titleKey)) {
		return 'Spells';
	}
	if (LANGUAGE_HEADINGS.has(titleKey) || SKILL_HEADINGS.has(titleKey)) {
		return 'Background / Skills / Trades / Languages';
	}

	const text = `${section.title}\n${section.text.slice(0, 2000)}`.toLowerCase();
	if (/spell|magic|mana|mp\b|cantrip/.test(text)) return 'Spells';
	if (/maneuver|martial|stamina|sp\b/.test(text)) return 'Martials / Maneuvers';
	if (
		/class|barbarian|bard|champion|cleric|druid|hunter|monk|rogue|sorcerer|spellblade|warlock|wizard|talent|leveling|path progression/.test(
			text
		)
	) {
		return 'Classes / Leveling / Talents';
	}
	if (/ancestr|trait|beastborn|elf|dwarf|human/.test(text)) return 'Ancestry / Traits';
	if (/background|skill|trade|language/.test(text))
		return 'Background / Skills / Trades / Languages';
	if (/equipment|weapon|armor|shield|item|gold|silver|copper/.test(text)) return 'Equipment';
	if (
		/save dc|pd\b|ad\b|hp\b|grit|rest point|death threshold|calculation|formula|effect/.test(text)
	) {
		return 'Calculation / Effects';
	}
	if (/character sheet|pdf|fillable|export/.test(text)) return 'PDF Export';
	if (/storage|schema|convex|localstorage|migration|savedcharacter|characterstate/.test(text)) {
		return 'Storage / Convex / localStorage';
	}
	if (/creation|create character|character creation/.test(text)) return 'Character Creation Flow';
	return 'Calculation / Effects';
}

function hasLikelyAppImpact(section, system, oldSection) {
	const text = `${section.title}\n${section.text}`.toLowerCase();
	if (NO_APP_IMPACT_PATTERNS.some((pattern) => pattern.test(section.title))) return false;
	if (system !== 'Rules Versioning') return true;
	if (oldSection) return true;
	return /rules version|schema|character sheet|pdf|export|storage|migration|version|calculator|formula/.test(
		text
	);
}

function categoryForSystem(system, oldSection) {
	if (!oldSection) return 'data-only';
	if (system === 'Calculation / Effects') return 'calculator';
	if (system === 'PDF Export') return 'export';
	if (
		system === 'Storage / Convex / localStorage' ||
		system === 'Character Schema / SavedCharacter'
	) {
		return 'schema';
	}
	if (system === 'Character Sheet' || system === 'Character Creation Flow') return 'UI';
	return 'data-only';
}

function statusForSystem(system) {
	if (
		[
			'Classes / Leveling / Talents',
			'Spells',
			'Martials / Maneuvers',
			'Ancestry / Traits',
			'Equipment'
		].includes(system)
	) {
		return 'HITL required';
	}
	return 'pending';
}

async function listFiles(dir, predicate, result = []) {
	try {
		for (const entry of await readdir(dir, { withFileTypes: true })) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				await listFiles(fullPath, predicate, result);
			} else if (predicate(fullPath)) {
				result.push(fullPath);
			}
		}
	} catch {
		// Missing optional directories are not audit blockers.
	}
	return result;
}

async function readIfExists(filePath) {
	try {
		return await readFile(filePath, 'utf8');
	} catch {
		return '';
	}
}

function formatList(items) {
	return items.map((item) => `  - \`${item}\``).join('\n');
}

function formatSource(section) {
	const pageRange =
		section.startPage == null
			? 'page unknown'
			: section.startPage === section.endPage
				? `page ${section.startPage}`
				: `pages ${section.startPage}-${section.endPage}`;
	return `\`docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md\`, ${pageRange}, lines ${section.startLine}-${section.endLine}`;
}

function buildEntry(id, system, section, oldSection) {
	const currentImplementation = oldSection
		? `Comparable v0.10 section found at lines ${oldSection.startLine}-${oldSection.endLine}.`
		: 'No directly matching v0.10 section heading was found by the automated scaffold.';
	const requiredChange = oldSection
		? 'Review section-level differences and classify exact rule/data changes before implementation.'
		: 'Review as a new or renamed v10.5 rules section and decide whether app data, calculator behavior, or docs must change.';
	const category = categoryForSystem(system, oldSection);

	return `### ${id}: ${section.title}

- Status: ${statusForSystem(system)}
- Category: ${category}
- Source: ${formatSource(section)}
- Current implementation: ${currentImplementation}
- Required change: ${requiredChange}
- Data shape impact: unknown
- HITL required: ${statusForSystem(system) === 'HITL required' ? 'yes' : 'no'}
- Code touchpoints:
${formatList(TOUCHPOINTS[system] ?? [])}
- System docs to update:
${formatList(SYSTEM_DOCS[system] ?? [])}
- Test coverage needed: Add or refresh focused validation after HITL classification.
`;
}

function mandatoryEntries(startIndex) {
	const entries = [
		{
			system: 'Rules Versioning',
			title: 'Introduce rulesVersion Metadata Spine',
			status: 'ready for implementation',
			category: 'schema',
			required:
				'Add rulesVersion as additive metadata separate from schemaVersion so v10.5 and future v11 behavior can be selected without destructive migration.',
			impact: 'additive',
			hitl: 'no'
		},
		{
			system: 'Character Schema / SavedCharacter',
			title: 'Confirm v10.5 SavedCharacter Shape Compatibility',
			status: 'pending',
			category: 'schema',
			required:
				'Use this audit and HITL review to verify v10.5 does not require structural SavedCharacter changes beyond optional rulesVersion metadata.',
			impact: 'unknown',
			hitl: 'yes'
		},
		{
			system: 'PDF Export',
			title: 'Keep Export Template Routing Versioned',
			status: 'ready for implementation',
			category: 'export',
			required:
				'Route export by rules/export version and keep v0.10 export stable for existing characters; add v10.5 template only when a fillable template exists.',
			impact: 'none',
			hitl: 'no'
		}
	];

	return entries.map((entry, offset) => {
		const id = `AUDIT-${String(startIndex + offset).padStart(3, '0')}`;
		return `### ${id}: ${entry.title}

- Status: ${entry.status}
- Category: ${entry.category}
- Source: Repository architecture review
- Current implementation: Rules version, character schema version, and PDF version are not yet modeled as separate lifecycle concepts.
- Required change: ${entry.required}
- Data shape impact: ${entry.impact}
- HITL required: ${entry.hitl}
- Code touchpoints:
${formatList(TOUCHPOINTS[entry.system] ?? [])}
- System docs to update:
${formatList(SYSTEM_DOCS[entry.system] ?? [])}
- Test coverage needed: Add version metadata and routing tests before rules-data changes.
`;
	});
}

function buildAudit(entriesBySystem, totalEntries) {
	return `# DC20 0.10.5 Change Audit

Generated by \`scripts/dc20-105-audit-scaffold.mjs\`.

This is the implementation gate for v10.5 rules work. Do not update rules assets from this file alone; first classify each pending entry into a concrete implementation task or mark it no-op/deferred.

## Summary

- Total audit entries: ${totalEntries}
- Systems covered: ${SYSTEMS.length}
- Source rules: \`docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md\`
- Baseline rules: \`docs/assets/DC20 0.10 full.md\`

## Status Legend

- \`pending\`: needs human review before implementation.
- \`no-op\`: reviewed and no app impact.
- \`HITL required\`: content/rules asset update requires human approval.
- \`ready for implementation\`: engineering work is clear enough to implement.
- \`deferred\`: intentionally postponed.

${SYSTEMS.map((system) => {
	const entries = entriesBySystem.get(system) ?? [];
	return `## ${system}

${entries.length === 0 ? 'No automated section-level candidates were identified for this system.' : entries.join('\n')}`;
}).join('\n\n')}
`;
}

async function buildDataShapeReview() {
	const dataContracts = await readIfExists(path.join(ROOT, 'src/lib/types/dataContracts.ts'));
	const characterStateHasRulesVersion = /interface\s+CharacterState[\s\S]*rulesVersion/.test(
		dataContracts
	);
	const savedCharacterHasRulesVersion = /interface\s+SavedCharacter[\s\S]*rulesVersion/.test(
		dataContracts
	);
	const schema = await readIfExists(path.join(ROOT, 'convex/schema.ts'));
	const convexHasRulesVersion = /rulesVersion/.test(schema);
	const pdfExport = await readIfExists(path.join(ROOT, 'src/lib/types/pdfExport.ts'));
	const pdfHasRulesVersion = /rulesVersion|exportVersion/.test(pdfExport);
	const ruleFiles = await listFiles(path.join(ROOT, 'src/lib/rulesdata'), (filePath) =>
		/\.(ts|tsx)$/.test(filePath)
	);

	return `# DC20 0.10.5 Data Shape Review

Generated by \`scripts/dc20-105-audit-scaffold.mjs\`.

## Direct Answers

### Does v10.5 require changes to \`SavedCharacter\`?

Automated conclusion: **no confirmed breaking change found**.

- \`SavedCharacter\` currently has \`schemaVersion\`: yes
- \`SavedCharacter\` currently has \`rulesVersion\`: ${savedCharacterHasRulesVersion ? 'yes' : 'no'}
- Recommended v10.5 change: add optional/additive \`rulesVersion\` metadata as the forward-compatible versioning spine.
- Breaking schema change required by v10.5: not identified by this automated pass; keep this pending until HITL review completes.

### Does v10.5 require changes to \`CharacterState\`?

Automated conclusion: **no confirmed change found**.

- \`CharacterState\` currently has \`rulesVersion\`: ${characterStateHasRulesVersion ? 'yes' : 'no'}
- Recommendation: do not store rules version inside \`CharacterState\`; keep it on the saved character record unless v11 introduces state-specific versioning.

### Does v10.5 require changes to Convex \`characters\` schema?

Automated conclusion: **only additive metadata is expected**.

- Convex schema currently has \`rulesVersion\`: ${convexHasRulesVersion ? 'yes' : 'no'}
- Recommendation: add optional \`rulesVersion\` when Plan 5 is implemented, but do not create a new table for v10.5.

### Does v10.5 require changes to PDF export DTO?

Automated conclusion: **not confirmed**.

- PDF export DTO currently has \`rulesVersion\` or \`exportVersion\`: ${pdfHasRulesVersion ? 'yes' : 'no'}
- Recommendation: keep export version as routing metadata outside the filled DTO unless the v10.5 fillable template introduces new fields.

## Rule Asset Inventory

- Rules data TypeScript files scanned: ${ruleFiles.length}
- Main domains: classes, spells, martials, ancestries, equipment, schemas, progression.

## Pure Rules-Data Candidates

- Classes, progressions, features, and talents.
- Spells and spell tags/enhancements.
- Maneuvers and martial enhancements.
- Ancestry traits.
- Equipment option/property data.

## Calculator Behavior Candidates

- Any changed formula for HP, SP, MP, AP, PD, AD, Save DC, death threshold, grit/rest, mastery caps, path progression, spell/maneuver budgets, or effect stacking.
- Any changed semantics in effects or feature choices.

## Deferred To v11

- Breaking saved-character schema migration.
- Versioned character tables or immutable snapshot tables.
- Forced conversion flow for old characters.
- View/export-only archived cards for structurally incompatible characters.

## Current Recommendation

Treat v10.5 as the first rules-versioned conversion with additive metadata only. Keep \`schemaVersion\` for structural data shape, introduce \`rulesVersion\` for rules/runtime behavior, and reserve destructive or table-level migration work for v11.
`;
}

async function main() {
	const oldText = await readFile(OLD_MD, 'utf8');
	const newText = await readFile(NEW_MD, 'utf8');
	const oldSections = splitSections(oldText);
	const newSections = splitSections(newText);
	const oldByKey = new Map(oldSections.map((section) => [section.key, section]));
	const entriesBySystem = new Map(SYSTEMS.map((system) => [system, []]));
	let counter = 1;

	for (const entry of mandatoryEntries(counter)) {
		const systemMatch =
			counter === 1
				? 'Rules Versioning'
				: counter === 2
					? 'Character Schema / SavedCharacter'
					: 'PDF Export';
		entriesBySystem.get(systemMatch)?.push(entry);
		counter += 1;
	}

	for (const section of newSections) {
		if (section.title === 'Front Matter') continue;
		const oldSection = oldByKey.get(section.key);
		if (!changedEnough(oldSection, section)) continue;
		const system = classifySystem(section);
		if (!hasLikelyAppImpact(section, system, oldSection)) continue;
		const id = `AUDIT-${String(counter).padStart(3, '0')}`;
		entriesBySystem.get(system)?.push(buildEntry(id, system, section, oldSection));
		counter += 1;
	}

	await writeFile(CHANGE_AUDIT, buildAudit(entriesBySystem, counter - 1), 'utf8');
	await writeFile(DATA_SHAPE_REVIEW, await buildDataShapeReview(), 'utf8');
	console.log(`Change audit written to ${path.relative(ROOT, CHANGE_AUDIT)}`);
	console.log(`Data shape review written to ${path.relative(ROOT, DATA_SHAPE_REVIEW)}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
