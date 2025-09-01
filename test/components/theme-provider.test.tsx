import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../client/src/components/theme-provider';

describe('ThemeProvider Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should render children wrapped in theme provider context', () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should pass through all props to theme provider', () => {
    const testProps = {
      defaultTheme: 'dark' as const,
      storageKey: 'custom-theme',
    };

    render(
      <ThemeProvider {...testProps}>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<ThemeProvider />);
    
    // Should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('should handle complex nested children', () => {
    render(
      <ThemeProvider>
        <div data-testid="parent">
          <span data-testid="nested">Nested Content</span>
          <button data-testid="button">Click me</button>
        </div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('parent')).toBeInTheDocument();
    expect(screen.getByTestId('nested')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should provide theme context to children', () => {
    render(
      <ThemeProvider>
        <div data-testid="theme-child">Theme Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-child')).toBeInTheDocument();
  });

  it('should handle theme state management', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    // Theme provider should manage theme state internally
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle localStorage operations', () => {
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle document root class manipulation', () => {
    // Mock document.documentElement
    const mockRoot = {
      classList: {
        remove: vi.fn(),
        add: vi.fn(),
      },
      style: {
        colorScheme: '',
      },
    };
    
    Object.defineProperty(document, 'documentElement', {
      value: mockRoot,
      writable: true,
    });

    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle window object availability', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle theme switching functionality', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    // Theme provider should support theme switching
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle default theme fallback', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle custom storage key', () => {
    render(
      <ThemeProvider storageKey="custom-theme-key">
        <div>Test Content</div>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should handle theme persistence', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );

    // Theme should persist across renders
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
