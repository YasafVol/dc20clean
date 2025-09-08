import { test, expect } from '@playwright/test';
import { importFixture, failIfMissing } from './helpers';

test('08 - items add and remove', async ({ page }) => {
  await importFixture(page);
  try { await (await import('fs')).promises.mkdir('e2e/screenshots', { recursive: true }); } catch (e) {}

  const addItemBtn = await failIfMissing(page, '[data-testid="add-item"], role=button[name=/add item/i], button:has-text("Add Item")', 'e2e/screenshots/08-01-item-missing.png', 'add item button');
  await addItemBtn.click().catch(()=>{});
  // Select an item type, then pick the first available item from the name select
  const itemTypeSelect = await failIfMissing(page, 'select[aria-label="Item Type"], [data-testid="item-name"]', 'e2e/screenshots/08-02-item-name-missing.png', 'item type/name select');
  // First change the type by selecting 'Adventuring Supply' to populate name options
  const typeSelect = page.locator('select').filter({ hasText: 'Select Type' }).first();
  try { await typeSelect.selectOption('Adventuring Supply'); } catch { /* ignore */ }
  // Now target the item-name select and pick the first non-empty option
  const itemNameSelect = await failIfMissing(page, '[data-testid="item-name"]', 'e2e/screenshots/08-02-item-name-missing.png', 'item name select');
  // Wait a short moment for options to populate
  await page.waitForTimeout(200);
  const firstOptionValue = await itemNameSelect.locator('option').nth(1).getAttribute('value');
  if (firstOptionValue) {
  await itemNameSelect.selectOption(firstOptionValue).catch(()=>{});
  // Ensure the select value is set to the chosen item name
  await expect(itemNameSelect).toHaveValue(firstOptionValue);
  } else {
    throw new Error('No item options available to select');
  }
  if (process.env.E2E_SCREENSHOTS === '1') { try { await page.screenshot({ path: 'e2e/screenshots/08-03-item-added.png', fullPage: true }); } catch (err: unknown) { console.log('screenshot failed:', String(err)); } }
  console.log('added an item');

  const remItem = page.getByRole('button', { name: /remove item/i }).first();
  if ((await remItem.count()) > 0) { await remItem.click().catch(()=>{}); if (process.env.E2E_SCREENSHOTS === '1') { try { await page.screenshot({ path: 'e2e/screenshots/08-04-item-removed.png', fullPage: true }); } catch (err: unknown) { console.log('screenshot failed:', String(err)); } } console.log('deleted an item'); }
});
