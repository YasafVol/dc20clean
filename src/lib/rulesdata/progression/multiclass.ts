/**
 * Multiclass System
 * 
 * Defines all multiclass talent tiers, their prerequisites, and validation logic.
 * Multiclassing allows characters to gain features from other classes at specific levels.
 */

export type MulticlassTier = 'novice' | 'adept' | 'expert' | 'master' | 'grandmaster' | 'legendary';

export interface MulticlassTierDefinition {
	id: MulticlassTier;
	name: string;
	levelRequired: number;
	description: string;
	targetLevel: number; // The level of feature to select (e.g., 1 for "1st level feature")
	includeSubclass: boolean; // Whether subclass features are allowed
	subclassLevel?: number; // If includeSubclass, what level subclass features
	subclassOnly?: boolean; // If true, ONLY subclass features (no core class features)
	minClassFeatures: number; // Minimum class features required from target class
	minSubclassFeatures: number; // Minimum subclass features required from target class
}

/**
 * All multiclass talent tiers, in order of level requirement.
 * Each tier defines what level features can be selected and what prerequisites are needed.
 */
export const MULTICLASS_TIERS: MulticlassTierDefinition[] = [
	{
		id: 'novice',
		name: 'Novice Multiclass',
		levelRequired: 2,
		description: 'You can choose a 1st Level Class Feature from any Class.',
		targetLevel: 1,
		includeSubclass: false,
		minClassFeatures: 0, // No prerequisite
		minSubclassFeatures: 0,
	},
	{
		id: 'adept',
		name: 'Adept Multiclass',
		levelRequired: 4,
		description: 'You can choose a 2nd Level Class Feature from any Class.',
		targetLevel: 2,
		includeSubclass: false,
		minClassFeatures: 0, // No prerequisite
		minSubclassFeatures: 0,
	},
	{
		id: 'expert',
		name: 'Expert Multiclass',
		levelRequired: 7,
		description:
			'Choose a 5th Level Class Feature OR a 3rd Level Subclass Feature from a class you have at least 1 Class Feature from.',
		targetLevel: 5,
		includeSubclass: true,
		subclassLevel: 3,
		minClassFeatures: 1, // Must have 1+ class features from target class
		minSubclassFeatures: 0,
	},
	{
		id: 'master',
		name: 'Master Multiclass',
		levelRequired: 10,
		description:
			'Choose a 6th Level Subclass Feature from a Subclass you have at least 1 Subclass Feature from.',
		targetLevel: 6,
		includeSubclass: true,
		subclassLevel: 6,
		subclassOnly: true,
		minClassFeatures: 0,
		minSubclassFeatures: 1, // Must have 1+ subclass features from target subclass
	},
	{
		id: 'grandmaster',
		name: 'Grandmaster Multiclass',
		levelRequired: 13,
		description:
			'Choose an 8th Level Class Capstone Feature from any Class you have at least 2 Class Features from.',
		targetLevel: 8,
		includeSubclass: false,
		minClassFeatures: 2, // Must have 2+ class features from target class
		minSubclassFeatures: 0,
	},
	{
		id: 'legendary',
		name: 'Legendary Multiclass',
		levelRequired: 17,
		description:
			'Choose a 9th Level Subclass Capstone Feature from any Subclass you have at least 2 Subclass Features from.',
		targetLevel: 9,
		includeSubclass: true,
		subclassLevel: 9,
		subclassOnly: true,
		minClassFeatures: 0,
		minSubclassFeatures: 2, // Must have 2+ subclass features from target subclass
	},
];

/**
 * Get a multiclass tier definition by its ID
 */
export function getMulticlassTier(tierId: MulticlassTier): MulticlassTierDefinition | undefined {
	return MULTICLASS_TIERS.find((t) => t.id === tierId);
}

/**
 * Get all multiclass tiers available at a given character level
 */
export function getAvailableMulticlassTiers(characterLevel: number): MulticlassTierDefinition[] {
	return MULTICLASS_TIERS.filter((tier) => characterLevel >= tier.levelRequired);
}

