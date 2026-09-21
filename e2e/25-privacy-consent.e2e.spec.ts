import { expect, test } from '@playwright/test';

test('privacy and terms drafts are public and linked from the footer', async ({ page }) => {
	test.skip(process.env.VITE_ENABLE_LEGAL_CONSENT_FLOW !== 'true', 'Legal pages are flagged off');
	await page.goto('/privacy');
	await expect(page.getByRole('heading', { name: 'Privacy notice' })).toBeVisible();
	await expect(page.getByText('DRAFT FOR REVIEW', { exact: false })).toBeVisible();
	await page.getByRole('link', { name: 'Terms of Use' }).first().click();
	await expect(page).toHaveURL(/\/terms$/);
	await expect(page.getByRole('heading', { name: 'Terms of Use' })).toBeVisible();

	await page.addInitScript(() => localStorage.setItem('i18nextLng', 'es'));
	await page.reload();
	await expect(page.getByRole('heading', { name: 'Condiciones de uso' })).toBeVisible();
});

test('legal pages and consent controls are hidden when the flag is off', async ({ page }) => {
	test.skip(process.env.VITE_ENABLE_LEGAL_CONSENT_FLOW === 'true', 'Legal flow is enabled');
	await page.goto('/privacy');
	await expect(page).toHaveURL(/\/menu$/);
	await expect(page.getByRole('link', { name: 'Privacy', exact: true })).toHaveCount(0);
	await expect(page.getByRole('link', { name: 'Terms of Use', exact: true })).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Privacy settings' })).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Allow analytics' })).toHaveCount(0);
	if ((await page.getByRole('button', { name: 'Send feedback' }).count()) === 0) {
		await expect(page.getByRole('contentinfo', { name: 'Legal information' })).toHaveCount(0);
	}
	await page.goto('/terms');
	await expect(page).toHaveURL(/\/menu$/);
});

test('PostHog captures without a consent choice when the legal flow is off', async ({ page }) => {
	test.skip(
		process.env.VITE_ENABLE_ANALYTICS !== 'true' ||
			process.env.VITE_ENABLE_LEGAL_CONSENT_FLOW === 'true' ||
			!process.env.VITE_POSTHOG_PROJECT_TOKEN,
		'Requires an analytics-enabled build with the legal flow disabled'
	);
	let requests = 0;
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'webdriver', { get: () => false });
		Object.defineProperty(navigator, 'userAgent', {
			get: () =>
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
		});
		Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
	});
	await page.route(/posthog\.com/, (route) => {
		requests += 1;
		return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
	});
	await page.goto('/menu');
	await expect(page.getByRole('button', { name: 'Allow analytics' })).toHaveCount(0);
	await expect.poll(() => requests).toBeGreaterThan(0);
});

test('feedback vendor loads only after a deliberate request', async ({ page }) => {
	test.skip(!process.env.VITE_USERBACK_ACCESS_TOKEN, 'Requires the configured feedback control');
	let requests = 0;
	await page.route(/static\.userback\.io/, (route) => {
		requests += 1;
		return route.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
	});
	await page.goto('/menu');
	await expect(page.getByRole('button', { name: 'Send feedback' })).toBeVisible();
	expect(requests).toBe(0);
	await page.getByRole('button', { name: 'Send feedback' }).click();
	expect(requests).toBe(0);
	await page.getByRole('button', { name: 'Continue' }).click();
	await expect.poll(() => requests).toBe(1);
});

test('analytics is opt-in and withdrawal stops further requests', async ({ page, context }) => {
	test.skip(
		process.env.VITE_ENABLE_ANALYTICS !== 'true' ||
			process.env.VITE_ENABLE_LEGAL_CONSENT_FLOW !== 'true' ||
			!process.env.VITE_POSTHOG_PROJECT_TOKEN,
		'Requires a deliberately enabled test analytics build'
	);
	let requests = 0;
	// PostHog intentionally drops automation traffic. Simulate a normal browser
	// so this test can prove request delivery after a real consent choice.
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'webdriver', { get: () => false });
		Object.defineProperty(navigator, 'userAgent', {
			get: () =>
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
		});
		Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
	});
	await page.route(/posthog\.com/, (route) => {
		requests += 1;
		return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
	});
	await page.goto('/menu');
	await expect(page.getByRole('button', { name: 'Allow analytics' })).toBeVisible();
	expect(requests).toBe(0);
	await page.getByRole('button', { name: 'No thanks' }).click();
	await page.reload();
	expect(requests).toBe(0);

	await page.getByRole('button', { name: 'Privacy settings' }).click();
	await page.getByRole('button', { name: 'Allow analytics' }).click();
	await expect
		.poll(() => page.evaluate(() => decodeURIComponent(document.cookie)))
		.toContain('analytics');
	await expect
		.poll(() => page.evaluate(() => Object.keys(localStorage).some((key) => key.startsWith('ph_'))))
		.toBe(true);
	await page.getByRole('link', { name: 'Privacy' }).click();
	await expect(page).toHaveURL(/\/privacy$/);
	await expect.poll(() => requests).toBeGreaterThan(0);
	const countBeforeReturn = requests;
	await page.reload();
	await expect.poll(() => requests).toBeGreaterThan(countBeforeReturn);
	await expect(page.getByRole('button', { name: 'Allow analytics' })).toHaveCount(0);

	await context.clearCookies(); // An expired or removed preference must fail closed.
	const countBeforeExpiry = requests;
	await page.reload();
	await expect(page.getByRole('button', { name: 'Allow analytics' })).toBeVisible();
	await expect
		.poll(() =>
			page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('ph_')))
		)
		.toEqual([]);
	expect(requests).toBe(countBeforeExpiry);
	await page.getByRole('button', { name: 'Allow analytics' }).click();
	await expect.poll(() => requests).toBeGreaterThan(countBeforeExpiry);

	await page.getByRole('button', { name: 'Privacy settings' }).click();
	await page.getByRole('button', { name: 'Reject analytics' }).click();
	await expect
		.poll(async () =>
			page.evaluate(() => Object.keys(localStorage).filter((key) => key.startsWith('ph_')))
		)
		.toEqual([]);
	const countAfterWithdrawal = requests;
	await page.goto('/terms');
	await expect(page.getByRole('heading', { name: 'Terms of Use' })).toBeVisible();
	expect(requests).toBe(countAfterWithdrawal);
});
