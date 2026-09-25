import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';

export function getInventoryItemCost(item: InventoryItem | null | undefined, count = 1): string {
	if (!item || !('price' in item)) return '-';

	let basePrice = 0;
	let currency = 'g';
	if (typeof item.price === 'string') {
		const match = item.price.match(/(\d+)([gs]?)/);
		if (match) {
			basePrice = Number.parseInt(match[1], 10);
			currency = match[2] || 'g';
		}
	} else if (typeof item.price === 'number') {
		basePrice = item.price;
	}

	return basePrice > 0 ? `${basePrice * count}${currency}` : '-';
}
