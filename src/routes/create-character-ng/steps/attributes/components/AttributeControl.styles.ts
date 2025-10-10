import styled from 'styled-components';

export const StyledAttributeRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px 32px;
	border-bottom: 1px solid var(--iron);

	&:last-child {
		border-bottom: none;
	}
`;

export const StyledAttributeLabel = styled.h3`
	font-family: 'Urbanist', sans-serif;
	font-weight: 600;
	font-size: 20px;
	color: var(--russet);
	margin: 0;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
`;

export const StyledAttributeValue = styled.span`
	font-family: 'Urbanist', sans-serif;
	font-weight: 700;
	font-size: 32px;
	color: var(--iron);
	min-width: 60px;
	text-align: center;
`;
