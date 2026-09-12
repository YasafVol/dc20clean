import styled, { css } from 'styled-components';
import { theme } from './theme';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledAttacksSection = styled.div<MobileStyledProps & { $embedded?: boolean }>`
	border: ${({ $embedded }) => ($embedded ? 'none' : `1px solid ${theme.colors.border.default}`)};
	border-radius: ${({ $embedded }) => ($embedded ? 0 : theme.borderRadius.lg)};
	padding: ${({ $embedded }) => ($embedded ? `${theme.spacing[2]} 0 0` : theme.spacing[4])};
	background: ${({ $embedded }) => ($embedded ? 'transparent' : theme.colors.bg.secondary)};
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

const attackGrid = css`
	display: grid;
	grid-template-columns:
		minmax(220px, 1fr)
		repeat(3, minmax(72px, 88px))
		minmax(110px, 140px)
		72px;
	column-gap: ${theme.spacing[3]};
	align-items: center;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};

	@media (max-width: 768px) {
		grid-template-columns: minmax(150px, 1fr) 48px minmax(52px, 72px) 72px;
		column-gap: ${theme.spacing[1]};
		font-size: 0.7rem;

		& > *:nth-child(3),
		& > *:nth-child(4) {
			display: none;
		}
	}
`;

export const StyledAttacksHeaderRow = styled.div<MobileStyledProps>`
	${attackGrid}
	margin-bottom: ${theme.spacing[3]};
	border-bottom: 1px solid ${theme.colors.border.default};
`;

export const StyledHeaderColumn = styled.span<{ $align?: string; $isMobile?: boolean }>`
	font-weight: ${theme.typography.fontWeight.bold};
	text-align: ${(props) => props.$align || 'left'};
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.tight};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;

	@media (max-width: 768px) {
		font-size: 0.7rem;
	}
`;

export const StyledEmptyState = styled.div<MobileStyledProps>`
	text-align: center;
	font-style: italic;
	padding: ${theme.spacing[8]};
	color: ${theme.colors.text.muted};
`;

export const StyledAttackRow = styled.div<MobileStyledProps & { $derived?: boolean }>`
	${attackGrid}
	min-height: 44px;
	border-bottom: 1px solid ${theme.colors.border.subtle};
	background: ${({ $derived }) => ($derived ? theme.colors.bg.primary : 'transparent')};
	transition: background-color ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.tertiary};
	}

	&:last-child {
		border-bottom: none;
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

export const StyledWeaponName = styled.div`
	min-width: 0;
	overflow: hidden;
	color: ${theme.colors.text.primary};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const StyledWeaponMeta = styled.div`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.normal};
	line-height: ${theme.typography.lineHeight.tight};
`;

export const StyledAttackIdentity = styled.div`
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: ${theme.spacing[1]};
`;

export const StyledAttackProperties = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
`;

export const StyledAttackProperty = styled.span`
	width: fit-content;
	padding: 1px ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.accent.primary};
	background: ${theme.colors.bg.tertiary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	line-height: ${theme.typography.lineHeight.tight};
`;

export const StyledAttackTraitNotes = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.tight};

	strong {
		color: ${theme.colors.text.secondary};
		font-weight: ${theme.typography.fontWeight.semibold};
	}
`;

export const StyledDamageCell = styled.div<{
	$tone?: 'hit' | 'heavy' | 'brutal';
	$isMobile?: boolean;
}>`
	text-align: center;
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${({ $tone }) =>
		$tone === 'heavy'
			? theme.colors.accent.warning
			: $tone === 'brutal'
				? theme.colors.accent.danger
				: theme.colors.text.primary};
	font-variant-numeric: tabular-nums;
`;

export const StyledInfoButton = styled.button<MobileStyledProps>`
	background: transparent;
	color: ${theme.colors.accent.primary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: 50%;
	width: 24px;
	height: 24px;
	padding: 0;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	&:hover,
	&:focus-visible {
		background: ${theme.colors.accent.primaryAlpha20};
		outline: none;
	}
`;

export const StyledDamageTypeCell = styled.div<MobileStyledProps>`
	text-align: center;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	color: ${theme.colors.text.secondary};
	white-space: nowrap;
`;

export const StyledAttackActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.spacing[1]};
	min-width: 0;
`;
