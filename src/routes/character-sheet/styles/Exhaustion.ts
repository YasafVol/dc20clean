import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledExhaustionContainer = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: center;
	gap: 0.3rem;
	margin-top: 0.5rem;
`;

export const StyledExhaustionLevel = styled.div<{ filled: boolean; $isMobile?: boolean }>`
	position: relative;
	width: 24px;
	height: 24px;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68, 68, 68)' : '#414868')};
	background: ${(props) => {
		if (props.filled) {
			return props.$isMobile ? '#f5d020' : '#E0AF68';
		}
		return props.$isMobile ? 'rgb(42, 42, 42)' : '#1A1B26';
	}};
	color: ${(props) => {
		if (props.filled) {
			return props.$isMobile ? 'rgb(42, 42, 42)' : '#1A1B26';
		}
		return props.$isMobile ? '#f5d020' : '#E0AF68';
	}};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
	border-radius: 3px;
	transition: all 0.2s ease;
	line-height: 1;
	text-align: center;
	user-select: none;
	font-family: 'Inter', sans-serif;
	padding-top: 1px;

	&:hover {
		background: ${(props) => {
			if (props.filled) {
				return props.$isMobile ? '#d4b01c' : '#C49A53';
			}
			return props.$isMobile ? 'rgb(52, 52, 52)' : '#24283B';
		}};
		transform: scale(1.1);
	}
`;

export const StyledExhaustionTooltip = styled.div`
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #333;
	color: white;
	padding: 0.5rem 0.75rem;
	border-radius: 4px;
	font-size: 0.8rem;
	white-space: nowrap;
	z-index: 1000;
	margin-bottom: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity 0.2s ease,
		visibility 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: #333;
	}

	${StyledExhaustionLevel}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;
