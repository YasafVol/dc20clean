/**
 * Enhanced Features Display with Source Attribution
 * 
 * This component displays character abilities organized by type
 * with clear source attribution and categorization.
 */

import React from 'react';
import styled from '@emotion/styled';
import type { EnhancedCalculationResult } from '../../../lib/types/effectSystem';

// Styled components
const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionHeader = styled.h3`
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

const FeatureCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const FeatureName = styled.h4`
  margin: 0;
  color: #1f2937;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
`;

const FeatureType = styled.span<{ $type: 'passive' | 'active' | 'resistance' | 'advantage' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  
  ${props => {
    switch (props.$type) {
      case 'passive':
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      case 'active':
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case 'resistance':
        return `
          background-color: #fed7d7;
          color: #9b2c2c;
        `;
      case 'advantage':
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const FeatureDescription = styled.p`
  margin: 0.5rem 0;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.4;
`;

const FeatureSource = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
  font-size: 0.75rem;
  color: #6b7280;
`;

const SourceBadge = styled.span<{ $sourceType: string }>`
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-weight: 500;
  
  ${props => {
    switch (props.$sourceType) {
      case 'ancestry_default':
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case 'trait':
        return `
          background-color: #e0e7ff;
          color: #3730a3;
        `;
      case 'class_feature':
        return `
          background-color: #dcfce7;
          color: #166534;
        `;
      case 'choice':
        return `
          background-color: #fce7f3;
          color: #9d174d;
        `;
      default:
        return `
          background-color: #f3f4f6;
          color: #374151;
        `;
    }
  }}
`;

const ConditionalTag = styled.span`
  padding: 0.125rem 0.375rem;
  background-color: #fbbf24;
  color: #78350f;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const ConditionalSection = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fffbeb;
  border: 1px solid #fed7aa;
  border-radius: 8px;
`;

const ConditionalHeader = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #92400e;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: '⚠️';
  }
`;

const ConditionalItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #fed7aa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ConditionTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: #f59e0b;
  color: #ffffff;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: lowercase;
`;

interface EnhancedFeaturesProps {
  calculationResult: EnhancedCalculationResult;
}

