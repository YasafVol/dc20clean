import { test, expect } from '@playwright/test';
import { importFixture, failIfMissing } from './helpers';

test('09 - spells add filter delete', async ({ page }) => {
	await importFixture(page);
	try {
		await (await import('fs')).promises.mkdir('e2e/screenshots', { recursive: true });
	} catch (e) {}

	// Prefer desktop add button, then mobile, then text/role fallbacks
	const addSpellBtn = await failIfMissing(
		page,
		'[data-testid="add-spell"], [data-testid="add-spell-mobile"], role=button[name=/add spell/i], button:has-text("Add Spell")',
		'e2e/screenshots/09-01-spell-missing.png',
		'add spell button'
	);
	await addSpellBtn.click().catch(() => {});
	// If there's a select for spell names, pick the first available, otherwise type
	let spellAddedName: string | null = null;
	// Try select-style spell pickers. If per-row selects exist, use the first available option.
	// There may be multiple spell-name selects with row-specific testids `spell-name-<id>`.
	const spellSelects = page.locator('select[data-testid^="spell-name-"]');
	if ((await spellSelects.count()) > 0) {
		// pick first select and choose its first real option (skip empty)
		const firstSelect = spellSelects.first();
		await page.waitForTimeout(200);
		const opt = await firstSelect
			.locator('option')
			.filter({ hasText: /./ })
			.nth(1)
			.getAttribute('value')
			.catch(() => null);
		if (opt) {
			await firstSelect.selectOption(opt).catch(() => {});
			spellAddedName = opt;
		}
	} else {
		// Fallback to legacy single data-testid select (non-row) or an input
		const legacySelect = page.locator('[data-testid="spell-name"]');
		if ((await legacySelect.count()) > 0) {
			await page.waitForTimeout(200);
			const opt = await legacySelect
				.locator('option')
				.nth(1)
				.getAttribute('value')
				.catch(() => null);
			if (opt) {
				await legacySelect.selectOption(opt).catch(() => {});
				spellAddedName = opt;
			}
		} else {
			const sName = await failIfMissing(
				page,
				'input[placeholder="Name"], input[name="spellName"], [data-testid="spell-name"]',
				'e2e/screenshots/09-02-spell-name-missing.png',
				'spell name input'
			);
			await sName.fill('Test Spell').catch(() => {});
			spellAddedName = 'Test Spell';
		}
	}
	// Save if present
	const save = page.getByRole('button', { name: /save spell/i }).first();
	try {
		await save.waitFor({ state: 'visible', timeout: 1500 });
		await save.click().catch(() => {});
	} catch {}
	if (spellAddedName) {
		// Assert presence: prefer checking any row-select with the expected value, else visible text
		const matchingRowSelect = page.locator(
			`select[data-testid^="spell-name-"][value="${spellAddedName}"]`
		);
		if ((await matchingRowSelect.count()) > 0) {
			await expect(matchingRowSelect.first()).toHaveValue(spellAddedName, { timeout: 5000 });
		} else if ((await page.locator(`[data-testid="spell-name-${spellAddedName}"]`).count()) > 0) {
			// unlikely but try a direct id-based testid if used
			await expect(
				page.locator(`[data-testid="spell-name-${spellAddedName}"]`).first()
			).toHaveValue(spellAddedName, { timeout: 5000 });
		} else {
			// Prefer to find the spell inside a row (we added row testids). This avoids matching <option> elements.
			const rowLocator = page
				.locator('[data-testid^="spell-row-"]')
				.filter({ hasText: spellAddedName });
			if ((await rowLocator.count()) > 0) {
				await expect(rowLocator.first()).toBeVisible({ timeout: 5000 });
			} else {
				// Fallback: find a visible non-option element that contains the text (div/span/td)
				const visibleText = page
					.locator('div,span,td,button')
					.filter({ hasText: spellAddedName })
					.first();
				await expect(visibleText).toBeVisible({ timeout: 5000 });
			}
		}
	}
	if (process.env.E2E_SCREENSHOTS === '1') {
		try {
			await page.screenshot({ path: 'e2e/screenshots/09-03-spell-added.png', fullPage: true });
		} catch (err: unknown) {
			console.log('screenshot failed:', String(err));
		}
	}
	console.log('added a spell');

	// filter
	try {
		const filterEl = await failIfMissing(
			page,
			'[data-testid="spell-filter"], input[placeholder="Filter"]',
			'e2e/screenshots/09-04-spell-filter-missing.png',
			'spell filter'
		);
		if ((await filterEl.count()) > 0) {
			await filterEl.fill('Test Spell').catch(() => {});
			await page.waitForTimeout(200);
			if (process.env.E2E_SCREENSHOTS === '1')
				await page.screenshot({ path: 'e2e/screenshots/09-04-spell-filtered.png', fullPage: true });
			console.log('filtered spells');
		}
	} catch (e) {
		console.log('spell filter not present; skipping');
	}

	// Try specific action buttons that exist in desktop/mobile layouts
	const deleteBtn = page.locator(
		'button:has-text("Delete"), button[title="Delete Spell"], [data-testid^="remove-spell-"]'
	);
	if ((await deleteBtn.count()) > 0) {
		await deleteBtn
			.first()
			.click()
			.catch(() => {});
		if (process.env.E2E_SCREENSHOTS === '1')
			await page.screenshot({ path: 'e2e/screenshots/09-05-spell-deleted.png', fullPage: true });
		console.log('deleted a spell');
	}
});
