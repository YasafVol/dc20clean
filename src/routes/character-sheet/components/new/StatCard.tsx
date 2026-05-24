import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

type StatSize = 'small' | 'medium' | 'large';

interface StatCardProps {
	label: string;
	current: number;
	max?: number;
	temp?: number;
	color?: 'health' | 'mana' | 'stamina' | 'grit';
	size?: StatSize;
	showProgressBar?: boolean;
	editable?: boolean;
	onChange?: (value: number) => void;
	onTempChange?: (value: number) => void;
	onMouseEnter?: (e: React.MouseEvent) => void;
	onMouseLeave?: () => void;
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

const TempValue = styled.span<{ $size: StatSize; $color: string }>`
	color: ${(props) => props.$color};
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
	opacity: 0.9;
	margin-left: ${theme.spacing[2]};
`;

const ProgressBarContainer = styled.div`
	width: 100%;
	height: 6px;
	background: ${theme.colors.bg.primary};
	border-radius: ${theme.borderRadius.full};
	overflow: hidden;
	margin-top: ${theme.spacing[2]};
	display: flex;
`;

const ProgressBar = styled(motion.div)<{ $color: string }>`
	height: 100%;
	background: ${(props) => props.$color};
	/* No CSS transition for width — Framer Motion owns the width animation below.
	   Having both stacks ease-in-out + ease-out and produces a slow-then-fast jump. */
`;

// Gold/amber colour used to indicate HP that has been pushed beyond the normal
// max via temp HP. Sits next to the normal resource colour inside the bar.
const TEMP_HP_COLOR = theme.colors.accent.warning;

// Row that holds the Main +/- and (when present) a small Temp HP pill. Both
// groups are centered as a single cluster; if the card is too narrow the
// pill wraps to its own line below — still centered.
const ControlsRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.spacing[3]};
	margin-top: ${theme.spacing[3]};
	flex-wrap: wrap;
`;

// Compact inline group: "MAIN  −  +" sitting flush-left on its own row.
const InlineControlGroup = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
`;

// Same inline group but framed as its own small box so Temp HP visually
// reads as a distinct mini-stat next to Main HP.
const TempInlineGroup = styled(InlineControlGroup)`
	background: ${theme.colors.bg.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
`;

const InlineControlLabel = styled.span`
	color: ${theme.colors.text.secondary};
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
	temp,
	color = 'health',
	size = 'large',
	showProgressBar = true,
	editable = true,
	onChange,
	onTempChange,
	onMouseEnter,
	onMouseLeave,
	className
}) => {
	const colorValue = theme.colors.resource[color];

	// New temp HP model:
	//   - max is displayed as-is (temp does NOT raise the displayed max)
	//   - current can exceed max when temp HP is granted (the "overflow" portion
	//     is rendered with TEMP_HP_COLOR so the player can see it visually)
	//   - The healing ceiling (cap for main "+") stays at max + temp so the
	//     player can still heal up to their full potential including granted temp.
	const tempAmount = temp ?? 0;
	const healingCap = max !== undefined ? max + tempAmount : undefined;
	const totalCapacity = healingCap; // alias for clarity in bar math
	const isOverMax = max !== undefined && current > max;

	// Two-segment bar:
	//   - normalFillPercent: the red/resource-coloured portion (current up to max)
	//   - tempFillPercent:   the gold portion (current above max, if any)
	// Both percentages are computed against totalCapacity so the two segments
	// together fit inside one 100%-wide bar.
	const normalFillPercent =
		totalCapacity && totalCapacity > 0 && max !== undefined
			? Math.min(100, (Math.min(current, max) / totalCapacity) * 100)
			: 0;
	const tempFillPercent =
		totalCapacity && totalCapacity > 0 && max !== undefined && current > max
			? Math.min(100, ((current - max) / totalCapacity) * 100)
			: 0;

	const handleIncrement = () => {
		if (onChange && healingCap !== undefined && current < healingCap) {
			onChange(current + 1);
		} else if (onChange && healingCap === undefined) {
			onChange(current + 1);
		}
	};

	const handleDecrement = () => {
		if (onChange && current > 0) {
			onChange(current - 1);
			// Damage hits Temp HP first (standard D&D rule). If a temp buffer
			// exists, this damage point consumes 1 from the buffer. Once temp
			// reaches 0, further damage starts eating real HP. Because we
			// decrement current AND temp by the same amount, the "real HP"
			// portion of the bar (red) stays at its current width while only
			// the gold/temp segment shrinks — which is exactly the behaviour
			// the user expects.
			if (onTempChange && tempAmount > 0) {
				onTempChange(Math.max(0, tempAmount - 1));
			}
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
				<CurrentValue
					$size={size}
					$color={isOverMax ? TEMP_HP_COLOR : colorValue}
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
				{temp !== undefined && temp !== 0 && (
					<TempValue $size={size} $color={TEMP_HP_COLOR}>
						{temp > 0 ? `+${temp}` : temp} temp
					</TempValue>
				)}
			</ValueContainer>

			{showProgressBar && max !== undefined && (
				<ProgressBarContainer>
					{/* Normal HP segment (0 to max) — uses the resource colour. */}
					<ProgressBar
						$color={colorValue}
						initial={{ width: 0 }}
						animate={{ width: `${normalFillPercent}%` }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
					/>
					{/* Temp HP overflow segment (max to max+temp) — gold, only when
					    the player is currently above max. */}
					{tempFillPercent > 0 && (
						<ProgressBar
							$color={TEMP_HP_COLOR}
							initial={{ width: 0 }}
							animate={{ width: `${tempFillPercent}%` }}
							transition={{ duration: 0.25, ease: 'easeOut' }}
						/>
					)}
				</ProgressBarContainer>
			)}

			{editable && onChange && (
				<ControlsRow>
					{/* Left: MAIN −/+ flush to the left edge of the card. */}
					<InlineControlGroup>
						<InlineControlLabel>Main</InlineControlLabel>
						<ControlButton
							onClick={handleDecrement}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							−
						</ControlButton>
						<ControlButton
							onClick={handleIncrement}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							+
						</ControlButton>
					</InlineControlGroup>

					{/* Right: TEMP HP in its own little framed box, only when supported. */}
					{onTempChange && temp !== undefined && (
						<TempInlineGroup>
							<InlineControlLabel>Temp HP</InlineControlLabel>
							<ControlButton
								onClick={() => {
									// Temp HP MINUS:
									// - Always reduce temp tracker by 1 (clamped at 0).
									// - If current is currently above max, that means the temp buffer
									//   is actively boosting HP, so also reduce current by 1.
									// - If current is at or below max, the temp buffer isn't being
									//   "used" so current stays put.
									const newTemp = Math.max(0, temp - 1);
									onTempChange(newTemp);
									if (onChange && max !== undefined && current > max) {
										onChange(Math.max(0, current - 1));
									}
								}}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								−
							</ControlButton>
							<ControlButton
								onClick={() => {
									// Temp HP PLUS:
									// - Increment temp tracker by 1.
									// - Also increment current HP by 1 so the grant gives an
									//   immediate HP boost. Max stays unchanged; when current
									//   exceeds max the bar shows a gold overflow segment.
									onTempChange(temp + 1);
									if (onChange) {
										onChange(current + 1);
									}
								}}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								+
							</ControlButton>
						</TempInlineGroup>
					)}
				</ControlsRow>
			)}
		</Container>
	);
};
