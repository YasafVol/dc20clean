import { describe, expect, it } from 'vitest';
import { ManeuverType } from '../schemas/maneuver.schema';
import { CURRENT_RULES_VERSION } from '../versioning/rulesVersion';
import { MANEUVER_RULES_SOURCE, allManeuvers, getManeuverById } from './maneuvers';

describe('v0.10.5 maneuver catalog', () => {
	it('declares rules source metadata', () => {
		expect(MANEUVER_RULES_SOURCE).toMatchObject({
			rulesVersion: CURRENT_RULES_VERSION,
			currentRulesArtifact: 'docs/assets/dc20-0.10.5/DC20 0.10.5 clean.md',
			changelogSection: 'Maneuvers'
		});
	});

	it('has complete maneuver and enhancement coverage', () => {
		expect(allManeuvers).toHaveLength(29);
		expect(new Set(allManeuvers.map((maneuver) => maneuver.id)).size).toBe(allManeuvers.length);
		expect(new Set(allManeuvers.map((maneuver) => maneuver.name)).size).toBe(allManeuvers.length);

		expect(
			allManeuvers.reduce(
				(counts, maneuver) => ({
					...counts,
					[maneuver.type]: (counts[maneuver.type] ?? 0) + 1
				}),
				{} as Record<ManeuverType, number>
			)
		).toEqual({
			[ManeuverType.Attack]: 11,
			[ManeuverType.Defense]: 7,
			[ManeuverType.Grapple]: 4,
			[ManeuverType.Utility]: 7
		});

		for (const maneuver of allManeuvers) {
			expect(maneuver.id, maneuver.name).toBeTruthy();
			expect(maneuver.name, maneuver.id).toBeTruthy();
			expect(maneuver.range, maneuver.name).toBeTruthy();
			expect(maneuver.description, maneuver.name).toBeTruthy();
			expect(maneuver.enhancements.length, maneuver.name).toBeGreaterThan(0);

			for (const enhancement of maneuver.enhancements) {
				expect(enhancement.name, maneuver.name).toBeTruthy();
				expect(enhancement.costString, `${maneuver.name}: ${enhancement.name}`).toBeTruthy();
				expect(enhancement.description, `${maneuver.name}: ${enhancement.name}`).toBeTruthy();

				if (enhancement.costString.includes('AP')) {
					expect(enhancement.ap, `${maneuver.name}: ${enhancement.name}`).toBeGreaterThan(0);
				}
				if (enhancement.costString.includes('SP')) {
					expect(enhancement.sp, `${maneuver.name}: ${enhancement.name}`).toBeGreaterThan(0);
				}
				if (enhancement.costString.includes('Repeatable')) {
					expect(enhancement.repeatable, `${maneuver.name}: ${enhancement.name}`).toBe(true);
				}
			}
		}
	});

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
