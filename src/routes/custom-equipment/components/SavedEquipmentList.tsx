/**
 * @file Saved Equipment List Component
 */

import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
	getAllCustomWeapons,
	getAllCustomArmor,
	getAllCustomShields,
	getAllCustomSpellFocuses,
	deleteCustomWeapon,
	deleteCustomArmor,
	deleteCustomShield,
	deleteCustomSpellFocus,
	exportEquipmentToJson,
	importEquipmentFromJson
} from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type { CustomWeapon } from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import type { CustomArmor } from '../../../lib/rulesdata/equipment/schemas/armorSchema';
import type { CustomShield } from '../../../lib/rulesdata/equipment/schemas/shieldSchema';
import type { CustomSpellFocus } from '../../../lib/rulesdata/equipment/schemas/spellFocusSchema';
import {
	SectionTitle,
	SavedItemsList,
	SavedItemCard,
	TabContainer,
	Tab,
	PresetBadge,
	ActionButtons
} from '../styles/CustomEquipment.styles';

type FilterType = 'all' | 'weapon' | 'armor' | 'shield' | 'spellFocus';

const SavedEquipmentList: React.FC = () => {
	const [filter, setFilter] = useState<FilterType>('all');
	const [weapons, setWeapons] = useState<CustomWeapon[]>([]);
	const [armor, setArmor] = useState<CustomArmor[]>([]);
	const [shields, setShields] = useState<CustomShield[]>([]);
	const [spellFocuses, setSpellFocuses] = useState<CustomSpellFocus[]>([]);
	const [importError, setImportError] = useState<string | null>(null);

	const loadData = () => {
		setWeapons(getAllCustomWeapons());
		setArmor(getAllCustomArmor());
		setShields(getAllCustomShields());
		setSpellFocuses(getAllCustomSpellFocuses());
	};

	useEffect(() => {
		loadData();
	}, []);

	const handleDeleteWeapon = (id: string) => {
		if (confirm('Are you sure you want to delete this weapon?')) {
			deleteCustomWeapon(id);
			loadData();
		}
	};

	const handleDeleteArmor = (id: string) => {
		if (confirm('Are you sure you want to delete this armor?')) {
			deleteCustomArmor(id);
			loadData();
		}
	};

	const handleDeleteShield = (id: string) => {
		if (confirm('Are you sure you want to delete this shield?')) {
			deleteCustomShield(id);
			loadData();
		}
	};

	const handleDeleteSpellFocus = (id: string) => {
		if (confirm('Are you sure you want to delete this spell focus?')) {
			deleteCustomSpellFocus(id);
			loadData();
		}
	};

	const handleExport = () => {
		const json = exportEquipmentToJson();
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `custom-equipment-${new Date().toISOString().split('T')[0]}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			const result = importEquipmentFromJson(content);
			if (result.success) {
				loadData();
				setImportError(null);
			} else {
				setImportError(result.error || 'Failed to import');
			}
		};
		reader.readAsText(file);
		// Reset input
		event.target.value = '';
	};

	const totalCount = weapons.length + armor.length + shields.length + spellFocuses.length;

	const renderWeaponCard = (weapon: CustomWeapon) => (
		<SavedItemCard key={weapon.id}>
			<div className="mb-2 flex items-start justify-between">
				<div>
					<h3 className="font-semibold text-white">
						{weapon.name}
						{weapon.isPreset && <PresetBadge>Preset</PresetBadge>}
					</h3>
					<div className="text-sm text-gray-400">
						{weapon.weaponType === 'ranged' ? 'Ranged' : 'Melee'} • {weapon.style}
						{weapon.secondaryStyle && ` / ${weapon.secondaryStyle}`}
					</div>
				</div>
				<Badge variant="outline">⚔️ Weapon</Badge>
			</div>
			<div className="mb-2 flex flex-wrap gap-2 text-xs">
				<Badge variant="secondary">{weapon.finalDamage} {weapon.damageType}</Badge>
				<Badge variant="secondary">Range: {weapon.range}</Badge>
			</div>
			<div className="mb-3 flex flex-wrap gap-1">
				{weapon.properties.slice(0, 4).map((prop) => (
					<Badge key={prop} variant="outline" className="text-xs">
						{prop}
					</Badge>
				))}
				{weapon.properties.length > 4 && (
					<span className="text-xs text-gray-500">+{weapon.properties.length - 4}</span>
				)}
			</div>
			<div className="flex justify-end">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => handleDeleteWeapon(weapon.id)}
					className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
				>
					Delete
				</Button>
			</div>
		</SavedItemCard>
	);

	const renderArmorCard = (item: CustomArmor) => (
		<SavedItemCard key={item.id}>
			<div className="mb-2 flex items-start justify-between">
				<div>
					<h3 className="font-semibold text-white">
						{item.name}
						{item.isPreset && <PresetBadge>Preset</PresetBadge>}
					</h3>
					<div className="text-sm text-gray-400">
						{item.armorType === 'heavy' ? 'Heavy' : 'Light'} Armor
					</div>
				</div>
				<Badge variant="outline">🛡️ Armor</Badge>
			</div>
			<div className="mb-3 flex flex-wrap gap-2 text-xs">
				{item.pdBonus > 0 && <Badge variant="secondary">PD +{item.pdBonus}</Badge>}
				{item.adBonus > 0 && <Badge variant="secondary">AD +{item.adBonus}</Badge>}
				{item.hasPdr && <Badge variant="secondary">PDR</Badge>}
				{item.hasEdr && <Badge variant="secondary">EDR</Badge>}
			</div>
			<div className="flex justify-end">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => handleDeleteArmor(item.id)}
					className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
				>
					Delete
				</Button>
			</div>
		</SavedItemCard>
	);

	const renderShieldCard = (item: CustomShield) => (
		<SavedItemCard key={item.id}>
			<div className="mb-2 flex items-start justify-between">
				<div>
					<h3 className="font-semibold text-white">
						{item.name}
						{item.isPreset && <PresetBadge>Preset</PresetBadge>}
					</h3>
					<div className="text-sm text-gray-400">
						{item.shieldType === 'heavy' ? 'Heavy' : 'Light'} Shield
					</div>
				</div>
				<Badge variant="outline">🔰 Shield</Badge>
			</div>
			<div className="mb-2 flex flex-wrap gap-2 text-xs">
				{item.pdBonus > 0 && <Badge variant="secondary">PD +{item.pdBonus}</Badge>}
				{item.adBonus > 0 && <Badge variant="secondary">AD +{item.adBonus}</Badge>}
				{item.hasPdr && <Badge variant="secondary">PDR</Badge>}
				{item.hasEdr && <Badge variant="secondary">EDR</Badge>}
			</div>
			<div className="mb-3 flex flex-wrap gap-1">
				{item.properties.map((prop) => (
					<Badge key={prop} variant="outline" className="text-xs">
						{prop}
					</Badge>
				))}
			</div>
			<div className="flex justify-end">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => handleDeleteShield(item.id)}
					className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
				>
					Delete
				</Button>
			</div>
		</SavedItemCard>
	);

	const renderSpellFocusCard = (item: CustomSpellFocus) => (
		<SavedItemCard key={item.id}>
			<div className="mb-2 flex items-start justify-between">
				<div>
					<h3 className="font-semibold text-white">
						{item.name}
						{item.isPreset && <PresetBadge>Preset</PresetBadge>}
					</h3>
					<div className="text-sm text-gray-400">
						{item.hands === 'two-handed' ? 'Two-Handed' : 'One-Handed'} Focus
					</div>
				</div>
				<Badge variant="outline">🔮 Focus</Badge>
			</div>
			<div className="mb-3 flex flex-wrap gap-2 text-xs">
				{item.spellCheckBonus > 0 && <Badge variant="secondary">Spell Check +{item.spellCheckBonus}</Badge>}
				{item.spellAttackBonus > 0 && <Badge variant="secondary">Spell Attack +{item.spellAttackBonus}</Badge>}
				{item.spellDamageBonus > 0 && <Badge variant="secondary">Spell Damage +{item.spellDamageBonus}</Badge>}
				{item.adBonus > 0 && <Badge variant="secondary">AD +{item.adBonus}</Badge>}
				{item.hasMdr && <Badge variant="secondary">MDR</Badge>}
				{item.hasCloseQuarters && <Badge variant="secondary">Close Quarters</Badge>}
				{item.longRangeBonus > 0 && <Badge variant="secondary">Long Range +{item.longRangeBonus}</Badge>}
			</div>
			<div className="flex justify-end">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => handleDeleteSpellFocus(item.id)}
					className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
				>
					Delete
				</Button>
			</div>
		</SavedItemCard>
	);

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<SectionTitle className="mb-0 border-0 pb-0">
					Saved Equipment ({totalCount})
				</SectionTitle>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={handleExport} disabled={totalCount === 0}>
						Export All
					</Button>
					<label>
						<input
							type="file"
							accept=".json"
							onChange={handleImport}
							className="hidden"
						/>
						<Button variant="outline" size="sm" asChild>
							<span className="cursor-pointer">Import</span>
						</Button>
					</label>
				</div>
			</div>

			{importError && (
				<div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-400">
					Import Error: {importError}
				</div>
			)}

			{/* Filter Tabs */}
			<TabContainer>
				<Tab $active={filter === 'all'} onClick={() => setFilter('all')}>
					All ({totalCount})
				</Tab>
				<Tab $active={filter === 'weapon'} onClick={() => setFilter('weapon')}>
					Weapons ({weapons.length})
				</Tab>
				<Tab $active={filter === 'armor'} onClick={() => setFilter('armor')}>
					Armor ({armor.length})
				</Tab>
				<Tab $active={filter === 'shield'} onClick={() => setFilter('shield')}>
					Shields ({shields.length})
				</Tab>
				<Tab $active={filter === 'spellFocus'} onClick={() => setFilter('spellFocus')}>
					Spell Focuses ({spellFocuses.length})
				</Tab>
			</TabContainer>

			{totalCount === 0 ? (
				<div className="py-12 text-center">
					<div className="mb-4 text-4xl">📦</div>
					<h3 className="mb-2 text-xl text-gray-300">No Saved Equipment</h3>
					<p className="text-gray-500">
						Create custom equipment using the "Create New" tab to see them here.
					</p>
				</div>
			) : (
				<SavedItemsList>
					{(filter === 'all' || filter === 'weapon') && weapons.map(renderWeaponCard)}
					{(filter === 'all' || filter === 'armor') && armor.map(renderArmorCard)}
					{(filter === 'all' || filter === 'shield') && shields.map(renderShieldCard)}
					{(filter === 'all' || filter === 'spellFocus') && spellFocuses.map(renderSpellFocusCard)}
				</SavedItemsList>
			)}
		</div>
	);
};

export default SavedEquipmentList;
