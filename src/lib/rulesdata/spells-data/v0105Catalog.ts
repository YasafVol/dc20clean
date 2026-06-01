import type { Spell } from '../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../schemas/spell.schema';

const callFamiliar: Spell = {
	id: 'call-familiar',
	name: 'Call Familiar',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Sense', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '1 Space',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a friendly spirit that enters your service until you are reduced to 0 HP or you choose to end the Spell for free on your turn. It takes the form of a Tiny creature of your choice, with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below:'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				"Grant your Familiar 2 points worth of Familiar or Beast Traits (you can't choose Negative Traits).",
			repeatable: true
		}
	],
	fullDescription:
		"Source: Arcane, Divine, Primal School: Conjuration Tags: Sense, Summoning Cost: 1 AP + 1 MP Range: 1 Space Duration: Instantaneous You summon a friendly spirit that enters your service until you are reduced to 0 HP or you choose to end the Spell for free on your turn. It takes the form of a Tiny creature of your choice, with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below: ## Familiar Tiny (Chosen Type) | HP | Shared | AP | Shared | |-------|----------|---------|----------| | PD | 8 + CM | AD | 8 + CM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | 0 | CHA | 0 | | AGI | 0 | INT | 0 | DC Tip: The Familiar shares your Prime Modifier and Combat Mastery so it's Attack, Martial and Spell Checks are the same as yours. MP Reduction: When you cast the Spell, your maximum MP is reduced by an amount equal to the MP spent. This MP reduction only ends when the Spell ends. You don't regain any lost MP when your maximum MP is restored. Recasting the Spell: You can't have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits. ## Familiar Traits Your Familiar has the following Familiar Traits: - Familiar Bond: Your Familiar shares your HP. If you both take damage from the same source, you only take 1 instance of that damage. While your Familiar occupies the same Space as you, it can't be targeted by Attacks. - Shared Telepathy: While within 20 Spaces, you and your Familiar can speak Telepathically with each other. - Spell Delivery: While within 10 Spaces of your Familiar, you cast a Spell with a range of 1 Space as if you were standing in your Familiar's Space. ## Spell Actions Pocket Dimension: You can spend a Minor Action to dismiss the Familiar into a pocket dimension, summon it from that pocket dimension, or summon it from anywhere on the same plane of existence. When summoned or dismissed, any items it was carrying are left behind. When summoned, it appears in the nearest unoccupied Space of your choice. Shared Senses: While your Familiar is within 20 Spaces, you can spend 1 AP to connect your senses to the Familiar's senses until the end of your next turn. For the duration, you're Deafened and Blinded to your own senses, but you can see what your Familiar sees and hear what it hears. The connection ends early if either of you moves farther than 20 Spaces from the other. ## Managing the Familiar Combat: The Familiar shares your Initiative, acting on your turn. You can spend 1 AP to command the Familiar to use an Action. It can't take the Attack Action or Spell Action unless it has a Familiar Feature that allows it to. When you take the Move Action, your Familiar also gains the benefits of the Move Action. If you don't command it, when your turn ends it takes the Dodge Action. Shared MCP: When the Familiar makes a Check, it shares your Multiple Check Penalty. ## Spell Enhancements Additional Traits: (1 MP, Repeatable) Grant your Familiar 2 points worth of Familiar or Beast Traits (you can't choose Negative Traits). ## Expanded Familiar Traits Summoned Familiars can choose from the following additional Familiar Traits: ## Repeatable Traits (2) Resistance: It gains Resistance (Half) to a damage type of your choice. ## Unique Traits (2) Avian: It gains a Fly Speed equal to its Speed. (1) Blended Senses: You can use Shared Senses as a free Action on your turn. Its range increases to 100 Spaces and only ends if either of you moves farther than 100 Spaces from the other or you choose to end it for free at any point. (2) Chameleon: You can spend 1 AP to cause your Familiar to become Invisible for 1 minute or until it takes any Action beside the Dodge or Hide Actions. (1) Distant Link: The range of Shared Telepathy increases to 100 Spaces, and you always know the exact location of your Familiar provided you are both on the same plane of existence. (1) Extended Spell Delivery: While within 10 Spaces of your Familiar, you can cast Spells as if you were standing in its Space. (1) Familiar Attack: The Familiar can spend 1 AP to make a Ranged Spell Attack against the PD of a target within 10 Spaces. The Attack deals 1 damage of a type chosen when you summon the Familiar (except True damage). If the target is within 1 Space, the Attack becomes a Melee Spell Attack and deals +1 damage on a Heavy Hit. (1) Predator: Requires Familiar Attack. The familiar has ADV on Attacks against Bloodied creatures, and on Survival Checks to track them. (1) Prey: The Familiar has ADV on Stealth Checks and can attempt to Hide even when it's only Partially Concealed. (1) Limited Telepathy: The Familiar can communicate telepathically with any creature it can see within 5 Spaces. If the Familiar can't speak, it communicates using only simple ideas, emotions, and images. (2) Malleable: The Familiar can move through a space as narrow as 1 inch wide without squeezing. (1) Evasive: The Familiar doesn't provoke Opportunity Attacks when it leaves an enemy's reach. (1) Quiet as a Mouse: While moving at a Stealthy pace (1/2 Speed), the Familiar makes no sound, leaves no noticeable trail, and can't be tracked by mundane means. (1) Speech: The Familiar gains the ability to speak and shares your Language Masteries. (1) Strong-Willed: The Familiar has ADV on Saves to avoid being Charmed, Frightened, Intimidated, or Terrified."
};

const blessingOfAir: Spell = {
	id: 'blessing-of-air',
	name: 'Blessing of Air',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Astromancy,
	tags: ['Air', 'Embolden', 'Gravity', 'Motion'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You grant a creature with range the following benefits for the - Glide Speed: They can use their movement to glide horizontally in the air. - Altitude Drop: If they end their turn midair, they Control Fall 4 Spaces. - Controlled Falling: They suffer no damage from Controlled Falling. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including vertically) up to their Speed.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Arcane, Primal School: Astromancy Tags: Air, Embolden, Gravity, Motion Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You grant a creature with range the following benefits for the duration: - Glide Speed: They can use their movement to glide horizontally in the air. - Altitude Drop: If they end their turn midair, they Control Fall 4 Spaces. - Controlled Falling: They suffer no damage from Controlled Falling. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including vertically) up to their Speed.'
};

const mockery: Spell = {
	id: 'mockery',
	name: 'Mockery',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Enchantment,
	tags: ['Blinded', 'Deafened', 'Emotions', 'Taunted'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Trigger: A target within range fails a Check. Reaction: Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Taunted by you for the duration."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane School: Enchantment Tags: Blinded, Deafened, Emotions, Taunted Cost: 1 AP Range: 10 Spaces Duration: 1 Minute Trigger: A target within range fails a Check. Reaction: Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Taunted by you for the duration."
};

const toxicBurst: Spell = {
	id: 'toxic-burst',
	name: 'Toxic Burst',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Ailment', 'Enfeeble', 'Poison'] as Spell['tags'],
	cost: {
		ap: 2
	},
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You emit toxic air that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of each target in the area. Hit: They take 1 Poison damage.'
		}
	],
	spellPassive:
		'Noxious: Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches.',
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'The damage increases by X.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: "The Aura's radius increases by X Spaces.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Disease',
			description:
				"Each target makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a rest. This Disease can be removed by any effect that ends a Basic Disease.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Spreading Plague',
			description:
				'Requires Disease. Creatures Diseased by this Spell also emit a 1 Space Aura of diseased air. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target also becomes Diseased by this Spell for 1 minute. You are immune to the effects of Spreading Plague.'
		}
	],
	fullDescription:
		"Source: Arcane, Primal School: Elemental Tags: Ailment, Enfeeble, Poison Cost: 2 AP Range: Self Duration: Instantaneous You emit toxic air that envelops a 1 Space Aura. Make an Area Spell Attack against the AD of each target in the area. Hit: They take 1 Poison damage. ## Spell Passive: Noxious Plant life in the area that are not being worn or held wilts or dies, grass blackens, and flowers or vines shrivel where the Spell touches. ## Spell Enhancements Damage: (X MP) The damage increases by X. Area: (X MP) The Aura's radius increases by X Spaces. Disease: (X MP) Each target makes a Repeated Might Save against your Save DC. Save Failure: The target is Diseased for 1 minute. Creatures Diseased by this Spell have their current and maximum HP reduced by X at the start of each of their turns. The creature's maximum HP returns to normal after taking a rest. This Disease can be removed by any effect that ends a Basic Disease. Beta Note: A creature with a Medicine Kit can attempt to remove a Basic Disease from a creature within 1 Space (including themselves) by spending 1 AP and 1 charge from the Medicine Kit and make a Medicine Check against the effect's Save DC, removing the Disease on a success. Spreading Plague: (1 MP) Requires Disease. Creatures Diseased by this Spell also emit a 1 Space Aura of diseased air. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Repeated Might Save against your Save DC. Save Failure: The target also becomes Diseased by this Spell for 1 minute. You are immune to the effects of Spreading Plague."
};

const blessingOfEarth: Spell = {
	id: 'blessing-of-earth',
	name: 'Blessing of Earth',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Earth', 'Embolden', 'Motion', 'Sense'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You grant a creature with range Tremorsense 3 Spaces and a Burrow Speed equal to half their Speed for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they move underground.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Primal School: Transmutation Tags: Earth, Embolden, Motion, Sense Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You grant a creature with range Tremorsense 3 Spaces and a Burrow Speed equal to half their Speed for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they move underground. ## Burrow Speed You can move through sand, dirt, mud, and snow, but not through solid ice or rock. When you do, you leave a collapsed tunnel behind you. DC Tip: A creature that requires air to breath will need to hold their breath or begin Suffocating while Burrowing underground.'
};

