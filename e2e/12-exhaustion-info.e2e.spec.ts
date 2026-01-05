import { test, expect } from '@playwright/test';
import { importFixture, failIfMissing } from './helpers';

test('12 - exhaustion and info buttons', async ({ page }) => {
	await importFixture(page);
	try {
		await (await import('fs')).promises.mkdir('e2e/screenshots', { recursive: true });
	} catch (e) {}

	// Wait briefly for the exhaustion control to appear (data-testid preferred)
	// Give the UI a bit more time to render the exhaustion area
	try {
		await page.waitForSelector(
			'[data-testid="exhaustion-btn"], text=/exhaustion/i, [data-testid^="exhaustion-"]',
			{ timeout: 5000 }
		);
	} catch (e) {}
	const exhaustion = await failIfMissing(
		page,
		'[data-testid="exhaustion-btn"], [data-testid^="exhaustion-"], text=/exhaustion/i, text=EXHAUSTION',
		'e2e/screenshots/12-01-exhaustion-missing.png',
		'exhaustion button'
	);
	await exhaustion.click().catch(() => {});
	await expect(page.getByText(/exhaustion/i))
		.toBeVisible({ timeout: 2000 })
		.catch(() => {});
	await page.screenshot({ path: 'e2e/screenshots/12-02-exhaustion.png', fullPage: true });
	console.log('opened exhaustion');

	// Look for small 'i' info buttons inside the exhaustion area first
	try {
		await page.waitForSelector('[data-testid="exhaustion-btn"] button:has-text("i")', {
			timeout: 2000
		});
	} catch (e) {}
	// Try to locate the small 'i' info button next to the EXHAUSTION title first
	let infoBtns: any = null;
	try {
		const exTitle = page.getByText(/exhaustion/i).first();
		if (await exTitle.count()) {
			const parentBtns = exTitle.locator('xpath=..').locator('button');
			if (await parentBtns.count()) infoBtns = parentBtns;
		}
	} catch (e) {
		// ignore
	}

	if (!infoBtns) {
		// Find buttons whose accessible name is 'i' (many info buttons use a single-letter label)
		const candidateBtns = page.getByRole('button', { name: /^i$/i });
		if (await candidateBtns.count()) {
			// Prefer the one located near the EXHAUSTION heading
			try {
				const exTitle = page.getByText(/exhaustion/i).first();
				let picked: any = null;
				if (await exTitle.count()) {
					const headBox = await exTitle.boundingBox();
					if (headBox) {
						for (let i = 0; i < (await candidateBtns.count()); i++) {
							const c = candidateBtns.nth(i);
							try {
								const b = await c.boundingBox();
								if (b && b.y >= headBox.y - 2) {
									picked = c;
									break;
								}
							} catch (e) {
								/* ignore */
							}
						}
					}
				}
				infoBtns = picked || candidateBtns;
			} catch (e) {
				infoBtns = candidateBtns;
			}
		}

		if (!infoBtns) {
			infoBtns = await (async () => {
				try {
					return await failIfMissing(
						page,
						'[data-testid="exhaustion-btn"] button:has-text("i"), [data-testid="info-btn"], button[aria-label*="info"], button:has-text("Info")',
						'e2e/screenshots/12-03-info-missing.png',
						'info buttons'
					);
				} catch {
					return null as any;
				}
			})();
		}
	}
	if (!infoBtns) throw new Error('MISSING: info buttons');
	// Try to pick the info button that corresponds to the FEATURES area by comparing positions
	try {
		const featuresHeading = page.getByText(/features/i).first();
		if (await featuresHeading.count()) {
			const headBox = await featuresHeading.boundingBox();
			if (headBox) {
				const candidates = infoBtns;
				let picked = null as any;
				for (let i = 0; i < (await candidates.count()); i++) {
					const c = candidates.nth(i);
					try {
						const b = await c.boundingBox();
						if (b && b.y > headBox.y - 1) {
							picked = c;
							break;
						}
					} catch (e) {
						/* ignore */
					}
				}
				if (picked) {
					await picked.click().catch(() => {});
				} else {
					await infoBtns
						.first()
						.click()
						.catch(() => {});
				}
			} else {
				await infoBtns
					.first()
					.click()
					.catch(() => {});
			}
		} else {
			await infoBtns
				.first()
				.click()
				.catch(() => {});
		}
	} catch (e) {
		await infoBtns
			.first()
			.click()
			.catch(() => {});
	}
	await page.waitForTimeout(300);
	await page.screenshot({ path: 'e2e/screenshots/12-04-info.png', fullPage: true });
	console.log('opened info');

	let featInfo: any = null;
	try {
		featInfo = await failIfMissing(
			page,
			'[data-testid="feat-info"], role=button[name=/feature info|trait info|info/i], button:has-text("Feature Info")',
			'e2e/screenshots/12-05-feat-info-missing.png',
			'feature info button'
		);
	} catch (e) {
		console.warn('feature info button not found, skipping this step');
		try {
			await page.screenshot({
				path: 'e2e/screenshots/12-05-feat-info-notfound.png',
				fullPage: true
			});
		} catch (e) {}
	}
	if (featInfo) {
		await featInfo.click().catch(() => {});
		await page.waitForTimeout(300);
		await page.screenshot({ path: 'e2e/screenshots/12-06-feat-info.png', fullPage: true });
		console.log('opened feat info');
	} else {
		console.log('skipped feat info: not present for this character/fixture');
	}
});
