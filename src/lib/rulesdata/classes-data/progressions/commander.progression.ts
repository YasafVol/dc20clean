/**
 * DC20 v0.10.5 Commander Class Progression
 *
 * Commander derives its progression from the full martial category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const commanderProgression: ClassProgressionLevel[] =
	resolveClassProgressionTable('commander');
