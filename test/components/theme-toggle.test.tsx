import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../../client/src/components/theme-toggle';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    setTheme: vi.fn(),
    systemTheme: 'light',
    themes: ['light', 'dark', 'system'],
  })),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render theme toggle button', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    // Check for screen reader text
    const screenReaderText = screen.getByText('Toggle theme');
    expect(screenReaderText).toBeInTheDocument();
    expect(screenReaderText).toHaveClass('sr-only');
  });

  it('should display current theme icon', () => {
    render(<ThemeToggle />);
    
    // Should display an SVG icon
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveClass('inline-flex');
    expect(toggleButton).toHaveClass('items-center');
    expect(toggleButton).toHaveClass('justify-center');
  });

  it('should have data-testid attribute', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByTestId('button-theme-toggle');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should handle click events', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    expect(() => fireEvent.click(toggleButton)).not.toThrow();
  });

  it('should have proper button role', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.tagName).toBe('BUTTON');
  });

  it('should contain SVG icon', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    const svg = toggleButton.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide');
  });

  it('should have screen reader text', () => {
    render(<ThemeToggle />);
    
    const screenReaderText = screen.getByText('Toggle theme');
    expect(screenReaderText).toBeInTheDocument();
    expect(screenReaderText).toHaveClass('sr-only');
  });

  it('should have proper button structure', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    expect(toggleButton.children.length).toBeGreaterThan(0);
    
    // Should have SVG and screen reader text
    const svg = toggleButton.querySelector('svg');
    const text = toggleButton.querySelector('span');
    
    expect(svg).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should have consistent styling', () => {
    render(<ThemeToggle />);
    
    const toggleButton = screen.getByRole('button');
    
    // Check for essential styling classes
    expect(toggleButton).toHaveClass('rounded-md');
    expect(toggleButton).toHaveClass('h-10');
    expect(toggleButton).toHaveClass('w-10');
    expect(toggleButton).toHaveClass('border-2');
    expect(toggleButton).toHaveClass('border-blue-600');
  });
});
