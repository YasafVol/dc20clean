import styled from 'styled-components';
import { FeatureCard } from './AlternativeSheetUpdate.styles';

export const ArtCard = styled(FeatureCard)`
	display: grid;
	grid-template-rows: 5.5rem auto auto;
	justify-items: start;
	gap: 0.5rem;
`;

export const ArtImage = styled.img`
	width: 5.5rem;
	height: 5.5rem;
	object-fit: contain;
	image-rendering: pixelated;
`;
