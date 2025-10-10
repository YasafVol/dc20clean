import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: auto;
`;

export const StyledContent = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--darkBrown);
	border: 2px solid var(--iron);
	border-radius: 12px;
	overflow: hidden;
	margin-top: 24px;
`;
