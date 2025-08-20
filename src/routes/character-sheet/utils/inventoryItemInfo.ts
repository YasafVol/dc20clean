import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import type { InventoryItemData } from '../../../types';

export interface InventoryItemInfo {
	label: string;
	value: string | number;
}

export function getInventoryItemInfo(
	item: InventoryItem | null,
	inventoryData?: InventoryItemData
): InventoryItemInfo[] {
	if (!item) return [];
	const info: InventoryItemInfo[] = [];

	switch (item.itemType) {
		case 'Weapon': {
			info.push({ label: 'Weapon Type', value: (item as any).type });
			info.push({ label: 'Style', value: (item as any).style });
			info.push({ label: 'Handedness', value: (item as any).handedness });
			info.push({ label: 'Damage', value: (item as any).damage });
			if ((item as any).properties?.length)
				info.push({ label: 'Properties', value: (item as any).properties.join(', ') });
			if ((item as any).price) info.push({ label: 'Price', value: (item as any).price });
			break;
		}
		case 'Armor': {
			info.push({ label: 'Type', value: (item as any).type });
			if ((item as any).pdr) info.push({ label: 'PDR', value: (item as any).pdr });
			info.push({ label: 'PD Bonus', value: (item as any).pdBonus });
			info.push({ label: 'AD Bonus', value: (item as any).adBonus });
			if ((item as any).speedPenalty !== undefined)
				info.push({ label: 'Speed Penalty', value: (item as any).speedPenalty });
			if ((item as any).agilityCheckDisadvantage)
				info.push({ label: 'Agility Disadvantage', value: 'Yes' });
			if ((item as any).agilityCap)
				info.push({ label: 'Agility Cap', value: (item as any).agilityCap });
			if ((item as any).price) info.push({ label: 'Price', value: (item as any).price });
			break;
		}
		case 'Shield': {
			info.push({ label: 'Type', value: (item as any).type });
			info.push({ label: 'PD Bonus', value: (item as any).pdBonus });
			info.push({ label: 'AD Bonus', value: (item as any).adBonus });
			if ((item as any).speedPenalty !== undefined)
				info.push({ label: 'Speed Penalty', value: (item as any).speedPenalty });
			if ((item as any).agilityCheckDisadvantage)
				info.push({ label: 'Agility Disadvantage', value: 'Yes' });
			if ((item as any).properties?.length)
				info.push({ label: 'Properties', value: (item as any).properties.join(', ') });
			if ((item as any).price) info.push({ label: 'Price', value: (item as any).price });
			break;
		}
		case 'Potion': {
			info.push({ label: 'Level', value: (item as any).level });
			info.push({ label: 'Healing', value: (item as any).healing });
			if ((item as any).price) info.push({ label: 'Price', value: `${(item as any).price}g` });
			break;
		}
		case 'Adventuring Supply': {
			if ((item as any).description)
				info.push({ label: 'Description', value: (item as any).description });
			if ((item as any).price) info.push({ label: 'Price', value: (item as any).price });
			break;
		}
		default:
			break;
	}

	if (inventoryData) {
		info.push({ label: 'Count', value: inventoryData.count });
		if (inventoryData.cost) info.push({ label: 'Cost', value: inventoryData.cost });
	}

	return info;
}
