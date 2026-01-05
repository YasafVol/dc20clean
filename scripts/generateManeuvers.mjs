/**
 * Script to generate maneuver data from DC20 0.10 full.md
 *
 * Usage: node scripts/generateManeuvers.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_PATH = join(__dirname, '../docs/assets/DC20 0.10 full.md');
const OUTPUT_PATH = join(__dirname, '../src/lib/rulesdata/martials/maneuvers.ts');

const content = readFileSync(DOCS_PATH, 'utf-8');

// Extract maneuver section (from "## Maneuvers List" to "# Spellcaster Chapter")
const maneuverSectionMatch = content.match(/## Maneuvers List([\s\S]*?)# Spellcaster Chapter/);
if (!maneuverSectionMatch) {
	console.error('Could not find maneuver section');
	process.exit(1);
}

const maneuverSection = maneuverSectionMatch[1];

// Parse maneuvers
const maneuvers = [];
const maneuverRegex = /### ([A-Z][A-Za-z ]+)\n([^#]*?)(?=\n### [A-Z]|\n## [A-Z]|$)/g;

let match;
while ((match = maneuverRegex.exec(maneuverSection)) !== null) {
	const [_, name, body] = match;

	// Skip section headers
	if (name.match(/^(Attack|Defense|Grapple|Utility) Maneuvers?$/)) {
		continue;
	}

	const maneuver = parseManeuver(name.trim(), body.trim());
	if (maneuver) {
		maneuvers.push(maneuver);
	}
}

function parseManeuver(name, body) {
	// Parse cost
	const costMatch = body.match(/\*\s+\*\*Cost:\*\*\s*([^\n]+)/);
	if (!costMatch) return null;

	const costStr = costMatch[1];
	const apMatch = costStr.match(/(\d+)\s*AP/);
	const spMatch = costStr.match(/(\d+)\s*SP/);

	const cost = {
		ap: apMatch ? parseInt(apMatch[1]) : 1,
		sp: spMatch ? parseInt(spMatch[1]) : undefined
	};

	// Parse range
	const rangeMatch = body.match(/\*\s+\*\*Range:\*\*\s*([^\n]+)/);
	const range = rangeMatch ? rangeMatch[1].trim() : 'Self';

	// Parse trigger (for reactions)
	const triggerMatch = body.match(/\*\s+\*\*Trigger:\*\*\s*([^\n]+)/);
	const trigger = triggerMatch ? triggerMatch[1].trim() : undefined;

	// Check if it's a reaction
	const isReaction = body.includes('**Reaction:**') || !!trigger;

	// Get main description (first paragraph after the bullet points)
	const descLines = [];
	const lines = body.split('\n');
	let inBullets = false;
	let pastBullets = false;

	for (const line of lines) {
		if (line.startsWith('*   **')) {
			inBullets = true;
			continue;
		}
		if (inBullets && !line.startsWith('*') && line.trim()) {
			pastBullets = true;
		}
		if (pastBullets && !line.startsWith('**Maneuver') && !line.startsWith('*   ')) {
			if (line.trim()) {
				descLines.push(line.trim());
			}
		}
	}

	// If no description found after bullets, get the first paragraph
	let description = descLines.join(' ').replace(/\*\*/g, '');
	if (!description) {
		const firstPara = body.split('\n').find((l) => l.trim() && !l.startsWith('*'));
		description = firstPara ? firstPara.trim().replace(/\*\*/g, '') : name;
	}

	// Parse enhancements
	const enhancements = parseEnhancements(body);

	return {
		name,
		cost,
		range,
		trigger,
		isReaction,
		description,
		enhancements
	};
}

function parseEnhancements(body) {
	const enhancements = [];
	const enhSection = body.match(/\*\*Maneuver Enhancements:\*\*([\s\S]*?)(?=\n\n[A-Z]|$)/);
	if (!enhSection) return enhancements;

	const enhLines = enhSection[1].split('\n');
	let currentEnh = null;

	for (const line of enhLines) {
		const enhMatch = line.match(/^\*\s+\*\*([^:]+):\*\*\s*\(([^)]+)\)\s*(.*)$/);
		if (enhMatch) {
			if (currentEnh) enhancements.push(currentEnh);

			const [_, name, costStr, desc] = enhMatch;
			const spMatch = costStr.match(/(\d+)\s*SP/);
			const apMatch = costStr.match(/(\d+)\s*AP/);
			const repeatable = costStr.toLowerCase().includes('repeatable');

			currentEnh = {
				name: name.trim(),
				costString: costStr.trim(),
				sp: spMatch ? parseInt(spMatch[1]) : undefined,
				ap: apMatch ? parseInt(apMatch[1]) : undefined,
				repeatable,
				description: desc.trim().replace(/\*\*/g, '')
			};
		} else if (currentEnh && line.trim() && !line.startsWith('*   **DC')) {
			currentEnh.description += ' ' + line.trim().replace(/\*\*/g, '');
		}
	}

	if (currentEnh) enhancements.push(currentEnh);
	return enhancements;
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

