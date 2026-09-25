import { expect, test } from '@playwright/test';
import { importFixture } from './helpers';

async function openAlternativeInventoryPicker(page: Parameters<typeof importFixture>[0]) {
	await page.goto(page.url().replace('/character/', '/character2/'));
	await page.waitForLoadState('networkidle');
	await page.getByRole('tab', { name: 'INVENTORY' }).click();
	await page.getByTestId('add-item').click();
	await expect(page.getByTestId('inventory-picker')).toBeVisible();
}

test('21 - alternative sheet adds a populated inventory item through the catalog picker', async ({
	page
}) => {
	await importFixture(page);
	await openAlternativeInventoryPicker(page);

	const picker = page.getByTestId('inventory-picker');
	await expect(page.getByTestId('item-name')).toHaveCount(0);
	await picker.getByRole('button', { name: 'Adventuring Supply' }).click();
	await picker.getByRole('searchbox', { name: 'Search inventory items' }).fill('First Aid Kit');
	await picker.getByRole('option', { name: /First Aid Kit/ }).click();
	await picker.getByRole('button', { name: 'Increase quantity' }).click();
	await picker.getByRole('checkbox', { name: 'Equip now' }).check();
	await picker.getByTestId('inventory-picker-confirm').click();

	await expect(page.getByTestId('inventory-picker')).toHaveCount(0);
	await expect(page.getByText('First Aid Kit', { exact: true })).toBeVisible();
	await expect(page.getByText('Adventuring Supply', { exact: true })).toBeVisible();
	await expect(page.getByRole('checkbox', { name: 'item-equipped-1' })).toBeChecked();
});

test('21 - inventory picker reflows without horizontal page overflow', async ({ page }) => {
	await importFixture(page);
	await page.setViewportSize({ width: 1200, height: 820 });
	await openAlternativeInventoryPicker(page);

	const desktopList = await page.getByTestId('inventory-picker-list-pane').boundingBox();
	const desktopPreview = await page.getByTestId('inventory-picker-preview').boundingBox();
	expect(desktopList).not.toBeNull();
	expect(desktopPreview).not.toBeNull();
	expect(desktopList!.x + desktopList!.width).toBeLessThanOrEqual(desktopPreview!.x + 1);

	await page.setViewportSize({ width: 390, height: 844 });
	const mobileList = await page.getByTestId('inventory-picker-list-pane').boundingBox();
	const mobilePreview = await page.getByTestId('inventory-picker-preview').boundingBox();
	expect(mobileList).not.toBeNull();
	expect(mobilePreview).not.toBeNull();
	expect(mobilePreview!.y).toBeGreaterThanOrEqual(mobileList!.y + mobileList!.height - 1);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
});
