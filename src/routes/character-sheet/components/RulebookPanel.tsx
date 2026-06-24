import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { theme } from '../styles/theme';
// Vite bundles this PDF and gives us a hashed URL we can load into an iframe.
// The browser's built-in PDF viewer provides search, navigation and zoom for
// free, so we don't need to ship pdfjs-dist for this MVP.
import rulebookUrl from '../../../../docs/assets/DC20 RPG 0.10.5 Beta v1.pdf?url';

const Backdrop = styled(motion.div)`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.55);
	z-index: ${theme.zIndex.modal - 1};
`;

const Panel = styled(motion.aside)`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: min(720px, 90vw);
	background: ${theme.colors.bg.elevated};
	border-left: 1px solid ${theme.colors.border.default};
	box-shadow: ${theme.shadows.xl};
	z-index: ${theme.zIndex.modal};
	display: flex;
	flex-direction: column;

	@media (max-width: 640px) {
		width: 100vw;
		border-left: none;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	border-bottom: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.secondary};
`;

const Title = styled.h3`
	margin: 0;
	font-size: ${theme.typography.fontSize.lg};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
`;

const HeaderRight = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};
`;

const HeaderButton = styled.button`
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	padding: ${theme.spacing[2]} ${theme.spacing[3]};
	cursor: pointer;
	transition: background ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		border-color: ${theme.colors.accent.primary};
	}
`;

const CloseButton = styled(HeaderButton)`
	width: 32px;
	height: 32px;
	padding: 0;
	font-size: ${theme.typography.fontSize.lg};
	line-height: 1;
`;

const SearchHint = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.muted};
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	background: ${theme.colors.bg.secondary};
	border-bottom: 1px solid ${theme.colors.border.default};
`;

const PdfFrame = styled.iframe`
	flex: 1;
	width: 100%;
	border: none;
	background: ${theme.colors.bg.primary};
`;

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || '');

interface RulebookPanelProps {
	open: boolean;
	onClose: () => void;
}

const RulebookPanel: React.FC<RulebookPanelProps> = ({ open, onClose }) => {
	const { t } = useTranslation();

	// Close on ESC
	React.useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<>
					<Backdrop
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={onClose}
					/>
					<Panel
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', stiffness: 260, damping: 30 }}
						aria-modal="true"
						role="dialog"
						aria-label={t('characterSheet.rulebookTitle')}
					>
						<Header>
							<Title>📖 {t('characterSheet.rulebookTitle')}</Title>
							<HeaderRight>
								<HeaderButton as="a" href={rulebookUrl} target="_blank" rel="noopener">
									{t('characterSheet.rulebookOpenNewTab')} ↗
								</HeaderButton>
								<CloseButton onClick={onClose} title={t('characterSheet.rulebookClose')}>
									×
								</CloseButton>
							</HeaderRight>
						</Header>
						<SearchHint>
							{t('characterSheet.rulebookSearchHint', {
								shortcut: isMac ? '⌘F' : 'Ctrl+F'
							})}
						</SearchHint>
						{/* Use #toolbar=1 to force the browser's PDF toolbar so search and
						    navigation are always accessible inside the iframe. */}
						<PdfFrame
							src={`${rulebookUrl}#toolbar=1&navpanes=0`}
							title={t('characterSheet.rulebookTitle')}
						/>
					</Panel>
				</>
			)}
		</AnimatePresence>
	);
};

export default RulebookPanel;
