/**
 * Enhanced Stat Tooltips with Effect Attribution
 * 
 * This component creates detailed tooltips that show exactly where
 * each stat bonus comes from, replacing the simplified version.
 */

import React from 'react';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import type { CharacterSheetData } from '../../../types/character';

const tooltipStyles = {
  margin: '8px 0 0 0',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  lineHeight: '1.2',
  whiteSpace: 'pre-line' as const
};

const conditionalStyle = {
  marginTop: '8px',
  padding: '4px 8px',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  borderLeft: '3px solid #3b82f6',
  fontSize: '0.7rem',
  fontStyle: 'italic' as const
};

/**
 * Create enhanced tooltip with detailed breakdown
 */
export function createEnhancedTooltip(
  statName: string,
  breakdown: EnhancedStatBreakdown
): React.ReactNode {
  const formatBreakdown = () => {
    const lines: string[] = [];
    
    // Main total
    lines.push(breakdown.total.toString());
    lines.push('');
    
    // Base value
    lines.push(`├─ Base: ${breakdown.base}`);
    
    // Effect breakdown
    breakdown.effects.forEach((effect, index) => {
      const isLast = index === breakdown.effects.length - 1;
      const prefix = isLast ? '└─' : '├─';
      const sign = effect.value >= 0 ? '+' : '';
      lines.push(`${prefix} ${effect.source.name}: ${sign}${effect.value}`);
    });
    
    return lines.join('\n');
  };

  const conditionalEffects = breakdown.effects.filter(effect => effect.condition);
  
  return (
    <div>
      <strong>{breakdown.statName}</strong>
      <pre style={tooltipStyles}>
        {formatBreakdown()}
      </pre>
      
      {/* Show conditional effects separately */}
      {conditionalEffects.length > 0 && (
        <div style={conditionalStyle}>
          <strong>Conditional Bonuses:</strong><br />
          {conditionalEffects.map((effect, index) => (
            <span key={index}>
              • {effect.description}<br />
            </span>
          ))}
        </div>
      )}
      
      {/* Show potential total if conditionals were active */}
      {breakdown.conditionalTotal && breakdown.conditionalTotal !== breakdown.total && (
        <div style={{ ...conditionalStyle, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderLeftColor: '#22c55e' }}>
          <strong>Maximum Potential:</strong> {breakdown.conditionalTotal} (if all conditions met)
        </div>
      )}
    </div>
  );
}

/**
 * Enhanced HP tooltip with detailed sources
 */
export const createEnhancedHPTooltip = (
  characterData: CharacterSheetData,
  breakdown?: EnhancedStatBreakdown
): React.ReactNode => {
  if (breakdown) {
    return createEnhancedTooltip('Hit Points', breakdown);
  }
  
  // Fallback to simple calculation if breakdown not available
  const mightBonus = characterData.finalMight || 0;
  const simpleBreakdown: EnhancedStatBreakdown = {
    statName: 'Hit Points',
    base: mightBonus,
    effects: [
      {
        source: { type: 'class_feature', id: 'class_hp', name: 'Class HP', category: 'Base' },
        value: characterData.finalHPMax - mightBonus,
        description: `Class base: +${characterData.finalHPMax - mightBonus}`,
        isActive: true
      }
    ],
    total: characterData.finalHPMax
  };
  
  return createEnhancedTooltip('Hit Points', simpleBreakdown);
};

/**
 * Enhanced Speed tooltip with movement details
 */
export const createEnhancedSpeedTooltip = (
  characterData: CharacterSheetData,
  breakdown?: EnhancedStatBreakdown
): React.ReactNode => {
  if (breakdown) {
    return createEnhancedTooltip('Movement Speed', breakdown);
  }
  
  // Fallback calculation
  const simpleBreakdown: EnhancedStatBreakdown = {
    statName: 'Movement Speed',
    base: 5, // DC20 base speed
    effects: [
      {
        source: { type: 'class_feature', id: 'speed_bonus', name: 'Modifiers', category: 'Various' },
        value: characterData.finalMoveSpeed - 5,
        description: `Speed modifiers: ${characterData.finalMoveSpeed - 5 > 0 ? '+' : ''}${characterData.finalMoveSpeed - 5}`,
        isActive: true
      }
    ],
    total: characterData.finalMoveSpeed
  };
  
  return createEnhancedTooltip('Movement Speed', simpleBreakdown);
};

/**
 * Enhanced Defense tooltip (PD/AD) with formula breakdown
 */
