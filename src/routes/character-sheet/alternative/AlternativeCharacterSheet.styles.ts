import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media, theme } from '../styles/theme';

export const SheetPage = styled.main`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
	padding: ${theme.spacing[8]};

	${media.tabletDown} {
		padding: 5.5rem ${theme.spacing[4]} ${theme.spacing[4]};
	}
`;

export const SheetContent = styled.div`
	width: min(100%, 1400px);
	margin: 0 auto;
	display: grid;
	gap: ${theme.spacing[6]};
`;

export const SheetHeader = styled.header`
	position: relative;
	display: grid;
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: center;
	gap: ${theme.spacing[5]};
	padding: ${theme.spacing[6]};
	padding-right: 14rem;
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};

	${media.tabletDown} {
		grid-template-columns: auto minmax(0, 1fr);
		padding: ${theme.spacing[4]};
	}
`;

export const Identity = styled.div`
	min-width: 0;
`;

export const CharacterName = styled.h1`
	margin: 0 0 ${theme.spacing[2]};
	color: ${theme.colors.text.primary};
	font-size: clamp(1.5rem, 3vw, ${theme.typography.fontSize['4xl']});
	line-height: ${theme.typography.lineHeight.tight};
	overflow-wrap: anywhere;
`;

export const CharacterMeta = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[2]} ${theme.spacing[4]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.base};
`;

export const MetaLink = styled(Link)`
	color: inherit;
	text-decoration-color: ${theme.colors.border.default};
	text-underline-offset: 0.2em;

	&:hover,
	&:focus-visible {
		color: ${theme.colors.accent.primary};
		text-decoration-color: currentColor;
	}
`;

export const HeaderActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[3]};

	${media.tabletDown} {
		grid-column: 1 / -1;
		justify-content: flex-end;
	}
`;

export const SheetButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	min-height: 42px;
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font: inherit;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover:not(:disabled),
	&:focus-visible {
		background: ${theme.colors.accent.primary};
		border-color: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const ActionMenu = styled.details`
	position: relative;

	& > summary {
		list-style: none;
	}

	& > summary::-webkit-details-marker {
		display: none;
	}
`;

export const MenuTrigger = styled.summary`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 44px;
	min-height: 42px;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.lg};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover,
	&:focus-visible {
		background: ${theme.colors.accent.primary};
		border-color: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}
`;

export const ExportTrigger = styled(MenuTrigger)`
	min-width: auto;
	padding-inline: ${theme.spacing[4]};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
`;

export const MenuPanel = styled.nav<{ $align?: 'left' | 'right' }>`
	position: absolute;
	top: calc(100% + ${theme.spacing[2]});
	${({ $align = 'left' }) => ($align === 'right' ? 'right: 0;' : 'left: 0;')}
	z-index: ${theme.zIndex.dropdown};
	display: grid;
	gap: ${theme.spacing[1]};
	width: max-content;
	min-width: 210px;
	max-height: min(70vh, 560px);
	overflow-y: auto;
	padding: ${theme.spacing[2]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	box-shadow: ${theme.shadows.xl};
`;

export const MenuLink = styled(Link)`
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.primary};
	text-decoration: none;
	white-space: nowrap;

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.accent.primary};
	}
`;

export const MenuAction = styled.button`
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	background: transparent;
	border: 0;
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.primary};
	font: inherit;
	text-align: left;
	white-space: nowrap;
	cursor: pointer;

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.accent.primary};
	}
`;

export const ResourceSection = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
	gap: ${theme.spacing[3]};
	padding: ${theme.spacing[6]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};

	${media.mobile} {
		grid-template-columns: 1fr;
		padding: ${theme.spacing[4]};
	}
`;

export const ResourceCardSlot = styled.div`
	min-width: 0;
	height: 100%;

	& > div {
		height: 100%;
	}
`;

export const PageMessage = styled.div<{ $error?: boolean }>`
	width: min(100%, 680px);
	margin: 20vh auto 0;
	padding: ${theme.spacing[6]};
	background: ${theme.colors.bg.elevated};
	border: 1px solid
		${({ $error }) => ($error ? theme.colors.accent.danger : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.lg};
	color: ${({ $error }) => ($error ? theme.colors.accent.danger : theme.colors.text.secondary)};
	text-align: center;
`;
