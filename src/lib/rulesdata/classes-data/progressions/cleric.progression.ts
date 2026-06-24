/**
 * DC20 v0.10.5 Cleric Class Progression
 *
 * Cleric derives its progression from the full caster category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const clericProgression: ClassProgressionLevel[] = resolveClassProgressionTable('cleric');
