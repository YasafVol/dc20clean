import { memo, useState } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { getSystemById, type SystemDocNode } from '../systemsGraphData';
import NodeTooltip from './NodeTooltip';

interface SystemNodeData {
	system: SystemDocNode;
	categoryColor: string;
}

function SystemNode({ data }: NodeProps) {
	const nodeData = data as SystemNodeData;
	const { system, categoryColor } = nodeData;
	const [isHovering, setIsHovering] = useState(false);
	const relatedSystemTitles = system.relatedSystemIds
		.map((relatedId) => getSystemById(relatedId)?.title)
		.filter(Boolean)
		.slice(0, 6);

	return (
		<div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
			<NodeTooltip isVisible={isHovering}>
				<div className="space-y-2">
					<div className="font-semibold text-amber-200">{system.title}</div>
					<div className="text-slate-300">{system.purpose}</div>
					{system.howItWorks && system.howItWorks.length > 0 && (
						<div>
							<div className="font-medium text-sky-200">How It Works</div>
							<ul className="list-disc space-y-0.5 pl-4 text-slate-300">
								{system.howItWorks.slice(0, 3).map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
					{system.integrationSummary && system.integrationSummary.length > 0 && (
						<div>
							<div className="font-medium text-emerald-200">System Connections</div>
							<ul className="list-disc space-y-0.5 pl-4 text-slate-300">
								{system.integrationSummary.slice(0, 3).map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					)}
					{relatedSystemTitles.length > 0 && (
						<div>
							<div className="font-medium text-fuchsia-200">Related Systems</div>
							<div className="text-slate-300">{relatedSystemTitles.join(' • ')}</div>
						</div>
					)}
					<div className="text-slate-400">{system.docPath}</div>
					<div className="text-slate-500">Last updated: {system.lastUpdated}</div>
				</div>
			</NodeTooltip>

			<div
				className="w-64 rounded-lg border px-3 py-2 text-slate-100 shadow-lg backdrop-blur-sm"
				style={{ borderColor: categoryColor, background: 'rgba(15, 23, 42, 0.86)' }}
			>
				<div className="text-sm font-semibold">{system.title}</div>
				<div className="mt-1 text-xs text-slate-300">{system.docPath.split('/').pop()}</div>
			</div>

			<Handle type="target" position={Position.Left} style={{ background: categoryColor }} />
			<Handle type="source" position={Position.Right} style={{ background: categoryColor }} />
		</div>
	);
}

export default memo(SystemNode);