export const createEnhancedDefenseTooltip = (
  defenseName: 'PD' | 'AD',
  characterData: CharacterSheetData,
  breakdown?: EnhancedStatBreakdown
): React.ReactNode => {
  if (breakdown) {
    return createEnhancedTooltip(defenseName === 'PD' ? 'Precision Defense' : 'Area Defense', breakdown);
  }
  
  // Fallback calculation with DC20 formula
  const combatMastery = 1; // Would get from character data
  let baseFormula, baseValue;
  
  if (defenseName === 'PD') {
    baseFormula = '8 + CM + AGI + INT';
    baseValue = 8 + combatMastery + (characterData.finalAgility || 0) + (characterData.finalIntelligence || 0);
  } else {
    baseFormula = '8 + CM + MIG + CHA';
    baseValue = 8 + combatMastery + (characterData.finalMight || 0) + (characterData.finalCharisma || 0);
  }
  
  const finalValue = defenseName === 'PD' ? characterData.finalPD : characterData.finalAD;
  const modifiers = finalValue - baseValue;
  
  const simpleBreakdown: EnhancedStatBreakdown = {
    statName: defenseName === 'PD' ? 'Precision Defense' : 'Area Defense',
    base: baseValue,
    effects: modifiers !== 0 ? [
      {
        source: { type: 'trait', id: 'defense_modifiers', name: 'Modifiers', category: 'Various' },
        value: modifiers,
        description: `Defense modifiers: ${modifiers > 0 ? '+' : ''}${modifiers}`,
        isActive: true
      }
    ] : [],
    total: finalValue
  };
  
  return (
    <div>
      <strong>{defenseName === 'PD' ? 'Precision Defense' : 'Area Defense'}</strong>
      <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '4px' }}>
        Formula: {baseFormula}
      </div>
      <pre style={tooltipStyles}>
        {finalValue}
        
        ├─ Base ({baseFormula}): {baseValue}
        {modifiers !== 0 && `└─ Modifiers: ${modifiers > 0 ? '+' : ''}${modifiers}`}
      </pre>
    </div>
  );
};

/**
 * Enhanced MP tooltip
 */
export const createEnhancedMPTooltip = (
  characterData: CharacterSheetData,
  breakdown?: EnhancedStatBreakdown
): React.ReactNode => {
  if (breakdown) {
    return createEnhancedTooltip('Mana Points', breakdown);
  }
  
  const intelligenceBonus = characterData.finalIntelligence || 0;
  const simpleBreakdown: EnhancedStatBreakdown = {
    statName: 'Mana Points',
    base: intelligenceBonus,
    effects: [
      {
        source: { type: 'class_feature', id: 'class_mp', name: 'Class MP', category: 'Base' },
        value: characterData.finalMPMax - intelligenceBonus,
        description: `Class base: +${characterData.finalMPMax - intelligenceBonus}`,
        isActive: true
      }
    ],
    total: characterData.finalMPMax
  };
  
  return createEnhancedTooltip('Mana Points', simpleBreakdown);
};

/**
 * Enhanced Jump Distance tooltip
 */
export const createEnhancedJumpTooltip = (
  characterData: CharacterSheetData,
  breakdown?: EnhancedStatBreakdown
): React.ReactNode => {
  if (breakdown) {
    return createEnhancedTooltip('Jump Distance', breakdown);
  }
  
  const agilityBase = characterData.finalAgility || 0;
  const simpleBreakdown: EnhancedStatBreakdown = {
    statName: 'Jump Distance',
    base: agilityBase,
    effects: [
      {
        source: { type: 'base', id: 'jump_formula', name: 'Modifiers', category: 'Various' },
        value: characterData.finalJumpDistance - agilityBase,
        description: `Jump modifiers: ${characterData.finalJumpDistance - agilityBase > 0 ? '+' : ''}${characterData.finalJumpDistance - agilityBase}`,
        isActive: true
      }
    ],
    total: characterData.finalJumpDistance
  };
  
  return (
    <div>
      <strong>Jump Distance</strong>
      <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: '4px' }}>
        Formula: AGI + modifiers
      </div>
      <pre style={tooltipStyles}>
        {characterData.finalJumpDistance}
        
        ├─ Base (AGI): {agilityBase}
        {characterData.finalJumpDistance !== agilityBase && 
          `└─ Modifiers: ${characterData.finalJumpDistance - agilityBase > 0 ? '+' : ''}${characterData.finalJumpDistance - agilityBase}`
        }
      </pre>
    </div>
  );
};
