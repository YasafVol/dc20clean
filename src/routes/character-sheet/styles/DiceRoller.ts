import styled, { keyframes, css } from 'styled-components';

// Icy crystal glow animations
const crystalGlow = keyframes`
	0% { box-shadow: 0 0 8px var(--crystal-primary-40), 0 0 16px var(--crystal-primary-30); }
	50% { box-shadow: 0 0 16px var(--crystal-primary-60), 0 0 32px var(--crystal-primary-40); }
	100% { box-shadow: 0 0 8px var(--crystal-primary-40), 0 0 16px var(--crystal-primary-30); }
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

// Main container positioned in bottom right - ICY CRYSTAL DESIGN
export const StyledDiceRollerContainer = styled.div<{ $isExpanded: boolean }>`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	width: ${(props) => (props.$isExpanded ? '380px' : '60px')};
	height: ${(props) => (props.$isExpanded ? 'auto' : '60px')};
	background: linear-gradient(135deg, rgba(26, 27, 38, 0.85), rgba(36, 40, 59, 0.9));
	border: 2px solid var(--crystal-primary-40);
	border-radius: 12px;
	padding: ${(props) => (props.$isExpanded ? '1rem' : '0')};
	z-index: 1000;
	box-shadow:
		0 8px 32px var(--crystal-primary-20),
		inset 0 1px 0 var(--white-10);
	backdrop-filter: blur(12px);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(
			45deg,
			var(--crystal-primary-10),
			var(--crystal-tertiary-30),
			var(--crystal-primary-10)
		);
		border-radius: 15px;
		z-index: -1;
		opacity: 0.5;
	}

	@media (max-width: 768px) {
		bottom: 4.5rem; /* Give 10-20px clearance above mobile nav */
		right: 0.5rem;
		width: ${(props) => (props.$isExpanded ? '260px' : '50px')};
		height: ${(props) => (props.$isExpanded ? 'auto' : '50px')};
		z-index: 999; /* Below mobile nav to prevent conflicts */
	}
`;

// Collapse/expand button - ICY CRYSTAL DESIGN
export const StyledCollapseButton = styled.button<{ $isExpanded: boolean }>`
	position: ${(props) => (props.$isExpanded ? 'absolute' : 'static')};
	top: ${(props) => (props.$isExpanded ? '0.5rem' : 'auto')};
	right: ${(props) => (props.$isExpanded ? '0.5rem' : 'auto')};
	width: ${(props) => (props.$isExpanded ? '30px' : '100%')};
	height: ${(props) => (props.$isExpanded ? '30px' : '100%')};
	background: linear-gradient(135deg, var(--crystal-primary-30), var(--crystal-secondary-50));
	border: 2px solid var(--crystal-primary-60);
	border-radius: ${(props) => (props.$isExpanded ? '6px' : '12px')};
	color: var(--crystal-primary-light);
	font-size: ${(props) => (props.$isExpanded ? '1rem' : '1.5rem')};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	text-shadow: 0 0 8px currentColor;
	backdrop-filter: blur(8px);
	box-shadow:
		0 2px 12px var(--crystal-primary-40),
		inset 0 1px 0 var(--white-30);

	&:hover {
		background: linear-gradient(135deg, var(--crystal-primary-50), var(--crystal-secondary-70));
		box-shadow:
			0 4px 20px var(--crystal-primary-60),
			inset 0 1px 0 var(--white-50);
		transform: scale(1.05);
		animation: ${crystalGlow} 1s infinite;
	}
`;

// Dice controls section
export const StyledDiceControls = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--crystal-primary-30);

	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--crystal-primary);
		text-shadow: 0 0 8px var(--glow-primary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Mode buttons (Normal, Advantage, Disadvantage, No D20)
export const StyledModeButton = styled.button<{ $active: boolean }>`
	padding: 0.3rem 0.5rem;
	font-size: 0.65rem;
	background: ${(props) =>
		props.$active
			? `linear-gradient(135deg, var(--crystal-primary-50), var(--crystal-secondary-70))`
			: 'linear-gradient(135deg, rgba(36, 40, 59, 0.6), rgba(46, 50, 69, 0.8))'};
	color: ${(props) => (props.$active ? 'var(--crystal-primary-light)' : 'var(--text-secondary)')};
	border: 1px solid var(--crystal-primary-40);
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: bold;
	text-shadow: ${(props) => (props.$active ? '0 0 8px currentColor' : 'none')};
	flex: 1;
	min-width: 0;
	text-align: center;

	&:hover {
		background: linear-gradient(135deg, var(--crystal-primary-50), var(--crystal-secondary-70));
		transform: translateY(-1px);
		text-shadow: 0 0 8px currentColor;
	}
