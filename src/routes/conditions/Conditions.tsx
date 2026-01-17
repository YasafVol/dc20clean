/**
 * Standalone Conditions Reference Page
 *
 * A full-page view of the conditions reference guide,
 * accessible from the main menu.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConditionsReference from '../character-sheet/components/ConditionsReference';
import styled from 'styled-components';

const PageContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #1e1b4b 0%, #0f0d24 100%);
	padding: 2rem;
`;

const BackButton = styled.button`
	background: rgba(251, 191, 36, 0.1);
	border: 1px solid rgba(251, 191, 36, 0.3);
	color: #fbbf24;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	cursor: pointer;
	font-family: 'Cinzel', serif;
	font-size: 0.875rem;
	margin-bottom: 1.5rem;
	transition: all 0.2s;

	&:hover {
		background: rgba(251, 191, 36, 0.2);
		border-color: #fbbf24;
	}
`;

const ContentWrapper = styled.div`
	max-width: 900px;
	margin: 0 auto;
`;

const Conditions: React.FC = () => {
	const navigate = useNavigate();

	return (
		<PageContainer>
			<ContentWrapper>
				<BackButton onClick={() => navigate('/menu')}>← Back to Menu</BackButton>
				<ConditionsReference />
			</ContentWrapper>
		</PageContainer>
	);
};

export default Conditions;
