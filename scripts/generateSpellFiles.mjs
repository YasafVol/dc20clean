/**
 * Script to generate spell TypeScript files from DC20 0.10 full.md
 *
 * Usage: node scripts/generateSpellFiles.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_PATH = join(__dirname, '../docs/assets/DC20 0.10 full.md');
const SPELLS_DIR = join(__dirname, '../src/lib/rulesdata/spells-data');

// Parse the markdown file
const content = readFileSync(DOCS_PATH, 'utf-8');

// Find all spell blocks using a two-pass approach
// First, find all spell header positions
const spellHeaders = [];
const headerRegex = /^### ([A-Z][A-Za-z ]+)\n\*\*Source:\*\*/gm;
let headerMatch;
while ((headerMatch = headerRegex.exec(content)) !== null) {
	spellHeaders.push({
		name: headerMatch[1].trim(),
		start: headerMatch.index
	});
}

// Then extract each spell's content up to the next spell
const spells = [];
for (let i = 0; i < spellHeaders.length; i++) {
	const startPos = spellHeaders[i].start;
	const endPos = i < spellHeaders.length - 1 ? spellHeaders[i + 1].start : content.length;
	const spellContent = content.slice(startPos, endPos).trim();

	const spell = parseSpell(spellContent, spellHeaders[i].name);
	if (spell && !spell.school.includes('Class') && !spell.school.includes('Signature')) {
		spells.push(spell);
	}
}

function parseSpell(spellContent, name) {
	// Parse header fields
	const sourceMatch = spellContent.match(/\*\*Source:\*\*\s*([^\n]+)/);
	const schoolMatch = spellContent.match(/\*\*School:\*\*\s*([^\n]+)/);
	const tagsMatch =
		spellContent.match(/\*\*(?:Spell )?Tags:\*\*\s*([^\n]+)/) ||
		spellContent.match(/\*\*Tags:\*\*\s*([^\n]+)/);
	const costMatch = spellContent.match(/\*\*Cost:\*\*\s*([^\n]+)/);
	const rangeMatch = spellContent.match(/\*\*Range:\*\*\s*([^\n]+)/);
	const durationMatch = spellContent.match(/\*\*Duration:\*\*\s*([^\n]+)/);

	if (!sourceMatch || !schoolMatch || !costMatch) {
		return null;
	}

	// Get the body (everything after Duration line)
	const durationLineEnd = spellContent.indexOf(durationMatch[0]) + durationMatch[0].length;
	const body = spellContent.slice(durationLineEnd).trim();

	return {
		name,
		sources: sourceMatch[1]
			.trim()
			.split(',')
			.map((s) => s.trim()),
		school: schoolMatch[1].trim().replace(/\s+/g, ''),
		tags: tagsMatch
			? tagsMatch[1]
					.trim()
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean)
			: [],
		cost: parseCost(costMatch[1]),
		range: rangeMatch ? rangeMatch[1].trim() : 'Self',
		duration: durationMatch ? durationMatch[1].trim() : 'Instantaneous',
		body
	};
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
	const kebab = toKebabCase(str);
	return kebab.replace(/-([a-z])/g, (_, chr) => chr.toUpperCase());
}

function escapeString(str) {
	return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

function parseEnhancements(body) {
	const enhancements = [];

	// Find the enhancements section
	const enhMatch = body.match(/\*\*Spell Enhancements?:\*\*([\s\S]*?)(?=\n\n[A-Z]|$)/);
	if (!enhMatch) return enhancements;

	const enhSection = enhMatch[1];

	// Match enhancement lines: *   **Name:** (cost) description
	const lines = enhSection.split('\n');
	let currentEnh = null;

	for (const line of lines) {
		const enhLineMatch = line.match(/^\*\s+\*\*([^:]+):\*\*\s*\(([^)]+)\)\s*(.*)$/);

		if (enhLineMatch) {
			// Save previous enhancement if exists
			if (currentEnh) {
				enhancements.push(currentEnh);
			}

			const [_, name, costStr, description] = enhLineMatch;

			// Parse cost string like "1 AP, Repeatable" or "X MP" or "1 AP + X MP"
			const apMatch = costStr.match(/(\d+)\s*AP/);
			const mpMatch = costStr.match(/(\d+)\s*MP/);
			const isRepeatable = costStr.toLowerCase().includes('repeatable');
			const isVariable = costStr.includes('X MP') || costStr.includes('X ');

			// Determine primary cost type
			let type = 'AP';
			let cost = 1;

			if (mpMatch && !apMatch) {
				type = 'MP';
				cost = parseInt(mpMatch[1]);
			} else if (apMatch) {
				type = 'AP';
				cost = parseInt(apMatch[1]);
			}

			currentEnh = {
				type,
				cost,
				name: name.trim(),
				description: description.trim().replace(/\*\*/g, ''),
				...(isRepeatable && { repeatable: true }),
				...(isVariable && { variable: true })
			};
		} else if (currentEnh && line.trim() && !line.startsWith('*')) {
			// Continuation of previous description
			currentEnh.description += ' ' + line.trim().replace(/\*\*/g, '');
		}
	}

	// Don't forget the last enhancement
	if (currentEnh) {
		enhancements.push(currentEnh);
	}

	return enhancements;
}