// Determine maneuver types based on position in source
function getManeuverType(name, index) {
	const attackManeuvers = [
		'Heroic Bash',
		'Savage Strike',
		'Sunder Strike',
		'Swift Strike',
		'Meteor Strike',
		'Cleave',
		'Whirlwind',
		'Pathcarver',
		'Piercing Shot',
		'Volley'
	];
	const defenseManeuvers = ['Parry', 'Brace', 'Side Step', 'Protect', 'Endure', 'Resolve', 'Swap'];
	const grappleManeuvers = ['Slam', 'Restrain', 'Body Block', 'Throw Creature'];

	if (attackManeuvers.includes(name)) return 'Attack';
	if (defenseManeuvers.includes(name)) return 'Defense';
	if (grappleManeuvers.includes(name)) return 'Grapple';
	return 'Utility';
}

// Generate output
let output = `/**
 * Maneuvers - DC20 v0.10
 *
 * 28 maneuvers organized by type:
 * - Attack (10) - Offensive strikes and area attacks
 * - Defense (7) - Protection and damage mitigation
 * - Grapple (4) - Close-quarters control
 * - Utility (7) - Movement and battlefield control
 *
 * Note: Techniques have been REMOVED in v0.10 - only Maneuvers remain.
 * Generated from docs/assets/DC20 0.10 full.md
 */

import type { Maneuver, ManeuverEnhancement } from '../schemas/maneuver.schema';
import { ManeuverType } from '../schemas/maneuver.schema';

export const maneuvers: Maneuver[] = [
`;

maneuvers.forEach((m, i) => {
	const id = toKebabCase(m.name);
	const type = getManeuverType(m.name, i);

	output += `	{
		id: '${id}',
		name: '${escapeString(m.name)}',
		type: ManeuverType.${type},
		cost: { ap: ${m.cost.ap}${m.cost.sp ? `, sp: ${m.cost.sp}` : ''} },
		range: '${escapeString(m.range)}',
		description: '${escapeString(m.description)}',
		isReaction: ${m.isReaction},`;

	if (m.trigger) {
		output += `
		trigger: '${escapeString(m.trigger)}',`;
	}

	output += `
		enhancements: [`;

	m.enhancements.forEach((e, ei) => {
		output += `
			{
				name: '${escapeString(e.name)}',
				costString: '${escapeString(e.costString)}',${e.sp ? `\n\t\t\t\tsp: ${e.sp},` : ''}${e.ap ? `\n\t\t\t\tap: ${e.ap},` : ''}${e.repeatable ? '\n\t\t\t\trepeatable: true,' : ''}
				description: '${escapeString(e.description)}'
			}${ei < m.enhancements.length - 1 ? ',' : ''}`;
	});

	output += `
		]
	}${i < maneuvers.length - 1 ? ',' : ''}
`;
});

output += `];

/** Alias for maneuvers array */
export const allManeuvers = maneuvers;

/** Get maneuver by ID */
export function getManeuverById(id: string): Maneuver | undefined {
	return maneuvers.find((m) => m.id === id);
}

/** Get maneuvers by type */
export function getManeuversByType(type: ManeuverType): Maneuver[] {
	return maneuvers.filter((m) => m.type === type);
}

/** Re-export types */
export type { Maneuver, ManeuverEnhancement, ManeuverCost } from '../schemas/maneuver.schema';
export { ManeuverType } from '../schemas/maneuver.schema';
`;

writeFileSync(OUTPUT_PATH, output);

console.log(`✅ Generated ${maneuvers.length} maneuvers`);
console.log('\nManeuvers by type:');
const types = { Attack: 0, Defense: 0, Grapple: 0, Utility: 0 };
maneuvers.forEach((m) => {
	types[getManeuverType(m.name)]++;
});
Object.entries(types).forEach(([type, count]) => {
	console.log(`  ${type}: ${count}`);
});
