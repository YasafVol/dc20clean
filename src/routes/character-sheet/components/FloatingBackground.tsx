import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../../assets/Desktop.png';

const StyledFloatingBackground = styled.div`
	/* Apply background to entire document using fixed positioning that covers all scroll areas */
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	min-width: 100vw;
	background: url(${backgroundImage}) center/cover no-repeat;
	background-size: cover;
	background-position: center center;
	background-attachment: fixed;
	z-index: -1000;
	pointer-events: none;

	/* Ensure we cover the full scrollable area */
	&::after {
		content: '';
		position: absolute;
		top: -100vh;
		left: -100vw;
		width: 300vw;
		height: 300vh;
		background: url(${backgroundImage}) center/cover no-repeat;
		background-size: cover;
		background-position: center center;
		z-index: -1;
	}
`;

const FloatingBackground: React.FC = () => {
	return <StyledFloatingBackground />;
};

export default FloatingBackground;
