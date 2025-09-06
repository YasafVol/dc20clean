import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileResourceGrid,
	MobileResourceItem,
	MobileResourceLabel,
	MobileResourceValue,
	MobileResourceControls,
	MobileResourceButton,
	MobileResourceBar
} from '../../styles/CharacterSheetMobile.styles';
import { getFillPercentage } from '../../utils/mobileCharacterSheetUtils';

interface MobileResourceSectionProps {
	resources: any;
	characterData: any;
	adjustResource: (resource: string, change: number) => void;
}

const MobileResourceSection: React.FC<MobileResourceSectionProps> = ({
	resources,
	characterData,
	adjustResource
}) => {
	return (
		<MobileSection>
			<MobileSectionTitle>Resources</MobileSectionTitle>
			<MobileResourceGrid>
				{/* Health Points */}
				<MobileResourceItem>
					<MobileResourceLabel>Health Points</MobileResourceLabel>
					<MobileResourceValue>
						{resources?.current?.currentHP || 0} / {characterData.finalHPMax}
						{resources?.current.tempHP > 0 && ` (+${resources?.current.tempHP} temp)`}
					</MobileResourceValue>
					<MobileResourceBar 
						$percentage={getFillPercentage(resources?.current?.currentHP || 0, characterData.finalHPMax)} 
					/>
					<MobileResourceControls>
						<MobileResourceButton onClick={() => adjustResource('currentHP', -1)}>-</MobileResourceButton>
						<span style={{ color: '#f5d020', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>
							HP
						</span>
						<MobileResourceButton onClick={() => adjustResource('currentHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
					<MobileResourceControls style={{ marginTop: '4px' }}>
						<MobileResourceButton onClick={() => adjustResource('tempHP', -1)}>-</MobileResourceButton>
						<span style={{ color: '#ccc', fontSize: '12px', minWidth: '40px', textAlign: 'center' }}>
							Temp
						</span>
						<MobileResourceButton onClick={() => adjustResource('tempHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
				</MobileResourceItem>

				{/* Stamina Points */}
				{characterData.finalSPMax > 0 && (
					<MobileResourceItem>
						<MobileResourceLabel>Stamina Points</MobileResourceLabel>
						<MobileResourceValue>
							{resources?.current?.currentSP || 0} / {characterData.finalSPMax}
						</MobileResourceValue>
						<MobileResourceBar 
							$percentage={getFillPercentage(resources?.current.currentSP, characterData.finalSPMax)} 
						/>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentSP', -1)}>-</MobileResourceButton>
							<span style={{ color: '#f5d020', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>
								SP
							</span>
							<MobileResourceButton onClick={() => adjustResource('currentSP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceItem>
				)}

				{/* Mana Points */}
				{characterData.finalMPMax > 0 && (
					<MobileResourceItem>
						<MobileResourceLabel>Mana Points</MobileResourceLabel>
						<MobileResourceValue>
							{resources?.current?.currentMP || 0} / {characterData.finalMPMax}
						</MobileResourceValue>
						<MobileResourceBar 
							$percentage={getFillPercentage(resources?.current.currentMP, characterData.finalMPMax)} 
						/>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentMP', -1)}>-</MobileResourceButton>
							<span style={{ color: '#f5d020', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>
								MP
							</span>
							<MobileResourceButton onClick={() => adjustResource('currentMP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceItem>
				)}

				{/* Rest Points */}
				{(resources?.original?.maxRestPoints || 0) > 0 && (
					<MobileResourceItem>
						<MobileResourceLabel>Rest Points</MobileResourceLabel>
						<MobileResourceValue>
							{resources?.current?.currentRestPoints || 0} / {resources?.original?.maxRestPoints}
						</MobileResourceValue>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentRestPoints', -1)}>-</MobileResourceButton>
							<span style={{ color: '#f5d020', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>
								RP
							</span>
							<MobileResourceButton onClick={() => adjustResource('currentRestPoints', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceItem>
				)}

				{/* Grit Points */}
				{(resources?.original?.maxGritPoints || 0) > 0 && (
					<MobileResourceItem>
						<MobileResourceLabel>Grit Points</MobileResourceLabel>
						<MobileResourceValue>
							{resources?.current?.currentGritPoints || 0} / {resources?.original?.maxGritPoints}
						</MobileResourceValue>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentGritPoints', -1)}>-</MobileResourceButton>
							<span style={{ color: '#f5d020', fontSize: '14px', minWidth: '40px', textAlign: 'center' }}>
								GP
							</span>
							<MobileResourceButton onClick={() => adjustResource('currentGritPoints', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceItem>
				)}
			</MobileResourceGrid>
		</MobileSection>
	);
};

export default MobileResourceSection;