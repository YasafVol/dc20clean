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

export const StyledCard = styled.div<{ $selected: boolean }>`
	border: 1px solid white;
	padding: 1.5rem;
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

export const StyledCardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	margin-bottom: 0.5rem;
`;

export const StyledAncestryIcon = styled.div`
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
	font-size: 1.8rem;
`;

export const StyledCardTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.8rem;
	font-weight: 300;
	line-height: 1.3;
	flex: 1;
	overflow-y: auto;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: none;
	word-break: normal;
	white-space: pre-line;

	/* Custom scrollbar for description */
	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: #fbbf24;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #f1bf3eff;
	}
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

export const StyledCardFooter = styled.div`
	margin-top: 0.5rem;
	display: flex;
	justify-content: flex-end;
`;

export const StyledReadMore = styled.span`
	color: #fbbf24;
	font-size: 0.85rem;
	font-weight: bold;
	cursor: pointer;
	text-decoration: underline;
	padding: 0.5rem 0.75rem;
	border-radius: 4px;
	transition: all 0.2s ease;
	display: inline-block;

	&:hover {
		color: #f59e0b;
		background: rgba(251, 191, 36, 0.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const StyledTooltip = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	color: #e5e7eb;
	padding: 2rem;
	border-radius: 12px;
	border: 3px solid white;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
	z-index: 2000;
	width: 90vw;
	max-width: 500px;
	max-height: 80vh;
	overflow-y: auto;
	font-size: 1rem;
	line-height: 1.6;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;

	/* Custom scrollbar for popup */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #1e1b4b;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb {
		background: #fbbf24;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #f1bf3eff;
	}
`;

export const StyledTooltipOverlay = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 1999;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;
`;

export const StyledTooltipHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid white;
`;

export const StyledTooltipIcon = styled.div`
	width: 60px;
	height: 60px;
	flex-shrink: 0;
	background-color: #fbbf24;
	border-radius: 50%;
	border: 2px solid #fbbf24;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2.5rem;
`;

export const StyledTooltipTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.8rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledTooltipContent = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	line-height: 1.6;
`;

export const StyledCloseHint = styled.div`
	margin-top: 1.5rem;
	padding-top: 1rem;
	border-top: 1px solid white;
	text-align: center;
	color: #9ca3af;
	font-size: 0.9rem;
	font-style: italic;
`;
