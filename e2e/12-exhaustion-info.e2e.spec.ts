import { expect, test } from '@playwright/test';
import { importFixture, openSheetTab } from './helpers';

test('12 - exhaustion and feature details', async ({ page }) => {
	await importFixture(page);
	await openSheetTab(page, 'character');

	const firstExhaustionLevel = page.getByTestId('exhaustion-1');
	await expect(firstExhaustionLevel).toBeVisible();
	const exhaustionDescriptions = page.getByText(/Fatigued: -1 to all Checks and Saves/i);
	await firstExhaustionLevel.click();
	await expect(exhaustionDescriptions).toHaveCount(2);

	await firstExhaustionLevel.click();
	await expect(exhaustionDescriptions).toHaveCount(1);

	await openSheetTab(page, 'features');
	const featureButton = page.getByRole('button', { name: 'Attribute Increase', exact: true });
	await expect(featureButton).toBeVisible();
	await featureButton.click();
	await expect(page.getByTestId('feat-popup-close')).toBeVisible();
});
