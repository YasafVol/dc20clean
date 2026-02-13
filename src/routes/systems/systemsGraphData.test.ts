import { describe, expect, it } from 'vitest';
import { getSystemById, getSystemsForView, SYSTEM_DOCS, SYSTEMS_VIEWS } from './systemsGraphData';

describe('systemsGraphData', () => {
	it('only references related system IDs that exist', () => {
		const ids = new Set(SYSTEM_DOCS.map((system) => system.id));

		for (const system of SYSTEM_DOCS) {
			for (const relatedId of system.relatedSystemIds) {
				expect(ids.has(relatedId)).toBe(true);
			}
		}
	});

	it('returns systems for every configured view', () => {
		for (const view of SYSTEMS_VIEWS) {
			const systems = getSystemsForView(view.id);
			expect(systems.length).toBeGreaterThan(0);
		}
	});

	it('includes rich calculator explanation and integrations', () => {
		const calculationSystem = getSystemById('calculation_system');

		expect(calculationSystem).toBeDefined();
		expect(calculationSystem?.howItWorks?.length ?? 0).toBeGreaterThanOrEqual(3);
		expect(calculationSystem?.integrationSummary?.length ?? 0).toBeGreaterThanOrEqual(3);
		expect(calculationSystem?.relatedSystemIds.length ?? 0).toBeGreaterThanOrEqual(10);
	});

	it('calculation focus view contains calculator and core connected systems', () => {
		const focusSystems = getSystemsForView('calculationFocus');
		const focusIds = new Set(focusSystems.map((system) => system.id));

		expect(focusIds.has('calculation_system')).toBe(true);
		expect(focusIds.has('effect_system')).toBe(true);
		expect(focusIds.has('character_creation_flow')).toBe(true);
		expect(focusIds.has('character_sheet')).toBe(true);
		expect(focusIds.has('pdf_export_system')).toBe(true);
	});
});
