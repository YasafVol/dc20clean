import styled from 'styled-components';

export const StyledRightResourcesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledRightResourcesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledRightResourceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const StyledRightResourceLabel = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledRightResourceControls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const StyledRightResourceInput = styled.input`
	width: 40px;
	text-align: center;
	border: 1px solid #8b4513;
	border-radius: 4px;
	padding: 0.2rem;
	font-size: 0.9rem;
	color: #8b4513;

	&:focus {
		outline: none;
		border-color: #654321;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
	}
`;

export const StyledRightResourceMax = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;
