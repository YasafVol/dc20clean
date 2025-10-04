import styled from 'styled-components';

export const StyledChoiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;
	padding: 1.5rem;
	background: rgba(255, 255, 255, 0.02);
	border: 1px solid var(--iron);
	border-radius: 4px;
`;

export const StyledChoicePrompt = styled.p`
	margin: 0 0 1rem 0;
	padding-bottom: 1rem;
	border-bottom: 1px solid var(--iron);
	font-size: 16px;
	font-weight: 600;
	color: var(--russet);
`;

export const StyledChoiceOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledChoiceOption = styled.div<{ $disabled?: boolean }>`
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 0.5rem 0;
	opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const StyledSelectionCounter = styled.p`
	margin: 8px 0 0 0;
	font-size: 12px;
	font-style: italic;
	color: var(--iron);
`;
