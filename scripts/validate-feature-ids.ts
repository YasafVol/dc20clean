#!/usr/bin/env node
/**
 * Feature ID Validation Script
 * 
 * Validates that all feature IDs referenced in progression files
 * exist in the corresponding class feature definitions.
 * 
 * Usage: npx tsx scripts/validate-feature-ids.ts
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface ProgressionLevel {
	level: number;
	gains?: {
		classFeatures?: string[];
		subclassFeatureChoice?: boolean;
	};
}

interface ValidationResult {
	className: string;
	missingIds: string[];
	definedIds: string[];
	referencedIds: string[];
	ok: boolean;
}

const CLASSES_DIR = 'src/lib/rulesdata/classes-data';
const FEATURES_DIR = join(CLASSES_DIR, 'features');
const PROGRESSIONS_DIR = join(CLASSES_DIR, 'progressions');

/**
 * Extract feature IDs from a TypeScript feature file
 */
function extractFeatureIds(filePath: string): string[] {
	const content = readFileSync(filePath, 'utf-8');
	const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
	return Array.from(idMatches, m => m[1]);
}

/**
 * Extract referenced feature IDs from a progression file
 */
function extractProgressionFeatureIds(filePath: string): string[] {
	const content = readFileSync(filePath, 'utf-8');
	
	// Extract the export statement to get the progression array
	const exportMatch = content.match(/export const \w+Progression:\s*any\[\]\s*=\s*(\[[\s\S]*\]);/);
	if (!exportMatch) {
		console.warn(`⚠️  Could not parse progression array in ${filePath}`);
		return [];
	}
	
	try {
		// Parse the JSON array (it's valid JSON in the files)
		const progression: ProgressionLevel[] = JSON.parse(exportMatch[1]);
		
		const featureIds: string[] = [];
		for (const level of progression) {
			if (level.gains?.classFeatures) {
				featureIds.push(...level.gains.classFeatures);
			}
		}
		
		return featureIds;
	} catch (error) {
		console.warn(`⚠️  Failed to parse progression data in ${filePath}: ${error}`);
		return [];
	}
}

/**
 * Get class name from file name
 */
function getClassName(fileName: string): string {
	return fileName
		.replace(/_features\.ts$/, '')
		.replace(/\.progression\.ts$/, '')
		.replace(/^(\w)/, (m) => m.toUpperCase());
}

/**
 * Validate a single class
 */
function validateClass(className: string): ValidationResult {
	const classKey = className.toLowerCase();
	const featuresFile = join(FEATURES_DIR, `${classKey}_features.ts`);
	const progressionFile = join(PROGRESSIONS_DIR, `${classKey}.progression.ts`);
	
	const definedIds = extractFeatureIds(featuresFile);
	const referencedIds = extractProgressionFeatureIds(progressionFile);
	
	// Filter out placeholders - they're expected to not exist yet
	const nonPlaceholderRefs = referencedIds.filter(id => !id.startsWith('placeholder_'));
	
	const missingIds = nonPlaceholderRefs.filter(id => !definedIds.includes(id));
	const ok = missingIds.length === 0;
	
	return {
		className,
		missingIds,
		definedIds,
		referencedIds: nonPlaceholderRefs,
		ok
	};
}

/**
 * Main validation logic
 */
function main() {
	console.log('🔍 Feature ID Validation\n');
	console.log('Checking that all feature IDs in progression files exist in feature definitions...\n');
	
	// Get all class feature files
	const featureFiles = readdirSync(FEATURES_DIR)
		.filter(f => f.endsWith('_features.ts'))
		.sort();
	
	const results: ValidationResult[] = [];
	
	for (const file of featureFiles) {
		const className = getClassName(file);
		const result = validateClass(className);
		results.push(result);
	}
	
	// Report results
	let allOk = true;
	
	for (const result of results) {
		if (result.ok) {
			console.log(`✅ ${result.className}: All ${result.referencedIds.length} feature IDs validated`);
		} else {
			allOk = false;
			console.log(`❌ ${result.className}: ${result.missingIds.length} missing feature ID(s)`);
			for (const id of result.missingIds) {
				console.log(`   - "${id}" referenced in progression but not defined`);
			}
		}
	}
	
	// Summary
	console.log('\n' + '='.repeat(60));
	const okCount = results.filter(r => r.ok).length;
	const totalCount = results.length;
	const totalRefs = results.reduce((sum, r) => sum + r.referencedIds.length, 0);
	const totalDefined = results.reduce((sum, r) => sum + r.definedIds.length, 0);
	const totalMissing = results.reduce((sum, r) => sum + r.missingIds.length, 0);
	
	console.log(`\n📊 Summary:`);
	console.log(`   Classes validated: ${okCount}/${totalCount}`);
	console.log(`   Feature IDs defined: ${totalDefined}`);
	console.log(`   Feature IDs referenced: ${totalRefs}`);
	console.log(`   Missing IDs: ${totalMissing}`);
	
	if (allOk) {
		console.log('\n✨ All feature IDs are consistent!\n');
		process.exit(0);
	} else {
		console.log('\n⚠️  Some feature IDs need attention.\n');
		process.exit(1);
	}
}

main();