`;

// Add dice section
export const StyledAddDiceSection = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--crystal-primary-30);

	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--crystal-primary);
		text-shadow: 0 0 8px var(--glow-primary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Dice type buttons (d4, d6, etc.) - ICY CRYSTAL DESIGN
export const StyledDiceTypeButton = styled.button<{ $diceType?: string }>`
	padding: 0.4rem;
	font-size: 0.7rem;
	background: ${(props) => {
		switch (props.$diceType) {
			case 'd20':
				return `linear-gradient(135deg, var(--dice-d20-bg), var(--crystal-secondary-50))`;
			case 'd12':
				return `linear-gradient(135deg, var(--dice-d12-bg), rgba(90, 130, 215, 0.5))`;
			case 'd10':
				return `linear-gradient(135deg, var(--dice-d10-bg), rgba(217, 159, 4, 0.45))`;
			case 'd8':
				return `linear-gradient(135deg, var(--dice-d8-bg), rgba(26, 157, 78, 0.45))`;
			case 'd6':
				return `linear-gradient(135deg, var(--dice-d6-bg), rgba(207, 36, 36, 0.45))`;
			case 'd4':
				return `linear-gradient(135deg, var(--dice-d4-bg), rgba(122, 133, 174, 0.5))`;
			default:
				return `linear-gradient(135deg, var(--white-20), rgba(160, 82, 45, 0.5))`;
		}
	}};
	color: ${(props) => {
		switch (props.$diceType) {
			case 'd20':
				return 'var(--dice-d20-text)';
			case 'd12':
				return 'var(--dice-d12-text)';
			case 'd10':
				return 'var(--dice-d10-text)';
			case 'd8':
				return 'var(--dice-d8-text)';
			case 'd6':
				return 'var(--dice-d6-text)';
			case 'd4':
				return 'var(--dice-d4-text)';
			default:
				return 'var(--text-primary)';
		}
	}};
	border: 1px solid
		${(props) => {
			switch (props.$diceType) {
				case 'd20':
					return 'var(--crystal-primary-60)';
				case 'd12':
					return 'var(--crystal-tertiary-60)';
				case 'd10':
					return 'rgba(251, 191, 36, 0.6)';
				case 'd8':
					return 'rgba(34, 197, 94, 0.6)';
				case 'd6':
					return 'rgba(239, 68, 68, 0.6)';
				case 'd4':
					return 'rgba(154, 165, 206, 0.6)';
				default:
					return 'var(--white-30)';
			}
		}};
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.3s ease;
	font-weight: 600;
	text-shadow: 0 0 8px currentColor;
	backdrop-filter: blur(8px);
	box-shadow: ${(props) => {
		switch (props.$diceType) {
			case 'd20':
				return `0 2px 12px var(--crystal-primary-40), inset 0 1px 0 var(--white-30)`;
			case 'd12':
				return `0 2px 12px var(--crystal-tertiary-30), inset 0 1px 0 var(--white-30)`;
			case 'd10':
				return '0 2px 12px rgba(251, 191, 36, 0.4), inset 0 1px 0 var(--white-30)';
			case 'd8':
				return '0 2px 12px rgba(34, 197, 94, 0.4), inset 0 1px 0 var(--white-30)';
			case 'd6':
				return '0 2px 12px rgba(239, 68, 68, 0.4), inset 0 1px 0 var(--white-30)';
			case 'd4':
				return '0 2px 12px rgba(154, 165, 206, 0.4), inset 0 1px 0 var(--white-30)';
			default:
				return '0 2px 8px var(--white-20), inset 0 1px 0 var(--white-20)';
		}
	}};

	&:hover {
		background: ${(props) => {
			switch (props.$diceType) {
				case 'd20':
					return `linear-gradient(135deg, var(--crystal-primary-50), var(--crystal-secondary-70))`;
				case 'd12':
					return `linear-gradient(135deg, var(--crystal-tertiary-50), rgba(90, 130, 215, 0.7))`;
				case 'd10':
					return 'linear-gradient(135deg, rgba(251, 191, 36, 0.45), rgba(217, 159, 4, 0.65))';
				case 'd8':
					return 'linear-gradient(135deg, rgba(34, 197, 94, 0.45), rgba(26, 157, 78, 0.65))';
				case 'd6':
					return 'linear-gradient(135deg, rgba(239, 68, 68, 0.45), rgba(207, 36, 36, 0.65))';
				case 'd4':
					return 'linear-gradient(135deg, rgba(154, 165, 206, 0.5), rgba(122, 133, 174, 0.7))';
				default:
					return 'linear-gradient(135deg, var(--white-30), rgba(200, 200, 200, 0.5))';
			}
		}};
		transform: translateY(-2px);
		box-shadow: ${(props) => {
			switch (props.$diceType) {
				case 'd20':
					return `0 4px 20px var(--crystal-primary-60), inset 0 1px 0 var(--white-50)`;
				case 'd12':
					return `0 4px 20px var(--crystal-tertiary-60), inset 0 1px 0 var(--white-50)`;
				case 'd10':
					return '0 4px 20px rgba(251, 191, 36, 0.6), inset 0 1px 0 var(--white-50)';
				case 'd8':
					return '0 4px 20px rgba(34, 197, 94, 0.6), inset 0 1px 0 var(--white-50)';
				case 'd6':
					return '0 4px 20px rgba(239, 68, 68, 0.6), inset 0 1px 0 var(--white-50)';
				case 'd4':
					return '0 4px 20px rgba(154, 165, 206, 0.6), inset 0 1px 0 var(--white-50)';
				default:
					return '0 4px 16px var(--white-30), inset 0 1px 0 var(--white-30)';
			}
		}};
	}

	&:active {
		transform: translateY(0);
	}
