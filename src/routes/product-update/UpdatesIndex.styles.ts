import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
	min-height: 100vh;
	padding: clamp(5.5rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) 4rem;
	background:
		radial-gradient(circle at 8% 12%, rgba(125, 207, 255, 0.13), transparent 26rem),
		radial-gradient(circle at 92% 30%, rgba(187, 154, 247, 0.12), transparent 30rem), #16161e;
	color: #c0caf5;
`;

export const Shell = styled.div`
	width: min(72rem, 100%);
	margin: 0 auto;
`;

export const Hero = styled.header`
	max-width: 52rem;
`;

export const Eyebrow = styled.p`
	margin: 0 0 1rem;
	color: #7dcfff;
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.14em;
	text-transform: uppercase;
`;

export const Title = styled.h1`
	margin: 0;
	color: #f1f5ff;
	font-size: clamp(2.6rem, 7vw, 5.2rem);
	line-height: 0.98;
	letter-spacing: -0.035em;
`;

export const Lead = styled.p`
	max-width: 45rem;
	margin: 1.35rem 0 0;
	color: #a9b1d6;
	font-size: clamp(1.05rem, 2.2vw, 1.3rem);
	line-height: 1.6;
`;

export const Section = styled.section`
	margin-top: clamp(3.25rem, 8vw, 6rem);
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: end;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 1.35rem;

	@media (max-width: 42rem) {
		align-items: start;
		flex-direction: column;
	}
`;

export const SectionTitle = styled.h2`
	margin: 0;
	color: #f1f5ff;
	font-size: clamp(1.65rem, 4vw, 2.5rem);
	line-height: 1.15;
`;

export const SectionLead = styled.p`
	max-width: 45rem;
	margin: 0.75rem 0 0;
	color: #9aa5ce;
	line-height: 1.6;
`;

export const UpdateCard = styled.article`
	position: relative;
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 2rem;
	padding: clamp(1.4rem, 4vw, 2.25rem);
	border: 1px solid #3b4261;
	border-radius: 1.2rem;
	background: linear-gradient(135deg, rgba(36, 40, 59, 0.96), rgba(31, 34, 50, 0.88));
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);

	@media (max-width: 42rem) {
		grid-template-columns: 1fr;
	}
`;

export const UpdateMeta = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem 0.9rem;
	align-items: center;
	margin-bottom: 0.9rem;
	color: #7dcfff;
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
`;

export const MetaDivider = styled.span`
	color: #565f89;
`;

export const UpdateTitle = styled.h3`
	margin: 0;
	color: #f1f5ff;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	font-size: clamp(1.65rem, 4vw, 2.4rem);
	line-height: 1.1;
`;

export const UpdateCopy = styled.p`
	max-width: 44rem;
	margin: 0.85rem 0 0;
	color: #a9b1d6;
	font-size: 1.03rem;
	line-height: 1.65;
`;

export const HighlightList = styled.ul`
	display: grid;
	gap: 0.55rem;
	margin: 1.2rem 0 0;
	padding: 0;
	color: #c0caf5;
	list-style: none;

	li {
		display: flex;
		gap: 0.55rem;
		align-items: baseline;
	}

	li::before {
		content: '✦';
		color: #9ece6a;
	}
`;

export const UpdateAside = styled.div`
	display: flex;
	min-width: 13rem;
	flex-direction: column;
	justify-content: end;
	gap: 0.75rem;
	align-items: stretch;
`;

export const UpdateList = styled.div`
	display: grid;
	gap: 0.75rem;
`;

export const UpdateListItem = styled.article`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 1.5rem;
	align-items: center;
	padding: 1.25rem;
	border: 1px solid #3b4261;
	border-radius: 0.95rem;
	background: rgba(36, 40, 59, 0.72);

	@media (max-width: 42rem) {
		grid-template-columns: 1fr;
	}
`;

export const UpdateListTitle = styled.h3`
	margin: 0;
	color: #d8def8;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	font-size: clamp(1.15rem, 3vw, 1.65rem);
	line-height: 1.15;
`;

export const UpdateListCopy = styled.p`
	max-width: 48rem;
	margin: 0.5rem 0 0;
	color: #9aa5ce;
	line-height: 1.55;
`;

export const ActionLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.45rem;
	min-height: 2.75rem;
	padding: 0.7rem 1rem;
	border-radius: 0.7rem;
	font-weight: 800;
	text-align: center;
	text-decoration: none;
	transition:
		transform 150ms ease,
		background 150ms ease;

	&:hover {
		transform: translateY(-2px);
	}

	&:focus-visible {
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;

export const PrimaryAction = styled(ActionLink)`
	background: #7dcfff;
	color: #16161e;

	&:hover {
		background: #a8e0ff;
	}
`;

export const SecondaryAction = styled(ActionLink)`
	border: 1px solid #565f89;
	background: rgba(65, 72, 104, 0.3);
	color: #c0caf5;

	&:hover {
		background: rgba(65, 72, 104, 0.55);
	}
`;

export const Path = styled.ol`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 0.75rem;
	margin: 0;
	padding: 0;
	list-style: none;

	@media (max-width: 52rem) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 32rem) {
		grid-template-columns: 1fr;
	}
`;

export const PathStep = styled.li`
	position: relative;
	min-height: 10rem;
	padding: 1rem;
	border: 1px solid #3b4261;
	border-radius: 0.9rem;
	background: rgba(36, 40, 59, 0.72);
`;

export const PathStepLink = styled(Link)`
	display: block;
	height: 100%;
	color: inherit;
	text-decoration: none;

	&:focus-visible {
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;

export const PathNumber = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.8rem;
	height: 1.8rem;
	margin-bottom: 1rem;
	border: 1px solid rgba(125, 207, 255, 0.4);
	border-radius: 50%;
	background: rgba(125, 207, 255, 0.1);
	color: #7dcfff;
	font-size: 0.78rem;
	font-weight: 800;
`;

export const PathTitle = styled.h3`
	margin: 0;
	color: #d8def8;
	font-size: 1rem;
`;

export const PathCopy = styled.p`
	margin: 0.45rem 0 0;
	color: #9aa5ce;
	font-size: 0.9rem;
	line-height: 1.5;
`;

export const ArchiveNote = styled.p`
	margin: 1.25rem 0 0;
	color: #737da8;
	font-size: 0.9rem;
`;
