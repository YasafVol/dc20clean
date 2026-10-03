import { useQuery } from 'convex/react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { backOfficeApi } from './backOfficeApi';
import { useAppAuth } from '../../components/auth/AuthModeContext';
import { BackOfficeErrorBoundary } from './BackOfficeErrorBoundary';

function ReviewerLink() {
	const allowed = useQuery(backOfficeApi.access, {});
	return allowed ? (
		<Link
			to="/back-office/systems"
			className="inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-slate-900 px-4 py-3 text-sky-200 hover:border-sky-300"
		>
			<ShieldCheck size={18} aria-hidden="true" />
			Back office
		</Link>
	) : null;
}

export function BackOfficeLink() {
	const { isConvexEnabled, isAuthenticated, isLoading } = useAppAuth();
	if (!isConvexEnabled || !isAuthenticated || isLoading) return null;
	return (
		<BackOfficeErrorBoundary quiet>
			<ReviewerLink />
		</BackOfficeErrorBoundary>
	);
}
