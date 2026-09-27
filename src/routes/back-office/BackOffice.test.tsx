import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from '@vitest/browser/context';
import '../../styles/globals.css';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getFunctionName } from 'convex/server';
import BackOffice from './BackOffice';
import { systemNavigation, resolveSystemLink } from './systemNavigation';
import systems from '../../../convex/backOfficeData/systems.json';
import type { FunctionReturnType } from 'convex/server';
import type { Id } from '../../../convex/_generated/dataModel';
import { backOfficeApi } from './backOfficeApi';

const monsterDetail: NonNullable<FunctionReturnType<typeof backOfficeApi.getMonster>> = {
	monster: {
		_id: 'monster-one' as Id<'monsters'>,
		_creationTime: 1,
		id: 'mon-review',
		name: 'Arctic Chimera',
		level: 4,
		tier: 'apex',
		roleId: 'brute',
		isOfficial: true,
		finalHP: 80,
		finalPD: 11,
		finalAD: 15,
		finalAttack: 6,
		finalSaveDC: 16,
		finalBaseDamage: 3,
		attributes: { might: 4, agility: 1, charisma: 0, intelligence: -2 },
		featureIds: ['feat-smell', 'feat-missing'],
		featurePointsSpent: 2,
		featurePointsMax: 5,
		actions: [
			{
				id: 'act-maul',
				name: 'Maul',
				apCost: 1,
				type: 'martial',
				targetDefense: 'pd',
				damage: 3,
				description: 'A powerful strike.'
			}
		],
		visibility: 'private',
		approvalStatus: 'approved',
		isHomebrew: false,
		createdAt: '2026-09-27',
		lastModified: '2026-09-27',
		schemaVersion: '1.0.0',
		breakdowns: {}
	},
	features: [
		{
			id: 'feat-smell',
			name: 'Keen Smell',
			description: 'ADV on Awareness Checks using smell.',
			pointCost: 1
		}
	],
	missingFeatureIds: ['feat-missing']
};

const state = vi.hoisted(() => ({
	auth: { isConvexEnabled: true, isAuthenticated: true, isLoading: false },
	allowed: true,
	queries: [] as string[],
	filters: {} as Record<string, unknown>,
	loadMore: vi.fn()
}));
vi.mock('../../components/auth/AuthModeContext', () => ({ useAppAuth: () => state.auth }));
vi.mock('../../components/auth/SignIn', () => ({
	SignIn: () => <button>Continue with Google</button>
}));
vi.mock('convex/react', () => ({
	useQuery: (
		reference: Parameters<typeof getFunctionName>[0],
		args: Record<string, string> | 'skip'
	) => {
		if (args === 'skip') return undefined;
		const name = getFunctionName(reference);
		state.queries.push(name);
		if (name.endsWith(':access')) return state.allowed;
		if (name.endsWith(':listSystems'))
			return systems.filter(
				(entry) => !args.search || entry.markdown.toLowerCase().includes(args.search.toLowerCase())
			);
		if (name.endsWith(':getMonster')) return monsterDetail;
		if (name.endsWith(':getSystem')) return systems.find((entry) => entry.id === args.id) ?? null;
		return null;
	},
	usePaginatedQuery: (_reference: unknown, args: Record<string, unknown>) => {
		state.filters = args;
		return {
			results: [
				{
					_id: 'monster-one',
					name: 'Arctic Chimera',
					level: 4,
					roleId: 'brute',
					tier: 'apex',
					isOfficial: true,
					isHomebrew: false,
					approvalStatus: 'approved',
					lastModified: '2026-09-27'
				}
			],
			status: 'CanLoadMore',
			loadMore: state.loadMore
		};
	}
}));

function mount(path = '/back-office/systems') {
	return render(
		<MemoryRouter initialEntries={[path]}>
			<Routes>
				<Route path="/back-office/*" element={<BackOffice />} />
			</Routes>
		</MemoryRouter>
	);
}

beforeEach(() => {
	state.auth = { isConvexEnabled: true, isAuthenticated: true, isLoading: false };
	state.allowed = true;
	state.queries = [];
	state.filters = {};
	state.loadMore.mockReset();
});
afterEach(cleanup);

