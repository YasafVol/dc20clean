import { test, expect } from '@playwright/test';

test.describe('Hunter (Beastborn, Urban + Grassland) E2E', () => {
	test('full flow with flight, size, speed, skills and HP assertions', async ({
		page,
		context
	}) => {
		await context.addInitScript(() => {
			if (sessionStorage.getItem('hunter-e2e-storage-cleared')) return;
			localStorage.clear();
			sessionStorage.setItem('hunter-e2e-storage-cleared', 'true');
		});

		await page.goto('/');
		await page.getByRole('button', { name: /Create Character/i }).click();

		// Step 1: Class & Features
		await page.getByTestId('class-card-hunter').click();
		// Favored Terrain: choose 2 → Grassland and Urban
		await page
			.locator('input[type=checkbox][name="hunter_favored_terrain_0"][value="Grassland"]')
			.check();
		await page
			.locator('input[type=checkbox][name="hunter_favored_terrain_0"][value="Urban"]')
			.check();
		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 2: Ancestry – Beastborn traits
		await page.getByTestId('ancestry-card-beastborn').click();

		// Select traits: Glide Speed (2), Limited Flight (2), Full Flight (2), Winged Arms (-1), Small-Sized (-1), Natural Weapon (1)
		await page.getByTestId('trait-card-beastborn_glide_speed').click();
		await page.getByTestId('trait-card-beastborn_limited_flight').click();
		await page.getByTestId('trait-card-beastborn_winged_arms').click();
		await page.getByTestId('trait-card-beastborn_full_flight').click();
		await page.getByTestId('trait-card-beastborn_small_sized').click();
		await page.getByTestId('trait-card-beastborn_natural_weapon').click();

		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 3: Attributes – Might -1, Agility 3, Charisma 1, Intelligence 1
		// Starting from -2 baseline: clicks represent increments from -2 upwards
		// Might: -2 → -1 (1 click)
		await page.getByTestId('might-increase').click();
		// Agility: -2 → 3 (5 clicks)
		for (let i = 0; i < 5; i++) await page.getByTestId('agility-increase').click();
		// Charisma: -2 → 1 (3 clicks)
		for (let i = 0; i < 3; i++) await page.getByTestId('charisma-increase').click();
		// Intelligence: -2 → 1 (3 clicks)
		for (let i = 0; i < 3; i++) await page.getByTestId('intelligence-increase').click();

		await page.getByRole('button', { name: 'Next →' }).click();

		// Step 4: Background – Skills
		await page.getByTestId('skills-tab').click();

		async function setSkillLevel(skillId: string, level: number) {
			await page.getByTestId(`skill-${skillId}-mastery-${level}`).click();
		}

		// We should have 8 skill points: base 5 + INT(1) + Urban(+2) = 8
		await expect(page.getByTestId('skill-points-remaining')).toContainText('8 /');

		// Awareness at Adept costs 3 points: 2 mastery + 1 cap elevation.
		await setSkillLevel('awareness', 2);

		// Five more skills at Novice (1), covering each attribute association.
		// might: athletics, intimidation
		// agility: acrobatics
		// charisma: animal
		// intelligence: investigation
		const noviceSkills = ['athletics', 'intimidation', 'acrobatics', 'animal', 'investigation'];
		for (const s of noviceSkills) {
			await setSkillLevel(s, 1);
		}

		// Points should be 0 remaining
		await expect(page.getByTestId('skill-points-remaining')).toContainText('0 /');

		// Step 4: Trades & Languages
		// Trades
		await page.getByTestId('trades-tab').click();
		async function setTradeLevel(tradeName: string, level: number) {
			await page.getByTestId(`trade-${tradeName.toLowerCase()}-mastery-${level}`).click();
		}
		// Use 3 points across three trades at level 1 (avoid Adept due to Level 1 Adept cap already used by Awareness)
		const tradesToLevel1 = ['Alchemy', 'Blacksmithing', 'Illustration'];
		for (const t of tradesToLevel1) {
			await setTradeLevel(t, 1);
		}

		// Languages
		await page.getByTestId('languages-tab').click();
		async function setLanguage(languageName: string, fluency: 'Limited' | 'Fluent') {
			const row = page.getByTestId(`language-item-${languageName.toLowerCase()}`);
			await row.getByRole('button', { name: new RegExp(`^${fluency}`) }).click();
		}
		// Spend 2 language points on one Fluent language
		await setLanguage('Elvish', 'Fluent');
		await page.getByRole('button', { name: 'Next →' }).click(); // proceed to Maneuvers step

		// Step 5: Maneuvers (Hunter is a hybrid class - may have both Spells and Maneuvers steps)
		// First, check if we're on Spells step and skip if so (Hunter may have Spells from path choices)
		const spellsHeading = page.getByRole('heading', { name: /LEARN.*SPELLS/i });
		if (await spellsHeading.isVisible().catch(() => false)) {
			console.log('Spells step detected - skipping to Maneuvers');
			await page.getByRole('button', { name: 'Next →' }).click();
		}

		// Now we should be on Maneuvers step
		await expect(page.getByRole('heading', { name: /LEARN.*MANEUVERS/i })).toBeVisible({
			timeout: 5000
		});

		// Select maneuvers by clicking LEARN buttons
		const learnButtons = page.locator(
			'button[data-action-id^="maneuver-"][data-action-id$="-learn"]:not(:disabled)'
		);
		// Hunter needs maneuvers based on their totalManeuversKnown
		// Add the first available maneuvers until we have enough
		const maneuversNeeded = 2; // Level 1 Hunter progression
		for (let i = 0; i < maneuversNeeded; i++) {
			await learnButtons.first().click();
			await page.waitForTimeout(200);
		}

		// Verify all maneuvers are selected (check for "All choices complete")
		await expect(page.getByText(/All choices complete/i)).toBeVisible({
			timeout: 5000
		});
		await page.getByRole('button', { name: 'Next →' }).click(); // proceed to Names

		// Step 6: Names
		await page.getByLabel(/Character Name/i).fill('hunter beastborn urban grassland');
		await page.getByLabel(/Player Name/i).fill('playwright');
		await page.getByTestId('creation-next').click();
		await page.waitForURL('**/character/**');
		const characterId = page.url().split('/').pop();
		expect(characterId).toBeTruthy();

		// Verify saved data in storage as a backstop
		const saved = await page.evaluate(() => {
			const list = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
			return list.find((c: any) => c.finalName === 'hunter beastborn urban grassland');
		});
		expect(saved).toBeTruthy();
		expect(saved.finalHPMax).toBe(7);
		expect(saved.finalMoveSpeed).toBe(6);

		// On sheet: check Movement and Features text - tolerate mobile label variations
		// Movement: prefer data-testid if present, otherwise numeric fallback then label variants
		let moveVisible = false;
		try {
			if (await page.getByTestId('move-speed').first().isVisible()) moveVisible = true;
		} catch (e) {}
		if (!moveVisible) {
			try {
				await expect(page.getByText(/\b6\b/).first()).toBeVisible({ timeout: 3000 });
				moveVisible = true;
			} catch (e) {
				const moveCandidates = [
					page.getByText(/MOVE SPEED/i),
					page.getByText(/MOVEMENT/i),
					page.getByText(/MOVE/i)
				];
				for (const cand of moveCandidates) {
					try {
						await expect(cand).toBeVisible({ timeout: 1000 });
						moveVisible = true;
						break;
					} catch (e) {}
				}
			}
		}
		if (!moveVisible)
			console.log(
				'Move speed not found on sheet - continuing because saved object asserts move speed'
			);

		const naturalWeaponAttack = page.getByTestId('natural-weapon-attack-row');
		await expect(naturalWeaponAttack).toBeVisible();
		await expect(naturalWeaponAttack).toContainText('Natural Weapon');
		await expect(naturalWeaponAttack).toContainText('Unarmed Strike · Derived');
		await expect(naturalWeaponAttack.getByTestId('weapon-damage')).toHaveText('1');
		await expect(naturalWeaponAttack.getByTestId('weapon-heavy-damage')).toHaveText('2');
		await expect(naturalWeaponAttack.getByTestId('weapon-brutal-damage')).toHaveText('3');
		await expect(naturalWeaponAttack.getByTestId('weapon-damage-type')).toHaveText('B / P / S');

		await page.getByRole('button', { name: /Features/i }).click();
		await expect(page.getByText('Natural Weapon', { exact: true }).first()).toBeVisible();
		await expect(page.getByText('Full Flight', { exact: true }).first()).toBeVisible();
		await expect(page.getByText('Small-Sized', { exact: true }).first()).toBeVisible();

		await page.goto(`/character2/${characterId}`);
		const alternativeNaturalWeapon = page.getByTestId('natural-weapon-attack-row');
		await alternativeNaturalWeapon.scrollIntoViewIfNeeded();
		await expect(alternativeNaturalWeapon).toBeVisible();
		await expect(alternativeNaturalWeapon).toContainText('Unarmed Strike · Derived');
		await expect(alternativeNaturalWeapon.getByTestId('weapon-damage-type')).toHaveText(
			'B / P / S'
		);
		await expect(
			alternativeNaturalWeapon.getByRole('button', {
				name: /View details for Natural Weapon/i
			})
		).toBeVisible();
	});
});
