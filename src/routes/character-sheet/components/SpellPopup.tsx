import React from 'react';
import type { Spell } from '../../../lib/rulesdata/spells-data/types/spell.types';
import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSourceInfo
} from '../styles/FeaturePopup';

interface SpellPopupProps {
	spell: Spell | null;
	onClose: () => void;
}

const SpellPopup: React.FC<SpellPopupProps> = ({ spell, onClose }) => {
	if (!spell) return null;

	return (
		<StyledFeaturePopupOverlay onClick={onClose}>
			<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
				<StyledFeaturePopupHeader>
					<StyledFeaturePopupTitle>{spell.name}</StyledFeaturePopupTitle>
					<StyledFeaturePopupClose onClick={onClose}>×</StyledFeaturePopupClose>
				</StyledFeaturePopupHeader>
				<StyledFeaturePopupDescription>
					<strong>School:</strong> {spell.school}
					<br />
					<strong>AP Cost:</strong> {spell.cost.ap}
					<br />
					{spell.cost.mp && (
						<>
							<strong>MP Cost:</strong> {spell.cost.mp}
							<br />
						</>
					)}
					<strong>Range:</strong> {spell.range}
					<br />
					<strong>Duration:</strong> {spell.duration}
					<br />
					{spell.isCantrip && (
						<>
							<strong>Type:</strong> Cantrip
							<br />
						</>
					)}
					{spell.isRitual && (
						<>
							<strong>Ritual:</strong> Yes
							<br />
						</>
					)}
					<br />
					{spell.effects?.[0]?.description || 'No description available.'}
					{spell.cantripPassive && (
						<>
							<br />
							<br />
							<strong>Cantrip Passive:</strong> {spell.cantripPassive}
						</>
					)}
				</StyledFeaturePopupDescription>
				{spell.enhancements?.length > 0 && (
					<StyledFeaturePopupSourceInfo>
						Enhancements Available: {spell.enhancements.length}
					</StyledFeaturePopupSourceInfo>
				)}
			</StyledFeaturePopupContent>
		</StyledFeaturePopupOverlay>
	);
};

export default SpellPopup;
