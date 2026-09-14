import { getManualActiveConditionSummaries } from '../activeConditionSummary';

export default function ActiveConditionSummary({
	activeConditions
}: {
	activeConditions: string[];
}) {
	const rows = getManualActiveConditionSummaries(activeConditions);
	if (rows.length === 0) return null;

	return (
		<section className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
			<h3 className="mb-1 text-lg font-bold text-amber-300">Manual condition effects</h3>
			<p className="mb-3 text-sm text-slate-400">
				Track these timing, target, damage, and movement effects during play; the sheet does not
				automatically change encounter state.
			</p>
			<div className="space-y-2">
				{rows.map((row) => (
					<div key={row.id} className="rounded border border-slate-700 bg-slate-950/50 p-3">
						<div className="font-semibold text-white">{row.name}</div>
						<div className="text-sm text-slate-300">{row.description}</div>
					</div>
				))}
			</div>
		</section>
	);
}
