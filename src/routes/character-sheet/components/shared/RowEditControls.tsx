import { Check, Pencil } from 'lucide-react';
import styled from 'styled-components';
import DeleteButton from './DeleteButton';
import { theme } from '../../styles/theme';

const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: ${theme.spacing[1]};
`;

const EditButton = styled.button`
	width: 24px;
	height: 24px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.sm};
	background: transparent;
	color: ${theme.colors.text.secondary};
	cursor: pointer;

	&:hover,
	&:focus-visible {
		border-color: ${theme.colors.accent.primary};
		color: ${theme.colors.accent.primary};
		background: ${theme.colors.bg.elevated};
		outline: none;
	}
`;

interface RowEditControlsProps {
	isEditing: boolean;
	onToggle: () => void;
	onDelete: () => void;
	itemLabel: string;
	isMobile?: boolean;
	toggleTestId?: string;
}

export default function RowEditControls({
	isEditing,
	onToggle,
	onDelete,
	itemLabel,
	isMobile,
	toggleTestId
}: RowEditControlsProps) {
	const action = isEditing ? 'Finish editing' : 'Edit';

	return (
		<Actions>
			<EditButton
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					onToggle();
				}}
				aria-label={`${action} ${itemLabel}`}
				title={`${action} ${itemLabel}`}
				data-testid={toggleTestId}
			>
				{isEditing ? <Check size={14} /> : <Pencil size={14} />}
			</EditButton>
			{isEditing && (
				<DeleteButton
					onClick={(event) => {
						event.stopPropagation();
						onDelete();
					}}
					title={`Delete ${itemLabel}`}
					$isMobile={isMobile}
				/>
			)}
		</Actions>
	);
}
