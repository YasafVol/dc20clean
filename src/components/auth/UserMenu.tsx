import * as React from 'react';
import { useConvexAuth } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';
import styled from 'styled-components';
import { theme } from '../../routes/character-sheet/styles/theme';
import { logger } from '../../lib/utils/logger';
import { useTranslation } from 'react-i18next';

export interface UserMenuProps {
	/** Additional class names */
	className?: string;
	/** Called after successful sign out */
	onSignOut?: () => void;
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[3]};
`;

const Avatar = styled.img`
	height: 2rem;
	width: 2rem;
	border-radius: ${theme.borderRadius.full};
	border: 1px solid ${theme.colors.accent.secondary};
`;

const AvatarPlaceholder = styled.div`
	height: 2rem;
	width: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${theme.borderRadius.full};
	background: ${theme.colors.accent.secondaryAlpha30};
	color: ${theme.colors.accent.secondary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
`;

const UserInfo = styled.div`
	display: none;
	text-align: right;

	@media (min-width: 640px) {
		display: block;
	}
`;

const UserName = styled.p`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	margin: 0;
`;

const UserEmail = styled.p`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	margin: 0;
`;

const SignOutButton = styled.button<{ $disabled?: boolean }>`
	padding: ${theme.spacing[2]} ${theme.spacing[4]};
	background: rgba(168, 85, 247, 0.05);
	border: 1px solid rgba(168, 85, 247, 0.4);
	border-radius: 8px;
	color: #e0e7ff;
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
	transition: all 0.3s ease;
	backdrop-filter: blur(4px);

	&:hover:not(:disabled) {
		background: rgba(168, 85, 247, 0.15);
		border-color: #a855f7;
		transform: translateY(-2px);
	}

	&:active:not(:disabled) {
		transform: scale(0.98);
	}
`;

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
	const { t } = useTranslation();

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
			logger.error('auth', 'Failed to sign out', { error: err });
		} finally {
			setIsLoading(false);
		}
	};

	// Not authenticated - show nothing or sign in prompt
	if (isAuthLoading || !isAuthenticated) {
		return null;
	}

	return (
		<Container className={className}>
			{/* User avatar */}
			{user?.image ? (
				<Avatar src={user.image} alt={user.name || t('auth.userAltText')} />
			) : (
				<AvatarPlaceholder>{user?.name?.[0] || user?.email?.[0] || 'U'}</AvatarPlaceholder>
			)}

			{/* User info */}
			<UserInfo>
				{user?.name && <UserName>{user.name}</UserName>}
				{user?.email && <UserEmail>{user.email}</UserEmail>}
			</UserInfo>

			{/* Sign out button */}
			<SignOutButton onClick={handleSignOut} $disabled={isLoading} disabled={isLoading}>
				{isLoading ? '...' : t('auth.signOut')}
			</SignOutButton>
		</Container>
	);
}

export default UserMenu;
