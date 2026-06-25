/**
 * DC20 v0.10.5 Spellblade Class Progression
 *
 * Spellblade derives its progression from the hybrid category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const spellbladeProgression: ClassProgressionLevel[] =
	resolveClassProgressionTable('spellblade');
