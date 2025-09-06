/**
 * Trait Choice Selector Component
 *
 * This component handles user choices for traits that require input,
 * such as Human Attribute Increase or Skill Expertise.
 */

import React from 'react';
import styled from '@emotion/styled';
import { useCharacter } from '../../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../../lib/hooks/useEnhancedCharacterCalculation';

import { attributesData } from '../../../lib/rulesdata/attributes';
import { skillsData } from '../../../lib/rulesdata/skills';
import { tradesData } from '../../../lib/rulesdata/trades';
import type { ITrait, ITraitEffect } from '../../../lib/rulesdata/types';

// Styled components
const ChoiceContainer = styled.div`
	margin-top: 1rem;
	padding: 1rem;
	background-color: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	border-left: 4px solid #3b82f6;
`;

const ChoiceTitle = styled.h4`
	margin: 0 0 0.75rem 0;
	color: #1e40af;
	font-size: 0.9rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&:before {
		content: '🎯';
		font-size: 1rem;
	}
`;

const ChoiceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 0.75rem;
	margin-top: 0.75rem;
`;

const ChoiceButton = styled.button<{ $selected: boolean; $invalid: boolean }>`
	padding: 0.75rem;
	border: 2px solid
		${(props) => (props.$invalid ? '#ef4444' : props.$selected ? '#3b82f6' : '#d1d5db')};
	border-radius: 8px;
	background-color: ${(props) =>
		props.$invalid ? '#fef2f2' : props.$selected ? '#dbeafe' : '#ffffff'};
	color: ${(props) => (props.$invalid ? '#dc2626' : props.$selected ? '#1e40af' : '#374151')};
	font-size: 0.875rem;
	font-weight: 500;
	cursor: ${(props) => (props.$invalid ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.$invalid ? 0.6 : 1)};
	transition: all 0.2s ease;
	text-align: left;
	position: relative;

	&:hover:not(:disabled) {
		transform: ${(props) => (props.$invalid ? 'none' : 'translateY(-1px)')};
		box-shadow: ${(props) => (props.$invalid ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.1)')};
		border-color: ${(props) => (props.$invalid ? '#ef4444' : '#3b82f6')};
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}
`;

const ChoiceButtonTitle = styled.div`
	font-weight: 600;
	margin-bottom: 0.25rem;
`;

const ChoiceButtonSubtitle = styled.div`
	font-size: 0.75rem;
	opacity: 0.7;
	line-height: 1.3;
`;

const ValidationMessage = styled.div`
	color: #dc2626;
	font-size: 0.75rem;
	margin-top: 0.5rem;
	padding: 0.5rem;
	background-color: #fef2f2;
	border: 1px solid #fecaca;
	border-radius: 4px;
	font-style: italic;
`;

const PreviewBox = styled.div`
	margin-top: 0.75rem;
	padding: 0.75rem;
	background-color: #f0f9ff;
	border: 1px solid #bae6fd;
	border-radius: 6px;
	font-size: 0.875rem;

	&:before {
		content: '✅ ';
		color: #059669;
		font-weight: bold;
	}
`;

const ClearButton = styled.button`
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	background-color: #6b7280;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 0.75rem;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #4b5563;
	}
`;

const PointImpactIndicator = styled.div<{ $type: 'positive' | 'negative' | 'neutral' }>`
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	font-size: 0.75rem;
	font-weight: 500;
	color: ${(props) =>
		props.$type === 'positive' ? '#059669' : props.$type === 'negative' ? '#dc2626' : '#6b7280'};

	&:before {
		content: ${(props) =>
			props.$type === 'positive' ? "'📈'" : props.$type === 'negative' ? "'📉'" : "'📊'"};
	}
`;

const AttributeEffectsPreview = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	background-color: #f0f9ff;
	border: 1px solid #bae6fd;
	border-radius: 4px;
	font-size: 0.75rem;
`;

const AttributeEffect = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.25rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

const ForcedAdjustmentWarning = styled.div`
	margin-top: 0.5rem;
	padding: 0.5rem;
	background-color: #fef3c7;
	border: 1px solid #fbbf24;
	border-radius: 4px;
	font-size: 0.75rem;
	color: #92400e;

	&:before {
		content: '⚠️ ';
		margin-right: 0.25rem;
	}
`;

interface TraitChoiceSelectorProps {
	trait: ITrait;
	effect: ITraitEffect;
	effectIndex: number;
}

