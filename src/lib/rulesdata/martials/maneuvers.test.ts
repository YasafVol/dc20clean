import { describe, expect, it } from 'vitest';
import { ManeuverType } from '../schemas/maneuver.schema';
import { allManeuvers, getManeuverById } from './maneuvers';

describe('v0.10.5 maneuver catalog', () => {
	it('removes base SP costs from Whirlwind and Pathcarver', () => {
		expect(getManeuverById('whirlwind')?.cost).toEqual({ ap: 2 });
		expect(getManeuverById('pathcarver')?.cost).toEqual({ ap: 2 });
	});

	it('includes Scattershot as a ranged attack cone maneuver', () => {
		const scattershot = getManeuverById('scattershot');

		expect(scattershot).toMatchObject({
			id: 'scattershot',
			name: 'Scattershot',
			type: ManeuverType.Attack,
			cost: { ap: 2 },
			range: 'Self',
			isReaction: false
		});
		expect(scattershot?.description).toContain('Ranged Weapon');
		expect(scattershot?.description).toContain('3 Space Cone');
		expect(scattershot?.enhancements.map((enhancement) => enhancement.name)).toEqual([
			'Damage',
			'Area',
			'Stagger'
		]);
	});

	it('keeps unresolved rewrite and rename items out of the automatic catalog pass', () => {
		expect(getManeuverById('reposition')?.description).not.toContain('complete rewrite');
		expect(allManeuvers.some((maneuver) => maneuver.id === 'fortify')).toBe(false);
	});
});
