/**
 * DC20 v0.10.5 Bard Class Progression
 *
 * Bard derives its progression from the full caster category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const bardProgression: ClassProgressionLevel[] = resolveClassProgressionTable('bard');
