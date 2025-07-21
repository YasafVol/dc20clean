import React from 'react';
import type { TradeData } from '../../../types';
import {
  KnowledgeTradesSection,
  SectionTitle,
  SectionDescription,
  EmptyMessage
} from '../styles/KnowledgeTrades';
import { SkillRow, SkillName } from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface KnowledgeTradesProps {
  knowledge: TradeData[];
  trades: TradeData[];
}

const KnowledgeTrades: React.FC<KnowledgeTradesProps> = ({ knowledge, trades }) => {
  return (
    <>
      {/* Knowledge Section */}
      <KnowledgeTradesSection>
        <SectionTitle>KNOWLEDGE</SectionTitle>
        <SectionDescription>Intelligence-based knowledge trades</SectionDescription>
        {knowledge.map(knowledgeItem => (
          <SkillRow key={knowledgeItem.id}>
            <SkillName>{knowledgeItem.name.toUpperCase()}</SkillName>
            <StyledProficiencyDots>
              {[1, 2, 3, 4, 5].map(level => (
                <StyledDot key={level} filled={level <= knowledgeItem.proficiency} />
              ))}
            </StyledProficiencyDots>
          </SkillRow>
        ))}
      </KnowledgeTradesSection>

      {/* Trades Section */}
      <KnowledgeTradesSection>
        <SectionTitle>TRADES</SectionTitle>
        <SectionDescription>Selected practical trades & crafts</SectionDescription>
        {trades.length > 0 ? (
          trades.map(trade => (
            <SkillRow key={trade.id}>
              <SkillName>{trade.name.toUpperCase()}</SkillName>
              <StyledProficiencyDots>
                {[1, 2, 3, 4, 5].map(level => (
                  <StyledDot key={level} filled={level <= trade.proficiency} />
                ))}
              </StyledProficiencyDots>
            </SkillRow>
          ))
        ) : (
          <EmptyMessage>
            No trades selected
          </EmptyMessage>
        )}
      </KnowledgeTradesSection>
    </>
  );
};

export default KnowledgeTrades;
