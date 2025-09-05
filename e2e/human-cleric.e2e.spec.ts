



import { test, expect } from '@playwright/test';

test.describe('Human Cleric E2E', () => {
  test('full flow and saved object validation', async ({ page, context }) => {
    await context.addInitScript(() => localStorage.clear());

    await page.goto('/');
    await page.goto('/character-creation');

    // Step 1: Class & Features
    await page.getByText(/^Cleric$/).click();
    await expect(page.getByText('Choose 2 Divine Domains')).toBeVisible();
    await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Ancestral"]').check();
    await page.locator('input[type=checkbox][name="cleric_cleric_order_1"][value="Magic"]').check();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 2: Ancestry (Human)
    // Assert that the class bonus was applied correctly (5 base + 2 cleric = 7)
    await expect(page.getByRole('heading', { name: /Ancestry Points: \d+\/7/ })).toBeVisible();

    await page.getByText(/^Human$/).click();
    // Select traits to spend all 7 points
    await page.getByLabel(/Attribute Increase/i).check();
    await page.getByLabel(/Skill Expertise/i).check();
    await page.getByLabel(/Human Resolve/i).check();
    await page.getByLabel(/Undying/i).check();
    await page.getByLabel(/Trade Expertise/i).check(); // Name from spec was different
    await page.getByLabel(/Unbreakable/i).check(); // Custom addition to spend points
    await page.getByLabel(/Versatile/i).check(); // Custom addition to spend points

    await expect(page.getByText(/Remaining:\s*0/)).toBeVisible();
    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 3: Attributes (13 total = 12 base + 1 from human trait)
    await expect(page.getByRole('heading', { name: /Attribute Points: 0\/13/ })).toBeVisible();

    // Helper to click attribute buttons using stable data-testid selectors
    async function incAttr(name: 'might' | 'intelligence' | 'agility' | 'charisma' | 'perception' | 'spirit', times: number) {
      for (let i = 0; i < times; i++) {
        await page.getByTestId(`${name}-increase`).click();
      }
    }

    // Allocate points as per spec
    await incAttr('might', 4); // -2 -> +2
    await incAttr('intelligence', 5); // -2 -> +3
    await incAttr('agility', 2); // -2 -> 0
    await incAttr('charisma', 2); // -2 -> 0

    // Assert budget is spent
    await expect(page.getByRole('heading', { name: /Attribute Points: 13\/13/ })).toBeVisible();

    // Assert that increase buttons are disabled when budget is spent
    await expect(page.getByTestId('might-increase')).toBeDisabled();
    await expect(page.getByTestId('intelligence-increase')).toBeDisabled();
    await expect(page.getByTestId('agility-increase')).toBeDisabled();
    await expect(page.getByTestId('charisma-increase')).toBeDisabled();

    // Assert that buttons are disabled at min/max values
    // Intelligence is at its max of +3
    await expect(page.getByTestId('intelligence-increase')).toBeDisabled();
    // A non-invested attribute (Perception) should be at its min of -2
    await expect(page.getByTestId('perception-decrease')).toBeDisabled();

    await page.getByRole('button', { name: 'Next →' }).click();

    // Step 4: Background – Skills
    await page.getByText(/^Skills$/).click();
    
    // Validate "Skill Expertise" by raising one skill to mastery 2
    await page.getByRole('button', { name: /Athletics \+/ }).click();
    await page.getByRole('button', { name: /Athletics \+/ }).click();
    await expect(page.locator('div', { hasText: /^Athletics$/ }).getByText('2')).toBeVisible();


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
    expect(allChoiceValues).toEqual(expect.arrayContaining(['Ancestral', 'Magic']));

    // Traits contain required selections
    expect(saved.selectedTraitIds).toEqual(
      expect.arrayContaining(['human_attribute_increase', 'human_skill_expertise', 'human_resolve', 'human_undying'])
    );

    // Attributes
    expect(saved.attribute_might).toBe(2);
    expect(saved.attribute_intelligence).toBe(3);
    expect(saved.attribute_agility).toBe(0);
    expect(saved.attribute_charisma).toBe(0);

    // Background allocations minimums
    expect(saved.skillsData).toMatchObject({ athletics: 2, intimidation: 1, acrobatics: 1, insight: 1, investigation: 1 });
    expect(saved.tradesData).toMatchObject({ alchemy: 2, blacksmithing: 1, calligraphy: 1, gaming: 1 });
    expect(saved.languagesData).toMatchObject({
      common: { fluency: 'fluent' }, elvish: { fluency: 'fluent' }, draconic: { fluency: 'limited' }, dwarvish: { fluency: 'limited' }
    });

    // TODO: Add a subsequent test that loads this character onto the
    // character sheet and verifies the MP is correctly increased by 1
    // from the 'Magic' domain selection.
    // Example: expect(sheet.resource('MP').max).toBe(expected_value);
  });
});


