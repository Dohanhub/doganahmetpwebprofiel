import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Checkbox } from '../../../client/src/components/ui/checkbox';

describe('Checkbox Component', () => {
  it('should render checkbox with default state', () => {
    render(<Checkbox />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox', () => {
    render(<Checkbox checked />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should render disabled checkbox', () => {
    render(<Checkbox disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should render checkbox with custom id', () => {
    render(<Checkbox id="custom-id" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('should render checkbox with custom data attributes', () => {
    render(<Checkbox data-testid="test-checkbox" data-custom="value" />);
    
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toHaveAttribute('data-custom', 'value');
  });

  it('should handle checkbox click', () => {
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should handle checkbox uncheck', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('should handle checkbox with proper accessibility', () => {
    render(<Checkbox aria-label="Accessible checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Accessible checkbox');
    expect(checkbox).toHaveAttribute('role', 'checkbox');
  });

  it('should handle checkbox with proper focus management', () => {
    render(<Checkbox tabIndex={0} />);
    
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });

  it('should apply custom className', () => {
    render(<Checkbox className="custom-checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-checkbox');
  });

  it('should handle required attribute', () => {
    render(<Checkbox required />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('should handle aria-label', () => {
    render(<Checkbox aria-label="Custom checkbox label" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Custom checkbox label');
  });

  it('should handle aria-describedby', () => {
    render(<Checkbox aria-describedby="description" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby', 'description');
  });

  it('should handle data attributes', () => {
    render(<Checkbox data-testid="test-checkbox" data-custom="value" />);
    
    const checkbox = screen.getByTestId('test-checkbox');
    expect(checkbox).toHaveAttribute('data-custom', 'value');
  });

  it('should handle form integration with proper attributes', () => {
    render(
      <form>
        <Checkbox id="agreement" aria-label="Agreement checkbox" />
      </form>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'agreement');
    expect(checkbox).toHaveAttribute('aria-label', 'Agreement checkbox');
  });

  it('should handle controlled component pattern', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    rerender(<Checkbox checked={true} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should handle indeterminate state', () => {
    render(<Checkbox data-state="indeterminate" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
  });

  it('should handle multiple checkboxes', () => {
    const handleChange1 = vi.fn();
    const handleChange2 = vi.fn();
    
    render(
      <div>
        <Checkbox onCheckedChange={handleChange1} />
        <Checkbox onCheckedChange={handleChange2} />
      </div>
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    
    fireEvent.click(checkboxes[0]);
    expect(handleChange1).toHaveBeenCalledWith(true);
    expect(handleChange2).not.toHaveBeenCalled();
  });

  it('should handle checkbox group', () => {
    const handleChange = vi.fn();
    
    render(
      <div role="group" aria-label="Options">
        <Checkbox id="option1" onCheckedChange={handleChange} />
        <Checkbox id="option2" onCheckedChange={handleChange} />
        <Checkbox id="option3" onCheckedChange={handleChange} />
      </div>
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    
    fireEvent.click(checkboxes[0]);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should handle custom onCheckedChange behavior', () => {
    const handleChange = vi.fn((checked) => {
      if (checked) {
        return 'checked';
      }
      return 'unchecked';
    });
    
    render(<Checkbox onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should handle checkbox with label', () => {
    render(
      <label>
        <Checkbox />
        Accept terms and conditions
      </label>
    );
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms and conditions');
    
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should handle checkbox with description', () => {
    render(
      <div>
        <Checkbox />
        <div id="description">This is a description of the checkbox</div>
      </div>
    );
    
    const checkbox = screen.getByRole('checkbox');
    const description = screen.getByText('This is a description of the checkbox');
    
    expect(checkbox).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should handle checkbox state changes', () => {
    const handleChange = vi.fn();
    const { rerender } = render(<Checkbox onCheckedChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Initial state
    expect(checkbox).not.toBeChecked();
    
    // Check the checkbox
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Update to checked state
    rerender(<Checkbox checked onCheckedChange={handleChange} />);
    expect(checkbox).toBeChecked();
    
    // Uncheck the checkbox
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('should handle checkbox with defaultChecked', () => {
    render(<Checkbox defaultChecked />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should handle checkbox with tabIndex', () => {
    render(<Checkbox tabIndex={0} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('tabIndex', '0');
  });

  it('should handle checkbox with autoFocus', () => {
    render(<Checkbox autoFocus />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveFocus();
  });
});
