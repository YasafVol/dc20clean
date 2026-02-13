import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { InventoryItemData } from '../../../types';
import { allItems, type InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import { getAllCustomEquipment } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import { useCharacterInventory, useCharacterSheet } from '../hooks/CharacterSheetProvider';
import DeleteButton from './shared/DeleteButton';
import {
	StyledInventorySection,
	StyledInventoryTitle,
	StyledAddItemButton,
	StyledInventoryContainer,
	StyledInventoryHeaderRow,
	StyledInventoryHeaderColumn,
	StyledInventoryRow,
	StyledInventorySelect,
	StyledInventoryInput,
	StyledInventoryTextInput,
	StyledInventoryInfoIcon,
	StyledInventoryCost,
	StyledEmptyInventory
} from '../styles/Inventory';

/** Sentinel value used in the Custom name dropdown to trigger freeform text input */
const CUSTOM_FREEFORM_VALUE = '__custom_freeform__';

export interface InventoryProps {
	onItemClick: (inventoryData: InventoryItemData, item: InventoryItem | null) => void;
	isMobile?: boolean;
}

const Inventory: React.FC<InventoryProps> = ({ onItemClick, isMobile = false }) => {
	const { t } = useTranslation();
	const { updateInventory } = useCharacterSheet();
	const inventoryData = useCharacterInventory();
	const inventory = inventoryData.items;

	// Load all saved Equipage items from localStorage
	const customEquipment = useMemo(() => getAllCustomEquipment(), []);

	// Track which Custom inventory slots are in freeform text-input mode (by item id)
	const [freeformItemIds, setFreeformItemIds] = useState<Set<string>>(new Set());

	// On mount / when inventory changes, initialise freeform set from persisted data:
	// any Custom item that has a name but no customEquipmentId is freeform.
	useEffect(() => {
		const ids = new Set<string>();
		for (const item of inventory) {
			if (item.itemType === 'Custom' && !item.customEquipmentId && item.itemName) {
				ids.add(item.id);
			}
		}
		setFreeformItemIds((prev) => {
			// Merge: keep any ids already in the set (user may have just clicked "Custom Item...")
			const merged = new Set(prev);
			ids.forEach((id) => merged.add(id));
			return merged;
		});
	}, [inventory]);

	const addInventorySlot = () => {
		const newInventoryItem: InventoryItemData = {
			id: `inventory_${Date.now()}`,
			itemType: '',
			itemName: '',
			count: 1,
			cost: '-'
		};
		updateInventory([...inventory, newInventoryItem]);
	};

	const removeInventorySlot = (inventoryIndex: number) => {
		const removedItem = inventory[inventoryIndex];
		const updatedInventory = inventory.filter((_, index) => index !== inventoryIndex);
		updateInventory(updatedInventory);
		// Clean up freeform tracking
		if (removedItem) {
			setFreeformItemIds((prev) => {
				const next = new Set(prev);
				next.delete(removedItem.id);
				return next;
			});
		}
	};

	const handleInventoryItemSelect = (
		inventoryIndex: number,
		itemTypeOrName: string,
		isItemName: boolean = false
	) => {
		if (!isItemName) {
			// Selecting item type — reset name, customEquipmentId, and freeform state
			const itemType = itemTypeOrName as InventoryItemData['itemType'];
			const updatedInventory = inventory.map((item, index) =>
				index === inventoryIndex
					? { ...item, itemType, itemName: '', cost: '-', customEquipmentId: undefined }
					: item
			);
			updateInventory(updatedInventory);
			// If switching away from Custom, remove from freeform tracking
			const itemId = inventory[inventoryIndex]?.id;
			if (itemId) {
				setFreeformItemIds((prev) => {
					const next = new Set(prev);
					next.delete(itemId);
					return next;
				});
			}
		} else {
			// Selecting item name
			const selectedItem = allItems.find((i: any) => i.name === itemTypeOrName);
			const updatedInventory = inventory.map((item, index) =>
				index === inventoryIndex
					? {
							...item,
							itemName: itemTypeOrName,
							itemType: selectedItem?.itemType || item.itemType,
							cost: getItemCost(selectedItem),
							customEquipmentId: undefined
						}
					: item
			);
			updateInventory(updatedInventory);
		}
	};

	/** Handle selecting an item from the Custom name dropdown */
	const handleCustomItemSelect = (inventoryIndex: number, value: string) => {
		const itemId = inventory[inventoryIndex]?.id;

		if (value === CUSTOM_FREEFORM_VALUE) {
			// Switch to freeform text input mode
			if (itemId) {
				setFreeformItemIds((prev) => new Set(prev).add(itemId));
			}
			// Clear any previous name/link
			const updatedInventory = inventory.map((item, index) =>
				index === inventoryIndex
					? { ...item, itemName: '', customEquipmentId: undefined, cost: '-' }
					: item
			);
			updateInventory(updatedInventory);
		} else {
			// User picked a saved Equipage item — value is the equipment id
			const equipment = customEquipment.find((e) => e.id === value);
			if (equipment) {
				const updatedInventory = inventory.map((item, index) =>
					index === inventoryIndex
						? {
								...item,
								itemName: equipment.name,
								customEquipmentId: equipment.id,
								cost: '-'
							}
						: item
				);
				updateInventory(updatedInventory);
				// Make sure it's NOT in freeform mode
				if (itemId) {
					setFreeformItemIds((prev) => {
						const next = new Set(prev);
						next.delete(itemId);
						return next;
					});
				}
			}
		}
	};

	/** Handle freeform text input for Custom items */
	const handleCustomNameChange = (inventoryIndex: number, name: string) => {
		const updatedInventory = inventory.map((item, index) =>
			index === inventoryIndex
				? { ...item, itemName: name, customEquipmentId: undefined }
				: item
		);
		updateInventory(updatedInventory);
	};

	const handleInventoryCountChange = (inventoryIndex: number, count: number) => {
		const updatedInventory = inventory.map((item, index) =>
			index === inventoryIndex ? { ...item, count: Math.max(1, count) } : item
		);
		updateInventory(updatedInventory);
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

	// Helper to format shield info
	const getShieldInfo = (shield: InventoryItem | undefined | null): string => {
		if (!shield || shield.itemType !== 'Shield') return '';
		const s = shield as any;
		let info = `PD Bonus: ${s.pdBonus}\nAD Bonus: ${s.adBonus}`;
		if (s.speedPenalty) info += `\nSpeed Penalty: ${s.speedPenalty}`;
		if (s.agilityCheckDisadvantage) info += `\nAgility Disadvantage: Yes`;
		if (s.properties && s.properties.length > 0) info += `\nProperties: ${s.properties.join(', ')}`;
		return info;
	};

	/** Determine whether a Custom item should show the freeform text input */
	const isCustomFreeform = (item: InventoryItemData): boolean => {
		if (item.itemType !== 'Custom') return false;
		return freeformItemIds.has(item.id);
	};

	/** Render the name column for a Custom item (dropdown or text input) */
	const renderCustomNameColumn = (item: InventoryItemData, index: number) => {
		if (isCustomFreeform(item)) {
			// Freeform text input mode
			return (
			<StyledInventoryTextInput
				$isMobile={isMobile}
				type="text"
				placeholder="Enter item name..."
				value={item.itemName}
				onChange={(e) => handleCustomNameChange(index, e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						(e.target as HTMLInputElement).blur();
					}
				}}
				data-testid="item-name"
				autoFocus
			/>
			);
		}

		// Dropdown mode — show Equipage items + "Custom Item..." option
		return (
			<StyledInventorySelect
				$isMobile={isMobile}
				value={item.customEquipmentId || ''}
				onChange={(e) => handleCustomItemSelect(index, e.target.value)}
				data-testid="item-name"
			>
				<option value="">{t('characterSheet.inventorySelectItem')}</option>
				<option value={CUSTOM_FREEFORM_VALUE}>Custom Item...</option>
				{customEquipment.length > 0 && (
					<optgroup label="Saved Equipment">
						{customEquipment.map((eq) => (
							<option key={eq.id} value={eq.id}>
								{eq.name} ({eq.category})
							</option>
						))}
					</optgroup>
				)}
			</StyledInventorySelect>
		);
	};

	return (
		<StyledInventorySection $isMobile={isMobile}>
			<StyledInventoryTitle $isMobile={isMobile}>{t('characterSheet.inventoryTitle')}</StyledInventoryTitle>

			{/* Add Item Button */}
			<StyledAddItemButton $isMobile={isMobile} onClick={addInventorySlot} data-testid="add-item">
				+ {t('characterSheet.inventoryAddItem')}
			</StyledAddItemButton>

			<StyledInventoryContainer $isMobile={isMobile}>
				<StyledInventoryHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledInventoryHeaderColumn>{t('characterSheet.inventoryColumnType')}</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn>{t('characterSheet.inventoryColumnItem')}</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">{t('characterSheet.inventoryColumnCount')}</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">
						<StyledInventoryInfoIcon>i</StyledInventoryInfoIcon>
					</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">{t('characterSheet.inventoryColumnCost')}</StyledInventoryHeaderColumn>
				</StyledInventoryHeaderRow>

				{inventory.length === 0 ? (
					<StyledEmptyInventory>
						{t('characterSheet.inventoryNoItems')}
					</StyledEmptyInventory>
				) : (
					inventory.map((item, index) => {
						const isCustomType = item.itemType === 'Custom';
						const selectedItem = (!isCustomType && item.itemName)
							? allItems.find((i) => i.name === item.itemName)
							: null;

						// For Custom items, determine if the info icon should be clickable
						const hasCustomInfo = isCustomType && !!item.itemName;

						return (
							<StyledInventoryRow key={item.id}>
								{/* Remove Button */}
								<DeleteButton
									onClick={() => removeInventorySlot(index)}
									title={t('characterSheet.inventoryRemoveItem')}
									$isMobile={isMobile}
								/>

								{/* Item Type */}
								<StyledInventorySelect
									$isMobile={isMobile}
									value={item.itemType}
									onChange={(e) => handleInventoryItemSelect(index, e.target.value, false)}
								>
									<option value="">{t('characterSheet.inventorySelectType')}</option>
									<option value="Weapon">Weapon</option>
									<option value="Armor">Armor</option>
									<option value="Shield">Shield</option>
									<option value="Adventuring Supply">Adventuring Supply</option>
									<option value="Potion">Healing Potion</option>
									<option value="Custom">Custom</option>
								</StyledInventorySelect>

								{/* Item Name — Custom items get a special renderer */}
								{isCustomType ? (
									renderCustomNameColumn(item, index)
								) : (
									<StyledInventorySelect
										$isMobile={isMobile}
										value={item.itemName}
										onChange={(e) => handleInventoryItemSelect(index, e.target.value, true)}
										disabled={!item.itemType}
										data-testid="item-name"
									>
										<option value="">{t('characterSheet.inventorySelectItem')}</option>
										{item.itemType &&
											allItems
												.filter((i) => i.itemType === item.itemType)
												.map((itemData) => (
													<option key={itemData.name} value={itemData.name}>
														{itemData.name}
													</option>
												))}
									</StyledInventorySelect>
								)}

								{/* Count */}
								<StyledInventoryInput
									$isMobile={isMobile}
									type="number"
									min="1"
									value={item.count}
									onChange={(e) => handleInventoryCountChange(index, parseInt(e.target.value) || 1)}
								/>

								{/* Info Indicator */}
								<div style={{ textAlign: 'center' }}>
									{selectedItem ? (
										<StyledInventoryInfoIcon
											$isMobile={isMobile}
											onClick={() => onItemClick(item, selectedItem)}
											title={
												selectedItem.itemType === 'Shield' ? getShieldInfo(selectedItem) : undefined
											}
											data-testid="info-btn"
											aria-label={`item-info-${index + 1}`}
										>
											i
										</StyledInventoryInfoIcon>
									) : hasCustomInfo ? (
										<StyledInventoryInfoIcon
											$isMobile={isMobile}
											onClick={() => onItemClick(item, null)}
											data-testid="info-btn"
											aria-label={`item-info-${index + 1}`}
										>
											i
										</StyledInventoryInfoIcon>
									) : (
										'-'
									)}
								</div>

								{/* Cost */}
								<StyledInventoryCost>{isCustomType ? (item.cost || '-') : getItemCost(selectedItem, item.count)}</StyledInventoryCost>
							</StyledInventoryRow>
						);
					})
				)}
			</StyledInventoryContainer>
		</StyledInventorySection>
	);
};

export default Inventory;
