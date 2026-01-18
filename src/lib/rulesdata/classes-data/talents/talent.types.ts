import type { Effect } from '../../schemas/character.schema';

export type TalentCategory = 'General' | 'Class' | 'Multiclass';

export interface TalentPrerequisites {
	level?: number;
	classId?: string; // e.g., 'barbarian'
	feature?: string; // e.g., 'Rage'
	otherFeature?: string; // Second required feature, e.g., 'Spellstrike' (DC20 v0.10)
	subclass?: string; // e.g., 'Berserker'
	other?: string; // For text-based requirements like "1 or more Monk Features"
}

export interface Talent {
	id: string; // e.g., 'general_attribute_increase' or 'barbarian_unfathomable_strength'
	name: string;
	category: TalentCategory;
	description: string;
	effects: Effect[];
	prerequisites?: TalentPrerequisites;
	/** If false, talent can only be taken once. Defaults to true for General talents. */
	stackable?: boolean;
}
