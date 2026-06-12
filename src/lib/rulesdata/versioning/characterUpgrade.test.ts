import { describe, expect, it } from 'vitest';
import type { SavedCharacter } from '../../types/dataContracts';
import { assessCharacterCompatibility } from './compatibility';
import { planCharacterUpgrade, upgradeCharacterToCurrentRules } from './characterUpgrade';

function makeCharacter(overrides: Record<string, unknown> = {}): SavedCharacter {
	return {
		id: 'legacy-upgrade',
		finalName: 'Legacy Upgrade',
		rulesVersion: 'dc20-0.10',
		schemaVersion: '2.2.0',
		selectedTraitIds: [],
		selectedFeatureChoices: {},
		selectedTalents: {},
		spells: [],
		maneuvers: [],
		characterState: {
			resources: { current: {} },
			ui: { manualDefenseOverrides: {} },
			inventory: { items: [], currency: {} },
			notes: { playerNotes: 'Keep this note.' },
			spells: [],
			maneuvers: []
		},
		...overrides
	} as unknown as SavedCharacter;
}

describe('v0.10 character upgrade', () => {
	it('given approved, reworked, and deprecated selections, when planning, then it reports each action', () => {
		const character = makeCharacter({
			selectedSpells: {
				first: 'summon-familiar',
				second: 'gravity-sink-hole'
			},
			selectedTalents: { barbarian_swift_berserker: 1 }
		});

		const plan = planCharacterUpgrade(character);

		expect(plan.canUpgrade).toBe(true);
		expect(plan.automaticRenames).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'summon-familiar' })])
		);
		expect(plan.reworkedSelections).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'gravity-sink-hole' })])
		);
		expect(plan.deprecatedSelections).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'barbarian_swift_berserker' })])
		);
	});

	it('given a convertible legacy character, when upgrading, then it creates a backup and rewrites all known selection surfaces', () => {
		const character = makeCharacter({
			selectedFeatureChoices: {
				champion_choice: 'combat_readiness_brace',
				legacy_removed: 'swift_berserker',
				custom_payload: { choice: 'preserve-me' }
			},
			unlockedFeatureIds: ['combat_readiness_brace', 'swift_berserker'],
			selectedTalents: { barbarian_swift_berserker: 1, durable: 1 },
			selectedSpells: {
				first: 'summon-familiar',
				second: 'gravity-sink-hole'
			},
			spells: [
				{ id: 'summon-familiar', name: 'Summon Familiar' },
				{ id: 'gravity-sink-hole', spellName: 'Gravity Sink Hole' }
			],
			characterState: {
				resources: { current: {} },
				ui: { manualDefenseOverrides: {} },
				inventory: { items: [], currency: {} },
				notes: { playerNotes: 'Keep this note.' },
				spells: [{ id: 'absorb-element', name: 'Absorb Element' }],
				maneuvers: [{ id: 'brace', name: 'Brace' }]
			}
		});

		const result = upgradeCharacterToCurrentRules(character, {
			now: new Date('2026-06-12T10:00:00.000Z')
		});
		const upgraded = result.upgradedCharacter as SavedCharacter & {
			selectedSpells: Record<string, string>;
		};

		expect(result.backupCharacter).toMatchObject({
			id: 'legacy-upgrade__v010_backup__1781258400000',
			finalName: 'Legacy Upgrade (v0.10 backup)',
			rulesVersion: 'dc20-0.10',
			rulesUpgradeBackupOf: 'legacy-upgrade'
		});
		expect(result.backupCharacter.selectedTalents).toEqual({
			barbarian_swift_berserker: 1,
			durable: 1
		});
		expect(upgraded.rulesVersion).toBe('dc20-0.10.5');
		expect(upgraded.rulesUpgradeSourceVersion).toBe('dc20-0.10');
		expect(upgraded.rulesUpgradedAt).toBe('2026-06-12T10:00:00.000Z');
		expect(upgraded.selectedFeatureChoices).toEqual({
			champion_choice: 'combat_readiness_fortify',
			custom_payload: { choice: 'preserve-me' }
		});
		expect(upgraded.unlockedFeatureIds).toEqual(['combat_readiness_fortify']);
		expect(upgraded.selectedTalents).toEqual({ durable: 1 });
		expect(upgraded.selectedSpells).toEqual({
			first: 'call-familiar',
			second: 'gravity-well'
		});
		expect(upgraded.spells).toEqual([
			{ id: 'call-familiar', name: 'Call Familiar' },
			{ id: 'gravity-well', spellName: 'Gravity Well' }
		]);
		expect(upgraded.characterState.notes.playerNotes).toBe('Keep this note.');
		expect(upgraded.characterState.spells).toEqual([
			{ id: 'absorb-elements', name: 'Absorb Elements' }
		]);
		expect(upgraded.characterState.maneuvers).toEqual([{ id: 'brace', name: 'Brace' }]);
		expect(assessCharacterCompatibility(upgraded).state).toBe('editable');
	});

	it('given an ambiguous legacy selection, when planning or upgrading, then conversion is blocked', () => {
		const character = makeCharacter({
			selectedSpells: { first: 'force-dome' }
		});

		const plan = planCharacterUpgrade(character);

		expect(plan.canUpgrade).toBe(false);
		expect(plan.blockers).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'force-dome' })])
		);
		expect(() => upgradeCharacterToCurrentRules(character)).toThrow(
			'Character has unresolved upgrade blockers: force-dome'
		);
		expect(character.rulesVersion).toBe('dc20-0.10');
	});
});
