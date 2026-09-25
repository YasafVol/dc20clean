import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
	flex: 1;
	padding: clamp(6.5rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) 4rem;
	background:
		radial-gradient(circle at 12% 8%, rgba(125, 207, 255, 0.1), transparent 27rem),
		radial-gradient(circle at 88% 20%, rgba(187, 154, 247, 0.09), transparent 29rem), #16161e;
	color: #c0caf5;
`;

export const Shell = styled.div`
	width: min(72rem, 100%);
	margin: 0 auto;
`;

export const Hero = styled.header`
	position: relative;
	overflow: hidden;
	padding: clamp(1.5rem, 4vw, 3rem);
	border: 1px solid #3b4261;
	border-top: 3px solid #d8b978;
	border-radius: 1.25rem;
	background: linear-gradient(135deg, rgba(36, 40, 59, 0.98), rgba(26, 27, 38, 0.96));
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.22);

	&::after {
		content: '';
		position: absolute;
		inset: auto -10rem -12rem auto;
		width: 26rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(125, 207, 255, 0.14), transparent 68%);
		pointer-events: none;
	}
`;

export const Eyebrow = styled.p`
	position: relative;
	z-index: 1;
	margin: 0 0 1rem;
	color: #7dcfff;
	font-size: 0.75rem;
	font-weight: 800;
	letter-spacing: 0.14em;
	text-transform: uppercase;
`;

export const HeroLayout = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: end;
	justify-content: space-between;
	gap: 2rem;

	@media (max-width: 48rem) {
		align-items: start;
		flex-direction: column;
		gap: 1.5rem;
	}
`;

export const Title = styled.h1`
	margin: 0;
	color: #f2d48e;
	font-size: clamp(2.35rem, 5vw, 3.7rem);
	line-height: 1.08;
	letter-spacing: -0.025em;
`;

export const Lead = styled.p`
	max-width: 43rem;
	margin: 1rem 0 0;
	color: #c0caf5;
	font-size: clamp(1.02rem, 1.5vw, 1.18rem);
	line-height: 1.6;
`;

export const HeroMeta = styled.div`
	display: flex;
	flex: 0 0 auto;
	flex-direction: column;
	align-items: flex-end;
	gap: 1rem;
	text-align: right;

	@media (max-width: 48rem) {
		align-items: flex-start;
		text-align: left;
	}
`;

export const CompanionLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	min-height: 2.5rem;
	color: #7dcfff;
	font-size: 0.95rem;
	font-weight: 800;
	text-decoration: none;

	&:hover {
		color: #a8e0ff;
		text-decoration: underline;
		text-underline-offset: 0.2rem;
	}

	&:focus-visible {
		border-radius: 0.2rem;
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;

export const Version = styled.p`
	margin: 0;
	color: #929bbf;
	font-size: 0.85rem;
	line-height: 1.4;
`;

export const ReviewNotice = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: start;
	gap: 0.75rem;
	margin-top: 2rem;
	padding: 1rem 1.2rem;
	border: 1px solid rgba(224, 175, 104, 0.5);
	border-radius: 0.75rem;
	background: rgba(79, 55, 30, 0.32);
	color: #f4dfb8;
	font-size: 0.95rem;
	line-height: 1.55;
`;

export const ContentGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) 16rem;
	align-items: start;
	gap: clamp(1.25rem, 3vw, 2.25rem);
	margin-top: 2rem;

	@media (max-width: 56rem) {
		grid-template-columns: minmax(0, 1fr);
	}
`;

export const DocumentBody = styled.article`
	min-width: 0;
	padding: clamp(1.5rem, 4vw, 3rem);
	border: 1px solid #3b4261;
	border-radius: 1.25rem;
	background: rgba(31, 34, 50, 0.88);
`;

export const DocumentSection = styled.section`
	display: grid;
	grid-template-columns: 2.5rem minmax(0, 1fr);
	gap: 1.25rem;
	padding: 2.25rem 0;
	border-bottom: 1px solid #3b4261;
	scroll-margin-top: 6rem;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}

	@media (max-width: 40rem) {
		grid-template-columns: minmax(0, 1fr);
		gap: 0.35rem;
	}
`;

export const SectionNumber = styled.span`
	padding-top: 0.3rem;
	color: #d8b978;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	font-size: 0.9rem;
	font-weight: 700;
`;

export const SectionCopy = styled.div`
	min-width: 0;

	h2 {
		margin: 0 0 1.05rem;
		color: #f1f5ff;
		font-size: clamp(1.2rem, 2vw, 1.5rem);
		line-height: 1.3;
	}

	p {
		max-width: 68ch;
		margin: 0 0 1rem;
		color: #c0caf5;
		font-size: 1rem;
		line-height: 1.75;
		overflow-wrap: anywhere;
	}

	p:last-child {
		margin-bottom: 0;
	}
`;

export const Aside = styled.aside`
	position: sticky;
	top: 6rem;
	padding: 1.5rem;
	border: 1px solid #3b4261;
	border-radius: 1rem;
	background: rgba(36, 40, 59, 0.72);

	@media (max-width: 56rem) {
		display: none;
	}
`;

export const AsideTitle = styled.p`
	margin: 0 0 1.1rem;
	color: #9aa5ce;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
`;

export const SectionNav = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;

	a {
		padding: 0.55rem 0;
		color: #c0caf5;
		font-size: 0.94rem;
		line-height: 1.35;
		text-decoration: none;
	}

	a:hover {
		color: #7dcfff;
	}

	a:focus-visible {
		border-radius: 0.2rem;
		outline: 2px solid #7dcfff;
		outline-offset: 3px;
	}
`;
