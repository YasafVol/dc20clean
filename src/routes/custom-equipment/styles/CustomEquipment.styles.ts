/**
 * @file Custom Equipment Styled Components
 */

import styled from 'styled-components';

export const PageContainer = styled.div`
	min-height: 100vh;
	background: url('/src/assets/BlackBG.jpg') center/cover no-repeat;
`;

export const Header = styled.div`
	padding: 2rem;
`;

export const HeaderContent = styled.div`
	max-width: 80rem;
	margin: 0 auto;
`;

export const BackButtonRow = styled.div`
	margin-bottom: 2rem;
	display: flex;
	gap: 1rem;
`;

export const Title = styled.h1`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.875rem;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
	color: #e5e7eb;
	text-align: center;
	font-size: 1rem;
`;

export const MainContent = styled.div`
	max-width: 80rem;
	margin: 0 auto;
	padding: 2rem 1rem;
`;

export const CategoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.5rem;
	margin-top: 2rem;
`;

export const CategoryCard = styled.button<{ $selected?: boolean }>`
	background: linear-gradient(to bottom right, #1e1b4b, #312e81);
	border: 2px solid ${(props) => (props.$selected ? '#a855f7' : '#a855f7')};
	border-radius: 12px;
	padding: 2rem;
	text-align: left;
	cursor: pointer;
	box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.3);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.4);
	}
`;

export const CategoryIcon = styled.div`
	font-size: 3rem;
	margin-bottom: 1rem;
`;

export const CategoryTitle = styled.h3`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

export const CategoryDescription = styled.p`
	color: #9ca3af;
	font-size: 0.95rem;
	line-height: 1.5;
`;

export const SectionTitle = styled.h2`
	font-family: 'Cinzel', serif;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
	border-bottom: 1px solid rgba(251, 191, 36, 0.3);
	padding-bottom: 0.5rem;
`;

export const BuilderContainer = styled.div`
	background: linear-gradient(to bottom right, #1e1b4b, #312e81);
	border: 2px solid #a855f7;
	border-radius: 12px;
	padding: 1.5rem;
	margin-top: 1rem;
	box-shadow: 0 10px 15px -3px rgba(168, 85, 247, 0.3);
`;

export const StepIndicator = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
`;

export const Step = styled.div<{ $active?: boolean; $completed?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	font-weight: bold;
	font-size: 0.875rem;
	background: ${(props) =>
		props.$completed ? '#22c55e' : props.$active ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)'};
	color: ${(props) => (props.$completed || props.$active ? '#0f172a' : 'rgba(255, 255, 255, 0.5)')};
	transition: all 0.3s ease;
`;

export const StepConnector = styled.div<{ $active?: boolean }>`
	flex: 1;
	height: 2px;
	background: ${(props) => (props.$active ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)')};
	transition: all 0.3s ease;
`;

export const OptionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
`;

export const OptionCard = styled.button<{ $selected?: boolean }>`
	background: ${(props) =>
		props.$selected ? 'rgba(251, 191, 36, 0.15)' : 'rgba(15, 23, 42, 0.5)'};
	border: 2px solid ${(props) => (props.$selected ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)')};
	border-radius: 8px;
	padding: 1rem;
	text-align: left;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		border-color: ${(props) => (props.$selected ? '#fbbf24' : 'rgba(251, 191, 36, 0.5)')};
		background: ${(props) =>
			props.$selected ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.05)'};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const OptionTitle = styled.div`
	color: #e5e7eb;
	font-weight: 600;
	font-size: 1rem;
	margin-bottom: 0.25rem;
`;

export const OptionDescription = styled.div`
	color: #9ca3af;
	font-size: 0.875rem;
	line-height: 1.4;
`;

export const PropertyTag = styled.span<{ $cost?: number }>`
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 600;
	background: ${(props) =>
		props.$cost && props.$cost < 0
			? 'rgba(34, 197, 94, 0.2)'
			: props.$cost && props.$cost > 1
				? 'rgba(239, 68, 68, 0.2)'
				: 'rgba(251, 191, 36, 0.2)'};
	color: ${(props) =>
		props.$cost && props.$cost < 0
			? '#4ade80'
			: props.$cost && props.$cost > 1
				? '#f87171'
				: '#fbbf24'};
`;

export const PointsDisplay = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1rem;
	background: rgba(15, 23, 42, 0.5);
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const PointsLabel = styled.span`
	color: #9ca3af;
	font-size: 0.875rem;
`;

export const PointsValue = styled.span<{ $over?: boolean }>`
	color: ${(props) => (props.$over ? '#f87171' : '#fbbf24')};
	font-weight: bold;
	font-size: 1.25rem;
`;

export const SummaryCard = styled.div`
	background: rgba(15, 23, 42, 0.6);
	border: 1px solid rgba(251, 191, 36, 0.3);
	border-radius: 12px;
	padding: 1.5rem;
	margin-top: 1.5rem;
`;

export const SummaryRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.05);

	&:last-child {
		border-bottom: none;
	}
`;

export const SummaryLabel = styled.span`
	color: #9ca3af;
`;

export const SummaryValue = styled.span`
	color: #e5e7eb;
	font-weight: 600;
`;

export const ActionButtons = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1.5rem;
	justify-content: flex-end;
`;

export const SavedItemsList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const SavedItemCard = styled.div`
	background: rgba(30, 27, 75, 0.4);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 8px;
	padding: 1rem;
	transition: all 0.2s ease;

	&:hover {
		border-color: rgba(251, 191, 36, 0.3);
	}
`;

export const PresetBadge = styled.span`
	display: inline-block;
	padding: 0.125rem 0.5rem;
	background: rgba(59, 130, 246, 0.2);
	color: #60a5fa;
	border-radius: 4px;
	font-size: 0.75rem;
	font-weight: 600;
	margin-left: 0.5rem;
`;

export const TabContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1.5rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
	padding: 0.5rem 1rem;
	background: ${(props) => (props.$active ? 'rgba(251, 191, 36, 0.2)' : 'transparent')};
	border: none;
	border-radius: 6px 6px 0 0;
	color: ${(props) => (props.$active ? '#fbbf24' : '#9ca3af')};
	font-weight: ${(props) => (props.$active ? '600' : '400')};
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.1);
	}
`;
