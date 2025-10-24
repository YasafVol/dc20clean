import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';

import { attributesData } from '../../lib/rulesdata/attributes';
import AttributePointsCounter from './AttributePointsCounter';
import styled from '@emotion/styled';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCardContainer,
	StyledCard,
	StyledCardTitle,
	StyledControls,
	StyledButton,
	StyledValue,
	StyledDescription
} from './styles/Attributes.styles';

// Additional styled components for enhanced display
const AttributeHeader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 0.25rem; /* tighter spacing */
	text-align: center;
`;

const AttributeTotal = styled.div<{ $exceeded: boolean }>`
	font-size: 0.9rem; /* slightly smaller */
	font-weight: bold;
	color: ${(props) => (props.$exceeded ? '#dc2626' : '#059669')};
	margin-bottom: 0.25rem; /* tighter spacing */
	text-align: center;
`;

const AttributeBreakdown = styled.div`
	background: transparent;
	border: 1px solid white;
	border-radius: 6px;
	padding: 0.75rem;
	margin-top: 0.75rem;
	font-size: 0.875rem;
	color: #e5e7eb;
`;

const BreakdownLine = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.25rem;

	&:last-child {
		margin-bottom: 0;
		padding-top: 0.25rem;
		border-top: 1px solid white;
		font-weight: 600;
		color: #fbbf24;
	}

	span:first-child {
		flex-shrink: 0;
		min-width: 120px;
	}

	span:last-child {
		font-weight: bold;
		color: #fbbf24;
	}
`;

const ValidationMessage = styled.div<{ $type: 'error' | 'warning' }>`
	/* Place the validation/feedback message below the card */
	position: static;
	margin-top: 0.5rem;
	font-size: 0.85rem;
	color: ${(props) => (props.$type === 'error' ? '#ef4444' : '#e5e7eb')};
	text-align: center;
	padding: 0.25rem 0.5rem;
	pointer-events: none; /* non-interactive decorative note */
	background: transparent;
	border-radius: 4px;
	font-style: italic;

	&:before {
		content: '* ';
		margin-right: 0.25rem;
	}
`;

const ForcedAdjustmentIndicator = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	background: transparent;
	border: 1px solid #fbbf24;
	color: #fbbf24;

	&:before {
		content: '⚠️ ';
		margin-right: 0.25rem;
	}
`;

const EffectiveValueDisplay = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 0.5rem;
	padding: 0.5rem;
	background: transparent;
	border: 1px solid white;
	border-radius: 6px;
	font-size: 0.875rem;
	color: #e5e7eb;
`;

const BaseValue = styled.span`
	color: #9ca3af;
`;

const EffectiveValue = styled.span<{ $different: boolean }>`
	font-weight: ${(props) => (props.$different ? 'bold' : 'normal')};
	color: ${(props) => (props.$different ? '#10b981' : '#e5e7eb')};
`;

const OptionalRuleToggle = styled.label`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 1rem 0;
	font-size: 0.875rem;
`;

const OptionalRuleDetails = styled.span`
	display: block;
	color: #9ca3af;
	font-size: 0.75rem;
`;

// Removed PointBreakdownSummary: duplicate small points frame was creating a second
// "Points Remaining" display in the middle of the page. The main counter is

