/**
 * User Menu Component
 *
 * DRAFT - This component will work once Convex Auth is set up.
 *
 * Shows current user info and sign out button.
 */

import * as React from 'react';
import { Button } from '../ui/button';

// TODO: Uncomment after npm install
// import { useConvexAuth } from 'convex/react';
// import { useAuthActions } from '@convex-dev/auth/react';

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
}

function useMockUser(): MockUser | null {
	// For development without Convex
	const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';

	if (bypassAuth) {
		return { email: 'dev@example.com', name: 'Developer' };
	}

	return null;
}

export function UserMenu({ className, onSignOut }: UserMenuProps) {
	const [isLoading, setIsLoading] = React.useState(false);

	// TODO: Replace with actual Convex hooks
	// const { isAuthenticated } = useConvexAuth();
	// const { signOut } = useAuthActions();
	const user = useMockUser();

	const handleSignOut = async () => {
		setIsLoading(true);

		try {
			// TODO: Replace with actual Convex Auth call
			// await signOut();

			// Placeholder - remove after Convex setup
			console.warn('UserMenu: Convex Auth not configured yet');

			onSignOut?.();
		} catch (err) {
			console.error('Failed to sign out:', err);
		} finally {
			setIsLoading(false);
		}
	};

	if (!user) {
		return null;
	}

	return (
		<div className={className}>
			<div className="flex items-center gap-4">
				<div className="text-right">
					{user.name && <p className="text-foreground text-sm font-medium">{user.name}</p>}
					{user.email && <p className="text-muted-foreground text-xs">{user.email}</p>}
				</div>

				<Button
					variant="outline"
					size="sm"
					onClick={handleSignOut}
					disabled={isLoading}
					className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
				>
					{isLoading ? 'Signing out...' : 'Sign Out'}
				</Button>
			</div>
		</div>
	);
}

export default UserMenu;
