import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';

import { attributesData } from '../../lib/rulesdata/attributes';
import AttributePointsCounter from './AttributePointsCounter';
import styled from '@emotion/styled';
import {
	StyledContainer,
	StyledTitle,
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
	const { state, dispatch, attributePointsRemaining, calculationResult } = useCharacter();
	const { getAttributeLimit, validateAttributeChange, getStatBreakdown } =
		useEnhancedCharacterCalculation();

	const totalAttributePoints = calculationResult.stats.finalAttributePoints ?? 12;
	const limits = calculationResult.validation.attributeLimits;

	const typedState = state as unknown as AttributeState;

	function increaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		const attrId = attribute.replace('attribute_', '');
		const validation = validateAttributeChange(attrId, currentValue + 1);
		if (attributePointsRemaining > 0 && validation.isValid) {
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
			<AttributePointsCounter totalAttributePoints={totalAttributePoints} />

			<StyledGrid>
				{attributesData.map((attribute) => {
					const attributeKey = `attribute_${attribute.id}`;
					const currentValue = typedState[attributeKey] || 0;
					const limit = getAttributeLimit(attribute.id);
					const breakdown = getStatBreakdown(attribute.id);

					// Enhanced validation with real-time state
					// Use live validation instead of cached result to avoid timing issues
					const realTimeValidation = validateAttributeChange(attribute.id, currentValue + 1);
					const canIncrease = attributePointsRemaining > 0 && realTimeValidation.isValid;
					// Simple real-time decrease check: can decrease if above minimum
					const canDecrease = currentValue > -2;

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
									title={
										!canIncrease
											? attributePointsRemaining <= 0
												? 'No points remaining'
												: 'Cannot increase above +3'
											: ''
									}
								>
									+
								</StyledButton>
							</StyledControls>

							
						</StyledCard>
					);
				})}
			</StyledGrid>
		</StyledContainer>
	);
}

export default Attributes;
