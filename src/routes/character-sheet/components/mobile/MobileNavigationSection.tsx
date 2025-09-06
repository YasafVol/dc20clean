import React from 'react';
import {
	MobileNavigation,
	MobileNavButton
} from '../../styles/CharacterSheetMobile.styles';

interface MobileNavigationSectionProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

const MobileNavigationSection: React.FC<MobileNavigationSectionProps> = ({
	activeTab,
	onTabChange
}) => {
	const tabs = [
		{ id: 'skills', label: 'Skills' },
		{ id: 'combat', label: 'Combat' },
		{ id: 'items', label: 'Items' },
		{ id: 'info', label: 'Info' }
	];

	return (
		<MobileNavigation>
			{tabs.map((tab) => (
				<MobileNavButton
					key={tab.id}
					$active={activeTab === tab.id}
					onClick={() => onTabChange(tab.id)}
				>
					{tab.label}
				</MobileNavButton>
			))}
		</MobileNavigation>
	);
};

export default MobileNavigationSection;