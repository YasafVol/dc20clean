import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	Background,
	Controls,
	MarkerType,
	ReactFlow,
	ReactFlowProvider,
	type Edge,
	type Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../components/ui/select';
import type { SystemsViewId } from './systemsGraphData';
import { SYSTEMS_VIEWS } from './systemsGraphData';
import SystemNode from './components/SystemNode';
import { buildSystemsGraph } from './graphBuilder';

const PageContainer = styled.div`
	height: 100vh;
	width: 50%;
	position: relative;
	margin: 0 auto;
	min-width: 380px;
	background:
		radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.12), transparent 38%),
		radial-gradient(circle at 80% 15%, rgba(34, 211, 238, 0.12), transparent 32%),
		linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0a0a0f 100%);

	.react-flow__controls {
		background: rgba(15, 23, 42, 0.9);
		border: 1px solid rgba(251, 191, 36, 0.45);
		border-radius: 0.65rem;
		box-shadow: 0 12px 24px rgba(2, 6, 23, 0.5);
		overflow: hidden;
	}

	.react-flow__controls-button {
		background: rgba(30, 41, 59, 0.95);
		border: none;
		border-bottom: 1px solid rgba(148, 163, 184, 0.18);
		color: #f8fafc;
		transition: background 0.18s ease;
	}

	.react-flow__controls-button:hover {
		background: rgba(251, 191, 36, 0.2);
	}

	.react-flow__controls-button svg {
		fill: #fbbf24;
	}

	.react-flow__attribution {
		display: none;
	}

	@media (max-width: 1080px) {
		width: 100%;
		min-width: 0;
	}
`;

const Overlay = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	right: 1rem;
	z-index: 20;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	pointer-events: none;
`;

const OverlayRow = styled.div`
	display: flex;
	gap: 0.75rem;
	align-items: center;
	flex-wrap: wrap;
	pointer-events: auto;
`;

const OverlayCard = styled.div`
	background: rgba(15, 23, 42, 0.85);
	backdrop-filter: blur(6px);
	border: 1px solid rgba(148, 163, 184, 0.25);
	border-radius: 0.75rem;
	padding: 0.6rem 0.75rem;
	color: #e2e8f0;
	max-width: 680px;
`;

const Title = styled.h1`
	margin: 0;
	font-size: 1rem;
	color: #fbbf24;
	font-family: 'Cinzel', serif;
`;

const Subtitle = styled.p`
	margin: 0.35rem 0 0;
	font-size: 0.82rem;
	color: #cbd5e1;
`;

const nodeTypes = {
	systemNode: SystemNode
};

function SystemsExplorerContent() {
	const navigate = useNavigate();
	const [selectedViewId, setSelectedViewId] = useState<SystemsViewId>('all');

	const selectedView = useMemo(
		() => SYSTEMS_VIEWS.find((view) => view.id === selectedViewId) ?? SYSTEMS_VIEWS[0],
		[selectedViewId]
	);

	const graph = useMemo(() => buildSystemsGraph(selectedViewId), [selectedViewId]);
	const flowNodes: Node[] = graph.nodes;
	const flowEdges: Edge[] = graph.edges.map((edge) => ({
		...edge,
		markerEnd: {
			type: MarkerType.ArrowClosed
		}
	}));

	return (
		<PageContainer>
			<Overlay>
				<OverlayRow>
					<Button variant="secondary" onClick={() => navigate('/menu')} className="font-semibold">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back
					</Button>
					<div className="w-72 max-w-full">
						<Select
							value={selectedViewId}
							onValueChange={(value) => setSelectedViewId(value as SystemsViewId)}
						>
							<SelectTrigger className="border-slate-500/70 bg-slate-950/85 text-slate-100">
								<SelectValue placeholder="Select system view" />
							</SelectTrigger>
							<SelectContent className="border-slate-500 bg-slate-950 text-slate-100">
								{SYSTEMS_VIEWS.map((view) => (
									<SelectItem key={view.id} value={view.id} className="text-slate-100">
										{view.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</OverlayRow>

				<OverlayCard>
					<Title>Systems Explorer</Title>
					<Subtitle>{selectedView.description}</Subtitle>
				</OverlayCard>
			</Overlay>

			<ReactFlow
				key={selectedViewId}
				nodes={flowNodes}
				edges={flowEdges}
				nodeTypes={nodeTypes}
				fitView
				minZoom={0.25}
				maxZoom={1.8}
				proOptions={{ hideAttribution: true }}
			>
				<Controls />
				<Background gap={18} size={1} color="rgba(148, 163, 184, 0.24)" />
			</ReactFlow>
		</PageContainer>
	);
}

export default function SystemsExplorer() {
	return (
		<ReactFlowProvider>
			<SystemsExplorerContent />
		</ReactFlowProvider>
	);
}
