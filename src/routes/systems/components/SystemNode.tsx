import { memo, useState } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { SystemDocNode } from '../systemsGraphData';
import NodeTooltip from './NodeTooltip';

interface SystemNodeData {
	system: SystemDocNode;
	categoryColor: string;
}

function SystemNode({ data }: NodeProps) {
	const nodeData = data as SystemNodeData;
	const { system, categoryColor } = nodeData;
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
			<NodeTooltip isVisible={isHovering}>
				<div className="space-y-1">
					<div className="font-semibold text-amber-200">{system.title}</div>
					<div className="text-slate-300">{system.purpose}</div>
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
