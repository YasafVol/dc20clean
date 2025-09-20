import styled from 'styled-components';
import BlackBG from '/src/assets/BlackBG.jpg';
import frameBackground2 from '/src/assets/dc20-ng/framebackground2.png';

// Main page container with full screen background
export const StyledPageContainer = styled.div`
	min-height: 100vh;
	background: url(${BlackBG}) center center no-repeat;
	background-size: cover;
	position: relative;
	display: flex;
	flex-direction: column;
`;

// Main content area - no longer needs space for fixed stepper
export const StyledMainContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	min-height: 100vh;
	gap: 2rem;

	@media (max-width: 768px) {
		padding: 1rem;
		gap: 1rem;
	}
`;

// Container for the design system stepper
export const StyledStepperContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 1100px;
`;

// Middle content frame with framebackground2.png
export const StyledContentFrame = styled.div`
	width: 100%;
	max-width: 1100px;
	min-height: 600px;
	background: url(${frameBackground2}) center center no-repeat;
	background-size: contain;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem;
	
	@media (max-width: 768px) {
		max-width: calc(100% - 20px);
		min-height: 400px;
		padding: 2rem 1rem;
		background-size: cover;
	}
`;