import styled from 'styled-components';
import { media, theme } from './theme';

export const Composer = styled.div`
	min-width: 0;
`;

export const ComposerText = styled.p`
	margin: ${theme.spacing[3]} 0;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const ComposerChoiceGrid = styled.div`
	display: grid;
	gap: ${theme.spacing[2]};
	grid-template-columns: repeat(2, minmax(0, 1fr));

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const ComposerDamageChoiceGrid = styled.div`
	display: grid;
	gap: ${theme.spacing[2]};
	grid-template-columns: repeat(3, minmax(0, 1fr));

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const ComposerChoice = styled.button<{ $selected: boolean }>`
	padding: ${theme.spacing[3]};
	border: 1px solid
		${({ $selected }) => ($selected ? theme.colors.accent.primary : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	background: ${({ $selected }) =>
		$selected ? theme.colors.bg.tertiary : theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font: inherit;
	text-align: left;
	cursor: pointer;

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 1px;
	}
`;

export const ComposerChoiceTitle = styled.span`
	display: block;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const ComposerChoiceMeta = styled.span`
	display: block;
	margin-top: ${theme.spacing[1]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	line-height: ${theme.typography.lineHeight.normal};
`;

export const ComposerChoiceDescription = styled.span`
	display: block;
	margin-top: ${theme.spacing[2]};
	color: ${theme.colors.text.secondary};
	font-size: 0.8125rem;
	line-height: ${theme.typography.lineHeight.normal};
`;

export const ComposerSection = styled.div`
	margin-top: ${theme.spacing[4]};
`;

export const ComposerLabel = styled.label`
	display: block;
	margin-bottom: ${theme.spacing[2]};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const ComposerInput = styled.input`
	width: 100%;
	min-height: 42px;
	box-sizing: border-box;
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font: inherit;

	&:focus-visible {
		border-color: ${theme.colors.border.focus};
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 1px;
	}
`;

export const ComposerPoints = styled.div<{ $invalid: boolean }>`
	display: inline-flex;
	margin-bottom: ${theme.spacing[3]};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	border: 1px solid
		${({ $invalid }) => ($invalid ? theme.colors.accent.danger : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	color: ${({ $invalid }) => ($invalid ? theme.colors.accent.danger : theme.colors.accent.success)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const ComposerPropertyList = styled.div`
	display: flex;
	gap: ${theme.spacing[2]};
	flex-direction: column;
`;

export const ComposerError = styled.p`
	margin: ${theme.spacing[2]} 0 0;
	color: ${theme.colors.accent.danger};
	font-size: ${theme.typography.fontSize.xs};
`;

export const ComposerAutomatic = styled.div`
	display: flex;
	margin-bottom: ${theme.spacing[4]};
	padding: ${theme.spacing[3]};
	border-left: 3px solid ${theme.colors.accent.primary};
	background: ${theme.colors.bg.primary};
	align-items: center;
	gap: ${theme.spacing[2]};
	flex-wrap: wrap;
`;

export const ComposerAutomaticLabel = styled.span`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
`;

export const ComposerBadge = styled.span`
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.full};
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
`;

export const ComposerInlineAction = styled.button`
	min-height: 32px;
	margin-left: auto;
	padding: ${theme.spacing[1]} ${theme.spacing[3]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: transparent;
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 1px;
	}

	${media.mobile} {
		width: 100%;
		margin-left: 0;
	}
`;

export const ComposerReviewGrid = styled.dl`
	display: grid;
	margin: ${theme.spacing[4]} 0 0;
	gap: ${theme.spacing[2]};
	grid-template-columns: repeat(2, minmax(0, 1fr));

	${media.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const ComposerReviewItem = styled.div`
	padding: ${theme.spacing[3]};
	border-left: 2px solid ${theme.colors.border.default};

	dt {
		margin-bottom: ${theme.spacing[1]};
		color: ${theme.colors.text.muted};
		font-size: ${theme.typography.fontSize.xs};
	}

	dd {
		margin: 0;
		color: ${theme.colors.text.primary};
		font-size: ${theme.typography.fontSize.sm};
	}
`;
