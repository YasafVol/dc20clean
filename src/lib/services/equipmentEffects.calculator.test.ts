import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculateCharacterWithBreakdowns } from './enhancedCharacterCalculator';
import type { EnhancedCharacterBuildData } from '../types/effectSystem';

function buildCharacter(equipmentInventory: EnhancedCharacterBuildData['equipmentInventory']) {
	return {
		id: 'equipment-test',
		finalName: 'Equipment Test',
		level: 1,
		attribute_might: 0,
		attribute_agility: 0,
		attribute_charisma: 0,
		attribute_intelligence: 0,
		combatMastery: 0,
		classId: '',
		selectedTraitIds: [],
		selectedTraitChoices: {},
		featureChoices: {},
		skillsData: {},
		tradesData: {},
		languagesData: {},
		selectedSpells: {},
		selectedManeuvers: [],
		equipmentInventory,
		lastModified: 0
	} satisfies EnhancedCharacterBuildData;
}

describe('equipment effects in calculator', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('applies Guard PD only from equipped weapons', () => {
		const equipped = calculateCharacterWithBreakdowns(
			buildCharacter([
				{ id: 'short-sword', itemType: 'Weapon', itemName: 'Short Sword', isEquipped: true }
			])
		);
		const carried = calculateCharacterWithBreakdowns(
			buildCharacter([
				{ id: 'short-sword', itemType: 'Weapon', itemName: 'Short Sword', isEquipped: false }
			])
		);

		expect(carried.stats.finalPD).toBe(9);
		expect(equipped.stats.finalPD).toBe(10);
		expect(equipped.breakdowns.pd.effects).toContainEqual(
			expect.objectContaining({
				value: 1,
				source: expect.objectContaining({ type: 'equipment', name: 'Short Sword' })
			})
		);
	});

	it('applies equipped custom spell focus effects', () => {
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
									id: 'protective-relic',
									category: 'spellFocus',
									name: 'Protective Relic',
									hands: 'one-handed',
									properties: ['protective', 'warded'],
									pointsSpent: 2,
									maxPoints: 2,
									spellCheckBonus: 0,
									spellAttackBonus: 0,
									spellDamageBonus: 0,
									adBonus: 1,
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

		const result = calculateCharacterWithBreakdowns(
			buildCharacter([
				{
					id: 'focus-row',
					itemType: 'Custom',
					itemName: 'Protective Relic',
					customEquipmentId: 'protective-relic',
					customEquipmentCategory: 'spellFocus',
					isEquipped: true
				}
			])
		);

		expect(result.stats.finalAD).toBe(10);
		expect(result.resistances).toContainEqual(
			expect.objectContaining({
				type: 'mystical',
				value: 'true',
				source: expect.objectContaining({ type: 'equipment', name: 'Protective Relic' })
			})
		);
	});
});
