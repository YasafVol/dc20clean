import { expect, test } from '@playwright/test';

test('24 - Equipage build sheet and summary reflow without page overflow', async ({ page }) => {
	await page.goto('/custom-equipment');
	const sheet = page.getByLabel('weapon build steps');
	const preview = page.getByLabel('weapon build summary');
	await expect(sheet).toBeVisible();
	await expect(preview).toBeVisible();

	for (const width of [390, 767, 768, 1199, 1200]) {
		await page.setViewportSize({ width, height: 900 });
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
			`page overflow at ${width}px`
		).toBe(true);
		const sheetBox = await sheet.boundingBox();
		const previewBox = await preview.boundingBox();
		expect(sheetBox).not.toBeNull();
		expect(previewBox).not.toBeNull();
		if (width < 1200) {
			expect(previewBox!.y).toBeGreaterThanOrEqual(sheetBox!.y + sheetBox!.height - 1);
		} else {
			expect(previewBox!.x).toBeGreaterThanOrEqual(sheetBox!.x + sheetBox!.width - 1);
		}
	}
});

test('24 - review shows the detailed summary before saving on compact screens', async ({
	page
}) => {
	await page.goto('/custom-equipment');
	await page
		.getByRole('group', { name: 'weapon starting point' })
		.getByRole('button', { name: 'Load a Preset' })
		.click();
	await page.getByRole('searchbox', { name: 'Search presets' }).fill('Short Sword');
	await page.getByRole('button', { name: /^Short Sword/ }).click();
	const sheet = page.getByLabel('weapon build steps');
	const summary = page.getByLabel('weapon build summary');
	await expect(summary).toContainText('Weapon enhancement');
	await expect(sheet).not.toContainText('Weapon enhancement');
	for (const width of [390, 1199, 1200]) {
		await page.setViewportSize({ width, height: 900 });
		const sheetBox = await sheet.boundingBox();
		const summaryBox = await summary.boundingBox();
		expect(sheetBox).not.toBeNull();
		expect(summaryBox).not.toBeNull();
		if (width < 1200) {
			expect(summaryBox!.y + summaryBox!.height).toBeLessThanOrEqual(sheetBox!.y + 1);
		} else {
			expect(summaryBox!.x).toBeGreaterThanOrEqual(sheetBox!.x + sheetBox!.width - 1);
		}
	}
});

test('24 - saved equipment heading clears the primary tabs', async ({ page }) => {
	await page.goto('/custom-equipment');
	await page.getByRole('button', { name: 'Saved Equipment', exact: true }).click();
	const tabs = page.getByRole('button', { name: 'Saved Equipment', exact: true }).locator('..');
	const heading = page.getByRole('heading', { name: 'Saved Equipment (0)' });

	for (const width of [390, 1200]) {
		await page.setViewportSize({ width, height: 900 });
		const tabsBox = await tabs.boundingBox();
		const headingBox = await heading.boundingBox();
		expect(tabsBox).not.toBeNull();
		expect(headingBox).not.toBeNull();
		expect(headingBox!.y - (tabsBox!.y + tabsBox!.height)).toBeGreaterThanOrEqual(20);
	}
});

test('24 - the two weapon types fill their row and stack on narrow screens', async ({ page }) => {
	await page.goto('/custom-equipment');
	const melee = page.getByRole('button', { name: /^Melee Weapon/ });
	const ranged = page.getByRole('button', { name: /^Ranged Weapon/ });
	const grid = melee.locator('..');

	await page.setViewportSize({ width: 1200, height: 900 });
	const desktopGrid = await grid.boundingBox();
	const desktopMelee = await melee.boundingBox();
	const desktopRanged = await ranged.boundingBox();
	expect(desktopGrid).not.toBeNull();
	expect(desktopMelee).not.toBeNull();
	expect(desktopRanged).not.toBeNull();
	expect(desktopRanged!.x + desktopRanged!.width).toBeGreaterThanOrEqual(
		desktopGrid!.x + desktopGrid!.width - 1
	);
	expect(desktopRanged!.y).toBe(desktopMelee!.y);

	await page.setViewportSize({ width: 390, height: 844 });
	const mobileMelee = await melee.boundingBox();
	const mobileRanged = await ranged.boundingBox();
	expect(mobileMelee).not.toBeNull();
	expect(mobileRanged).not.toBeNull();
	expect(mobileRanged!.y).toBeGreaterThanOrEqual(mobileMelee!.y + mobileMelee!.height - 1);
});

test('24 - the preset path replaces fresh choices without overflow', async ({ page }) => {
	await page.goto('/custom-equipment');
	const paths = page.getByRole('group', { name: 'weapon starting point' });
	await paths.getByRole('button', { name: 'Load a Preset' }).click();
	await expect(page.getByRole('searchbox', { name: 'Search presets' })).toBeVisible();
	await expect(page.getByRole('button', { name: /^Melee Weapon/ })).toHaveCount(0);

	for (const width of [390, 767, 768, 1199, 1200]) {
		await page.setViewportSize({ width, height: 900 });
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
			`preset path overflow at ${width}px`
		).toBe(true);
	}
});
