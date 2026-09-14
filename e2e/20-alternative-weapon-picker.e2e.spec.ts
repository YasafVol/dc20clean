import { expect, test } from '@playwright/test';
import { importFixture } from './helpers';

async function openAlternativeWeaponPicker(page: Parameters<typeof importFixture>[0]) {
	await page.goto(page.url().replace('/character/', '/character2/'));
	await page.waitForLoadState('networkidle');
	await page.getByTestId('add-weapon').click();
	await expect(page.getByTestId('weapon-picker')).toBeVisible();
}

test('20 - alternative sheet adds a populated weapon through the catalog picker', async ({
	page
}) => {
	await importFixture(page);
	await openAlternativeWeaponPicker(page);

	await expect(page.getByLabel('Include catalog weapons')).toHaveCount(0);
	await expect(page.getByTestId('weapon-name')).toHaveCount(0);
	await page.getByRole('button', { name: 'Full list' }).click();
	await page.getByTestId('weapon-picker-option-Short Sword').click();
	await expect(page.getByRole('dialog')).toContainText('Damage calculations');
	await expect(page.getByRole('dialog')).toContainText('Guard');
	await page.getByTestId('weapon-picker-confirm').click();

	await expect(page.getByTestId('weapon-picker')).toHaveCount(0);
	await expect(page.getByText('Short Sword', { exact: true })).toBeVisible();
});

test('20 - weapon picker reflows without horizontal page overflow', async ({ page }) => {
	await importFixture(page);
	await page.setViewportSize({ width: 1200, height: 820 });
	await openAlternativeWeaponPicker(page);

	const desktopList = await page.getByTestId('weapon-picker-list-pane').boundingBox();
	const desktopPreview = await page.getByTestId('weapon-picker-preview').boundingBox();
	expect(desktopList).not.toBeNull();
	expect(desktopPreview).not.toBeNull();
	expect(desktopList!.x + desktopList!.width).toBeLessThanOrEqual(desktopPreview!.x + 1);

	await page.setViewportSize({ width: 390, height: 844 });
	const mobileList = await page.getByTestId('weapon-picker-list-pane').boundingBox();
	const mobilePreview = await page.getByTestId('weapon-picker-preview').boundingBox();
	expect(mobileList).not.toBeNull();
	expect(mobilePreview).not.toBeNull();
	expect(mobilePreview!.y).toBeGreaterThanOrEqual(mobileList!.y + mobileList!.height - 1);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
});
