import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from './_generated/api';
import schema from './schema';

const modules = import.meta.glob('./**/*.ts');

describe('users.getCurrentUser', () => {
	it('returns null for an unauthenticated request', async () => {
		const t = convexTest(schema, modules);

		await expect(t.query(api.users.getCurrentUser, {})).resolves.toBeNull();
	});

	it('returns the stable identity and creation timestamp without exposing email', async () => {
		const t = convexTest(schema, modules);
		const seeded = await t.run(async (ctx) => {
			const userId = await ctx.db.insert('users', {
				name: 'Private display name',
				email: 'private@example.com'
			});
			const user = await ctx.db.get(userId);
			return { userId, createdAt: user!._creationTime };
		});
		const authenticated = t.withIdentity({ subject: `${seeded.userId}|test-session` });

		const result = await authenticated.query(api.users.getCurrentUser, {});
		expect(result).toEqual({
			userId: seeded.userId,
			name: 'Private display name',
			createdAt: seeded.createdAt
		});
		expect(result).not.toHaveProperty('email');
	});
});
