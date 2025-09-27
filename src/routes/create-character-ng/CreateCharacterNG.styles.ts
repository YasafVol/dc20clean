import styled from 'styled-components';
import BlackBG from '/src/assets/BlackBG.jpg';
import frameBackground2 from '/src/assets/dc20-ng/framebackground2.png';
import { colors } from '../../design-system/styles/colors';

// Main page container with full screen background
export const StyledPageContainer = styled.div`
	height: 100vh;
	background: url(${BlackBG}) center center no-repeat;
	background-size: cover;
	background-attachment: fixed;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden; // Prevent page scroll
`;

// Sticky stepper header - transparent to show background
export const StyledStepperHeader = styled.div`
	position: sticky;
	top: 0;
	z-index: 10;
	padding: 1rem 0;
	display: flex;
	justify-content: center;
	width: 100%;
`;

// Container for the design system stepper
export const StyledStepperContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 1100px;
`;

// Scrollable content area
export const StyledMainContent = styled.div`
	flex: 1;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 2rem;
	
	// Custom scrollbar styling
	&::-webkit-scrollbar {
		width: 12px;
	}
	
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	
	&::-webkit-scrollbar-thumb {
		background: ${colors.scrollThumb};
		border: 2px solid ${colors.scrollBorder};
		border-radius: 6px;
	}
	
	&::-webkit-scrollbar-thumb:hover {
		background: ${colors.scrollThumb};
		opacity: 0.8;
	}
	
	// Firefox scrollbar styling
	scrollbar-width: thin;
	scrollbar-color: ${colors.scrollThumb} transparent;

	@media (max-width: 768px) {
		padding: 1rem;
	}
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
	margin-bottom: 2rem; // Add some bottom spacing
	
	@media (max-width: 768px) {
		max-width: calc(100% - 20px);
		min-height: 400px;
		padding: 2rem 1rem;
		background-size: cover;
		margin-bottom: 1rem;
	}
`;