import { ITradeData } from './schemas/types';

export const tradesData: ITradeData[] = [
	// ========================================
	// ARTISTRY
	// ========================================
	{
		id: 'illustration',
		name: 'Illustration',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility'],
		description:
			'Illustration is the ability to put ink or paint to paper to create beautiful art in drawings, paintings, and calligraphy. This includes creating images by making marks and lines with a pen, creating visually ornate handwritten lettering, or putting paint on a surface with a brush.',
		tools: "Calligrapher's Supplies"
	},
	{
		id: 'musician',
		name: 'Musician',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'charisma'],
		description:
			'Musicians are skilled in the use of a variety of instruments, which they can use to make impressive performances of sound. This includes bagpipes, drums, flutes, harps, horns, lutes, and pianos.',
		tools: 'Musical Instrument'
	},
	{
		id: 'theatre',
		name: 'Theatre',
		primaryAttribute: 'charisma',
		attributeAssociations: ['charisma'],
		description:
			'Theatre is the art of expressive performance, through acting, dancing, singing, or even juggling or other dazzling displays. This includes embodying characters, making others laugh, moving your body in eye-catching ways, using your voice to create music, and telling vivid stories.',
		tools: 'none'
	},

	// ========================================
	// CRAFTING
	// ========================================
	{
		id: 'alchemy',
		name: 'Alchemy',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence', 'agility'],
		description:
			'Alchemy is the practice of creating something by combining or changing other things, such as creating magical potions or changing one element into another. This includes magic potions with versatile effects and transmuting elements like lead into gold or water into wine.',
		tools: "Alchemist's Supplies"
	},
	{
		id: 'blacksmithing',
		name: 'Blacksmithing',
		primaryAttribute: 'might',
		attributeAssociations: ['might'],
		description:
			'Blacksmithing is the practice of melting and shaping metal into objects, such as nails, horse shoes, or armor and weapons. This includes creating metal armor like chain, splint, and plate mail, and metal weapons such as axes, daggers, and swords.',
		tools: "Blacksmith's Tools"
	},
	{
		id: 'glassblowing',
		name: 'Glassblowing',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'might'],
		description:
			'Glassblowing is the practice of blowing molten sand into glass objects, such as cups, bowls, vases, ornaments, lenses, window panes, and other objects.',
		tools: "Glassblower's Tools"
	},
	{
		id: 'herbalism',
		name: 'Herbalism',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			'Herbalism is the practice of combining various mundane plants to create concoctions that can be used to treat afflictions, heal wounds, or poison enemies. This includes brews (teas, tonics, tinctures), ointments (infusions, balms, salves), and bandages (poultices). Medicine and poison are two sides of the same coin in herbalism.',
		tools: "Herbalist's Supplies"
	},
	{
		id: 'jeweler',
		name: 'Jeweler',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility'],
		description:
			'Jewelers can beautify, identify, and even price various gems, stones, and jewelry, and can identify magical gems or the magical uses of mundane gems.',
		tools: "Jeweler's Tools"
	},
	{
		id: 'leatherworking',
		name: 'Leatherworking',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility'],
		description:
			'Leatherworking is the practice of making leather from animal skins or making leather into useable items, such as clothing, armor, weapons sheathes, and other objects.',
		tools: "Leatherworker's Tools"
	},
	{
		id: 'sculpting',
		name: 'Sculpting',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility'],
		description:
			'Sculpting is the practice of shaping bone, clay, glass, stone, or wood into figures, tools, idols, or simple weapons. This includes containers, statues, simple weapons, and trinkets.',
		tools: "Sculptor's Tools"
	},
	{
		id: 'tinkering',
		name: 'Tinkering',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'intelligence'],
		description:
			'Tinkering is the practice of making, repairing, or operating mechanisms, such as traps and clockwork devices. This includes setting up and disarming traps, and tuning, modifying, or repairing clockwork devices that operate using gears, springs, and levers.',
		tools: "Tinkerer's Tools"
	},
	{
		id: 'weaving',
		name: 'Weaving',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility'],
		description:
			'Weaving is the practice of creating material for clothing or using such material to create clothes, curtains, tapestries, and other woven objects.',
		tools: "Weaver's Tools"
	},

	// ========================================
	// SERVICES
	// ========================================
	{
		id: 'brewing',
		name: 'Brewing',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'intelligence', 'charisma'],
		description:
			'Brewing is the practice of producing alcohol, especially beer, mead, and wine.',
		tools: "Brewer's Supplies"
	},
	{
		id: 'carpentry',
		name: 'Carpentry',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'might'],
		description:
			'Carpentry is the practice of measuring, cutting, and installing pieces of wood to create structures that form buildings, bridges, ships, and other large structures.',
		tools: "Carpenter's Tools"
	},
	{
		id: 'cartography',
		name: 'Cartography',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence', 'agility'],
		description:
			'Cartography is the practice of drawing and understanding maps.',
		tools: "Cartographer's Tools"
	},
	{
		id: 'cooking',
		name: 'Cooking',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'intelligence', 'charisma'],
		description:
			'Cooking is the practice of preparing, mixing, and heating edible ingredients to create meals.',
		tools: 'Cooking Utensils'
	},
	{
		id: 'masonry',
		name: 'Masonry',
		primaryAttribute: 'might',
		attributeAssociations: ['might'],
		description:
			'Masonry is the practice of working and installing stone into structures that form buildings, bridges, furnaces, and other large structures.',
		tools: "Mason's Tools"
	},
	{
		id: 'vehicles',
		name: 'Vehicles',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'intelligence', 'might'],
		description:
			'Vehicles covers the practice of managing, operating, and steering vehicles, whether on land, sea, or air. This includes water vehicles (boats, canoes, kayaks, ships), air vehicles (airships, astral jumpers), and land vehicles (clockwork or magical land vehicles).',
		tools: 'Vehicle'
	},

	// ========================================
	// SUBTERFUGE
	// ========================================
	{
		id: 'cryptography',
		name: 'Cryptography',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			'Cryptography is the process of converting messages into secret or disguised words to protect them from being understood. The message must be deciphered to discern its true meaning.',
		tools: "Cryptographer's Tools"
	},
	{
		id: 'disguise',
		name: 'Disguise',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'charisma'],
		description:
			"The art of disguise is in the ability to alter one's appearance to conceal identity or appear as someone else.",
		tools: 'Disguise Kit'
	},
	{
		id: 'gaming',
		name: 'Gaming',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence', 'charisma'],
		description:
			'Gaming is the practice of playing games skillfully, for money or for entertainment. This includes dice games, playing cards, and gambling.',
		tools: 'Gaming Set'
	},
	{
		id: 'lockpicking',
		name: 'Lockpicking',
		primaryAttribute: 'agility',
		attributeAssociations: ['agility', 'intelligence'],
		description:
			'Lockpicking is the practice of opening devices secured by interworking mechanisms, such as locks and traps. This includes opening locks without the proper key using thin instruments, copying keys, and disarming traps.',
		tools: 'Lockpicking Tools'
	},

	// ========================================
	// KNOWLEDGE TRADES
	// ========================================
	{
		id: 'arcana',
		name: 'Arcana',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			'Arcane knowledge encompasses the study of arcane magic, the planes of existence, and the underlying principles that govern reality beyond mundane understanding. This includes arcane magic, spells, items, runes, glyphs, symbols, creatures (constructs, monstrosities, oozes), and planes of existence.',
		tools: 'none'
	},
	{
		id: 'engineering',
		name: 'Engineering',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			"Engineering represents a character's understanding of mechanics, construction, and the application of scientific principles in a world that blends magic and technology. This includes designing and operating gears, pulleys, mechanical engines, motors, and understanding the architecture of buildings, bridges, tunnels, and fortresses.",
		tools: 'none'
	},
	{
		id: 'history',
		name: 'History',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			'History involves the study of past events, including recorded events, ancient lore, and provides insight into how civilizations, cultures, and legends have shaped the present world. This includes historical events, conflicts, wars, creatures (dragons, giants, humanoids), and lost civilizations.',
		tools: 'none'
	},
	{
		id: 'nature',
		name: 'Nature',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			"Nature represents a character's understanding of the natural world, including the elements, weather patterns, and magical and mundane ecosystems. This includes primal and elemental magic, creatures (beasts, elementals, fey, plants), and natural parts of the world (terrain, weather, seasons, natural disasters).",
		tools: 'none'
	},
	{
		id: 'occultism',
		name: 'Occultism',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			"Occultism represents a character's understanding of forbidden magic, secret cults, and the dealings of sinister creatures. This includes unholy magic, knowledge of the forbidden, creatures (aberrations, fiends, undead), and practices of secret cults.",
		tools: 'none'
	},
	{
		id: 'religion',
		name: 'Religion',
		primaryAttribute: 'intelligence',
		attributeAssociations: ['intelligence'],
		description:
			"Religion represents a character's understanding of divine magic, deities, and religious organizations. This includes holy magic, relics, auras, symbols, creatures (deities, celestials, angels), and religious rites, prayers, hierarchies, and practices.",
		tools: 'none'
	}
];

