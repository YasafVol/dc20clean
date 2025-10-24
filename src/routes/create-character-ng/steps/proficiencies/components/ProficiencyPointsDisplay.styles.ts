import styled from 'styled-components';

export const StyledPointsContainer = styled.div`
	display: flex;
	gap: 16px;
	padding: 20px;
	background: rgba(0, 0, 0, 0.3);
	border: 2px solid var(--iron);
	border-radius: 8px;
	flex-wrap: wrap;
`;

export const StyledPointPool = styled.div`
	flex: 1;
	min-width: 200px;
	padding: 16px;
	background: var(--darkBrown);
	border: 2px solid var(--iron);
	border-radius: 6px;
`;

export const StyledPointPoolTitle = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: var(--lightGray);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 8px;
`;

export const StyledPointPoolValue = styled.div`
	font-size: 24px;
	font-weight: 700;
	color: var(--gold);
`;

export const StyledConversionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px;
	background: rgba(99, 102, 241, 0.1);
	border: 1px solid rgba(99, 102, 241, 0.3);
	border-radius: 6px;
	margin-top: 12px;
`;

export const StyledConversionsTitle = styled.div`
	font-size: 14px;
	font-weight: 600;
	color: var(--lightGray);
	text-transform: uppercase;
`;

export const StyledConversionButtons = styled.div`
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
`;

export const StyledConversionButton = styled.button`
	padding: 8px 16px;
	background: #3b82f6;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background: #2563eb;
	}

	&:disabled {
		background: #6b7280;
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const StyledResetButton = styled.button`
	padding: 8px 16px;
	background: #ef4444;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
	margin-left: auto;

	&:hover {
		background: #dc2626;
	}
`;
