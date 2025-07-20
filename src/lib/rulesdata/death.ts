/**
 * DC20 Death & Health Threshold Rules
 * Based on official DC20 rulebook pages for Health Points & Death's Door
 */

export interface HealthStatus {
  status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
  description: string;
  effects: string[];
}

export interface DeathSaveResult {
  success: boolean;
  effect: string;
}

/**
 * Calculate current health status based on HP
 */
export function getHealthStatus(currentHP: number, maxHP: number, deathThreshold: number): HealthStatus {
  const halfHP = Math.floor(maxHP / 2);
  const quarterHP = Math.floor(maxHP / 4);

  if (currentHP <= deathThreshold) {
    return {
      status: 'dead',
      description: 'Dead',
      effects: ['Character is dead']
    };
  }

  if (currentHP <= 0) {
    return {
      status: 'deaths-door',
      description: "Death's Door",
      effects: [
        'Immediately gain Exhaustion 1',
        'Action Point Limit: 1 AP until end of next turn or restored to 1 HP',
        "Can't Concentrate",
        'Death Saves at end of turns (d20, 10+ succeeds)',
        'Failure: 1 True damage, Critical Failure: Unconscious until 1 HP',
        'Critical Success: Restored to 1 HP'
      ]
    };
  }

  if (currentHP <= quarterHP) {
    return {
      status: 'well-bloodied',
      description: 'Well-Bloodied',
      effects: [
        'HP is 1/4 or lower of maximum',
        'Subject to Well-Bloodied effects from abilities'
      ]
    };
  }

  if (currentHP <= halfHP) {
    return {
      status: 'bloodied',
      description: 'Bloodied',
      effects: [
        'HP is 1/2 or lower of maximum',
        'Subject to Bloodied effects from abilities'
      ]
    };
  }

  return {
    status: 'healthy',
    description: 'Healthy',
    effects: ['No health penalties']
  };
}

/**
 * Calculate Death Threshold
 * Death Threshold = 0 - Prime Modifier
 */
export function calculateDeathThreshold(primeModifier: number): number {
  return -primeModifier;
}

/**
 * Death Save mechanics
 */
export function processDeathSave(roll: number): DeathSaveResult {
  if (roll === 1) {
    return {
      success: false,
      effect: 'Critical Failure: Take 1 True damage and become Unconscious until restored to 1 HP or higher'
    };
  }

  if (roll === 20) {
    return {
      success: true,
      effect: 'Critical Success: Restored to 1 HP'
    };
  }

  if (roll >= 10) {
    return {
      success: true,
      effect: 'Success: Become Stabilized'
    };
  }

  return {
    success: false,
    effect: 'Failure: Take 1 True damage'
  };
}

/**
 * Death's Door After Combat rules
 */
export function getDeathsDoorAfterCombat(): string[] {
  return [
    'When Combat ends, any creature on Death\'s Door must immediately make a Death Save',
    'They repeat this Death Save every 12 seconds until they become Stabilized, are restored to 1 HP or higher, or die',
    'Failure: Take 1 True damage and fall Unconscious until Stabilized',
    'Success: Become Stabilized'
  ];
}

/**
 * Stabilization rules
 */
export function getStabilizationRules(): string[] {
  return [
    'A creature that takes the Medicine Action and succeeds on a DC 10 Medicine Check can Stabilize a creature on Death\'s Door',
    'A Stabilized creature doesn\'t make Death Saves while on Death\'s Door',
    'A creature remains Stabilized until it\'s restored to 1 HP or takes damage'
  ];
}

/**
 * Continuous damage rules (Bleeding, Burning)
 */
export function getContinuousDamageRules(): string[] {
  return [
    'Continuous damage (such as Bleeding and Burning) does not affect you while on Death\'s Door',
    'You still have these conditions on you, but they don\'t deal damage unless you\'re above 0 HP'
  ];
}

/**
 * Death's Door threshold tracking for UI
 * Returns how many "steps" until death based on current HP and death threshold
 */
export function getDeathSteps(currentHP: number, deathThreshold: number): {
  currentStep: number;
  maxSteps: number;
  isDead: boolean;
} {
  if (currentHP > 0) {
    return { currentStep: 0, maxSteps: 0, isDead: false };
  }

  const maxSteps = Math.abs(deathThreshold);
  const currentStep = Math.abs(currentHP);
  const isDead = currentHP <= deathThreshold;

  return { currentStep, maxSteps, isDead };
}
