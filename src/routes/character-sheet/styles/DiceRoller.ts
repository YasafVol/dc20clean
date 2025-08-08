import styled, { keyframes, css } from 'styled-components';

// Draconic fire animations
const fireGlow = keyframes`
	0% { box-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff4500; }
	50% { box-shadow: 0 0 10px #ff6347, 0 0 20px #ff6347, 0 0 30px #ff6347; }
	100% { box-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff4500; }
`;

const rollAnimation = keyframes`
	0% { transform: rotate(0deg) scale(1); }
	25% { transform: rotate(90deg) scale(1.1); }
	50% { transform: rotate(180deg) scale(1.2); }
	75% { transform: rotate(270deg) scale(1.1); }
	100% { transform: rotate(360deg) scale(1); }
`;

const emberFloat = keyframes`
	0% { transform: translateY(0px); opacity: 1; }
	100% { transform: translateY(-20px); opacity: 0; }
`;

// Main container positioned in bottom right
export const StyledDiceRollerContainer = styled.div<{ $isExpanded: boolean }>`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	width: ${props => props.$isExpanded ? '380px' : '60px'};
	height: ${props => props.$isExpanded ? 'auto' : '60px'};
	background: linear-gradient(135deg, #2c1810 0%, #4a2c20 50%, #6b3e30 100%);
	border: 3px solid #8b4513;
	border-radius: 12px;
	padding: ${props => props.$isExpanded ? '1rem' : '0'};
	z-index: 1000;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, #ff4500, #ff6347, #ff8c00, #ffa500);
		border-radius: 15px;
		z-index: -1;
		opacity: 0.3;
		animation: ${fireGlow} 2s infinite;
	}

	@media (max-width: 768px) {
		bottom: 4.5rem; /* Give 10-20px clearance above mobile nav */
		right: 0.5rem;
		width: ${props => props.$isExpanded ? '260px' : '50px'};
		height: ${props => props.$isExpanded ? 'auto' : '50px'};
		z-index: 999; /* Below mobile nav to prevent conflicts */
	}
`;

// Collapse/expand button
export const StyledCollapseButton = styled.button<{ $isExpanded: boolean }>`
	position: ${props => props.$isExpanded ? 'absolute' : 'static'};
	top: ${props => props.$isExpanded ? '0.5rem' : 'auto'};
	right: ${props => props.$isExpanded ? '0.5rem' : 'auto'};
	width: ${props => props.$isExpanded ? '30px' : '100%'};
	height: ${props => props.$isExpanded ? '30px' : '100%'};
	background: linear-gradient(135deg, #ff4500, #ff6347);
	border: 2px solid #8b4513;
	border-radius: ${props => props.$isExpanded ? '6px' : '12px'};
	color: white;
	font-size: ${props => props.$isExpanded ? '1rem' : '1.5rem'};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;
	
	&:hover {
		background: linear-gradient(135deg, #ff6347, #ff8c00);
		transform: scale(1.05);
		animation: ${fireGlow} 1s infinite;
	}
`;

// Dice controls section
export const StyledDiceControls = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #8b4513;
	
	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: #ffd700;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Mode buttons (Normal, Advantage, Disadvantage, No D20)
export const StyledModeButton = styled.button<{ $active: boolean }>`
	padding: 0.3rem 0.5rem;
	font-size: 0.65rem;
	background: ${props => props.$active ? 
		'linear-gradient(135deg, #ff4500, #ff6347)' : 
		'linear-gradient(135deg, #4a2c20, #6b3e30)'};
	color: white;
	border: 1px solid #8b4513;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: bold;
	flex: 1;
	min-width: 0;
	text-align: center;
	
	&:hover {
		background: linear-gradient(135deg, #ff6347, #ff8c00);
		transform: translateY(-1px);
	}
`;

// Add dice section
export const StyledAddDiceSection = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #8b4513;
	
	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: #ffd700;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Dice type buttons (d4, d6, etc.)
export const StyledDiceTypeButton = styled.button`
	padding: 0.4rem;
	font-size: 0.7rem;
	background: linear-gradient(135deg, #8b4513, #a0522d);
	color: white;
	border: 1px solid #654321;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: bold;
	
	&:hover {
		background: linear-gradient(135deg, #a0522d, #cd853f);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(255, 69, 0, 0.3);
	}
`;

// Dice counter component
export const StyledDiceCounter = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.3rem;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	border: 1px solid #8b4513;
`;

// Current dice list
export const StyledDiceList = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #8b4513;
	
	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: #ffd700;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Individual dice item in list
export const StyledDiceItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.2rem 0.4rem;
	margin-bottom: 0.2rem;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	font-size: 0.7rem;
	color: white;
`;

// Remove dice button
export const StyledRemoveDiceButton = styled.button`
	width: 20px;
	height: 20px;
	background: #d32f2f;
	color: white;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	
	&:hover {
		background: #b71c1c;
		transform: scale(1.1);
	}
`;

// Main dice container
export const StyledDiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem;
	background: radial-gradient(circle, rgba(255, 69, 0, 0.1) 0%, rgba(139, 69, 19, 0.1) 100%);
	border-radius: 8px;
	border: 1px solid rgba(255, 69, 0, 0.3);
