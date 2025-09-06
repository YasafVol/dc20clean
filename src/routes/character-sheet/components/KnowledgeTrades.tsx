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
	isMobile?: boolean;
}

const KnowledgeTrades: React.FC<KnowledgeTradesProps> = ({
	onKnowledgeInfoClick,
	onTradeInfoClick,
	isMobile = false
}) => {
	const knowledge = useCharacterKnowledge();
	const trades = useCharacterTrades();

	return (
		<>
			{/* Knowledge Section */}
			<KnowledgeTradesSection $isMobile={isMobile}>
				<SectionTitle $isMobile={isMobile}>KNOWLEDGE</SectionTitle>
				<SectionDescription $isMobile={isMobile}>
					Intelligence-based knowledge trades
				</SectionDescription>
				{knowledge.map((knowledgeItem) => (
					<SkillRow key={knowledgeItem.id} $isMobile={isMobile}>
						<SkillName $isMobile={isMobile}>{knowledgeItem.name.toUpperCase()}</SkillName>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<StyledProficiencyDots $isMobile={isMobile}>
								{[1, 2, 3, 4, 5].map((level) => (
									<StyledDot
										key={level}
										$filled={level <= knowledgeItem.proficiency}
										$isMobile={isMobile}
									/>
								))}
							</StyledProficiencyDots>
							{knowledgeItem.bonus !== undefined && (
								<span
									style={{
										fontSize: '0.875rem',
										fontWeight: '600',
										color:
											knowledgeItem.bonus >= 0
												? isMobile
													? '#22c55e'
													: '#059669'
												: isMobile
													? '#ef4444'
													: '#dc2626',
										minWidth: '2rem',
										textAlign: 'center'
									}}
								>
									{knowledgeItem.bonus >= 0 ? '+' : ''}
									{knowledgeItem.bonus}
								</span>
							)}
							<StyledInfoButton
								$isMobile={isMobile}
								onClick={() => onKnowledgeInfoClick?.(knowledgeItem.name)}
							>
								i
							</StyledInfoButton>
						</div>
					</SkillRow>
				))}
			</KnowledgeTradesSection>

			{/* Trades Section */}
			<KnowledgeTradesSection $isMobile={isMobile}>
				<SectionTitle $isMobile={isMobile}>TRADES</SectionTitle>
				<SectionDescription $isMobile={isMobile}>
					Selected practical trades & crafts
				</SectionDescription>
				{trades.length > 0 ? (
					trades.map((trade) => (
						<SkillRow key={trade.id} $isMobile={isMobile}>
							<SkillName $isMobile={isMobile}>{trade.name.toUpperCase()}</SkillName>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
								<StyledProficiencyDots $isMobile={isMobile}>
									{[1, 2, 3, 4, 5].map((level) => (
										<StyledDot
											key={level}
											$filled={level <= trade.proficiency}
											$isMobile={isMobile}
										/>
									))}
								</StyledProficiencyDots>
								{trade.bonus !== undefined && (
									<span
										style={{
											fontSize: '0.875rem',
											fontWeight: '600',
											color:
												trade.bonus >= 0
													? isMobile
														? '#22c55e'
														: '#059669'
													: isMobile
														? '#ef4444'
														: '#dc2626',
											minWidth: '2rem',
											textAlign: 'center'
										}}
									>
										{trade.bonus >= 0 ? '+' : ''}
										{trade.bonus}
									</span>
								)}
								<StyledInfoButton
									$isMobile={isMobile}
									onClick={() => onTradeInfoClick?.(trade.name)}
								>
									i
								</StyledInfoButton>
							</div>
						</SkillRow>
					))
				) : (
					<EmptyMessage $isMobile={isMobile}>No trades selected</EmptyMessage>
				)}
			</KnowledgeTradesSection>
		</>
	);
};

export default KnowledgeTrades;
