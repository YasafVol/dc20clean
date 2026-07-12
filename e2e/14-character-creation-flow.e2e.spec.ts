import { expect, test, type ConsoleMessage, type Page, type TestInfo } from '@playwright/test';
import {
	finishHumanBarbarianToSheet,
	HUMAN_BARBARIAN_NAME,
	humanBarbarianToNameRecipe
} from './support/humanBarbarian';
import { runRecipe, type RecipeStep } from './support/recipe';

const createFlowUrl = '/';

interface PersistedCharacterSnapshot {
	id: string;
	finalName: string;
	finalMight?: number;
	finalAgility?: number;
	finalCharisma?: number;
	finalIntelligence?: number;
	lastModified?: string;
}

async function getSavedCharacterByName(
	page: Page,
	finalName: string
): Promise<PersistedCharacterSnapshot | null> {
	return page.evaluate((name) => {
		const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		return characters.find((character: any) => character.finalName === name) ?? null;
	}, finalName);
}

async function attachJson(testInfo: TestInfo, name: string, data: unknown) {
	await testInfo.attach(name, {
		body: JSON.stringify(data, null, 2),
		contentType: 'application/json'
	});
}

async function withEditResaveDiagnostics(
	page: Page,
	testInfo: TestInfo,
	finalName: string,
	run: () => Promise<void>,
	getSnapshots: () => unknown = () => []
) {
	const consoleEvents: Array<{ type: string; text: string }> = [];
	const pageErrors: string[] = [];
	const consoleHandler = (message: ConsoleMessage) => {
		const text = message.text();
		if (
			message.type() === 'error' ||
			message.type() === 'warning' ||
			/character|storage|save|convex|localStorage/i.test(text)
		) {
			consoleEvents.push({ type: message.type(), text });
		}
	};
	const pageErrorHandler = (error: Error) => {
		pageErrors.push(error.stack || error.message);
	};

	page.on('console', consoleHandler);
	page.on('pageerror', pageErrorHandler);

	try {
		await run();
	} catch (error) {
		await attachJson(testInfo, 'character-edit-resave-diagnostics', {
			url: page.url(),
			error: error instanceof Error ? error.message : String(error),
			consoleEvents: consoleEvents.slice(-80),
			pageErrors,
			snapshots: getSnapshots(),
			savedCharacter: await getSavedCharacterByName(page, finalName)
		});
		throw error;
	} finally {
		page.off('console', consoleHandler);
		page.off('pageerror', pageErrorHandler);
	}
}

async function openCharacterCreation(page: Parameters<RecipeStep['run']>[0]) {
	await page.goto(createFlowUrl);
	await page.getByRole('button', { name: /Create Character/i }).click();
}

async function chooseStartingLevel(page: Parameters<RecipeStep['run']>[0], level: number) {
	await page.getByTestId('starting-level-select').click();
	await page.getByTestId(`starting-level-option-${level}`).click();
}

const humanBarbarianCreationRecipe: RecipeStep[] = [
	...humanBarbarianToNameRecipe,
	{
		name: 'Name and save character',
		run: async (page) => {
			await finishHumanBarbarianToSheet(page);
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

	test('edits a completed character, reallocates one attribute point, and persists the resave', async ({
		page
	}, testInfo) => {
		const snapshots: Array<{
			label: string;
			character: PersistedCharacterSnapshot | null;
		}> = [];

		await withEditResaveDiagnostics(
			page,
			testInfo,
			HUMAN_BARBARIAN_NAME,
			async () => {
				await runRecipe(page, humanBarbarianCreationRecipe);

				const createdCharacter = await getSavedCharacterByName(page, HUMAN_BARBARIAN_NAME);
				snapshots.push({ label: 'after-create', character: createdCharacter });
				expect(createdCharacter).toMatchObject({
					finalName: HUMAN_BARBARIAN_NAME,
					finalMight: 3,
					finalAgility: 1
				});
				expect(createdCharacter?.id).toBeTruthy();

				await expect(page.getByTestId('sheet-attribute-might-value')).toHaveText('3');
				await expect(page.getByTestId('sheet-attribute-agility-value')).toHaveText('1');

				await page.getByRole('button', { name: /back/i }).first().click();
				await page.waitForURL('**/menu');
				await page.getByRole('button', { name: /Load Character/i }).click();
				await page.waitForURL('**/load-character');

				const characterCard = page.getByTestId(`character-card-${createdCharacter!.id}`);
				await expect(characterCard).toContainText(HUMAN_BARBARIAN_NAME);
				await characterCard.getByRole('button', { name: 'Edit' }).click();
				await page.waitForURL('**/character/**/edit');

				await expect(page.getByTestId('creation-step-class')).toBeVisible();
				await page.getByTestId('creation-step-attributes').click();
				await expect(page.getByTestId('creation-step-attributes')).toHaveAttribute(
					'aria-current',
					'step'
				);

				await page.getByTestId('might-decrease').click();
				await page.getByTestId('agility-increase').click();
				await expect(page.getByText('Spent: 13 | Remaining: 0')).toBeVisible();

				await page.getByTestId('creation-step-name').click();
				await expect(page.getByTestId('creation-step-name')).toHaveAttribute(
					'aria-current',
					'step'
				);
				await page.getByTestId('creation-next').click();
				await page.waitForURL(`**/character/${createdCharacter!.id}`);

				const updatedCharacter = await getSavedCharacterByName(page, HUMAN_BARBARIAN_NAME);
				snapshots.push({ label: 'after-edit-resave', character: updatedCharacter });
				expect(updatedCharacter).toMatchObject({
					id: createdCharacter!.id,
					finalMight: 2,
					finalAgility: 2
				});
				expect(updatedCharacter?.lastModified).not.toBe(createdCharacter?.lastModified);

				await expect(page.getByRole('heading', { name: HUMAN_BARBARIAN_NAME })).toBeVisible();
				await expect(page.getByTestId('sheet-attribute-might-value')).toHaveText('2');
				await expect(page.getByTestId('sheet-attribute-agility-value')).toHaveText('2');
			},
			() => snapshots
		);
	});
});