describe('Back office review UI', () => {
	it('does not request private content in local mode or while signed out', () => {
		state.auth.isConvexEnabled = false;
		const local = mount();
		expect(screen.getByRole('heading', { name: 'Cloud sign-in required' })).toBeTruthy();
		expect(state.queries).toEqual([]);
		local.unmount();
		state.auth.isConvexEnabled = true;
		state.auth.isAuthenticated = false;
		mount();
		expect(screen.getByRole('button', { name: 'Continue with Google' })).toBeTruthy();
		expect(state.queries).toEqual([]);
	});

	it('shows restricted access without starting any content query', () => {
		state.allowed = false;
		mount();
		expect(screen.getByRole('heading', { name: 'Access restricted' })).toBeTruthy();
		expect(state.queries).toEqual(['backOffice:access']);
	});

	it('navigates by flow, reads a system, and follows a related-system link', async () => {
		mount();
		fireEvent.click(screen.getByRole('button', { name: 'Flows' }));
		fireEvent.click(screen.getByRole('button', { name: /Build → save → play/ }));
		const documentNav = screen.getByRole('navigation', { name: 'System documents' });
		const creation = Array.from(documentNav.querySelectorAll('a')).find((entry) =>
			entry.href.includes('CHARACTER_CREATION_FLOW.MD')
		)!;
		fireEvent.click(creation);
		await waitFor(() =>
			expect(screen.getByRole('navigation', { name: 'On this page' })).toBeTruthy()
		);
		expect(screen.getByText('Outside scope')).toBeTruthy();
		const related = Array.from(document.querySelectorAll('.bo-markdown a')).find((entry) =>
			entry.getAttribute('href')?.includes('DATABASE_SYSTEM.MD')
		)!;
		expect(related).toBeTruthy();
		fireEvent.click(related);
		await waitFor(() =>
			expect(document.querySelector('.bo-document-meta')?.textContent).toContain(
				'Database & Storage'
			)
		);
	});

	it('searches the full document text and displays an empty search result', async () => {
		mount();
		fireEvent.change(screen.getByRole('searchbox', { name: 'Search system documents' }), {
			target: { value: 'normalizeCharacterStateForStorage' }
		});
		await waitFor(() =>
			expect(screen.getByRole('navigation', { name: 'System documents' }).textContent).toContain(
				'Database & Storage'
			)
		);
		fireEvent.change(screen.getByRole('searchbox', { name: 'Search system documents' }), {
			target: { value: 'no-such-system-text-457' }
		});
		await waitFor(() =>
			expect(screen.getByText('No systems match this search and area.')).toBeTruthy()
		);
	});

	it('renders saved monster stats, feature text, actions, and missing source references', async () => {
		mount('/back-office/monsters/monster-one');
		expect(screen.getByRole('heading', { name: 'Arctic Chimera' })).toBeTruthy();
		expect(screen.getByText('80')).toBeTruthy();
		expect(screen.getByText('ADV on Awareness Checks using smell.')).toBeTruthy();
		expect(screen.getByRole('heading', { name: /Maul/ })).toBeTruthy();
		expect(screen.getByText(/Unresolved feature references/)).toBeTruthy();
		expect(screen.getByText('No source document or page reference stored.')).toBeTruthy();
		expect(screen.queryByRole('button', { name: /save|approve|delete/i })).toBeNull();
	});

	it('keeps monster review usable at phone, tablet, and desktop widths', async () => {
		mount('/back-office/monsters/monster-one');
		await screen.findByRole('heading', { name: 'Arctic Chimera' });
		for (const width of [375, 768, 1200]) {
			await page.viewport(width, 900);
			expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(width);
			const reader = document.querySelector('.bo-reader')!;
			expect(reader.getBoundingClientRect().width).toBeGreaterThan(250);
		}
		await page.viewport(1200, 900);
	});

	it('sends monster filters, keeps detail links, and loads another page', async () => {
		mount('/back-office/monsters');
		fireEvent.change(screen.getByRole('combobox', { name: 'Monster role' }), {
			target: { value: 'brute' }
		});
		fireEvent.change(screen.getByRole('combobox', { name: 'Monster tier' }), {
			target: { value: 'apex' }
		});
		fireEvent.change(screen.getByRole('searchbox', { name: 'Search monsters' }), {
			target: { value: 'Chimera' }
		});
		await waitFor(() =>
			expect(state.filters).toEqual({ roleId: 'brute', tier: 'apex', search: 'Chimera' })
		);
		expect(screen.getByRole('link', { name: /Arctic Chimera/ }).getAttribute('href')).toContain(
			'search=Chimera'
		);
		fireEvent.click(screen.getByRole('button', { name: 'Load more monsters' }));
		expect(state.loadMore).toHaveBeenCalledWith(30);
	});
});

describe('System navigation contracts', () => {
	it('covers every active document without dangling navigation references', () => {
		const ids = new Set(systems.map((entry) => entry.id));
		const mapped = new Set(
			Object.values(systemNavigation).flatMap((groups) =>
				groups.flatMap((group) => group.documents)
			)
		);
		expect([...ids].filter((id) => !mapped.has(id))).toEqual([]);
		expect([...mapped].filter((id) => !ids.has(id))).toEqual([]);
	});
	it('resolves system links and leaves unrelated repository paths unlinked', () => {
		expect(
			resolveSystemLink(
				'./DATABASE_SYSTEM.MD#authentication',
				systems.map((entry) => entry.id)
			)
		).toBe('/back-office/systems/DATABASE_SYSTEM.MD#authentication');
		expect(
			resolveSystemLink(
				'../../src/App.tsx',
				systems.map((entry) => entry.id)
			)
		).toBeNull();
	});
});
