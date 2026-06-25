import { afterEach, describe, expect, it, vi } from 'vitest';
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
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('given approved, reworked, and deprecated selections, when planning, then it reports each action', () => {
		const character = makeCharacter({
			selectedSpells: {
				first: 'summon-familiar',
				second: 'gravity-sink-hole',
				third: 'force-dome',
				fourth: 'absorb-element'
			},
			selectedTalents: { barbarian_swift_berserker: 1 },
			languagesData: {
				abyssal: { fluency: 'limited' },
				infernal: { fluency: 'fluent' },
				goblin: { fluency: 'limited' }
			}
		});

		const plan = planCharacterUpgrade(character);

		expect(plan.canUpgrade).toBe(true);
		expect(plan.automaticRenames).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'absorb-element' })])
		);
		expect(plan.reworkedSelections).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ fromId: 'summon-familiar', toId: 'call-familiar' }),
				expect.objectContaining({ fromId: 'gravity-sink-hole' }),
				expect.objectContaining({ fromId: 'force-dome', toId: 'forcefield' }),
				expect.objectContaining({ fromId: 'abyssal', toId: 'fiendish' }),
				expect.objectContaining({ fromId: 'infernal', toId: 'fiendish' })
			])
		);
		expect(plan.deprecatedSelections).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ fromId: 'barbarian_swift_berserker' }),
				expect.objectContaining({ fromId: 'goblin' })
			])
		);
	});

	it('given a convertible legacy character, when upgrading, then it creates a current-rules draft and rewrites all known selection surfaces', () => {
		const character = makeCharacter({
			selectedFeatureChoices: {
				champion_choice: 'combat_readiness_brace',
				legacy_removed: 'swift_berserker',
				custom_payload: { choice: 'preserve-me' }
			},
			unlockedFeatureIds: ['combat_readiness_brace', 'swift_berserker'],
			selectedTalents: { barbarian_swift_berserker: 1, durable: 1 },
			selectedMulticlassOption: 'grandmaster',
			selectedMulticlassClass: 'fighter',
			selectedMulticlassFeature: 'fighter_legendary_feature',
			skillsData: { awareness: 1, insight: 2 },
			tradesData: { arcana: 1, blacksmithing: 1 },
			languagesData: {
				common: { fluency: 'fluent' },
				elvish: { fluency: 'limited' },
				primordial: { fluency: 'fluent' },
				abyssal: { fluency: 'limited' },
				infernal: { fluency: 'fluent' },
				goblin: { fluency: 'limited' }
			},
			selectedSpells: {
				first: 'summon-familiar',
				second: 'gravity-sink-hole',
				third: 'force-dome'
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

		expect(result.sourceCharacter).toBe(character);
		expect(character.rulesVersion).toBe('dc20-0.10');
		expect(character.id).toBe('legacy-upgrade');
		expect(character.selectedTalents).toEqual({
			barbarian_swift_berserker: 1,
			durable: 1
		});
		expect(character.selectedMulticlassOption).toBe('grandmaster');
		expect(upgraded.id).toBe('legacy-upgrade__dc20_0_10_5_draft');
		expect(upgraded.finalName).toBe('Legacy Upgrade (v0.10.5 draft)');
		expect(upgraded.rulesVersion).toBe('dc20-0.10.5');
		expect(upgraded.schemaVersion).toBe('2.2.0');
		expect(upgraded.rulesUpgradeSourceVersion).toBe('dc20-0.10');
		expect(upgraded.rulesUpgradeSourceId).toBe('legacy-upgrade');
		expect(upgraded.rulesUpgradeStatus).toBe('needs-review');
		expect(upgraded.rulesUpgradedAt).toBe('2026-06-12T10:00:00.000Z');
		expect(upgraded.selectedFeatureChoices).toEqual({
			champion_choice: 'combat_readiness_fortify',
			custom_payload: { choice: 'preserve-me' }
		});
		expect(upgraded.unlockedFeatureIds).toEqual(['combat_readiness_fortify']);
		expect(upgraded.selectedTalents).toEqual({ durable: 1 });
		expect(upgraded.selectedMulticlassOption).toBeUndefined();
		expect(upgraded.selectedMulticlassClass).toBeUndefined();
		expect(upgraded.selectedMulticlassFeature).toBeUndefined();
		expect(upgraded.skillsData).toEqual(character.skillsData);
		expect(upgraded.tradesData).toEqual(character.tradesData);
		expect(character.languagesData).toEqual({
			common: { fluency: 'fluent' },
			elvish: { fluency: 'limited' },
			primordial: { fluency: 'fluent' },
			abyssal: { fluency: 'limited' },
			infernal: { fluency: 'fluent' },
			goblin: { fluency: 'limited' }
		});
		expect(upgraded.languagesData).toEqual({
			common: { fluency: 'fluent' },
			elvish: { fluency: 'limited' },
			elemental: { fluency: 'fluent' },
			fiendish: { fluency: 'fluent' }
		});
		expect(upgraded.selectedSpells).toEqual({
			first: 'call-familiar',
			second: 'gravity-well',
			third: 'forcefield'
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

	it('given an older schema source with calculable collected effects, when upgrading, then the draft is current schema and stores collected arrays', () => {
		vi.stubGlobal('localStorage', {
			getItem: (key: string) =>
				key === 'customEquipment'
					? JSON.stringify({
							version: 1,
							rulesVersion: '0.10.5',
							weapons: [],
							armor: [],
							shields: [],
							spellFocuses: [
								{
									id: 'upgrade-protective-relic',
									category: 'spellFocus',
									name: 'Upgrade Protective Relic',
									hands: 'one-handed',
									properties: ['warded'],
									pointsSpent: 1,
									maxPoints: 2,
									spellCheckBonus: 0,
									spellAttackBonus: 0,
									spellDamageBonus: 0,
									adBonus: 0,
									hasMdr: true,
									longRangeBonus: 0,
									reachBonus: 0,
									hasCloseQuarters: false,
									hasMuffled: false,
									hasReactive: false,
									createdAt: '2026-06-19T00:00:00.000Z',
									updatedAt: '2026-06-19T00:00:00.000Z'
								}
							]
						})
					: null,
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn()
		});

		const character = makeCharacter({
			schemaVersion: '2.1.0',
			characterState: {
				resources: { current: {} },
				ui: { manualDefenseOverrides: {} },
				inventory: {
					items: [
						{
							id: 'focus-row',
							itemType: 'Custom',
							itemName: 'Upgrade Protective Relic',
							customEquipmentId: 'upgrade-protective-relic',
							customEquipmentCategory: 'spellFocus',
							isEquipped: true
						}
					],
					currency: {}
				},
				notes: { playerNotes: 'Keep this note.' },
				spells: [],
				maneuvers: []
			}
		});

		const result = upgradeCharacterToCurrentRules(character);

		expect(result.upgradedCharacter.schemaVersion).toBe('2.2.0');
		expect(result.upgradedCharacter.resistances).toContainEqual(
			expect.objectContaining({
				type: 'mystical',
				value: 'true',
				source: 'Upgrade Protective Relic'
			})
		);
	});

	it('given a reworked selection without removals, when upgrading, then it still needs review', () => {
		const character = makeCharacter({
			selectedSpells: {
				first: 'force-dome'
			}
		});

		const result = upgradeCharacterToCurrentRules(character, {
			now: new Date('2026-06-12T10:00:00.000Z')
		});

		expect(result.plan.reworkedSelections).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'force-dome' })])
		);
		expect(result.plan.deprecatedSelections).toEqual([]);
		expect(result.upgradedCharacter.rulesUpgradeStatus).toBe('needs-review');
	});

	it('given an explicit extra-copy request, when upgrading, then it uses the requested draft identity', () => {
		const character = makeCharacter();

		const result = upgradeCharacterToCurrentRules(character, {
			now: new Date('2026-06-12T10:00:00.000Z'),
			draftIdSuffix: 'draft_2',
			draftNameSuffix: '(v0.10.5 draft 2)'
		});

		expect(result.upgradedCharacter.id).toBe('legacy-upgrade__dc20_0_10_5_draft_2');
		expect(result.upgradedCharacter.finalName).toBe('Legacy Upgrade (v0.10.5 draft 2)');
		expect(character.id).toBe('legacy-upgrade');
	});

	it('given an unsupported rules version, when planning or upgrading, then conversion is blocked', () => {
		const character = makeCharacter({
			rulesVersion: 'dc20-9.99'
		});

		const plan = planCharacterUpgrade(character);

		expect(plan.canUpgrade).toBe(false);
		expect(plan.blockers).toEqual(
			expect.arrayContaining([expect.objectContaining({ fromId: 'dc20-9.99' })])
		);
		expect(() => upgradeCharacterToCurrentRules(character)).toThrow(
			'Character has unresolved upgrade blockers: dc20-9.99'
		);
		expect(character.rulesVersion).toBe('dc20-9.99');
	});
});
