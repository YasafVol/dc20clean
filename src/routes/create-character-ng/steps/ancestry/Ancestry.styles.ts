import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const StyledSection = styled.div`
	margin-top: 24px;
`;

export const StyledSectionTitle = styled.h3`
	font-family: 'Urbanist', sans-serif;
	font-weight: 600;
	font-size: 16px;
	color: var(--russet);
	margin-bottom: 8px;
`;

export const StyledAncestryDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const StyledDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-weight: 400;
	font-size: 14px;
	color: var(--iron);
	line-height: 1.6;
	margin: 0;
`;
