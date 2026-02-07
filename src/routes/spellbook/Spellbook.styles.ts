import styled from 'styled-components';
import { theme } from '../character-sheet/styles/theme';

export const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
`;

export const Header = styled.div`
	padding: ${theme.spacing[8]};
`;

export const Title = styled.h1`
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0 0 ${theme.spacing[2]} 0;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 0.05em;
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
	padding: 0 ${theme.spacing[8]} ${theme.spacing[8]};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const FiltersCard = styled.div`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	box-shadow: ${theme.shadows.md};
	padding: ${theme.spacing[6]};
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[4]};
`;

export const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	transition: all ${theme.transitions.fast};

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
		box-shadow: 0 0 0 2px ${theme.colors.accent.primaryAlpha30};
	}
`;

export const FiltersContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

export const FilterSection = styled.div<{ $borderColor?: string }>`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
`;

export const FilterLabel = styled.label<{ $color?: string }>`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const FilterChips = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[3]};
	width: 100%;
`;

type FilterChipProps = {
	$selected?: boolean;
	$color?: string;
};

export const FilterChip = styled.button<FilterChipProps>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border-radius: ${theme.borderRadius.md};
	border: 1px solid ${(props) => (props.$selected ? theme.colors.accent.primary : theme.colors.border.default)};
	background: ${(props) => (props.$selected ? theme.colors.accent.primary : theme.colors.bg.tertiary)};
	color: ${(props) => (props.$selected ? theme.colors.text.inverse : theme.colors.text.primary)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	box-shadow: ${(props) => (props.$selected ? theme.shadows.md : 'none')};

	&:hover {
		background: ${(props) => (props.$selected ? theme.colors.accent.primary : theme.colors.bg.elevated)};
		border-color: ${theme.colors.accent.primary};
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const SpellsList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: ${theme.spacing[6]};
`;

export const SpellCardContainer = styled.div<{ $expanded?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[5]};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	box-shadow: ${theme.shadows.md};

	&:hover {
		border-color: ${theme.colors.accent.primary};
		box-shadow: ${theme.shadows.lg};
		transform: translateY(-2px);
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const SpellHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: ${theme.spacing[3]};
`;

export const SpellName = styled.h3`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0;
	flex: 1;
`;

export const SpellBadgesContainer = styled.div`
	display: flex;
	gap: ${theme.spacing[2]};
	align-items: center;
`;

export const SpellBadge = styled.span<{ $variant?: string }>`
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	background: ${(props) => {
		switch (props.$variant) {
			case 'sustained':
				return theme.colors.accent.success;
			case 'ritual':
				return theme.colors.accent.info;
			case 'cost':
				return theme.colors.accent.warning;
			default:
				return theme.colors.bg.tertiary;
		}
	}};
	color: ${(props) => {
		switch (props.$variant) {
			case 'sustained':
			case 'ritual':
			case 'cost':
				return theme.colors.text.inverse;
			default:
				return theme.colors.text.secondary;
		}
	}};
`;

export const SpellMeta = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[3]};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
`;

export const SpellMetaItem = styled.span`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[1]};
`;

export const SpellShortDescription = styled.p`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
	margin-bottom: ${theme.spacing[3]};
`;

export const SpellExpandedContent = styled.div`
	margin-top: ${theme.spacing[4]};
	padding-top: ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};
`;

export const SpellSection = styled.div`
	margin-bottom: ${theme.spacing[4]};

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SpellSectionTitle = styled.h4`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0 0 ${theme.spacing[2]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const SpellSectionContent = styled.p`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
`;

export const SpellTags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]};
	margin-top: ${theme.spacing[3]};
`;

export const SpellTag = styled.span`
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.muted};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
`;

export const EmptyState = styled.div`
	text-align: center;
	padding: ${theme.spacing[12]} ${theme.spacing[4]};
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.lg};
`;

export const ClearButton = styled.button`
	padding: ${theme.spacing[3]} ${theme.spacing[5]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.medium};
	font-size: ${theme.typography.fontSize.sm};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	margin: ${theme.spacing[4]} auto 0;
	display: block;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		border-color: ${theme.colors.accent.primary};
		box-shadow: ${theme.shadows.md};
	}

	&:active {
		transform: scale(0.98);
	}
`;
