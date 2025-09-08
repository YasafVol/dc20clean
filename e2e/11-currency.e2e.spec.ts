import { test } from '@playwright/test';
import { importFixture, failIfMissing } from './helpers';

test('11 - currency update', async ({ page }) => {
  await importFixture(page);
  try { await (await import('fs')).promises.mkdir('e2e/screenshots', { recursive: true }); } catch (e) {}

  const currencyInput = await failIfMissing(page, '[data-testid="currency-cp"], input[placeholder="cp"]', 'e2e/screenshots/11-01-currency-missing.png', 'currency input');
  await currencyInput.fill('50').catch(()=>{});
  await page.screenshot({ path: 'e2e/screenshots/11-02-currency.png', fullPage: true });
  console.log('updated currency');
});