const EnhancedFeatures: React.FC<EnhancedFeaturesProps> = ({ calculationResult }) => {
  // Group abilities by type
  const passiveAbilities = calculationResult.grantedAbilities.filter(
    ability => ability.type === 'passive' && !ability.isConditional
  );
  
  const activeAbilities = calculationResult.grantedAbilities.filter(
    ability => ability.type === 'active' && !ability.isConditional
  );
  
  const resistances = calculationResult.grantedAbilities.filter(
    ability => ability.type === 'resistance'
  );
  
  const advantages = calculationResult.grantedAbilities.filter(
    ability => ability.type === 'advantage'
  );
  
  // Helper function to get icon for section
  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'passive': return '🛡️';
      case 'active': return '⚡';
      case 'resistance': return '🛡️';
      case 'advantage': return '🎯';
      default: return '✨';
    }
  };
  
  // Helper function to format source category
  const formatSourceCategory = (category?: string) => {
    if (!category) return '';
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <FeaturesContainer>
      {/* Passive Abilities */}
      {passiveAbilities.length > 0 && (
        <div>
          <SectionHeader>
            {getSectionIcon('passive')} Passive Abilities
          </SectionHeader>
          {passiveAbilities.map((ability, index) => (
            <FeatureCard key={`passive-${index}`}>
              <FeatureHeader>
                <FeatureName>{ability.name}</FeatureName>
                <FeatureType $type="passive">Passive</FeatureType>
              </FeatureHeader>
              
              <FeatureDescription>{ability.description}</FeatureDescription>
              
              <FeatureSource>
                <span>
                  Source: <strong>{ability.source.name}</strong>
                  {ability.source.category && ` • ${formatSourceCategory(ability.source.category)}`}
                </span>
                <SourceBadge $sourceType={ability.source.type}>
                  {ability.source.type.replace('_', ' ')}
                </SourceBadge>
              </FeatureSource>
            </FeatureCard>
          ))}
        </div>
      )}
      
      {/* Active Abilities */}
      {activeAbilities.length > 0 && (
        <div>
          <SectionHeader>
            {getSectionIcon('active')} Active Abilities
          </SectionHeader>
          {activeAbilities.map((ability, index) => (
            <FeatureCard key={`active-${index}`}>
              <FeatureHeader>
                <FeatureName>{ability.name}</FeatureName>
                <FeatureType $type="active">Active</FeatureType>
              </FeatureHeader>
              
              <FeatureDescription>{ability.description}</FeatureDescription>
              
              <FeatureSource>
                <span>
                  Source: <strong>{ability.source.name}</strong>
                  {ability.source.category && ` • ${formatSourceCategory(ability.source.category)}`}
                </span>
                <SourceBadge $sourceType={ability.source.type}>
                  {ability.source.type.replace('_', ' ')}
                </SourceBadge>
              </FeatureSource>
            </FeatureCard>
          ))}
        </div>
      )}
      
      {/* Resistances */}
      {(resistances.length > 0 || calculationResult.resistances.length > 0) && (
        <div>
          <SectionHeader>
            {getSectionIcon('resistance')} Resistances & Immunities
          </SectionHeader>
          {resistances.map((ability, index) => (
            <FeatureCard key={`resistance-${index}`}>
              <FeatureHeader>
                <FeatureName>{ability.name}</FeatureName>
                <FeatureType $type="resistance">Resistance</FeatureType>
              </FeatureHeader>
              
              <FeatureDescription>{ability.description}</FeatureDescription>
              
              <FeatureSource>
                <span>
                  Source: <strong>{ability.source.name}</strong>
                  {ability.source.category && ` • ${formatSourceCategory(ability.source.category)}`}
                </span>
                <SourceBadge $sourceType={ability.source.type}>
                  {ability.source.type.replace('_', ' ')}
                </SourceBadge>
              </FeatureSource>
            </FeatureCard>
          ))}
          
          {/* Direct resistances from effects */}
          {calculationResult.resistances.map((resistance, index) => (
            <FeatureCard key={`direct-resistance-${index}`}>
              <FeatureHeader>
                <FeatureName>{resistance.type} Resistance</FeatureName>
                <FeatureType $type="resistance">Resistance</FeatureType>
              </FeatureHeader>
              
              <FeatureDescription>
                Resistance ({resistance.value}) to {resistance.type} damage
              </FeatureDescription>
              
              <FeatureSource>
                <span>
                  Source: <strong>{resistance.source.name}</strong>
                  {resistance.source.category && ` • ${formatSourceCategory(resistance.source.category)}`}
                </span>
                <SourceBadge $sourceType={resistance.source.type}>
                  {resistance.source.type.replace('_', ' ')}
                </SourceBadge>
              </FeatureSource>
            </FeatureCard>
          ))}
        </div>
      )}
      
      {/* Advantages */}
      {advantages.length > 0 && (
        <div>
          <SectionHeader>
            {getSectionIcon('advantage')} Advantages & Bonuses
          </SectionHeader>
          {advantages.map((ability, index) => (
            <FeatureCard key={`advantage-${index}`}>
              <FeatureHeader>
                <FeatureName>{ability.name}</FeatureName>
                <FeatureType $type="advantage">Advantage</FeatureType>
              </FeatureHeader>
              
              <FeatureDescription>{ability.description}</FeatureDescription>
              
              <FeatureSource>
                <span>
                  Source: <strong>{ability.source.name}</strong>
                  {ability.source.category && ` • ${formatSourceCategory(ability.source.category)}`}
                </span>
                <SourceBadge $sourceType={ability.source.type}>
                  {ability.source.type.replace('_', ' ')}
                </SourceBadge>
              </FeatureSource>
            </FeatureCard>
          ))}
        </div>
      )}
      
      {/* Conditional Modifiers */}
      {calculationResult.conditionalModifiers.length > 0 && (
        <ConditionalSection>
          <ConditionalHeader>Conditional Bonuses</ConditionalHeader>
          {calculationResult.conditionalModifiers.map((modifier, index) => (
            <ConditionalItem key={`conditional-${index}`}>
              <span>{modifier.description}</span>
              <ConditionTag>{modifier.condition.replace('_', ' ')}</ConditionTag>
            </ConditionalItem>
          ))}
        </ConditionalSection>
      )}
    </FeaturesContainer>
  );
};

export default EnhancedFeatures;
