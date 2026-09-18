import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
	min-height: 100vh;
	padding: clamp(5.5rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) 4rem;
	background:
		radial-gradient(circle at 12% 8%, rgba(125, 207, 255, 0.12), transparent 28rem),
		radial-gradient(circle at 88% 24%, rgba(187, 154, 247, 0.12), transparent 30rem), #16161e;
	color: #c0caf5;
`;

export const Shell = styled.div`
	width: min(72rem, 100%);
	margin: 0 auto;
`;

export const Hero = styled.header`
	position: relative;
	overflow: hidden;
	padding: clamp(2rem, 6vw, 4.5rem);
	border: 1px solid #3b4261;
	border-radius: 1.5rem;
	background: linear-gradient(135deg, rgba(36, 40, 59, 0.98), rgba(26, 27, 38, 0.96));
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);

	&::after {
		content: '';
		position: absolute;
		inset: auto -8rem -10rem auto;
		width: 24rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(125, 207, 255, 0.18), transparent 68%);
		pointer-events: none;
	}
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
	max-width: 12ch;
	margin: 0;
	color: #f1f5ff;
	font-size: clamp(2.4rem, 7vw, 5.25rem);
	line-height: 0.98;
	letter-spacing: -0.035em;
`;

export const Lead = styled.p`
	max-width: 44rem;
	margin: 1.5rem 0 0;
	color: #a9b1d6;
	font-size: clamp(1.05rem, 2.2vw, 1.35rem);
	line-height: 1.6;
`;

export const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-top: 2rem;
`;

const ActionBase = styled(Link)`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.45rem;
	min-height: 2.85rem;
	padding: 0.7rem 1.1rem;
	border-radius: 0.7rem;
	font-weight: 800;
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

export const PrimaryAction = styled(ActionBase)`
	background: #7dcfff;
	color: #16161e;

	&:hover {
		background: #a8e0ff;
	}
`;

export const SecondaryAction = styled(ActionBase)`
	border: 1px solid #565f89;
	background: rgba(65, 72, 104, 0.3);
	color: #c0caf5;

	&:hover {
		background: rgba(65, 72, 104, 0.55);
	}
`;

export const HeroNote = styled.p`
	margin: 1rem 0 0;
	color: #737da8;
	font-size: 0.88rem;
`;

export const Section = styled.section`
	margin-top: clamp(3.5rem, 8vw, 6.5rem);
`;

export const SectionHeading = styled.div`
	max-width: 47rem;
	margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
	margin: 0;
	color: #f1f5ff;
	font-size: clamp(1.65rem, 4vw, 2.5rem);
	line-height: 1.15;
`;

export const SectionLead = styled.p`
	margin: 0.75rem 0 0;
	color: #9aa5ce;
	font-size: 1.02rem;
	line-height: 1.65;
`;

export const FeatureGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
	gap: 1rem;
`;

export const FeatureCard = styled.article`
	padding: 1.35rem;
	border: 1px solid #3b4261;
	border-radius: 1rem;
	background: rgba(36, 40, 59, 0.78);
`;

export const IconFrame = styled.div`
	display: grid;
	width: 2.65rem;
	height: 2.65rem;
	place-items: center;
	margin-bottom: 1rem;
	border: 1px solid rgba(125, 207, 255, 0.35);
	border-radius: 0.75rem;
	background: rgba(125, 207, 255, 0.1);
	color: #7dcfff;
`;

export const CardTitle = styled.h3`
	margin: 0;
	color: #d8def8;
	font-size: 1.05rem;
`;

export const CardCopy = styled.p`
	margin: 0.55rem 0 0;
	color: #9aa5ce;
	line-height: 1.55;
`;

export const PickerGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
	gap: 1rem;
`;

export const PickerCard = styled.article`
	position: relative;
	overflow: hidden;
	padding: 1.4rem;
	border: 1px solid #3b4261;
	border-top: 3px solid var(--accent, #7dcfff);
	border-radius: 1rem;
	background: #1f2232;
`;

export const PickerLabel = styled.span`
	display: inline-flex;
	margin-bottom: 1rem;
	padding: 0.3rem 0.55rem;
	border-radius: 999px;
	background: rgba(187, 154, 247, 0.12);
	color: #bb9af7;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
`;

export const PickerList = styled.ul`
	margin: 0.85rem 0 0;
	padding-left: 1.1rem;
	color: #9aa5ce;
	line-height: 1.65;

	li::marker {
		color: var(--accent, #7dcfff);
	}
`;

export const Callout = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 1rem;
	align-items: start;
	padding: clamp(1.25rem, 4vw, 2rem);
	border: 1px solid rgba(158, 206, 106, 0.45);
	border-radius: 1rem;
	background: linear-gradient(135deg, rgba(158, 206, 106, 0.1), rgba(36, 40, 59, 0.82));

	@media (max-width: 32rem) {
		grid-template-columns: 1fr;
	}
`;

export const CalloutIcon = styled(IconFrame)`
	margin: 0;
	border-color: rgba(158, 206, 106, 0.45);
	background: rgba(158, 206, 106, 0.12);
	color: #9ece6a;
`;

export const Timeline = styled.ol`
	display: grid;
	gap: 0;
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const TimelineItem = styled.li`
	position: relative;
	display: grid;
	grid-template-columns: minmax(6rem, 9rem) 1fr;
	gap: 1.25rem;
	padding: 0 0 1.75rem 1.25rem;
	border-left: 1px solid #3b4261;

	&::before {
		content: '';
		position: absolute;
		top: 0.25rem;
		left: -0.36rem;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 50%;
		background: #7dcfff;
		box-shadow: 0 0 0 0.3rem #16161e;
	}

	@media (max-width: 34rem) {
		grid-template-columns: 1fr;
		gap: 0.35rem;
	}
`;

export const TimelineDate = styled.span`
	color: #7dcfff;
	font-size: 0.8rem;
	font-weight: 800;
	letter-spacing: 0.06em;
	text-transform: uppercase;
`;

export const TimelineCopy = styled.div`
	h3 {
		margin: 0;
		color: #d8def8;
		font-size: 1rem;
	}

	p {
		margin: 0.35rem 0 0;
		color: #9aa5ce;
		line-height: 1.55;
	}
`;

export const Notice = styled.aside`
	margin-top: 2rem;
	padding: 1.25rem;
	border: 1px solid rgba(224, 175, 104, 0.35);
	border-radius: 0.85rem;
	background: rgba(224, 175, 104, 0.07);

	h3 {
		margin: 0;
		color: #e0af68;
		font-size: 0.95rem;
	}

	ul {
		margin: 0.65rem 0 0;
		padding-left: 1.1rem;
		color: #9aa5ce;
		line-height: 1.6;
	}
`;

export const Footer = styled.footer`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin-top: 5rem;
	padding-top: 1.5rem;
	border-top: 1px solid #3b4261;
	color: #737da8;
`;
