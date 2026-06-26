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

async function spendBackgroundForHumanBarbarian(page: Parameters<RecipeStep['run']>[0]) {
	for (const skill of [
		'athletics',
		'intimidation',
		'acrobatics',
		'survival',
		'awareness',
		'stealth'
	]) {
		await page.getByTestId(`skill-${skill}-mastery-1`).click();
	}
	await expect(page.getByTestId('skills-tab')).toContainText('0 left');

	await page.getByTestId('trades-tab').click();
	for (const trade of ['blacksmithing', 'leatherworking', 'cooking']) {
		await page.getByTestId(`trade-${trade}-mastery-1`).click();
	}
	await expect(page.getByTestId('trades-tab')).toContainText('0 left');

	await page.getByTestId('languages-tab').click();
	await page.getByTestId('language-item-human').getByRole('button', { name: 'Fluent (2)' }).click();
	await expect(page.getByTestId('languages-tab')).toContainText('0 left');
}

const humanBarbarianCreationRecipe: RecipeStep[] = [
	{
		name: 'Open character creation',
		run: openCharacterCreation
	},
	{
		name: 'Choose level 1 Barbarian',
		run: async (page) => {
			await page.getByTestId('class-card-barbarian').click();
			await page.getByTestId('creation-next').click();
		}
	},
	{
		name: 'Spend Human ancestry points',
		run: async (page) => {
			await page.getByTestId('ancestry-card-human').click();
			for (const trait of [
				'human_attribute_increase',
				'human_resolve',
				'human_determination',
				'human_unbreakable'
			]) {
				await page.getByTestId(`trait-card-${trait}`).click();
			}
			await expect(page.getByText('Spent: 5 | Remaining: 0/5')).toBeVisible();
			await page.getByTestId('creation-next').click();
		}
	},
	{
		name: 'Spend attribute points',
		run: async (page) => {
			const attributeClicks = { might: 5, agility: 3, charisma: 2, intelligence: 3 };
			for (const [attribute, clicks] of Object.entries(attributeClicks)) {
				for (let index = 0; index < clicks; index += 1) {
					await page.getByTestId(`${attribute}-increase`).click();
				}
			}
			await expect(page.getByText('Spent: 13 | Remaining: 0')).toBeVisible();
			await page.getByTestId('creation-next').click();
		}
	},
	{
		name: 'Spend background points and advance',
		run: async (page) => {
			await spendBackgroundForHumanBarbarian(page);
			await page.getByTestId('creation-next').click();
			await expect(page.getByRole('heading', { name: 'Learn Maneuvers' })).toBeVisible();
		}
	},
	{
		name: 'Learn maneuvers',
		run: async (page) => {
			await page.getByTestId('maneuver-heroic-bash-learn').click();
			await page.getByTestId('maneuver-savage-strike-learn').click();
			await expect(page.getByText('Maneuvers: 2 / 2')).toBeVisible();
			await page.getByTestId('creation-next').click();
		}
	},
	{
		name: 'Name and save character',
		run: async (page) => {
			await page.getByTestId('character-name-input').fill('Human Barb E2E');
			await page.getByTestId('player-name-input').fill('Playwright');
			await page.getByRole('button', { name: 'Finish & Go to Sheet →' }).click();
			await page.waitForURL('**/character/**');
			await expect(page.getByRole('heading', { name: 'Human Barb E2E' })).toBeVisible();
			await expect(page.getByText('Level 1 Barbarian')).toBeVisible();
			await expect(page.getByText('Attack/Spell')).toBeVisible();
		}
	}
];

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

	test('creates a level 1 Human Barbarian through background and opens the sheet', async ({
		page
	}) => {
		await runRecipe(page, humanBarbarianCreationRecipe);
	});
});
