import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

type EffectSourceLike =
	| string
	| {
			name?: string;
			category?: string;
			type?: string;
			id?: string;
	  };

interface BreakdownEffect {
	source?: EffectSourceLike;
	name?: string;
	value: number;
	condition?: string;
	description?: string;
	isActive?: boolean;
}

interface StatBreakdown {
	statName: string;
	baseLabel?: string;
	base: number;
	effects: BreakdownEffect[];
	total: number;
	conditionalTotal?: number;
}

interface AdditionalBreakdown {
	title: string;
	breakdown: StatBreakdown;
}

interface CalculationTooltipProps {
	title: string;
	breakdown?: StatBreakdown | null;
	additionalBreakdowns?: AdditionalBreakdown[];
	visible: boolean;
	positionX: number;
	positionY: number;
}

const TooltipOverlay = styled.div<{ $visible: boolean; $x: number; $y: number }>`
	position: fixed;
	left: ${(props) => props.$x}px;
	top: ${(props) => props.$y}px;
	transform: translate(-50%, -105%);
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[4]};
	min-width: 250px;
	max-width: 400px;
	z-index: 10000;
	pointer-events: none;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
	transition:
		opacity ${theme.transitions.fast},
		visibility ${theme.transitions.fast};
	box-shadow: ${theme.shadows.lg};
`;

const TooltipTitle = styled.div`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin-bottom: ${theme.spacing[2]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const TooltipSection = styled.div`
	margin-bottom: ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
`;

const TooltipRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[1]} 0;
	border-bottom: 1px solid ${theme.colors.border.default};

	&:last-child {
		border-bottom: none;
	}
`;

const TooltipLabel = styled.span`
	color: ${theme.colors.text.secondary};
`;

const TooltipValue = styled.span<{ $isPositive?: boolean }>`
	color: ${(props) =>
		props.$isPositive === undefined
			? theme.colors.text.primary
			: props.$isPositive
				? theme.colors.accent.success
				: theme.colors.accent.danger};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

const TooltipTotal = styled(TooltipRow)`
	margin-top: ${theme.spacing[2]};
	padding-top: ${theme.spacing[2]};
	border-top: 2px solid ${theme.colors.border.default};
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.sm};
`;

const TooltipSubsection = styled.div`
	margin-top: ${theme.spacing[3]};
	padding-top: ${theme.spacing[3]};
	border-top: 1px solid ${theme.colors.border.default};
`;

const TooltipSubtitle = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin-bottom: ${theme.spacing[2]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

function getSourceLabel(source: EffectSourceLike): string {
	if (typeof source === 'string') {
		return source;
	}
	if (!source || typeof source !== 'object') {
		return 'Effect';
	}
	return source.name || source.category || source.type || source.id || 'Effect';
}

function getEffectLabel(effect: BreakdownEffect): string {
	return effect.name || getSourceLabel(effect.source);
}

function renderBreakdown(breakdown: StatBreakdown) {
	return (
		<>
			<TooltipSection>
				<TooltipRow>
					<TooltipLabel>{breakdown.baseLabel || 'Base Value'}</TooltipLabel>
					<TooltipValue>{breakdown.base}</TooltipValue>
				</TooltipRow>

				{breakdown.effects.map((effect, index) => (
					<TooltipRow key={`${getEffectLabel(effect)}-${index}`}>
						<TooltipLabel>
							{getEffectLabel(effect)}
							{effect.condition && ` (${effect.condition})`}
						</TooltipLabel>
						<TooltipValue $isPositive={effect.value > 0}>
							{effect.value > 0 ? '+' : ''}
							{effect.value}
						</TooltipValue>
					</TooltipRow>
				))}
			</TooltipSection>

			<TooltipTotal>
				<TooltipLabel>Total</TooltipLabel>
				<TooltipValue>{breakdown.total}</TooltipValue>
			</TooltipTotal>
		</>
	);
}

const CalculationTooltip: React.FC<CalculationTooltipProps> = ({
	title,
	breakdown,
	additionalBreakdowns = [],
	visible,
	positionX,
	positionY
}) => {
	if (!breakdown) return null;

	return (
		<TooltipOverlay $visible={visible} $x={positionX} $y={positionY}>
			<TooltipTitle>{title}</TooltipTitle>
			{renderBreakdown(breakdown)}

			{additionalBreakdowns.map((section) => (
				<TooltipSubsection key={section.title}>
					<TooltipSubtitle>{section.title}</TooltipSubtitle>
					{renderBreakdown(section.breakdown)}
				</TooltipSubsection>
			))}
		</TooltipOverlay>
	);
};

export default CalculationTooltip;
