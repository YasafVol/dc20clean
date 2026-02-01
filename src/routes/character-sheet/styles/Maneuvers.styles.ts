import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledManeuversSection = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[6]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
`;

export const StyledManeuversHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[4]};
	padding-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
`;

export const StyledManeuversTitle = styled.h3<MobileStyledProps>`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledManeuversControls = styled.div<MobileStyledProps>`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

export const StyledAddManeuverButton = styled.button<MobileStyledProps>`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
		box-shadow: ${theme.shadows.md};
	}
`;

export const StyledManeuversContainer = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledManeuversHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledManeuverHeaderColumn = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: ${theme.colors.text.secondary};
`;

export const StyledManeuverEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	padding: ${theme.spacing[6]};
	color: ${theme.colors.text.muted};
	font-style: italic;
	font-size: ${theme.typography.fontSize.sm};
`;

export const StyledManeuverRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	align-items: flex-start;
	min-height: 60px;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
		border-color: ${theme.colors.accent.primary};
	}
`;

export const StyledManeuverCell = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	display: flex;
	align-items: flex-start;
	justify-content: center;
	text-align: center;
	word-wrap: break-word;
	line-height: ${theme.typography.lineHeight.tight};
`;

export const StyledManeuverNameCell = styled(StyledManeuverCell)<MobileStyledProps>`
	justify-content: flex-start;
	text-align: left;
	font-weight: 500;
`;

export const StyledManeuverDescriptionCell = styled(StyledManeuverCell)<MobileStyledProps>`
	justify-content: flex-start;
	text-align: left;
	line-height: ${theme.typography.lineHeight.relaxed};
`;

export const StyledManeuverSelect = styled.select<MobileStyledProps>`
	width: 100%;
	padding: ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	max-width: 100%;
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

export const StyledManeuverTypeFilter = styled.select<MobileStyledProps>`
	padding: ${theme.spacing[2]} ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	min-width: 120px;
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

export const StyledManeuverRemoveButton = styled.button<MobileStyledProps>`
	width: 24px;
	height: 24px;
	border: 1px solid ${theme.colors.accent.danger};
	border-radius: ${theme.borderRadius.sm};
	background-color: ${theme.colors.bg.secondary};
	color: ${theme.colors.accent.danger};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s;

	&:hover {
		background-color: ${theme.colors.accent.danger};
		color: ${theme.colors.text.inverse};
		transform: scale(1.05);
	}
`;

export const StyledExpandableDescription = styled.div<MobileStyledProps>`
	width: 100%;
`;

export const StyledDescriptionToggle = styled.span<MobileStyledProps>`
	cursor: pointer;
	color: ${theme.colors.accent.primary};
	display: flex;
	align-items: flex-start;
	gap: ${theme.spacing[1]};
	line-height: ${theme.typography.lineHeight.relaxed};

	&:hover {
		color: ${theme.colors.accent.secondary};
	}
`;

export const StyledExpandedDescription = styled.div<MobileStyledProps>`
	margin-top: ${theme.spacing[2]};
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.primary};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.secondary};
	line-height: ${theme.typography.lineHeight.relaxed};
	border-left: 3px solid ${theme.colors.accent.primary};
`;

export const StyledClickableManeuverName = styled.span<MobileStyledProps>`
	cursor: pointer;
	color: ${theme.colors.accent.primary};
	font-weight: ${theme.typography.fontWeight.medium};

	&:hover {
		color: ${theme.colors.accent.secondary};
		text-decoration: underline;
	}
`;

// Expandable Description Section Components
export const StyledManeuverDescriptionContainer = styled.div<MobileStyledProps>`
	background: ${theme.colors.bg.elevated};
	padding: ${theme.spacing[4]};
	border: 1px solid ${theme.colors.border.default};
	border-top: none;
	border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
	margin-bottom: ${theme.spacing[2]};
`;

export const StyledManeuverDescriptionHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[3]};
`;

export const StyledManeuverDescriptionLabel = styled.strong<MobileStyledProps>`
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
`;

export const StyledManeuverToggleButton = styled.button<MobileStyledProps>`
	background: transparent;
	border: 1px solid ${theme.colors.accent.primary};
	color: ${theme.colors.accent.primary};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.sm};
	cursor: pointer;
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.medium};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}
`;

export const StyledManeuverDescriptionText = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[4]};
	line-height: ${theme.typography.lineHeight.relaxed};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};

	strong {
		color: ${theme.colors.accent.primary};
	}
`;

export const StyledManeuverMetaInfo = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[2]};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};

	strong {
		color: ${theme.colors.accent.primary};
		font-weight: ${theme.typography.fontWeight.semibold};
	}
`;

export const StyledManeuverDescriptionCollapsed = styled.div<MobileStyledProps>`
	text-align: center;
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-top: none;
	border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
	margin-bottom: ${theme.spacing[2]};
`;

// Clickable maneuver name in read-only mode
export const StyledClickableNameCell = styled(StyledManeuverNameCell)<MobileStyledProps>`
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	cursor: pointer;

	&:hover {
		color: ${theme.colors.accent.primary};
	}
`;

// Small timing cell variant
export const StyledTimingCell = styled(StyledManeuverCell)<MobileStyledProps>`
	font-size: 0.7rem;
`;
