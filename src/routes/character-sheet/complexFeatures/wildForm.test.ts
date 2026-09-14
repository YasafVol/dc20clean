import { describe, expect, it } from 'vitest';
import { WILD_FORM_TRAITS, canSelectWildFormTrait, getWildFormTraitCost } from './wildForm';

describe('Wild Form builder data', () => {
	it('uses non-negative Beastborn expanded traits and treats the natural weapon as built in', () => {
		expect(WILD_FORM_TRAITS.every((trait) => trait.cost >= 0)).toBe(true);
		expect(WILD_FORM_TRAITS.some((trait) => trait.id === 'beastborn_beastkind')).toBe(false);
		const venom = WILD_FORM_TRAITS.find(
			(trait) => trait.id === 'beastborn_venomous_natural_weapon'
		)!;
		expect(canSelectWildFormTrait([], venom, 3)).toBe(true);
	});

	it('tracks trait-point spend', () => {
		expect(getWildFormTraitCost(['beastborn_camouflage', 'beastborn_prowler'])).toBe(3);
	});
});
