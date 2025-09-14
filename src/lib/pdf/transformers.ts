import type { SavedCharacter } from '../types/dataContracts';
import type { PdfExportData } from '../types/pdfExport';

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

	// Skills: compute totals = associated attribute + (proficiency × 2)
	const prof = (id: string) => (character as any).skillsData?.[id] ?? 0;
	const getMasteryBonus = (id: string) => prof(id) * 2;
	const attr = (key: 'might' | 'agility' | 'charisma' | 'intelligence' | 'prime') => {
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
	const awareness = attr('prime') + getMasteryBonus('awareness');
	const athletics = attr('might') + getMasteryBonus('athletics');
	const intimidation = attr('might') + getMasteryBonus('intimidation');
	const acrobatics = attr('agility') + getMasteryBonus('acrobatics');
	const trickery = attr('agility') + getMasteryBonus('trickery');
	const stealth = attr('agility') + getMasteryBonus('stealth');
	const animal = attr('charisma') + getMasteryBonus('animal');
	const influence = attr('charisma') + getMasteryBonus('influence');
	const insight = attr('charisma') + getMasteryBonus('insight');
	const investigation = attr('intelligence') + getMasteryBonus('investigation');
	const medicine = attr('intelligence') + getMasteryBonus('medicine');
	const survival = attr('intelligence') + getMasteryBonus('survival');
	const arcana = (character as any).tradesData?.arcana ?? 0;
	const history = (character as any).tradesData?.history ?? 0;
	const nature = (character as any).tradesData?.nature ?? 0;
	const occultism = (character as any).tradesData?.occultism ?? 0;
	const religion = (character as any).tradesData?.religion ?? 0;

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

	// Mastery & proficiency - default false for POC; full mapping later
	const makeMastery = () => ({ '2': false, '4': false, '6': false, '8': false, '10': false });
	const setLevels = (target: { '2': boolean; '4': boolean; '6': boolean; '8': boolean; '10': boolean }, bonus: number) => {
		target['2'] = bonus >= 2;
		target['4'] = bonus >= 4;
		target['6'] = bonus >= 6;
		target['8'] = bonus >= 8;
		target['10'] = bonus >= 10;
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

	// Populate mastery based on proficiencies (bonus = proficiency * 2)
	setLevels(mastery.Awareness, getMasteryBonus('awareness'));
	setLevels(mastery.Athletics, getMasteryBonus('athletics'));
	setLevels(mastery.Intimidation, getMasteryBonus('intimidation'));
	setLevels(mastery.Acrobatics, getMasteryBonus('acrobatics'));
	setLevels(mastery.Trickery, getMasteryBonus('trickery'));
	setLevels(mastery.Stealth, getMasteryBonus('stealth'));
	setLevels(mastery.Animal, getMasteryBonus('animal'));
	setLevels(mastery.Influence, getMasteryBonus('influence'));
	setLevels(mastery.Insight, getMasteryBonus('insight'));
	setLevels(mastery.Investigation, getMasteryBonus('investigation'));
	setLevels(mastery.Medicine, getMasteryBonus('medicine'));
	setLevels(mastery.Survival, getMasteryBonus('survival'));

	// Knowledge trades from tradesData
	const tradeMastery = (id: string) => ((tradesData?.[id] ?? 0) * 2);
	setLevels(mastery.Arcana, tradeMastery('arcana'));
	setLevels(mastery.History, tradeMastery('history'));
	setLevels(mastery.Nature, tradeMastery('nature'));
	setLevels(mastery.Occultism, tradeMastery('occultism'));
	setLevels(mastery.Religion, tradeMastery('religion'));

	// Trades: map first 4 entries to A-D
	const tradeBonus = (index: number) => (tradeEntriesForAD[index]?.[1] ?? 0) * 2;
	setLevels(mastery.TradeA, tradeBonus(0));
	setLevels(mastery.TradeB, tradeBonus(1));
	setLevels(mastery.TradeC, tradeBonus(2));
	setLevels(mastery.TradeD, tradeBonus(3));

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
	const movement = {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};
	const jumpDistance = character.finalJumpDistance ?? 0;
	const holdBreath = 0;

	// Exhaustion
	const exLevel = character.characterState?.resources?.current?.exhaustionLevel ?? 0;
	const exhaustion = { '-1': exLevel <= -1, '-2': exLevel <= -2, '-3': exLevel <= -3, '-4': exLevel <= -4, '-5': exLevel <= -5 } as PdfExportData['exhaustion'];

	// Languages from languagesData keys/array
	const langMap = (character as any).languagesData || {};
	const langKeys = Object.keys(langMap);
	const languages: PdfExportData['languages'] = [0, 1, 2, 3].map((i) => {
		const name = langKeys[i] || '';
		const fluency = (langMap?.[name]?.fluency as string) || (name ? 'fluent' : '');
		const fluent = fluency === 'fluent';
		const limited = fluency === 'limited';
		// Mastery language checkboxes
		if (i === 0) mastery.LanguageA = { Limited: limited, Fluent: fluent };
		if (i === 1) mastery.LanguageB = { Limited: limited, Fluent: fluent };
		if (i === 2) mastery.LanguageC = { Limited: limited, Fluent: fluent };
		if (i === 3) mastery.LanguageD = { Limited: limited, Fluent: fluent };
		return { name, limited, fluent };
	});

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


