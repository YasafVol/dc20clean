/**
 * User Menu Component - Social Auth
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Shows current user info (from Google) and sign out button.
 */

import * as React from 'react';
import { useConvexAuth } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '../ui/button';

export interface UserMenuProps {
	/** Additional class names */
	className?: string;
	/** Called after successful sign out */
	onSignOut?: () => void;
}

/**
 * Mock user data for development
 * TODO: Replace with actual Convex query after npm install
 */
interface MockUser {
	email?: string;
	name?: string;
	image?: string;
	provider?: 'google';
}

function useMockUser(): MockUser | null {
	return {
		email: 'dev@example.com',
		name: 'Developer',
		provider: 'google'
	};
}

export function UserMenu({ className, onSignOut }: UserMenuProps) {
	const [isLoading, setIsLoading] = React.useState(false);

	const { isAuthenticated: isConvexAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
	const { signOut } = useAuthActions();
	const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
	const isAuthenticated = bypassAuth ? true : isConvexAuthenticated;
	const user = bypassAuth ? useMockUser() : null;

	const handleSignOut = async () => {
		setIsLoading(true);

		try {
			await signOut();

			onSignOut?.();
		} catch (err) {
			console.error('Failed to sign out:', err);
		} finally {
			setIsLoading(false);
		}
	};

	// Not authenticated - show nothing or sign in prompt
	if (isAuthLoading || !isAuthenticated) {
		return null;
	}

	return (
		<div className={className}>
			<div className="flex items-center gap-3">
				{/* User avatar */}
				{user?.image ? (
					<img
						src={user.image}
						alt={user.name || 'User'}
						className="h-8 w-8 rounded-full border border-purple-500/50"
					/>
				) : (
					<div className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
						{user?.name?.[0] || user?.email?.[0] || 'U'}
					</div>
				)}

				{/* User info */}
				<div className="hidden text-right sm:block">
					{user?.name && <p className="text-foreground text-sm font-medium">{user.name}</p>}
					{user?.email && <p className="text-muted-foreground text-xs">{user.email}</p>}
					{!user && <p className="text-foreground text-sm font-medium">Signed in</p>}
				</div>

				{/* Sign out button */}
				<Button
					variant="outline"
					size="sm"
					onClick={handleSignOut}
					disabled={isLoading}
					className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
				>
					{isLoading ? '...' : 'Sign Out'}
				</Button>
			</div>
		</div>
	);
}

export default UserMenu;
