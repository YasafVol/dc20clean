import styled from 'styled-components';
import { theme } from './theme';

export const StyledPlayerNotesContainer = styled.div`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	margin-bottom: ${theme.spacing[4]};
`;

export const StyledPlayerNotesTitle = styled.div`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	text-align: center;
	margin-bottom: ${theme.spacing[4]};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const StyledNotesContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const StyledNotesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledNoteItem = styled.div`
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.tertiary};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
	}
`;

export const StyledNoteText = styled.p`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	line-height: ${theme.typography.lineHeight.relaxed};
	margin: 0 0 ${theme.spacing[2]} 0;
	word-wrap: break-word;
`;

export const StyledNoteActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.5rem;
`;

export const StyledNoteInput = styled.textarea`
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	padding: ${theme.spacing[3]};
	width: 100%;
	min-height: 60px;
	resize: vertical;
	font-family: 'Georgia', serif;
	transition: all ${theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${theme.colors.accent.primary};
		box-shadow: 0 0 0 2px var(--crystal-primary-20);
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

export const StyledAddButton = styled.button`
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background-color: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledDeleteButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid var(--danger-border);
	background-color: var(--danger-bg-light);
	color: var(--danger-border);
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	font-weight: bold;

	&:hover {
		background-color: var(--danger-bg-hover);
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledEditButton = styled.button`
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.accent.primary};
	font-size: 1rem;
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	width: 24px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledSaveButton = styled.button`
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledCancelButton = styled.button`
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.elevated};
		color: ${theme.colors.text.primary};
	}

	&:active {
		transform: translateY(1px);
	}
`;

export const StyledAddNoteSection = styled.div`
	border-top: 1px solid ${theme.colors.border.default};
	padding-top: ${theme.spacing[3]};
`;

export const StyledEmptyNotesMessage = styled.div`
	color: ${theme.colors.text.muted};
	font-style: italic;
	text-align: center;
	padding: ${theme.spacing[6]} ${theme.spacing[4]};
	border: 1px dashed ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.tertiary};
	font-size: ${theme.typography.fontSize.sm};
`;
