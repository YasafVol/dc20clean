
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
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
`;

const AttributeTotal = styled.div<{ $exceeded: boolean }>`
	font-size: 1rem;
	font-weight: bold;
	color: ${props => props.$exceeded ? '#dc2626' : '#059669'};
	margin-bottom: 0.75rem;
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
	margin-top: 0.5rem;
	padding: 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	background-color: ${props => props.$type === 'error' ? '#fef2f2' : '#fffbeb'};
	border: 1px solid ${props => props.$type === 'error' ? '#fecaca' : '#fed7aa'};
	color: ${props => props.$type === 'error' ? '#dc2626' : '#d97706'};
	
	&:before {
		content: ${props => props.$type === 'error' ? "'⚠️ '" : "'💡 '"};
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
	font-weight: ${props => props.$different ? 'bold' : 'normal'};
	color: ${props => props.$different ? '#10b981' : '#e5e7eb'};
`;

const PointBreakdownSummary = styled.div`
	background: transparent;
	border: 1px solid #fbbf24;
	border-radius: 6px;
	padding: 1rem;
	margin: 1.5rem auto;
	font-size: 0.9rem;
	color: #e5e7eb;
	max-width: 500px;
	text-align: center;
`;

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
	const { 
		getAttributeLimit, 
		canDecreaseAttribute,
		validateAttributeChange,
		getStatBreakdown
	} = useEnhancedCharacterCalculation();
	
	const typedState = state as unknown as AttributeState;
	
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
			const validation = validateAttributeChange(attribute.replace('attribute_', ''), currentValue + 1);
			
			if (validation.isValid) {
				dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
			}
		}
	}

	function decreaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		const validation = validateAttributeChange(attribute.replace('attribute_', ''), currentValue - 1);
		
		if (validation.isValid) {
			dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue - 1 });
		}
	}

	return (
		<StyledContainer>
			<StyledTitle>Attributes</StyledTitle>
			<AttributePointsCounter />
			
			{/* NEW: Enhanced point breakdown summary */}
			<PointBreakdownSummary>
				<BreakdownLine>
					<span>Base Points:</span>
					<span>11</span>
				</BreakdownLine>
				<BreakdownLine>
					<span>Bonus from Traits:</span>
					<span>{calculation.totalPointsAvailable - 11}</span>
				</BreakdownLine>
				<BreakdownLine>
					<span>Spent on Attributes:</span>
					<span>{calculation.pointsSpent - calculation.forcedAdjustments.reduce((sum, adj) => sum + adj.pointsCost, 0)}</span>
				</BreakdownLine>
				{calculation.forcedAdjustments.length > 0 && (
					<BreakdownLine>
						<span>Forced Adjustments:</span>
						<span>{calculation.forcedAdjustments.reduce((sum, adj) => sum + adj.pointsCost, 0)}</span>
					</BreakdownLine>
				)}
				<BreakdownLine>
					<span>Points Remaining:</span>
					<span style={{ color: calculation.pointsRemaining < 0 ? '#dc2626' : '#059669' }}>
						{calculation.pointsRemaining}
					</span>
				</BreakdownLine>
			</PointBreakdownSummary>
			
			{/* NEW: Forced adjustments warning */}
			{calculation.forcedAdjustments.length > 0 && (
				<ForcedAdjustmentsWarning>
					{calculation.forcedAdjustments.length} forced adjustment(s) due to traits:
					{calculation.forcedAdjustments.map((adj, index) => (
						<div key={index} style={{ marginTop: '0.25rem' }}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}: 
							{adj.originalValue} → {adj.effectiveValue} (costs {adj.pointsCost} points)
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
					const forcedAdjustment = calculation.forcedAdjustments.find(adj => adj.attribute === attribute.id);
					const hasTraitEffect = effectiveValue !== currentValue;
					
					// Enhanced validation with real-time state
					// Use live validation instead of cached result to avoid timing issues
					const realTimeValidation = validateAttributeChange(attribute.id, currentValue + 1);
					const canIncrease = attributePointsRemaining > 0 && realTimeValidation.isValid;
					const canDecrease = canDecreaseAttribute(attribute.id);
					
					return (
						<StyledCard key={attribute.id}>
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
									title={!canDecrease ? "Cannot decrease below -2" : ""}
								>
									-
								</StyledButton>
								<StyledValue>{currentValue}</StyledValue>
								<StyledButton
									onClick={() => increaseAttribute(attributeKey)}
									disabled={!canIncrease}
									title={!canIncrease ? (
										attributePointsRemaining <= 0 ? "No points remaining" : 
										realTimeValidation.message || "Cannot increase"
									) : ""}
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
							
							{/* Validation messages */}
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
						</StyledCard>
					);
				})}
			</StyledGrid>
		</StyledContainer>
	);
}

export default Attributes;
