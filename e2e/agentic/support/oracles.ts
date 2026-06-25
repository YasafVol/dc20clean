import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { expect, type Page } from '@playwright/test';
import type { AgenticCharacterRecipe } from '../recipes/types';
import type { AgenticRunLogger } from './runLogger';

type SavedCharacterLike = Record<string, any>;

export interface AgenticOracleReport {
	status: 'passed' | 'failed';
	mismatches: Array<Record<string, unknown>>;
	expected: Record<string, unknown>;
	actual: Record<string, unknown>;
}

export interface SavedExpectationReport {
	status: 'passed' | 'failed';
	expected: Record<string, unknown>;
	actual: Record<string, unknown>;
	mismatches: Array<{
		field: string;
		expected: unknown;
		actual: unknown;
	}>;
}

function selectedSpellCount(character: SavedCharacterLike): number {
	if (Array.isArray(character.spells)) return character.spells.length;
	const selected = character.selectedSpells;
	if (!selected || typeof selected !== 'object') return 0;
	return Object.keys(selected).length;
}

function selectedManeuverCount(character: SavedCharacterLike): number {
	if (Array.isArray(character.maneuvers)) return character.maneuvers.length;
	return Array.isArray(character.selectedManeuvers) ? character.selectedManeuvers.length : 0;
}

function spellNames(character: SavedCharacterLike): string[] {
	if (Array.isArray(character.spells)) {
		return character.spells.map((spell) => spell.spellName).filter(Boolean);
	}
	return [];
}

function maneuverNames(character: SavedCharacterLike): string[] {
	if (Array.isArray(character.maneuvers)) {
		return character.maneuvers.map((maneuver) => maneuver.name).filter(Boolean);
	}
	return Array.isArray(character.selectedManeuvers) ? character.selectedManeuvers : [];
}

function combatTrainingTypes(character: SavedCharacterLike): string[] {
	if (!Array.isArray(character.combatTraining)) return [];
	return character.combatTraining.map((training) => training.type).filter(Boolean);
}

function senseRanges(character: SavedCharacterLike): Record<string, number> {
	if (!Array.isArray(character.senses)) return {};
	return Object.fromEntries(
		character.senses
			.filter((sense) => sense?.type && typeof sense.range === 'number')
			.map((sense) => [sense.type, sense.range])
	);
}

function languageFluencies(character: SavedCharacterLike): Record<string, string> {
	const languages = character.languagesData ?? {};
	return Object.fromEntries(
		Object.entries(languages).map(([languageId, value]) => {
			if (value && typeof value === 'object' && 'fluency' in value) {
				return [languageId, String((value as { fluency: unknown }).fluency)];
			}
			return [languageId, String(value)];
		})
	);
}

export function assertRecipeSavedExpectations(
	recipe: AgenticCharacterRecipe,
	saved: SavedCharacterLike
): void {
	const report = buildSavedExpectationReport(recipe, saved);
	expect(report.mismatches, JSON.stringify(report.mismatches, null, 2)).toEqual([]);
	expect(report.status).toBe('passed');
}

function compareField(
	mismatches: SavedExpectationReport['mismatches'],
	field: string,
	expected: unknown,
	actual: unknown
) {
	if (JSON.stringify(expected) !== JSON.stringify(actual)) {
		mismatches.push({ field, expected, actual });
	}
}

