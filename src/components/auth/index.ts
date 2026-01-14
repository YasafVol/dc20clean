/**
 * Auth Components - Main Export
 *
 * Social authentication (Google + GitHub) for DC20 Character Creator.
 * Auth is OPTIONAL - only required for:
 * - Saving characters to cloud
 * - Exporting PDF
 *
 * The app is fully usable without authentication (localStorage).
 */

export { SignIn, type SignInProps } from './SignIn';
export {
	AuthGuard,
	FeatureGateButton,
	useIsAuthenticated,
	type AuthGuardProps,
	type FeatureGateButtonProps,
} from './AuthGuard';
export { UserMenu, type UserMenuProps } from './UserMenu';