const gravityWell: Spell = {
	id: 'gravity-well',
	name: 'Gravity Well',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Gravity', 'Motion', 'Restrained'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 1
	},
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You create an area of intense gravity that pulls creatures and objects in a 4 Space Sphere towards its center. Make a Spell Check against the Might Save of creatures in the area. Check Success: They're pulled 1 Space towards the center. Success (Each 5): They're pulled 1 additional Space. Collision: If a creature is pushed to the center of the area, they stop and take collision damage as if they had hit a solid surface."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The diameter of the Sphere increases by X Spaces.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Stronger Pull',
			description: 'The distance pulled increases by X Spaces.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Lingering',
			description:
				"The duration of the Spell becomes 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They're pulled X Spaces towards the center.",
			variable: true
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Black Hole',
			description:
				'If a creature pulled by this Spell ends in a center Space they become Restrained for the duration. A creature Restrained this way makes a Repeated Might Save at the end of each of their turns, ending the condition on a Success.'
		}
	],
	fullDescription:
		"Source: Arcane School: Astromancy Tags: Gravity, Motion, Restrained Cost: 2 AP + 1 MP Range: 10 Spaces Duration: Instantaneous You create an area of intense gravity that pulls creatures and objects in a 4 Space Sphere towards its center. Make a Spell Check against the Might Save of creatures in the area. Check Success: They're pulled 1 Space towards the center. Success (Each 5): They're pulled 1 additional Space. Collision: If a creature is pushed to the center of the area, they stop and take collision damage as if they had hit a solid surface. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Area: (X MP) The diameter of the Sphere increases by X Spaces. Stronger Pull: (X MP) The distance pulled increases by X Spaces. Lingering: (X MP, Sustained) The duration of the Spell becomes 1 minute. When a creature enters the area for the first time on its turn or starts its turn there, it makes a Might Save against your Save DC. Save Failure: They're pulled X Spaces towards the center. Black Hole: (3 MP, Requires Lingering) If a creature pulled by this Spell ends in a center Space they become Restrained for the duration. A creature Restrained this way makes a Repeated Might Save at the end of each of their turns, ending the condition on a Success."
};

const forcefield: Spell = {
	id: 'forcefield',
	name: 'Forcefield',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Antimagic', 'Sound', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You create a Forcefield of pure arcane energy within range. Choose either a 3 Space diameter Dome or a 5 Space long, 2 Space tall Wall. Creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Forcefield (you choose for each object). The Forcefield is translucent and acts as a solid surface, blocking movement but not sound or light. The Forcefield has 2 HP, Resistance (Half) to all damage, and a PD and AD equal to your Save DC.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Area',
			description: 'The size of the Forcefield increases:',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Durable',
			description: 'The Forcefield has +X HP.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'One-way Mirror',
			description:
				'Choose one face of the Forcefield to stay translucent. Creatures on that side see through it normally, while creatures on the other side perceive it as a mirror.'
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Privacy',
			description:
				'When you cast the Spell or by spending 1 AP, you can alter how sound passes through the Forcefield. You can prevent any sound from passing through, prevent sound from only passing through in 1 direction (for example from the outside to the inside), or allow all sound to pass through.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Full Lockdown',
			description:
				"Creatures and effects can't affect anything on the other side of the Forcefield. In addition, creatures and objects can't teleport through the Forcefield."
		}
	],
	fullDescription:
		"Source: Arcane School: Conjuration Tags: Antimagic, Sound, Summoning Cost: 2 AP + 1 MP Range: 10 Spaces Duration: 1 Minute You create a Forcefield of pure arcane energy within range. Choose either a 3 Space diameter Dome or a 5 Space long, 2 Space tall Wall. Creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Forcefield (you choose for each object). The Forcefield is translucent and acts as a solid surface, blocking movement but not sound or light. The Forcefield has 2 HP, Resistance (Half) to all damage, and a PD and AD equal to your Save DC. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Area: (1 MP, Repeatable) The size of the Forcefield increases: - Dome: The diameter of the Dome increases by 1 Space. - Wall: The length of the Wall increases by 5 Spaces or the height of the Wall increases by 2 Spaces. Durable: (X MP) The Forcefield has +X HP. One-way Mirror: (1 MP) Choose one face of the Forcefield to stay translucent. Creatures on that side see through it normally, while creatures on the other side perceive it as a mirror. Privacy: (1 AP) When you cast the Spell or by spending 1 AP, you can alter how sound passes through the Forcefield. You can prevent any sound from passing through, prevent sound from only passing through in 1 direction (for example from the outside to the inside), or allow all sound to pass through. Full Lockdown: (2 MP) Creatures and effects can't affect anything on the other side of the Forcefield. In addition, creatures and objects can't teleport through the Forcefield."
};

const gravityShift: Spell = {
	id: 'gravity-shift',
	name: 'Gravity Shift',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Dazed', 'Gravity', 'Hindered', 'Motion'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 4
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You alter gravity in a 6 Space high, 3 Space diameter Cylinder within range. Choose a vertical or horizontal plane within the Cylinder (such as the bottom, top or side of the Cylinder). The chosen section becomes a Gravity Plane. Spell Cast: When you cast this Spell, make a Spell Check against the Repeated Intelligence Save of each creature in the area. Save Failure: The target becomes Hindered while in the area for the duration.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Arcane School: Astromancy Tags: Dazed, Gravity, Hindered, Motion Cost: 2 AP + 4 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You alter gravity in a 6 Space high, 3 Space diameter Cylinder within range. Choose a vertical or horizontal plane within the Cylinder (such as the bottom, top or side of the Cylinder). The chosen section becomes a Gravity Plane. Spell Cast: When you cast this Spell, make a Spell Check against the Repeated Intelligence Save of each creature in the area. Save Failure: The target becomes Hindered while in the area for the duration. ## Gravity Plane Creatures and unsecured objects fall toward a Gravity Plane. Creatures above a Gravity Plane walk normally, but creatures below a Gravity Plane can walk on any horizontal surface as if standing upside down.'
};

const increaseGravity: Spell = {
	id: 'increase-gravity',
	name: 'Increase Gravity',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Bludgeoning', 'Gravity', 'Immobilized', 'Hindered', 'Prone', 'Slowed'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 2
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You increase gravity in a 6 Space tall, 3 Space diameter Cylinder within range. Creatures and objects that fall to the ground within the area take +2 falling damage. Spell Cast: When you cast the Spell, make a Spell Check against the Might Save of every creature within the area. Save Failure: The creature falls Prone.'
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane School: Astromancy Tags: Bludgeoning, Gravity, Immobilized, Hindered, Prone, Slowed Cost: 2 AP + 2 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You increase gravity in a 6 Space tall, 3 Space diameter Cylinder within range. Creatures and objects that fall to the ground within the area take +2 falling damage. Spell Cast: When you cast the Spell, make a Spell Check against the Might Save of every creature within the area. Save Failure: The creature falls Prone. ## Heightened Gravity: - Creatures: Creatures that start their turn within the area, or enter the area for the first time on their turn, must make a Repeated Might Save against your Save DC. Save Failure: The creature is Slowed and Hindered while in the area for the duration. - Objects: Objects in the area that aren't being worn, held, or carried require a successful Athletics Check against your Save DC to be picked up or moved."
};

const reduceInertia: Spell = {
	id: 'reduce-inertia',
	name: 'Reduce Inertia',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Embolden', 'Gravity', 'Motion', 'Ward'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You reduce the inertia of up to 2 targets within range for the duration. Each target weighs half as much and falls a maximum of 10 Spaces per Round. Spell Cast: Make a DC 15 Spell Check. Failure: Each target has Resistance (Half) to falling damage for the duration. Success: Each target is immune to falling damage for the duration and doesn't fall Prone as a result of falling. Reaction: You can cast this Spell as a Reaction when a target falls within range."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane School: Astromancy Tags: Embolden, Gravity, Motion, Ward Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute You reduce the inertia of up to 2 targets within range for the duration. Each target weighs half as much and falls a maximum of 10 Spaces per Round. Spell Cast: Make a DC 15 Spell Check. Failure: Each target has Resistance (Half) to falling damage for the duration. Success: Each target is immune to falling damage for the duration and doesn't fall Prone as a result of falling. Reaction: You can cast this Spell as a Reaction when a target falls within range."
};

const timeStop: Spell = {
	id: 'time-stop',
	name: 'Time Stop',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Astromancy,
	tags: ['Time', 'Paralyzed'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 2
	},
	range: 'Self',
	duration: 'End of Turn',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'Time stops for all effects, objects, and creatures (except you). For the duration, you ignore the Multiple Check Penalty, and creatures whose time has stopped are considered Paralyzed. The Spell ends early after you target a creature with a harmful effect.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Arcane School: Astromancy Tags: Time, Paralyzed Cost: 1 AP + 2 MP Range: Self Duration: End of Turn Time stops for all effects, objects, and creatures (except you). For the duration, you ignore the Multiple Check Penalty, and creatures whose time has stopped are considered Paralyzed. The Spell ends early after you target a creature with a harmful effect.'
};

