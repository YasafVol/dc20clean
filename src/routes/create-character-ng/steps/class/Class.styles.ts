import styled from 'styled-components';

export const StyledContainer = styled.div`
	width: 100%;
`;

export const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledClassDetails = styled.div`
	padding: 1rem 0;
`;

export const StyledQuote = styled.div`
	font-style: italic;
	color: var(--cornflower);
	margin-bottom: 0.75rem;
	border-left: 2px solid var(--cornflower);
	padding-left: 0.75rem;
`;

export const StyledDescription = styled.p`
	color: var(--pearl);
	line-height: 1.5;
	margin: 0;
`;
