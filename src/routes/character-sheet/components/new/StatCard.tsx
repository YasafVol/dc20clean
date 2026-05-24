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
`;

const ProgressBar = styled(motion.div)<{ $color: string }>`
	height: 100%;
	background: ${(props) => props.$color};
	border-radius: ${theme.borderRadius.full};
	transition: width ${theme.transitions.base};
`;

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
	// Temp HP increases MAX, not current
	const effectiveMax = max !== undefined ? max + (temp || 0) : undefined;
	const percentage = effectiveMax
		? (current / effectiveMax) * 100
		: max
			? (current / max) * 100
			: 100;

	const handleIncrement = () => {
		if (onChange && effectiveMax && current < effectiveMax) {
			onChange(current + 1);
		}
	};

	const handleDecrement = () => {
		if (onChange && current > 0) {
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
				<CurrentValue
					$size={size}
					$color={colorValue}
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
						<MaxValue $size={size}>{effectiveMax}</MaxValue>
					</>
				)}
				{temp !== undefined && temp !== 0 && (
					<TempValue $size={size} $color={colorValue}>
						{temp > 0 ? `+${temp}` : temp} temp
					</TempValue>
				)}
			</ValueContainer>

			{showProgressBar && max !== undefined && (
				<ProgressBarContainer>
					<ProgressBar
						$color={colorValue}
						initial={{ width: 0 }}
						animate={{ width: `${percentage}%` }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					/>
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
									const newTemp = temp - 1;
									onTempChange(newTemp);
									// If reducing temp HP causes current to exceed new max, clamp current
									if (onChange && max !== undefined) {
										const newEffectiveMax = max + newTemp;
										if (current > newEffectiveMax) {
											setTimeout(() => onChange(newEffectiveMax), 0);
										}
									}
								}}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								−
							</ControlButton>
							<ControlButton
								onClick={() => onTempChange(temp + 1)}
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
