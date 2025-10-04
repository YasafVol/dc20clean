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
	color: var(--iron);
	margin-bottom: 0.75rem;
	border-left: 2px solid var(--iron);
	padding-left: 0.75rem;
`;

export const StyledDescription = styled.p`
	color: var(--iron);
	line-height: 1.5;
	margin: 0;
`;

export const StyledClassHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`;

export const StyledClassIcon = styled.div`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;
