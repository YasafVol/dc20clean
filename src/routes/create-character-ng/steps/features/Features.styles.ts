import styled from 'styled-components';

export const StyledContainer = styled.div`
	width: 100%;
	padding: 2rem;
	color: var(--alabaster);
`;

export const StyledTitle = styled.h2`
	margin: 0 0 1rem 0;
	color: var(--iron);
	font-size: 2rem;
	font-weight: bold;
	text-align: center;
`;

export const StyledContent = styled.div`
	color: var(--pearl);
	max-width: 900px;
	margin: 0 auto;

	p {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.6;
	}
`;

export const StyledInstruction = styled.p`
	margin-bottom: 2rem;
	color: var(--pearl);
	font-size: 1.1rem;
`;

export const StyledNote = styled.p`
	margin-top: 1rem;
	font-size: 0.9rem;
	color: var(--iron);
`;

export const StyledEmptyMessage = styled.p`
	margin: 0;
	font-size: 1.1rem;
	color: var(--iron);
`;
