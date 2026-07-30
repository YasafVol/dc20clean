import { useMemo, useState } from 'react';
import { useCharacterCalculatedData, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	WILD_FORM_TEMPLATES,
	WILD_FORM_TRAITS,
	canSelectWildFormTrait,
	getWildFormTraitCost
} from '../complexFeatures/wildForm';

export default function ComplexFeatureHost() {
	const { state } = useCharacterSheet();
	const calculation = useCharacterCalculatedData();
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [extraMp, setExtraMp] = useState(0);
	const ownsWildForm = useMemo(
		() =>
			(state.character?.unlockedFeatureIds ?? []).includes('druid_wild_form') ||
			(calculation?.attributedEffects ?? []).some(
				(effect) => effect.type === 'GRANT_ABILITY' && (effect as any).target === 'wild_form'
			),
		[state.character?.unlockedFeatureIds, calculation?.attributedEffects]
	);
	if (!ownsWildForm) return null;

	const talentBonus = (calculation?.attributedEffects ?? [])
		.filter(
			(effect) =>
				effect.type === 'MODIFY_STAT' && (effect as any).target === 'wild_form_trait_points'
		)
		.reduce((sum, effect) => sum + Number((effect as any).value ?? 0), 0);
	const budget = 3 + talentBonus + extraMp * 2;
	const spent = getWildFormTraitCost(selectedIds);

	return (
		<section className="mt-6 rounded-lg border border-emerald-600/40 bg-emerald-950/20 p-4">
			<h2 className="text-lg font-bold text-emerald-300">Wild Form Builder</h2>
			<p className="text-sm text-slate-400">
				Session-only form planning • 3 Wild Form HP • built-in natural weapon
			</p>
			<div className="my-3 flex flex-wrap gap-2">
				{WILD_FORM_TEMPLATES.map((template) => (
					<button
						key={template.id}
						type="button"
						onClick={() => setSelectedIds([...template.traitIds])}
						className="rounded border border-emerald-700 px-3 py-1 text-sm text-emerald-200"
					>
						{template.name}
					</button>
				))}
			</div>
			<div className="mb-3 flex items-center gap-3 text-sm text-white">
				<span>
					Trait Points: {spent}/{budget}
				</span>
				<button
					type="button"
					onClick={() => setExtraMp(Math.max(0, extraMp - 1))}
					className="rounded border px-2"
				>
					−
				</button>
				<span>Extra MP: {extraMp}</span>
				<button
					type="button"
					onClick={() => setExtraMp(extraMp + 1)}
					className="rounded border px-2"
				>
					+
				</button>
			</div>
			<div className="grid max-h-80 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
				{WILD_FORM_TRAITS.map((trait) => {
					const selected = selectedIds.includes(trait.id);
					const enabled = canSelectWildFormTrait(selectedIds, trait, budget);
					return (
						<button
							key={trait.id}
							type="button"
							disabled={!enabled}
							onClick={() =>
								setSelectedIds(
									selected
										? selectedIds.filter((id) => id !== trait.id)
										: [...selectedIds, trait.id]
								)
							}
							className={`rounded border p-2 text-left text-sm ${selected ? 'border-emerald-400 bg-emerald-500/15' : 'border-slate-700'} disabled:opacity-40`}
							title={trait.description}
						>
							<strong>{trait.name}</strong> ({trait.cost})
						</button>
					);
				})}
			</div>
		</section>
	);
}
