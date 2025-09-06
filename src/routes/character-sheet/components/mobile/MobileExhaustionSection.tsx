import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileExhaustionGrid,
	MobileExhaustionLevel
} from '../../styles/CharacterSheetMobile.styles';
import { exhaustionLevels } from '../../utils/mobileCharacterSheetUtils';

interface MobileExhaustionSectionProps {
	exhaustion: number;
	updateExhaustion: (level: number) => void;
}

const MobileExhaustionSection: React.FC<MobileExhaustionSectionProps> = ({
	exhaustion,
	updateExhaustion
}) => {
	return (
		<MobileSection>
			<MobileSectionTitle>Exhaustion</MobileSectionTitle>
			<MobileExhaustionGrid>
				{exhaustionLevels.map((levelData) => (
					<MobileExhaustionLevel
						key={levelData.level}
						$active={exhaustion >= levelData.level}
						onClick={() => updateExhaustion(levelData.level)}
						title={levelData.description}
					>
						{levelData.level}
					</MobileExhaustionLevel>
				))}
			</MobileExhaustionGrid>
		</MobileSection>
	);
};

export default MobileExhaustionSection;
