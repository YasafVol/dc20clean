import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import * as S from './Rulebook.styles';

interface MarkdownAstNode {
	type: string;
	value?: string;
	children?: MarkdownAstNode[];
	data?: {
		hProperties?: Record<string, string>;
	};
}

const toDomId = (id: string) => `rulebook-${id.replaceAll('/', '--')}`;

const remarkRulebookHeadingIds = () => (tree: MarkdownAstNode) => {
	let pendingRulebookId: string | undefined;
	const visibleChildren: MarkdownAstNode[] = [];

	for (const node of tree.children ?? []) {
		if (node.type === 'html') {
			const idMatch = node.value?.match(/^<!-- rulebook-id: ([^>]+) -->$/);
			if (idMatch) pendingRulebookId = idMatch[1].trim();
			if (node.value?.trim().startsWith('<!--')) continue;
			visibleChildren.push(node);
			continue;
		}

		if (node.type === 'heading' && pendingRulebookId) {
			node.data = {
				...node.data,
				hProperties: {
					...node.data?.hProperties,
					id: toDomId(pendingRulebookId)
				}
			};
			pendingRulebookId = undefined;
		}

		visibleChildren.push(node);
	}

	tree.children = visibleChildren;
};

const markdownComponents: Components = {
	a({ href, children }) {
		const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
		return (
			<a
				href={href}
				target={isExternal ? '_blank' : undefined}
				rel={isExternal ? 'noreferrer' : undefined}
			>
				{children}
			</a>
		);
	}
};

const markdownPlugins = [remarkGfm, remarkRulebookHeadingIds];

interface RulebookMarkdownProps {
	markdown: string;
}

export function RulebookMarkdown({ markdown }: RulebookMarkdownProps) {
	return (
		<S.MarkdownArticle>
			<ReactMarkdown remarkPlugins={markdownPlugins} components={markdownComponents}>
				{markdown}
			</ReactMarkdown>
		</S.MarkdownArticle>
	);
}
