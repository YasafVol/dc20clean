/**
 * Rules Data Validation Script
 *
 * Validates that our TypeScript rules data matches the source document.
 * Run with: node scripts/validateRulesData.mjs
 */

import * as fs from 'fs';

// Configuration
const SOURCE_DOC = 'docs/assets/DC20 0.10 full.md';
const REPORT_FILE = 'docs/validation-report.md';

const results = [];

function log(result) {
	results.push(result);
	const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
	console.log(`${icon} [${result.category}] ${result.item}: ${result.message}`);
}

function validateClassProgressions() {
	console.log('\n📊 Validating Class Progressions...\n');

	const classFiles = [
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

	for (const className of classFiles) {
		try {
			const filePath = `src/lib/rulesdata/classes-data/progressions/${className}.progression.ts`;
			if (fs.existsSync(filePath)) {
				const content = fs.readFileSync(filePath, 'utf-8');

				// Check for 20 levels
				const levelMatches = content.match(/level:\s*(\d+)/g) || [];
				const levelCount = levelMatches.length;

				// DC20 v0.10 is a level 1-10 system
				if (levelCount === 10) {
					log({
						category: 'Progression',
						item: className,
						status: 'pass',
						message: `Has all 10 levels defined (DC20 v0.10 max)`
					});
				} else {
					log({
						category: 'Progression',
						item: className,
						status: 'fail',
						message: `${levelCount} levels defined (expected 10 for DC20 v0.10)`
					});
				}

				// Check for gainedHealth at level 1
				const level1Match = content.match(/level:\s*1[\s\S]*?gainedHealth:\s*(\d+)/);
				if (level1Match) {
					log({
						category: 'Progression',
						item: `${className} L1 HP`,
						status: 'pass',
						message: `Level 1 HP: ${level1Match[1]}`
					});
				}
			} else {
				log({
					category: 'Progression',
					item: className,
					status: 'fail',
					message: `File not found: ${filePath}`
				});
			}
		} catch (error) {
			log({
				category: 'Progression',
				item: className,
				status: 'fail',
				message: `Error reading file: ${error}`
			});
		}
	}
}

function validateClassFeatures() {
	console.log('\n📊 Validating Class Features...\n');

	const classFiles = [
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

	for (const className of classFiles) {
		try {
			const filePath = `src/lib/rulesdata/classes-data/features/${className}_features.ts`;
			if (fs.existsSync(filePath)) {
				const content = fs.readFileSync(filePath, 'utf-8');

				// Count features
				const featureMatches = content.match(/id:\s*['"`][\w_]+['"`]/g) || [];
				const featureCount = featureMatches.length;

				// Check for coreFeatures array
				const hasCoreFeatures = content.includes('coreFeatures');
				// Check for subclasses array
				const hasSubclasses = content.includes('subclasses');

				log({
					category: 'Features',
					item: className,
					status: featureCount > 0 ? 'pass' : 'warn',
					message: `${featureCount} features, coreFeatures: ${hasCoreFeatures}, subclasses: ${hasSubclasses}`
				});
			} else {
				log({
					category: 'Features',
					item: className,
					status: 'warn',
					message: `File not found: ${filePath}`
				});
			}
		} catch (error) {
			log({
				category: 'Features',
				item: className,
				status: 'fail',
				message: `Error reading file: ${error}`
			});
		}
	}
}

function validateConditions() {
	console.log('\n📊 Validating Conditions...\n');

	try {
		const filePath = 'src/lib/rulesdata/conditions/conditions.data.ts';
		const content = fs.readFileSync(filePath, 'utf-8');

		// Count conditions
		const conditionMatches = content.match(/id:\s*['"`][\w-]+['"`]/g) || [];
		const conditionCount = conditionMatches.length;

		log({
			category: 'Conditions',
			item: 'count',
			status: conditionCount >= 27 ? 'pass' : 'warn',
			message: `${conditionCount} conditions defined (expected ~27-29)`
		});
	} catch (error) {
		log({
			category: 'Conditions',
			item: 'file',
			status: 'fail',
			message: `Error reading conditions: ${error}`
		});
	}
}

function validateSourceDocument() {
	console.log('\n📊 Checking Source Document...\n');

	try {
		if (fs.existsSync(SOURCE_DOC)) {
			const content = fs.readFileSync(SOURCE_DOC, 'utf-8');
			const lineCount = content.split('\n').length;

			log({
				category: 'Source',
				item: 'DC20 0.10 full.md',
				status: 'pass',
				message: `Source document found (${lineCount} lines)`
			});

			// Check for key sections
			const sections = [
				'Barbarian',
				'Bard',
				'Cleric',
				'Hunter',
				'Rogue',
				'Wizard',
				'Conditions',
				'Spell'
			];

			for (const section of sections) {
				const regex = new RegExp(`#.*${section}`, 'i');
				const hasSection = regex.test(content);
				log({
					category: 'Source',
					item: `Section: ${section}`,
					status: hasSection ? 'pass' : 'warn',
					message: hasSection ? 'Found in source' : 'Not found in source'
				});
			}
		} else {
			log({
				category: 'Source',
				item: 'DC20 0.10 full.md',
				status: 'fail',
				message: 'Source document not found!'
			});
		}
	} catch (error) {
		log({
			category: 'Source',
			item: 'file',
			status: 'fail',
			message: `Error reading source: ${error}`
		});
	}
}

function generateReport() {
	console.log('\n📝 Generating Report...\n');

	const passCount = results.filter((r) => r.status === 'pass').length;
	const warnCount = results.filter((r) => r.status === 'warn').length;
	const failCount = results.filter((r) => r.status === 'fail').length;

	const report = `# Rules Data Validation Report

Generated: ${new Date().toISOString()}

## Summary

- ✅ Pass: ${passCount}
- ⚠️ Warnings: ${warnCount}
- ❌ Failures: ${failCount}

## Details

${results
	.map((r) => {
		const icon = r.status === 'pass' ? '✅' : r.status === 'warn' ? '⚠️' : '❌';
		return `### ${icon} ${r.category}: ${r.item}\n${r.message}\n`;
	})
	.join('\n')}

## Manual Verification Checklist

For each class, verify against source document \`${SOURCE_DOC}\`:
- [ ] Level 1 starting HP matches
- [ ] Feature names match exactly
- [ ] Feature descriptions match (sample 2-3 per class)
- [ ] Subclass names match
- [ ] Progression values (SP/MP/Spells known) match
`;

	fs.writeFileSync(REPORT_FILE, report);
	console.log(`Report saved to: ${REPORT_FILE}`);
}

function main() {
	console.log('🔍 DC20 Rules Data Validation\n');
	console.log('='.repeat(50));

	validateSourceDocument();
	validateClassProgressions();
	validateClassFeatures();
	validateConditions();
	generateReport();

	console.log('\n' + '='.repeat(50));
	console.log('Validation complete. See report for details.');
}

main();
