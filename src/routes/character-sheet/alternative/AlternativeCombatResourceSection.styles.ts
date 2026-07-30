import styled, { css } from 'styled-components';
import { media, theme } from '../styles/theme';

export const CombatResourceSection = styled.section`
	display: grid;
	grid-template-columns: minmax(280px, 0.65fr) minmax(0, 1.35fr);
	align-items: stretch;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};

	@media (max-width: 1200px) {
		grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1.3fr);
	}

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;

const panelStyles = css`
	min-width: 0;
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
`;

export const ActionPanel = styled.div`
	${panelStyles}
	display: grid;
	align-content: start;
	gap: ${theme.spacing[2]};
`;

export const AttackButton = styled.button`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: ${theme.spacing[2]};
	min-height: 72px;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: linear-gradient(
		135deg,
		${theme.colors.bg.tertiary},
		${theme.colors.accent.infoAlpha20}
	);
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.lg};
	color: ${theme.colors.text.primary};
	font: inherit;
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	box-shadow: 0 10px 24px rgba(125, 207, 255, 0.08);
	text-align: left;

	&:hover,
	&:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 12px 28px rgba(125, 207, 255, 0.16);
	}
`;

export const ActionCopy = styled.span`
	display: grid;
	gap: 2px;
`;

export const ActionEyebrow = styled.span`
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.08em;
`;

export const ActionLabel = styled.span`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
`;

export const ActionValue = styled.span`
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
	font-variant-numeric: tabular-nums;
`;

export const TacticalGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[2]};
`;

const tacticalMetricStyles = css`
	display: grid;
	justify-items: start;
	gap: ${theme.spacing[1]};
	min-height: 64px;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font: inherit;
	text-align: left;
`;

export const TacticalMetric = styled.div`
	${tacticalMetricStyles}
`;

export const TacticalButton = styled.button`
	${tacticalMetricStyles}
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		border-color: ${theme.colors.accent.primary};
		transform: translateY(-1px);
	}
`;

export const MetricLabel = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const MetricValue = styled.span<{ $actionable?: boolean }>`
	color: ${({ $actionable }) =>
		$actionable ? theme.colors.accent.primary : theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	font-variant-numeric: tabular-nums;
`;

export const DefensePanel = styled.div`
	${panelStyles}
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: stretch;
	gap: ${theme.spacing[4]};

	@media (max-width: 1200px) {
		grid-column: auto;
	}

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const DefenseCards = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[3]};

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const DefenseCard = styled.div<{ $color: string }>`
	display: grid;
	align-content: start;
	gap: ${theme.spacing[3]};
	min-width: 0;
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-top: 3px solid ${({ $color }) => $color};
	border-radius: ${theme.borderRadius.lg};
`;

export const DefenseTitle = styled.h3<{ $color: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
	margin: 0;
	color: ${({ $color }) => $color};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
`;

export const DefenseAbbreviation = styled.span<{ $color: string }>`
	flex: 0 0 auto;
	padding: 2px ${theme.spacing[2]};
	background: ${({ $color }) => `color-mix(in srgb, ${$color} 16%, transparent)`};
	border: 1px solid ${({ $color }) => $color};
	border-radius: ${theme.borderRadius.full};
	color: ${({ $color }) => $color};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	letter-spacing: 0.06em;
`;

export const DefenseThresholds = styled.div`
	display: grid;
	gap: ${theme.spacing[2]};
`;

const defenseThresholdColor = {
	hit: theme.colors.text.primary,
	heavy: theme.colors.text.secondary,
	brutal: `color-mix(in srgb, ${theme.colors.text.muted} 60%, ${theme.colors.text.secondary})`
} as const;

type DefenseThresholdTone = keyof typeof defenseThresholdColor;

const defenseThresholdLabelSize: Record<DefenseThresholdTone, string> = {
	hit: theme.typography.fontSize.base,
	heavy: theme.typography.fontSize.sm,
	brutal: theme.typography.fontSize.xs
};

const defenseThresholdValueSize: Record<DefenseThresholdTone, string> = {
	hit: theme.typography.fontSize['2xl'],
	heavy: theme.typography.fontSize.lg,
	brutal: theme.typography.fontSize.base
};

export const DefenseThreshold = styled.div<{ $tone: DefenseThresholdTone }>`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: baseline;
	gap: ${theme.spacing[2]};
	color: ${({ $tone }) => defenseThresholdColor[$tone]};
`;

export const DefenseThresholdLabel = styled.span<{ $tone: DefenseThresholdTone }>`
	font-size: ${({ $tone }) => defenseThresholdLabelSize[$tone]};
	font-weight: ${theme.typography.fontWeight.semibold};
	white-space: nowrap;
`;

export const DefenseThresholdValue = styled.span<{ $tone: DefenseThresholdTone }>`
	font-size: ${({ $tone }) => defenseThresholdValueSize[$tone]};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1;
	font-variant-numeric: tabular-nums;
`;

export const ReductionIndicators = styled.div`
	display: grid;
	grid-template-rows: repeat(3, auto);
	align-content: center;
	gap: ${theme.spacing[2]};

	& > div {
		display: block;
	}

	& > div > div:first-child {
		display: block;
	}

	${media.mobile} {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: none;
	}
`;

export const ReductionCard = styled.div`
	display: grid;
	align-content: start;
	gap: ${theme.spacing[3]};
	min-width: 116px;
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-top: 3px solid ${theme.colors.text.muted};
	border-radius: ${theme.borderRadius.lg};

	${media.mobile} {
		min-width: 0;
	}
`;

export const ReductionTitle = styled.h3`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
`;

export const ReductionBadge = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
	min-height: 32px;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
`;

export const ReductionSquare = styled.span<{ $active: boolean }>`
	width: 18px;
	height: 18px;
	flex: 0 0 18px;
	background: ${({ $active }) =>
		$active ? theme.colors.accent.success : theme.colors.bg.secondary};
	border: 2px solid
		${({ $active }) => ($active ? theme.colors.accent.success : theme.colors.text.secondary)};
	border-radius: ${theme.borderRadius.sm};
	box-shadow: ${({ $active }) =>
		$active
			? `0 0 0 2px color-mix(in srgb, ${theme.colors.accent.success} 20%, transparent)`
			: 'none'};
`;
