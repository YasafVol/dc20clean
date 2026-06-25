import { describe, expect, it } from 'vitest';
import { matchesUserSpellFacets } from '../../services/spellFiltering';
import { getSpellById, type SpellTag } from './index';

describe('v0.10.5 spell taxonomy', () => {
	it('treats Poison as a canonical filterable tag', () => {
		const poisonTag: SpellTag = 'Poison';
		const poisonBolt = getSpellById('poison-bolt');

		expect(poisonBolt?.tags).toContain(poisonTag);
		expect(matchesUserSpellFacets(poisonBolt!, { tags: [poisonTag] })).toBe(true);
	});

	it('aligns Blight Bomb with the v0.10.5 Ailment and Poison tags', () => {
		const blightBomb = getSpellById('blight-bomb');

		expect(blightBomb?.tags).toEqual(expect.arrayContaining(['Ailment', 'Poison']));
		expect(matchesUserSpellFacets(blightBomb!, { tags: ['Ailment'] })).toBe(true);
	});
});
