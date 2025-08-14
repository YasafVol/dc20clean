import React from 'react';
import type { SkillData, TradeData, LanguageData, CharacterSheetData } from '../../../types';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import { StyledLeftColumn } from '../styles/Layout';
import Attributes from './Attributes';
import KnowledgeTrades from './KnowledgeTrades';
import Languages from './Languages';

interface LeftColumnProps {
	characterData: CharacterSheetData;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
	knowledge: TradeData[];
	trades: TradeData[];
	languages: LanguageData[];
	breakdowns?: Record<string, EnhancedStatBreakdown>;
}

const LeftColumn: React.FC<LeftColumnProps> = ({
	characterData,
	skillsByAttribute,
	knowledge,
	trades,
	languages,
	breakdowns
}) => {
	return (
		<StyledLeftColumn>
			<Attributes 
				characterData={characterData} 
				skillsByAttribute={skillsByAttribute} 
				breakdowns={breakdowns}
			/>
			<KnowledgeTrades knowledge={knowledge} trades={trades} />
			<Languages languages={languages} />
		</StyledLeftColumn>
	);
};

export default LeftColumn;
