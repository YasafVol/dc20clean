/**
 * Script to verify class features against DC20 0.10 full.md
 *
 * Usage: node scripts/verifyClassFeatures.mjs [className]
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_PATH = join(__dirname, '../docs/assets/DC20 0.10 full.md');
const content = readFileSync(DOCS_PATH, 'utf-8');

const CLASSES = [
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
];

const targetClass = process.argv[2]?.toLowerCase();

function extractClassSection(className) {
	// Find the class section in the doc
	const classNameCapital = className.charAt(0).toUpperCase() + className.slice(1);
	const regex = new RegExp(
		`### ${classNameCapital} Class Features([\\s\\S]*?)(?=### Subclasses|## [A-Z])`,
		'i'
	);
	const match = content.match(regex);
	return match ? match[1] : null;
}

function extractFeatures(classSection) {
	const features = [];
	// Match feature entries: **Feature Name** followed by description
	const featureRegex = /\*\*([A-Z][^*]+)\*\*\n([^*]+?)(?=\n\*\*[A-Z]|\n####|\n###|$)/g;

	let match;
	while ((match = featureRegex.exec(classSection)) !== null) {
		const [_, name, description] = match;
		// Skip level headers and notes
		if (name.includes('Level') || name.includes('DC Tip') || name.includes('Ending Early')) {
			continue;
		}
		features.push({
			name: name.trim(),
			description: description.trim().replace(/\n/g, ' ').substring(0, 200) + '...'
		});
	}
	return features;
}

function verifyClass(className) {
	console.log(`\n${'='.repeat(60)}`);
	console.log(`Verifying: ${className.toUpperCase()}`);
	console.log('='.repeat(60));

	const section = extractClassSection(className);
	if (!section) {
		console.log(`❌ Could not find class section for ${className}`);
		return;
	}

	const features = extractFeatures(section);
	console.log(`\nFound ${features.length} features in source doc:\n`);

	features.forEach((f, i) => {
		console.log(`${i + 1}. ${f.name}`);
		console.log(`   ${f.description}\n`);
	});
}

if (targetClass) {
	if (CLASSES.includes(targetClass)) {
		verifyClass(targetClass);
	} else {
		console.error(`Unknown class: ${targetClass}`);
		console.log('Available classes:', CLASSES.join(', '));
	}
} else {
	console.log('DC20 v0.10 Class Features Verification\n');
	console.log('Usage: node scripts/verifyClassFeatures.mjs [className]');
	console.log('\nAvailable classes:');
	CLASSES.forEach((c) => console.log(`  - ${c}`));

	console.log('\n\nQuick summary of features per class:\n');

	CLASSES.forEach((className) => {
		const section = extractClassSection(className);
		if (section) {
			const features = extractFeatures(section);
			console.log(`${className.padEnd(12)}: ${features.length} features`);
		} else {
			console.log(`${className.padEnd(12)}: ❌ Section not found`);
		}
	});
}
