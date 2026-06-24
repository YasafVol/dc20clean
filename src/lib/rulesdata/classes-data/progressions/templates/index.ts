/**
 * DC20 v0.10.5 Class Progression Templates
 *
 * This module exports the category progression tables for class progression resolution.
 * Individual class progressions should resolve through classProgressionDefinitions.ts.
 *
 * MAJOR CHANGES FROM v0.9.5:
 * 1. Techniques removed from game entirely
 * 2. Cantrips removed as a classification (all spells are just "spells" now)
 * 3. Talent + Path Progression now land at levels 6 and 8
 * 4. Subclass Features now land at levels 7 and 10
 * 5. Source tables schedule Class Capstone Features at level 9; runtime adds no placeholder records
 * 6. Caster and hybrid MP progressions were raised
 */

export { martialProgressionTemplate } from './martial.template';
export { casterProgressionTemplate } from './caster.template';
export { spellbladeProgressionTemplate } from './spellblade.template';
export { createClassProgression } from './createClassProgression';

// Re-export types
export type { ClassProgressionGains, ClassProgressionLevel } from '../../progressionTypes';
