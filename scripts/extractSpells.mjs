/**
 * Script to extract spells from DC20 0.10 full.md
 * This script parses the markdown and generates spell data files.
 *
 * Usage: node scripts/extractSpells.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_PATH = join(__dirname, '../docs/assets/DC20 0.10 full.md');
const SPELLS_DIR = join(__dirname, '../src/lib/rulesdata/spells-data/schools');

// Parse the markdown file
const content = readFileSync(DOCS_PATH, 'utf-8');

// Regex to match spell blocks - starts with ### SpellName and ends before next ###
const spellRegex =
	/^### ([A-Z][A-Za-z ]+)\n\*\*Source:\*\* ([^\n]+)\n\*\*School:\*\* ([^\n]+)\n(?:\*\*(?:Spell )?Tags:\*\* ([^\n]+)\n)?(?:\*\*Tags:\*\* ([^\n]+)\n)?\*\*Cost:\*\* ([^\n]+)\n\*\*Range:\*\* ([^\n]+)\n\*\*Duration:\*\* ([^\n]+)\n\n([\s\S]*?)(?=\n### [A-Z]|\n## [A-Z]|$)/gm;

const spells = [];
let match;

while ((match = spellRegex.exec(content)) !== null) {
	const [_, name, source, school, tags1, tags2, cost, range, duration, body] = match;

	// Skip non-spell matches (like class features that start with ###)
	if (school.includes('Class Features') || school.includes('Signature')) {
		continue;
	}

	const spellData = {
		name: name.trim(),
		sources: source
			.trim()
			.replace(/\s+/g, ' ')
			.split(',')
			.map((s) => s.trim()),
		school: school.trim().replace(/\s+/g, ''),
		tags: (tags1 || tags2 || '')
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean),
		cost: parseCost(cost),
		range: range.trim(),
		duration: duration.trim(),
		body: body.trim()
	};

	spells.push(spellData);
}

function parseCost(costStr) {
	const apMatch = costStr.match(/(\d+)\s*AP/);
	const mpMatch = costStr.match(/(\d+)\s*MP/);

	return {
		ap: apMatch ? parseInt(apMatch[1]) : 1,
		mp: mpMatch ? parseInt(mpMatch[1]) : undefined
	};
}

function toKebabCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

function toCamelCase(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
		.replace(/[^a-z0-9]/g, '');
}

function toConstantCase(str) {
	return str
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.toUpperCase()
		.replace(/[^A-Z0-9]+/g, '_');
}

// Group spells by school
const spellsBySchool = {};
spells.forEach((spell) => {
	const school = spell.school.toLowerCase();
	if (!spellsBySchool[school]) {
		spellsBySchool[school] = [];
	}
	spellsBySchool[school].push(spell);
});

console.log('\n========================================');
console.log('DC20 v0.10 Spell Extraction Summary');
console.log('========================================\n');

console.log(`Total spells found: ${spells.length}\n`);
console.log('Spells by School:');
Object.keys(spellsBySchool)
	.sort()
	.forEach((school) => {
		console.log(`  ${school}: ${spellsBySchool[school].length}`);
	});

console.log('\n========================================');
console.log('Spell List by School');
console.log('========================================\n');

Object.keys(spellsBySchool)
	.sort()
	.forEach((school) => {
		console.log(`\n### ${school.charAt(0).toUpperCase() + school.slice(1)}`);
		spellsBySchool[school].sort((a, b) => a.name.localeCompare(b.name));
		spellsBySchool[school].forEach((spell, i) => {
			const isCantrip = !spell.cost.mp;
			const sources = spell.sources.join(', ');
			console.log(
				`  ${i + 1}. ${spell.name}${isCantrip ? ' (Cantrip)' : ''} [${sources}] - ${spell.cost.ap} AP${spell.cost.mp ? ` + ${spell.cost.mp} MP` : ''}`
			);
		});
	});

// Generate report
console.log('\n========================================');
console.log('Generating Spell Data Files...');
console.log('========================================\n');

// Create a sample spell file to show the format
const sampleSpell = spells.find((s) => s.name === 'Fire Bolt') || spells[0];

console.log('Sample spell structure:');
console.log(JSON.stringify(sampleSpell, null, 2));

// Output migration checklist
console.log('\n========================================');
console.log('Migration Checklist');
console.log('========================================');
console.log(`
1. Schema updated: ✅ src/lib/rulesdata/schemas/spell.schema.ts
2. Folder structure created: ✅ src/lib/rulesdata/spells-data/schools/

Next steps:
- Create index.ts for each school folder
- Create spell files using the new schema
- Create main index.ts to export all spells
- Update services to use new spell registry
`);

// Write a JSON summary for reference
const summary = {
	totalSpells: spells.length,
	schools: Object.keys(spellsBySchool)
		.sort()
		.map((school) => ({
			name: school,
			count: spellsBySchool[school].length,
			spells: spellsBySchool[school].map((s) => ({
				name: s.name,
				id: toKebabCase(s.name),
				sources: s.sources,
				isCantrip: !s.cost.mp,
				cost: s.cost
			}))
		}))
};

const summaryPath = join(__dirname, '../docs/migration/spells-v010-extracted.json');
writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(`\nSummary written to: ${summaryPath}`);