const ForcedAdjustmentsWarning = styled.div`
	background: transparent;
	border: 1px solid #f59e0b;
	border-radius: 6px;
	padding: 0.75rem;
	margin-bottom: 1rem;
	font-size: 0.875rem;
	color: #fbbf24;

	&:before {
		content: '⚠️ ';
		margin-right: 0.25rem;
	}
`;

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
		<StyledContainer>
			<StyledTitle>Attributes</StyledTitle>
			<AttributePointsCounter totalAttributePoints={totalAttributePoints} />
			<OptionalRuleToggle>
				<input
					type="checkbox"
					checked={usePrimeCapRule}
					onChange={handlePrimeRuleToggle}
				/>
				<div>
					<span>Use Prime = Attribute Cap (Optional Rule)</span>
					<OptionalRuleDetails>
						When enabled, the prime modifier equals your level-based attribute cap
						instead of the highest attribute.
					</OptionalRuleDetails>
				</div>
			</OptionalRuleToggle>

			{/* The enhanced breakdown summary was removed to avoid duplicating the
			{/* NEW: Forced adjustments warning */}
			{calculation.forcedAdjustments.length > 0 && (
				<ForcedAdjustmentsWarning>
					{calculation.forcedAdjustments.length} forced adjustment(s) due to traits:
					{calculation.forcedAdjustments.map((adj, index) => (
						<div key={index} style={{ marginTop: '0.25rem' }}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}:{adj.originalValue}{' '}
							→ {adj.effectiveValue} (costs {adj.pointsCost} points)
						</div>
					))}
				</ForcedAdjustmentsWarning>
			)}

			{/* Validation summary */}
			{!calculation.isValid && (
				<ValidationMessage $type="error">
					Invalid build: {Math.abs(calculation.pointsRemaining)} points over budget
				</ValidationMessage>
			)}

			<StyledGrid>
				{attributesData.map((attribute) => {
					const attributeKey = `attribute_${attribute.id}`;
					const currentValue = typedState[attributeKey] || 0;
					const limit = getAttributeLimit(attribute.id);
					const breakdown = getStatBreakdown(attribute.id);

					// NEW: Get effective value and forced adjustment info
					const effectiveValue = calculation.effectiveAttributes[attribute.id] || currentValue;
					const forcedAdjustment = calculation.forcedAdjustments.find(
						(adj) => adj.attribute === attribute.id
					);
					const hasTraitEffect = effectiveValue !== currentValue;

					// Enhanced validation with real-time state
					// Use live validation instead of cached result to avoid timing issues
					const realTimeValidation = validateAttributeChange(attribute.id, currentValue + 1);
					const canIncrease = attributePointsRemaining > 0 && realTimeValidation.isValid;
					// Simple real-time decrease check: can decrease if above minimum
					const canDecrease = currentValue > -2;

					return (
						<StyledCardContainer key={attribute.id}>
							<StyledCard>
								<AttributeHeader>
									<StyledCardTitle>{attribute.name}</StyledCardTitle>
								</AttributeHeader>
								<AttributeTotal $exceeded={limit.exceeded}>
									Final: {limit.current} (max {limit.max})
								</AttributeTotal>

								<StyledDescription>{attribute.description}</StyledDescription>

								<StyledControls>
									<StyledButton
										onClick={() => decreaseAttribute(attributeKey)}
										disabled={!canDecrease}
										title={!canDecrease ? 'Cannot decrease below -2' : ''}
										data-testid={`${attribute.id}-decrease`}
									>
										-
									</StyledButton>
									<StyledValue>{currentValue}</StyledValue>
									<StyledButton
										onClick={() => increaseAttribute(attributeKey)}
										disabled={!canIncrease}
										title={
											!canIncrease
												? attributePointsRemaining <= 0
													? 'No points remaining'
													: realTimeValidation.message || 'Cannot increase'
												: ''
										}
										data-testid={`${attribute.id}-increase`}
									>
										+
									</StyledButton>
								</StyledControls>

								{/* NEW: Display both base and effective values */}
								{hasTraitEffect && (
									<EffectiveValueDisplay>
										<BaseValue>Base: {currentValue}</BaseValue>
										<EffectiveValue $different={hasTraitEffect}>
											Effective: {effectiveValue}
										</EffectiveValue>
									</EffectiveValueDisplay>
								)}

								{/* Enhanced breakdown display */}
								{(limit.traitBonuses > 0 || breakdown) && (
									<AttributeBreakdown>
										<BreakdownLine>
											<span>Base Points:</span>
											<span>{currentValue}</span>
										</BreakdownLine>
										{limit.traitBonuses > 0 && (
											<BreakdownLine>
												<span>Trait Bonuses:</span>
												<span>+{limit.traitBonuses}</span>
											</BreakdownLine>
										)}
										<BreakdownLine>
											<span>Total:</span>
											<span>{limit.current}</span>
										</BreakdownLine>
									</AttributeBreakdown>
								)}

								{/* NEW: Forced adjustment indicator */}
								{forcedAdjustment && (
									<ForcedAdjustmentIndicator>
										Forced to minimum (-2), cost: {forcedAdjustment.pointsCost} points
									</ForcedAdjustmentIndicator>
								)}
							</StyledCard>

							{/* Validation messages - now outside the card */}
							{limit.exceeded && (
								<ValidationMessage $type="error">
									Exceeds maximum limit of +{limit.max}
								</ValidationMessage>
							)}

							{!limit.exceeded && !canIncrease && attributePointsRemaining > 0 && (
								<ValidationMessage $type="warning">
									Cannot increase further due to trait bonuses
								</ValidationMessage>
							)}
						</StyledCardContainer>
					);
				})}
			</StyledGrid>
		</StyledContainer>
	);
}

export default Attributes;
