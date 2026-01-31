import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledSpellsSection = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
`;

export const StyledSpellsHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${theme.spacing[4]};
	padding-bottom: ${theme.spacing[2]};
	border-bottom: 1px solid ${theme.colors.border.default};
`;

export const StyledSpellsTitle = styled.h3<MobileStyledProps>`
	margin: 0;
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	font-family: 'Cinzel', 'Georgia', serif;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledSpellsControls = styled.div<MobileStyledProps>`
	display: flex;
	gap: ${theme.spacing[2]};
	align-items: center;
`;

export const StyledAddSpellButton = styled.button<MobileStyledProps>`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.md};
	cursor: pointer;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
	}
`;

export const StyledSpellsContainer = styled.div<MobileStyledProps>`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const StyledSpellsHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.accent.primary};
`;

export const StyledHeaderColumn = styled.div<MobileStyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const StyledEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	padding: ${theme.spacing[4]};
	color: ${theme.colors.text.muted};
	font-style: italic;
`;

export const StyledSpellRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 0.8fr 0.8fr 1fr 0.8fr;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	background: ${theme.colors.bg.primary};
	align-items: center;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
		border-color: ${theme.colors.accent.primary};
	}
`;

export const StyledRemoveButton = styled.button<MobileStyledProps>`
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

export const StyledSpellSelect = styled.select<MobileStyledProps>`
	width: 100%;
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	option {
		background: ${theme.colors.bg.primary};
		color: ${theme.colors.text.primary};
	}
`;

export const StyledSchoolFilter = styled.select<MobileStyledProps>`
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.sm};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	option {
		background: ${theme.colors.bg.primary};
		color: ${theme.colors.text.primary};
	}
`;

export const StyledSpellCell = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

interface BoldSpellCellProps extends MobileStyledProps {
	$boldMobile?: boolean;
}

export const StyledBoldSpellCell = styled(StyledSpellCell)<BoldSpellCellProps>`
	font-weight: bold;
	color: ${(props) => (props$boldMobile && props.$isMobile ? '#f5d020' : '#2c3e50')};
`;

export const StyledPreparedCheckbox = styled.input`
	width: 16px;
	height: 16px;
	cursor: pointer;
`;

export const StyledNotesInput = styled.input`
	width: 100%;
	padding: ${theme.spacing[1]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}
`;

export const StyledInfoIcon = styled.span`
	background: transparent;
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: 50%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	font-style: italic;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s;
	flex-shrink: 0;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}
`;

// Additional styled components for spell descriptions
export const StyledFilterLabel = styled.label<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.secondary};
	margin-right: ${theme.spacing[2]};
`;

export const StyledSpellDescriptionContainer = styled.div<MobileStyledProps>`
	color: ${theme.colors.text.primary};
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-top: none;
	border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
	margin-top: -${theme.spacing[1]};
`;

export const StyledSpellDescriptionHeader = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.accent.primary};
	margin-bottom: ${theme.spacing[2]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
`;

export const StyledSpellDescriptionContent = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	line-height: ${theme.typography.lineHeight.relaxed};

	strong {
		color: ${theme.colors.accent.primary};
		font-weight: ${theme.typography.fontWeight.semibold};
	}
`;

export const StyledSpellEffect = styled.div<MobileStyledProps>`
	margin-bottom: ${theme.spacing[2]};
`;

export const StyledSpellEnhancement = styled.div<MobileStyledProps>`
	margin-top: ${theme.spacing[2]};
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.tertiary};
	border-radius: ${theme.borderRadius.md};
	border: 1px solid ${theme.colors.border.default};

	strong {
		color: ${theme.colors.accent.primary};
	}
`;

export const StyledSpellToggleContainer = styled.div<MobileStyledProps>`
	padding: ${theme.spacing[2]};
	text-align: center;
	border-top: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.secondary};
	border-radius: 0 0 ${theme.borderRadius.md} ${theme.borderRadius.md};
`;

export const StyledSpellToggleButton = styled.button<MobileStyledProps>`
	background: transparent;
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.sm};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.xs};
	cursor: pointer;
	color: ${theme.colors.accent.primary};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}
`;
