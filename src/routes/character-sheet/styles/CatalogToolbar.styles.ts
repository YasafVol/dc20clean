import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from './theme';

export const CatalogToolbarContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[3]};
	width: 100%;
	min-width: 0;
	flex-wrap: wrap;
`;

const toolbarControl = `
	min-height: 2.25rem;
	border-radius: ${theme.borderRadius.md};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	transition: all ${theme.transitions.fast};
`;

export const CatalogReferenceLink = styled(Link)`
	${toolbarControl}
	display: inline-flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.accent.warningAlpha40};
	color: ${theme.colors.accent.warning};
	text-decoration: none;
	white-space: nowrap;

	&:hover {
		border-color: ${theme.colors.accent.warning};
		background: ${theme.colors.accent.warningAlpha10};
	}
`;

export const CatalogFilterLabel = styled.label`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	white-space: nowrap;
	min-width: min(17rem, 100%);
`;

export const CatalogFilter = styled.select`
	${toolbarControl}
	min-width: 10rem;
	max-width: 100%;
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	flex: 1 1 10rem;

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}
`;

export const CatalogToolbarSpacer = styled.span`
	flex: 1 1 auto;
`;

export const CatalogDisplayControls = styled.div`
	display: inline-flex;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	overflow: hidden;
`;

export const CatalogUtilityButton = styled.button`
	${toolbarControl}
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[1]};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 0;
	border-right: 1px solid ${theme.colors.border.default};
	border-radius: 0;
	background: ${theme.colors.bg.elevated};
	color: ${theme.colors.text.secondary};
	cursor: pointer;
	white-space: nowrap;

	&:last-child {
		border-right: 0;
	}

	&:hover {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}

	&:focus-visible {
		position: relative;
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: -2px;
	}
`;

export const CatalogAddButton = styled.button`
	${toolbarControl}
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[1]};
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.accent.primary};
	background: ${theme.colors.accent.infoAlpha20};
	color: ${theme.colors.accent.primary};
	cursor: pointer;
	white-space: nowrap;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}

	@container sheet-tabs (max-width: 32rem) {
		flex: 1 1 100%;
	}
`;
