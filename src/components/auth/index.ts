/**
 * Auth Components - Main Export
 *
 * These components handle authentication UI for the DC20 Character Creator.
 * They are designed to work with Convex Auth once npm packages are installed.
 */

export { SignIn, type SignInProps } from './SignIn';
export { SignUp, type SignUpProps } from './SignUp';
export { AuthGuard, withAuthGuard, type AuthGuardProps } from './AuthGuard';
export { UserMenu, type UserMenuProps } from './UserMenu';
