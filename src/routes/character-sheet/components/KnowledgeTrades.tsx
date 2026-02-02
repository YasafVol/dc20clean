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

const ATTRIBUTE_ABBREVIATIONS: Record<'might' | 'agility' | 'charisma' | 'intelligence', string> = {
	might: 'M',
	agility: 'A',
	charisma: 'C',
	intelligence: 'I'
};

interface KnowledgeTradesProps {
	onKnowledgeInfoClick?: (knowledgeName: string) => void;
	onTradeInfoClick?: (tradeName: string) => void;
	onSkillClick?: (skillName: string, bonus: number) => void;
	isMobile?: boolean;
}

const KnowledgeTrades: React.FC<KnowledgeTradesProps> = ({
	onKnowledgeInfoClick,
	onTradeInfoClick,
	onSkillClick,
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
				<SkillRow
					key={knowledgeItem.id}
					$isMobile={isMobile}
					onClick={() => onSkillClick?.(knowledgeItem.name, knowledgeItem.bonus || 0)}
					style={{ cursor: 'pointer' }}
					title={`Roll ${knowledgeItem.name} check`}
				>
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
								onClick={(e) => { e.stopPropagation(); onKnowledgeInfoClick?.(knowledgeItem.name); }}
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
					<SkillRow
						key={trade.id}
						$isMobile={isMobile}
						onClick={() => {
							const leadingBonus =
								trade.bonuses && trade.bonuses.length > 0
									? trade.bonuses[0].total
									: trade.bonus || 0;
							onSkillClick?.(trade.name, leadingBonus);
						}}
						style={{ cursor: 'pointer' }}
						title={`Roll ${trade.name} check`}
					>
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
								{(() => {
									const leadingTotal =
										trade.bonuses && trade.bonuses.length > 0
											? trade.bonuses[0].total
											: trade.bonus;
									const bonusDisplay =
										trade.bonuses && trade.bonuses.length > 0
											? trade.bonuses
													.map((entry) => {
														const prefix = entry.total >= 0 ? '+' : '';
														return `${prefix}${entry.total}(${ATTRIBUTE_ABBREVIATIONS[entry.attribute]})`;
													})
													.join('/')
											: leadingTotal !== undefined
												? `${leadingTotal >= 0 ? '+' : ''}${leadingTotal}`
												: null;

									if (bonusDisplay === null) {
										return null;
									}

									const isPositive = (leadingTotal ?? 0) >= 0;

									return (
										<span
											style={{
												fontSize: '0.875rem',
												fontWeight: '600',
												color: isPositive
													? isMobile
														? '#22c55e'
														: '#059669'
													: isMobile
														? '#ef4444'
														: '#dc2626',
												textAlign: 'center',
												whiteSpace: 'nowrap'
											}}
										>
											{bonusDisplay}
										</span>
									);
								})()}
								<StyledInfoButton
									$isMobile={isMobile}
									onClick={(e) => { e.stopPropagation(); onTradeInfoClick?.(trade.name); }}
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
