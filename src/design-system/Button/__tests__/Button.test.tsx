import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
	it('renders label and handles click', () => {
		const onClick = vi.fn();
		render(<Button label="Click me" onClick={onClick} />);

		const btn = screen.getByRole('button');
		expect(btn).not.toBeNull();
		fireEvent.click(btn);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
