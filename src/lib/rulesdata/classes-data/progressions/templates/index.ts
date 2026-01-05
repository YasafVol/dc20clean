/**
 * DC20 v0.10 Class Progression Templates
 *
 * This module exports the base progression templates for all class types.
 * Individual class progressions should import these templates and customize
 * the classFeatures arrays with their specific features.
 *
 * MAJOR CHANGES FROM v0.9.5:
 * 1. Techniques removed from game entirely
 * 2. Cantrips removed as a classification (all spells are just "spells" now)
 * 3. Path Progression moved from levels 7, 10 to levels 6, 8
 * 4. HP progressions adjusted across all classes
 * 5. SP/MP/Maneuver/Spell progressions rebalanced
 */

export { martialProgressionTemplate } from './martial.template';
export { casterProgressionTemplate } from './caster.template';
export { spellbladeProgressionTemplate } from './spellblade.template';

// Re-export types
export type { ClassProgressionLevel, ClassLevelGains, ClassType } from '../../progressionTypes';
export { CLASS_TYPE_MAP, HP_PROGRESSIONS, RESOURCE_PROGRESSIONS } from '../../progressionTypes';
