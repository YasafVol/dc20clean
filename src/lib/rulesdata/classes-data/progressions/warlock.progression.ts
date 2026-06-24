/**
 * DC20 v0.10.5 Warlock Class Progression
 *
 * Warlock has an explicit source table because its HP progression differs from full caster.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const warlockProgression: ClassProgressionLevel[] = resolveClassProgressionTable('warlock');
