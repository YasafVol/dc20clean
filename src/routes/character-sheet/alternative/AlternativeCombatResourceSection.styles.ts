import styled, { css } from 'styled-components';
import { media, theme } from '../styles/theme';

export const CombatResourceSection = styled.section`
	display: grid;
	grid-template-columns: minmax(420px, 1.08fr) minmax(460px, 1fr);
	align-items: stretch;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};

	@media (max-width: 1200px) {
		grid-template-columns: minmax(360px, 1fr) minmax(430px, 1fr);
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
	grid-template-columns: repeat(3, minmax(0, 1fr));
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

export const MovementStrip = styled.div`
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	align-items: stretch;
	min-width: 0;
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const MovementTitle = styled.div`
	display: grid;
	place-items: center;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border-right: 1px solid ${theme.colors.border.default};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.06em;

	${media.mobile} {
		justify-content: start;
		border-right: 0;
		border-bottom: 1px solid ${theme.colors.border.default};
	}
`;

export const MovementGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(54px, 1fr));
	min-width: 0;
`;

export const MovementMetric = styled.div<{ $isDefault?: boolean }>`
	display: grid;
	place-items: center;
	align-content: center;
	gap: 2px;
	min-width: 0;
	min-height: 54px;
	padding: ${theme.spacing[2]};
	border-left: 1px solid ${theme.colors.border.default};
	opacity: ${({ $isDefault }) => ($isDefault ? 0.72 : 1)};

	&:first-child {
		border-left: 0;
	}
`;

export const MovementLabel = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.04em;
`;

export const MovementValue = styled.span`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	font-variant-numeric: tabular-nums;
`;

export const DefensePanel = styled.div`
	${panelStyles}
	display: grid;
	grid-template-rows: minmax(0, 1fr) auto;
	gap: ${theme.spacing[2]};
`;

export const DefenseCards = styled.div`
	display: grid;
	grid-template-rows: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[2]};
`;

export const DefenseCard = styled.div<{ $color: string }>`
	display: grid;
	grid-template-columns: minmax(138px, 0.8fr) minmax(0, 2fr);
	align-items: stretch;
	min-width: 0;
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const DefenseTitle = styled.h3<{ $color: string }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
	margin: 0;
	padding: ${theme.spacing[3]};
	border-top: 3px solid ${({ $color }) => $color};
	color: ${({ $color }) => $color};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};

	${media.mobile} {
		border-bottom: 1px solid ${theme.colors.border.default};
	}
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

export const DefenseFormulaContent = styled.div`
	display: grid;
	gap: ${theme.spacing[2]};
	min-width: 260px;
`;

export const DefenseFormulaExpression = styled.div`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	white-space: nowrap;
`;

export const DefenseFormulaRows = styled.div`
	display: grid;
	gap: ${theme.spacing[1]};
`;

export const DefenseFormulaRow = styled.div<{ $total?: boolean }>`
	display: flex;
	justify-content: space-between;
	gap: ${theme.spacing[4]};
	padding-top: ${({ $total }) => ($total ? theme.spacing[2] : '0')};
	border-top: ${({ $total }) => ($total ? `1px solid ${theme.colors.border.default}` : 'none')};
	color: ${({ $total }) => ($total ? theme.colors.text.primary : theme.colors.text.secondary)};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${({ $total }) =>
		$total ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
`;

export const DefenseThresholds = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	min-width: 0;
`;

const defenseThresholdColor = {
	hit: theme.colors.accent.primary,
	heavy: theme.colors.accent.warning,
	brutal: theme.colors.accent.danger
} as const;

const defenseThresholdBackground = {
	hit: theme.colors.accent.infoAlpha20,
	heavy: theme.colors.accent.warningAlpha10,
	brutal: theme.colors.accent.dangerAlpha10
} as const;

type DefenseThresholdTone = keyof typeof defenseThresholdColor;

const defenseThresholdValueSize: Record<DefenseThresholdTone, string> = {
	hit: theme.typography.fontSize['2xl'],
	heavy: theme.typography.fontSize.xl,
	brutal: theme.typography.fontSize.lg
};

export const DefenseThreshold = styled.div<{ $tone: DefenseThresholdTone }>`
	display: grid;
	place-items: center;
	align-content: center;
	gap: ${theme.spacing[1]};
	min-width: 0;
	padding: ${theme.spacing[2]};
	background: ${({ $tone }) => defenseThresholdBackground[$tone]};
	border-top: 3px solid ${({ $tone }) => defenseThresholdColor[$tone]};
	border-left: 1px solid ${theme.colors.border.default};
	color: ${({ $tone }) => defenseThresholdColor[$tone]};
`;

export const DefenseThresholdLabel = styled.span<{ $tone: DefenseThresholdTone }>`
	display: grid;
	justify-items: center;
	gap: 1px;
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${({ $tone }) =>
		$tone === 'hit' ? theme.typography.fontWeight.bold : theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.04em;
	white-space: nowrap;
`;

export const DefenseThresholdModifier = styled.span`
	color: ${theme.colors.text.muted};
	font-size: 0.625rem;
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: none;
	letter-spacing: 0.02em;
`;

export const DefenseThresholdValue = styled.span<{ $tone: DefenseThresholdTone }>`
	font-size: ${({ $tone }) => defenseThresholdValueSize[$tone]};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1;
	font-variant-numeric: tabular-nums;
`;

export const ReductionIndicators = styled.div`
	display: grid;
	grid-template-columns: repeat(3, minmax(72px, 1fr));
	align-items: center;
	gap: ${theme.spacing[3]};

	& > div {
		display: block;
	}

	& > div > div:first-child {
		display: block;
	}
`;

export const ReductionCard = styled.div`
	display: grid;
	grid-template-columns: auto minmax(0, 1fr);
	align-items: center;
	gap: ${theme.spacing[3]};
	min-width: 0;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const ReductionTitle = styled.h3`
	margin: 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const ReductionBadge = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${theme.spacing[2]};
	min-height: 28px;
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
