import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: ${theme.colors.bg.secondary};
	border: 3px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.lg};
	padding: 2rem;
	max-width: 500px;
	width: 90%;
	max-height: 90vh;
	overflow-y: auto;
`;

const ModalTitle = styled.h3`
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	margin: 0 0 1rem 0;
	text-align: center;
`;

const ChangeInfo = styled.div`
	background: ${theme.colors.bg.elevated};
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.sm};
	padding: 1rem;
	margin-bottom: 1rem;
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
`;

const Label = styled.label`
	display: block;
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
	width: 100%;
	min-height: 100px;
	padding: 0.75rem;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	font-family: ${theme.typography.fontFamily.primary};
	font-size: ${theme.typography.fontSize.sm};
	color: ${theme.colors.text.primary};
	background: ${theme.colors.bg.primary};
	resize: vertical;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
		box-shadow: 0 0 0 2px rgba(125, 207, 255, 0.2);
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 0.75rem;
	justify-content: flex-end;
	margin-top: 1.5rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
	padding: 0.5rem 1rem;
	border: 1px solid ${theme.colors.accent.primary};
	border-radius: ${theme.borderRadius.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	${(props) =>
		props.variant === 'primary'
			? `
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		
		&:hover {
			background-color: ${theme.colors.accent.secondary};
			transform: translateY(-1px);
		}
	`
			: `
		background: ${theme.colors.bg.elevated};
		color: ${theme.colors.text.primary};
		
		&:hover {
			background: ${theme.colors.accent.primary};
			color: ${theme.colors.text.inverse};
		}
	`}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const LabelHint = styled.span`
	font-size: 0.8rem;
	font-weight: normal;
	color: ${theme.colors.text.muted};
`;

const KeyboardHint = styled.div`
	font-size: 0.8rem;
	color: ${theme.colors.text.muted};
	margin-top: 0.5rem;
	text-align: center;
`;

interface DefenseChangeModalProps {
	isOpen: boolean;
	defenseType: string;
	oldValue: number;
	newValue: number;
	onConfirm: (reason: string) => void;
	onCancel: () => void;
}

const DefenseChangeModal: React.FC<DefenseChangeModalProps> = ({
	isOpen,
	defenseType,
	oldValue,
	newValue,
	onConfirm,
	onCancel
}) => {
	const { t } = useTranslation();
	const [reason, setReason] = useState('');

	if (!isOpen) return null;

	const handleSubmit = () => {
		if (reason.trim()) {
			onConfirm(reason.trim());
			setReason('');
		}
	};

	const handleCancel = () => {
		onCancel();
		setReason('');
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleCancel();
		} else if (e.key === 'Enter' && e.ctrlKey && reason.trim()) {
			handleSubmit();
		}
	};

	return (
		<ModalOverlay onClick={handleCancel} onKeyDown={handleKeyDown}>
			<ModalContent onClick={(e) => e.stopPropagation()}>
				<ModalTitle>{t('characterSheet.defenseModalTitle')}</ModalTitle>

				<ChangeInfo>
					<Trans
						i18nKey="characterSheet.defenseModalChanged"
						values={{ defenseType, oldValue, newValue }}
						components={{ strong: <strong /> }}
					/>
				</ChangeInfo>

				<Label htmlFor="reason">
					{t('characterSheet.defenseModalPrompt')}
					<LabelHint> {t('characterSheet.defenseModalHint')}</LabelHint>
				</Label>

				<TextArea
					id="reason"
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					placeholder={t('characterSheet.defenseModalPlaceholder')}
					autoFocus
				/>

				<ButtonGroup>
					<Button variant="secondary" onClick={handleCancel}>
						{t('characterSheet.defenseModalCancel')}
					</Button>
					<Button variant="primary" onClick={handleSubmit} disabled={!reason.trim()}>
						{t('characterSheet.defenseModalSave')}
					</Button>
				</ButtonGroup>

				<KeyboardHint>{t('characterSheet.defenseModalKeyboardHint')}</KeyboardHint>
			</ModalContent>
		</ModalOverlay>
	);
};

export default DefenseChangeModal;
