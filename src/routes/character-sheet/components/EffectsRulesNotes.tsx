import { useMemo } from 'react';
import { useCharacterCalculatedData } from '../hooks/CharacterSheetProvider';
import { presentCharacterEffects, resolveCharacterSize } from '../effectPresentation';

const headings = {
	applied: 'Applied to calculations',
	collected: 'Sheet stats and grants',
	rules: 'Rules notes',
	unmapped: 'Manual or unsupported effects'
} as const;

export default function EffectsRulesNotes() {
	const calculation = useCharacterCalculatedData();
	const rows = useMemo(
		() => presentCharacterEffects(calculation?.attributedEffects ?? []),
		[calculation?.attributedEffects]
	);
	const size = resolveCharacterSize(calculation?.attributedEffects ?? []);

	if (rows.length === 0) return null;

	return (
		<section className="mt-6 rounded-lg border border-slate-700 bg-slate-900/60 p-4">
			<div className="mb-3 flex items-center justify-between gap-4">
				<h2 className="text-lg font-bold text-white">Effects & Rules Notes</h2>
				{size && (
					<span className="rounded bg-amber-500/15 px-2 py-1 text-sm text-amber-300">
						Size: {size}
					</span>
				)}
			</div>
			{(Object.keys(headings) as Array<keyof typeof headings>).map((category) => {
				const categoryRows = rows.filter((row) => row.category === category);
				if (categoryRows.length === 0) return null;
				return (
					<div key={category} className="mb-4 last:mb-0">
						<h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-400 uppercase">
							{headings[category]}
						</h3>
						<div className="space-y-2">
							{categoryRows.map((row) => (
								<div
									key={row.id}
									className="rounded border border-slate-700 bg-slate-950/50 p-2 text-sm"
								>
									<div className="font-semibold text-white capitalize">{row.label}</div>
									{row.detail && <div className="text-slate-300">{row.detail}</div>}
									<div className="text-xs text-slate-500">
										Source: {row.source.name}
										{row.condition ? ` • ${row.condition.replaceAll('_', ' ')}` : ''}
									</div>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</section>
	);
}
