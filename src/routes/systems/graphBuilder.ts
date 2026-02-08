import type { SystemsCategory, SystemsViewId } from './systemsGraphData';
import { getSystemsForView } from './systemsGraphData';

export interface SystemsGraphNode {
	id: string;
	type: 'systemNode';
	position: {
		x: number;
		y: number;
	};
	data: {
		system: ReturnType<typeof getSystemsForView>[number];
		categoryColor: string;
	};
}

export interface SystemsGraphEdge {
	id: string;
	source: string;
	target: string;
	type: 'smoothstep';
	animated: boolean;
	markerEnd: {
		type: 'arrowclosed';
	};
	style: {
		stroke: string;
		strokeWidth: number;
	};
}

const CATEGORY_COLORS: Record<SystemsCategory, string> = {
	architecture: '#f59e0b',
	characterCreation: '#22c55e',
	characterSheet: '#38bdf8',
	dmTools: '#f97316',
	infrastructure: '#a78bfa',
	conventions: '#f43f5e'
};

export function buildSystemsGraph(viewId: SystemsViewId): {
	nodes: SystemsGraphNode[];
	edges: SystemsGraphEdge[];
} {
	const systems = getSystemsForView(viewId);
	const includedIds = new Set(systems.map((system) => system.id));

	const byCategory = new Map<SystemsCategory, typeof systems>();
	for (const system of systems) {
		const list = byCategory.get(system.category) ?? [];
		list.push(system);
		byCategory.set(system.category, list);
	}

	const orderedCategories = Array.from(byCategory.keys());

	const nodes: SystemsGraphNode[] = [];
	const edges: SystemsGraphEdge[] = [];

	for (const [categoryIndex, category] of orderedCategories.entries()) {
		const categorySystems = byCategory.get(category) ?? [];

		for (const [rowIndex, system] of categorySystems.entries()) {
			nodes.push({
				id: system.id,
				type: 'systemNode',
				position: {
					x: 60 + categoryIndex * 360,
					y: 100 + rowIndex * 160
				},
				data: {
					system,
					categoryColor: CATEGORY_COLORS[category]
				}
			});

			for (const relatedId of system.relatedSystemIds) {
				if (!includedIds.has(relatedId)) {
					continue;
				}

				edges.push({
					id: `${system.id}->${relatedId}`,
					source: system.id,
					target: relatedId,
					type: 'smoothstep',
					animated: false,
					markerEnd: {
						type: 'arrowclosed'
					},
					style: { stroke: CATEGORY_COLORS[category], strokeWidth: 1.5 }
				});
			}
		}
	}

	return { nodes, edges };
}
