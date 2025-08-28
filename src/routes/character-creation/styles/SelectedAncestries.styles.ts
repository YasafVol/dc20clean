import styled from 'styled-components';

export const StyledOuterContainer = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 2rem;
`;

export const StyledMainTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 2.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const StyledAncestryDetails = styled.div`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 10px;
	background: transparent;
`;

export const StyledTitle = styled.h2`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	text-transform: uppercase;
	padding-bottom: 0.5rem;
`;

export const StyledSubtitle = styled.h3`
	margin: 1rem 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.2rem;
	font-weight: bold;
	border-bottom: 1px solid white;
	padding-bottom: 0.25rem;
`;

export const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const StyledListItem = styled.li`
	margin-bottom: 0.8rem;
	padding: 0.5rem;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.05);
	border-left: 1px solid #fbbf24;
`;

export const StyledLabel = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 0.8rem;
	cursor: pointer;
	color: #e5e7eb;
	font-size: 0.95rem;
	line-height: 1.4;

	&:hover {
		color: #fbbf24;
	}
`;

export const StyledCheckbox = styled.input`
	margin-top: 0.25rem;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	accent-color: #fbbf24;
	cursor: pointer;
`;
