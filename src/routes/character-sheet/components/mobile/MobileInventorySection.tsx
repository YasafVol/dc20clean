import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileItemGrid,
	MobileItem,
	MobileItemName,
	MobileItemDetails,
	MobileAddButton,
	MobileDeleteButton,
	MobileSelect
} from '../../styles/CharacterSheetMobile.styles';

interface MobileInventorySectionProps {
	inventory: any;
	allItems: any[];
	handleAddInventoryItem: () => void;
	handleRemoveInventoryItem: (itemId: string) => void;
	handleInventorySelection: (itemId: string, selectedItemName: string) => void;
	openInventoryPopup: (data: any) => void;
}

const MobileInventorySection: React.FC<MobileInventorySectionProps> = ({
	inventory,
	allItems,
	handleAddInventoryItem,
	handleRemoveInventoryItem,
	handleInventorySelection,
	openInventoryPopup
}) => {
	const items = inventory?.items || [];

	return (
		<MobileSection>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<MobileSectionTitle>Inventory</MobileSectionTitle>
				<MobileAddButton onClick={handleAddInventoryItem}>
					+ Add Item
				</MobileAddButton>
			</div>
			{items.length > 0 && (
				<MobileItemGrid>
					{items.map((item: any) => (
						<MobileItem key={item.id} style={{ position: 'relative' }}>
							<MobileDeleteButton
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveInventoryItem(item.id);
								}}
							>
								×
							</MobileDeleteButton>
							{(item as any).isPending ? (
								// Show dropdown for pending inventory items
								<div style={{ padding: '8px' }}>
									<MobileSelect
										value=""
										onChange={(e) => {
											if (e.target.value) {
												handleInventorySelection(item.id, e.target.value);
											}
										}}
									>
										<option value="">Select an item...</option>
										{allItems.map((ruleItem) => (
											<option key={ruleItem.name} value={ruleItem.name}>
												{ruleItem.name} ({ruleItem.itemType})
											</option>
										))}
									</MobileSelect>
								</div>
							) : (
								// Show normal inventory item display
								<div onClick={() => openInventoryPopup({ inventoryData: inventory, item: item })}>
									<MobileItemName>{item.name}</MobileItemName>
									<MobileItemDetails>
										{item.quantity && <div>Qty: {item.quantity}</div>}
										{item.weight && <div>Weight: {item.weight}</div>}
									</MobileItemDetails>
								</div>
							)}
						</MobileItem>
					))}
				</MobileItemGrid>
			)}
		</MobileSection>
	);
};

export default MobileInventorySection;