import { describe, expect, it, vi } from 'vitest';
import type { SavedCharacter } from '../../types/dataContracts';
import { PdfExportDataSchema } from '../../types/pdfExport';
import {
	formatAncestryTraits,
	formatSpellsAndManeuvers,
	formatTalents,
	transformSavedCharacterToPdfData
} from '../../pdf/transformers';
import { traitsData } from '../ancestries/traits';
import { findTalentById, selectableTalents } from '../classes-data/talents/talent.loader';
import { getSpellById } from '../spells-data';
import { assessCharacterCompatibility, getCharacterAutoSaveMode } from './compatibility';

vi.mock('../../utils/logger', () => ({
	logger: {
		debug: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		info: vi.fn()
	}
}));

const makeLegacyV010Character = (): SavedCharacter =>
	({
		id: 'legacy-v010-acceptance',
		finalName: 'Legacy v0.10 Acceptance',
		finalPlayerName: 'Compatibility Tester',
		rulesVersion: 'dc20-0.10',
		schemaVersion: 2,
		level: 3,
		classId: 'barbarian',
		className: 'Barbarian',
		selectedSubclass: 'Elemental Fury',
		unlockedFeatureIds: ['barbarian_rage', 'barbarian_elemental_fury_raging_elements'],
		ancestry1Id: 'beastborn',
		ancestry1Name: 'Beastborn',
		selectedTraitIds: ['beastborn_hazardous_hide', 'beastborn_capable_limb'],
		selectedTalents: {
			barbarian_swift_berserker: 1
		},
		selectedSpells: {
			slot1: 'summon-familiar',
			slot2: 'absorb-element'
		},
		spells: [],
		selectedManeuvers: ['Brace'],
		maneuvers: [{ id: 'brace', name: 'Brace', type: 'Defense' }],
		finalMight: 2,
		finalAgility: 1,
		finalCharisma: 0,
		finalIntelligence: 0,
		finalPrimeModifierValue: 2,
		finalCombatMastery: 1,
		finalHPMax: 14,
		finalSPMax: 3,
		finalMPMax: 0,
		finalGritPoints: 2,
		finalRestPoints: 10,
		finalPD: 12,
		finalAD: 10,
		finalAttackSpellCheck: 3,
		finalSaveDC: 12,
		finalInitiativeBonus: 1,
		finalMoveSpeed: 5,
		finalJumpDistance: 1,
		finalDeathThreshold: 3,
		skillsData: {
			awareness: 1
		},
		tradesData: {
			arcana: 1,
			smithing: 1
		},
		languagesData: {
			common: { fluency: 'fluent' }
		},
		characterState: {
			resources: {
				current: {
					currentHP: 9,
					currentSP: 2,
					currentMP: 0,
					currentGritPoints: 1,
					currentRestPoints: 8,
					tempHP: 0,
					exhaustionLevel: 0
				},
				original: {}
			},
			attacks: [],
			spells: [],
			maneuvers: [{ id: 'brace', name: 'Brace', type: 'Defense' }],
			inventory: {
				items: [],
				currency: {
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0
				}
			},
			notes: {
				playerNotes: 'Legacy notes must remain state-only editable.'
			},
			ui: {
				manualDefenseOverrides: {},
				activeConditions: {},
				combatToggles: {}
			}
		}
	}) as unknown as SavedCharacter;

