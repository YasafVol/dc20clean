import type { SavedCharacter } from '../types/dataContracts';
import type { PdfExportData } from '../types/pdfExport';
import type { EnhancedCalculationResult } from '../types/effectSystem';
import type { DenormalizeOutput } from '../services/denormalizeMastery';

/**
 * Helper function to process GRANT_MOVEMENT effects into PDF movement checkboxes.
 * Compares movement speed to ground speed and sets half/full checkboxes accordingly.
 */
function processMovements(
	movements: Array<{ type: string; speed: string; source: any }>,
	groundSpeed: number
): PdfExportData['movement'] {
	const movement: PdfExportData['movement'] = {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};

	for (const m of movements) {
		const type = m.type as keyof typeof movement;
		if (!movement[type]) continue; // Skip unknown movement types

		const speedValue = parseInt(m.speed, 10);
		if (isNaN(speedValue)) continue; // Skip if speed is not a number

		// Determine if movement is half or full speed
		const halfSpeed = Math.floor(groundSpeed / 2);
		if (speedValue >= groundSpeed) {
			movement[type].full = true;
		} else if (speedValue >= halfSpeed) {
			movement[type].half = true;
		}
	}

	return movement;
}

export function transformSavedCharacterToPdfData(character: SavedCharacter): PdfExportData {
	// Identity
	const characterName = character.finalName || '';
	const playerName = character.finalPlayerName || '';
	const level = character.level || 1;
	const ancestry = character.ancestry1Name || character.ancestry1Id || '';
	const classAndSubclass = character.className || character.classId || '';
	const features = '';

	// Attributes & core
	const prime = character.finalPrimeModifierValue || 0;
	const might = character.finalMight || 0;
	const agility = character.finalAgility || 0;
	const charisma = character.finalCharisma || 0;
	const intelligence = character.finalIntelligence || 0;
	const combatMastery = character.finalCombatMastery || 0;

	// Saves: attribute + Combat Mastery
	const mightSave = (character.finalMight || 0) + (character.finalCombatMastery || 0);
	const agilitySave = (character.finalAgility || 0) + (character.finalCombatMastery || 0);
	const charismaSave = (character.finalCharisma || 0) + (character.finalCombatMastery || 0);
	const intelligenceSave = (character.finalIntelligence || 0) + (character.finalCombatMastery || 0);

	// Skills: prefer precomputed skillTotals; fallback to recomputing
	const totals = (character as any).skillTotals as Record<string, number> | undefined;
	const fallbackProf = (id: string) => (character as any).skillsData?.[id] ?? 0;
	const getFallbackMasteryBonus = (id: string) => fallbackProf(id) * 2;
	const fallbackAttr = (key: 'might' | 'agility' | 'charisma' | 'intelligence' | 'prime') => {
		switch (key) {
			case 'might':
				return character.finalMight || 0;
			case 'agility':
				return character.finalAgility || 0;
			case 'charisma':
				return character.finalCharisma || 0;
			case 'intelligence':
				return character.finalIntelligence || 0;
			case 'prime':
			default:
				return character.finalPrimeModifierValue || 0;
		}
	};
	const awareness = totals?.awareness ?? (fallbackAttr('prime') + getFallbackMasteryBonus('awareness'));
	const athletics = totals?.athletics ?? (fallbackAttr('might') + getFallbackMasteryBonus('athletics'));
	const intimidation = totals?.intimidation ?? (fallbackAttr('might') + getFallbackMasteryBonus('intimidation'));
	const acrobatics = totals?.acrobatics ?? (fallbackAttr('agility') + getFallbackMasteryBonus('acrobatics'));
	const trickery = totals?.trickery ?? (fallbackAttr('agility') + getFallbackMasteryBonus('trickery'));
	const stealth = totals?.stealth ?? (fallbackAttr('agility') + getFallbackMasteryBonus('stealth'));
	const animal = totals?.animal ?? (fallbackAttr('charisma') + getFallbackMasteryBonus('animal'));
	const influence = totals?.influence ?? (fallbackAttr('charisma') + getFallbackMasteryBonus('influence'));
	const insight = totals?.insight ?? (fallbackAttr('charisma') + getFallbackMasteryBonus('insight'));
	const investigation = totals?.investigation ?? (fallbackAttr('intelligence') + getFallbackMasteryBonus('investigation'));
	const medicine = totals?.medicine ?? (fallbackAttr('intelligence') + getFallbackMasteryBonus('medicine'));
	const survival = totals?.survival ?? (fallbackAttr('intelligence') + getFallbackMasteryBonus('survival'));

	// Knowledge trades: prefer mastery ladders/trade mastery for levels if needed; PDF expects numbers in fields, so map to ranks here with fallback
	const arcana = (character as any).knowledgeTradeMastery?.arcana?.finalValue ?? ((character as any).tradesData?.arcana ?? 0) * 2;
	const history = (character as any).knowledgeTradeMastery?.history?.finalValue ?? ((character as any).tradesData?.history ?? 0) * 2;
	const nature = (character as any).knowledgeTradeMastery?.nature?.finalValue ?? ((character as any).tradesData?.nature ?? 0) * 2;
	const occultism = (character as any).knowledgeTradeMastery?.occultism?.finalValue ?? ((character as any).tradesData?.occultism ?? 0) * 2;
	const religion = (character as any).knowledgeTradeMastery?.religion?.finalValue ?? ((character as any).tradesData?.religion ?? 0) * 2;

	// Trades (labels)
	const tradesData: Record<string, number> = (character as any).tradesData || {};
	const tradeEntries: Array<[string, number]> = Object.entries(tradesData);
	const knowledgeTrades = new Set(['arcana', 'history', 'nature', 'occultism', 'religion']);
	const tradeEntriesForAD = tradeEntries.filter(([id]) => !knowledgeTrades.has(id));
	const tradeLabels = tradeEntriesForAD.map(([id]) => id);
	const tradeA = tradeLabels[0] || '';
	const tradeB = tradeLabels[1] || '';
	const tradeC = tradeLabels[2] || '';
	const tradeD = tradeLabels[3] || '';
	const customTradeA = '';
	const customTradeB = '';
	const customTradeC = '';
	const customTradeD = '';

	// Mastery & proficiency - prefer precomputed ladders
	const makeMastery = () => ({ '2': false, '4': false, '6': false, '8': false, '10': false });
	const setLevelsFromLadder = (
		target: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean },
		ladder:
			| { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean }
			| undefined,
		fallbackBonus: number
	) => {
		if (ladder) {
			target['2'] = !!ladder['2'];
			target['4'] = !!ladder['4'];
			target['6'] = !!ladder['6'];
			target['8'] = !!ladder['8'];
			target['10'] = !!ladder['10'];
		} else {
			target['2'] = fallbackBonus >= 2;
			target['4'] = fallbackBonus >= 4;
			target['6'] = fallbackBonus >= 6;
			target['8'] = fallbackBonus >= 8;
			target['10'] = fallbackBonus >= 10;
		}
	};

	const mastery: PdfExportData['mastery'] = {
		Awareness: makeMastery(),
		Athletics: makeMastery(),
		Intimidation: makeMastery(),
		Acrobatics: makeMastery(),
		Trickery: makeMastery(),
		Stealth: makeMastery(),
		Animal: makeMastery(),
		Influence: makeMastery(),
		Insight: makeMastery(),
		Investigation: makeMastery(),
		Medicine: makeMastery(),
		Survival: makeMastery(),
		Arcana: makeMastery(),
		History: makeMastery(),
		Nature: makeMastery(),
		Occultism: makeMastery(),
		Religion: makeMastery(),
		TradeA: makeMastery(),
		TradeB: makeMastery(),
		TradeC: makeMastery(),
		TradeD: makeMastery(),
		LanguageA: { Limited: false, Fluent: false },
		LanguageB: { Limited: false, Fluent: false },
		LanguageC: { Limited: false, Fluent: false },
		LanguageD: { Limited: false, Fluent: false }
	};

	// Populate mastery from precomputed ladders where possible
	const ladders = (character as any).masteryLadders?.skills as Record<string, any> | undefined;
	const fallbackBonus = (id: string) => getFallbackMasteryBonus(id);
	setLevelsFromLadder(mastery.Awareness, ladders?.awareness, fallbackBonus('awareness'));
	setLevelsFromLadder(mastery.Athletics, ladders?.athletics, fallbackBonus('athletics'));
	setLevelsFromLadder(mastery.Intimidation, ladders?.intimidation, fallbackBonus('intimidation'));
	setLevelsFromLadder(mastery.Acrobatics, ladders?.acrobatics, fallbackBonus('acrobatics'));
	setLevelsFromLadder(mastery.Trickery, ladders?.trickery, fallbackBonus('trickery'));
	setLevelsFromLadder(mastery.Stealth, ladders?.stealth, fallbackBonus('stealth'));
	setLevelsFromLadder(mastery.Animal, ladders?.animal, fallbackBonus('animal'));
	setLevelsFromLadder(mastery.Influence, ladders?.influence, fallbackBonus('influence'));
	setLevelsFromLadder(mastery.Insight, ladders?.insight, fallbackBonus('insight'));
	setLevelsFromLadder(mastery.Investigation, ladders?.investigation, fallbackBonus('investigation'));
	setLevelsFromLadder(mastery.Medicine, ladders?.medicine, fallbackBonus('medicine'));
	setLevelsFromLadder(mastery.Survival, ladders?.survival, fallbackBonus('survival'));

	// Knowledge trade ladders
	const kLadders = (character as any).masteryLadders?.knowledgeTrades as Record<string, any> | undefined;
	const tradeMasteryFallback = (id: string) => ((tradesData?.[id] ?? 0) * 2);
	setLevelsFromLadder(mastery.Arcana, kLadders?.arcana, tradeMasteryFallback('arcana'));
	setLevelsFromLadder(mastery.History, kLadders?.history, tradeMasteryFallback('history'));
	setLevelsFromLadder(mastery.Nature, kLadders?.nature, tradeMasteryFallback('nature'));
	setLevelsFromLadder(mastery.Occultism, kLadders?.occultism, tradeMasteryFallback('occultism'));
	setLevelsFromLadder(mastery.Religion, kLadders?.religion, tradeMasteryFallback('religion'));

	// Practical Trade ladders A–D from precomputed; fallback to ranks order
	const practical = (character as any).masteryLadders?.practicalTrades as
		| { A?: { label: string; ladder: any }; B?: { label: string; ladder: any }; C?: { label: string; ladder: any }; D?: { label: string; ladder: any } }
		| undefined;
	const tradeBonus = (index: number) => (tradeEntriesForAD[index]?.[1] ?? 0) * 2;
	setLevelsFromLadder(mastery.TradeA, practical?.A?.ladder, tradeBonus(0));
	setLevelsFromLadder(mastery.TradeB, practical?.B?.ladder, tradeBonus(1));
	setLevelsFromLadder(mastery.TradeC, practical?.C?.ladder, tradeBonus(2));
	setLevelsFromLadder(mastery.TradeD, practical?.D?.ladder, tradeBonus(3));

	const proficiency: PdfExportData['proficiency'] = {
		expertise: false,
		athletics: false,
		intimidation: false,
		trickery: false,
		acrobatics: false,
		stealth: false,
		influence: false,
		animal: false,
		insight: false,
		medicine: false,
		investigation: false,
		survival: false,
		history: false,
		arcana: false,
		nature: false,
		tradeA: false,
		religion: false,
		occultism: false,
		tradeD: false,
		tradeC: false,
		tradeB: false
	};

	// Combat
	const attackCheck = character.finalAttackSpellCheck || 0;
	const saveDC = character.finalSaveDC || 0;
	const initiative = character.finalInitiativeBonus || 0;

	const attacks: PdfExportData['attacks'] = [
		{ name: '', damage: '', type: '', notes: '' },
		{ name: '', damage: '', type: '', notes: '' },
		{ name: '', damage: '', type: '', notes: '' },
		{ name: '', damage: '', type: '', notes: '' }
	];

	// Pools & resources
	const current = character.characterState?.resources?.current || ({} as any);
	const original = character.characterState?.resources?.original || ({} as any);
	const hitPoints = { max: original.maxHP ?? character.finalHPMax ?? 0, current: current.currentHP ?? 0, temp: current.tempHP ?? 0 };
	const stamina = { max: original.maxSP ?? character.finalSPMax ?? 0, current: current.currentSP ?? 0 };
	const mana = { max: original.maxMP ?? character.finalMPMax ?? 0, current: current.currentMP ?? 0 };
	const grit = { cap: original.maxGritPoints ?? character.finalGritPoints ?? 0, current: current.currentGritPoints ?? 0 };
	const restPoints = { cap: original.maxRestPoints ?? character.finalRestPoints ?? 0, current: current.currentRestPoints ?? 0 };
	const resources = new Array(9).fill(0).map(() => ({ label: '', cap: 0, current: 0 }));

	// Defense & status
	const defense = {
		physical: character.finalPD ?? 0,
		physicalHeavyThreshold: (character.finalPD ?? 0) + 5,
		physicalBrutalThreshold: (character.finalPD ?? 0) + 10,
		mental: character.finalAD ?? 0,
		mentalHeavyThreshold: (character.finalAD ?? 0) + 5,
		mentalBrutalThreshold: (character.finalAD ?? 0) + 10
	};
	const bloodied = false;
	const wellBloodied = false;
	const reduction = { physical: false, elemental: false, mental: false };

	// Movement & misc
	const moveSpeed = character.finalMoveSpeed ?? 0;
	const movement = character.movement || {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};
	const jumpDistance = character.finalJumpDistance ?? 0;
	const holdBreath = character.holdBreath ?? 0;

	// Exhaustion
	const exLevel = character.characterState?.resources?.current?.exhaustionLevel ?? 0;
	const exhaustion = { '-1': exLevel <= -1, '-2': exLevel <= -2, '-3': exLevel <= -3, '-4': exLevel <= -4, '-5': exLevel <= -5 } as PdfExportData['exhaustion'];

	// Languages: prefer precomputed languageMastery; fallback to languagesData
	let languages: PdfExportData['languages'] = [] as any;
	const lm = (character as any).languageMastery as
		| { A?: { name: string; limited: boolean; fluent: boolean }; B?: { name: string; limited: boolean; fluent: boolean }; C?: { name: string; limited: boolean; fluent: boolean }; D?: { name: string; limited: boolean; fluent: boolean } }
		| undefined;
	if (lm) {
		const a = lm.A || { name: '', limited: false, fluent: false };
		const b = lm.B || { name: '', limited: false, fluent: false };
		const c = lm.C || { name: '', limited: false, fluent: false };
		const d = lm.D || { name: '', limited: false, fluent: false };
		mastery.LanguageA = { Limited: a.limited, Fluent: a.fluent };
		mastery.LanguageB = { Limited: b.limited, Fluent: b.fluent };
		mastery.LanguageC = { Limited: c.limited, Fluent: c.fluent };
		mastery.LanguageD = { Limited: d.limited, Fluent: d.fluent };
		languages = [a, b, c, d];
	} else {
		const langMap = (character as any).languagesData || {};
		const langKeys = Object.keys(langMap);
		languages = [0, 1, 2, 3].map((i) => {
			const name = langKeys[i] || '';
			const fluency = (langMap?.[name]?.fluency as string) || (name ? 'fluent' : '');
			const fluent = fluency === 'fluent';
			const limited = fluency === 'limited';
			if (i === 0) mastery.LanguageA = { Limited: limited, Fluent: fluent };
			if (i === 1) mastery.LanguageB = { Limited: limited, Fluent: fluent };
			if (i === 2) mastery.LanguageC = { Limited: limited, Fluent: fluent };
			if (i === 3) mastery.LanguageD = { Limited: limited, Fluent: fluent };
			return { name, limited, fluent } as any;
		});
	}

	// Equipment/attunement/inventory
	const equipped = {
		head: '',
		neck: '',
		mantle: '',
		body: '',
		waist: '',
		hands: '',
		ringRight: '',
		ringLeft: '',
		feet: ''
	};
	const attunement = { slots: 0, items: new Array(5).fill(0).map(() => ({ name: '', active: false })) };
	const inventory = {
		carried: '',
		stored: '',
		supplies: new Array(11).fill(0).map(() => ({ label: '', amount: 0 }))
	};

	const misc = '';
	const deathThreshold = character.finalDeathThreshold ?? 0;
    const bloodiedValue = (character as any).bloodiedValue ?? Math.ceil((character.finalHPMax ?? 0) / 2);
    const wellBloodiedValue = (character as any).wellBloodiedValue ?? Math.ceil((character.finalHPMax ?? 0) / 4);

	return {
		characterName,
		playerName,
		level,
		ancestry,
		classAndSubclass,
		features,
		prime,
		might,
		agility,
		charisma,
		intelligence,
		combatMastery,
		mightSave,
		agilitySave,
		charismaSave,
		intelligenceSave,
		awareness,
		athletics,
		intimidation,
		acrobatics,
		trickery,
		stealth,
		animal,
		influence,
		insight,
		investigation,
		medicine,
		survival,
		arcana,
		history,
		nature,
		occultism,
		religion,
		tradeA,
		tradeB,
		tradeC,
		tradeD,
		customTradeA,
		customTradeB,
		customTradeC,
		customTradeD,
		mastery,
		proficiency,
		attackCheck,
		saveDC,
		initiative,
		attacks,
		hitPoints,
		stamina,
		mana,
		grit,
		restPoints,
		resources,
		defense,
		bloodied,
		wellBloodied,
		reduction,
		moveSpeed,
		movement,
		jumpDistance,
		holdBreath,
		exhaustion,
		languages,
		equipped,
		attunement,
		inventory,
		misc,
		deathThreshold,
		bloodiedValue,
		wellBloodiedValue
	};
}


