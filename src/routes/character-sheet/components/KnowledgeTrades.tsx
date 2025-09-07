import React from 'react';
import { useCharacterKnowledge, useCharacterTrades } from '../hooks/CharacterSheetProvider';
import {
	KnowledgeTradesSection,
	SectionTitle,
	SectionDescription,
	EmptyMessage,
	StyledInfoButton
} from '../styles/KnowledgeTrades';
import { SkillRow, SkillName } from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface KnowledgeTradesProps {
	onKnowledgeInfoClick?: (knowledgeName: string) => void;
	onTradeInfoClick?: (tradeName: string) => void;
}

const KnowledgeTrades: React.FC<KnowledgeTradesProps> = ({
	onKnowledgeInfoClick,
	onTradeInfoClick
}) => {
	const knowledge = useCharacterKnowledge();
	const trades = useCharacterTrades();

	return (
		<>
			{/* Knowledge Section */}
			<KnowledgeTradesSection>
				<SectionTitle>KNOWLEDGE</SectionTitle>
				<SectionDescription>Intelligence-based knowledge trades</SectionDescription>
				{knowledge.map((knowledgeItem) => (
					<SkillRow key={knowledgeItem.id}>
						<SkillName>{knowledgeItem.name.toUpperCase()}</SkillName>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<StyledProficiencyDots>
								{[1, 2, 3, 4, 5].map((level) => (
									<StyledDot key={level} $filled={level <= knowledgeItem.proficiency} />
								))}
							</StyledProficiencyDots>
							{knowledgeItem.bonus !== undefined && (
								<span
									style={{
										fontSize: '0.875rem',
										fontWeight: '600',
										color: knowledgeItem.bonus >= 0 ? '#059669' : '#dc2626',
										minWidth: '2rem',
										textAlign: 'center'
									}}
								>
									{knowledgeItem.bonus >= 0 ? '+' : ''}
									{knowledgeItem.bonus}
								</span>
							)}
							<StyledInfoButton onClick={() => onKnowledgeInfoClick?.(knowledgeItem.name)}>
								i
							</StyledInfoButton>
						</div>
					</SkillRow>
				))}
			</KnowledgeTradesSection>

			{/* Trades Section */}
			<KnowledgeTradesSection>
				<SectionTitle>TRADES</SectionTitle>
				<SectionDescription>Selected practical trades & crafts</SectionDescription>
				{trades.length > 0 ? (
					trades.map((trade) => (
						<SkillRow key={trade.id}>
							<SkillName>{trade.name.toUpperCase()}</SkillName>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
								<StyledProficiencyDots>
									{[1, 2, 3, 4, 5].map((level) => (
										<StyledDot key={level} $filled={level <= trade.proficiency} />
									))}
								</StyledProficiencyDots>
								{trade.bonus !== undefined && (
									<span
										style={{
											fontSize: '0.875rem',
											fontWeight: '600',
											color: trade.bonus >= 0 ? '#059669' : '#dc2626',
											minWidth: '2rem',
											textAlign: 'center'
										}}
									>
										{trade.bonus >= 0 ? '+' : ''}
										{trade.bonus}
									</span>
								)}
								<StyledInfoButton onClick={() => onTradeInfoClick?.(trade.name)}>
									i
								</StyledInfoButton>
							</div>
						</SkillRow>
					))
				) : (
					<EmptyMessage>No trades selected</EmptyMessage>
				)}
			</KnowledgeTradesSection>
		</>
	);
};

export default KnowledgeTrades;
