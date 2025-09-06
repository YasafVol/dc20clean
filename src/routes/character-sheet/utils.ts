import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import type {
	CharacterSheetData,
	AttackData,
	SpellData,
	ManeuverData,
	CurrentValues,
	FeatureData,
	LanguageData,
	TradeData,
	CharacterState,
	InventoryItemData,
	SkillData
} from '../../types';
import type { Spell } from '../../lib/rulesdata/schemas/spell.schema';
import type { Maneuver } from '../../lib/rulesdata/maneuvers';

interface CalculatedDefenses {
	calculatedPD: number;
	calculatedAD: number;
	calculatedPDR: number;
}

interface SkillsByAttribute {
	[attribute: string]: SkillData[];
}

export const handlePrintCharacterSheet = (
	characterData: CharacterSheetData,
	attacks: AttackData[],
	spells: SpellData[],
	characterState: CharacterState | null,
	maneuvers: ManeuverData[],
	getCalculatedDefenses: () => CalculatedDefenses,
	currentValues: CurrentValues,
	features: FeatureData[],
	languages: LanguageData[],
	trades: TradeData[],
	inventory: InventoryItemData[],
	skillsByAttribute: SkillsByAttribute,
	allSpells: Spell[],
	allManeuvers: Maneuver[]
): void => {
	try {
		if (!characterData) {
			alert('Character data not found');
			return;
		}

		// Create a new window for printing
		const printWindow = window.open('', '_blank');
		if (!printWindow) {
			alert('Please allow popups to print the character sheet');
			return;
		}

		// Get the character sheet element
		const characterSheetElement = document.querySelector('.character-sheet-content');
		if (!characterSheetElement) {
			alert('Character sheet content not found');
			return;
		}

		// Get current data for printing
		const currentAttacks = attacks;
		const currentSpells = spells.length > 0 ? spells : characterState?.spells?.current || [];
		const currentManeuvers =
			maneuvers.length > 0 ? maneuvers : characterState?.maneuvers?.current || [];

		// Debug logging
		console.log('Print function - currentSpells:', currentSpells);
		console.log('Print function - spells state:', spells);
		console.log(
			'Print function - characterState?.spells?.current:',
			characterState?.spells?.current
		);
		console.log('Print function - currentManeuvers:', currentManeuvers);

		// Create print-friendly HTML
		const printHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${characterData.finalName} - DC20 Character Sheet</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 1cm;
                        }
                        body {
                            font-family: 'Georgia', serif;
                            color: #2d2d2d;
                            background: white;
                            margin: 0;
                            padding: 20px;
                            line-height: 1.4;
                        }
                        .character-sheet {
                            max-width: 100%;
                            border: 2px solid #8b4513;
                            border-radius: 8px;
                            padding: 20px;
                            background: white;
                            margin-bottom: 30px;
                        }
                        .page-break {
                            page-break-before: always;
                        }
                        .header {
                            display: grid;
                            grid-template-columns: 1fr 1fr 1fr auto;
                            gap: 20px;
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 2px solid #8b4513;
                        }
                        .header-section {
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                        }
                        .label {
                            font-weight: bold;
                            font-size: 0.9rem;
                            color: #8b4513;
                        }
                        .value {
                            font-size: 1.1rem;
                            font-weight: bold;
                        }
                        .dc20-logo {
                            font-size: 2rem;
                            font-weight: bold;
                            color: #8b4513;
                            text-align: center;
                            align-self: center;
                        }
                        .main-grid {
                            display: grid;
                            grid-template-columns: 300px 1fr 250px;
                            gap: 20px;
                        }
                        .column {
                            display: flex;
                            flex-direction: column;
                            gap: 15px;
                        }
                        .section {
                            border: 1px solid #ccc;
                            border-radius: 6px;
                            padding: 15px;
                            background: #f9f9f9;
                        }
                        .section-title {
                            font-weight: bold;
                            font-size: 1.1rem;
                            color: #8b4513;
                            margin-bottom: 10px;
                            border-bottom: 1px solid #8b4513;
                            padding-bottom: 5px;
                        }
                        .resource-circle {
                            display: inline-block;
                            width: 60px;
                            height: 60px;
                            border: 3px solid #8b4513;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 60px;
                            font-weight: bold;
                            font-size: 1.2rem;
                            margin: 5px;
                            background: white;
                        }
                        .defense-box {
                            display: inline-block;
                            padding: 10px 15px;
                            border: 2px solid #8b4513;
                            border-radius: 6px;
                            text-align: center;
                            margin: 5px;
                            background: white;
                        }
                        .defense-label {
                            font-size: 0.8rem;
                            color: #666;
                        }
                        .defense-value {
                            font-size: 1.3rem;
                            font-weight: bold;
                            color: #8b4513;
                        }
                        .skill-row {
                            display: flex;
                            justify-content: space-between;
                            padding: 3px 0;
                            border-bottom: 1px solid #eee;
                        }
                        .skill-name {
                            font-weight: bold;
                        }
                        .skill-bonus {
                            color: #8b4513;
                            font-weight: bold;
                        }
                        .attack-row {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 5px 0;
                            border-bottom: 1px solid #eee;
                        }
                        .spell-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                            gap: 10px;
                        }
                        .spell-item {
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 8px;
                            background: white;
                            font-size: 0.9rem;
                        }
                        .spell-card {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                        .maneuver-card {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                        .inventory-item {
                            display: flex;
                            justify-content: space-between;
                            padding: 3px 0;
                            border-bottom: 1px solid #eee;
                        }
                        @media print {
                            body { margin: 0; }
                            .character-sheet { border: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="character-sheet">
                        <div class="header">
                            <div class="header-section">
                                <div class="label">Player Name</div>
                                <div class="value">${characterData.finalPlayerName || 'Unknown'}</div>
                                <div class="label">Character Name</div>
                                <div class="value">${characterData.finalName}</div>
                            </div>
                            <div class="header-section">
                                <div class="label">Class & Subclass</div>
                                <div class="value">${characterData.className}</div>
                                <div class="label">Ancestry & Background</div>
                                <div class="value">${characterData.ancestry1Name || 'Unknown'}</div>
                            </div>
                            <div class="header-section">
                                <div class="label">Level</div>
                                <div class="value">${characterData.finalLevel}</div>
                                <div class="label">Combat Mastery</div>
                                <div class="value">+${characterData.finalCombatMastery}</div>
                            </div>
                            <div class="dc20-logo">DC20</div>
                        </div>
                        
                        <div class="main-grid">
                            <div class="column">
                                <div class="section">
                                    <div class="section-title">Resources</div>
                                    <div style="text-align: center;">
                                        <div class="resource-circle">${currentValues.currentHP}/${characterData.finalHPMax}</div>
                                        <div class="resource-circle">${currentValues.currentSP}/${characterData.finalSPMax}</div>
                                        <div class="resource-circle">${currentValues.currentMP}/${characterData.finalMPMax}</div>
                                    </div>
                                </div>
                                
                                <div class="section">
                                    <div class="section-title">Defenses</div>
                                    <div style="text-align: center;">
                                        <div class="defense-box">
                                            <div class="defense-label">PD</div>
                                            <div class="defense-value">${getCalculatedDefenses().calculatedPD}</div>
                                        </div>
                                        <div class="defense-box">
                                            <div class="defense-label">AD</div>
                                            <div class="defense-value">${getCalculatedDefenses().calculatedAD}</div>
                                        </div>
                                        <div class="defense-box">
                                            <div class="defense-label">PDR</div>
                                            <div class="defense-value">${getCalculatedDefenses().calculatedPDR}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="section">
                                    <div class="section-title">Attributes</div>
                                    <div class="skill-row">
                                        <span class="skill-name">Might</span>
                        <span class="skill-bonus">+${characterData.finalMight}</span>
                    </div>
                    <div class="skill-row">
                        <span class="skill-name">Agility</span>
                        <span class="skill-bonus">+${characterData.finalAgility}</span>
                    </div>
                    <div class="skill-row">
                        <span class="skill-name">Charisma</span>
                        <span class="skill-bonus">+${characterData.finalCharisma}</span>
                    </div>
                    <div class="skill-row">
                        <span class="skill-name">Intelligence</span>
                        <span class="skill-bonus">+${characterData.finalIntelligence}</span>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">Skills</div>
                    ${Object.entries(skillsByAttribute)
											.map(([attr, skills]) =>
												skills.length > 0
													? `
                            <div style="margin-bottom: 10px;">
                                <div style="font-weight: bold; color: #8b4513; margin-bottom: 5px;">${attr.charAt(0).toUpperCase() + attr.slice(1)}</div>
                                ${skills
																	.map(
																		(skill) => `
                                    <div class="skill-row">
                                        <span class="skill-name">${skill.name}</span>
                                        <span class="skill-bonus">+${skill.bonus}</span>
                                    </div>
                                `
																	)
																	.join('')}
                            </div>
                        `
													: ''
											)
											.join('')}
                </div>
            </div>
            
            <div class="column">
                <div class="section">
                    <div class="section-title">Attacks</div>
                    ${currentAttacks
											.map(
												(attack) => `
                        <div class="attack-row">
                            <span class="skill-name">${attack.name}</span>
                            <span class="skill-bonus">+${attack.attackBonus}</span>
                        </div>
                    `
											)
											.join('')}
                </div>
                

                

                
                <div class="section">
                    <div class="section-title">Features</div>
                    ${features
											.map(
												(feature) => `
                        <div style="margin-bottom: 8px; padding: 5px; border: 1px solid #ddd; border-radius: 4px; background: white;">
                            <strong>${feature.name}</strong><br>
                            <small>${feature.source}</small>
                        </div>
                    `
											)
											.join('')}
                </div>
            </div>
            
            <div class="column">
                <div class="section">
                    <div class="section-title">Inventory</div>
                    ${inventory
											.map(
												(item) => `
                        <div class="inventory-item">
                            <span>${item.itemName}</span>
                            <span>${item.count}</span>
                        </div>
                    `
											)
											.join('')}
                </div>
                
                <div class="section">
                    <div class="section-title">Languages</div>
                    ${languages
											.map(
												(lang) => `
                        <div class="skill-row">
                            <span class="skill-name">${lang.name}</span>
                            <span class="skill-bonus">${lang.fluency}</span>
                        </div>
                    `
											)
											.join('')}
                </div>
                
                <div class="section">
                    <div class="section-title">Trades</div>
                    ${trades
											.map(
												(trade) => `
                        <div class="skill-row">
                            <span class="skill-name">${trade.name}</span>
                            <span class="skill-bonus">+${trade.bonus}</span>
                        </div>
                    `
											)
											.join('')}
                </div>
            </div>
        </div>
    </div>

    ${
			characterData.className &&
			findClassByName(characterData.className)?.spellcastingPath &&
			currentSpells.length > 0
				? `
    <div class="page-break"></div>
    <div class="character-sheet">
        <div class="header">
            <div class="header-section">
                <div class="label">Character</div>
                <div class="value">${characterData.finalName}</div>
            </div>
            <div class="header-section">
                <div class="label">Class</div>
                <div class="value">${characterData.className}</div>
            </div>
            <div class="header-section">
                <div class="label">Level</div>
                <div class="value">${characterData.finalLevel}</div>
            </div>
            <div class="dc20-logo">DC20</div>
        </div>
        
        <h2 style="text-align: center; color: #8b4513; margin-bottom: 30px;">Spells</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
            ${currentSpells
							.map((spell) => {
								const fullSpell = allSpells.find((s) => s.name === spell.spellName);
								return `
                    <div class="spell-card" style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px; background: #f8f9fa; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                            <div>
                                <h3 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.4rem;">${spell.spellName}</h3>
                            </div>
                            <div>
                                <span style="background: #3498db; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${spell.school}</span>
                                ${spell.isCantrip ? '<span style="background: #e74c3c; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 8px;">Cantrip</span>' : ''}
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
                            <div>
                                <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Cost</span><br>
                                <span style="color: #2c3e50; font-size: 0.9rem;">${spell.cost.ap} AP${spell.cost.mp ? `, ${spell.cost.mp} MP` : ''}</span>
                            </div>
                            <div>
                                <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Range</span><br>
                                <span style="color: #2c3e50; font-size: 0.9rem;">${spell.range}</span>
                            </div>
                            <div>
                                <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Duration</span><br>
                                <span style="color: #2c3e50; font-size: 0.9rem;">${spell.duration}</span>
                            </div>
                        </div>
                        
                        ${
													fullSpell && fullSpell.effects && fullSpell.effects.length > 0
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Description</h4>
                                ${fullSpell.effects
																	.map(
																		(effect, index) => `
                                    <div style="margin-bottom: ${index < fullSpell.effects.length - 1 ? '15px' : '0'};">
                                        ${effect.title ? `<strong style="color: #2c3e50; font-size: 1rem;">${effect.title}:</strong><br />` : ''}
                                        <span style="color: #34495e; line-height: 1.6; font-size: 0.95rem;">${effect.description}</span>
                                    </div>
                                `
																	)
																	.join('')}
                            </div>
                        `
														: ''
												}
                        
                        ${
													fullSpell && fullSpell.cantripPassive
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Cantrip Passive</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullSpell.cantripPassive}</p>
                            </div>
                        `
														: ''
												}
                        
                        ${
													fullSpell && fullSpell.enhancements && fullSpell.enhancements.length > 0
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Enhancements</h4>
                                ${fullSpell.enhancements
																	.map(
																		(enhancement) => `
                                    <div style="margin-top: 10px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">
                                        <strong style="color: #2c3e50; font-size: 0.95rem;">${enhancement.name}</strong> (${enhancement.type} ${enhancement.cost})
                                        <br />
                                        <span style="color: #34495e; line-height: 1.6; font-size: 0.9rem;">${enhancement.description}</span>
                                    </div>
                                `
																	)
																	.join('')}
                            </div>
                        `
														: ''
												}
                        
                        ${
													spell.notes
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Notes</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${spell.notes}</p>
                            </div>
                        `
														: ''
												}
                    </div>
                `;
							})
							.join('')}
        </div>
    </div>
    `
				: ''
		}

    ${
			characterData.className &&
			findClassByName(characterData.className)?.martialPath &&
			currentManeuvers.length > 0
				? `
    <div class="page-break"></div>
    <div class="character-sheet">
        <div class="header">
            <div class="header-section">
                <div class="label">Character</div>
                <div class="value">${characterData.finalName}</div>
            </div>
            <div class="header-section">
                <div class="label">Class</div>
                <div class="value">${characterData.className}</div>
            </div>
            <div class="header-section">
                <div class="label">Level</div>
                <div class="value">${characterData.finalLevel}</div>
            </div>
            <div class="dc20-logo">DC20</div>
        </div>
        
        <h2 style="text-align: center; color: #8b4513; margin-bottom: 30px;">Maneuvers</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
            ${currentManeuvers
							.map((maneuver) => {
								const fullManeuver = allManeuvers.find((m) => m.name === maneuver.name);
								return `
                    <div class="maneuver-card" style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px; background: #f8f9fa; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                            <div>
                                <h3 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.4rem;">${maneuver.name}</h3>
                            </div>
                            <div>
                                <span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${maneuver.type || 'Maneuver'}</span>
                                ${maneuver.isReaction ? '<span style="background: #e67e22; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 8px;">Reaction</span>' : ''}
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
                            <div>
                                <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Cost</span><br>
                                <span style="color: #2c3e50; font-size: 0.9rem;">${maneuver.cost ? `${maneuver.cost.ap} AP${maneuver.cost.mp ? `, ${maneuver.cost.mp} MP` : ''}` : 'N/A'}</span>
                            </div>
                            ${
															fullManeuver && fullManeuver.trigger
																? `
                                <div>
                                    <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Trigger</span><br>
                                    <span style="color: #2c3e50; font-size: 0.9rem;">${fullManeuver.trigger}</span>
                                </div>
                            `
																: ''
														}
                            ${
															fullManeuver && fullManeuver.requirement
																? `
                                <div>
                                    <span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Requirement</span><br>
                                    <span style="color: #2c3e50; font-size: 0.9rem;">${fullManeuver.requirement}</span>
                                </div>
                            `
																: ''
														}
                        </div>
                        
                        ${
													fullManeuver && fullManeuver.description
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Description</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullManeuver.description}</p>
                            </div>
                        `
														: ''
												}
                        
                        ${
													fullManeuver && fullManeuver.trigger
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Trigger</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem; font-style: italic;">${fullManeuver.trigger}</p>
                            </div>
                        `
														: ''
												}
                        
                        ${
													fullManeuver && fullManeuver.requirement
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Requirement</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullManeuver.requirement}</p>
                            </div>
                        `
														: ''
												}
                        
                        ${
													maneuver.notes
														? `
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Notes</h4>
                                <p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${maneuver.notes}</p>
                            </div>
                        `
														: ''
												}
                    </div>
                `;
							})
							.join('')}
        </div>
    </div>
    `
				: ''
		}
</body>
</html>
            `;

		// Write the HTML to the new window
		printWindow.document.write(printHTML);
		printWindow.document.close();

		// Wait for content to load, then print
		printWindow.onload = () => {
			setTimeout(() => {
				printWindow.print();
				printWindow.close();
			}, 500);
		};
	} catch (error) {
		console.error('Failed to print character sheet:', error);
		alert('Failed to print character sheet');
	}
};
