#!/usr/bin/env node
/**
 * Script to add `sustained` boolean property to all spell files
 *
 * This script:
 * 1. Finds all spell .ts files in src/lib/rulesdata/spells-data/
 * 2. Checks if duration contains "(Sustained)"
 * 3. Adds `sustained: true` or `sustained: false` property after `duration`
 * 4. Writes the changes back to each file
 *
 * Usage: node scripts/addSustainedProperty.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPELLS_DATA_DIR = path.join(__dirname, '../src/lib/rulesdata/spells-data');

// Schools/subdirectories to process
const SPELL_SCHOOLS = [
	'astromancy',
	'conjuration',
	'divination',
	'elemental',
	'enchantment',
	'invocation',
	'nullification',
	'transmutation'
];

function getAllSpellFiles() {
	const spellFiles = [];

	for (const school of SPELL_SCHOOLS) {
		const schoolDir = path.join(SPELLS_DATA_DIR, school);
		if (!fs.existsSync(schoolDir)) {
			console.warn(`Warning: School directory not found: ${schoolDir}`);
			continue;
		}

		const files = fs.readdirSync(schoolDir);
		for (const file of files) {
			// Skip index.ts files - they just re-export spells
			if (file === 'index.ts') continue;
			if (!file.endsWith('.ts')) continue;

			spellFiles.push({
				school,
				filePath: path.join(schoolDir, file),
				fileName: file
			});
		}
	}

	return spellFiles;
}

function processSpellFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');

	// Check if sustained property already exists
	if (content.includes('sustained:')) {
		return { modified: false, reason: 'already has sustained property' };
	}

	// Find the duration line and check if it contains "(Sustained)"
	const durationMatch = content.match(/duration:\s*['"`]([^'"`]+)['"`]/);
	if (!durationMatch) {
		return { modified: false, reason: 'no duration field found' };
	}

	const duration = durationMatch[1];
	const isSustained = duration.includes('Sustained');

	// Insert sustained property after duration line
	// Match the duration line with its trailing comma and whitespace
	const durationLineRegex = /(duration:\s*['"`][^'"`]+['"`],?\s*\n)/;
	const durationLineMatch = content.match(durationLineRegex);

	if (!durationLineMatch) {
		return { modified: false, reason: 'could not match duration line pattern' };
	}

	const durationLine = durationLineMatch[1];
	// Ensure the duration line ends with a comma
	const durationLineWithComma = durationLine.trimEnd().endsWith(',')
		? durationLine
		: durationLine.replace(/(\s*\n)$/, ',\n');

	// Get the indentation from the duration line
	const indentMatch = content.match(/(\t+)duration:/);
	const indent = indentMatch ? indentMatch[1] : '\t';

	// Create the new content with sustained property
	const newContent = content.replace(
		durationLineRegex,
		`${durationLineWithComma}${indent}sustained: ${isSustained},\n`
	);

	// Write the modified content back
	fs.writeFileSync(filePath, newContent, 'utf-8');

	return {
		modified: true,
		sustained: isSustained,
		duration
	};
}

function main() {
	console.log('🔮 Adding sustained property to all spell files...\n');

	const spellFiles = getAllSpellFiles();
	console.log(`Found ${spellFiles.length} spell files to process\n`);

	const results = {
		modified: 0,
		skipped: 0,
		errors: 0,
		sustainedTrue: 0,
		sustainedFalse: 0
	};

	const sustainedSpells = [];

	for (const { school, filePath, fileName } of spellFiles) {
		try {
			const result = processSpellFile(filePath);

			if (result.modified) {
				results.modified++;
				if (result.sustained) {
					results.sustainedTrue++;
					sustainedSpells.push({ school, fileName, duration: result.duration });
				} else {
					results.sustainedFalse++;
				}
				console.log(`✅ ${school}/${fileName} - sustained: ${result.sustained}`);
			} else {
				results.skipped++;
				console.log(`⏭️  ${school}/${fileName} - skipped (${result.reason})`);
			}
		} catch (error) {
			results.errors++;
			console.error(`❌ ${school}/${fileName} - ERROR: ${error.message}`);
		}
	}

	console.log('\n' + '='.repeat(60));
	console.log('📊 Summary:');
	console.log(`   Modified: ${results.modified} files`);
	console.log(`   - Sustained=true: ${results.sustainedTrue}`);
	console.log(`   - Sustained=false: ${results.sustainedFalse}`);
	console.log(`   Skipped: ${results.skipped} files`);
	console.log(`   Errors: ${results.errors} files`);

	if (sustainedSpells.length > 0) {
		console.log('\n🔄 Spells with Sustained duration:');
		for (const { school, fileName, duration } of sustainedSpells) {
			console.log(`   - ${school}/${fileName}: ${duration}`);
		}
	}

	console.log('\n✨ Done!');
}

main();
