import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';
import { attributesData } from '../../lib/rulesdata/attributes';
import AttributePointsCounter from './AttributePointsCounter';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { Plus, Minus, AlertTriangle } from 'lucide-react';

type AttributeState = Record<string, number>;

function Attributes() {
	const { state, dispatch, attributePointsRemaining, totalAttributePoints } = useCharacter();
	const { getAttributeLimit, validateAttributeChange, getStatBreakdown } =
		useEnhancedCharacterCalculation();

	const typedState = state as unknown as AttributeState;
	const usePrimeCapRule = !!state.usePrimeCapRule;

	const handlePrimeRuleToggle = () => {
		dispatch({ type: 'TOGGLE_PRIME_CAP_RULE' });
	};

	// Simple replacement for useAttributeCalculation using context values
	const calculation = {
		totalPointsAvailable: totalAttributePoints,
		pointsSpent: totalAttributePoints - attributePointsRemaining,
		pointsRemaining: attributePointsRemaining,
		forcedAdjustments: [] as any[], // Simplified for now
		isValid: attributePointsRemaining >= 0,
		effectiveAttributes: {
			might: state.attribute_might,
			agility: state.attribute_agility,
			charisma: state.attribute_charisma,
			intelligence: state.attribute_intelligence
		}
	};

	function increaseAttribute(attribute: string) {
		if (attributePointsRemaining > 0) {
			const currentValue = typedState[attribute];
			const validation = validateAttributeChange(
				attribute.replace('attribute_', ''),
				currentValue + 1
			);

			if (validation.isValid) {
				dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
			}
		}
	}

	function decreaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		const validation = validateAttributeChange(
			attribute.replace('attribute_', ''),
			currentValue - 1
		);

		if (validation.isValid) {
			dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue - 1 });
		}
	}

	return (
		<div className="mx-auto max-w-4xl space-y-8">
			<div className="space-y-4 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Attributes</h2>
				<div className="flex justify-center">
					<AttributePointsCounter totalAttributePoints={totalAttributePoints} />
				</div>

				<div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
					<input
						type="checkbox"
						id="prime-cap-rule"
						checked={usePrimeCapRule}
						onChange={handlePrimeRuleToggle}
						className="border-primary text-primary focus:ring-primary rounded bg-black/50"
					/>
					<div className="text-left">
						<label
							htmlFor="prime-cap-rule"
							className="text-foreground block cursor-pointer text-sm font-medium"
						>
							Use Prime = Attribute Cap (Optional Rule)
						</label>
						<span className="text-muted-foreground block text-xs">
							Prime modifier equals level-based cap instead of highest attribute.
						</span>
					</div>
				</div>
			</div>

			{calculation.forcedAdjustments.length > 0 && (
				<div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-500">
					<div className="mb-2 flex items-center gap-2 font-bold">
						<AlertTriangle className="h-4 w-4" />
						Forced Adjustments
					</div>
					{calculation.forcedAdjustments.map((adj, index) => (
						<div key={index}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}:{' '}
							{adj.originalValue} → {adj.effectiveValue} (costs {adj.pointsCost} points)
						</div>
					))}
				</div>
			)}

			{!calculation.isValid && (
				<div className="bg-destructive/10 border-destructive/50 text-destructive rounded-md border p-4 text-center font-bold">
					Invalid build: {Math.abs(calculation.pointsRemaining)} points over budget
				</div>
			)}

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{attributesData.map((attribute) => {
					const attributeKey = `attribute_${attribute.id}`;
					const currentValue = typedState[attributeKey] || 0;
					const limit = getAttributeLimit(attribute.id);
					const breakdown = getStatBreakdown(attribute.id);

					const effectiveValue = calculation.effectiveAttributes[attribute.id] || currentValue;
					const forcedAdjustment = calculation.forcedAdjustments.find(
						(adj) => adj.attribute === attribute.id
					);
					const hasTraitEffect = effectiveValue !== currentValue;

					const realTimeValidation = validateAttributeChange(attribute.id, currentValue + 1);
					const canIncrease = attributePointsRemaining > 0 && realTimeValidation.isValid;
					const canDecrease = currentValue > -2;

					return (
						<Card key={attribute.id} className="border-border overflow-hidden bg-black/40">
							<CardHeader className="border-b border-white/5 bg-black/20 pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="font-cinzel text-primary text-xl">
										{attribute.name}
									</CardTitle>
									<Badge
										variant={limit.exceeded ? 'destructive' : 'secondary'}
										className={cn(
											'font-mono text-sm',
											limit.exceeded ? '' : 'bg-primary/20 text-primary hover:bg-primary/30'
										)}
									>
										Final: {limit.current} / {limit.max}
									</Badge>
								</div>
							</CardHeader>

							<CardContent className="space-y-4 pt-4">
								<p className="text-muted-foreground min-h-[3rem] text-sm">
									{attribute.description}
								</p>

								<div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 p-3">
									<Button
										variant="outline"
										size="icon"
										onClick={() => decreaseAttribute(attributeKey)}
										disabled={!canDecrease}
										className="border-primary/30 hover:border-primary hover:bg-primary/10 h-10 w-10"
										title={!canDecrease ? 'Cannot decrease below -2' : ''}
									>
										<Minus className="h-5 w-5" />
									</Button>

									<span
										className={cn(
											'w-16 text-center font-mono text-3xl font-bold',
											currentValue < 0 ? 'text-destructive' : 'text-foreground'
										)}
									>
										{currentValue > 0 ? `+${currentValue}` : currentValue}
									</span>

									<Button
										variant="outline"
										size="icon"
										onClick={() => increaseAttribute(attributeKey)}
										disabled={!canIncrease}
										className="border-primary/30 hover:border-primary hover:bg-primary/10 h-10 w-10"
										title={
											!canIncrease
												? attributePointsRemaining <= 0
													? 'No points remaining'
													: realTimeValidation.message || 'Cannot increase'
												: ''
										}
									>
										<Plus className="h-5 w-5" />
									</Button>
								</div>

								{/* Info Section */}
								<div className="space-y-2 text-xs">
									{hasTraitEffect && (
										<div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded border p-2">
											<span className="text-muted-foreground">Base: {currentValue}</span>
											<span className="text-primary font-bold">Effective: {effectiveValue}</span>
										</div>
									)}

									{(limit.traitBonuses > 0 || breakdown) && (
										<div className="space-y-1 border-t border-white/10 pt-2">
											<div className="text-muted-foreground flex justify-between">
												<span>Base Points:</span>
												<span>{currentValue}</span>
											</div>
											{limit.traitBonuses > 0 && (
												<div className="text-primary flex justify-between">
													<span>Trait Bonuses:</span>
													<span>+{limit.traitBonuses}</span>
												</div>
											)}
											<div className="mt-1 flex justify-between border-t border-white/5 pt-1 font-bold">
												<span>Total:</span>
												<span>{limit.current}</span>
											</div>
										</div>
									)}

									{forcedAdjustment && (
										<div className="mt-2 flex items-start gap-2 rounded border border-yellow-500/20 bg-yellow-500/10 p-2 text-yellow-500">
											<AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
											<span>Forced to minimum (-2), cost: {forcedAdjustment.pointsCost} pts</span>
										</div>
									)}

									{/* Validation Errors */}
									{limit.exceeded && (
										<div className="text-destructive animate-pulse text-center font-bold">
											Exceeds maximum limit of +{limit.max}
										</div>
									)}
									{!limit.exceeded && !canIncrease && attributePointsRemaining > 0 && (
										<div className="text-center text-yellow-500">
											Cannot increase further due to trait bonuses
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

export default Attributes;
