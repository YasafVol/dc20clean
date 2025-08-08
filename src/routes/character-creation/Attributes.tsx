import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';
import { attributesData } from '../../lib/rulesdata/attributes';
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
	color: ${props => props.$exceeded ? '#dc2626' : '#059669'};
`;

const AttributeBreakdown = styled.div`
	background-color: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 6px;
	padding: 0.75rem;
	margin-top: 0.75rem;
	font-size: 0.875rem;
`;

const BreakdownLine = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.25rem;
	
	&:last-child {
		margin-bottom: 0;
		padding-top: 0.25rem;
		border-top: 1px solid #d1d5db;
		font-weight: 600;
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

type AttributeState = Record<string, number>;

function Attributes() {
	const { state, dispatch, attributePointsRemaining } = useCharacter();
	const { 
		getAttributeLimit, 
		canIncreaseAttribute, 
		canDecreaseAttribute,
		validateAttributeChange,
		getStatBreakdown
	} = useEnhancedCharacterCalculation();
	const typedState = state as unknown as AttributeState;

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
			<StyledPointsRemaining>Points Remaining: {attributePointsRemaining}</StyledPointsRemaining>
			<StyledGrid>
				{attributesData.map((attribute) => {
					const attributeKey = `attribute_${attribute.id}`;
					const currentValue = typedState[attributeKey] || 0;
					const limit = getAttributeLimit(attribute.id);
					const breakdown = getStatBreakdown(attribute.id);
					
					// Enhanced validation
					const canIncrease = attributePointsRemaining > 0 && canIncreaseAttribute(attribute.id);
					const canDecrease = canDecreaseAttribute(attribute.id);
					
					return (
						<StyledCard key={attribute.id}>
							<AttributeHeader>
								<StyledCardTitle>{attribute.name}</StyledCardTitle>
								<AttributeTotal $exceeded={limit.exceeded}>
									{limit.current}/{limit.max}
								</AttributeTotal>
							</AttributeHeader>
							
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
										"Would exceed maximum with trait bonuses"
									) : ""}
								>
									+
								</StyledButton>
							</StyledControls>
							
							{/* Enhanced breakdown display */}
							{(limit.traitBonuses > 0 || breakdown) && (
								<AttributeBreakdown>
									<BreakdownLine>
										<span>Base Points:</span>
										<span>{limit.base}</span>
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
