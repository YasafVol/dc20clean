/** Curated, product-embedded assets. IDs are saved in equipment, inventory, and monsters. */
export interface ArtAsset {
	id: string;
	name: string;
	kind: 'item' | 'creature';
	category: string;
	pack: 'heroic-icons' | 'heroic-creatures' | 'monsters-minions';
	src: string;
}

export const ART_ASSETS: ArtAsset[] = [
	{
		id: 'icon-cape-01',
		name: 'Cape 1',
		kind: 'item',
		category: 'Cape',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-cape-01.png'
	},
	{
		id: 'icon-cape-02',
		name: 'Cape 2',
		kind: 'item',
		category: 'Cape',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-cape-02.png'
	},
	{
		id: 'icon-feet-01',
		name: 'Boots 1',
		kind: 'item',
		category: 'Boots',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-feet-01.png'
	},
	{
		id: 'icon-feet-02',
		name: 'Boots 2',
		kind: 'item',
		category: 'Boots',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-feet-02.png'
	},
	{
		id: 'icon-gauntlet-01',
		name: 'Gauntlet 1',
		kind: 'item',
		category: 'Gauntlet',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-gauntlet-01.png'
	},
	{
		id: 'icon-gauntlet-02',
		name: 'Gauntlet 2',
		kind: 'item',
		category: 'Gauntlet',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-gauntlet-02.png'
	},
	{
		id: 'icon-helmet-01',
		name: 'Helmet 1',
		kind: 'item',
		category: 'Helmet',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-helmet-01.png'
	},
	{
		id: 'icon-helmet-02',
		name: 'Helmet 2',
		kind: 'item',
		category: 'Helmet',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-helmet-02.png'
	},
	{
		id: 'icon-leg-01',
		name: 'Leg 1',
		kind: 'item',
		category: 'Leg',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-leg-01.png'
	},
	{
		id: 'icon-leg-02',
		name: 'Leg 2',
		kind: 'item',
		category: 'Leg',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-leg-02.png'
	},
	{
		id: 'icon-necklace-01',
		name: 'Necklace 1',
		kind: 'item',
		category: 'Necklace',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-necklace-01.png'
	},
	{
		id: 'icon-necklace-02',
		name: 'Necklace 2',
		kind: 'item',
		category: 'Necklace',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-necklace-02.png'
	},
	{
		id: 'icon-ring-01',
		name: 'Ring 1',
		kind: 'item',
		category: 'Ring',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-ring-01.png'
	},
	{
		id: 'icon-ring-02',
		name: 'Ring 2',
		kind: 'item',
		category: 'Ring',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-ring-02.png'
	},
	{
		id: 'icon-shield-01',
		name: 'Shield 1',
		kind: 'item',
		category: 'Shield',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-shield-01.png'
	},
	{
		id: 'icon-shield-02',
		name: 'Shield 2',
		kind: 'item',
		category: 'Shield',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-shield-02.png'
	},
	{
		id: 'icon-torso-01',
		name: 'Torso 1',
		kind: 'item',
		category: 'Torso',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-torso-01.png'
	},
	{
		id: 'icon-torso-02',
		name: 'Torso 2',
		kind: 'item',
		category: 'Torso',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-torso-02.png'
	},
	{
		id: 'icon-axe-01',
		name: 'Axe 1',
		kind: 'item',
		category: 'Axe',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-axe-01.png'
	},
	{
		id: 'icon-axe-02',
		name: 'Axe 2',
		kind: 'item',
		category: 'Axe',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-axe-02.png'
	},
	{
		id: 'icon-dagger-01',
		name: 'Dagger 1',
		kind: 'item',
		category: 'Dagger',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-dagger-01.png'
	},
	{
		id: 'icon-dagger-02',
		name: 'Dagger 2',
		kind: 'item',
		category: 'Dagger',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-dagger-02.png'
	},
	{
		id: 'icon-mace-01',
		name: 'Mace 1',
		kind: 'item',
		category: 'Mace',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-mace-01.png'
	},
	{
		id: 'icon-mace-02',
		name: 'Mace 2',
		kind: 'item',
		category: 'Mace',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-mace-02.png'
	},
	{
		id: 'icon-ranged-01',
		name: 'Ranged 1',
		kind: 'item',
		category: 'Ranged',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-ranged-01.png'
	},
	{
		id: 'icon-ranged-02',
		name: 'Ranged 2',
		kind: 'item',
		category: 'Ranged',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-ranged-02.png'
	},
	{
		id: 'icon-spear-01',
		name: 'Spear 1',
		kind: 'item',
		category: 'Spear',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-spear-01.png'
	},
	{
		id: 'icon-spear-02',
		name: 'Spear 2',
		kind: 'item',
		category: 'Spear',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-spear-02.png'
	},
	{
		id: 'icon-staff-01',
		name: 'Staff 1',
		kind: 'item',
		category: 'Staff',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-staff-01.png'
	},
	{
		id: 'icon-staff-02',
		name: 'Staff 2',
		kind: 'item',
		category: 'Staff',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-staff-02.png'
	},
	{
		id: 'icon-sword-01',
		name: 'Sword 1',
		kind: 'item',
		category: 'Sword',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-sword-01.png'
	},
	{
		id: 'icon-sword-02',
		name: 'Sword 2',
		kind: 'item',
		category: 'Sword',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-sword-02.png'
	},
	{
		id: 'icon-arrow-01',
		name: 'Arrow 1',
		kind: 'item',
		category: 'Arrow',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-arrow-01.png'
	},
	{
		id: 'icon-arrow-02',
		name: 'Arrow 2',
		kind: 'item',
		category: 'Arrow',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-arrow-02.png'
	},
	{
		id: 'icon-artifact-01',
		name: 'Artifact 1',
		kind: 'item',
		category: 'Artifact',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-artifact-01.png'
	},
	{
		id: 'icon-artifact-02',
		name: 'Artifact 2',
		kind: 'item',
		category: 'Artifact',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-artifact-02.png'
	},
	{
		id: 'icon-book-01',
		name: 'Book 1',
		kind: 'item',
		category: 'Book',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-book-01.png'
	},
	{
		id: 'icon-book-02',
		name: 'Book 2',
		kind: 'item',
		category: 'Book',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-book-02.png'
	},
	{
		id: 'icon-key-01',
		name: 'Key 1',
		kind: 'item',
		category: 'Key',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-key-01.png'
	},
	{
		id: 'icon-key-02',
		name: 'Key 2',
		kind: 'item',
		category: 'Key',
		pack: 'heroic-icons',
		src: '/assets/curated/heroic-icons/icon-key-02.png'
	},
	{
		id: 'heroic-creature-castle-griffin',
		name: 'Griffin',
		kind: 'creature',
		category: 'Castle',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-castle-griffin.png'
	},
	{
		id: 'heroic-creature-castle-paladin',
		name: 'Paladin',
		kind: 'creature',
		category: 'Castle',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-castle-paladin.png'
	},
	{
		id: 'heroic-creature-castle-angel',
		name: 'Angel',
		kind: 'creature',
		category: 'Castle',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-castle-angel.png'
	},
	{
		id: 'heroic-creature-dark-bastion-demon',
		name: 'Demon',
		kind: 'creature',
		category: 'Dark Bastion',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-dark-bastion-demon.png'
	},
	{
		id: 'heroic-creature-dark-bastion-hell-hound',
		name: 'Hell Hound',
		kind: 'creature',
		category: 'Dark Bastion',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-dark-bastion-hell-hound.png'
	},
	{
		id: 'heroic-creature-necropolis-lich',
		name: 'Lich',
		kind: 'creature',
		category: 'Necropolis',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-necropolis-lich.png'
	},
	{
		id: 'heroic-creature-necropolis-skeleton',
		name: 'Skeleton',
		kind: 'creature',
		category: 'Necropolis',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-necropolis-skeleton.png'
	},
	{
		id: 'heroic-creature-stronghold-cyclop',
		name: 'Cyclop',
		kind: 'creature',
		category: 'Stronghold',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-stronghold-cyclop.png'
	},
	{
		id: 'heroic-creature-stronghold-goblin',
		name: 'Goblin',
		kind: 'creature',
		category: 'Stronghold',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-stronghold-goblin.png'
	},
	{
		id: 'heroic-creature-wizards-golem',
		name: 'Golem',
		kind: 'creature',
		category: 'Wizards',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-wizards-golem.png'
	},
	{
		id: 'heroic-creature-wizards-naga',
		name: 'Naga',
		kind: 'creature',
		category: 'Wizards',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-wizards-naga.png'
	},
	{
		id: 'heroic-creature-great-elf-treant',
		name: 'Treant',
		kind: 'creature',
		category: 'Great Elf',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-great-elf-treant.png'
	},
	{
		id: 'heroic-creature-great-elf-deer',
		name: 'Deer',
		kind: 'creature',
		category: 'Great Elf',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-great-elf-deer.png'
	},
	{
		id: 'heroic-creature-elementals-fire-elemental',
		name: 'Fire Elemental',
		kind: 'creature',
		category: 'Elementals',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-elementals-fire-elemental.png'
	},
	{
		id: 'heroic-creature-elementals-ice-elemental',
		name: 'Ice Elemental',
		kind: 'creature',
		category: 'Elementals',
		pack: 'heroic-creatures',
		src: '/assets/curated/heroic-creatures/heroic-creature-elementals-ice-elemental.png'
	},
	{
		id: 'beowulf-boss-01',
		name: 'Boss 01',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-01.png'
	},
	{
		id: 'beowulf-boss-02',
		name: 'Boss 02',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-02.png'
	},
	{
		id: 'beowulf-boss-03',
		name: 'Boss 03',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-03.png'
	},
	{
		id: 'beowulf-boss-04',
		name: 'Naga',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-04.png'
	},
	{
		id: 'beowulf-boss-05',
		name: 'Boss 05',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-05.png'
	},
	{
		id: 'beowulf-boss-06',
		name: 'Boss 06',
		kind: 'creature',
		category: 'Bosses',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-boss-06.png'
	},
	{
		id: 'beowulf-minion-01-01',
		name: 'Minion 01-01',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-01-01.png'
	},
	{
		id: 'beowulf-minion-01-02',
		name: 'Minion 01-02',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-01-02.png'
	},
	{
		id: 'beowulf-minion-01-03',
		name: 'Minion 01-03',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-01-03.png'
	},
	{
		id: 'beowulf-minion-01-04',
		name: 'Minion 01-04',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-01-04.png'
	},
	{
		id: 'beowulf-minion-02-01',
		name: 'Dire Cactus',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-02-01.png'
	},
	{
		id: 'beowulf-minion-02-02',
		name: 'Minion 02-02',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-02-02.png'
	},
	{
		id: 'beowulf-minion-03-01',
		name: 'Minion 03-01',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-03-01.png'
	},
	{
		id: 'beowulf-minion-04-01',
		name: 'Purple Snake',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-04-01.png'
	},
	{
		id: 'beowulf-minion-05-01',
		name: 'Frog Monster',
		kind: 'creature',
		category: 'Minions',
		pack: 'monsters-minions',
		src: '/assets/curated/monsters-minions/beowulf-minion-05-01.png'
	}
];

const ASSETS_BY_ID = new Map(ART_ASSETS.map((asset) => [asset.id, asset]));

export function getArtAsset(id?: string): ArtAsset | undefined {
	return id ? ASSETS_BY_ID.get(id) : undefined;
}
