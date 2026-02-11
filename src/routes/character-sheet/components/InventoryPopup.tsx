import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { InventoryItemData } from '../../../types';
import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription
} from '../styles/FeaturePopup';
import { theme } from '../styles/theme';
import { getInventoryItemInfo } from '../utils/inventoryItemInfo';

// ---------------------------------------------------------------------------
// Styled components for the editable custom item form
// ---------------------------------------------------------------------------

const EditableFieldLabel = styled.label`
	display: block;
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.sm};
	margin-bottom: ${theme.spacing[1]};
`;

const EditableTextarea = styled.textarea`
	width: 100%;
	min-height: 80px;
	padding: ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-family: inherit;
	resize: vertical;
	box-sizing: border-box;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

const EditableCostInput = styled.input`
	width: 100px;
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	background-color: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	box-sizing: border-box;
	transition: border-color 0.2s;

	&:focus {
		outline: none;
		border-color: ${theme.colors.border.focus};
	}

	&::placeholder {
		color: ${theme.colors.text.muted};
	}
`;

const EditableFieldGroup = styled.div`
	margin-bottom: ${theme.spacing[4]};
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface InventoryPopupProps {
	selectedInventoryItem: {
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null;
	onClose: () => void;
	/** Called when a custom freeform item's editable fields are changed */
	onUpdateCustomItem?: (itemId: string, updates: Partial<Pick<InventoryItemData, 'description' | 'cost'>>) => void;
}

const InventoryPopup: React.FC<InventoryPopupProps> = ({
	selectedInventoryItem,
	onClose,
	onUpdateCustomItem
}) => {
	const { t } = useTranslation();

	// Local state for the editable fields so typing feels instant
	const [description, setDescription] = useState('');
	const [cost, setCost] = useState('');

	// Sync local state when the popup opens or the selected item changes
	useEffect(() => {
		if (selectedInventoryItem) {
			setDescription(selectedInventoryItem.inventoryData.description || '');
			setCost(selectedInventoryItem.inventoryData.cost || '-');
		}
	}, [selectedInventoryItem]);

	if (!selectedInventoryItem) return null;

	const { inventoryData, item } = selectedInventoryItem;
	const isEditableCustom =
		inventoryData.itemType === 'Custom' && !inventoryData.customEquipmentId;

	const infoList = getInventoryItemInfo(item, inventoryData);

	/** Persist description changes back to inventory state */
	const handleDescriptionChange = (value: string) => {
		setDescription(value);
		onUpdateCustomItem?.(inventoryData.id, { description: value });
	};

	/** Persist cost changes back to inventory state */
	const handleCostChange = (value: string) => {
		setCost(value);
		onUpdateCustomItem?.(inventoryData.id, { cost: value });
	};

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>
						{item?.name ||
							inventoryData.itemName ||
							t('characterSheet.inventoryUnknownItem')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					{isEditableCustom ? (
						/* ── Editable form for custom freeform items ── */
						<>
							<EditableFieldGroup>
								<EditableFieldLabel>Description / Notes</EditableFieldLabel>
								<EditableTextarea
									placeholder="Describe this item..."
									value={description}
									onChange={(e) => handleDescriptionChange(e.target.value)}
								/>
							</EditableFieldGroup>

							<EditableFieldGroup>
								<EditableFieldLabel>Cost</EditableFieldLabel>
								<EditableCostInput
									type="text"
									placeholder="e.g. 5g"
									value={cost}
									onChange={(e) => handleCostChange(e.target.value)}
								/>
							</EditableFieldGroup>

							{/* Always show count (read-only, controlled from the row) */}
							<div style={{ marginBottom: theme.spacing[2] }}>
								<strong>Count:</strong> {inventoryData.count}
							</div>
						</>
					) : infoList.length > 0 ? (
						/* ── Read-only info list (standard items + Equipage custom) ── */
						<ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
							{infoList.map((info) => (
								<li key={info.label} style={{ marginBottom: '0.5em' }}>
									<strong>{info.label}:</strong> {info.value}
								</li>
							))}
						</ul>
					) : (
						/* ── Fallback for unknown items ── */
						<>
							<strong>Custom Item</strong>
							<br />
							<strong>Type:</strong> {inventoryData.itemType}
							<br />
							<strong>Count:</strong> {inventoryData.count}
							<br />
							{inventoryData.cost && (
								<>
									<strong>Cost:</strong> {inventoryData.cost}
								</>
							)}
						</>
					)}
				</StyledFeaturePopupDescription>
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default InventoryPopup;
