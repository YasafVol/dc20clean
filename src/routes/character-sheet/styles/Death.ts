import styled from 'styled-components';

interface MobileStyledProps {
	$isMobile?: boolean;
}

export const StyledDeathContainer = styled.div<MobileStyledProps>`
	flex: 1;
	border: 2px solid ${(props) => (props.$isMobile ? 'rgb(68, 68, 68)' : '#414868')};
	border-radius: 8px;
	padding: 1rem;
	background: ${(props) => (props.$isMobile ? 'rgb(42, 42, 42)' : '#24283B')};
	text-align: center;
`;

export const StyledDeathTitle = styled.div<MobileStyledProps>`
	font-size: 0.9rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#7DCFFF')};
	margin-bottom: 0.5rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledHealthStatus = styled.div<{
	status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
}>`
	font-size: 0.8rem;
	font-weight: bold;
	margin-bottom: 0.3rem;
	padding: 0.2rem 0.4rem;
	border-radius: 4px;
	color: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return '#9ECE6A';
			case 'bloodied':
				return '#E0AF68';
			case 'well-bloodied':
				return '#FF9E64';
			case 'deaths-door':
				return '#F7768E';
			case 'dead':
				return '#c0caf5';
			default:
				return '#7DCFFF';
		}
	}};
	background: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return 'rgba(158, 206, 106, 0.15)';
			case 'bloodied':
				return 'rgba(224, 175, 104, 0.15)';
			case 'well-bloodied':
				return 'rgba(255, 158, 100, 0.15)';
			case 'deaths-door':
				return 'rgba(247, 118, 142, 0.15)';
			case 'dead':
				return 'rgba(192, 202, 245, 0.15)';
			default:
				return 'transparent';
		}
	}};
`;

export const StyledDeathThreshold = styled.div<MobileStyledProps>`
	font-size: 1.5rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#f5d020' : '#c0caf5')};
	margin-bottom: 0.5rem;
`;

export const StyledDeathStepsContainer = styled.div<MobileStyledProps>`
	margin-top: 0.5rem;
`;

export const StyledDeathStepsTitle = styled.div<MobileStyledProps>`
	font-size: 0.8rem;
	font-weight: bold;
	color: ${(props) => (props.$isMobile ? '#ff6b6b' : '#dc2626')};
	margin-bottom: 0.3rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledDeathStepsGrid = styled.div<MobileStyledProps>`
	display: flex;
	justify-content: center;
	gap: 0.2rem;
	flex-wrap: wrap;
`;

export const StyledDeathStep = styled.div<{ filled: boolean; isDead: boolean }>`
	position: relative;
	width: 20px;
	height: 20px;
	border: 2px solid ${(props) => (props.isDead ? '#7f1d1d' : '#dc2626')};
	background: ${(props) => {
		if (props.isDead) return '#7f1d1d';
		return props.filled ? '#dc2626' : '#1A1B26';
	}};
	color: ${(props) => {
		if (props.isDead) return '#c0caf5';
		return props.filled ? '#c0caf5' : '#dc2626';
	}};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
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
			if (props.isDead) return '#991b1b';
			return props.filled ? '#b91c1c' : '#24283B';
		}};
		transform: scale(1.1);
	}

	${(props) =>
		props.isDead &&
		`
    &::after {
      content: '☠';
      font-size: 0.8rem;
    }
  `}
`;

export const StyledDeathStepTooltip = styled.div`
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #333;
	color: white;
	padding: 0.3rem 0.5rem;
	border-radius: 4px;
	font-size: 0.7rem;
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

	${StyledDeathStep}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;

export const StyledHealthStatusTooltip = styled.div`
	position: relative;
	cursor: help;

	&::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: #333;
		color: white;
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
		white-space: pre-line;
		z-index: 1000;
		margin-bottom: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease;
		max-width: 200px;
		text-align: left;
	}

	&:hover::after {
		opacity: 1;
		visibility: visible;
	}
`;