`;

// Dice counter component
export const StyledDiceCounter = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.3rem;
	background: var(--crystal-primary-10);
	border-radius: 4px;
	border: 1px solid var(--crystal-primary-30);
`;

// Current dice list
export const StyledDiceList = styled.div`
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--crystal-primary-30);

	.section-label {
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--crystal-primary);
		text-shadow: 0 0 8px var(--glow-primary);
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
	background: var(--white-10);
	border-radius: 4px;
	font-size: 0.7rem;
	color: white;
`;

// Remove dice button
export const StyledRemoveDiceButton = styled.button`
	width: 20px;
	height: 20px;
	background: rgba(239, 68, 68, 0.5);
	color: var(--dice-d6-text);
	border: 1px solid rgba(239, 68, 68, 0.6);
	border-radius: 50%;
	cursor: pointer;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(4px);

	&:hover {
		background: rgba(239, 68, 68, 0.7);
		transform: scale(1.1);
		box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
	}
`;

// Main dice container
export const StyledDiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	padding: 1rem;
	background: linear-gradient(135deg, var(--crystal-primary-10), var(--crystal-tertiary-30));
	border-radius: 8px;
	border: 1px solid var(--crystal-primary-30);
`;

// Individual dice icons
export const StyledDiceIcon = styled.div<{
	$isRolling: boolean;
	$type: string;
	$size?: 'small' | 'normal';
}>`
	font-size: ${(props) => (props.$size === 'small' ? '1.2rem' : '2rem')};
	width: ${(props) => (props.$size === 'small' ? '30px' : '50px')};
	height: ${(props) => (props.$size === 'small' ? '30px' : '50px')};
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) =>
		props.$type === 'd20'
			? `radial-gradient(circle, var(--crystal-primary-40) 0%, var(--crystal-secondary-60) 50%, rgba(70, 130, 180, 0.8) 100%)`
			: `radial-gradient(circle, var(--crystal-tertiary-30) 0%, rgba(90, 130, 215, 0.5) 50%, rgba(70, 110, 175, 0.7) 100%)`};
	border: 2px solid var(--crystal-primary-50);
	border-radius: 8px;
	color: var(--crystal-primary-light);
	font-weight: bold;
	text-shadow: 0 0 8px var(--glow-secondary);
	transition: all 0.3s ease;
	backdrop-filter: blur(6px);

	${(props) =>
		props.$isRolling &&
		css`
			animation: ${rollAnimation} 0.3s linear infinite;
		`}

	&::after {
		content: '';
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--glow-ember);
		border-radius: 50%;
		animation: ${emberFloat} 1.5s infinite;
		margin-left: 10px;
		margin-top: -5px;
		opacity: ${(props) => (props.$isRolling ? 1 : 0)};
		box-shadow: 0 0 6px var(--glow-primary);
	}
`;

// Dice value display
export const StyledDiceValue = styled.div<{ $isMax?: boolean; $isMin?: boolean }>`
	font-size: 1.2rem;
	font-weight: bold;
	color: ${(props) =>
		props.$isMax
			? 'var(--result-max)'
			: props.$isMin
				? 'var(--result-min)'
				: 'var(--crystal-primary-light)'};
	text-shadow: 0 0 8px currentColor;
	margin-top: 0.5rem;
