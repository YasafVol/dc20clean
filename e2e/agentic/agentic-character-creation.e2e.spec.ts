import { test } from '@playwright/test';
import { smokeRecipes } from './recipes/spellbladeHybridSmoke';
import { runCharacterCreationRecipe } from './support/recipeExecutor';
import { classifyAgenticFailure, createAgenticRunLogger } from './support/runLogger';
import {
	assertOraclePassed,
	assertRecipeSavedExpectations,
	assertRecipeSheetExpectations,
	buildSavedExpectationReport,
	runCalculatorOracle
} from './support/oracles';

test.describe('Agentic character creation recipes', () => {
	test.beforeEach(async ({ context }) => {
		await context.addInitScript(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
	});

	for (const recipe of smokeRecipes) {
		test(recipe.name, async ({ page }, testInfo) => {
			const logger = createAgenticRunLogger({ page, testInfo, recipeId: recipe.id });
			let status: 'passed' | 'failed' = 'failed';
			let finalData: unknown;

			try {
				const saved = await runCharacterCreationRecipe({ page, recipe, logger });
				const savedExpectationReport = buildSavedExpectationReport(recipe, saved);
				logger.writeJson('saved-expectation-report.json', savedExpectationReport);
				assertRecipeSavedExpectations(recipe, saved);

				const savedPath = logger.writeJson('saved-character-for-oracle.json', saved);
				const oracleReport = runCalculatorOracle({ logger, savedCharacterPath: savedPath });
				assertOraclePassed(oracleReport);

				logger.record('recipe.step', 'Opening saved character sheet');
				const charCard = page.locator('div', { hasText: recipe.characterName }).first();
				await charCard.getByRole('button', { name: 'View Sheet' }).click();
				await page.waitForURL('**/character/**');
				await assertRecipeSheetExpectations(page, recipe);

				status = 'passed';
				finalData = { oracle: oracleReport };
			} catch (error) {
				await logger.screenshot(page, 'failure.png').catch(() => undefined);
				logger.record(
					'runner.failure',
					error instanceof Error ? error.message : String(error),
					{ stack: error instanceof Error ? error.stack : undefined },
					'error'
				);
				finalData = {
					error: error instanceof Error ? error.message : String(error),
					classification: classifyAgenticFailure(error)
				};
				throw error;
			} finally {
				await logger.finalize(
					status,
					finalData,
					status === 'failed' && finalData && typeof finalData === 'object'
						? (finalData as { classification?: ReturnType<typeof classifyAgenticFailure> })
								.classification
						: undefined
				);
			}
		});
	}
});
