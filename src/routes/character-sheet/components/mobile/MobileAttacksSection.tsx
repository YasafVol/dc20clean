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

interface MobileAttacksSectionProps {
	attacks: any[];
	weapons: any[];
	handleAddAttack: () => void;
	removeAttack: (attackId: string) => void;
	handleWeaponSelection: (attackId: string, selectedWeaponName: string) => void;
	openAttackPopup: (attack: any) => void;
}

const MobileAttacksSection: React.FC<MobileAttacksSectionProps> = ({
	attacks,
	weapons,
	handleAddAttack,
	removeAttack,
	handleWeaponSelection,
	openAttackPopup
}) => {
	return (
		<MobileSection>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<MobileSectionTitle>Attacks</MobileSectionTitle>
				<MobileAddButton onClick={handleAddAttack}>
					+ Add Attack
				</MobileAddButton>
			</div>
			<MobileItemGrid>
				{attacks.map((attack) => (
					<MobileItem key={attack.id} style={{ position: 'relative' }}>
						<MobileDeleteButton
							onClick={(e) => {
								e.stopPropagation();
								removeAttack(attack.id);
							}}
						>
							×
						</MobileDeleteButton>
						{(attack as any).isPending ? (
							// Show dropdown for pending attacks
							<div style={{ padding: '8px' }}>
								<MobileSelect
									value=""
									onChange={(e) => {
										if (e.target.value) {
											handleWeaponSelection(attack.id, e.target.value);
										}
									}}
								>
									<option value="">Select a weapon...</option>
									{weapons.map((weapon) => (
										<option key={weapon.name} value={weapon.name}>
											{weapon.name} ({weapon.type})
										</option>
									))}
								</MobileSelect>
							</div>
						) : (
							// Show normal attack display
							<div onClick={() => openAttackPopup(attack)}>
								<MobileItemName>{attack.name || 'Unnamed Attack'}</MobileItemName>
								<MobileItemDetails>
									{attack.weaponName && <div>Weapon: {attack.weaponName}</div>}
									{attack.damage && <div>Damage: {attack.damage}</div>}
									{attack.attackBonus !== 0 && <div>Bonus: +{attack.attackBonus}</div>}
								</MobileItemDetails>
							</div>
						)}
					</MobileItem>
				))}
			</MobileItemGrid>
		</MobileSection>
	);
};

export default MobileAttacksSection;