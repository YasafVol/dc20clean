import { describe, expect, it } from 'vitest';
import { buildSystemsGraph } from './graphBuilder';
import { getSystemsForView, SYSTEMS_VIEWS } from './systemsGraphData';

describe('buildSystemsGraph', () => {
	it('creates one node per visible system in each view', () => {
		for (const view of SYSTEMS_VIEWS) {
			const graph = buildSystemsGraph(view.id);
			const systems = getSystemsForView(view.id);
			expect(graph.nodes.length).toBe(systems.length);
		}
	});

	it('only emits edges between nodes included in the current view', () => {
		for (const view of SYSTEMS_VIEWS) {
			const graph = buildSystemsGraph(view.id);
			const nodeIds = new Set(graph.nodes.map((node) => node.id));

			for (const edge of graph.edges) {
				expect(nodeIds.has(edge.source)).toBe(true);
				expect(nodeIds.has(edge.target)).toBe(true);
			}
		}
	});
});
