import styled, { css } from 'styled-components';

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
	min-width: 320px;
	max-width: 320px;
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

// Generic class card components that can be reused for all classes
export const StyledNewClassCard = styled.button<{ $selected: boolean }>`
	border: 1px solid white;
	padding: 1.5rem 1.5rem 1.5rem 1.5rem;
	border-radius: 10px;
	background: transparent;
	cursor: pointer;
	transition: all 0s ease;
	flex: 1;
	min-width: 300px;
	max-width: 300px;
	height: 190px;
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

export const StyledNewClassHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 0.5rem;
`;

export const StyledNewClassIcon = styled.div<{
	$iconSize?: string;
	$iconOffsetX?: string;
	$iconOffsetY?: string;
}>`
	width: 45px;
	height: 45px;
	flex-shrink: 0;
	background-color: #fbbf24;
	border-radius: 50%;
	border: 2px solid #fbbf24;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	
	img {
		width: ${props => props.$iconSize || '28px'};
		height: ${props => props.$iconSize || '28px'};
		object-fit: contain;
		filter: brightness(0) saturate(100%); /* Makes the SVG black */
		transform: translate(${props => props.$iconOffsetX || '0px'}, ${props => props.$iconOffsetY || '0px'});
	}
`;

export const StyledNewClassTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledNewClassQuote = styled.div`
	margin-bottom: 0.75rem;
	font-family: 'Libre Baskerville', serif;
	font-style: italic;
	color: white;
	font-size: 0.85rem;
	line-height: 1.5;
	border-left: 2px solid #fbbf24;
	padding-left: 0.75rem;
`;

export const StyledNewClassDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.8rem;
	font-weight: 300;
	line-height: 1.3;
	flex: 1;
	max-height: 4em; /* More generous 2 lines */
	overflow: hidden;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: none;
	word-break: normal;
	white-space: pre-line;
`;
