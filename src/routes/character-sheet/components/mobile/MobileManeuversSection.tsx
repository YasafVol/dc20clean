import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileItemGrid,
	MobileItem,
	MobileItemName,
	MobileItemDetails,
	MobileAddButton,
	MobileDeleteButton,
	MobileSelect
} from '../../styles/CharacterSheetMobile.styles';
import { showManeuverDetails } from '../../utils/mobileCharacterSheetUtils';

interface MobileManeuversSectionProps {
	maneuvers: any[];
	allManeuvers: any[];
	handleAddManeuver: () => void;
	removeManeuver: (maneuverId: string) => void;
	handleManeuverSelection: (maneuverId: string, selectedManeuverName: string) => void;
}

const MobileManeuversSection: React.FC<MobileManeuversSectionProps> = ({
	maneuvers,
	allManeuvers,
	handleAddManeuver,
	removeManeuver,
	handleManeuverSelection
}) => {
	return (
		<MobileSection>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<MobileSectionTitle>Maneuvers</MobileSectionTitle>
				<MobileAddButton onClick={handleAddManeuver}>
					+ Add Maneuver
				</MobileAddButton>
			</div>
			{maneuvers.length > 0 && (
				<MobileItemGrid>
					{maneuvers.map((maneuver) => (
						<MobileItem key={maneuver.id} style={{ position: 'relative' }}>
							<MobileDeleteButton
								onClick={(e) => {
									e.stopPropagation();
									removeManeuver(maneuver.id);
								}}
							>
								×
							</MobileDeleteButton>
							{(maneuver as any).isPending ? (
								// Show dropdown for pending maneuvers
								<div style={{ padding: '8px' }}>
									<MobileSelect
										value=""
										onChange={(e) => {
											if (e.target.value) {
												handleManeuverSelection(maneuver.id, e.target.value);
											}
										}}
									>
										<option value="">Select a maneuver...</option>
										{allManeuvers.map((ruleManeuver) => (
											<option key={ruleManeuver.name} value={ruleManeuver.name}>
												{ruleManeuver.name} ({ruleManeuver.type})
											</option>
										))}
									</MobileSelect>
								</div>
							) : (
								// Show normal maneuver display
								<div
									onClick={() => {
										showManeuverDetails(maneuver, allManeuvers);
									}}
								>
									<MobileItemName>{maneuver.name || 'Unnamed Maneuver'}</MobileItemName>
									<MobileItemDetails>
										{maneuver.cost && <div>Cost: {maneuver.cost}</div>}
										{maneuver.type && <div>Type: {maneuver.type}</div>}
									</MobileItemDetails>
								</div>
							)}
						</MobileItem>
					))}
				</MobileItemGrid>
			)}
		</MobileSection>
	);
};

export default MobileManeuversSection;