import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useEnhancedCharacterCalculation } from '../../lib/hooks/useEnhancedCharacterCalculation';
import { attributesData } from '../../lib/rulesdata/attributes';
import AttributePointsCounter from './AttributePointsCounter';
import { Plus, Minus, AlertTriangle } from 'lucide-react';
import { theme } from '../character-sheet/styles/theme';
import {
	Container,
	Header,
	Title,
	PrimeRuleToggle,
	Checkbox,
	CheckboxLabel,
	AttributesGrid,
	AttributeCard,
	AttributeName,
	AttributeValue,
	ButtonGroup,
	IconButton,
	InfoSection,
	InfoBadge,
	EffectsList,
	EffectItem,
	WarningBox,
	WarningHeader,
	ErrorBox
} from './Attributes.styled';

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
		<Container>
			<Header>
				<Title>Attributes</Title>
				<AttributePointsCounter totalAttributePoints={totalAttributePoints} />

				<PrimeRuleToggle>
					<Checkbox
						type="checkbox"
						id="prime-cap-rule"
						checked={usePrimeCapRule}
						onChange={handlePrimeRuleToggle}
					/>
					<div style={{ textAlign: 'left' }}>
						<CheckboxLabel htmlFor="prime-cap-rule">
							Use Prime = Attribute Cap (Optional Rule)
						</CheckboxLabel>
						<span
							style={{
								display: 'block',
								fontSize: theme.typography.fontSize.xs,
								color: theme.colors.text.secondary,
							}}
						>
							Prime modifier equals level-based cap instead of highest attribute.
						</span>
					</div>
				</PrimeRuleToggle>
			</Header>

			{calculation.forcedAdjustments.length > 0 && (
				<WarningBox>
					<WarningHeader>
						<AlertTriangle size={16} />
						Forced Adjustments
					</WarningHeader>
					{calculation.forcedAdjustments.map((adj, index) => (
						<div key={index}>
							• {adj.attribute.charAt(0).toUpperCase() + adj.attribute.slice(1)}:{' '}
							{adj.originalValue} → {adj.effectiveValue} (costs {adj.pointsCost} points)
						</div>
					))}
				</WarningBox>
			)}

			{!calculation.isValid && (
				<ErrorBox>
					Invalid build: {Math.abs(calculation.pointsRemaining)} points over budget
				</ErrorBox>
			)}

			<AttributesGrid>
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
						<AttributeCard key={attribute.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<AttributeName>{attribute.name}</AttributeName>

							<p
								style={{
									color: 'rgba(169, 177, 214, 0.7)',
									fontSize: '0.875rem',
									minHeight: '3rem',
									marginBottom: '1rem',
								}}
							>
								{attribute.description}
							</p>

							<ButtonGroup>
								<IconButton
									$disabled={!canDecrease}
									onClick={() => canDecrease && decreaseAttribute(attributeKey)}
									title={!canDecrease ? 'Cannot decrease below -2' : ''}
								>
									<Minus size={20} />
								</IconButton>

								<AttributeValue style={{ color: currentValue < 0 ? '#F7768E' : '#FFFFFF' }}>
									{currentValue > 0 ? `+${currentValue}` : currentValue}
								</AttributeValue>

								<IconButton
									$disabled={!canIncrease}
									onClick={() => canIncrease && increaseAttribute(attributeKey)}
									title={
										!canIncrease
											? attributePointsRemaining <= 0
												? 'No points remaining'
												: realTimeValidation.message || 'Cannot increase'
											: ''
									}
								>
									<Plus size={20} />
								</IconButton>
							</ButtonGroup>

							<InfoSection>
								<InfoBadge $type={limit.exceeded ? 'limit' : 'cap'}>
									Final: {limit.current} / {limit.max}
								</InfoBadge>
							</InfoSection>

							{hasTraitEffect && (
								<div
									style={{
										background: 'rgba(125, 207, 255, 0.05)',
										border: '1px solid rgba(125, 207, 255, 0.2)',
										borderRadius: '0.375rem',
										padding: '0.5rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '0.75rem',
									}}
								>
									<span style={{ color: 'rgba(169, 177, 214, 0.7)' }}>Base: {currentValue}</span>
									<span style={{ color: '#7DCFFF', fontWeight: 'bold' }}>
										Effective: {effectiveValue}
									</span>
								</div>
							)}

							{(limit.traitBonuses > 0 || breakdown) && (
								<EffectsList>
									<EffectItem>Base Points: {currentValue}</EffectItem>
									{limit.traitBonuses > 0 && (
										<EffectItem style={{ color: '#7DCFFF' }}>
											Trait Bonuses: +{limit.traitBonuses}
										</EffectItem>
									)}
									<EffectItem
										style={{
											borderTop: '1px solid rgba(255, 255, 255, 0.05)',
											paddingTop: '0.25rem',
											fontWeight: 'bold',
										}}
									>
										Total: {limit.current}
									</EffectItem>
								</EffectsList>
							)}

							{forcedAdjustment && (
								<div
									style={{
										marginTop: '0.5rem',
										display: 'flex',
										alignItems: 'flex-start',
										gap: '0.5rem',
										borderRadius: '0.375rem',
										border: '1px solid rgba(224, 175, 104, 0.2)',
										background: 'rgba(224, 175, 104, 0.1)',
										padding: '0.5rem',
										color: '#E0AF68',
									}}
								>
									<AlertTriangle size={12} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
									<span style={{ fontSize: '0.75rem' }}>
										Forced to minimum (-2), cost: {forcedAdjustment.pointsCost} pts
									</span>
								</div>
							)}

							{limit.exceeded && (
								<div
									style={{
										color: '#F7768E',
										textAlign: 'center',
										fontWeight: 'bold',
										marginTop: '0.5rem',
										animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
									}}
								>
									Exceeds maximum limit of +{limit.max}
								</div>
							)}

							{!limit.exceeded && !canIncrease && attributePointsRemaining > 0 && (
								<div
									style={{
										textAlign: 'center',
										color: '#E0AF68',
										marginTop: '0.5rem',
										fontSize: '0.875rem',
									}}
								>
									Cannot increase further due to trait bonuses
								</div>
							)}
						</AttributeCard>
					);
				})}
			</AttributesGrid>
		</Container>
	);
}

export default Attributes;
