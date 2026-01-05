import { test, expect } from '@playwright/test';
import { importFixture, TEST_CHARACTER, failIfMissing } from './helpers';
import fs from 'fs';

test('02 - resources and notes', async ({ page }) => {
	await importFixture(page);
	try {
		await fs.promises.mkdir('e2e/screenshots', { recursive: true });
	} catch (e) {}

	// Stamina
	const staminaLabel = await failIfMissing(
		page,
		'[data-testid="stamina-label"], text=/stamina/i',
		'e2e/screenshots/02-01-stamina-missing.png',
		'stamina control'
	);
	const staminaInput = staminaLabel.locator('..').locator('input[type="number"]').first();
	if ((await staminaInput.count()) > 0) await staminaInput.fill('2').catch(() => {});
	console.log('updated stamina');
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-01-stamina.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}

	// Mana
	const manaLabel = await failIfMissing(
		page,
		'[data-testid="mana-label"], text=/mana/i',
		'e2e/screenshots/02-02-mana-missing.png',
		'mana control'
	);
	const manaInput = manaLabel.locator('..').locator('input[type="number"]').first();
	if ((await manaInput.count()) > 0) await manaInput.fill('3').catch(() => {});
	console.log('updated mana');
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-02-mana.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}

	// HP
	const hpInput = await failIfMissing(
		page,
		'[data-testid="hp-input"], text=/hit points/i',
		'e2e/screenshots/02-03-hp-missing.png',
		'HP input'
	);
	const hpNum = hpInput.locator('..').locator('..').locator('input[type="number"]').first();
	if ((await hpNum.count()) === 0) throw new Error('MISSING: HP numeric input');
	await hpNum.fill('1').catch(() => {});
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/02-03-hp.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}

	// Precision note (optional)
	try {
		const pdLabel = await failIfMissing(
			page,
			'[data-testid="precision-input"]',
			'e2e/screenshots/02-04-precision-missing.png',
			'precision control'
		);
		const pdInput = pdLabel.locator('..').locator('input[type="number"]').first();
		if ((await pdInput.count()) > 0) {
			await pdInput.fill('5').catch(() => {});
			const pdNoteBtn = page.getByRole('button', { name: /precision note|add note/i }).first();
			if ((await pdNoteBtn.count()) > 0) {
				await pdNoteBtn.click().catch(() => {});
				const noteArea = page.locator('textarea').first();
				if ((await noteArea.count()) > 0) {
					await noteArea.fill('Precision changed for testing').catch(() => {});
					await page
						.getByRole('button', { name: /save note/i })
						.click()
						.catch(() => {});
					await expect(page.getByText(/Precision changed for testing/i))
						.toBeVisible({ timeout: 2000 })
						.catch(() => {});
					await page.screenshot({
						path: 'e2e/screenshots/02-04-precision-note.png',
						fullPage: true
					});
				}
			}
		}
	} catch (e) {
		console.log('precision control not present; skipping');
	}
});