`;

// Roll button
export const StyledRollButton = styled.button<{ $isRolling: boolean }>`
	width: 100%;
	padding: 0.8rem;
	font-size: 1rem;
	font-weight: bold;
	background: ${(props) =>
		props.$isRolling
			? 'linear-gradient(135deg, rgba(100, 100, 120, 0.5), rgba(120, 120, 140, 0.6))'
			: 'linear-gradient(135deg, var(--crystal-primary-50), var(--crystal-secondary-70), var(--crystal-tertiary-60))'};
	color: ${(props) =>
		props.$isRolling ? 'var(--text-secondary)' : 'var(--crystal-primary-light)'};
	border: 2px solid var(--crystal-primary-60);
	border-radius: 8px;
	cursor: ${(props) => (props.$isRolling ? 'not-allowed' : 'pointer')};
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 1px;
	text-shadow: ${(props) => (props.$isRolling ? 'none' : '0 0 12px currentColor')};
	backdrop-filter: blur(8px);
	box-shadow: ${(props) =>
		props.$isRolling
			? `0 2px 8px var(--crystal-primary-20)`
			: `0 4px 16px var(--crystal-primary-40), inset 0 1px 0 var(--white-30)`};

	${(props) =>
		!props.$isRolling &&
		css`
			&:hover {
				background: linear-gradient(
					135deg,
					var(--crystal-primary-70),
					var(--crystal-secondary-90),
					var(--crystal-tertiary-80)
				);
				transform: translateY(-2px);
				box-shadow:
					0 6px 24px var(--crystal-primary-60),
					inset 0 1px 0 var(--white-50);
				animation: ${crystalGlow} 1s infinite;
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
	background: linear-gradient(135deg, var(--crystal-primary-10), var(--crystal-tertiary-30));
	border: 2px solid var(--crystal-primary-40);
	border-radius: 8px;
	position: relative;
	backdrop-filter: blur(8px);
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
	background: ${(props) =>
		props.$isCriticalSuccess
			? `linear-gradient(135deg, var(--result-crit-success-bg), var(--crystal-secondary-100))`
			: props.$isCriticalFail
				? `linear-gradient(135deg, var(--result-crit-fail-bg), rgba(220, 38, 38, 0.8))`
				: props.$isMax
					? 'linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(74, 222, 128, 0.7))'
					: props.$isMin
						? 'linear-gradient(135deg, rgba(154, 165, 206, 0.4), rgba(122, 133, 174, 0.6))'
						: props.$isChosen === false
							? 'linear-gradient(135deg, rgba(74, 74, 74, 0.5), rgba(106, 106, 106, 0.6))'
							: `linear-gradient(135deg, var(--crystal-primary-30), var(--crystal-secondary-50))`};
	color: ${(props) =>
		props.$isCriticalSuccess
			? '#003d5c'
			: props.$isCriticalFail
				? 'var(--result-crit-fail)'
				: props.$isMax
					? 'var(--result-max)'
					: props.$isMin
						? 'var(--result-min)'
						: props.$isChosen === false
							? 'var(--gray-very-light)'
							: 'var(--crystal-primary-light)'};
	text-shadow: ${(props) =>
		props.$isCriticalSuccess || props.$isCriticalFail || props.$isMax || props.$isMin
			? '0 0 4px currentColor'
			: 'none'};
	border-radius: 4px;
	font-size: 0.7rem;
	font-weight: bold;
	border: 2px solid
		${(props) =>
			props.$isCriticalSuccess
				? '#b8860b'
				: props.$isCriticalFail
					? '#8b0000'
					: props.$isChosen === false
						? 'var(--gray-dark)'
						: props.$isMax
							? '#228b22'
							: props.$isMin
								? '#8b0000'
								: '#654321'};
	position: relative;
	opacity: ${(props) => (props.$isChosen === false ? 0.8 : 1)};

	${(props) =>
		props.$isCriticalSuccess &&
		css`
			animation: ${crystalGlow} 1.5s infinite;
			box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
			&::after {
				content: '✨ CRIT SUCCESS';
				position: absolute;
				top: -20px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.6rem;
				color: var(--crystal-primary-light);
				font-weight: bold;
				text-shadow: 0 0 8px var(--glow-ember);
				white-space: nowrap;
			}
		`}

	${(props) =>
		props.$isCriticalFail &&
		css`
			animation: ${crystalGlow} 1.5s infinite;
			box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
			&::after {
				content: '💀 CRIT FAIL';
				position: absolute;
				top: -20px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.6rem;
				color: var(--dice-d6-text);
				font-weight: bold;
				text-shadow: 0 0 6px rgba(239, 68, 68, 0.8);
				white-space: nowrap;
			}
		`}
	
	${(props) =>
		props.$isChosen === false &&
		css`
			&::before {
				content: 'NOT USED';
				position: absolute;
				bottom: -16px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.5rem;
				color: var(--gray-light);
				font-weight: bold;
				white-space: nowrap;
				text-shadow: 1px 1px 2px var(--black-80);
			}
		`}
`;

// Total result display
export const StyledTotalResult = styled.div<{ $isHighRoll: boolean }>`
	font-size: 1.2rem;
	font-weight: bold;
	color: ${(props) =>
		props.$isHighRoll ? 'var(--crystal-primary)' : 'var(--crystal-primary-light)'};
	text-align: center;
	margin-bottom: 0.5rem;
	text-shadow: ${(props) => (props.$isHighRoll ? '0 0 12px currentColor' : 'none')};

	${(props) =>
		props.$isHighRoll &&
		css`
			animation: ${crystalGlow} 2s infinite;
			text-shadow: 0 0 12px var(--glow-secondary);
		`}
`;

// Roll history
export const StyledDiceHistory = styled.div`
	margin-top: 0.8rem;
	padding-top: 0.5rem;
	border-top: 1px solid var(--crystal-primary-30);
	color: rgba(255, 255, 255, 0.9);

	.section-label {
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--crystal-primary);
		text-shadow: 0 0 8px var(--glow-primary);
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
`;

// Mode buttons container
export const StyledModeButtonsContainer = styled.div`
	display: flex;
	gap: 0.25rem;
	flex-wrap: wrap;
`;

// Advantage/Disadvantage count controls container
export const StyledCountControlsContainer = styled.div`
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.8rem;
	color: var(--crystal-primary);
`;

// Count label span
export const StyledCountLabel = styled.span`
	text-shadow: 1px 1px 2px var(--black-80);
`;

// Count control button (minus/plus)
export const StyledCountButton = styled.button`
	width: 20px;
	height: 20px;
	background: var(--accent-primary);
	color: var(--text-primary);
	border: 1px solid var(--crystal-secondary);
	border-radius: 3px;
	cursor: pointer;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.1);
		background: var(--crystal-secondary);
	}
`;

// Count display span
export const StyledCountDisplay = styled.span`
	min-width: 20px;
	text-align: center;
	font-weight: bold;
	text-shadow: 1px 1px 2px var(--black-80);
`;

// Descriptive text for count controls
export const StyledCountDescription = styled.span`
	font-size: 0.7rem;
	color: rgba(255, 255, 255, 0.8);
	margin-left: 0.25rem;
`;

// Dice type buttons grid
export const StyledDiceTypeGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.25rem;
	margin-bottom: 0.5rem;
`;

// Clear all dice button
export const StyledClearAllButton = styled.button`
	font-size: 0.7rem;
	padding: 0.2rem 0.4rem;
	background: rgba(239, 68, 68, 0.5);
	color: var(--dice-d6-text);
	border: 1px solid rgba(239, 68, 68, 0.6);
	border-radius: 3px;
	cursor: pointer;
	margin-top: 0.25rem;
	transition: all 0.2s ease;
	backdrop-filter: blur(4px);
	text-shadow: 0 0 4px currentColor;

	&:hover {
		background: rgba(239, 68, 68, 0.7);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
	}
`;

// Roll mode text display
export const StyledRollModeText = styled.div`
	font-size: 0.7rem;
	color: var(--crystal-primary);
	text-align: center;
	margin-top: 0.25rem;
	text-shadow: 0 0 8px var(--glow-primary);
`;

// Empty state message for no dice
export const StyledEmptyStateMessage = styled.div`
	font-size: 0.8rem;
	color: var(--crystal-primary);
	text-align: center;
	padding: 1rem;
	text-shadow: 1px 1px 2px var(--black-80);
`;

// Additional dice display container
export const StyledAdditionalDiceContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.25rem;
	margin-top: 0.25rem;
`;

// Results flex container
export const StyledResultsFlexContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.25rem;
	margin-top: 0.5rem;
`;

// Roll history entry
export const StyledHistoryEntry = styled.div`
	font-size: 0.7rem;
	color: rgba(255, 255, 255, 0.9);
	margin-bottom: 0.1rem;
`;
