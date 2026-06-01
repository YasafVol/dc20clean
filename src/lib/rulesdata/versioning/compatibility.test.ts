import { describe, expect, it } from 'vitest';
import {
	CURRENT_RULES_VERSION,
	assessCharacterCompatibility,
	getCharacterAutoSaveMode,
	getPdfVersionForRulesVersion
} from './compatibility';
import { resolveRulesAlias } from './aliases';

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
		expect(result.autoSaveMode).toBe('characterState');
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
		expect(result.autoSaveMode).toBe('characterState');
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

	it('resolves approved aliases without rewriting saved IDs', () => {
		const alias = resolveRulesAlias('spell', 'summon-familiar', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'spell',
			fromId: 'summon-familiar',
			toId: 'call-familiar',
			status: 'alias',
			compatibilityState: 'editable'
		});
	});

	it('flags ambiguous aliases as view-only decisions', () => {
		const alias = resolveRulesAlias('spell', 'force-dome', {
			fromRulesVersion: 'dc20-0.10',
			toRulesVersion: 'dc20-0.10.5'
		});

		expect(alias).toMatchObject({
			domain: 'spell',
			fromId: 'force-dome',
			status: 'ambiguous',
			compatibilityState: 'view-only'
		});
	});

	it('returns state-only auto-save for upgrade-required characters', () => {
		expect(
			getCharacterAutoSaveMode({
				id: 'old-rules',
				rulesVersion: 'dc20-0.10',
				schemaVersion: '2.2.0'
			})
		).toBe('characterState');
	});
});
