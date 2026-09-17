import { describe, expect, it } from 'vitest';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { EnhancedCalculationResult } from '../../../lib/types/effectSystem';
import { createCharacterSheetPresentation } from './characterSheetPresentation';

function makeCharacter(overrides: Partial<SavedCharacter> = {}): SavedCharacter {
	return {
		id: 'sheet-presentation-character',
		className: 'Barbarian',
		level: 1,
		finalMPMax: 0,
		spells: [],
		maneuvers: [],
		characterState: {
			resources: {
				current: {
					currentMP: 0
				}
			}
		},
		...overrides
	} as unknown as SavedCharacter;
}

function makeCalculation(
	overrides: {
		maximumMana?: number;
		spellSlots?: number;
		maneuversKnown?: number;
	} = {}
): EnhancedCalculationResult {
	const { maximumMana = 0, spellSlots = 0, maneuversKnown = 0 } = overrides;
	return {
		breakdowns: {
			mpMax: { total: maximumMana }
		},
		spellsKnownSlots: Array.from({ length: spellSlots }, () => ({})),
		levelBudgets: {
			totalManeuversKnown: maneuversKnown
		}
	} as unknown as EnhancedCalculationResult;
}

describe('createCharacterSheetPresentation', () => {
	it('derives Mana presentation from the calculated maximum and saved current value', () => {
		const character = makeCharacter({
			characterState: {
				resources: {
					current: {
						currentMP: 2
					}
				}
			}
		} as Partial<SavedCharacter>);

		const presentation = createCharacterSheetPresentation(
			character,
			makeCalculation({ maximumMana: 5 })
		);

		expect(presentation.resources.mana).toEqual({
			current: 2,
			maximum: 5,
			visible: true
		});
	});

	it('keeps spells visible without Mana when the character has a saved spell', () => {
		const character = makeCharacter({
			spells: [{ spellName: 'Sorcery' }]
		} as Partial<SavedCharacter>);

		const presentation = createCharacterSheetPresentation(character, makeCalculation());

		expect(presentation.resources.mana.visible).toBe(false);
		expect(presentation.access.spells).toBe(true);
	});

	it('derives spell and maneuver access from calculated entitlements', () => {
		const presentation = createCharacterSheetPresentation(
			makeCharacter(),
			makeCalculation({ spellSlots: 1, maneuversKnown: 1 })
		);

		expect(presentation.access).toEqual({
			spells: true,
			maneuvers: true
		});
	});

	it.each([
		[
			'direct progression',
			makeCharacter({
				className: 'Sorcerer',
				level: 2
			})
		],
		[
			'multiclass progression',
			makeCharacter({
				selectedMulticlassClass: 'Sorcerer',
				selectedMulticlassFeature: 'sorcerer_meta_magic'
			})
		]
	])('recognizes Meta Magic from %s by canonical feature ID', (_source, character) => {
		const presentation = createCharacterSheetPresentation(character, makeCalculation());

		expect(presentation.features.metaMagic).toBe(true);
	});
});
