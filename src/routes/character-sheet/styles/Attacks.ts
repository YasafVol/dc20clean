import styled from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledAttacksSection = styled.div<MobileStyledProps>`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
`;

export const StyledAttacksHeader = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledAttacksTitle = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	flex: 1;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledAddWeaponButton = styled.button<MobileStyledProps>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
		box-shadow: ${theme.shadows.md};
	}
`;

export const StyledAttacksContainer = styled.div<MobileStyledProps>`
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	overflow-x: auto;

	@media (max-width: 768px) {
		overflow-x: visible;
	}
`;

export const StyledAttacksHeaderRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: ${theme.spacing[3]};
	margin-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding-bottom: ${theme.spacing[2]};
	align-items: center;

	@media (max-width: 768px) {
		grid-template-columns: 25px 1fr 45px 40px;
		gap: 0.2rem;
		font-size: 0.7rem;

		& > *:nth-child(4),
		& > *:nth-child(5),
		& > *:nth-child(7) {
			display: none;
		}
	}
`;

export const StyledHeaderColumn = styled.span<{ align?: string; $isMobile?: boolean }>`
	font-weight: ${theme.typography.fontWeight.bold};
	text-align: ${(props) => props.align || 'left'};
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.tight};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;

	@media (max-width: 768px) {
		font-size: 0.7rem;
		&:nth-child(4),
		&:nth-child(5),
		&:nth-child(7) {
			display: none;
		}
	}
`;

export const StyledEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	font-style: italic;
	padding: ${theme.spacing[8]};
	color: ${theme.colors.text.muted};
`;

export const StyledAttackRow = styled.div<MobileStyledProps>`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: ${theme.spacing[3]};
	margin-bottom: ${theme.spacing[3]};
	align-items: center;
	padding: ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.tertiary};
	}

	@media (max-width: 768px) {
		grid-template-columns: 25px 1fr 45px 40px;
		gap: 0.2rem;
		font-size: 0.7rem;

		& > *:nth-child(4),
		& > *:nth-child(5),
		& > *:nth-child(7) {
			display: none;
		}
	}
`;

export const StyledRemoveButton = styled.button<MobileStyledProps>`
	width: 24px;
	height: 24px;
	border: 1px solid ${theme.colors.accent.danger};
	border-radius: ${theme.borderRadius.md};
	background-color: ${theme.colors.bg.tertiary};
	color: ${theme.colors.accent.danger};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all ${theme.transitions.fast};

	&:hover {
		background-color: ${theme.colors.accent.danger};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}
`;

export const StyledWeaponSelect = styled.select<MobileStyledProps>`
	padding: ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: all ${theme.transitions.fast};

	&:hover,
	&:focus {
		border-color: ${theme.colors.accent.primary};
		outline: none;
	}

	@media (max-width: 768px) {
		font-size: 0.6rem;
		padding: 0.1rem;
	}
`;

export const StyledDamageCell = styled.div<{ color?: string; $isMobile?: boolean }>`
	text-align: center;
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${(props) => props.color || theme.colors.accent.warning};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		color: ${theme.colors.accent.primary};
		transform: scale(1.05);
	}
`;

export const StyledInfoIcon = styled.span<MobileStyledProps>`
	background: transparent;
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: 50%;
	width: 20px;
	height: 20px;
	cursor: pointer;
	font-style: italic;
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}
`;

export const StyledDamageTypeCell = styled.div<MobileStyledProps>`
	text-align: center;
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	color: ${theme.colors.text.primary};
	transition: all ${theme.transitions.fast};

	&:hover {
		color: ${theme.colors.accent.primary};
	}
`;
