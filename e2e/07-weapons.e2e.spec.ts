import { test, expect } from '@playwright/test';
import { importFixture, failIfMissing } from './helpers';

test('07 - weapons add update remove', async ({ page }) => {
	await importFixture(page);

	// Add weapon
	const addWeaponBtn = await failIfMissing(
		page,
		'[data-testid="add-weapon"]',
		'e2e/screenshots/07-01-weapon-missing.png',
		'add weapon button'
	);
	await addWeaponBtn.click();

	// Select a weapon from the dropdown
	const weaponSelect = await failIfMissing(
		page,
		'[data-testid="weapon-name"]',
		'e2e/screenshots/07-02-weapon-select-missing.png',
		'weapon select dropdown'
	);
	await weaponSelect.selectOption('Short Sword');

	// Wait for weapon to be populated
	await expect(weaponSelect).toHaveValue('Short Sword');

	// Check that weapon damage appears in the damage cell
	const damageCell = page.getByTestId('weapon-damage');
	await expect(damageCell).not.toHaveText('-');
	console.log('✅ Weapon added successfully');

	// Remove weapon
	const removeBtn = page.getByRole('button', { name: /remove weapon/i }).first();
	await expect(removeBtn).toBeVisible();
	await removeBtn.click();

	// After removal, check that the empty state appears or weapon row is gone
	await expect(
		page.getByText('No weapons added. Click "Add Weapon" to add your first weapon.')
	).toBeVisible();
	console.log('✅ Weapon removed successfully');
});
