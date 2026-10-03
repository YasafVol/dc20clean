import { useQuery } from 'convex/react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { BookOpenText, ShieldCheck, Skull } from 'lucide-react';
import type { ComponentType } from 'react';
import { backOfficeApi } from './backOfficeApi';
import { useAppAuth } from '../../components/auth/AuthModeContext';
import { SignIn } from '../../components/auth/SignIn';
import { BackOfficeErrorBoundary } from './BackOfficeErrorBoundary';
import { SystemsReview } from './SystemsReview';
import { MonstersReview } from './MonstersReview';
import './BackOffice.css';

function AuthorizedWorkspace() {
	const allowed = useQuery(backOfficeApi.access, {});
	if (allowed === undefined) return <p role="status">Checking access…</p>;
	if (!allowed)
		return (
			<div className="bo-card bo-state">
				<h2>Access restricted</h2>
				<p>This workspace is available to its two reviewers.</p>
			</div>
		);
	return (
		<ReviewWorkspace basePath="/back-office" Systems={SystemsReview} Monsters={MonstersReview} />
	);
}

export function ReviewWorkspace({
	basePath,
	Systems,
	Monsters
}: {
	basePath: string;
	Systems: ComponentType;
	Monsters: ComponentType;
}) {
	return (
		<>
			<nav className="bo-nav" aria-label="Back office sections">
				<NavLink to={`${basePath}/systems`}>
					<BookOpenText className="mr-2 inline" size={18} aria-hidden="true" />
					Systems
				</NavLink>
				<NavLink to={`${basePath}/monsters`}>
					<Skull className="mr-2 inline" size={18} aria-hidden="true" />
					Monsters
				</NavLink>
			</nav>
			<Routes>
				<Route index element={<Systems />} />
				<Route path="systems" element={<Systems />} />
				<Route path="systems/:documentId" element={<Systems />} />
				<Route path="monsters" element={<Monsters />} />
				<Route path="monsters/:monsterId" element={<Monsters />} />
				<Route path="*" element={<p role="alert">This review page was not found.</p>} />
			</Routes>
		</>
	);
}

export default function BackOffice() {
	const { isConvexEnabled, isAuthenticated, isLoading } = useAppAuth();
	return (
		<main className="back-office">
			<header className="bo-header">
				<div>
					<span className="bo-eyebrow">DC20 · Review workspace</span>
					<h1>Back office</h1>
					<p className="bo-muted">Understand the systems. Review the monsters.</p>
				</div>
				<span className="bo-muted">
					<ShieldCheck size={16} className="mr-1 inline" aria-hidden="true" /> Read only
				</span>
			</header>
			<BackOfficeErrorBoundary key={`${isAuthenticated}:${isLoading}`}>
				{!isConvexEnabled ? (
					<div className="bo-card bo-state">
						<h2>Cloud sign-in required</h2>
						<p>The back office is available when cloud storage and sign-in are enabled.</p>
					</div>
				) : isLoading ? (
					<p role="status">Checking sign-in…</p>
				) : !isAuthenticated ? (
					<>
						<p>Sign in with your reviewer account to continue.</p>
						<SignIn />
					</>
				) : (
					<AuthorizedWorkspace />
				)}
			</BackOfficeErrorBoundary>
		</main>
	);
}
