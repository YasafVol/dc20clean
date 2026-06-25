import fs from 'node:fs';
import path from 'node:path';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../../src/lib/services/enhancedCharacterCalculator';
import type { SavedCharacter } from '../../src/lib/types/dataContracts';

interface CliOptions {
	input?: string;
	out?: string;
}

const STAT_COMPARISONS = [
	{ saved: 'finalHPMax', oracle: 'finalHPMax' },
	{ saved: 'finalSPMax', oracle: 'finalSPMax' },
	{ saved: 'finalMPMax', oracle: 'finalMPMax' },
	{ saved: 'finalPD', oracle: 'finalPD' },
	{ saved: 'finalAD', oracle: 'finalAD' },
	{ saved: 'finalPDR', oracle: 'finalPDR' },
	{ saved: 'finalSaveDC', oracle: 'finalSaveDC' },
	{ saved: 'finalMoveSpeed', oracle: 'finalMoveSpeed' },
	{ saved: 'finalJumpDistance', oracle: 'finalJumpDistance' },
	{ saved: 'finalRestPoints', oracle: 'finalRestPoints' },
	{ saved: 'finalGritPoints', oracle: 'finalGritPoints' },
	{ saved: 'finalInitiativeBonus', oracle: 'finalInitiativeBonus' }
];

function parseArgs(argv: string[]): CliOptions {
	const options: CliOptions = {};
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		const value = argv[index + 1];
		if (arg === '--input') {
			options.input = value;
			index += 1;
		} else if (arg === '--out') {
			options.out = value;
			index += 1;
		} else {
			throw new Error(`Unknown argument: ${arg}`);
		}
	}
	return options;
}

function selectedSpellCount(character: SavedCharacter): number {
	if (Array.isArray((character as any).spells)) return (character as any).spells.length;
	const selected = character.selectedSpells;
	if (!selected || typeof selected !== 'object') return 0;
	return Object.keys(selected).length;
}

function selectedManeuverCount(character: SavedCharacter): number {
	if (Array.isArray((character as any).maneuvers)) return (character as any).maneuvers.length;
	return Array.isArray(character.selectedManeuvers) ? character.selectedManeuvers.length : 0;
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	if (!options.input) {
		throw new Error('Missing --input <saved-character.json>');
	}

	const inputPath = path.resolve(process.cwd(), options.input);
	const saved = JSON.parse(fs.readFileSync(inputPath, 'utf8')) as SavedCharacter;
	const result = calculateCharacterWithBreakdowns(convertToEnhancedBuildData(saved));
	const mismatches: Array<{
		type: string;
		field: string;
		saved: unknown;
		expected: unknown;
	}> = [];

	for (const comparison of STAT_COMPARISONS) {
		const savedValue = (saved as unknown as Record<string, unknown>)[comparison.saved];
		const oracleValue = (result.stats as unknown as Record<string, unknown>)[comparison.oracle];
		if (savedValue !== oracleValue) {
			mismatches.push({
				type: 'stat',
				field: comparison.saved,
				saved: savedValue,
				expected: oracleValue
			});
		}
	}

	const expectedSpellSelections = result.spellsKnownSlots?.length ?? 0;
	const actualSpellSelections = selectedSpellCount(saved);
	if (actualSpellSelections !== expectedSpellSelections) {
		mismatches.push({
			type: 'selection',
			field: 'selectedSpells',
			saved: actualSpellSelections,
			expected: expectedSpellSelections
		});
	}

	const expectedManeuverSelections = result.levelBudgets?.totalManeuversKnown ?? 0;
	const actualManeuverSelections = selectedManeuverCount(saved);
	if (actualManeuverSelections !== expectedManeuverSelections) {
		mismatches.push({
			type: 'selection',
			field: 'selectedManeuvers',
			saved: actualManeuverSelections,
			expected: expectedManeuverSelections
		});
	}

	const report = {
		status: mismatches.length === 0 ? 'passed' : 'failed',
		character: {
			id: saved.id,
			name: saved.finalName,
			classId: saved.classId,
			level: saved.level
		},
		expected: {
			stats: Object.fromEntries(
				STAT_COMPARISONS.map((comparison) => [
					comparison.saved,
					(result.stats as unknown as Record<string, unknown>)[comparison.oracle]
				])
			),
			selectedSpells: expectedSpellSelections,
			selectedManeuvers: expectedManeuverSelections
		},
		actual: {
			stats: Object.fromEntries(
				STAT_COMPARISONS.map((comparison) => [
					comparison.saved,
					(saved as unknown as Record<string, unknown>)[comparison.saved]
				])
			),
			selectedSpells: actualSpellSelections,
			selectedManeuvers: actualManeuverSelections
		},
		validation: result.validation,
		mismatches
	};

	const serialized = `${JSON.stringify(report, null, 2)}\n`;
	if (options.out) {
		const outPath = path.resolve(process.cwd(), options.out);
		fs.mkdirSync(path.dirname(outPath), { recursive: true });
		fs.writeFileSync(outPath, serialized, 'utf8');
	} else {
		process.stdout.write(serialized);
	}

	if (mismatches.length > 0) {
		process.exitCode = 1;
	}
}

main();
