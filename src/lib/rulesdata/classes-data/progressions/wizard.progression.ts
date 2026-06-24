/**
 * DC20 v0.10.5 Wizard Class Progression
 *
 * Wizard derives its progression from the full caster category table.
 */

import type { ClassProgressionLevel } from '../progressionTypes';
import { resolveClassProgressionTable } from './classProgressionDefinitions';

export const wizardProgression: ClassProgressionLevel[] = resolveClassProgressionTable('wizard');
