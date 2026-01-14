/**
 * Auth Guard Component - Feature Gate
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Unlike a traditional auth guard that blocks the whole app,
 * this is used to gate specific features (PDF export, cloud save).
 * The app is fully usable without authentication.
 */

import * as React from 'react';
import { SignIn } from './SignIn';
import {
	Dialog,
	DialogContent,
} from '../ui/dialog';

// TODO: Uncomment after npm install
// import { useConvexAuth } from 'convex/react';

export interface AuthGuardProps {
	/** Content to show when authenticated */
	children: React.ReactNode;
	/** What to show when not authenticated (defaults to SignIn dialog) */
	fallback?: React.ReactNode;
	/** Feature being guarded (for messaging) */
	feature?: 'cloud-save' | 'pdf-export' | 'general';
}

/**
 * Hook placeholder for auth state
 * TODO: Replace with useConvexAuth after npm install
 */
function useMockAuth(): { isLoading: boolean; isAuthenticated: boolean } {
	// For development without Convex, check environment variable
	const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';

	if (bypassAuth) {
		return { isLoading: false, isAuthenticated: true };
	}

	// Default: not authenticated (features are gated)
	return { isLoading: false, isAuthenticated: false };
}

/**
 * Feature gate that shows sign-in when user tries to access protected feature
 */
export function AuthGuard({ children, fallback, feature = 'general' }: AuthGuardProps) {
	// TODO: Replace with actual Convex auth hook
	// const { isAuthenticated } = useConvexAuth();
	const { isAuthenticated } = useMockAuth();

	// Authenticated - show children
	if (isAuthenticated) {
		return <>{children}</>;
	}

	// Not authenticated - show fallback or sign-in prompt
	return fallback || <SignIn feature={feature} />;
}

/**
 * Hook to check if user is authenticated
 * Use this to conditionally show/hide features
 */
export function useIsAuthenticated(): boolean {
	// TODO: Replace with actual Convex auth hook
	// const { isAuthenticated } = useConvexAuth();
	const { isAuthenticated } = useMockAuth();
	return isAuthenticated;
}

/**
 * Props for the feature gate button
 */
export interface FeatureGateButtonProps {
	/** The actual action to perform if authenticated */
	onAction: () => void;
	/** Feature being gated */
	feature: 'cloud-save' | 'pdf-export';
	/** Button content */
	children: React.ReactNode;
	/** Button class name */
	className?: string;
	/** Whether the button is disabled */
	disabled?: boolean;
}

/**
 * Button that gates a feature behind authentication
 * Shows sign-in dialog if not authenticated, otherwise performs action
 */
export function FeatureGateButton({
	onAction,
	feature,
	children,
	className,
	disabled,
}: FeatureGateButtonProps) {
	const [showSignIn, setShowSignIn] = React.useState(false);
	const isAuthenticated = useIsAuthenticated();

	const handleClick = () => {
		if (isAuthenticated) {
			onAction();
		} else {
			setShowSignIn(true);
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={handleClick}
				className={className}
				disabled={disabled}
			>
				{children}
			</button>

			<Dialog open={showSignIn} onOpenChange={setShowSignIn}>
				<DialogContent className="border-purple-500/50 bg-transparent p-0 shadow-none">
					<SignIn
						feature={feature}
						onSuccess={() => {
							setShowSignIn(false);
							onAction();
						}}
						onCancel={() => setShowSignIn(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default AuthGuard;
