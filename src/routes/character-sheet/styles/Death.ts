import styled from 'styled-components';

export const StyledDeathContainer = styled.div`
	flex: 1;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	text-align: center;
`;

export const StyledDeathTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
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
				return '#22c55e';
			case 'bloodied':
				return '#f59e0b';
			case 'well-bloodied':
				return '#f97316';
			case 'deaths-door':
				return '#dc2626';
			case 'dead':
				return '#7f1d1d';
			default:
				return '#8b4513';
		}
	}};
	background: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return '#dcfce7';
			case 'bloodied':
				return '#fef3c7';
			case 'well-bloodied':
				return '#fed7aa';
			case 'deaths-door':
				return '#fecaca';
			case 'dead':
				return '#fca5a5';
			default:
				return 'transparent';
		}
	}};
`;

export const StyledDeathThreshold = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;

export const StyledDeathStepsContainer = styled.div`
	margin-top: 0.5rem;
`;

export const StyledDeathStepsTitle = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #dc2626;
	margin-bottom: 0.3rem;
	font-family: 'Inter', sans-serif;
`;

export const StyledDeathStepsGrid = styled.div`
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
		return props.filled ? '#dc2626' : 'white';
	}};
	color: ${(props) => {
		if (props.isDead) return 'white';
		return props.filled ? 'white' : '#dc2626';
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
			return props.filled ? '#b91c1c' : '#fecaca';
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
