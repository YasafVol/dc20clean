import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
	min-height: 100vh;
	padding: clamp(6.5rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem) 4rem;
	background: #16161e;
	color: #c0caf5;
`;

export const Shell = styled.div`
	width: min(68rem, 100%);
	margin: 0 auto;
`;

export const Header = styled.header`
	display: flex;
	align-items: end;
	justify-content: space-between;
	gap: 2rem;

	@media (max-width: 42rem) {
		align-items: start;
		flex-direction: column;
		gap: 0.75rem;
	}
`;

export const Eyebrow = styled.p`
	margin: 0 0 0.65rem;
	color: #7dcfff;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.14em;
	text-transform: uppercase;
`;

export const Title = styled.h1`
	margin: 0;
	color: #f1f5ff;
	font-size: clamp(2.1rem, 5vw, 3.4rem);
	line-height: 1;
	letter-spacing: -0.025em;
`;

export const Lead = styled.p`
	margin: 0 0 0.25rem;
	color: #8f98bd;
	font-size: 0.95rem;
`;

export const Log = styled.section`
	margin-top: clamp(2.5rem, 6vw, 4rem);
	border-top: 1px solid #303650;
`;

const logColumns = '9rem minmax(16rem, 1fr) 7rem minmax(12rem, auto)';

export const LogHeader = styled.div`
	display: grid;
	grid-template-columns: ${logColumns};
	gap: 1.5rem;
	padding: 0.8rem 0;
	border-bottom: 1px solid #303650;
	color: #6f789b;
	font-size: 0.7rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	text-transform: uppercase;

	span:last-child {
		text-align: right;
	}

	@media (max-width: 48rem) {
		display: none;
	}
`;

export const UpdateList = styled.ol`
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const UpdateRow = styled.li`
	display: grid;
	grid-template-columns: ${logColumns};
	gap: 1.5rem;
	align-items: start;
	padding: 1.55rem 0;
	border-bottom: 1px solid #303650;

	@media (max-width: 48rem) {
		grid-template-columns: 1fr;
		gap: 0.8rem;
		padding: 1.6rem 0;
	}
`;

export const UpdateDate = styled.time`
	color: #8f98bd;
	font-size: 0.88rem;
	line-height: 1.45;
`;

export const UpdateSummary = styled.div`
	min-width: 0;
`;

export const UpdateTitle = styled.h2`
	margin: 0;
	color: #e1e6fa;
	font-family: 'Cinzel', 'Georgia', 'Times New Roman', serif;
	font-size: 1.18rem;
	line-height: 1.25;
`;

export const UpdateCopy = styled.p`
	max-width: 38rem;
	margin: 0.45rem 0 0;
	color: #8f98bd;
	font-size: 0.9rem;
	line-height: 1.55;
`;

export const UpdateArea = styled.span`
	color: #a9b1d6;
	font-size: 0.88rem;
	line-height: 1.45;

	@media (max-width: 48rem) {
		&::before {
			content: 'Area: ';
			color: #6f789b;
		}
	}
`;

export const UpdateActions = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	gap: 0.75rem 1.1rem;
	font-size: 0.88rem;

	@media (max-width: 48rem) {
		justify-content: flex-start;
		margin-top: 0.35rem;
	}
`;

const QuietLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.35rem;
	min-height: 2rem;
	color: #7dcfff;
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

export const ReadLink = styled(QuietLink)``;

export const FeatureLink = styled(QuietLink)`
	color: #a9b1d6;

	&:hover {
		color: #d8def8;
	}
`;
