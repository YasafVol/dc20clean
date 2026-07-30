import styled from 'styled-components';
import { media, theme } from '../styles/theme';

export const TabbedContent = styled.section`
	--delete-button-hover-transform: none;
	--delete-button-transition: none;

	overflow: hidden;
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};
`;

export const TabList = styled.div`
	display: flex;
	overflow-x: auto;
	background: ${theme.colors.bg.secondary};
	border-bottom: 1px solid ${theme.colors.border.default};
	scrollbar-width: thin;
	scrollbar-color: ${theme.colors.accent.primary} transparent;

	&::-webkit-scrollbar {
		height: 4px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${theme.colors.accent.primary};
		border-radius: ${theme.borderRadius.full};
	}
`;

export const TabButton = styled.button<{ $active: boolean }>`
	position: relative;
	display: inline-flex;
	flex: 1 0 auto;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	min-height: 52px;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: ${({ $active }) => ($active ? theme.colors.crystal.primaryAlpha10 : 'transparent')};
	border: 0;
	border-right: 1px solid ${theme.colors.border.default};
	color: ${({ $active }) => ($active ? theme.colors.accent.primary : theme.colors.text.primary)};
	font: inherit;
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	white-space: nowrap;
	cursor: pointer;
	transition:
		background ${theme.transitions.fast},
		color ${theme.transitions.fast},
		box-shadow ${theme.transitions.fast};
	box-shadow: ${({ $active }) =>
		$active ? `inset 0 0 0 1px ${theme.colors.crystal.primaryAlpha30}` : 'none'};

	&:last-child {
		border-right: 0;
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 3px;
		background: ${({ $active }) => ($active ? theme.colors.accent.primary : 'transparent')};
	}

	&:hover,
	&:focus-visible {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}

	${media.tabletDown} {
		flex: 0 0 auto;
	}
`;

export const TabBadge = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 1.25rem;
	height: 1.25rem;
	padding: 0 ${theme.spacing[1]};
	background: ${theme.colors.accent.danger};
	border-radius: ${theme.borderRadius.full};
	color: ${theme.colors.text.inverse};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
`;

export const TabPanel = styled.div`
	padding: ${theme.spacing[6]};
	overflow-x: hidden;

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
`;
