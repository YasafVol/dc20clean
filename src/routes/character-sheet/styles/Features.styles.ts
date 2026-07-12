import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledFeaturesContainer = styled.div<MobileStyledProps>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
	height: 762px;
	overflow-y: auto;
`;

export const StyledFeaturesTitle = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	margin-bottom: ${theme.spacing[4]};
	font-family: 'Cinzel', 'Georgia', serif;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledFeatureCategory = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledFeatureCategoryTitle = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${theme.colors.accent.primary};
	margin-bottom: ${theme.spacing[2]};
	padding-bottom: ${theme.spacing[2]};
	border-bottom: 1px solid ${theme.colors.border.default};
	font-family: 'Urbanist', sans-serif;
`;

export const StyledFeatureGrid = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const StyledFeatureItem = styled.button<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	color: inherit;
	font: inherit;
	text-align: left;
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
		border-color: ${theme.colors.accent.primary};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.accent.primary};
		outline-offset: 2px;
	}
`;

export const StyledFeatureName = styled.span<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.medium};
	flex: 1;
`;

export const StyledNoFeaturesMessage = styled.div<MobileStyledProps>`
	text-align: center;
	font-style: italic;
	padding: ${theme.spacing[4]};
	color: ${theme.colors.text.muted};
`;

export const StyledFeaturesContent = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.primary};
`;
