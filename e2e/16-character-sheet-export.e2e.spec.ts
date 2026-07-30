import { expect, test, type Download } from '@playwright/test';
import { importFixture, TEST_CHARACTER } from './helpers';

async function readDownload(download: Download): Promise<Buffer> {
	const stream = await download.createReadStream();
	const chunks: Buffer[] = [];
	for await (const chunk of stream) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}
	return Buffer.concat(chunks);
}

test.describe('Character sheet exports', () => {
	test.beforeEach(async ({ context }) => {
		await context.addInitScript(() => {
			localStorage.clear();
			sessionStorage.clear();
		});
	});

	test('downloads stored JSON and PDF, then reopens the same character', async ({ page }) => {
		await importFixture(page);
		await expect(page.getByRole('heading', { name: TEST_CHARACTER.finalName })).toBeVisible();

		const storedCharacter = await page.evaluate((characterId) => {
			const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
			return characters.find((character: any) => character.id === characterId);
		}, TEST_CHARACTER.id);
		expect(storedCharacter).toBeTruthy();

		const jsonDownloadPromise = page.waitForEvent('download');
		await page.getByRole('button', { name: /download json/i }).click();
		const jsonDownload = await jsonDownloadPromise;
		expect(jsonDownload.suggestedFilename()).toBe('Gibble_Bramblebomb.json');

		const exportedCharacter = JSON.parse((await readDownload(jsonDownload)).toString('utf8'));
		expect(exportedCharacter).toMatchObject({
			id: storedCharacter.id,
			rulesVersion: storedCharacter.rulesVersion,
			schemaVersion: storedCharacter.schemaVersion,
			selectedTraitIds: storedCharacter.selectedTraitIds,
			selectedFeatureChoices: storedCharacter.selectedFeatureChoices,
			characterState: storedCharacter.characterState,
			finalHPMax: storedCharacter.finalHPMax,
			finalPD: storedCharacter.finalPD,
			finalAttackSpellCheck: storedCharacter.finalAttackSpellCheck,
			exportVersion: '1.0'
		});
		expect(exportedCharacter.exportedAt).toEqual(expect.any(String));

		const pdfDownloadPromise = page.waitForEvent('download');
		await page.getByRole('button', { name: /export pdf/i }).click();
		const pdfDownload = await pdfDownloadPromise;
		expect(pdfDownload.suggestedFilename()).toBe('Gibble_Bramblebomb_vDC20-0.10.pdf');
		const pdfBytes = await readDownload(pdfDownload);
		expect(pdfBytes.length).toBeGreaterThan(1000);
		expect(pdfBytes.subarray(0, 5).toString('ascii')).toBe('%PDF-');

		await page.getByRole('button', { name: /back/i }).click();
		await page.getByRole('button', { name: /load character/i }).click();
		const card = page.getByTestId(`character-card-${storedCharacter.id}`);
		await expect(card).toContainText(TEST_CHARACTER.finalName);
		await card.getByRole('button', { name: /view sheet/i }).click();
		await expect(page.getByRole('heading', { name: TEST_CHARACTER.finalName })).toBeVisible();
	});
});
