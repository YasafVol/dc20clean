import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: auto;
`;

export const StyledTabsContainer = styled.div`
	display: flex;
	gap: 12px;
	padding: 16px;
	background: transparent;

	/* Ensure tab buttons don't change width when counts update to avoid header jumps */
	button {
		min-width: 180px;
		white-space: nowrap;
	}
`;

export const StyledConversionButtonsContainer = styled.div`
	display: flex;
	gap: 8px;
	padding: 0 16px 16px 16px;
	flex-wrap: wrap;
`;

export const StyledTabContent = styled.div`
	padding: 24px;
	overflow-y: auto;
	max-height: 600px;
`;