export function buildSavedExpectationReport(
	recipe: AgenticCharacterRecipe,
	saved: SavedCharacterLike
): SavedExpectationReport {
	const actual = {
		identity: {
			classId: saved.classId,
			ancestry1Id: saved.ancestry1Id,
			...(recipe.expectedSaved.identity.ancestry2Id !== undefined
				? { ancestry2Id: saved.ancestry2Id ?? null }
				: {}),
			level: saved.level
		},
		finalStats: Object.fromEntries(
			Object.keys(recipe.expectedSaved.finalStats).map((field) => [field, saved[field]])
		),
		selectedTraitIds: saved.selectedTraitIds,
		skillsData: saved.skillsData,
		tradesData: saved.tradesData,
		languagesData: languageFluencies(saved),
		spells: spellNames(saved),
		maneuvers: maneuverNames(saved),
		combatTraining: combatTrainingTypes(saved),
		...(recipe.expectedSaved.selectedFeatureChoices
			? { selectedFeatureChoices: saved.selectedFeatureChoices }
			: {}),
		...(recipe.expectedSaved.selectedTalents ? { selectedTalents: saved.selectedTalents } : {}),
		...(recipe.expectedSaved.pathPointAllocations
			? { pathPointAllocations: saved.pathPointAllocations }
			: {}),
		...(recipe.expectedSaved.selectedSubclass ? { selectedSubclass: saved.selectedSubclass } : {}),
		...(recipe.expectedSaved.senses ? { senses: senseRanges(saved) } : {}),
		...(recipe.expectedSaved.backgroundConversions
			? {
					backgroundConversions: {
						skillToTrade: saved.skillToTradeConversions ?? 0,
						tradeToLanguage: saved.tradeToLanguageConversions ?? 0
					}
				}
			: {})
	};
	const expected = {
		identity: recipe.expectedSaved.identity,
		finalStats: recipe.expectedSaved.finalStats,
		selectedTraitIds: recipe.expectedSaved.selectedTraitIds,
		skillsData: recipe.expectedSaved.skillsData,
		tradesData: recipe.expectedSaved.tradesData,
		languagesData: recipe.expectedSaved.languagesData,
		spells: recipe.expectedSaved.spells,
		maneuvers: recipe.expectedSaved.maneuvers,
		combatTraining: recipe.expectedSaved.combatTraining,
		...(recipe.expectedSaved.selectedFeatureChoices
			? { selectedFeatureChoices: recipe.expectedSaved.selectedFeatureChoices }
			: {}),
		...(recipe.expectedSaved.selectedTalents
			? { selectedTalents: recipe.expectedSaved.selectedTalents }
			: {}),
		...(recipe.expectedSaved.pathPointAllocations
			? { pathPointAllocations: recipe.expectedSaved.pathPointAllocations }
			: {}),
		...(recipe.expectedSaved.selectedSubclass
			? { selectedSubclass: recipe.expectedSaved.selectedSubclass }
			: {}),
		...(recipe.expectedSaved.senses ? { senses: recipe.expectedSaved.senses } : {}),
		...(recipe.expectedSaved.backgroundConversions
			? { backgroundConversions: recipe.expectedSaved.backgroundConversions }
			: {})
	};
	const mismatches: SavedExpectationReport['mismatches'] = [];

	compareField(mismatches, 'identity', expected.identity, actual.identity);
	compareField(mismatches, 'finalStats', expected.finalStats, actual.finalStats);
	compareField(mismatches, 'selectedTraitIds', expected.selectedTraitIds, actual.selectedTraitIds);
	compareField(mismatches, 'skillsData', expected.skillsData, actual.skillsData);
	compareField(mismatches, 'tradesData', expected.tradesData, actual.tradesData);
	compareField(mismatches, 'languagesData', expected.languagesData, actual.languagesData);
	compareField(mismatches, 'spells', expected.spells, actual.spells);
	compareField(mismatches, 'maneuvers', expected.maneuvers, actual.maneuvers);
	if (recipe.expectedSaved.selectedFeatureChoices) {
		for (const [choiceId, expectedValue] of Object.entries(
			recipe.expectedSaved.selectedFeatureChoices
		)) {
			compareField(
				mismatches,
				`selectedFeatureChoices.${choiceId}`,
				expectedValue,
				actual.selectedFeatureChoices?.[choiceId]
			);
		}
	}
	if (recipe.expectedSaved.selectedTalents) {
		compareField(mismatches, 'selectedTalents', expected.selectedTalents, actual.selectedTalents);
	}
	if (recipe.expectedSaved.pathPointAllocations) {
		compareField(
			mismatches,
			'pathPointAllocations',
			expected.pathPointAllocations,
			actual.pathPointAllocations
		);
	}
	if (recipe.expectedSaved.selectedSubclass) {
		compareField(
			mismatches,
			'selectedSubclass',
			expected.selectedSubclass,
			actual.selectedSubclass
		);
	}
	if (recipe.expectedSaved.senses) {
		for (const [senseId, expectedRange] of Object.entries(recipe.expectedSaved.senses)) {
			compareField(mismatches, `senses.${senseId}`, expectedRange, actual.senses?.[senseId]);
		}
	}
	if (recipe.expectedSaved.backgroundConversions) {
		compareField(
			mismatches,
			'backgroundConversions',
			expected.backgroundConversions,
			actual.backgroundConversions
		);
	}

	for (const expectedTraining of recipe.expectedSaved.combatTraining) {
		if (!actual.combatTraining.includes(expectedTraining)) {
			mismatches.push({
				field: 'combatTraining',
				expected: expectedTraining,
				actual: actual.combatTraining
			});
		}
	}

	compareField(
		mismatches,
		'spellCount',
		recipe.expectedSaved.spells.length,
		selectedSpellCount(saved)
	);
	compareField(
		mismatches,
		'maneuverCount',
		recipe.expectedSaved.maneuvers.length,
		selectedManeuverCount(saved)
	);

	return {
		status: mismatches.length === 0 ? 'passed' : 'failed',
		expected,
		actual,
		mismatches
	};
}

export function runCalculatorOracle({
	logger,
	savedCharacterPath
}: {
	logger: AgenticRunLogger;
	savedCharacterPath: string;
}): AgenticOracleReport {
	const reportPath = path.join(logger.artifactDir, 'oracle-report.json');
	const viteNodeBin = path.resolve(process.cwd(), 'node_modules/.bin/vite-node');
	const scriptPath = path.resolve(process.cwd(), 'scripts/e2e/calculateAgenticOracle.ts');

	try {
		execFileSync(viteNodeBin, [scriptPath, '--input', savedCharacterPath, '--out', reportPath], {
			stdio: 'pipe'
		});
	} catch (error) {
		const reportExists = fs.existsSync(reportPath);
		if (!reportExists) {
			throw error;
		}
	}

	const report = JSON.parse(fs.readFileSync(reportPath, 'utf8')) as AgenticOracleReport;
	logger.record('oracle.calculator', `Calculator oracle ${report.status}`, {
		mismatches: report.mismatches
	});
	return report;
}

export function assertOraclePassed(report: AgenticOracleReport): void {
	expect(report.mismatches, JSON.stringify(report.mismatches, null, 2)).toEqual([]);
	expect(report.status).toBe('passed');
}

export async function assertRecipeSheetExpectations(
	page: Page,
	recipe: AgenticCharacterRecipe
): Promise<void> {
	for (const text of recipe.expectedSheet.visibleText) {
		await expect(page.getByText(text).first(), `sheet text: ${text}`).toBeVisible();
	}
}
