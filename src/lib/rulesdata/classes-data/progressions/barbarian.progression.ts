/**
 * DC20 v0.10.5 Barbarian Class Progression
 *
 * Barbarian derives its progression from the full martial category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const barbarianProgression: ClassProgressionLevel[] =
	resolveClassProgressionTable('barbarian');
