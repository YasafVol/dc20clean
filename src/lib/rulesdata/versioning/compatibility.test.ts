import { describe, expect, it } from 'vitest';
import {
	CURRENT_RULES_VERSION,
	assessCharacterCompatibility,
	getCharacterAutoSaveMode,
	getPdfVersionForRulesVersion,
	mergeLegacyResourceState
} from './compatibility';
import { resolveRulesAlias } from './aliases';
import type { CharacterState } from '../../types/dataContracts';

describe('rules version compatibility', () => {
	it('treats characters without rulesVersion as legacy v0.10 and upgrade-required under the current v0.10.5 runtime', () => {
		const result = assessCharacterCompatibility({
			id: 'legacy-v010',
			finalName: 'Legacy v0.10',
			schemaVersion: 2
		});

		expect(CURRENT_RULES_VERSION).toBe('dc20-0.10.5');
		expect(result.rulesVersion).toBe('dc20-0.10');
		expect(result.schemaVersion).toBe('2.2.0');
		expect(result.state).toBe('upgrade-required');
		expect(result.canLoad).toBe(true);
		expect(result.canRenderSheet).toBe(true);
		expect(result.canEdit).toBe(false);
		expect(result.canLevelUp).toBe(false);
		expect(result.canAutoSave).toBe(true);
		expect(result.autoSaveMode).toBe('resources');
		expect(result.pdfVersion).toBe('0.10');
	});

	it('treats v0.10.5 characters as editable under the current v0.10.5 runtime', () => {
		const result = assessCharacterCompatibility({
			id: 'current-v0105',
			finalName: 'Current v0.10.5',
			rulesVersion: 'dc20-0.10.5',
			schemaVersion: '2.2.0'
		});

		expect(result.state).toBe('editable');
		expect(result.canLoad).toBe(true);
		expect(result.canRenderSheet).toBe(true);
		expect(result.canEdit).toBe(true);
		expect(result.canLevelUp).toBe(true);
		expect(result.canAutoSave).toBe(true);
		expect(result.autoSaveMode).toBe('full');
		expect(result.pdfVersion).toBe('0.10');
	});

	it('classifies old rules characters as upgrade-required when evaluated against v0.10.5 rules', () => {
		const result = assessCharacterCompatibility(
			{
				id: 'old-rules',
				finalName: 'Old Rules',
				rulesVersion: 'dc20-0.10',
				schemaVersion: '2.2.0'
			},
			{ currentRulesVersion: 'dc20-0.10.5' }
		);

		expect(result.state).toBe('upgrade-required');
		expect(result.canLoad).toBe(true);
		expect(result.canRenderSheet).toBe(true);
		expect(result.canEdit).toBe(false);
		expect(result.canLevelUp).toBe(false);
		expect(result.canAutoSave).toBe(true);
		expect(result.autoSaveMode).toBe('resources');
		expect(result.canExportPdf).toBe(true);
		expect(result.pdfVersion).toBe('0.10');
	});

	it('classifies unsupported future rules as view-only', () => {
		const result = assessCharacterCompatibility({
			id: 'future-rules',
			finalName: 'Future Rules',
			rulesVersion: 'dc20-9.99',
			schemaVersion: '2.2.0'
		});

		expect(result.state).toBe('view-only');
		expect(result.canLoad).toBe(true);
		expect(result.canRenderSheet).toBe(true);
		expect(result.canEdit).toBe(false);
		expect(result.canLevelUp).toBe(false);
		expect(result.canAutoSave).toBe(false);
		expect(result.autoSaveMode).toBe('none');
	});

	it('keeps v0.10.5 exports routed to the v0.10 template until a v0.10.5 template exists', () => {
		expect(getPdfVersionForRulesVersion('dc20-0.10')).toBe('0.10');
		expect(getPdfVersionForRulesVersion('dc20-0.10.5')).toBe('0.10');
	});

	it('resolves approved pure aliases without rewriting saved IDs', () => {
		const alias = resolveRulesAlias('spell', 'absorb-element', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'spell',
			fromId: 'absorb-element',
			toId: 'absorb-elements',
			status: 'alias',
			compatibilityState: 'editable'
		});
	});

	it('classifies uncertain spell changes as explicit-upgrade reworks', () => {
		const alias = resolveRulesAlias('spell', 'summon-familiar', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'spell',
			fromId: 'summon-familiar',
			toId: 'call-familiar',
			status: 'reworked',
			compatibilityState: 'upgrade-required'
		});
	});

	it('classifies Force Dome as an explicit-upgrade rework to Forcefield', () => {
		const alias = resolveRulesAlias('spell', 'force-dome', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'spell',
			fromId: 'force-dome',
			toId: 'forcefield',
			status: 'reworked',
			compatibilityState: 'upgrade-required'
		});
	});

	it('does not treat the still-valid Brace maneuver as the Champion Fortify rename', () => {
		expect(
			resolveRulesAlias('maneuver', 'Brace', {
				fromRulesVersion: 'dc20-0.10',
				toRulesVersion: 'dc20-0.10.5'
			})
		).toBeUndefined();

		const result = assessCharacterCompatibility({
			id: 'old-brace-maneuver',
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0',
			selectedManeuvers: ['Brace'],
			maneuvers: [{ id: 'maneuver_1', name: 'Brace' }]
		});

		expect(result.state).toBe('upgrade-required');
		expect(result.reasons).not.toContain('maneuver:Brace requires view-only.');
	});

	it('routes the Champion Combat Readiness rename through feature aliases', () => {
		const alias = resolveRulesAlias('feature', 'combat_readiness_brace', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'feature',
			fromId: 'combat_readiness_brace',
			toId: 'combat_readiness_fortify',
			status: 'alias',
			compatibilityState: 'editable'
		});
	});

	it('keeps removed Swift Berserker loadable but upgrade-required for legacy characters', () => {
		const alias = resolveRulesAlias('talent', 'barbarian_swift_berserker', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'talent',
			fromId: 'barbarian_swift_berserker',
			status: 'deprecated',
			compatibilityState: 'upgrade-required'
		});

		const result = assessCharacterCompatibility({
			id: 'old-swift-berserker',
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0',
			selectedTalents: { barbarian_swift_berserker: 1 }
		});

		expect(result.state).toBe('upgrade-required');
		expect(result.canLoad).toBe(true);
		expect(result.canRenderSheet).toBe(true);
		expect(result.canEdit).toBe(false);
		expect(result.canExportPdf).toBe(true);
		expect(result.aliasDecisions).toEqual(
			expect.arrayContaining([expect.objectContaining(alias!)])
		);
	});

	it('scans unlocked features and character-state spell arrays for upgrade decisions', () => {
		const result = assessCharacterCompatibility({
			id: 'nested-legacy-selections',
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0',
			unlockedFeatureIds: ['swift_berserker'],
			characterState: {
				spells: [{ id: 'force-dome', name: 'Force Dome' }]
			}
		});

		expect(result.state).toBe('upgrade-required');
		expect(result.aliasDecisions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ domain: 'feature', fromId: 'swift_berserker' }),
				expect.objectContaining({ domain: 'spell', fromId: 'force-dome' })
			])
		);
	});

	it('scans retired persisted multiclass options as deprecated talents', () => {
		const result = assessCharacterCompatibility({
			id: 'legacy-grandmaster-multiclass',
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0',
			selectedMulticlassOption: 'grandmaster',
			selectedMulticlassClass: 'fighter',
			selectedMulticlassFeature: 'fighter_legendary_feature'
		});

		expect(result.state).toBe('upgrade-required');
		expect(result.aliasDecisions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					domain: 'talent',
					fromId: 'multiclass_grandmaster',
					status: 'deprecated'
				})
			])
		);
	});

	it('classifies renamed and removed legacy languages for explicit upgrade', () => {
		const result = assessCharacterCompatibility({
			id: 'legacy-languages',
			rulesVersion: 'dc20-0.10',
			schemaVersion: '2.2.0',
			languagesData: {
				primordial: { fluency: 'fluent' },
				abyssal: { fluency: 'limited' },
				undercommon: { fluency: 'limited' }
			}
		});

		expect(result.aliasDecisions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					domain: 'language',
					fromId: 'primordial',
					toId: 'elemental',
					status: 'alias'
				}),
				expect.objectContaining({
					domain: 'language',
					fromId: 'abyssal',
					toId: 'fiendish',
					status: 'reworked'
				}),
				expect.objectContaining({
					domain: 'language',
					fromId: 'undercommon',
					status: 'deprecated'
				})
			])
		);
	});

	it('limits upgrade-required characters to resource auto-save', () => {
		expect(
			getCharacterAutoSaveMode({
				id: 'old-rules',
				rulesVersion: 'dc20-0.10',
				schemaVersion: '2.2.0'
			})
		).toBe('resources');
	});

	it('merges only legacy resource counters into the stored character state', () => {
		const persistedState = {
			resources: {
				current: {
					currentHP: 10,
					currentSP: 3,
					currentMP: 4,
					currentGritPoints: 2,
					currentRestPoints: 6,
					tempHP: 0,
					actionPointsUsed: 1,
					exhaustionLevel: 0,
					deathSteps: 1,
					isDead: false
				}
			},
			ui: { manualDefenseOverrides: {} },
			inventory: { items: [{ id: 'kept-item' }], currency: { gold: 1, silver: 0, copper: 0 } },
			notes: { playerNotes: 'kept note' },
			attacks: [{ id: 'kept-attack' }]
		} satisfies CharacterState;
		const nextState = {
			...persistedState,
			resources: {
				...persistedState.resources,
				current: {
					...persistedState.resources.current,
					currentHP: 7,
					currentSP: 2,
					currentMP: 3,
					currentGritPoints: 1,
					currentRestPoints: 5,
					tempHP: 4,
					actionPointsUsed: 9,
					exhaustionLevel: 2,
					deathSteps: 5,
					isDead: true
				}
			},
			inventory: { items: [], currency: { gold: 0, silver: 0, copper: 0 } },
			notes: { playerNotes: 'discarded note' },
			attacks: []
		} satisfies CharacterState;

		const result = mergeLegacyResourceState(persistedState, nextState);

		expect(result.resources.current).toEqual({
			...persistedState.resources.current,
			currentHP: 7,
			currentSP: 2,
			currentMP: 3,
			currentGritPoints: 1,
			currentRestPoints: 5,
			tempHP: 4,
			exhaustionLevel: 2
		});
		expect(result.inventory).toEqual(persistedState.inventory);
		expect(result.notes).toEqual(persistedState.notes);
		expect(result.attacks).toEqual(persistedState.attacks);
	});
});
