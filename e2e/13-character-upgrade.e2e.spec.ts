import { expect, test, type BrowserContext } from '@playwright/test';

interface PersistedUpgradeCharacter {
	id?: string;
	rulesUpgradeBackupOf?: string;
	characterState?: {
		notes?: {
			playerNotes?: string;
		};
	};
}

function makeLegacyCharacter(overrides: Record<string, unknown> = {}) {
	return {
		id: 'upgrade-e2e-character',
		finalName: 'Upgrade E2E Hero',
		finalPlayerName: 'Migration Tester',
		rulesVersion: 'dc20-0.10',
		schemaVersion: '2.2.0',
		level: 3,
		classId: 'champion',
		className: 'Champion',
		ancestry1Id: 'human',
		ancestry1Name: 'Human',
		finalMight: 2,
		finalAgility: 1,
		finalCharisma: 0,
		finalIntelligence: 0,
		finalPrimeModifierValue: 2,
		finalPrimeModifierAttribute: 'might',
		finalCombatMastery: 1,
		finalSaveMight: 2,
		finalSaveAgility: 1,
		finalSaveCharisma: 0,
		finalSaveIntelligence: 0,
		finalHPMax: 14,
		finalSPMax: 3,
		finalMPMax: 4,
		finalPD: 12,
		finalAD: 10,
		finalPDR: 0,
		finalSaveDC: 12,
		finalDeathThreshold: 3,
		finalMoveSpeed: 5,
		finalJumpDistance: 1,
		finalRestPoints: 10,
		finalGritPoints: 2,
		finalInitiativeBonus: 1,
		finalAttackSpellCheck: 3,
		finalMartialCheck: 3,
		selectedTraitIds: [],
		selectedFeatureChoices: {
			champion_choice: 'combat_readiness_brace'
		},
		selectedTalents: {
			barbarian_swift_berserker: 1
		},
		selectedSpells: {
			dome: 'force-dome',
			wall: 'wall-of-force'
		},
		skillsData: {},
		tradesData: {},
		languagesData: { common: { fluency: 'fluent' } },
		spells: [
			{ id: 'force-dome', name: 'Force Dome' },
			{ id: 'wall-of-force', name: 'Wall of Force' }
		],
		maneuvers: [{ id: 'brace', name: 'Brace' }],
		breakdowns: {},
		characterState: {
			resources: {
				current: {
					currentHP: 10,
					currentSP: 2,
					currentMP: 3,
					currentGritPoints: 1,
					currentRestPoints: 8,
					tempHP: 0,
					actionPointsUsed: 0,
					exhaustionLevel: 0,
					deathSteps: 0,
					isDead: false
				}
			},
			ui: { manualDefenseOverrides: {} },
			inventory: {
				items: [],
				currency: { gold: 0, silver: 0, copper: 0 }
			},
			notes: { playerNotes: 'Preserve this note.' },
			spells: [{ id: 'force-dome', name: 'Force Dome' }],
			maneuvers: [{ id: 'brace', name: 'Brace' }]
		},
		createdAt: '2026-01-01T00:00:00.000Z',
		lastModified: '2026-01-01T00:00:00.000Z',
		completedAt: '2026-01-01T00:00:00.000Z',
		...overrides
	};
}

async function seedCharacters(context: BrowserContext, characters: unknown[]) {
	await context.addInitScript((seed) => {
		if (sessionStorage.getItem('e2eCharactersSeeded') === 'true') return;
		localStorage.setItem('savedCharacters', JSON.stringify(seed));
		sessionStorage.setItem('e2eCharactersSeeded', 'true');
	}, characters);
}

test('upgrades a legacy character, maps Forcefield reworks, and persists its backup', async ({
	context,
	page
}) => {
	await seedCharacters(context, [makeLegacyCharacter()]);
	await page.goto('/load-character');

	const legacyCard = page
		.getByRole('heading', { name: 'Upgrade E2E Hero', exact: true })
		.locator('..');
	await expect(legacyCard.getByText('v0.10 upgrade required')).toBeVisible();
	await expect(legacyCard.getByRole('button', { name: 'Edit' })).toBeDisabled();
	await legacyCard.getByRole('button', { name: 'Upgrade to v0.10.5' }).click();

	await expect(page.getByRole('heading', { name: 'Reworked selections to accept' })).toBeVisible();
	await expect(page.getByText('force-dome → forcefield')).toBeVisible();
	await expect(page.getByText('wall-of-force → forcefield')).toBeVisible();
	await expect(page.getByText('barbarian_swift_berserker')).toBeVisible();
	await page.getByRole('button', { name: 'Create Backup & Upgrade' }).click();

	await expect(page.getByText(/Upgraded "Upgrade E2E Hero" to v0\.10\.5/)).toBeVisible();
	await page.reload();

	const upgradedCard = page
		.getByRole('heading', { name: 'Upgrade E2E Hero', exact: true })
		.locator('..');
	const backupCard = page
		.getByRole('heading', { name: 'Upgrade E2E Hero (v0.10 backup)', exact: true })
		.locator('..');
	await expect(upgradedCard.getByRole('button', { name: 'Edit' })).toBeEnabled();
	await expect(upgradedCard.getByRole('button', { name: 'Level Up' })).toBeEnabled();
	await expect(backupCard.getByText('Legacy backup')).toBeVisible();
	await expect(backupCard.getByRole('button', { name: 'Edit' })).toBeDisabled();

	const saved = (await page.evaluate(() => {
		return JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	})) as PersistedUpgradeCharacter[];
	const upgraded = saved.find((character) => character.id === 'upgrade-e2e-character');
	const backup = saved.find(
		(character) => character.rulesUpgradeBackupOf === 'upgrade-e2e-character'
	);
	expect(upgraded).toMatchObject({
		rulesVersion: 'dc20-0.10.5',
		selectedSpells: {
			dome: 'forcefield',
			wall: 'forcefield'
		},
		selectedFeatureChoices: {
			champion_choice: 'combat_readiness_fortify'
		},
		selectedTalents: {}
	});
	expect(upgraded?.characterState?.notes?.playerNotes).toBe('Preserve this note.');
	expect(backup).toMatchObject({
		finalName: 'Upgrade E2E Hero (v0.10 backup)',
		rulesVersion: 'dc20-0.10',
		rulesUpgradeBackupOf: 'upgrade-e2e-character'
	});
});

test('blocks automated conversion for an unsupported rules version', async ({ context, page }) => {
	await seedCharacters(context, [
		makeLegacyCharacter({
			id: 'unsupported-e2e-character',
			finalName: 'Unsupported E2E Hero',
			rulesVersion: 'dc20-9.99',
			selectedSpells: {},
			spells: []
		})
	]);
	await page.goto('/load-character');

	const card = page
		.getByRole('heading', { name: 'Unsupported E2E Hero', exact: true })
		.locator('..');
	await expect(card.getByText('Upgrade blocked')).toBeVisible();
	await card.getByRole('button', { name: 'Review upgrade blockers' }).click();
	await expect(page.getByText('No automated upgrade path exists from dc20-9.99.')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Create Backup & Upgrade' })).toBeDisabled();
});
