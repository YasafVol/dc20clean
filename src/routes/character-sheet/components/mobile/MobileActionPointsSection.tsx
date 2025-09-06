import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileActionPointsGrid,
	MobileActionPoint
} from '../../styles/CharacterSheetMobile.styles';

interface MobileActionPointsSectionProps {
	resources: any;
	updateActionPoints: (points: number) => void;
}

const MobileActionPointsSection: React.FC<MobileActionPointsSectionProps> = ({
	resources,
	updateActionPoints
}) => {
	return (
		<MobileSection>
			<MobileSectionTitle>Action Points Used</MobileSectionTitle>
			<MobileActionPointsGrid>
				{[1, 2, 3, 4].map((point) => (
					<MobileActionPoint
						key={point}
						$used={resources?.current?.actionPointsUsed >= point}
						onClick={() => {
							const currentUsed = resources?.current?.actionPointsUsed || 0;
							const newUsed = currentUsed === point ? point - 1 : point;
							updateActionPoints(newUsed);
						}}
					>
						<div>{point}</div>
						<div style={{ fontSize: '10px', marginTop: '2px' }}>
							{point === 1 ? 'Free' : point === 2 ? 'Move' : point === 3 ? 'Action' : 'Focus'}
						</div>
						<div style={{
							fontSize: '8px',
							color: resources?.current?.actionPointsUsed >= point ? '#fff' : '#f5d020'
						}}>
							{resources?.current?.actionPointsUsed >= point ? '●' : '○'}
						</div>
					</MobileActionPoint>
				))}
			</MobileActionPointsGrid>
		</MobileSection>
	);
};

export default MobileActionPointsSection;