



import { test, expect } from '@playwright/test';

test('Human Cleric E2E: domains Ancestral + Magic, full flow and saved object', async ({ page, context }) => {
  await context.addInitScript(() => localStorage.clear());

  await page.goto('/');
  await page.goto('/create-character');

  // Step 1: Class & Features
  await page.getByText(/^Cleric$/).click();
  // Select 2 domains (multi-select): Ancestral and Magic
  await expect(page.getByText('Choose 2 Divine Domains')).toBeVisible();
  await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]').check();
  await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]').check();
  await page.getByRole('button', { name: 'Next →' }).click();

  // Step 2: Ancestry (Human). Spend 7 points: 5 default + Trade Expertise (1) + Unbreakable (1)
  await page.getByText(/^Human$/).click();
  // Select default Human traits (5 points total)
  await page.getByLabel(/Attribute Increase/i).check();
  await page.getByLabel(/Skill Expertise/i).check();
  await page.getByLabel(/Human Resolve/i).check();
  await page.getByLabel(/Undying/i).check();
  // Expanded traits to reach 7 total
  await page.getByLabel(/Trade Expertise/i).check();
  await page.getByLabel(/Unbreakable/i).check();
  await expect(page.getByText(/Remaining:\s*0/)).toBeVisible();
  await page.getByRole('button', { name: 'Next →' }).click();

  // Step 3: Attributes (13 total = 12 + human attribute increase)
  // Helper to click the + inside a specific attribute card
  async function incAttr(name: string, times: number) {
    const card = page.locator('div', { has: page.getByRole('heading', { name }) });
    for (let i = 0; i < times; i++) {
      await card.getByRole('button', { name: '+' }).click();
    }
  }
  await incAttr('Might', 2);
  await incAttr('Intelligence', 3);
  await expect(page.getByText(/Attribute Points:\s*0|Remaining:\s*0/)).toBeVisible();
  await page.getByRole('button', { name: 'Next →' }).click();

  // Step 4: Background – Skills
  await page.getByText(/^Skills$/).click();
  // Convert 1 skill → 2 trade
  await page.getByRole('button', { name: /Convert 1 Skill.*2 Trade/i }).click();
  // Invest: Athletics +2; Intimidation, Acrobatics, Insight, Investigation +1
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: /Athletics \+/ }).click();
  for (const s of ['Intimidation','Acrobatics','Insight','Investigation']) {
    await page.getByRole('button', { name: new RegExp(`${s} \\+`) }).click();
  }
  await expect(page.getByText(/Skill Points:\s*0\s*\/\s*\d+/)).toBeVisible();

  // Trades
  await page.getByText(/^Trades$/).click();
  // Convert 1 trade → 2 language
  await page.getByRole('button', { name: /Convert 1 Trade.*2 Language/i }).click();
  // Invest: Alchemy +2, Blacksmithing +1, Calligraphy +1, Gaming +1
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: /Alchemy \+/ }).click();
  for (const t of ['Blacksmithing','Calligraphy','Gaming']) {
    await page.getByRole('button', { name: new RegExp(`${t} \\+`) }).click();
  }
  await expect(page.getByText(/Trade Points:\s*0\s*\/\s*\d+/)).toBeVisible();

  // Languages
  await page.getByText(/^Languages$/).click();
  await page.getByRole('button', { name: /Elvish Fluent/i }).click();
  await page.getByRole('button', { name: /Draconic Limited/i }).click();
  await page.getByRole('button', { name: /Dwarvish Limited/i }).click();
  await expect(page.getByText(/Language Points:\s*0\s*\/\s*\d+/)).toBeVisible();
  await page.getByRole('button', { name: 'Next →' }).click();

  // Step 5: skip spells/maneuvers
  await page.getByRole('button', { name: 'Next →' }).click();

  // Step 6: Names
  await page.getByLabel(/Character Name/i).fill('human cleric test');
  await page.getByLabel(/Player Name/i).fill('playwright');
  await page.getByText(/Complete|Finish/i).click();

  // Verify saved character from localStorage
  const saved = await page.evaluate(() => {
    const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
    return list.find((c: any) => c.finalName === 'human cleric test');
  });

  expect(saved).toBeTruthy();
  expect(saved.classId).toBe('cleric');
  expect(saved.ancestry1Id).toBe('human');
  // Domains selection key may vary; ensure choices contain Ancestral and Magic somewhere
  const choices = saved.selectedFeatureChoices || {};
  const allChoiceValues = Object.values(choices).flat();
  expect(allChoiceValues).toEqual(expect.arrayContaining(['Ancestral','Magic']));

  // Traits contain Trade Expertise, Unbreakable, and Attribute Increase
  expect(saved.selectedTraitIds).toEqual(
    expect.arrayContaining(['human_trade_expertise','human_unbreakable','human_attribute_increase'])
  );

  // Attributes
  expect(saved.attribute_might).toBeGreaterThanOrEqual(2);
  expect(saved.attribute_intelligence).toBeGreaterThanOrEqual(3);

  // Background allocations minimums
  expect(saved.skillsData).toMatchObject({ athletics: 2, intimidation: 1, acrobatics: 1, insight: 1, investigation: 1 });
  expect(saved.tradesData).toMatchObject({ alchemy: 2, blacksmithing: 1, calligraphy: 1, gaming: 1 });
  expect(saved.languagesData).toMatchObject({
    common: { fluency: 'fluent' }, elvish: { fluency: 'fluent' }, draconic: { fluency: 'limited' }, dwarvish: { fluency: 'limited' }
  });
});


