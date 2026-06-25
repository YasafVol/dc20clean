/**
 * DC20 v0.10.5 Druid Class Progression
 *
 * Druid derives its progression from the full caster category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const druidProgression: ClassProgressionLevel[] = resolveClassProgressionTable('druid');
