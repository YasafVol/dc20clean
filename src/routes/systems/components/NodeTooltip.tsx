import type { ReactNode } from 'react';
import { NodeToolbar, Position } from '@xyflow/react';

interface NodeTooltipProps {
	isVisible: boolean;
	children: ReactNode;
}

export default function NodeTooltip({ isVisible, children }: NodeTooltipProps) {
	return (
		<NodeToolbar
			isVisible={isVisible}
			position={Position.Top}
			className="max-w-72 rounded-md border border-amber-300/60 bg-slate-950/95 px-3 py-2 text-xs text-slate-100 shadow-xl"
		>
			{children}
		</NodeToolbar>
	);
}
