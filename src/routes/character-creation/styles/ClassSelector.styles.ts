import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: none;
	padding: 1.5rem;
	border-radius: 12px;
	background: transparent;
	margin-top: 0;
`;

export const StyledTitle = styled.h2`
	margin-top: -1rem;
	color: #fbbf24;
	font-size: 2.4rem;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.button<{ $selected: boolean }>`
	border: 1px solid white;
	padding: 1.5rem;
	border-radius: 10px;
	background: transparent;
	cursor: pointer;
	transition: all 0s ease;
	flex: 1;
	min-width: 280px;
	max-width: 280px;
	height: 200px;
	text-align: left;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&:hover {
		border-color: #fbbf24;
	}

	${(props) =>
		props.$selected &&
		`
    border: 2px solid #fbbf24;
  `}
`;

export const StyledCardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const StyledClassIcon = styled.div`
	font-size: 2rem;
	flex-shrink: 0;
	background: transparent;
	border: 1px solid white;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledCardTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.9rem;
	font-weight: 300;
	line-height: 1.3;
	flex: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	position: relative;
	word-wrap: break-word;
	hyphens: auto;
`;
