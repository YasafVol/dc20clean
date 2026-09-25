import { expect, test } from '@playwright/test';
import { importFixture } from './helpers';

test('23 - alternative-sheet Long Rest restores and persists Grit', async ({ page }) => {
	await importFixture(page);
	await page.goto(page.url().replace('/character/', '/character2/'));
	await page.waitForLoadState('networkidle');

	const decreaseGrit = page.getByRole('button', { name: 'Decrease Grit' });
	const gritValues = decreaseGrit.locator('..').locator(':scope > span > span');
	const currentGrit = gritValues.first();
	const maximumGrit = gritValues.last();
	const maximum = (await maximumGrit.textContent())?.trim();
	if (!maximum) throw new Error('Expected the Grit maximum to be visible');

	await decreaseGrit.click();
	await expect(currentGrit).not.toHaveText(maximum);

	await Promise.all([
		page.waitForEvent('dialog').then((dialog) => dialog.accept()),
		page.getByRole('button', { name: /Long Rest/ }).click()
	]);
	await expect(currentGrit).toHaveText(maximum);

	await page.waitForTimeout(1200);
	await page.reload();
	await expect(currentGrit).toHaveText(maximum);
});
