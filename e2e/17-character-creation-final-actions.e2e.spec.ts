import { expect, test, type Download } from '@playwright/test';
import { HUMAN_BARBARIAN_NAME, humanBarbarianToNameRecipe } from './support/humanBarbarian';
import { runRecipe } from './support/recipe';

async function readDownload(download: Download): Promise<Buffer> {
	const stream = await download.createReadStream();
	const chunks: Buffer[] = [];
	for await (const chunk of stream) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}
	return Buffer.concat(chunks);
}

async function getSavedCharacter(page: Parameters<typeof runRecipe>[0]) {
	return page.evaluate((finalName) => {
		const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		return characters.find((character: any) => character.finalName === finalName) ?? null;
	}, HUMAN_BARBARIAN_NAME);
}

test.describe('Character creation final actions', () => {
	test.beforeEach(async ({ context }) => {
		await context.addInitScript(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
	});

	test('Print PDF saves, downloads the current-rules PDF, and opens the sheet', async ({
		page
	}) => {
		await runRecipe(page, humanBarbarianToNameRecipe);

		await expect(page.getByRole('button', { name: /generate names/i })).toBeVisible();
		await expect(page.getByTestId('creation-print-pdf')).toHaveText('Print PDF');
		await expect(page.getByTestId('creation-next')).toContainText('Finish & Go to Sheet');

		const downloadPromise = page.waitForEvent('download');
		await page.getByTestId('creation-print-pdf').click();
		const download = await downloadPromise;
		await page.waitForURL('**/character/**');

		const savedCharacter = await getSavedCharacter(page);
		expect(savedCharacter).toMatchObject({
			finalName: HUMAN_BARBARIAN_NAME,
			rulesVersion: 'dc20-0.10.5',
			schemaVersion: '2.2.0'
		});
		expect(page.url()).toContain(`/character/${savedCharacter.id}`);
		expect(download.suggestedFilename()).toBe('Human_Barb_E2E_vDC20-0.10.5.pdf');
		const pdfBytes = await readDownload(download);
		expect(pdfBytes.length).toBeGreaterThan(1000);
		expect(pdfBytes.subarray(0, 5).toString('ascii')).toBe('%PDF-');
		await expect(page.getByRole('heading', { name: HUMAN_BARBARIAN_NAME })).toBeVisible();
	});

	test('Finish & Go to Sheet saves and navigates without downloading', async ({ page }) => {
		await runRecipe(page, humanBarbarianToNameRecipe);
		const downloads: Download[] = [];
		page.on('download', (download) => downloads.push(download));

		await page.getByTestId('creation-next').click();
		await page.waitForURL('**/character/**');

		const savedCharacter = await getSavedCharacter(page);
		expect(savedCharacter).toMatchObject({
			finalName: HUMAN_BARBARIAN_NAME,
			rulesVersion: 'dc20-0.10.5',
			schemaVersion: '2.2.0'
		});
		expect(page.url()).toContain(`/character/${savedCharacter.id}`);
		expect(downloads).toHaveLength(0);
		await expect(page.getByRole('heading', { name: HUMAN_BARBARIAN_NAME })).toBeVisible();
	});
});
