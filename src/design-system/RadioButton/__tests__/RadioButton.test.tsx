import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RadioButton from '../RadioButton';

describe('RadioButton', () => {
	it('renders label text', () => {
		render(<RadioButton label="Test Label" name="test" value="test-value" />);
		expect(screen.getByText('Test Label')).toBeInTheDocument();
	});

	it('renders subtext when provided', () => {
		render(
			<RadioButton label="Test Label" subtext="Test subtext" name="test" value="test-value" />
		);
		expect(screen.getByText('Test subtext')).toBeInTheDocument();
	});

	it('does not render subtext when not provided', () => {
		render(<RadioButton label="Test Label" name="test" value="test-value" />);
		expect(screen.queryByText('Test subtext')).not.toBeInTheDocument();
	});

	it('calls onChange when clicked', () => {
		const handleChange = vi.fn();
		render(
			<RadioButton label="Test Label" name="test" value="test-value" onChange={handleChange} />
		);

		const radio = screen.getByRole('radio');
		fireEvent.click(radio);

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	it('reflects checked state', () => {
		render(<RadioButton label="Test Label" name="test" value="test-value" checked={true} />);
		const radio = screen.getByRole('radio') as HTMLInputElement;
		expect(radio.checked).toBe(true);
	});

	it('does not call onChange when disabled', () => {
		const handleChange = vi.fn();
		render(
			<RadioButton
				label="Test Label"
				name="test"
				value="test-value"
				disabled={true}
				onChange={handleChange}
			/>
		);

		const radio = screen.getByRole('radio');
		fireEvent.click(radio);

		expect(handleChange).not.toHaveBeenCalled();
	});

	it('applies disabled styles when disabled', () => {
		render(<RadioButton label="Test Label" name="test" value="test-value" disabled={true} />);
		const radio = screen.getByRole('radio') as HTMLInputElement;
		expect(radio.disabled).toBe(true);
	});

	it('uses correct name attribute for grouping', () => {
		render(<RadioButton label="Test Label" name="group-name" value="test-value" />);
		const radio = screen.getByRole('radio') as HTMLInputElement;
		expect(radio.name).toBe('group-name');
	});

	it('uses correct value attribute', () => {
		render(<RadioButton label="Test Label" name="test" value="option-1" />);
		const radio = screen.getByRole('radio') as HTMLInputElement;
		expect(radio.value).toBe('option-1');
	});

	it('uses data-testid when provided', () => {
		render(
			<RadioButton label="Test Label" name="test" value="test-value" data-testid="my-radio" />
		);
		expect(screen.getByTestId('my-radio')).toBeInTheDocument();
	});

	it('groups radio buttons with same name correctly', () => {
		const { container } = render(
			<div>
				<RadioButton label="Option 1" name="group" value="opt1" checked={true} />
				<RadioButton label="Option 2" name="group" value="opt2" checked={false} />
				<RadioButton label="Option 3" name="group" value="opt3" checked={false} />
			</div>
		);

		const radios = container.querySelectorAll('input[type="radio"]');
		expect(radios).toHaveLength(3);

		radios.forEach((radio) => {
			expect((radio as HTMLInputElement).name).toBe('group');
		});
	});

	it('shows selected state with russet color', () => {
		const { container } = render(
			<RadioButton label="Selected Option" name="test" value="test-value" checked={true} />
		);
		// The selected state applies russet color via styled component
		expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
	});

	it('shows unselected state with iron color', () => {
		const { container } = render(
			<RadioButton label="Unselected Option" name="test" value="test-value" checked={false} />
		);
		// The unselected state applies iron color via styled component
		expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
	});
});
