import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders label text', () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders subtext when provided', () => {
    render(<Checkbox label="Test Label" subtext="Test subtext" />);
    expect(screen.getByText('Test subtext')).toBeInTheDocument();
  });

  it('does not render subtext when not provided', () => {
    render(<Checkbox label="Test Label" />);
    expect(screen.queryByText('Test subtext')).not.toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test Label" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('reflects checked state', () => {
    render(<Checkbox label="Test Label" checked={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Test Label" disabled={true} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    render(<Checkbox label="Test Label" disabled={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('uses data-testid when provided', () => {
    render(<Checkbox label="Test Label" data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toBeInTheDocument();
  });
});
