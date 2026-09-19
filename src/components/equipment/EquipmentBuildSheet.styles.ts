import styled from 'styled-components';
import { media, theme } from '../../routes/character-sheet/styles/theme';

export const BuildSheet = styled.div`
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

export const BuildSheetSection = styled.section<{ $active: boolean }>`
	border: 1px solid
		${({ $active }) => ($active ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.lg};
	background: ${theme.colors.bg.secondary};
	overflow: hidden;
`;

export const BuildSheetTrigger = styled.button`
	display: grid;
	width: 100%;
	min-height: 52px;
	box-sizing: border-box;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border: 0;
	background: transparent;
	color: ${theme.colors.text.primary};
	font: inherit;
	text-align: left;
	cursor: pointer;
	grid-template-columns: auto minmax(0, 1fr) auto;
	align-items: center;
	gap: ${theme.spacing[3]};

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: -2px;
	}
`;

export const BuildSheetNumber = styled.span<{ $complete: boolean }>`
	display: grid;
	width: 28px;
	height: 28px;
	border: 1px solid
		${({ $complete }) => ($complete ? theme.colors.accent.success : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.full};
	color: ${({ $complete }) =>
		$complete ? theme.colors.accent.success : theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	place-items: center;
`;

export const BuildSheetHeading = styled.span`
	flex: 0 0 auto;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const BuildSheetHeadingRow = styled.span`
	display: flex;
	min-width: 0;
	align-items: baseline;
	gap: ${theme.spacing[3]};

	${media.mobile} {
		align-items: flex-start;
		flex-direction: column;
		gap: ${theme.spacing[1]};
	}
`;

export const BuildSheetGuidance = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: 0.8125rem;
	font-weight: ${theme.typography.fontWeight.normal};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const BuildSheetSummary = styled.span`
	display: block;
	min-width: 0;
	margin-top: 2px;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${media.mobile} {
		white-space: normal;
	}
`;

export const BuildSheetChevron = styled.span<{ $active: boolean }>`
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
	transform: rotate(${({ $active }) => ($active ? '180deg' : '0deg')});
	transition: transform ${theme.transitions.fast};
`;

export const BuildSheetPanel = styled.div`
	padding: 0 ${theme.spacing[4]} ${theme.spacing[4]};
	border-top: 1px solid ${theme.colors.border.default};

	${media.mobile} {
		padding: 0 ${theme.spacing[3]} ${theme.spacing[3]};
	}
`;
