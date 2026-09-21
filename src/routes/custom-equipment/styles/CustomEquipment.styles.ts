/**
 * @file Custom Equipment Styled Components
 */

import styled from 'styled-components';
import { theme } from '../../character-sheet/styles/theme';
import { media } from '../../../styles/responsive';

export const PageContainer = styled.div`
	min-height: 100vh;
	background:
		radial-gradient(circle at 50% -180px, ${theme.colors.accent.warningAlpha10}, transparent 45%),
		${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
`;

export const Header = styled.div`
	padding: 88px ${theme.spacing[6]} ${theme.spacing[3]};
`;

export const HeaderContent = styled.div`
	max-width: 1170px;
	margin: 0 auto;
`;

export const BackButtonRow = styled.div`
	margin-bottom: ${theme.spacing[8]};
	display: flex;
	gap: ${theme.spacing[4]};
`;

export const Title = styled.h1`
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.warning};
	letter-spacing: 0.025em;
	text-align: left;
	margin: 0 0 ${theme.spacing[2]} 0;
`;

export const Subtitle = styled.p`
	color: ${theme.colors.text.secondary};
	text-align: left;
	font-size: ${theme.typography.fontSize.base};
	margin: 0;
`;

export const MainContent = styled.div`
	max-width: 1170px;
	margin: 0 auto;
	padding: ${theme.spacing[4]} ${theme.spacing[6]} ${theme.spacing[8]};
`;

export const CategoryPrompt = styled.p`
	margin: ${theme.spacing[5]} 0 ${theme.spacing[3]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const CategoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[6]};

	${media.tablet} {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	${media.mobile} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

export const CategoryCard = styled.button<{ $selected?: boolean }>`
	display: flex;
	min-width: 0;
	min-height: 68px;
	align-items: center;
	gap: ${theme.spacing[3]};
	background: ${(props) =>
		props.$selected ? theme.colors.accent.warningAlpha10 : theme.colors.bg.secondary};
	border: 1px solid
		${(props) => (props.$selected ? theme.colors.accent.warning : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[3]};
	text-align: left;
	cursor: pointer;
	transition: border-color ${theme.transitions.fast};

	&:hover {
		border-color: ${theme.colors.accent.warning};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}
`;

export const CategoryIcon = styled.div`
	display: flex;
	flex: none;
	color: ${theme.colors.accent.warning};

	svg {
		width: 20px;
		height: 20px;
	}
`;

export const CategoryTitle = styled.h3`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	margin: 0;
`;

export const CategoryDescription = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.normal};
	margin: 0;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

export const SectionTitle = styled.h2`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0 0 ${theme.spacing[4]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
`;

export const BuilderContainer = styled.div`
	min-width: 0;
`;

export const StepIndicator = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[6]};
`;

export const Step = styled.div<{ $active?: boolean; $completed?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border-radius: ${theme.borderRadius.full};
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.sm};
	background: ${(props) =>
		props.$completed
			? theme.colors.accent.success
			: props.$active
				? theme.colors.accent.primary
				: theme.colors.bg.tertiary};
	color: ${(props) =>
		props.$completed || props.$active ? theme.colors.text.inverse : theme.colors.text.muted};
	transition: all ${theme.transitions.fast};
`;

export const StepConnector = styled.div<{ $active?: boolean }>`
	flex: 1;
	height: 2px;
	background: ${(props) =>
		props.$active ? theme.colors.accent.primary : theme.colors.border.default};
	transition: all ${theme.transitions.fast};
`;

export const OptionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
	gap: ${theme.spacing[4]};
`;

export const PresetOptionGrid = styled(OptionGrid)`
	grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
`;

export const OptionCard = styled.button<{ $selected?: boolean }>`
	background: ${(props) =>
		props.$selected ? theme.colors.accent.warningAlpha10 : theme.colors.bg.secondary};
	border: 1px solid
		${(props) => (props.$selected ? theme.colors.accent.warning : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[4]};
	text-align: left;
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	color: ${theme.colors.text.primary};

	&:hover {
		border-color: ${theme.colors.accent.warning};
		background: ${(props) =>
			props.$selected ? theme.colors.accent.warningAlpha20 : theme.colors.bg.elevated};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}

	&:active {
		transform: scale(0.98);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const OptionTitle = styled.div`
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	font-size: ${theme.typography.fontSize.base};
	margin-bottom: ${theme.spacing[1]};
`;

export const OptionDescription = styled.div`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const PropertyTag = styled.span<{ $cost?: number }>`
	display: inline-flex;
	align-items: center;
	gap: ${theme.spacing[1]};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	background: ${(props) =>
		props.$cost && props.$cost < 0
			? theme.colors.accent.success
			: props.$cost && props.$cost > 1
				? theme.colors.accent.danger
				: theme.colors.accent.warning};
	color: ${theme.colors.text.inverse};
`;

export const PointsDisplay = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: ${theme.colors.bg.tertiary};
	border-radius: ${theme.borderRadius.md};
	border: 1px solid ${theme.colors.border.default};
`;

export const PointsLabel = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
`;

export const PointsValue = styled.span<{ $over?: boolean }>`
	color: ${(props) => (props.$over ? theme.colors.accent.danger : theme.colors.accent.primary)};
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.xl};
`;

export const SummaryCard = styled.div`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	margin-top: ${theme.spacing[6]};
	box-shadow: ${theme.shadows.md};
`;

export const SummaryRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[2]} 0;
	border-bottom: 1px solid ${theme.colors.border.default};

	&:last-child {
		border-bottom: none;
	}
`;

export const SummaryLabel = styled.span`
	color: ${theme.colors.text.secondary};
`;

export const SummaryValue = styled.span`
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const ActionButtons = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	margin-top: ${theme.spacing[6]};
	justify-content: flex-end;
`;

export const SavedItemsList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: ${theme.spacing[4]};
	margin-top: ${theme.spacing[4]};
`;

export const SavedItemCard = styled.div`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	transition: all ${theme.transitions.fast};
	box-shadow: ${theme.shadows.md};

	&:hover {
		transform: translateY(-2px);
		box-shadow: ${theme.shadows.lg};
		border-color: ${theme.colors.accent.primary};
	}
`;

export const PresetBadge = styled.span`
	display: inline-block;
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	background: ${theme.colors.accent.info};
	color: ${theme.colors.text.inverse};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	margin-left: ${theme.spacing[2]};
`;

export const TabContainer = styled.div`
	display: inline-flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.secondary};
	padding: ${theme.spacing[1]};
`;

export const PrimaryTabContainer = styled(TabContainer)`
	display: flex;
	width: fit-content;
	margin-bottom: ${theme.spacing[6]};
`;

export const Tab = styled.button<{ $active?: boolean }>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	background: ${(props) => (props.$active ? theme.colors.accent.warning : 'transparent')};
	border: none;
	border-radius: ${theme.borderRadius.md};
	color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.text.secondary)};
	font-weight: ${(props) =>
		props.$active ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		color: ${(props) => (props.$active ? theme.colors.text.inverse : theme.colors.accent.warning)};
	}

	&:active {
		transform: scale(0.98);
	}
`;
