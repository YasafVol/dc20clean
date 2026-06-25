/**
 * DC20 v0.10.5 Hunter Class Progression
 *
 * Hunter derives its progression from the full martial category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const hunterProgression: ClassProgressionLevel[] = resolveClassProgressionTable('hunter');