function parsePassive(body) {
	const passiveMatch = body.match(/\*\*Spell Passive:\s*([^*]+)\*\*\n([^\n*]+)/);
	if (passiveMatch) {
		return `${passiveMatch[1].trim()}: ${passiveMatch[2].trim().replace(/\*\*/g, '')}`;
	}
	return null;
}

function parseMainDescription(body) {
	// Get first paragraph (before Spell Passive or Spell Enhancements)
	const lines = body.split('\n');
	const descLines = [];

	for (const line of lines) {
		if (line.startsWith('**Spell') || line.startsWith('**Beta') || line.startsWith('*   ')) {
			break;
		}
		if (line.trim()) {
			descLines.push(line.trim());
		}
	}

	return descLines.join(' ').replace(/\*\*/g, '');
}

function generateSpellFile(spell) {
	const id = toKebabCase(spell.name);
	const varName = toCamelCase(spell.name);
	const isCantrip = !spell.cost.mp;
	const mainDescription = parseMainDescription(spell.body);
	const cantripPassive = parsePassive(spell.body);
	const enhancements = parseEnhancements(spell.body);

	const sourcesArray = spell.sources.map((s) => `SpellSource.${s}`).join(', ');
	const schoolEnum = `SpellSchool.${spell.school}`;

	// Determine valid tags based on SpellTag type
	const validTags = [
		'Bludgeoning',
		'Piercing',
		'Slashing',
		'Fire',
		'Cold',
		'Lightning',
		'Thunder',
		'Sonic',
		'Acid',
		'Poison',
		'Psychic',
		'Radiant',
		'Necrotic',
		'Force',
		'True',
		'Burning',
		'Charmed',
		'Frightened',
		'Blinded',
		'Deafened',
		'Paralyzed',
		'Restrained',
		'Stunned',
		'Exhaustion',
		'Concentration',
		'Ritual',
		'Chaos',
		'Healing',
		'Teleportation',
		'Summoning',
		'Illusion',
		'Detection'
	];

	const tagsArray = spell.tags
		.filter((t) => validTags.includes(t))
		.map((t) => `'${t}'`)
		.join(', ');

	let fileContent = `import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const ${varName}: Spell = {
	id: '${id}',
	name: '${escapeString(spell.name)}',
	sources: [${sourcesArray}],
	school: ${schoolEnum},
	tags: [${tagsArray}],
	isCantrip: ${isCantrip},
	cost: { ap: ${spell.cost.ap}${spell.cost.mp ? `, mp: ${spell.cost.mp}` : ''} },
	range: '${escapeString(spell.range)}',
	duration: '${escapeString(spell.duration)}',
	effects: [
		{
			title: 'Effect',
			description: '${escapeString(mainDescription)}'
		}
	],`;

	if (cantripPassive) {
		fileContent += `
	cantripPassive: '${escapeString(cantripPassive)}',`;
	}

	fileContent += `
	enhancements: [`;

	enhancements.forEach((enh, i) => {
		fileContent += `
		{
			type: '${enh.type}',
			cost: ${enh.cost},
			name: '${escapeString(enh.name)}',
			description: '${escapeString(enh.description)}'${enh.repeatable ? ',\n\t\t\trepeatable: true' : ''}${enh.variable ? ',\n\t\t\tvariable: true' : ''}
		}${i < enhancements.length - 1 ? ',' : ''}`;
	});

	fileContent += `
	]
};
`;

	return { id, varName, content: fileContent };
}

function generateIndexFile(schoolSpells, school) {
	const exports = schoolSpells.map((s) => {
		const varName = toCamelCase(s.name);
		const fileName = toKebabCase(s.name);
		return `export { ${varName} } from './${fileName}';`;
	});

	const allExport = `
// All ${school} spells
export const ${school}Spells = [
	${schoolSpells.map((s) => toCamelCase(s.name)).join(',\n\t')}
];`;

	return exports.join('\n') + '\n' + allExport + '\n';
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

// Generate files for each school
console.log('Generating spell files...\n');

Object.entries(spellsBySchool).forEach(([school, schoolSpells]) => {
	const schoolDir = join(SPELLS_DIR, school);

	// Ensure directory exists
	if (!existsSync(schoolDir)) {
		mkdirSync(schoolDir, { recursive: true });
	}

	// Generate spell files
	schoolSpells.forEach((spell) => {
		const { id, content } = generateSpellFile(spell);
		const filePath = join(schoolDir, `${id}.ts`);
		writeFileSync(filePath, content);
		console.log(`  ✅ ${school}/${id}.ts`);
	});

	// Generate index file
	const indexContent = generateIndexFile(schoolSpells, school);
	writeFileSync(join(schoolDir, 'index.ts'), indexContent);
	console.log(`  📁 ${school}/index.ts\n`);
});

console.log('\n✅ School folders generated. Main index.ts must be updated manually.');

console.log(
	`\n✅ Generated ${spells.length} spell files across ${Object.keys(spellsBySchool).length} schools`
);
