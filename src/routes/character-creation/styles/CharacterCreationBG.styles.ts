import styled from 'styled-components';
import BlackBG from '/src/assets/BlackBG.jpg';

export const CharacterCreationBG = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: url(${BlackBG}) center center no-repeat;
	background-size: cover;
	z-index: -1;
	pointer-events: none;
`;
