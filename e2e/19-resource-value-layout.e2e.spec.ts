import { expect, test } from '@playwright/test';
import { importFixture } from './helpers';

const pairedResources = ['Mana', 'Stamina', 'Rest', 'Grit'] as const;

test('19 - paired primary-sheet resource values remain separated', async ({ page }) => {
	await importFixture(page);

	for (const label of pairedResources) {
		const decrease = page.getByRole('button', { name: `Decrease ${label}` });
		const valueContainer = decrease.locator('..');
		await expect(valueContainer).toHaveAttribute('data-value-layout', 'compact');

		const controls = valueContainer.locator(':scope > *');
		await expect(controls).toHaveCount(3);

		const [decrementBox, valueBox, incrementBox] = await Promise.all([
			controls.nth(0).boundingBox(),
			controls.nth(1).boundingBox(),
			controls.nth(2).boundingBox()
		]);

		expect(decrementBox).not.toBeNull();
		expect(valueBox).not.toBeNull();
		expect(incrementBox).not.toBeNull();
		expect(decrementBox!.x + decrementBox!.width).toBeLessThanOrEqual(valueBox!.x + 0.5);
		expect(valueBox!.x + valueBox!.width).toBeLessThanOrEqual(incrementBox!.x + 0.5);

		const valueParts = controls.nth(1).locator(':scope > span');
		await expect(valueParts).toHaveCount(3);
		await expect(valueParts.nth(1)).toHaveText('/');

		const [currentBox, separatorBox, maximumBox] = await Promise.all([
			valueParts.nth(0).boundingBox(),
			valueParts.nth(1).boundingBox(),
			valueParts.nth(2).boundingBox()
		]);

		expect(currentBox!.x + currentBox!.width).toBeLessThanOrEqual(separatorBox!.x + 0.5);
		expect(separatorBox!.x + separatorBox!.width).toBeLessThanOrEqual(maximumBox!.x + 0.5);
	}
});

test('19 - alternative-sheet resources retain the standard value layout', async ({ page }) => {
	await importFixture(page);
	await page.goto(page.url().replace('/character/', '/character2/'));
	await page.waitForLoadState('networkidle');

	await expect(page.locator('[data-value-layout="compact"]')).toHaveCount(0);
	await expect(page.locator('[data-value-layout="standard"]').first()).toBeVisible();
});
