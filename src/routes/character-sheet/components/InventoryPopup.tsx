import React from 'react';
import { useTranslation } from 'react-i18next';
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
import { getInventoryItemInfo } from '../utils/inventoryItemInfo';

interface InventoryPopupProps {
	selectedInventoryItem: {
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null;
	onClose: () => void;
}

const InventoryPopup: React.FC<InventoryPopupProps> = ({ selectedInventoryItem, onClose }) => {
	const { t } = useTranslation();
	if (!selectedInventoryItem) return null;

	const infoList = getInventoryItemInfo(
		selectedInventoryItem.item,
		selectedInventoryItem.inventoryData
	);

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>
						{selectedInventoryItem.item?.name ||
							selectedInventoryItem.inventoryData.itemName ||
						t('characterSheet.inventoryUnknownItem')}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					{infoList.length > 0 ? (
						<ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
							{infoList.map((info) => (
								<li key={info.label} style={{ marginBottom: '0.5em' }}>
									<strong>{info.label}:</strong> {info.value}
								</li>
							))}
						</ul>
					) : (
						<>
							<strong>Custom Item</strong>
							<br />
							<strong>Type:</strong> {selectedInventoryItem.inventoryData.itemType}
							<br />
							<strong>Count:</strong> {selectedInventoryItem.inventoryData.count}
							<br />
							{selectedInventoryItem.inventoryData.cost && (
								<>
									<strong>Cost:</strong> {selectedInventoryItem.inventoryData.cost}
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
