import React from 'react';
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

interface InventoryPopupProps {
	selectedInventoryItem: {
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null;
	onClose: () => void;
}

const InventoryPopup: React.FC<InventoryPopupProps> = ({ selectedInventoryItem, onClose }) => {
	if (!selectedInventoryItem) return null;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>
						{selectedInventoryItem.item?.name ||
							selectedInventoryItem.inventoryData.itemName ||
							'Unknown Item'}
					</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					{selectedInventoryItem.item ? (
						<>
							<strong>Type:</strong> {selectedInventoryItem.item.itemType}
							<br />
							{selectedInventoryItem.item.itemType === 'Weapon' && (
								<>
									<strong>Weapon Type:</strong> {(selectedInventoryItem.item as any).type}
									<br />
									<strong>Style:</strong> {(selectedInventoryItem.item as any).style}
									<br />
									<strong>Handedness:</strong> {(selectedInventoryItem.item as any).handedness}
									<br />
									<strong>Damage:</strong> {(selectedInventoryItem.item as any).damage}
									<br />
									{(selectedInventoryItem.item as any).properties && (
										<>
											<strong>Properties:</strong>{' '}
											{(selectedInventoryItem.item as any).properties.join(', ')}
											<br />
										</>
									)}
									{(selectedInventoryItem.item as any).price && (
										<>
											<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
											<br />
										</>
									)}
								</>
							)}
							{selectedInventoryItem.item.itemType === 'Armor' && (
								<>
									<strong>Type:</strong> {(selectedInventoryItem.item as any).type}
									<br />
									<strong>PDR:</strong> {(selectedInventoryItem.item as any).pdr}
									<br />
									<strong>AD Modifier:</strong> {(selectedInventoryItem.item as any).adModifier}
									<br />
									{(selectedInventoryItem.item as any).agilityCap && (
										<>
											<strong>Agility Cap:</strong>{' '}
											{(selectedInventoryItem.item as any).agilityCap}
											<br />
										</>
									)}
									{(selectedInventoryItem.item as any).price && (
										<>
											<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
											<br />
										</>
									)}
								</>
							)}
							{selectedInventoryItem.item.itemType === 'Shield' && (
								<>
									<strong>PDR:</strong> {(selectedInventoryItem.item as any).pdr}
									<br />
									<strong>AD Modifier:</strong> {(selectedInventoryItem.item as any).adModifier}
									<br />
									{(selectedInventoryItem.item as any).price && (
										<>
											<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
											<br />
										</>
									)}
								</>
							)}
							{selectedInventoryItem.item.itemType === 'Potion' && (
								<>
									<strong>Level:</strong> {(selectedInventoryItem.item as any).level}
									<br />
									<strong>Healing:</strong> {(selectedInventoryItem.item as any).healing}
									<br />
									<strong>Price:</strong> {(selectedInventoryItem.item as any).price}g<br />
								</>
							)}
							{selectedInventoryItem.item.itemType === 'Adventuring Supply' && (
								<>
									{(selectedInventoryItem.item as any).description && (
										<>
											<strong>Description:</strong>{' '}
											{(selectedInventoryItem.item as any).description}
											<br />
										</>
									)}
									{(selectedInventoryItem.item as any).price && (
										<>
											<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
											<br />
										</>
									)}
								</>
							)}
							<br />
							<strong>Count:</strong> {selectedInventoryItem.inventoryData.count}
							<br />
							{selectedInventoryItem.inventoryData.cost && (
								<>
									<strong>Cost:</strong> {selectedInventoryItem.inventoryData.cost}
								</>
							)}
						</>
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
