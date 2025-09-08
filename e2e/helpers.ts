import fs from 'fs';
import { Page } from '@playwright/test';

const fixtureFileName = process.env.E2E_FIXTURE ? (process.env.E2E_FIXTURE as string) : './test-character-gibble.json';
const fixtureUrl = new URL(fixtureFileName.startsWith('./') ? fixtureFileName : `./${fixtureFileName}`, import.meta.url);
export const TEST_CHARACTER = JSON.parse(fs.readFileSync(fixtureUrl, 'utf-8'));

export async function failIfMissing(page: Page, selector: string, screenshotPath: string, name: string) {
  const alternatives = selector.split(',').map(s => s.trim()).filter(s => s.length);
  for (const alt of alternatives) {
    try {
      const el = page.locator(alt).first();
      if ((await el.count()) > 0) return el;
    } catch (err) {
      // swallow and continue
    }
  }
  try { await fs.promises.mkdir('e2e/screenshots', { recursive: true }); } catch (e) {}
  await page.screenshot({ path: screenshotPath, fullPage: true });
  throw new Error(`MISSING: ${name} (selectors tried: ${alternatives.join(' | ')})`);
}

export async function importFixture(page: Page) {
  // Force desktop viewport so desktop-only sections render during tests
  try {
    await page.setViewportSize({ width: 1280, height: 900 });
  } catch (e) {
    // some drivers may not support setViewportSize; ignore errors
  }
  await page.goto('/');
  await page.getByRole('button', { name: /load character/i }).click();
  await page.getByRole('button', { name: /import from json/i }).click();
  await page.waitForSelector('textarea, input[type="text"]');
  const jsonInput = page.locator('textarea, input[type="text"]').first();
  if (!(await jsonInput.count())) throw new Error('Import textarea not found');
  await jsonInput.fill(JSON.stringify(TEST_CHARACTER));
  await page.getByRole('button', { name: 'Import Character' }).click();
  await page.getByRole('button', { name: /view sheet/i }).first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
}
