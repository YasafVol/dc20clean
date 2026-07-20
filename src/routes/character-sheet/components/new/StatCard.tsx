import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

type StatSize = 'small' | 'medium' | 'large';

interface StatCardProps {
	label: string;
	current: number;
	max?: number;
	min?: number;
	temp?: number;
	color?: 'health' | 'mana' | 'stamina' | 'grit';
	size?: StatSize;
	showProgressBar?: boolean;
	editable?: boolean;
	onChange?: (value: number) => void;
	onTempChange?: (value: number) => void;
	onMouseEnter?: (e: React.MouseEvent) => void;
	onMouseLeave?: () => void;
	afterProgressBar?: React.ReactNode;
	className?: string;
}

const Container = styled(motion.div)<{ $size: StatSize; $color: string }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${(props) => {
		switch (props.$size) {
			case 'small':
				return theme.spacing[3];
			case 'medium':
				return theme.spacing[4];
			case 'large':
				return theme.spacing[6];
		}
	}};
	box-shadow: ${theme.shadows.md};
	transition: all ${theme.transitions.base};
	border: 2px solid transparent;
	position: relative;
	overflow: hidden;

	&:hover {
		box-shadow: ${theme.shadows.lg};
		transform: translateY(-2px);
		border-color: ${(props) => props.$color};
	}
`;

const Label = styled.div<{ $size: StatSize }>`
	color: ${theme.colors.text.secondary};
	font-size: ${(props) => {
		switch (props.$size) {
			case 'small':
				return theme.typography.fontSize.xs;
			case 'medium':
				return theme.typography.fontSize.sm;
			case 'large':
				return theme.typography.fontSize.sm;
		}
	}};
	font-weight: ${theme.typography.fontWeight.medium};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	min-height: 2.5rem;
	text-align: center;
`;

const ValueContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[2]};
	min-height: 2.5rem;
`;

const CurrentValue = styled(motion.span)<{ $size: StatSize; $color: string }>`
	color: ${theme.colors.text.primary};
	font-size: ${(props) => {
		switch (props.$size) {
			case 'small':
				return theme.typography.fontSize.xl;
			case 'medium':
				return theme.typography.fontSize['2xl'];
			case 'large':
				return theme.typography.fontSize['3xl'];
		}
	}};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: ${theme.typography.lineHeight.tight};
	color: ${(props) => props.$color};
	display: inline-block;
	min-width: 3ch;
	padding-inline: 0.1ch;
	text-align: center;
	font-variant-numeric: tabular-nums;
`;

const MaxValue = styled.span<{ $size: StatSize }>`
	color: ${theme.colors.text.secondary};
	font-size: ${(props) => {
		switch (props.$size) {
			case 'small':
				return theme.typography.fontSize.base;
			case 'medium':
				return theme.typography.fontSize.lg;
			case 'large':
				return theme.typography.fontSize.xl;
		}
	}};
	font-weight: ${theme.typography.fontWeight.medium};
`;

const ProgressBarContainer = styled.div`
	width: 100%;
	height: 6px;
	background: ${theme.colors.bg.primary};
	border-radius: ${theme.borderRadius.full};
	margin-top: ${theme.spacing[2]};
	position: relative;
	overflow: hidden;
`;

const ProgressBar = styled(motion.div)<{ $color: string }>`
	position: absolute;
	top: 0;
	height: 100%;
	background: ${(props) => props.$color};
	/* No CSS transition for width — Framer Motion owns the width animation below.
	   Having both stacks ease-in-out + ease-out and produces a slow-then-fast jump. */
`;

const ZeroMarker = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	width: 1px;
	background: ${theme.colors.text.secondary};
	opacity: 0.65;
	z-index: 1;
`;

// Gold/amber colour used to indicate HP that has been pushed beyond the normal
// max via temp HP. Sits next to the normal resource colour inside the bar.
const TEMP_HP_COLOR = theme.colors.accent.warning;
const NEGATIVE_HP_COLOR = '#ef4444';
const NEGATIVE_HP_ZONE_PERCENT = 25;
const POSITIVE_HP_ZONE_PERCENT = 100 - NEGATIVE_HP_ZONE_PERCENT;

interface FillPercentages {
	normal: number;
	temp: number;
	negative: number;
	zero: number;
}

export function calculateFillPercentages(
	current: number,
	max: number,
	min = 0,
	temp = 0
): FillPercentages {
	const hasNegativeRange = min < 0;
	const zero = hasNegativeRange ? NEGATIVE_HP_ZONE_PERCENT : 0;
	const positiveZone = hasNegativeRange ? POSITIVE_HP_ZONE_PERCENT : 100;
	const positiveCapacity = Math.max(0, max) + Math.max(0, temp);
	const negativeCapacity = Math.abs(Math.min(0, min));

	if (positiveCapacity <= 0 && negativeCapacity <= 0) {
		return { normal: 0, temp: 0, negative: 0, zero };
	}

	return {
		normal:
			positiveCapacity > 0
				? (Math.max(0, Math.min(current, max)) / positiveCapacity) * positiveZone
				: 0,
		temp: positiveCapacity > 0 ? (Math.max(0, temp) / positiveCapacity) * positiveZone : 0,
		negative:
			negativeCapacity > 0
				? (Math.min(negativeCapacity, Math.abs(Math.min(0, current))) / negativeCapacity) *
					NEGATIVE_HP_ZONE_PERCENT
				: 0,
		zero
	};
}

// Secondary control row used only for Temp HP. Main resource controls flank
// the value directly in ValueContainer.
const ControlsRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[3]};
	margin-top: ${theme.spacing[3]};
	flex-wrap: wrap;
`;