const arcaneWeapon: Spell = {
	id: 'arcane-weapon',
	name: 'Arcane Weapon',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Enfeeble', 'Bludgeoning', 'Piercing', 'Slashing', 'Weapon'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a Tiny Weapon made that deals a Physical Damage Type (Bludgeoning, Piercing or Slashing) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: "The Weapon's damage increases by X.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description:
				'You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Physical Effect',
			description:
				'Creatures Hit by the Weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Bludgeoning (Prone), Piercing (Impaired), or Slashing (Bleeding).'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Cleave',
			description:
				'When you Command the Weapon, you can instead make a Area Spell Attack against the AD of each target within a 1 Space Arc of the Weapon. Hit: The target takes 1 damage of the chosen type.'
		}
	],
	fullDescription:
		"Source: Arcane School: Conjuration Tags: Enfeeble, Bludgeoning, Piercing, Slashing, Weapon Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You summon a Tiny Weapon made that deals a Physical Damage Type (Bludgeoning, Piercing or Slashing) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you. ## Spell Enhancement Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Damage: (X MP) The Weapon's damage increases by X. Effortless: (1 MP) You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round. Physical Effect: (1 MP) Creatures Hit by the Weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Bludgeoning (Prone), Piercing (Impaired), or Slashing (Bleeding). Cleave: (1 MP) When you Command the Weapon, you can instead make a Area Spell Attack against the AD of each target within a 1 Space Arc of the Weapon. Hit: The target takes 1 damage of the chosen type."
};

const illusoryDuplicate: Spell = {
	id: 'illusory-duplicate',
	name: 'Illusory Duplicate',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Communication', 'Illusion', 'Teleportation', 'Sense'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You create an illusory duplicate of yourself in an unoccupied Space within range. Second Self: The duplicate mimics your posture and gestures. When you spend movement to move, you can cause the duplicate to move instead of you or with you. If the duplicate moves with you, it moves in a similar manner the same number of Spaces in a direction of your choice. If you end your turn farther than the Spell's range from a duplicate, it disappears. Shared Senses: You can use a Minor Action to see and hear as if standing in the Space occupied by the duplicate. When you do you are Blinded and Deafened using your own senses. You can use a Minor Action to end the effect. False Threat: The duplicate is intangible, causing creatures and objects to pass through it. The duplicate counts as a creature for the purposes of Flanking against any creature that can't discern the duplicate as an illusion. Discerning the Illusion: A creature that attempts to physically interact with the duplicate automatically learns that it's an illusion. Otherwise, a creature can make an Investigation Check against your Save DC to attempt to discern if the duplicate is an illusion. Success: The creature discerns its an illusion."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Duplicate',
			description:
				'You create X additional duplicates within range and each one can move independently when you move.',
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Ventriloquism',
			description:
				'You can choose to speak through your duplicate at the same time as you or instead of you, making your voice appear to come from its location.'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Swap',
			description:
				"You can now spend 1 AP on your turn to swap places with a duplicate that's within the Spell's range. This swap is only noticeable by a creature that has discerned the duplicate to be an illusion."
		}
	],
	fullDescription:
		"Source: Arcane School: Conjuration Tags: Communication, Illusion, Teleportation, Sense Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You create an illusory duplicate of yourself in an unoccupied Space within range. Second Self: The duplicate mimics your posture and gestures. When you spend movement to move, you can cause the duplicate to move instead of you or with you. If the duplicate moves with you, it moves in a similar manner the same number of Spaces in a direction of your choice. If you end your turn farther than the Spell's range from a duplicate, it disappears. Shared Senses: You can use a Minor Action to see and hear as if standing in the Space occupied by the duplicate. When you do you are Blinded and Deafened using your own senses. You can use a Minor Action to end the effect. False Threat: The duplicate is intangible, causing creatures and objects to pass through it. The duplicate counts as a creature for the purposes of Flanking against any creature that can't discern the duplicate as an illusion. Discerning the Illusion: A creature that attempts to physically interact with the duplicate automatically learns that it's an illusion. Otherwise, a creature can make an Investigation Check against your Save DC to attempt to discern if the duplicate is an illusion. Success: The creature discerns its an illusion. ## Spell Enhancement Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest). Additional Duplicate: (X MP) You create X additional duplicates within range and each one can move independently when you move. Ventriloquism: (1 MP) You can choose to speak through your duplicate at the same time as you or instead of you, making your voice appear to come from its location. Swap: (3 MP) You can now spend 1 AP on your turn to swap places with a duplicate that's within the Spell's range. This swap is only noticeable by a creature that has discerned the duplicate to be an illusion."
};

const illusoryWriting: Spell = {
	id: 'illusory-writing',
	name: 'Illusory Writing',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Communication', 'Illusion', 'Trap'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You inscribe text, sigils, or symbols upon a surface, infusing them with illusion magic. When cast, you write a sentence of up to 20 words that appears mundane or magical (your choice) on a surface or willing creature within range. While touching it, you can spend 1 AP to dismiss or rewrite the text. Hidden Script: When you cast the Spell, you can choose to obfuscate the writing to all creatures except those you designate at the time of casting. All other creature see the writing as gibberish. A creature that can't read the text can spend 1 AP to make an Investigation Check against your Save DC. Success: The creature can read the writing provided they understand the language its written in. Failure: The creature can't attempt this Check again for 24 hours."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Extended Script',
			description:
				'The duration increases to Long Rest and you can add an additional sentence with up to 40 words for each time you use this Enhancement. If you spend 2 MP or more on this Enhancement, you can choose for the duration to become Until Dispelled.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Lingering Message',
			description:
				'The writing can produce faint sound or whispers that communicate its meaning aloud to chosen readers.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Misleading Script',
			description:
				"When a creature you haven't designated attempts to read the writing fails their Investigation Check to discern its meaning, they instead see a false message of your choosing."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Trigger Phrase',
			description:
				'The script activates or becomes visible when a chosen word or condition is met (for example: "When someone opens this door," or "When the moon is full").'
		},
		{
			type: 'MP',
			cost: 3,
			name: 'Skywriting',
			description:
				"You can instead inscribe the message across the sky in massive, glowing letters visible for miles. The range becomes Sight. This Enhancement can't be used with the Extended Script Enhancement."
		}
	],
	fullDescription:
		'Source: Arcane School: Conjuration Tags: Communication, Illusion, Trap Cost: 1 AP Range: 10 Spaces Duration: 1 Hour You inscribe text, sigils, or symbols upon a surface, infusing them with illusion magic. When cast, you write a sentence of up to 20 words that appears mundane or magical (your choice) on a surface or willing creature within range. While touching it, you can spend 1 AP to dismiss or rewrite the text. Hidden Script: When you cast the Spell, you can choose to obfuscate the writing to all creatures except those you designate at the time of casting. All other creature see the writing as gibberish. A creature that can\'t read the text can spend 1 AP to make an Investigation Check against your Save DC. Success: The creature can read the writing provided they understand the language its written in. Failure: The creature can\'t attempt this Check again for 24 hours. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Extended Script: (1 MP, Repeatable) The duration increases to Long Rest and you can add an additional sentence with up to 40 words for each time you use this Enhancement. If you spend 2 MP or more on this Enhancement, you can choose for the duration to become Until Dispelled. Lingering Message: (1 MP) The writing can produce faint sound or whispers that communicate its meaning aloud to chosen readers. Misleading Script: (1 MP) When a creature you haven\'t designated attempts to read the writing fails their Investigation Check to discern its meaning, they instead see a false message of your choosing. Trigger Phrase: (1 MP) The script activates or becomes visible when a chosen word or condition is met (for example: "When someone opens this door," or "When the moon is full"). Skywriting: (3 MP) You can instead inscribe the message across the sky in massive, glowing letters visible for miles. The range becomes Sight. This Enhancement can\'t be used with the Extended Script Enhancement.'
};

