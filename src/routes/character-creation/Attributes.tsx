import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';

import { attributesData } from '../../lib/rulesdata/attributes';
import AttributePointsCounter from './AttributePointsCounter';
import styled from '@emotion/styled';
import {
	StyledContainer,
	StyledTitle,
	StyledPointsRemaining,
	StyledGrid,
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
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

const AttributeTotal = styled.div<{ $exceeded: boolean }>`
	font-size: 1.1rem;
	font-weight: bold;
	color: ${(props) => (props.$exceeded ? '#dc2626' : '#059669')};
`;

const AttributeBreakdown = styled.div`
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #8b5cf6;
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
		border-top: 1px solid #8b5cf6;
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
	margin-top: 0.5rem;
	padding: 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	background-color: ${(props) => (props.$type === 'error' ? '#fef2f2' : '#fffbeb')};
	border: 1px solid ${(props) => (props.$type === 'error' ? '#fecaca' : '#fed7aa')};
	color: ${(props) => (props.$type === 'error' ? '#dc2626' : '#d97706')};

	&:before {
		content: ${(props) => (props.$type === 'error' ? "'⚠️ '" : "'💡 '")};
		margin-right: 0.25rem;
	}
`;

const ForcedAdjustmentIndicator = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #fbbf24;
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
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #8b5cf6;
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

const PointBreakdownSummary = styled.div`
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #0ea5e9;
	border-radius: 6px;
	padding: 0.75rem;
	margin-bottom: 1rem;
	font-size: 0.875rem;
	color: #e5e7eb;
`;

const ForcedAdjustmentsWarning = styled.div`
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	border: 2px solid #f59e0b;
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
	const { state, dispatch, calculationResult } = useCharacter();
	const { getAttributeLimit, canDecreaseAttribute, validateAttributeChange, getStatBreakdown } =
		useEnhancedCharacterCalculation();

	const typedState = state as unknown as AttributeState;

	// Derive totals from the central calculation engine
	const limits = calculationResult.validation.attributeLimits;
	const traitBonusTotal = Object.values(limits).reduce(
		(sum, lim) => sum + (lim.traitBonuses || 0),
		0
	);
	const totalPoints = 12 + traitBonusTotal;
	const spent = Object.values(limits).reduce((sum, lim) => sum + (lim.current + 2), 0);
	const pointsRemaining = totalPoints - spent;

	function increaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		const attrId = attribute.replace('attribute_', '');
		const validation = validateAttributeChange(attrId, currentValue + 1);
		if (pointsRemaining > 0 && validation.isValid) {
			dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
		}
	}

	function decreaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		const attrId = attribute.replace('attribute_', '');
		const validation = validateAttributeChange(attrId, currentValue - 1);
		if (validation.isValid) {
			dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue - 1 });
		}
	}

	return (
		<StyledContainer>
			<StyledTitle>Attributes</StyledTitle>
			<AttributePointsCounter />

			{/* Point breakdown summary */}
			<PointBreakdownSummary>
				<BreakdownLine>
					<span>Base Points:</span>
					<span>12</span>
				</BreakdownLine>
				<BreakdownLine>
					<span>Bonus from Traits:</span>
					<span>{traitBonusTotal}</span>
				</BreakdownLine>
				<BreakdownLine>
					<span>Spent on Attributes:</span>
					<span>{spent}</span>
				</BreakdownLine>
				<BreakdownLine>
					<span>Points Remaining:</span>
					<span style={{ color: pointsRemaining < 0 ? '#dc2626' : '#059669' }}>
						{pointsRemaining}
					</span>
				</BreakdownLine>
			</PointBreakdownSummary>

			{/* Forced adjustments warning */}
			{calculationResult.forcedAdjustments.length > 0 && (
				<ForcedAdjustmentsWarning>
					{calculationResult.forcedAdjustments.length} forced adjustment(s) due to traits:
					{calculationResult.forcedAdjustments.map((adj, index) => (
						<div key={index} style={{ marginTop: '0.25rem' }}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}:{adj.originalValue}{' '}
							→ {adj.effectiveValue} (costs {adj.pointsCost} points)
						</div>
					))}
				</ForcedAdjustmentsWarning>
			)}

			{/* Validation summary */}
			{!calculationResult.isValid && (
				<ValidationMessage $type="error">
					Invalid build: {Math.abs(pointsRemaining)} points over budget
				</ValidationMessage>
			)}

			<StyledGrid>
				{attributesData.map((attribute) => {
					const attributeKey = `attribute_${attribute.id}`;
					const currentValue = typedState[attributeKey] || 0;
					const limit = getAttributeLimit(attribute.id);
					const breakdown = getStatBreakdown(`attribute_${attribute.id}`);

					// Effective value includes trait bonuses
					const effectiveValue = limit.current;
					const hasTraitEffect = effectiveValue !== currentValue;

					// Live validation and enablement
					const realTimeValidation = validateAttributeChange(attribute.id, currentValue + 1);
					const canIncrease = pointsRemaining > 0 && realTimeValidation.isValid;
					const canDecrease = canDecreaseAttribute(attribute.id);

					return (
						<StyledCard key={attribute.id}>
							<AttributeHeader>
								<StyledCardTitle>{attribute.name}</StyledCardTitle>
							</AttributeHeader>

							<StyledDescription>{attribute.description}</StyledDescription>

							<StyledControls>
								<StyledButton
									onClick={() => decreaseAttribute(attributeKey)}
									disabled={!canDecrease}
									title={!canDecrease ? 'Cannot decrease below -2' : ''}
								>
									-
								</StyledButton>
								<StyledValue>{currentValue}</StyledValue>
								<StyledButton
									onClick={() => increaseAttribute(attributeKey)}
									disabled={!canIncrease}
									title={!canIncrease ? (pointsRemaining <= 0 ? 'No points remaining' : realTimeValidation.message || 'Cannot increase') : ''}
								>
									+
								</StyledButton>
							</StyledControls>

							{/* Display both base and effective values */}
							{hasTraitEffect && (
								<EffectiveValueDisplay>
									<BaseValue>Base: {currentValue}</BaseValue>
									<EffectiveValue $different={hasTraitEffect}>Effective: {effectiveValue}</EffectiveValue>
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

							{/* Forced adjustment indicator */}
							{calculationResult.forcedAdjustments.find(
								(adj) => adj.attribute === attribute.id
							) && (
								<ForcedAdjustmentIndicator>
									Forced to minimum (-2), cost: {calculationResult.forcedAdjustments.find(
										(adj) => adj.attribute === attribute.id
									)?.pointsCost} points
								</ForcedAdjustmentIndicator>
							)}

							{/* Validation messages */}
							{limit.exceeded && (
								<ValidationMessage $type="error">Exceeds maximum limit of +{limit.max}</ValidationMessage>
							)}

							{!limit.exceeded && !canIncrease && pointsRemaining > 0 && (
								<ValidationMessage $type="warning">Cannot increase further due to trait bonuses</ValidationMessage>
							)}
						</StyledCard>
					);
				})}
			</StyledGrid>
		</StyledContainer>
	);
}

export default Attributes;