const TraitChoiceSelector: React.FC<TraitChoiceSelectorProps> = ({
	trait,
	effect,
	effectIndex
}) => {
	const { state, dispatch } = useCharacter();
	const { validateTraitChoice, getEffectPreview, calculationResult } =
		useEnhancedCharacterCalculation();

	// Simplified calculation for now
	const calculation = { pointsRemaining: 0, forcedAdjustments: [] };
	// Simplified replacements for removed hooks
	const canSelectTrait = () => true; // Simplified - always allow selection for now
	const traitPointImpact = { pointsRemaining: 0, impact: 0, isValid: true, forcedAdjustments: [] };

	// Get current choice from state
	const currentChoices = state.selectedTraitChoices || {};
	const choiceKey = `${trait.id}-${effectIndex}`;
	const currentChoice = currentChoices[choiceKey] || '';

	// Handle choice selection
	const handleChoiceChange = (choice: string) => {
		dispatch({
			type: 'UPDATE_TRAIT_CHOICE',
			traitId: trait.id,
			effectIndex,
			choice: currentChoice === choice ? '' : choice // Toggle selection
		});
	};

	// Get options for this effect type
	const getOptions = () => {
		if (effect.userChoiceRequired?.options) {
			return effect.userChoiceRequired.options.map((option) => ({
				value: option,
				displayName: option,
				description: ''
			}));
		}

		switch (effect.type) {
			case 'MODIFY_ATTRIBUTE':
				return attributesData.map((attr) => ({
					value: attr.id,
					displayName: attr.name,
					description: attr.description
				}));

			case 'GRANT_SKILL_EXPERTISE':
				return skillsData.map((skill) => ({
					value: skill.id,
					displayName: skill.name,
					description: `${skill.attributeAssociation.toUpperCase()} - ${skill.description}`
				}));

			case 'GRANT_TRADE_EXPERTISE':
				return tradesData.map((trade) => ({
					value: trade.id,
					displayName: trade.name,
					description: `${trade.attributeAssociation.toUpperCase()} - ${trade.description}`
				}));

			default:
				return [];
		}
	};

	const options = getOptions();
	const prompt = effect.userChoiceRequired?.prompt || `Choose option for ${trait.name}`;

	// Get preview for current choice
	const preview = currentChoice
		? getEffectPreview(trait.id, effectIndex, currentChoice)
		: undefined;

	// Check if trait has attribute modifying effects
	const hasAttributeEffects = effect.type === 'MODIFY_ATTRIBUTE';
	const selectedTraitIds = state.selectedTraitIds || [];
	const isTraitSelected = selectedTraitIds.includes(trait.id);

	return (
		<ChoiceContainer>
			<ChoiceTitle>{prompt}</ChoiceTitle>

			{/* NEW: Show attribute effects preview */}
			{hasAttributeEffects && (
				<AttributeEffectsPreview>
					<strong>Attribute Effects:</strong>
					<AttributeEffect>
						<span>{effect.target?.charAt(0).toUpperCase() + effect.target?.slice(1)}</span>
						<span>
							{(effect.value || 0) > 0 ? '+' : ''}
							{effect.value || 0}
						</span>
					</AttributeEffect>
				</AttributeEffectsPreview>
			)}

			{/* NEW: Show point cost impact if trait is selected */}
			{isTraitSelected && (
				<PointImpactIndicator
					$type={
						traitPointImpact.impact > 0
							? 'positive'
							: traitPointImpact.impact < 0
								? 'negative'
								: 'neutral'
					}
				>
					Points after selection: {traitPointImpact.pointsRemaining}
					{traitPointImpact.impact !== 0 &&
						` (${traitPointImpact.impact > 0 ? '+' : ''}${traitPointImpact.impact})`}
				</PointImpactIndicator>
			)}

			{/* NEW: Show forced adjustments warning */}
			{traitPointImpact.forcedAdjustments && traitPointImpact.forcedAdjustments.length > 0 && (
				<ForcedAdjustmentWarning>
					This trait will require additional attribute point adjustments:
					{traitPointImpact.forcedAdjustments.map((adj, index) => (
						<div key={index} style={{ marginTop: '0.25rem' }}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}: {adj.pointsCost}{' '}
							extra points
						</div>
					))}
				</ForcedAdjustmentWarning>
			)}

			<ChoiceGrid>
				{options.map((option) => {
					const validation = validateTraitChoice(trait.id, effectIndex, option.value);
					const isSelected = currentChoice === option.value;
					const isInvalid = !validation.isValid && !isSelected;

					return (
						<div key={option.value}>
							<ChoiceButton
								$selected={isSelected}
								$invalid={isInvalid}
								onClick={() => {
									if (validation.isValid || isSelected) {
										handleChoiceChange(option.value);
									}
								}}
								disabled={isInvalid}
							>
								<ChoiceButtonTitle>{option.displayName}</ChoiceButtonTitle>
								{option.description && (
									<ChoiceButtonSubtitle>{option.description}</ChoiceButtonSubtitle>
								)}
							</ChoiceButton>

							{isInvalid && validation.message && (
								<ValidationMessage>⚠️ {validation.message}</ValidationMessage>
							)}
						</div>
					);
				})}
			</ChoiceGrid>

			{/* Show preview of the selected choice */}
			{preview && (
				<PreviewBox>
					<strong>Preview:</strong> {preview.description}
				</PreviewBox>
			)}

			{/* Clear selection button */}
			{currentChoice && (
				<ClearButton onClick={() => handleChoiceChange('')}>Clear Selection</ClearButton>
			)}
		</ChoiceContainer>
	);
};

export default TraitChoiceSelector;