export function transformCalculatedCharacterToPdfData(
  result: EnhancedCalculationResult,
  options: { saved: SavedCharacter; denorm: DenormalizeOutput }
): PdfExportData {
  const saved = options.saved;
  const stats = result.stats;
  const denorm = options.denorm;

  // Identity
  const characterName = saved.finalName || '';
  const playerName = saved.finalPlayerName || '';
  const level = saved.level || 1;
  const ancestry = saved.ancestry1Name || saved.ancestry1Id || '';
  const classAndSubclass = stats.className || saved.className || saved.classId || '';
  const features = '';

  // Attributes & core from calculated stats
  const prime = stats.finalPrimeModifierValue || 0;
  const might = stats.finalMight || 0;
  const agility = stats.finalAgility || 0;
  const charisma = stats.finalCharisma || 0;
  const intelligence = stats.finalIntelligence || 0;
  const combatMastery = stats.finalCombatMastery || 0;

  // Saves from calculated stats
  const mightSave = stats.finalSaveMight || 0;
  const agilitySave = stats.finalSaveAgility || 0;
  const charismaSave = stats.finalSaveCharisma || 0;
  const intelligenceSave = stats.finalSaveIntelligence || 0;

  // Skills totals from denormalized output
  const totals = denorm.skillTotals || {};
  const awareness = totals.awareness ?? 0;
  const athletics = totals.athletics ?? 0;
  const intimidation = totals.intimidation ?? 0;
  const acrobatics = totals.acrobatics ?? 0;
  const trickery = totals.trickery ?? 0;
  const stealth = totals.stealth ?? 0;
  const animal = totals.animal ?? 0;
  const influence = totals.influence ?? 0;
  const insight = totals.insight ?? 0;
  const investigation = totals.investigation ?? 0;
  const medicine = totals.medicine ?? 0;
  const survival = totals.survival ?? 0;

  // Knowledge trades numeric values from denorm
  const arcana = denorm.knowledgeTradeMastery.arcana?.finalValue ?? 0;
  const history = denorm.knowledgeTradeMastery.history?.finalValue ?? 0;
  const nature = denorm.knowledgeTradeMastery.nature?.finalValue ?? 0;
  const occultism = denorm.knowledgeTradeMastery.occultism?.finalValue ?? 0;
  const religion = denorm.knowledgeTradeMastery.religion?.finalValue ?? 0;

  // Trades A–D labels from denorm practical picks
  const practical = denorm.masteryLadders.practicalTrades;
  const allPicks = [
    practical.A && { slot: 'A', ...practical.A },
    practical.B && { slot: 'B', ...practical.B },
    practical.C && { slot: 'C', ...practical.C },
    practical.D && { slot: 'D', ...practical.D }
  ].filter(Boolean) as Array<{ slot: string; label: string; ladder: any; finalValue: number }>;
  // Only include trades with ranked mastery (any ladder step true)
  const hasAnyStep = (ladder: any) => !!(ladder?.['2'] || ladder?.['4'] || ladder?.['6'] || ladder?.['8'] || ladder?.['10']);
  const rankedPicks = allPicks.filter((p) => hasAnyStep(p.ladder));

  const pickLabel = (index: number) => rankedPicks[index]?.label || '';
  const pickValue = (index: number) => rankedPicks[index]?.finalValue ?? undefined;
  const pickLadder = (index: number) => rankedPicks[index]?.ladder || undefined;

  const tradeA = pickLabel(0);
  const tradeB = pickLabel(1);
  const tradeC = pickLabel(2);
  const tradeD = pickLabel(3);
  const tradeAModifier = pickValue(0);
  const tradeBModifier = pickValue(1);
  const tradeCModifier = pickValue(2);
  const tradeDModifier = pickValue(3);
  const customTradeA = '';
  const customTradeB = '';
  const customTradeC = '';
  const customTradeD = '';

  // Mastery ladders: skills, knowledge, practical trades from denorm
  const makeFive = () => ({ '2': false, '4': false, '6': false, '8': false, '10': false });
  const mastery: PdfExportData['mastery'] = {
    Awareness: denorm.masteryLadders.skills.awareness || makeFive(),
    Athletics: denorm.masteryLadders.skills.athletics || makeFive(),
    Intimidation: denorm.masteryLadders.skills.intimidation || makeFive(),
    Acrobatics: denorm.masteryLadders.skills.acrobatics || makeFive(),
    Trickery: denorm.masteryLadders.skills.trickery || makeFive(),
    Stealth: denorm.masteryLadders.skills.stealth || makeFive(),
    Animal: denorm.masteryLadders.skills.animal || makeFive(),
    Influence: denorm.masteryLadders.skills.influence || makeFive(),
    Insight: denorm.masteryLadders.skills.insight || makeFive(),
    Investigation: denorm.masteryLadders.skills.investigation || makeFive(),
    Medicine: denorm.masteryLadders.skills.medicine || makeFive(),
    Survival: denorm.masteryLadders.skills.survival || makeFive(),
    Arcana: denorm.masteryLadders.knowledgeTrades.arcana || makeFive(),
    History: denorm.masteryLadders.knowledgeTrades.history || makeFive(),
    Nature: denorm.masteryLadders.knowledgeTrades.nature || makeFive(),
    Occultism: denorm.masteryLadders.knowledgeTrades.occultism || makeFive(),
    Religion: denorm.masteryLadders.knowledgeTrades.religion || makeFive(),
    TradeA: pickLadder(0) || makeFive(),
    TradeB: pickLadder(1) || makeFive(),
    TradeC: pickLadder(2) || makeFive(),
    TradeD: pickLadder(3) || makeFive(),
    LanguageA: { Limited: !!denorm.languageMastery.A?.limited, Fluent: !!denorm.languageMastery.A?.fluent },
    LanguageB: { Limited: !!denorm.languageMastery.B?.limited, Fluent: !!denorm.languageMastery.B?.fluent },
    LanguageC: { Limited: !!denorm.languageMastery.C?.limited, Fluent: !!denorm.languageMastery.C?.fluent },
    LanguageD: { Limited: !!denorm.languageMastery.D?.limited, Fluent: !!denorm.languageMastery.D?.fluent }
  } as any;

  // Proficiency checkboxes (not tracked yet)
  const proficiency: PdfExportData['proficiency'] = {
    expertise: false,
    athletics: false,
    intimidation: false,
    trickery: false,
    acrobatics: false,
    stealth: false,
    influence: false,
    animal: false,
    insight: false,
    medicine: false,
    investigation: false,
    survival: false,
    history: false,
    arcana: false,
    nature: false,
    tradeA: false,
    religion: false,
    occultsion: false as any,
    tradeD: false,
    tradeC: false,
    tradeB: false
  } as any;

  // Combat
  const attackCheck = stats.finalAttackSpellCheck || 0;
  const saveDC = stats.finalSaveDC || 0;
  const initiative = stats.finalInitiativeBonus || 0;

  // Attacks placeholder
  const attacks: PdfExportData['attacks'] = [
    { name: '', damage: '', type: '', notes: '' },
    { name: '', damage: '', type: '', notes: '' },
    { name: '', damage: '', type: '', notes: '' },
    { name: '', damage: '', type: '', notes: '' }
  ];

  // Pools & resources
  const current = saved.characterState?.resources?.current || ({} as any);
  const hitPoints = { max: stats.finalHPMax ?? 0, current: current.currentHP ?? 0, temp: current.tempHP ?? 0 };
  const stamina = { max: stats.finalSPMax ?? 0, current: current.currentSP ?? 0 };
  const mana = { max: stats.finalMPMax ?? 0, current: current.currentMP ?? 0 };
  const grit = { cap: stats.finalGritPoints ?? 0, current: current.currentGritPoints ?? 0 };
  const restPoints = { cap: stats.finalRestPoints ?? 0, current: current.currentRestPoints ?? 0 } as any;
  const resources = new Array(9).fill(0).map(() => ({ label: '', cap: 0, current: 0 }));

  // Defense & status
  const defense = {
    physical: stats.finalPD ?? 0,
    physicalHeavyThreshold: (saved as any).finalPDHeavyThreshold ?? ((stats.finalPD ?? 0) + 5),
    physicalBrutalThreshold: (saved as any).finalPDBrutalThreshold ?? ((stats.finalPD ?? 0) + 10),
    mental: stats.finalAD ?? 0,
    mentalHeavyThreshold: (saved as any).finalADHeavyThreshold ?? ((stats.finalAD ?? 0) + 5),
    mentalBrutalThreshold: (saved as any).finalADBrutalThreshold ?? ((stats.finalAD ?? 0) + 10)
  };
  const bloodied = false;
  const wellBloodied = false;
  const reduction = { physical: false, elemental: false, mental: false };

  // Movement & misc
  const moveSpeed = stats.finalMoveSpeed ?? 0;
  const movement = saved.movement || processMovements(result.movements || [], moveSpeed);
  const jumpDistance = stats.finalJumpDistance ?? 0;
  const holdBreath = saved.holdBreath ?? stats.finalMight ?? 0;

  // Exhaustion
  const exLevel = saved.characterState?.resources?.current?.exhaustionLevel ?? 0;
  const exhaustion = { '-1': exLevel <= -1, '-2': exLevel <= -2, '-3': exLevel <= -3, '-4': exLevel <= -4, '-5': exLevel <= -5 } as PdfExportData['exhaustion'];

  // Languages from denorm
  const a = denorm.languageMastery.A || { name: '', limited: false, fluent: false };
  const b = denorm.languageMastery.B || { name: '', limited: false, fluent: false };
  const c = denorm.languageMastery.C || { name: '', limited: false, fluent: false };
  const d = denorm.languageMastery.D || { name: '', limited: false, fluent: false };
  const languages = [a, b, c, d] as any;

  // Equipment/attunement/inventory
  const equipped = {
    head: '',
    neck: '',
    mantle: '',
    body: '',
    waist: '',
    hands: '',
    ringRight: '',
    ringLeft: '',
    feet: ''
  };
  const attunement = { slots: 0, items: new Array(5).fill(0).map(() => ({ name: '', active: false })) };
  const inventory = {
    carried: '',
    stored: '',
    supplies: new Array(11).fill(0).map(() => ({ label: '', amount: 0 }))
  };

  const misc = '';
  const deathThreshold = stats.finalDeathThreshold ?? 0;
  const bloodiedValue = (saved as any).bloodiedValue ?? Math.ceil((stats.finalHPMax ?? 0) / 2);
  const wellBloodiedValue = (saved as any).wellBloodiedValue ?? Math.ceil((stats.finalHPMax ?? 0) / 4);

  return {
    characterName,
    playerName,
    level,
    ancestry,
    classAndSubclass,
    features,
    prime,
    might,
    agility,
    charisma,
    intelligence,
    combatMastery,
    mightSave,
    agilitySave,
    charismaSave,
    intelligenceSave,
    awareness,
    athletics,
    intimidation,
    acrobatics,
    trickery,
    stealth,
    animal,
    influence,
    insight,
    investigation,
    medicine,
    survival,
    arcana,
    history,
    nature,
    occultism,
    religion,
    tradeA,
    tradeB,
    tradeC,
    tradeD,
    tradeAModifier,
    tradeBModifier,
    tradeCModifier,
    tradeDModifier,
    customTradeA,
    customTradeB,
    customTradeC,
    customTradeD,
    mastery,
    proficiency,
    attackCheck,
    saveDC,
    initiative,
    attacks,
    hitPoints,
    stamina,
    mana,
    grit,
    restPoints,
    resources,
    defense,
    bloodied,
    wellBloodied,
    reduction,
    moveSpeed,
    movement,
    jumpDistance,
    holdBreath,
    exhaustion,
    languages,
    equipped,
    attunement,
    inventory,
    misc,
    deathThreshold,
    bloodiedValue,
    wellBloodiedValue
  };
}


