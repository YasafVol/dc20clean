import { test, expect, type Page } from '@playwright/test';
import { importFixture, openSheetTab } from './helpers';
import fs from 'fs';

async function expectResourceChange(page: Page, label: string, direction: 'Increase' | 'Decrease') {
	const control = page.getByRole('button', { name: `${direction} ${label}`, exact: true });
	const value = control.locator('..').locator(':scope > span > span').first();
	const initial = Number(await value.textContent());

	await control.click();
	await expect(value).toHaveText(String(initial + (direction === 'Increase' ? 1 : -1)));
}

test('02 - resource controls', async ({ page }) => {
	await importFixture(page);
	await openSheetTab(page, 'character');
	try {
		await fs.promises.mkdir('e2e/screenshots', { recursive: true });
	} catch (e) {}

	await expectResourceChange(page, 'Stamina', 'Decrease');
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-01-stamina.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}

	await expectResourceChange(page, 'Rest', 'Decrease');
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-02-rest.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}

	await expectResourceChange(page, 'Hit Points', 'Decrease');
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-03-hp.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}
});
