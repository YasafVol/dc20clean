import { expect, test } from '@playwright/test';
import { runRecipe, type RecipeStep } from './support/recipe';

const createFlowUrl = '/';

async function openCharacterCreation(page: Parameters<RecipeStep['run']>[0]) {
	await page.goto(createFlowUrl);
	await page.getByRole('button', { name: /Create Character/i }).click();
}

async function chooseStartingLevel(page: Parameters<RecipeStep['run']>[0], level: number) {
	await page.getByTestId('starting-level-select').click();
	await page.getByTestId(`starting-level-option-${level}`).click();
}

test.describe('Character creation flow recipes', () => {
	test.beforeEach(async ({ context }) => {
		await context.addInitScript(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
	});

	test('blocks jumping ahead from an incomplete step', async ({ page }) => {
		await runRecipe(page, [
			{
				name: 'Open character creation',
				run: openCharacterCreation
			},
			{
				name: 'Try to jump directly to Name',
				run: async (page) => {
					await page.getByTestId('creation-step-name').click();
				}
			},
			{
				name: 'Stay on Class step',
				run: async (page) => {
					await expect(page.getByTestId('creation-step-class')).toHaveAttribute(
						'aria-current',
						'step'
					);
					await expect(page.getByText(/complete prior steps/i)).toBeVisible();
				}
			}
		]);
	});

	test('exposes all eight steps for a leveled hybrid character', async ({ page }) => {
		await runRecipe(page, [
			{
				name: 'Open character creation',
				run: openCharacterCreation
			},
			{
				name: 'Choose level 2 Spellblade',
				run: async (page) => {
					await chooseStartingLevel(page, 2);
					await page.getByTestId('class-card-spellblade').click();

					const schoolCheckbox = page.locator('input[type=checkbox][value="Elemental"]');
					if (await schoolCheckbox.isVisible().catch(() => false)) {
						await schoolCheckbox.check();
					}
				}
			},
			{
				name: 'Observe the full hybrid flow',
				run: async (page) => {
					const expectedStepIds = [
						'class',
						'leveling',
						'ancestry',
						'attributes',
						'background',
						'spells',
						'maneuvers',
						'name'
					];

					for (const stepId of expectedStepIds) {
						await expect(page.getByTestId(`creation-step-${stepId}`)).toBeVisible();
					}

					await expect(page.getByTestId('creation-step-number-name')).toHaveText('8');
				}
			}
		]);
	});
});
