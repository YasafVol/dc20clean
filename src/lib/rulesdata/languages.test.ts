import { describe, expect, it } from 'vitest';
import {
	formatLanguageIdDisplayName,
	getCanonicalLanguageId,
	getLanguageCompatibilitySelections,
	getLanguageById,
	getPrimaryLanguageSelectionId,
	languageCheckDcByFamily,
	languagesData
} from './languages';

describe('languagesData', () => {
	it('matches the official DC20 0.10.5 language families and omits retired selectable names', () => {
		expect(
			languagesData.map(({ id, name, family }) => ({
				id,
				name,
				family
			}))
		).toEqual([
			{ id: 'common', name: 'Common', family: 'mortal' },
			{ id: 'commonsign', name: 'Common Sign', family: 'mortal' },
			{ id: 'human', name: 'Human', family: 'mortal' },
			{ id: 'dwarvish', name: 'Dwarvish', family: 'mortal' },
			{ id: 'elvish', name: 'Elvish', family: 'mortal' },
			{ id: 'gnomish', name: 'Gnomish', family: 'mortal' },
			{ id: 'halfling', name: 'Halfling', family: 'mortal' },
			{ id: 'orcish', name: 'Orcish', family: 'mortal' },
			{ id: 'giant', name: 'Giant', family: 'exotic' },
			{ id: 'draconic', name: 'Draconic', family: 'exotic' },
			{ id: 'fey', name: 'Fey', family: 'exotic' },
			{ id: 'elemental', name: 'Elemental', family: 'exotic' },
			{ id: 'celestial', name: 'Celestial', family: 'divine' },
			{ id: 'fiendish', name: 'Fiendish', family: 'divine' },
			{ id: 'deepspeech', name: 'Deep Speech', family: 'outer' }
		]);

		expect(languagesData.map((language) => language.id)).not.toEqual(
			expect.arrayContaining(['goblin', 'undercommon', 'primordial', 'abyssal', 'infernal'])
		);
	});

	it('assigns language check DCs by official family', () => {
		expect(languageCheckDcByFamily).toEqual({
			mortal: 10,
			exotic: 15,
			divine: 15,
			outer: 20
		});

		expect(getLanguageById('common')?.checkDc).toBe(10);
		expect(getLanguageById('giant')?.checkDc).toBe(15);
		expect(getLanguageById('fiendish')?.checkDc).toBe(15);
		expect(getLanguageById('deepspeech')?.checkDc).toBe(20);
	});

	it('resolves renamed legacy IDs onto the current 0.10.5 catalog', () => {
		expect(getCanonicalLanguageId('primordial')).toBe('elemental');
		expect(getCanonicalLanguageId('abyssal')).toBe('fiendish');
		expect(getCanonicalLanguageId('infernal')).toBe('fiendish');

		expect(getLanguageById('primordial')).toMatchObject({ id: 'elemental', name: 'Elemental' });
		expect(getLanguageById('abyssal')).toMatchObject({ id: 'fiendish', name: 'Fiendish' });
		expect(getLanguageById('infernal')).toMatchObject({ id: 'fiendish', name: 'Fiendish' });
		expect(getCanonicalLanguageId('undercommon')).toBeUndefined();
	});

	it('prefers canonical IDs but keeps legacy aliases editable when they are the saved selection', () => {
		const elemental = getLanguageById('elemental');
		const fiendish = getLanguageById('fiendish');

		expect(elemental).toBeDefined();
		expect(fiendish).toBeDefined();

		expect(
			getPrimaryLanguageSelectionId(elemental!, {
				primordial: { fluency: 'limited' }
			})
		).toBe('primordial');
		expect(
			getPrimaryLanguageSelectionId(elemental!, {
				elemental: { fluency: 'fluent' },
				primordial: { fluency: 'limited' }
			})
		).toBe('elemental');
		expect(
			getPrimaryLanguageSelectionId(fiendish!, {
				infernal: { fluency: 'fluent' }
			})
		).toBe('infernal');
	});

	it('surfaces unsupported legacy and duplicate alias selections so they never remain charged but invisible', () => {
		expect(
			getLanguageCompatibilitySelections({
				common: { fluency: 'fluent' },
				goblin: { fluency: 'limited' },
				undercommon: { fluency: 'fluent' }
			})
		).toEqual([
			{
				id: 'goblin',
				name: 'Goblin',
				fluency: 'limited',
				reason:
					'This legacy language is no longer part of the DC20 0.10.5 catalog. It remains visible here for review and removal only.'
			},
			{
				id: 'undercommon',
				name: 'Undercommon',
				fluency: 'fluent',
				reason:
					'This legacy language is no longer part of the DC20 0.10.5 catalog. It remains visible here for review and removal only.'
			}
		]);

		expect(
			getLanguageCompatibilitySelections({
				common: { fluency: 'fluent' },
				elemental: { fluency: 'fluent' },
				primordial: { fluency: 'limited' }
			})
		).toEqual([
			{
				id: 'primordial',
				name: 'Primordial',
				fluency: 'limited',
				reason:
					'Legacy alias for Elemental still selected separately. Remove it to avoid invisible duplicate Language Point costs.'
			}
		]);

		expect(
			getLanguageCompatibilitySelections({
				common: { fluency: 'fluent' },
				primordial: { fluency: 'limited' }
			})
		).toEqual([]);
		expect(formatLanguageIdDisplayName('deep_speech')).toBe('Deep Speech');
	});
});
