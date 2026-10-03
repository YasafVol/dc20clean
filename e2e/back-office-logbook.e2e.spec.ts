import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const systemCount = (
	JSON.parse(readFileSync('convex/backOfficeData/systems.json', 'utf8')) as unknown[]
).length;

test.describe('Back-office Playwright logbook', () => {
	test.skip(
		process.env.BACK_OFFICE_LOGBOOK !== '1',
		'Run this manual review with BACK_OFFICE_LOGBOOK=1.'
	);

	test('local Systems reader opens a numbered document and searches its full text', async ({
		page
	}, testInfo) => {
		const pageErrors: string[] = [];
		page.on('pageerror', (error) => pageErrors.push(error.message));

		await page.goto('/back-office-preview/systems');
		await expect(page.getByText(`${systemCount} documents`)).toBeVisible();
		await expect(page.getByText(/Local preview · system text from this checkout/)).toBeVisible();
		const documents = page.getByRole('navigation', { name: 'System documents' });
		await expect(documents.getByRole('link').first()).toContainText(
			'01 Alternative Character Sheet Presentation'
		);

		await page
			.getByRole('searchbox', { name: 'Search system documents' })
			.fill('normalizeCharacterStateForStorage');
		await expect(page.getByText('1 document', { exact: true })).toBeVisible();
		await documents.getByRole('link', { name: /Database & Storage System/ }).click();
		await expect(
			page.getByRole('heading', { name: /\d{2} Database & Storage System/ })
		).toBeVisible();
		await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
		await testInfo.attach('local-systems.jpg', {
			body: await page.screenshot({ type: 'jpeg', quality: 70 }),
			contentType: 'image/jpeg'
		});
		expect(pageErrors).toEqual([]);
	});

	test('local Monsters reader filters and opens a clearly synthetic stat block', async ({
		page
	}, testInfo) => {
		const pageErrors: string[] = [];
		page.on('pageerror', (error) => pageErrors.push(error.message));

		await page.goto('/back-office-preview/monsters');
		await expect(page.getByText('3 results')).toBeVisible();
		await page.getByRole('combobox', { name: 'Monster role' }).selectOption('lurker');
		await expect(page.getByText('1 results')).toBeVisible();
		await page.getByRole('link', { name: /Sample Cave Stalker/ }).click();
		await expect(page.getByRole('heading', { name: 'Sample Cave Stalker' })).toBeVisible();
		await expect(page.getByText('This creature exists only in the local preview.')).toBeVisible();

		for (const width of [390, 767, 768, 1199, 1200]) {
			await page.setViewportSize({ width, height: 900 });
			expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
				width
			);
		}
		await page.setViewportSize({ width: 1200, height: 900 });
		await testInfo.attach('local-monster.jpg', {
			body: await page.screenshot({ type: 'jpeg', quality: 70 }),
			contentType: 'image/jpeg'
		});
		expect(pageErrors).toEqual([]);
	});

	test('development Convex denies anonymous back-office reads', async ({ request }) => {
		const deployment = process.env.BACK_OFFICE_CONVEX_URL;
		test.skip(!deployment, 'Set BACK_OFFICE_CONVEX_URL to test a deployed backend.');
		const query = async (path: string, args: Record<string, unknown>) => {
			const response = await request.post(`${deployment}/api/query`, { data: { path, args } });
			expect(response.ok(), `${path} HTTP status`).toBe(true);
			return response.json();
		};

		await expect(query('backOffice:access', {})).resolves.toMatchObject({
			status: 'success',
			value: false
		});
		for (const [path, args] of [
			['backOffice:listSystems', {}],
			['backOffice:getSystem', { id: 'DATABASE_SYSTEM.MD' }],
			['backOffice:listMonsters', { paginationOpts: { numItems: 1, cursor: null } }]
		] as const) {
			const result = await query(path, args);
			expect(result.status, path).toBe('error');
			expect(result, path).not.toHaveProperty('value');
		}
	});

	test('PR preview redirects anonymous Playwright to Vercel protection', async ({ request }) => {
		const preview = process.env.BACK_OFFICE_PR_PREVIEW_URL;
		test.skip(!preview, 'Set BACK_OFFICE_PR_PREVIEW_URL to check the protected deployment.');
		const response = await request.get(`${preview}/back-office`, { maxRedirects: 0 });
		expect(response.status()).toBe(302);
		expect(response.headers().location).toMatch(/^https:\/\/vercel\.com\/sso-api\?/);
	});
});
