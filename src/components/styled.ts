import styled from 'styled-components';
// Import static assets

import mainBgImage from '../assets/Main.jpg';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: url('${mainBgImage}') center/cover no-repeat;
	position: relative;
`;

export const StyledTitle = styled.h1`
	margin-bottom: 0.2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 3rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	letter-spacing: 2px;
	margin-top: 16rem;
`;

export const StyledSubtitle = styled.p`
	margin-top: 0rem;
	margin-bottom: 2rem;
	color: #e5e7eb;
	text-align: center;
	font-size: 1.3rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	max-width: 600px;
	line-height: 1.6;
`;

export const StyledMenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
	max-width: 900px;
	width: 100%;

	/* First row: 2 items, Second row: 3 items */
	& > *:nth-child(n + 3) {
		/* Items 3, 4, 5 go in second row */
	}

	/* Make 5 items fit: 2 on top, 3 on bottom */
	@media (min-width: 600px) {
		grid-template-columns: repeat(6, 1fr);

		& > *:nth-child(1) {
			grid-column: 1 / 4;
		}
		& > *:nth-child(2) {
			grid-column: 4 / 7;
		}
		& > *:nth-child(3) {
			grid-column: 1 / 3;
		}
		& > *:nth-child(4) {
			grid-column: 3 / 5;
		}
		& > *:nth-child(5) {
			grid-column: 5 / 7;
		}
	}

	@media (max-width: 599px) {
		grid-template-columns: 1fr;
	}
`;

export const StyledMenuCard = styled.button`
	border: 1px solid #ffffff;
	padding: 1.5rem 2rem;
	border-radius: 8px;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: none;
	backdrop-filter: none;
	height: 120px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	&:hover {
		border-color: #fbbf24;
	}
`;

export const StyledIcon = styled.div`
	font-size: 3rem;
	background: transparent;
	border-radius: 0;
	width: auto;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	box-shadow: none;
	transition: all 0.3s ease;
	color: #e5e7eb;
	font-weight: 300;

	${StyledMenuCard}:hover & {
		color: #fbbf24;
		transform: scale(1.1);
	}
`;

export const StyledCardTitle = styled.h2`
	margin: 0 0 0.3rem 0;
	color: #fbbf24;
	font-size: 1.6rem;
	font-weight: bold;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;
	text-align: left;
	letter-spacing: 1px;

	${StyledMenuCard}:hover & {
		color: #f59e0b;
	}
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	font-family: 'Urbanist', 'Georgia', 'Times New Roman', serif;
	font-weight: 400;
	line-height: 1.3;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	opacity: 0.9;
	text-align: left;
	letter-spacing: 1px;
`;

export const StyledTextContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
`;