const InlineControlGroup = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
`;

// Framed mini-stat so Temp HP remains distinct from the main HP value.
const TempInlineGroup = styled(InlineControlGroup)`
	background: ${theme.colors.bg.primary};
	border: 1px solid ${TEMP_HP_COLOR};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};

	& button {
		color: ${TEMP_HP_COLOR};
		box-shadow: inset 0 0 0 1px ${TEMP_HP_COLOR};
	}
`;

const InlineControlLabel = styled.span`
	color: ${TEMP_HP_COLOR};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	white-space: nowrap;
`;

const ControlButton = styled(motion.button)`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: none;
	border-radius: ${theme.borderRadius.md};
	width: 28px;
	height: 28px;
	cursor: pointer;
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const StatCard: React.FC<StatCardProps> = ({
	label,
	current,
	max,
	min = 0,
	temp,
	color = 'health',
	size = 'large',
	showProgressBar = true,
	editable = true,
	onChange,
	onTempChange,
	onMouseEnter,
	onMouseLeave,
	afterProgressBar,
	className
}) => {
	const colorValue = theme.colors.resource[color];

	// Temp HP is a separate pool. It does not raise current HP or maximum HP,
	// and incoming damage consumes it before reducing current HP.
	const tempAmount = temp ?? 0;

	// HP uses a fixed 25% negative zone and 75% positive zone. Normal and Temp HP
	// share the positive zone so their distinct segments always fit in the bar.
	const fillPercentages =
		max !== undefined
			? calculateFillPercentages(current, max, min, tempAmount)
			: { normal: 0, temp: 0, negative: 0, zero: 0 };
	const normalFillPercent = fillPercentages.normal;
	const tempFillPercent = fillPercentages.temp;
	const negativeFillPercent = fillPercentages.negative;
	const zeroPositionPercent = fillPercentages.zero;

	const handleIncrement = () => {
		if (onChange && max !== undefined && current < max) {
			onChange(current + 1);
		} else if (onChange && max === undefined) {
			onChange(current + 1);
		}
	};

	const handleDecrement = () => {
		if (onTempChange && tempAmount > 0) {
			onTempChange(tempAmount - 1);
		} else if (onChange && current > min) {
			onChange(current - 1);
		}
	};

	return (
		<Container
			$size={size}
			$color={colorValue}
			className={className}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Label $size={size}>{label}</Label>

			<ValueContainer>
				{editable && onChange && (
					<ControlButton
						onClick={handleDecrement}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						aria-label={`Decrease ${label}`}
					>
						−
					</ControlButton>
				)}
				<CurrentValue
					$size={size}
					$color={current < 0 ? NEGATIVE_HP_COLOR : colorValue}
					key={current}
					initial={{ scale: 1.2 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				>
					{current}
				</CurrentValue>
				{max !== undefined && (
					<>
						<MaxValue $size={size}>/</MaxValue>
						<MaxValue $size={size}>{max}</MaxValue>
					</>
				)}
				{editable && onChange && (
					<ControlButton
						onClick={handleIncrement}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						aria-label={`Increase ${label}`}
					>
						+
					</ControlButton>
				)}
			</ValueContainer>

			{editable && onTempChange && temp !== undefined && (
				<ControlsRow>
					<TempInlineGroup>
						<ControlButton
							onClick={() => {
								onTempChange(Math.max(0, temp - 1));
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							aria-label="Decrease Temp HP"
						>
							−
						</ControlButton>
						<InlineControlLabel>Temp HP {temp}</InlineControlLabel>
						<ControlButton
							onClick={() => {
								onTempChange(temp + 1);
							}}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							aria-label="Increase Temp HP"
						>
							+
						</ControlButton>
					</TempInlineGroup>
				</ControlsRow>
			)}

			{showProgressBar && max !== undefined && (
				<ProgressBarContainer data-testid="resource-progress-bar">
					{min < 0 && (
						<>
							{negativeFillPercent > 0 && (
								<ProgressBar
									data-testid="negative-hp-fill"
									$color={NEGATIVE_HP_COLOR}
									style={{ right: `${100 - zeroPositionPercent}%` }}
									initial={{ width: 0 }}
									animate={{ width: `${negativeFillPercent}%` }}
									transition={{ duration: 0.25, ease: 'easeOut' }}
								/>
							)}
							<ZeroMarker
								data-testid="zero-hp-marker"
								aria-label="Zero HP"
								style={{ left: `${zeroPositionPercent}%` }}
							/>
						</>
					)}
					{/* Normal HP starts at the zero marker and fills the larger positive zone. */}
					{normalFillPercent > 0 && (
						<ProgressBar
							$color={colorValue}
							style={{ left: `${zeroPositionPercent}%` }}
							initial={{ width: 0 }}
							animate={{ width: `${normalFillPercent}%` }}
							transition={{ duration: 0.25, ease: 'easeOut' }}
						/>
					)}
					{/* Temp HP is always a separate gold segment. */}
					{tempFillPercent > 0 && (
						<ProgressBar
							$color={TEMP_HP_COLOR}
							style={{ left: `${zeroPositionPercent + normalFillPercent}%` }}
							initial={{ width: 0 }}
							animate={{ width: `${tempFillPercent}%` }}
							transition={{ duration: 0.25, ease: 'easeOut' }}
						/>
					)}
				</ProgressBarContainer>
			)}

			{afterProgressBar}
		</Container>
	);
};
