/**
 * @file Custom Equipment Main Page
 * Entry point for the custom equipment builder mini-app
 */

import React, { useState } from 'react';
import { Backpack, Focus, Shield, Shirt, Swords } from 'lucide-react';
import { EQUIPMENT_CATEGORIES, type EquipmentCategory } from '../../lib/rulesdata/equipment';
import { useTranslation } from 'react-i18next';
import {
	PageContainer,
	Header,
	HeaderContent,
	Title,
	Subtitle,
	MainContent,
	CategoryGrid,
	CategoryCard,
	CategoryIcon,
	CategoryTitle,
	CategoryDescription,
	CategoryPrompt,
	PrimaryTabContainer,
	Tab
} from './styles/CustomEquipment.styles';
import WeaponBuilder from './components/WeaponBuilder';
import ArmorBuilder from './components/ArmorBuilder';
import ShieldBuilder from './components/ShieldBuilder';
import SpellFocusBuilder from './components/SpellFocusBuilder';
import GeneralEquipmentBuilder from './components/GeneralEquipmentBuilder';
import SavedEquipmentList from './components/SavedEquipmentList';
import type { CustomEquipment as CustomEquipmentData } from '../../lib/rulesdata/equipment/schemas';

const CATEGORY_ICONS: Record<EquipmentCategory, React.ElementType> = {
	weapon: Swords,
	armor: Shirt,
	shield: Shield,
	spellFocus: Focus,
	general: Backpack
};

const CATEGORY_STEPS: Record<EquipmentCategory, number> = {
	weapon: 5,
	armor: 3,
	shield: 3,
	spellFocus: 3,
	general: 2
};

type TabType = 'create' | 'saved';

const CustomEquipment: React.FC = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<TabType>('create');
	const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | null>('weapon');
	const [editingEquipment, setEditingEquipment] = useState<CustomEquipmentData | null>(null);
	const [builderVersion, setBuilderVersion] = useState(0);

	const handleCategorySelect = (category: EquipmentCategory) => {
		setEditingEquipment(null);
		setSelectedCategory(category);
		setBuilderVersion((version) => version + 1);
	};

	const closeBuilder = () => {
		setEditingEquipment(null);
		setSelectedCategory(null);
	};

	const handleEdit = (equipment: CustomEquipmentData) => {
		setEditingEquipment(equipment);
		setSelectedCategory(equipment.category);
		setActiveTab('create');
		setBuilderVersion((version) => version + 1);
	};

	const renderBuilder = () => {
		switch (selectedCategory) {
			case 'weapon':
				return (
					<WeaponBuilder
						onBack={closeBuilder}
						initialEquipment={
							editingEquipment?.category === 'weapon' ? editingEquipment : undefined
						}
					/>
				);
			case 'armor':
				return (
					<ArmorBuilder
						onBack={closeBuilder}
						initialEquipment={editingEquipment?.category === 'armor' ? editingEquipment : undefined}
					/>
				);
			case 'shield':
				return (
					<ShieldBuilder
						onBack={closeBuilder}
						initialEquipment={
							editingEquipment?.category === 'shield' ? editingEquipment : undefined
						}
					/>
				);
			case 'spellFocus':
				return (
					<SpellFocusBuilder
						onBack={closeBuilder}
						initialEquipment={
							editingEquipment?.category === 'spellFocus' ? editingEquipment : undefined
						}
					/>
				);
			case 'general':
				return (
					<GeneralEquipmentBuilder
						onBack={closeBuilder}
						initialEquipment={
							editingEquipment?.category === 'general' ? editingEquipment : undefined
						}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<PageContainer>
			{/* Header */}
			<Header>
				<HeaderContent>
					<Title>{t('customEquipment.title')}</Title>
					<Subtitle>{t('customEquipment.subtitle')}</Subtitle>
				</HeaderContent>
			</Header>

			<MainContent>
				<PrimaryTabContainer>
					<Tab
						$active={activeTab === 'create'}
						onClick={() => setActiveTab('create')}
						aria-pressed={activeTab === 'create'}
					>
						{t('customEquipment.createNew')}
					</Tab>
					<Tab
						$active={activeTab === 'saved'}
						onClick={() => setActiveTab('saved')}
						aria-pressed={activeTab === 'saved'}
					>
						{t('customEquipment.savedEquipment')}
					</Tab>
				</PrimaryTabContainer>

				{activeTab === 'create' && (
					<>
						<CategoryPrompt>{t('customEquipment.selectCategory')}</CategoryPrompt>
						<CategoryGrid>
							{EQUIPMENT_CATEGORIES.map((category) => {
								const Icon = CATEGORY_ICONS[category.id];
								return (
									<CategoryCard
										key={category.id}
										onClick={() => handleCategorySelect(category.id)}
										$selected={selectedCategory === category.id}
										aria-pressed={selectedCategory === category.id}
									>
										<CategoryIcon>
											<Icon aria-hidden="true" />
										</CategoryIcon>
										<span>
											<CategoryTitle>{category.name}</CategoryTitle>
											<CategoryDescription>{CATEGORY_STEPS[category.id]} steps</CategoryDescription>
										</span>
									</CategoryCard>
								);
							})}
						</CategoryGrid>
						{selectedCategory ? <div key={builderVersion}>{renderBuilder()}</div> : null}
					</>
				)}

				{activeTab === 'saved' && <SavedEquipmentList onEdit={handleEdit} />}
			</MainContent>
		</PageContainer>
	);
};

export default CustomEquipment;
