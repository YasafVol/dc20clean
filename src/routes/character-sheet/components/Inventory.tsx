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
}

const Inventory: React.FC<InventoryProps> = ({ inventory, setInventory }) => {
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

	const getItemExtraInfo = (item: any): string => {
		if (!item) return 'No item selected';

		if (item.itemType === 'Weapon') {
			const parts = [];
			parts.push(`DAMAGE: ${item.damage || 'N/A'}`);
			if (item.versatileDamage) {
				parts.push(`VERSATILE: ${item.versatileDamage} (two-handed)`);
			}
			parts.push(`TYPE: ${item.type || 'N/A'}`);
			parts.push(`DAMAGE TYPE: ${item.damageType || 'N/A'}`);
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.range) {
				parts.push(`RANGE: ${item.range}`);
			}
			if (item.weightCategory) {
				parts.push(`WEIGHT: ${item.weightCategory}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Armor') {
			const parts = [];
			const pdBonus = item.pdBonus || 0;
			const adBonus = item.adBonus || 0;
			const speedPenalty = item.speedPenalty || 0;

			parts.push(`ARMOR CLASS: PD+${pdBonus}, AD+${adBonus}`);
			if (speedPenalty !== 0) {
				parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
			}
			if (item.type) {
				parts.push(`TYPE: ${item.type}`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Shield') {
			const parts = [];
			const pdBonus = item.pdBonus || 0;
			const adBonus = item.adBonus || 0;
			const speedPenalty = item.speedPenalty || 0;

			parts.push(`DEFENSE BONUS: PD+${pdBonus}, AD+${adBonus}`);
			if (speedPenalty !== 0) {
				parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
			}
			if (item.type) {
				parts.push(`TYPE: ${item.type}`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Potion') {
			const parts = [];
			parts.push(`HEALING: ${item.healing || 'N/A'}`);
			parts.push(`LEVEL: ${item.level || 1}`);
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`EFFECT: ${item.description}`);
			} else {
				parts.push(`EFFECT: Restores ${item.healing || 'N/A'} hit points when consumed`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Adventuring Supply') {
			const parts = [];
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			return parts.length > 0 ? parts.join('\n') : 'Standard adventuring equipment';
		}

		return 'Item information not available';
	};

	const createCustomTooltip = (e: React.MouseEvent<HTMLSpanElement>, content: string) => {
		const tooltip = document.createElement('div');
		tooltip.innerText = content;
		tooltip.style.cssText = `
			position: absolute;
			background: #333;
			color: white;
			padding: 8px 12px;
			border-radius: 4px;
			font-size: 12px;
			white-space: pre-line;
			z-index: 1000;
			max-width: 300px;
			pointer-events: none;
		`;
		document.body.appendChild(tooltip);

		const updatePosition = () => {
			const rect = e.currentTarget.getBoundingClientRect();
			tooltip.style.left = `${rect.left + window.scrollX}px`;
			tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
		};
		updatePosition();

		// Store tooltip reference on the element
		(e.currentTarget as HTMLElement & { _customTooltip?: HTMLDivElement })._customTooltip = tooltip;
	};	const removeCustomTooltip = (e: React.MouseEvent<HTMLSpanElement>) => {
		const element = e.currentTarget as HTMLElement & { _customTooltip?: HTMLDivElement };
		const tooltip = element._customTooltip;
		if (tooltip && tooltip.parentNode) {
			tooltip.parentNode.removeChild(tooltip);
		}
		element._customTooltip = undefined;
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
						<StyledInventoryInfoIcon title="Item information">i</StyledInventoryInfoIcon>
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
											title={getItemExtraInfo(selectedItem)}
											onMouseEnter={(e) => createCustomTooltip(e, getItemExtraInfo(selectedItem))}
											onMouseLeave={removeCustomTooltip}
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
