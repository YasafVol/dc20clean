/**
 * DC20 v0.10.5 Monk Class Progression
 *
 * Monk derives its progression from the full martial category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const monkProgression: ClassProgressionLevel[] = resolveClassProgressionTable('monk');
