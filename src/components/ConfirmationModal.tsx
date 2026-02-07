import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
	ModalOverlay,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter
} from './styled/Modal';
import { PrimaryButton, SecondaryButton } from './styled/index';

interface ConfirmationModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	variant?: 'default' | 'success' | 'danger';
	onConfirm: () => void;
	onCancel: () => void;
}

/**
 * Confirmation Modal Component
 * 
 * Tokyo Night themed modal for confirmation dialogs.
 * Uses the same styling pattern as feature/weapon/spell popups.
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	title,
	message,
	confirmText,
	cancelText,
	variant = 'default',
	onConfirm,
	onCancel
}) => {
	const { t } = useTranslation();
	const finalConfirmText = confirmText || t('common.confirm');
	const finalCancelText = cancelText || t('common.cancel');
	return (
		<AnimatePresence>
			{isOpen && (
				<ModalOverlay
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onCancel}
				>
					<Modal
						$variant={variant}
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						<ModalHeader>
							<ModalTitle $variant={variant}>{title}</ModalTitle>
							<ModalDescription>{message}</ModalDescription>
						</ModalHeader>

						<ModalFooter>
						<SecondaryButton onClick={onCancel}>{finalCancelText}</SecondaryButton>
						<PrimaryButton onClick={onConfirm}>{finalConfirmText}</PrimaryButton>
						</ModalFooter>
					</Modal>
				</ModalOverlay>
			)}
		</AnimatePresence>
	);
};

export default ConfirmationModal;
