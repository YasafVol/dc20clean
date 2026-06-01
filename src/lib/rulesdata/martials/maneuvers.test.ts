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

	it('keeps Brace as a current defense maneuver and does not add Fortify to the maneuver catalog', () => {
		expect(getManeuverById('brace')).toMatchObject({
			id: 'brace',
			name: 'Brace',
			type: ManeuverType.Defense
		});
		expect(getManeuverById('Brace')?.id).toBe('brace');
		expect(allManeuvers.some((maneuver) => maneuver.id === 'fortify')).toBe(false);
	});

	it('applies the v0.10.5 Reposition rewrite', () => {
		const reposition = getManeuverById('reposition');

		expect(reposition).toMatchObject({
			id: 'reposition',
			name: 'Reposition',
			type: ManeuverType.Utility,
			cost: { ap: 1, sp: 1 },
			range: 'Self',
			isReaction: true,
			trigger: 'A creature ends their turn.'
		});
		expect(reposition?.description).toContain('immediately move up to your Speed');
		expect(reposition?.description).not.toContain('DC 15 Martial Check');
		expect(reposition?.enhancements.map((enhancement) => enhancement.name)).toEqual([
			'Agile',
			'Disengage',
			'Coordinated Movement'
		]);
		expect(
			reposition?.enhancements.find((enhancement) => enhancement.name === 'Disengage')
		).toMatchObject({
			costString: '1 AP',
			ap: 1
		});
	});
});
