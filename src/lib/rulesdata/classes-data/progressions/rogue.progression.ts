/**
 * DC20 v0.10.5 Rogue Class Progression
 *
 * Rogue has an explicit source table because its HP progression differs from full martial.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const rogueProgression: ClassProgressionLevel[] = resolveClassProgressionTable('rogue');