describe('legacy v0.10 character runtime acceptance', () => {
	it('keeps old saves loadable and sheet-renderable while blocking edit and level-up until upgrade', () => {
		const legacyCharacter = makeLegacyV010Character();

		const compatibility = assessCharacterCompatibility(legacyCharacter);

		expect(compatibility.state).toBe('upgrade-required');
		expect(compatibility.canLoad).toBe(true);
		expect(compatibility.canRenderSheet).toBe(true);
		expect(compatibility.canEdit).toBe(false);
		expect(compatibility.canLevelUp).toBe(false);
		expect(compatibility.canAutoSave).toBe(true);
		expect(compatibility.autoSaveMode).toBe('characterState');
		expect(getCharacterAutoSaveMode(legacyCharacter)).toBe('characterState');
		expect(compatibility.canExportPdf).toBe(true);
		expect(compatibility.pdfVersion).toBe('0.10');
		expect(compatibility.aliasDecisions).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					domain: 'talent',
					fromId: 'barbarian_swift_berserker',
					status: 'deprecated',
					compatibilityState: 'upgrade-required'
				}),
				expect.objectContaining({
					domain: 'spell',
					fromId: 'summon-familiar',
					toId: 'call-familiar',
					compatibilityState: 'editable'
				})
			])
		);
	});

	it('routes legacy IDs for sheet/PDF display without rewriting the saved character', () => {
		const legacyCharacter = makeLegacyV010Character();
		const beforeTransform = JSON.stringify(legacyCharacter);

		expect(findTalentById('barbarian_swift_berserker')).toMatchObject({
			name: 'Swift Berserker',
			deprecated: true
		});
		expect(
			selectableTalents.find((talent) => talent.id === 'barbarian_swift_berserker')
		).toBeUndefined();
		expect(getSpellById('summon-familiar')?.name).toBe('Call Familiar');
		expect(traitsData.find((trait) => trait.id === 'beastborn_hazardous_hide')?.name).toBe(
			'Hazardous Hide'
		);

		expect(formatTalents(legacyCharacter.selectedTalents as Record<string, number>)).toContain(
			'Swift Berserker'
		);
		expect(formatAncestryTraits((legacyCharacter as any).selectedTraitIds)).toContain(
			'Hazardous Hide'
		);
		expect(formatSpellsAndManeuvers(['summon-familiar'], legacyCharacter.maneuvers)).toContain(
			'Call Familiar'
		);

		const pdfData = transformSavedCharacterToPdfData(legacyCharacter);
		const parsed = PdfExportDataSchema.safeParse(pdfData);

		expect(parsed.success).toBe(true);
		expect(pdfData.characterName).toBe('Legacy v0.10 Acceptance');
		expect(pdfData.features).toContain('[Class Features]');
		expect(pdfData.features).toContain('Raging Elements');
		expect(pdfData.features).toContain('[Ancestry Traits]');
		expect(pdfData.features).toContain('Hazardous Hide');
		expect(pdfData.features).toContain('Capable Limb');
		expect(pdfData.features).toContain('[Talents]');
		expect(pdfData.features).toContain('Swift Berserker');
		expect(pdfData.features).toContain('[Spells]');
		expect(pdfData.features).toContain('Call Familiar');
		expect(pdfData.features).toContain('Absorb Elements');
		expect(pdfData.features).toContain('[Maneuvers]');
		expect(pdfData.features).toContain('Brace');
		expect(JSON.stringify(legacyCharacter)).toBe(beforeTransform);
	});
});

describe('current v0.10.5 character export acceptance', () => {
	it('renders current spell IDs through the supported PDF route', () => {
		const currentCharacter = {
			...makeLegacyV010Character(),
			id: 'current-v0105-acceptance',
			finalName: 'Current v0.10.5 Acceptance',
			rulesVersion: 'dc20-0.10.5',
			selectedTalents: {},
			selectedSpells: {
				slot1: 'call-familiar',
				slot2: 'absorb-elements'
			}
		} as SavedCharacter;

		const compatibility = assessCharacterCompatibility(currentCharacter);
		const pdfData = transformSavedCharacterToPdfData(currentCharacter);

		expect(compatibility.state).toBe('editable');
		expect(compatibility.canExportPdf).toBe(true);
		expect(compatibility.pdfVersion).toBe('0.10');
		expect(PdfExportDataSchema.safeParse(pdfData).success).toBe(true);
		expect(pdfData.features).toContain('Call Familiar');
		expect(pdfData.features).toContain('Absorb Elements');
	});
});
