/**
 * Feature Point Buy Component
 *
 * Allows selecting monster features within the power budget.
 */

import React, { useState } from 'react';
import { useMonsterFeatures } from '../../../../lib/hooks/useMonsterFeatures';
import type { MonsterFeature } from '../../../../lib/rulesdata/schemas/monster.schema';
import {
	SectionContent,
	FeatureBudget,
	BudgetLabel,
	BudgetValue,
	FeatureList,
	FeatureItem,
	FeatureInfo,
	FeatureName,
	FeatureDescription,
	FeatureCost,
} from '../styles/MonsterStyles';

export interface FeaturePointBuyProps {
	selectedIds: string[];
	maxPoints: number;
	onChange: (featureIds: string[]) => void;
}

export const FeaturePointBuy: React.FC<FeaturePointBuyProps> = ({
	selectedIds,
	maxPoints,
	onChange,
}) => {
	const { allFeatures, isLoading } = useMonsterFeatures();
	const [expandedCost, setExpandedCost] = useState<number | null>(null);

	// Calculate spent points
	const selectedFeatures = allFeatures.filter((f) => selectedIds.includes(f.id));
	const spentPoints = selectedFeatures.reduce((sum, f) => sum + f.pointCost, 0);
	const isOverBudget = spentPoints > maxPoints;

	const handleToggleFeature = (feature: MonsterFeature) => {
		const isSelected = selectedIds.includes(feature.id);
		if (isSelected) {
			onChange(selectedIds.filter((id) => id !== feature.id));
		} else {
			// Check if adding would exceed budget
			if (spentPoints + feature.pointCost <= maxPoints) {
				onChange([...selectedIds, feature.id]);
			}
		}
	};

	// Group features by cost
	const featuresByCost: Record<number, typeof allFeatures> = {};
	for (const feature of allFeatures) {
		const cost = feature.pointCost;
		if (!featuresByCost[cost]) {
			featuresByCost[cost] = [];
		}
		featuresByCost[cost].push(feature);
	}

	const costLevels = Object.keys(featuresByCost)
		.map(Number)
		.sort((a, b) => a - b);

	if (isLoading) {
		return (
			<SectionContent>
				<div className="text-center text-zinc-500 py-4">Loading features...</div>
			</SectionContent>
		);
	}

	return (
		<SectionContent>
			{/* Budget Display */}
			<FeatureBudget>
				<BudgetLabel>Feature Points</BudgetLabel>
				<BudgetValue $overBudget={isOverBudget}>
					{spentPoints} / {maxPoints}
				</BudgetValue>
			</FeatureBudget>

			{/* Feature Groups by Cost */}
			{costLevels.map((cost) => {
				const features = featuresByCost[cost];
				const isExpanded = expandedCost === cost;
				const availablePoints = maxPoints - spentPoints;

				return (
					<div key={cost} className="mb-4">
						<button
							type="button"
							className="w-full flex justify-between items-center py-2 px-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors mb-2"
							onClick={() => setExpandedCost(isExpanded ? null : cost)}
						>
							<span className="text-sm font-medium text-amber-400">
								{cost}-Point Features ({features.length})
							</span>
							<span className="text-xs text-zinc-500">
								{isExpanded ? '▼' : '▶'}
							</span>
						</button>

						{isExpanded && (
							<FeatureList>
								{features.map((feature) => {
									const isSelected = selectedIds.includes(feature.id);
									const canAfford = isSelected || feature.pointCost <= availablePoints;

									return (
										<FeatureItem
											key={feature.id}
											$selected={isSelected}
											onClick={() => canAfford && handleToggleFeature(feature)}
											style={{
												opacity: canAfford ? 1 : 0.5,
												cursor: canAfford ? 'pointer' : 'not-allowed',
											}}
										>
											<FeatureInfo>
												<FeatureName $selected={isSelected}>
													{feature.name}
													{feature.source !== 'official' && (
														<span className="text-xs text-zinc-500 ml-2">
															({feature.source})
														</span>
													)}
												</FeatureName>
												<FeatureDescription>{feature.description}</FeatureDescription>
											</FeatureInfo>
											<FeatureCost $selected={isSelected}>
												{isSelected ? '✓' : feature.pointCost}
											</FeatureCost>
										</FeatureItem>
									);
								})}
							</FeatureList>
						)}
					</div>
				);
			})}

			{/* Selected Features Summary */}
			{selectedFeatures.length > 0 && (
				<div className="mt-4 pt-4 border-t border-purple-500/20">
					<div className="text-xs text-zinc-500 mb-2">Selected Features:</div>
					<div className="flex flex-wrap gap-1">
						{selectedFeatures.map((feature) => (
							<button
								key={feature.id}
								type="button"
								onClick={() => handleToggleFeature(feature)}
								className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
								title="Click to remove"
							>
								{feature.name} ({feature.pointCost})
							</button>
						))}
					</div>
				</div>
			)}
		</SectionContent>
	);
};

export default FeaturePointBuy;
