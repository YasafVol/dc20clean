import React from 'react';
import type { SkillData, LanguageData } from '../../../types';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import { StyledLeftColumn } from '../styles/Layout';
import Attributes from './Attributes';
import KnowledgeTrades from './KnowledgeTrades';
import Languages from './Languages';

interface LeftColumnProps {
	characterData: SavedCharacter;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
	languages: LanguageData[];
	breakdowns?: Record<string, EnhancedStatBreakdown>;
	onKnowledgeInfoClick?: (knowledgeName: string) => void;
	onTradeInfoClick?: (tradeName: string) => void;
	isMobile?: boolean;
}

const LeftColumn: React.FC<LeftColumnProps> = ({
	characterData,
	skillsByAttribute,
	languages,
	breakdowns,
	onKnowledgeInfoClick,
	onTradeInfoClick,
	isMobile = false
}) => {
	return (
		<StyledLeftColumn>
			<Attributes
				characterData={characterData}
				skillsByAttribute={skillsByAttribute}
				breakdowns={breakdowns}
				isMobile={isMobile}
			/>
			<KnowledgeTrades
				onKnowledgeInfoClick={onKnowledgeInfoClick}
				onTradeInfoClick={onTradeInfoClick}
				isMobile={isMobile}
			/>
			<Languages languages={languages} isMobile={isMobile} />
		</StyledLeftColumn>
	);
};

export default LeftColumn;