`;

// Individual dice icons
export const StyledDiceIcon = styled.div<{ 
	$isRolling: boolean; 
	$type: string;
	$size?: 'small' | 'normal';
}>`
	font-size: ${props => props.$size === 'small' ? '1.2rem' : '2rem'};
	width: ${props => props.$size === 'small' ? '30px' : '50px'};
	height: ${props => props.$size === 'small' ? '30px' : '50px'};
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.$type === 'd20' ? 
		'radial-gradient(circle, #ff4500 0%, #ff6347 50%, #8b0000 100%)' :
		'radial-gradient(circle, #8b4513 0%, #a0522d 50%, #654321 100%)'};
	border: 2px solid #654321;
	border-radius: 8px;
	color: white;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;
	
	${props => props.$isRolling && css`
		animation: ${rollAnimation} 0.3s linear infinite;
	`}
	
	&::after {
		content: '';
		position: absolute;
		width: 4px;
		height: 4px;
		background: #ffa500;
		border-radius: 50%;
		animation: ${emberFloat} 1.5s infinite;
		margin-left: 10px;
		margin-top: -5px;
		opacity: ${props => props.$isRolling ? 1 : 0};
	}
`;

// Dice value display
export const StyledDiceValue = styled.div<{ $isMax?: boolean; $isMin?: boolean }>`
	font-size: 1.2rem;
	font-weight: bold;
	color: ${props => 
		props.$isMax ? '#ffd700' : 
		props.$isMin ? '#ff4500' : 
		'white'};
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
	margin-top: 0.5rem;
`;

// Roll button
export const StyledRollButton = styled.button<{ $isRolling: boolean }>`
	width: 100%;
	padding: 0.8rem;
	font-size: 1rem;
	font-weight: bold;
	background: ${props => props.$isRolling ? 
		'linear-gradient(135deg, #666, #888)' :
		'linear-gradient(135deg, #ff4500, #ff6347, #ff8c00)'};
	color: white;
	border: 2px solid #8b4513;
	border-radius: 8px;
	cursor: ${props => props.$isRolling ? 'not-allowed' : 'pointer'};
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 1px;
	
	${props => !props.$isRolling && css`
		&:hover {
			background: linear-gradient(135deg, #ff6347, #ff8c00, #ffa500);
			transform: translateY(-2px);
			box-shadow: 0 6px 20px rgba(255, 69, 0, 0.4);
			animation: ${fireGlow} 1s infinite;
		}
	`}
	
	&:active {
		transform: translateY(0);
	}
`;

// Results display
export const StyledResultsDisplay = styled.div`
	margin-top: 1rem;
	padding: 1rem 0.8rem 1.5rem 0.8rem;
	background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 69, 0, 0.1));
	border: 2px solid rgba(255, 215, 0, 0.3);
	border-radius: 8px;
	position: relative;
`;

// Individual dice result
export const StyledDiceResult = styled.div<{ 
	$isMax: boolean; 
	$isMin: boolean; 
	$isChosen?: boolean;
	$isCriticalSuccess?: boolean;
	$isCriticalFail?: boolean;
}>`
	padding: 0.2rem 0.4rem;
	background: ${props => 
		props.$isCriticalSuccess ? 'linear-gradient(135deg, #ffd700, #ffed4e)' :
		props.$isCriticalFail ? 'linear-gradient(135deg, #dc143c, #ff0000)' :
		props.$isMax ? 'linear-gradient(135deg, #32cd32, #90ee90)' :
		props.$isMin ? 'linear-gradient(135deg, #ff4500, #ff6347)' :
		props.$isChosen === false ? 'linear-gradient(135deg, #4a4a4a, #6a6a6a)' :
		'linear-gradient(135deg, #8b4513, #a0522d)'};
	color: ${props => 
		props.$isCriticalSuccess || props.$isCriticalFail || props.$isMax || props.$isMin ? 'black' : 
		props.$isChosen === false ? '#e0e0e0' :
		'white'};
	border-radius: 4px;
	font-size: 0.7rem;
	font-weight: bold;
	border: 2px solid ${props => 
		props.$isCriticalSuccess ? '#b8860b' :
		props.$isCriticalFail ? '#8b0000' :
		props.$isChosen === false ? '#888' :
		props.$isMax ? '#228b22' :
		props.$isMin ? '#8b0000' :
		'#654321'};
	position: relative;
	opacity: ${props => props.$isChosen === false ? 0.8 : 1};
	
	${props => props.$isCriticalSuccess && css`
		animation: ${fireGlow} 1.5s infinite;
		box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
		&::after {
			content: '✨ CRIT SUCCESS';
			position: absolute;
			top: -20px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.6rem;
			color: #ffd700;
			font-weight: bold;
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
			white-space: nowrap;
		}
	`}
	
	${props => props.$isCriticalFail && css`
		animation: ${fireGlow} 1.5s infinite;
		box-shadow: 0 0 15px rgba(220, 20, 60, 0.8);
		&::after {
			content: '💀 CRIT FAIL';
			position: absolute;
			top: -20px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.6rem;
			color: #dc143c;
			font-weight: bold;
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
			white-space: nowrap;
		}
	`}
	
	${props => props.$isChosen === false && css`
		&::before {
			content: 'NOT USED';
			position: absolute;
			bottom: -16px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.5rem;
			color: #ccc;
			font-weight: bold;
			white-space: nowrap;
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		}
	`}
`;

// Total result display
export const StyledTotalResult = styled.div<{ $isHighRoll: boolean }>`
	font-size: 1.2rem;
	font-weight: bold;
	color: ${props => props.$isHighRoll ? '#ffd700' : 'white'};
	text-align: center;
	margin-bottom: 0.5rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
	
	${props => props.$isHighRoll && css`
		animation: ${fireGlow} 2s infinite;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
	`}
`;

// Roll history
export const StyledDiceHistory = styled.div`
	margin-top: 0.8rem;
	padding-top: 0.5rem;
	border-top: 1px solid #8b4513;
	color: rgba(255, 255, 255, 0.9);
	
	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: #ffd700;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;