const summonAberration: Spell = {
	id: 'summon-aberration',
	name: 'Summon Aberration',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Aberration', 'Cold', 'Psychic', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Aberration within range for the duration. The creature uses the Summoned Aberration stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Arcane Spell School: Conjuration Tags: Aberration, Cold, Psychic, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Aberration within range for the duration. The creature uses the Summoned Aberration stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Aberration | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | -1 | CHA | -1 | | AGI | 0 | INT | PM | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Deep Speech. - Natural Weapon: Choose Psychic or Cold damage when you summon the Aberration. The Aberration gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Aberration: The creature has Psychic Resistance (Half), Telepathy 10 Spaces, and ADV on Intelligence Saves. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonConstruct: Spell = {
	id: 'summon-construct',
	name: 'Summon Construct',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Bludgeoning', 'Construct', 'Piercing', 'Slashing', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a Small or Medium sized Construct within range for the duration. Alternatively, you can animate an object within range instead, provided it's of a size you can summon. When you animate an object, it becomes a Construct creature of the same size. The summoned or animated creature uses the Summoned Construct stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being an object (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Arcane Spell School: Conjuration Tags: Bludgeoning, Construct, Piercing, Slashing, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Construct within range for the duration. Alternatively, you can animate an object within range instead, provided it's of a size you can summon. When you animate an object, it becomes a Construct creature of the same size. The summoned or animated creature uses the Summoned Construct stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being an object (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Construct | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | PM | CHA | -2 | | AGI | 2 | INT | -2 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and 1 other Language of your choice you know. - Natural Weapon: Choose Bludgeoning, Piercing, or Slashing damage when you summon the Construct. If you animated an object, the GM chooses a damage type that makes sense for the object animated (this could be a non-physical damage type). The Construct gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Construct: The creature has Poison, Disease, and Bleeding Immunity, and doesn't require food, drink, air, or sleep. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonDragon: Spell = {
	id: 'summon-dragon',
	name: 'Summon Dragon',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Dragon', 'Piercing', 'Slashing', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Dragon within range for the duration. The creature uses the Summoned Dragon stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Arcane Spell School: Conjuration Tags: Dragon, Piercing, Slashing, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Dragon within range for the duration. The creature uses the Summoned Dragon stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Dragon | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | PM | CHA | 1 | | AGI | -2 | INT | -1 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Draconic. - Natural Weapon: Choose Piercing or Slashing damage when you summon the Dragon. The Dragon gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Dragon: The creature has Resistance (Half) to a damage type of your choice (except True damage), and the Dragonborn's Breath Weapon Ancestry Trait of the chosen damage type. The creature can spend your MP to enhance this action. (2) Breath Weapon: Your breath becomes a Natural Weapon called your Breath Weapon. You can use your Breath Weapon to make a Ranged or Area Martial Attack. Before making the Attack, you can spend 1 or more AP, SP, MP, or a combination of each to increase the damage. - Ranged Attack: You spend 1 AP to make a Ranged Martial Attack against 1 target's PD within 10 Spaces. Hit: The target takes 1 Draconic damage (+1 per additional AP or SP spent or +2 per MP spent). - Area Attack: You spend 2 AP to make an Area Martial Attack against every target's AD within a 2 Space Cone or 4 Space Line. Hit: The target takes 1 Draconic damage (+1 per additional 2 AP, 2 SP, or 1 MP spent). ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonOoze: Spell = {
	id: 'summon-ooze',
	name: 'Summon Ooze',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Conjuration,
	tags: ['Corrosion', 'Ooze', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Ooze within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Arcane Spell School: Conjuration Tags: Corrosion, Ooze, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Ooze within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Ooze | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | 1 | CHA | -1 | | AGI | PM | INT | -2 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common but can't speak. - Natural Weapon: The Ooze gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 Corrosion damage. - Ooze: The creature has Corrosion Immunity, and can squeeze through a gap as narrow as 1 inch. Additionaly, the creature can walk normally on solid surfaces regardless of their orientation (such as upside down on the ceiling) without falling or needing to Climb. When knocked Prone, they fall off such surfaces to the ground. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const dangerSense: Spell = {
	id: 'danger-sense',
	name: 'Danger Sense',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Divination,
	tags: ['Embolden', 'Emotions', 'Knowledge', 'Sense', 'Surprised'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Hour',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Ward You grant a creature within range supernatural foresight for the duration. Make a DC 15 Spell Check. Failure: The target can't be Surprised. Success: The target also has ADV on Initiative Checks. Success (5): The target also adds a d8 to Initiative Checks."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Primal School: Divination Tags: Embolden, Emotions, Knowledge, Sense, Surprised, Ward Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Hour You grant a creature within range supernatural foresight for the duration. Make a DC 15 Spell Check. Failure: The target can't be Surprised. Success: The target also has ADV on Initiative Checks. Success (5): The target also adds a d8 to Initiative Checks."
};

const detectMagic: Spell = {
	id: 'detect-magic',
	name: 'Detect Magic',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Divination,
	tags: ['Antimagic', 'Knowledge', 'Sense'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: 'Self',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You can sense the presence of magic in a 3 Space Aura for the duration. The Aura is blocked by 6 inches (15 cm) of wood or earth (rock, dirt, mud, or sand), or 1 inch (25 mm) of metal. Make a DC 15 Spell Check. Failure: You learn if magic is present within the area. Success: You also learn the location of sources of magical effects in the area and can use the Examine Action. Examine: When you Sustain this Spell, or by spending 1 AP, you can examine the source of a magical effect in the area. Make a Spell Check against the effect's Save DC (or the Save DC of the effect's creator if it doesn't have one). Success: You learn the effect's School of Magic, Spell Tags (if any), and the amount of MP used to produce the effect. Success (5): You learn the effect's name and exactly how it works. DC Tip: Curses are magical in nature, so this Spell allows you to sense them, potentially examine them, and learn how they work."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Divine, Primal School: Divination Tags: Antimagic, Knowledge, Sense Cost: 1 AP + 1 MP Range: Self Duration: 1 Minute You can sense the presence of magic in a 3 Space Aura for the duration. The Aura is blocked by 6 inches (15 cm) of wood or earth (rock, dirt, mud, or sand), or 1 inch (25 mm) of metal. Make a DC 15 Spell Check. Failure: You learn if magic is present within the area. Success: You also learn the location of sources of magical effects in the area and can use the Examine Action. Examine: When you Sustain this Spell, or by spending 1 AP, you can examine the source of a magical effect in the area. Make a Spell Check against the effect's Save DC (or the Save DC of the effect's creator if it doesn't have one). Success: You learn the effect's School of Magic, Spell Tags (if any), and the amount of MP used to produce the effect. Success (5): You learn the effect's name and exactly how it works. DC Tip: Curses are magical in nature, so this Spell allows you to sense them, potentially examine them, and learn how they work."
};

const foresight: Spell = {
	id: 'foresight',
	name: 'Foresight',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Divination,
	tags: ['Time', 'Embolden'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You grant a creature within range supernatural reflexes for the duration. Attacks made against the target's PD have DisADV for the duration."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Primal School: Divination Tags: Time, Embolden Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You grant a creature within range supernatural reflexes for the duration. Attacks made against the target's PD have DisADV for the duration."
};

const locateTarget: Spell = {
	id: 'locate-target',
	name: 'Locate Target',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Divination,
	tags: ['Knowledge', 'Planes', 'Sense'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '1 Mile (1.6 km)',
	duration: '1 Round',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Describe or name a location, object, or creature and make a Spell Check against the DC listed in the table below. Failure: You learn if the target is within range but can't name the same target with this Spell until you complete a Long Rest. Success: You learn if the target is within range and the direction of the target if it's within range. If the target is a creature, you also learn if it's alive. Success (10): You also learn the distance to the target if it's within range. | Knowledge of Target | DC | |---------------------------------------------------------------------|------| | You've heard of the target. | 20 | | You've previously seen the target. | 15 | | You've been to the location or have previously touched the target. | 10 | DC Tip: The GM may increase or decrease the DC under certain circumstances (such as having a piece of the item or a lock of their hair)."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Divine School: Divination Tags: Knowledge, Planes, Sense Cost: 1 AP + 1 MP Range: 1 Mile (1.6 km) Duration: 1 Round Describe or name a location, object, or creature and make a Spell Check against the DC listed in the table below. Failure: You learn if the target is within range but can't name the same target with this Spell until you complete a Long Rest. Success: You learn if the target is within range and the direction of the target if it's within range. If the target is a creature, you also learn if it's alive. Success (10): You also learn the distance to the target if it's within range. | Knowledge of Target | DC | |---------------------------------------------------------------------|------| | You've heard of the target. | 20 | | You've previously seen the target. | 15 | | You've been to the location or have previously touched the target. | 10 | DC Tip: The GM may increase or decrease the DC under certain circumstances (such as having a piece of the item or a lock of their hair)."
};

const lightningRod: Spell = {
	id: 'lightning-rod',
	name: 'Lightning Rod',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Lightning', 'Tethered'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to turn a creature of your choice within range into a lightning rod. Make a Spell Check against the target's Repeated Agility Save. Save Failure: The target is unable to take Reactions and you are able to use Shock against the target for the duration. The Spell ends early if you end your turn beyond the Spell's range from the target or behind Full Cover from the target. Shock: Once on each of your turns, when you Sustained this Spell or by spending 1 AP, you can deal 1 Lightning damage to the target, provided it's not behind Full Cover. When you use Shock, you can spend 1 or more MP to increase the damage by 1 per MP spent."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Primal School: Elemental Spell Tags: Lightning, Tethered Cost: 1 AP Range: 10 Spaces Duration: 1 Minute (Sustained) You attempt to turn a creature of your choice within range into a lightning rod. Make a Spell Check against the target's Repeated Agility Save. Save Failure: The target is unable to take Reactions and you are able to use Shock against the target for the duration. The Spell ends early if you end your turn beyond the Spell's range from the target or behind Full Cover from the target. Shock: Once on each of your turns, when you Sustained this Spell or by spending 1 AP, you can deal 1 Lightning damage to the target, provided it's not behind Full Cover. When you use Shock, you can spend 1 or more MP to increase the damage by 1 per MP spent."
};

const moldEarth: Spell = {
	id: 'mold-earth',
	name: 'Mold Earth',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Earth', 'Motion'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You manipulate a up to a 4 Space Zone of mundane earth (including dirt, mud, and stone) of your choice within range, provided it's not being carried or supporting a Small or larger creature or object. Choose 1 of the following options when casting the Spell: - Move: You move the area up to 2 Spaces. Any creatures or objects on the earth move with the dirt, unless you (or the creature) choose otherwise. If they remain in the same Space and there's no ground to support them, they begin a Controlled Fall. - Reshape: You cause shapes, earthen colors, or both to appear on or in the earth (such as words, images, or patterns). - Difficult Terrain: You can cause Spaces of your choice within the area to become Difficult Terrain. A creature can spend 1 AP to clear 1 Space of Difficult Terrain created in this way. If the ground is already Difficult Terrain as a result of loose earth, you can cause it to become normal terrain instead."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'AP',
			cost: 1,
			name: 'Expand',
			description: 'The size of the Zone increases by 4 Spaces.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Manipulate Stone',
			description: 'You can also manipulate compacted earth or stone.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Precise Construction',
			description:
				'You can select multiple options when casting the Spell. You can manipulate the earth into an exact form you wish. This can be used to repair structures or produce your own in unoccupied Spaces.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Heavy Excavation',
			description:
				'You can move earth supporting creatures or objects 1 size larger (Small -> Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Unstable Earth',
			description: 'Creatures in the area must make an Agility Save. Save Failure: They fall Prone.'
		}
	],
	fullDescription:
		"Source: Arcane, Primal School: Elemental Tags: Earth, Motion Cost: 1 AP Range: 10 Spaces Duration: Instantaneous You manipulate a up to a 4 Space Zone of mundane earth (including dirt, mud, and stone) of your choice within range, provided it's not being carried or supporting a Small or larger creature or object. Choose 1 of the following options when casting the Spell: - Move: You move the area up to 2 Spaces. Any creatures or objects on the earth move with the dirt, unless you (or the creature) choose otherwise. If they remain in the same Space and there's no ground to support them, they begin a Controlled Fall. - Reshape: You cause shapes, earthen colors, or both to appear on or in the earth (such as words, images, or patterns). - Difficult Terrain: You can cause Spaces of your choice within the area to become Difficult Terrain. A creature can spend 1 AP to clear 1 Space of Difficult Terrain created in this way. If the ground is already Difficult Terrain as a result of loose earth, you can cause it to become normal terrain instead. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Expand: (1 AP, Repeatable) The size of the Zone increases by 4 Spaces. Manipulate Stone: (1 MP) You can also manipulate compacted earth or stone. Precise Construction: (1 MP) You can select multiple options when casting the Spell. You can manipulate the earth into an exact form you wish. This can be used to repair structures or produce your own in unoccupied Spaces. Heavy Excavation: (1 MP, Repeatable) You can move earth supporting creatures or objects 1 size larger (Small -> Medium -> Large -> Huge -> Gargantuan -> Colossal -> Titanic). Unstable Earth: (2 MP) Creatures in the area must make an Agility Save. Save Failure: They fall Prone."
};

const confusion: Spell = {
	id: 'confusion',
	name: 'Confusion',
	sources: [SpellSource.Arcane, SpellSource.Primal],
	school: SpellSchool.Enchantment,
	tags: ['Chaos', 'Emotions', 'Madness', 'Thoughts'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 2
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"Choose a creature within range. Make a Spell Check against the target's Repeated Intelligence Save. Check Success: The creature is Confused for the duration. The target can also Repeat the Intelligence Save whenever they take damage. Confused: You can't take Reactions and must roll a d8 at the start of each of your turns to determine your behavior for that turn. - 1-2: You spend all of your AP moving in a random direction. - 3-4: You waste your AP this turn performing useless activities (such as babbling incoherently, repeatedly attempting to act but failing or remaining motionless). - 5-6: You use all your AP on Attacks or on Actions to facilitate Attacks (such as moving to a target), Attacking random targets as determined by the GM. If you can't Attack, you waste all your AP this turn. - 7-8: You act normally."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane, Primal School: Enchantment Tags: Chaos, Emotions, Madness, Thoughts Cost: 1 AP + 2 MP Range: 10 Spaces Duration: 1 Minute Choose a creature within range. Make a Spell Check against the target's Repeated Intelligence Save. Check Success: The creature is Confused for the duration. The target can also Repeat the Intelligence Save whenever they take damage. Confused: You can't take Reactions and must roll a d8 at the start of each of your turns to determine your behavior for that turn. - 1-2: You spend all of your AP moving in a random direction. - 3-4: You waste your AP this turn performing useless activities (such as babbling incoherently, repeatedly attempting to act but failing or remaining motionless). - 5-6: You use all your AP on Attacks or on Actions to facilitate Attacks (such as moving to a target), Attacking random targets as determined by the GM. If you can't Attack, you waste all your AP this turn. - 7-8: You act normally."
};

const dispelMagic: Spell = {
	id: 'dispel-magic',
	name: 'Dispel Magic',
	sources: [SpellSource.Arcane],
	school: SpellSchool.Nullification,
	tags: ['Antimagic', 'Cleansing'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to permanently dispel an MP Effect within range or temporarily dispel a Magic Item within range (Artifacts are immune to this Spell). MP Effect: Make a Spell Check against the Save DC of the creature that produced the MP Effect. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the MP the creature spent to produce the MP Effect. Check Success: The MP Effect ends. DC Tip: Monsters that produce an MP Effect are considered to be spending MP up to half their level, rounded up (what their Mana Spend Limit would be). If it's an MP Effect not produced by a creature, the GM determines the DC. Magic Item: Make a Spell Check against the Save DC of the creature that created the Magic Item. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the item's Magic Power. Check Success: The Magic Item becomes mundane for 24 hours. DC Tip: When determining the Save DC of the item's creator, consider the level a PC must be to produce an MP Effect with enough MP to match the item's Magic Power value. An item with a Magic Power of 3 is equivalent to a 3 MP Spell. A PC must be at least level 5 to have a Mana Spend Limit that allows them to cast a 3 MP Spell. The Save DC of a level 5 PC is 17 (10 + Combat Mastery (1/2 their level, round up) + Prime Modifier (4))."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Arcane School: Nullification Tags: Antimagic, Cleansing Cost: 1 AP + X MP (minimum of 1) Range: 10 Spaces You attempt to permanently dispel an MP Effect within range or temporarily dispel a Magic Item within range (Artifacts are immune to this Spell). MP Effect: Make a Spell Check against the Save DC of the creature that produced the MP Effect. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the MP the creature spent to produce the MP Effect. Check Success: The MP Effect ends. DC Tip: Monsters that produce an MP Effect are considered to be spending MP up to half their level, rounded up (what their Mana Spend Limit would be). If it's an MP Effect not produced by a creature, the GM determines the DC. Magic Item: Make a Spell Check against the Save DC of the creature that created the Magic Item. Your Check gains a bonus equal to twice the MP you spent on this Spell, and the Save DC gains a bonus equal to twice the item's Magic Power. Check Success: The Magic Item becomes mundane for 24 hours. DC Tip: When determining the Save DC of the item's creator, consider the level a PC must be to produce an MP Effect with enough MP to match the item's Magic Power value. An item with a Magic Power of 3 is equivalent to a 3 MP Spell. A PC must be at least level 5 to have a Mana Spend Limit that allows them to cast a 3 MP Spell. The Save DC of a level 5 PC is 17 (10 + Combat Mastery (1/2 their level, round up) + Prime Modifier (4))."
};

const shadowbind: Spell = {
	id: 'shadowbind',
	name: 'Shadowbind',
	sources: [SpellSource.Arcane, SpellSource.Divine],
	school: SpellSchool.Transmutation,
	tags: ['Doomed', 'Immobilized', 'Shadow', 'Tethered'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You bind a creature using its shadow. Make a Spell Check against the Repeated Charisma Save of a creature within range. Check Success: The target becomes Tethered 1 to their Space.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Arcane, Divine School: Transmutation Tags: Doomed, Immobilized, Shadow, Tethered Cost: 1 AP Range: 10 Spaces Duration: 1 Minute You bind a creature using its shadow. Make a Spell Check against the Repeated Charisma Save of a creature within range. Check Success: The target becomes Tethered 1 to their Space.'
};

const mysticalWeapon: Spell = {
	id: 'mystical-weapon',
	name: 'Mystical Weapon',
	sources: [SpellSource.Divine],
	school: SpellSchool.Conjuration,
	tags: ['Enfeeble', 'Psychic', 'Radiant', 'Umbral', 'Weapon'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a Tiny spectral Weapon that deals a Mystical Damage Type (Psychic, Radiant or Umbral) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Divine School: Conjuration Tags: Enfeeble, Psychic, Radiant, Umbral, Weapon Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You summon a Tiny spectral Weapon that deals a Mystical Damage Type (Psychic, Radiant or Umbral) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
};

const summonCelestial: Spell = {
	id: 'summon-celestial',
	name: 'Summon Celestial',
	sources: [SpellSource.Divine],
	school: SpellSchool.Conjuration,
	tags: ['Celestial', 'Fire', 'Radiant', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Celestial within range for the duration. The creature uses the Summoned Celestial stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Divine Spell School: Conjuration Tags: Celestial, Fire, Radiant, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Celestial within range for the duration. The creature uses the Summoned Celestial stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Celestial | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | -1 | CHA | PM | | AGI | -1 | INT | 0 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Celestial. - Natural Weapon: Choose Fire or Radiant damage when you summon the Celestial. The Celestial gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Celestial: The creature has Radiant Resistance (Half), Blindsight 10 Spaces, and ADV on Charisma Saves. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonFiend: Spell = {
	id: 'summon-fiend',
	name: 'Summon Fiend',
	sources: [SpellSource.Divine],
	school: SpellSchool.Conjuration,
	tags: ['Corrosion', 'Fiend', 'Fire', 'Poison', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Fiend within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Divine Spell School: Conjuration Tags: Corrosion, Fiend, Fire, Poison, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Fiend within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Fiend | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | -1 | CHA | PM | | AGI | -1 | INT | 0 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Fiendish. - Natural Weapon: Choose Fire, Poison or Corrosion damage when you summon the Fiend. The Fiend gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Fiend: The creature has Fire and Corrosion Resistance (Half), and Darkvision 10 Spaces. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonUndead: Spell = {
	id: 'summon-undead',
	name: 'Summon Undead',
	sources: [SpellSource.Divine],
	school: SpellSchool.Conjuration,
	tags: ['Bludgeoning', 'Umbral', 'Undead', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a Small or Medium Sized Undead within range for the duration. Alternatively, you can animate a corpse within range instead, provided it's of a Size you can summon. When you animate a corpse, it becomes an Undead creature of the same Size. The summoned or animated creature uses the Summoned Undead stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a corpse (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Divine Spell School: Conjuration Tags: Bludgeoning, Umbral, Undead, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium Sized Undead within range for the duration. Alternatively, you can animate a corpse within range instead, provided it's of a Size you can summon. When you animate a corpse, it becomes an Undead creature of the same Size. The summoned or animated creature uses the Summoned Undead stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a corpse (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Undead | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | PM | CHA | -1 | | AGI | 1 | INT | -2 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common. If animated, it also knows the Languages its corpse knew. DC Tip: If you animate a corpse, it doesn't retain any memories it had in life. - Natural Weapon: Choose Bludgeoning or Umbral damage when you summon the creature. The creature gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Undead: The creature has Umbral Resistance (Half), Poison and Disease Immunity, and doesn't require air or sleep. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way. ## Expanded Summon Traits Summoned or animated Undead can choose from the following additional Summon Traits: ## Unique Traits (1) Darkvision: The creature gains Darkvision 10 Spaces. (2) Ghostlike: The creature gains Resistance (Half) to Physical Damage and Vulnerability to Radiant Damage. - (2) Incorporeal: The creature can move through solid objects and creatures. If the creature ends its turn inside an object or creature, it takes True damage equal to 25% of its maximum HP. (2) Umbral Immunity: The creature gains Immunity to Umbral Damage. ## Summon Traits Below is a list of repeatable and unique Summon Traits. You can choose repeatable traits multiple times, but unique traits only once. ## Repeatable Traits (1) Attribute Increase: Choose an Attribute. The creature's chosen Attribute changes to equal your Prime Modifier. (1) Health: The creature's HP is increased by 1. (2) Damage: The creature's Attacks deal +1 damage. (1) Defensive: The creature's PD or AD (your choice) becomes equal to your Save DC. (2) Check Mastery: Choose an Attribute. The creature adds your Combat Mastery to Checks it makes using the chosen Attribute. You can only choose this Trait once per Attribute. (1) Speed Increase: The creature's Speed is increased by 2 Spaces. (2) Size Increase: The creature's size increases by 1 (maximum of Huge). (1) Size Decrease: The creature's size decreases by 1 (minimum of Micro). ## Unique Traits (1) Awareness Mastery: The creature adds your Combat Mastery to its Awareness Checks. (1) Distant Link: The range of your Shared Telepathy increases to 100 Spaces, and you always know the exact location of the creature provided you're both on the same plane of existence. (1) Friendly Fire: The creature is Immune to effects and damage you produce, unless you choose otherwise. (1) Natural Weapon Style: You can choose 1 Weapon Style that fits the desired Natural Weapon of the creature. The creature can use the Weapon Enhancement of the chosen Weapon Style with its Natural Weapon. (2) Martial: The creature is able to perform the Opportunity Attack Reaction and is wielding a Weapon of your choice that it's considered to have Training with. DC Tip: This lets them use the Martial Enhancements. (2) Spellcaster: The creature is able to perform the Spell Duel Reaction, is wielding a Spell Focus of your choice that it's considered to have Training with, and knows how to cast 1 Spell of your choice that you know. The creature can spend your MP on its Actions (Spell and Spell Duels)."
};

const scrying: Spell = {
	id: 'scrying',
	name: 'Scrying',
	sources: [SpellSource.Divine],
	school: SpellSchool.Divination,
	tags: ['Knowledge', 'Sense', 'Communication'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: 'Plane of Existence',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"Describe or name a creature and make a Spell Check against the target's Charisma Save. You gain bonuses on your Spell Check as determined by the table below. The bonuses can stack but you can only benefit from each one once. The target becomes aware that they're being scried upon, but not that you're the scryer. Check Success: You conjure an invisible sensor within 2 Spaces of the target, provided it's on the same plane of existence. You can see the target through the sensor which hovers motionlessly and follows them when they move. | Connection | Bonus | |----------------------------------------------------------------------------------------------|---------| | You've touched the target. | +2 | | You possess an item of theirs. | +3 | | You possess a bodily item of theirs (such as a lock of hair, a nail, or some of its blood). | +5 |"
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Divine School: Divination Tags: Knowledge, Sense, Communication Cost: 1 AP + 1 MP Range: Plane of Existence Duration: 1 Minute (Sustained) Describe or name a creature and make a Spell Check against the target's Charisma Save. You gain bonuses on your Spell Check as determined by the table below. The bonuses can stack but you can only benefit from each one once. The target becomes aware that they're being scried upon, but not that you're the scryer. Check Success: You conjure an invisible sensor within 2 Spaces of the target, provided it's on the same plane of existence. You can see the target through the sensor which hovers motionlessly and follows them when they move. | Connection | Bonus | |----------------------------------------------------------------------------------------------|---------| | You've touched the target. | +2 | | You possess an item of theirs. | +3 | | You possess a bodily item of theirs (such as a lock of hair, a nail, or some of its blood). | +5 |"
};

const illuminate: Spell = {
	id: 'illuminate',
	name: 'Illuminate',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Blinded', 'Exposed', 'Light', 'Sense'] as Spell['tags'],
	cost: {
		ap: 2
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to illuminate every creature within a 3 Space diameter Sphere within range. Make a Spell Check contested by the Repeated Charisma Save of each creature in the area. Save Failure: For the duration, the creature emits a 1 Space radius of Dim Light and can't benefit from being Concealed (such as being Invisible)."
		}
	],
	enhancements: [],
	fullDescription:
		"Spell List: Divine, Primal School: Invocation Tags: Blinded, Exposed, Light, Sense Cost: 2 AP Range: 10 Spaces Duration: 1 Minute You attempt to illuminate every creature within a 3 Space diameter Sphere within range. Make a Spell Check contested by the Repeated Charisma Save of each creature in the area. Save Failure: For the duration, the creature emits a 1 Space radius of Dim Light and can't benefit from being Concealed (such as being Invisible)."
};

const revivify: Spell = {
	id: 'revivify',
	name: 'Revivify',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Cleansing', 'Resurrection', 'Spirit'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 2
	},
	range: '1 Space',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to bring a creature back to life. Choose the corpse of a creature that died a maximum of 1 Round ago within range. Make a DC 10 Spell Check. Success: The creature comes back to life with 0 HP (on Death's Door). Success (each 5): They come back with +1 HP. This spell can't return to life a creature that has died of old age nor can it restore any missing body parts. Any afflictions or conditions affecting the creature when it died remain when its brought back to life."
		}
	],
	enhancements: [],
	fullDescription:
		"Spell List: Divine, Primal School: Invocation Tags: Cleansing, Resurrection, Spirit Cost: 1 AP + 2 MP Range: 1 Space Duration: Instantaneous You attempt to bring a creature back to life. Choose the corpse of a creature that died a maximum of 1 Round ago within range. Make a DC 10 Spell Check. Success: The creature comes back to life with 0 HP (on Death's Door). Success (each 5): They come back with +1 HP. This spell can't return to life a creature that has died of old age nor can it restore any missing body parts. Any afflictions or conditions affecting the creature when it died remain when its brought back to life."
};

const enfeeble: Spell = {
	id: 'enfeeble',
	name: 'Enfeeble',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Nullification,
	tags: ['Curse', 'Enfeeble'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You attempt to Curse the Physical or Mental (your choice) Checks and Saves of a creature of your choice within range for the duration. Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Cursed for the duration. While Cursed in this way, the target subtracts a d6 from Checks and Saves (except against this Spell) of the chosen category. The Curse can be removed by any effect that ends a Basic Curse."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Divine, Primal School: Nullification Tags: Curse, Enfeeble Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute You attempt to Curse the Physical or Mental (your choice) Checks and Saves of a creature of your choice within range for the duration. Make a Spell Check against the target's Repeated Charisma Save. Save Failure: The target is Cursed for the duration. While Cursed in this way, the target subtracts a d6 from Checks and Saves (except against this Spell) of the chosen category. The Curse can be removed by any effect that ends a Basic Curse."
};

const enhanceAbility: Spell = {
	id: 'enhance-ability',
	name: 'Enhance Ability',
	sources: [SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Embolden'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You bolster the Physical or Mental (your choice) Checks and Saves of a creature within range for the duration. Make a DC 15 Spell Check. Failure: The target adds a d4 to Checks and Saves of the chosen Attribute category. Success: The target adds a d6 to Checks and Saves of the chosen Attribute category. Success (10): The target adds a d8 instead.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description:
				"You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Full Enhance',
			description:
				"You bolster all the target's Attributes. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement."
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Greater Enhance',
			description:
				'The size of the die granted increases by 1 step (d4 -> d6 -> d8 -> d10 -> d12).',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Divine, Primal School: Transmutation Tags: Embolden Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute You bolster the Physical or Mental (your choice) Checks and Saves of a creature within range for the duration. Make a DC 15 Spell Check. Failure: The target adds a d4 to Checks and Saves of the chosen Attribute category. Success: The target adds a d6 to Checks and Saves of the chosen Attribute category. Success (10): The target adds a d8 instead. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration is increased by 1 step (1 min -> 10 min -> 1 hour -> 8 hours -> Long Rest). Targets: (1 AP + X MP) You can target X additional creatures within range. When you choose this Enhancement, the cost of all other Enhancements (except Range) is doubled. The AP cost of this Enhancement can't be paid for with MP. Full Enhance: (1 MP) You bolster all the target's Attributes. The cost of this Enhancement increases to 2 MP if you use the Targets Enhancement. Greater Enhance: (1 MP, Repeatable) The size of the die granted increases by 1 step (d4 -> d6 -> d8 -> d10 -> d12)."
};

const blessingOfZephyr: Spell = {
	id: 'blessing-of-zephyr',
	name: 'Blessing of Zephyr',
	sources: [SpellSource.Primal],
	school: SpellSchool.Astromancy,
	tags: ['Embolden', 'Motion'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You grant a creature with range a Climb Speed and Jump Distance equal to their Speed for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including jumping) up to their Speed.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Primal School: Astromancy Tags: Embolden, Motion Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes You grant a creature with range a Climb Speed and Jump Distance equal to their Speed for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction (including jumping) up to their Speed.'
};

const elementalWeapon: Spell = {
	id: 'elemental-weapon',
	name: 'Elemental Weapon',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Cold', 'Corrosion', 'Enfeeble', 'Fire', 'Lightning', 'Poison'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"Weapon You summon a Tiny spectral Weapon that deals an Elemental Damage Type (Cold, Corrosion, Fire, Lightning or Poison) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: "The Weapon's damage increases by X.",
			variable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Effortless',
			description:
				'You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Elemental Effect',
			description:
				'Creatures Hit by the weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Cold (Slowed), Corrosion (Hindered), Fire (Burning), Lightning (Stunned), or Poison (Poisoned).'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Enduring Elements',
			description:
				'Creatures attacked by the Weapon must make a Repeated Physical Save. Save Failure: At the start of each of their turns, they take X damage of the chosen Damage Type for 1 minute.',
			variable: true
		}
	],
	fullDescription:
		"Source: Primal School: Conjuration Tags: Cold, Corrosion, Enfeeble, Fire, Lightning, Poison, Weapon Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 1 Minute (Sustained) You summon a Tiny spectral Weapon that deals an Elemental Damage Type (Cold, Corrosion, Fire, Lightning or Poison) of your choice. The Weapon disappears when the Spell ends. Command: Once per Round, when you cast the Spell, Sustain it, or by spending 1 AP on your turn, you can move the Weapon up to 5 Spaces and choose to make a Melee Spell Attack against the PD of a target within 1 Space of the Weapon. Hit: The target takes 2 damage of the chosen Damage Type. Tethered: The Weapon is Tethered to you a distance equal to the Spell's range. If you move farther than the Tethered distance from the Weapon, you drag the Weapon with you. ## Spell Enhancement Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Damage: (X MP) The Weapon's damage increases by X. Effortless: (1 MP) You no longer need to Sustain the Spell and can Command the Weapon for free on your tun. You still can only Command the Weapon once per Round. Elemental Effect: (1 MP) Creatures Hit by the weapon have Vulnerability to an effect based on the chosen Damage Type for 1 Round: Cold (Slowed), Corrosion (Hindered), Fire (Burning), Lightning (Stunned), or Poison (Poisoned). Enduring Elements: (X MP) Creatures attacked by the Weapon must make a Repeated Physical Save. Save Failure: At the start of each of their turns, they take X damage of the chosen Damage Type for 1 minute."
};

const naturesTether: Spell = {
	id: 'natures-tether',
	name: "Nature's Tether",
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Bleeding', 'Motion', 'Plant', 'Restrained', 'Tethered'] as Spell['tags'],
	cost: {
		ap: 1
	},
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You conjure a whip made of vines, web, or some other natural effect that reaches for a target of your choice within range. Creature: If you target a creature, you can take the following Actions against the target: - Pursuit: You pull yourself up to 5 Spaces toward the target. - Pull: Make a Spell Check against the creature's Might Save. Save Failure: You pull them up to 2 Spaces toward you. Save Failure (each 5): You pull them up to 1 additional Space. Object: If you target an object that's not being held or carried, you pull it up to 5 Spaces towards you if it weighs less than you, or you pull yourself up to 5 Spaces towards it if it weighs more than you."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Primal School: Conjuration Tags: Bleeding, Motion, Plant, Restrained, Tethered Cost: 1 AP Range: 10 Spaces Duration: Instantaneous You conjure a whip made of vines, web, or some other natural effect that reaches for a target of your choice within range. Creature: If you target a creature, you can take the following Actions against the target: - Pursuit: You pull yourself up to 5 Spaces toward the target. - Pull: Make a Spell Check against the creature's Might Save. Save Failure: You pull them up to 2 Spaces toward you. Save Failure (each 5): You pull them up to 1 additional Space. Object: If you target an object that's not being held or carried, you pull it up to 5 Spaces towards you if it weighs less than you, or you pull yourself up to 5 Spaces towards it if it weighs more than you."
};

const summonBeast: Spell = {
	id: 'summon-beast',
	name: 'Summon Beast',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Beast', 'Bludgeoning', 'Piercing', 'Slashing', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Beast within range for the duration. The creature uses the Summoned Beast stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Primal Spell School: Conjuration Tags: Beast, Bludgeoning, Piercing, Slashing, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Beast within range for the duration. The creature uses the Summoned Beast stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Beast | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 7 | CM | Shared | | MIG | PM | CHA | -2 | | AGI | 2 | INT | -2 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common but can't speak. - Natural Weapon: Choose Bludgeoning, Piercing, or Slashing damage when you summon the Beast. The Beast gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Beast: The creature has ADV on Awareness, Stealth, and Survival Checks, and gain an additional +2 bonus to Attacks while Flanking a creature. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonElemental: Spell = {
	id: 'summon-elemental',
	name: 'Summon Elemental',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: [
		'Bludgeoning',
		'Cold',
		'Corrosion',
		'Elemental',
		'Fire',
		'Lightning',
		'Piercing',
		'Slashing',
		'Summoning'
	] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Elemental stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Primal Spell School: Conjuration Tags: Bludgeoning, Cold, Corrosion, Elemental, Fire, Lightning, Piercing, Slashing, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Elemental stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Elemental | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | See Traits | CHA | 0 | | AGI | See Traits | INT | 0 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Elemental. - Natural Weapon: The Elemental gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of a type depending on which Elemental type they are (see below). ## Elemental Trait When you summon the elemental you choose Air, Earth, Water, or Fire, the elemental gains the below trait corresponding to the type chosen: - Air: The creature has Lightning Resistance (Half), +5 Jump Distance, and can hold its breath indefinitely. The creature has an Agility equal to your Prime Modifier, a Might of 1 and their Natural Weapon deals Lightning or Slashing damage (chosen when you summon the Elemental). - Earth: The creature has PDR, a Burrow Speed equal to its Speed, and Tremorsense 3 Spaces. The creature has a Might equal to your Prime Modifier, an Agility of 1, and their Natural Weapon deals Bludgeoning or Piercing damage (chosen when you summon the elemental). - Fire: The creature has Fire Resistance (Half), automatically deals 1 Fire damage to creatures within 1 Space that Hit it with a Melee Attack, and can emit 5 Space of Bright Light at will. The creature has an Agility equal to your Prime Modifier, a Might of 1, and their Natural Weapon deals Fire damage. - Water: The creature has Cold and Corrosion Resistance (Half), a Swim Speed equal to its Speed, and can breath underwater. The creature has a Might equal to your Prime Modifier, an Agility of 1, and their Natural Weapon deals Cold or Corrosion damage (chosen when you summon the Elemental). ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonFey: Spell = {
	id: 'summon-fey',
	name: 'Summon Fey',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Fey', 'Psychic', 'Slashing', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				'You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Primal Spell School: Conjuration Tags: Fey, Psychic, Slashing, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium sized Elemental within range for the duration. The creature uses the Summoned Fey stat block. Spell End: The Spell ends early if all summoned creatures are reduced to 0 HP. When a creature summoned by this Spell is reduced to 0 HP, its body disappears. Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Fey | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | -2 | CHA | 0 | | AGI | PM | INT | 0 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Fey. - Natural Weapon: Choose a Psychic or Slashing damage when you summon the Fey. The Fey gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Fey: The creature has ADV on Trickery and Intimidation Checks, and ADV on Saves against MP Effects. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const summonPlant: Spell = {
	id: 'summon-plant',
	name: 'Summon Plant',
	sources: [SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Bludgeoning', 'Plants', 'Piercing', 'Poison', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 Minutes (Sustained)',
	sustained: true,
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a Small or Medium Sized Plant within range for the duration. Alternatively, you can animate a plant within range instead, provided it's of a Size you can summon. When you animate a plant, it becomes a Plant creature of the same Size. The summoned or animated creature uses the Summoned Plant stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a plant (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one."
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Range',
			description:
				'The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Duration',
			description:
				'The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest).',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Additional Creature',
			description: 'You summon 1 additional creature.',
			repeatable: true
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				'You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way.',
			repeatable: true
		}
	],
	fullDescription:
		"Source: Primal Spell School: Conjuration Tags: Bludgeoning, Plants, Piercing, Poison, Summoning Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 Minutes (Sustained) You summon a Small or Medium Sized Plant within range for the duration. Alternatively, you can animate a plant within range instead, provided it's of a Size you can summon. When you animate a plant, it becomes a Plant creature of the same Size. The summoned or animated creature uses the Summoned Plant stat block. Spell End: The Spell ends early if all summoned or animated creatures are reduced to 0 HP. When a creature summoned or animated by this Spell is reduced to 0 HP, its body disappears (if summoned) or returns to being a plant (if animated). Recasting the Spell: When you cast this Spell again and choose to summon a creature, you can choose a creature you previously summoned or a new one. ## Summoned Plant | HP | 3 | AP | 2 | |-------|-------------|---------|-------------| | PD | 8 + CM + PM | AD | 8 + CM + PM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | PM | CHA | -2 | | AGI | 2 | INT | -2 | DC Tip: The Summon shares your Prime Modifier and Combat Mastery so its Attack, Martial, and Spell Checks are the same as yours. ## Base Summon Traits The summoned creature has the following Summon Traits: - Shared Telepathy: While within 20 Spaces, you and the summoned creature can speak Telepathically with each other. - Languages: The creature is Fluent in Common and Fey but can't speak. - Natural Weapon: Choose a Bludgeoning, Piercing or Poison damage when you summon the Plant. The Plant gains a Natural Weapon that they can use to make an Unarmed Strike that deals 1 damage of the chosen damage type. - Plant: The creature has Poison Resistance (Half), Bleeding Immunity, and ignores Difficult Terrain. ## Managing the Summons The creature shares your Initiative, acting on your turn. You can command it to take any Actions or Reactions available to it (except the Sustain Action), but must spend its own AP to do so. When you take the Move Action, the creature also gains the benefits of the Move Action. If you don't command it, it takes the Dodge Action. ## Spell Enhancements Range: (1 AP, Repeatable) The range of the Spell increases by 5 Spaces. You can use this Enhancement a maximum of two times. Duration: (1 MP, Repeatable) The duration of the Spell increases by 1 step (10 minutes -> 1 hour -> 8 hours -> Long Rest). Additional Creature: (2 MP, Repeatable) You summon 1 additional creature. Additional Traits: (1 MP, Repeatable) You can grant 2 points worth of Summon Traits (see Summon Traits after the Summon Spells) to a creature you summon with the casting of this Spell, or 1 point worth of Summon Traits to 2 creatures you summon in this way."
};

const spikeCluster: Spell = {
	id: 'spike-cluster',
	name: 'Spike Cluster',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Earth', 'Immobilized', 'Impaired', 'Piercing', 'Plants'] as Spell['tags'],
	cost: {
		ap: 2
	},
	range: '10 Spaces',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You produce an explosion of spikes or thorns that envelops a 3 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage. Close Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Primal School: Elemental Tags: Earth, Immobilized, Impaired, Piercing, Plants Cost: 2 AP Range: 10 Spaces Duration: Instantaneous You produce an explosion of spikes or thorns that envelops a 3 Space diameter Sphere within range. Make an Area Spell Attack against the AD of every target within the area. Hit: The target takes 1 Piercing damage. Close Quarters Penalty: You have DisADV on the Attack if you're within the Melee Range of at least 1 enemy, unless that enemy is Incapacitated."
};

const wallOfEarth: Spell = {
	id: 'wall-of-earth',
	name: 'Wall of Earth',
	sources: [SpellSource.Primal],
	school: SpellSchool.Elemental,
	tags: ['Earth', 'Motion', 'Summoning'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 1
	},
	range: '10 Spaces',
	duration: '1 Minute',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You create a 5 Space long, 2 Space high Wall of earth within range. Medium Size or smaller creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Wall (you choose for each object). Large Size or larger creatures or objects prevent the Wall from forming in their Space. The Wall is a solid surface that provides Full Cover. Each Space within the Wall has 1 HP, an AD and PD equal to your Save DC, Slashing Resistance (Half), and Poison and Psychic Immunity. Each Space of the Wall can be broken if it is reduced to 0 HP. When a Space of Wall is broken, all Spaces above that Space are also broken, and the Space becomes Difficult Terrain until a creature spends 1 AP to clear it. Wall Slam: When you cast the Spell, or by spending 1 AP, you can cause the Wall to move 2 Spaces horizontally in a direction of your choice in either of its facing directions. Make a Spell Check against the Might Save of each creature within the area the Wall moves. Save Failure: They're pushed with the Wall in the direction it moves. Save Success: They aren't moved and they prevent any Spaces of the Wall that make contact with them from moving past their Space. After moving the Wall in this way, it breaks, and each Space it moved through becomes Difficult Terrain until a creature spends 1 AP to clear it. Spell Ends: When the Spell ends, the Wall remains but you can no longer use Wall Slam."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Primal School: Elemental Tags: Earth, Motion, Summoning Cost: 2 AP + 1 MP Range: 10 Spaces Duration: 1 Minute You create a 5 Space long, 2 Space high Wall of earth within range. Medium Size or smaller creatures and objects within the area are pushed to nearest unoccupied Space of their choice on either side of the Wall (you choose for each object). Large Size or larger creatures or objects prevent the Wall from forming in their Space. The Wall is a solid surface that provides Full Cover. Each Space within the Wall has 1 HP, an AD and PD equal to your Save DC, Slashing Resistance (Half), and Poison and Psychic Immunity. Each Space of the Wall can be broken if it is reduced to 0 HP. When a Space of Wall is broken, all Spaces above that Space are also broken, and the Space becomes Difficult Terrain until a creature spends 1 AP to clear it. Wall Slam: When you cast the Spell, or by spending 1 AP, you can cause the Wall to move 2 Spaces horizontally in a direction of your choice in either of its facing directions. Make a Spell Check against the Might Save of each creature within the area the Wall moves. Save Failure: They're pushed with the Wall in the direction it moves. Save Success: They aren't moved and they prevent any Spaces of the Wall that make contact with them from moving past their Space. After moving the Wall in this way, it breaks, and each Space it moved through becomes Difficult Terrain until a creature spends 1 AP to clear it. Spell Ends: When the Spell ends, the Wall remains but you can no longer use Wall Slam."
};

const healingWave: Spell = {
	id: 'healing-wave',
	name: 'Healing Wave',
	sources: [SpellSource.Primal],
	school: SpellSchool.Invocation,
	tags: ['Healing', 'Cleansing'] as Spell['tags'],
	cost: {
		ap: 2,
		mp: 1
	},
	range: 'Self',
	duration: 'Instantaneous',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				'You release a wave of healing energy in a 3 Space Aura. Make a DC 20 Spell Check. Failure: Each creature of your choice in the area regains 1 HP. Success: Each creature of your choice regains 2 HP. Success (Each 5): +1 HP.'
		}
	],
	enhancements: [],
	fullDescription:
		'Source: Primal School: Invocation Tags: Healing, Cleansing Cost: 2 AP + 1 MP Range: Self Duration: Instantaneous You release a wave of healing energy in a 3 Space Aura. Make a DC 20 Spell Check. Failure: Each creature of your choice in the area regains 1 HP. Success: Each creature of your choice regains 2 HP. Success (Each 5): +1 HP.'
};

const blessingOfWater: Spell = {
	id: 'blessing-of-water',
	name: 'Blessing of Water',
	sources: [SpellSource.Primal],
	school: SpellSchool.Transmutation,
	tags: ['Embolden', 'Metamorphosis', 'Motion', 'Water'] as Spell['tags'],
	cost: {
		ap: 1,
		mp: 1
	},
	range: '10 Spaces',
	duration: '10 minutes',
	sustained: false,
	effects: [
		{
			title: 'Effect',
			description:
				"You grant a creature with range a Swim Speed, the ability to breathe underwater, and Tremorsense 5 Spaces while underwater for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they're moving in water."
		}
	],
	enhancements: [],
	fullDescription:
		"Source: Primal School: Transmutation Tags: Embolden, Metamorphosis, Motion, Water Cost: 1 AP + 1 MP Range: 10 Spaces Duration: 10 minutes You grant a creature with range a Swim Speed, the ability to breathe underwater, and Tremorsense 5 Spaces while underwater for the duration. Spell Cast: When you cast the Spell, make a DC 15 Spell Check. Success: The target can immediately move in any direction up to their Speed, provided they're moving in water."
};

const LEGACY_REPLACED_SPELL_IDS = new Set([
	'summon-familiar',
	'fly',
	'force-dome',
	'wall-of-force',
	'vicious-mockery',
	'toxic-aura',
	'earth-blessing',
	'gravity-sink-hole',
	'gravity-sinkhole'
]);

const REMOVED_SPELL_IDS = new Set([
	'radiant-beam',
	'wind-blessing',
	'acid-rain',
	'lightning-cloud',
	'poison-cloud'
]);

const SOURCE_OVERRIDES: Record<string, SpellSource[]> = {
	'mass-heal': [SpellSource.Divine],
	darkness: [SpellSource.Arcane, SpellSource.Divine]
};

export const V0105_SPELLS: Spell[] = [
	callFamiliar,
	blessingOfAir,
	mockery,
	toxicBurst,
	blessingOfEarth,
	gravityWell,
	forcefield,
	gravityShift,
	increaseGravity,
	reduceInertia,
	timeStop,
	arcaneWeapon,
	illusoryDuplicate,
	illusoryWriting,
	summonAberration,
	summonConstruct,
	summonDragon,
	summonOoze,
	dangerSense,
	detectMagic,
	foresight,
	locateTarget,
	lightningRod,
	moldEarth,
	confusion,
	dispelMagic,
	shadowbind,
	mysticalWeapon,
	summonCelestial,
	summonFiend,
	summonUndead,
	scrying,
	illuminate,
	revivify,
	enfeeble,
	enhanceAbility,
	blessingOfZephyr,
	elementalWeapon,
	naturesTether,
	summonBeast,
	summonElemental,
	summonFey,
	summonPlant,
	spikeCluster,
	wallOfEarth,
	healingWave,
	blessingOfWater
];

export function applyV0105SpellCatalog(baseSpells: Spell[]): Spell[] {
	const catalog = new Map<string, Spell>();

	for (const spell of baseSpells) {
		if (LEGACY_REPLACED_SPELL_IDS.has(spell.id) || REMOVED_SPELL_IDS.has(spell.id)) continue;

		const sourceOverride = SOURCE_OVERRIDES[spell.id];
		catalog.set(spell.id, sourceOverride ? { ...spell, sources: sourceOverride } : spell);
	}

	for (const spell of V0105_SPELLS) {
		catalog.set(spell.id, spell);
	}

	return Array.from(catalog.values());
}
