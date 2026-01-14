/**
 * Auth Guard Component
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Protects routes that require authentication. Shows sign-in if not authenticated.
 */

import * as React from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

// TODO: Uncomment after npm install
// import { useConvexAuth } from 'convex/react';
// import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';

export interface AuthGuardProps {
	/** Content to show when authenticated */
	children: React.ReactNode;
	/** Custom loading component */
	loadingFallback?: React.ReactNode;
	/** Whether to show loading state */
	showLoading?: boolean;
}

/**
 * Auth status for development/preview without Convex
 */
type MockAuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

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

	// Default: show unauthenticated (will show sign-in)
	return { isLoading: false, isAuthenticated: false };
}

export function AuthGuard({ children, loadingFallback, showLoading = true }: AuthGuardProps) {
	const [authView, setAuthView] = React.useState<'signIn' | 'signUp'>('signIn');

	// TODO: Replace with actual Convex auth hook
	// const { isLoading, isAuthenticated } = useConvexAuth();
	const { isLoading, isAuthenticated } = useMockAuth();

	// Loading state
	if (isLoading && showLoading) {
		return (
			loadingFallback || (
				<div className="bg-background flex min-h-screen items-center justify-center">
					<div className="text-center">
						<div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			)
		);
	}

	// Authenticated - show children
	if (isAuthenticated) {
		return <>{children}</>;
	}

	// Unauthenticated - show sign in/up
	return (
		<div className="bg-background flex min-h-screen items-center justify-center bg-[url('/src/assets/BlackBG.jpg')] bg-cover bg-center p-4">
			{authView === 'signIn' ? (
				<SignIn
					onSuccess={() => {
						// Auth state will update automatically via Convex
					}}
					onSwitchToSignUp={() => setAuthView('signUp')}
				/>
			) : (
				<SignUp
					onSuccess={() => {
						// Auth state will update automatically via Convex
					}}
					onSwitchToSignIn={() => setAuthView('signIn')}
				/>
			)}
		</div>
	);
}

export default AuthGuard;

/**
 * Higher-order component to protect a route
 */
export function withAuthGuard<P extends object>(Component: React.ComponentType<P>) {
	return function ProtectedComponent(props: P) {
		return (
			<AuthGuard>
				<Component {...props} />
			</AuthGuard>
		);
	};
}
