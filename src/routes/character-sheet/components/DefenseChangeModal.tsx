import React, { useState } from 'react';
import styled from 'styled-components';

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
	background: white;
	border: 3px solid #8b4513;
	border-radius: 8px;
	padding: 2rem;
	max-width: 500px;
	width: 90%;
	max-height: 90vh;
	overflow-y: auto;
`;

const ModalTitle = styled.h3`
	color: #8b4513;
	font-size: 1.25rem;
	font-weight: bold;
	margin: 0 0 1rem 0;
	text-align: center;
`;

const ChangeInfo = styled.div`
	background: #f9f9f9;
	border: 1px solid #8b4513;
	border-radius: 4px;
	padding: 1rem;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	color: #2d2d2d;
`;

const Label = styled.label`
	display: block;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
	width: 100%;
	min-height: 100px;
	padding: 0.75rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-family: 'Georgia', serif;
	font-size: 0.9rem;
	color: #2d2d2d;
	resize: vertical;

	&:focus {
		outline: none;
		border-color: #8b4513;
		box-shadow: 0 0 0 1px #8b4513;
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
	border: 1px solid #8b4513;
	border-radius: 4px;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.2s ease;

	${(props) =>
		props.variant === 'primary'
			? `
		background: #8b4513;
		color: white;
		
		&:hover {
			background-color: #6d3410;
		}
	`
			: `
		background: #f9f9f9;
		color: #8b4513;
		
		&:hover {
			background: #8b4513;
			color: white;
		}
	`}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
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
				<ModalTitle>Defense Change Reason</ModalTitle>

				<ChangeInfo>
					<strong>{defenseType}</strong> changed from <strong>{oldValue}</strong> to{' '}
					<strong>{newValue}</strong>
				</ChangeInfo>

				<Label htmlFor="reason">
					Why are you changing this defense value?
					<span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#666' }}>
						{' '}
						(e.g., "Equipped +2 Shield", "Cast Shield spell", "Monk stance bonus")
					</span>
				</Label>

				<TextArea
					id="reason"
					value={reason}
					onChange={(e) => setReason(e.target.value)}
					placeholder="Enter the reason for this defense change..."
					autoFocus
				/>

				<ButtonGroup>
					<Button variant="secondary" onClick={handleCancel}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleSubmit} disabled={!reason.trim()}>
						Save Change
					</Button>
				</ButtonGroup>

				<div
					style={{
						fontSize: '0.8rem',
						color: '#666',
						marginTop: '0.5rem',
						textAlign: 'center'
					}}
				>
					Press Ctrl+Enter to save, Esc to cancel
				</div>
			</ModalContent>
		</ModalOverlay>
	);
};

export default DefenseChangeModal;
