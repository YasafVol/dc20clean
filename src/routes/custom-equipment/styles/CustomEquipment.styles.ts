/**
 * @file Custom Equipment Styled Components
 */

import styled from 'styled-components';
import { theme, media } from '../../character-sheet/styles/theme';

export const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
`;

export const Header = styled.div`
	padding: ${theme.spacing[8]};
`;

export const HeaderContent = styled.div`
	max-width: 1600px;
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
	color: ${theme.colors.text.primary};
	letter-spacing: 0.05em;
	text-align: center;
	text-transform: uppercase;
	margin: 0 0 ${theme.spacing[2]} 0;
`;

export const Subtitle = styled.p`
	color: ${theme.colors.text.secondary};
	text-align: center;
	font-size: ${theme.typography.fontSize.base};
	margin: 0;
`;

export const MainContent = styled.div`
	max-width: 1600px;
	margin: 0 auto;
	padding: ${theme.spacing[8]} ${theme.spacing[8]};
`;

export const CategoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: ${theme.spacing[6]};
	margin-top: ${theme.spacing[8]};
`;

export const CategoryCard = styled.button<{ $selected?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${(props) => (props.$selected ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	text-align: left;
	cursor: pointer;
	box-shadow: ${theme.shadows.md};
	transition: all ${theme.transitions.fast};

	&:hover {
		transform: translateY(-2px);
		box-shadow: ${theme.shadows.lg};
		border-color: ${theme.colors.accent.primary};
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const CategoryIcon = styled.div`
	font-size: 3rem;
	margin-bottom: ${theme.spacing[4]};
`;

export const CategoryTitle = styled.h3`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0 0 ${theme.spacing[2]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const CategoryDescription = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
	margin: 0;
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
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	margin-top: ${theme.spacing[4]};
	box-shadow: ${theme.shadows.md};
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
		props.$completed ? theme.colors.accent.success : props.$active ? theme.colors.accent.primary : theme.colors.bg.tertiary};
	color: ${(props) => (props.$completed || props.$active ? theme.colors.text.inverse : theme.colors.text.muted)};
	transition: all ${theme.transitions.fast};
`;

export const StepConnector = styled.div<{ $active?: boolean }>`
	flex: 1;
	height: 2px;
	background: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.border.default)};
	transition: all ${theme.transitions.fast};
`;

export const OptionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: ${theme.spacing[4]};
`;

export const OptionCard = styled.button<{ $selected?: boolean }>`
	background: ${(props) =>
		props.$selected ? theme.colors.accent.primary : theme.colors.bg.tertiary};
	border: 1px solid ${(props) => (props.$selected ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[4]};
	text-align: left;
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	color: ${(props) => (props.$selected ? theme.colors.text.inverse : theme.colors.text.primary)};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		background: ${(props) =>
			props.$selected ? theme.colors.accent.primary : theme.colors.bg.elevated};
		box-shadow: ${theme.shadows.md};
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
	display: flex;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[6]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
`;

export const Tab = styled.button<{ $active?: boolean }>`
	padding: ${theme.spacing[3]} ${theme.spacing[5]};
	background: ${(props) => (props.$active ? theme.colors.bg.elevated : 'transparent')};
	border: none;
	border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.secondary)};
	font-weight: ${(props) => (props.$active ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium)};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		color: ${theme.colors.accent.primary};
		background: ${theme.colors.bg.elevated};
	}

	&:active {
		transform: scale(0.98);
	}
`;
