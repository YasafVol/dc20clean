import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SwitcherContainer = styled.div`
	position: relative;
`;

const SwitcherButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	background: rgba(168, 85, 247, 0.05);
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 8px;
	color: #e0e7ff;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
	backdrop-filter: blur(4px);

	&:hover {
		background: rgba(168, 85, 247, 0.15);
		border-color: #a855f7;
		transform: translateY(-2px);
	}

	&:active {
		transform: scale(0.98);
	}
`;

const FlagIcon = styled.span`
	font-size: 1.25rem;
	line-height: 1;
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
	position: absolute;
	top: calc(100% + 0.5rem);
	left: 0;
	min-width: 150px;
	background: rgba(168, 85, 247, 0.05);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 8px;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	opacity: ${props => props.$isOpen ? 1 : 0};
	visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
	transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
	transition: all 0.3s ease;
	overflow: hidden;
`;

const DropdownItem = styled.button<{ $isActive: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.75rem 1rem;
	background: ${props => props.$isActive ? 'rgba(168, 85, 247, 0.15)' : 'transparent'};
	border: none;
	color: #e0e7ff;
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;

	&:hover {
		background: rgba(168, 85, 247, 0.15);
	}

	&:not(:last-child) {
		border-bottom: 1px solid rgba(168, 85, 247, 0.2);
	}
`;

const LanguageLabel = styled.span`
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

export const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		localStorage.setItem('preferredLanguage', lang);
		setIsOpen(false);
	};

	const getFlagIcon = (lang: string) => {
		return lang === 'en' ? '🇺🇸' : '🇪🇸';
	};

	const getLanguageName = (lang: string) => {
		return lang === 'en' ? 'English' : 'Español';
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	return (
		<SwitcherContainer ref={containerRef}>
			<SwitcherButton onClick={() => setIsOpen(!isOpen)} title="Select Language">
				<FlagIcon>{getFlagIcon(currentLanguage)}</FlagIcon>
				<LanguageLabel>{getLanguageName(currentLanguage)}</LanguageLabel>
			</SwitcherButton>
			<Dropdown $isOpen={isOpen}>
				<DropdownItem
					$isActive={currentLanguage === 'en'}
					onClick={() => changeLanguage('en')}
				>
					<FlagIcon>{getFlagIcon('en')}</FlagIcon>
					<span>{getLanguageName('en')}</span>
				</DropdownItem>
				<DropdownItem
					$isActive={currentLanguage === 'es'}
					onClick={() => changeLanguage('es')}
				>
					<FlagIcon>{getFlagIcon('es')}</FlagIcon>
					<span>{getLanguageName('es')}</span>
				</DropdownItem>
			</Dropdown>
		</SwitcherContainer>
	);
};

export default LanguageSwitcher;
