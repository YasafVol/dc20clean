import { describe, expect, it } from 'vitest';
import {
	calculateEnhancementStaminaSpend,
	canDeclareEnhancements
} from './maneuverEnhancementSpend';

describe('maneuver enhancement spend', () => {
	it('counts repeated SP enhancements and ignores AP-only enhancements', () => {
		const enhancements = [
			{ name: 'Power', costString: '1 SP', sp: 1, repeatable: true, description: '' },
			{ name: 'Quick', costString: '1 AP', ap: 1, description: '' }
		] as any;
		expect(calculateEnhancementStaminaSpend(enhancements, { Power: 2, Quick: 1 })).toBe(2);
		expect(canDeclareEnhancements(2, 1)).toBe(false);
	});
});
