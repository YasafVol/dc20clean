import React from 'react';
import type { InventoryItemData } from '../../../types';
import { allItems, type InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import {
	StyledInventorySection,
	StyledInventoryTitle,
	StyledAddItemButton,
	StyledInventoryContainer,
	StyledInventoryHeaderRow,
	StyledInventoryHeaderColumn,
	StyledInventoryRow,
	StyledRemoveItemButton,
	StyledInventorySelect,
	StyledInventoryInput,
	StyledInventoryInfoIcon,
	StyledInventoryCost,
	StyledEmptyInventory
} from '../styles/Inventory';

export interface InventoryProps {
	inventory: InventoryItemData[];
	setInventory: React.Dispatch<React.SetStateAction<InventoryItemData[]>>;
	onItemClick: (inventoryData: InventoryItemData, item: InventoryItem | null) => void;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, setInventory, onItemClick }) => {
	const addInventorySlot = () => {
		const newInventoryItem: InventoryItemData = {
			id: `inventory_${Date.now()}`,
			itemType: '',
			itemName: '',
			count: 1,
			cost: '-'
		};
		setInventory((prev) => [...prev, newInventoryItem]);
	};

	const removeInventorySlot = (inventoryIndex: number) => {
		setInventory((prev) => prev.filter((_, index) => index !== inventoryIndex));
	};

	const handleInventoryItemSelect = (
		inventoryIndex: number,
		itemTypeOrName: string,
		isItemName: boolean = false
	) => {
		if (!isItemName) {
			// Selecting item type
			const itemType = itemTypeOrName as InventoryItemData['itemType'];
			setInventory((prev) =>
				prev.map((item, index) =>
					index === inventoryIndex ? { ...item, itemType, itemName: '', cost: '-' } : item
				)
			);
		} else {
			// Selecting item name
			const selectedItem = allItems.find((i: any) => i.name === itemTypeOrName);
			setInventory((prev) =>
				prev.map((item, index) =>
					index === inventoryIndex
						? {
								...item,
								itemName: itemTypeOrName,
								itemType: selectedItem?.itemType || item.itemType,
								cost: getItemCost(selectedItem)
							}
						: item
				)
			);
		}
	};

	const handleInventoryCountChange = (inventoryIndex: number, count: number) => {
		setInventory((prev) =>
			prev.map((item, index) =>
				index === inventoryIndex ? { ...item, count: Math.max(1, count) } : item
			)
		);
	};

	const getItemCost = (item: InventoryItem | undefined | null, count: number = 1): string => {
		if (!item || !('price' in item)) return '-';

		let basePrice = 0;
		let currency = 'g';

		if (typeof item.price === 'string') {
			// Parse string prices like "10g", "5s", etc.
			const match = item.price.match(/(\d+)([gs]?)/);
			if (match) {
				basePrice = parseInt(match[1]);
				currency = match[2] || 'g';
			}
		} else if (typeof item.price === 'number') {
			basePrice = item.price;
		}

		if (basePrice === 0) return '-';

		const totalPrice = basePrice * count;
		return `${totalPrice}${currency}`;
	};

	return (
		<StyledInventorySection>
			<StyledInventoryTitle>INVENTORY</StyledInventoryTitle>

			{/* Add Item Button */}
			<StyledAddItemButton onClick={addInventorySlot}>+ Add Item</StyledAddItemButton>

			<StyledInventoryContainer>
				<StyledInventoryHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledInventoryHeaderColumn>Type</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn>Item</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">Count</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">
						<StyledInventoryInfoIcon>i</StyledInventoryInfoIcon>
					</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">Cost</StyledInventoryHeaderColumn>
				</StyledInventoryHeaderRow>

				{inventory.length === 0 ? (
					<StyledEmptyInventory>
						No items added. Click "Add Item" to add your first item.
					</StyledEmptyInventory>
				) : (
					inventory.map((item, index) => {
						const selectedItem = item.itemName
							? allItems.find((i) => i.name === item.itemName)
							: null;

						return (
							<StyledInventoryRow key={item.id}>
								{/* Remove Button */}
								<StyledRemoveItemButton
									onClick={() => removeInventorySlot(index)}
									title="Remove item"
								>
									×
								</StyledRemoveItemButton>

								{/* Item Type */}
								<StyledInventorySelect
									value={item.itemType}
									onChange={(e) => handleInventoryItemSelect(index, e.target.value, false)}
								>
									<option value="">Select Type</option>
									<option value="Weapon">Weapon</option>
									<option value="Armor">Armor</option>
									<option value="Shield">Shield</option>
									<option value="Adventuring Supply">Adventuring Supply</option>
									<option value="Potion">Healing Potion</option>
								</StyledInventorySelect>

								{/* Item Name */}
								<StyledInventorySelect
									value={item.itemName}
									onChange={(e) => handleInventoryItemSelect(index, e.target.value, true)}
									disabled={!item.itemType}
								>
									<option value="">Select Item</option>
									{item.itemType &&
										allItems
											.filter((i) => i.itemType === item.itemType)
											.map((itemData) => (
												<option key={itemData.name} value={itemData.name}>
													{itemData.name}
												</option>
											))}
								</StyledInventorySelect>

								{/* Count */}
								<StyledInventoryInput
									type="number"
									min="1"
									value={item.count}
									onChange={(e) => handleInventoryCountChange(index, parseInt(e.target.value) || 1)}
								/>

								{/* Info Indicator */}
								<div style={{ textAlign: 'center' }}>
									{selectedItem ? (
										<StyledInventoryInfoIcon
											onClick={() => onItemClick(item, selectedItem)}
										>
											i
										</StyledInventoryInfoIcon>
									) : (
										'-'
									)}
								</div>

								{/* Cost */}
								<StyledInventoryCost>{getItemCost(selectedItem, item.count)}</StyledInventoryCost>
							</StyledInventoryRow>
						);
					})
				)}
			</StyledInventoryContainer>
		</StyledInventorySection>
	);
};

export default Inventory;
