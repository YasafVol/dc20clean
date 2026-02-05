import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import type { SaveStatus } from '../hooks/CharacterSheetProvider';
import { logger } from '../../../lib/utils/logger';

interface AutoSaveIndicatorProps {
	status: SaveStatus;
	onRetry: () => void;
}

export function AutoSaveIndicator({ status, onRetry }: AutoSaveIndicatorProps) {
	logger.debug('ui', 'AutoSaveIndicator render', { status });

	// Don't render anything when idle
	if (status === 'idle') return null;

	return (
		<AnimatePresence>
			<Container
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.2 }}
			>
				{status === 'saving' && (
					<Content>
						<Spinner />
						<Text>Saving...</Text>
					</Content>
				)}

				{status === 'saved' && (
					<Content>
						<CheckIcon>✓</CheckIcon>
						<Text>Saved</Text>
					</Content>
				)}

				{status === 'error' && (
					<Content $isError>
						<ErrorIcon>⚠</ErrorIcon>
						<Text>Save failed</Text>
						<RetryButton onClick={onRetry}>Retry</RetryButton>
					</Content>
				)}
			</Container>
		</AnimatePresence>
	);
}

const Container = styled(motion.div)`
	position: fixed;
	top: ${theme.spacing.lg};
	right: ${theme.spacing.lg};
	z-index: 9999;
	pointer-events: auto;
`;

const Content = styled.div<{ $isError?: boolean }>`
	display: flex;
	align-items: center;
	gap: ${theme.spacing.sm};
	padding: ${theme.spacing.sm} ${theme.spacing.md};
	background: ${(props) => (props.$isError ? 'rgba(239, 68, 68, 0.9)' : 'rgba(26, 27, 38, 0.95)')};
	border: 1px solid ${(props) => (props.$isError ? theme.colors.error : theme.colors.borderPrimary)};
	border-radius: ${theme.borderRadius.md};
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(8px);
	font-family: ${theme.typography.fontFamily};
`;

const Text = styled.span`
	color: ${theme.colors.text};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: 500;
`;

const Spinner = styled.div`
	width: 16px;
	height: 16px;
	border: 2px solid ${theme.colors.borderSecondary};
	border-top-color: ${theme.colors.accent};
	border-radius: 50%;
	animation: spin 0.8s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

const CheckIcon = styled.span`
	color: ${theme.colors.success};
	font-size: 18px;
	font-weight: bold;
	line-height: 1;
`;

const ErrorIcon = styled.span`
	color: ${theme.colors.warning};
	font-size: 18px;
	font-weight: bold;
	line-height: 1;
`;

const RetryButton = styled.button`
	padding: ${theme.spacing.xs} ${theme.spacing.sm};
	background: ${theme.colors.accent};
	color: ${theme.colors.text};
	border: none;
	border-radius: ${theme.borderRadius.sm};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${theme.colors.accentHover};
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;
