import React from 'react';
import type { CharacterSheetData } from '../../../types';

interface StatBreakdown {
  base: number;
  classBonus?: number;
  ancestryBonus?: number;
  otherBonuses?: Array<{name: string, value: number}>;
  total: number;
}

const formatBreakdown = (breakdown: StatBreakdown): React.ReactNode => {
  const lines: string[] = [];
  
  lines.push(`${breakdown.total}`);
  lines.push('');
  lines.push(`├─ Base: ${breakdown.base}`);
  
  if (breakdown.classBonus && breakdown.classBonus !== 0) {
    lines.push(`├─ Class: ${breakdown.classBonus > 0 ? '+' : ''}${breakdown.classBonus}`);
  }
  
  if (breakdown.ancestryBonus && breakdown.ancestryBonus !== 0) {
    lines.push(`├─ Ancestry: ${breakdown.ancestryBonus > 0 ? '+' : ''}${breakdown.ancestryBonus}`);
  }
  
  if (breakdown.otherBonuses && breakdown.otherBonuses.length > 0) {
    breakdown.otherBonuses.forEach((bonus, index) => {
      const isLast = index === breakdown.otherBonuses!.length - 1 && !breakdown.ancestryBonus && !breakdown.classBonus;
      const prefix = isLast ? '└─' : '├─';
      lines.push(`${prefix} ${bonus.name}: ${bonus.value > 0 ? '+' : ''}${bonus.value}`);
    });
  }
  
  return lines.join('\n');
};

export const createSpeedTooltip = (characterData: CharacterSheetData): React.ReactNode => {
  // Calculate breakdown - this is simplified since we don't have detailed source tracking yet
  const breakdown: StatBreakdown = {
    base: 5, // Default base speed
    classBonus: characterData.finalMoveSpeed - 5, // Assume difference is from class for now
    total: characterData.finalMoveSpeed
  };
  
  return (
    <div>
      <strong>Movement Speed</strong>
      <pre style={{ 
        margin: '8px 0 0 0', 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        lineHeight: '1.2'
      }}>
        {formatBreakdown(breakdown)}
      </pre>
    </div>
  );
};

export const createJumpTooltip = (characterData: CharacterSheetData): React.ReactNode => {
  const breakdown: StatBreakdown = {
    base: characterData.finalAgility || 0, // Jump = Agility + modifiers
    total: characterData.finalJumpDistance
  };
  
  if (characterData.finalJumpDistance !== breakdown.base) {
    breakdown.otherBonuses = [{
      name: 'Other',
      value: characterData.finalJumpDistance - breakdown.base
    }];
  }
  
  return (
    <div>
      <strong>Jump Distance</strong>
      <pre style={{ 
        margin: '8px 0 0 0', 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        lineHeight: '1.2'
      }}>
        {formatBreakdown(breakdown)}
      </pre>
    </div>
  );
};

export const createHPTooltip = (characterData: CharacterSheetData): React.ReactNode => {
  const mightBonus = characterData.finalMight || 0;
  const breakdown: StatBreakdown = {
    base: mightBonus,
    classBonus: characterData.finalHPMax - mightBonus, // Assume difference is from class/other
    total: characterData.finalHPMax
  };
  
  return (
    <div>
      <strong>Hit Points</strong>
      <pre style={{ 
        margin: '8px 0 0 0', 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        lineHeight: '1.2'
      }}>
        {formatBreakdown(breakdown)}
      </pre>
    </div>
  );
};

export const createMPTooltip = (characterData: CharacterSheetData): React.ReactNode => {
  const breakdown: StatBreakdown = {
    base: 0, // Base MP is usually 0
    classBonus: characterData.finalMPMax,
    total: characterData.finalMPMax
  };
  
  return (
    <div>
      <strong>Mana Points</strong>
      <pre style={{ 
        margin: '8px 0 0 0', 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        lineHeight: '1.2'
      }}>
        {formatBreakdown(breakdown)}
      </pre>
    </div>
  );
};

export const createSPTooltip = (characterData: CharacterSheetData): React.ReactNode => {
  const breakdown: StatBreakdown = {
    base: 0, // Base SP is usually 0
    classBonus: characterData.finalSPMax,
    total: characterData.finalSPMax
  };
  
  return (
    <div>
      <strong>Stamina Points</strong>
      <pre style={{ 
        margin: '8px 0 0 0', 
        fontFamily: 'monospace', 
        fontSize: '0.75rem',
        lineHeight: '1.2'
      }}>
        {formatBreakdown(breakdown)}
      </pre>
    </div>
  );
};
