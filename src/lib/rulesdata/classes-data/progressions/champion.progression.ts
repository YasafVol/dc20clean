/**
 * DC20 v0.10.5 Champion Class Progression
 *
 * Champion derives its progression from the full martial category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const championProgression: ClassProgressionLevel[] =
	resolveClassProgressionTable('champion');
