import { test, expect } from '@playwright/test';

test('wizard background loads on create-character-ng', async ({ page }) => {
  const url = 'http://localhost:5173/create-character-ng';
  await page.goto(url, { waitUntil: 'networkidle' });

  // wait a short moment for background to load
  await page.waitForTimeout(500);

  // Find any element with a computed background-image containing 'wizard-bg'
  const hasBg = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('body *'));
    for (const el of els) {
      try {
        const bg = getComputedStyle(el).backgroundImage || '';
        if (bg.includes('wizard-bg')) return true;
      } catch (e) {
        // ignore
      }
    }
    return false;
  });

  await page.screenshot({ path: 'test-results/create-character-ng.png', fullPage: true });

  expect(hasBg).toBe(true);
});
