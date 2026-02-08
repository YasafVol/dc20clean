import { describe, expect, it } from 'vitest';
import { getSystemsForView, SYSTEM_DOCS, SYSTEMS_VIEWS } from './systemsGraphData';

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
});
