/**
 * @file Custom Equipment Main Page
 * Entry point for the custom equipment builder mini-app
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { EQUIPMENT_CATEGORIES, type EquipmentCategory } from '../../lib/rulesdata/equipment';
import { useTranslation } from 'react-i18next';
import {
	PageContainer,
	Header,
	HeaderContent,
	BackButtonRow,
	Title,
	Subtitle,
	MainContent,
	CategoryGrid,
	CategoryCard,
	CategoryIcon,
	CategoryTitle,
	CategoryDescription,
	TabContainer,
	Tab
} from './styles/CustomEquipment.styles';
import WeaponBuilder from './components/WeaponBuilder';
import ArmorBuilder from './components/ArmorBuilder';
import ShieldBuilder from './components/ShieldBuilder';
import SpellFocusBuilder from './components/SpellFocusBuilder';
import SavedEquipmentList from './components/SavedEquipmentList';

// Category icons
const CATEGORY_ICONS: Record<EquipmentCategory, string> = {
	weapon: '⚔️',
	armor: '🛡️',
	shield: '🔰',
	spellFocus: '🔮'
};

type TabType = 'create' | 'saved';

const CustomEquipment: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<TabType>('create');
	const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | null>(null);

	const handleCategorySelect = (category: EquipmentCategory) => {
		setSelectedCategory(category);
	};

	const handleBack = () => {
		if (selectedCategory) {
			setSelectedCategory(null);
		} else {
			navigate('/menu');
		}
	};

	const renderBuilder = () => {
		switch (selectedCategory) {
			case 'weapon':
				return <WeaponBuilder onBack={() => setSelectedCategory(null)} />;
			case 'armor':
				return <ArmorBuilder onBack={() => setSelectedCategory(null)} />;
			case 'shield':
				return <ShieldBuilder onBack={() => setSelectedCategory(null)} />;
			case 'spellFocus':
				return <SpellFocusBuilder onBack={() => setSelectedCategory(null)} />;
			default:
				return null;
		}
	};

	return (
		<PageContainer>
			{/* Header */}
			<Header>
				<HeaderContent>
					<BackButtonRow>
						<Button variant="secondary" onClick={handleBack} className="font-bold">
							← {selectedCategory ? t('customEquipment.backToCategories') : t('customEquipment.backToMenu')}
						</Button>
					</BackButtonRow>
					<Title>{t('customEquipment.title')}</Title>
					<Subtitle>{t('customEquipment.subtitle')}</Subtitle>
				</HeaderContent>
			</Header>

			<MainContent>
				{/* Tabs */}
				{!selectedCategory && (
					<TabContainer>
						<Tab $active={activeTab === 'create'} onClick={() => setActiveTab('create')}>
							{t('customEquipment.createNew')}
						</Tab>
						<Tab $active={activeTab === 'saved'} onClick={() => setActiveTab('saved')}>
							{t('customEquipment.savedEquipment')}
						</Tab>
					</TabContainer>
				)}

				{/* Content based on tab and selection */}
				{activeTab === 'create' && !selectedCategory && (
					<>
						<p className="mb-6 text-gray-400">
							{t('customEquipment.selectCategory')}
						</p>
						<CategoryGrid>
							{EQUIPMENT_CATEGORIES.map((category) => (
								<CategoryCard
									key={category.id}
									onClick={() => handleCategorySelect(category.id)}
									$selected={selectedCategory === category.id}
								>
									<CategoryIcon>{CATEGORY_ICONS[category.id]}</CategoryIcon>
									<CategoryTitle>{category.name}</CategoryTitle>
									<CategoryDescription>{category.description}</CategoryDescription>
								</CategoryCard>
							))}
						</CategoryGrid>
					</>
				)}

				{activeTab === 'create' && selectedCategory && renderBuilder()}

				{activeTab === 'saved' && <SavedEquipmentList />}
			</MainContent>
		</PageContainer>
	);
};

export default CustomEquipment;
