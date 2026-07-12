import { expect, type Page } from '@playwright/test';
import type { RecipeStep } from './recipe';

export const HUMAN_BARBARIAN_NAME = 'Human Barb E2E';

export async function spendBackgroundForHumanBarbarian(page: Page) {
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

export const humanBarbarianToNameRecipe: RecipeStep[] = [
	{
		name: 'Open character creation',
		run: async (page) => {
			await page.goto('/');
			await page.getByRole('button', { name: /Create Character/i }).click();
		}
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
		name: 'Name character',
		run: async (page) => {
			await page.getByTestId('character-name-input').fill(HUMAN_BARBARIAN_NAME);
			await page.getByTestId('player-name-input').fill('Playwright');
		}
	}
];

export async function finishHumanBarbarianToSheet(page: Page) {
	await page.getByRole('button', { name: 'Finish & Go to Sheet →' }).click();
	await page.waitForURL('**/character/**');
	await expect(page.getByRole('heading', { name: HUMAN_BARBARIAN_NAME })).toBeVisible();
	await expect(page.getByText('Level 1 Barbarian')).toBeVisible();
	await expect(page.getByText('Attack/Spell')).toBeVisible();
}
