import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../routes/character-sheet/styles/theme';

// Text input
export const Input = styled.input`
	width: 100%;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	border: 2px solid ${theme.colors.bg.tertiary};
	border-radius: 8px;
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	transition: all 0.2s ease;

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.crystal.primary};
		box-shadow: 0 0 0 3px ${theme.colors.crystal.primaryAlpha20};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

// Textarea
export const TextArea = styled.textarea`
	width: 100%;
	min-height: 300px;
	padding: ${theme.spacing[4]};
	background: rgba(0, 0, 0, 0.3);
	border: 2px solid ${theme.colors.bg.tertiary};
	border-radius: 8px;
	color: ${theme.colors.text.primary};
	font-family: 'Courier New', monospace;
	font-size: ${theme.typography.fontSize.sm};
	resize: vertical;
	transition: all 0.2s ease;

	&::placeholder {
		color: ${theme.colors.text.muted};
	}

	&:focus {
		outline: none;
		border-color: ${theme.colors.crystal.primary};
		box-shadow: 0 0 0 3px ${theme.colors.crystal.primaryAlpha20};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

// Label
export const Label = styled.label`
	display: block;
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin-bottom: ${theme.spacing[2]};
`;

// Form group (label + input wrapper)
export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
	width: 100%;
`;

// Message (error/success/info)
export const Message = styled(motion.div)<{ $type: 'error' | 'success' | 'info' }>`
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border-radius: 8px;
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	border: 2px solid
		${(props) => {
			switch (props.$type) {
				case 'error':
					return theme.colors.accent.danger;
				case 'success':
					return 'rgb(16, 185, 129)';
				case 'info':
					return theme.colors.crystal.primary;
			}
		}};
	background: ${(props) => {
		switch (props.$type) {
			case 'error':
				return theme.colors.accent.dangerAlpha10;
			case 'success':
				return 'rgba(16, 185, 129, 0.1)';
			case 'info':
				return theme.colors.crystal.primaryAlpha10;
		}
	}};
	color: ${(props) => {
		switch (props.$type) {
			case 'error':
				return theme.colors.accent.danger;
			case 'success':
				return 'rgb(16, 185, 129)';
			case 'info':
				return theme.colors.crystal.primary;
		}
	}};
`;

// Select dropdown
export const Select = styled.select`
	width: 100%;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	border: 2px solid ${theme.colors.bg.tertiary};
	border-radius: 8px;
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	cursor: pointer;
	transition: all 0.2s ease;

	&:focus {
		outline: none;
		border-color: ${theme.colors.crystal.primary};
		box-shadow: 0 0 0 3px ${theme.colors.crystal.primaryAlpha20};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	option {
		background: ${theme.colors.bg.primary};
		color: ${theme.colors.text.primary};
	}
`;

// Checkbox
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
	width: 20px;
	height: 20px;
	cursor: pointer;
	accent-color: ${theme.colors.crystal.primary};
`;

// Radio button
export const Radio = styled.input.attrs({ type: 'radio' })`
	width: 20px;
	height: 20px;
	cursor: pointer;
	accent-color: ${theme.colors.crystal.primary};
`;
