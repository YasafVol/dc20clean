/**
 * @file src/lib/rulesdata/equipment/schemas/generalEquipmentSchema.ts
 * @description Schema for reusable non-mechanical custom inventory items.
 */

import type { BaseEquipment } from './baseEquipment';

export interface CustomGeneralEquipment extends BaseEquipment {
	category: 'general';
	cost: string;
}
