import { describe, expect, it } from 'vitest';
import { traitsData } from './traits';

describe('Trait subsystem contract', () => {
	it('owns unique, complete trait records', () => {
		expect(new Set(traitsData.map((trait) => trait.id)).size).toBe(traitsData.length);
		for (const trait of traitsData) {
			expect(trait.name).toBeTruthy();
			expect(Number.isFinite(trait.cost)).toBe(true);
			expect(trait.effects.length).toBeGreaterThan(0);
		}
	});

	it('keeps structured requirement references inside the trait catalog', () => {
		const ids = new Set(traitsData.map((trait) => trait.id));
		for (const trait of traitsData) {
			const requirements = trait.requirements;
			for (const referencedId of [
				...(requirements?.hasTrait ?? []),
				...(requirements?.hasAllTraits ?? []),
				...(requirements?.prohibitsTraits ?? [])
			]) {
				expect(ids.has(referencedId), `${trait.id} references ${referencedId}`).toBe(true);
			}
		}
	});
});
