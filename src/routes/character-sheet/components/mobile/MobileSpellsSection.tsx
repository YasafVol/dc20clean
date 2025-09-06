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

interface MobileSpellsSectionProps {
	spells: any[];
	allSpells: any[];
	handleAddSpell: () => void;
	removeSpell: (spellId: string) => void;
	handleSpellSelection: (spellId: string, selectedSpellName: string) => void;
	openSpellPopup: (spell: any) => void;
}

const MobileSpellsSection: React.FC<MobileSpellsSectionProps> = ({
	spells,
	allSpells,
	handleAddSpell,
	removeSpell,
	handleSpellSelection,
	openSpellPopup
}) => {
	return (
		<MobileSection>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<MobileSectionTitle>Spells</MobileSectionTitle>
				<MobileAddButton onClick={handleAddSpell}>
					+ Add Spell
				</MobileAddButton>
			</div>
			{spells.length > 0 && (
				<MobileItemGrid>
					{spells.map((spell) => (
						<MobileItem key={spell.id} style={{ position: 'relative' }}>
							<MobileDeleteButton
								onClick={(e) => {
									e.stopPropagation();
									removeSpell(spell.id);
								}}
							>
								×
							</MobileDeleteButton>
							{(spell as any).isPending ? (
								// Show dropdown for pending spells
								<div style={{ padding: '8px' }}>
									<MobileSelect
										value=""
										onChange={(e) => {
											if (e.target.value) {
												handleSpellSelection(spell.id, e.target.value);
											}
										}}
									>
										<option value="">Select a spell...</option>
										{allSpells.map((ruleSpell) => (
											<option key={ruleSpell.name} value={ruleSpell.name}>
												{ruleSpell.name} ({ruleSpell.school})
											</option>
										))}
									</MobileSelect>
								</div>
							) : (
								// Show normal spell display
								<div onClick={() => openSpellPopup(spell)}>
									<MobileItemName>{spell.spellName || 'Unnamed Spell'}</MobileItemName>
									<MobileItemDetails>School: {spell.school || '?'}</MobileItemDetails>
								</div>
							)}
						</MobileItem>
					))}
				</MobileItemGrid>
			)}
		</MobileSection>
	);
};

export default MobileSpellsSection;