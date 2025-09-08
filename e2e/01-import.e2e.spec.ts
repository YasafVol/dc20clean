import { test, expect } from '@playwright/test';
import { importFixture, TEST_CHARACTER } from './helpers';

test('01 - import fixture and open sheet', async ({ page }) => {
  await importFixture(page);
  // Wait for the sheet header (character name) to appear and stabilize
  const header = page.getByText(new RegExp(TEST_CHARACTER.finalName, 'i'));
  await expect(header).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(500);

  // Only take a happy-path screenshot when explicitly enabled to avoid noisy I/O
  if (process.env.E2E_SCREENSHOTS === '1') {
    try {
      await page.screenshot({ path: 'e2e/screenshots/01-import.png', fullPage: true });
    } catch (err: unknown) {
      console.log('screenshot failed:', String(err));
    }
  }
});
