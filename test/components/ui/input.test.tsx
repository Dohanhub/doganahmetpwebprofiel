import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Input } from '../../../client/src/components/ui/input';

describe('Input Component', () => {
  it('should render input with default props', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should render input with custom type', () => {
    render(<Input type="email" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should render input with custom placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('should render input with custom value', () => {
    render(<Input value="John Doe" />);
    
    const input = screen.getByDisplayValue('John Doe');
    expect(input).toBeInTheDocument();
  });

  it('should render input with custom id', () => {
    render(<Input id="name-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'name-input');
  });

  it('should render input with custom name', () => {
    render(<Input name="fullName" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'fullName');
  });

  it('should render disabled input', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should render required input', () => {
    render(<Input required />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('should render read-only input', () => {
    render(<Input readOnly />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly');
  });

  it('should handle input change', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New value' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('New value');
  });

  it('should handle input focus', () => {
    const handleFocus = vi.fn();
    render(<Input onFocus={handleFocus} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    expect(handleFocus).toHaveBeenCalled();
  });

  it('should handle input blur', () => {
    const handleBlur = vi.fn();
    render(<Input onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle input key down', () => {
    const handleKeyDown = vi.fn();
    render(<Input onKeyDown={handleKeyDown} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('should handle input key up', () => {
    const handleKeyUp = vi.fn();
    render(<Input onKeyUp={handleKeyUp} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.keyUp(input, { key: 'Enter' });
    
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it('should handle input key press', () => {
    const handleKeyPress = vi.fn();
    render(<Input onKeyPress={handleKeyPress} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'a' });
    
    expect(handleKeyPress).toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<Input className="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('should handle aria-label', () => {
    render(<Input aria-label="Full name input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Full name input');
  });

  it('should handle aria-describedby', () => {
    render(<Input aria-describedby="name-help" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'name-help');
  });

  it('should handle aria-invalid', () => {
    render(<Input aria-invalid="true" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should handle aria-required', () => {
    render(<Input aria-required="true" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('should handle data attributes', () => {
    render(<Input data-testid="name-input" data-custom="value" />);
    
    const input = screen.getByTestId('name-input');
    expect(input).toHaveAttribute('data-custom', 'value');
  });

  it('should handle form integration', () => {
    render(
      <form>
        <Input name="username" id="username" />
      </form>
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('id', 'username');
  });

  it('should handle controlled component pattern', () => {
    const { rerender } = render(<Input value="Initial value" />);
    
    let input = screen.getByDisplayValue('Initial value');
    expect(input).toHaveValue('Initial value');
    
    rerender(<Input value="Updated value" />);
    input = screen.getByDisplayValue('Updated value');
    expect(input).toHaveValue('Updated value');
  });

  it('should handle different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];
    
    types.forEach(type => {
      const { unmount } = render(<Input type={type} />);
      
      const input = screen.getByRole(type === 'password' ? 'textbox' : 'textbox');
      expect(input).toHaveAttribute('type', type);
      
      unmount();
    });
  });

  it('should handle input with maxLength', () => {
    render(<Input maxLength={10} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('should handle input with minLength', () => {
    render(<Input minLength={5} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('minLength', '5');
  });

  it('should handle input with pattern', () => {
    render(<Input pattern="[A-Za-z]{3}" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('pattern', '[A-Za-z]{3}');
  });

  it('should handle input with size', () => {
    render(<Input size={20} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('size', '20');
  });

  it('should handle input with step', () => {
    render(<Input type="number" step="0.1" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('step', '0.1');
  });

  it('should handle input with min and max', () => {
    render(<Input type="number" min="0" max="100" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('should handle input with autoComplete', () => {
    render(<Input autoComplete="name" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autoComplete', 'name');
  });

  it('should handle input with autoFocus', () => {
    render(<Input autoFocus />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('should handle input with tabIndex', () => {
    render(<Input tabIndex={0} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('tabIndex', '0');
  });

  it('should handle input with spellCheck', () => {
    render(<Input spellCheck={false} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('spellCheck', 'false');
  });

  it('should handle input with multiple event handlers', () => {
    const handleChange = vi.fn();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(
      <Input
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle input with ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should handle input with defaultValue', () => {
    render(<Input defaultValue="Default value" />);
    
    const input = screen.getByDisplayValue('Default value');
    expect(input).toBeInTheDocument();
  });

  it('should handle input with multiple attributes', () => {
    render(
      <Input
        id="multi-input"
        name="multiName"
        className="multi-class"
        placeholder="Multi placeholder"
        disabled
        required
        readOnly
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'multi-input');
    expect(input).toHaveAttribute('name', 'multiName');
    expect(input).toHaveAttribute('placeholder', 'Multi placeholder');
    expect(input).toHaveClass('multi-class');
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('readOnly');
  });
});
