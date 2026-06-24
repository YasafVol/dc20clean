/**
 * DC20 v0.10.5 Sorcerer Class Progression
 *
 * Sorcerer derives its progression from the full caster category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const sorcererProgression: ClassProgressionLevel[] =
	resolveClassProgressionTable('sorcerer');
