import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { TEST_CHARACTER } from './helpers';

interface BrowserHealth {
	pageErrors: string[];
	serverErrors: string[];
}

function monitorBrowserHealth(page: Page): BrowserHealth {
	const health: BrowserHealth = { pageErrors: [], serverErrors: [] };

	page.on('pageerror', (error) => health.pageErrors.push(error.message));
	page.on('response', (response) => {
		if (response.status() < 500) return;

		try {
			const responseUrl = new URL(response.url());
			const pageUrl = new URL(page.url());
			if (responseUrl.origin === pageUrl.origin) {
				health.serverErrors.push(
					`${response.status()} ${response.request().method()} ${responseUrl.pathname}`
				);
			}
		} catch {
			// Ignore non-HTTP URLs while the first document is loading.
		}
	});

	return health;
}

async function expectHealthyBrowser(health: BrowserHealth, testInfo: TestInfo) {
	if (health.pageErrors.length || health.serverErrors.length) {
		await testInfo.attach('browser-health.json', {
			body: JSON.stringify(health, null, 2),
			contentType: 'application/json'
		});
	}

	expect(health.pageErrors, 'The journey produced an uncaught browser error').toEqual([]);
	expect(health.serverErrors, 'The journey received a same-origin 5xx response').toEqual([]);
}

async function openApp(page: Page, path: string) {
	const response = await page.goto(path);
	expect(response?.ok(), `The app entry request failed for ${path}`).toBe(true);

	if (await page.getByRole('heading', { name: 'Log in to Vercel' }).isVisible()) {
		throw new Error(
			'The target deployment is protected by Vercel. Set VERCEL_AUTOMATION_BYPASS_SECRET for this Playwright run.'
		);
	}
}

test.describe('Meta user journeys', () => {
	test('a visitor can follow the update notice into the product', async ({ page }, testInfo) => {
		const health = monitorBrowserHealth(page);

		await openApp(page, '/menu?showWhatsNew=1');
		await expect(page.getByRole('heading', { name: 'DC20 Character Creator' })).toBeVisible();

		const updateNotice = page.getByRole('region', { name: 'The new character sheet' });
		await expect(updateNotice).toBeVisible();
		await updateNotice.getByRole('link', { name: /Read the full update/i }).click();

		await expect(page).toHaveURL(/\/updates\/2026-09-18-alternative-character-sheet$/);
		await expect(page.getByRole('heading', { name: 'The new character sheet' })).toBeVisible();
		await page.getByRole('link', { name: /Open your characters/i }).click();

		await expect(page).toHaveURL(/\/load-character$/);
		await expect(page.getByRole('heading', { name: 'Load Character' })).toBeVisible();
		await expectHealthyBrowser(health, testInfo);
	});

	test('a player can import one character and open both sheet presentations', async ({
		page
	}, testInfo) => {
		const health = monitorBrowserHealth(page);

		await openApp(page, '/menu');
		await page.getByRole('button', { name: 'Load Character' }).click();
		await expect(page).toHaveURL(/\/load-character$/);

		await page.getByRole('button', { name: /Import from JSON/i }).click();
		await page
			.getByPlaceholder('Paste character JSON data here...')
			.fill(JSON.stringify(TEST_CHARACTER));
		await page.getByRole('button', { name: 'Import Character' }).click();

		const characterCard = page.getByTestId(`character-card-${TEST_CHARACTER.id}`);
		await expect(characterCard).toContainText(TEST_CHARACTER.finalName);
		await characterCard.getByRole('button', { name: 'Alternative Sheet' }).click();

		await expect(page).toHaveURL(new RegExp(`/character2/${TEST_CHARACTER.id}$`));
		await expect(page.getByText(TEST_CHARACTER.finalName, { exact: true }).first()).toBeVisible();

		await page.goBack();
		await expect(page).toHaveURL(/\/load-character$/);
		await characterCard.getByRole('button', { name: 'View Sheet' }).click();

		await expect(page).toHaveURL(new RegExp(`/character/${TEST_CHARACTER.id}$`));
		await expect(page.getByText(TEST_CHARACTER.finalName, { exact: true }).first()).toBeVisible();
		await expectHealthyBrowser(health, testInfo);
	});

	test('a visitor can open every public reference tool from the menu', async ({
		page
	}, testInfo) => {
		const health = monitorBrowserHealth(page);
		const tools = [
			{ button: 'Spellbook', path: '/spellbook', heading: 'Spellbook' },
			{ button: 'Martial Manual', path: '/martial-manual', heading: 'Martial Manual' },
			{ button: 'Conditions', path: '/conditions', heading: 'Conditions Reference' },
			{ button: 'Equipage', path: '/custom-equipment', heading: 'Custom Equipment' },
			{ button: 'Rule Book', path: '/rulebook', heading: 'Table of Contents' }
		];

		await openApp(page, '/menu');
		for (const tool of tools) {
			await page.getByRole('button', { name: tool.button, exact: true }).click();
			await expect(page).toHaveURL(new RegExp(`${tool.path}/?$`));
			await expect(page.getByRole('heading', { name: tool.heading, exact: true })).toBeVisible();
			await page.goBack();
			await expect(page.getByRole('heading', { name: 'DC20 Character Creator' })).toBeVisible();
		}

		await expectHealthyBrowser(health, testInfo);
	});
});
