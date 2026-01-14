/**
 * Rules Data Validation Script
 *
 * Validates that our TypeScript rules data matches the source document.
 * Run with: npx ts-node --esm scripts/validateRulesData.ts
 *
 * This script helps ensure no AI hallucinations in the data by:
 * 1. Checking data structure completeness
 * 2. Validating IDs follow naming conventions
 * 3. Checking for required fields
 * 4. Generating a report for human review
 */

import * as fs from 'fs';
import * as path from 'path';

// Configuration
const SOURCE_DOC = 'docs/assets/DC20 0.10 full.md';
const REPORT_FILE = 'docs/validation-report.md';

interface ValidationResult {
	category: string;
	item: string;
	status: 'pass' | 'warn' | 'fail';
	message: string;
	sourceText?: string;
}

const results: ValidationResult[] = [];

function log(result: ValidationResult) {
	results.push(result);
	const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
	console.log(`${icon} [${result.category}] ${result.item}: ${result.message}`);
}

async function validateClassProgressions() {
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

				if (levelCount === 20) {
					log({
						category: 'Progression',
						item: className,
						status: 'pass',
						message: `Has all 20 levels defined`
					});
				} else {
					log({
						category: 'Progression',
						item: className,
						status: 'fail',
						message: `Only ${levelCount} levels defined (expected 20)`
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

async function validateClassFeatures() {
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

async function validateConditions() {
	console.log('\n📊 Validating Conditions...\n');

	try {
		const filePath = 'src/lib/rulesdata/conditions/conditions.data.ts';
		const content = fs.readFileSync(filePath, 'utf-8');

		// Count conditions
		const conditionMatches = content.match(/id:\s*['"`][\w-]+['"`]/g) || [];
		const conditionCount = conditionMatches.length;

		// Expected conditions from DC20 v0.10
		const expectedConditions = [
			'bleeding-x',
			'blinded',
			'burning-x',
			'charmed',
			'dazed-x',
			'deafened',
			'disoriented-x',
			'doomed-x',
			'exhaustion-x',
			'exposed-x',
			'frightened',
			'hindered-x',
			'immobilized',
			'impaired-x',
			'incapacitated',
			'intimidated',
			'invisible',
			'paralyzed',
			'petrified',
			'poisoned',
			'restrained',
			'slowed-x',
			'stunned-x',
			'surprised',
			'taunted',
			'terrified',
			'tethered',
			'unconscious',
			'weakened-x'
		];

		log({
			category: 'Conditions',
			item: 'count',
			status: conditionCount >= 27 ? 'pass' : 'warn',
			message: `${conditionCount} conditions defined (expected ~27-29)`
		});

		// Check for each expected condition
		for (const condId of expectedConditions) {
			const hasCondition = content.includes(`'${condId}'`) || content.includes(`"${condId}"`);
			if (!hasCondition) {
				log({
					category: 'Conditions',
					item: condId,
					status: 'warn',
					message: `Condition not found in data`
				});
			}
		}
	} catch (error) {
		log({
			category: 'Conditions',
			item: 'file',
			status: 'fail',
			message: `Error reading conditions: ${error}`
		});
	}
}

async function validateSourceDocument() {
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
				'Spells'
			];

			for (const section of sections) {
				const hasSection = content.toLowerCase().includes(section.toLowerCase());
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

async function generateReport() {
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

## Next Steps

1. Review any warnings or failures above
2. Compare flagged items against source document: \`${SOURCE_DOC}\`
3. Update data files as needed
4. Re-run this script to verify fixes

## Manual Verification Checklist

For each class, verify in the source document:
- [ ] Level 1 starting HP matches
- [ ] Feature names match exactly
- [ ] Feature descriptions match (sample 2-3 per class)
- [ ] Subclass names match
- [ ] Progression values (SP/MP/Spells known) match
`;

	fs.writeFileSync(REPORT_FILE, report);
	console.log(`Report saved to: ${REPORT_FILE}`);
}

async function main() {
	console.log('🔍 DC20 Rules Data Validation\n');
	console.log('='.repeat(50));

	await validateSourceDocument();
	await validateClassProgressions();
	await validateClassFeatures();
	await validateConditions();
	await generateReport();

	console.log('\n' + '='.repeat(50));
	console.log('Validation complete. See report for details.');
}

main().catch(console.error);
