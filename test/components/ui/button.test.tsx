import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../../client/src/components/ui/button';

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
  });

  it('should render with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toHaveClass('custom-class');
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('should not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveClass('bg-primary');
    
    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button', { name: 'Destructive' })).toHaveClass('bg-destructive');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button', { name: 'Outline' })).toHaveClass('border', 'border-input');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass('bg-secondary');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button', { name: 'Ghost' })).toHaveClass('hover:bg-accent');
    
    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button', { name: 'Link' })).toHaveClass('text-primary', 'underline-offset-4');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    expect(screen.getByRole('button', { name: 'Default Size' })).toHaveClass('h-10', 'px-4', 'py-2');
    
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('h-9', 'rounded-md', 'px-3');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('h-11', 'rounded-md', 'px-8');
    
    rerender(<Button size="icon">Icon</Button>);
    expect(screen.getByRole('button', { name: 'Icon' })).toHaveClass('h-10', 'w-10');
  });

  it('should forward ref correctly', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it('should handle asChild prop', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should apply proper focus styles', () => {
    render(<Button>Focusable Button</Button>);
    const button = screen.getByRole('button', { name: 'Focusable Button' });
    
    button.focus();
    expect(button).toHaveFocus();
  });

  it('should handle keyboard navigation', () => {
    render(<Button>Keyboard Button</Button>);
    const button = screen.getByRole('button', { name: 'Keyboard Button' });
    
    // Tab to button
    button.focus();
    expect(button).toHaveFocus();
    
    // Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(button).toHaveFocus();
    
    // Space key
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(button).toHaveFocus();
  });
});
