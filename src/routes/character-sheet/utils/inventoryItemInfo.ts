import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import type { InventoryItemData } from '../../../types';
import { getAllCustomEquipment } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type { CustomWeapon } from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import type { CustomArmor } from '../../../lib/rulesdata/equipment/schemas/armorSchema';
import type { CustomShield } from '../../../lib/rulesdata/equipment/schemas/shieldSchema';
import type { CustomSpellFocus } from '../../../lib/rulesdata/equipment/schemas/spellFocusSchema';

export interface InventoryItemInfo {
	label: string;
	value: string | number;
}

/**
 * Build info rows for a saved Equipage item looked up by customEquipmentId.
 * Returns null if the item is not found (deleted from Equipage).
 */
function getCustomEquipmentInfo(customEquipmentId: string): InventoryItemInfo[] | null {
	const allEquipment = getAllCustomEquipment();
	const equipment = allEquipment.find((e) => e.id === customEquipmentId);
	if (!equipment) return null;

	const info: InventoryItemInfo[] = [];

	switch (equipment.category) {
		case 'weapon': {
			const w = equipment as CustomWeapon;
			info.push({ label: 'Category', value: 'Custom Weapon' });
			info.push({ label: 'Weapon Type', value: w.weaponType });
			info.push({ label: 'Style', value: w.style });
			if (w.secondaryStyle) info.push({ label: 'Secondary Style', value: w.secondaryStyle });
			info.push({ label: 'Damage Type', value: w.damageType });
			info.push({ label: 'Damage', value: w.finalDamage });
			info.push({ label: 'Range', value: w.range });
			if (w.properties.length > 0)
				info.push({ label: 'Properties', value: w.properties.join(', ') });
			if (w.description) info.push({ label: 'Description', value: w.description });
			break;
		}
		case 'armor': {
			const a = equipment as CustomArmor;
			info.push({ label: 'Category', value: 'Custom Armor' });
			info.push({ label: 'Armor Type', value: a.armorType });
			info.push({ label: 'PD Bonus', value: a.pdBonus });
			info.push({ label: 'AD Bonus', value: a.adBonus });
			if (a.hasPdr) info.push({ label: 'PDR', value: 'Half' });
			if (a.hasEdr) info.push({ label: 'EDR', value: 'Yes' });
			if (a.speedPenalty) info.push({ label: 'Speed Penalty', value: a.speedPenalty });
			if (a.hasAgilityDisadvantage) info.push({ label: 'Agility Disadvantage', value: 'Yes' });
			if (a.properties.length > 0)
				info.push({ label: 'Properties', value: a.properties.join(', ') });
			if (a.description) info.push({ label: 'Description', value: a.description });
			break;
		}
		case 'shield': {
			const s = equipment as CustomShield;
			info.push({ label: 'Category', value: 'Custom Shield' });
			info.push({ label: 'Shield Type', value: s.shieldType });
			info.push({ label: 'PD Bonus', value: s.pdBonus });
			info.push({ label: 'AD Bonus', value: s.adBonus });
			if (s.hasPdr) info.push({ label: 'PDR', value: 'Yes' });
			if (s.hasEdr) info.push({ label: 'EDR', value: 'Yes' });
			if (s.speedPenalty) info.push({ label: 'Speed Penalty', value: s.speedPenalty });
			if (s.hasAgilityDisadvantage) info.push({ label: 'Agility Disadvantage', value: 'Yes' });
			if (s.properties.length > 0)
				info.push({ label: 'Properties', value: s.properties.join(', ') });
			if (s.description) info.push({ label: 'Description', value: s.description });
			break;
		}
		case 'spellFocus': {
			const f = equipment as CustomSpellFocus;
			info.push({ label: 'Category', value: 'Custom Spell Focus' });
			info.push({ label: 'Hands', value: f.hands });
			if (f.spellCheckBonus) info.push({ label: 'Spell Check Bonus', value: `+${f.spellCheckBonus}` });
			if (f.spellAttackBonus) info.push({ label: 'Spell Attack Bonus', value: `+${f.spellAttackBonus}` });
			if (f.spellDamageBonus) info.push({ label: 'Spell Damage Bonus', value: `+${f.spellDamageBonus}` });
			if (f.adBonus) info.push({ label: 'AD Bonus', value: f.adBonus });
			if (f.hasMdr) info.push({ label: 'MDR', value: 'Yes' });
			if (f.properties.length > 0)
				info.push({ label: 'Properties', value: f.properties.join(', ') });
			if (f.description) info.push({ label: 'Description', value: f.description });
			break;
		}
	}

	return info;
}

export function getInventoryItemInfo(
	item: InventoryItem | null,
	inventoryData?: InventoryItemData
): InventoryItemInfo[] {
	const info: InventoryItemInfo[] = [];

	// Handle Custom inventory items (Equipage or freeform)
	if (inventoryData?.itemType === 'Custom') {
		if (inventoryData.customEquipmentId) {
			// Try to look up the saved Equipage item
			const equipmentInfo = getCustomEquipmentInfo(inventoryData.customEquipmentId);
			if (equipmentInfo) {
				info.push(...equipmentInfo);
			} else {
				// Item was deleted from Equipage
				info.push({ label: 'Note', value: 'Equipment details no longer available (deleted from Equipage)' });
			}
		} else {
			// Freeform custom item — show basic label
			info.push({ label: 'Type', value: 'Custom Item' });
		}

		// Always append count and cost for custom items
		if (inventoryData) {
			info.push({ label: 'Count', value: inventoryData.count });
			if (inventoryData.cost && inventoryData.cost !== '-')
				info.push({ label: 'Cost', value: inventoryData.cost });
		}

		return info;
	}

	// Standard inventory items (non-custom)
	if (!item) return [];

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
