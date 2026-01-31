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

const Controls = styled.div`
	display: flex;
	gap: ${theme.spacing[2]};
	margin-top: ${theme.spacing[3]};
	justify-content: center;
	flex-wrap: wrap;
`;

const ControlLabel = styled.div`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	width: 100%;
	text-align: center;
	margin-bottom: ${theme.spacing[1]};
`;

const ControlButton = styled(motion.button)`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: none;
	border-radius: ${theme.borderRadius.md};
	width: 32px;
	height: 32px;
	cursor: pointer;
	font-size: ${theme.typography.fontSize.lg};
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
	className
}) => {
	const colorValue = theme.colors.resource[color];
	const percentage = max ? (current / max) * 100 : 100;

	const handleIncrement = () => {
		if (onChange && max && current < max) {
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
						<MaxValue $size={size}>{max}</MaxValue>
					</>
				)}
				{temp !== undefined && temp > 0 && (
					<TempValue $size={size} $color={colorValue}>
						+{temp}
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
				<Controls>
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
				</Controls>
			)}
		</Container>
	);
};
